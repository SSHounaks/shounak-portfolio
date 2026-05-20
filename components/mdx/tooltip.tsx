'use client';

import { ReactNode } from 'react';
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface TooltipProps {
  label: ReactNode;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function Tooltip({ label, children, side = 'top', className }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-zinc-600 hover:border-emerald-400 transition-colors">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn(
            'font-mono text-[11px]',
            'bg-zinc-900 border-zinc-800 text-zinc-300',
            'shadow-2xl',
            className,
          )}
        >
          {label}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
