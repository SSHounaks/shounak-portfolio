'use client';

import { useState, useMemo, useRef } from 'react';
import { Header } from '@/components/header';
import { BackgroundCanvas } from '@/components/background-canvas';
import { Footer } from '@/components/footer';
import { TerminalCard } from '@/components/terminal-card';
import { BookshelfCard } from '@/components/bookshelf-card';
import { PageTransition } from '@/components/page-transition';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { books, type BookEntry } from '@/lib/bookshelf';
import { cn } from '@/lib/utils';

const categoryColorMap: Record<string, string> = {
  'distributed-systems': 'text-amber-400 border-amber-500/20',
  architecture: 'text-emerald-400 border-emerald-500/20',
  compilers: 'text-purple-400 border-purple-500/20',
  'self-improvement': 'text-sky-400 border-sky-500/20',
  'system-design': 'text-cyan-400 border-cyan-500/20',
  observability: 'text-rose-400 border-rose-500/20',
  'ml-systems': 'text-violet-400 border-violet-500/20',
  sre: 'text-orange-400 border-orange-500/20',
};

function catPill(cat: string) {
  const base = categoryColorMap[cat] || 'text-white/40 border-white/10';
  return base + ' shadow-[inset_0_0_0_1px_currentColor]';
}

const typeStyles: Record<string, string> = {
  book: 'text-amber-400/60 bg-amber-500/8 border-amber-500/15',
  paper: 'text-cyan-400/60 bg-cyan-500/8 border-cyan-500/15',
  article: 'text-purple-400/60 bg-purple-500/8 border-purple-500/15',
};

function BookshelfTable({ entries }: { entries: BookEntry[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white/[0.04]">
          <TableHead className="font-mono text-[9px] uppercase tracking-widest text-white/20 w-[60px]">type</TableHead>
          <TableHead className="font-mono text-[9px] uppercase tracking-widest text-white/20">title</TableHead>
          <TableHead className="font-mono text-[9px] uppercase tracking-widest text-white/20 hidden sm:table-cell w-[140px]">author</TableHead>
          <TableHead className="font-mono text-[9px] uppercase tracking-widest text-white/20 hidden md:table-cell w-[130px]">category</TableHead>
          <TableHead className="font-mono text-[9px] uppercase tracking-widest text-white/20 hidden lg:table-cell w-[80px]">status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, i) => (
          <TableRow key={`${entry.title}-${i}`} className="border-white/[0.03] hover:bg-white/[0.01] font-mono text-[11px]">
            <TableCell>
              <span className={cn('px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border', typeStyles[entry.type] || typeStyles.book)}>
                {entry.type}
              </span>
            </TableCell>
            <TableCell className="text-white/80 font-bold">{entry.title}</TableCell>
            <TableCell className="text-white/30 truncate hidden sm:table-cell max-w-[140px]">{entry.author}</TableCell>
            <TableCell className="hidden md:table-cell">
              <span className={cn('px-2 py-0.5 rounded text-[8px] uppercase tracking-wider border', catPill(entry.category))}>
                {entry.category}
              </span>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {entry.status ? (
                <div className="flex items-center gap-1.5">
                  {entry.status === 'READ' && (
                    <>
                      <span className="material-symbols-outlined text-[11px] text-emerald-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>check_circle</span>
                      <span className="text-[9px] text-emerald-400/60">Read</span>
                    </>
                  )}
                  {entry.status === 'READING' && (
                    <>
                      <span className="material-symbols-outlined text-[11px] text-amber-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>auto_stories</span>
                      <span className="text-[9px] text-amber-400/60">Reading</span>
                    </>
                  )}
                  {entry.status === 'PLANNED' && (
                    <>
                      <span className="material-symbols-outlined text-[11px] text-sky-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>radio_button_unchecked</span>
                      <span className="text-[9px] text-sky-400/60">Planned</span>
                    </>
                  )}
                  {entry.status === 'RECOMMENDED' && (
                    <>
                      <span className="material-symbols-outlined text-[11px] text-purple-400" style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 20" }}>lightbulb</span>
                      <span className="text-[9px] text-purple-400/60">Recommended</span>
                    </>
                  )}
                </div>
              ) : (
                <span className="text-white/10 text-[9px]">—</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function BookshelfPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showRecommended, setShowRecommended] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const categories = useMemo(
    () => [...new Set(books.map((b) => b.category))].sort(),
    [],
  );

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = {};
    books.forEach((b) => { m[b.category] = (m[b.category] || 0) + 1; });
    return m;
  }, []);

  const statusCounts = useMemo(() => {
    const m: Record<string, number> = {};
    books.forEach((b) => { if (b.status) m[b.status] = (m[b.status] || 0) + 1; });
    return m;
  }, []);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (activeCategory && b.category !== activeCategory) return false;
      if (showRecommended && b.status !== 'RECOMMENDED') return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, showRecommended, searchQuery]);

  const emptyReason = useMemo(() => {
    if (books.length === 0) return 'empty';
    if (searchQuery && activeCategory) return 'search+category';
    if (searchQuery) return 'search';
    if (activeCategory) return 'category';
    return 'empty';
  }, [searchQuery, activeCategory]);

  return (
    <>
      <BackgroundCanvas />
      <Header />
      <PageTransition>
      <div className="min-h-screen bg-background p-6 md:p-10 max-w-6xl mx-auto pt-24">
        <header className="mb-10">
          <div className="font-mono text-[10px] text-emerald-500/50 mb-2">// COLLECTION v1.0</div>
          <h1 className="font-display-lg text-[32px] md:text-[42px] text-white font-bold mb-1 tracking-tight">
            _<span className="text-sky-400">books</span>
          </h1>
          <p className="font-mono text-[13px] text-white/30 max-w-xl">
            Books and papers that shaped how I build.
          </p>
        </header>

        {/* Toolbar */}
        <div className="mb-8 space-y-1">
          {/* Row 1: filter + view toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg p-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 mr-1">filter</span>
              <button
                onClick={() => setShowRecommended(!showRecommended)}
                className={cn(
                  'cursor-pointer px-3 py-1 rounded text-[9px] font-mono uppercase tracking-wider border transition-all duration-200',
                  showRecommended
                    ? 'text-purple-400 bg-purple-950/30 border-purple-500/40 shadow-[inset_0_0_0_1px_rgba(168,85,247,0.4)]'
                    : 'text-white/40 border-white/10 hover:text-purple-400 hover:border-purple-500/30',
                )}
              >
                recommended{statusCounts['RECOMMENDED'] ? ` (${statusCounts['RECOMMENDED']})` : ''}
              </button>
              <div className="w-px h-4 bg-white/[0.06] mx-1" />
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  'cursor-pointer px-3 py-1 rounded text-[9px] font-mono uppercase tracking-wider border transition-all duration-200',
                  activeCategory === null
                    ? 'text-white bg-white/15 border-white/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)]'
                    : 'text-white/40 border-white/10 hover:text-white/70 hover:bg-white/[0.04] hover:border-white/20',
                )}
              >
                all
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={cn(
                    'cursor-pointer px-3 py-1 rounded text-[9px] font-mono uppercase tracking-wider border transition-all duration-200',
                    activeCategory === cat
                      ? catPill(cat)
                      : 'text-white/40 border-white/10 hover:text-white/70 hover:bg-white/[0.04] hover:border-white/20',
                  )}
                >
                  {cat} ({categoryCounts[cat]})
                </button>
              ))}
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="cursor-pointer ml-1 px-2 py-1 rounded text-[9px] font-mono text-white/40 hover:text-white/80 transition-colors"
                >
                  <span className="material-symbols-outlined text-[12px] align-middle">close</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 border border-white/[0.06] rounded p-0.5">
              <button
                onClick={() => setViewMode('card')}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded text-[10px] transition-all duration-200',
                  viewMode === 'card'
                    ? 'text-white bg-white/10'
                    : 'text-white/30 hover:text-white/60',
                )}
              >
                <span className="material-symbols-outlined text-[14px] align-middle">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'cursor-pointer px-2 py-1 rounded text-[10px] transition-all duration-200',
                  viewMode === 'list'
                    ? 'text-white bg-white/10'
                    : 'text-white/30 hover:text-white/60',
                )}
              >
                <span className="material-symbols-outlined text-[14px] align-middle">view_list</span>
              </button>
            </div>
          </div>

          {/* Row 2: search */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/[0.06] rounded-lg p-2.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">--search</span>
            <div className="flex-1 flex items-center gap-1">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="title, author, tag..."
                className="flex-1 min-w-[100px] bg-transparent border-none outline-none p-0 text-[10px] font-mono text-emerald-400 placeholder-emerald-800/30"
                style={{ caretColor: '#34d399', caretShape: 'block' } as React.CSSProperties}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
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
              // EMPTY SHELF
            </div>
            <div className="font-mono text-zinc-600 text-[12px] leading-relaxed space-y-2">
              {emptyReason === 'empty' && (
                <>
                  <p className="text-[10px] text-zinc-700">{'> ls ~/bookshelf/'}</p>
                  <p className="text-[10px] text-zinc-700">{'> '}</p>
                  <p className="text-sm font-bold text-sky-500/40 py-2">{'ls: cannot access \'~/bookshelf/\': No such file'}</p>
                </>
              )}
              {emptyReason === 'search' && (
                <>
                  <p className="text-[10px] text-zinc-700">{'> ls ~/bookshelf/ | grep '}<span className="text-zinc-500">{searchQuery}</span></p>
                  <p className="text-[10px] text-zinc-700">{'> '}</p>
                  <p className="text-sm font-bold text-sky-500/40 py-2">{'no entries matching "'}{searchQuery}{'"'}</p>
                </>
              )}
              {emptyReason === 'search+category' && (
                <>
                  <p className="text-[10px] text-zinc-700">{'> ls ~/bookshelf/'}{activeCategory}{' | grep '}<span className="text-zinc-500">{searchQuery}</span></p>
                  <p className="text-[10px] text-zinc-700">{'> '}</p>
                  <p className="text-sm font-bold text-sky-500/40 py-2">{'no entries matching "'}{searchQuery}{'" in '}{activeCategory}</p>
                </>
              )}
              {emptyReason === 'category' && (
                <>
                  <p className="text-[10px] text-zinc-700">{'> ls ~/bookshelf/'}{activeCategory}</p>
                  <p className="text-[10px] text-zinc-700">{'> '}</p>
                  <p className="text-sm font-bold text-sky-500/40 py-2">{'no '}{activeCategory}{' entries found'}</p>
                </>
              )}
              <p className="text-[10px] text-zinc-700 animate-pulse">{'_'}</p>
            </div>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((entry, i) => (
              <BookshelfCard key={`${entry.title}-${i}`} entry={entry} />
            ))}
          </div>
        ) : (
          <BookshelfTable entries={filtered} />
        )}

        <div className="mt-16 border-t border-white/[0.04] pt-8">
          <TerminalCard variant="secondary">
            <div className="p-5 font-mono text-[10px] text-white/25 space-y-1.5">
              <p className="text-white/40">{'$ cat bookshelf.stats'}</p>
              <p><span className="text-white/50">entries</span> <span className="text-white/70">{books.length}</span></p>
              <p><span className="text-white/50">filtered</span> <span className="text-white/70">{filtered.length}</span></p>
              <p>
                <span className="text-white/50">status</span>{' '}
                {statusCounts['READ'] && (
                  <span className="text-white/70 mr-3"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block align-middle mr-1" />Read {statusCounts['READ']}</span>
                )}
                {statusCounts['READING'] && (
                  <span className="text-white/70 mr-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block align-middle mr-1" />Reading {statusCounts['READING']}</span>
                )}
                {statusCounts['PLANNED'] && (
                  <span className="text-white/70 mr-3"><span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block align-middle mr-1" />Planned {statusCounts['PLANNED']}</span>
                )}
                {statusCounts['RECOMMENDED'] && (
                  <span className="text-white/70 mr-3"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block align-middle mr-1" />Recommended {statusCounts['RECOMMENDED']}</span>
                )}
              </p>
              <p><span className="text-white/50">last_updated</span> <span className="text-white/70">{new Date().toISOString().slice(0, 10)}</span></p>
            </div>
          </TerminalCard>
        </div>
      </div>
      </PageTransition>
      <Footer />
    </>
  );
}
