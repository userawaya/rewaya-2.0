
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GDPRCompliance: React.FC = () => {
  const { toast } = useToast();

  const mockDataRequests = [
    { id: '1', user: 'user1@example.com', type: 'Data Export', status: 'pending', requestedAt: '2024-06-15 10:00' },
    { id: '2', user: 'user2@example.com', type: 'Account Deletion', status: 'approved', requestedAt: '2024-06-14 16:30' },
    { id: '3', user: 'user3@example.com', type: 'Data Correction', status: 'completed', requestedAt: '2024-06-14 14:15' },
  ];

  const handleDataRequest = (requestId: string, action: string) => {
    toast({
      title: "Request Processed",
      description: `Data request has been ${action}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>GDPR Compliance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">48</div>
                  <p className="text-sm text-gray-600">Completed This Month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">72h</div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h4 className="font-medium mb-4">Data Subject Requests</h4>
            <div className="space-y-3">
              {mockDataRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium">{request.user}</h5>
                      <p className="text-sm text-gray-600">{request.type}</p>
                    </div>
                    <Badge variant={
                      request.status === 'completed' ? 'default' :
                      request.status === 'approved' ? 'secondary' : 'destructive'
                    }>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Requested: {request.requestedAt}
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDataRequest(request.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDataRequest(request.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GDPRCompliance;
