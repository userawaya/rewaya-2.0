
import React from 'react';
import UsersTab from "../../dashboardTabs/UsersTab";
import AdvancedUsersTab from "../../dashboardTabs/AdvancedUsersTab";
import FieldMarshalManagementTab from "../../dashboardTabs/FieldMarshalManagementTab";
import UserRolesManager from "../../UserRolesManager";
import UserImportExport from "../../UserImportExport";
import UserSecurityCompliance from "../../UserSecurityCompliance";
import UserCommunicationHub from "../../UserCommunicationHub";
import UserVerificationOnboarding from "../../UserVerificationOnboarding";

interface UserManagementRouterProps {
  currentTab: string;
  usersByRole: any;
}

const UserManagementRouter: React.FC<UserManagementRouterProps> = ({
  currentTab,
  usersByRole,
}) => {
  switch (currentTab) {
    case "users":
      return <UsersTab usersByRole={usersByRole} />;
    case "advanced-users":
      return <AdvancedUsersTab />;
    case "field-marshals":
      return <FieldMarshalManagementTab />;
    case "user-roles":
      return <UserRolesManager />;
    case "user-import-export":
      return <UserImportExport />;
    case "user-security":
      return <UserSecurityCompliance />;
    case "user-communication":
      return <UserCommunicationHub />;
    case "user-verification":
      return <UserVerificationOnboarding />;
    default:
      return null;
  }
};

export default UserManagementRouter;
