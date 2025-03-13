
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  level?: 'subtle' | 'medium' | 'strong';
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  interactive = false,
  level = 'medium',
  className,
  ...props
}) => {
  const getOpacityClasses = () => {
    switch (level) {
      case 'subtle':
        return 'bg-white/40 dark:bg-slate-900/40 border-white/20 dark:border-slate-800/20';
      case 'strong':
        return 'bg-white/95 dark:bg-slate-900/95 border-white/60 dark:border-slate-800/60';
      case 'medium':
      default:
        return 'bg-white/80 dark:bg-slate-900/80 border-white/40 dark:border-slate-800/40';
    }
  };

  return (
    <div
      className={cn(
        'backdrop-blur-md shadow-card rounded-xl border transition-all duration-300',
        getOpacityClasses(),
        interactive && 'hover:shadow-card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
