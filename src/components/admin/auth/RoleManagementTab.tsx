
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface RoleManagementTabProps {
  profiles: any[];
}

const RoleManagementTab: React.FC<RoleManagementTabProps> = ({ profiles }) => {
  const allRoles = [
    'super_admin', 'admin', 'system_admin', 'operations_admin', 'finance_admin',
    'controller', 'driver', 'recycler', 'generator'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Role & Permission Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allRoles.map((role) => {
            const roleUsers = profiles.filter(p => p.role === role);
            const isAdminRole = ['super_admin', 'admin', 'system_admin', 'operations_admin', 'finance_admin'].includes(role);
            return (
              <Card key={role} className={isAdminRole ? 'border-orange-200 bg-orange-50' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold capitalize">
                      {role.replace('_', ' ')}
                    </h4>
                    {isAdminRole && (
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        Admin
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {roleUsers.length} users
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Configure Permissions
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleManagementTab;
