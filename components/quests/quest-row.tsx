'use client';

import { useState } from 'react';
import type { CompletedQuest } from '@/lib/quests';
import { cn } from '@/lib/utils';
import { SkillTag } from '@/components/quests/skill-tag';

interface QuestRowProps {
  quest: CompletedQuest;
}

const difficultyColors: Record<string, string> = {
  easy: '#34d399',
  medium: '#fbbf24',
  hard: '#f87171',
  legendary: '#c084fc',
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 w-[68px] shrink-0">
        {label}
      </span>
      <span className="font-mono text-[10px] text-white/70 min-w-0">{children}</span>
    </div>
  );
}

export function QuestRow({ quest }: QuestRowProps) {
  const [expanded, setExpanded] = useState(false);
  const barColor = difficultyColors[quest.difficulty] ?? '#34d399';

  return (
    <div className={cn('group rounded transition-colors', expanded && 'bg-white/[0.015]')}>
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="w-full flex items-center py-2 px-3 cursor-pointer text-left hover:bg-white/[0.03] rounded focus-visible:outline-2 focus-visible:outline-emerald-400/60 -outline-offset-2"
      >
        <span
          className="w-[5px] h-[5px] rounded-full shrink-0 mr-3 transition-all"
          style={{
            backgroundColor: barColor,
            boxShadow: expanded ? `0 0 6px ${barColor}` : 'none',
          }}
        />
        <span className="material-symbols-outlined text-[12px] text-emerald-400/50 shrink-0 mr-2">
          check_circle
        </span>
        <span className="font-mono text-[10px] text-white/65 flex-1 truncate group-hover:text-white/90 transition-colors">
          {quest.title}
        </span>
        <span className="font-mono text-[9px] text-amber-400/60 shrink-0 ml-2 tabular-nums font-bold">
          +{quest.xpReward ?? 0}
        </span>
        <span
          className={cn(
            'material-symbols-outlined text-[13px] text-white/20 shrink-0 ml-1 transition-transform duration-200',
            expanded && 'rotate-180 text-white/45',
          )}
        >
          expand_more
        </span>
      </button>

      {expanded && (
        <div className="w-full">
          <div className="relative w-full h-full rounded border border-white/[0.07] bg-black/40 overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${barColor}88, transparent)`,
              }}
            />

            <div className="px-3.5 pt-3 pb-3 space-y-2.5">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-emerald-400/80">
                  <span className="material-symbols-outlined text-[11px]">verified</span>
                  quest complete
                </span>
                <span className="font-mono text-[9px] font-bold tabular-nums" style={{ color: barColor }}>
                  +{quest.xpReward ?? 0} xp
                </span>
              </div>

              <div className="space-y-1.5 pt-1 border-t border-white/[0.05]">
                <DetailRow label="cleared">{quest.completedDate}</DetailRow>
                <DetailRow label="category">
                  <span className="uppercase tracking-wider text-white/55">{quest.category}</span>
                </DetailRow>
                <DetailRow label="difficulty">
                  <span
                    className="inline-flex items-center px-1.5 py-px rounded-sm border font-mono text-[8px] font-bold uppercase tracking-wider"
                    style={{ color: barColor, borderColor: `${barColor}44`, backgroundColor: `${barColor}12` }}
                  >
                    {quest.difficulty}
                  </span>
                </DetailRow>
              </div>

              {quest.skills && quest.skills.length > 0 && (
                <div className="pt-2 border-t border-white/[0.05]">
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 mb-1.5">
                    skills gained
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {quest.skills.map((skill) => (
                      <SkillTag key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
