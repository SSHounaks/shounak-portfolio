import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface QuoteProps {
  from: string;
  link?: string;
  children: ReactNode;
  className?: string;
}

export function Quote({ from, link, children, className }: QuoteProps) {
  return (
    <blockquote className={cn(
      'my-8 rounded-lg border-l-2 border-emerald-500/40 bg-zinc-900/30 px-5 py-4 font-mono',
      className,
    )}>
      <div className="text-zinc-300 text-sm leading-relaxed italic mb-3 space-y-2">
        {children}
      </div>
      <footer className="text-xs text-zinc-500 flex items-center gap-2">
        <span className="text-emerald-500/60">—</span>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400/70 hover:text-emerald-400 underline underline-offset-2 decoration-zinc-700 transition-colors"
          >
            {from}
          </a>
        ) : (
          <span>{from}</span>
        )}
      </footer>
    </blockquote>
  );
}
