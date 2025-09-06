
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation, CheckCircle, Play, MapPin, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ActiveDelivery {
  id: string;
  from: string;
  to: string;
  weight: string;
  distance: string;
  eta: string;
}

interface ScheduleItem {
  time: string;
  status: 'completed' | 'active' | 'pending';
  location: string;
  pickup_id: string;
}

interface CurrentRouteCardProps {
  activeDelivery: ActiveDelivery | null;
  todaySchedule: ScheduleItem[];
  onRouteUpdated?: () => void;
}

const CurrentRouteCard: React.FC<CurrentRouteCardProps> = ({
  activeDelivery,
  todaySchedule,
  onRouteUpdated,
}) => {
  const { toast } = useToast();

  const handleMarkComplete = async (pickupId: string) => {
    try {
      const { error } = await supabase
        .from('pickup_requests')
        .update({ 
          status: 'completed',
          delivery_date: new Date().toISOString()
        })
        .eq('id', pickupId);

      if (error) {
        console.error('Error marking pickup complete:', error);
        toast({
          title: "Error",
          description: "Failed to mark pickup as complete",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Pickup Completed",
        description: "Pickup has been marked as completed successfully",
      });
      console.log('Pickup marked as complete');
      onRouteUpdated?.();
    } catch (error) {
      console.error('Error marking pickup complete:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleStartTransit = async (pickupId: string) => {
    try {
      const { error } = await supabase
        .from('pickup_requests')
        .update({ status: 'in_transit' })
        .eq('id', pickupId);

      if (error) {
        console.error('Error starting transit:', error);
        toast({
          title: "Error",
          description: "Failed to start transit",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Transit Started",
        description: "Pickup is now in transit",
      });
      console.log('Transit started');
      onRouteUpdated?.();
    } catch (error) {
      console.error('Error starting transit:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleNavigate = () => {
    if (activeDelivery) {
      toast({
        title: "Navigation Opened",
        description: `Opening navigation to ${activeDelivery.to}`,
      });
      // In a real app, this would open maps/navigation
      console.log('Opening navigation for delivery:', activeDelivery);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Current Route</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeDelivery ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Active Delivery
              </h4>
              <p className="text-sm text-blue-800 mb-2">{activeDelivery.from} → {activeDelivery.to}</p>
              <p className="text-sm text-blue-600 mb-3">{activeDelivery.weight} • {activeDelivery.distance} • ETA: {activeDelivery.eta}</p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleNavigate}
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  Navigate
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleMarkComplete(activeDelivery.id)}
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Mark Complete
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <div className="flex flex-col items-center space-y-2">
                <MapPin className="w-8 h-8 text-gray-400" />
                <p className="text-gray-600">No active delivery</p>
                <p className="text-sm text-gray-500">Accept a pickup request to start a route</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Today's Schedule
            </h4>
            {todaySchedule.length === 0 ? (
              <div className="text-center py-4">
                <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">No scheduled pickups for today</p>
                <p className="text-xs text-gray-400">Check available pickups to add to your schedule</p>
              </div>
            ) : (
              todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'active' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.time}</p>
                    <p className="text-xs text-gray-600 truncate">{item.location}</p>
                  </div>
                  <div className="flex space-x-1">
                    {item.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStartTransit(item.pickup_id)}
                        className="text-xs px-2 py-1 h-7"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    )}
                    {item.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleMarkComplete(item.pickup_id)}
                        className="text-xs px-2 py-1 h-7"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentRouteCard;
