
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  type: string;
  weight: number;
  status: string;
  eta: string;
  centerName: string;
}

interface OrderTrackerProps {
  myOrders: Order[];
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ myOrders }) => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_transit':
        return <Truck className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'assigned':
        return <Clock className="w-4 h-4" />;
      case 'pending':
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'assigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_transit':
        return 'In Transit';
      case 'completed':
        return 'Completed';
      case 'assigned':
        return 'Assigned';
      case 'pending':
      default:
        return 'Pending';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'assigned':
        return 50;
      case 'in_transit':
        return 75;
      case 'completed':
        return 100;
      default:
        return 0;
    }
  };

  const getOrderSummary = () => {
    const pending = myOrders.filter(order => order.status === 'pending').length;
    const inTransit = myOrders.filter(order => order.status === 'in_transit').length;
    const completed = myOrders.filter(order => order.status === 'completed').length;
    
    return { pending, inTransit, completed };
  };

  const summary = getOrderSummary();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Order Tracker
          </CardTitle>
          <Badge variant="secondary">
            {myOrders.length} total orders
          </Badge>
        </div>
        
        {/* Order Summary */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">{summary.pending}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{summary.inTransit}</div>
            <div className="text-xs text-blue-500">In Transit</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{summary.completed}</div>
            <div className="text-xs text-green-500">Completed</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {myOrders.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders placed yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Start by browsing available inventory
              </p>
            </div>
          ) : (
            myOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </span>
                    <Badge className={`text-xs flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setSelectedOrder(
                      selectedOrder === order.id ? null : order.id
                    )}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    {selectedOrder === order.id ? 'Hide' : 'Details'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Type & Weight:</span>
                    <p className="font-medium">{order.type} • {order.weight}kg</p>
                  </div>
                  <div>
                    <span className="text-gray-500">From:</span>
                    <p className="font-medium">{order.centerName}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-500">ETA: {order.eta}</span>
                  </div>
                  <Progress value={getProgressValue(order.status)} className="h-2" />
                </div>
                
                {selectedOrder === order.id && (
                  <div className="mt-4 pt-4 border-t bg-gray-50 rounded p-3">
                    <h4 className="font-medium text-sm mb-2">Order Timeline</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Order placed and confirmed</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        ['assigned', 'in_transit', 'completed'].includes(order.status) 
                          ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          ['assigned', 'in_transit', 'completed'].includes(order.status)
                            ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <span>Driver assigned for pickup</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        ['in_transit', 'completed'].includes(order.status) 
                          ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          ['in_transit', 'completed'].includes(order.status)
                            ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <span>In transit to your facility</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        order.status === 'completed' ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          order.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <span>Delivered successfully</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;
