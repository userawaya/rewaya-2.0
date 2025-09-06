
import React from "react";
import { useProfile } from "@/hooks/useProfile";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "../admin/navigation/AdminSidebar";
import AdminTabContentRouter from "../admin/content/AdminTabContentRouter";
import AdminLoadingState from "../admin/loading/AdminLoadingState";
import { createUsersByRoleData, createSystemMonitoringData } from "../admin/utils/adminDataUtils";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AdminDashboardProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
  onLogout?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  activeTab,
  onTabChange = () => {},
  onLogout = () => {},
}) => {
  const { data: profile } = useProfile();
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useAdminAnalytics();
  const [currentTab, setCurrentTab] = React.useState(activeTab ?? "dashboard");

  React.useEffect(() => {
    setCurrentTab(activeTab ?? "dashboard");
  }, [activeTab]);

  const usersByRole = createUsersByRoleData(analytics);
  const systemMonitoringData = createSystemMonitoringData(analytics);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    onTabChange(tab);
  };

  // Show loading/error states
  const loadingErrorComponent = (
    <AdminLoadingState isLoading={analyticsLoading} error={analyticsError} />
  );
  
  if (analyticsLoading || analyticsError) {
    return loadingErrorComponent;
  }

  const getPageTitle = (tab: string) => {
    const titles: Record<string, string> = {
      dashboard: "Dashboard",
      users: "User Management",
      "field-marshals": "Field Marshals",
      analytics: "Analytics",
      settings: "Settings",
    };
    return titles[tab] || tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AdminSidebar 
          currentTab={currentTab} 
          onTabChange={handleTabChange}
          onLogout={onLogout}
        />
        <SidebarInset className="flex-1">
          {/* Clean Header */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Left Section - Navigation & Title */}
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-md transition-colors" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {getPageTitle(currentTab)}
                  </h1>
                </div>
              </div>
              
              {/* Right Section - Actions & Profile */}
              <div className="flex items-center space-x-3">
                {/* Notifications Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="w-5 h-5" />
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                      >
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">New user registration</p>
                        <p className="text-xs text-gray-500">John Doe registered 5 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">System alert</p>
                        <p className="text-xs text-gray-500">Database backup completed</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Marshal approval needed</p>
                        <p className="text-xs text-gray-500">2 new marshal applications pending</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-green-600 text-white">
                          {profile?.full_name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-medium text-gray-700">
                        {profile?.full_name?.split(' ')[0] || 'Admin'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{profile?.full_name || 'Admin User'}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Preferences
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            <div className="animate-fade-in">
              <AdminTabContentRouter
                currentTab={currentTab}
                analytics={analytics}
                analyticsLoading={analyticsLoading}
                analyticsError={analyticsError}
                profile={profile}
                usersByRole={usersByRole}
                systemMonitoringData={systemMonitoringData}
              />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
