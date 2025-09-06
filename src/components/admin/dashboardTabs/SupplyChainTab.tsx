
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Users, ShoppingCart, TrendingUp, Star } from 'lucide-react';

const SupplyChainTab: React.FC = () => {
  const mockSuppliers = [
    { id: 's-1', name: 'EcoPlastics Ltd', type: 'Raw Materials', status: 'active', rating: 4.8, orders: 24 },
    { id: 's-2', name: 'GreenPack Solutions', type: 'Packaging', status: 'active', rating: 4.6, orders: 18 },
    { id: 's-3', name: 'WasteTools Co', type: 'Equipment', status: 'pending', rating: 4.2, orders: 12 },
  ];

  const mockOrders = [
    { id: 'o-1', supplier: 'EcoPlastics Ltd', item: 'PET Pellets', quantity: '500 kg', status: 'delivered', value: '$2,400' },
    { id: 'o-2', supplier: 'GreenPack Solutions', item: 'Biodegradable Bags', quantity: '1000 units', status: 'shipping', value: '$850' },
    { id: 'o-3', supplier: 'WasteTools Co', item: 'Sorting Equipment', quantity: '1 unit', status: 'processing', value: '$15,000' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Supply Chain Management</h2>
          <p className="text-gray-600">Manage suppliers, procurement, and vendor relationships</p>
        </div>
        <Button>
          <Package className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      <Tabs defaultValue="suppliers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="procurement">Procurement</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSuppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>{supplier.name}</span>
                    </span>
                    <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                      {supplier.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Type:</strong> {supplier.type}</p>
                    <p className="text-sm"><strong>Rating:</strong> {supplier.rating}/5.0</p>
                    <p className="text-sm"><strong>Orders:</strong> {supplier.orders}</p>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Star className="w-4 h-4 mr-1" />
                        Rate
                      </Button>
                      <Button size="sm" className="flex-1">
                        Contact
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="procurement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Purchase Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Sorting Equipment Upgrade</h4>
                    <p className="text-sm text-gray-600">Requested by: Operations Team</p>
                    <p className="text-sm text-gray-600">Budget: $25,000</p>
                    <Button size="sm" className="mt-2">Review</Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Raw Material Restock</h4>
                    <p className="text-sm text-gray-600">Requested by: Production</p>
                    <p className="text-sm text-gray-600">Budget: $5,500</p>
                    <Button size="sm" className="mt-2">Review</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Procurement Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly Budget:</span>
                    <span className="font-semibold">$50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spent This Month:</span>
                    <span className="font-semibold">$32,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className="font-semibold text-green-600">$17,600</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{order.item}</h4>
                      <p className="text-sm text-gray-600">
                        {order.supplier} • {order.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{order.value}</div>
                      <Badge variant={
                        order.status === 'delivered' ? 'default' :
                        order.status === 'shipping' ? 'secondary' : 'outline'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$125,400</div>
                  <p className="text-sm text-gray-600">Total Procurement</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <p className="text-sm text-gray-600">Active Suppliers</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">96%</div>
                  <p className="text-sm text-gray-600">On-time Delivery</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Supply Chain Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Supply chain performance charts would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChainTab;
