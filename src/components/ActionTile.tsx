
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  variant?: 'default' | 'generator' | 'controller' | 'driver' | 'recycler' | 'admin';
  badge?: string;
  className?: string;
}

// Map card variant to soft badge color classes
const badgeTheme: Record<
  NonNullable<ActionTileProps['variant']>,
  string
> = {
  default: 'bg-gray-100 text-gray-700',
  generator: 'bg-emerald-100 text-emerald-700',
  controller: 'bg-amber-100 text-amber-700',
  driver: 'bg-sky-100 text-sky-700',
  recycler: 'bg-purple-100 text-purple-700',
  admin: 'bg-slate-100 text-slate-700',
};

const ActionTile: React.FC<ActionTileProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  variant = 'default',
  badge,
  className
}) => {
  const variantClasses = {
    default: 'bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300',
    generator: 'bg-gradient-to-br from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border-emerald-200 hover:border-emerald-300',
    controller: 'bg-gradient-to-br from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 border-amber-200 hover:border-amber-300',
    driver: 'bg-gradient-to-br from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 border-sky-200 hover:border-sky-300',
    recycler: 'bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border-purple-200 hover:border-purple-300',
    admin: 'bg-gradient-to-br from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 border-slate-200 hover:border-slate-300',
  };

  const iconClasses = {
    default: 'text-gray-600 bg-gray-100',
    generator: 'text-emerald-600 bg-emerald-100',
    controller: 'text-amber-600 bg-amber-100',
    driver: 'text-sky-600 bg-sky-100',
    recycler: 'text-purple-600 bg-purple-100',
    admin: 'text-slate-600 bg-slate-100',
  };

  return (
    <div
      className={cn(
        'relative pt-10 pb-6 px-6 sm:pt-12 sm:px-8 sm:pb-8 rounded-xl border transition-all duration-300 cursor-pointer group',
        'hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]',
        'touch-manipulation',
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-current to-transparent"></div>
      </div>

      {badge && (
        <div
          className={cn(
            // Push badge tighter to top-right and reduce text size
            "absolute top-2 right-2 z-20 rounded-full shadow px-2.5 py-1 min-w-[2.2rem] flex items-center justify-center",
            // Responsive, smaller font for the badge
            "text-[11px] sm:text-xs font-medium leading-tight tracking-tight",
            badgeTheme[variant]
          )}
          style={{ maxWidth: '8.5rem', wordBreak: 'break-word', whiteSpace: 'normal' }}
          title={badge}
        >
          <span className="truncate">{badge}</span>
        </div>
      )}

      <div className="relative flex items-start space-x-4">
        <div className={cn(
          'flex-shrink-0 p-3 rounded-xl transition-all duration-300',
          'group-hover:scale-110 group-active:scale-95',
          iconClasses[variant]
        )}>
          <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          {/* Restore card title size to original */}
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>
          {/* Restore card description size */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </div>
  );
};

export default ActionTile;
