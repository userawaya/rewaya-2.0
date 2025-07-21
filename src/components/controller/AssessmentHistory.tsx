import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Award, Package, Truck } from 'lucide-react';
import { useAssessmentHistory } from '@/hooks/useAssessmentHistory';
import { format } from 'date-fns';

const wasteTypeLabels = {
  PET: 'PET Bottles',
  HDPE: 'HDPE Containers',
  PVC: 'PVC Packaging',
  LDPE: 'LDPE Bags',
  PP: 'PP Containers',
  PS: 'PS Foam',
  OTHER: 'Mixed Plastics'
};

const getQualityBadge = (score: number, type: 'assessment' | 'marshal_delivery') => {
  if (type === 'marshal_delivery' && score === 0) {
    return <Badge className="bg-gray-100 text-gray-600">Not Assessed</Badge>;
  }
  
  if (score >= 8) return <Badge className="bg-green-100 text-green-800">High Quality</Badge>;
  if (score >= 5) return <Badge className="bg-yellow-100 text-yellow-800">Medium Quality</Badge>;
  return <Badge className="bg-red-100 text-red-800">Low Quality</Badge>;
};

const AssessmentHistory: React.FC = () => {
  const { data: history, isLoading, error } = useAssessmentHistory(20);

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
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load assessment history.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Recent Activities</span>
          <Badge variant="outline">{history?.length || 0} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!history || history.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
            <p className="text-gray-600">Completed assessments and marshal deliveries will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Waste Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Quality/Status</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={`${item.type}-${item.id}`}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {item.type === 'marshal_delivery' ? (
                          <Truck className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Package className="w-4 h-4 text-green-600" />
                        )}
                        <span className="text-sm font-medium">
                          {item.type === 'marshal_delivery' ? 'Delivery' : 'Assessment'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.generator_name}
                    </TableCell>
                    <TableCell>
                      {wasteTypeLabels[item.waste_type as keyof typeof wasteTypeLabels] || item.waste_type}
                    </TableCell>
                    <TableCell>{item.weight_kg}kg</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getQualityBadge(item.quality_score, item.type)}
                        {item.quality_score > 0 && (
                          <span className="text-sm text-gray-600">({item.quality_score}/10)</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.credits_earned > 0 ? (
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{item.credits_earned}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {format(new Date(item.created_at), 'MMM dd, HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AssessmentHistory;
