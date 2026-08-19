import type { PlayerProfile as PlayerProfileType } from '@/lib/quests';

interface PlayerProfileProps {
  profile: PlayerProfileType;
}

export function PlayerProfile({ profile }: PlayerProfileProps) {
  const xpPct = profile.xpToNextLevel > 0
    ? Math.min((profile.currentXP / profile.xpToNextLevel) * 100, 100)
    : 0;

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg p-4 relative min-h-[140px]">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 mb-1 block">// level</span>

      <div className="flex items-end gap-3">
        <span className="font-display-lg text-[72px] md:text-[88px] text-white font-bold leading-none shrink-0">
          {profile.level}
        </span>
        <div className="flex-1 min-w-0 pb-1.5">
          <div className="relative h-3 bg-white/5 rounded overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white/40 rounded transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-white/60 uppercase tracking-widest">
              EXP
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/25 mt-1 block">
            {profile.currentXP.toLocaleString()}/{profile.xpToNextLevel.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="absolute bottom-2.5 right-3 flex items-center gap-1">
        <span className="font-mono text-[11px] text-white/50 font-bold">{profile.questsCompleted}</span>
        <span className="text-[11px]">🛡️</span>
      </div>
    </div>
  );
}
