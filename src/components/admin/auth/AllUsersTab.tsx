
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Key } from 'lucide-react';

interface AllUsersTabProps {
  filteredUsers: any[];
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onResetPassword: (userId: string) => void;
}

const AllUsersTab: React.FC<AllUsersTabProps> = ({
  filteredUsers,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onResetPassword,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Authentication Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          {filteredUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="font-medium">{user.full_name}</h4>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                  {user.status || 'active'}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onResetPassword(user.id)}
              >
                <Key className="w-4 h-4 mr-1" />
                Reset Password
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllUsersTab;
