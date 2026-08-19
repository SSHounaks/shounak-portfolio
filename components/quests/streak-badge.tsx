import { cn } from '@/lib/utils';

interface StreakBadgeProps {
  current: number;
  longest: number;
  className?: string;
}

export function StreakBadge({ current, longest, className }: StreakBadgeProps) {
  return (
    <div className={cn('flex items-center gap-3 font-mono', className)}>
      <div className="flex items-center gap-1.5">
        <span className="text-[14px]">
          {current > 0 ? '🔥' : '💤'}
        </span>
        <span className="text-[11px] text-white/70">
          {current}
        </span>
        <span className="text-[9px] text-white/30">day streak</span>
      </div>
      {longest > current && (
        <div className="flex items-center gap-1 text-[9px] text-white/20">
          <span>best: {longest}</span>
        </div>
      )}
    </div>
  );
}
