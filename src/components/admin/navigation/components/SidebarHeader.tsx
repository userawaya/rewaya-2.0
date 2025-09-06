
import React from 'react';
import { SidebarHeader } from "@/components/ui/sidebar";
import { Shield } from "lucide-react";

const AdminSidebarHeader: React.FC = () => {
  return (
    <SidebarHeader className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-green-100">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-600 rounded-lg shadow-md">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <p className="text-sm text-gray-600">ReWaya Management</p>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default AdminSidebarHeader;
