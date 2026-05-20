# Design Guidelines — Shounak Portfolio

## 1. Design Philosophy

**Terminal/Hacker Aesthetic** — The entire UI is modeled after a modern terminal emulator. Glassmorphic cards, monospace typography, command-line metaphors (`>`, `$`, `//`), and real-time data visualization create the feel of a developer's dashboard.

**Dark-Only Theme** — No light mode. The palette is built around deep black (`#0a0a0a`) with emerald green as the dominant accent.

---

## 2. Color System

### 2.1 Surface Hierarchy

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#0a0a0a` | Page background, canvas |
| `--color-surface-container-lowest` | `#0e0e0e` | Deepest surface |
| `--color-surface-dim` | `#131313` | Dim surface variant |
| `--color-surface` | `#131313` | Default surface |
| `--color-surface-container-low` | `#1b1b1b` | Card backgrounds |
| `--color-surface-container` | `#1f1f1f` | Elevated surfaces |
| `--color-surface-container-high` | `#2a2a2a` | Interactive elements |
| `--color-surface-container-highest` | `#353535` | Highest surface |
| `--color-surface-bright` | `#393939` | Bright surface |

### 2.2 Accent Colors

| Token | Hex | Role |
|-------|-----|------|
| `--color-primary` | `#d0bcff` | Purple — primary brand, card glows |
| `--color-on-primary` | `#3c0091` | Text on primary |
| `--color-primary-container` | `#a078ff` | Deeper purple |
| `--color-secondary` | `#e9c349` | Gold — variant highlights, active states |
| `--color-secondary-container` | `#af8d11` | Deeper gold |
| `--color-tertiary` | `#d3bbff` | Light purple — tertiary accent |
| `--color-error` | `#ffb4ab` | Error/destructive |

### 2.3 Emerald Accent (Dominant Terminal Color)

Emerald green (`#34d399` / `#10b981`) is the **primary terminal accent** — not defined as a token but used pervasively:

| Usage | Color |
|-------|-------|
| Terminal prompts (`>`, `$`, `//`) | `text-emerald-400` (#34d399) |
| Code syntax | `text-emerald-300` |
| Cursor, active indicators | `bg-emerald-400` |
| Glow shadows | `shadow-[0_0_6px_rgba(52,211,153,0.6)]` |
| Scrollbar thumb | `rgba(52, 211, 153, 0.3)` |
| Progress bar fill | Gradient from `emerald-500/60` to `emerald-400/80` |

### 2.4 Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-on-surface` | `#e2e2e2` | Primary text |
| `--color-on-surface-variant` | `#cbc3d7` | Secondary/muted text |
| `--color-outline` | `#958ea0` | Borders, dividers |
| `--color-outline-variant` | `#494454` | Subtle borders |

### 2.5 Category Colors (Skills & Charts)

| Category | Text | Border | Bar Gradient |
|----------|------|--------|--------------|
| Frontend | `text-amber-400` | `border-amber-500/30` | `from-amber-500/60 to-amber-400/80` |
| Backend | `text-cyan-400` | `border-cyan-500/30` | `from-cyan-500/60 to-cyan-400/80` |
| DevOps | `text-purple-400` | `border-purple-500/30` | `from-purple-500/60 to-purple-400/80` |
| Security | `text-rose-400` | `border-rose-500/30` | `from-rose-500/60 to-rose-400/80` |
| AI | `text-emerald-400` | `border-emerald-500/30` | `from-emerald-500/60 to-emerald-400/80` |

---

## 3. Typography

### 3.1 Font Stack

| Font | Weight | Variable | Usage |
|------|--------|----------|-------|
| **Inter** | 400–700 | `--font-inter` | Body text |
| **Sora** | 600, 700, 800 | `--font-sora` | Display/heading text |
| **Monospace** | browser default | `font-mono` | Terminal UI, code, all component content |

### 3.2 Type Scale

| Name | Size | Font Family | Usage |
|------|------|-------------|-------|
| Display XL | `text-[42px]` / `text-[28px]` (mobile) | Sora (font-display-lg) | Hero headings |
| Display LG | `text-[32px]` | Sora | Section headings |
| Heading 1 | `text-4xl` / `text-5xl` | Sora | Blog post titles |
| Heading 2 | `text-2xl` | Sora + `#` prefix | Blog post section headers |
| Heading 3 | `text-lg` | Inter (bold) | Blog subsection headers |
| Body MD | `text-[16px]` | Inter | Intro paragraph |
| Body SM | `text-sm` / `text-[13px]` | Inter | Descriptions |
| Terminal MD | `text-[12px]` | monospace | Card content |
| Terminal SM | `text-[10px]` / `text-[11px]` | monospace | Labels, metadata, headers |
| Terminal XS | `text-[8px]` / `text-[9px]` | monospace | Tiny labels, badges, timestamps |

### 3.3 Terminal Text Patterns

| Pattern | Example | Style |
|---------|---------|-------|
| Prompt | `> command` | `text-emerald-400` bold |
| Dollar prompt | `$ command` | `text-emerald-400` bold |
| Comment | `// comment` | `text-emerald-500/60` or `color/30-60` |
| Hash ID | `a1b2c3d` | `text-emerald-500/50`, monospace |
| Bracket | `[label]` | Category name in `label-color/60` |
| Count | `[1/3]` | Right-aligned, `text-white/20` |

---

## 4. Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-bento-gap` | `1.5rem` (24px) | Gap between bento grid items |
| `--spacing-margin-mobile` | `1rem` (16px) | Page margins on mobile |
| `--spacing-margin-desktop` | `2rem` (32px) | Page margins on desktop |
| Card padding | `p-4` (16px), `p-5` (20px), `p-6` (24px) | TerminalCard content padding |
| Card header | `px-4 py-2` | TerminalCard header |
| Section gap | `gap-1.5` (6px) to `gap-6` (24px) | Flex/grid gaps |
| Sidebar width | `220px` | Table of contents |

---

## 5. Glassmorphism & Shadows

### 5.1 TerminalCard Glassmorphism

```css
.terminal-card {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(208, 188, 255, 0.1);
  box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.5);
}
```

### 5.2 Glow Border Variants

| Variant | Border Color |
|---------|--------------|
| Primary (purple) | `1px solid rgba(208, 188, 255, 0.2)` |
| Secondary (gold) | `1px solid rgba(233, 195, 73, 0.2)` |

### 5.3 Shadow System

| Layer | Shadow |
|-------|--------|
| Card | `0 4px 24px -1px rgba(0, 0, 0, 0.5)` |
| Terminal prompt glow | `0 0 6px rgba(52, 211, 153, 0.6)` |
| Button hover | Tailwind `shadow-md` / lift effect |

---

## 6. Animation System

### 6.1 CSS Keyframes

| Name | Duration | Purpose |
|------|----------|---------|
| `blink` | 1s step-end infinite | Text cursor blink |
| `jump-once` | 0.4s ease-out | Profile photo bounce on click |
| `vertical-progress` | 5s linear infinite | Vertical progress bar animation |

### 6.2 Interactive Effects

| Effect | Implementation | Trigger |
|--------|---------------|---------|
| **Mouse spotlight** | `--mouse-x` / `--mouse-y` CSS vars → radial gradient | Mouse move on card |
| **Header shine** | `--header-mouse-x` → radial gradient on `::after` | Mouse move |
| **Traffic light dots** | `bg-white/10` → `red/yellow/green` on `group-hover` | Card hover |
| **Row highlight** | `hover:bg-white/[0.02]` transition | Row hover |
| **Text saturation** | `opacity-30` → `opacity-100` on `group-hover` | Card header text |
| **Chevron rotation** | `rotate-90` transition on expand | Accordion toggle |
| **Progress bar glow** | `opacity-60` → `opacity-100` on `group-hover/skill` | Skill row hover |

---

## 7. Iconography

- **Library**: Google Material Symbols Outlined
- **CDN**: `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1`
- **Class**: `material-symbols-outlined`
- **Default weight**: 300, opsz 20, FILL 0
- **Sizes used**: `text-[9px]`, `text-[10px]`, `text-[12px]`, `text-[14px]`

---

## 8. Component Architecture Patterns

### 8.1 File Conventions
- Files: `kebab-case.tsx`
- Components: PascalCase named exports
- Props: `interface ComponentNameProps` at top of file
- Client components: `'use client'` directive at top
- Server components: No directive (default)

### 8.2 Styling Rules
- Tailwind utility classes exclusively
- `cn()` from `@/lib/utils` for conditional class merging
- Custom CSS only in `app/globals.css` for complex effects (glassmorphism, animations)
- No CSS modules, no styled-components, no SCSS

### 8.3 Card Wrapper Pattern
Every content section is wrapped in `<TerminalCard>`:
```tsx
<TerminalCard title="SectionName.sh" icon="icon_name" variant="primary|secondary">
  <div className="font-mono text-[12px] p-4">
    {/* Terminal-prompted content */}
  </div>
</TerminalCard>
```

---

## 9. Layout Grid

- **Bento grid**: 12-column CSS grid (`grid grid-cols-1 md:grid-cols-12 gap-6`)
- **Page width**: `max-w-[900px]` (blog list), `max-w-[1100px]` (blog post), `max-w-[1600px]` (home)
- **Content below header**: `pt-20`, `pt-24`
- **Header height**: `h-9` (36px)

---

## 10. Scrollbar

```css
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
}
::-webkit-scrollbar-thumb {
  background: rgba(52, 211, 153, 0.3);
  border-radius: 4px;
}
```
