
import React from 'react';
import DashboardTab from "../dashboardTabs/DashboardTab";
import CoreFunctionsRouter from "./routers/CoreFunctionsRouter";
import UserManagementRouter from "./routers/UserManagementRouter";
import OperationsRouter from "./routers/OperationsRouter";
import SystemToolsRouter from "./routers/SystemToolsRouter";

interface AdminTabContentRouterProps {
  currentTab: string;
  analytics: any;
  analyticsLoading: boolean;
  analyticsError: Error | null;
  profile: any;
  usersByRole: any;
  systemMonitoringData: any;
}

const AdminTabContentRouter: React.FC<AdminTabContentRouterProps> = ({
  currentTab,
  analytics,
  analyticsLoading,
  analyticsError,
  profile,
  usersByRole,
  systemMonitoringData,
}) => {
  // Core Functions
  const coreResult = CoreFunctionsRouter({
    currentTab,
    analytics,
    analyticsLoading,
    analyticsError,
    profile,
    usersByRole,
    systemMonitoringData,
  });
  if (coreResult) return coreResult;

  // User Management
  const userManagementResult = UserManagementRouter({
    currentTab,
    usersByRole,
  });
  if (userManagementResult) return userManagementResult;

  // Operations
  const operationsResult = OperationsRouter({
    currentTab,
  });
  if (operationsResult) return operationsResult;

  // System Tools
  const systemToolsResult = SystemToolsRouter({
    currentTab,
    analytics,
    analyticsLoading,
    analyticsError,
    systemMonitoringData,
  });
  if (systemToolsResult) return systemToolsResult;

  // Default fallback
  return (
    <DashboardTab
      analytics={analytics}
      analyticsLoading={analyticsLoading}
      analyticsError={analyticsError}
      profile={profile}
    />
  );
};

export default AdminTabContentRouter;
