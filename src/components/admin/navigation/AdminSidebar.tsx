
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import AdminSidebarHeader from './components/SidebarHeader';
import AdminSidebarFooter from './components/SidebarFooter';
import MenuSection from './components/MenuSection';
import {
  coreItems,
  userManagementItems,
  operationsItems,
  systemItems
} from './config';

interface AdminSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onTabChange,
  onLogout = () => {},
}) => {
  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <AdminSidebarHeader />

      <SidebarContent className="p-2 bg-gray-50/30">
        <MenuSection
          title="Core Functions"
          items={coreItems}
          currentTab={currentTab}
          onTabChange={onTabChange}
        />

        <SidebarSeparator className="my-4" />

        <MenuSection
          title="User Management"
          items={userManagementItems}
          currentTab={currentTab}
          onTabChange={onTabChange}
        />

        <SidebarSeparator className="my-4" />

        <MenuSection
          title="Operations"
          items={operationsItems}
          currentTab={currentTab}
          onTabChange={onTabChange}
        />

        <SidebarSeparator className="my-4" />

        <MenuSection
          title="System Tools"
          items={systemItems}
          currentTab={currentTab}
          onTabChange={onTabChange}
        />
      </SidebarContent>

      <AdminSidebarFooter onLogout={onLogout} />
      <SidebarRail />
    </Sidebar>
  );
};

export default AdminSidebar;
