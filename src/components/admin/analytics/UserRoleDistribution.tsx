
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RoleData {
  role: string;
  count: number;
  percentage: string;
}

interface UserRoleDistributionProps {
  roleData: RoleData[];
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

const UserRoleDistribution: React.FC<UserRoleDistributionProps> = ({ roleData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Roles Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roleData.map((item, index) => (
            <div key={item.role} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-medium">{item.role}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{item.count}</Badge>
                <span className="text-sm text-gray-500">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleDistribution;
