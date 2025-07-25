
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, AlertTriangle, CheckCircle, XCircle, Clock, Cpu, Database, Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  category: 'system' | 'security' | 'performance' | 'backup';
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
  source: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: number;
  icon: any;
}

const SystemAlertsCenter: React.FC = () => {
  const { toast } = useToast();
  const [realTimeAlerts, setRealTimeAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'error',
      category: 'system',
      title: 'High Memory Usage',
      description: 'System memory usage has exceeded 85% threshold',
      timestamp: '2024-06-15 14:35:22',
      acknowledged: false,
      resolved: false,
      source: 'system-monitor',
      severity: 'high'
    },
    {
      id: '2',
      type: 'warning',
      category: 'security',
      title: 'Multiple Failed Login Attempts',
      description: '15 failed login attempts detected from IP 203.0.113.45',
      timestamp: '2024-06-15 14:30:15',
      acknowledged: true,
      resolved: false,
      source: 'auth-service',
      severity: 'medium'
    },
    {
      id: '3',
      type: 'info',
      category: 'backup',
      title: 'Scheduled Backup Completed',
      description: 'Daily database backup completed successfully (2.3GB)',
      timestamp: '2024-06-15 14:00:00',
      acknowledged: true,
      resolved: true,
      source: 'backup-service',
      severity: 'low'
    },
    {
      id: '4',
      type: 'warning',
      category: 'performance',
      title: 'Slow Query Detected',
      description: 'Database query taking >5 seconds in waste_records table',
      timestamp: '2024-06-15 13:45:33',
      acknowledged: false,
      resolved: false,
      source: 'database-monitor',
      severity: 'medium'
    }
  ]);

  const performanceMetrics: PerformanceMetric[] = [
    { id: '1', name: 'CPU Usage', value: 67, unit: '%', status: 'warning', threshold: 80, icon: Cpu },
    { id: '2', name: 'Memory Usage', value: 89, unit: '%', status: 'critical', threshold: 85, icon: Database },
    { id: '3', name: 'Database Connections', value: 45, unit: '', status: 'good', threshold: 100, icon: Database },
    { id: '4', name: 'API Response Time', value: 245, unit: 'ms', status: 'good', threshold: 500, icon: Wifi },
  ];

  // Simulate real-time alerts
  useEffect(() => {
    if (!realTimeAlerts) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance of new alert
        const newAlert: SystemAlert = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? 'warning' : 'info',
          category: ['system', 'security', 'performance', 'backup'][Math.floor(Math.random() * 4)] as any,
          title: 'New System Alert',
          description: 'A new alert has been generated by the monitoring system',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
          acknowledged: false,
          resolved: false,
          source: 'real-time-monitor',
          severity: 'medium'
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 alerts
        
        if (emailNotifications) {
          toast({
            title: "New System Alert",
            description: newAlert.title,
            variant: newAlert.type === 'error' ? 'destructive' : 'default',
          });
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [realTimeAlerts, emailNotifications, toast]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-orange-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      case 'good': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged.",
    });
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true, acknowledged: true } : alert
    ));
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved.",
    });
  };

  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;
  const criticalCount = alerts.filter(a => a.severity === 'critical' && !a.resolved).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Alerts & Monitoring</h2>
          <p className="text-gray-600">Real-time system health and performance monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={criticalCount > 0 ? "destructive" : "secondary"}>
            {criticalCount} Critical
          </Badge>
          <Badge variant={unacknowledgedCount > 0 ? "outline" : "secondary"}>
            {unacknowledgedCount} Unacknowledged
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.id} className={`${getMetricStatusColor(metric.status)} border-l-4`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{metric.name}</p>
                    <p className="text-2xl font-bold">
                      {metric.value}{metric.unit}
                    </p>
                    <p className="text-xs text-gray-500">
                      Threshold: {metric.threshold}{metric.unit}
                    </p>
                  </div>
                  <IconComponent className="w-8 h-8 opacity-60" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Alerts</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Real-time alerts</span>
                  <Switch checked={realTimeAlerts} onCheckedChange={setRealTimeAlerts} />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 6).map((alert) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className={`p-4 border rounded-lg ${alert.acknowledged ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <AlertIcon className={`w-5 h-5 mt-0.5 ${getAlertColor(alert.type)}`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{alert.title}</h4>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            {alert.acknowledged && (
                              <Badge variant="outline">Acknowledged</Badge>
                            )}
                            {alert.resolved && (
                              <Badge variant="secondary">Resolved</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{alert.timestamp}</span>
                            </span>
                            <span>Source: {alert.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {!alert.acknowledged && (
                          <Button size="sm" variant="outline" onClick={() => handleAcknowledge(alert.id)}>
                            Acknowledge
                          </Button>
                        )}
                        {!alert.resolved && (
                          <Button size="sm" onClick={() => handleResolve(alert.id)}>
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email notifications</label>
                <p className="text-xs text-gray-500">Send alerts via email</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Real-time monitoring</label>
                <p className="text-xs text-gray-500">Enable live system monitoring</p>
              </div>
              <Switch checked={realTimeAlerts} onCheckedChange={setRealTimeAlerts} />
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Alert Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Alerts (24h)</span>
                  <span className="font-medium">{alerts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Critical</span>
                  <span className="font-medium text-red-600">{criticalCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Unacknowledged</span>
                  <span className="font-medium text-orange-600">{unacknowledgedCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Resolved</span>
                  <span className="font-medium text-green-600">
                    {alerts.filter(a => a.resolved).length}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemAlertsCenter;
