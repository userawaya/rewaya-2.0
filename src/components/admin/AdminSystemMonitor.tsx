
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Monitor,
  Server,
  Database,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  lastCheck: string;
  responseTime: number;
}

const AdminSystemMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate mock real-time metrics
  useEffect(() => {
    const generateMetrics = () => {
      const now = new Date();
      const newMetrics: SystemMetric[] = [];
      
      for (let i = 19; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        newMetrics.push({
          timestamp: time.toISOString(),
          cpu: Math.random() * 100,
          memory: 60 + Math.random() * 30,
          disk: 45 + Math.random() * 20,
          network: Math.random() * 100,
        });
      }
      
      setMetrics(newMetrics);
    };

    generateMetrics();
    const interval = setInterval(generateMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const services: ServiceStatus[] = [
    {
      name: 'API Server',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '30 seconds ago',
      responseTime: 145,
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '99.8%',
      lastCheck: '1 minute ago',
      responseTime: 23,
    },
    {
      name: 'File Storage',
      status: 'warning',
      uptime: '98.5%',
      lastCheck: '2 minutes ago',
      responseTime: 234,
    },
    {
      name: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      lastCheck: '45 seconds ago',
      responseTime: 189,
    },
    {
      name: 'Authentication',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '15 seconds ago',
      responseTime: 67,
    },
    {
      name: 'Notification Service',
      status: 'error',
      uptime: '95.2%',
      lastCheck: '5 minutes ago',
      responseTime: 0,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Monitor className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('System status refreshed');
    }, 1000);
  };

  const currentMetrics = metrics[metrics.length - 1] || {
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Monitor</h2>
          <p className="text-gray-600">Real-time system health and performance</p>
        </div>
        <Button 
          onClick={handleRefresh}
          disabled={loading}
          variant="outline"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* System Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CPU Usage</p>
                <p className="text-2xl font-bold">{currentMetrics.cpu.toFixed(1)}%</p>
              </div>
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${currentMetrics.cpu}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Memory Usage</p>
                <p className="text-2xl font-bold">{currentMetrics.memory.toFixed(1)}%</p>
              </div>
              <MemoryStick className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${currentMetrics.memory}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disk Usage</p>
                <p className="text-2xl font-bold">{currentMetrics.disk.toFixed(1)}%</p>
              </div>
              <HardDrive className="w-8 h-8 text-purple-600" />
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${currentMetrics.disk}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Network I/O</p>
                <p className="text-2xl font-bold">{currentMetrics.network.toFixed(1)}%</p>
              </div>
              <Wifi className="w-8 h-8 text-orange-600" />
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full" 
                style={{ width: `${currentMetrics.network}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Performance Metrics (Last 20 minutes)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name.toUpperCase()]}
              />
              <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={2} name="cpu" />
              <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={2} name="memory" />
              <Line type="monotone" dataKey="disk" stroke="#8B5CF6" strokeWidth={2} name="disk" />
              <Line type="monotone" dataKey="network" stroke="#F59E0B" strokeWidth={2} name="network" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>Service Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{service.name}</h4>
                  {getStatusIcon(service.status)}
                </div>
                
                <Badge className={getStatusColor(service.status)}>
                  {service.status}
                </Badge>
                
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-medium">{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response:</span>
                    <span className="font-medium">
                      {service.responseTime > 0 ? `${service.responseTime}ms` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Check:</span>
                    <span className="font-medium">{service.lastCheck}</span>
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

export default AdminSystemMonitor;
