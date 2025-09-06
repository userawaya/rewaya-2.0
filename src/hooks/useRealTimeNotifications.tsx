
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToastNotifications } from './useToastNotifications';

interface NotificationData {
  id: string;
  type: 'new_submission' | 'high_priority' | 'quality_alert';
  title: string;
  message: string;
  data?: any;
  created_at: string;
}

export const useRealTimeNotifications = () => {
  const { user } = useAuth();
  const { showInfo, showWarning } = useToastNotifications();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('controller-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'waste_records',
          filter: `status=eq.pending`
        },
        (payload) => {
          console.log('New waste submission detected:', payload);
          showInfo('New waste submission received');
          
          const notification: NotificationData = {
            id: payload.new.id,
            type: 'new_submission',
            title: 'New Submission',
            message: `New ${payload.new.waste_type} submission (${payload.new.weight_kg}kg)`,
            data: payload.new,
            created_at: new Date().toISOString()
          };
          
          setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'marshal_waste_deliveries'
        },
        (payload) => {
          console.log('New marshal delivery detected:', payload);
          showInfo('New marshal delivery logged');
          
          const notification: NotificationData = {
            id: payload.new.id,
            type: 'new_submission',
            title: 'Marshal Delivery',
            message: `New marshal delivery: ${payload.new.waste_type} (${payload.new.weight_kg}kg)`,
            data: payload.new,
            created_at: new Date().toISOString()
          };
          
          setNotifications(prev => [notification, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, showInfo, showWarning]);

  const clearNotifications = () => setNotifications([]);
  
  return {
    notifications,
    clearNotifications,
    unreadCount: notifications.length
  };
};
