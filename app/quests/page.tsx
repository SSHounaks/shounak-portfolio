'use client';

import { Header } from '@/components/header';
import { BackgroundCanvas } from '@/components/background-canvas';
import { Footer } from '@/components/footer';
import { PageTransition } from '@/components/page-transition';
import { CharacterSheet } from '@/components/quests/character-sheet';
import { ActiveQuests } from '@/components/quests/active-quests';
import { CompletedQuestsList } from '@/components/quests/completed-quests';
import { JourneyTimeline } from '@/components/quests/journey-timeline';
import { DailyTasks } from '@/components/quests/daily-tasks';
import {
  loadQuests,
  computeProfile,
  getDailyTasks,
  getStreaks,
  getStreakStats,
} from '@/lib/quests';

function SectionLabel({
  icon,
  label,
  count,
  accent,
}: {
  icon: string;
  label: string;
  count: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`material-symbols-outlined text-[16px] ${accent}`}>{icon}</span>
      <h2 className="font-mono text-[12px] text-white/75 font-bold uppercase tracking-[0.2em]">
        {label}
      </h2>
      <span className="font-mono text-[10px] text-white/30 tabular-nums">{count}</span>
      <span className="h-px flex-1 bg-white/[0.07]" />
    </div>
  );
}

export default function QuestsPage() {
  const data = loadQuests();
  const profile = computeProfile(data);
  const dailyTasks = getDailyTasks(data);
  const streaks = getStreaks(data);
  const streakStats = getStreakStats(data);

  return (
    <>
      <BackgroundCanvas />
      <Header />
      <PageTransition>
        <div className="min-h-screen bg-background p-6 md:p-10 max-w-6xl mx-auto pt-24 pb-16">
          <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display-lg text-[36px] md:text-[46px] text-white font-bold tracking-tight">
              _<span className="text-rose-400">quests</span>
            </h1>
            <p className="font-mono text-[11px] text-white/40 pb-1.5">
              {'>'} save file loaded · fresh run · {data.activeQuests.length} active quest{data.activeQuests.length === 1 ? '' : 's'}
            </p>
          </header>

          <div className="mb-10">
            <CharacterSheet
              profile={profile}
              streak={streakStats}
              activeCount={data.activeQuests.length}
              milestoneCount={data.milestones.length}
              dailyCount={dailyTasks.length}
            />
          </div>

          <section className="mb-10">
            <SectionLabel
              icon="flag"
              label="quest board"
              count={data.activeQuests.length}
              accent="text-rose-400/70"
            />
            <ActiveQuests quests={data.activeQuests} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              <section>
                <SectionLabel
                  icon="history"
                  label="cleared log"
                  count={data.completedQuests.length}
                  accent="text-emerald-400/70"
                />
                <CompletedQuestsList completedQuests={data.completedQuests} />
              </section>
              {dailyTasks.length > 0 && (
                <section>
                  <SectionLabel
                    icon="daily"
                    label="dailies"
                    count={dailyTasks.length}
                    accent="text-sky-400/70"
                  />
                  <DailyTasks tasks={dailyTasks} streaks={streaks} />
                </section>
              )}
            </div>

            <section>
              <SectionLabel
                icon="trophy"
                label="milestones"
                count={data.milestones.length}
                accent="text-amber-400/70"
              />
              {data.milestones.length > 0 ? (
                <JourneyTimeline milestones={data.milestones} />
              ) : (
                <div className="bg-black/40 border border-white/[0.07] rounded-lg p-6 font-mono text-[11px] space-y-1.5">
                  <p className="text-white/45">{'> cat milestones.log'}</p>
                  <p className="text-white/25">no milestones yet — the run just started.</p>
                  <p className="text-white/15 animate-pulse">_</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
