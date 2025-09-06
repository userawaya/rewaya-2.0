
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Eye, EyeOff, Copy, BarChart3, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const mockApiKeys = [
    { 
      id: 'key-1', 
      name: 'Mobile App Integration', 
      key: 'rw_live_sk_1234567890abcdef', 
      status: 'active',
      requests: 15420,
      lastUsed: '2 hours ago',
      rateLimit: '1000/hour'
    },
    { 
      id: 'key-2', 
      name: 'Web Dashboard', 
      key: 'rw_live_sk_abcdef1234567890', 
      status: 'active',
      requests: 8903,
      lastUsed: '5 minutes ago',
      rateLimit: '500/hour'
    },
    { 
      id: 'key-3', 
      name: 'Analytics Service', 
      key: 'rw_live_sk_fedcba0987654321', 
      status: 'inactive',
      requests: 245,
      lastUsed: '2 days ago',
      rateLimit: '100/hour'
    },
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "API key has been copied to your clipboard.",
    });
  };

  const handleGenerateKey = () => {
    toast({
      title: "API Key Generated",
      description: "New API key has been created successfully.",
    });
  };

  const handleRevokeKey = (keyName: string) => {
    toast({
      title: "API Key Revoked",
      description: `${keyName} has been revoked successfully.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Management</h2>
          <p className="text-gray-600">Manage API keys, monitor usage, and configure access</p>
        </div>
        <Button onClick={handleGenerateKey}>
          <Key className="w-4 h-4 mr-2" />
          Generate New Key
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-blue-600">24,568</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Keys</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <Key className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rate Limit Hits</p>
                <p className="text-2xl font-bold text-yellow-600">12</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-purple-600">156ms</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockApiKeys.map((apiKey) => (
              <div key={apiKey.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{apiKey.name}</h4>
                    <p className="text-sm text-gray-600">
                      Last used: {apiKey.lastUsed} • Rate limit: {apiKey.rateLimit}
                    </p>
                  </div>
                  <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                    {apiKey.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <Label className="text-sm font-medium">API Key:</Label>
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      type={showKeys[apiKey.id] ? 'text' : 'password'}
                      value={apiKey.key}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Total requests: {apiKey.requests.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Logs
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit Limits
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRevokeKey(apiKey.name)}
                    >
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="keyName">Key Name</Label>
              <Input id="keyName" placeholder="Enter a descriptive name" />
            </div>
            <div>
              <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
              <Input id="rateLimit" type="number" placeholder="1000" />
            </div>
          </div>
          <Button className="mt-4" onClick={handleGenerateKey}>
            <Key className="w-4 h-4 mr-2" />
            Generate API Key
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiManagementTab;
