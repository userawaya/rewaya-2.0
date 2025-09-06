
-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own waste records" ON public.waste_records;
DROP POLICY IF EXISTS "Controllers can view records from their centers" ON public.waste_records;
DROP POLICY IF EXISTS "Admins can view all waste records" ON public.waste_records;
DROP POLICY IF EXISTS "Users can insert their own waste records" ON public.waste_records;
DROP POLICY IF EXISTS "Controllers can update records from their centers" ON public.waste_records;
DROP POLICY IF EXISTS "Admins can update any waste record" ON public.waste_records;

-- Enable RLS on all tables that don't have it yet (safe approach)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collation_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marshal_waste_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plastic_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_marshals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_hierarchy ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to prevent RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT role IN ('admin', 'super_admin', 'system_admin', 'operations_admin', 'finance_admin')
  FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_controller()
RETURNS boolean AS $$
  SELECT role = 'controller' FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Profiles table policies (with DROP IF EXISTS)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (public.is_admin());

-- Waste records policies (already dropped above)
CREATE POLICY "Users can view their own waste records" ON public.waste_records
  FOR SELECT USING (auth.uid() = generator_id);

CREATE POLICY "Controllers can view records from their centers" ON public.waste_records
  FOR SELECT USING (
    public.is_controller() AND 
    center_id IN (SELECT id FROM public.collation_centers WHERE controller_id = auth.uid())
  );

CREATE POLICY "Admins can view all waste records" ON public.waste_records
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can insert their own waste records" ON public.waste_records
  FOR INSERT WITH CHECK (auth.uid() = generator_id);

CREATE POLICY "Controllers can update records from their centers" ON public.waste_records
  FOR UPDATE USING (
    public.is_controller() AND 
    center_id IN (SELECT id FROM public.collation_centers WHERE controller_id = auth.uid())
  );

CREATE POLICY "Admins can update any waste record" ON public.waste_records
  FOR UPDATE USING (public.is_admin());

-- Collation centers policies
DROP POLICY IF EXISTS "Anyone can view collation centers" ON public.collation_centers;
DROP POLICY IF EXISTS "Controllers can update their own centers" ON public.collation_centers;
DROP POLICY IF EXISTS "Admins can manage all centers" ON public.collation_centers;

CREATE POLICY "Anyone can view collation centers" ON public.collation_centers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Controllers can update their own centers" ON public.collation_centers
  FOR UPDATE USING (auth.uid() = controller_id);

CREATE POLICY "Admins can manage all centers" ON public.collation_centers
  FOR ALL USING (public.is_admin());

-- Credits policies
DROP POLICY IF EXISTS "Users can view their own credits" ON public.credits;
DROP POLICY IF EXISTS "Admins can view all credits" ON public.credits;
DROP POLICY IF EXISTS "System can insert credits" ON public.credits;

CREATE POLICY "Users can view their own credits" ON public.credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all credits" ON public.credits
  FOR SELECT USING (public.is_admin());

CREATE POLICY "System can insert credits" ON public.credits
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for waste photos (safe approach)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('waste-photos', 'waste-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for waste photos (drop existing first)
DROP POLICY IF EXISTS "Users can upload their own waste photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own waste photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own waste photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own waste photos" ON storage.objects;

CREATE POLICY "Users can upload their own waste photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'waste-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own waste photos" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'waste-photos' AND 
    (auth.uid()::text = (storage.foldername(name))[1] OR public.is_admin())
  );

CREATE POLICY "Users can update their own waste photos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'waste-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own waste photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'waste-photos' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
