import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, LogOut, Menu, X, ArrowLeft, User, Settings, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import BottomNavigation from './BottomNavigation';
import MobileButton from './MobileButton';
import DashboardSidebar from './dashboard/sidebar/DashboardSidebar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
  notificationCount?: number;
  className?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isAdminDashboard?: boolean;
  userRole?: string;
  userName?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onLogout = () => {},
  notificationCount = 0,
  className,
  activeTab = 'dashboard',
  onTabChange = () => {},
  isAdminDashboard = false,
  userRole = 'generator',
  userName = 'User',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [activeTab]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen || isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-menu-container') && !target.closest('.mobile-menu-container')) {
          setIsUserMenuOpen(false);
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen, isMobileMenuOpen]);

  // If it's an admin dashboard, render without the layout wrapper since AdminDashboard handles its own layout
  if (isAdminDashboard) {
    return <>{children}</>;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatUserRole = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <SidebarProvider>
      <div className={cn('min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex w-full', className)}>
        {/* Sidebar for desktop and tablets */}
        <div className="hidden md:block">
          <DashboardSidebar
            userRole={userRole}
            userName={userName}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onLogout={onLogout}
          />
        </div>

        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
              <div className="flex items-center space-x-3">
                <SidebarTrigger className="md:hidden" />
                <div className="md:hidden flex items-center space-x-2">
                  <img
                    src="/lovable-uploads/e9f33df4-dcef-4ccb-b1c5-e69756ddef19.png"
                    alt="ReWaya"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:block">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 font-medium">
                      {getGreeting()}, {userName}
                    </span>
                    <span className="text-xs text-gray-400">
                      Welcome back to your dashboard
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                  >
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-pulse"
                      >
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* Desktop User Menu */}
                <div className="hidden md:block relative user-menu-container">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200 px-3 py-2"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                        {userName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatUserRole(userRole)}
                      </span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", isUserMenuOpen && "rotate-180")} />
                  </Button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{formatUserRole(userRole)}</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button 
                          onClick={onLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center space-x-2 mobile-menu-container">
                  <MobileButton
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    touchOptimized={true}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </MobileButton>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-white border-t border-gray-200 shadow-lg mobile-menu-container">
                <div className="px-4 sm:px-6 py-4 space-y-4">
                  {/* Mobile User Info */}
                  <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500">{formatUserRole(userRole)}</p>
                    </div>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="space-y-2">
                    <MobileButton
                      variant="ghost"
                      className="w-full text-gray-600 hover:text-gray-700 hover:bg-gray-50 justify-start"
                      icon={Settings}
                      fullWidth={true}
                    >
                      Settings
                    </MobileButton>
                    <MobileButton
                      variant="ghost"
                      onClick={onLogout}
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 justify-start"
                      icon={LogOut}
                      fullWidth={true}
                    >
                      Sign out
                    </MobileButton>
                  </div>
                </div>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8 flex flex-col gap-4 min-h-[70vh]">
            {activeTab !== 'dashboard' && (
              <div className="mb-2 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                  onClick={() => onTabChange('dashboard')}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </Button>
              </div>
            )}
            <div className="bg-white rounded-xl  border-gray-200/80 px-4 py-5 sm:px-6 sm:py-6 animate-fade-in backdrop-blur-sm">
              {children}
            </div>
          </main>

          {/* Bottom Navigation for mobile */}
          <div className="md:hidden" data-tour="bottom-nav">
            <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;