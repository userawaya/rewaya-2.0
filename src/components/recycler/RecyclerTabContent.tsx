
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import RecyclerDashboardHeader from './RecyclerDashboardHeader';
import RecyclerStatsGrid from './RecyclerStatsGrid';
import RecyclerQuickActions from './RecyclerQuickActions';
import RecyclerMainGrid from './RecyclerMainGrid';
import InventoryBrowser from './InventoryBrowser';
import OrderTracker from './OrderTracker';
import RecyclerAnalytics from './RecyclerAnalytics';
import SupplierDirectory from './SupplierDirectory';
import QualityReports from './QualityReports';
import PlaceOrderModal from './PlaceOrderModal';

interface RecyclerAnalytics {
  totalAvailableStock: number;
  monthlyPurchases: number;
  averageQuality: number;
  pendingOrders: number;
  availableInventory: any[];
  myOrders: any[];
}

interface RecyclerTabContentProps {
  activeTab: string;
  companyName: string;
  recyclerStats: RecyclerAnalytics | undefined;
  isPlaceOrderModalOpen: boolean;
  setIsPlaceOrderModalOpen: (open: boolean) => void;
  handlePlaceOrder: () => void;
  handleBrowseInventory: () => void;
  handleViewQualityReports: () => void;
  handleViewSupplierDirectory: () => void;
  handleViewAnalytics: () => void;
  refetch: () => void;
}

const RecyclerTabContent: React.FC<RecyclerTabContentProps> = ({
  activeTab,
  companyName,
  recyclerStats,
  isPlaceOrderModalOpen,
  setIsPlaceOrderModalOpen,
  handlePlaceOrder,
  handleBrowseInventory,
  handleViewQualityReports,
  handleViewSupplierDirectory,
  handleViewAnalytics,
  refetch,
}) => {
  const renderDashboardContent = () => (
    <div className="space-y-6 animate-fade-in">
      <RecyclerDashboardHeader
        companyName={companyName}
        totalAvailableStock={recyclerStats?.totalAvailableStock || 0}
        pendingOrders={recyclerStats?.pendingOrders || 0}
        onPlaceOrder={handlePlaceOrder}
      />

      <div data-tour="stats-grid">
        <RecyclerStatsGrid
          totalAvailableStock={recyclerStats?.totalAvailableStock || 0}
          monthlyPurchases={recyclerStats?.monthlyPurchases || 0}
          averageQuality={recyclerStats?.averageQuality || 0}
          pendingOrders={recyclerStats?.pendingOrders || 0}
        />
      </div>

      <RecyclerQuickActions
        onBrowseInventory={handleBrowseInventory}
        onPlaceOrder={handlePlaceOrder}
        onViewQualityReports={handleViewQualityReports}
        onViewSupplierDirectory={handleViewSupplierDirectory}
        onViewAnalytics={handleViewAnalytics}
      />

      <RecyclerMainGrid
        availableInventory={recyclerStats?.availableInventory || []}
        myOrders={recyclerStats?.myOrders || []}
        onOrderPlaced={() => refetch()}
      />

      <PlaceOrderModal
        isOpen={isPlaceOrderModalOpen}
        onClose={() => setIsPlaceOrderModalOpen(false)}
        availableInventory={recyclerStats?.availableInventory || []}
        onOrderPlaced={() => {
          refetch();
          setIsPlaceOrderModalOpen(false);
        }}
      />
    </div>
  );

  switch (activeTab) {
    case 'dashboard':
      return renderDashboardContent();

    case 'inventory':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">Browse and order available plastic materials</p>
          </div>
          <InventoryBrowser
            availableInventory={recyclerStats?.availableInventory || []}
            onOrderPlaced={() => refetch()}
          />
        </div>
      );

    case 'orders':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">Track your orders and purchase history</p>
          </div>
          <OrderTracker
            myOrders={recyclerStats?.myOrders || []}
          />
        </div>
      );

    case 'analytics':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
            <p className="text-gray-600 mt-1">Performance metrics and business intelligence</p>
          </div>
          <RecyclerAnalytics
            monthlyPurchases={recyclerStats?.monthlyPurchases || 0}
            averageQuality={recyclerStats?.averageQuality || 0}
            totalAvailableStock={recyclerStats?.totalAvailableStock || 0}
            pendingOrders={recyclerStats?.pendingOrders || 0}
          />
        </div>
      );

    case 'suppliers':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Supplier Directory</h1>
            <p className="text-gray-600 mt-1">Find and manage your material suppliers</p>
          </div>
          <SupplierDirectory />
        </div>
      );

    case 'quality':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quality Reports</h1>
            <p className="text-gray-600 mt-1">Material quality assessments and standards</p>
          </div>
          <QualityReports />
        </div>
      );

    case 'notifications':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Order updates and inventory alerts</p>
          </div>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No new notifications at the moment.</p>
            </CardContent>
          </Card>
        </div>
      );

    case 'profile':
      return (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-600 mt-1">Manage your company information and preferences</p>
          </div>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Profile management coming soon...</p>
            </CardContent>
          </Card>
        </div>
      );

    default:
      return renderDashboardContent();
  }
};

export default RecyclerTabContent;
