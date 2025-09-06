
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, TrendingUp, Users, FileText } from 'lucide-react';
import RecyclerTabContent from '../../recycler/RecyclerTabContent';
import { useAllCentersInventory } from '@/hooks/useCenterInventory';
import { useToast } from '@/hooks/use-toast';

const RecyclerManagementTab: React.FC = () => {
  const { data: inventoryData, isLoading, refetch } = useAllCentersInventory();
  const { toast } = useToast();

  const mockRecyclerStats = {
    totalAvailableStock: inventoryData?.reduce((sum, item) => sum + item.weight_kg, 0) || 0,
    monthlyPurchases: 0,
    averageQuality: inventoryData?.reduce((sum, item) => sum + item.quality_score, 0) / (inventoryData?.length || 1) || 0,
    pendingOrders: 0,
    availableInventory: inventoryData || [],
    myOrders: []
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placement",
      description: "Order placement functionality will be implemented here.",
    });
  };

  const handleBrowseInventory = () => {
    toast({
      title: "Inventory Browser",
      description: "Browsing available inventory...",
    });
  };

  const handleViewQualityReports = () => {
    toast({
      title: "Quality Reports",
      description: "Viewing quality assessment reports...",
    });
  };

  const handleViewSupplierDirectory = () => {
    toast({
      title: "Supplier Directory",
      description: "Accessing supplier information...",
    });
  };

  const handleViewAnalytics = () => {
    toast({
      title: "Analytics",
      description: "Loading recycler analytics...",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading recycler data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Recycler Management</h2>
        <p className="text-gray-600">Manage recycler operations and marketplace</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">
            <Package className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <Package className="w-4 h-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="orders">
            <FileText className="w-4 h-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="suppliers">
            <Users className="w-4 h-4 mr-2" />
            Suppliers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <RecyclerTabContent
            activeTab="dashboard"
            companyName="Admin Recycler View"
            recyclerStats={mockRecyclerStats}
            isPlaceOrderModalOpen={false}
            setIsPlaceOrderModalOpen={() => {}}
            handlePlaceOrder={handlePlaceOrder}
            handleBrowseInventory={handleBrowseInventory}
            handleViewQualityReports={handleViewQualityReports}
            handleViewSupplierDirectory={handleViewSupplierDirectory}
            handleViewAnalytics={handleViewAnalytics}
            refetch={refetch}
          />
        </TabsContent>

        <TabsContent value="inventory">
          <RecyclerTabContent
            activeTab="inventory"
            companyName="Admin Recycler View"
            recyclerStats={mockRecyclerStats}
            isPlaceOrderModalOpen={false}
            setIsPlaceOrderModalOpen={() => {}}
            handlePlaceOrder={handlePlaceOrder}
            handleBrowseInventory={handleBrowseInventory}
            handleViewQualityReports={handleViewQualityReports}
            handleViewSupplierDirectory={handleViewSupplierDirectory}
            handleViewAnalytics={handleViewAnalytics}
            refetch={refetch}
          />
        </TabsContent>

        <TabsContent value="orders">
          <RecyclerTabContent
            activeTab="orders"
            companyName="Admin Recycler View"
            recyclerStats={mockRecyclerStats}
            isPlaceOrderModalOpen={false}
            setIsPlaceOrderModalOpen={() => {}}
            handlePlaceOrder={handlePlaceOrder}
            handleBrowseInventory={handleBrowseInventory}
            handleViewQualityReports={handleViewQualityReports}
            handleViewSupplierDirectory={handleViewSupplierDirectory}
            handleViewAnalytics={handleViewAnalytics}
            refetch={refetch}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <RecyclerTabContent
            activeTab="analytics"
            companyName="Admin Recycler View"
            recyclerStats={mockRecyclerStats}
            isPlaceOrderModalOpen={false}
            setIsPlaceOrderModalOpen={() => {}}
            handlePlaceOrder={handlePlaceOrder}
            handleBrowseInventory={handleBrowseInventory}
            handleViewQualityReports={handleViewQualityReports}
            handleViewSupplierDirectory={handleViewSupplierDirectory}
            handleViewAnalytics={handleViewAnalytics}
            refetch={refetch}
          />
        </TabsContent>

        <TabsContent value="suppliers">
          <RecyclerTabContent
            activeTab="suppliers"
            companyName="Admin Recycler View"
            recyclerStats={mockRecyclerStats}
            isPlaceOrderModalOpen={false}
            setIsPlaceOrderModalOpen={() => {}}
            handlePlaceOrder={handlePlaceOrder}
            handleBrowseInventory={handleBrowseInventory}
            handleViewQualityReports={handleViewQualityReports}
            handleViewSupplierDirectory={handleViewSupplierDirectory}
            handleViewAnalytics={handleViewAnalytics}
            refetch={refetch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecyclerManagementTab;
