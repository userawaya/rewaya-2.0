
import { 
  Home, 
  Package, 
  Truck, 
  Settings, 
  User, 
  BarChart3, 
  FileText, 
  CreditCard,
  MapPin,
  CheckSquare,
  Calendar,
  Users,
  Recycle,
  Star,
  TrendingUp,
  Building2,
  Route
} from 'lucide-react';

export interface NavigationItem {
  title: string;
  url: string;
  icon: any;
  badge?: number;
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export const getNavigationConfig = (role: string): NavigationGroup[] => {
  switch (role) {
    case 'generator':
      return [
        {
          title: 'Main',
          items: [
            { title: 'Dashboard', url: 'dashboard', icon: Home },
            { title: 'Submit Waste', url: 'submit', icon: Package },
            { title: 'My Submissions', url: 'submissions', icon: FileText },
            { title: 'Credits', url: 'credits', icon: CreditCard },
          ]
        },
        {
          title: 'Account',
          items: [
            { title: 'Profile', url: 'profile', icon: User },
            { title: 'Settings', url: 'settings', icon: Settings },
          ]
        }
      ];

    case 'controller':
      return [
        {
          title: 'Main',
          items: [
            { title: 'Dashboard', url: 'dashboard', icon: Home },
            { title: 'Assessments', url: 'assessments', icon: CheckSquare },
            { title: 'Analytics', url: 'analytics', icon: BarChart3 },
            { title: 'Marshal Logs', url: 'marshal-logs', icon: FileText },
          ]
        },
        {
          title: 'Operations',
          items: [
            { title: 'Inventory', url: 'inventory', icon: Package },
            { title: 'Centers', url: 'centers', icon: Building2 },
            { title: 'Reports', url: 'reports', icon: TrendingUp },
          ]
        },
        {
          title: 'Account',
          items: [
            { title: 'Profile', url: 'profile', icon: User },
            { title: 'Settings', url: 'settings', icon: Settings },
          ]
        }
      ];

    case 'driver':
      return [
        {
          title: 'Main',
          items: [
            { title: 'Dashboard', url: 'dashboard', icon: Home },
            { title: 'Routes', url: 'routes', icon: Route },
            { title: 'Pickups', url: 'pickups', icon: Truck },
            { title: 'Schedule', url: 'schedule', icon: Calendar },
          ]
        },
        {
          title: 'Account',
          items: [
            { title: 'Profile', url: 'profile', icon: User },
            { title: 'Settings', url: 'settings', icon: Settings },
          ]
        }
      ];

    case 'recycler':
      return [
        {
          title: 'Main',
          items: [
            { title: 'Dashboard', url: 'dashboard', icon: Home },
            { title: 'Inventory', url: 'inventory', icon: Package },
            { title: 'Orders', url: 'orders', icon: FileText },
            { title: 'Quality Reports', url: 'quality', icon: Star },
          ]
        },
        {
          title: 'Business',
          items: [
            { title: 'Suppliers', url: 'suppliers', icon: Users },
            { title: 'Analytics', url: 'analytics', icon: BarChart3 },
            { title: 'Recycling', url: 'recycling', icon: Recycle },
          ]
        },
        {
          title: 'Account',
          items: [
            { title: 'Profile', url: 'profile', icon: User },
            { title: 'Settings', url: 'settings', icon: Settings },
          ]
        }
      ];

    default:
      return [
        {
          title: 'Main',
          items: [
            { title: 'Dashboard', url: 'dashboard', icon: Home },
            { title: 'Profile', url: 'profile', icon: User },
          ]
        }
      ];
  }
};
