
import React from 'react';
import MobileButton from '@/components/MobileButton';
import { useToastNotifications } from '@/hooks/useToastNotifications';

const LoadingToastDemo: React.FC = () => {
  const { showLoading, dismiss, showSuccess } = useToastNotifications();

  const handleLoadingDemo = () => {
    const loadingToast = showLoading('Processing your request...');
    
    // Simulate async operation
    setTimeout(() => {
      dismiss(loadingToast);
      showSuccess('Operation completed successfully!');
    }, 3000);
  };

  return (
    <div>
      <h3 className="mobile-body font-semibold mb-3">Loading Demo</h3>
      <MobileButton
        onClick={handleLoadingDemo}
        variant="outline"
        size="mobile"
        fullWidth
      >
        Show Loading Toast (3s)
      </MobileButton>
    </div>
  );
};

export default LoadingToastDemo;
