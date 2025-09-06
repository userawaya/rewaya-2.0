
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Package, Clock, User, Scale, CheckSquare } from 'lucide-react';
import { usePendingAssessments } from '@/hooks/useControllerAssessments';
import WasteAssessmentForm from './WasteAssessmentForm';
import { Database } from '@/integrations/supabase/types';

type WasteType = Database['public']['Enums']['waste_type'];
type WasteStatus = Database['public']['Enums']['waste_status'];

interface PendingRecord {
  id: string;
  waste_type: WasteType;
  weight_kg: number;
  created_at: string;
  profiles: {
    full_name: string;
    phone?: string;
  };
  photo_url?: string;
  generator_id: string;
  center_id: string;
  status: WasteStatus;
  updated_at: string;
}

interface PendingAssessmentsQueueProps {
  data?: PendingRecord[];
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
}

const wasteTypeLabels = {
  PET: 'PET Bottles',
  HDPE: 'HDPE Containers', 
  PVC: 'PVC Packaging',
  LDPE: 'LDPE Bags',
  PP: 'PP Containers',
  PS: 'PS Foam',
  OTHER: 'Mixed Plastics'
};

const PendingAssessmentsQueue: React.FC<PendingAssessmentsQueueProps> = ({
  data: propData,
  selectedIds = [],
  onSelectionChange = () => {}
}) => {
  const { data: fetchedData, isLoading, error, refetch } = usePendingAssessments();
  const [assessingRecord, setAssessingRecord] = useState<PendingRecord | null>(null);
  const [bulkSelectMode, setBulkSelectMode] = useState(false);

  const data = propData || fetchedData;

  const handleSelectionToggle = (recordId: string) => {
    const newSelection = selectedIds.includes(recordId)
      ? selectedIds.filter(id => id !== recordId)
      : [...selectedIds, recordId];
    onSelectionChange(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === data?.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data?.map(record => record.id) || []);
    }
  };

  const handleAssessmentComplete = () => {
    setAssessingRecord(null);
    refetch();
  };

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
          <CardTitle className="text-red-600">Error Loading Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load pending assessments.</p>
          <Button onClick={() => refetch()} className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (assessingRecord) {
    // Convert PendingRecord to the format expected by WasteAssessmentForm
    const recordForAssessment = {
      ...assessingRecord,
      collation_centers: { name: 'Assessment Center' }
    };
    
    return (
      <WasteAssessmentForm
        record={recordForAssessment}
        onComplete={handleAssessmentComplete}
        onCancel={() => setAssessingRecord(null)}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Pending Assessments</span>
            <Badge variant="outline">{data?.length || 0} items</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setBulkSelectMode(!bulkSelectMode)}
            >
              <CheckSquare className="w-4 h-4 mr-1" />
              {bulkSelectMode ? 'Exit Bulk' : 'Bulk Select'}
            </Button>
            {bulkSelectMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedIds.length === data?.length ? 'Deselect All' : 'Select All'}
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending assessments</h3>
            <p className="text-gray-600">All submissions have been processed.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((record) => (
              <div
                key={record.id}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedIds.includes(record.id) 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {bulkSelectMode && (
                      <Checkbox
                        checked={selectedIds.includes(record.id)}
                        onCheckedChange={() => handleSelectionToggle(record.id)}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">
                          {wasteTypeLabels[record.waste_type as keyof typeof wasteTypeLabels] || record.waste_type}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          ID: {record.id.slice(-8)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{record.profiles.full_name}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Scale className="w-4 h-4 text-gray-400" />
                          <span>{record.weight_kg} kg</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(record.created_at).toLocaleDateString()} {' '}
                            {new Date(record.created_at).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {record.photo_url && (
                      <img
                        src={record.photo_url}
                        alt="Waste submission"
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                    )}
                    
                    <Button
                      onClick={() => setAssessingRecord(record)}
                      size="sm"
                      disabled={bulkSelectMode}
                    >
                      Assess
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingAssessmentsQueue;
