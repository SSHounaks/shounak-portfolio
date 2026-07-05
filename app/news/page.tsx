import { Header } from '@/components/header';
import { BackgroundCanvas } from '@/components/background-canvas';
import { Footer } from '@/components/footer';
import { PageTransition } from '@/components/page-transition';

const broadcasts = [
  // {
  //   date: '2025-03-20',
  //   type: 'RELEASE',
  //   title: 'v2.0 — Hacker UI Showcase Live',
  //   body: 'Launched the component showcase at /test. Includes sparklines, gauges, matrix rain, typewriter effects, and 20+ terminal-inspired components for the bento grid.',
  // },
  // {
  //   date: '2025-02-14',
  //   type: 'UPDATE',
  //   title: 'Portfolio Redesign Complete',
  //   body: 'Full redesign with glassmorphic bento grid, terminal-themed cards, mouse spotlight effects, and animated skill matrix. Green-on-dark aesthetic throughout.',
  // },
  // {
  //   date: '2025-01-10',
  //   type: 'PATCH',
  //   title: 'Performance Optimizations',
  //   body: 'Reduced bundle size by 40%. Migrated animations to GPU-composited properties. Added scrollbar styling and fixed hydration errors across all routes.',
  // },
  // {
  //   date: '2024-12-01',
  //   type: 'BROADCAST',
  //   title: 'Open Source Contributions',
  //   body: 'Published three new open-source tools for terminal UI enthusiasts. Check out terminal-log, react-glitch-text, and use-typewriter hooks.',
  // },
  {
    date: '2026-07-05',
    type: 'RELEASE',
    title: 'Bookshelf: Curated Reading Collection Live',
    body: 'Launched a terminal-styled /bookshelf page featuring 10 curated titles with cover images, search & category filter, card grid and table views, and a READ / READING / PLANNED / RECOMMENDED status system.',
  },
  {
    date: '2026-05-25',
    type: 'BROADCAST',
    title: 'LLM Skills Setup: Agentic Toolkit Installed',
    body: 'Configured a comprehensive LLM agent skill suite for development workflows. See https://mcpservers.org/agent-skills for reference.',
  },
  {
    date: '2026-05-17',
    type: 'RELEASE',
    title: 'Portfolio v1.0: Terminal-Inspired Portfolio Launched',
    body: 'Shipped a fully responsive, terminal-themed portfolio built with Next.js 16, MDX blog via Velite, animated architecture diagrams, and a hacker-ui component showcase. Features real resume data, 10 LinkedIn testimonials, and bento-grid layout with dynamic breadcrumbs and code diff views.',
  },
];

const typeColors: Record<string, string> = {
  RELEASE: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400',
  UPDATE: 'border-amber-500/30 bg-amber-950/20 text-amber-400',
  PATCH: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-400',
  BROADCAST: 'border-purple-500/30 bg-purple-950/20 text-purple-400',
};

export default function NewsPage() {
  return (
    <>
      <BackgroundCanvas />
      <Header />
      <PageTransition>
      <div className="min-h-screen bg-background p-6 md:p-10 max-w-5xl mx-auto pt-24">
        <header className="space-y-3 border-b border-zinc-900/80 pb-8 mb-12">
          <div className="text-xs text-emerald-500/60 tracking-wider select-none">
            // BROADCAST_SIGNAL v2.0
          </div>
          <h1 className="text-4xl font-black text-emerald-400 tracking-tight flex items-center gap-1 drop-shadow-[0_0_15px_rgba(52,211,153,0.1)]">
            <span className="text-emerald-500/40 select-none">_</span>broadcast
          </h1>
          <p className="text-zinc-500 text-sm">
            Announcements, releases, and updates.
          </p>
        </header>

        {broadcasts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="font-mono text-[9px] text-zinc-800 mb-3 tracking-widest">
              // EMPTY
            </div>
            <div className="font-mono text-zinc-600 text-[12px] leading-relaxed space-y-3">
              <p className="text-[10px] text-zinc-700">{'> cat /var/log/broadcast.log'}</p>
              <p className="text-[10px] text-zinc-700">{'> '}</p>
              <p className="text-base font-bold text-red-500/30 py-3">{'[WARN]  No entries found'}</p>
              <p className="text-sm text-zinc-600/60 pb-3">{'> Coming soon...'}</p>
              <p className="text-[10px] text-zinc-700">{'> '}</p>
              <p className="text-[11px] text-zinc-700 animate-pulse">{'_'}</p>
            </div>
          </div>
        ) : (
        <div className="space-y-4">
          {[...broadcasts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((b) => (
            <div key={b.date} className="group relative rounded-lg border border-zinc-900 bg-black p-5 md:p-6 space-y-3 transition-all duration-300 hover:border-zinc-800 hover:shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <h2 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors truncate">
                    {b.title}
                  </h2>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 text-xs sm:w-[220px] shrink-0 border-t border-zinc-900/50 sm:border-t-0 pt-2 sm:pt-0">
                  <span className="text-zinc-600 sm:text-zinc-500 font-medium">{b.date}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded border tracking-wider w-[80px] text-center select-none ${typeColors[b.type] || 'text-white/30 border-white/10 bg-white/5'}`}>
                    {b.type}
                  </span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-4xl pl-7">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      )}
      </div>
      </PageTransition>
      <Footer />
    </>
  );
}
