
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { AssessmentHistory } from './types/assessmentTypes';

export const useAssessmentHistory = (limit = 10) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Set up real-time subscription for assessment history updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('assessment-history-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'waste_records',
          filter: `status=eq.sorted`
        },
        () => {
          console.log('Assessment history: Real-time update detected, invalidating queries');
          // Invalidate history queries when new assessments are completed
          queryClient.invalidateQueries({ queryKey: ['assessment-history'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'marshal_waste_deliveries'
        },
        () => {
          console.log('Assessment history: Marshal delivery detected, invalidating queries');
          // Invalidate history queries when new marshal deliveries are logged
          queryClient.invalidateQueries({ queryKey: ['assessment-history'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'marshal_waste_deliveries'
        },
        () => {
          console.log('Assessment history: Marshal delivery updated, invalidating queries');
          // Invalidate history queries when marshal deliveries are updated (e.g., quality assessed)
          queryClient.invalidateQueries({ queryKey: ['assessment-history'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);
  
  return useQuery({
    queryKey: ['assessment-history', user?.id, limit],
    queryFn: async () => {
      if (!user) return [];

      console.log('Assessment history: Fetching recent assessments and deliveries, limit:', limit);

      // Fetch waste assessments
      const { data: assessmentData, error: assessmentError } = await supabase
        .from('waste_records')
        .select(`
          id,
          waste_type,
          weight_kg,
          quality_score,
          credits_earned,
          updated_at,
          profiles!waste_records_generator_id_fkey(full_name)
        `)
        .eq('status', 'sorted')
        .not('quality_score', 'is', null)
        .order('updated_at', { ascending: false })
        .limit(Math.ceil(limit / 2));

      if (assessmentError) {
        console.error('Assessment history: Error fetching assessment data:', assessmentError);
        throw assessmentError;
      }

      // Fetch marshal deliveries with quality and credits
      const { data: deliveryData, error: deliveryError } = await supabase
        .from('marshal_waste_deliveries')
        .select(`
          id,
          waste_type,
          weight_kg,
          quality_score,
          credits_earned,
          created_at,
          field_marshals!marshal_waste_deliveries_marshal_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(Math.ceil(limit / 2));

      if (deliveryError) {
        console.error('Assessment history: Error fetching delivery data:', deliveryError);
        throw deliveryError;
      }

      console.log('Assessment history: Assessment data fetched:', assessmentData);
      console.log('Assessment history: Delivery data fetched:', deliveryData);

      // Combine and format the data
      const assessments: AssessmentHistory[] = (assessmentData || []).map(record => ({
        id: record.id,
        waste_type: record.waste_type,
        weight_kg: record.weight_kg,
        quality_score: record.quality_score || 0,
        credits_earned: record.credits_earned || 0,
        generator_name: record.profiles?.full_name || 'Unknown',
        created_at: record.updated_at,
        type: 'assessment' as const
      }));

      const deliveries: AssessmentHistory[] = (deliveryData || []).map(record => ({
        id: record.id,
        waste_type: record.waste_type,
        weight_kg: record.weight_kg,
        quality_score: record.quality_score || 0,
        credits_earned: record.credits_earned || 0,
        generator_name: record.field_marshals?.full_name || 'Unknown Marshal',
        created_at: record.created_at,
        type: 'marshal_delivery' as const
      }));

      // Combine and sort by date
      const combined = [...assessments, ...deliveries]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, limit);

      return combined;
    },
    enabled: !!user,
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    retryDelay: 1000
  });
};
