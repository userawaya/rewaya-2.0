
import React from 'react';
import ResponsiveCard from './ResponsiveCard';
import BasicNotificationsDemo from './demos/BasicNotificationsDemo';
import LoadingToastDemo from './demos/LoadingToastDemo';
import AuthNotificationsDemo from './demos/AuthNotificationsDemo';
import AppNotificationsDemo from './demos/AppNotificationsDemo';

const ToastDemo: React.FC = () => {
  return (
    <ResponsiveCard title="Toast Notifications Demo" variant="mobile">
      <div className="space-y-6">
        <BasicNotificationsDemo />
        <LoadingToastDemo />
        <AuthNotificationsDemo />
        <AppNotificationsDemo />

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            These are example notifications. In a real app, they would be triggered by actual user actions.
          </p>
        </div>
      </div>
    </ResponsiveCard>
  );
};

export default ToastDemo;
