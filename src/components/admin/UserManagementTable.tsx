
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, UserPlus, Eye } from 'lucide-react';
import { useAllProfiles } from '@/hooks/useAllProfiles';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UserManagementTableProps {
  usersByRole: {
    generator: number;
    controller: number;
    driver: number;
    recycler: number;
    admin: number;
  };
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({ usersByRole }) => {
  const { data: profiles = [] } = useAllProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Get user stats from waste records
  const { data: userStats = {} } = useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const { data: wasteRecords } = await supabase
        .from('waste_records')
        .select('generator_id, credits_earned');

      const { data: credits } = await supabase
        .from('credits')
        .select('user_id, amount');

      const stats: Record<string, { submissions: number; credits: number }> = {};

      // Count submissions per user
      wasteRecords?.forEach(record => {
        if (!stats[record.generator_id]) {
          stats[record.generator_id] = { submissions: 0, credits: 0 };
        }
        stats[record.generator_id].submissions += 1;
        stats[record.generator_id].credits += record.credits_earned || 0;
      });

      return stats;
    },
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'controller': return 'bg-blue-100 text-blue-800';
      case 'driver': return 'bg-green-100 text-green-800';
      case 'recycler': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = profiles.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone?.includes(searchTerm);
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>User Management</span>
          </CardTitle>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="generator">Generator ({usersByRole.generator})</SelectItem>
              <SelectItem value="controller">Controller ({usersByRole.controller})</SelectItem>
              <SelectItem value="driver">Driver ({usersByRole.driver})</SelectItem>
              <SelectItem value="recycler">Recycler ({usersByRole.recycler})</SelectItem>
              <SelectItem value="admin">Admin ({usersByRole.admin})</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const stats = userStats[user.id] || { submissions: 0, credits: 0 };
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.full_name}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.phone || 'N/A'}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{stats.submissions} submissions</div>
                        {user.role === 'generator' && (
                          <div className="text-green-600">{stats.credits} credits</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagementTable;
