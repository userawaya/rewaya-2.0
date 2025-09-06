
import { 
  Activity, 
  BarChart3, 
  Bell, 
  FileText, 
  Settings, 
  Zap,
  Database,
  Code,
  TrendingUp,
  AlertTriangle,
  CheckSquare,
  Clock,
  Shield,
  Users,
  Eye,
  RefreshCw
} from "lucide-react";
import { MenuItemType } from "./types";

export const systemItems: MenuItemType[] = [
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "System analytics and insights"
  },
  {
    id: "monitoring", 
    label: "System Monitoring",
    icon: Activity,
    description: "Monitor system health and performance"
  },
  {
    id: "system-alerts",
    label: "System Alerts",
    icon: AlertTriangle,
    description: "Real-time system alerts and notifications"
  },
  {
    id: "session-management",
    label: "Session Management", 
    icon: Users,
    description: "Monitor and control user sessions"
  },
  {
    id: "audit-logs",
    label: "Audit Logs",
    icon: Eye,
    description: "Security audit trail and system logs"
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    description: "Manage system notifications"
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    description: "Generate and view reports"
  },
  {
    id: "bulk-ops",
    label: "Bulk Operations",
    icon: RefreshCw,
    description: "Monitor bulk operations progress"
  },
  {
    id: "backup-recovery",
    label: "Backup & Recovery",
    icon: Database,
    description: "Manage system backups"
  },
  {
    id: "api-management",
    label: "API Management",
    icon: Code,
    description: "Manage API keys and endpoints"
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Zap,
    description: "Third-party integrations"
  },
  {
    id: "performance",
    label: "Performance",
    icon: TrendingUp,
    description: "Performance optimization"
  },
  {
    id: "error-tracking",
    label: "Error Tracking",
    icon: AlertTriangle,
    description: "Debug and track errors"
  },
  {
    id: "health-checks",
    label: "Health Checks",
    icon: CheckSquare,
    description: "System health monitoring"
  },
  {
    id: "scheduled-tasks",
    label: "Scheduled Tasks",
    icon: Clock,
    description: "Manage cron jobs"
  },
  {
    id: "system-config",
    label: "System Config",
    icon: Settings,
    description: "System configuration"
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    description: "Application settings"
  }
];
