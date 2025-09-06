
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, User } from 'lucide-react';
import { getNavigationConfig } from './navigationConfig';

interface DashboardSidebarProps {
  userRole: string;
  userName: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  userRole,
  userName,
  activeTab,
  onTabChange,
  onLogout,
}) => {
  const navigationGroups = getNavigationConfig(userRole);

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src="/lovable-uploads/e9f33df4-dcef-4ccb-b1c5-e69756ddef19.png"
            alt="ReWaya"
            className="h-8 w-auto"
          />
          {/* <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userName}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {userRole}
            </p>
          </div> */}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navigationGroups.map((group, groupIndex) => (
          <React.Fragment key={group.title}>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        isActive={activeTab === item.url}
                        onClick={() => onTabChange(item.url)}
                        className="w-full justify-start"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            {groupIndex < navigationGroups.length - 1 && (
              <SidebarSeparator className="my-2" />
            )}
          </React.Fragment>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
