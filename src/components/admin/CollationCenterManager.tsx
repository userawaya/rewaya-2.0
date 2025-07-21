
import React, { useState } from 'react';
import { useCollationCenters } from '@/hooks/useCollationCenters';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import CollationCenterHeader from './CollationCenterHeader';
import CollationCenterSearchBar from './CollationCenterSearchBar';
import CollationCenterForm from './CollationCenterForm';
import CollationCenterCard from './CollationCenterCard';
import CollationCenterSummary from './CollationCenterSummary';

const CollationCenterManager: React.FC = () => {
  const { data: centers, isLoading } = useCollationCenters();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    capacity_kg: '',
    controller_id: '',
  });

  const createCenterMutation = useMutation({
    mutationFn: async (centerData: typeof newCenter) => {
      const { data, error } = await supabase
        .from('collation_centers')
        .insert([{
          name: centerData.name,
          address: centerData.address,
          capacity_kg: parseInt(centerData.capacity_kg),
          controller_id: centerData.controller_id || null,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collation-centers'] });
      toast({
        title: "Center Added",
        description: `${newCenter.name} has been successfully added.`,
      });
      setShowAddForm(false);
      setNewCenter({ name: '', address: '', capacity_kg: '', controller_id: '' });
    },
    onError: (error) => {
      console.error('Error creating center:', error);
      toast({
        title: "Error",
        description: "Failed to create collation center.",
        variant: "destructive",
      });
    },
  });

  const deleteCenterMutation = useMutation({
    mutationFn: async (centerId: string) => {
      const { error } = await supabase
        .from('collation_centers')
        .delete()
        .eq('id', centerId);

      if (error) throw error;
    },
    onSuccess: (_, centerId) => {
      queryClient.invalidateQueries({ queryKey: ['collation-centers'] });
      const centerName = centers?.find(c => c.id === centerId)?.name || 'Center';
      toast({
        title: "Center Deleted",
        description: `${centerName} has been removed from the system.`,
        variant: "destructive",
      });
    },
    onError: (error) => {
      console.error('Error deleting center:', error);
      toast({
        title: "Error",
        description: "Failed to delete collation center.",
        variant: "destructive",
      });
    },
  });

  const filteredCenters = centers?.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAddCenter = () => {
    if (!newCenter.name || !newCenter.address || !newCenter.capacity_kg) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    createCenterMutation.mutate(newCenter);
  };

  const handleDeleteCenter = (centerId: string, centerName: string) => {
    if (window.confirm(`Are you sure you want to delete ${centerName}?`)) {
      deleteCenterMutation.mutate(centerId);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CollationCenterHeader onAddCenter={() => setShowAddForm(true)} />

      <CollationCenterSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <CollationCenterForm
        isVisible={showAddForm}
        formData={newCenter}
        onFormDataChange={setNewCenter}
        onSubmit={handleAddCenter}
        onCancel={() => setShowAddForm(false)}
        isLoading={createCenterMutation.isPending}
      />

      {/* Centers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <CollationCenterCard
            key={center.id}
            center={center}
            onDelete={handleDeleteCenter}
          />
        ))}
      </div>

      {filteredCenters.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No centers found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first collation center.'}
          </p>
        </div>
      )}

      <CollationCenterSummary centers={centers} />
    </div>
  );
};

export default CollationCenterManager;
