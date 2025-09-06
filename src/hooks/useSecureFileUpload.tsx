
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { validateFile } from '@/lib/validation';

interface SecureFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  bucket?: string;
}

export const useSecureFileUpload = (options: SecureFileUploadOptions = {}) => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    bucket = 'waste-photos'
  } = options;

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to upload files",
        variant: "destructive",
      });
      return null;
    }

    // Validate file
    const validationError = validateFile(file, { maxSize, allowedTypes });
    if (validationError) {
      toast({
        title: "File validation failed",
        description: validationError,
        variant: "destructive",
      });
      return null;
    }

    setUploading(true);
    
    try {
      // Create secure file path with user ID
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      console.log('File uploaded successfully:', fileName);
      
      toast({
        title: "Upload successful",
        description: "File has been uploaded securely",
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Secure file upload error:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file securely",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (fileName: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to delete files",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) throw error;

      toast({
        title: "File deleted",
        description: "File has been deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('File deletion error:', error);
      toast({
        title: "Deletion failed",
        description: error instanceof Error ? error.message : "Failed to delete file",
        variant: "destructive",
      });
      return false;
    }
  };

  return { uploadFile, deleteFile, uploading };
};
