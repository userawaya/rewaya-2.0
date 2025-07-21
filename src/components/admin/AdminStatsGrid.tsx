
import React from 'react';
import StatCard from '@/components/StatCard';
import { Users, Award, MapPin, TrendingUp, Package, CheckCircle, Clock, BarChart, Truck } from 'lucide-react';

interface AdminStatsGridProps {
  totalUsers: number;
  totalWasteProcessed: number;
  totalCreditsIssued: number;
  activeCenters: number;
  totalCenters: number;
  pendingAssessments: number;
  completedAssessments: number;
  averageQualityScore: number;
  marshalDeliveries?: number;
  marshalCreditsIssued?: number;
  isLoading?: boolean;
  error?: Error | null;
}

const AdminStatsGrid: React.FC<AdminStatsGridProps> = ({
  totalUsers,
  totalWasteProcessed,
  totalCreditsIssued,
  activeCenters,
  totalCenters,
  pendingAssessments,
  completedAssessments,
  averageQualityScore,
  marshalDeliveries = 0,
  marshalCreditsIssued = 0,
  isLoading = false,
  error = null,
}) => {
  if (error) {
    console.error('AdminStatsGrid: Error in stats:', error);
  }

  const getScoreTrend = (score: number) => {
    if (score >= 8) return { value: 12, label: 'vs last month', isPositive: true };
    if (score >= 6) return { value: 5, label: 'vs last month', isPositive: true };
    return { value: -3, label: 'vs last month', isPositive: false };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={isLoading ? "..." : totalUsers.toString()}
        icon={Users}
        variant="info"
        trend={!isLoading && totalUsers > 0 ? { value: 15, label: 'vs last month', isPositive: true } : undefined}
      />
      <StatCard
        title="Waste Processed"
        value={isLoading ? "..." : `${totalWasteProcessed} kg`}
        icon={Award}
        variant="success"
        trend={!isLoading && totalWasteProcessed > 0 ? { value: 22, label: 'vs last month', isPositive: true } : undefined}
      />
      <StatCard
        title="Active Centers"
        value={isLoading ? "..." : `${activeCenters}/${totalCenters}`}
        icon={MapPin}
        variant="info"
        subtext={!isLoading ? `${Math.round((activeCenters/totalCenters) * 100)}% operational` : undefined}
      />
      <StatCard
        title="Quality Score"
        value={isLoading ? "..." : (averageQualityScore > 0 ? `${averageQualityScore}/10` : 'N/A')}
        icon={TrendingUp}
        variant={averageQualityScore >= 8 ? "success" : averageQualityScore >= 6 ? "warning" : "default"}
        trend={!isLoading && averageQualityScore > 0 ? getScoreTrend(averageQualityScore) : undefined}
      />
      <StatCard
        title="Credits Issued"
        value={isLoading ? "..." : totalCreditsIssued.toLocaleString()}
        icon={BarChart}
        variant="success"
        trend={!isLoading && totalCreditsIssued > 0 ? { value: 18, label: 'vs last month', isPositive: true } : undefined}
      />
      <StatCard
        title="Marshal Deliveries"
        value={isLoading ? "..." : marshalDeliveries.toString()}
        icon={Truck}
        variant="info"
        subtext={!isLoading && marshalCreditsIssued > 0 ? `${marshalCreditsIssued.toLocaleString()} credits earned` : undefined}
      />
      <StatCard
        title="Pending Reviews"
        value={isLoading ? "..." : pendingAssessments.toString()}
        icon={Clock}
        variant={pendingAssessments > 10 ? "warning" : "info"}
        subtext={!isLoading && pendingAssessments > 5 ? "High priority" : undefined}
      />
      <StatCard
        title="Completed Reviews"
        value={isLoading ? "..." : completedAssessments.toString()}
        icon={CheckCircle}
        variant="success"
        trend={!isLoading && completedAssessments > 0 ? { value: 8, label: 'vs last week', isPositive: true } : undefined}
      />
    </div>
  );
};

export default AdminStatsGrid;
