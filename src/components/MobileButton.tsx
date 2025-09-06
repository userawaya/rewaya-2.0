
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'mobile';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  fullWidth?: boolean;
  touchOptimized?: boolean;
}

const MobileButton: React.FC<MobileButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  onClick,
  disabled,
  icon: Icon,
  fullWidth = false,
  touchOptimized = true,
  ...props
}) => {
  const buttonClasses = cn(
    touchOptimized && 'touch-target',
    size === 'mobile' && 'mobile-form-button',
    fullWidth && 'w-full',
    className
  );

  return (
    <Button
      variant={variant}
      size={size === 'mobile' ? 'default' : size}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
};

export default MobileButton;
