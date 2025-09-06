
-- Create marshal_waste_deliveries table
CREATE TABLE IF NOT EXISTS public.marshal_waste_deliveries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  marshal_id UUID NOT NULL REFERENCES public.field_marshals(id),
  center_id UUID NOT NULL REFERENCES public.collation_centers(id),
  waste_type waste_type NOT NULL,
  weight_kg NUMERIC NOT NULL CHECK (weight_kg > 0),
  paid_amount NUMERIC CHECK (paid_amount >= 0),
  payment_method TEXT,
  notes TEXT,
  processed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.marshal_waste_deliveries ENABLE ROW LEVEL SECURITY;

-- Create policies for marshal_waste_deliveries table
-- Allow authenticated users to view all deliveries
CREATE POLICY "Allow authenticated users to view deliveries"
  ON public.marshal_waste_deliveries
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to log deliveries
CREATE POLICY "Allow authenticated users to log deliveries"
  ON public.marshal_waste_deliveries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update deliveries
CREATE POLICY "Allow authenticated users to update deliveries"
  ON public.marshal_waste_deliveries
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete deliveries
CREATE POLICY "Allow authenticated users to delete deliveries"
  ON public.marshal_waste_deliveries
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_marshal_waste_deliveries_marshal_id ON public.marshal_waste_deliveries(marshal_id);
CREATE INDEX IF NOT EXISTS idx_marshal_waste_deliveries_center_id ON public.marshal_waste_deliveries(center_id);
CREATE INDEX IF NOT EXISTS idx_marshal_waste_deliveries_processed_by ON public.marshal_waste_deliveries(processed_by);
CREATE INDEX IF NOT EXISTS idx_marshal_waste_deliveries_created_at ON public.marshal_waste_deliveries(created_at);
