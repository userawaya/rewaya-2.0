
import React from 'react';
import { Button } from '@/components/ui/button';

interface AdminSubNavigationProps {
  adminSubTab: 'main' | 'registerMarshal';
  onTabChange: (tab: 'main' | 'registerMarshal') => void;
}

const AdminSubNavigation: React.FC<AdminSubNavigationProps> = ({
  adminSubTab,
  onTabChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={adminSubTab === "main" ? "default" : "ghost"}
        size="sm"
        onClick={() => onTabChange("main")}
      >
        Main Dashboard
      </Button>
      <Button
        variant={adminSubTab === "registerMarshal" ? "default" : "ghost"}
        size="sm"
        onClick={() => onTabChange("registerMarshal")}
      >
        Register Marshal
      </Button>
    </div>
  );
};

export default AdminSubNavigation;
