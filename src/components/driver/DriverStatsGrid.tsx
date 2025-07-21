
import React from 'react';
import StatCard from '@/components/StatCard';
import { MapPin, Clock, Award, Package, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DriverStatsGridProps {
  todayDeliveries: number;
  totalDistance: number;
  timeOnRoad: number;
  weeklyCompleted: number;
}

const DriverStatsGrid: React.FC<DriverStatsGridProps> = ({
  todayDeliveries,
  totalDistance,
  timeOnRoad,
  weeklyCompleted,
}) => {
  const { toast } = useToast();

  const handleStatClick = (statType: string, value: string) => {
    toast({
      title: `${statType} Details`,
      description: `Current ${statType.toLowerCase()}: ${value}`,
    });
    console.log(`Clicked on ${statType}:`, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-tour="stats-grid">
      <div onClick={() => handleStatClick('Deliveries', `${todayDeliveries} trips`)} className="cursor-pointer transform transition-transform hover:scale-105">
        <StatCard
          title="Today's Deliveries"
          value={`${todayDeliveries} trips`}
          icon={Package}
          variant="info"
          subtext={todayDeliveries > 0 ? `+${todayDeliveries} today` : 'No deliveries yet'}
        />
      </div>
      
      <div onClick={() => handleStatClick('Distance', `${totalDistance}km`)} className="cursor-pointer transform transition-transform hover:scale-105">
        <StatCard
          title="Total Distance"
          value={`${totalDistance}km`}
          icon={MapPin}
          variant="success"
          subtext={totalDistance > 0 ? 'Active tracking' : 'Start route'}
        />
      </div>
      
      <div onClick={() => handleStatClick('Time on Road', `${timeOnRoad.toFixed(1)}hrs`)} className="cursor-pointer transform transition-transform hover:scale-105">
        <StatCard
          title="Time on Road"
          value={`${timeOnRoad.toFixed(1)}hrs`}
          icon={Clock}
          variant="warning"
          subtext={timeOnRoad > 4 ? 'High activity' : 'Normal pace'}
        />
      </div>
      
      <div onClick={() => handleStatClick('Weekly Completed', `${weeklyCompleted} deliveries`)} className="cursor-pointer transform transition-transform hover:scale-105">
        <StatCard
          title="Weekly Completed"
          value={`${weeklyCompleted} deliveries`}
          icon={Award}
          variant="default"
          subtext={weeklyCompleted > 10 ? 'Excellent work!' : 'Keep it up!'}
        />
      </div>
    </div>
  );
};

export default DriverStatsGrid;
