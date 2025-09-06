import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { EnhancedProfile } from '@/types/userProfiles';

interface UserDetailedMetricsProps {
  profiles: EnhancedProfile[];
  totalUsers: number;
  verifiedUsers: number;
}

const UserDetailedMetrics: React.FC<UserDetailedMetricsProps> = ({
  profiles,
  totalUsers,
  verifiedUsers
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">User Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {['active', 'inactive', 'suspended'].map(status => {
              const count = profiles.filter(p => (p.status || 'active') === status).length;
              const percentage = ((count / totalUsers) * 100).toFixed(1);
              return (
                <div key={status} className="flex justify-between items-center">
                  <span className="capitalize text-sm font-medium">{status}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{count}</span>
                    <span className="text-xs text-gray-500">({percentage}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Email Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Verified</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{verifiedUsers}</span>
                <span className="text-xs text-gray-500">
                  ({((verifiedUsers / totalUsers) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Unverified</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{totalUsers - verifiedUsers}</span>
                <span className="text-xs text-gray-500">
                  ({(((totalUsers - verifiedUsers) / totalUsers) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Complete Profiles</span>
              <span className="text-sm">
                {profiles.filter(p => (p.profile_completion || 0) >= 80).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Incomplete Profiles</span>
              <span className="text-sm">
                {profiles.filter(p => (p.profile_completion || 0) < 50).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Avg. Completion</span>
              <span className="text-sm font-bold">
                {(profiles.reduce((sum, p) => sum + (p.profile_completion || 0), 0) / totalUsers || 0).toFixed(1)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailedMetrics;
