
import React from "react";
import AdminNotificationManager from "@/components/admin/AdminNotificationManager";
import { Card, CardContent } from "@/components/ui/card";

const SettingsTab: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        System Settings
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">
        Configure system parameters and notifications
      </p>
    </div>
    <AdminNotificationManager />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Credit System Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Base Credit Rate (PET)
              </span>
              <span className="font-medium">5 credits/kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Quality Multiplier Range
              </span>
              <span className="font-medium">1.0x - 2.0x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Minimum Quality Score
              </span>
              <span className="font-medium">1.0</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                SSL Certificate
              </span>
              <span className="font-medium text-green-600">Valid</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Last Security Scan
              </span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Failed Login Attempts
              </span>
              <span className="font-medium">3 (last 24h)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default SettingsTab;
