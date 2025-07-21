
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { MapPin, Package, Star } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

interface InventoryItem {
  type: string;
  weight: number;
  quality: number;
  location: string;
  price: number;
  centerId: string;
}

interface PlaceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableInventory: InventoryItem[];
  onOrderPlaced: () => void;
}

const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  isOpen,
  onClose,
  availableInventory,
  onOrderPlaced,
}) => {
  const { user } = useAuth();
  const [selectedInventory, setSelectedInventory] = useState<string>('');
  const [requestedQuantity, setRequestedQuantity] = useState<number>(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const selectedItem = availableInventory.find(item => 
    `${item.centerId}-${item.type}` === selectedInventory
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !selectedItem) {
      toast.error('Please select an inventory item');
      return;
    }

    if (requestedQuantity <= 0 || requestedQuantity > selectedItem.weight) {
      toast.error(`Quantity must be between 1 and ${selectedItem.weight}kg`);
      return;
    }

    setIsPlacingOrder(true);

    try {
      const { error } = await supabase
        .from('pickup_requests')
        .insert({
          center_id: selectedItem.centerId,
          recycler_id: user.id,
          waste_type: selectedItem.type as Database["public"]["Enums"]["waste_type"],
          quantity_kg: requestedQuantity,
          price_per_kg: selectedItem.price,
          total_amount: requestedQuantity * selectedItem.price,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Order placed successfully!');
      onOrderPlaced();
      setSelectedInventory('');
      setRequestedQuantity(0);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-green-600 bg-green-100';
    if (quality >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const totalCost = selectedItem ? requestedQuantity * selectedItem.price : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Place Order
          </DialogTitle>
          <DialogDescription>
            Select inventory and specify the quantity you want to order
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inventory">Select Inventory</Label>
            <Select value={selectedInventory} onValueChange={setSelectedInventory}>
              <SelectTrigger>
                <SelectValue placeholder="Choose available plastic inventory" />
              </SelectTrigger>
              <SelectContent>
                {availableInventory.map((item, index) => (
                  <SelectItem 
                    key={index} 
                    value={`${item.centerId}-${item.type}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{item.type}</Badge>
                        <span>{item.weight}kg available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedItem && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Selected Item</span>
                <Badge className={`text-xs ${getQualityColor(selectedItem.quality)}`}>
                  <Star className="w-3 h-3 mr-1" />
                  Quality: {selectedItem.quality.toFixed(1)}/10
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span>
                  <p className="font-medium">{selectedItem.type}</p>
                </div>
                <div>
                  <span className="text-gray-500">Available:</span>
                  <p className="font-medium">{selectedItem.weight}kg</p>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>
                  <p className="font-medium">₦{selectedItem.price.toFixed(2)}/kg</p>
                </div>
                <div>
                  <span className="text-gray-500">Location:</span>
                  <p className="font-medium">{selectedItem.location}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (kg)</Label>
            <Input
              id="quantity"
              type="number"
              value={requestedQuantity || ''}
              onChange={(e) => setRequestedQuantity(Number(e.target.value))}
              placeholder="Enter quantity in kg"
              min="1"
              max={selectedItem?.weight || 1000}
              disabled={!selectedItem}
            />
            {selectedItem && (
              <p className="text-sm text-gray-500">
                Maximum available: {selectedItem.weight}kg
              </p>
            )}
          </div>

          {totalCost > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Cost</span>
                <span className="text-xl font-bold text-blue-600">
                  ₦{totalCost.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {requestedQuantity}kg × ₦{selectedItem?.price.toFixed(2)}/kg
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedItem || requestedQuantity <= 0 || isPlacingOrder}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceOrderModal;
