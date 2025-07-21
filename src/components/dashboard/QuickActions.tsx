
import React from 'react';
import ActionTile from '@/components/ActionTile';
import { 
  Plus, 
  Upload, 
  BarChart3, 
  Users, 
  MapPin, 
  Truck, 
  Package,
  ClipboardCheck,
  Route,
  ShoppingCart,
  TrendingUp
} from 'lucide-react';

interface QuickActionsProps {
  userRole?: string;
  onSubmissionSuccess?: () => void;
  onFindCenters?: () => void;
  onViewEarnings?: () => void;
  onTrackImpact?: () => void;
  onShowAssessments?: () => void;
  onShowHistory?: () => void;
  onViewRoutes?: () => void;
  onAcceptRequests?: () => void;
  onBrowseMaterials?: () => void;
  onPlaceOrder?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  userRole = 'generator',
  onSubmissionSuccess = () => {},
  onFindCenters = () => {},
  onViewEarnings = () => {},
  onTrackImpact = () => {},
  onShowAssessments = () => {},
  onShowHistory = () => {},
  onViewRoutes = () => {},
  onAcceptRequests = () => {},
  onBrowseMaterials = () => {},
  onPlaceOrder = () => {}
}) => {
  const getActionsForRole = () => {
    switch (userRole) {
      case 'generator':
        return [
          {
            title: 'Submit Waste',
            description: 'Upload photos and submit plastic waste',
            icon: Plus,
            variant: 'generator' as const,
            onClick: onSubmissionSuccess
          },
          {
            title: 'View Centers',
            description: 'Find nearby collection centers',
            icon: MapPin,
            variant: 'default' as const,
            onClick: onFindCenters
          },
          {
            title: 'Track Impact',
            description: 'Monitor your environmental impact',
            icon: TrendingUp,
            variant: 'default' as const,
            onClick: onTrackImpact
          },
          {
            title: 'View Earnings',
            description: 'Check your credits and earnings',
            icon: BarChart3,
            variant: 'default' as const,
            onClick: onViewEarnings
          }
        ];

      case 'controller':
        return [
          {
            title: 'Assess Waste',
            description: 'Quality check incoming submissions',
            icon: ClipboardCheck,
            variant: 'controller' as const,
            onClick: onShowAssessments
          },
          {
            title: 'Request Pickup',
            description: 'Schedule collection from center',
            icon: Truck,
            variant: 'default' as const,
            onClick: () => console.log('Request pickup')
          },
          {
            title: 'View History',
            description: 'Check assessment history',
            icon: Package,
            variant: 'default' as const,
            onClick: onShowHistory
          },
          {
            title: 'Analytics',
            description: 'Review center performance',
            icon: BarChart3,
            variant: 'default' as const,
            onClick: () => console.log('Analytics')
          }
        ];

      case 'driver':
        return [
          {
            title: 'View Routes',
            description: 'Check optimized pickup routes',
            icon: Route,
            variant: 'driver' as const,
            onClick: onViewRoutes
          },
          {
            title: 'Accept Requests',
            description: 'Browse available pickup jobs',
            icon: Truck,
            variant: 'default' as const,
            onClick: onAcceptRequests
          },
          {
            title: 'Update Status',
            description: 'Mark deliveries as complete',
            icon: ClipboardCheck,
            variant: 'default' as const,
            onClick: () => console.log('Update status')
          },
          {
            title: 'Earnings',
            description: 'View income and payments',
            icon: BarChart3,
            variant: 'default' as const,
            onClick: () => console.log('Earnings')
          }
        ];

      case 'recycler':
        return [
          {
            title: 'Browse Materials',
            description: 'View available plastic inventory',
            icon: Package,
            variant: 'recycler' as const,
            onClick: onBrowseMaterials
          },
          {
            title: 'Place Order',
            description: 'Order bulk plastic materials',
            icon: ShoppingCart,
            variant: 'default' as const,
            onClick: onPlaceOrder
          },
          {
            title: 'Track Orders',
            description: 'Monitor order status and delivery',
            icon: Truck,
            variant: 'default' as const,
            onClick: () => console.log('Track orders')
          },
          {
            title: 'Analytics',
            description: 'View supply chain insights',
            icon: BarChart3,
            variant: 'default' as const,
            onClick: () => console.log('Analytics')
          }
        ];

      default:
        return [];
    }
  };

  const actions = getActionsForRole();

  return (
    <div data-tour="quick-actions" className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <ActionTile key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
