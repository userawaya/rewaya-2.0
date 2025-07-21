
import React from 'react';
import StatCard from '@/components/StatCard';
import { Recycle, Users, Truck, Award } from 'lucide-react';

interface DashboardStatsProps {
  userRole?: string;
  totalSubmissions?: number;
  totalCredits?: number;
  totalEarnings?: number;
  pendingSubmissions?: number;
  assessedWeight?: number;
  totalWeight?: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  userRole = 'generator',
  totalSubmissions = 0,
  totalCredits = 0,
  totalEarnings = 0,
  pendingSubmissions = 0,
  assessedWeight = 0,
  totalWeight = 0
}) => {
  const getStatsForRole = () => {
    switch (userRole) {
      case 'generator':
        return [
          {
            title: 'Total Submissions',
            value: totalSubmissions.toString(),
            trend: {
              value: 12,
              label: 'from last month',
              isPositive: true
            },
            icon: Recycle,
            variant: 'success' as const
          },
          {
            title: 'Credits Earned',
            value: totalCredits.toString(),
            trend: {
              value: 8,
              label: 'from last week',
              isPositive: true
            },
            icon: Award,
            variant: 'warning' as const
          },
          {
            title: 'CO₂ Saved',
            value: `${Math.round(assessedWeight * 2.1)} kg`,
            trend: {
              value: 15,
              label: 'environmental impact',
              isPositive: true
            },
            icon: Recycle,
            variant: 'success' as const
          },
          {
            title: 'Pending Review',
            value: pendingSubmissions.toString(),
            trend: {
              value: 3,
              label: 'awaiting assessment',
              isPositive: false
            },
            icon: Users,
            variant: 'warning' as const
          }
        ];
      
      case 'controller':
        return [
          {
            title: 'Assessments',
            value: '89',
            trend: {
              value: 6,
              label: 'this week',
              isPositive: true
            },
            icon: Recycle,
            variant: 'warning' as const
          },
          {
            title: 'Quality Score',
            value: '94%',
            trend: {
              value: 2,
              label: 'improvement',
              isPositive: true
            },
            icon: Award,
            variant: 'success' as const
          },
          {
            title: 'Processed',
            value: '1.2 tons',
            trend: {
              value: 18,
              label: 'this month',
              isPositive: true
            },
            icon: Truck,
            variant: 'info' as const
          },
          {
            title: 'Efficiency',
            value: '87%',
            trend: {
              value: 5,
              label: 'vs target',
              isPositive: true
            },
            icon: Users,
            variant: 'default' as const
          }
        ];

      case 'driver':
        return [
          {
            title: 'Deliveries',
            value: '47',
            trend: {
              value: 9,
              label: 'this month',
              isPositive: true
            },
            icon: Truck,
            variant: 'info' as const
          },
          {
            title: 'Distance',
            value: '890 km',
            trend: {
              value: 12,
              label: 'total driven',
              isPositive: true
            },
            icon: Award,
            variant: 'success' as const
          },
          {
            title: 'Earnings',
            value: '₦45,600',
            trend: {
              value: 8,
              label: 'this month',
              isPositive: true
            },
            icon: Users,
            variant: 'warning' as const
          },
          {
            title: 'Rating',
            value: '4.8',
            trend: {
              value: 4,
              label: 'customer rating',
              isPositive: true
            },
            icon: Award,
            variant: 'default' as const
          }
        ];

      case 'recycler':
        return [
          {
            title: 'Orders',
            value: '23',
            trend: {
              value: 15,
              label: 'this quarter',
              isPositive: true
            },
            icon: Recycle,
            variant: 'info' as const
          },
          {
            title: 'Materials',
            value: '3.4 tons',
            trend: {
              value: 22,
              label: 'processed',
              isPositive: true
            },
            icon: Truck,
            variant: 'success' as const
          },
          {
            title: 'Cost Savings',
            value: '₦89,000',
            trend: {
              value: 11,
              label: 'vs market rate',
              isPositive: true
            },
            icon: Award,
            variant: 'warning' as const
          },
          {
            title: 'Suppliers',
            value: '12',
            trend: {
              value: 5,
              label: 'active partners',
              isPositive: true
            },
            icon: Users,
            variant: 'default' as const
          }
        ];

      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div 
      data-tour="stats-grid" 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
    >
      {stats.map((stat, index) => (
        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
