
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SecuritySettingsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
          </div>
          <Button size="sm">Configure</Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Password Policy</h4>
            <p className="text-sm text-gray-600">Set minimum password requirements</p>
          </div>
          <Button size="sm">Configure</Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className="font-medium">Session Management</h4>
            <p className="text-sm text-gray-600">Configure session timeouts</p>
          </div>
          <Button size="sm">Configure</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettingsTab;
