import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@shikijs/rehype';
import { rehypeCodeHeader } from './lib/rehype-code-header';

export const posts = defineCollection({
  name: 'posts',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    slug: s.path().transform(p => p.replace(/^blog\//, '')),
    title: s.string().max(99),
    date: s.isodate(),
    excerpt: s.string().max(399).optional(),
    image: s.string().optional(),
    video: s.string().optional(),
    tags: s.array(s.string()).optional(),
    hidden: s.boolean().optional(),
    content: s.markdown({
      // `velite` resolves its own copy of `unified`, so plugin types coming from
      // rehype-slug / @shikijs/rehype are structurally identical but nominally
      // incompatible. Align them to velite's expected type once, here.
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypeShiki, { theme: 'github-dark' }],
        rehypeCodeHeader,
      ] as unknown as NonNullable<Parameters<typeof s.markdown>[0]>['rehypePlugins'],
    }),
    headings: s.toc({ maxDepth: 3 }),
  }),
});

export default defineConfig({
  collections: { posts },
});
