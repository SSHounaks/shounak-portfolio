import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const calloutStyles = {
  note: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/[0.03]',
    icon: 'info',
    prompt: '>',
    label: 'NOTE',
    color: 'text-emerald-400',
  },
  info: {
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/[0.03]',
    icon: 'lightbulb',
    prompt: '>',
    label: 'INFO',
    color: 'text-sky-400',
  },
  warn: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/[0.03]',
    icon: 'warning',
    prompt: '!',
    label: 'WARN',
    color: 'text-amber-400',
  },
  error: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/[0.03]',
    icon: 'error',
    prompt: '✗',
    label: 'ERROR',
    color: 'text-red-400',
  },
};

interface CalloutProps {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({ type = 'note', title, children, className }: CalloutProps) {
  const style = calloutStyles[type];

  return (
    <div
      className={cn(
        'font-mono rounded-lg border-l-2 p-4 my-6 text-sm leading-relaxed',
        style.bg,
        style.border,
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={cn('font-bold text-xs', style.color)}>
          {style.prompt}
        </span>
        <span className={cn('text-[10px] uppercase tracking-widest font-bold', style.color)}>
          {title || style.label}
        </span>
        <span className={cn('font-bold text-xs', style.color)}>
          //
        </span>
      </div>
      <div className="text-zinc-300 text-[13px] leading-relaxed pl-4">
        {children}
      </div>
    </div>
  );
}
