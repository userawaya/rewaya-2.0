
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';
import { useDriverAnalytics } from '@/hooks/useDriverAnalytics';
import DriverDashboardHeader from '@/components/driver/DriverDashboardHeader';
import DriverStatsGrid from '@/components/driver/DriverStatsGrid';
import PickupRequestsList from '@/components/driver/PickupRequestsList';
import CurrentRouteCard from '@/components/driver/CurrentRouteCard';

interface DriverDashboardProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ 
  activeTab, 
  onTabChange = () => {} 
}) => {
  const { data: profile } = useProfile();
  const { data: driverStats, isLoading, refetch } = useDriverAnalytics();

  const userName = profile?.full_name || 'Driver';

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'routes':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Routes</h1>
            <CurrentRouteCard
              activeDelivery={driverStats?.activeDelivery || null}
              todaySchedule={driverStats?.todaySchedule || []}
              onRouteUpdated={() => refetch()}
            />
          </div>
        );

      case 'pickups':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Pickup Requests</h1>
            <PickupRequestsList
              availablePickups={driverStats?.availablePickups || []}
              onPickupAccepted={() => refetch()}
            />
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">
                  Profile settings coming soon...
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default: // dashboard
        return (
          <div className="space-y-6">
            <DriverDashboardHeader
              userName={userName}
              availablePickups={driverStats?.availablePickups.length || 0}
              truckCapacity={75}
              activeDelivery={driverStats?.activeDelivery}
            />

            <DriverStatsGrid
              todayDeliveries={driverStats?.todayDeliveries || 0}
              totalDistance={driverStats?.totalDistance || 0}
              timeOnRoad={driverStats?.timeOnRoad || 0}
              weeklyCompleted={driverStats?.weeklyCompleted || 0}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PickupRequestsList
                availablePickups={driverStats?.availablePickups || []}
                onPickupAccepted={() => refetch()}
              />

              <CurrentRouteCard
                activeDelivery={driverStats?.activeDelivery || null}
                todaySchedule={driverStats?.todaySchedule || []}
                onRouteUpdated={() => refetch()}
              />
            </div>
          </div>
        );
    }
  };

  return renderTabContent();
};

export default DriverDashboard;
