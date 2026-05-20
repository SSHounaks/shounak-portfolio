# Local Development

## Running the dev server

```bash
deno run -A npm:next dev
```

This starts the Next.js dev server at `http://localhost:3000`. Velite will rebuild content automatically in watch mode when files change.

## Building for production

```bash
deno run -A npm:next build
```

Builds the static site output. Velite runs first to process content, then Next.js compiles and generates pages.

## Adding a blog post

1. Create an `.mdx` file in `content/blog/`:

```bash
touch content/blog/my-post.mdx
```

2. Add frontmatter at the top of the file:

```mdx
---
title: My Post Title
date: 2025-05-16
excerpt: A short description shown on the blog listing page.
tags: [react, css]
---
```

3. Write the rest of the post in Markdown. Code blocks use Shiki syntax highlighting automatically:

````mdx
```tsx
function Hello() {
  return <p>Hi</p>;
}
```
````

4. The post appears at `/blog/my-post` and is listed on `/blog` grouped by year. No imports or routing changes needed — Velite picks up any `.mdx` file placed in `content/blog/`.

## Adding images

Place images in the `public/images/blog/<post-slug>/` folder and reference them with standard Markdown syntax:

```mdx
![Architecture diagram](/images/blog/url-shortener/architecture.png)
```

**Featured image** — set `image` in the frontmatter to show a hero image at the top of the post:

```yaml
---
image: /images/blog/url-shortener/hero.png
---
```

**File naming conventions:**
- Use `kebab-case` for all filenames
- Prefer `.webp` for photos, `.png` for diagrams/screenshots
- Keep each post's images in its own folder under `public/images/blog/<post-slug>/` for easy management

## Project structure

```
content/blog/          # MDX blog posts (one file per post)
app/blog/page.tsx      # Blog listing page (groups posts by year)
app/blog/[slug]/       # Individual post page (dynamic route)
velite.config.ts       # Velite schema and content pipeline config
```
