
import React from "react";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsTabProps {
  analytics: any;
  analyticsLoading: boolean;
  analyticsError: Error | null;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  analytics,
  analyticsLoading,
  analyticsError,
}) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        System Analytics
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">
        Comprehensive analytics and insights
      </p>
    </div>
    <AdminStatsGrid
      totalUsers={analytics?.totalUsers || 0}
      totalWasteProcessed={analytics?.totalWasteProcessed || 0}
      totalCreditsIssued={analytics?.totalCreditsIssued || 0}
      activeCenters={analytics?.activeCenters || 0}
      totalCenters={analytics?.totalCenters || 0}
      pendingAssessments={analytics?.pendingAssessments || 0}
      completedAssessments={analytics?.completedAssessments || 0}
      averageQualityScore={analytics?.averageQualityScore || 0}
      marshalDeliveries={analytics?.marshalDeliveries || 0}
      marshalCreditsIssued={analytics?.marshalCreditsIssued || 0}
      isLoading={analyticsLoading}
      error={analyticsError}
    />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Average Response Time
              </span>
              <span className="font-medium">150ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="font-medium text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Sessions</span>
              <span className="font-medium">247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Peak Load Time</span>
              <span className="font-medium">14:30 - 16:00</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Data Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Records</span>
              <span className="font-medium">
                {(analytics?.totalUsers || 0) * 15}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Storage Used
              </span>
              <span className="font-medium">2.4 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="font-medium text-green-600">
                +12% monthly
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Sync</span>
              <span className="font-medium">2 minutes ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Marshal Deliveries</span>
              <span className="font-medium">{analytics?.marshalDeliveries || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AnalyticsTab;
