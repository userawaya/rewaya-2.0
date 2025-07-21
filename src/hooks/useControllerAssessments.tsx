
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { WasteRecord } from './useWasteRecords';

export interface AssessmentData {
  weight_kg: number;
  quality_score: number;
  status?: 'pending' | 'sorted' | 'picked_up' | 'delivered' | 'recycled';
}

export const usePendingAssessments = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['pending-assessments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('waste_records')
        .select(`
          *,
          profiles!waste_records_generator_id_fkey(full_name),
          collation_centers(name)
        `)
        .eq('status', 'pending')
        .eq('weight_kg', 0)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as (WasteRecord & {
        profiles: { full_name: string };
        collation_centers: { name: string };
      })[];
    },
    enabled: !!user
  });
};

export const useAssessWasteRecord = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ recordId, assessment }: { recordId: string; assessment: AssessmentData }) => {
      const { data, error } = await supabase
        .from('waste_records')
        .update({
          weight_kg: assessment.weight_kg,
          quality_score: assessment.quality_score,
          status: assessment.status || 'sorted',
          updated_at: new Date().toISOString()
        })
        .eq('id', recordId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-assessments'] });
      queryClient.invalidateQueries({ queryKey: ['waste-records'] });
      toast({
        title: "Assessment completed successfully!",
        description: "Credits have been automatically calculated and awarded.",
      });
    },
    onError: (error) => {
      toast({
        title: "Assessment failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};
