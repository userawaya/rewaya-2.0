
import React from 'react';
import MobileButton from '@/components/MobileButton';
import { useToastNotifications } from '@/hooks/useToastNotifications';
import { CheckCircle, XCircle, FileText, Upload, User } from 'lucide-react';

const AppNotificationsDemo: React.FC = () => {
  const { 
    notifyWasteSubmission, 
    notifyAssessment, 
    notifyUpload, 
    notifyProfileUpdate 
  } = useToastNotifications();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mobile-body font-semibold mb-3">App-Specific Notifications</h3>
        <div className="mobile-grid-2 gap-3">
          <MobileButton
            onClick={() => notifyWasteSubmission(true)}
            variant="default"
            size="mobile"
            icon={FileText}
          >
            Waste Submit Success
          </MobileButton>
          
          <MobileButton
            onClick={() => notifyWasteSubmission(false, 'Photo upload failed')}
            variant="destructive"
            size="mobile"
            icon={XCircle}
          >
            Waste Submit Error
          </MobileButton>
          
          <MobileButton
            onClick={() => notifyAssessment(true)}
            variant="default"
            size="mobile"
            icon={CheckCircle}
          >
            Assessment Success
          </MobileButton>
          
          <MobileButton
            onClick={() => notifyUpload(true, undefined, 'waste_photo.jpg')}
            variant="default"
            size="mobile"
            icon={Upload}
          >
            Upload Success
          </MobileButton>
        </div>
      </div>

      <div>
        <h3 className="mobile-body font-semibold mb-3">Profile Actions</h3>
        <div className="mobile-grid-2 gap-3">
          <MobileButton
            onClick={() => notifyProfileUpdate(true)}
            variant="default"
            size="mobile"
            icon={User}
          >
            Profile Updated
          </MobileButton>
          
          <MobileButton
            onClick={() => notifyProfileUpdate(false, 'Validation failed')}
            variant="destructive"
            size="mobile"
            icon={XCircle}
          >
            Profile Error
          </MobileButton>
        </div>
      </div>
    </div>
  );
};

export default AppNotificationsDemo;
