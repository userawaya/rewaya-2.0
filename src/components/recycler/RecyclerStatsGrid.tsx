
import React from 'react';
import StatCard from '@/components/StatCard';
import { Package, ShoppingCart, TrendingUp, Truck, Star, DollarSign } from 'lucide-react';

interface RecyclerStatsGridProps {
  totalAvailableStock: number;
  monthlyPurchases: number;
  averageQuality: number;
  pendingOrders: number;
}

const RecyclerStatsGrid: React.FC<RecyclerStatsGridProps> = ({
  totalAvailableStock,
  monthlyPurchases,
  averageQuality,
  pendingOrders,
}) => {
  const formatWeight = (weight: number) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} tons`;
    }
    return `${weight.toFixed(0)}kg`;
  };

  const estimatedMonthlyCost = monthlyPurchases * 4.5; // Assuming avg ₦4.5/kg

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <StatCard
        title="Available Stock"
        value={formatWeight(totalAvailableStock)}
        icon={Package}
        variant="default"
        trend={totalAvailableStock > 1000 ? {
          value: 12,
          label: "vs last week",
          isPositive: true
        } : undefined}
      />
      
      <StatCard
        title="Monthly Purchases"
        value={formatWeight(monthlyPurchases)}
        icon={ShoppingCart}
        variant="success"
        trend={monthlyPurchases > 0 ? {
          value: 18,
          label: "vs last month",
          isPositive: true
        } : undefined}
      />
      
      <StatCard
        title="Avg. Quality"
        value={averageQuality > 0 ? `${averageQuality.toFixed(1)}/10` : "N/A"}
        icon={Star}
        variant="info"
        trend={averageQuality > 7 ? {
          value: 0.3,
          label: "quality points",
          isPositive: true
        } : undefined}
      />
      
      <StatCard
        title="Active Orders"
        value={`${pendingOrders}`}
        icon={Truck}
        variant="warning"
        subtext="pending delivery"
      />
      
      <StatCard
        title="Monthly Cost"
        value={`₦${(estimatedMonthlyCost / 1000).toFixed(0)}k`}
        icon={DollarSign}
        variant="default"
        trend={estimatedMonthlyCost > 0 ? {
          value: 5,
          label: "vs budget",
          isPositive: false
        } : undefined}
      />
      
      <StatCard
        title="Efficiency"
        value="94.2%"
        icon={TrendingUp}
        variant="success"
        subtext="delivery rate"
        trend={{
          value: 2.1,
          label: "improvement",
          isPositive: true
        }}
      />
    </div>
  );
};

export default RecyclerStatsGrid;
