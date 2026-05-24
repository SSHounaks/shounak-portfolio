'use client';

import { ReactNode } from 'react';
import {
  HoverCard as HoverCardRoot,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface TipProps {
  head?: string;
  tip: string;
  link?: string;
  children: ReactNode;
  className?: string;
}

export function Tip({ head, tip, link, children, className }: TipProps) {
  return (
    <HoverCardRoot openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <span className={cn(
          'cursor-help border-b border-dotted border-zinc-600 hover:border-emerald-400 transition-colors',
          className,
        )}>
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="font-mono text-xs bg-zinc-900/95 backdrop-blur-xl border-zinc-800 text-zinc-300 shadow-2xl max-w-xs"
      >
        <div className="space-y-1.5">
          <div className="text-emerald-400 text-[11px] font-bold flex items-center gap-2">
            <span className="text-emerald-500/60">&gt;</span>
            {head || children}
          </div>
          <div className="text-zinc-400 text-[12px] leading-relaxed">
            {tip}
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[11px] text-emerald-400/70 hover:text-emerald-400 underline underline-offset-2 decoration-zinc-700 transition-colors"
            >
              docs →<span className="sr-only"> (opens in new tab)</span>
            </a>
          )}
        </div>
      </HoverCardContent>
    </HoverCardRoot>
  );
}
