
import React from 'react';
import MobileButton from '@/components/MobileButton';
import { useToastNotifications } from '@/hooks/useToastNotifications';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const BasicNotificationsDemo: React.FC = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToastNotifications();

  return (
    <div>
      <h3 className="mobile-body font-semibold mb-3">Basic Notifications</h3>
      <div className="mobile-grid-2 gap-3">
        <MobileButton
          onClick={() => showSuccess('Success! Operation completed.')}
          variant="default"
          size="mobile"
          icon={CheckCircle}
        >
          Success
        </MobileButton>
        
        <MobileButton
          onClick={() => showError('Error! Something went wrong.')}
          variant="destructive"
          size="mobile"
          icon={XCircle}
        >
          Error
        </MobileButton>
        
        <MobileButton
          onClick={() => showInfo('Info: Here\'s some helpful information.')}
          variant="outline"
          size="mobile"
          icon={Info}
        >
          Info
        </MobileButton>
        
        <MobileButton
          onClick={() => showWarning('Warning: Please review your action.')}
          variant="secondary"
          size="mobile"
          icon={AlertTriangle}
        >
          Warning
        </MobileButton>
      </div>
    </div>
  );
};

export default BasicNotificationsDemo;
