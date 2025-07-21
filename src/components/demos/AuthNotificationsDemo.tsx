
import React from 'react';
import MobileButton from '@/components/MobileButton';
import { useToastNotifications } from '@/hooks/useToastNotifications';
import { LogIn, User, XCircle } from 'lucide-react';

const AuthNotificationsDemo: React.FC = () => {
  const { notifyAuthSuccess, notifyAuthError } = useToastNotifications();

  return (
    <div>
      <h3 className="mobile-body font-semibold mb-3">Auth Notifications</h3>
      <div className="mobile-grid-2 gap-3">
        <MobileButton
          onClick={() => notifyAuthSuccess('login')}
          variant="default"
          size="mobile"
          icon={LogIn}
        >
          Login Success
        </MobileButton>
        
        <MobileButton
          onClick={() => notifyAuthError('login', 'Invalid credentials')}
          variant="destructive"
          size="mobile"
          icon={XCircle}
        >
          Login Error
        </MobileButton>
        
        <MobileButton
          onClick={() => notifyAuthSuccess('register')}
          variant="default"
          size="mobile"
          icon={User}
        >
          Register Success
        </MobileButton>
        
        <MobileButton
          onClick={() => notifyAuthError('register', 'Email already exists')}
          variant="destructive"
          size="mobile"
          icon={XCircle}
        >
          Register Error
        </MobileButton>
      </div>
    </div>
  );
};

export default AuthNotificationsDemo;
