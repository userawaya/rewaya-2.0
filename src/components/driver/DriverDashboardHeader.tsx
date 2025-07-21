
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, MapPin, Clock, Award, Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DriverDashboardHeaderProps {
  userName: string;
  availablePickups: number;
  truckCapacity: number;
  activeDelivery?: {
    id: string;
    from: string;
    to: string;
    eta: string;
  } | null;
}

const DriverDashboardHeader: React.FC<DriverDashboardHeaderProps> = ({
  userName,
  availablePickups,
  truckCapacity,
  activeDelivery,
}) => {
  const { toast } = useToast();

  const handleStartRoute = () => {
    if (activeDelivery) {
      toast({
        title: "Route Continued",
        description: `Continuing route to ${activeDelivery.to}`,
      });
      // In a real app, this would open navigation or update route status
      console.log('Continuing route to:', activeDelivery.to);
    } else {
      toast({
        title: "Route Started",
        description: "Starting new route with available pickups",
      });
      console.log('Starting new route');
    }
  };

  const handleNavigate = () => {
    if (activeDelivery) {
      toast({
        title: "Navigation Opened",
        description: `Navigating to ${activeDelivery.to}`,
      });
      // In a real app, this would open maps/navigation
      console.log('Opening navigation for:', activeDelivery);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Good morning, {userName}!</h1>
        <p className="text-gray-600">
          {availablePickups} pickup requests available • Truck capacity: {truckCapacity}%
        </p>
        {activeDelivery && (
          <div className="mt-2 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-blue-600">
              <MapPin className="w-4 h-4" />
              <span>Active: {activeDelivery.from} → {activeDelivery.to}</span>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <Clock className="w-4 h-4" />
              <span>ETA: {activeDelivery.eta}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleNavigate}
              className="ml-2"
            >
              <Navigation className="w-3 h-3 mr-1" />
              Navigate
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          className="bg-sky-600 hover:bg-sky-700"
          onClick={handleStartRoute}
        >
          <Play className="w-4 h-4 mr-2" />
          {activeDelivery ? 'Continue Route' : 'Start Route'}
        </Button>
      </div>
    </div>
  );
};

export default DriverDashboardHeader;
