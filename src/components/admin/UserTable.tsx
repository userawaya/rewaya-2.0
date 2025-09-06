
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Edit,
  Ban,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  submissions?: number;
  credits?: number;
}

interface UserTableProps {
  users: User[];
  onUserAction: (action: string, userId: string, userName: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUserAction }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'controller': return 'bg-blue-100 text-blue-800';
      case 'driver': return 'bg-green-100 text-green-800';
      case 'recycler': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Users ({users.length})</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">User</th>
                <th className="text-left p-4 font-medium text-gray-900">Role</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
                <th className="text-left p-4 font-medium text-gray-900">Activity</th>
                <th className="text-left p-4 font-medium text-gray-900">Performance</th>
                <th className="text-center p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Phone className="w-3 h-3" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <p className="text-gray-900">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
                      <p className="text-gray-500">Last active: {user.lastActive}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {user.role === 'generator' && (
                      <div className="text-sm">
                        <p className="text-gray-900">{user.submissions} submissions</p>
                        <p className="text-gray-500">{user.credits} credits</p>
                      </div>
                    )}
                    {user.role !== 'generator' && (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUserAction('Edit', user.id, user.name)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.status === 'active' ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onUserAction('Suspend', user.id, user.name)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onUserAction('Activate', user.id, user.name)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTable;
