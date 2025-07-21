
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  lastUsed: string;
  requests: number;
}

const ApiManagementTab: React.FC = () => {
  const mockApiKeys: ApiKey[] = [
    { id: 'api-1', name: 'Mobile App API', status: 'active', lastUsed: '2 hours ago', requests: 15420 },
    { id: 'api-2', name: 'Web Dashboard API', status: 'active', lastUsed: '5 minutes ago', requests: 8903 },
    { id: 'api-3', name: 'Integration API', status: 'inactive', lastUsed: '2 days ago', requests: 245 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Active API Keys</h4>
            <Button>
              <Shield className="w-4 h-4 mr-2" />
              Generate New Key
            </Button>
          </div>

          <div className="space-y-3">
            {mockApiKeys.map((apiKey) => (
              <div key={apiKey.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{apiKey.name}</h4>
                    <p className="text-sm text-gray-600">
                      Last used: {apiKey.lastUsed}
                    </p>
                  </div>
                  <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                    {apiKey.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>Requests: {apiKey.requests.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View Logs
                    </Button>
                    <Button size="sm" variant="outline">
                      Regenerate
                    </Button>
                    <Button size="sm" variant="destructive">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium mb-4">API Usage Statistics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24,568</div>
                    <p className="text-sm text-gray-600">Requests Today</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.8%</div>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">156ms</div>
                    <p className="text-sm text-gray-600">Avg Response</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiManagementTab;
