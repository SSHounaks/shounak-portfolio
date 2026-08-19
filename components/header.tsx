'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';

const links = [
  { label: '_root', href: '/', color: 'emerald' },
  { label: '_logs', href: '/blog', color: 'amber' },
  { label: '_broadcast', href: '/news', color: 'purple' },
  { label: '_books', href: '/bookshelf', color: 'sky' },

];

const colorMap: Record<string, { active: string; inactive: string }> = {
  emerald: {
    active: 'text-black bg-emerald-400 font-bold',
    inactive: 'text-emerald-400/70 hover:text-black hover:bg-emerald-400',
  },
  amber: {
    active: 'text-black bg-amber-400 font-bold',
    inactive: 'text-amber-400/70 hover:text-black hover:bg-amber-400',
  },
  purple: {
    active: 'text-black bg-purple-400 font-bold',
    inactive: 'text-purple-400/70 hover:text-black hover:bg-purple-400',
  },
  sky: {
    active: 'text-black bg-sky-400 font-bold',
    inactive: 'text-sky-400/70 hover:text-black hover:bg-sky-400',
  },

};

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 h-9">
      <div className="flex items-center px-4 gap-0 h-full">
        <a href="/" className="flex items-center px-3 h-full text-[13px] font-mono font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors whitespace-nowrap">
          <span>$</span>
        </a>
        <div className="flex items-center gap-0 flex-1 h-full">
          <Breadcrumbs />
          <nav className="flex items-stretch h-full ml-auto">
            {links.map((item) => {
              const isActive = pathname === item.href;
              const colors = colorMap[item.color];
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center px-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${
                    isActive ? colors.active : colors.inactive
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
