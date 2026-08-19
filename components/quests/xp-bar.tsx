import { cn } from '@/lib/utils';

interface XpBarProps {
  current: number;
  max: number;
  className?: string;
  size?: 'sm' | 'md';
  color?: string;
}

export function XpBar({
  current,
  max,
  className,
  size = 'md',
  color = '#34d399',
}: XpBarProps) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'flex-1 bg-white/5 rounded-full overflow-hidden',
        size === 'sm' ? 'h-[3px]' : 'h-1.5',
      )}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className={cn(
        'font-mono text-white/30 shrink-0',
        size === 'sm' ? 'text-[8px]' : 'text-[9px]',
      )}>
        {current.toLocaleString()}/{max.toLocaleString()}
      </span>
    </div>
  );
}
