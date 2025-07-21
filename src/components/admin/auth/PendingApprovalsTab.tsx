
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCheck, UserX } from 'lucide-react';

interface PendingApprovalsTabProps {
  pendingUsers: any[];
  onApproveUser: (userId: string) => void;
  onRejectUser: (userId: string) => void;
}

const PendingApprovalsTab: React.FC<PendingApprovalsTabProps> = ({
  pendingUsers,
  onApproveUser,
  onRejectUser,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserCheck className="w-5 h-5" />
          <span>Pending User Registrations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pending user registrations</p>
        ) : (
          <div className="space-y-4">
            {pendingUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{user.full_name}</h4>
                  <p className="text-sm text-gray-600">Role: {user.role}</p>
                  <p className="text-sm text-gray-500">Registered: {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onApproveUser(user.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <UserCheck className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onRejectUser(user.id)}
                  >
                    <UserX className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingApprovalsTab;
