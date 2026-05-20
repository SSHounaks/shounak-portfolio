# Shounak Bhalerao — Portfolio

A terminal-inspired bento-grid portfolio built with **Next.js 16**, **MDX via Velite**, and a hacker-ui component showcase.

## Stack

- **Runtime:** Deno (npm compatibility layer via `deno run -A npm:next`)
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Content:** Velite (MDX → typed content)
- **Styling:** Tailwind CSS, custom CSS animations
- **Fonts:** Inter, Sora, JetBrains Mono, Material Symbols
- **Icons:** Google Material Symbols Outlined

## Features

- Terminal-themed bento grid layout with mouse spotlight effects
- Animated architecture diagram (API Gateway → Backend → Observability)
- MDX blog with syntax highlighting, code copy buttons, ToC, & reading progress
- Dynamic breadcrumbs with hash-based color palette
- Component showcase at `/test` (sparklines, gauges, matrix rain, etc.)
- Resume data sourced from PDF, 10 LinkedIn testimonials
- Responsive design with dark theme

## Getting Started

```bash
deno install npm:next npm:next-mdx-remote
deno run -A npm:next dev        # dev server at localhost:3000
deno run -A npm:next build      # production build
deno run -A npm:next start      # serve production build
```

## License

GNU General Public License v2.0 — see [LICENSE](./LICENSE).
