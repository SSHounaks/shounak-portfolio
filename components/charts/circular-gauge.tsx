import { cn } from '@/lib/utils';

interface CircularGaugeProps {
  value: number;
  label: string;
  color?: string;
  size?: number;
  className?: string;
}

export function CircularGauge({
  value,
  label,
  color = '#34d399',
  size = 64,
  className,
}: CircularGaugeProps) {
  const r = size * 0.4375;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="4"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (value / 100) * circumference}
          className="transition-all duration-1000"
        />
      </svg>
      <span
        className="text-[11px] font-bold font-mono"
        style={{ color }}
      >
        {value}%
      </span>
      <span className="text-white/40 text-[8px] font-mono uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
