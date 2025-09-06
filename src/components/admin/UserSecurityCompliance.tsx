
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SecuritySettings from './security/SecuritySettings';
import AuditLog from './security/AuditLog';
import AccountLockouts from './security/AccountLockouts';
import GDPRCompliance from './security/GDPRCompliance';

const UserSecurityCompliance: React.FC = () => {
  const { toast } = useToast();

  const exportSecurityLog = () => {
    toast({
      title: "Export Started",
      description: "Security audit log export has been initiated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security & Compliance</h2>
          <p className="text-gray-600">Manage user security and data compliance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportSecurityLog}>
            <Download className="w-4 h-4 mr-2" />
            Export Audit Log
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="lockouts">Account Lockouts</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="audit">
          <AuditLog />
        </TabsContent>

        <TabsContent value="lockouts">
          <AccountLockouts />
        </TabsContent>

        <TabsContent value="gdpr">
          <GDPRCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSecurityCompliance;
