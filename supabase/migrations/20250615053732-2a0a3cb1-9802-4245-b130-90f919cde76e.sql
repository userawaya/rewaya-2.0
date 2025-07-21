
-- Create field_marshals table
CREATE TABLE IF NOT EXISTS public.field_marshals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  nickname TEXT,
  phone TEXT,
  notes TEXT,
  registered_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.field_marshals ENABLE ROW LEVEL SECURITY;

-- Create policies for field_marshals table
-- Allow authenticated users to view all field marshals
CREATE POLICY "Allow authenticated users to view field marshals"
  ON public.field_marshals
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert field marshals
CREATE POLICY "Allow authenticated users to register field marshals"
  ON public.field_marshals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update field marshals
CREATE POLICY "Allow authenticated users to update field marshals"
  ON public.field_marshals
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete field marshals (admin only in practice)
CREATE POLICY "Allow authenticated users to delete field marshals"
  ON public.field_marshals
  FOR DELETE
  TO authenticated
  USING (true);

-- Create an index on registered_by for better query performance
CREATE INDEX IF NOT EXISTS idx_field_marshals_registered_by ON public.field_marshals(registered_by);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_field_marshals_status ON public.field_marshals(status);
