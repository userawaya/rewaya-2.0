
-- Add quality_score and credits_earned columns to marshal_waste_deliveries table
ALTER TABLE public.marshal_waste_deliveries 
ADD COLUMN quality_score NUMERIC CHECK (quality_score >= 1 AND quality_score <= 10),
ADD COLUMN credits_earned INTEGER DEFAULT 0;

-- Create trigger to automatically calculate credits for marshal deliveries
CREATE OR REPLACE FUNCTION public.update_marshal_delivery_credits()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Only calculate credits if quality_score is provided and credits haven't been calculated yet
  IF NEW.quality_score IS NOT NULL AND (OLD.credits_earned IS NULL OR OLD.credits_earned = 0) THEN
    NEW.credits_earned := calculate_waste_credits(NEW.waste_type, NEW.weight_kg, NEW.quality_score);
  END IF;
  
  NEW.updated_at := now();
  RETURN NEW;
END;
$function$;

-- Create trigger on marshal_waste_deliveries table
CREATE TRIGGER trigger_update_marshal_delivery_credits
  BEFORE UPDATE ON public.marshal_waste_deliveries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_marshal_delivery_credits();
