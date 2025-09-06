
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PerformanceMetrics {
  assessmentCompletionRate: number;
  averageAssessmentTime: number;
  qualityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  productivityScore: number;
  weeklyTrend: number;
}

export const usePerformanceAnalytics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['performance-analytics', user?.id],
    queryFn: async (): Promise<PerformanceMetrics> => {
      if (!user) throw new Error('User not authenticated');

      const today = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      // Fetch current week assessments
      const { data: currentWeekData, error: currentWeekError } = await supabase
        .from('waste_records')
        .select('quality_score, updated_at, created_at')
        .gte('updated_at', weekAgo.toISOString())
        .not('quality_score', 'is', null);

      if (currentWeekError) throw currentWeekError;

      // Fetch previous week assessments for comparison
      const { data: previousWeekData, error: previousWeekError } = await supabase
        .from('waste_records')
        .select('quality_score, updated_at, created_at')
        .gte('updated_at', twoWeeksAgo.toISOString())
        .lt('updated_at', weekAgo.toISOString())
        .not('quality_score', 'is', null);

      if (previousWeekError) throw previousWeekError;

      // Calculate metrics
      const currentAssessments = currentWeekData?.length || 0;
      const previousAssessments = previousWeekData?.length || 0;
      
      // Simulated average assessment time (in practice, you'd track actual times)
      const averageAssessmentTime = 3.5; // minutes
      
      // Quality distribution
      const qualityScores = currentWeekData?.map(record => record.quality_score) || [];
      const qualityDistribution = {
        high: qualityScores.filter(score => score >= 8).length,
        medium: qualityScores.filter(score => score >= 5 && score < 8).length,
        low: qualityScores.filter(score => score < 5).length,
      };

      // Productivity score (based on assessments completed and quality)
      const avgQuality = qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length || 0;
      const productivityScore = Math.round((currentAssessments * 0.7 + avgQuality * 0.3) * 10);

      // Weekly trend
      const weeklyTrend = previousAssessments > 0 
        ? ((currentAssessments - previousAssessments) / previousAssessments) * 100
        : 0;

      return {
        assessmentCompletionRate: 95, // Simulated - would calculate from actual data
        averageAssessmentTime,
        qualityDistribution,
        productivityScore,
        weeklyTrend
      };
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};
