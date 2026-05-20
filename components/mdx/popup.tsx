'use client';

import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface PopupProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  variant?: 'dialog' | 'popover';
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function Popup({
  trigger,
  title,
  description,
  children,
  variant = 'popover',
  side = 'bottom',
  className,
}: PopupProps) {
  if (variant === 'dialog') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <span className="cursor-pointer border-b border-dashed border-zinc-600 hover:border-emerald-400 transition-colors">
            {trigger}
          </span>
        </DialogTrigger>
        <DialogContent
          className={cn(
            'font-mono',
            'bg-zinc-900/95 backdrop-blur-xl border-zinc-800',
            'text-zinc-300',
            'shadow-2xl',
            className,
          )}
        >
          {title && (
            <DialogHeader>
              <DialogTitle className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-zinc-500 text-xs">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}
          <div className="text-[13px] leading-relaxed">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="cursor-pointer border-b border-dashed border-zinc-600 hover:border-emerald-400 transition-colors">
          {trigger}
        </span>
      </PopoverTrigger>
      <PopoverContent
        side={side}
        className={cn(
          'font-mono text-xs',
          'bg-zinc-900/95 backdrop-blur-xl border-zinc-800',
          'text-zinc-300',
          'shadow-2xl',
          className,
        )}
      >
        {title && (
          <div className="text-emerald-400 text-[11px] font-bold mb-2 flex items-center gap-2">
            <span>&gt;</span>
            {title}
          </div>
        )}
        {children}
      </PopoverContent>
    </Popover>
  );
}
