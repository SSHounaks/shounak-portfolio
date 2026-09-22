import type { Milestone } from '@/lib/quests';

interface JourneyTimelineProps {
  milestones: Milestone[];
}

const DOT_CENTER = 11.5;

export function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  const sorted = [...milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/[0.07] rounded-lg px-4 py-5">
      {sorted.map((milestone, i) => {
        const d = new Date(milestone.date);
        const dateLabel = d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        });
        const isFirst = i === 0;
        const isLast = i === sorted.length - 1;
        const showLine = !isFirst || !isLast;

        const lineStyle: React.CSSProperties = isFirst
          ? { top: `${DOT_CENTER}px`, bottom: 0 }
          : isLast
            ? { top: 0, height: `${DOT_CENTER}px` }
            : { top: 0, bottom: 0 };

        return (
          <div key={milestone.id} className={`relative flex group ${isLast ? '' : 'pb-5'}`}>
            <div className="relative w-9 shrink-0">
              {showLine && (
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 w-px"
                  style={{
                    ...lineStyle,
                    background: isFirst
                      ? 'linear-gradient(to bottom, rgba(251,191,36,0.45), rgba(255,255,255,0.1))'
                      : 'rgba(255,255,255,0.1)',
                  }}
                />
              )}
              <span className="absolute left-1/2 -translate-x-1/2 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-amber-500/35 bg-background group-hover:border-amber-400/60 transition-colors flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-amber-400/60 group-hover:bg-amber-300 transition-colors" />
              </span>
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-mono text-[8px] text-white/30 tabular-nums">{dateLabel}</span>
                <span className="font-mono text-[11px] text-white/80 font-bold group-hover:text-white transition-colors">
                  {milestone.title}
                </span>
                {milestone.xpEarned > 0 && (
                  <span className="font-mono text-[9px] text-amber-400/60 tabular-nums font-bold">
                    +{milestone.xpEarned.toLocaleString()}
                  </span>
                )}
              </div>

              {milestone.skillsGained.length > 0 && (
                <p className="font-mono text-[9px] text-white/35 mt-0.5">
                  {milestone.skillsGained.join(', ')}
                </p>
              )}

              {milestone.reflection && (
                <p className="font-mono text-[10px] text-white/30 mt-1.5 leading-relaxed">
                  <span className="text-amber-500/40">//</span> {milestone.reflection}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
