
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bell, Send, Users, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  recipients: 'all' | 'generators' | 'controllers' | 'drivers' | 'recyclers';
  status: 'sent' | 'scheduled' | 'draft';
  createdAt: string;
  sentCount?: number;
}

const NotificationManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'success' | 'error'>('info');
  const [recipients, setRecipients] = useState<'all' | 'generators' | 'controllers' | 'drivers' | 'recyclers'>('all');

  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM.',
      type: 'warning',
      recipients: 'all',
      status: 'sent',
      createdAt: '2024-01-15T10:30:00Z',
      sentCount: 156,
    },
    {
      id: '2',
      title: 'New Quality Standards',
      message: 'Updated quality assessment standards are now in effect.',
      type: 'info',
      recipients: 'controllers',
      status: 'sent',
      createdAt: '2024-01-14T14:20:00Z',
      sentCount: 23,
    },
  ];

  const handleSendNotification = () => {
    if (!title || !message) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Notification sent successfully!');
    setTitle('');
    setMessage('');
    setType('info');
    setRecipients('all');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Bell className="w-6 h-6 mr-3 text-blue-600" />
          Notification Manager
        </h2>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'create' ? 'default' : 'outline'}
            onClick={() => setActiveTab('create')}
            size="sm"
          >
            Create Notification
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
            size="sm"
          >
            Notification History
          </Button>
        </div>
      </div>

      {activeTab === 'create' && (
        <Card>
          <CardHeader>
            <CardTitle>Send New Notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Notification Type</label>
                <Select value={type} onValueChange={(value: any) => setType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Recipients</label>
                <Select value={recipients} onValueChange={(value: any) => setRecipients(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="generators">Generators Only</SelectItem>
                    <SelectItem value="controllers">Controllers Only</SelectItem>
                    <SelectItem value="drivers">Drivers Only</SelectItem>
                    <SelectItem value="recyclers">Recyclers Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notification title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notification message"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleSendNotification}>
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>Notification History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent Count</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(notification.type)}
                        <Badge className={getTypeBadgeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{notification.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{notification.recipients}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={notification.status === 'sent' ? 'default' : 'secondary'}>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{notification.sentCount || 0}</TableCell>
                    <TableCell>{new Date(notification.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationManager;
