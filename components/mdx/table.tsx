import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  header: string;
}

interface TableProps {
  columns: Column[];
  rows: Record<string, ReactNode>[];
  striped?: boolean;
  compact?: boolean;
  className?: string;
}

export function Table({ columns, rows, striped, compact, className }: TableProps) {
  return (
    <div className={cn('font-mono my-6 overflow-x-auto', className)}>
      <div className="flex items-center gap-2 mb-3 text-[10px] text-zinc-500 uppercase tracking-widest">
        <span className="text-emerald-500/60">//</span>
        <span>TABLE</span>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'text-zinc-400 font-bold text-[10px] uppercase tracking-wider',
                  compact ? 'px-2 py-1.5' : 'px-3 py-2',
                )}
              >
                # {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/20',
                striped && i % 2 === 1 && 'bg-zinc-900/30',
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'text-zinc-300 text-[12px]',
                    compact ? 'px-2 py-1.5' : 'px-3 py-2',
                  )}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
