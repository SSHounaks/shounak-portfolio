'use client';

import { useState } from 'react';
import { TerminalCard } from './terminal-card';

export function ProfileCard() {
  const [jumpKey, setJumpKey] = useState(0);

  const handleClick = () => {
    setJumpKey(k => k + 1);
  };

  return (
    <TerminalCard title="Career Summary.sh" variant="primary" className="md:col-span-4">
      <div className="font-mono text-[12px] p-5 flex flex-col flex-1 gap-4 cursor-pointer group" onClick={handleClick}>
        <div className="flex gap-5 items-center pointer-events-none">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-xl border border-emerald-500/30 p-0.5 bg-black/30 overflow-hidden relative">
              <img
                key={jumpKey}
                alt="Shounak Bhalerao"
                className="w-full h-full scale-225 object-cover grayscale group-hover:grayscale-0 transition-all duration-500  [animation:jump-once_0.4s_ease-out]"
                src="/am.webp"
              />
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay"></div>
            </div>
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div>
              <span className="text-emerald-400">&gt;</span>{' '}
              <span className="text-emerald-300 font-bold text-[18px]">Shounak Bhalerao</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-emerald-500/50 text-[9px]">//</span>
              <span className="text-white/50 text-[10px]">FULL STACK DEV // CYBERSECURITY</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[11px] items-center pt-2 border-t border-white/5 pointer-events-none">
          <span className="text-white/40">status</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)] animate-pulse block"></span>
            <span className="text-emerald-400/80 font-bold">OPEN_TO_WORK</span>
          </span>
          <span className="text-white/40">focus</span>
          <span className="text-white/60">Full Stack · Security · AI/ML</span>
          <span className="text-white/40">location</span>
          <span className="text-white/60">Bengaluru, India · Remote, AU</span>
        </div>
        <div className="mt-auto pointer-events-auto">
          <a href="/docs/Shounak_Ravi_Bhalerao_Resume.pdf" download className="block w-full bg-primary/5 text-primary py-2.5 rounded border border-primary/30 font-bold text-[12px] font-mono uppercase tracking-widest hover:bg-primary/10 hover:border-primary/50 transition-all text-center cursor-pointer">
            ./DOWNLOAD_RESUME.SH
          </a>
        </div>
      </div>
    </TerminalCard>
  );
}
