
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  totalUsers: number;
  usersByRole: {
    generator: number;
    controller: number;
    driver: number;
    recycler: number;
    admin: number;
  };
  totalWasteProcessed: number;
  totalCreditsIssued: number;
  todaySubmissions: number;
  weeklySubmissions: number;
  averageQualityScore: number;
  activeCenters: number;
  totalCenters: number;
  pendingAssessments: number;
  completedAssessments: number;
  marshalDeliveries: number;
  marshalCreditsIssued: number;
  topPerformers: Array<{
    id: string;
    name: string;
    credits: number;
    submissions: number;
  }>;
}

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async (): Promise<AdminStats> => {
      console.log('Fetching admin analytics...');

      // Get current date for filtering
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayISO = today.toISOString();

      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoISO = weekAgo.toISOString();

      try {
        // Fetch total users count
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('role');

        if (usersError) {
          console.error('Error fetching users:', usersError);
          throw usersError;
        }

        // Calculate users by role
        const usersByRole = {
          generator: 0,
          controller: 0,
          driver: 0,
          recycler: 0,
          admin: 0,
        };

        usersData?.forEach(user => {
          if (user.role in usersByRole) {
            usersByRole[user.role as keyof typeof usersByRole]++;
          }
        });

        // Fetch waste records statistics
        const { data: wasteData, error: wasteError } = await supabase
          .from('waste_records')
          .select('weight_kg, quality_score, credits_earned, created_at, status');

        if (wasteError) {
          console.error('Error fetching waste records:', wasteError);
          throw wasteError;
        }

        // Fetch marshal waste deliveries statistics
        const { data: marshalData, error: marshalError } = await supabase
          .from('marshal_waste_deliveries')
          .select('weight_kg, quality_score, credits_earned, created_at');

        if (marshalError) {
          console.error('Error fetching marshal deliveries:', marshalError);
          throw marshalError;
        }

        // Calculate waste statistics
        const totalWasteProcessed = wasteData?.reduce((sum, record) => sum + (record.weight_kg || 0), 0) || 0;
        const marshalWasteProcessed = marshalData?.reduce((sum, record) => sum + (record.weight_kg || 0), 0) || 0;
        const combinedWasteProcessed = totalWasteProcessed + marshalWasteProcessed;

        const totalCreditsIssued = wasteData?.reduce((sum, record) => sum + (record.credits_earned || 0), 0) || 0;
        const marshalCreditsIssued = marshalData?.reduce((sum, record) => sum + (record.credits_earned || 0), 0) || 0;
        const combinedCreditsIssued = totalCreditsIssued + marshalCreditsIssued;
        
        const todaySubmissions = wasteData?.filter(record => 
          new Date(record.created_at) >= today
        ).length || 0;

        const todayMarshalDeliveries = marshalData?.filter(record => 
          new Date(record.created_at) >= today
        ).length || 0;

        const weeklySubmissions = wasteData?.filter(record => 
          new Date(record.created_at) >= weekAgo
        ).length || 0;

        const weeklyMarshalDeliveries = marshalData?.filter(record => 
          new Date(record.created_at) >= weekAgo
        ).length || 0;

        // Combine quality scores from both sources
        const wasteQualityScores = wasteData?.filter(record => record.quality_score !== null)
          .map(record => record.quality_score) || [];
        const marshalQualityScores = marshalData?.filter(record => record.quality_score !== null)
          .map(record => record.quality_score) || [];
        const allQualityScores = [...wasteQualityScores, ...marshalQualityScores];

        const averageQualityScore = allQualityScores.length > 0 
          ? allQualityScores.reduce((sum, score) => sum + score, 0) / allQualityScores.length 
          : 0;

        const pendingAssessments = wasteData?.filter(record => record.status === 'pending').length || 0;
        const completedAssessments = wasteData?.filter(record => 
          record.status === 'recycled' || record.status === 'delivered'
        ).length || 0;

        // Fetch collation centers data
        const { data: centersData, error: centersError } = await supabase
          .from('collation_centers')
          .select('id, controller_id');

        if (centersError) {
          console.error('Error fetching centers:', centersError);
          throw centersError;
        }

        const totalCenters = centersData?.length || 0;
        const activeCenters = centersData?.filter(center => center.controller_id !== null).length || 0;

        // Get top performers (users with most credits)
        const { data: topPerformersData, error: performersError } = await supabase
          .from('waste_records')
          .select(`
            generator_id,
            credits_earned,
            profiles!waste_records_generator_id_fkey(full_name)
          `)
          .not('credits_earned', 'is', null);

        if (performersError) {
          console.error('Error fetching top performers:', performersError);
        }

        // Group by user and calculate totals
        const userPerformance: Record<string, { name: string; credits: number; submissions: number }> = {};
        
        topPerformersData?.forEach(record => {
          const userId = record.generator_id;
          const userName = record.profiles?.full_name || 'Unknown User';
          
          if (!userPerformance[userId]) {
            userPerformance[userId] = { name: userName, credits: 0, submissions: 0 };
          }
          
          userPerformance[userId].credits += record.credits_earned || 0;
          userPerformance[userId].submissions += 1;
        });

        const topPerformers = Object.entries(userPerformance)
          .map(([id, data]) => ({ id, ...data }))
          .sort((a, b) => b.credits - a.credits)
          .slice(0, 5);

        const stats: AdminStats = {
          totalUsers: usersData?.length || 0,
          usersByRole,
          totalWasteProcessed: Math.round(combinedWasteProcessed * 100) / 100,
          totalCreditsIssued: combinedCreditsIssued,
          todaySubmissions: todaySubmissions + todayMarshalDeliveries,
          weeklySubmissions: weeklySubmissions + weeklyMarshalDeliveries,
          averageQualityScore: Math.round(averageQualityScore * 10) / 10,
          activeCenters,
          totalCenters,
          pendingAssessments,
          completedAssessments,
          marshalDeliveries: marshalData?.length || 0,
          marshalCreditsIssued,
          topPerformers,
        };

        console.log('Admin analytics fetched:', stats);
        return stats;

      } catch (error) {
        console.error('Error in admin analytics:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  });
};
