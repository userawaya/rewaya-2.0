import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Eye, Edit, Users } from 'lucide-react';
import { EnhancedProfile } from '@/types/userProfiles';

interface UserGridViewProps {
  profiles: EnhancedProfile[];
  onUserView: (userId: string) => void;
  onUserEdit: (userId: string) => void;
}

const UserGridView: React.FC<UserGridViewProps> = ({ profiles, onUserView, onUserEdit }) => {
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

  if (profiles.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <Card key={profile.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback>
                  {profile.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onUserView(profile.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onUserEdit(profile.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">{profile.full_name}</h3>
                <p className="text-sm text-gray-600">{profile.phone || 'No phone'}</p>
              </div>

              <div className="flex space-x-2">
                <Badge className={getRoleColor(profile.role)}>
                  {profile.role}
                </Badge>
                <Badge className={getStatusColor(profile.status || 'active')}>
                  {profile.status || 'active'}
                </Badge>
              </div>

              {profile.bio && (
                <p className="text-sm text-gray-600 line-clamp-2">{profile.bio}</p>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Profile Completion</span>
                  <span className="text-xs text-gray-500">{profile.profile_completion || 0}%</span>
                </div>
                <Progress value={profile.profile_completion || 0} className="h-2" />
              </div>

              <div className="text-xs text-gray-500">
                Joined {new Date(profile.created_at).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserGridView;
