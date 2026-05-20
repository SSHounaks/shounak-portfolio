'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Hunk {
  type: 'header' | '+' | '-' | 'neutral';
  content: string;
}

interface DiffFile {
  name: string;
  status: string;
  hunks: Hunk[];
}

interface CodeDiffViewProps {
  files?: DiffFile[];
  className?: string;
}

const defaultFiles: DiffFile[] = [
  {
    name: 'components/reading-progress.tsx',
    status: 'modified',
    hunks: [
      { type: 'header', content: '@@ -18,7 +18,7 @@ export function ReadingProgress() {' },
      { type: '-', content: "        background: progress >= 100" },
      { type: '-', content: "          ? 'linear-gradient(to right, #f59e0b, #fbbf24)'" },
      { type: '-', content: "          : 'linear-gradient(to right, #10b981, #6ee7b7)'," },
      { type: '+', content: "        background: progress >= 100" },
      { type: '+', content: "          ? 'linear-gradient(to right, #f59e0b, #fbbf24)'" },
      { type: '+', content: "          : 'linear-gradient(to right, #10b981, #6ee7b7)'," },
      { type: 'neutral', content: '      />' },
      { type: 'neutral', content: '    </div>' },
      { type: 'neutral', content: '  );' },
    ],
  },
  {
    name: 'app/blog/page.tsx',
    status: 'modified',
    hunks: [
      { type: 'header', content: '@@ -33,11 +33,8 @@ export default function BlogPage() {' },
      { type: '-', content: "                    <div className='p-5 font-mono flex flex-col gap-3'>" },
      { type: '-', content: "                      <div className='flex items-center gap-3 text-[10px]'>" },
      { type: '-', content: "                        <span className='text-emerald-500/60'>&gt;</span>" },
      { type: '+', content: "                    <div className='p-6 font-mono flex flex-col gap-3'>" },
      { type: '+', content: "                      <div className='flex items-center gap-3 text-[11px]'>" },
      { type: '+', content: "                        <span className='text-emerald-500/60'>&gt;</span>" },
      { type: 'neutral', content: "                        <span className='text-white/30'>{post.date}</span>" },
      { type: 'neutral', content: '                      </div>' },
    ],
  },
  {
    name: 'content/blog/optimizing-nextjs-apps.mdx',
    status: 'added',
    hunks: [
      { type: 'header', content: '@@ -0,0 +1,42 @@' },
      { type: '+', content: '---' },
      { type: '+', content: 'title: "Optimizing Next.js Applications for Production"' },
      { type: '+', content: 'date: 2025-02-10' },
      { type: '+', content: 'excerpt: "A deep dive into performance optimization..."' },
      { type: '+', content: 'tags: [nextjs, performance, react]' },
      { type: '+', content: '---' },
      { type: '+', content: '' },
      { type: '+', content: '## Bundle Analysis' },
    ],
  },
];

const fileStatusColors: Record<string, string> = {
  modified: 'text-amber-400/80 border-amber-500/30 bg-amber-500/10',
  added: 'text-emerald-400/80 border-emerald-500/30 bg-emerald-500/10',
  deleted: 'text-red-400/80 border-red-500/30 bg-red-500/10',
};

const hunkColors: Record<string, string> = {
  header: 'bg-white/[0.02] text-white/30',
  '+': 'bg-emerald-500/8 text-emerald-400/90',
  '-': 'bg-red-500/8 text-red-400/90',
  neutral: 'text-white/50',
};

export function CodeDiffView({
  files = defaultFiles,
  className,
}: CodeDiffViewProps) {
  const [expanded, setExpanded] = useState<string | null>(files[0]?.name ?? null);

  return (
    <div className={cn('font-mono space-y-2', className)}>
      <div className="flex items-center gap-2 mb-3 text-[10px]">
        <span className="text-white/30">changed files:</span>
        <span className="text-cyan-400/60">{files.length}</span>
        <span className="text-white/20">|</span>
        <span className="text-emerald-400/60">+42</span>
        <span className="text-red-400/60">-18</span>
        <span className="text-white/20 ml-auto">diff --git a/* b/*</span>
      </div>
      {files.map((file) => {
        const open = expanded === file.name;
        return (
          <div key={file.name} className="border border-white/5 rounded overflow-hidden">
            <button
              onClick={() => setExpanded(open ? null : file.name)}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-[10px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-b border-white/5 cursor-pointer"
            >
              <span
                className="text-white/30 transition-transform duration-200"
                style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                ▸
              </span>
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border',
                  fileStatusColors[file.status] || 'text-white/30 border-white/10 bg-white/5',
                )}
              >
                {file.status}
              </span>
              <span className="text-white/60 flex-1 truncate">{file.name}</span>
            </button>
            {open && (
              <div className="text-[10px] leading-relaxed overflow-x-auto">
                {file.hunks.map((line, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-stretch',
                      hunkColors[line.type] || 'text-white/50',
                    )}
                  >
                    <span className="w-8 text-right text-white/20 shrink-0 py-px select-none border-r border-white/[0.02]">
                      {line.type === 'header' ? '' : line.type === '+' ? '+' : line.type === '-' ? '-' : ' '}
                    </span>
                    <span className="flex-1 px-3 py-px whitespace-pre">{line.content}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
