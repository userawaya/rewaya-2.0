
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckSquare } from 'lucide-react';

interface BulkActionsPanelProps {
  selectedUsers: string[];
  bulkAction: string;
  setBulkAction: (action: string) => void;
  onBulkAction: () => void;
  onClearSelection: () => void;
  isProcessing: boolean;
}

const BulkActionsPanel: React.FC<BulkActionsPanelProps> = ({
  selectedUsers,
  bulkAction,
  setBulkAction,
  onBulkAction,
  onClearSelection,
  isProcessing
}) => {
  if (selectedUsers.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckSquare className="w-5 h-5" />
          <span>Bulk Actions ({selectedUsers.length} selected)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select action..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activate">Activate Users</SelectItem>
              <SelectItem value="deactivate">Deactivate Users</SelectItem>
              <SelectItem value="suspend">Suspend Users</SelectItem>
              <SelectItem value="verify-email">Verify Email</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={onBulkAction}
            disabled={!bulkAction || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Apply Action'}
          </Button>
          <Button 
            variant="outline" 
            onClick={onClearSelection}
          >
            Clear Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkActionsPanel;
