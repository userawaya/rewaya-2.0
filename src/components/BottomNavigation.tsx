
import React from 'react';
import { Package, Truck, BarChart3, Bell, User, Home } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const { data: profile } = useProfile();

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const role = profile?.role;
    
    switch (role) {
      case 'controller':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'assessments', label: 'Assessments', icon: Package },
          { id: 'deliveries', label: 'Deliveries', icon: Truck },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'notifications', label: 'Alerts', icon: Bell },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      
      case 'generator':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'submit', label: 'Submit', icon: Package },
          { id: 'history', label: 'History', icon: BarChart3 },
          { id: 'earnings', label: 'Earnings', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      
      case 'driver':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'pickups', label: 'Pickups', icon: Truck },
          { id: 'routes', label: 'Routes', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      
      case 'recycler':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'inventory', label: 'Inventory', icon: Package },
          { id: 'orders', label: 'Orders', icon: Truck },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      
      default:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'profile', label: 'Profile', icon: User },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="grid grid-cols-4 md:grid-cols-6 max-w-md mx-auto">
        {navigationItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-3 px-2 min-h-[64px] transition-colors ${
                isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate w-full text-center">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Overflow menu for additional items */}
      {navigationItems.length > 4 && (
        <div className="border-t border-gray-100">
          <div className="flex overflow-x-auto scrollbar-hide py-2 px-4 space-x-4">
            {navigationItems.slice(4).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
