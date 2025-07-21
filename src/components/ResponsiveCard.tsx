
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'mobile' | 'compact' | 'enhanced';
  withPadding?: boolean;
}

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  children,
  className,
  variant = 'default',
  withPadding = true
}) => {
  const cardClasses = cn(
    'transition-all duration-200 hover:shadow-md',
    variant === 'mobile' && 'bg-white rounded-xl shadow-sm border border-gray-100',
    variant === 'compact' && 'rounded-lg shadow-sm border border-gray-200',
    variant === 'enhanced' && 'bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200',
    variant === 'default' && 'bg-white rounded-lg shadow-sm border border-gray-200',
    className
  );

  const contentClasses = cn(
    withPadding && variant === 'mobile' && 'p-4 sm:p-6',
    withPadding && variant === 'enhanced' && 'p-6 sm:p-8',
    withPadding && variant === 'default' && 'p-4 sm:p-6',
    withPadding && variant === 'compact' && 'p-3 sm:p-4',
    !withPadding && 'p-0'
  );

  const headerClasses = cn(
    variant === 'enhanced' && 'pb-4 border-b border-gray-100',
    variant === 'mobile' && 'pb-3',
    variant === 'default' && 'pb-3',
    variant === 'compact' && 'pb-2'
  );

  return (
    <Card className={cardClasses}>
      {title && (
        <CardHeader className={headerClasses}>
          <CardTitle className={cn(
            'font-semibold text-gray-900',
            variant === 'enhanced' && 'text-lg sm:text-xl',
            variant === 'mobile' && 'text-base sm:text-lg',
            variant === 'default' && 'text-base sm:text-lg',
            variant === 'compact' && 'text-sm sm:text-base'
          )}>
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={contentClasses}>
        {children}
      </CardContent>
    </Card>
  );
};

export default ResponsiveCard;
