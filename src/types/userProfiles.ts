
export interface EnhancedProfile {
  id: string;
  full_name: string;
  phone?: string;
  role: 'generator' | 'controller' | 'driver' | 'recycler' | 'admin' | 'super_admin' | 'system_admin' | 'operations_admin' | 'finance_admin';
  avatar_url?: string;
  bio?: string;
  department?: string;
  location?: string;
  status?: string;
  last_login?: string;
  email_verified?: boolean;
  profile_completion?: number;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  notification_email: boolean;
  notification_sms: boolean;
  language: string;
  timezone: string;
  theme: string;
  created_at: string;
  updated_at: string;
}

export interface UserActivity {
  id: string;
  user_id: string;
  action: string;
  details?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
