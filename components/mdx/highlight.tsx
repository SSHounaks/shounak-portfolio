import { cn } from '@/lib/utils';

const highlightStyles = {
  success: 'text-emerald-400',
  info: 'text-sky-400',
  warn: 'text-amber-400',
  error: 'text-red-400',
} as const;

type HighlightType = keyof typeof highlightStyles;

interface HighlightProps {
  type?: HighlightType;
  className?: string;
  children?: React.ReactNode;
}

export function HighlightSpan({ type = 'success', className, children }: HighlightProps) {
  return (
    <span className={cn('font-mono underline decoration-transparent hover:decoration-inherit transition-[text-decoration] decoration-2 underline-offset-2', highlightStyles[type], className)}>
      {children}
    </span>
  );
}
