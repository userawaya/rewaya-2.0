
-- Add additional profile fields for enhanced user management
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS profile_completion INTEGER DEFAULT 0;

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  notification_email BOOLEAN DEFAULT true,
  notification_sms BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'UTC',
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Create user_activity table for tracking user actions
CREATE TABLE IF NOT EXISTS public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_preferences
CREATE POLICY "Users can view own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS policies for user_activity (read-only for users, admin access)
CREATE POLICY "Users can view own activity" ON public.user_activity
  FOR SELECT USING (auth.uid() = user_id);

-- Function to calculate profile completion
CREATE OR REPLACE FUNCTION calculate_profile_completion(profile_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  completion_score INTEGER := 0;
  profile_data RECORD;
BEGIN
  SELECT * INTO profile_data FROM public.profiles WHERE id = profile_id;
  
  -- Basic info (40%)
  IF profile_data.full_name IS NOT NULL AND profile_data.full_name != '' THEN
    completion_score := completion_score + 20;
  END IF;
  
  IF profile_data.phone IS NOT NULL AND profile_data.phone != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF profile_data.avatar_url IS NOT NULL AND profile_data.avatar_url != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  -- Additional info (30%)
  IF profile_data.bio IS NOT NULL AND profile_data.bio != '' THEN
    completion_score := completion_score + 15;
  END IF;
  
  IF profile_data.department IS NOT NULL AND profile_data.department != '' THEN
    completion_score := completion_score + 10;
  END IF;
  
  IF profile_data.location IS NOT NULL AND profile_data.location != '' THEN
    completion_score := completion_score + 5;
  END IF;
  
  -- Email verification (30%)
  IF profile_data.email_verified = true THEN
    completion_score := completion_score + 30;
  END IF;
  
  RETURN completion_score;
END;
$$;

-- Trigger to update profile completion
CREATE OR REPLACE FUNCTION update_profile_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.profile_completion := calculate_profile_completion(NEW.id);
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profile_completion_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_completion();
