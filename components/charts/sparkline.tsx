'use client';

import { cn } from '@/lib/utils';

interface SparklineProps {
  data: number[];
  color?: string;
  className?: string;
  height?: number;
  showDots?: boolean;
}

export function Sparkline({
  data = [],
  color = '#34d399',
  className,
  height = 60,
  showDots = true,
}: SparklineProps) {
  if (!data.length) return null;
  const w = 200;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * height}`)
    .join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className={cn('w-full', className)} style={{ height }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="opacity-80"
      />
      {showDots && data.map((v, i) => (
        <circle
          key={i}
          cx={(i / (data.length - 1)) * w}
          cy={height - ((v - min) / range) * height}
          r="2"
          fill={color}
          className="opacity-40"
        />
      ))}
    </svg>
  );
}
