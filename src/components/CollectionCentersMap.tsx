
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Package } from 'lucide-react';
import { useCollationCenters, calculateDistance } from '@/hooks/useCollationCenters';

const CollectionCentersMap: React.FC = () => {
  const { data: centers, isLoading, error } = useCollationCenters();

  // Mock user location (in a real app, you'd get this from geolocation)
  const userLat = 6.5244; // Lagos coordinates
  const userLon = 3.3792;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>Collection Centers Near You</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>Collection Centers Near You</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600">
            Failed to load collection centers. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!centers || centers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>Collection Centers Near You</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No centers available</h3>
            <p className="text-gray-600">Collection centers will be displayed here once available.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort centers by distance
  const centersWithDistance = centers.map(center => ({
    ...center,
    distance: calculateDistance(userLat, userLon, center.latitude, center.longitude)
  })).sort((a, b) => a.distance - b.distance);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-green-600" />
          <span>Collection Centers Near You</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {centersWithDistance.map((center) => {
            const capacityPercentage = center.capacity_kg 
              ? Math.round((center.current_stock_kg || 0) / center.capacity_kg * 100)
              : 0;
            
            const getStatusColor = (percentage: number) => {
              if (percentage > 80) return 'bg-red-100 text-red-800';
              if (percentage > 60) return 'bg-orange-100 text-orange-800';
              return 'bg-green-100 text-green-800';
            };

            const getStatusText = (percentage: number) => {
              if (percentage > 80) return 'Nearly Full';
              if (percentage > 60) return 'Moderately Full';
              return 'Available';
            };
            
            return (
              <div key={center.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{center.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{center.address}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(capacityPercentage)}>
                    {getStatusText(capacityPercentage)}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Distance</p>
                    <div className="flex items-center">
                      <Navigation className="w-3 h-3 text-blue-500 mr-1" />
                      <p className="font-medium">{center.distance.toFixed(1)} km</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Capacity</p>
                    <div className="flex items-center">
                      <Package className="w-3 h-3 text-purple-500 mr-1" />
                      <p className="font-medium">{capacityPercentage}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 text-green-500 mr-1" />
                      <p className="font-medium text-green-600">Open</p>
                    </div>
                  </div>
                </div>

                {/* Capacity bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      capacityPercentage > 80 ? 'bg-red-500' :
                      capacityPercentage > 60 ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {center.current_stock_kg || 0} kg / {center.capacity_kg || 0} kg capacity
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionCentersMap;
