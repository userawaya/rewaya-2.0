
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AccountLockouts: React.FC = () => {
  const { toast } = useToast();

  const mockLockedAccounts = [
    { id: '1', user: 'locked.user@example.com', reason: 'Multiple failed login attempts', lockedAt: '2024-06-15 13:45', attempts: 5 },
    { id: '2', user: 'suspended@example.com', reason: 'Suspicious activity detected', lockedAt: '2024-06-15 12:30', attempts: 8 },
  ];

  const handleUnlockAccount = (userId: string, userEmail: string) => {
    toast({
      title: "Account Unlocked",
      description: `Account for ${userEmail} has been unlocked.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lock className="w-5 h-5" />
          <span>Locked Accounts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLockedAccounts.map((account) => (
            <div key={account.id} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{account.user}</h4>
                  <p className="text-sm text-gray-600">{account.reason}</p>
                </div>
                <Badge variant="destructive">Locked</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>Locked at: {account.lockedAt}</p>
                  <p>Failed attempts: {account.attempts}</p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleUnlockAccount(account.id, account.user)}
                >
                  Unlock Account
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountLockouts;
