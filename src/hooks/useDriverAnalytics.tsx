
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DriverStats {
  todayDeliveries: number;
  totalDistance: number;
  timeOnRoad: number;
  weeklyCompleted: number;
  availablePickups: Array<{
    id: string;
    center_name: string;
    recycler_name: string;
    waste_type: string;
    quantity_kg: number;
    price_per_kg: number;
    total_amount: number;
    distance: string;
    priority: string;
  }>;
  activeDelivery: {
    id: string;
    from: string;
    to: string;
    weight: string;
    distance: string;
    eta: string;
  } | null;
  todaySchedule: Array<{
    time: string;
    status: 'completed' | 'active' | 'pending';
    location: string;
    pickup_id: string;
  }>;
}

export const useDriverAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['driver-analytics', user?.id],
    queryFn: async (): Promise<DriverStats> => {
      console.log('Fetching driver analytics...');

      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Get current date for filtering
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoISO = weekAgo.toISOString();

      try {
        // Fetch pickup requests assigned to this driver
        const { data: assignedPickups, error: assignedError } = await supabase
          .from('pickup_requests')
          .select(`
            *,
            center:collation_centers(name, address),
            recycler:profiles!pickup_requests_recycler_id_fkey(full_name)
          `)
          .eq('driver_id', user.id);

        if (assignedError) {
          console.error('Error fetching assigned pickups:', assignedError);
          throw assignedError;
        }

        // Fetch available (unassigned) pickup requests
        const { data: availablePickups, error: availableError } = await supabase
          .from('pickup_requests')
          .select(`
            *,
            center:collation_centers(name, address),
            recycler:profiles!pickup_requests_recycler_id_fkey(full_name)
          `)
          .is('driver_id', null)
          .eq('status', 'pending');

        if (availableError) {
          console.error('Error fetching available pickups:', availableError);
          throw availableError;
        }

        // Calculate today's deliveries
        const todayDeliveries = assignedPickups?.filter(pickup => {
          const deliveryDate = pickup.delivery_date ? new Date(pickup.delivery_date) : null;
          return deliveryDate && deliveryDate >= today && pickup.status === 'completed';
        }).length || 0;

        // Calculate weekly completed deliveries
        const weeklyCompleted = assignedPickups?.filter(pickup => {
          const deliveryDate = pickup.delivery_date ? new Date(pickup.delivery_date) : null;
          return deliveryDate && deliveryDate >= weekAgo && pickup.status === 'completed';
        }).length || 0;

        // Find active delivery (in_transit status)
        const activePickup = assignedPickups?.find(pickup => pickup.status === 'in_transit');
        const activeDelivery = activePickup ? {
          id: activePickup.id,
          from: activePickup.center?.name || 'Collection Center',
          to: activePickup.recycler?.full_name || 'Recycler',
          weight: `${activePickup.quantity_kg}kg`,
          distance: '12km', // This would be calculated based on coordinates
          eta: '25 mins' // This would be calculated based on real-time data
        } : null;

        // Transform available pickups for display
        const transformedAvailablePickups = availablePickups?.map(pickup => ({
          id: pickup.id,
          center_name: pickup.center?.name || 'Unknown Center',
          recycler_name: pickup.recycler?.full_name || 'Unknown Recycler',
          waste_type: pickup.waste_type,
          quantity_kg: pickup.quantity_kg,
          price_per_kg: pickup.price_per_kg,
          total_amount: pickup.total_amount,
          distance: '12km', // Would be calculated from coordinates
          priority: pickup.total_amount > 1000 ? 'High' : pickup.total_amount > 500 ? 'Medium' : 'Low'
        })) || [];

        // Create today's schedule from assigned pickups
        const todaySchedule = assignedPickups?.filter(pickup => {
          const pickupDate = pickup.pickup_date ? new Date(pickup.pickup_date) : null;
          return pickupDate && pickupDate >= today;
        }).map(pickup => ({
          time: pickup.pickup_date ? new Date(pickup.pickup_date).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }) : 'TBD',
          status: pickup.status === 'completed' ? 'completed' as const :
                  pickup.status === 'in_transit' ? 'active' as const : 'pending' as const,
          location: `${pickup.center?.name || 'Center'} → ${pickup.recycler?.full_name || 'Recycler'}`,
          pickup_id: pickup.id
        })) || [];

        const stats: DriverStats = {
          todayDeliveries,
          totalDistance: todayDeliveries * 12, // Estimated distance per delivery
          timeOnRoad: todayDeliveries * 0.75, // Estimated time per delivery in hours
          weeklyCompleted,
          availablePickups: transformedAvailablePickups.slice(0, 3), // Show top 3
          activeDelivery,
          todaySchedule: todaySchedule.slice(0, 3) // Show today's schedule
        };

        console.log('Driver analytics fetched:', stats);
        return stats;

      } catch (error) {
        console.error('Error in driver analytics:', error);
        throw error;
      }
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds for real-time updates
  });
};
