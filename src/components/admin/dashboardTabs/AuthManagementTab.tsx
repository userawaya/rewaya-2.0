
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAllProfiles } from '@/hooks/useAllProfiles';
import { useToast } from '@/hooks/use-toast';
import PendingApprovalsTab from '../auth/PendingApprovalsTab';
import AllUsersTab from '../auth/AllUsersTab';
import RoleManagementTab from '../auth/RoleManagementTab';
import SecuritySettingsTab from '../auth/SecuritySettingsTab';

const AuthManagementTab: React.FC = () => {
  const { data: profiles = [] } = useAllProfiles();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const pendingUsers = profiles.filter(p => p.status === 'pending');
  const filteredUsers = profiles.filter(profile => {
    const matchesSearch = profile.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || profile.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveUser = (userId: string) => {
    toast({
      title: "User Approved",
      description: "User account has been approved and activated.",
    });
  };

  const handleRejectUser = (userId: string) => {
    toast({
      title: "User Rejected",
      description: "User account has been rejected.",
      variant: "destructive",
    });
  };

  const handleResetPassword = (userId: string) => {
    toast({
      title: "Password Reset",
      description: "Password reset email has been sent to user.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Authentication Management</h2>
          <p className="text-gray-600">Manage user registrations, permissions, and authentication</p>
        </div>
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
          {pendingUsers.length} Pending Approvals
        </Badge>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <PendingApprovalsTab
            pendingUsers={pendingUsers}
            onApproveUser={handleApproveUser}
            onRejectUser={handleRejectUser}
          />
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <AllUsersTab
            filteredUsers={filteredUsers}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            onResetPassword={handleResetPassword}
          />
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <RoleManagementTab profiles={profiles} />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthManagementTab;
