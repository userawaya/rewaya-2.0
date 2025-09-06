
-- Function to get user notifications
CREATE OR REPLACE FUNCTION public.get_user_notifications(
  user_id_param UUID,
  limit_param INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  title TEXT,
  message TEXT,
  type TEXT,
  data JSONB,
  read BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT n.id, n.user_id, n.title, n.message, n.type, n.data, n.read, n.created_at
  FROM public.notifications n
  WHERE n.user_id = user_id_param
  ORDER BY n.created_at DESC
  LIMIT limit_param;
$$;

-- Function to mark a notification as read
CREATE OR REPLACE FUNCTION public.mark_notification_read(
  notification_id_param UUID
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  UPDATE public.notifications 
  SET read = true
  WHERE id = notification_id_param
  AND user_id = auth.uid();
$$;

-- Function to mark all notifications as read for a user
CREATE OR REPLACE FUNCTION public.mark_all_notifications_read(
  user_id_param UUID
)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  UPDATE public.notifications 
  SET read = true
  WHERE user_id = user_id_param
  AND user_id = auth.uid()
  AND read = false;
$$;
