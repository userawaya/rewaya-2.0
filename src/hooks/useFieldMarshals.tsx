
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface FieldMarshal {
  id: string;
  full_name: string;
  nickname?: string;
  phone?: string;
  notes?: string;
  status: string;
  registered_by?: string;
  created_at: string;
  updated_at: string;
}

export const useFieldMarshals = () => {
  return useQuery({
    queryKey: ['field-marshals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('field_marshals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching field marshals:', error);
        throw error;
      }
      
      return data as FieldMarshal[];
    }
  });
};

export const useCreateFieldMarshal = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (marshalData: {
      full_name: string;
      nickname?: string;
      phone?: string;
      notes?: string;
    }) => {
      const { data, error } = await supabase
        .from('field_marshals')
        .insert([
          {
            ...marshalData,
            registered_by: user?.id,
          },
        ])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field-marshals'] });
    }
  });
};

export const useUpdateFieldMarshal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<FieldMarshal> & { id: string }) => {
      const { data, error } = await supabase
        .from('field_marshals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field-marshals'] });
    }
  });
};
