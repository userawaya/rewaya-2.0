
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  Download, 
  RefreshCw, 
  Settings, 
  BarChart3, 
  Bell,
  Database,
  Shield
} from 'lucide-react';

const AdminQuickActions: React.FC = () => {
  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: UserPlus,
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 border-blue-200',
      action: () => console.log('Add new user'),
    },
    {
      title: 'Generate Report',
      description: 'Create system analytics report',
      icon: BarChart3,
      color: 'bg-gradient-to-br from-green-50 to-green-100 text-green-700 hover:from-green-100 hover:to-green-200 border-green-200',
      action: () => console.log('Generate report'),
    },
    {
      title: 'Export Data',
      description: 'Download system data',
      icon: Download,
      color: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 hover:from-purple-100 hover:to-purple-200 border-purple-200',
      action: () => console.log('Export data'),
    },
    {
      title: 'System Refresh',
      description: 'Refresh all data caches',
      icon: RefreshCw,
      color: 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 hover:from-amber-100 hover:to-amber-200 border-amber-200',
      action: () => console.log('System refresh'),
    },
    {
      title: 'Send Notifications',
      description: 'Broadcast to all users',
      icon: Bell,
      color: 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 hover:from-red-100 hover:to-red-200 border-red-200',
      action: () => console.log('Send notifications'),
    },
    {
      title: 'Database Backup',
      description: 'Create manual backup',
      icon: Database,
      color: 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700 hover:from-indigo-100 hover:to-indigo-200 border-indigo-200',
      action: () => console.log('Database backup'),
    },
    {
      title: 'Security Scan',
      description: 'Run security audit',
      icon: Shield,
      color: 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 hover:from-orange-100 hover:to-orange-200 border-orange-200',
      action: () => console.log('Security scan'),
    },
    {
      title: 'System Settings',
      description: 'Configure system parameters',
      icon: Settings,
      color: 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-gray-100 hover:to-gray-200 border-gray-200',
      action: () => console.log('System settings'),
    },
  ];

  return (
    <Card className="border-2 border-gray-200 shadow-xl bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
            <Settings className="w-6 h-6 text-green-600" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant="ghost"
                className={`h-auto p-6 flex flex-col items-center space-y-3 ${action.color} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group border-2 rounded-2xl`}
                onClick={action.action}
              >
                <div className="p-3 bg-white/60 rounded-xl group-hover:bg-white/80 transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-7 h-7 transition-transform duration-300" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm mb-1">{action.title}</div>
                  <div className="text-xs opacity-75 leading-tight">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminQuickActions;
