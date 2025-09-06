
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Search, Filter, MapPin, TrendingUp } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

interface InventoryItem {
  type: string;
  weight: number;
  quality: number;
  location: string;
  price: number;
  centerId: string;
}

interface InventoryBrowserProps {
  availableInventory: InventoryItem[];
  onOrderPlaced: () => void;
}

const InventoryBrowser: React.FC<InventoryBrowserProps> = ({
  availableInventory,
  onOrderPlaced,
}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('quality');
  const [isPlacingOrder, setIsPlacingOrder] = useState<string | null>(null);

  const handleOrder = async (item: InventoryItem) => {
    if (!user?.id) {
      toast.error('You must be logged in to place an order');
      return;
    }

    setIsPlacingOrder(item.centerId);

    try {
      const { error } = await supabase
        .from('pickup_requests')
        .insert({
          center_id: item.centerId,
          recycler_id: user.id,
          waste_type: item.type as Database["public"]["Enums"]["waste_type"],
          quantity_kg: item.weight,
          price_per_kg: item.price,
          total_amount: item.weight * item.price,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Order placed successfully!');
      onOrderPlaced();
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setIsPlacingOrder(null);
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-green-600 bg-green-100';
    if (quality >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredInventory = availableInventory
    .filter(item => {
      const matchesSearch = item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'quality':
          return b.quality - a.quality;
        case 'weight':
          return b.weight - a.weight;
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

  const wasteTypes = ['PET', 'HDPE', 'PP', 'LDPE', 'PVC', 'PS'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Available Inventory
          </CardTitle>
          <Badge variant="secondary">
            {filteredInventory.length} items
          </Badge>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by type or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {wasteTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <TrendingUp className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quality">Quality</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredInventory.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? 'No inventory matches your filters' 
                  : 'No inventory available at the moment'
                }
              </p>
            </div>
          ) : (
            filteredInventory.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-medium">
                      {item.type}
                    </Badge>
                    <Badge className={`text-xs ${getQualityColor(item.quality)}`}>
                      Quality: {item.quality.toFixed(1)}/10
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-green-600">
                      ₦{item.price.toFixed(2)}/kg
                    </span>
                    <p className="text-sm text-gray-500">
                      Total: ₦{(item.weight * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{item.weight}kg available</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    size="sm" 
                    onClick={() => handleOrder(item)}
                    disabled={isPlacingOrder === item.centerId}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isPlacingOrder === item.centerId ? 'Placing...' : 'Place Order'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryBrowser;
