
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export interface AssessmentStats {
  todayAssessments: number;
  todayWeight: number;
  weeklyAssessments: number;
  weeklyWeight: number;
  averageQuality: number;
  creditsIssued: number;
  qualityBreakdown: {
    high: number;
    medium: number;
    low: number;
  };
}

export const useAssessmentStats = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Set up real-time subscription for waste records updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('assessment-stats-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'waste_records',
          filter: `status=eq.sorted`
        },
        () => {
          console.log('Assessment stats: Real-time update detected, invalidating queries');
          // Invalidate stats queries when assessments are completed
          queryClient.invalidateQueries({ queryKey: ['assessment-stats'] });
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
          console.log('Assessment stats: Marshal delivery detected, invalidating queries');
          // Invalidate queries when new marshal deliveries are logged
          queryClient.invalidateQueries({ queryKey: ['assessment-stats'] });
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
          console.log('Assessment stats: Marshal delivery updated, invalidating queries');
          // Invalidate queries when marshal deliveries are updated
          queryClient.invalidateQueries({ queryKey: ['assessment-stats'] });
          queryClient.invalidateQueries({ queryKey: ['assessment-history'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, queryClient]);
  
  return useQuery({
    queryKey: ['assessment-stats', user?.id],
    queryFn: async (): Promise<AssessmentStats> => {
      if (!user) throw new Error('User not authenticated');

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayStart = today.toISOString();

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoStart = weekAgo.toISOString();

      console.log('Assessment stats: Fetching data with date ranges:', {
        todayStart,
        weekAgoStart,
        currentTime: new Date().toISOString()
      });

      try {
        // Fetch waste records data
        const { data: todayWasteData, error: todayWasteError } = await supabase
          .from('waste_records')
          .select('weight_kg, quality_score, credits_earned, updated_at')
          .gte('updated_at', todayStart)
          .not('quality_score', 'is', null);

        if (todayWasteError) {
          console.error('Error fetching today waste data:', todayWasteError);
          throw todayWasteError;
        }

        const { data: weeklyWasteData, error: weeklyWasteError } = await supabase
          .from('waste_records')
          .select('weight_kg, quality_score, credits_earned, updated_at')
          .gte('updated_at', weekAgoStart)
          .not('quality_score', 'is', null);

        if (weeklyWasteError) {
          console.error('Error fetching weekly waste data:', weeklyWasteError);
          throw weeklyWasteError;
        }

        // Fetch marshal delivery data
        const { data: todayMarshalData, error: todayMarshalError } = await supabase
          .from('marshal_waste_deliveries')
          .select('weight_kg, quality_score, credits_earned, created_at')
          .gte('created_at', todayStart);

        if (todayMarshalError) {
          console.error('Error fetching today marshal data:', todayMarshalError);
          throw todayMarshalError;
        }

        const { data: weeklyMarshalData, error: weeklyMarshalError } = await supabase
          .from('marshal_waste_deliveries')
          .select('weight_kg, quality_score, credits_earned, created_at')
          .gte('created_at', weekAgoStart);

        if (weeklyMarshalError) {
          console.error('Error fetching weekly marshal data:', weeklyMarshalError);
          throw weeklyMarshalError;
        }

        console.log('Assessment stats: Today waste data fetched:', todayWasteData);
        console.log('Assessment stats: Today marshal data fetched:', todayMarshalData);
        console.log('Assessment stats: Weekly waste data fetched:', weeklyWasteData);
        console.log('Assessment stats: Weekly marshal data fetched:', weeklyMarshalData);

        // Combine both data sources
        const todayData = [...(todayWasteData || []), ...(todayMarshalData || [])];
        const weeklyData = [...(weeklyWasteData || []), ...(weeklyMarshalData || [])];

        // Calculate statistics
        const todayAssessments = todayData.length;
        const todayWeight = todayData.reduce((sum, record) => sum + (record.weight_kg || 0), 0);
        const weeklyAssessments = weeklyData.length;
        const weeklyWeight = weeklyData.reduce((sum, record) => sum + (record.weight_kg || 0), 0);

        // Calculate average quality for today's assessments
        const todayQualityScores = todayData
          .filter(record => record.quality_score !== null)
          .map(record => record.quality_score);
        
        const averageQuality = todayQualityScores.length > 0 
          ? todayQualityScores.reduce((sum, score) => sum + score, 0) / todayQualityScores.length 
          : 0;

        // Calculate credits issued today
        const creditsIssued = todayData.reduce((sum, record) => sum + (record.credits_earned || 0), 0);

        // Quality breakdown for today
        const qualityBreakdown = {
          high: todayQualityScores.filter(score => score >= 8).length,
          medium: todayQualityScores.filter(score => score >= 5 && score < 8).length,
          low: todayQualityScores.filter(score => score < 5).length,
        };

        const stats: AssessmentStats = {
          todayAssessments,
          todayWeight,
          weeklyAssessments,
          weeklyWeight,
          averageQuality,
          creditsIssued,
          qualityBreakdown,
        };

        console.log('Assessment stats: Calculated stats:', stats);
        return stats;

      } catch (error) {
        console.error('Error in assessment stats:', error);
        throw error;
      }
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  });
};
