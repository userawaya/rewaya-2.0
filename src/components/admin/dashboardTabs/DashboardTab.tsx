
import React from "react";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AdminStatsGrid from "@/components/admin/AdminStatsGrid";
import AdminSystemAlerts from "@/components/admin/AdminSystemAlerts";
import AdminQuickActions from "@/components/admin/AdminQuickActions";
import AdminRecentActivity from "@/components/admin/AdminRecentActivity";

interface DashboardTabProps {
  analytics: any;
  analyticsLoading: boolean;
  analyticsError: Error | null;
  profile: any;
}

const DashboardTab: React.FC<DashboardTabProps> = ({
  analytics,
  analyticsLoading,
  analyticsError,
  profile,
}) => {
  const userName = profile?.full_name || "Admin";
  const systemHealth = 99.2;

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        userName={userName}
        totalUsers={analytics?.totalUsers || 0}
        pendingAssessments={analytics?.pendingAssessments || 0}
        systemHealth={systemHealth}
      />
      <div data-tour="stats-grid">
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
      </div>
      <div data-tour="quick-actions">
        <AdminQuickActions />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminSystemAlerts />
        <AdminRecentActivity />
      </div>
    </div>
  );
};

export default DashboardTab;
