
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CollationCenterFormProps {
  isVisible: boolean;
  formData: {
    name: string;
    address: string;
    capacity_kg: string;
    controller_id: string;
  };
  onFormDataChange: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CollationCenterForm: React.FC<CollationCenterFormProps> = ({
  isVisible,
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  if (!isVisible) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Collation Center</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Center Name</label>
            <Input
              value={formData.name}
              onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
              placeholder="Enter center name"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Capacity (kg)</label>
            <Input
              type="number"
              value={formData.capacity_kg}
              onChange={(e) => onFormDataChange({ ...formData, capacity_kg: e.target.value })}
              placeholder="Enter capacity"
              disabled={isLoading}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <Input
            value={formData.address}
            onChange={(e) => onFormDataChange({ ...formData, address: e.target.value })}
            placeholder="Enter full address"
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Center'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollationCenterForm;
