
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Truck, Zap } from 'lucide-react';

interface ControllerQuickActionsProps {
  pendingCount: number;
  onShowAssessments: () => void;
  onShowHistory: () => void;
  onLogDelivery?: () => void;
}

const ControllerQuickActions: React.FC<ControllerQuickActionsProps> = ({
  pendingCount,
  onShowAssessments,
  onShowHistory,
  onLogDelivery = () => {}
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={onShowAssessments}
            className="h-20 flex flex-col items-center justify-center space-y-2"
            variant={pendingCount > 0 ? 'default' : 'outline'}
          >
            <Clock className="w-6 h-6" />
            <div className="text-center">
              <div className="font-semibold">Start Assessments</div>
              <div className="text-xs opacity-80">
                {pendingCount} pending
              </div>
            </div>
          </Button>

          <Button
            onClick={onLogDelivery}
            className="h-20 flex flex-col items-center justify-center space-y-2"
            variant="outline"
          >
            <Truck className="w-6 h-6" />
            <div className="text-center">
              <div className="font-semibold">Log Delivery</div>
              <div className="text-xs opacity-80">
                Record marshal waste
              </div>
            </div>
          </Button>

          <Button
            onClick={onShowHistory}
            className="h-20 flex flex-col items-center justify-center space-y-2"
            variant="outline"
          >
            <FileText className="w-6 h-6" />
            <div className="text-center">
              <div className="font-semibold">View History</div>
              <div className="text-xs opacity-80">
                Past assessments
              </div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControllerQuickActions;
