'use client';

import { cn } from '@/lib/utils';

interface IconMapEntry {
  icon: string;
  className: string;
}

interface TableCSVProps {
  children: string;
  iconMap?: string;
  columnColors?: string;
  highlightCol?: string;
  striped?: boolean;
  compact?: boolean;
  className?: string;
}

function parseSource(source: string): { headers: string[]; rows: string[][] } {
  const lines = source.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0].split('|').map(h => h.trim());
  const rows = lines.slice(1).map(line => line.split('|').map(c => c.trim()));
  return { headers, rows };
}

function parseIconMap(raw: string | undefined): Map<string, IconMapEntry> {
  const map = new Map<string, IconMapEntry>();
  if (!raw) return map;
  for (const entry of raw.split(';')) {
    const [token, icon, ...rest] = entry.split(',').map(s => s.trim());
    if (token && icon) {
      map.set(token, { icon, className: rest.join(',').trim() || '' });
    }
  }
  return map;
}

function parseColumnColors(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

export function TableCSV({
  children,
  iconMap: iconMapRaw,
  columnColors: columnColorsRaw,
  highlightCol,
  striped,
  compact,
  className,
}: TableCSVProps) {
  const source = typeof children === 'string' ? children : '';
  const { headers, rows } = parseSource(source);
  const iconMap = parseIconMap(iconMapRaw);
  const columnColorClasses = parseColumnColors(columnColorsRaw);
  const highlightIdx = highlightCol
    ? headers.findIndex(h => h.toLowerCase() === highlightCol.toLowerCase())
    : -1;

  function renderCell(value: string) {
    const mapped = iconMap.get(value);
    if (mapped) {
      return (
        <span className={`material-symbols-outlined text-[14px] ${mapped.className}`}>
          {mapped.icon}
        </span>
      );
    }
    return <span>{value}</span>;
  }

  return (
    <div className={cn('font-mono my-6 overflow-x-auto', className)}>
      <div className="flex items-center gap-2 mb-3 text-[10px] text-zinc-500 uppercase tracking-widest">
        <span className="text-emerald-500/60">//</span>
        <span>TABLE</span>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            {headers.map((header, i) => (
              <th
                key={i}
                className={cn(
                  'text-zinc-400 font-bold text-[10px] uppercase tracking-wider',
                  compact ? 'px-2 py-1.5' : 'px-3 py-2',
                  highlightIdx === i && 'text-emerald-400',
                )}
              >
                # {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn(
                'border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/20',
                striped && rowIdx % 2 === 1 && 'bg-zinc-900/30',
                compact ? 'px-2 py-1.5' : 'px-3 py-2',
              )}
            >
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className={cn(
                    'text-[12px]',
                    columnColorClasses[colIdx] || 'text-zinc-300',
                    highlightIdx === colIdx && 'font-bold',
                  )}
                >
                  {renderCell(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
