'use client';

import { useEffect, useState } from 'react';

type TocEntry = {
  title: string;
  url: string;
  items: TocEntry[];
};

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('');

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
      <nav className="space-y-1 overflow-y-auto no-scrollbar max-h-[calc(100vh-140px)]">
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
    </aside>
  );
}
