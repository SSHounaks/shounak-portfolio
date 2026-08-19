'use client';

import { useState } from 'react';
import type { CompletedQuest } from '@/lib/quests';
import { QuestRow } from '@/components/quests/quest-row';
import { cn } from '@/lib/utils';

interface CompletedQuestsListProps {
  completedQuests: CompletedQuest[];
}

const ITEMS_PER_PAGE = 7;

export function CompletedQuestsList({ completedQuests }: CompletedQuestsListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const allItems = [...completedQuests].sort(
    (a, b) => b.completedDate.localeCompare(a.completedDate),
  );

  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  const pagedItems = allItems.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  return (
    <details open className="bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg group/completed">
      <summary className="flex flex-wrap items-center justify-between gap-3 p-2.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">completed</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-white/25">
            {allItems.length} entries
          </span>
          <span className="material-symbols-outlined text-[12px] text-white/20 group-open/completed:rotate-90 transition-transform duration-200">
            chevron_right
          </span>
        </div>
      </summary>

      <div className="mx-2.5 h-px bg-white/[0.06]" />

      <div className="px-2.5 pb-2.5 pt-1">
        <div className="space-y-0">
          {pagedItems.map((item) => (
            <QuestRow key={item.id} quest={item} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/[0.06]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className={cn(
                'font-mono text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer',
                currentPage === 0
                  ? 'text-white/10 border-white/5 cursor-not-allowed'
                  : 'text-white/50 border-white/10 hover:text-white/80 hover:bg-white/[0.04] hover:border-white/20',
              )}
            >
              {'<'}
            </button>
            <span className="font-mono text-[10px] text-white/40 min-w-[50px] text-center">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className={cn(
                'font-mono text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer',
                currentPage >= totalPages - 1
                  ? 'text-white/10 border-white/5 cursor-not-allowed'
                  : 'text-white/50 border-white/10 hover:text-white/80 hover:bg-white/[0.04] hover:border-white/20',
              )}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </details>
  );
}
