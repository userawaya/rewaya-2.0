
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import RoleHierarchy from './roles/RoleHierarchy';
import PermissionsMatrix from './roles/PermissionsMatrix';
import RoleAssignments from './roles/RoleAssignments';
import CreateRoleDialog from './roles/CreateRoleDialog';

const UserRolesManager: React.FC = () => {
  const { toast } = useToast();

  const handleCreateRole = (roleName: string) => {
    toast({
      title: "Role Created",
      description: `Role "${roleName}" has been created successfully.`,
    });
  };

  const handleDeleteRole = (roleName: string) => {
    toast({
      title: "Role Deleted",
      description: `Role "${roleName}" has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Role & Permission Management</h2>
          <p className="text-gray-600">Manage user roles and system permissions hierarchy</p>
        </div>
        <CreateRoleDialog onCreateRole={handleCreateRole} />
      </div>

      <Tabs defaultValue="hierarchy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="hierarchy">Role Hierarchy</TabsTrigger>
          <TabsTrigger value="permissions">Permissions Matrix</TabsTrigger>
          <TabsTrigger value="assignments">User Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="hierarchy">
          <RoleHierarchy onDeleteRole={handleDeleteRole} />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionsMatrix />
        </TabsContent>

        <TabsContent value="assignments">
          <RoleAssignments />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserRolesManager;
