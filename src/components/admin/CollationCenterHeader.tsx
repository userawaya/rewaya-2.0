
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CollationCenterHeaderProps {
  onAddCenter: () => void;
}

const CollationCenterHeader: React.FC<CollationCenterHeaderProps> = ({
  onAddCenter,
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Collation Centers</h1>
        <p className="text-gray-600 text-sm sm:text-base">Manage collection centers and their operations</p>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          onClick={onAddCenter}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Center
        </Button>
      </div>
    </div>
  );
};

export default CollationCenterHeader;
