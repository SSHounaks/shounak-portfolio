'use client';

import type { DailyTask as DailyTaskType } from '@/lib/quests';

interface DailyTasksProps {
  tasks: DailyTaskType[];
  streaks: Record<string, number>;
}

export function DailyTasks({ tasks, streaks }: DailyTasksProps) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/[0.07] rounded-lg">
      <div className="px-2.5 py-2 space-y-0">
        {tasks.map((task, i) => {
          const streak = streaks[task.id] ?? 0;
          return (
            <div
              key={task.id}
              className={`flex items-center gap-3 py-2 px-2 rounded group/task hover:bg-emerald-500/[0.03] transition-colors ${
                i > 0 ? 'border-t border-white/[0.03]' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[13px] text-white/15 group-hover/task:text-emerald-400/50 transition-colors">
                check_box_outline_blank
              </span>
              <span className="font-mono text-[10px] text-white/65 flex-1 group-hover/task:text-white/90 transition-colors">
                {task.title}
              </span>
              <span className="font-mono text-[9px] text-emerald-400/45 tabular-nums">
                +{task.xpReward}
              </span>
              {streak > 0 && (
                <span className="inline-flex items-center gap-0.5 font-mono text-[9px] text-amber-400/70 tabular-nums">
                  <span className="material-symbols-outlined text-[11px] leading-none">local_fire_department</span>
                  {streak}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
