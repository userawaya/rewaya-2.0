
import React from "react";
import EnhancedUserManager from "@/components/admin/EnhancedUserManager";

interface UsersTabProps {
  usersByRole: {
    generator: number;
    controller: number;
    driver: number;
    recycler: number;
    admin: number;
  };
}

const UsersTab: React.FC<UsersTabProps> = ({ usersByRole }) => (
  <div className="space-y-6">
    <EnhancedUserManager />
  </div>
);

export default UsersTab;
