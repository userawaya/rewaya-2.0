
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users } from 'lucide-react';
import { systemRoles } from './mockData';

const RoleAssignments: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {systemRoles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            View Users
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Select a role to view and manage user assignments within the hierarchy.
        </p>
      </CardContent>
    </Card>
  );
};

export default RoleAssignments;
