import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useAllCentersInventory } from '@/hooks/useCenterInventory';
import { useCollationCenters } from '@/hooks/useCollationCenters';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  Building2,
  TrendingUp,
  Search
} from 'lucide-react';

type WasteType = Database['public']['Enums']['waste_type'];

const InventoryManager: React.FC = () => {
  const { data: inventory, isLoading, refetch } = useAllCentersInventory();
  const { data: centers } = useCollationCenters();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCenter, setFilterCenter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    center_id: '',
    waste_type: '' as WasteType | '',
    weight_kg: '',
    quality_score: '',
    price_per_kg: ''
  });

  const wasteTypes: WasteType[] = ['PET', 'HDPE', 'PP', 'LDPE', 'PVC', 'PS', 'OTHER'];

  const handleAddItem = async () => {
    try {
      const { error } = await supabase
        .from('plastic_inventory')
        .insert({
          center_id: newItem.center_id,
          waste_type: newItem.waste_type as WasteType,
          weight_kg: parseFloat(newItem.weight_kg),
          quality_score: parseFloat(newItem.quality_score),
          price_per_kg: parseFloat(newItem.price_per_kg),
          available: true
        });

      if (error) throw error;

      toast({
        title: "Inventory Added",
        description: `${newItem.waste_type} inventory has been added successfully.`,
      });

      setIsAddModalOpen(false);
      setNewItem({
        center_id: '',
        waste_type: '',
        weight_kg: '',
        quality_score: '',
        price_per_kg: ''
      });
      refetch();
    } catch (error) {
      console.error('Error adding inventory:', error);
      toast({
        title: "Error",
        description: "Failed to add inventory item.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = async (itemId: string, wasteType: string) => {
    try {
      const { error } = await supabase
        .from('plastic_inventory')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Item Deleted",
        description: `${wasteType} inventory has been removed.`,
        variant: "destructive",
      });
      refetch();
    } catch (error) {
      console.error('Error deleting inventory:', error);
      toast({
        title: "Error",
        description: "Failed to delete inventory item.",
        variant: "destructive",
      });
    }
  };

  const filteredInventory = inventory?.filter(item => {
    const matchesSearch = item.waste_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.center?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCenter = filterCenter === 'all' || item.center_id === filterCenter;
    return matchesSearch && matchesCenter;
  }) || [];

  const totalValue = filteredInventory.reduce((sum, item) => sum + (item.weight_kg * item.price_per_kg), 0);
  const totalWeight = filteredInventory.reduce((sum, item) => sum + item.weight_kg, 0);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage plastic inventory across all centers</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Inventory
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Center</Label>
                <Select value={newItem.center_id} onValueChange={(value) => setNewItem({...newItem, center_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Center" />
                  </SelectTrigger>
                  <SelectContent>
                    {centers?.map(center => (
                      <SelectItem key={center.id} value={center.id}>{center.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Waste Type</Label>
                <Select value={newItem.waste_type} onValueChange={(value: WasteType) => setNewItem({...newItem, waste_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {wasteTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Weight (kg)</Label>
                  <Input 
                    type="number" 
                    value={newItem.weight_kg}
                    onChange={(e) => setNewItem({...newItem, weight_kg: e.target.value})}
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <Label>Quality Score (1-10)</Label>
                  <Input 
                    type="number" 
                    min="1" 
                    max="10" 
                    step="0.1"
                    value={newItem.quality_score}
                    onChange={(e) => setNewItem({...newItem, quality_score: e.target.value})}
                    placeholder="8.5"
                  />
                </div>
              </div>
              <div>
                <Label>Price per kg (₦)</Label>
                <Input 
                  type="number" 
                  step="0.01"
                  value={newItem.price_per_kg}
                  onChange={(e) => setNewItem({...newItem, price_per_kg: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem} disabled={!newItem.center_id || !newItem.waste_type}>
                  Add Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{filteredInventory.length}</p>
                <p className="text-sm text-gray-600">Total Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalWeight.toFixed(1)}kg</p>
                <p className="text-sm text-gray-600">Total Weight</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">₦{totalValue.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-8 h-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold">{centers?.length || 0}</p>
                <p className="text-sm text-gray-600">Active Centers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCenter} onValueChange={setFilterCenter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Centers</SelectItem>
                {centers?.map(center => (
                  <SelectItem key={center.id} value={center.id}>{center.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInventory.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{item.waste_type}</Badge>
                  <Badge variant={item.quality_score >= 8 ? "default" : item.quality_score >= 6 ? "secondary" : "destructive"}>
                    {item.quality_score.toFixed(1)}/10
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteItem(item.id, item.waste_type)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium text-lg">{item.weight_kg}kg available</p>
                <p className="text-sm text-gray-600">{item.center?.name}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Price per kg</span>
                <span className="font-semibold text-green-600">₦{item.price_per_kg.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Value</span>
                <span className="font-semibold">₦{(item.weight_kg * item.price_per_kg).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryManager;
