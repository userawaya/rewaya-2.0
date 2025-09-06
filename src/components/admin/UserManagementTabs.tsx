
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, BarChart3, Settings, Filter } from 'lucide-react';
import UserAnalytics from './UserAnalytics';
import BulkUserOperations from './BulkUserOperations';

interface UserManagementTabsProps {
  children: React.ReactNode;
}

const UserManagementTabs: React.FC<UserManagementTabsProps> = ({ children }) => {
  return (
    <Tabs defaultValue="users" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="users">
          <Users className="w-4 h-4 mr-2" />
          Users
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="bulk">
          <Settings className="w-4 h-4 mr-2" />
          Bulk Operations
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Filter className="w-4 h-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="users" className="space-y-6">
        {children}
      </TabsContent>

      <TabsContent value="analytics">
        <UserAnalytics />
      </TabsContent>

      <TabsContent value="bulk">
        <BulkUserOperations />
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>User Management Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              User management settings and preferences will be implemented here.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UserManagementTabs;
