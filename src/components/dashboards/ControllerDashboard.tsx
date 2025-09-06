
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PendingAssessmentsQueue from '@/components/controller/PendingAssessmentsQueue';
import AssessmentHistory from '@/components/controller/AssessmentHistory';
import ControllerDashboardHeader from '@/components/controller/ControllerDashboardHeader';
import ControllerStatsGrid from '@/components/controller/ControllerStatsGrid';
import ControllerQuickActions from '@/components/controller/ControllerQuickActions';
import ControllerActivitySummary from '@/components/controller/ControllerActivitySummary';
import MarshalWasteDeliveryLog from '@/components/controller/MarshalWasteDeliveryLog';
import NotificationCenter from '@/components/controller/NotificationCenter';
import AssessmentFilters from '@/components/controller/AssessmentFilters';
import BulkAssessmentPanel from '@/components/controller/BulkAssessmentPanel';
import PerformanceAnalytics from '@/components/controller/PerformanceAnalytics';
import ExportPanel from '@/components/controller/ExportPanel';
import { useProfile } from '@/hooks/useProfile';
import { usePendingAssessments } from '@/hooks/useControllerAssessments';
import { useAssessmentStats } from '@/hooks/useAssessmentAnalytics';
import { useAssessmentFilters } from '@/hooks/useAssessmentFilters';

interface ControllerDashboardProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

const ControllerDashboard: React.FC<ControllerDashboardProps> = ({ 
  activeTab, 
  onTabChange = () => {} 
}) => {
  const { data: profile } = useProfile();
  const { data: pendingRecords } = usePendingAssessments();
  const { data: stats, isLoading: statsLoading, error: statsError } = useAssessmentStats();
  const { filters, filteredData, updateFilter, resetFilters } = useAssessmentFilters(pendingRecords);
  const [selectedAssessmentIds, setSelectedAssessmentIds] = useState<string[]>([]);

  // Log current data for debugging
  console.log('ControllerDashboard: Current data state:', {
    profile,
    pendingRecords,
    stats,
    statsLoading,
    statsError,
    activeTab
  });

  // Prepare data for components
  const userName = profile?.full_name || 'Controller';
  const pendingCount = filteredData?.length || 0;
  const todayAssessments = stats?.todayAssessments || 0;
  const weeklyAssessments = stats?.weeklyAssessments || 0;
  const averageQuality = stats?.averageQuality || 0;

  // Handle different tab views
  const renderTabContent = () => {
    switch (activeTab) {
      case 'assessments':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Waste Assessments</h1>
            </div>
            
            <AssessmentFilters
              filters={filters}
              onFilterChange={updateFilter}
              onReset={resetFilters}
            />
            
            <BulkAssessmentPanel
              selectedIds={selectedAssessmentIds}
              onClearSelection={() => setSelectedAssessmentIds([])}
            />
            
            <PendingAssessmentsQueue 
              data={filteredData}
              selectedIds={selectedAssessmentIds}
              onSelectionChange={setSelectedAssessmentIds}
            />
          </div>
        );

      case 'deliveries':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Marshal Waste Deliveries</h1>
            </div>
            <MarshalWasteDeliveryLog />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PerformanceAnalytics />
              <ExportPanel />
            </div>
            <AssessmentHistory />
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <NotificationCenter />
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Assessment History</h3>
                  <AssessmentHistory />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">
                    Profile settings coming soon...
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default: // dashboard
        return (
          <div className="space-y-6">
            <ControllerDashboardHeader
              userName={userName}
              pendingCount={pendingCount}
              todayAssessments={todayAssessments}
              onStartAssessments={() => onTabChange('assessments')}
            />

            <ControllerStatsGrid
              pendingCount={pendingCount}
              todayAssessments={todayAssessments}
              weeklyAssessments={weeklyAssessments}
              averageQuality={averageQuality}
              isLoading={statsLoading}
              error={statsError}
            />

            <ControllerQuickActions
              pendingCount={pendingCount}
              onShowAssessments={() => onTabChange('assessments')}
              onShowHistory={() => onTabChange('profile')}
              onLogDelivery={() => onTabChange('deliveries')}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ControllerActivitySummary
                pendingCount={pendingCount}
                pendingRecords={pendingRecords}
                stats={stats}
                averageQuality={averageQuality}
                onShowAssessments={() => onTabChange('assessments')}
              />
              <NotificationCenter />
            </div>
          </div>
        );
    }
  };

  return renderTabContent();
};

export default ControllerDashboard;
