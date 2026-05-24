'use client';

import { useState } from 'react';
import { TerminalCard } from '@/components/terminal-card';
import { PageTransition } from '@/components/page-transition';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Callout } from '@/components/mdx/callout';
import { IconButton } from '@/components/mdx/icon-button';
import { Banner } from '@/components/mdx/banner';
import { HoverCard } from '@/components/mdx/hover-card';
import { Tip } from '@/components/mdx/tip';
import { Quote } from '@/components/mdx/quote';
import { Popup } from '@/components/mdx/popup';
import { Grid, GridItem } from '@/components/mdx/grid';
import { ColorPalette } from '@/components/mdx/color-palette';
import { Table } from '@/components/mdx/table';
import { TreeTable } from '@/components/mdx/tree-table';
import { Tooltip } from '@/components/mdx/tooltip';
import { StatusPill } from '@/components/mdx/status-pill';
import { TableCSV } from '@/components/mdx/table-csv';
import { Sparkline } from '@/components/charts/sparkline';
import { AsciiBarChart } from '@/components/charts/ascii-bar-chart';
import { CircularGauge } from '@/components/charts/circular-gauge';
import { FrequencyBars } from '@/components/charts/frequency-bars';
import { NetworkActivity } from '@/components/charts/network-activity';
import { MatrixRain } from '@/components/effects/matrix-rain';
import { TypewriterText } from '@/components/effects/typewriter-text';
import { GlitchText } from '@/components/effects/glitch-text';
import { TerminalChat } from '@/components/demos/terminal-chat';
import { TerminalTable } from '@/components/demos/terminal-table';
import { ChangelogView } from '@/components/demos/changelog-view';
import { CodeDiffView } from '@/components/demos/code-diff-view';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'layout', label: 'Layout', icon: 'grid_view' },
  { id: 'data-display', label: 'Data Display', icon: 'bar_chart' },
  { id: 'navigation', label: 'Navigation', icon: 'explore' },
  { id: 'feedback', label: 'Feedback', icon: 'feedback' },
  { id: 'mdx-content', label: 'MDX Content', icon: 'code' },
  { id: 'typography', label: 'Typography', icon: 'text_fields' },
  { id: 'charts', label: 'Charts', icon: 'monitoring' },
  { id: 'effects', label: 'Effects' },
  { id: 'demos', label: 'Interactive', icon: 'play_circle' },
];

const codeStyles = 'bg-zinc-900/50 border border-zinc-800 rounded p-3 text-[11px] font-mono text-zinc-400 overflow-x-auto';

function Code({ children }: { children: string }) {
  return (
    <div className={codeStyles}>
      <div className="flex items-center gap-2 mb-2 text-[9px] text-zinc-600 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        <span>example.usage</span>
      </div>
      <pre>{children}</pre>
    </div>
  );
}

function PropTable({ props }: { props: { name: string; type: string; default?: string; description: string }[] }) {
  return (
    <div className="font-mono text-[11px] my-4 border border-zinc-800 rounded overflow-hidden">
      <div className="bg-zinc-900/50 px-3 py-1.5 text-[9px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
        Props
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-zinc-800/50 text-[9px] text-zinc-500 uppercase tracking-wider">
            <th className="px-3 py-1.5">Name</th>
            <th className="px-3 py-1.5">Type</th>
            <th className="px-3 py-1.5">Default</th>
            <th className="px-3 py-1.5">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-b border-zinc-800/20 text-zinc-300">
              <td className="px-3 py-1.5 text-emerald-400">{p.name}</td>
              <td className="px-3 py-1.5 text-amber-400/80">{p.type}</td>
              <td className="px-3 py-1.5 text-zinc-500">{p.default || '—'}</td>
              <td className="px-3 py-1.5 text-zinc-400">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = useState('layout');

  return (
    <>
      <Header />
      <PageTransition>
        <div className="min-h-screen bg-background flex pt-20">
          {/* Sticky Sidebar */}
          <nav className="hidden lg:block w-[200px] flex-shrink-0 fixed left-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r border-zinc-900 p-4">
            <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono mb-4 px-2">
              // COMPONENTS
            </div>
            <div className="space-y-1">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  className={cn(
                    'flex items-center gap-2 px-2 py-1.5 rounded text-[11px] font-mono transition-colors',
                    activeSection === sec.id
                      ? 'text-emerald-400 bg-emerald-500/[0.05]'
                      : 'text-zinc-500 hover:text-zinc-300',
                  )}
                >
                  {sec.icon && <span className="material-symbols-outlined text-[12px]">{sec.icon}</span>}
                  {sec.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-[1000px] mx-auto p-6 md:p-10 lg:ml-[220px]">
            <header className="mb-12">
              <div className="font-mono text-[10px] text-emerald-500/60 mb-2">// DOCS v1.0</div>
              <h1 className="font-display-lg text-[32px] md:text-[42px] text-white font-bold mb-2">
                <span className="text-emerald-400">Component Library</span>
              </h1>
              <p className="font-mono text-[13px] text-zinc-500 max-w-2xl">
                Design system components, MDX content blocks, and UI primitives.
                Each entry includes props, variants, and live usage examples.
              </p>
            </header>

            {/* ── Layout ── */}
            <section id="layout" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('layout')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">grid_view</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">Layout</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                TerminalCard
                <span className="text-[9px] text-zinc-600 font-mono">— Core wrapper component</span>
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                The foundational building block. A glassmorphic card with macOS-style traffic light dots,
                mouse-following spotlight effect, header shine, and glow borders. Every section wraps in this.
              </p>
              <PropTable props={[
                { name: 'children', type: 'ReactNode', description: 'Card content' },
                { name: 'title', type: 'string', description: 'Header label text' },
                { name: 'icon', type: 'string', default: '—', description: 'Material Symbol icon name' },
                { name: 'variant', type: "'primary' | 'secondary'", default: 'primary', description: 'Purple glow (primary) or gold glow (secondary)' },
                { name: 'className', type: 'string', default: '—', description: 'Additional Tailwind classes' },
              ]} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TerminalCard title="Primary Variant" icon="terminal" variant="primary">
                  <div className="p-4 font-mono text-[12px] text-zinc-400">
                    <span className="text-emerald-400">&gt;</span> Default purple-accented card
                  </div>
                </TerminalCard>
                <TerminalCard title="Secondary Variant" icon="history_edu" variant="secondary">
                  <div className="p-4 font-mono text-[12px] text-zinc-400">
                    <span className="text-emerald-400">&gt;</span> Gold-accented for emphasis
                  </div>
                </TerminalCard>
              </div>
              <Code>{`<TerminalCard title="Section.sh" icon="terminal" variant="primary">
  <div className="p-4 font-mono text-[12px]">
    Content here
  </div>
</TerminalCard>`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                BackgroundCanvas
                <span className="text-[9px] text-zinc-600 font-mono">— Interactive dot grid background</span>
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Fixed canvas with mouse-parallax dot grid. Renders behind all content at z-index -1.
                Self-contained, no props.
              </p>
              <Code>{`<BackgroundCanvas />`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                PageTransition
                <span className="text-[9px] text-zinc-600 font-mono">— Fade-in page wrapper</span>
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Wraps page content with a fade-in animation on mount. Single prop: children.
              </p>
              <Code>{`<PageTransition>
  <YourPageContent />
</PageTransition>`}</Code>
            </section>

            {/* ── Data Display ── */}
            <section id="data-display" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('data-display')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">bar_chart</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">Data Display</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                ProfileCard
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Identity card with avatar (click for jump animation), name, title, status dot,
                metadata grid, and resume download button. Self-contained.
              </p>
              <Code>{`<ProfileCard />`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                IntroSection
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Hero section with animated SVG architecture diagram, headline, and subtitle.
              </p>
              <Code>{`<IntroSection />`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                SkillsSection
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Categorized progress bars with terminal prompts. Categories: frontend (amber),
                backend (cyan), devops (purple), security (rose), ai (emerald).
              </p>
              <Code>{`<SkillsSection />`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                ExperienceSection
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Accordion-style work history with hash IDs, ACTIVE badge, chevron rotation,
                and expandable detail rows including tech stack.
              </p>
              <Code>{`<ExperienceSection />`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                ProjectsSection
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Open-source projects (primary variant) + Education cards (secondary variant).
                Expandable details with tech stack, repo links.
              </p>
              <Code>{`<ProjectsSection />`}</Code>
            </section>

            {/* ── Navigation ── */}
            <section id="navigation" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('navigation')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">explore</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">Navigation</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Breadcrumbs
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Dynamic breadcrumb trail with hash-based color generation for each segment.
              </p>
              <Code>{`<Breadcrumbs />`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                TableOfContents
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Sticky sidebar with IntersectionObserver-based active heading tracking.
                Accepts headings array from Velite TOC.
              </p>
              <Code>{`<TableOfContents headings={post.headings} />`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                ReadingProgress
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Fixed top progress bar indicating scroll position on blog pages.
              </p>
              <Code>{`<ReadingProgress />`}</Code>
            </section>

            {/* ── Feedback ── */}
            <section id="feedback" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('feedback')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">feedback</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">Feedback</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                CodeCopyBtn
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Wraps code blocks and adds a copy-to-clipboard button via event delegation.
                Used in blog posts to enable copying code snippets.
              </p>
              <Code>{`<CodeCopyHandler>
  <MDXRemote source={rawMDX} components={...} />
</CodeCopyHandler>`}</Code>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                CollapsibleSummary
              </h3>
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                <code className="text-emerald-300">{'<details>'}</code> / <code className="text-emerald-300">{'<summary>'}</code> styled collapsible for blog post summaries.
                Accepts title and children.
              </p>
              <Code>{`<CollapsibleSummary title="cat summary.txt">
  <p>Content here</p>
</CollapsibleSummary>`}</Code>
            </section>

            {/* ── MDX Content ── */}
            <section id="mdx-content" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('mdx-content')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">code</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">MDX Content</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>
              <p className="font-mono text-[12px] text-zinc-500 mb-6 leading-relaxed">
                These components are registered in <code className="text-emerald-300">lib/mdx-components.tsx</code> and
                usable directly in blog MDX posts via the <code className="text-emerald-300">next-mdx-remote</code> runtime.
              </p>

              {/* Callout */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Callout
                <span className="text-[9px] text-zinc-600 font-mono">— Note / Info / Warn / Error</span>
              </h3>
              <PropTable props={[
                { name: 'type', type: "'note' | 'info' | 'warn' | 'error'", default: 'note', description: 'Callout variant' },
                { name: 'title', type: 'string', default: '—', description: 'Optional title override' },
                { name: 'list', type: "'ol' | 'ul'", default: '—', description: 'Renders children as ordered/unordered list' },
                { name: 'children', type: 'ReactNode', description: 'Callout body content' },
              ]} />
              <div className="space-y-3 mb-4">
                <Callout type="note" title="TIP">Use this for helpful tips and best practices.</Callout>
                <Callout type="info" title="KEY INSIGHT">Important conceptual information.</Callout>
                <Callout type="warn" title="CAUTION">Potential pitfalls and gotchas.</Callout>
                <Callout type="error" title="CRITICAL">Critical errors and anti-patterns.</Callout>
                <Callout type="info" title="TAKEAWAYS" list="ol">
                  1. Lists render as proper numbered items.
                  2. No need to write HTML tags.
                  3. Strips numbering automatically.
                </Callout>
              </div>
              <Code>{`<Callout type="info" title="Key Insight">
  Important conceptual information.
</Callout>

<Callout type="info" title="Takeaways" list="ol">
  1. First item
  2. Second item
</Callout>`}</Code>

              {/* Banner */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Banner
                <span className="text-[9px] text-zinc-600 font-mono">— Full-width highlight</span>
              </h3>
              <PropTable props={[
                { name: 'type', type: "'info' | 'success' | 'warning' | 'danger'", default: 'info', description: 'Banner variant' },
                { name: 'title', type: 'string', default: '—', description: 'Banner header' },
                { name: 'children', type: 'ReactNode', description: 'Banner body' },
                { name: 'action', type: '{ label: string; href: string }', default: '—', description: 'Optional action link' },
              ]} />
              <div className="space-y-3 mb-4">
                <Banner type="info" title="New Release">Version 2.0 is now available with improved performance.</Banner>
                <Banner type="success" title="Deployed">All services are running and healthy.</Banner>
                <Banner type="warning" title="Deprecation">Legacy API v1 will be sunset on June 1st.</Banner>
                <Banner type="danger" title="Outage">Critical: Database replication lag detected.</Banner>
              </div>
              <Code>{`<Banner type="info" title="Release" action={{ label: "Changelog", href: "#" }}>
  Version 2.0 is now available.
</Banner>`}</Code>

              {/* IconButton */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                IconButton
              </h3>
              <PropTable props={[
                { name: 'icon', type: 'string', description: 'Material Symbol icon name' },
                { name: 'variant', type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: 'default', description: 'Button visual style' },
                { name: 'size', type: "'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'", default: 'default', description: 'Button size' },
                { name: 'children', type: 'ReactNode', default: '—', description: 'Optional label text' },
                { name: 'href', type: 'string', default: '—', description: 'Makes it an anchor link' },
              ]} />
              <div className="flex flex-wrap gap-2 mb-4 items-center">
                <IconButton icon="play_arrow">Run</IconButton>
                <IconButton icon="edit" variant="secondary">Edit</IconButton>
                <IconButton icon="delete" variant="destructive">Delete</IconButton>
                <IconButton icon="download" variant="outline">Download</IconButton>
                <IconButton icon="search" variant="ghost">Search</IconButton>
                <IconButton icon="link" variant="link">Link</IconButton>
                <IconButton icon="settings" variant="outline" size="icon" />
              </div>
              <Code>{`<IconButton icon="play_arrow" variant="default">Run</IconButton>
<IconButton icon="delete" variant="destructive">Delete</IconButton>
<IconButton icon="settings" variant="outline" size="icon" />`}</Code>

              {/* Grid */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Grid / GridItem
                <span className="text-[9px] text-zinc-600 font-mono">— Multi-column layout</span>
              </h3>
              <PropTable props={[
                { name: 'cols', type: '2 | 3', description: 'Number of grid columns' },
                { name: 'children', type: 'ReactNode', description: 'GridItem children' },
              ]} />
              <Grid cols={2}>
                <GridItem title="Column 1" icon="terminal">
                  Content for the first column. This layout is responsive — stacks on mobile.
                </GridItem>
                <GridItem title="Column 2" icon="code">
                  Content for the second column. Use GridItem for individual cells.
                </GridItem>
              </Grid>
              <Code>{`<Grid cols={2}>
  <GridItem title="Left" icon="terminal">
    Left column content
  </GridItem>
  <GridItem title="Right" icon="code">
    Right column content
  </GridItem>
</Grid>`}</Code>

              {/* HoverCard */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                HoverCard
              </h3>
              <PropTable props={[
                { name: 'trigger', type: 'ReactNode', description: 'Hover target element' },
                { name: 'children', type: 'ReactNode', description: 'Card content on hover' },
                { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: 'top', description: 'Popover side' },
              ]} />
              <p className="mb-4 font-mono text-[12px] text-zinc-400">
                Hover over <HoverCard trigger={<span className="text-emerald-400 font-bold underline decoration-dotted">this text</span>}>
                  <div className="space-y-1">
                    <div className="text-emerald-400 text-[11px] font-bold">&gt; Hover Card</div>
                    <div className="text-zinc-400">Rich content inside the popover.</div>
                    <div className="text-zinc-600 text-[10px]">Supports any React children.</div>
                  </div>
                </HoverCard> to see the hover card.
              </p>
              <Code>{`<HoverCard trigger={<span>Hover me</span>}>
  <div className="text-emerald-400">&gt; Rich content</div>
  <div className="text-zinc-400">Any React children work here.</div>
              </HoverCard>`}</Code>

              {/* Quote */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Quote
                <span className="text-[9px] text-zinc-600 font-mono">— Blockquote with attribution</span>
              </h3>
              <PropTable props={[
                { name: 'from', type: 'string', description: 'Attribution (required)' },
                { name: 'link', type: 'string', default: '—', description: 'Optional source URL' },
                { name: 'children', type: 'ReactNode', description: 'Quote text' },
              ]} />
              <div className="mb-4">
                <Quote from="John Doe" link="https://example.com">
                  This is a blockquote component with attribution and an optional source link.
                </Quote>
              </div>
              <Code>{`<Quote from="John Doe" link="https://example.com">
  This is a blockquote component with attribution.
</Quote>`}</Code>

              {/* Tip */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Tip
                <span className="text-[9px] text-zinc-600 font-mono">— Inline tooltip</span>
              </h3>
              <PropTable props={[
                { name: 'tip', type: 'string', description: 'Description text (required)' },
                { name: 'head', type: 'string', default: '—', description: 'Green header; defaults to children if absent' },
                { name: 'link', type: 'string', default: '—', description: 'Optional documentation URL shown at bottom' },
                { name: 'children', type: 'ReactNode', description: 'Inline trigger text' },
              ]} />
              <p className="mb-4 font-mono text-[12px] text-zinc-400">
                Hover over <Tip tip="This is an inline tooltip with detailed info">this text</Tip> to see the tip.
              </p>
              <Code>{`{/* Minimal: head defaults to children */}
<Tip tip="This is an inline tooltip">this text</Tip>

{/* Full: custom head, description, and docs link */}
<Tip head="Sharding" tip="Splits tenants into isolated instances" link="https://example.com">Sharding</Tip>`}</Code>

              {/* Popup */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Popup
                <span className="text-[9px] text-zinc-600 font-mono">— Dialog or Popover</span>
              </h3>
              <PropTable props={[
                { name: 'trigger', type: 'ReactNode', description: 'Click target' },
                { name: 'variant', type: "'dialog' | 'popover'", default: 'popover', description: 'Display type' },
                { name: 'title', type: 'string', default: '—', description: 'Popup header' },
                { name: 'children', type: 'ReactNode', description: 'Popup content' },
              ]} />
              <div className="flex gap-3 mb-4 items-center">
                <Popup trigger={<span className="text-emerald-400 underline decoration-dashed cursor-pointer text-[13px] font-mono">Open Popover</span>} variant="popover" title="Quick Info">
                  <div className="text-zinc-400 text-[12px]">Lightweight popover for quick info.</div>
                </Popup>
                <Popup trigger={<span className="text-amber-400 underline decoration-dashed cursor-pointer text-[13px] font-mono">Open Dialog</span>} variant="dialog" title="Detailed Dialog">
                  <div className="text-zinc-400 text-[12px]">Full dialog modal for detailed content.</div>
                </Popup>
              </div>
              <Code>{`<Popup trigger={<span>Open</span>} variant="popover" title="Quick Info">
  Lightweight popover content
</Popup>

<Popup trigger={<span>Open</span>} variant="dialog" title="Details">
  Full dialog modal content
</Popup>`}</Code>

              {/* Tooltip */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Tooltip
              </h3>
              <PropTable props={[
                { name: 'label', type: 'ReactNode', description: 'Tooltip text' },
                { name: 'children', type: 'ReactNode', description: 'Element with tooltip' },
                { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: 'top', description: 'Tooltip side' },
              ]} />
              <p className="mb-4 font-mono text-[12px] text-zinc-400">
                Hover over <Tooltip label="This is a tooltip example"><span className="text-emerald-400 underline decoration-dotted">this word</span></Tooltip> to see the tooltip.
              </p>
              <Code>{`<Tooltip label="Explanation text">
  <span>Hover target</span>
</Tooltip>`}</Code>

              {/* ColorPalette */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                ColorPalette
              </h3>
              <PropTable props={[
                { name: 'colors', type: '{ name: string; hex: string }[]', description: 'Array of color swatches' },
              ]} />
              <ColorPalette colors={[
                { name: 'Primary', hex: '#d0bcff' },
                { name: 'Secondary', hex: '#e9c349' },
                { name: 'Emerald', hex: '#34d399' },
                { name: 'Surface', hex: '#131313' },
                { name: 'Error', hex: '#ffb4ab' },
                { name: 'Outline', hex: '#958ea0' },
              ]} />
              <Code>{`<ColorPalette colors={[
  { name: 'Primary', hex: '#d0bcff' },
  { name: 'Emerald', hex: '#34d399' },
]} />`}</Code>

              {/* Table */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Table
                <span className="text-[9px] text-zinc-600 font-mono">— Terminal-styled data table</span>
              </h3>
              <PropTable props={[
                { name: 'columns', type: '{ key: string; header: string }[]', description: 'Column definitions' },
                { name: 'rows', type: 'Record<string, ReactNode>[]', description: 'Row data keyed by column key' },
                { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row background' },
                { name: 'compact', type: 'boolean', default: 'false', description: 'Reduced padding' },
              ]} />
              <Table
                columns={[
                  { key: 'service', header: 'Service' },
                  { key: 'status', header: 'Status' },
                  { key: 'uptime', header: 'Uptime' },
                  { key: 'latency', header: 'Latency' },
                ]}
                rows={[
                  { service: 'api-gateway', status: <span className="text-emerald-400">● Healthy</span>, uptime: '99.99%', latency: '12ms' },
                  { service: 'auth-service', status: <span className="text-emerald-400">● Healthy</span>, uptime: '99.97%', latency: '8ms' },
                  { service: 'db-primary', status: <span className="text-amber-400">● Degraded</span>, uptime: '98.50%', latency: '45ms' },
                  { service: 'cache-cluster', status: <span className="text-emerald-400">● Healthy</span>, uptime: '99.99%', latency: '1ms' },
                ]}
                striped
              />
              <Code>{`const columns = [
  { key: 'service', header: 'Service' },
  { key: 'status', header: 'Status' },
];
const rows = [
  { service: 'api-gateway', status: 'Healthy' },
];

<Table columns={columns} rows={rows} striped />`}</Code>

              {/* TreeTable */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                TreeTable
                <span className="text-[9px] text-zinc-600 font-mono">— Hierarchical tree view</span>
              </h3>
              <PropTable props={[
                { name: 'nodes', type: 'TreeNode[]', description: 'Tree data with optional children' },
                { name: 'columns', type: '{ key: string; header: string }[]', default: '—', description: 'Additional columns' },
                { name: 'showConnectors', type: 'boolean', default: 'true', description: 'Show ├─ └─ connectors' },
              ]} />
              <TreeTable
                nodes={[
                  {
                    id: 'src',
                    label: 'src/',
                    children: [
                      {
                        id: 'components',
                        label: 'components/',
                        children: [
                          { id: 'button', label: 'button.tsx' },
                          { id: 'card', label: 'card.tsx' },
                        ],
                      },
                      {
                        id: 'lib',
                        label: 'lib/',
                        children: [
                          { id: 'utils', label: 'utils.ts' },
                          { id: 'hooks', label: 'hooks.ts' },
                        ],
                      },
                    ],
                  },
                  {
                    id: 'public',
                    label: 'public/',
                    children: [
                      { id: 'favicon', label: 'favicon.ico' },
                    ],
                  },
                ]}
              />
              <Code>{`const nodes = [
  {
    id: 'src',
    label: 'src/',
    children: [
      { id: 'components', label: 'components/', children: [...] },
      { id: 'lib', label: 'lib/', children: [...] },
    ],
  },
];

<TreeTable nodes={nodes} showConnectors />`}</Code>

              {/* StatusPill */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                StatusPill
                <span className="text-[9px] text-zinc-600 font-mono">— Inline status badges</span>
              </h3>
              <PropTable props={[
                { name: 'status', type: "'todo' | 'progress' | 'done' | 'cancelled' | 'review' | 'hold'", description: 'Status variant' },
              ]} />
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Inline status pills that can be used inside paragraphs. Task <StatusPill status="todo" /> is not started,
                <StatusPill status="progress" /> means actively working, and <StatusPill status="done" /> means complete.
                Other variants include <StatusPill status="cancelled" />, <StatusPill status="review" />, and <StatusPill status="hold" />.
              </p>
              <Code>{`Task <StatusPill status="done" /> means complete.</Code>`}</Code>

              {/* TableCSV */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                TableCSV
                <span className="text-[9px] text-zinc-600 font-mono">— String-prop table with icon mapping</span>
              </h3>
              <PropTable props={[
                { name: 'children', type: 'string', description: 'Pipe-delimited table data (first line = headers, rest = rows)' },
                { name: 'source', type: 'string', default: '—', description: 'Alternative to children — multiline prop (MDX-safe)' },
                { name: 'iconMap', type: 'string', default: '—', description: 'Sem;colon,separated: TOKEN,icon_name,color_class' },
                { name: 'columnColors', type: 'string', default: '—', description: 'Comma-separated text color classes per column' },
                { name: 'highlightCol', type: 'string', default: '—', description: 'Header name to highlight' },
                { name: 'striped', type: 'boolean', default: 'false', description: 'Alternate row backgrounds' },
                { name: 'compact', type: 'boolean', default: 'false', description: 'Reduced cell padding' },
              ]} />
              <p className="font-mono text-[12px] text-zinc-400 mb-4 leading-relaxed">
                Data is passed as <strong>children</strong> (TSX) or <strong>source</strong> prop (MDX). Tokens in cells are mapped to Material Symbol icons via <code className="text-emerald-300">iconMap</code>.
              </p>
              <TableCSV
                iconMap="UP,check_circle,text-emerald-400;DEGRADED,warning,text-amber-400;DOWN,error,text-red-400"
                columnColors="text-zinc-300,text-zinc-300,text-zinc-300,text-zinc-500"
                highlightCol="Status"
                striped
                source={`Service | Status | Uptime | Region
api-gateway | UP | 99.99 | us-east
auth-service | UP | 99.97 | eu-west
db-primary | DEGRADED | 98.50 | us-east
cache-cluster | UP | 99.99 | ap-southeast
analytics-worker | DOWN | 95.20 | us-east`}
              />
              <Code>{`// TSX — use children:
<TableCSV iconMap="..." columnColors="..." highlightCol="Status" striped>
Service | Status | Uptime
api-gateway | UP | 99.99
</TableCSV>

// MDX — use source prop:
<TableCSV source="Service|Status|Uptime
api-gateway|UP|99.99
auth-service|DEGRADED|98.50" />`}</Code>
            </section>

            {/* ── Typography ── */}
            <section id="typography" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('typography')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">text_fields</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">Typography</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Font Family
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-zinc-800 rounded-lg p-4" style={{ fontFamily: 'var(--font-sora)' }}>
                  <div className="text-[9px] text-zinc-600 font-mono mb-2">// Sora (Headings)</div>
                  <div className="text-[18px] text-white font-semibold">The quick brown fox</div>
                  <div className="text-[14px] text-zinc-400">Sora 600 / 700 / 800</div>
                </div>
                <div className="border border-zinc-800 rounded-lg p-4" style={{ fontFamily: 'var(--font-inter)' }}>
                  <div className="text-[9px] text-zinc-600 font-mono mb-2">// Inter (Body)</div>
                  <div className="text-[18px] text-white">The quick brown fox</div>
                  <div className="text-[14px] text-zinc-400">Inter variable 400–700</div>
                </div>
                <div className="border border-zinc-800 rounded-lg p-4 font-mono">
                  <div className="text-[9px] text-zinc-600 mb-2">// Monospace (Terminal)</div>
                  <div className="text-[18px] text-white">&gt; The quick brown fox</div>
                  <div className="text-[14px] text-zinc-400">Browser default monospace</div>
                </div>
              </div>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Terminal Patterns
              </h3>
              <div className="font-mono text-[12px] space-y-3 border border-zinc-800 rounded-lg p-5">
                <div><span className="text-emerald-400">&gt;</span> <span className="text-zinc-300">prompt prefix — command prefix</span></div>
                <div><span className="text-emerald-400 font-bold">$</span> <span className="text-zinc-300">dollar prompt — shell command</span></div>
                <div><span className="text-emerald-500/60">//</span> <span className="text-zinc-500">double slash — comment</span></div>
                <div><span className="text-zinc-500">[</span><span className="text-amber-400/80">CATEGORY</span><span className="text-zinc-500">]</span> <span className="text-zinc-500">brackets — category label</span></div>
                <div><span className="text-emerald-500/50">a1b2c3d</span> <span className="text-zinc-500">— hash ID — short identifier</span></div>
                <div><span className="text-zinc-500">[</span><span className="text-zinc-400">1</span><span className="text-zinc-600">/</span><span className="text-zinc-400">3</span><span className="text-zinc-500">]</span> <span className="text-zinc-500">— count — item counter</span></div>
              </div>

              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Type Scale
              </h3>
              <div className="space-y-4 border border-zinc-800 rounded-lg p-5">
                <div><span className="text-[9px] text-zinc-600 font-mono">// Display XL (42px)</span>
                  <div className="font-display-lg text-[42px] text-white font-bold leading-tight">Display XL</div>
                </div>
                <div><span className="text-[9px] text-zinc-600 font-mono">// Display LG (32px)</span>
                  <div className="font-display-lg text-[32px] text-white font-bold">Display LG</div>
                </div>
                <div><span className="text-[9px] text-zinc-600 font-mono">// Heading 2 (24px)</span>
                  <div className="text-2xl text-white font-bold flex items-center gap-2">
                    <span className="text-emerald-500/40">#</span> Heading 2
                  </div>
                </div>
                <div><span className="text-[9px] text-zinc-600 font-mono">// Body (16px)</span>
                  <div className="text-[16px] text-zinc-300">Body text using Inter.</div>
                </div>
                <div><span className="text-[9px] text-zinc-600 font-mono">// Terminal MD (12px)</span>
                  <div className="font-mono text-[12px] text-zinc-400">&gt; Standard terminal content size</div>
                </div>
                <div><span className="text-[9px] text-zinc-600 font-mono">// Terminal SM (10px)</span>
                  <div className="font-mono text-[10px] text-zinc-500">// Labels, metadata, headers</div>
                </div>
              </div>
            </section>

            {/* ── Charts ── */}
            <section id="charts" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('charts')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">monitoring</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">Charts</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* Sparkline */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                Sparkline
                <span className="text-[9px] text-zinc-600 font-mono">— SVG polyline chart</span>
              </h3>
              <PropTable props={[
                { name: 'data', type: 'number[]', description: 'Data points to plot' },
                { name: 'color', type: 'string', default: '#34d399', description: 'Line and dot color' },
                { name: 'height', type: 'number', default: '60', description: 'SVG height in pixels' },
                { name: 'showDots', type: 'boolean', default: 'true', description: 'Show data point dots' },
              ]} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <TerminalCard title="Traffic.sh" icon="show_chart">
                  <div className="p-4 font-mono flex flex-col gap-2">
                    <p className="text-emerald-500/60 text-[9px] uppercase tracking-widest font-bold">[ NETWORK_THROUGHPUT ]</p>
                    <Sparkline data={[12, 48, 35, 62, 58, 81, 74, 93, 67, 85, 72, 91, 88, 96, 78]} />
                  </div>
                </TerminalCard>
                <TerminalCard title="Latency.sh" icon="pulse" variant="secondary">
                  <div className="p-4 font-mono flex flex-col gap-2">
                    <p className="text-secondary/60 text-[9px] uppercase tracking-widest font-bold">[ RESPONSE_TIME_MS ]</p>
                    <Sparkline data={[42, 38, 55, 48, 32, 29, 45, 41, 36, 28, 25, 22, 30, 27, 24]} color="#e9c349" />
                  </div>
                </TerminalCard>
              </div>
              <Code>{`<Sparkline
  data={[12, 48, 35, 62, 58, 81, 74]}
  color="#34d399"
  height={60}
  showDots
/>`}</Code>

              {/* ASCII Bar Chart */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                AsciiBarChart
                <span className="text-[9px] text-zinc-600 font-mono">— Block-character bars</span>
              </h3>
              <PropTable props={[
                { name: 'bars', type: '{ label: string; value: number }[]', description: 'Bar data (value 0–100)' },
                { name: 'maxLabel', type: 'string', default: '—', description: 'Optional header label' },
                { name: 'barCount', type: 'number', default: '10', description: 'Characters per bar' },
              ]} />
              <div className="mb-4">
                <TerminalCard title="Metrics.sh" icon="bar_chart">
                  <div className="p-4">
                    <AsciiBarChart
                      bars={[
                        { label: 'JAN', value: 65 },
                        { label: 'FEB', value: 78 },
                        { label: 'MAR', value: 45 },
                        { label: 'APR', value: 92 },
                        { label: 'MAY', value: 88 },
                      ]}
                      maxLabel="REQUESTS_PER_MONTH"
                    />
                  </div>
                </TerminalCard>
              </div>
              <Code>{`<AsciiBarChart
  bars={[
    { label: 'JAN', value: 65 },
    { label: 'FEB', value: 78 },
  ]}
  maxLabel="REQUESTS_PER_MONTH"
/>`}</Code>

              {/* Circular Gauge */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                CircularGauge
                <span className="text-[9px] text-zinc-600 font-mono">— SVG arc gauge</span>
              </h3>
              <PropTable props={[
                { name: 'value', type: 'number', description: 'Value 0–100' },
                { name: 'label', type: 'string', description: 'Label below gauge' },
                { name: 'color', type: 'string', default: '#34d399', description: 'Arc color' },
                { name: 'size', type: 'number', default: '64', description: 'SVG dimension' },
              ]} />
              <TerminalCard title="System Gauges" icon="speed">
                <div className="p-4">
                  <div className="flex items-center justify-around">
                    <CircularGauge value={87} label="CPU" color="#34d399" />
                    <CircularGauge value={64} label="MEM" color="#e9c349" />
                    <CircularGauge value={42} label="DISK" color="#818cf8" />
                    <CircularGauge value={95} label="NET" color="#22d3ee" />
                  </div>
                </div>
              </TerminalCard>
              <Code>{`<CircularGauge
  value={87}
  label="CPU"
  color="#34d399"
  size={64}
/>`}</Code>

              {/* Frequency Bars */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                FrequencyBars
                <span className="text-[9px] text-zinc-600 font-mono">— Animated spectrum analyzer</span>
              </h3>
              <PropTable props={[
                { name: 'barCount', type: 'number', default: '20', description: 'Number of bars' },
                { name: 'interval', type: 'number', default: '200', description: 'Animation interval (ms)' },
              ]} />
              <TerminalCard title="Audio Spectrum" icon="equalizer">
                <div className="p-4 font-mono">
                  <p className="text-emerald-500/60 text-[9px] uppercase tracking-widest mb-3 font-bold">[ FREQUENCY_ANALYSIS ]</p>
                  <FrequencyBars />
                </div>
              </TerminalCard>
              <Code>{`<FrequencyBars barCount={20} interval={200} />`}</Code>

              {/* Network Activity */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                NetworkActivity
                <span className="text-[9px] text-zinc-600 font-mono">— Animated node pulses</span>
              </h3>
              <PropTable props={[
                { name: 'nodeCount', type: 'number', default: '7', description: 'Number of nodes' },
                { name: 'interval', type: 'number', default: '400', description: 'Animation speed (ms)' },
              ]} />
              <TerminalCard title="Network Nodes" icon="hub" variant="secondary">
                <div className="p-4 font-mono">
                  <p className="text-secondary/60 text-[9px] uppercase tracking-widest mb-3 font-bold">[ ACTIVE_CONNECTIONS ]</p>
                  <NetworkActivity />
                </div>
              </TerminalCard>
              <Code>{`<NetworkActivity nodeCount={7} interval={400} />`}</Code>
            </section>

            {/* ── Effects ── */}
            <section id="effects" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('effects')}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-display-lg text-[24px] text-white font-bold">Effects</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* Matrix Rain */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                MatrixRain
                <span className="text-[9px] text-zinc-600 font-mono">— Canvas katakana rain</span>
              </h3>
              <PropTable props={[
                { name: 'speed', type: 'number', default: '1', description: 'Fall speed multiplier' },
                { name: 'fadeOpacity', type: 'number', default: '0.05', description: 'Trail fade opacity' },
              ]} />
              <TerminalCard title="Matrix Rain" icon="rain">
                <MatrixRain />
              </TerminalCard>
              <Code>{`<MatrixRain speed={1} fadeOpacity={0.05} />`}</Code>

              {/* Typewriter Text */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                TypewriterText
                <span className="text-[9px] text-zinc-600 font-mono">— Character-by-character reveal</span>
              </h3>
              <PropTable props={[
                { name: 'phrases', type: 'string[]', description: 'Array of phrases to cycle' },
                { name: 'speed', type: 'number', default: '60', description: 'Typing speed (ms per char)' },
                { name: 'pause', type: 'number', default: '1800', description: 'Pause before delete (ms)' },
                { name: 'prompt', type: 'string', default: '>', description: 'Prompt character' },
                { name: 'showCursor', type: 'boolean', default: 'true', description: 'Show blinking cursor' },
              ]} />
              <TerminalCard title="Typewriter" icon="text_fields">
                <div className="p-4 font-mono flex flex-col gap-3">
                  <TypewriterText phrases={['ACCESS_GRANTED', 'FIREWALL_BYPASSED', 'ROOT_DIRECTORY', 'SYSTEM_COMPROMISED']} />
                </div>
              </TerminalCard>
              <Code>{`<TypewriterText
  phrases={['ACCESS_GRANTED', 'FIREWALL_BYPASSED']}
  speed={60}
  pause={1800}
/>`}</Code>

              {/* Glitch Text */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                GlitchText
                <span className="text-[9px] text-zinc-600 font-mono">— Random character glitch</span>
              </h3>
              <PropTable props={[
                { name: 'text', type: 'string', default: 'SYSTEM_ONLINE', description: 'Base text' },
                { name: 'interval', type: 'number', default: '2000', description: 'Glitch interval (ms)' },
                { name: 'glitchProbability', type: 'number', default: '0.6', description: 'Chance of glitch per interval' },
                { name: 'glitchDuration', type: 'number', default: '120', description: 'Glitch display duration (ms)' },
              ]} />
              <TerminalCard title="Glitch Text" icon="text_fields">
                <div className="p-4 font-mono">
                  <GlitchText />
                </div>
              </TerminalCard>
              <Code>{`<GlitchText
  text="SYSTEM_ONLINE"
  interval={2000}
  glitchProbability={0.6}
/>`}</Code>
            </section>

            {/* ── Interactive Demos ── */}
            <section id="demos" className="mb-16 scroll-mt-24" onMouseEnter={() => setActiveSection('demos')}>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-emerald-400/60 text-[20px]">play_circle</span>
                <h2 className="font-display-lg text-[24px] text-white font-bold">Interactive Demos</h2>
                <span className="h-px flex-1 bg-zinc-800" />
              </div>

              {/* Terminal Chat */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                TerminalChat
                <span className="text-[9px] text-zinc-600 font-mono">— Simulated TTY chat</span>
              </h3>
              <PropTable props={[
                { name: 'messages', type: 'ChatMessage[]', default: '—', description: 'Array of { user, text, delay }' },
                { name: 'hostName', type: 'string', default: 'host', description: 'Host user identifier' },
              ]} />
              <TerminalCard title="Chat.sh" icon="chat" variant="secondary">
                <div className="p-4">
                  <TerminalChat />
                </div>
              </TerminalCard>
              <Code>{`const messages = [
  { user: 'guest', text: 'Hello!', delay: 500 },
  { user: 'host', text: 'Hi there!', delay: 2000 },
];

<TerminalChat messages={messages} hostName="host" />`}</Code>

              {/* Terminal Table */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                TerminalTable
                <span className="text-[9px] text-zinc-600 font-mono">— Process data table</span>
              </h3>
              <PropTable props={[
                { name: 'rows', type: 'ProcessRow[]', default: '—', description: 'Array of { pid, user, cpu, mem, cmd }' },
              ]} />
              <TerminalCard title="Process Table" icon="table_rows">
                <div className="p-4">
                  <TerminalTable />
                </div>
              </TerminalCard>
              <Code>{`const rows = [
  { pid: 4217, user: 'root', cpu: '0.3', mem: '1.2', cmd: 'nginx' },
];

<TerminalTable rows={rows} />`}</Code>

              {/* Changelog View */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                ChangelogView
                <span className="text-[9px] text-zinc-600 font-mono">— Unified / split git log</span>
              </h3>
              <PropTable props={[
                { name: 'commits', type: 'Commit[]', default: '—', description: 'Array of commit objects with hash, author, date, message, stats' },
              ]} />
              <TerminalCard title="Git Log.sh" icon="history">
                <div className="p-4">
                  <ChangelogView />
                </div>
              </TerminalCard>
              <Code>{`const commits = [
  { hash: 'a3f2c9e', author: 'ounak', date: '2025-05-16', message: 'feat: add feature', files: 4, added: 87, deleted: 12 },
];

<ChangelogView commits={commits} />`}</Code>

              {/* Code Diff View */}
              <h3 className="font-mono text-[15px] text-emerald-400 font-bold mb-3 mt-8 flex items-center gap-2">
                <span className="text-emerald-500/60">&gt;</span>
                CodeDiffView
                <span className="text-[9px] text-zinc-600 font-mono">— Expandable file diff</span>
              </h3>
              <PropTable props={[
                { name: 'files', type: 'DiffFile[]', default: '—', description: 'Array of diff files with hunks' },
              ]} />
              <TerminalCard title="Diff.sh" icon="difference">
                <div className="p-4">
                  <CodeDiffView />
                </div>
              </TerminalCard>
              <Code>{`const files = [
  {
    name: 'file.tsx',
    status: 'modified',
    hunks: [
      { type: '+', content: 'new line' },
      { type: '-', content: 'old line' },
    ],
  },
];

<CodeDiffView files={files} />`}</Code>
            </section>
          </main>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
