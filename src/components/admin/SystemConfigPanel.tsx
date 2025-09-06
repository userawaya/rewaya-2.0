
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Database, Zap, Shield, AlertTriangle, Save, RefreshCw } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface ConfigItem {
  key: string;
  value: string | boolean | number;
  type: 'string' | 'boolean' | 'number' | 'select';
  options?: string[];
  description: string;
  category: 'system' | 'features' | 'security' | 'performance';
}

const SystemConfigPanel: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'system' | 'features' | 'security' | 'performance'>('system');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [configs, setConfigs] = useState<ConfigItem[]>([
    {
      key: 'max_file_size_mb',
      value: 10,
      type: 'number',
      description: 'Maximum file upload size in MB',
      category: 'system',
    },
    {
      key: 'session_timeout_hours',
      value: 24,
      type: 'number',
      description: 'User session timeout in hours',
      category: 'security',
    },
    {
      key: 'enable_notifications',
      value: true,
      type: 'boolean',
      description: 'Enable push notifications',
      category: 'features',
    },
    {
      key: 'api_rate_limit',
      value: 1000,
      type: 'number',
      description: 'API requests per hour per user',
      category: 'performance',
    },
    {
      key: 'auto_assessment',
      value: false,
      type: 'boolean',
      description: 'Enable automatic waste assessment',
      category: 'features',
    },
    {
      key: 'backup_frequency',
      value: 'daily',
      type: 'select',
      options: ['hourly', 'daily', 'weekly'],
      description: 'Database backup frequency',
      category: 'system',
    },
    {
      key: 'min_password_length',
      value: 8,
      type: 'number',
      description: 'Minimum password length',
      category: 'security',
    },
    {
      key: 'cache_duration_minutes',
      value: 30,
      type: 'number',
      description: 'Cache duration in minutes',
      category: 'performance',
    },
  ]);

  const filteredConfigs = configs.filter(config => config.category === activeCategory);

  const handleConfigChange = (key: string, value: string | boolean | number) => {
    setConfigs(prev => prev.map(config => 
      config.key === key ? { ...config, value } : config
    ));
  };

  const handleSaveConfigs = () => {
    toast.success('Configuration saved successfully');
  };

  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    toast.success(maintenanceMode ? 'Maintenance mode disabled' : 'Maintenance mode enabled');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system': return <Database className="w-4 h-4" />;
      case 'features': return <Zap className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'performance': return <RefreshCw className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const renderConfigInput = (config: ConfigItem) => {
    switch (config.type) {
      case 'boolean':
        return (
          <Switch
            checked={config.value as boolean}
            onCheckedChange={(checked) => handleConfigChange(config.key, checked)}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={config.value as number}
            onChange={(e) => handleConfigChange(config.key, parseInt(e.target.value))}
            className="w-32"
          />
        );
      case 'select':
        return (
          <Select
            value={config.value as string}
            onValueChange={(value) => handleConfigChange(config.key, value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {config.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            value={config.value as string}
            onChange={(e) => handleConfigChange(config.key, e.target.value)}
            className="w-64"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Settings className="w-6 h-6 mr-3 text-blue-600" />
          System Configuration
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Maintenance Mode</span>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={handleMaintenanceToggle}
            />
            {maintenanceMode && (
              <Badge variant="destructive" className="ml-2">
                <AlertTriangle className="w-3 h-3 mr-1" />
                MAINTENANCE
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mb-6">
        {['system', 'features', 'security', 'performance'].map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category as any)}
            size="sm"
            className="flex items-center space-x-2"
          >
            {getCategoryIcon(category)}
            <span className="capitalize">{category}</span>
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              {getCategoryIcon(activeCategory)}
              <span className="capitalize">{activeCategory} Configuration</span>
            </CardTitle>
            <Button onClick={handleSaveConfigs}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredConfigs.map((config) => (
              <div key={config.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">
                    {config.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h4>
                  <p className="text-sm text-gray-600">{config.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {renderConfigInput(config)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {maintenanceMode && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Maintenance Mode Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 text-sm">
              The system is currently in maintenance mode. Users will see a maintenance page and cannot access the application.
              Remember to disable maintenance mode when updates are complete.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SystemConfigPanel;
