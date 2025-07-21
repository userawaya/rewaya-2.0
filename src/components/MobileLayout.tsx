
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  withBottomNav?: boolean;
  withHeader?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  className,
  withBottomNav = false,
  withHeader = false
}) => {
  return (
    <div className={cn(
      'min-h-screen bg-gray-50',
      'safe-area-top safe-area-bottom safe-area-left safe-area-right',
      withBottomNav && 'mobile-bottom-nav',
      className
    )}>
      {withHeader && (
        <div className="mobile-nav-height bg-white border-b border-gray-200" />
      )}
      
      <main className={cn(
        'mobile-scroll',
        withHeader && 'pt-0',
        !withHeader && 'pt-4'
      )}>
        <div className="mobile-padding">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MobileLayout;
