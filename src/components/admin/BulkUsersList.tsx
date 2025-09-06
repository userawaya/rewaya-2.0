import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Users, CheckSquare, Square } from 'lucide-react';
import { EnhancedProfile } from '@/types/userProfiles';

interface BulkUsersListProps {
  profiles: EnhancedProfile[];
  selectedUsers: string[];
  onSelectUser: (userId: string) => void;
  onSelectAll: () => void;
}

const BulkUsersList: React.FC<BulkUsersListProps> = ({
  profiles,
  selectedUsers,
  onSelectUser,
  onSelectAll
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Users ({profiles.length})</span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
          >
            {selectedUsers.length === profiles.length ? (
              <CheckSquare className="w-4 h-4 mr-2" />
            ) : (
              <Square className="w-4 h-4 mr-2" />
            )}
            Select All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${
                selectedUsers.includes(profile.id) ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedUsers.includes(profile.id)}
                  onCheckedChange={() => onSelectUser(profile.id)}
                />
                <div>
                  <p className="font-medium">{profile.full_name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="text-xs">
                      {profile.role}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {profile.status || 'active'}
                    </Badge>
                    {profile.email_verified && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {profile.profile_completion || 0}% complete
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkUsersList;
