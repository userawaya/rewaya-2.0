
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface RecyclerAnalytics {
  availableInventory: {
    type: string;
    weight: number;
    quality: number;
    location: string;
    price: number;
    centerId: string;
  }[];
  myOrders: {
    id: string;
    type: string;
    weight: number;
    status: string;
    eta: string;
    centerName: string;
  }[];
  monthlyPurchases: number;
  averageQuality: number;
  totalAvailableStock: number;
  pendingOrders: number;
}

export const useRecyclerAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recycler-analytics', user?.id],
    queryFn: async (): Promise<RecyclerAnalytics> => {
      console.log('Fetching recycler analytics...');

      // Fetch available plastic inventory
      const { data: inventory, error: inventoryError } = await supabase
        .from('plastic_inventory')
        .select(`
          *,
          collation_centers (
            id,
            name,
            address
          )
        `)
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (inventoryError) {
        console.error('Error fetching inventory:', inventoryError);
        throw inventoryError;
      }

      // Fetch recycler's orders
      const { data: orders, error: ordersError } = await supabase
        .from('pickup_requests')
        .select(`
          *,
          collation_centers (
            name
          )
        `)
        .eq('recycler_id', user?.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw ordersError;
      }

      // Process available inventory
      const availableInventory = (inventory || []).map(item => ({
        type: item.waste_type,
        weight: item.weight_kg,
        quality: item.quality_score,
        location: item.collation_centers?.name || 'Unknown Location',
        price: item.price_per_kg,
        centerId: item.center_id
      }));

      // Process orders
      const myOrders = (orders || []).map(order => ({
        id: order.id,
        type: order.waste_type,
        weight: order.quantity_kg,
        status: order.status,
        eta: order.pickup_date ? new Date(order.pickup_date).toLocaleDateString() : 'TBD',
        centerName: order.collation_centers?.name || 'Unknown Center'
      }));

      // Calculate analytics
      const monthlyPurchases = orders?.reduce((sum, order) => {
        const orderDate = new Date(order.created_at);
        const currentMonth = new Date().getMonth();
        const orderMonth = orderDate.getMonth();
        
        if (orderMonth === currentMonth && order.status === 'completed') {
          return sum + order.quantity_kg;
        }
        return sum;
      }, 0) || 0;

      const averageQuality = inventory?.length 
        ? inventory.reduce((sum, item) => sum + item.quality_score, 0) / inventory.length 
        : 0;

      const totalAvailableStock = inventory?.reduce((sum, item) => sum + item.weight_kg, 0) || 0;
      const pendingOrders = orders?.filter(order => ['pending', 'assigned', 'in_transit'].includes(order.status)).length || 0;

      const analytics = {
        availableInventory,
        myOrders,
        monthlyPurchases,
        averageQuality,
        totalAvailableStock,
        pendingOrders
      };

      console.log('Recycler analytics fetched:', analytics);
      return analytics;
    },
    enabled: !!user?.id,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
