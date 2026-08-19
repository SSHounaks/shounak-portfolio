import { cn } from '@/lib/utils';

interface SkillTagProps {
  skill: string;
  className?: string;
}

export function SkillTag({ skill, className }: SkillTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[8px] font-mono text-white/50 border border-white/10 bg-white/[0.03] tracking-wide',
        className,
      )}
    >
      {skill}
    </span>
  );
}
