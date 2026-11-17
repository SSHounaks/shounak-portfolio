import Image from 'next/image';
import Link from 'next/link';
import { posts } from '#content';
import { Header } from '@/components/header';
import { BackgroundCanvas } from '@/components/background-canvas';
import { Footer } from '@/components/footer';
import { TerminalCard } from '@/components/terminal-card';
import { PageTransition } from '@/components/page-transition';
import { TechIcon } from '@/components/tech-icon';
import { techBrandColor } from '@/lib/tech-icons';

const tagColors: Record<string, string> = {
  react: 'text-sky-300',
  css: 'text-pink-300',
  ui: 'text-purple-300',
  rust: 'text-orange-300',
  wasm: 'text-yellow-300',
  performance: 'text-emerald-300',
  nextjs: 'text-white',
  mdx: 'text-cyan-300',
  velite: 'text-indigo-300',
  design: 'text-rose-300',
  'system-design': 'text-violet-300',
};

function tagClass(tag: string) {
  return tagColors[tag] || 'text-amber-300';
}

export default function BlogPage() {
  const visible = posts.filter(p => !p.hidden);
  const years = [...new Set(visible.map(p => p.date.slice(0, 4)))].sort((a, b) => b.localeCompare(a));

  return (
    <>
      <BackgroundCanvas />
      <Header />
      <PageTransition>
      <div className="min-h-screen bg-background px-6 md:px-10 max-w-[900px] mx-auto pt-24 pb-6 md:pb-10">
        <header className="mb-12">
          <div className="font-mono text-xs text-emerald-400/70 mb-2">// SYSLOG v2.0</div>
          <h1 className="font-display-lg text-[32px] md:text-[42px] text-white font-bold mb-2">
            <span className="text-emerald-400">_logs</span>
          </h1>
          <p className="font-mono text-[13px] text-white/50 max-w-2xl">
            Technical writings, thoughts, and explorations.
          </p>
        </header>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="font-mono text-xs text-zinc-400 mb-3 tracking-widest">
              // EMPTY
            </div>
            <div className="font-mono text-zinc-400 text-[12px] leading-relaxed space-y-3">
              <p className="text-xs text-zinc-400">{'> cat /var/log/blog.log'}</p>
              <p className="text-xs text-zinc-400">{'> '}</p>
              <p className="text-base font-bold text-red-500/30 py-3">{'[WARN]  No entries found'}</p>
              <p className="text-sm text-zinc-600/60 pb-3">{'> Coming soon...'}</p>
              <p className="text-xs text-zinc-400">{'> '}</p>
              <p className="text-[11px] text-zinc-400 animate-pulse">{'_'}</p>
            </div>
          </div>
        ) : years.map(year => (
          <div key={year} className="mb-10">
            <div className="flex items-center gap-2 mb-5 font-mono text-[13px] text-emerald-400/80">
              <span className="text-emerald-400/70">//</span>
              <span>{year}</span>
              <span className="h-px flex-1 bg-emerald-500/10"></span>
            </div>
            <div className="space-y-5">
              {visible.filter(p => p.date.startsWith(year)).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                  <TerminalCard variant="primary" className="!bg-black">
                    <div className="p-6 font-mono flex items-stretch gap-4">
                      {post.image ? (
                        <div className="relative w-20 shrink-0 overflow-hidden rounded border border-emerald-500/20 bg-black">
                          <Image src={post.image} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                      ) : post.icon ? (
                        <div className="flex w-20 shrink-0 items-center justify-center rounded border border-emerald-500/20 bg-black p-3">
                          <TechIcon tech={post.icon} color={techBrandColor(post.icon)} className="h-full w-full" />
                        </div>
                      ) : null}
                      <div className="flex min-w-0 flex-1 flex-col gap-3">
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="text-emerald-400/70">&gt;</span>
                          <span className="text-white/55">{post.date.slice(0, 10)}</span>
                          <span className="ml-auto whitespace-nowrap uppercase tracking-wider">
                            <span className="text-white/35">[</span>
                            {post.tags?.length
                              ? post.tags.map((tag, i) => (
                                  <span key={tag}>
                                    {i > 0 ? <span className="text-white/30">, </span> : null}
                                    <span className={`${tagClass(tag)} font-bold transition cursor-pointer hover:underline hover:underline-offset-2 hover:brightness-125`}>{tag}</span>
                                  </span>
                                ))
                              : null}
                            <span className="text-white/35">]</span>
                          </span>
                        </div>
                        <h2 className="text-[18px] md:text-[20px] text-white font-bold leading-snug group-hover:text-emerald-300 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-white/50 text-[13px] leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </TerminalCard>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      </PageTransition>
      <Footer />
    </>
  );
}
