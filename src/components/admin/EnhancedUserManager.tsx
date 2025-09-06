
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useAllProfiles } from '@/hooks/useAllProfiles';
import UserProfileView from './UserProfileView';
import UserProfileEditForm from './UserProfileEditForm';
import UserListFilters from './UserListFilters';
import UserGridView from './UserGridView';
import UserManagementTabs from './UserManagementTabs';
import CreateUserDialog from './CreateUserDialog';

const EnhancedUserManager: React.FC = () => {
  const { data: profiles = [], refetch } = useAllProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'view' | 'edit'>('list');
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || profile.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || (profile.status || 'active') === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const selectedProfile = profiles.find(p => p.id === selectedUser);

  const handleUserView = (userId: string) => {
    setSelectedUser(userId);
    setViewMode('view');
  };

  const handleUserEdit = (userId: string) => {
    setSelectedUser(userId);
    setViewMode('edit');
  };

  const handleBackToList = () => {
    setSelectedUser(null);
    setViewMode('list');
  };

  const handleAddUser = () => {
    setCreateUserDialogOpen(true);
  };

  const handleUserCreated = () => {
    refetch();
  };

  if (viewMode === 'view' && selectedProfile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToList}>
            ← Back to Users
          </Button>
          <h2 className="text-2xl font-bold">User Profile</h2>
        </div>
        <UserProfileView 
          profile={selectedProfile} 
          onEdit={() => setViewMode('edit')}
        />
      </div>
    );
  }

  if (viewMode === 'edit' && selectedProfile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackToList}>
            ← Back to Users
          </Button>
          <h2 className="text-2xl font-bold">Edit User Profile</h2>
        </div>
        <UserProfileEditForm 
          profile={selectedProfile}
          onCancel={handleBackToList}
          onSave={handleBackToList}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enhanced User Management</h2>
          <p className="text-gray-600">Comprehensive user management and analytics</p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <UserManagementTabs>
        <UserListFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <UserGridView
          profiles={filteredProfiles}
          onUserView={handleUserView}
          onUserEdit={handleUserEdit}
        />
      </UserManagementTabs>

      <CreateUserDialog
        open={createUserDialogOpen}
        onOpenChange={setCreateUserDialogOpen}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default EnhancedUserManager;
