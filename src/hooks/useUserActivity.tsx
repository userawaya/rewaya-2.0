
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { UserActivity } from '@/types/userProfiles';

export const useUserActivity = (userId?: string, limit = 10) => {
  const { user } = useAuth();
  const targetUserId = userId || user?.id;
  
  return useQuery({
    queryKey: ['user-activity', targetUserId, limit],
    queryFn: async () => {
      if (!targetUserId) return [];
      
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', targetUserId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as UserActivity[];
    },
    enabled: !!targetUserId
  });
};

export const useLogActivity = () => {
  return useMutation({
    mutationFn: async (activity: {
      user_id: string;
      action: string;
      details?: any;
    }) => {
      const { data, error } = await supabase
        .from('user_activity')
        .insert({
          ...activity,
          ip_address: 'unknown',
          user_agent: navigator.userAgent
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  });
};
