
import { 
  Users, 
  UserCog,
  Shield,
  FileUp,
  Lock,
  MessageCircle,
  ClipboardCheck,
  UserPlus
} from "lucide-react";
import { MenuItemType } from "./types";

export const userManagementItems: MenuItemType[] = [
  { 
    id: "users", 
    label: "Users Overview", 
    icon: Users,
    description: "View all users"
  },
  { 
    id: "advanced-users", 
    label: "User Management", 
    icon: UserCog,
    description: "Advanced user controls"
  },
  { 
    id: "field-marshals", 
    label: "Field Marshals", 
    icon: UserPlus,
    description: "Manage field marshal operations"
  },
  { 
    id: "user-roles", 
    label: "Roles & Permissions", 
    icon: Shield,
    description: "Manage user roles"
  },
  { 
    id: "user-import-export", 
    label: "Import/Export", 
    icon: FileUp,
    description: "Bulk user operations"
  },
  { 
    id: "user-security", 
    label: "Security & Compliance", 
    icon: Lock,
    description: "User security settings"
  },
  { 
    id: "user-communication", 
    label: "Communication Hub", 
    icon: MessageCircle,
    description: "User communications"
  },
  { 
    id: "user-verification", 
    label: "Verification & Onboarding", 
    icon: ClipboardCheck,
    description: "User verification workflows"
  },
];
