
import React from 'react';
import CollectionSchedulingTab from "../../dashboardTabs/CollectionSchedulingTab";
import DriverManagementTab from "../../dashboardTabs/DriverManagementTab";
import LogisticsTab from "../../dashboardTabs/LogisticsTab";
import CentersTab from "../../dashboardTabs/CentersTab";
import InventoryTab from "../../dashboardTabs/InventoryTab";
import WasteFlowTab from "../../dashboardTabs/WasteFlowTab";
import CreditsTab from "../../dashboardTabs/CreditsTab";
import RecyclerManagementTab from "../../dashboardTabs/RecyclerManagementTab";
import MaintenanceTab from "../../dashboardTabs/MaintenanceTab";
import SupplyChainTab from "../../dashboardTabs/SupplyChainTab";
import OperationalAnalyticsTab from "../../dashboardTabs/OperationalAnalyticsTab";

interface OperationsRouterProps {
  currentTab: string;
}

const OperationsRouter: React.FC<OperationsRouterProps> = ({
  currentTab,
}) => {
  switch (currentTab) {
    case "collection-scheduling":
      return <CollectionSchedulingTab />;
    case "driver-management":
      return <DriverManagementTab />;
    case "logistics":
      return <LogisticsTab />;
    case "centers":
      return <CentersTab />;
    case "inventory":
      return <InventoryTab />;
    case "waste-flow":
      return <WasteFlowTab />;
    case "credits":
      return <CreditsTab />;
    case "recycler-management":
      return <RecyclerManagementTab />;
    case "maintenance":
      return <MaintenanceTab />;
    case "supply-chain":
      return <SupplyChainTab />;
    case "operational-analytics":
      return <OperationalAnalyticsTab />;
    default:
      return null;
  }
};

export default OperationsRouter;
