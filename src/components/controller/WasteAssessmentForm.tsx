
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, User, MapPin, Star, Weight } from 'lucide-react';
import { useAssessWasteRecord, AssessmentData } from '@/hooks/useControllerAssessments';
import { WasteRecord } from '@/hooks/useWasteRecords';
import { format } from 'date-fns';

interface WasteAssessmentFormProps {
  record: WasteRecord & {
    profiles: { full_name: string };
    collation_centers: { name: string };
  };
  onComplete?: () => void;
  onCancel?: () => void;
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

const WasteAssessmentForm: React.FC<WasteAssessmentFormProps> = ({ record, onComplete, onCancel }) => {
  const [assessment, setAssessment] = useState<AssessmentData>({
    weight_kg: 0,
    quality_score: 5,
    status: 'sorted'
  });

  const assessMutation = useAssessWasteRecord();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (assessment.weight_kg <= 0) {
      return;
    }

    try {
      await assessMutation.mutateAsync({
        recordId: record.id,
        assessment
      });
      onComplete?.();
    } catch (error) {
      console.error('Assessment failed:', error);
    }
  };

  const estimatedCredits = Math.round(
    assessment.weight_kg * 5 * (1.0 + (assessment.quality_score - 1) / 9.0)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Assess Waste Submission</span>
          <Badge variant="outline">ID: {record.id.slice(-8)}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Submission Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm">
                <strong>Generator:</strong> {record.profiles.full_name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4 text-gray-600" />
              <span className="text-sm">
                <strong>Type:</strong> {wasteTypeLabels[record.waste_type]}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="text-sm">
                <strong>Center:</strong> {record.collation_centers.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-sm">
                <strong>Submitted:</strong> {format(new Date(record.created_at), 'MMM dd, HH:mm')}
              </span>
            </div>
          </div>

          {/* Photo Display */}
          {record.photo_url && (
            <div>
              <Label className="text-sm font-medium">Submitted Photo</Label>
              <div className="mt-2">
                <img
                  src={record.photo_url}
                  alt="Waste submission"
                  className="max-w-md w-full h-64 object-cover rounded-lg border"
                />
              </div>
            </div>
          )}

          {/* Assessment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight" className="flex items-center space-x-2">
                  <Weight className="w-4 h-4" />
                  <span>Actual Weight (kg)</span>
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={assessment.weight_kg || ''}
                  onChange={(e) => setAssessment(prev => ({ 
                    ...prev, 
                    weight_kg: parseFloat(e.target.value) || 0 
                  }))}
                  placeholder="Enter weight in kg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="quality" className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Quality Score (1-10)</span>
                </Label>
                <Select
                  value={assessment.quality_score.toString()}
                  onValueChange={(value) => setAssessment(prev => ({ 
                    ...prev, 
                    quality_score: parseInt(value) 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                      <SelectItem key={score} value={score.toString()}>
                        {score} - {score <= 3 ? 'Poor' : score <= 6 ? 'Average' : score <= 8 ? 'Good' : 'Excellent'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Processing Status</Label>
              <Select
                value={assessment.status}
                onValueChange={(value: any) => setAssessment(prev => ({ 
                  ...prev, 
                  status: value 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sorted">Sorted & Ready</SelectItem>
                  <SelectItem value="picked_up">Picked Up</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Credit Estimation */}
            {assessment.weight_kg > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-800">Estimated Credits:</span>
                  <span className="font-bold text-green-600">{estimatedCredits} points</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ≈ ₦{(estimatedCredits * 1.5).toFixed(0)} naira value
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button 
                type="submit" 
                disabled={assessment.weight_kg <= 0 || assessMutation.isPending}
                className="flex-1"
              >
                {assessMutation.isPending ? 'Processing...' : 'Complete Assessment'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteAssessmentForm;
