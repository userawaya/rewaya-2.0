
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

export interface NotificationData {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'waste_status' | 'credit_earned' | 'pickup_scheduled' | 'assessment_complete' | 'system';
  data?: any;
  read: boolean;
  created_at: string;
}

class NotificationService {
  private subscription: any = null;

  async subscribeToNotifications(userId: string, onNotification?: (notification: NotificationData) => void) {
    if (this.subscription) {
      this.unsubscribe();
    }

    console.log('Setting up real-time notifications for user:', userId);

    this.subscription = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          console.log('New notification received:', payload);
          const notification = payload.new as NotificationData;
          
          // Show toast notification
          this.showNotificationToast(notification);
          
          // Call custom handler if provided
          if (onNotification) {
            onNotification(notification);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'waste_records',
          filter: `generator_id=eq.${userId}`
        },
        (payload) => {
          console.log('Waste record updated:', payload);
          const oldRecord = payload.old;
          const newRecord = payload.new;
          
          if (oldRecord.status !== newRecord.status) {
            this.showStatusUpdateToast(newRecord);
          }
        }
      )
      .subscribe();

    return this.subscription;
  }

  private showNotificationToast(notification: NotificationData) {
    const getIcon = (type: string) => {
      switch (type) {
        case 'waste_status': return '♻️';
        case 'credit_earned': return '💰';
        case 'pickup_scheduled': return '🚛';
        case 'assessment_complete': return '✅';
        default: return '🔔';
      }
    };

    toast(notification.title, {
      description: notification.message,
      icon: getIcon(notification.type),
      duration: 5000,
    });
  }

  private showStatusUpdateToast(wasteRecord: any) {
    const statusMessages = {
      sorted: 'Your waste has been sorted and assessed',
      picked_up: 'Your waste has been picked up for delivery',
      delivered: 'Your waste has been delivered to the recycler'
    };

    const message = statusMessages[wasteRecord.status] || 'Status updated';
    
    toast('Submission Status Update', {
      description: `${message} - ID: ${wasteRecord.id.slice(-8)}`,
      icon: '📦',
      duration: 6000,
    });
  }

  unsubscribe() {
    if (this.subscription) {
      supabase.removeChannel(this.subscription);
      this.subscription = null;
    }
  }

  async getNotifications(userId: string, limit = 20): Promise<NotificationData[]> {
    try {
      // Use direct table query since RPC functions aren't in TypeScript types yet
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching notifications:', error);
        return this.getMockNotifications(userId);
      }

      // Cast the data to NotificationData[] to ensure proper typing
      return (data as NotificationData[]) || this.getMockNotifications(userId);
    } catch (error) {
      console.error('Error in getNotifications:', error);
      return this.getMockNotifications(userId);
    }
  }

  private getMockNotifications(userId: string): NotificationData[] {
    return [
      {
        id: '1',
        user_id: userId,
        title: 'Welcome to ReWaya!',
        message: 'Start submitting your waste to earn credits and help the environment.',
        type: 'system',
        read: false,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        user_id: userId,
        title: 'Credits Earned',
        message: 'You earned 25 credits for your PET plastic submission!',
        type: 'credit_earned',
        read: false,
        created_at: new Date(Date.now() - 3600000).toISOString(),
      }
    ];
  }

  async markAsRead(notificationId: string) {
    try {
      // Use direct table update since RPC functions aren't in TypeScript types yet
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
      }
    } catch (error) {
      console.error('Error in markAsRead:', error);
    }
  }

  async markAllAsRead(userId: string) {
    try {
      // Use direct table update since RPC functions aren't in TypeScript types yet
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) {
        console.error('Error marking all notifications as read:', error);
      }
    } catch (error) {
      console.error('Error in markAllAsRead:', error);
    }
  }
}

export const notificationService = new NotificationService();
