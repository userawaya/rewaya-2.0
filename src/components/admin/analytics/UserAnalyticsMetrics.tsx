
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  UserCheck, 
  Activity,
  Target
} from 'lucide-react';

interface UserAnalyticsMetricsProps {
  totalUsers: number;
  activeUsers: number;
  verifiedUsers: number;
  avgCompletion: number;
}

const UserAnalyticsMetrics: React.FC<UserAnalyticsMetricsProps> = ({
  totalUsers,
  activeUsers,
  verifiedUsers,
  avgCompletion
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{totalUsers}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">{activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-xs text-green-600">
                {((activeUsers / totalUsers) * 100).toFixed(1)}% of total
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{verifiedUsers}</p>
              <p className="text-sm text-gray-600">Verified Users</p>
              <p className="text-xs text-purple-600">
                {((verifiedUsers / totalUsers) * 100).toFixed(1)}% verified
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Target className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold">{avgCompletion.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Avg. Profile Completion</p>
              <Progress value={avgCompletion} className="h-2 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAnalyticsMetrics;
