
import React from 'react';
import ActionTile from '@/components/ActionTile';
import { 
  Package, 
  ShoppingCart, 
  Eye,
  BarChart3,
  Building2,
  Star
} from 'lucide-react';

interface RecyclerQuickActionsProps {
  onBrowseInventory: () => void;
  onPlaceOrder: () => void;
  onViewQualityReports: () => void;
  onViewSupplierDirectory: () => void;
  onViewAnalytics: () => void;
}

const RecyclerQuickActions: React.FC<RecyclerQuickActionsProps> = ({
  onBrowseInventory,
  onPlaceOrder,
  onViewQualityReports,
  onViewSupplierDirectory,
  onViewAnalytics,
}) => {
  return (
    <div data-tour="quick-actions">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActionTile
          title="Browse Inventory"
          description="View available plastic stock"
          icon={Package}
          variant="recycler"
          onClick={onBrowseInventory}
        />
        <ActionTile
          title="Place Order"
          description="Request plastic delivery"
          icon={ShoppingCart}
          variant="recycler"
          onClick={onPlaceOrder}
        />
        <ActionTile
          title="Quality Reports"
          description="View plastic assessments"
          icon={Eye}
          variant="default"
          onClick={onViewQualityReports}
        />
        <ActionTile
          title="Supplier Directory"
          description="Find reliable suppliers"
          icon={Building2}
          variant="default"
          onClick={onViewSupplierDirectory}
        />
        <ActionTile
          title="Analytics"
          description="Track performance metrics"
          icon={BarChart3}
          variant="default"
          onClick={onViewAnalytics}
        />
        <ActionTile
          title="Quality Standards"
          description="Material specifications"
          icon={Star}
          variant="default"
          onClick={onViewQualityReports}
        />
      </div>
    </div>
  );
};

export default RecyclerQuickActions;
