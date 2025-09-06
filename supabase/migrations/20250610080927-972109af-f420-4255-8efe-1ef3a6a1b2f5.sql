
-- Check if storage policies exist and create only the missing ones
-- First, let's create the policies (these will fail gracefully if they already exist)

-- Policy for authenticated users to upload photos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can upload waste photos'
  ) THEN
    CREATE POLICY "Users can upload waste photos" ON storage.objects
    FOR INSERT WITH CHECK (
      bucket_id = 'waste-photos' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END
$$;

-- Policy for public read access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public can view waste photos'
  ) THEN
    CREATE POLICY "Public can view waste photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'waste-photos');
  END IF;
END
$$;

-- Policy for users to update their own photos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can update their own waste photos'
  ) THEN
    CREATE POLICY "Users can update their own waste photos" ON storage.objects
    FOR UPDATE USING (
      bucket_id = 'waste-photos' 
      AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END
$$;

-- Policy for users to delete their own photos
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Users can delete their own waste photos'
  ) THEN
    CREATE POLICY "Users can delete their own waste photos" ON storage.objects
    FOR DELETE USING (
      bucket_id = 'waste-photos' 
      AND auth.uid()::text = (storage.foldername(name))[1]
    );
  END IF;
END
$$;
