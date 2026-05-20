import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  cols: 2 | 3;
  children: ReactNode;
  className?: string;
}

export function Grid({ cols, children, className }: GridProps) {
  return (
    <div
      className={cn(
        'grid gap-4 my-6 not-prose',
        cols === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface GridItemProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: string;
}

export function GridItem({ children, className, title, icon }: GridItemProps) {
  return (
    <div
      className={cn(
        'font-mono rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-sm',
        'hover:border-zinc-700 transition-colors',
        className,
      )}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-widest text-zinc-500">
          {icon && <span className="material-symbols-outlined text-[12px]">{icon}</span>}
          {title && <span>{title}</span>}
        </div>
      )}
      <div className="text-zinc-300 text-[13px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}
