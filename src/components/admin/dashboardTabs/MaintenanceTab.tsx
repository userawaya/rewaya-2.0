
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wrench, Calendar, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

const MaintenanceTab: React.FC = () => {
  const mockMaintenanceItems = [
    { id: 'm-1', equipment: 'Truck TR-001', type: 'Oil Change', status: 'overdue', dueDate: '2024-06-10', priority: 'high' },
    { id: 'm-2', equipment: 'Conveyor Belt A1', type: 'Belt Replacement', status: 'scheduled', dueDate: '2024-06-20', priority: 'medium' },
    { id: 'm-3', equipment: 'Sorting Machine', type: 'Calibration', status: 'completed', dueDate: '2024-06-15', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Maintenance & Equipment</h2>
          <p className="text-gray-600">Manage equipment maintenance and facility operations</p>
        </div>
        <Button>
          <Wrench className="w-4 h-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <p className="text-sm text-gray-600">Overdue</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <p className="text-sm text-gray-600">Due This Week</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <p className="text-sm text-gray-600">Equipment Uptime</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Maintenance Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMaintenanceItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {item.status === 'overdue' ? (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      ) : item.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Calendar className="w-5 h-5 text-blue-500" />
                      )}
                      <div>
                        <h4 className="font-medium">{item.equipment}</h4>
                        <p className="text-sm text-gray-600">
                          {item.type} • Due: {item.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        item.status === 'overdue' ? 'destructive' :
                        item.status === 'completed' ? 'default' : 'secondary'
                      }>
                        {item.status}
                      </Badge>
                      <Badge variant={
                        item.priority === 'high' ? 'destructive' :
                        item.priority === 'medium' ? 'secondary' : 'outline'
                      }>
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Maintenance Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600">Maintenance Calendar</h3>
                  <p className="text-gray-500">Maintenance schedule calendar would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Equipment Inventory</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <p className="text-sm text-gray-600">Vehicles</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">15</div>
                      <p className="text-sm text-gray-600">Sorting Equipment</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">6</div>
                      <p className="text-sm text-gray-600">Processing Units</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Monthly Maintenance Cost</h4>
                    <div className="text-2xl font-bold text-blue-600">$15,400</div>
                    <p className="text-sm text-gray-600">↓ 8% from last month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Average Repair Time</h4>
                    <div className="text-2xl font-bold text-green-600">2.3 hrs</div>
                    <p className="text-sm text-gray-600">↑ 5% from last month</p>
                  </div>
                </div>
                <Button className="w-full">
                  Generate Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceTab;
