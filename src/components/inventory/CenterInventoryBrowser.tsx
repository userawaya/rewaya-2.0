
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAllCentersInventory, useCenterInventory } from '@/hooks/useCenterInventory';
import { useCollationCenters } from '@/hooks/useCollationCenters';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp, 
  Package,
  Building2,
  ShoppingCart,
  Eye
} from 'lucide-react';

interface CenterInventoryBrowserProps {
  selectedCenterId?: string;
  onCenterChange?: (centerId: string) => void;
  showOrderButton?: boolean;
  compact?: boolean;
}

const CenterInventoryBrowser: React.FC<CenterInventoryBrowserProps> = ({
  selectedCenterId,
  onCenterChange,
  showOrderButton = true,
  compact = false
}) => {
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: centers } = useCollationCenters();
  const { data: allInventory, isLoading: loadingAll, refetch: refetchAll } = useAllCentersInventory();
  const { data: centerInventory, isLoading: loadingCenter, refetch: refetchCenter } = useCenterInventory(selectedCenterId);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('quality');
  const [isPlacingOrder, setIsPlacingOrder] = useState<string | null>(null);

  const inventory = selectedCenterId ? centerInventory : allInventory;
  const isLoading = selectedCenterId ? loadingCenter : loadingAll;
  const refetch = selectedCenterId ? refetchCenter : refetchAll;

  const handleOrder = async (item: any) => {
    if (!user?.id) {
      toast.error('You must be logged in to place an order');
      return;
    }

    if (profile?.role !== 'recycler') {
      toast.error('Only recyclers can place orders');
      return;
    }

    setIsPlacingOrder(item.id);

    try {
      const { error } = await supabase
        .from('pickup_requests')
        .insert({
          center_id: item.center_id,
          recycler_id: user.id,
          waste_type: item.waste_type,
          quantity_kg: item.weight_kg,
          price_per_kg: item.price_per_kg,
          total_amount: item.weight_kg * item.price_per_kg,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Order placed successfully!');
      refetch();
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

  const filteredInventory = inventory
    ?.filter(item => {
      const matchesSearch = item.waste_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.center?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.center?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || item.waste_type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'quality':
          return b.quality_score - a.quality_score;
        case 'weight':
          return b.weight_kg - a.weight_kg;
        case 'price':
          return a.price_per_kg - b.price_per_kg;
        default:
          return 0;
      }
    }) || [];

  const wasteTypes = ['PET', 'HDPE', 'PP', 'LDPE', 'PVC', 'PS'];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {selectedCenterId ? 'Center Inventory' : 'All Centers Inventory'}
          </CardTitle>
          <Badge variant="secondary">
            {filteredInventory.length} items
          </Badge>
        </div>
        
        {!compact && (
          <div className="space-y-4">
            {/* Center Selector */}
            {onCenterChange && (
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <Select value={selectedCenterId || 'all'} onValueChange={(value) => onCenterChange(value === 'all' ? '' : value)}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Select Center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Centers</SelectItem>
                    {centers?.map(center => (
                      <SelectItem key={center.id} value={center.id}>
                        {center.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by type, center, or location..."
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
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredInventory.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm || filterType !== 'all' 
                  ? 'No inventory matches your filters' 
                  : 'No inventory available at the moment'
                }
              </p>
            </div>
          ) : (
            filteredInventory.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-medium">
                      {item.waste_type}
                    </Badge>
                    <Badge className={`text-xs ${getQualityColor(item.quality_score)}`}>
                      Quality: {item.quality_score.toFixed(1)}/10
                    </Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-green-600">
                      ₦{item.price_per_kg.toFixed(2)}/kg
                    </span>
                    <p className="text-sm text-gray-500">
                      Total: ₦{(item.weight_kg * item.price_per_kg).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{item.weight_kg}kg available</span>
                    {item.center && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.center.name} - {item.center.address}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                  </Button>
                  
                  {showOrderButton && profile?.role === 'recycler' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleOrder(item)}
                      disabled={isPlacingOrder === item.id}
                      className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      {isPlacingOrder === item.id ? 'Placing...' : 'Place Order'}
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CenterInventoryBrowser;
