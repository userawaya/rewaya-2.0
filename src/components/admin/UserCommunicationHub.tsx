
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, Send, Mail, Bell, Users, Megaphone, Archive, Eye, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserCommunicationHub: React.FC = () => {
  const { toast } = useToast();
  const [messageType, setMessageType] = useState('email');
  const [recipientGroup, setRecipientGroup] = useState('all');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [sendMessageDialogOpen, setSendMessageDialogOpen] = useState(false);

  const mockMessages = [
    { id: '1', title: 'System Maintenance Notice', type: 'notification', recipients: 'All Users', sent: '2024-06-15 10:00', status: 'delivered', readRate: '85%' },
    { id: '2', title: 'New Feature Announcement', type: 'email', recipients: 'Generators', sent: '2024-06-14 15:30', status: 'delivered', readRate: '92%' },
    { id: '3', title: 'Driver Route Updates', type: 'sms', recipients: 'Drivers', sent: '2024-06-14 08:00', status: 'delivered', readRate: '98%' },
    { id: '4', title: 'Quality Assessment Training', type: 'email', recipients: 'Controllers', sent: '2024-06-13 12:00', status: 'pending', readRate: '45%' },
  ];

  const mockNotificationTemplates = [
    { id: '1', name: 'Welcome New User', category: 'Onboarding', usage: 145 },
    { id: '2', name: 'Waste Collection Reminder', category: 'Operations', usage: 89 },
    { id: '3', name: 'Credit Balance Update', category: 'Finance', usage: 203 },
    { id: '4', name: 'System Maintenance Alert', category: 'System', usage: 12 },
  ];

  const mockFeedback = [
    { id: '1', user: 'john.doe@example.com', subject: 'App Performance Issue', priority: 'high', status: 'open', date: '2024-06-15' },
    { id: '2', user: 'sarah.wilson@example.com', subject: 'Feature Request: Dark Mode', priority: 'medium', status: 'in-progress', date: '2024-06-14' },
    { id: '3', user: 'mike.driver@example.com', subject: 'Route Optimization Suggestion', priority: 'low', status: 'resolved', date: '2024-06-13' },
  ];

  const handleSendMessage = () => {
    if (!messageTitle || !messageContent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `${messageType.toUpperCase()} message sent to ${recipientGroup} users.`,
    });

    setMessageTitle('');
    setMessageContent('');
    setSendMessageDialogOpen(false);
  };

  const handleTemplateAction = (templateId: string, action: string) => {
    toast({
      title: "Template Action",
      description: `Template has been ${action}.`,
    });
  };

  const handleFeedbackAction = (feedbackId: string, action: string) => {
    toast({
      title: "Feedback Updated",
      description: `Feedback status changed to ${action}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Communication Hub</h2>
          <p className="text-gray-600">Manage user communications and feedback</p>
        </div>
        <Dialog open={sendMessageDialogOpen} onOpenChange={setSendMessageDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send New Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Message Type</label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="notification">In-App Notification</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="broadcast">System Broadcast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Recipients</label>
                  <Select value={recipientGroup} onValueChange={setRecipientGroup}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="generators">Generators</SelectItem>
                      <SelectItem value="controllers">Controllers</SelectItem>
                      <SelectItem value="drivers">Drivers</SelectItem>
                      <SelectItem value="recyclers">Recyclers</SelectItem>
                      <SelectItem value="admins">Administrators</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject/Title</label>
                <Input
                  placeholder="Enter message title"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message Content</label>
                <Textarea
                  placeholder="Enter your message content"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={6}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleSendMessage} className="flex-1">
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setSendMessageDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Recent Messages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div key={message.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{message.title}</h4>
                        <p className="text-sm text-gray-600">To: {message.recipients}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={message.type === 'email' ? 'default' : 'secondary'}>
                          {message.type}
                        </Badge>
                        <Badge variant={message.status === 'delivered' ? 'default' : 'secondary'}>
                          {message.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <p>Sent: {message.sent}</p>
                        <p>Read Rate: {message.readRate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Archive className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockNotificationTemplates.map((template) => (
                    <div key={template.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Used {template.usage} times</p>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleTemplateAction(template.id, 'edited')}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleTemplateAction(template.id, 'used')}
                          >
                            Use
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Weekly Newsletter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  System Maintenance Notice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Welcome New Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Feature Announcement
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="broadcasts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5" />
                <span>System Broadcasts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Active System Announcements</h4>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    "System maintenance scheduled for Sunday, 2:00 AM - 4:00 AM. Users may experience temporary service interruptions."
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Edit</Button>
                    <Button size="sm" variant="outline">Deactivate</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Create New Broadcast</h4>
                  <div className="space-y-3">
                    <Input placeholder="Announcement title" />
                    <Textarea placeholder="Announcement content" rows={3} />
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="urgent" />
                        <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="persistent" />
                        <label htmlFor="persistent" className="text-sm">Show until dismissed</label>
                      </div>
                    </div>
                    <Button>Create Broadcast</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{feedback.subject}</h4>
                        <p className="text-sm text-gray-600">From: {feedback.user}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          feedback.priority === 'high' ? 'destructive' :
                          feedback.priority === 'medium' ? 'secondary' : 'default'
                        }>
                          {feedback.priority}
                        </Badge>
                        <Badge variant={
                          feedback.status === 'resolved' ? 'default' :
                          feedback.status === 'in-progress' ? 'secondary' : 'destructive'
                        }>
                          {feedback.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Date: {feedback.date}</p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleFeedbackAction(feedback.id, 'in-progress')}
                        >
                          Assign
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleFeedbackAction(feedback.id, 'resolved')}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserCommunicationHub;
