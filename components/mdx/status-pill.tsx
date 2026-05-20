import { cn } from '@/lib/utils';

const statusConfig = {
  todo: {
    label: 'TODO',
    dot: 'bg-zinc-500',
    text: 'text-zinc-400',
    border: 'border-zinc-700',
    bg: 'bg-zinc-900',
  },
  progress: {
    label: 'IN PROGRESS',
    dot: 'bg-amber-400',
    text: 'text-amber-300',
    border: 'border-amber-700',
    bg: 'bg-amber-900/30',
  },
  done: {
    label: 'DONE',
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    border: 'border-emerald-700',
    bg: 'bg-emerald-900/30',
  },
  cancelled: {
    label: 'CANCELLED',
    dot: 'bg-red-400',
    text: 'text-red-300',
    border: 'border-red-700',
    bg: 'bg-red-900/30',
  },
  review: {
    label: 'IN REVIEW',
    dot: 'bg-purple-400',
    text: 'text-purple-300',
    border: 'border-purple-700',
    bg: 'bg-purple-900/30',
  },
  hold: {
    label: 'ON HOLD',
    dot: 'bg-sky-400',
    text: 'text-sky-300',
    border: 'border-sky-700',
    bg: 'bg-sky-900/30',
  },
} as const;

type StatusType = keyof typeof statusConfig;

interface StatusPillProps {
  status: StatusType;
  className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border',
        config.bg,
        config.border,
        config.text,
        className,
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}
