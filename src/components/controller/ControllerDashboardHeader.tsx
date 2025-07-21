
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ControllerDashboardHeaderProps {
  userName: string;
  pendingCount: number;
  todayAssessments: number;
  onStartAssessments: () => void;
}

const ControllerDashboardHeader: React.FC<ControllerDashboardHeaderProps> = ({
  userName,
  pendingCount,
  todayAssessments,
  onStartAssessments
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h1>
        <p className="text-gray-600">
          {pendingCount} pending assessment{pendingCount !== 1 ? 's' : ''} • {todayAssessments} completed today
        </p>
      </div>
      <Button 
        className="bg-amber-600 hover:bg-amber-700"
        onClick={onStartAssessments}
        disabled={pendingCount === 0}
      >
        <Plus className="w-4 h-4 mr-2" />
        {pendingCount > 0 ? `Assess ${pendingCount} Item${pendingCount !== 1 ? 's' : ''}` : 'No Items to Assess'}
      </Button>
    </div>
  );
};

export default ControllerDashboardHeader;
