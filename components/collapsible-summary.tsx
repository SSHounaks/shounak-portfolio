'use client';

import { useState } from 'react';

export function CollapsibleSummary({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <details
      className="group mb-8 rounded-lg border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm overflow-hidden transition-all duration-300 open:border-emerald-500/30 open:shadow-[0_0_20px_rgba(16,185,129,0.03)]"
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center gap-2 px-4 py-3 font-mono text-[12px] text-zinc-400 hover:text-emerald-400 cursor-pointer transition-colors select-none list-none">
        <span className="text-emerald-500 transition-transform duration-200 group-open:rotate-90">▸</span>
        <span className="text-zinc-400">$</span>
        <span className="font-semibold">{title}</span>
      </summary>
      <div className="px-4 pb-4 pt-3 border-t border-zinc-900 font-mono text-sm text-zinc-400 leading-relaxed space-y-2 bg-black/40">
        {children}
      </div>
    </details>
  );
}
