
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CenterInventoryItem {
  id: string;
  center_id: string;
  waste_type: string;
  weight_kg: number;
  quality_score: number;
  price_per_kg: number;
  available: boolean;
  created_at: string;
  updated_at: string;
  center?: {
    name: string;
    address: string;
  };
}

export const useCenterInventory = (centerId?: string) => {
  return useQuery({
    queryKey: ['center-inventory', centerId],
    queryFn: async () => {
      let query = supabase
        .from('plastic_inventory')
        .select(`
          *,
          collation_centers:center_id (
            name,
            address
          )
        `)
        .eq('available', true);

      if (centerId) {
        query = query.eq('center_id', centerId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(item => ({
        ...item,
        center: item.collation_centers
      })) as CenterInventoryItem[];
    }
  });
};

export const useAllCentersInventory = () => {
  return useQuery({
    queryKey: ['all-centers-inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('plastic_inventory')
        .select(`
          *,
          collation_centers:center_id (
            name,
            address
          )
        `)
        .eq('available', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(item => ({
        ...item,
        center: item.collation_centers
      })) as CenterInventoryItem[];
    }
  });
};
