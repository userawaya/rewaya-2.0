
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
  subtext?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
  variant = 'default',
  subtext
}) => {
  const variantClasses = {
    default: 'bg-gradient-to-br from-white via-gray-50 to-white border-gray-200 hover:border-gray-300 hover:shadow-xl',
    success: 'bg-gradient-to-br from-green-50 via-emerald-25 to-green-50 border-green-200 hover:border-green-300 hover:shadow-xl hover:shadow-green-100/50',
    warning: 'bg-gradient-to-br from-amber-50 via-yellow-25 to-amber-50 border-amber-200 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/50',
    info: 'bg-gradient-to-br from-blue-50 via-sky-25 to-blue-50 border-blue-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50',
  };

  const iconClasses = {
    default: 'text-gray-600 bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner',
    success: 'text-green-600 bg-gradient-to-br from-green-100 to-green-200 shadow-inner',
    warning: 'text-amber-600 bg-gradient-to-br from-amber-100 to-amber-200 shadow-inner',
    info: 'text-blue-600 bg-gradient-to-br from-blue-100 to-blue-200 shadow-inner',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:scale-[1.02] group cursor-pointer',
        'p-6 sm:p-8 backdrop-blur-sm',
        variantClasses[variant],
        className
      )}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(120,119,198,0.4),_transparent_50%),radial-gradient(circle_at_20%_-10%,_rgba(255,119,198,0.3),_transparent_50%)]"></div>
      </div>
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-600 mb-3 truncate uppercase tracking-wider">{title}</p>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 transition-all duration-300 group-hover:scale-105">{value}</p>
          
          {subtext && (
            <p className="text-sm text-gray-500 mb-3 font-medium">{subtext}</p>
          )}
          
          {trend && (
            <div className="flex items-center">
              <span
                className={cn(
                  'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border',
                  trend.isPositive 
                    ? 'text-green-700 bg-green-100/80 border-green-200 shadow-green-100/50' 
                    : 'text-red-700 bg-red-100/80 border-red-200 shadow-red-100/50'
                )}
              >
                <span className="text-base mr-1">{trend.isPositive ? '↗' : '↘'}</span>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-3 font-medium">{trend.label}</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={cn(
            'flex-shrink-0 p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border',
            iconClasses[variant]
          )}>
            <Icon size={28} className="transition-transform duration-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
