'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

type TocEntry = {
  title: string;
  url: string;
  items: TocEntry[];
};

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [recentScroll, setRecentScroll] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const checkBottom = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
  }, []);

  const handleScroll = useCallback(() => {
    checkBottom();
    setRecentScroll(true);
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => setRecentScroll(false), 1500);
  }, [checkBottom]);

  useEffect(() => {
    return () => clearTimeout(scrollTimer.current);
  }, []);

  useEffect(() => {
    checkBottom();
    window.addEventListener('resize', checkBottom);
    return () => window.removeEventListener('resize', checkBottom);
  }, [checkBottom, headings]);

  useEffect(() => {
    const ids = headings.flatMap(h => [h.url.slice(1), ...h.items.map(c => c.url.slice(1))]);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-24 w-full max-w-[220px]">
      <div className="font-mono text-[10px] text-emerald-500/60 mb-3 tracking-wider uppercase">// sections</div>
      <div className="relative">
        <nav
          ref={navRef as React.RefObject<HTMLElement>}
          onScroll={handleScroll}
          className="space-y-1 overflow-y-auto no-scrollbar max-h-[calc(100vh-140px)]"
        >
        {headings.map((h) => (
          <div key={h.url}>
            <a
              href={h.url}
              className={`block text-[11px] font-mono transition-colors py-0.5 ${
                activeId === h.url.slice(1)
                  ? 'text-emerald-400 font-bold'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {h.title}
            </a>
            {h.items.length > 0 && (
              <div className="pl-3 border-l border-white/5 ml-1 mt-0.5 space-y-0.5">
                {h.items.map((c) => (
                  <a
                    key={c.url}
                    href={c.url}
                    className={`block text-[10px] font-mono transition-colors py-0.5 ${
                      activeId === c.url.slice(1)
                        ? 'text-emerald-400/80 font-bold'
                        : 'text-white/20 hover:text-white/50'
                    }`}
                  >
                    {c.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        </nav>
        <div
          className={cn(
            'pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-500/20 via-emerald-500/5 to-transparent transition-opacity duration-1000',
            isAtBottom && recentScroll ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
    </aside>
  );
}
