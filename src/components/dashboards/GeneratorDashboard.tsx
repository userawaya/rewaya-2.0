import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WasteSubmissionForm from '@/components/WasteSubmissionForm';
import WasteTrackingTable from '@/components/WasteTrackingTable';
import EarningsSummary from '@/components/EarningsSummary';
import CollectionCentersMap from '@/components/CollectionCentersMap';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentSubmissions from '@/components/dashboard/RecentSubmissions';
import QuickActions from '@/components/dashboard/QuickActions';
import EnvironmentalImpact from '@/components/dashboard/EnvironmentalImpact';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import CreditCashout from '@/components/payments/CreditCashout';
import ResponsiveCard from '@/components/ResponsiveCard';
import { 
  useWasteRecords, 
  calculateTotalCredits, 
  creditsToNaira 
} from '@/hooks/useWasteRecords';

interface GeneratorDashboardProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const GeneratorDashboard: React.FC<GeneratorDashboardProps> = ({ 
  activeTab = 'dashboard',
  onTabChange = () => {}
}) => {
  const { data: wasteRecords, refetch } = useWasteRecords();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  // Calculate dashboard stats using credit points
  const totalSubmissions = wasteRecords?.length || 0;
  const totalCredits = calculateTotalCredits(wasteRecords || []);
  const totalEarnings = creditsToNaira(totalCredits);
  const pendingSubmissions = wasteRecords?.filter(r => r.status === 'pending' || r.status === 'sorted').length || 0;
  const totalWeight = wasteRecords?.reduce((sum, record) => sum + record.weight_kg, 0) || 0;
  const assessedWeight = wasteRecords?.filter(r => r.weight_kg > 0).reduce((sum, record) => sum + record.weight_kg, 0) || 0;

  const handleSubmissionSuccess = () => {
    refetch();
    setShowSubmissionForm(false);
  };

  const handleQuickActions = {
    onSubmitWaste: () => setShowSubmissionForm(true),
    onFindCenters: () => onTabChange('centers'),
    onViewEarnings: () => onTabChange('credits'),
    onTrackImpact: () => {
      // Scroll to environmental impact section on dashboard
      if (activeTab === 'dashboard') {
        const impactSection = document.querySelector('[data-section="environmental-impact"]');
        impactSection?.scrollIntoView({ behavior: 'smooth' });
      } else {
        onTabChange('dashboard');
      }
    }
  };

  // Handle different tab views
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fade-in">
            {/* Welcome Header with Notifications */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard</h1>
                <p className="text-gray-600 text-sm sm:text-base">Track your waste submissions and credit points</p>
              </div>
              <div className="flex items-center space-x-3">
                <NotificationCenter />
                <WasteSubmissionForm onSuccess={handleSubmissionSuccess} />
              </div>
            </div>

            {/* Quick Stats */}
            <DashboardStats
              userRole="generator"
              totalSubmissions={totalSubmissions}
              totalCredits={totalCredits}
              totalEarnings={totalEarnings}
              pendingSubmissions={pendingSubmissions}
              assessedWeight={assessedWeight}
              totalWeight={totalWeight}
            />

            {/* Quick Actions */}
            <QuickActions
              userRole="generator"
              onSubmissionSuccess={handleQuickActions.onSubmitWaste}
              onFindCenters={handleQuickActions.onFindCenters}
              onViewEarnings={handleQuickActions.onViewEarnings}
              onTrackImpact={handleQuickActions.onTrackImpact}
            />

            {/* Overview Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveCard title="Recent Submissions" variant="enhanced">
                <RecentSubmissions
                  wasteRecords={wasteRecords}
                  totalSubmissions={totalSubmissions}
                  onSubmissionSuccess={handleSubmissionSuccess}
                  onViewAll={() => onTabChange('profile')}
                />
              </ResponsiveCard>

              <ResponsiveCard title="Environmental Impact" variant="enhanced" className="scroll-mt-8" data-section="environmental-impact">
                <EnvironmentalImpact
                  assessedWeight={assessedWeight}
                  totalWeight={totalWeight}
                />
              </ResponsiveCard>
            </div>

            {/* Submission Form Modal */}
            {showSubmissionForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Submit Waste</h3>
                    <button 
                      onClick={() => setShowSubmissionForm(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-4">
                    <WasteSubmissionForm 
                      onSuccess={handleSubmissionSuccess}
                      onCancel={() => setShowSubmissionForm(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'centers':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Collection Centers</h1>
              <p className="text-gray-600 text-sm sm:text-base">Find nearby waste collection centers</p>
            </div>
            <ResponsiveCard variant="enhanced" withPadding={false}>
              <CollectionCentersMap />
            </ResponsiveCard>
          </div>
        );

      case 'credits':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Credits & Earnings</h1>
              <p className="text-gray-600 text-sm sm:text-base">Track your accumulated credits and cash out earnings</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveCard title="Earnings Summary" variant="enhanced">
                <EarningsSummary />
              </ResponsiveCard>
              
              <ResponsiveCard title="Cash Out" variant="enhanced">
                <CreditCashout 
                  totalCredits={totalCredits}
                  onCashoutSuccess={refetch}
                />
              </ResponsiveCard>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600 text-sm sm:text-base">Stay updated with your submissions and rewards</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <NotificationCenter className="w-full max-w-none" />
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Profile & History</h1>
              <p className="text-gray-600 text-sm sm:text-base">Manage your account and view submission history</p>
            </div>
            <ResponsiveCard variant="enhanced" withPadding={false}>
              <WasteTrackingTable />
            </ResponsiveCard>
          </div>
        );

      default:
        return renderTabContent();
    }
  };

  return renderTabContent();
};

export default GeneratorDashboard;
