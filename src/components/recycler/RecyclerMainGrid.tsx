
import React from 'react';
import InventoryBrowser from './InventoryBrowser';
import OrderTracker from './OrderTracker';

interface RecyclerMainGridProps {
  availableInventory: any[];
  myOrders: any[];
  onOrderPlaced: () => void;
}

const RecyclerMainGrid: React.FC<RecyclerMainGridProps> = ({
  availableInventory,
  myOrders,
  onOrderPlaced,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InventoryBrowser
        availableInventory={availableInventory}
        onOrderPlaced={onOrderPlaced}
      />

      <OrderTracker
        myOrders={myOrders}
      />
    </div>
  );
};

export default RecyclerMainGrid;
