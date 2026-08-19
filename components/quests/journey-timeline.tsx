import type { Milestone } from '@/lib/quests';

interface JourneyTimelineProps {
  milestones: Milestone[];
}

export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  const sorted = [...milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <details open className="bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg group/timeline">
      {/* Header — always visible */}
      <summary className="flex items-center gap-2 p-2.5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">milestones</span>
        <span className="h-px flex-1 bg-white/[0.06]" />
        <span className="font-mono text-[9px] text-white/25">{milestones.length}</span>
        <span className="material-symbols-outlined text-[12px] text-white/20 group-open/timeline:rotate-90 transition-transform duration-200">
          chevron_right
        </span>
      </summary>

      <div className="px-4 pb-4 pt-0 relative pl-9">
        {/* Vertical line */}
        <div className="absolute left-[14px] top-1 bottom-4 w-px bg-gradient-to-b from-emerald-500/30 via-white/10 to-transparent" />

        <div className="space-y-5">
          {sorted.map((milestone) => {
            const d = new Date(milestone.date);
            const dateLabel = d.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            });

            return (
              <div key={milestone.id} className="relative group">
                <div className="absolute -left-[22px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-emerald-500/30 bg-background group-hover:border-emerald-400/50 transition-colors flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-emerald-400/50 group-hover:bg-emerald-300 transition-colors" />
                </div>

                <div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mono text-[8px] text-white/15">{dateLabel}</span>
                    <span className="font-mono text-[11px] text-white/70 font-bold group-hover:text-white/90 transition-colors">
                      {milestone.title}
                    </span>
                    {milestone.xpEarned > 0 && (
                      <span className="font-mono text-[8px] text-emerald-400/35">
                        +{milestone.xpEarned.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {milestone.skillsGained.length > 0 && (
                    <p className="font-mono text-[9px] text-white/20 mt-0.5">
                      {milestone.skillsGained.join(', ')}
                    </p>
                  )}

                  {milestone.reflection && (
                    <p className="font-mono text-[9px] text-white/15 mt-1 leading-relaxed">
                      <span className="text-emerald-500/30">//</span> {milestone.reflection}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </details>
  );
}
