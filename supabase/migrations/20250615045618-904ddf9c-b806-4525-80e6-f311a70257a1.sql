
-- Create a role hierarchy table to define permissions and relationships
CREATE TABLE IF NOT EXISTS public.role_hierarchy (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role user_role NOT NULL,
  can_manage_roles user_role[] DEFAULT '{}',
  permissions TEXT[] DEFAULT '{}',
  hierarchy_level INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert role hierarchy data
INSERT INTO public.role_hierarchy (role, can_manage_roles, permissions, hierarchy_level) VALUES
('super_admin', '{admin,system_admin,operations_admin,finance_admin,controller,driver,recycler,generator}', '{all}', 0),
('system_admin', '{controller,driver,recycler,generator}', '{user_management,system_monitoring,backup_recovery}', 1),
('operations_admin', '{driver,controller}', '{collection_scheduling,waste_flow,logistics,centers}', 2),
('finance_admin', '{recycler,generator}', '{financial_management,credits_system,reports}', 2),
('admin', '{controller,driver,recycler,generator}', '{user_management,analytics,reports}', 1)
ON CONFLICT DO NOTHING;

-- Create function to check if a user can manage another role
CREATE OR REPLACE FUNCTION public.can_manage_role(manager_role user_role, target_role user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT target_role = ANY(
    SELECT unnest(can_manage_roles) 
    FROM public.role_hierarchy 
    WHERE role = manager_role
  ) OR manager_role = 'super_admin'::user_role;
$$;

-- Create function to check if a user has a specific permission
CREATE OR REPLACE FUNCTION public.has_permission(user_id UUID, permission TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 'all' = ANY(
    SELECT unnest(permissions) 
    FROM public.role_hierarchy rh
    JOIN public.profiles p ON p.role = rh.role
    WHERE p.id = user_id
  ) OR permission = ANY(
    SELECT unnest(permissions) 
    FROM public.role_hierarchy rh
    JOIN public.profiles p ON p.role = rh.role
    WHERE p.id = user_id
  );
$$;

-- Create function to get user role hierarchy level
CREATE OR REPLACE FUNCTION public.get_user_hierarchy_level(user_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT COALESCE(rh.hierarchy_level, 999)
  FROM public.profiles p
  LEFT JOIN public.role_hierarchy rh ON p.role = rh.role
  WHERE p.id = user_id;
$$;

-- Enable RLS on role_hierarchy table
ALTER TABLE public.role_hierarchy ENABLE ROW LEVEL SECURITY;

-- Create policy for role_hierarchy - only super_admins can modify
CREATE POLICY "Super admins can manage role hierarchy" 
  ON public.role_hierarchy 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Create policy for viewing role hierarchy - all admins can view
CREATE POLICY "Admins can view role hierarchy" 
  ON public.role_hierarchy 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'system_admin', 'operations_admin', 'finance_admin')
    )
  );
