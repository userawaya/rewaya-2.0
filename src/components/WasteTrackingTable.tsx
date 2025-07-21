
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Calendar, Package, Star, Clock } from 'lucide-react';
import { useWasteRecords, WasteRecord, creditsToNaira } from '@/hooks/useWasteRecords';
import { useCollationCenters } from '@/hooks/useCollationCenters';
import { format } from 'date-fns';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  sorted: 'bg-blue-100 text-blue-800',
  picked_up: 'bg-purple-100 text-purple-800',
  delivered: 'bg-orange-100 text-orange-800',
  recycled: 'bg-green-100 text-green-800'
};

const wasteTypeLabels = {
  PET: 'PET Bottles',
  HDPE: 'HDPE Containers',
  PVC: 'PVC Packaging',
  LDPE: 'LDPE Bags',
  PP: 'PP Containers',
  PS: 'PS Foam',
  OTHER: 'Mixed Plastics'
};

const WasteTrackingTable: React.FC = () => {
  const { data: wasteRecords, isLoading, error } = useWasteRecords();
  const { data: centers } = useCollationCenters();

  // Create a map of center IDs to center names for display
  const centerMap = centers?.reduce((acc, center) => {
    acc[center.id] = center.name;
    return acc;
  }, {} as Record<string, string>) || {};

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load waste records. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!wasteRecords || wasteRecords.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-green-600" />
            <span>Your Waste Submissions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
            <p className="text-gray-600 mb-4">Start earning credits by submitting your plastic waste!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-green-600" />
          <span>Your Waste Submissions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wasteRecords.map((record: WasteRecord) => {
            const isAwaitingAssessment = record.weight_kg === 0 && record.status === 'pending';
            const hasCredits = record.credits_earned && record.credits_earned > 0;
            
            return (
              <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isAwaitingAssessment ? 'bg-yellow-100' : 'bg-green-100'}`}>
                      {isAwaitingAssessment ? (
                        <Clock className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <Package className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {wasteTypeLabels[record.waste_type]}
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(record.created_at), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <Badge className={statusColors[record.status]}>
                    {isAwaitingAssessment ? 'AWAITING ASSESSMENT' : record.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="font-medium">
                      {isAwaitingAssessment ? 'Pending' : `${record.weight_kg} kg`}
                    </p>
                  </div>
                  {record.quality_score && (
                    <div>
                      <p className="text-xs text-gray-500">Quality Score</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <p className="font-medium">{record.quality_score}/10</p>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Credits Earned</p>
                    {hasCredits ? (
                      <div>
                        <p className="font-medium text-green-600">
                          {record.credits_earned} pts
                        </p>
                        <p className="text-xs text-gray-600">
                          ≈ ₦{creditsToNaira(record.credits_earned).toFixed(0)}
                        </p>
                      </div>
                    ) : (
                      <p className="font-medium text-gray-500">
                        {isAwaitingAssessment ? 'Pending' : '0 pts'}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Collection Center</p>
                    <p className="font-medium text-gray-800">
                      {centerMap[record.center_id] || 'Unknown Center'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {record.photo_url && (
                    <div className="mt-3">
                      <img
                        src={record.photo_url}
                        alt="Waste submission"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteTrackingTable;
