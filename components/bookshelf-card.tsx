'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface BookEntry {
  title: string;
  author: string;
  type: 'book' | 'paper' | 'article';
  category: string;
  image?: string;
  description?: string;
  tags?: string[];
  status?: 'READ' | 'READING' | 'PLANNED' | 'RECOMMENDED';
}

const categoryColors: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  'distributed-systems': {
    border: 'border-amber-500/15 hover:border-amber-500/30',
    bg: 'bg-amber-500/[0.03]',
    text: 'text-amber-400',
    badge: 'text-amber-400 border-amber-500/20 bg-amber-500/8',
  },
  architecture: {
    border: 'border-emerald-500/15 hover:border-emerald-500/30',
    bg: 'bg-emerald-500/[0.03]',
    text: 'text-emerald-400',
    badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/8',
  },
  compilers: {
    border: 'border-purple-500/15 hover:border-purple-500/30',
    bg: 'bg-purple-500/[0.03]',
    text: 'text-purple-400',
    badge: 'text-purple-400 border-purple-500/20 bg-purple-500/8',
  },
  'self-improvement': {
    border: 'border-sky-500/15 hover:border-sky-500/30',
    bg: 'bg-sky-500/[0.03]',
    text: 'text-sky-400',
    badge: 'text-sky-400 border-sky-500/20 bg-sky-500/8',
  },
  'system-design': {
    border: 'border-cyan-500/15 hover:border-cyan-500/30',
    bg: 'bg-cyan-500/[0.03]',
    text: 'text-cyan-400',
    badge: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/8',
  },
  observability: {
    border: 'border-rose-500/15 hover:border-rose-500/30',
    bg: 'bg-rose-500/[0.03]',
    text: 'text-rose-400',
    badge: 'text-rose-400 border-rose-500/20 bg-rose-500/8',
  },
  'ml-systems': {
    border: 'border-violet-500/15 hover:border-violet-500/30',
    bg: 'bg-violet-500/[0.03]',
    text: 'text-violet-400',
    badge: 'text-violet-400 border-violet-500/20 bg-violet-500/8',
  },
  sre: {
    border: 'border-orange-500/15 hover:border-orange-500/30',
    bg: 'bg-orange-500/[0.03]',
    text: 'text-orange-400',
    badge: 'text-orange-400 border-orange-500/20 bg-orange-500/8',
  },
};

function catStyle(cat: string) {
  return categoryColors[cat] || {
    border: 'border-white/10 hover:border-white/20',
    bg: 'bg-white/[0.01]',
    text: 'text-white/40',
    badge: 'text-white/40 border-white/10 bg-white/[0.03]',
  };
}

const typeBadge: Record<string, string> = {
  book: 'text-amber-400/60 border-amber-500/15 bg-amber-500/5',
  paper: 'text-cyan-400/60 border-cyan-500/15 bg-cyan-500/5',
  article: 'text-purple-400/60 border-purple-500/15 bg-purple-500/5',
};

export function BookshelfCard({ entry }: { entry: BookEntry }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !entry.image || imgError;
  const cc = catStyle(entry.category);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    card.addEventListener('mousemove', handleMove);
    return () => card.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group/card relative rounded-lg border overflow-hidden flex flex-col h-full transition-all duration-300',
        cc.border,
        cc.bg,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.04), transparent 70%)`,
        }}
      />

      {/* Terminal window bar */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.04] relative z-[2]">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-white/10 group-hover/card:bg-red-500/60 transition-colors duration-200" />
          <div className="w-2 h-2 rounded-full bg-white/10 group-hover/card:bg-yellow-500/60 transition-colors duration-200" />
          <div className="w-2 h-2 rounded-full bg-white/10 group-hover/card:bg-emerald-500/60 transition-colors duration-200" />
        </div>
      </div>

      {/* Cover area */}
      <div className="aspect-[3/4] relative overflow-hidden bg-zinc-950">
        {!showPlaceholder ? (
          <>
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 group-hover/card:brightness-110"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="absolute inset-0">
            <img
              src="/am.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20 scale-150"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}

        {entry.status && (
          <div className={cn(
            'absolute bottom-0 left-0 right-0 px-3 py-1.5 z-[2] flex items-center gap-2 bg-black/60 backdrop-blur-sm shadow-lg border-t',
            entry.status === 'READ' && 'border-t-emerald-500/20',
            entry.status === 'READING' && 'border-t-amber-500/20',
            entry.status === 'PLANNED' && 'border-t-sky-500/20',
            entry.status === 'RECOMMENDED' && 'border-t-purple-500/20',
          )}>
            <div className={cn(
              'flex-1 h-[1.5px]',
              entry.status === 'READ' && 'bg-emerald-500/40',
              entry.status === 'READING' && 'bg-amber-500/40',
              entry.status === 'PLANNED' && 'bg-sky-500/40',
              entry.status === 'RECOMMENDED' && 'bg-purple-500/40',
            )} />
            <span className={cn(
              'text-[7px] font-mono uppercase tracking-widest shrink-0 flex items-center gap-1',
              entry.status === 'READ' && 'text-emerald-400/60',
              entry.status === 'READING' && 'text-amber-400/60',
              entry.status === 'PLANNED' && 'text-sky-400/60',
              entry.status === 'RECOMMENDED' && 'text-purple-400/60',
            )}>
              {entry.status === 'READ' && 'Read'}
              {entry.status === 'READING' && 'Reading'}
              {entry.status === 'PLANNED' && 'Planned'}
              {entry.status === 'RECOMMENDED' && 'Recommended'}
            </span>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="p-3.5 flex flex-col flex-1 gap-1.5 relative z-[1] min-w-0">
        <h3 className="text-[12px] font-bold text-white/80 leading-snug group-hover/card:text-emerald-300 transition-colors line-clamp-2">
          {entry.title}
        </h3>
        <p className="text-[10px] text-white/40 font-mono truncate">{entry.author}</p>

        {entry.description && (
          <p className="text-[9px] text-white/30 leading-relaxed line-clamp-2 mt-0.5">{entry.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2">
          <span className={cn('px-2 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider border', typeBadge[entry.type] || typeBadge.book)}>
            {entry.type}
          </span>
          <span className={cn('px-2 py-0.5 rounded text-[7px] font-mono tracking-wider border', cc.badge)}>
            {entry.category}
          </span>
        </div>

      </div>
    </div>
  );
}
