
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileSearch, Search, Download, Filter, Clock, User, Shield } from 'lucide-react';

const AuditLogsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const mockAuditLogs = [
    {
      id: 'log-1',
      timestamp: '2024-06-15 14:30:22',
      user: 'admin@rewaya.com',
      action: 'USER_CREATED',
      resource: 'User: john.doe@example.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0.4472.124',
      status: 'success',
      details: 'Created new generator user account'
    },
    {
      id: 'log-2',
      timestamp: '2024-06-15 14:25:15',
      user: 'admin@rewaya.com',
      action: 'WASTE_ASSESSED',
      resource: 'Waste Record: WR-2024-001234',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0.4472.124',
      status: 'success',
      details: 'Quality assessment completed for PET waste'
    },
    {
      id: 'log-3',
      timestamp: '2024-06-15 14:20:08',
      user: 'controller@rewaya.com',
      action: 'LOGIN_FAILED',
      resource: 'Authentication System',
      ipAddress: '192.168.1.105',
      userAgent: 'Firefox/89.0',
      status: 'failed',
      details: 'Invalid password attempt'
    },
    {
      id: 'log-4',
      timestamp: '2024-06-15 14:15:33',
      user: 'admin@rewaya.com',
      action: 'SYSTEM_CONFIG_UPDATED',
      resource: 'Pricing Configuration',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0.4472.124',
      status: 'success',
      details: 'Updated PET base pricing from 1200 to 1250 ₦/kg'
    },
    {
      id: 'log-5',
      timestamp: '2024-06-15 14:10:45',
      user: 'fieldmarshal@rewaya.com',
      action: 'COLLECTION_SCHEDULED',
      resource: 'Collection: COL-2024-5678',
      ipAddress: '192.168.1.110',
      userAgent: 'Mobile App v2.1.0',
      status: 'success',
      details: 'Scheduled waste collection for Lagos Center'
    }
  ];

  const getActionBadgeColor = (action: string) => {
    switch (action.split('_')[0]) {
      case 'USER':
        return 'bg-blue-100 text-blue-800';
      case 'WASTE':
        return 'bg-green-100 text-green-800';
      case 'LOGIN':
      case 'LOGOUT':
        return 'bg-purple-100 text-purple-800';
      case 'SYSTEM':
        return 'bg-orange-100 text-orange-800';
      case 'COLLECTION':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'success' ? 'default' : 'destructive';
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action.includes(filterAction.toUpperCase());
    const matchesUser = filterUser === 'all' || log.user.includes(filterUser);
    
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
          <p className="text-gray-600">Track all system activities and user actions</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-blue-600">1,247</p>
              </div>
              <FileSearch className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Actions</p>
                <p className="text-2xl font-bold text-red-600">23</p>
              </div>
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Events</p>
                <p className="text-2xl font-bold text-purple-600">156</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="user">User Actions</SelectItem>
                <SelectItem value="waste">Waste Actions</SelectItem>
                <SelectItem value="login">Authentication</SelectItem>
                <SelectItem value="system">System Changes</SelectItem>
                <SelectItem value="collection">Collections</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterUser} onValueChange={setFilterUser}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="controller">Controllers</SelectItem>
                <SelectItem value="fieldmarshal">Field Marshals</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={getActionBadgeColor(log.action)}>
                        {log.action.replace(/_/g, ' ')}
                      </Badge>
                      <Badge variant={getStatusBadge(log.status)}>
                        {log.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{log.timestamp}</span>
                    </div>
                    <div className="mb-2">
                      <p className="font-medium text-gray-900">{log.resource}</p>
                      <p className="text-sm text-gray-600">{log.details}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>User: {log.user}</span>
                      <span className="mx-2">•</span>
                      <span>IP: {log.ipAddress}</span>
                      <span className="mx-2">•</span>
                      <span>{log.userAgent}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogsTab;
