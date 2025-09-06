
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedProfile } from '@/types/userProfiles';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: Partial<EnhancedProfile> & { id: string }) => {
      console.log('Attempting to update profile with ID:', updates.id);
      
      // First, try to update the profile directly
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.full_name,
          phone: updates.phone,
          bio: updates.bio,
          department: updates.department,
          location: updates.location,
          role: updates.role,
          status: updates.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', updates.id)
        .select()
        .maybeSingle();
      
      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      // If no data returned, it means the profile doesn't exist, so create it
      if (!data) {
        console.log('Profile does not exist, creating new profile');
        const { data: newData, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: updates.id,
            full_name: updates.full_name || '',
            phone: updates.phone,
            bio: updates.bio,
            department: updates.department,
            location: updates.location,
            role: updates.role || 'generator',
            status: updates.status || 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('Error creating profile:', insertError);
          throw insertError;
        }
        
        console.log('Profile created successfully:', newData);
        return newData;
      }
      
      console.log('Profile updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
};
