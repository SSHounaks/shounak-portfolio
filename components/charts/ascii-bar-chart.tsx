import { cn } from '@/lib/utils';

interface Bar {
  label: string;
  value: number;
}

interface AsciiBarChartProps {
  bars: Bar[];
  maxLabel?: string;
  barCount?: number;
  className?: string;
}

export function AsciiBarChart({
  bars,
  maxLabel,
  barCount = 10,
  className,
}: AsciiBarChartProps) {
  return (
    <div className={cn('font-mono text-[10px] space-y-0.5', className)}>
      {maxLabel && (
        <div className="flex items-center gap-2 mb-1.5 text-emerald-500/60">
          <span>//</span>
          <span className="text-white/30">{maxLabel}</span>
        </div>
      )}
      {bars.map((b) => (
        <div key={b.label} className="flex items-center gap-2">
          <span className="text-white/40 w-6 text-right">{b.label}</span>
          <span className="text-emerald-500/30">|</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-px">
              {Array.from({ length: barCount }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-2 h-3 rounded-[1px]',
                    i < Math.round(b.value / (100 / barCount))
                      ? 'bg-emerald-500/60'
                      : 'bg-white/5',
                  )}
                />
              ))}
            </div>
            <span className="text-white/30">{b.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
