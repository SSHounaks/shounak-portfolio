'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface FrequencyBarsProps {
  barCount?: number;
  interval?: number;
  className?: string;
}

export function FrequencyBars({
  barCount = 20,
  interval = 200,
  className,
}: FrequencyBarsProps) {
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: barCount }, () => 50),
  );

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setHeights(Array.from({ length: barCount }, () => Math.random() * 100));
    }, interval);
    return () => clearInterval(t);
  }, [barCount, interval, reducedMotion]);

  const colors = [
    'bg-emerald-500/80',
    'bg-cyan-400/70',
    'bg-emerald-400/90',
    'bg-amber-400/70',
    'bg-emerald-500/60',
  ];

  return (
    <div className={cn('flex items-end justify-center gap-[3px] h-16', className)}>
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn(
            'w-2 rounded-t-[2px] transition-all duration-200',
            colors[i % colors.length],
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
