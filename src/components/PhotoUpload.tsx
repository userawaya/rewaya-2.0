
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, X } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';

interface PhotoUploadProps {
  photoUrl?: string;
  onPhotoUploaded: (url: string) => void;
  onPhotoRemoved: () => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photoUrl,
  onPhotoUploaded,
  onPhotoRemoved
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, uploading } = useFileUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const uploadedUrl = await uploadFile(file);
    if (uploadedUrl) {
      onPhotoUploaded(uploadedUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (photoUrl) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <img
              src={photoUrl}
              alt="Waste photo"
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={onPhotoRemoved}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-3 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleButtonClick}
              disabled={uploading}
            >
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Add Photo of Waste
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Take a clear photo to help with quality assessment
          </p>
          <Button
            type="button"
            onClick={handleButtonClick}
            disabled={uploading}
            className="bg-green-600 hover:bg-green-700"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Choose Photo
              </>
            )}
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
