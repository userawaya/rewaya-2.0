
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Users, Eye, Lock, Unlock, Ban, Activity, Search, Filter } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface UserSession {
  id: string;
  userId: string;
  userName: string;
  device: string;
  location: string;
  lastActivity: string;
  status: 'active' | 'expired';
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

const AdvancedUserManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockSessions: UserSession[] = [
    {
      id: '1',
      userId: 'u1',
      userName: 'John Doe',
      device: 'Chrome on Windows',
      location: 'Lagos, Nigeria',
      lastActivity: '2024-01-15T10:30:00Z',
      status: 'active',
    },
    {
      id: '2',
      userId: 'u2',
      userName: 'Jane Smith',
      device: 'Safari on iPhone',
      location: 'Abuja, Nigeria',
      lastActivity: '2024-01-15T09:15:00Z',
      status: 'active',
    },
  ];

  const mockActivities: UserActivity[] = [
    {
      id: '1',
      userId: 'u1',
      userName: 'John Doe',
      action: 'Login',
      details: 'Successful login',
      timestamp: '2024-01-15T10:30:00Z',
      ipAddress: '192.168.1.1',
    },
    {
      id: '2',
      userId: 'u2',
      userName: 'Jane Smith',
      action: 'Submit Waste',
      details: 'Submitted PET plastic waste',
      timestamp: '2024-01-15T09:45:00Z',
      ipAddress: '192.168.1.2',
    },
  ];

  const handleTerminateSession = (sessionId: string) => {
    toast.success('Session terminated successfully');
  };

  const handleSuspendUser = (userId: string) => {
    toast.success('User suspended successfully');
  };

  const handleActivateUser = (userId: string) => {
    toast.success('User activated successfully');
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Login': return 'bg-blue-100 text-blue-800';
      case 'Logout': return 'bg-gray-100 text-gray-800';
      case 'Submit Waste': return 'bg-green-100 text-green-800';
      case 'Failed Login': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Users className="w-6 h-6 mr-3 text-blue-600" />
          Advanced User Management
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Sessions & Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
              <TabsTrigger value="activity">Activity Logs</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-4 my-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="sessions">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.userName}</TableCell>
                        <TableCell>{session.device}</TableCell>
                        <TableCell>{session.location}</TableCell>
                        <TableCell>{new Date(session.lastActivity).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(session.status)}>
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleTerminateSession(session.id)}
                            >
                              <Lock className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuspendUser(session.userId)}
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.userName}</TableCell>
                        <TableCell>
                          <Badge className={getActionColor(activity.action)}>
                            {activity.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{activity.details}</TableCell>
                        <TableCell className="font-mono text-sm">{activity.ipAddress}</TableCell>
                        <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedUserManager;
