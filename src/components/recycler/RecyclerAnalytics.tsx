
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, DollarSign, Clock } from 'lucide-react';

interface RecyclerAnalyticsProps {
  monthlyPurchases: number;
  averageQuality: number;
  totalAvailableStock: number;
  pendingOrders: number;
}

const RecyclerAnalytics: React.FC<RecyclerAnalyticsProps> = ({
  monthlyPurchases,
  averageQuality,
  totalAvailableStock,
  pendingOrders,
}) => {
  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', purchases: 2400, cost: 12000 },
    { month: 'Feb', purchases: 1398, cost: 8500 },
    { month: 'Mar', purchases: 9800, cost: 45000 },
    { month: 'Apr', purchases: 3908, cost: 18000 },
    { month: 'May', purchases: 4800, cost: 22000 },
    { month: 'Jun', purchases: monthlyPurchases, cost: monthlyPurchases * 4.5 },
  ];

  const wasteTypeData = [
    { name: 'PET', value: 35, color: '#8B5CF6' },
    { name: 'HDPE', value: 25, color: '#06B6D4' },
    { name: 'PP', value: 20, color: '#10B981' },
    { name: 'LDPE', value: 12, color: '#F59E0B' },
    { name: 'PVC', value: 5, color: '#EF4444' },
    { name: 'PS', value: 3, color: '#6B7280' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Analytics & Insights</h2>
        <Badge variant="outline">Last 6 Months</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Volume</p>
                <p className="text-2xl font-bold">{(monthlyPurchases / 1000).toFixed(1)}t</p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Quality</p>
                <p className="text-2xl font-bold">{averageQuality.toFixed(1)}/10</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Cost</p>
                <p className="text-2xl font-bold">₦{(monthlyPurchases * 4.5 / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Delivery</p>
                <p className="text-2xl font-bold">3.2 days</p>
              </div>
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Purchases & Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="purchases" fill="#8B5CF6" name="Weight (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={wasteTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {wasteTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quality Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Quality & Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">94%</div>
              <div className="text-sm text-gray-600">On-time Deliveries</div>
              <div className="text-xs text-green-600 mt-1">↑ +2% from last month</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">8.2/10</div>
              <div className="text-sm text-gray-600">Avg. Material Quality</div>
              <div className="text-xs text-blue-600 mt-1">↑ +0.3 from last month</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">₦4.2/kg</div>
              <div className="text-sm text-gray-600">Avg. Cost per KG</div>
              <div className="text-xs text-green-600 mt-1">↓ -₦0.1 from last month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecyclerAnalytics;
