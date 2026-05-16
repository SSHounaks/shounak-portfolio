'use client';

import { useState, useEffect, useRef } from 'react';
import { TerminalCard } from '@/components/terminal-card';

const components = [
  {
    title: 'Terminal Card (Primary)',
    desc: 'Default purple-accented terminal card with header and glow effect.',
    variant: 'primary' as const,
    icon: 'terminal',
  },
  {
    title: 'Terminal Card (Secondary)',
    desc: 'Gold-accented variant for emphasis or current/highlighted sections.',
    variant: 'secondary' as const,
    icon: 'history_edu',
  },
  {
    title: 'Window Controls',
    desc: 'macOS-style traffic light dots — grey by default, color on hover.',
    icon: 'ads_click',
    variant: 'primary' as const,
  },
  {
    title: 'Spotlight Effect',
    desc: 'Radial gradient spotlight follows mouse cursor inside the card.',
    icon: 'mouse',
    variant: 'primary' as const,
  },
  {
    title: 'Progress Bars',
    desc: 'Thin neon bars with category-based coloring (amber, cyan, purple, pink).',
    icon: 'data_array',
    variant: 'primary' as const,
  },
  {
    title: 'Tree Details',
    desc: 'Expandable tree-style details with ├─ └─ ASCII connectors.',
    icon: 'account_tree',
    variant: 'secondary' as const,
  },
  {
    title: 'Command Prompt',
    desc: 'Terminal lines with > $ prompts and blinking cursor footers.',
    icon: 'chevron_right',
    variant: 'primary' as const,
  },
  {
    title: 'Status Badge',
    desc: 'Pill badge with pulsing dot, separator, and status label.',
    icon: 'check_circle',
    variant: 'primary' as const,
  },
  {
    title: 'Neon Buttons',
    desc: 'Glowing action buttons with subtle background and border + hover lift.',
    icon: 'touch_app',
    variant: 'secondary' as const,
  },
  {
    title: 'Hover Highlights',
    desc: 'Row and item hover effects — text/icon saturates, bg subtly lights up.',
    icon: 'swipe',
    variant: 'primary' as const,
  },
];

const progressExamples = [
  { label: 'amber', color: 'from-amber-500/60 to-amber-400/80', width: 90 },
  { label: 'cyan', color: 'from-cyan-500/60 to-cyan-400/80', width: 78 },
  { label: 'purple', color: 'from-purple-500/60 to-purple-400/80', width: 65 },
  { label: 'pink', color: 'from-pink-500/60 to-pink-400/80', width: 82 },
];

/* ── Line Chart (SVG Sparkline) ── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 200, h = 60;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        points={points} className="opacity-80" />
      {data.map((v, i) => (
        <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - ((v - min) / range) * h} r="2" fill={color} className="opacity-40" />
      ))}
    </svg>
  );
}

/* ── ASCII Bar Chart ── */
function AsciiBarChart() {
  const bars = [
    { label: 'JAN', value: 65 },
    { label: 'FEB', value: 78 },
    { label: 'MAR', value: 45 },
    { label: 'APR', value: 92 },
    { label: 'MAY', value: 88 },
    { label: 'JUN', value: 70 },
  ];

  return (
    <div className="font-mono text-[10px] space-y-0.5">
      <div className="flex items-center gap-2 mb-1.5 text-emerald-500/60">
        <span>//</span><span className="text-white/30">REQUESTS_PER_MONTH</span>
      </div>
      {bars.map((b) => (
        <div key={b.label} className="flex items-center gap-2">
          <span className="text-white/40 w-6 text-right">{b.label}</span>
          <span className="text-emerald-500/30">|</span>
          <div className="flex items-center gap-2">
            <div className="flex gap-px">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-3 rounded-[1px] ${i < Math.round(b.value / 10) ? 'bg-emerald-500/60' : 'bg-white/5'}`}
                ></div>
              ))}
            </div>
            <span className="text-white/30">{b.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Circular Gauge ── */
function CircularGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 28, cx = 32, cy = 32, circumference = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="64" height="64" viewBox="0 0 64 64" className="transform -rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (value / 100) * circumference}
          className="transition-all duration-1000" />
      </svg>
      <span className="text-[11px] font-bold font-mono" style={{ color }}>{value}%</span>
      <span className="text-white/40 text-[8px] font-mono uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ── Network Activity ── */
function NetworkActivity() {
  const [active, setActive] = useState(0);
  const nodes = 7;

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % (nodes * 2)), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      {Array.from({ length: nodes }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i <= active % nodes ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]' : 'bg-white/10'}`}></div>
          <div className={`w-0.5 h-6 rounded-full transition-all duration-300 ${i === active % nodes ? 'bg-emerald-400/60' : i < active % nodes ? 'bg-emerald-400/20' : 'bg-white/5'}`}></div>
        </div>
      ))}
    </div>
  );
}

/* ── Matrix Rain ── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (!w || !h) return;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 10;
    const cols = Math.floor(w / fontSize);
    const drops: number[] = Array.from({ length: cols }, () => Math.floor(Math.random() * -20));

    let frame = requestAnimationFrame(function draw() {
      ctx.fillStyle = 'rgba(10,10,10,0.05)';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = drops[i] * 10 > h - 10
          ? 'rgba(52,211,153,0.8)'
          : 'rgba(52,211,153,0.2)';
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      frame = requestAnimationFrame(draw);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-24 rounded" />;
}

/* ── Typewriter ── */
function TypewriterText() {
  const phrases = ['ACCESS_GRANTED', 'FIREWALL_BYPASSED', 'ROOT_DIRECTORY', 'SYSTEM_COMPROMISED'];
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (charIdx < phrases[idx].length) {
      const t = setTimeout(() => {
        setText(phrases[idx].slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, 60);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setIdx((idx + 1) % phrases.length);
        setText('');
        setCharIdx(0);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [charIdx, idx]);

  return (
    <div className="font-mono text-[13px] text-emerald-400 flex items-center gap-1">
      <span className="text-emerald-500/60">&gt;</span>
      <span>{text}</span>
      <span className="w-2 h-[14px] bg-emerald-400 animate-pulse"></span>
    </div>
  );
}

/* ── Frequency Visualizer ── */
function FrequencyBars() {
  const barCount = 20;
  const [heights, setHeights] = useState<number[]>(
    Array.from({ length: barCount }, () => 50)
  );

  useEffect(() => {
    const t = setInterval(() => {
      setHeights(Array.from({ length: barCount }, () => Math.random() * 100));
    }, 200);
    return () => clearInterval(t);
  }, []);

  const colors = ['bg-emerald-500/80', 'bg-cyan-400/70', 'bg-emerald-400/90', 'bg-amber-400/70', 'bg-emerald-500/60'];

  return (
    <div className="flex items-end justify-center gap-[3px] h-16">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`w-2 rounded-t-[2px] transition-all duration-200 ${colors[i % colors.length]}`}
          style={{ height: `${h}%` }}
        ></div>
      ))}
    </div>
  );
}

/* ── Terminal Chat Window ── */
const chatMessages = [
  { user: 'guest', text: ' Hey there! What tech stack do you use?', delay: 500 },
  { user: 'host', text: ' Mostly TypeScript, React, Node.js. Full-stack JS.', delay: 2500 },
  { user: 'guest', text: ' Cool! Experience with GraphQL?', delay: 4500 },
  { user: 'host', text: ' Yes — built several APIs with Apollo and Prisma.', delay: 6500 },
  { user: 'guest', text: ' What about deployment?', delay: 8500 },
  { user: 'host', text: ' Docker + AWS ECS. CI/CD via GitHub Actions.', delay: 10500 },
  { user: 'guest', text: ' Impressive. Hire-ready indeed.', delay: 12500 },
  { user: 'host', text: ' Thanks! Check my resume above ^_^', delay: 14500 },
];

function TerminalChat() {
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    if (visible >= chatMessages.length) return;
    const t = setTimeout(() => setVisible((p) => p + 1), chatMessages[visible].delay);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="font-mono space-y-1.5 min-h-[180px]">
      <div className="flex items-center gap-2 text-[9px] text-white/30 border-b border-white/5 pb-2 mb-2">
        <span className="text-emerald-400">●</span> connection_established — tty1
        <span className="text-white/20 ml-auto">session: active</span>
      </div>
      {chatMessages.slice(0, visible).map((msg, i) => (
        <div key={i} className="flex items-start gap-2 animate-in fade-in duration-300">
          <span className={`text-[10px] font-bold w-10 flex-shrink-0 ${msg.user === 'host' ? 'text-emerald-400' : 'text-cyan-400'}`}>
            {msg.user === 'host' ? 'host$' : 'guest$'}
          </span>
          <span className="text-[11px] text-white/70">{msg.text}</span>
        </div>
      ))}
      {visible <= chatMessages.length && (
        <div className="flex items-center gap-1 mt-1">
          <span className="text-emerald-400 text-[10px]">&gt;</span>
          <span className="w-1.5 h-3 bg-emerald-400 animate-pulse"></span>
        </div>
      )}
      {visible > chatMessages.length && (
        <div className="text-[10px] text-white/30 mt-2 italic">// conversation_logged</div>
      )}
    </div>
  );
}

/* ── Terminal Data Table ── */
function TerminalTable() {
  const rows = [
    { pid: 4217, user: 'root', cpu: '0.3', mem: '1.2', cmd: 'nginx -g daemon off;' },
    { pid: 3892, user: 'www', cpu: '2.1', mem: '4.7', cmd: 'node server.js' },
    { pid: 2104, user: 'postgres', cpu: '0.8', mem: '8.3', cmd: 'postgres -D /var/lib/pg' },
    { pid: 1563, user: 'root', cpu: '0.0', mem: '0.4', cmd: 'sshd -D' },
  ];

  return (
    <div className="font-mono text-[9px] overflow-x-auto">
      <div className="flex items-center gap-2 text-white/30 border-b border-white/5 pb-1.5 mb-1">
        <span className="w-10">PID</span>
        <span className="w-8">USER</span>
        <span className="w-6">CPU%</span>
        <span className="w-6">MEM%</span>
        <span className="flex-1">COMMAND</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2 py-1 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
          <span className="w-10 text-white/60">{r.pid}</span>
          <span className="w-8 text-emerald-400/80">{r.user}</span>
          <span className="w-6 text-white/40">{r.cpu}</span>
          <span className="w-6 text-amber-400/60">{r.mem}</span>
          <span className="flex-1 text-white/40 truncate">{r.cmd}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Changelog: Unified & Split Views ── */
const commits = [
  { hash: 'a3f2c9e', author: 'ounak', date: '2025-05-16', message: 'feat: add reading progress bar to blog posts', files: 4, added: 87, deleted: 12 },
  { hash: 'b7d1e4f', author: 'ounak', date: '2025-05-15', message: 'fix: resolve hydration errors in sparkline and gauges', files: 3, added: 34, deleted: 18 },
  { hash: 'e8c5a2b', author: 'ounak', date: '2025-05-14', message: 'style: redesign blog listing with bigger titles and tag colors', files: 2, added: 56, deleted: 41 },
  { hash: 'f4d9b3c', author: 'ounak', date: '2025-05-13', message: 'feat: implement Table of Contents with intersection observer', files: 5, added: 142, deleted: 23 },
  { hash: '1a6e8d7', author: 'ounak', date: '2025-05-12', message: 'feat: add collapsible summary component for blog posts', files: 2, added: 68, deleted: 0 },
  { hash: '9c2b4f1', author: 'ounak', date: '2025-05-11', message: 'refactor: extract breadcrumbs into separate component', files: 3, added: 95, deleted: 52 },
  { hash: '3d8e7a5', author: 'ounak', date: '2025-05-10', message: 'feat: add Velite MDX blog pipeline with Shiki highlighting', files: 8, added: 312, deleted: 89 },
  { hash: '6f1c9e2', author: 'ounak', date: '2025-05-09', message: 'fix: prevent background-canvas memory leaks on unmount', files: 1, added: 15, deleted: 8 },
];

function ChangelogView() {  const [view, setView] = useState<'unified' | 'split'>('unified');

  return (
    <div className="font-mono">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setView('unified')}
          className={`text-[10px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${view === 'unified' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'}`}>
          unified
        </button>
        <button onClick={() => setView('split')}
          className={`text-[10px] px-2.5 py-1 rounded border transition-colors cursor-pointer ${view === 'split' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'}`}>
          split
        </button>
        <span className="text-white/20 text-[10px] ml-auto">{commits.length} commits</span>
      </div>

      {view === 'unified' ? (
        <div className="space-y-0">
          {commits.map((c, i) => (
            <div key={c.hash} className="flex items-start gap-3 py-2 px-2 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
              <div className="flex flex-col items-center gap-0.5 pt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                {i < commits.length - 1 && <div className="w-px h-full min-h-[28px] bg-white/5" />}
              </div>
              <span className="text-emerald-400/60 text-[10px] w-16 shrink-0 font-bold">{c.hash}</span>
              <span className="text-white/30 text-[10px] w-20 shrink-0">{c.date}</span>
              <span className="text-white/50 text-[10px] w-12 shrink-0">{c.author}</span>
              <span className="text-white/70 text-[11px] flex-1">{c.message}</span>
              <div className="flex items-center gap-2 text-[9px] shrink-0">
                <span className="text-cyan-400/60">+{c.added}</span>
                <span className="text-red-400/60">-{c.deleted}</span>
                <span className="text-white/20">{c.files} files</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-0 border border-white/5 rounded overflow-hidden">
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider px-3 py-1.5 bg-white/[0.02] border-b border-white/5">main</div>
            <div className="divide-y divide-white/[0.02]">
              {commits.map((c, i) => (
                <div key={c.hash} className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors">
                  <span className="w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
                  <span className="text-emerald-400/60 text-[9px] w-12 shrink-0">{c.hash}</span>
                  <span className="text-white/70 text-[10px] flex-1 truncate">{c.message}</span>
                  <span className="text-white/20 text-[8px] shrink-0">{c.date}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-px bg-white/5" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-white/30 font-bold uppercase tracking-wider px-3 py-1.5 bg-white/[0.02] border-b border-white/5">feature/blog</div>
            <div className="divide-y divide-white/[0.02]">
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors">
                <span className="w-1 h-1 rounded-full bg-cyan-500/60 shrink-0" />
                <span className="text-cyan-400/60 text-[9px] w-12 shrink-0">d4e8f2a</span>
                <span className="text-white/70 text-[10px] flex-1 truncate">feat: add author bio to blog posts</span>
                <span className="text-white/20 text-[8px] shrink-0">2025-05-16</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors">
                <span className="w-1 h-1 rounded-full bg-cyan-500/60 shrink-0" />
                <span className="text-cyan-400/60 text-[9px] w-12 shrink-0">b2c7a91</span>
                <span className="text-white/70 text-[10px] flex-1 truncate">style: responsive table of contents sidebar</span>
                <span className="text-white/20 text-[8px] shrink-0">2025-05-15</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors">
                <span className="w-1 h-1 rounded-full bg-cyan-500/60 shrink-0" />
                <span className="text-cyan-400/60 text-[9px] w-12 shrink-0">f1e3d5c</span>
                <span className="text-white/70 text-[10px] flex-1 truncate">feat: related posts section at bottom</span>
                <span className="text-white/20 text-[8px] shrink-0">2025-05-14</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/[0.02] transition-colors">
                <span className="w-1 h-1 rounded-full bg-cyan-500/60 shrink-0" />
                <span className="text-cyan-400/60 text-[9px] w-12 shrink-0">9a4b6c8</span>
                <span className="text-white/70 text-[10px] flex-1 truncate">fix: heading anchor scroll offset</span>
                <span className="text-white/20 text-[8px] shrink-0">2025-05-13</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Code Diff View ── */
const diffFiles = [
  {
    name: 'components/reading-progress.tsx',
    status: 'modified',
    hunks: [
      { type: 'header', content: '@@ -18,7 +18,7 @@ export function ReadingProgress() {' },
      { type: '-', content: "        background: progress >= 100" },
      { type: '-', content: "          ? 'linear-gradient(to right, #f59e0b, #fbbf24)'" },
      { type: '-', content: "          : 'linear-gradient(to right, #10b981, #6ee7b7)'," },
      { type: '+', content: "        background: progress >= 100" },
      { type: '+', content: "          ? 'linear-gradient(to right, #f59e0b, #fbbf24)'" },
      { type: '+', content: "          : 'linear-gradient(to right, #10b981, #6ee7b7)'," },
      { type: 'neutral', content: '      />' },
      { type: 'neutral', content: '    </div>' },
      { type: 'neutral', content: '  );' },
    ],
  },
  {
    name: 'app/blog/page.tsx',
    status: 'modified',
    hunks: [
      { type: 'header', content: '@@ -33,11 +33,8 @@ export default function BlogPage() {' },
      { type: '-', content: "                    <div className='p-5 font-mono flex flex-col gap-3'>" },
      { type: '-', content: "                      <div className='flex items-center gap-3 text-[10px]'>" },
      { type: '-', content: "                        <span className='text-emerald-500/60'>&gt;</span>" },
      { type: '+', content: "                    <div className='p-6 font-mono flex flex-col gap-3'>" },
      { type: '+', content: "                      <div className='flex items-center gap-3 text-[11px]'>" },
      { type: '+', content: "                        <span className='text-emerald-500/60'>&gt;</span>" },
      { type: 'neutral', content: "                        <span className='text-white/30'>{post.date}</span>" },
      { type: 'neutral', content: '                      </div>' },
    ],
  },
  {
    name: 'content/blog/optimizing-nextjs-apps.mdx',
    status: 'added',
    hunks: [
      { type: 'header', content: '@@ -0,0 +1,42 @@' },
      { type: '+', content: '---' },
      { type: '+', content: 'title: "Optimizing Next.js Applications for Production"' },
      { type: '+', content: 'date: 2025-02-10' },
      { type: '+', content: 'excerpt: "A deep dive into performance optimization techniques for Next.js applications..."' },
      { type: '+', content: 'tags: [nextjs, performance, react]' },
      { type: '+', content: '---' },
      { type: '+', content: '' },
      { type: '+', content: '## Bundle Analysis' },
    ],
  },
];

const fileStatusColors: Record<string, string> = {
  modified: 'text-amber-400/80 border-amber-500/30 bg-amber-500/10',
  added: 'text-emerald-400/80 border-emerald-500/30 bg-emerald-500/10',
  deleted: 'text-red-400/80 border-red-500/30 bg-red-500/10',
};

function CodeDiffView() {
  const [expanded, setExpanded] = useState<string | null>(diffFiles[0].name);

  return (
    <div className="font-mono space-y-2">
      <div className="flex items-center gap-2 mb-3 text-[10px]">
        <span className="text-white/30">changed files:</span>
        <span className="text-cyan-400/60">{diffFiles.length}</span>
        <span className="text-white/20">|</span>
        <span className="text-emerald-400/60">+42</span>
        <span className="text-red-400/60">-18</span>
        <span className="text-white/20 ml-auto">diff --git a/* b/*</span>
      </div>
      {diffFiles.map((file) => {
        const open = expanded === file.name;
        return (
          <div key={file.name} className="border border-white/5 rounded overflow-hidden">
            <button onClick={() => setExpanded(open ? null : file.name)}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-[10px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-b border-white/5 cursor-pointer">
              <span className="text-white/30 transition-transform duration-200" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>▸</span>
              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${fileStatusColors[file.status] || 'text-white/30 border-white/10 bg-white/5'}`}>
                {file.status}
              </span>
              <span className="text-white/60 flex-1 truncate">{file.name}</span>
            </button>
            {open && (
              <div className="text-[10px] leading-relaxed overflow-x-auto">
                {file.hunks.map((line, i) => (
                  <div key={i} className={`flex items-stretch ${line.type === 'header' ? 'bg-white/[0.02] text-white/30' : line.type === '+' ? 'bg-emerald-500/8 text-emerald-400/90' : line.type === '-' ? 'bg-red-500/8 text-red-400/90' : 'text-white/50'}`}>
                    <span className="w-8 text-right text-white/20 shrink-0 py-px select-none border-r border-white/[0.02]">{line.type === 'header' ? '' : line.type === '+' ? '+' : line.type === '-' ? '-' : ' '}</span>
                    <span className="flex-1 px-3 py-px whitespace-pre">{line.content}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Glitch Text ── */
function GlitchText() {
  const [display, setDisplay] = useState('SYSTEM_ONLINE');
  const chars = '!@#$%^&*<>/\\|';

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const t = setInterval(() => {
      if (Math.random() > 0.6) {
        const glitched = 'SYSTEM_ONLINE'.split('').map((c) =>
          Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : c
        ).join('');
        setDisplay(glitched);
        timeoutId = setTimeout(() => setDisplay('SYSTEM_ONLINE'), 120);
      }
    }, 2000);
    return () => {
      clearInterval(t);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <span className="font-mono text-[13px] text-emerald-400 font-bold tracking-wider">{display}</span>
  );
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10 max-w-[1400px] mx-auto">
      <header className="mb-10">
        <div className="font-mono text-[10px] text-emerald-500/60 mb-2">// COMPONENT_LIBRARY v2.0</div>
        <h1 className="font-display-lg text-[32px] md:text-[48px] text-white font-bold mb-2">
          Hacker UI <span className="text-emerald-400">Showcase</span>
        </h1>
        <p className="font-mono text-[13px] text-white/40 max-w-2xl">
          A collection of terminal-inspired bento components. Hover, click, and explore each variant.
        </p>
      </header>

      {/* ── Component Cards Grid ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">Components</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {components.map((comp, i) => (
            <TerminalCard key={i} title={comp.title} icon={comp.icon} variant={comp.variant}>
              <div className="p-5 font-mono text-[12px] flex-1 flex flex-col">
                <p className="text-white/50 text-[11px] leading-relaxed flex-1">{comp.desc}</p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px]">
                  <span className={`w-1.5 h-1.5 rounded-full ${comp.variant === 'secondary' ? 'bg-secondary' : 'bg-primary'}`}></span>
                  <span className="text-white/30">{comp.variant}.variant</span>
                </div>
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      {/* ── Sparkline Chart ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">Graphs & Charts</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TerminalCard title="Traffic.sh" icon="show_chart">
            <div className="p-5 font-mono flex flex-col gap-3">
              <p className="text-emerald-500/80 text-[10px] uppercase tracking-widest font-bold">[ NETWORK_THROUGHPUT ]</p>
              <Sparkline data={[12, 48, 35, 62, 58, 81, 74, 93, 67, 85, 72, 91, 88, 96, 78]} color="#34d399" />
              <div className="flex justify-between text-[9px] text-white/30">
                <span>12:00</span><span>12:30</span><span>13:00</span>
              </div>
            </div>
          </TerminalCard>

          <TerminalCard title="Latency.sh" icon="pulse" variant="secondary">
            <div className="p-5 font-mono flex flex-col gap-3">
              <p className="text-secondary/80 text-[10px] uppercase tracking-widest font-bold">[ RESPONSE_TIME_MS ]</p>
              <Sparkline data={[42, 38, 55, 48, 32, 29, 45, 41, 36, 28, 25, 22, 30, 27, 24]} color="#e9c349" />
              <div className="flex justify-between text-[9px] text-white/30">
                <span>min: 22ms</span><span>avg: 34ms</span><span>max: 55ms</span>
              </div>
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* ── ASCII Bar Chart + Circular Gauges ── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TerminalCard title="Metrics.sh" icon="bar_chart">
            <div className="p-5">
              <AsciiBarChart />
            </div>
          </TerminalCard>

          <TerminalCard title="System Gauges" icon="speed">
            <div className="p-5">
              <div className="flex items-center justify-around">
                <CircularGauge value={87} label="CPU" color="#34d399" />
                <CircularGauge value={64} label="MEM" color="#e9c349" />
                <CircularGauge value={42} label="DISK" color="#818cf8" />
                <CircularGauge value={95} label="NET" color="#22d3ee" />
              </div>
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* ── Frequency + Network Activity ── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TerminalCard title="Audio Spectrum" icon="equalizer">
            <div className="p-5 font-mono">
              <p className="text-emerald-500/60 text-[9px] uppercase tracking-widest mb-3 font-bold">[ FREQUENCY_ANALYSIS ]</p>
              <FrequencyBars />
            </div>
          </TerminalCard>

          <TerminalCard title="Network Nodes" icon="hub" variant="secondary">
            <div className="p-5 font-mono">
              <p className="text-secondary/60 text-[9px] uppercase tracking-widest mb-3 font-bold">[ ACTIVE_CONNECTIONS ]</p>
              <NetworkActivity />
              <div className="text-center text-white/30 text-[9px] mt-2">7 nodes · mesh topology</div>
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* ── Matrix + Typewriter + Glitch ── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <TerminalCard title="Matrix Rain" icon="rain" className="md:col-span-2">
            <div className="p-0">
              <MatrixRain />
            </div>
          </TerminalCard>

          <TerminalCard title="Effects" icon="text_fields">
            <div className="p-5 font-mono flex flex-col gap-5 flex-1 justify-center">
              <div>
                <p className="text-white/30 text-[9px] uppercase tracking-wider mb-2">Typewriter</p>
                <TypewriterText />
              </div>
              <div>
                <p className="text-white/30 text-[9px] uppercase tracking-wider mb-2">Glitch Text</p>
                <GlitchText />
              </div>
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* ── Terminal Chat + Data Table ── */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TerminalCard title="Chat.sh" icon="chat" variant="secondary">
            <div className="p-5">
              <TerminalChat />
            </div>
          </TerminalCard>

          <TerminalCard title="Process Table" icon="table_rows">
            <div className="p-5">
              <TerminalTable />
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* ── Progress Bar Showcase ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">Progress Bars</span>
        </div>
        <TerminalCard title="Progress.sh" icon="data_array">
          <div className="p-6 font-mono space-y-4">
            {progressExamples.map((p) => (
              <div key={p.label} className="flex items-center gap-3">
                <span className="text-white/50 text-[10px] w-14 uppercase">{p.label}</span>
                <div className="flex-1 h-2.5 bg-white/5 rounded overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${p.color} rounded transition-all duration-700`}
                    style={{ width: `${p.width}%` }}
                  ></div>
                </div>
                <span className="text-white/30 text-[10px] w-8 text-right">{p.width}%</span>
              </div>
            ))}
          </div>
        </TerminalCard>
      </section>

      {/* ── Tree / Expandable Showcase ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">Tree Details</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TerminalCard title="Directory Tree" icon="account_tree" variant="secondary">
            <div className="p-5 font-mono text-[11px] space-y-1.5">
              {['src/', 'components/', 'app/', 'lib/', 'styles/'].map((dir, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-secondary/60">{i < 4 ? '├─' : '└─'}</span>
                  <span className="text-white/70">{dir}</span>
                </div>
              ))}
              <div className="ml-5 space-y-1 mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-secondary/40">├─</span>
                  <span className="text-white/40">terminal-card.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary/40">└─</span>
                  <span className="text-white/40">profile-card.tsx</span>
                </div>
              </div>
            </div>
          </TerminalCard>

          <TerminalCard title="System Info" icon="terminal">
            <div className="p-5 font-mono text-[11px] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500/60">├─</span>
                <span className="text-white/40">os:</span>
                <span className="text-white/60">LINUX v6.8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500/60">├─</span>
                <span className="text-white/40">shell:</span>
                <span className="text-white/60">zsh 5.9</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500/60">├─</span>
                <span className="text-white/40">uptime:</span>
                <span className="text-white/60">14d 6h 32m</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500/60">└─</span>
                <span className="text-white/40">status:</span>
                <span className="flex items-center gap-1.5 border border-emerald-500/30 rounded px-2 py-0.5 bg-emerald-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.6)]"></span>
                  <span className="w-[1px] h-3 bg-emerald-500/30"></span>
                  <span className="text-emerald-400/80 text-[11px] font-bold">ONLINE</span>
                </span>
              </div>
            </div>
          </TerminalCard>
        </div>
      </section>

      {/* ── Button Variants ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">Button Styles</span>
        </div>
        <TerminalCard title="Buttons.sh" icon="touch_app">
          <div className="p-6 font-mono space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button className="w-full bg-emerald-500/5 text-emerald-400 py-3 rounded border border-emerald-500/30 font-bold text-[13px] uppercase tracking-widest hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all backdrop-blur-sm">
                ./RUN_GREEN.SH
              </button>
              <button className="w-full bg-red-500/5 text-red-500 py-3 rounded border border-red-500/30 font-bold text-[13px] uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/50 transition-all backdrop-blur-sm">
                ./RUN_RED.SH
              </button>
              <button className="w-full bg-primary/5 text-primary py-3 rounded border border-primary/30 font-bold text-[13px] uppercase tracking-widest hover:bg-primary/10 hover:border-primary/50 transition-all backdrop-blur-sm">
                ./RUN_PURPLE.SH
              </button>
              <button className="w-full bg-secondary/5 text-secondary py-3 rounded border border-secondary/30 font-bold text-[13px] uppercase tracking-widest hover:bg-secondary/10 hover:border-secondary/50 transition-all backdrop-blur-sm">
                ./RUN_GOLD.SH
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
              <span className="text-white/50 text-[10px] mr-2">social:</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/60 bg-white/5 hover:bg-amber-500/10 hover:text-amber-400 border border-white/10 hover:border-amber-500/30 px-2.5 py-1 rounded transition-all cursor-pointer">github</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/60 bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 border border-white/10 hover:border-cyan-500/30 px-2.5 py-1 rounded transition-all cursor-pointer">linkedin</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-white/60 bg-white/5 hover:bg-purple-500/10 hover:text-purple-400 border border-white/10 hover:border-purple-500/30 px-2.5 py-1 rounded transition-all cursor-pointer">twitter</span>
            </div>
          </div>
        </TerminalCard>
      </section>

      {/* ── Changelog: Unified & Split Views ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">Changelog</span>
        </div>
        <TerminalCard title="Git Log.sh" icon="history">
          <div className="p-5">
            <ChangelogView />
          </div>
        </TerminalCard>
      </section>

      {/* ── Code Diff View ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">Code Diff</span>
        </div>
        <TerminalCard title="Diff.sh" icon="difference">
          <div className="p-5">
            <CodeDiffView />
          </div>
        </TerminalCard>
      </section>

      {/* ── Suggestions for Main Page ── */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-amber-500/60 text-[10px] font-mono">//</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 font-bold">Suggestions for Main Page</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <TerminalCard title="GitHub Activity Graph" icon="timeline" variant="secondary">
            <div className="p-5 font-mono text-[12px] flex flex-col gap-3">
              <p className="text-white/50 text-[11px] leading-relaxed">
                SVG contribution-style heatmap grid showing recent activity. Colored squares per day.
              </p>
              <div className="flex flex-wrap gap-[2px]">
                {[0,0,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,1,0,0,1,0,1,1,0,0,0,1,1,0].map((v, i) => (
                  <div key={i} className={`w-2 h-2 rounded-[2px] ${v ? 'bg-emerald-500/' + ([40, 60, 80])[i % 3] : 'bg-white/5'}`} />
                ))}
              </div>
              <span className="text-amber-500/60 text-[9px]">// could replace skills grid</span>
            </div>
          </TerminalCard>

          <TerminalCard title="Architecture Diagram" icon="account_tree" className="md:col-span-6">
            <div className="p-5 font-mono text-[12px] flex flex-col gap-3 flex-1">
              <p className="text-white/50 text-[11px] leading-relaxed">
                API Gateway → Backend (red) → Observability (green) with animated packet flow.
              </p>
              <svg viewBox="0 0 500 250" className="w-full max-w-[500px] mx-auto">
                {/* Connection lines */}
                <line x1="140" y1="102" x2="180" y2="102" stroke="#ef4444" strokeWidth="1.5" />
                <line x1="320" y1="102" x2="360" y2="102" stroke="#34d399" strokeWidth="1.5" />
                <line x1="250" y1="124" x2="250" y2="150" stroke="#34d399" strokeWidth="1" opacity="0.35" />
                <line x1="425" y1="124" x2="425" y2="150" stroke="#a78bfa" strokeWidth="1" opacity="0.35" />

                {/* Red packets: API Gateway → Backend */}
                <circle r="3" fill="#ef4444">
                  <animateMotion dur="2s" repeatCount="indefinite" path="M140,102 L180,102" />
                </circle>
                <circle r="3" fill="#ef4444">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s" path="M140,102 L180,102" />
                </circle>

                {/* Green packets: Backend → Observability */}
                <circle r="3" fill="#34d399">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M320,102 L360,102" />
                </circle>
                <circle r="3" fill="#34d399">
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s" path="M320,102 L360,102" />
                </circle>

                {/* Green packets: Backend → Database */}
                <circle r="3" fill="#34d399">
                  <animateMotion dur="2.5s" repeatCount="indefinite" path="M250,124 L250,150" />
                </circle>
                <circle r="3" fill="#34d399">
                  <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s" path="M250,124 L250,150" />
                </circle>

                {/* API Gateway */}
                <rect x="20" y="80" width="120" height="44" rx="6" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1.3" />
                <g transform="translate(32, 98)">
                  <polygon points="7,1 13,4 13,11 7,14 1,11 1,4" fill="none" stroke="#ef4444" strokeWidth="1.2" />
                  <polyline points="5,7 9,7 7,5" fill="none" stroke="#ef4444" strokeWidth="1" />
                  <polyline points="5,7 9,7 7,9" fill="none" stroke="#ef4444" strokeWidth="1" />
                </g>
                <text x="54" y="108" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">API Gateway</text>
                <text x="54" y="120" fill="#ef4444" fontSize="7" fontFamily="monospace">entry</text>

                {/* Backend Service */}
                <rect x="180" y="80" width="140" height="44" rx="6" fill="#0a0a0a" stroke="#34d399" strokeWidth="1.3" />
                <g transform="translate(194, 98)">
                  <rect x="1" y="1" width="12" height="4" rx="1" fill="none" stroke="#34d399" strokeWidth="1" />
                  <rect x="1" y="7" width="12" height="4" rx="1" fill="none" stroke="#34d399" strokeWidth="1" />
                  <circle cx="7" cy="3" r="1.5" fill="#34d399" opacity="0.4" />
                  <circle cx="7" cy="9" r="1.5" fill="#34d399" opacity="0.4" />
                </g>
                <text x="216" y="108" fill="#34d399" fontSize="9" fontFamily="monospace">Backend Service</text>
                <text x="216" y="120" fill="#34d399" fontSize="6" fontFamily="monospace">LIVE</text>

                {/* Database (square) */}
                <rect x="220" y="150" width="60" height="60" rx="6" fill="#0a0a0a" stroke="#34d399" strokeWidth="1" strokeDasharray="3,2" />
                <g transform="translate(243, 164)">
                  <rect x="0" y="0" width="14" height="3.5" rx="0.5" fill="none" stroke="#34d399" strokeWidth="1" />
                  <rect x="0" y="5" width="14" height="3.5" rx="0.5" fill="none" stroke="#34d399" strokeWidth="1" />
                  <rect x="0" y="10" width="14" height="3.5" rx="0.5" fill="none" stroke="#34d399" strokeWidth="1" />
                </g>
                <text x="250" y="198" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">DB</text>

                {/* Observability Service */}
                <rect x="345" y="80" width="140" height="44" rx="6" fill="#0a0a0a" stroke="#a78bfa" strokeWidth="1.3" />
                <g transform="translate(359, 98)">
                  <rect x="1" y="6" width="3" height="6" rx="0.5" fill="none" stroke="#a78bfa" strokeWidth="1" />
                  <rect x="5.5" y="2" width="3" height="10" rx="0.5" fill="none" stroke="#a78bfa" strokeWidth="1" />
                  <rect x="10" y="8" width="3" height="4" rx="0.5" fill="none" stroke="#a78bfa" strokeWidth="1" />
                </g>
                <text x="381" y="108" fill="#a78bfa" fontSize="9" fontFamily="monospace">Observability Service</text>
                <text x="381" y="120" fill="#a78bfa" fontSize="6" fontFamily="monospace">LIVE</text>

                {/* Stream (square) */}
                <rect x="395" y="150" width="60" height="60" rx="6" fill="#0a0a0a" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2" />
                <g transform="translate(418, 164)">
                  <path d="M0,7 Q3.5,2 7,7 T14,7" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                </g>
                <text x="425" y="198" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">Stream</text>
              </svg>
              <span className="text-amber-500/60 text-[9px]">// red → gateway→backend, green → backend→obs + db</span>
            </div>
          </TerminalCard>

          <TerminalCard title="Animated Terminal Output" icon="slideshow" variant="secondary">
            <div className="p-5 font-mono text-[12px] flex flex-col gap-3 flex-1">
              <p className="text-white/50 text-[11px] leading-relaxed">
                Auto-scrolling terminal output with simulated command execution and logs.
              </p>
              <div className="bg-black/30 rounded p-3 text-[9px] space-y-1 font-mono border border-white/5">
                <p className="text-emerald-400">$ npm run build</p>
                <p className="text-white/50"> &gt; building... (12s)</p>
                <p className="text-emerald-400/80"> &gt; ✓ 42 modules compiled</p>
                <p className="text-white/40"> &gt; bundle size: 247 kB</p>
                <p className="text-emerald-400 font-bold"> ✓ SUCCESS</p>
              </div>
              <span className="text-amber-500/60 text-[9px]">// could replace loading states</span>
            </div>
          </TerminalCard>

          <TerminalCard title="Activity Log Feed" icon="feed">
            <div className="p-5 font-mono text-[12px] flex flex-col gap-3 flex-1">
              <p className="text-white/50 text-[11px] leading-relaxed">
                Real-time log feed with timestamps, levels (INFO/WARN/ERR), and colored badges.
              </p>
              <div className="space-y-1 text-[9px]">
                <p><span className="text-white/30">[12:34:22]</span> <span className="text-cyan-400/80">INFO</span> <span className="text-white/40">Deploy started</span></p>
                <p><span className="text-white/30">[12:34:25]</span> <span className="text-amber-400/80">WARN</span> <span className="text-white/40">Deprecated API</span></p>
                <p><span className="text-white/30">[12:34:28]</span> <span className="text-red-400/80">ERR</span> <span className="text-white/40">Connection timeout</span></p>
                <p><span className="text-white/30">[12:34:31]</span> <span className="text-emerald-400/80">OK</span> <span className="text-white/40">Deploy complete</span></p>
              </div>
              <span className="text-amber-500/60 text-[9px]">// could replace testimonials style</span>
            </div>
          </TerminalCard>

          <TerminalCard title="Particle Background" icon="blur_on" variant="secondary">
            <div className="p-5 font-mono text-[12px] flex flex-col gap-3 flex-1">
              <p className="text-white/50 text-[11px] leading-relaxed">
                Canvas-based floating particle network with connecting lines. Interactive mouse tracking.
              </p>
              <div className="bg-black/30 rounded h-16 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(52,211,153,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(52,211,153,0.2) 0%, transparent 50%)',
                }}></div>
                <div className="absolute bottom-1 left-1 text-[7px] font-mono text-white/20">particles: 64 · fps: 60</div>
              </div>
              <span className="text-amber-500/60 text-[9px]">// could enhance background</span>
            </div>
          </TerminalCard>

          <TerminalCard title="Countdown / Uptime" icon="timer">
            <div className="p-5 font-mono text-[12px] flex flex-col gap-3 flex-1">
              <p className="text-white/50 text-[11px] leading-relaxed">
                Live ticking timer with days/hours/minutes/seconds. Good for showing experience duration.
              </p>
              <div className="flex items-center justify-center gap-3">
                {[['DAYS', '127'], ['HRS', '14'], ['MIN', '32'], ['SEC', '09']].map(([l, v]) => (
                  <div key={l} className="text-center">
                    <div className="text-[24px] font-bold text-emerald-400 font-mono">{v}</div>
                    <div className="text-[8px] text-white/30 font-mono uppercase tracking-wider">{l}</div>
                  </div>
                ))}
              </div>
              <span className="text-amber-500/60 text-[9px]">// could sit next to experience</span>
            </div>
          </TerminalCard>
        </div>
      </section>
    </div>
  );
}
