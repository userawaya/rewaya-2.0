
import React from 'react';
import AnalyticsTab from "../../dashboardTabs/AnalyticsTab";
import MonitoringTab from "../../dashboardTabs/MonitoringTab";
import NotificationsTab from "../../dashboardTabs/NotificationsTab";
import ReportsTab from "../../dashboardTabs/ReportsTab";
import BackupRecoveryTab from "../../dashboardTabs/BackupRecoveryTab";
import ApiManagementTab from "../../dashboardTabs/ApiManagementTab";
import AuditTrailManager from "../../AuditTrailManager";
import SessionManager from "../../SessionManager";
import SystemAlertsCenter from "../../SystemAlertsCenter";
import BulkOperationsFeedback from "../../BulkOperationsFeedback";
import SystemConfigTab from "../../dashboardTabs/SystemConfigTab";
import SettingsTab from "../../dashboardTabs/SettingsTab";

interface SystemToolsRouterProps {
  currentTab: string;
  analytics: any;
  analyticsLoading: boolean;
  analyticsError: Error | null;
  systemMonitoringData: any;
}

const SystemToolsRouter: React.FC<SystemToolsRouterProps> = ({
  currentTab,
  analytics,
  analyticsLoading,
  analyticsError,
  systemMonitoringData,
}) => {
  switch (currentTab) {
    case "analytics":
      return (
        <AnalyticsTab
          analytics={analytics}
          analyticsLoading={analyticsLoading}
          analyticsError={analyticsError}
        />
      );
    case "monitoring":
      return <MonitoringTab systemMonitoringData={systemMonitoringData} />;
    case "notifications":
      return <NotificationsTab />;
    case "reports":
      return <ReportsTab />;
    case "bulk-ops":
      return <BulkOperationsFeedback />;
    case "backup-recovery":
      return <BackupRecoveryTab />;
    case "api-management":
      return <ApiManagementTab />;
    case "audit-logs":
      return <AuditTrailManager />;
    case "session-management":
      return <SessionManager />;
    case "system-alerts":
      return <SystemAlertsCenter />;
    case "integrations":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
            <p className="text-gray-600">Manage third-party service integrations</p>
          </div>
          <div className="p-8 text-center text-gray-500">
            Integration management coming soon...
          </div>
        </div>
      );
    case "performance":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Optimization</h2>
            <p className="text-gray-600">Monitor and optimize system performance</p>
          </div>
          <div className="p-8 text-center text-gray-500">
            Performance optimization tools coming soon...
          </div>
        </div>
      );
    case "error-tracking":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Error Tracking</h2>
            <p className="text-gray-600">Debug and track system errors</p>
          </div>
          <div className="p-8 text-center text-gray-500">
            Error tracking tools coming soon...
          </div>
        </div>
      );
    case "health-checks":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">System Health Checks</h2>
            <p className="text-gray-600">Monitor system health and dependencies</p>
          </div>
          <div className="p-8 text-center text-gray-500">
            Health monitoring tools coming soon...
          </div>
        </div>
      );
    case "scheduled-tasks":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Scheduled Tasks</h2>
            <p className="text-gray-600">Manage cron jobs and automated tasks</p>
          </div>
          <div className="p-8 text-center text-gray-500">
            Task scheduling tools coming soon...
          </div>
        </div>
      );
    case "system-config":
      return <SystemConfigTab />;
    case "settings":
      return <SettingsTab />;
    default:
      return null;
  }
};

export default SystemToolsRouter;
