'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text?: string;
  interval?: number;
  glitchProbability?: number;
  glitchDuration?: number;
  className?: string;
  glitchChars?: string;
}

export function GlitchText({
  text = 'SYSTEM_ONLINE',
  interval = 2000,
  glitchProbability = 0.6,
  glitchDuration = 120,
  className,
  glitchChars = '!@#$%^&*<>/\\|',
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const t = setInterval(() => {
      if (Math.random() > glitchProbability) return;
      const glitched = text
        .split('')
        .map((c) =>
          Math.random() > 0.7
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : c,
        )
        .join('');
      setDisplay(glitched);
      timeoutId = setTimeout(() => setDisplay(text), glitchDuration);
    }, interval);
    return () => {
      clearInterval(t);
      clearTimeout(timeoutId);
    };
  }, [text, interval, glitchProbability, glitchDuration, glitchChars]);

  return (
    <span
      className={cn(
        'font-mono text-[13px] text-emerald-400 font-bold tracking-wider',
        className,
      )}
    >
      {display}
    </span>
  );
}
