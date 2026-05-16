'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TerminalCardProps {
  children: ReactNode;
  title?: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function TerminalCard({
  children,
  title,
  icon,
  variant = 'primary',
  className,
}: TerminalCardProps) {
  const glowClass = variant === 'secondary' ? 'glow-border-secondary' : 'glow-border-primary';
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      const header = headerRef.current;
      if (!section || !header) return;

      const sectionRect = section.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();

      const mouseX = ((e.clientX - sectionRect.left) / sectionRect.width) * 100;
      const mouseY = ((e.clientY - sectionRect.top) / sectionRect.height) * 100;
      section.style.setProperty('--mouse-x', `${mouseX}%`);
      section.style.setProperty('--mouse-y', `${mouseY}%`);

      const headerMouseX = e.clientX - headerRect.left;
      header.style.setProperty('--header-mouse-x', `${headerMouseX}px`);
    };

    let started = false;
    function start() {
      if (started) return;
      started = true;
      window.addEventListener('mousemove', handleMouseMove);
    }
    function stop() {
      started = false;
      window.removeEventListener('mousemove', handleMouseMove);
    }

    start();

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) start();
    };
    window.addEventListener('pageshow', onPageShow);

    const onVisibilityChange = () => {
      if (document.hidden) stop(); else start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'terminal-card rounded-lg overflow-hidden flex flex-col backdrop-blur-md group',
        glowClass,
        className
      )}
    >
      {(title || icon) && (
        <div ref={headerRef} className="terminal-header px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {icon && <span className="material-symbols-outlined text-[14px] opacity-30 group-hover:opacity-70 transition-opacity duration-200">{icon}</span>}
            {title && <span className="text-[10px] font-mono uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity duration-200">{title}</span>}
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-red-500/60 transition-colors duration-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-yellow-500/60 transition-colors duration-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-emerald-500/60 transition-colors duration-200"></div>
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
