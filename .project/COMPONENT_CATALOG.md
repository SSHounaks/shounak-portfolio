# Component Catalog — Shounak Portfolio

## Legend

| Prefix | Type |
|--------|------|
| **[Layout]** | Structural/page-level components |
| **[Display]** | Data presentation components |
| **[Navigation]** | Navigation & wayfinding |
| **[Feedback]** | User feedback & progress |
| **[Chart]** | Data visualization |
| **[MDX]** | Blog/MDX content components |
| **[UI]** | Generic shadcn/ui primitives |

---

## Layout Components

### TerminalCard — Core Wrapper

| Field | Details |
|-------|---------|
| **Path** | `components/terminal-card.tsx` |
| **Type** | `'use client'` |
| **Props** | `{ children: ReactNode, title?: string, icon?: string, variant?: 'primary' | 'secondary', className?: string }` |
| **Variants** | `primary` — purple glow (`#d0bcff`), `secondary` — gold glow (`#e9c349`) |
| **States** | Default → Hover (traffic light dots colorize, header text saturates, mouse spotlight activates) |
| **Features** | Glassmorphism background, mouse-following spotlight radial gradient, header shine effect, macOS traffic light dots, backdrop blur |

### BackgroundCanvas — Interactive Background

| Field | Details |
|-------|---------|
| **Path** | `components/background-canvas.tsx` |
| **Type** | `'use client'` |
| **Props** | None |
| **Behavior** | Fixed canvas with dot grid pattern, mouse parallax effect |
| **Z-index** | `-1` (behind all content) |

### Header — Top Navigation

| Field | Details |
|-------|---------|
| **Path** | `components/header.tsx` |
| **Type** | `'use client'` |
| **Props** | None |
| **Features** | Fixed position, breadcrumb trail, terminal-style indicators |

### Footer — Page Footer

| Field | Details |
|-------|---------|
| **Path** | `components/footer.tsx` |
| **Type** | Component |
| **Props** | None |
| **Content** | Social links, copyright |

### PageTransition — Fade-in Wrapper

| Field | Details |
|-------|---------|
| **Path** | `components/page-transition.tsx` |
| **Type** | `'use client'` |
| **Props** | `{ children: ReactNode }` |
| **Behavior** | Wraps page content with fade-in animation on mount |

---

## Display Components

### ProfileCard — Identity Card

| Field | Details |
|-------|---------|
| **Path** | `components/profile-card.tsx` |
| **Type** | `'use client'` |
| **Props** | None (self-contained data) |
| **Features** | Avatar image (jump animation on click), name/title, status indicator (pulsing green dot), focus/location metadata, resume download button |
| **States** | Default → Hover (image desaturates→colorizes, jump animation) |

### IntroSection — Hero Section

| Field | Details |
|-------|---------|
| **Path** | `components/intro-section.tsx` |
| **Type** | `'use client'` |
| **Props** | None |
| **Features** | Animated SVG architecture diagram, headline with italic purple accent, subtitle with gold highlight |
| **States** | Hover (SVG opacity increases from 0.13 to 0.50) |

### ExperienceSection — Work History

| Field | Details |
|-------|---------|
| **Path** | `components/experience-section.tsx` |
| **Type** | `'use client'` |
| **Props** | None (self-contained data) |
| **Variants** | Current job (gold secondary styling) vs past jobs (emerald styling) |
| **States** | Collapsed → Expanded (accordion open/close, chevron rotates 90deg, detail rows reveal) |
| **Features** | Hash IDs for each highlight, `ACTIVE` badge on current position, stack chip |

### SkillsSection — Progress Bars

| Field | Details |
|-------|---------|
| **Path** | `components/skills-section.tsx` |
| **Type** | `'use client'` |
| **Props** | None (self-contained data) |
| **Categories** | frontend (amber), backend (cyan), devops (purple), security (rose), ai (emerald) |
| **States** | Default → Row hover (bar opacity increases, text brightens) |
| **Features** | Terminal prompts per skill, percentage numbers, gradient progress bars |

### ProjectsSection — Open Source & Education

| Field | Details |
|-------|---------|
| **Path** | `components/projects-section.tsx` |
| **Type** | `'use client'` |
| **Props** | None (self-contained data) |
| **Sections** | Open Source (primary variant) + Education (secondary variant) |
| **States** | Collapsed → Expanded (details reveal tech stack, repo link, description) |

### TestimonialsSection — LinkedIn Carousel

| Field | Details |
|-------|---------|
| **Path** | `components/testimonials-section.tsx` |
| **Type** | `'use client'` |
| **Props** | None (self-contained data) |
| **Behavior** | Carousel/slider of LinkedIn testimonials |

### ContactSection — Contact Card

| Field | Details |
|-------|---------|
| **Path** | `components/contact-section.tsx` |
| **Type** | `'use client'` |
| **Props** | None |

### GitHubSnake — Canvas Game

| Field | Details |
|-------|---------|
| **Path** | `components/github-snake.tsx` |
| **Type** | `'use client'` |
| **Props** | None |
| **Behavior** | Canvas-based snake game |

---

## Navigation Components

### Breadcrumbs — Dynamic Breadcrumb Trail

| Field | Details |
|-------|---------|
| **Path** | `components/breadcrumbs.tsx` |
| **Type** | `'use client'` |
| **Props** | Dynamic breadcrumbs with hash-based color generation |

### TableOfContents — Sticky ToC

| Field | Details |
|-------|---------|
| **Path** | `components/table-of-contents.tsx` |
| **Type** | `'use client'` |
| **Props** | `{ headings: TocEntry[] }` |
| **Features** | Sticky sidebar, IntersectionObserver for active heading tracking |

### ReadingProgress — Scroll Indicator

| Field | Details |
|-------|---------|
| **Path** | `components/reading-progress.tsx` |
| **Type** | `'use client'` |
| **Props** | None |
| **Behavior** | Fixed top bar showing scroll percentage |

---

## Feedback Components

### CodeCopyBtn — Code Block Copy

| Field | Details |
|-------|---------|
| **Path** | `components/code-copy-btn.tsx` |
| **Type** | `'use client'` |
| **Props** | `{ children: ReactNode }` |
| **Behavior** | Wraps code blocks, adds copy-to-clipboard button |

### CollapsibleSummary — Blog Post Summary

| Field | Details |
|-------|---------|
| **Path** | `components/collapsible-summary.tsx` |
| **Type** | `'use client'` |
| **Props** | `{ title: string, children: ReactNode }` |
| **Behavior** | `<details>` / `<summary>` patterned collapsible |

### ThemeProvider — next-themes Wrapper

| Field | Details |
|-------|---------|
| **Path** | `components/theme-provider.tsx` |
| **Type** | `'use client'` |
| **Props** | Standard next-themes ThemeProvider props |

---

## Chart Components (from `/test` page)

### Sparkline

| Field | Details |
|-------|---------|
| **Path** | `app/test/page.tsx` (inline) |
| **Type** | SVG component |
| **Props** | `{ data: number[], color: string }` |
| **Behavior** | SVG polyline sparkline with dot markers |

### ASCII Bar Chart

| Field | Details |
|-------|---------|
| **Path** | `app/test/page.tsx` (inline) |
| **Type** | Component |
| **Props** | None (self-contained data) |
| **Features** | Block character bars with percentage labels |

### Circular Gauge

| Field | Details |
|-------|---------|
| **Path** | `app/test/page.tsx` (inline) |
| **Type** | SVG component |
| **Props** | `{ value: number, label: string, color: string }` |
| **Features** | SVG arc gauge with value and label |

### Network Activity

| Field | Details |
|-------|---------|
| **Path** | `app/test/page.tsx` (inline) |
| **Type** | `'use client'` |
| **Behavior** | Animated node activity visualization |

### Matrix Rain

| Field | Details |
|-------|---------|
| **Path** | `app/test/page.tsx` (inline) |
| **Type** | `'use client'` |
| **Behavior** | Canvas-based matrix code rain effect |

### Typewriter Effect

| Field | Details |
|-------|---------|
| **Path** | `app/test/page.tsx` (inline) |
| **Type** | `'use client'` |
| **Behavior** | Character-by-character text reveal |

### Glitch Text

| Field | Details |
|-------|---------|
| **Path** | `app/test/page.tsx` (inline) |
| **Type** | `'use client'` |
| **Behavior** | CSS-based text glitch/distortion effect |

---

## MDX Content Components (Planned)

These will be created during Phase 2 once the MDX runtime swap is complete.

### Callout (Note / Warn / Info / Error)

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/callout.tsx` |
| **Base** | shadcn/ui Alert (modified for terminal aesthetic) |
| **Variants** | `note` (emerald), `info` (blue/cyan), `warn` (amber), `error` (red) |
| **Props** | `{ type: 'note' | 'info' | 'warn' | 'error', title?: string, children: ReactNode }` |
| **MDX Syntax** | `<Callout type="info" title="Key Insight">...</Callout>` |

### IconButton

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/icon-button.tsx` |
| **Base** | shadcn/ui Button (extended) |
| **Props** | `{ icon: string, variant?, size?, children?: ReactNode }` |
| **Features** | Material Symbol icon support, all shadcn button variants + terminal-specific styles |

### Banner

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/banner.tsx` |
| **Base** | shadcn/ui Alert (extended) |
| **Variants** | `info`, `success`, `warning`, `danger` |
| **Props** | `{ type, title, action?: { label, href } }` |

### HoverCard

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/hover-card.tsx` |
| **Base** | shadcn/ui HoverCard |
| **MDX Syntax** | `<HoverCard trigger="hover me">Content revealed on hover</HoverCard>` |

### Popup (Dialog/Popover)

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/popup.tsx` |
| **Base** | shadcn/ui Dialog or Popover |
| **Props** | `{ trigger, title?, children, variant?: 'dialog' | 'popover' }` |

### Grid (2-Column / 3-Column)

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/grid.tsx` |
| **Base** | shadcn/ui Card (modified) |
| **Props** | `{ cols: 2 | 3, children: ReactNode }` |
| **MDX Syntax** | `<Grid cols={2}><div>Col 1</div><div>Col 2</div></Grid>` |

### ColorPalette

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/color-palette.tsx` |
| **Base** | shadcn/ui Badge (modified) |
| **Props** | `{ colors: { name: string, hex: string }[] }` |
| **Features** | Swatch grid with hex values and token names |

### Table (Terminal-Styled)

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/table.tsx` |
| **Base** | shadcn/ui Table (modified) |
| **Props** | `{ headers: string[], rows: string[][], striped?: boolean }` |
| **Features** | Terminal border style, optional row striping |

### TreeTable

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/tree-table.tsx` |
| **Base** | shadcn/ui Table (extended) |
| **Props** | `{ data: TreeNode[], indentChar?: string }` |
| **Features** | Hierarchical rows with `├─` `└─` connectors, collapsible levels |

### Tooltip

| Field | Details |
|-------|---------|
| **Path** | `components/mdx/tooltip.tsx` |
| **Base** | shadcn/ui Tooltip |
| **MDX Syntax** | `<Tooltip label="Explanation">text</Tooltip>` |

---

## UI Primitives (shadcn/ui — New York, Neutral)

All located in `components/ui/`. These are the base building blocks, many will be adapted for MDX components.

| Component | File | Key Feature |
|-----------|------|-------------|
| Button | `components/ui/button.tsx` | 6 variants × 6 sizes, asChild support |
| Badge | `components/ui/badge.tsx` | 4 variants, asChild support |
| Card | `components/ui/card.tsx` | 7 sub-components, container queries |
| Alert | `components/ui/alert.tsx` | 2 variants, icon slot |
| Table | `components/ui/table.tsx` | 8 sub-components, overflow wrapper |
| Dialog | `components/ui/dialog.tsx` | 10 sub-components, showCloseButton |
| HoverCard | `components/ui/hover-card.tsx` | Radix-based, 3 sub-components |
| Popover | `components/ui/popover.tsx` | 4 sub-components, PopoverAnchor |
| Tooltip | `components/ui/tooltip.tsx` | Arrow support, delayDuration=0 |
| Tabs | `components/ui/tabs.tsx` | 3 sub-components, Radix-based |
| Separator | `components/ui/separator.tsx` | Horizontal + vertical |
| ScrollArea | `components/ui/scroll-area.tsx` | Custom scrollbar styling |
| Toggle | `components/ui/toggle.tsx` | 2 variants × 3 sizes |
| ToggleGroup | `components/ui/toggle-group.tsx` | Context-propagation variant/size |
