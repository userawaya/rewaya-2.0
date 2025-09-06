
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

interface AdminSystemAlertsProps {
  alerts?: SystemAlert[];
}

const AdminSystemAlerts: React.FC<AdminSystemAlertsProps> = ({ alerts = [] }) => {
  const mockAlerts: SystemAlert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High Pending Assessments',
      message: 'There are 15 waste assessments pending review for more than 24 hours.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'Routine maintenance is scheduled for tonight at 2:00 AM.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      resolved: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Database Backup Completed',
      message: 'Daily database backup completed successfully.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      resolved: true,
    },
  ];

  const activeAlerts = alerts.length > 0 ? alerts : mockAlerts;
  const unresolved = activeAlerts.filter(alert => !alert.resolved);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getAlertVariant = (type: string) => {
    switch (type) {
      case 'error': return 'destructive';
      case 'warning': return 'default';
      case 'success': return 'default';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>System Alerts</span>
            {unresolved.length > 0 && (
              <Badge variant="destructive">{unresolved.length}</Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlerts.slice(0, 5).map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.type) as any}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{alert.title}</h4>
                    {alert.resolved && (
                      <Badge variant="outline" className="text-xs">Resolved</Badge>
                    )}
                  </div>
                  <AlertDescription className="mt-1 text-sm">
                    {alert.message}
                  </AlertDescription>
                  <p className="text-xs text-gray-500 mt-2">
                    {alert.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
              {!alert.resolved && (
                <Button variant="ghost" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Alert>
        ))}
        
        {activeAlerts.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p>No active alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminSystemAlerts;
