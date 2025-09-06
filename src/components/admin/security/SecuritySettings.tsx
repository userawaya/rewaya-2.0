
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Lock, Shield, CheckCircle } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [passwordPolicyEnabled, setPasswordPolicyEnabled] = useState(true);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [accountLockoutEnabled, setAccountLockoutEnabled] = useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Password Policy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable Password Policy</span>
            <Switch checked={passwordPolicyEnabled} onCheckedChange={setPasswordPolicyEnabled} />
          </div>
          
          {passwordPolicyEnabled && (
            <div className="space-y-3 pl-4 border-l-2 border-blue-200">
              <div className="flex items-center justify-between text-sm">
                <span>Minimum Length: 8 characters</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Require Special Characters</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Require Numbers</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Password Expiry: 90 days</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Authentication Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Require Two-Factor Authentication</span>
            <Switch checked={twoFactorRequired} onCheckedChange={setTwoFactorRequired} />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Account Lockout Protection</span>
            <Switch checked={accountLockoutEnabled} onCheckedChange={setAccountLockoutEnabled} />
          </div>

          {accountLockoutEnabled && (
            <div className="space-y-2 pl-4 border-l-2 border-blue-200">
              <div className="text-sm text-gray-600">
                <p>Failed Attempts Threshold: 5</p>
                <p>Lockout Duration: 30 minutes</p>
                <p>Reset After: 24 hours</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Session Timeout:</span>
            <span className="font-medium">2 hours</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Concurrent Sessions:</span>
            <span className="font-medium">3 maximum</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Remember Login:</span>
            <span className="font-medium">7 days</span>
          </div>
          <Button size="sm" className="w-full">
            Configure Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98.2%</div>
            <p className="text-sm text-gray-600">Login Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-sm text-gray-600">Active Lockouts</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">45</div>
            <p className="text-sm text-gray-600">2FA Enabled Users</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
