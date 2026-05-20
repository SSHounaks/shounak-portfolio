'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Commit {
  hash: string;
  author: string;
  date: string;
  message: string;
  files: number;
  added: number;
  deleted: number;
}

interface ChangelogViewProps {
  commits?: Commit[];
  className?: string;
}

const defaultCommits: Commit[] = [
  { hash: 'a3f2c9e', author: 'ounak', date: '2025-05-16', message: 'feat: add reading progress bar to blog posts', files: 4, added: 87, deleted: 12 },
  { hash: 'b7d1e4f', author: 'ounak', date: '2025-05-15', message: 'fix: resolve hydration errors in sparkline and gauges', files: 3, added: 34, deleted: 18 },
  { hash: 'e8c5a2b', author: 'ounak', date: '2025-05-14', message: 'style: redesign blog listing with bigger titles and tag colors', files: 2, added: 56, deleted: 41 },
  { hash: 'f4d9b3c', author: 'ounak', date: '2025-05-13', message: 'feat: implement Table of Contents with intersection observer', files: 5, added: 142, deleted: 23 },
  { hash: '1a6e8d7', author: 'ounak', date: '2025-05-12', message: 'feat: add collapsible summary component for blog posts', files: 2, added: 68, deleted: 0 },
  { hash: '9c2b4f1', author: 'ounak', date: '2025-05-11', message: 'refactor: extract breadcrumbs into separate component', files: 3, added: 95, deleted: 52 },
  { hash: '3d8e7a5', author: 'ounak', date: '2025-05-10', message: 'feat: add Velite MDX blog pipeline with Shiki highlighting', files: 8, added: 312, deleted: 89 },
  { hash: '6f1c9e2', author: 'ounak', date: '2025-05-09', message: 'fix: prevent background-canvas memory leaks on unmount', files: 1, added: 15, deleted: 8 },
];

export function ChangelogView({
  commits = defaultCommits,
  className,
}: ChangelogViewProps) {
  const [view, setView] = useState<'unified' | 'split'>('unified');

  return (
    <div className={cn('font-mono', className)}>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setView('unified')}
          className={cn(
            'text-[10px] px-2.5 py-1 rounded border transition-colors cursor-pointer',
            view === 'unified'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60',
          )}
        >
          unified
        </button>
        <button
          onClick={() => setView('split')}
          className={cn(
            'text-[10px] px-2.5 py-1 rounded border transition-colors cursor-pointer',
            view === 'split'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60',
          )}
        >
          split
        </button>
        <span className="text-white/20 text-[10px] ml-auto">
          {commits.length} commits
        </span>
      </div>

      {view === 'unified' ? (
        <div className="space-y-0">
          {commits.map((c, i) => (
            <div
              key={c.hash}
              className="flex items-start gap-3 py-2 px-2 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex flex-col items-center gap-0.5 pt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                {i < commits.length - 1 && (
                  <div className="w-px h-full min-h-[28px] bg-white/5" />
                )}
              </div>
              <span className="text-emerald-400/60 text-[10px] w-16 shrink-0 font-bold">
                {c.hash}
              </span>
              <span className="text-white/30 text-[10px] w-20 shrink-0">{c.date}</span>
              <span className="text-white/50 text-[10px] w-12 shrink-0">{c.author}</span>
              <span className="text-white/70 text-[11px] flex-1">{c.message}</span>
              <div className="flex items-center gap-2 text-[9px] shrink-0">
                <span className="text-cyan-400/60">+{c.added}</span>
                <span className="text-red-400/60">-{c.deleted}</span>
                <span className="text-white/20">{c.files} files</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-0 border border-white/5 rounded overflow-hidden">
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider px-3 py-1.5 bg-white/[0.02] border-b border-white/5">
              main
            </div>
            <div className="divide-y divide-white/[0.02]">
              {commits.map((c) => (
                <div
                  key={c.hash}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
                  <span className="text-emerald-400/60 text-[9px] w-12 shrink-0">
                    {c.hash}
                  </span>
                  <span className="text-white/70 text-[10px] flex-1 truncate">
                    {c.message}
                  </span>
                  <span className="text-white/20 text-[8px] shrink-0">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-px bg-white/5" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider px-3 py-1.5 bg-white/[0.02] border-b border-white/5">
              feature/blog
            </div>
            <div className="divide-y divide-white/[0.02]">
              {[
                { hash: 'd4e8f2a', date: '2025-05-16', message: 'feat: add author bio to blog posts' },
                { hash: 'b2c7a91', date: '2025-05-15', message: 'style: responsive table of contents sidebar' },
                { hash: 'f1e3d5c', date: '2025-05-14', message: 'feat: related posts section at bottom' },
                { hash: '9a4b6c8', date: '2025-05-13', message: 'fix: heading anchor scroll offset' },
              ].map((c) => (
                <div
                  key={c.hash}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="w-1 h-1 rounded-full bg-cyan-500/60 shrink-0" />
                  <span className="text-cyan-400/60 text-[9px] w-12 shrink-0">{c.hash}</span>
                  <span className="text-white/70 text-[10px] flex-1 truncate">{c.message}</span>
                  <span className="text-white/20 text-[8px] shrink-0">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
