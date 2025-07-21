
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building2, 
  Package, 
  TrendingUp, 
  Users
} from 'lucide-react';
import { CollationCenter } from '@/hooks/useCollationCenters';

interface CollationCenterSummaryProps {
  centers: CollationCenter[] | undefined;
}

const CollationCenterSummary: React.FC<CollationCenterSummaryProps> = ({
  centers,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{centers?.length || 0}</p>
              <p className="text-sm text-gray-600">Total Centers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Package className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">
                {centers?.reduce((sum, center) => sum + (center.current_stock_kg || 0), 0) || 0}
              </p>
              <p className="text-sm text-gray-600">Total Stock (kg)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-amber-600" />
            <div>
              <p className="text-2xl font-bold">
                {centers?.reduce((sum, center) => sum + (center.capacity_kg || 0), 0) || 0}
              </p>
              <p className="text-sm text-gray-600">Total Capacity (kg)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{centers?.filter(c => c.controller_id).length || 0}</p>
              <p className="text-sm text-gray-600">Assigned Controllers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollationCenterSummary;
