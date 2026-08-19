'use client';

import { useRef, useEffect } from 'react';
import type { ActiveQuest } from '@/lib/quests';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: ActiveQuest;
}

const difficultyColors = {
  easy: { border: 'border-emerald-500/20 hover:border-emerald-500/40', bg: 'bg-emerald-500/[0.03]', bar: '#34d399' },
  medium: { border: 'border-amber-500/20 hover:border-amber-500/40', bg: 'bg-amber-500/[0.03]', bar: '#fbbf24' },
  hard: { border: 'border-red-500/20 hover:border-red-500/40', bg: 'bg-red-500/[0.03]', bar: '#f87171' },
  legendary: { border: 'border-purple-500/20 hover:border-purple-500/40', bg: 'bg-purple-500/[0.03]', bar: '#c084fc' },
};

export function QuestCard({ quest }: QuestCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dc = difficultyColors[quest.difficulty];

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
        'group/card relative rounded-lg border overflow-hidden transition-all duration-300',
        dc.border,
        dc.bg,
      )}
    >
      {/* Mouse-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.04), transparent 70%)`,
        }}
      />

      {/* Left accent bar + content */}
      <div className="flex">
        <div className="w-[3px] shrink-0" style={{ backgroundColor: dc.bar }} />
        <div className="flex-1 p-3.5 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-mono text-[11px] text-white/80 font-bold leading-snug flex-1 line-clamp-2 group-hover/card:text-white transition-colors">
              {quest.title}
            </h3>
            {quest.xpReward && (
              <span className="font-mono text-[9px] text-emerald-400/40 shrink-0">+{quest.xpReward}</span>
            )}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-[3px] bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${quest.progress}%`, backgroundColor: dc.bar }}
              />
            </div>
            <span className="font-mono text-[9px] text-white/30 shrink-0">{quest.progress}%</span>
          </div>

          {/* Skills as comma-separated — like skills section */}
          {quest.skills && quest.skills.length > 0 && (
            <p className="font-mono text-[9px] text-white/30 truncate">
              {quest.skills.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
