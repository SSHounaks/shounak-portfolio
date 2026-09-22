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

  if (allItems.length === 0) {
    return (
      <div className="bg-black/40 backdrop-blur-sm border border-white/[0.07] rounded-lg p-6 font-mono text-[11px] space-y-1.5">
        <p className="text-white/45">{'> tail cleared.log'}</p>
        <p className="text-white/25">log is empty. clear a quest to make history.</p>
        <p className="text-white/15 animate-pulse">_</p>
      </div>
    );
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/[0.07] rounded-lg">
      <div className="px-2.5 pt-1.5 pb-1">
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
              aria-label="Previous page"
              className={cn(
                'font-mono text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400/60',
                currentPage === 0
                  ? 'text-white/15 border-white/5 cursor-not-allowed'
                  : 'text-white/55 border-white/10 hover:text-white/90 hover:bg-white/[0.04] hover:border-white/25',
              )}
            >
              {'<'}
            </button>
            <span className="font-mono text-[10px] text-white/45 min-w-[50px] text-center tabular-nums">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              aria-label="Next page"
              className={cn(
                'font-mono text-[11px] px-2.5 py-1 rounded border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400/60',
                currentPage >= totalPages - 1
                  ? 'text-white/15 border-white/5 cursor-not-allowed'
                  : 'text-white/55 border-white/10 hover:text-white/90 hover:bg-white/[0.04] hover:border-white/25',
              )}
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
