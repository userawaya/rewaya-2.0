
import React from 'react';
import DashboardTab from "../../dashboardTabs/DashboardTab";
import UsersTab from "../../dashboardTabs/UsersTab";
import AnalyticsTab from "../../dashboardTabs/AnalyticsTab";
import MonitoringTab from "../../dashboardTabs/MonitoringTab";

interface CoreFunctionsRouterProps {
  currentTab: string;
  analytics: any;
  analyticsLoading: boolean;
  analyticsError: Error | null;
  profile: any;
  usersByRole: any;
  systemMonitoringData: any;
}

const CoreFunctionsRouter = ({
  currentTab,
  analytics,
  analyticsLoading,
  analyticsError,
  profile,
  usersByRole,
  systemMonitoringData,
}: CoreFunctionsRouterProps) => {
  switch (currentTab) {
    case "dashboard":
      return (
        <DashboardTab
          analytics={analytics}
          analyticsLoading={analyticsLoading}
          analyticsError={analyticsError}
          profile={profile}
        />
      );
    case "users":
      return <UsersTab usersByRole={usersByRole} />;
    case "analytics":
      return (
        <AnalyticsTab
          analytics={analytics}
          analyticsLoading={analyticsLoading}
          analyticsError={analyticsError}
        />
      );
    case "monitoring":
      return (
        <MonitoringTab
          systemMonitoringData={systemMonitoringData}
        />
      );
    default:
      return null;
  }
};

export default CoreFunctionsRouter;
