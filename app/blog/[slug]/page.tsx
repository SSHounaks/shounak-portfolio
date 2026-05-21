import { notFound } from 'next/navigation';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import { rehypeCodeHeader } from '@/lib/rehype-code-header';
import { posts } from '#content';
import { Header } from '@/components/header';
import { BackgroundCanvas } from '@/components/background-canvas';
import { Footer } from '@/components/footer';
import { CollapsibleSummary } from '@/components/collapsible-summary';
import { TableOfContents } from '@/components/table-of-contents';
import { ReadingProgress } from '@/components/reading-progress';
import { CodeCopyHandler } from '@/components/code-copy-btn';
import { mdxComponents } from '@/lib/mdx-components';

const tagColors: Record<string, string> = {
  react: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
  css: 'text-pink-300 border-pink-500/30 bg-pink-500/10',
  ui: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
  rust: 'text-orange-300 border-orange-500/30 bg-orange-500/10',
  wasm: 'text-yellow-300 border-yellow-500/30 bg-yellow-500/10',
  performance: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  nextjs: 'text-white border-white/20 bg-white/5',
  mdx: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  velite: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
  design: 'text-rose-300 border-rose-500/30 bg-rose-500/10',
  'system-design': 'text-violet-300 border-violet-500/30 bg-violet-500/10',
};

function tagClass(tag: string) {
  return tagColors[tag] || 'text-amber-300 border-amber-500/30 bg-amber-500/10';
}

export function generateStaticParams() {
  return posts.filter(p => !p.hidden).map((post) => ({ slug: post.slug }));
}

const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeShiki, { theme: 'github-dark' }],
      rehypeCodeHeader,
    ] as any,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post || post.hidden) notFound();

  const mdxPath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  const rawMDX = fs.readFileSync(mdxPath, 'utf-8');

  return (
    <>
      <BackgroundCanvas />
      <Header />
      <ReadingProgress />
      <div className="min-h-screen bg-background p-6 md:p-10 max-w-[1100px] mx-auto pt-24">
        <article className="lg:flex lg:gap-10">
          <div className="flex-1 min-w-0 max-w-[800px]">
            <header className="mb-12">
              <div className="font-mono text-xs text-zinc-600 tracking-wider mb-4">
                // PUBLISHED: {post.date.toUpperCase()} {post.readTime ? `• READ_TIME: ${post.readTime}` : ''}
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight drop-shadow-[0_0_15px_rgba(52,211,153,0.15)] mb-4">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-zinc-400 text-lg leading-relaxed">{post.excerpt}</p>
              )}
              {post.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className={`px-2.5 py-0.5 text-xs rounded border font-semibold tracking-wider ${tagClass(tag)}`}>
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {post.image && (
              <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden border border-zinc-800">
                <Image src={post.image} alt="" fill className="object-cover" />
              </div>
            )}

            {post.video && (
              <video src={post.video} controls className="w-full mb-8 rounded-lg border border-zinc-800" />
            )}

            <CollapsibleSummary title="cat summary.txt">
              <p className="text-zinc-400 text-sm leading-relaxed">This post covers <strong className="text-emerald-400">{post.title}</strong>. {post.excerpt}</p>
            </CollapsibleSummary>

            <CodeCopyHandler>
              <div className="max-w-none font-mono text-base leading-relaxed space-y-8 [&_p]:text-zinc-300 [&_p]:leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-zinc-100 [&_h2]:tracking-tight [&_h2]:pt-4 [&_h2]:border-b [&_h2]:border-zinc-900 [&_h2]:pb-2 [&_h2]:mb-6 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2 [&_h2]:before:content-['#'] [&_h2]:before:text-emerald-500/40 [&_h2]:before:select-none [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-emerald-400 [&_h3]:tracking-tight [&_h3]:pt-2 [&_h3]:mb-3 [&_a]:text-emerald-400 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-zinc-700 [&_a]:hover:decoration-emerald-400 [&_a]:transition-colors [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:p-5 [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:border-0 [&_code]:text-emerald-300 [&_img]:rounded-lg [&_img]:border [&_img]:border-zinc-800 [&_ul]:text-zinc-300 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:ml-1 [&_ol]:text-zinc-300 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:ml-1 [&_li]:mb-1">
                <MDXRemote
                  source={rawMDX}
                  components={mdxComponents}
                  options={mdxOptions}
                />
              </div>
            </CodeCopyHandler>
          </div>

          <aside className="hidden lg:block w-[220px] flex-shrink-0">
            <TableOfContents headings={post.headings} />
          </aside>
        </article>
      </div>
      <Footer />
    </>
  );
}
