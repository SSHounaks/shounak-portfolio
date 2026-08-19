import type { ActiveQuest } from '@/lib/quests';
import { QuestCard } from '@/components/quests/quest-card';

interface ActiveQuestsProps {
  quests: ActiveQuest[];
}

export function ActiveQuests({ quests }: ActiveQuestsProps) {
  if (quests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="font-mono text-[10px] text-zinc-700 mb-2">
          {'> cat active_quests.log'}
        </div>
        <p className="font-mono text-[11px] text-zinc-600">no active quests</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} />
      ))}
    </div>
  );
}
