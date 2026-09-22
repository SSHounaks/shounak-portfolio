'use client';

import { useRef, useEffect, useState } from 'react';
import type { ActiveQuest } from '@/lib/quests';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: ActiveQuest;
}

const rarity = {
  easy: {
    hex: '#34d399',
    border: 'border-emerald-500/20 hover:border-emerald-500/45',
    bg: 'bg-emerald-500/[0.03]',
    label: 'text-emerald-400/80',
    chip: 'bg-emerald-500/10',
  },
  medium: {
    hex: '#fbbf24',
    border: 'border-amber-500/20 hover:border-amber-500/45',
    bg: 'bg-amber-500/[0.03]',
    label: 'text-amber-400/80',
    chip: 'bg-amber-500/10',
  },
  hard: {
    hex: '#f87171',
    border: 'border-red-500/20 hover:border-red-500/45',
    bg: 'bg-red-500/[0.03]',
    label: 'text-red-400/80',
    chip: 'bg-red-500/10',
  },
  legendary: {
    hex: '#c084fc',
    border: 'border-purple-500/30 hover:border-purple-400/60',
    bg: 'bg-purple-500/[0.05]',
    label: 'text-purple-300',
    chip: 'bg-purple-500/15',
  },
};

const PROGRESS_SEGMENTS = 16;

export function QuestCard({ quest }: QuestCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rc = rarity[quest.difficulty];
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    card.addEventListener('mousemove', handleMove);
    const t = requestAnimationFrame(() => setRevealed(true));
    return () => {
      card.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(t);
    };
  }, []);

  const filled = Math.round((revealed ? quest.progress : 0) / 100 * PROGRESS_SEGMENTS);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group/card relative rounded-lg overflow-hidden transition-all duration-300 border',
        rc.border,
        rc.bg,
        'bg-black/40 backdrop-blur-md',
        quest.difficulty === 'legendary' &&
          'shadow-[0_0_32px_-8px_rgba(192,132,252,0.35)]',
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] opacity-70 group-hover/card:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${rc.hex} 30%, ${rc.hex} 70%, transparent 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.05), transparent 70%)`,
        }}
      />

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-[7px] h-[7px] rounded-full shrink-0"
              style={{ backgroundColor: rc.hex, boxShadow: `0 0 6px ${rc.hex}` }}
            />
            <span className={cn('font-mono text-[8px] font-bold uppercase tracking-[0.2em]', rc.label)}>
              {quest.difficulty}
            </span>
            <span className="text-white/15 font-mono text-[9px]">·</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/35 truncate">
              {quest.category}
            </span>
          </div>
          {quest.xpReward && (
            <span className="font-mono text-[12px] font-bold tabular-nums shrink-0" style={{ color: rc.hex }}>
              +{quest.xpReward}
            </span>
          )}
        </div>

        <h3 className="font-mono text-[12px] text-white/90 font-bold leading-snug mb-1.5 group-hover/card:text-white transition-colors">
          {quest.title}
        </h3>
        {quest.description && (
          <p className="font-mono text-[10px] text-white/45 leading-relaxed mb-3">{quest.description}</p>
        )}

        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex-1 flex gap-[2px]" aria-hidden>
            {Array.from({ length: PROGRESS_SEGMENTS }, (_, i) => (
              <span
                key={i}
                className="flex-1 h-[6px] rounded-[1px] transition-all duration-400"
                style={{
                  backgroundColor: i < filled ? rc.hex : 'rgba(255,255,255,0.07)',
                  boxShadow: i < filled ? `0 0 6px ${rc.hex}66` : 'none',
                  transitionDelay: revealed ? `${i * 22}ms` : '0ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] font-bold tabular-nums text-white/60 shrink-0 w-9 text-right">
            {quest.progress}%
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/[0.05]">
          {quest.skills && quest.skills.length > 0 ? (
            <p className="font-mono text-[9px] text-white/40 truncate">{quest.skills.join(' · ')}</p>
          ) : (
            <span />
          )}
          {quest.startDate && (
            <span className="font-mono text-[8px] text-white/25 tabular-nums shrink-0">{quest.startDate}</span>
          )}
        </div>
      </div>
    </div>
  );
}
