
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Activity
} from "lucide-react";
import { MenuItemType } from './types';

export const coreItems: MenuItemType[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Main admin dashboard with overview",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    description: "Manage platform users",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "System analytics and insights",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: Activity,
    description: "System health monitoring",
  },
];
