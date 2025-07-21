import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  TrendingUp, 
  Package, 
  AlertCircle, 
  Clock, 
  Award, 
  ChevronRight,
  Activity,
  Calendar,
  Target
} from 'lucide-react';

interface RecyclerDashboardHeaderProps {
  companyName: string;
  totalAvailableStock: number;
  pendingOrders: number;
  onPlaceOrder: () => void;
  onViewAnalytics?: () => void;
  monthlyTarget?: number;
  completedOrders?: number;
  lastOrderDate?: string;
}

const RecyclerDashboardHeader: React.FC<RecyclerDashboardHeaderProps> = ({
  companyName,
  totalAvailableStock,
  pendingOrders,
  onPlaceOrder,
  onViewAnalytics = () => {},
  monthlyTarget = 0,
  completedOrders = 0,
  lastOrderDate,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatWeight = (weight: number) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} tons`;
    }
    return `${weight.toFixed(0)}kg`;
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getOrderStatus = () => {
    if (pendingOrders === 0) return { color: 'text-green-600', text: 'No pending orders', icon: Activity };
    if (pendingOrders <= 3) return { color: 'text-blue-600', text: 'Normal activity', icon: Activity };
    if (pendingOrders <= 5) return { color: 'text-amber-600', text: 'Busy period', icon: Clock };
    return { color: 'text-red-600', text: 'High volume', icon: AlertCircle };
  };

  const getStockStatus = () => {
    if (totalAvailableStock < 500) return { color: 'text-red-600', urgency: 'Low' };
    if (totalAvailableStock < 2000) return { color: 'text-amber-600', urgency: 'Medium' };
    return { color: 'text-green-600', urgency: 'Good' };
  };

  const calculateProgress = () => {
    if (monthlyTarget === 0) return 0;
    return Math.min((completedOrders / monthlyTarget) * 100, 100);
  };

  const handlePlaceOrder = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    onPlaceOrder();
  };

  const orderStatus = getOrderStatus();
  const stockStatus = getStockStatus();
  const progress = calculateProgress();

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-purple-100/50 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {getGreeting()}, {companyName}
                </h1>
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Badge 
                variant="secondary" 
                className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 transition-colors duration-200"
              >
                <Award className="w-3 h-3 mr-1" />
                Recycler
              </Badge>
              <Badge 
                variant="outline" 
                className={`${stockStatus.color} border-current hover:bg-current hover:text-white transition-colors duration-200`}
              >
                Stock: {stockStatus.urgency}
              </Badge>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-purple-100 hover:border-purple-200 transition-colors duration-200">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Available Stock</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {formatWeight(totalAvailableStock)}
              </div>
              <div className={`text-xs ${stockStatus.color} font-medium`}>
                {stockStatus.urgency} level
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-colors duration-200">
              <div className="flex items-center gap-2 mb-2">
                <orderStatus.icon className={`w-4 h-4 ${orderStatus.color}`} />
                <span className="text-sm font-medium text-gray-700">Active Orders</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {pendingOrders}
              </div>
              <div className={`text-xs ${orderStatus.color} font-medium`}>
                {orderStatus.text}
              </div>
            </div>
            
            {monthlyTarget > 0 && (
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-green-100 hover:border-green-200 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Monthly Progress</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {completedOrders}/{monthlyTarget}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  {progress.toFixed(1)}% complete
                </div>
              </div>
            )}
            
            {lastOrderDate && (
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Last Order</span>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {new Date(lastOrderDate).toLocaleDateString()}
                </div>
                <div className="text-xs text-indigo-600 font-medium">
                  {Math.floor((Date.now() - new Date(lastOrderDate).getTime()) / (1000 * 60 * 60 * 24))} days ago
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[280px]">
          <Button 
            variant="outline"
            onClick={onViewAnalytics}
            className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 group"
          >
            <TrendingUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            View Analytics
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          
          <Button 
            className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${isAnimating ? 'scale-95' : 'scale-100'}`}
            onClick={handlePlaceOrder}
          >
            <Plus className="w-4 h-4 mr-2" />
            Place New Order
          </Button>
        </div>
      </div>
      
      {/* Quick Actions Bar */}
      <div className="mt-6 pt-4 border-t border-purple-100">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 font-medium">Quick actions:</span>
          <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors duration-200">
            Track shipments
          </button>
          <span className="text-gray-300">•</span>
          <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors duration-200">
            Update inventory
          </button>
          <span className="text-gray-300">•</span>
          <button className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors duration-200">
            View reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecyclerDashboardHeader;