import questsData from '@/data/quests.json';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'legendary';

export interface ActiveQuest {
  id: string;
  title: string;
  description?: string;
  difficulty: Difficulty;
  xpReward?: number;
  category: string;
  startDate?: string;
  progress: number;
  skills?: string[];
}

export interface CompletedQuest {
  id: string;
  title: string;
  difficulty: Difficulty;
  xpReward?: number;
  category: string;
  completedDate: string;
  skills?: string[];
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  xpEarned: number;
  skillsGained: string[];
  relatedQuests?: string[];
  reflection?: string;
}

export interface DailyTask {
  id: string;
  title: string;
  xpReward: number;
  category: string;
}

export interface QuestsData {
  activeQuests: ActiveQuest[];
  completedQuests: CompletedQuest[];
  milestones: Milestone[];
  dailyTasks?: DailyTask[];
  streaks?: Record<string, number>;
  streakStats?: { current: number; longest: number };
}

export interface PlayerProfile {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  title: string;
  questsCompleted: number;
}

const TITLE_THRESHOLDS: { min: number; title: string }[] = [
  { min: 51, title: 'Legend' },
  { min: 31, title: 'Master' },
  { min: 16, title: 'Expert' },
  { min: 6, title: 'Journeyman' },
  { min: 1, title: 'Novice' },
];

function getTitle(level: number): string {
  for (const t of TITLE_THRESHOLDS) {
    if (level >= t.min) return t.title;
  }
  return 'Novice';
}

function computeLevel(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 500));
}

function computeCurrentXP(totalXP: number, level: number): number {
  return totalXP - level * level * 500;
}

function computeXpToNextLevel(level: number): number {
  return (2 * level + 1) * 500;
}

export function loadQuests(): QuestsData {
  return questsData as QuestsData;
}

export function getDailyTasks(data: QuestsData): DailyTask[] {
  return data.dailyTasks ?? [];
}

export function getStreaks(data: QuestsData): Record<string, number> {
  return data.streaks ?? {};
}

export function getStreakStats(data: QuestsData): { current: number; longest: number } {
  return data.streakStats ?? { current: 0, longest: 0 };
}

export function computeProfile(data: QuestsData): PlayerProfile {
  const completedXP = data.completedQuests.reduce(
    (sum, q) => sum + (q.xpReward ?? 0),
    0,
  );
  const milestoneXP = data.milestones.reduce(
    (sum, m) => sum + (m.xpEarned ?? 0),
    0,
  );

  const totalXP = completedXP + milestoneXP;
  const level = computeLevel(totalXP);
  const currentXP = computeCurrentXP(totalXP, level);
  const xpToNextLevel = computeXpToNextLevel(level);

  return {
    level,
    currentXP,
    xpToNextLevel,
    totalXP,
    title: getTitle(level),
    questsCompleted: data.completedQuests.length,
  };
}
