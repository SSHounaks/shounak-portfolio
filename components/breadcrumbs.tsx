'use client';

import { usePathname } from 'next/navigation';

type Crumb = {
  label: string;
  href?: string;
  bg: string;
  hoverBg: string;
  chevronColor: string;
  hoverChevron: string;
};

type PaletteEntry = Omit<Crumb, 'label' | 'href'>;

const palette: PaletteEntry[] = [
  { bg: 'rgb(60,35,50)', hoverBg: 'rgb(100,55,80)', chevronColor: 'rgb(60,35,50)', hoverChevron: 'rgb(100,55,80)' },
  { bg: 'rgb(30,50,60)', hoverBg: 'rgb(50,85,100)', chevronColor: 'rgb(30,50,60)', hoverChevron: 'rgb(50,85,100)' },
  { bg: 'rgb(50,30,60)', hoverBg: 'rgb(85,50,100)', chevronColor: 'rgb(50,30,60)', hoverChevron: 'rgb(85,50,100)' },
  { bg: 'rgb(25,55,40)', hoverBg: 'rgb(40,90,65)', chevronColor: 'rgb(25,55,40)', hoverChevron: 'rgb(40,90,65)' },
  { bg: 'rgb(55,30,30)', hoverBg: 'rgb(95,50,50)', chevronColor: 'rgb(55,30,30)', hoverChevron: 'rgb(95,50,50)' },
  { bg: 'rgb(30,40,60)', hoverBg: 'rgb(50,65,100)', chevronColor: 'rgb(30,40,60)', hoverChevron: 'rgb(50,65,100)' },
  { bg: 'rgb(55,50,25)', hoverBg: 'rgb(90,80,40)', chevronColor: 'rgb(55,50,25)', hoverChevron: 'rgb(90,80,40)' },
  { bg: 'rgb(45,25,55)', hoverBg: 'rgb(75,40,90)', chevronColor: 'rgb(45,25,55)', hoverChevron: 'rgb(75,40,90)' },
  { bg: 'rgb(25,50,55)', hoverBg: 'rgb(40,80,90)', chevronColor: 'rgb(25,50,55)', hoverChevron: 'rgb(40,80,90)' },
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function pickColor(name: string): PaletteEntry {
  return palette[hashString(name) % palette.length];
}

function getCrumbs(pathname: string): Crumb[] {
  const base = { bg: 'rgb(30,30,30)', hoverBg: 'rgb(55,55,55)', chevronColor: 'rgb(30,30,30)', hoverChevron: 'rgb(55,55,55)' };
  const blog = { bg: 'rgb(50,40,18)', hoverBg: 'rgb(95,75,30)', chevronColor: 'rgb(50,40,18)', hoverChevron: 'rgb(95,75,30)' };
  const news = { bg: 'rgb(28,30,58)', hoverBg: 'rgb(55,60,108)', chevronColor: 'rgb(28,30,58)', hoverChevron: 'rgb(55,60,108)' };

  if (pathname === '/') return [{ label: '~/', ...base }];
  if (pathname === '/blog') return [{ label: '~/', href: '/', ...base }, { label: '/var/log', ...blog }];
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    return [
      { label: '~/', href: '/', ...base },
      { label: '/var/log', href: '/blog', ...blog },
      { label: slug, ...pickColor(slug) },
    ];
  }
  if (pathname === '/news') return [{ label: '~/', href: '/', ...base }, { label: '/dev/null', ...news }];
  if (pathname === '/bookshelf') return [{ label: '~/', href: '/', ...base }, { label: '/usr/share/doc', bg: 'rgb(40,50,30)', hoverBg: 'rgb(70,90,55)', chevronColor: 'rgb(40,50,30)', hoverChevron: 'rgb(70,90,55)' }];
  return [{ label: '~/', ...base }];
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = getCrumbs(pathname);

  return (
    <div className="flex items-stretch gap-0 font-mono text-[11px] font-bold tracking-wide h-full">
      {crumbs.map((crumb, i) => {
        const Tag = crumb.href ? 'a' : 'span';
        const extraProps = crumb.href ? { href: crumb.href } : {};
        return (
          <Tag key={crumb.label} {...extraProps}
            className={`relative flex items-center text-white/50 hover:text-white transition-colors ${crumb.href ? 'cursor-pointer' : ''} ${crumb.label === '~/' ? 'px-2' : 'pl-4 pr-2'}`}
            style={{ background: crumb.bg, zIndex: crumbs.length - i }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = crumb.hoverBg; const ch = el.lastElementChild as HTMLElement; if (ch) ch.style.borderLeftColor = crumb.hoverChevron; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = crumb.bg; const ch = el.lastElementChild as HTMLElement; if (ch) ch.style.borderLeftColor = crumb.chevronColor; }}
          >
            {crumb.label}
            {i < crumbs.length - 1 && (
              <span className="absolute -right-[8px] top-0 h-0 w-0 border-y-[18px] border-l-[8px] border-y-transparent border-solid transition-colors" style={{ borderLeftColor: crumb.chevronColor }}></span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}
