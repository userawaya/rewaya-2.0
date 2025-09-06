
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CollationCenter {
  id: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  capacity_kg?: number;
  current_stock_kg?: number;
  controller_id?: string;
  created_at: string;
  updated_at: string;
}

export const useCollationCenters = () => {
  return useQuery({
    queryKey: ['collation-centers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collation_centers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as CollationCenter[];
    }
  });
};

export const calculateDistance = (lat1?: number, lon1?: number, lat2?: number, lon2?: number): number => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 999; // Return high value if coordinates missing
  
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
