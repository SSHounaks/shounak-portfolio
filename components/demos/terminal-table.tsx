import { cn } from '@/lib/utils';

interface ProcessRow {
  pid: number;
  user: string;
  cpu: string;
  mem: string;
  cmd: string;
}

interface TerminalTableProps {
  rows?: ProcessRow[];
  className?: string;
}

const defaultRows: ProcessRow[] = [
  { pid: 4217, user: 'root', cpu: '0.3', mem: '1.2', cmd: 'nginx -g daemon off;' },
  { pid: 3892, user: 'www', cpu: '2.1', mem: '4.7', cmd: 'node server.js' },
  { pid: 2104, user: 'postgres', cpu: '0.8', mem: '8.3', cmd: 'postgres -D /var/lib/pg' },
  { pid: 1563, user: 'root', cpu: '0.0', mem: '0.4', cmd: 'sshd -D' },
];

export function TerminalTable({
  rows = defaultRows,
  className,
}: TerminalTableProps) {
  return (
    <div className={cn('font-mono text-[9px] overflow-x-auto', className)}>
      <div className="flex items-center gap-2 text-white/30 border-b border-white/5 pb-1.5 mb-1">
        <span className="w-10">PID</span>
        <span className="w-8">USER</span>
        <span className="w-6">CPU%</span>
        <span className="w-6">MEM%</span>
        <span className="flex-1">COMMAND</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.pid}
          className="flex items-center gap-2 py-1 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
        >
          <span className="w-10 text-white/60">{r.pid}</span>
          <span className="w-8 text-emerald-400/80">{r.user}</span>
          <span className="w-6 text-white/40">{r.cpu}</span>
          <span className="w-6 text-amber-400/60">{r.mem}</span>
          <span className="flex-1 text-white/40 truncate">{r.cmd}</span>
        </div>
      ))}
    </div>
  );
}
