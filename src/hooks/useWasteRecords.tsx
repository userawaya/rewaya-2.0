import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export interface WasteRecord {
  id: string;
  generator_id: string;
  center_id: string;
  waste_type: 'PET' | 'HDPE' | 'PVC' | 'LDPE' | 'PP' | 'PS' | 'OTHER';
  weight_kg: number;
  photo_url?: string;
  status: 'pending' | 'sorted' | 'picked_up' | 'delivered' | 'recycled';
  quality_score?: number;
  credits_earned?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateWasteRecordData {
  center_id: string;
  waste_type: 'PET' | 'HDPE' | 'PVC' | 'LDPE' | 'PP' | 'PS' | 'OTHER';
  weight_kg: number; // Will be 0 initially, filled by controller
  photo_url?: string;
}

// Credit point to Naira conversion rate
export const CREDIT_TO_NAIRA_RATE = 1.5;

export const useWasteRecords = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Set up real-time subscription for waste records updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('waste-records-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'waste_records',
          filter: `generator_id=eq.${user.id}`
        },
        () => {
          // Invalidate queries when records are updated (e.g., by controllers)
          queryClient.invalidateQueries({ queryKey: ['waste-records'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);
  
  return useQuery({
    queryKey: ['waste-records', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('waste_records')
        .select('*')
        .eq('generator_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as WasteRecord[];
    },
    enabled: !!user
  });
};

export const useCreateWasteRecord = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: CreateWasteRecordData) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data: record, error } = await supabase
        .from('waste_records')
        .insert({
          generator_id: user.id,
          center_id: data.center_id,
          waste_type: data.waste_type,
          weight_kg: data.weight_kg, // Will be 0 initially
          photo_url: data.photo_url,
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      return record;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waste-records'] });
      toast({
        title: "Drop-off submitted successfully!",
        description: "Your waste submission is pending assessment by our controller.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
};

// Helper function to calculate total credit points
export const calculateTotalCredits = (records: WasteRecord[]): number => {
  return records
    .filter(record => record.credits_earned && record.status !== 'pending')
    .reduce((sum, record) => sum + (record.credits_earned || 0), 0);
};

// Helper function to calculate pending credits (estimated)
export const calculatePendingCredits = (records: WasteRecord[]): number => {
  return records
    .filter(record => record.status === 'pending' && record.weight_kg === 0)
    .length * 5; // Rough estimate of 5 points per pending submission
};

// Helper function to convert credits to Naira
export const creditsToNaira = (credits: number): number => {
  return credits * CREDIT_TO_NAIRA_RATE;
};
