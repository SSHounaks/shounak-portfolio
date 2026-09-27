import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  current: number;
  longest: number;
  className?: string;
}

export function StreakBadge({ current, longest, className }: StreakBadgeProps) {
  const active = current > 0;
  return (
    <div className={cn('flex items-center gap-3 font-mono', className)}>
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            'material-symbols-outlined text-[15px] leading-none',
            active ? 'text-amber-400' : 'text-white/55',
          )}
        >
          {active ? 'local_fire_department' : 'hourglass_bottom'}
        </span>
        <span className={cn('text-[12px] font-bold tabular-nums', active ? 'text-white/85' : 'text-white/50')}>
          {current}
        </span>
        <span className="text-xs text-white/50">day streak</span>
      </div>
      {longest > current && (
        <div className="flex items-center gap-1 text-xs text-white/55 tabular-nums">
          <span>best {longest}</span>
        </div>
      )}
    </div>
  );
}
