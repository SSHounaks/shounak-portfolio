'use client';

import { ReactNode } from 'react';
import {
  HoverCard as HoverCardRoot,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface HoverCardProps {
  trigger: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function HoverCard({ trigger, children, side = 'top', className }: HoverCardProps) {
  return (
    <HoverCardRoot openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <span className="cursor-help border-b border-dotted border-zinc-600 hover:border-emerald-400 transition-colors">
          {trigger}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side={side}
        className={cn(
          'font-mono text-xs',
          'bg-zinc-900/95 backdrop-blur-xl border-zinc-800',
          'text-zinc-300',
          'shadow-2xl',
          className,
        )}
      >
        {children}
      </HoverCardContent>
    </HoverCardRoot>
  );
}
