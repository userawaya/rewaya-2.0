
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MapPin, Package, TrendingUp } from 'lucide-react';
import { useCollationCenters, calculateDistance } from '@/hooks/useCollationCenters';

interface CenterSelectorProps {
  selectedCenterId: string;
  onCenterChange: (centerId: string) => void;
}

const CenterSelector: React.FC<CenterSelectorProps> = ({
  selectedCenterId,
  onCenterChange
}) => {
  const { data: centers, isLoading, error } = useCollationCenters();

  // Mock user location (in a real app, you'd get this from geolocation)
  const userLat = 6.5244; // Lagos coordinates
  const userLon = 3.3792;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
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
        <CardContent className="p-4">
          <div className="text-center text-gray-600">
            No collection centers available at the moment.
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
    <div className="space-y-2">
      <Label>Select Collection Center</Label>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {centersWithDistance.map((center) => {
          const capacityPercentage = center.capacity_kg 
            ? Math.round((center.current_stock_kg || 0) / center.capacity_kg * 100)
            : 0;
          
          return (
            <Card
              key={center.id}
              className={`cursor-pointer transition-colors ${
                selectedCenterId === center.id
                  ? 'ring-2 ring-green-500 bg-green-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onCenterChange(center.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{center.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Package className="w-3 h-3 mr-1" />
                        <span>{center.distance.toFixed(1)} km away</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span className={`${
                          capacityPercentage > 80 ? 'text-red-600' : 
                          capacityPercentage > 60 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {capacityPercentage}% full
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedCenterId === center.id && (
                    <div className="ml-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CenterSelector;
