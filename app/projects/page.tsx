'use client';

import { useMemo, useState } from 'react';
import { Header } from '@/components/header';
import { BackgroundCanvas } from '@/components/background-canvas';
import { Footer } from '@/components/footer';
import { PageTransition } from '@/components/page-transition';
import { TerminalCard } from '@/components/terminal-card';
import { ProjectCard } from '@/components/project-card';
import { projects, techList } from '@/lib/projects';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const techs = useMemo(
    () => [...new Set(projects.flatMap((p) => techList(p.technologies)))].sort(),
    [],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeTech && !techList(p.technologies).includes(activeTech)) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        techList(p.technologies).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeTech, searchQuery]);

  return (
    <>
      <BackgroundCanvas />
      <Header />
      <PageTransition>
        <div className="min-h-screen bg-background p-6 md:p-10 max-w-6xl mx-auto pt-24">
          <header className="mb-10">
            <div className="font-mono text-[10px] text-emerald-500/50 mb-2">// WORK_LOG v1.0</div>
            <h1 className="font-display-lg text-[32px] md:text-[42px] text-white font-bold mb-1 tracking-tight">
              _<span className="text-cyan-400">projects</span>
            </h1>
            <p className="font-mono text-[13px] text-white/30 max-w-xl">
              Things I have built and contributed to.
            </p>
          </header>

          <div className="mb-8 space-y-1">
            <div className="flex flex-wrap items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg p-2.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mr-1">filter</span>
              <button
                onClick={() => setActiveTech(null)}
                className={cn(
                  'cursor-pointer px-3 py-1 rounded text-[9px] font-mono uppercase tracking-wider border transition-all duration-200',
                  activeTech === null
                    ? 'text-white bg-white/15 border-white/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]'
                    : 'text-white/40 border-white/10 hover:text-white/70 hover:bg-white/[0.04] hover:border-white/20',
                )}
              >
                all ({projects.length})
              </button>
              {techs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech === activeTech ? null : tech)}
                  className={cn(
                    'cursor-pointer px-3 py-1 rounded text-[9px] font-mono uppercase tracking-wider border transition-all duration-200',
                    activeTech === tech
                      ? 'text-cyan-400 bg-cyan-950/30 border-cyan-500/40 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.4)]'
                      : 'text-white/40 border-white/10 hover:text-white/70 hover:bg-white/[0.04] hover:border-white/20',
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg p-2.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">--search</span>
              <div className="flex-1 flex items-center gap-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="name, description, tech..."
                  className="flex-1 min-w-[100px] bg-transparent border-none outline-none p-0 text-[10px] font-mono text-emerald-400 placeholder-emerald-800/30"
                  style={{ caretColor: '#34d399', caretShape: 'block' } as React.CSSProperties}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="cursor-pointer text-white/20 hover:text-white/60 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[12px] align-middle">close</span>
                  </button>
                )}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent" />
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="font-mono text-[9px] text-zinc-800 mb-4 tracking-widest uppercase">
                // NO MATCHES
              </div>
              <div className="font-mono text-zinc-600 text-[12px] leading-relaxed space-y-2">
                <p className="text-[10px] text-zinc-700">{'> ls ~/projects/ | grep '}<span className="text-zinc-500">{searchQuery || activeTech}</span></p>
                <p className="text-[10px] text-zinc-700">{'> '}</p>
                <p className="text-sm font-bold text-cyan-500/40 py-2">{'no projects matching "'}{searchQuery || activeTech}{'"'}</p>
                <p className="text-[10px] text-zinc-700 animate-pulse">{'_'}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((project, i) => (
                <ProjectCard key={project.name} project={project} index={i} />
              ))}
            </div>
          )}

          <div className="mt-16 border-t border-white/[0.04] pt-8">
            <TerminalCard variant="secondary">
              <div className="p-5 font-mono text-[10px] text-white/25 space-y-1.5">
                <p className="text-white/40">{'$ cat projects.stats'}</p>
                <p><span className="text-white/50">total</span> <span className="text-white/70">{projects.length}</span></p>
                <p><span className="text-white/50">filtered</span> <span className="text-white/70">{filtered.length}</span></p>
                <p><span className="text-white/50">technologies</span> <span className="text-white/70">{techs.length}</span></p>
              </div>
            </TerminalCard>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
