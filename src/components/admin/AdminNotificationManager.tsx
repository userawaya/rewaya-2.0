
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Send, 
  Users, 
  UserCheck, 
  Filter,
  CheckCircle,
  AlertTriangle,
  Info,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationTemplate {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetRole?: string;
}

const AdminNotificationManager: React.FC = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customMessage, setCustomMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState<string>('all');

  const notificationTemplates: NotificationTemplate[] = [
    {
      id: 'maintenance',
      title: 'System Maintenance',
      message: 'System maintenance is scheduled for tonight at 2:00 AM. Please complete any pending tasks.',
      type: 'warning',
    },
    {
      id: 'new_feature',
      title: 'New Feature Available',
      message: 'Check out our new plastic recycling feature in your dashboard!',
      type: 'info',
    },
    {
      id: 'urgent_assessment',
      title: 'Urgent Assessment Required',
      message: 'Several waste submissions require immediate quality assessment.',
      type: 'warning',
      targetRole: 'controller',
    },
    {
      id: 'pickup_reminder',
      title: 'Pickup Reminder',
      message: 'You have pending pickup requests that need attention.',
      type: 'info',
      targetRole: 'driver',
    },
  ];

  const audienceOptions = [
    { value: 'all', label: 'All Users', count: 247 },
    { value: 'generator', label: 'Generators', count: 156 },
    { value: 'controller', label: 'Controllers', count: 23 },
    { value: 'driver', label: 'Drivers', count: 45 },
    { value: 'recycler', label: 'Recyclers', count: 18 },
    { value: 'admin', label: 'Admins', count: 5 },
  ];

  const handleSendNotification = () => {
    const template = notificationTemplates.find(t => t.id === selectedTemplate);
    const audience = audienceOptions.find(a => a.value === targetAudience);
    
    console.log('Sending notification:', {
      template: template?.title || 'Custom Message',
      message: template?.message || customMessage,
      audience: audience?.label,
      userCount: audience?.count,
    });

    toast({
      title: "Notification Sent",
      description: `Successfully sent to ${audience?.count} ${audience?.label.toLowerCase()}`,
    });

    // Reset form
    setSelectedTemplate('');
    setCustomMessage('');
    setTargetAudience('all');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Send Notification Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5 text-blue-600" />
            <span>Send Notification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Audience Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {audienceOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={targetAudience === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTargetAudience(option.value)}
                  className="justify-between"
                >
                  <span>{option.label}</span>
                  <Badge variant="secondary" className="ml-2">
                    {option.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Quick Templates</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {notificationTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start space-x-2">
                    {getNotificationIcon(template.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{template.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{template.message}</p>
                      {template.targetRole && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {template.targetRole}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-medium mb-2">Custom Message</label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type your custom notification message here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-end space-x-3">
            <Button
              onClick={handleSendNotification}
              disabled={!selectedTemplate && !customMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <span>Recent Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                title: 'System Maintenance Alert',
                message: 'Scheduled maintenance completed successfully',
                time: '2 hours ago',
                type: 'success',
                sent_to: 'All Users (247)',
              },
              {
                title: 'High Pending Assessments',
                message: 'Controllers notified about pending reviews',
                time: '4 hours ago',
                type: 'warning',
                sent_to: 'Controllers (23)',
              },
              {
                title: 'New Feature Announcement',
                message: 'Plastic inventory feature launched',
                time: '1 day ago',
                type: 'info',
                sent_to: 'All Users (247)',
              },
            ].map((notification, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Sent to: {notification.sent_to}</span>
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotificationManager;
