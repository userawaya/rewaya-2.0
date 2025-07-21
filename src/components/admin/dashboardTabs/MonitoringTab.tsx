
import React from "react";
import AdminSystemMonitor from "@/components/admin/AdminSystemMonitor";
import SystemMonitoring from "@/components/admin/SystemMonitoring";

interface MonitoringTabProps {
  systemMonitoringData: any;
}

const MonitoringTab: React.FC<MonitoringTabProps> = ({ systemMonitoringData }) => (
  <div className="space-y-6">
    <AdminSystemMonitor />
    <SystemMonitoring {...systemMonitoringData} />
  </div>
);

export default MonitoringTab;
