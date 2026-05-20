import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BannerProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: ReactNode;
  action?: { label: string; href: string };
  className?: string;
}

const bannerStyles = {
  info: {
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/[0.04]',
    icon: 'terminal',
    color: 'text-sky-400',
  },
  success: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/[0.04]',
    icon: 'check_circle',
    color: 'text-emerald-400',
  },
  warning: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/[0.04]',
    icon: 'warning_amber',
    color: 'text-amber-400',
  },
  danger: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/[0.04]',
    icon: 'error',
    color: 'text-red-400',
  },
};

export function Banner({ type = 'info', title, children, action, className }: BannerProps) {
  const style = bannerStyles[type];

  return (
    <div
      className={cn(
        'font-mono rounded-lg border p-5 my-8 w-full',
        'backdrop-blur-sm',
        style.bg,
        style.border,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className={cn('material-symbols-outlined text-[18px] mt-0.5', style.color)}>
          {style.icon}
        </span>
        <div className="flex-1 min-w-0">
          {title && (
            <div className="flex items-center gap-2 mb-2">
              <span className={cn('text-[10px] uppercase tracking-widest font-bold', style.color)}>
                // {title}
              </span>
            </div>
          )}
          <div className="text-zinc-300 text-[13px] leading-relaxed">
            {children}
          </div>
          {action && (
            <a
              href={action.href}
              className={cn(
                'inline-block mt-3 text-[11px] font-bold uppercase tracking-wider',
                'border-b border-dashed transition-colors',
                style.color,
                `hover:${style.color.replace('text-', 'text-').replace('400', '300')}`,
              )}
            >
              {action.label} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
