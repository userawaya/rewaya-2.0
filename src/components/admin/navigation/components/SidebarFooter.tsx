
import React from 'react';
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

interface AdminSidebarFooterProps {
  onLogout: () => void;
}

const AdminSidebarFooter: React.FC<AdminSidebarFooterProps> = ({ onLogout }) => {
  return (
    <SidebarFooter className="p-4 border-t border-gray-200 bg-gray-50">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={onLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AdminSidebarFooter;
