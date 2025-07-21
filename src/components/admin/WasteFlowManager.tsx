
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowRight,
  Package,
  Truck,
  Factory,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  BarChart3
} from 'lucide-react';

interface WasteFlowRecord {
  id: string;
  waste_type: string;
  weight_kg: number;
  status: 'pending' | 'sorted' | 'picked_up' | 'delivered' | 'recycled';
  generator_name: string;
  center_name: string;
  created_at: string;
  estimated_credits: number;
}

const WasteFlowManager: React.FC = () => {
  const [activeView, setActiveView] = useState<'flow' | 'analytics'>('flow');

  // Mock data - replace with actual data fetching
  const wasteRecords: WasteFlowRecord[] = [
    {
      id: '1',
      waste_type: 'PET',
      weight_kg: 2.5,
      status: 'pending',
      generator_name: 'John Doe',
      center_name: 'Lagos Central',
      created_at: '2024-01-15T10:30:00Z',
      estimated_credits: 25,
    },
    {
      id: '2',
      waste_type: 'HDPE',
      weight_kg: 1.8,
      status: 'sorted',
      generator_name: 'Jane Smith',
      center_name: 'Abuja North',
      created_at: '2024-01-15T09:15:00Z',
      estimated_credits: 18,
    },
    {
      id: '3',
      waste_type: 'PET',
      weight_kg: 3.2,
      status: 'picked_up',
      generator_name: 'Mike Johnson',
      center_name: 'Kano East',
      created_at: '2024-01-14T16:45:00Z',
      estimated_credits: 32,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sorted': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'recycled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'sorted': return <Package className="w-4 h-4" />;
      case 'picked_up': return <Truck className="w-4 h-4" />;
      case 'delivered': return <Factory className="w-4 h-4" />;
      case 'recycled': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Waste Flow Management</h1>
          <p className="text-gray-600 text-sm sm:text-base">Track waste from submission to recycling</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={activeView === 'flow' ? 'default' : 'outline'}
            onClick={() => setActiveView('flow')}
            size="sm"
          >
            <Package className="w-4 h-4 mr-2" />
            Flow View
          </Button>
          <Button
            variant={activeView === 'analytics' ? 'default' : 'outline'}
            onClick={() => setActiveView('analytics')}
            size="sm"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Flow Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-xl font-bold">24</p>
                <p className="text-xs text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-xl font-bold">18</p>
                <p className="text-xs text-gray-600">Sorted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-gray-600">In Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Factory className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-xl font-bold">8</p>
                <p className="text-xs text-gray-600">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-gray-600" />
              <div>
                <p className="text-xl font-bold">156</p>
                <p className="text-xs text-gray-600">Recycled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {activeView === 'flow' ? (
        /* Waste Flow Table */
        <Card>
          <CardHeader>
            <CardTitle>Recent Waste Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Waste Details</TableHead>
                  <TableHead>Generator</TableHead>
                  <TableHead>Center</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wasteRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.waste_type}</div>
                        <div className="text-sm text-gray-600">{record.weight_kg} kg</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{record.generator_name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{record.center_name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(record.status)} flex items-center space-x-1`}>
                          {getStatusIcon(record.status)}
                          <span className="capitalize">{record.status}</span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{record.estimated_credits}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(record.created_at)}</div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        /* Analytics View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Flow Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Processing Time</span>
                  <span className="font-medium">2.3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-medium text-green-600">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bottleneck Stage</span>
                  <span className="font-medium text-amber-600">Pickup</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Volume (This Month)</span>
                  <span className="font-medium">2,847 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Waste Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'PET', percentage: 45, color: 'bg-blue-500' },
                  { type: 'HDPE', percentage: 25, color: 'bg-green-500' },
                  { type: 'PP', percentage: 15, color: 'bg-purple-500' },
                  { type: 'LDPE', percentage: 10, color: 'bg-yellow-500' },
                  { type: 'Other', percentage: 5, color: 'bg-gray-500' },
                ].map((item) => (
                  <div key={item.type} className="flex items-center space-x-3">
                    <div className="w-16 text-sm font-medium">{item.type}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-12 text-sm text-gray-600">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WasteFlowManager;
