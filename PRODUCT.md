# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences use this site, and the owner confirmed all of them matter equally:

- **Hiring managers and recruiters** scanning quickly for credible depth signals before advancing a candidate.
- **Peer engineers** who arrive for the technical writing and projects, read deeply, and judge technical honesty.
- **Freelance or contract clients** looking for proof of delivery and a way to start a conversation.
- **The owner himself**, using the site as a public learning log and personal record.

The job shared by all four is comprehension: form an accurate, undistorted picture of who he is and how he thinks.

## Product Purpose

A single honest surface that communicates background, systems thinking, and current direction. Success is a visitor leaving with an accurate impression — the confirmed primary outcome is "get the shape of me", explicitly with no ask attached. The site is not organised around a conversion goal.

## Positioning

The claim to own is **"I think in systems and explain them."** The writing is the proof: a neighbouring portfolio cannot truthfully copy the specific combination of production security and platform experience, explained clearly in public, by the person who did the work.

The site's own description line is "Full Stack Developer & Cybersecurity Expert — 5.5 years designing and shipping production-grade systems at scale."

## Operating Context

- Runtime is **Deno** via the npm compatibility layer (`deno run -A npm:next`); `deno.json` defines `dev`, `build`, `start`.
- **Velite** watches `content/` and compiles MDX into typed content on both dev and build.
- Dev server runs on `localhost:3000`. A second concurrent `next dev` refuses to start rather than taking the port.
- Public URL is `https://shounaks.netlify.app` (recorded in `lib/metadata.ts`); no deploy config is committed to the repo, so the pipeline itself is unconfirmed.
- Blog is authored as MDX in `content/blog/`; data lives in typed modules under `lib/`.

## Capabilities and Constraints

- Routes: `/`, `/blog`, `/blog/[slug]`, `/bookshelf`, `/projects`, `/quests`, `/news`, `/components`.
- **Dark-only by decision.** `.dark` is hardcoded on `<html>` with `colorScheme: 'dark'`; there is no light mode and no theme toggle. Preserve this.
- The hardcoded `.dark` class is load-bearing: a large set of dark-variant utilities depend on it. Removing it from `<html>` silently breaks them.
- Tailwind's `--radius-sm/md/lg/xl` scale must not be overridden (113 existing usages would shift); only `--radius` is customised.
- The shadcn primitive library under `components/ui/` is large and largely unmounted; it is retained deliberately as available surface, not as active product.
- Licence: **GPL-2.0** (`LICENSE`).
- Undecided: no accessibility target or conformance level has been recorded. Very small type sizes (9–10px) are in active use and have not been evaluated against any standard.

## Brand Commitments

- Name: **Shounak Bhalerao**. Site title: "Shounak Bhalerao | Portfolio".
- The **terminal / hacker identity is binding** and was never proposed for replacement. The `//` prefix is intentional rendered text, not a comment: `/components` explicitly documents "double slash — comment" as a design element. Preserve it verbatim.
- Typography: Sora (headings), Inter (body), JetBrains Mono (terminal and monospace). Icons: Material Symbols Outlined.
- Voice: lowercase terminal speech, `>` prompts, `//` section markers, `SYSLOG`/version stamps.
- Social and OG image: `/am_blueprint.png`.

## Evidence on Hand

- **10 named LinkedIn testimonials** with real employers, in `components/testimonials-section.tsx` (Atlassian ×2, Nagarro, SAP Labs, CTS, Capgemini, and others).
- **13 MDX blog posts** in `content/blog/`, dated 2024-09-05 through 2026-07-15, on distributed systems, cell-based architecture, observability, rate limiting, Rust, and Next.js performance.
- **6 projects** in `lib/projects.ts`, each with a real repository link, including `SSHounaks/wallpapi` published on extensions.gnome.org and `SSHounaks/awsome`.
- **10 bookshelf entries** in `lib/bookshelf.ts` with four statuses (`READ`, `READING`, `PLANNED`, `RECOMMENDED`).
- A **quest system** (`data/quests.json`) with active and completed quests, milestones, daily tasks, and streaks.
- Résumé data sourced from a PDF.
- **Absences that future work must not fabricate:** no traffic or conversion analytics, no client list, no performance or cost benchmarks, and no testimonials beyond the 10 named and attributed ones.
- Known doc drift: `README.md` points to a component showcase at `/test`; the actual route is `/components`.

## Product Principles

1. **Comprehension over conversion.** The win is an accurate impression, not an ask. Do not restructure the site around a CTA.
2. **The writing is the proof.** Claims are made by showing reasoning, not by stacking adjectives about skill.
3. **One honest surface serves every audience.** No separate "recruiter version" or audience-gated content.
4. **Link the artifact, not the adjective.** Repos, posts, and named work carry more weight than self-description.
5. **Never fabricate.** Named people, real repositories, verifiable outcomes only. An honest gap beats an invented detail.
