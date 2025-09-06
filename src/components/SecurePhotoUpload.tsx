
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, X, Shield, AlertTriangle } from 'lucide-react';
import { useSecureFileUpload } from '@/hooks/useSecureFileUpload';
import { cn } from '@/lib/utils';

interface SecurePhotoUploadProps {
  onUpload: (url: string) => void;
  onRemove?: () => void;
  currentUrl?: string;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
}

const SecurePhotoUpload: React.FC<SecurePhotoUploadProps> = ({
  onUpload,
  onRemove,
  currentUrl,
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
  disabled = false
}) => {
  const [dragActive, setDragActive] = useState(false);
  const { uploadFile, uploading } = useSecureFileUpload({ maxSize });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    const url = await uploadFile(file);
    
    if (url) {
      onUpload(url);
    }
  }, [uploadFile, onUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize,
    disabled: disabled || uploading,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Security Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Files are uploaded securely with validation. Only JPEG, PNG, and WebP images up to {Math.round(maxSize / 1024 / 1024)}MB are allowed.
        </AlertDescription>
      </Alert>

      {/* Current Image Display */}
      {currentUrl && (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={currentUrl}
                alt="Uploaded waste photo"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Area */}
      {!currentUrl && (
        <Card className={cn(
          'border-2 border-dashed transition-colors cursor-pointer',
          {
            'border-green-300 bg-green-50': isDragActive,
            'border-gray-300 hover:border-gray-400': !isDragActive && !disabled,
            'border-gray-200 bg-gray-50 cursor-not-allowed': disabled,
          }
        )}>
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <input {...getInputProps()} />
              
              <div className="flex flex-col items-center space-y-2">
                <Upload className={cn(
                  'w-12 h-12',
                  disabled ? 'text-gray-400' : 'text-gray-600'
                )} />
                
                <div className="text-center">
                  <p className={cn(
                    'text-sm font-medium',
                    disabled ? 'text-gray-400' : 'text-gray-700'
                  )}>
                    {uploading ? 'Uploading...' : 'Drop your photo here or click to browse'}
                  </p>
                  <p className={cn(
                    'text-xs',
                    disabled ? 'text-gray-300' : 'text-gray-500'
                  )}>
                    Supports JPEG, PNG, WebP (max {Math.round(maxSize / 1024 / 1024)}MB)
                  </p>
                </div>
              </div>

              {!disabled && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Select File'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {fileRejections.map((rejection, index) => (
              <div key={index}>
                File rejected: {rejection.errors.map(e => e.message).join(', ')}
              </div>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SecurePhotoUpload;
