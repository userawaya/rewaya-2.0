
import React from 'react';
import StatCard from '@/components/StatCard';
import { Package, Award, Users, TrendingUp } from 'lucide-react';

interface ControllerStatsGridProps {
  pendingCount: number;
  todayAssessments: number;
  weeklyAssessments: number;
  averageQuality: number;
  isLoading?: boolean;
  error?: Error | null;
}

const ControllerStatsGrid: React.FC<ControllerStatsGridProps> = ({
  pendingCount,
  todayAssessments,
  weeklyAssessments,
  averageQuality,
  isLoading = false,
  error = null
}) => {
  if (error) {
    console.error('ControllerStatsGrid: Error in stats:', error);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Pending Assessments"
        value={isLoading ? "..." : pendingCount.toString()}
        icon={Package}
        variant="warning"
      />
      <StatCard
        title="Today's Assessments"
        value={isLoading ? "..." : todayAssessments.toString()}
        icon={Award}
        variant="success"
      />
      <StatCard
        title="Weekly Total"
        value={isLoading ? "..." : weeklyAssessments.toString()}
        icon={Users}
        variant="info"
      />
      <StatCard
        title="Quality Average"
        value={isLoading ? "..." : (averageQuality > 0 ? `${averageQuality.toFixed(1)}/10` : 'N/A')}
        icon={TrendingUp}
        variant="default"
      />
    </div>
  );
};

export default ControllerStatsGrid;
