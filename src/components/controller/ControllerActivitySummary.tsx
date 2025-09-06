import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Play, Truck } from 'lucide-react';
import { creditsToNaira } from '@/hooks/useWasteRecords';
import { AssessmentStats } from '@/hooks/useAssessmentAnalytics';
interface PendingRecord {
  id: string;
  waste_type: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}
interface ControllerActivitySummaryProps {
  pendingCount: number;
  pendingRecords?: PendingRecord[];
  stats?: AssessmentStats;
  averageQuality: number;
  onShowAssessments: () => void;
}
const ControllerActivitySummary: React.FC<ControllerActivitySummaryProps> = ({
  pendingCount,
  pendingRecords,
  stats,
  averageQuality,
  onShowAssessments
}) => {
  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {pendingCount > 0 ? <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Submissions
              <span className="text-sm font-normal text-orange-600">{pendingCount} pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRecords?.slice(0, 3).map(record => <div key={record.id} className="flex items-center justify-between p-3 border border-orange-200 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {record.id.slice(-8)} • {record.profiles.full_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {record.waste_type} • {new Date(record.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700" onClick={onShowAssessments}>
                    Assess
                  </Button>
                </div>)}
              {pendingCount > 3 && <Button variant="outline" className="w-full" onClick={onShowAssessments}>
                  View All {pendingCount} Pending Assessments
                </Button>}
            </div>
          </CardContent>
        </Card> : <Card>
          <CardHeader>
            <CardTitle>Assessment Queue</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">No pending assessments at the moment.</p>
          </CardContent>
        </Card>}

      <Card>
        <CardHeader>
          <CardTitle>Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">High Quality</p>
                <p className="text-2xl font-bold text-green-600">{stats?.qualityBreakdown.high || 0}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">Medium Quality</p>
                <p className="text-2xl font-bold text-yellow-600">{stats?.qualityBreakdown.medium || 0}</p>
              </div>
            </div>
            
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-800">Low Quality</p>
              </div>
              <p className="text-2xl font-bold text-red-600">{stats?.qualityBreakdown.low || 0}</p>
              <p className="text-xs text-red-600">Poor condition items</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-blue-800">Total Processed Today</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats?.todayAssessments || 0}</p>
              <p className="text-xs text-blue-600">Includes generator's waste assessments &amp; marshal deliveries</p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Quality Score</span>
                <span className="font-bold text-gray-900">
                  {averageQuality > 0 ? `${averageQuality.toFixed(1)}/10` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Credits Issued</span>
                <span className="font-bold text-green-600">
                  ₦{creditsToNaira(stats?.creditsIssued || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default ControllerActivitySummary;