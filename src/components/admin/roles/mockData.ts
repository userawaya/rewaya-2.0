import { SystemRole, Permission } from './types';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useSystemRoles = () => {
  return useQuery({
    queryKey: ['system-roles'],
    queryFn: async (): Promise<SystemRole[]> => {
      // Get role hierarchy from database
      const { data: roleHierarchy } = await supabase
        .from('role_hierarchy')
        .select('*')
        .order('hierarchy_level');

      // Get user counts by role
      const { data: profiles } = await supabase
        .from('profiles')
        .select('role');

      const userCounts = profiles?.reduce((acc, profile) => {
        acc[profile.role] = (acc[profile.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      // Transform to SystemRole format
      const roles: SystemRole[] = roleHierarchy?.map(role => ({
        id: role.role,
        name: role.role.split('_').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        description: `${role.role} role with level ${role.hierarchy_level} permissions`,
        userCount: userCounts[role.role] || 0,
        permissions: role.permissions || [],
        level: role.hierarchy_level,
        canManage: role.can_manage_roles || []
      })) || [];

      return roles;
    },
  });
};

export const availablePermissions: Permission[] = [
  { id: 'all', name: 'Full System Access', category: 'System' },
  { id: 'user_management', name: 'Manage Users', category: 'User Management' },
  { id: 'view_reports', name: 'View Reports', category: 'Analytics' },
  { id: 'assess_waste', name: 'Assess Waste Quality', category: 'Operations' },
  { id: 'manage_pickups', name: 'Manage Pickups', category: 'Operations' },
  { id: 'update_routes', name: 'Update Routes', category: 'Operations' },
  { id: 'view_inventory', name: 'View Inventory', category: 'Inventory' },
  { id: 'place_orders', name: 'Place Orders', category: 'Inventory' },
  { id: 'submit_waste', name: 'Submit Waste', category: 'Generator' },
  { id: 'view_credits', name: 'View Credits', category: 'Credits' },
  { id: 'manage_centers', name: 'Manage Centers', category: 'Operations' },
  { id: 'financial_access', name: 'Financial Access', category: 'Finance' },
  { id: 'system_monitoring', name: 'System Monitoring', category: 'System' },
  { id: 'backup_recovery', name: 'Backup & Recovery', category: 'System' },
  { id: 'collection_scheduling', name: 'Collection Scheduling', category: 'Operations' },
  { id: 'waste_flow', name: 'Waste Flow Management', category: 'Operations' },
  { id: 'logistics', name: 'Logistics Management', category: 'Operations' },
  { id: 'financial_management', name: 'Financial Management', category: 'Finance' },
  { id: 'credits_system', name: 'Credits System', category: 'Finance' },
  { id: 'analytics', name: 'Analytics Access', category: 'Analytics' },
];

// Keep old exports for backward compatibility
export const systemRoles: SystemRole[] = [];
