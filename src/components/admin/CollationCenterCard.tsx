
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  MapPin, 
  Edit, 
  Trash2, 
  Users, 
  Package
} from 'lucide-react';
import { CollationCenter } from '@/hooks/useCollationCenters';

interface CollationCenterCardProps {
  center: CollationCenter;
  onDelete: (centerId: string, centerName: string) => void;
}

const CollationCenterCard: React.FC<CollationCenterCardProps> = ({
  center,
  onDelete,
}) => {
  const utilizationPercentage = center.capacity_kg 
    ? ((center.current_stock_kg || 0) / center.capacity_kg) * 100 
    : 0;

  const getUtilizationColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">{center.name}</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(center.id, center.name)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
          <span className="text-sm text-gray-600">{center.address}</span>
        </div>

        {/* Capacity Information */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Capacity Utilization</span>
            <span className={`text-sm font-semibold ${getUtilizationColor(center.current_stock_kg || 0, center.capacity_kg || 1000)}`}>
              {utilizationPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                utilizationPercentage >= 90 ? 'bg-red-500' :
                utilizationPercentage >= 70 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{center.current_stock_kg || 0} kg</span>
            <span>{center.capacity_kg || 1000} kg</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-lg font-semibold">12</span>
            </div>
            <span className="text-xs text-gray-500">Active Users</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Package className="w-4 h-4 text-green-500" />
              <span className="text-lg font-semibold">45</span>
            </div>
            <span className="text-xs text-gray-500">This Month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollationCenterCard;
