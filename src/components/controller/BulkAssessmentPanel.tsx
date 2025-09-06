
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, X, Star } from 'lucide-react';
import { useBulkAssessment } from '@/hooks/useBulkAssessment';

interface BulkAssessmentPanelProps {
  selectedIds: string[];
  onClearSelection: () => void;
}

const BulkAssessmentPanel: React.FC<BulkAssessmentPanelProps> = ({
  selectedIds,
  onClearSelection
}) => {
  const { bulkAssess, bulkApprove, bulkReject, isProcessing } = useBulkAssessment();
  const [qualityScore, setQualityScore] = useState(7);
  const [notes, setNotes] = useState('');

  const handleBulkAssess = async () => {
    const success = await bulkAssess(selectedIds, qualityScore, notes);
    if (success) {
      onClearSelection();
      setNotes('');
    }
  };

  const handleBulkApprove = async () => {
    const success = await bulkApprove(selectedIds);
    if (success) onClearSelection();
  };

  const handleBulkReject = async () => {
    const success = await bulkReject(selectedIds);
    if (success) onClearSelection();
  };

  if (selectedIds.length === 0) return null;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5" />
            <span>Bulk Assessment</span>
            <Badge variant="outline">{selectedIds.length} selected</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={handleBulkApprove}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            Bulk Approve (Quality: 8)
          </Button>
          
          <Button
            onClick={handleBulkReject}
            disabled={isProcessing}
            variant="destructive"
          >
            Bulk Reject (Quality: 3)
          </Button>
          
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4" />
            <span className="text-sm">Custom:</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Quality Score (1-10)</label>
            <Input
              type="number"
              min="1"
              max="10"
              value={qualityScore}
              onChange={(e) => setQualityScore(Number(e.target.value))}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Textarea
              placeholder="Assessment notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <Button
          onClick={handleBulkAssess}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? 'Processing...' : 'Apply Custom Assessment'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BulkAssessmentPanel;
