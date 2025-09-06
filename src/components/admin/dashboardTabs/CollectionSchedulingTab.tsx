
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, MapPin, Clock, Route, Navigation, Calendar as CalendarIcon } from 'lucide-react';

const CollectionSchedulingTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedRoute, setSelectedRoute] = useState('all');

  const mockRoutes = [
    { id: 'route-1', name: 'Downtown Route', driver: 'John Doe', stops: 12, status: 'active' },
    { id: 'route-2', name: 'Industrial Zone', driver: 'Jane Smith', stops: 8, status: 'in-progress' },
    { id: 'route-3', name: 'Residential East', driver: 'Mike Johnson', stops: 15, status: 'pending' },
  ];

  const mockPickups = [
    { id: 'pickup-1', center: 'Green Valley Center', time: '09:00', status: 'scheduled', weight: '250kg' },
    { id: 'pickup-2', center: 'Industrial Hub', time: '11:30', status: 'in-progress', weight: '500kg' },
    { id: 'pickup-3', center: 'City Center', time: '14:00', status: 'completed', weight: '180kg' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Collection Scheduling</h2>
          <p className="text-gray-600">Manage waste collection routes and schedules</p>
        </div>
        <Button>
          <Truck className="w-4 h-4 mr-2" />
          Create New Route
        </Button>
      </div>

      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="optimization">Route Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRoutes.map((route) => (
              <Card key={route.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Route className="w-5 h-5" />
                      <span>{route.name}</span>
                    </span>
                    <Badge variant={route.status === 'active' ? 'default' : route.status === 'in-progress' ? 'secondary' : 'outline'}>
                      {route.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Driver:</strong> {route.driver}</p>
                    <p className="text-sm"><strong>Stops:</strong> {route.stops}</p>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        View Map
                      </Button>
                      <Button size="sm" className="flex-1">
                        Edit Route
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Schedule Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  Scheduled Pickups - {selectedDate?.toDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPickups.map((pickup) => (
                    <div key={pickup.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <div>
                          <h4 className="font-medium">{pickup.center}</h4>
                          <p className="text-sm text-gray-600">
                            {pickup.time} • {pickup.weight}
                          </p>
                        </div>
                      </div>
                      <Badge variant={pickup.status === 'completed' ? 'default' : pickup.status === 'in-progress' ? 'secondary' : 'outline'}>
                        {pickup.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockRoutes.filter(r => r.status !== 'pending').map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{route.driver}</h4>
                      <p className="text-sm text-gray-600">{route.name}</p>
                    </div>
                    <Badge variant="secondary">
                      {route.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select optimization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Shortest Distance</SelectItem>
                      <SelectItem value="time">Fastest Time</SelectItem>
                      <SelectItem value="fuel">Fuel Efficient</SelectItem>
                      <SelectItem value="capacity">Capacity Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Route className="w-4 h-4 mr-2" />
                    Optimize Routes
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Routes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Distance:</span>
                          <span className="font-semibold">245 km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Time:</span>
                          <span className="font-semibold">8.5 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fuel Cost:</span>
                          <span className="font-semibold">$85</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Optimized Routes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Distance:</span>
                          <span className="font-semibold text-green-600">198 km (-19%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Time:</span>
                          <span className="font-semibold text-green-600">7.2 hours (-15%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fuel Cost:</span>
                          <span className="font-semibold text-green-600">$68 (-20%)</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollectionSchedulingTab;
