
import React from 'react';
import BulkUserOperations from '../BulkUserOperations';
import UserAnalytics from '../UserAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Settings } from 'lucide-react';

const AdvancedUsersTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Advanced User Management</h2>
        <p className="text-gray-600">Advanced analytics and bulk operations for user management</p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="bulk">
            <Settings className="w-4 h-4 mr-2" />
            Bulk Operations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <UserAnalytics />
        </TabsContent>

        <TabsContent value="bulk">
          <BulkUserOperations />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedUsersTab;
