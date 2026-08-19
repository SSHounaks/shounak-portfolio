'use client';

import type { DailyTask as DailyTaskType } from '@/lib/quests';

interface DailyTasksProps {
  tasks: DailyTaskType[];
  streaks: Record<string, number>;
}

export function DailyTasks({ tasks, streaks }: DailyTasksProps) {
  return (
    <details open className="bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg group/dailies">
      <summary className="flex items-center gap-2 p-2.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">dailies</span>
        <span className="h-px flex-1 bg-white/[0.06]" />
        <span className="font-mono text-[9px] text-white/25">{tasks.length}</span>
        <span className="material-symbols-outlined text-[12px] text-white/20 group-open/dailies:rotate-90 transition-transform duration-200">
          chevron_right
        </span>
      </summary>
      <div className="px-2.5 pb-2.5 space-y-0">
        {tasks.map((task, i) => {
          const streak = streaks[task.id] ?? 0;
          return (
            <div
              key={task.id}
              className={`flex items-center gap-3 py-2 px-2 rounded group/task hover:bg-emerald-500/[0.02] transition-colors ${
                i > 0 ? 'border-t border-white/[0.03]' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[12px] text-white/10 group-hover/task:text-emerald-400/40 transition-colors">
                check_box_outline_blank
              </span>
              <span className="font-mono text-[10px] text-white/60 flex-1 group-hover/task:text-white/80 transition-colors">
                {task.title}
              </span>
              <span className="font-mono text-[9px] text-emerald-400/30">
                +{task.xpReward}
              </span>
              {streak > 0 && (
                <span className="font-mono text-[9px] text-amber-400/30">
                  {streak}🔥
                </span>
              )}
            </div>
          );
        })}
      </div>
    </details>
  );
}
