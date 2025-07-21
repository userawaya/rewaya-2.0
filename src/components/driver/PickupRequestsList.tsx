
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Package, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PickupRequest {
  id: string;
  center_name: string;
  recycler_name: string;
  waste_type: string;
  quantity_kg: number;
  price_per_kg: number;
  total_amount: number;
  distance: string;
  priority: string;
}

interface PickupRequestsListProps {
  availablePickups: PickupRequest[];
  onPickupAccepted?: () => void;
}

const PickupRequestsList: React.FC<PickupRequestsListProps> = ({
  availablePickups,
  onPickupAccepted,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [processingPickups, setProcessingPickups] = useState<Set<string>>(new Set());

  const handleAcceptPickup = async (pickupId: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to accept pickups",
        variant: "destructive",
      });
      return;
    }

    setProcessingPickups(prev => new Set(prev).add(pickupId));

    try {
      const { error } = await supabase
        .from('pickup_requests')
        .update({ 
          driver_id: user.id, 
          status: 'assigned',
          pickup_date: new Date().toISOString()
        })
        .eq('id', pickupId);

      if (error) {
        console.error('Error accepting pickup:', error);
        toast({
          title: "Error",
          description: "Failed to accept pickup request",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Pickup Accepted",
        description: "Pickup request has been assigned to you successfully",
      });
      console.log('Pickup accepted successfully');
      onPickupAccepted?.();
    } catch (error) {
      console.error('Error accepting pickup:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setProcessingPickups(prev => {
        const newSet = new Set(prev);
        newSet.delete(pickupId);
        return newSet;
      });
    }
  };

  const handleViewDetails = (pickup: PickupRequest) => {
    toast({
      title: "Pickup Details",
      description: `${pickup.waste_type} - ${pickup.quantity_kg}kg from ${pickup.center_name}`,
    });
    console.log('Viewing pickup details:', pickup);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Available Pickups</span>
          {availablePickups.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {availablePickups.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {availablePickups.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No pickup requests available</p>
              <p className="text-sm text-gray-400">Check back later for new opportunities</p>
            </div>
          ) : (
            availablePickups.map((pickup) => (
              <div key={pickup.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{pickup.waste_type}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(pickup.priority)}`}>
                    {pickup.priority} Priority
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{pickup.center_name} → {pickup.recycler_name}</span>
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <span className="flex items-center">
                        <Package className="w-3 h-3 mr-1" />
                        {pickup.quantity_kg}kg
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {pickup.distance}
                      </span>
                    </div>
                    <div className="flex items-center font-medium text-green-600">
                      <DollarSign className="w-3 h-3 mr-1" />
                      ₦{pickup.total_amount.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewDetails(pickup)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => handleAcceptPickup(pickup.id)}
                    disabled={processingPickups.has(pickup.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {processingPickups.has(pickup.id) ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                        Accepting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Accept
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PickupRequestsList;
