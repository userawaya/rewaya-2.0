
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Truck, Fuel, Wrench, Route, BarChart } from 'lucide-react';

const LogisticsTab: React.FC = () => {
  const mockVehicles = [
    { id: 'v-1', plate: 'TR-001', type: 'Truck', fuel: 75, maintenance: 'Good', mileage: 45000 },
    { id: 'v-2', plate: 'TR-002', type: 'Van', fuel: 40, maintenance: 'Due', mileage: 32000 },
    { id: 'v-3', plate: 'TR-003', type: 'Truck', fuel: 90, maintenance: 'Good', mileage: 28000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Logistics & Transportation</h2>
          <p className="text-gray-600">Manage fleet, routes, and transportation logistics</p>
        </div>
        <Button>
          <Truck className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <Tabs defaultValue="fleet" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
          <TabsTrigger value="routes">Route Optimization</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Management</TabsTrigger>
          <TabsTrigger value="analytics">Logistics Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Truck className="w-5 h-5" />
                      <span>{vehicle.plate}</span>
                    </span>
                    <Badge variant={vehicle.maintenance === 'Good' ? 'default' : 'destructive'}>
                      {vehicle.maintenance}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Type:</strong> {vehicle.type}</p>
                    <p className="text-sm"><strong>Fuel Level:</strong> {vehicle.fuel}%</p>
                    <p className="text-sm"><strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} km</p>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Wrench className="w-4 h-4 mr-1" />
                        Maintain
                      </Button>
                      <Button size="sm" className="flex-1">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Route className="w-5 h-5" />
                <span>Route Optimization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Average Route Time:</span>
                        <span className="font-semibold">4.2 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Efficiency:</span>
                        <span className="font-semibold">12.5 km/L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>On-time Delivery:</span>
                        <span className="font-semibold">94%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Optimization Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <Route className="w-4 h-4 mr-2" />
                        Optimize for Distance
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Fuel className="w-4 h-4 mr-2" />
                        Optimize for Fuel
                      </Button>
                      <Button className="w-full" variant="outline">
                        <BarChart className="w-4 h-4 mr-2" />
                        Optimize for Time
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fuel" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Fuel className="w-5 h-5" />
                  <span>Fuel Consumption</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">1,250L</div>
                      <p className="text-sm text-gray-600">This Month</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$3,200</div>
                      <p className="text-sm text-gray-600">Fuel Cost</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Fuel efficiency chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8,450</div>
                  <p className="text-sm text-gray-600">Total KM This Month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <p className="text-sm text-gray-600">Deliveries Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">96%</div>
                  <p className="text-sm text-gray-600">Fleet Utilization</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LogisticsTab;
