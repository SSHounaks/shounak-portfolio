# Roadmap — Phase 5: Discovery & Polish

## Theme
SEO, search, and engagement features to make the portfolio discoverable and navigable.

## Legend
- `[ ]` — Pending
- `[~]` — In Progress
- `[x]` — Complete

---

## Phase 5.1 — SEO Foundation ✅

Goal: every page and blog post has rich social previews and is discoverable by search engines.

### 5.1.1 — Open Graph & Twitter Card metadata ✅

- [x] Create `lib/metadata.ts` — shared helper to generate `openGraph` + `twitter` metadata objects per page
  - Default image (1200×630, centered name + tagline overlay on dark gradient)
  - Per-post: title, description, slug-based URL
- [x] Update `app/layout.tsx` — add default `openGraph` + `twitter` metadata export
- [x] Update `app/blog/[slug]/page.tsx` — dynamic OG metadata per post
- [ ] Add `app/opengraph-image.tsx` — dynamic OG image using `ImageResponse` (Next.js built-in)
  - Renders: post title, date vertical stack, tag pill, "shounak.me" brand
  - Falls back to a default portfolio OG image

### 5.1.2 — Sitemap & robots ✅

- [x] Create `app/sitemap.ts` — dynamic sitemap: all pages + non-hidden blog posts with lastmod dates
- [x] Create `app/robots.ts` — allow all, reference sitemap

### 5.1.3 — JSON-LD structured data ✅

- [x] Create `components/json-ld.tsx` — `<script type="application/ld+json">` wrapper component
- [x] Add `Person` schema to `app/layout.tsx` — name, job title, `sameAs` (GitHub/LinkedIn), resume URL
- [x] Add `BlogPosting` schema to `app/blog/[slug]/page.tsx` — headline, datePublished, author, description

---

## Phase 5.3 — Contact & Social ✅

Goal: make it easy for recruiters to reach out and follow.

### 5.3.1 — Functional social links ✅

- [x] Replace `#` hrefs in footer with real URLs:
  - Email: `mailto:shounakbhalerao777@gmail.com`
  - GitHub: `https://github.com/Shounaks`
  - LinkedIn: `https://linkedin.com/in/shounak-bhalerao`

---

## Future Items

### Phase 5.2 — Search & Navigation

Goal: visitors can instantly find content across 7+ blog posts and 30+ components.

- [ ] Create `components/command-palette.tsx` — `Cmd+K` / `Ctrl+K` palette using `cmdk`
- [ ] Create `hooks/use-search-data.ts` — pre-bundles search index at build time
- [ ] Register keyboard shortcut hint in footer or a small badge

### Phase 5.3.2 — Contact form (optional enhancement)

- [ ] Add inline form to `ContactSection`: name, email, message
  - Uses `react-hook-form` + `zod` (✅ already installed)
- [ ] Optionally add `app/api/contact/route.ts` for serverless handling

### Phase 5.4 — RSS Feed

- [ ] Create `app/feed.xml/route.ts` — generates RSS 2.0 XML from the `posts` content collection
- [ ] Add `<link rel="alternate" type="application/rss+xml">` to root layout
- [ ] Add RSS icon/link to blog listing page

### Phase 5.5 — Polish

- [ ] Responsive check — blog posts + components page on mobile/tablet/desktop
- [ ] Animation/interaction check — hover effects, transitions, spotlights
- [ ] Add `aria-label` to all icon-only buttons (nav links, TOC toggle, copy button)
- [ ] Create default OG image placeholder (`/og-default.png`)
- [ ] Create dynamic OG image via `app/opengraph-image.tsx`
- [ ] Enable Next.js image optimization — remove `images.unoptimized: true` from `next.config.mjs`
- [ ] Lazy-load heavy components in `/components` page via `next/dynamic` (TerminalChat, MatrixRain)

---

## Dependencies

| Package | Status |
|---------|--------|
| `cmdk` | ✅ already in `package.json` |
| `react-hook-form` + `zod` | ✅ already in `package.json` |
| `ImageResponse` | ✅ built into Next.js 16 |
| **New packages required** | **none** |
