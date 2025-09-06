
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAllProfiles } from '@/hooks/useAllProfiles';
import UserStatsHeader from './UserStatsHeader';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog';

const AdminUserManager: React.FC = () => {
  const { toast } = useToast();
  const { data: profiles = [], refetch } = useAllProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);

  // Transform profiles to user format for the table
  const users = profiles.map(profile => ({
    id: profile.id,
    name: profile.full_name,
    email: profile.id, // We don't have email in profiles, using ID as placeholder
    phone: profile.phone,
    role: profile.role,
    status: (profile.status as 'active' | 'suspended' | 'pending') || 'active',
    joinDate: profile.created_at,
    lastActive: profile.last_login ? new Date(profile.last_login).toLocaleDateString() : 'Never',
    submissions: 0, // Would need to query waste_records to get this
    credits: 0, // Would need to query credits table to get this
  }));

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserAction = (action: string, userId: string, userName: string) => {
    console.log(`${action} user:`, userId);
    
    toast({
      title: `User ${action}`,
      description: `${userName} has been ${action.toLowerCase()}`,
    });
  };

  const handleAddUser = () => {
    setCreateUserDialogOpen(true);
  };

  const handleUserCreated = () => {
    refetch();
    toast({
      title: "Success",
      description: "User has been created successfully",
    });
  };

  return (
    <div className="space-y-6">
      <UserStatsHeader 
        userCount={filteredUsers.length}
        onAddUser={handleAddUser}
      />

      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      <UserTable
        users={filteredUsers}
        onUserAction={handleUserAction}
      />

      <CreateUserDialog
        open={createUserDialogOpen}
        onOpenChange={setCreateUserDialogOpen}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default AdminUserManager;
