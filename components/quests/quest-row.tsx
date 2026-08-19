'use client';

import { useState } from 'react';
import type { CompletedQuest } from '@/lib/quests';
import { cn } from '@/lib/utils';

interface QuestRowProps {
  quest: CompletedQuest;
}

const difficultyColors: Record<string, string> = {
  easy: '#34d399',
  medium: '#fbbf24',
  hard: '#f87171',
  legendary: '#c084fc',
};

export function QuestRow({ quest }: QuestRowProps) {
  const [expanded, setExpanded] = useState(false);
  const barColor = difficultyColors[quest.difficulty] ?? '#34d399';

  return (
    <div className={cn(
      'group rounded transition-colors',
      expanded && 'bg-white/[0.01]',
    )}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-0 py-2 px-3 cursor-pointer text-left hover:bg-white/[0.02] rounded"
      >
        <div className="w-[3px] h-5 rounded-full shrink-0 mr-3" style={{ backgroundColor: barColor }} />
        <span className="font-mono text-[10px] text-white/60 flex-1 truncate group-hover:text-white/80 transition-colors">
          {quest.title}
        </span>
        <span className="font-mono text-[9px] text-emerald-400/40 shrink-0 ml-2">
          +{quest.xpReward ?? 0}
        </span>
        <span className={cn(
          'material-symbols-outlined text-[12px] text-white/15 shrink-0 ml-1 transition-transform duration-200',
          expanded && 'rotate-180',
        )}>
          expand_more
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 pl-9">
          <div className="py-2.5 px-3 bg-white/[0.02] border border-white/[0.04] rounded">
            <div className="flex items-center gap-3 font-mono text-[10px] mb-1.5">
              <span className="text-white/40">{quest.completedDate}</span>
              <span className="text-white/10">|</span>
              <span className="text-white/30">{quest.category}</span>
            </div>
            {quest.skills && quest.skills.length > 0 && (
              <p className="font-mono text-[10px] text-white/35">
                {quest.skills.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
