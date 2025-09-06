
import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useRecyclerAnalytics } from '@/hooks/useRecyclerAnalytics';
import RecyclerTabContent from '@/components/recycler/RecyclerTabContent';

interface RecyclerDashboardProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RecyclerDashboard: React.FC<RecyclerDashboardProps> = ({ activeTab, onTabChange }) => {
  const { data: profile } = useProfile();
  const { data: recyclerStats, isLoading, refetch } = useRecyclerAnalytics();
  const [isPlaceOrderModalOpen, setIsPlaceOrderModalOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const companyName = profile?.full_name || 'Your Company';

  const handlePlaceOrder = () => {
    setIsPlaceOrderModalOpen(true);
  };

  const handleBrowseInventory = () => {
    onTabChange('inventory');
  };

  const handleViewQualityReports = () => {
    onTabChange('quality');
  };

  const handleViewSupplierDirectory = () => {
    onTabChange('suppliers');
  };

  const handleViewAnalytics = () => {
    onTabChange('analytics');
  };

  return (
    <RecyclerTabContent
      activeTab={activeTab}
      companyName={companyName}
      recyclerStats={recyclerStats}
      isPlaceOrderModalOpen={isPlaceOrderModalOpen}
      setIsPlaceOrderModalOpen={setIsPlaceOrderModalOpen}
      handlePlaceOrder={handlePlaceOrder}
      handleBrowseInventory={handleBrowseInventory}
      handleViewQualityReports={handleViewQualityReports}
      handleViewSupplierDirectory={handleViewSupplierDirectory}
      handleViewAnalytics={handleViewAnalytics}
      refetch={refetch}
    />
  );
};

export default RecyclerDashboard;
