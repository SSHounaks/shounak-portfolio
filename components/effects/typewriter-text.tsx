'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  phrases: string[];
  speed?: number;
  pause?: number;
  className?: string;
  prompt?: string;
  showCursor?: boolean;
}

export function TypewriterText({
  phrases,
  speed = 60,
  pause = 1800,
  className,
  prompt = '>',
  showCursor = true,
}: TypewriterTextProps) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isDeleting && charIdx < phrases[idx].length) {
      const t = setTimeout(() => {
        setText(phrases[idx].slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, speed);
      return () => clearTimeout(t);
    } else if (!isDeleting && charIdx >= phrases[idx].length) {
      const t = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(t);
    } else if (isDeleting && charIdx > 0) {
      const t = setTimeout(() => {
        setText(phrases[idx].slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    } else if (isDeleting && charIdx === 0) {
      setIdx((prev) => (prev + 1) % phrases.length);
      setIsDeleting(false);
    }
  }, [charIdx, idx, isDeleting, phrases, speed, pause]);

  return (
    <div className={cn('font-mono text-[13px] text-emerald-400 flex items-center gap-1', className)}>
      {prompt && <span className="text-emerald-500/60">{prompt}</span>}
      <span>{text}</span>
      {showCursor && (
        <span className="w-2 h-[14px] bg-emerald-400 animate-pulse" />
      )}
    </div>
  );
}
