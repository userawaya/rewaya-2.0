
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Clock, Monitor, Smartphone, Tablet, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActiveSession {
  id: string;
  user_id: string;
  user_name: string;
  device_type: 'desktop' | 'mobile' | 'tablet';
  ip_address: string;
  location: string;
  last_activity: string;
  created_at: string;
  user_agent: string;
  is_current: boolean;
}

const SessionManager: React.FC = () => {
  const { toast } = useToast();
  const [autoLogoutEnabled, setAutoLogoutEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('120'); // minutes
  const [maxConcurrentSessions, setMaxConcurrentSessions] = useState('3');
  const [forceLogoutSuspicious, setForceLogoutSuspicious] = useState(true);

  const mockActiveSessions: ActiveSession[] = [
    {
      id: '1',
      user_id: 'admin1',
      user_name: 'John Admin',
      device_type: 'desktop',
      ip_address: '192.168.1.100',
      location: 'San Francisco, CA',
      last_activity: '2024-06-15 14:35:22',
      created_at: '2024-06-15 09:15:00',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      is_current: true
    },
    {
      id: '2',
      user_id: 'admin1',
      user_name: 'John Admin',
      device_type: 'mobile',
      ip_address: '192.168.1.101',
      location: 'San Francisco, CA',
      last_activity: '2024-06-15 13:20:15',
      created_at: '2024-06-15 08:30:00',
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      is_current: false
    },
    {
      id: '3',
      user_id: 'admin2',
      user_name: 'Sarah Admin',
      device_type: 'desktop',
      ip_address: '203.0.113.45',
      location: 'Unknown Location',
      last_activity: '2024-06-15 14:30:00',
      created_at: '2024-06-15 14:25:00',
      user_agent: 'Mozilla/5.0 (Linux; Ubuntu)',
      is_current: false
    },
    {
      id: '4',
      user_id: 'sysadmin1',
      user_name: 'Tech Admin',
      device_type: 'tablet',
      ip_address: '192.168.1.75',
      location: 'New York, NY',
      last_activity: '2024-06-15 14:32:10',
      created_at: '2024-06-15 12:00:00',
      user_agent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)',
      is_current: false
    }
  ];

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop': return Monitor;
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const isSessionSuspicious = (session: ActiveSession) => {
    return session.location === 'Unknown Location' || session.ip_address.startsWith('203.');
  };

  const handleTerminateSession = (sessionId: string, userName: string) => {
    toast({
      title: "Session Terminated",
      description: `Session for ${userName} has been terminated.`,
      variant: "destructive",
    });
  };

  const handleTerminateAllSessions = (userId: string, userName: string) => {
    toast({
      title: "All Sessions Terminated",
      description: `All sessions for ${userName} have been terminated.`,
      variant: "destructive",
    });
  };

  const saveSessionSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Session management settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Session Management</h2>
          <p className="text-gray-600">Monitor and control user sessions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Session Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto-logout inactive sessions</label>
                <p className="text-xs text-gray-500">Automatically log out users after inactivity</p>
              </div>
              <Switch checked={autoLogoutEnabled} onCheckedChange={setAutoLogoutEnabled} />
            </div>

            {autoLogoutEnabled && (
              <div>
                <label className="text-sm font-medium">Session timeout (minutes)</label>
                <Input
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="mt-1"
                  min="5"
                  max="480"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Max concurrent sessions per user</label>
              <Select value={maxConcurrentSessions} onValueChange={setMaxConcurrentSessions}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 session</SelectItem>
                  <SelectItem value="2">2 sessions</SelectItem>
                  <SelectItem value="3">3 sessions</SelectItem>
                  <SelectItem value="5">5 sessions</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Force logout suspicious sessions</label>
                <p className="text-xs text-gray-500">Auto-terminate sessions from unknown locations</p>
              </div>
              <Switch checked={forceLogoutSuspicious} onCheckedChange={setForceLogoutSuspicious} />
            </div>

            <Button onClick={saveSessionSettings} className="w-full">
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{mockActiveSessions.length}</div>
                <p className="text-sm text-gray-600">Active Sessions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {new Set(mockActiveSessions.map(s => s.user_id)).size}
                </div>
                <p className="text-sm text-gray-600">Unique Users</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {mockActiveSessions.filter(isSessionSuspicious).length}
                </div>
                <p className="text-sm text-gray-600">Suspicious</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {mockActiveSessions.filter(s => s.device_type === 'mobile').length}
                </div>
                <p className="text-sm text-gray-600">Mobile Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockActiveSessions.map((session) => {
                const DeviceIcon = getDeviceIcon(session.device_type);
                const suspicious = isSessionSuspicious(session);
                
                return (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.user_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <DeviceIcon className="w-4 h-4" />
                        <span className="capitalize">{session.device_type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{session.location}</p>
                        <p className="text-xs text-gray-500 font-mono">{session.ip_address}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{session.last_activity}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">5h 20m</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {session.is_current && (
                          <Badge variant="default">Current</Badge>
                        )}
                        {suspicious && (
                          <Badge variant="destructive" className="flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Suspicious</span>
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleTerminateSession(session.id, session.user_name)}
                          disabled={session.is_current}
                        >
                          <LogOut className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleTerminateAllSessions(session.user_id, session.user_name)}
                        >
                          Terminate All
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManager;
