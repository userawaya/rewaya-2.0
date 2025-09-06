
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { wasteSubmissionSchema } from '@/lib/validation';
import { z } from 'zod';
import SecurePhotoUpload from '@/components/SecurePhotoUpload';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSecurity } from '@/components/SecurityProvider';
import { useCollationCenters } from '@/hooks/useCollationCenters';

type WasteSubmissionData = z.infer<typeof wasteSubmissionSchema>;

const wasteTypes = [
  { value: 'PET', label: 'PET Bottles' },
  { value: 'HDPE', label: 'HDPE Containers' },
  { value: 'PVC', label: 'PVC Packaging' },
  { value: 'LDPE', label: 'LDPE Bags' },
  { value: 'PP', label: 'PP Containers' },
  { value: 'PS', label: 'PS Foam' },
  { value: 'OTHER', label: 'Mixed Plastics' }
];

interface WasteSubmissionFormProps {
  onSubmit?: (data: any) => void;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const WasteSubmissionForm: React.FC<WasteSubmissionFormProps> = ({ onSubmit, onSuccess, onCancel }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isRateLimited, logSecurityEvent } = useSecurity();
  const { data: centers, isLoading: centersLoading } = useCollationCenters();
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WasteSubmissionData>({
    resolver: zodResolver(wasteSubmissionSchema),
    defaultValues: {
      waste_type: 'PET',
      weight_kg: 0,
      center_id: '',
      photo_url: '',
    }
  });

  const handleSubmit = async (data: WasteSubmissionData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit waste records",
        variant: "destructive",
      });
      return;
    }

    // Rate limiting check
    if (isRateLimited('submit')) {
      toast({
        title: "Too Many Requests",
        description: "Please wait before submitting again",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      logSecurityEvent('waste_submission_attempt', { 
        userId: user.id, 
        wasteType: data.waste_type 
      });

      // Properly structure the submission data with all required fields
      const submissionData = {
        waste_type: data.waste_type,
        weight_kg: data.weight_kg,
        center_id: data.center_id,
        photo_url: photoUrl || null,
        generator_id: user.id,
        status: 'pending' as const,
      };

      const { error } = await supabase
        .from('waste_records')
        .insert(submissionData);

      if (error) {
        throw error;
      }

      logSecurityEvent('waste_submission_success', { 
        userId: user.id, 
        wasteType: data.waste_type 
      });

      toast({
        title: "Submission Successful",
        description: "Your waste record has been submitted for processing",
      });

      // Reset form
      form.reset();
      setPhotoUrl('');
      
      if (onSubmit) {
        onSubmit(submissionData);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      logSecurityEvent('waste_submission_error', { 
        userId: user.id, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });

      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Waste Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="waste_type">Waste Type</Label>
              <Controller
                name="waste_type"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      {wasteTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.waste_type && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.waste_type.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="weight_kg">Weight (kg)</Label>
              <Input
                id="weight_kg"
                type="number"
                step="0.1"
                min="0.1"
                max="1000"
                {...form.register('weight_kg', { valueAsNumber: true })}
                placeholder="Enter weight in kg"
              />
              {form.formState.errors.weight_kg && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.weight_kg.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="center_id">Collection Center</Label>
            <Controller
              name="center_id"
              control={form.control}
              render={({ field }) => (
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                  disabled={centersLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={centersLoading ? "Loading centers..." : "Select collection center"} />
                  </SelectTrigger>
                  <SelectContent>
                    {centers?.map((center) => (
                      <SelectItem key={center.id} value={center.id}>
                        {center.name} - {center.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.center_id && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.center_id.message}
              </p>
            )}
          </div>

          <div>
            <Label>Photo</Label>
            <SecurePhotoUpload
              onUpload={setPhotoUrl}
              onRemove={() => setPhotoUrl('')}
              currentUrl={photoUrl}
              maxSize={5 * 1024 * 1024} // 5MB
            />
          </div>

          <div className="flex space-x-4">
            <Button 
              type="submit" 
              disabled={isSubmitting || !form.formState.isValid}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Waste Record'}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WasteSubmissionForm;
