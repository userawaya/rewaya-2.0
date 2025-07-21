import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  Activity,
  Settings,
  Edit,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { EnhancedProfile } from '@/types/userProfiles';
import { useUserActivity } from '@/hooks/useUserActivity';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface UserProfileViewProps {
  profile: EnhancedProfile;
  onEdit?: () => void;
  isCurrentUser?: boolean;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ 
  profile, 
  onEdit,
  isCurrentUser = false 
}) => {
  const { data: activity } = useUserActivity(profile.id, 5);
  const { data: preferences } = useUserPreferences(profile.id);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'controller': return 'bg-blue-100 text-blue-800';
      case 'driver': return 'bg-green-100 text-green-800';
      case 'recycler': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-lg">
                  {profile.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.full_name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getRoleColor(profile.role)}>
                    {profile.role}
                  </Badge>
                  <Badge className={getStatusColor(profile.status || 'active')}>
                    {profile.status || 'active'}
                  </Badge>
                  {profile.email_verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                {profile.bio && (
                  <p className="text-gray-600 mt-2 max-w-md">{profile.bio}</p>
                )}
              </div>
            </div>
            {onEdit && (
              <Button onClick={onEdit} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Profile Completion */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span className="text-sm text-gray-500">{profile.profile_completion || 0}%</span>
            </div>
            <Progress value={profile.profile_completion || 0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Email will be shown when available</span>
            </div>
            {profile.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}
            {profile.department && (
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{profile.department}</span>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </span>
            </div>
            {profile.last_login && (
              <div className="flex items-center space-x-3">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm">
                  Last active {new Date(profile.last_login).toLocaleDateString()}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Preferences */}
        {(isCurrentUser || preferences) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {preferences ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email Notifications</span>
                    <span className="text-sm">
                      {preferences.notification_email ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">SMS Notifications</span>
                    <span className="text-sm">
                      {preferences.notification_sms ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Language</span>
                    <span className="text-sm font-medium">{preferences.language.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Timezone</span>
                    <span className="text-sm font-medium">{preferences.timezone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Theme</span>
                    <span className="text-sm font-medium capitalize">{preferences.theme}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">No preferences set</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activity */}
      {activity && activity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activity.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    {item.details && (
                      <p className="text-xs text-gray-500">
                        {JSON.stringify(item.details)}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfileView;
