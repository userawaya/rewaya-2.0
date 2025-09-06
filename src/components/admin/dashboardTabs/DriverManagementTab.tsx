
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Truck, MapPin, Clock, Route, Navigation } from 'lucide-react';

const DriverManagementTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockDrivers = [
    { id: 'dr-1', name: 'John Smith', vehicle: 'TR-001', status: 'on-route', deliveries: 12, location: 'Downtown' },
    { id: 'dr-2', name: 'Maria Garcia', vehicle: 'TR-002', status: 'available', deliveries: 8, location: 'Base' },
    { id: 'dr-3', name: 'David Lee', vehicle: 'TR-003', status: 'break', deliveries: 15, location: 'Industrial Zone' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Driver Management</h2>
          <p className="text-gray-600">Manage drivers, vehicles, and delivery assignments</p>
        </div>
        <Button>
          <Truck className="w-4 h-4 mr-2" />
          Add Driver
        </Button>
      </div>

      <Tabs defaultValue="drivers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="space-y-4">
          <div className="flex space-x-4 mb-6">
            <Input
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDrivers.map((driver) => (
              <Card key={driver.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Truck className="w-5 h-5" />
                      <span>{driver.name}</span>
                    </span>
                    <Badge variant={
                      driver.status === 'on-route' ? 'default' :
                      driver.status === 'available' ? 'secondary' : 'outline'
                    }>
                      {driver.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Vehicle:</strong> {driver.vehicle}</p>
                    <p className="text-sm"><strong>Today's Deliveries:</strong> {driver.deliveries}</p>
                    <p className="text-sm"><strong>Location:</strong> {driver.location}</p>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        Track
                      </Button>
                      <Button size="sm" className="flex-1">
                        Assign
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Fleet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <p className="text-sm text-gray-600">Total Vehicles</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">6</div>
                        <p className="text-sm text-gray-600">Active</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">2</div>
                        <p className="text-sm text-gray-600">Maintenance</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDrivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">{driver.name}</h4>
                        <p className="text-sm text-gray-600">
                          {driver.vehicle} • {driver.deliveries} deliveries
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Route className="w-4 h-4 mr-1" />
                      View Route
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span>Live Vehicle Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600">Live Map Integration</h3>
                  <p className="text-gray-500">Real-time vehicle tracking would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverManagementTab;
