'use client';

import { useEffect, useState } from 'react';
import type { PlayerProfile } from '@/lib/quests';

interface CharacterSheetProps {
  profile: PlayerProfile;
  streak: { current: number; longest: number };
  activeCount: number;
  milestoneCount: number;
  dailyCount: number;
}

const XP_SEGMENTS = 24;

function CornerBrackets() {
  const base = 'absolute w-4 h-4 pointer-events-none';
  const color = 'border-emerald-400/50';
  return (
    <>
      <span className={`${base} top-2 left-2 border-t-2 border-l-2 ${color}`} />
      <span className={`${base} top-2 right-2 border-t-2 border-r-2 ${color}`} />
      <span className={`${base} bottom-2 left-2 border-b-2 border-l-2 ${color}`} />
      <span className={`${base} bottom-2 right-2 border-b-2 border-r-2 ${color}`} />
    </>
  );
}

function StatBlock({
  icon,
  label,
  value,
  accent = 'text-white/85',
}: {
  icon: string;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <span className="material-symbols-outlined text-[15px] text-white/25 shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className={`font-mono text-[13px] font-bold tabular-nums leading-tight ${accent}`}>{value}</div>
        <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/40 leading-tight">{label}</div>
      </div>
    </div>
  );
}

export function CharacterSheet({
  profile,
  streak,
  activeCount,
  milestoneCount,
  dailyCount,
}: CharacterSheetProps) {
  const pct =
    profile.xpToNextLevel > 0
      ? Math.min((profile.currentXP / profile.xpToNextLevel) * 100, 100)
      : 0;
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const filledCount = Math.round((revealed ? pct : 0) / 100 * XP_SEGMENTS);

  return (
    <section
      aria-label="Character sheet"
      className="relative border border-white/[0.08] bg-black/50 rounded-lg overflow-hidden"
    >
      <CornerBrackets />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 18% 40%, rgba(52,211,153,0.06), transparent 70%)',
        }}
      />

      <div className="relative p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/45">
            <span className="material-symbols-outlined text-[13px] text-emerald-400/70">save</span>
            save_slot_01
            <span className="text-white/15">·</span>
            <span className="text-white/60">shounak.bhalerao</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-300 border border-amber-400/30 bg-amber-500/[0.07] rounded">
            <span className="material-symbols-outlined text-[12px]">military_tech</span>
            {profile.title}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
          <div className="flex items-end gap-4 shrink-0">
            <div className="text-right">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mb-1">lv</div>
              <div className="font-mono text-[11px] text-emerald-400/70 font-bold -mb-1 tabular-nums">
                {String(profile.level).padStart(2, '0')}
              </div>
            </div>
            <div
              className="font-display-lg text-[88px] md:text-[120px] leading-[0.78] text-white font-extrabold tabular-nums select-none"
              style={{ textShadow: '0 0 40px rgba(52,211,153,0.18)' }}
            >
              {profile.level}
            </div>
          </div>

          <div className="flex-1 min-w-0 pb-2">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/45">
                exp to next level
              </span>
              <span className="font-mono text-[11px] tabular-nums text-emerald-300/90 font-bold">
                {profile.currentXP.toLocaleString()}
                <span className="text-white/30 font-normal"> / {profile.xpToNextLevel.toLocaleString()}</span>
                <span className="text-white/35 ml-2">{Math.round(pct)}%</span>
              </span>
            </div>

            <div
              className="flex gap-[3px] h-3"
              role="progressbar"
              aria-valuenow={Math.round(pct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Experience progress"
            >
              {Array.from({ length: XP_SEGMENTS }, (_, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-[1px] transition-all duration-500"
                  style={{
                    backgroundColor: i < filledCount ? '#34d399' : 'rgba(255,255,255,0.07)',
                    boxShadow: i < filledCount ? '0 0 8px rgba(52,211,153,0.45)' : 'none',
                    transitionDelay: revealed ? `${i * 28}ms` : '0ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-amber-400/80">local_fire_department</span>
                <span className="font-mono text-[12px] font-bold text-white/85 tabular-nums">{streak.current}</span>
                <span className="font-mono text-[9px] text-white/40">day streak</span>
                <span className="font-mono text-[9px] text-white/25 tabular-nums">best {streak.longest}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-emerald-400/70">shield</span>
                <span className="font-mono text-[12px] font-bold text-white/85 tabular-nums">
                  {profile.questsCompleted}
                </span>
                <span className="font-mono text-[9px] text-white/40">quests cleared</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/[0.07] bg-white/[0.015] px-5 md:px-7 py-3.5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
          <StatBlock icon="bolt" label="total xp" value={profile.totalXP.toLocaleString()} accent="text-emerald-300" />
          <StatBlock icon="flag" label="active" value={String(activeCount)} accent="text-rose-300" />
          <StatBlock icon="check_circle" label="cleared" value={String(profile.questsCompleted)} />
          <StatBlock icon="trophy" label="milestones" value={String(milestoneCount)} accent="text-amber-300" />
          <StatBlock icon="daily" label="dailies" value={String(dailyCount)} accent="text-sky-300" />
        </div>
      </div>
    </section>
  );
}
