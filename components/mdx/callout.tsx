import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const calloutStyles = {
  note: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/[0.03]',
    icon: 'info',
    prompt: '>',
    label: 'NOTE',
    color: 'text-emerald-400',
  },
  info: {
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/[0.03]',
    icon: 'lightbulb',
    prompt: '>',
    label: 'INFO',
    color: 'text-sky-400',
  },
  warn: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/[0.03]',
    icon: 'warning',
    prompt: '!',
    label: 'WARN',
    color: 'text-amber-400',
  },
  error: {
    border: 'border-red-500/30',
    bg: 'bg-red-500/[0.03]',
    icon: 'error',
    prompt: '✗',
    label: 'ERROR',
    color: 'text-red-400',
  },
};

interface CalloutProps {
  type?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
  list?: 'ol' | 'ul';
  className?: string;
}

function parseListItems(children: ReactNode, type: 'ol' | 'ul'): ReactNode {
  if (typeof children !== 'string') return children;

  const items = children
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => l.replace(/^(\d+[\.\)]?\s*|[-*]\s*)/, ''));

  if (items.length === 0) return children;

  const ListTag = type === 'ol' ? 'ol' : 'ul';

  return (
    <ListTag className="list-none space-y-2 pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-emerald-400/70 shrink-0 mt-0.5">
            {type === 'ol' ? `${i + 1}.` : '—'}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ListTag>
  );
}

export function Callout({ type = 'note', title, children, list, className }: CalloutProps) {
  const style = calloutStyles[type];

  return (
    <div
      className={cn(
        'font-mono rounded-lg border-l-2 p-4 my-6 text-sm leading-relaxed',
        style.bg,
        style.border,
        className,
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={cn('font-bold text-xs', style.color)}>
          {style.prompt}
        </span>
        <span className={cn('text-xs uppercase tracking-widest font-bold', style.color)}>
          {title || style.label}
        </span>
        <span className={cn('font-bold text-xs', style.color)}>
          //
        </span>
      </div>
      <div className="text-zinc-300 text-[13px] leading-relaxed pl-4">
        {list ? parseListItems(children, list) : children}
      </div>
    </div>
  );
}
