
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  UserPlus, 
  Award, 
  Truck, 
  CheckCircle, 
  Clock,
  Eye
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ActivityItem {
  id: string;
  type: 'user_registration' | 'waste_submission' | 'assessment_complete' | 'pickup_completed' | 'credit_earned';
  user: string;
  description: string;
  timestamp: Date;
  metadata?: any;
}

const AdminRecentActivity: React.FC = () => {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async (): Promise<ActivityItem[]> => {
      // Fetch recent waste records
      const { data: wasteRecords } = await supabase
        .from('waste_records')
        .select(`
          id,
          created_at,
          waste_type,
          weight_kg,
          credits_earned,
          status,
          profiles!waste_records_generator_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch recent profiles (new registrations)
      const { data: newProfiles } = await supabase
        .from('profiles')
        .select('id, full_name, created_at, role')
        .order('created_at', { ascending: false })
        .limit(5);

      const activities: ActivityItem[] = [];

      // Add waste submissions
      wasteRecords?.forEach(record => {
        if (record.status === 'pending') {
          activities.push({
            id: record.id,
            type: 'waste_submission',
            user: record.profiles?.full_name || 'Unknown User',
            description: `Submitted ${record.weight_kg}kg of ${record.waste_type}`,
            timestamp: new Date(record.created_at),
            metadata: { weight: record.weight_kg, type: record.waste_type },
          });
        } else if (record.status === 'sorted' && record.credits_earned) {
          activities.push({
            id: `${record.id}_assessed`,
            type: 'assessment_complete',
            user: 'Quality Controller',
            description: `Completed assessment for ${record.waste_type}`,
            timestamp: new Date(record.created_at),
            metadata: { credits: record.credits_earned },
          });
        }
      });

      // Add new user registrations
      newProfiles?.forEach(profile => {
        activities.push({
          id: profile.id,
          type: 'user_registration',
          user: profile.full_name,
          description: `New user registered as ${profile.role}`,
          timestamp: new Date(profile.created_at),
        });
      });

      // Sort by timestamp and return latest 8
      return activities
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 8);
    },
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return <UserPlus className="w-4 h-4 text-blue-500" />;
      case 'waste_submission': return <Clock className="w-4 h-4 text-green-500" />;
      case 'assessment_complete': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pickup_completed': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'credit_earned': return <Award className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case 'user_registration': return 'bg-blue-100 text-blue-800';
      case 'waste_submission': return 'bg-green-100 text-green-800';
      case 'assessment_complete': return 'bg-green-100 text-green-800';
      case 'pickup_completed': return 'bg-blue-100 text-blue-800';
      case 'credit_earned': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatActivityType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getActivityIcon(activity.type)}
                    <Badge className={getActivityBadgeColor(activity.type)}>
                      {formatActivityType(activity.type)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  
                  {activity.metadata && (
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      {activity.metadata.weight && (
                        <span>Weight: {activity.metadata.weight}kg</span>
                      )}
                      {activity.metadata.credits && (
                        <span>Credits: {activity.metadata.credits}</span>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-1">
                    {activity.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminRecentActivity;
