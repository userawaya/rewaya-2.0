
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateFieldMarshal } from '@/hooks/useFieldMarshals';
import { useToast } from '@/hooks/use-toast';

const fieldMarshalSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  nickname: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type FieldMarshalFormData = z.infer<typeof fieldMarshalSchema>;

interface FieldMarshalRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FieldMarshalRegistrationDialog: React.FC<FieldMarshalRegistrationDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const createFieldMarshal = useCreateFieldMarshal();
  
  const form = useForm<FieldMarshalFormData>({
    resolver: zodResolver(fieldMarshalSchema),
    defaultValues: {
      full_name: '',
      nickname: '',
      phone: '',
      notes: '',
    },
  });

  const onSubmit = async (data: FieldMarshalFormData) => {
    try {
      // Ensure full_name is not empty and create the payload with required structure
      const payload = {
        full_name: data.full_name,
        nickname: data.nickname || undefined,
        phone: data.phone || undefined,
        notes: data.notes || undefined,
      };
      
      await createFieldMarshal.mutateAsync(payload);
      toast({
        title: "Success",
        description: "Field marshal registered successfully.",
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register field marshal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register Field Marshal</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              {...form.register('full_name')}
              placeholder="Enter full name"
            />
            {form.formState.errors.full_name && (
              <p className="text-sm text-red-600">
                {form.formState.errors.full_name.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              {...form.register('nickname')}
              placeholder="Enter nickname (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...form.register('phone')}
              placeholder="Enter phone number (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...form.register('notes')}
              placeholder="Additional notes (optional)"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createFieldMarshal.isPending}
            >
              {createFieldMarshal.isPending ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FieldMarshalRegistrationDialog;
