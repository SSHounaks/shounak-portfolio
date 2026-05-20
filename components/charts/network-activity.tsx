'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface NetworkActivityProps {
  nodeCount?: number;
  interval?: number;
  className?: string;
}

export function NetworkActivity({
  nodeCount = 7,
  interval = 400,
  className,
}: NetworkActivityProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % (nodeCount * 2)), interval);
    return () => clearInterval(t);
  }, [nodeCount, interval]);

  return (
    <div className={cn('flex items-center justify-center gap-1.5 py-4', className)}>
      {Array.from({ length: nodeCount }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-all duration-300',
              i <= active % nodeCount
                ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]'
                : 'bg-white/10',
            )}
          />
          <div
            className={cn(
              'w-0.5 h-6 rounded-full transition-all duration-300',
              i === active % nodeCount
                ? 'bg-emerald-400/60'
                : i < active % nodeCount
                  ? 'bg-emerald-400/20'
                  : 'bg-white/5',
            )}
          />
        </div>
      ))}
    </div>
  );
}
