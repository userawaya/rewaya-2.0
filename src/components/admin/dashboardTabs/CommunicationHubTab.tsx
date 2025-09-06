
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Bell, Megaphone, HeadphonesIcon, Send, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CommunicationHubTab: React.FC = () => {
  const { toast } = useToast();
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  const mockMessages = [
    { id: 'msg-1', from: 'John Doe (Generator)', subject: 'Question about waste submission', time: '10:30 AM', unread: true },
    { id: 'msg-2', from: 'Jane Smith (Controller)', subject: 'Assessment clarification needed', time: '09:15 AM', unread: false },
    { id: 'msg-3', from: 'Mike Johnson (Driver)', subject: 'Route optimization suggestion', time: 'Yesterday', unread: true },
  ];

  const mockNotifications = [
    { id: 'notif-1', type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance tonight', priority: 'medium' },
    { id: 'notif-2', type: 'alert', title: 'High Volume Alert', message: 'Unusually high submission volume', priority: 'high' },
    { id: 'notif-3', type: 'update', title: 'New Feature Release', message: 'Enhanced quality assessment tools', priority: 'low' },
  ];

  const mockTickets = [
    { id: 'ticket-1', user: 'Sarah Wilson', subject: 'Cannot upload photos', status: 'open', priority: 'high' },
    { id: 'ticket-2', user: 'Tom Brown', subject: 'Credits not reflecting', status: 'in-progress', priority: 'medium' },
    { id: 'ticket-3', user: 'Lisa Davis', subject: 'App performance issues', status: 'resolved', priority: 'low' },
  ];

  const handleSendMessage = (recipient: string, subject: string, message: string) => {
    toast({
      title: "Message Sent",
      description: `Message sent successfully to ${recipient}`,
    });
  };

  const handleSendAnnouncement = (title: string, message: string, audience: string) => {
    toast({
      title: "Announcement Published",
      description: `Announcement sent to ${audience}`,
    });
  };

  const handleTicketUpdate = (ticketId: string, status: string) => {
    toast({
      title: "Ticket Updated",
      description: `Ticket status updated to ${status}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Hub</h2>
          <p className="text-gray-600">Manage internal communications and user support</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {mockMessages.filter(m => m.unread).length} Unread Messages
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {mockTickets.filter(t => t.status === 'open').length} Open Tickets
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Internal Messages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockMessages.map((message) => (
                    <div 
                      key={message.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedThread === message.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      } ${message.unread ? 'border-l-4 border-l-blue-500' : ''}`}
                      onClick={() => setSelectedThread(message.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.from}
                          </h4>
                          <p className="text-sm text-gray-600">{message.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{message.time}</p>
                          {message.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto mt-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compose Message</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-users">All Users</SelectItem>
                      <SelectItem value="controllers">Controllers</SelectItem>
                      <SelectItem value="drivers">Drivers</SelectItem>
                      <SelectItem value="generators">Generators</SelectItem>
                      <SelectItem value="recyclers">Recyclers</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input placeholder="Subject" />

                  <Textarea 
                    placeholder="Type your message..."
                    rows={6}
                  />

                  <Button 
                    className="w-full"
                    onClick={() => handleSendMessage("Selected Users", "Subject", "Message")}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>System Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      <Badge variant={
                        notification.priority === 'high' ? 'destructive' :
                        notification.priority === 'medium' ? 'secondary' : 'outline'
                      }>
                        {notification.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Send Now</Button>
                      <Button size="sm" variant="outline">Schedule</Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <Button>
                    <Bell className="w-4 h-4 mr-2" />
                    Create New Notification
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5" />
                <span>Broadcast Announcements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Create Announcement</h4>
                  <div className="space-y-4">
                    <Input placeholder="Announcement title" />

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="generators">Generators Only</SelectItem>
                        <SelectItem value="controllers">Controllers Only</SelectItem>
                        <SelectItem value="drivers">Drivers Only</SelectItem>
                        <SelectItem value="recyclers">Recyclers Only</SelectItem>
                      </SelectContent>
                    </Select>

                    <Textarea 
                      placeholder="Announcement content..."
                      rows={6}
                    />

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1"
                        onClick={() => handleSendAnnouncement("Title", "Content", "All Users")}
                      >
                        <Megaphone className="w-4 h-4 mr-2" />
                        Publish Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Schedule Later
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Announcements</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">System Update Notification</h5>
                      <p className="text-sm text-gray-600">Sent to: All Users</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">Holiday Schedule Changes</h5>
                      <p className="text-sm text-gray-600">Sent to: Drivers</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium">New Quality Standards</h5>
                      <p className="text-sm text-gray-600">Sent to: Controllers</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HeadphonesIcon className="w-5 h-5" />
                <span>Support Tickets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{ticket.subject}</h4>
                        <p className="text-sm text-gray-600">From: {ticket.user}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          ticket.priority === 'high' ? 'destructive' :
                          ticket.priority === 'medium' ? 'secondary' : 'outline'
                        }>
                          {ticket.priority}
                        </Badge>
                        <Badge variant={
                          ticket.status === 'open' ? 'destructive' :
                          ticket.status === 'in-progress' ? 'secondary' : 'default'
                        }>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        onClick={() => handleTicketUpdate(ticket.id, 'in-progress')}
                      >
                        Respond
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleTicketUpdate(ticket.id, 'resolved')}
                      >
                        Resolve
                      </Button>
                      <Button size="sm" variant="outline">
                        Escalate
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">
                            {mockTickets.filter(t => t.status === 'open').length}
                          </div>
                          <p className="text-sm text-gray-600">Open Tickets</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">
                            {mockTickets.filter(t => t.status === 'in-progress').length}
                          </div>
                          <p className="text-sm text-gray-600">In Progress</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {mockTickets.filter(t => t.status === 'resolved').length}
                          </div>
                          <p className="text-sm text-gray-600">Resolved Today</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationHubTab;
