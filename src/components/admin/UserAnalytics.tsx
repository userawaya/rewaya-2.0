
import React from 'react';
import { useAllProfiles } from '@/hooks/useAllProfiles';
import UserAnalyticsMetrics from './analytics/UserAnalyticsMetrics';
import UserRoleDistribution from './analytics/UserRoleDistribution';
import UserProfileCompletion from './analytics/UserProfileCompletion';
import UserRegistrationTrends from './analytics/UserRegistrationTrends';
import UserDetailedMetrics from './analytics/UserDetailedMetrics';

const UserAnalytics: React.FC = () => {
  const { data: profiles = [] } = useAllProfiles();

  // Calculate analytics
  const totalUsers = profiles.length;
  const activeUsers = profiles.filter(p => p.status === 'active').length;
  const verifiedUsers = profiles.filter(p => p.email_verified).length;
  const avgCompletion = profiles.reduce((sum, p) => sum + (p.profile_completion || 0), 0) / totalUsers || 0;

  // Role distribution
  const roleDistribution = profiles.reduce((acc, profile) => {
    acc[profile.role] = (acc[profile.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleData = Object.entries(roleDistribution).map(([role, count]) => ({
    role: role.charAt(0).toUpperCase() + role.slice(1),
    count,
    percentage: ((count / totalUsers) * 100).toFixed(1)
  }));

  // Registration trends (last 6 months)
  const registrationTrends = profiles.reduce((acc, profile) => {
    const date = new Date(profile.created_at);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const trendsData = Object.entries(registrationTrends)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, count]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      registrations: count
    }));

  // Profile completion distribution
  const completionRanges = {
    '0-25%': profiles.filter(p => (p.profile_completion || 0) <= 25).length,
    '26-50%': profiles.filter(p => (p.profile_completion || 0) > 25 && (p.profile_completion || 0) <= 50).length,
    '51-75%': profiles.filter(p => (p.profile_completion || 0) > 50 && (p.profile_completion || 0) <= 75).length,
    '76-100%': profiles.filter(p => (p.profile_completion || 0) > 75).length,
  };

  const completionData = Object.entries(completionRanges).map(([range, count]) => ({
    range,
    count,
    percentage: ((count / totalUsers) * 100).toFixed(1)
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">User Analytics</h2>
        <p className="text-gray-600">Insights into user engagement and platform adoption</p>
      </div>

      {/* Key Metrics */}
      <UserAnalyticsMetrics
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        verifiedUsers={verifiedUsers}
        avgCompletion={avgCompletion}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <UserRoleDistribution roleData={roleData} />

        {/* Profile Completion */}
        <UserProfileCompletion completionData={completionData} />
      </div>

      {/* Registration Trends */}
      <UserRegistrationTrends trendsData={trendsData} />

      {/* Detailed Metrics */}
      <UserDetailedMetrics
        profiles={profiles}
        totalUsers={totalUsers}
        verifiedUsers={verifiedUsers}
      />
    </div>
  );
};

export default UserAnalytics;
