import { cn } from '@/lib/utils';
import type { Difficulty } from '@/lib/quests';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const difficultyConfig: Record<Difficulty, { label: string; color: string }> = {
  easy: { label: 'EASY', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/8' },
  medium: { label: 'MEDIUM', color: 'text-amber-400 border-amber-500/20 bg-amber-500/8' },
  hard: { label: 'HARD', color: 'text-red-400 border-red-500/20 bg-red-500/8' },
  legendary: { label: 'LEGENDARY', color: 'text-purple-400 border-purple-500/20 bg-purple-500/8' },
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider border',
        config.color,
        className,
      )}
    >
      {config.label}
    </span>
  );
}

export const difficultyBarColors: Record<Difficulty, string> = {
  easy: '#34d399',
  medium: '#fbbf24',
  hard: '#f87171',
  legendary: '#c084fc',
};
