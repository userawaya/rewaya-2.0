
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import WasteSubmissionForm from '@/components/WasteSubmissionForm';
import { WasteRecord, creditsToNaira } from '@/hooks/useWasteRecords';

interface RecentSubmissionsProps {
  wasteRecords: WasteRecord[] | undefined;
  totalSubmissions: number;
  onSubmissionSuccess: () => void;
  onViewAll: () => void;
}

const RecentSubmissions: React.FC<RecentSubmissionsProps> = ({
  wasteRecords,
  totalSubmissions,
  onSubmissionSuccess,
  onViewAll
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recent Submissions</span>
          <Button variant="outline" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {totalSubmissions === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600 mb-4">Start earning by submitting your plastic waste!</p>
            <WasteSubmissionForm onSuccess={onSubmissionSuccess} />
          </div>
        ) : (
          <div className="space-y-3">
            {wasteRecords?.slice(0, 3).map((record) => {
              const isAwaitingAssessment = record.weight_kg === 0 && record.status === 'pending';
              return (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Package className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {record.waste_type} - {isAwaitingAssessment ? 'Pending Assessment' : `${record.weight_kg}kg`}
                      </p>
                      <p className="text-sm text-gray-600">{record.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {record.credits_earned ? (
                      <>
                        <p className="font-medium text-green-600">{record.credits_earned} pts</p>
                        <p className="text-xs text-gray-600">₦{creditsToNaira(record.credits_earned).toFixed(0)}</p>
                      </>
                    ) : (
                      <p className="font-medium text-gray-500">Pending</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentSubmissions;
