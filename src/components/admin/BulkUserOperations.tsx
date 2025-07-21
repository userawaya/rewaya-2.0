
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { EnhancedProfile } from '@/types/userProfiles';
import { useAllProfiles } from '@/hooks/useAllProfiles';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import BulkFiltersPanel from './BulkFiltersPanel';
import BulkActionsPanel from './BulkActionsPanel';
import BulkUsersList from './BulkUsersList';

const BulkUserOperations: React.FC = () => {
  const { toast } = useToast();
  const { data: profiles = [] } = useAllProfiles();
  const updateProfile = useUpdateProfile();
  
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || profile.role === filterRole;
    const matchesStatus = filterStatus === 'all' || profile.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredProfiles.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredProfiles.map(p => p.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedUsers.length === 0) {
      toast({
        title: "Invalid Action",
        description: "Please select users and an action.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updates: Partial<EnhancedProfile> = {};
      
      switch (bulkAction) {
        case 'activate':
          updates.status = 'active';
          break;
        case 'deactivate':
          updates.status = 'inactive';
          break;
        case 'suspend':
          updates.status = 'suspended';
          break;
        case 'verify-email':
          updates.email_verified = true;
          break;
        default:
          throw new Error('Invalid bulk action');
      }

      // Execute bulk updates
      for (const userId of selectedUsers) {
        await updateProfile.mutateAsync({ id: userId, ...updates });
      }

      toast({
        title: "Bulk Action Completed",
        description: `Successfully updated ${selectedUsers.length} users.`,
      });

      setSelectedUsers([]);
      setBulkAction('');
    } catch (error) {
      console.error('Bulk action error:', error);
      toast({
        title: "Error",
        description: "Failed to complete bulk action. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Role', 'Status', 'Email Verified', 'Department', 'Location', 'Created At'].join(','),
      ...filteredProfiles.map(profile => [
        profile.full_name,
        profile.role,
        profile.status || 'active',
        profile.email_verified || false,
        profile.department || '',
        profile.location || '',
        new Date(profile.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Completed",
      description: "User data has been exported to CSV.",
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const handleClearSelection = () => {
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-6">
      <BulkFiltersPanel
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onClearFilters={handleClearFilters}
        onExportUsers={exportUsers}
      />

      <BulkActionsPanel
        selectedUsers={selectedUsers}
        bulkAction={bulkAction}
        setBulkAction={setBulkAction}
        onBulkAction={handleBulkAction}
        onClearSelection={handleClearSelection}
        isProcessing={updateProfile.isPending}
      />

      <BulkUsersList
        profiles={filteredProfiles}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default BulkUserOperations;
