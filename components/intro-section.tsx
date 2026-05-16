'use client';

import { TerminalCard } from './terminal-card';

export function IntroSection() {
  return (
    <TerminalCard title="executive_summary.exe" icon="terminal" className="md:col-span-8">
      <div className="flex flex-col h-full relative overflow-hidden group p-8 justify-center min-h-[300px]">
        <svg viewBox="0 0 500 250" className="absolute -bottom-4 -right-6 w-[85%] max-w-[550px] opacity-[0.13] group-hover:opacity-[0.50] pointer-events-none transition-opacity duration-500"
          style={{ filter: 'saturate(0.5)' }}>
          <line x1="140" y1="102" x2="180" y2="102" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="320" y1="102" x2="360" y2="102" stroke="#34d399" strokeWidth="1.5" />
          <line x1="250" y1="124" x2="250" y2="150" stroke="#34d399" strokeWidth="1" opacity="0.35" />
          <line x1="425" y1="124" x2="425" y2="150" stroke="#a78bfa" strokeWidth="1" opacity="0.35" />
          <circle r="3" fill="#ef4444">
            <animateMotion dur="2s" repeatCount="indefinite" path="M140,102 L180,102" />
          </circle>
          <circle r="3" fill="#ef4444">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s" path="M140,102 L180,102" />
          </circle>
          <circle r="3" fill="#34d399">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M320,102 L360,102" />
          </circle>
          <circle r="3" fill="#34d399">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s" path="M320,102 L360,102" />
          </circle>
          <circle r="3" fill="#34d399">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M250,124 L250,150" />
          </circle>
          <circle r="3" fill="#34d399">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="1s" path="M250,124 L250,150" />
          </circle>
          <rect x="20" y="80" width="120" height="44" rx="6" fill="#0a0a0a" stroke="#ef4444" strokeWidth="1.3" />
          <g transform="translate(32, 98)">
            <polygon points="7,1 13,4 13,11 7,14 1,11 1,4" fill="none" stroke="#ef4444" strokeWidth="1.2" />
            <polyline points="5,7 9,7 7,5" fill="none" stroke="#ef4444" strokeWidth="1" />
            <polyline points="5,7 9,7 7,9" fill="none" stroke="#ef4444" strokeWidth="1" />
          </g>
          <text x="54" y="108" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">API Gateway</text>
          <text x="54" y="120" fill="#ef4444" fontSize="7" fontFamily="monospace">entry</text>
          <rect x="180" y="80" width="140" height="44" rx="6" fill="#0a0a0a" stroke="#34d399" strokeWidth="1.3" />
          <g transform="translate(194, 98)">
            <rect x="1" y="1" width="12" height="4" rx="1" fill="none" stroke="#34d399" strokeWidth="1" />
            <rect x="1" y="7" width="12" height="4" rx="1" fill="none" stroke="#34d399" strokeWidth="1" />
            <circle cx="7" cy="3" r="1.5" fill="#34d399" opacity="0.4" />
            <circle cx="7" cy="9" r="1.5" fill="#34d399" opacity="0.4" />
          </g>
          <text x="216" y="108" fill="#34d399" fontSize="9" fontFamily="monospace">Backend Service</text>
          <text x="216" y="120" fill="#34d399" fontSize="6" fontFamily="monospace">LIVE</text>
          <rect x="220" y="150" width="60" height="60" rx="6" fill="#0a0a0a" stroke="#34d399" strokeWidth="1" strokeDasharray="3,2" />
          <g transform="translate(243, 164)">
            <rect x="0" y="0" width="14" height="3.5" rx="0.5" fill="none" stroke="#34d399" strokeWidth="1" />
            <rect x="0" y="5" width="14" height="3.5" rx="0.5" fill="none" stroke="#34d399" strokeWidth="1" />
            <rect x="0" y="10" width="14" height="3.5" rx="0.5" fill="none" stroke="#34d399" strokeWidth="1" />
          </g>
          <text x="250" y="198" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">DB</text>
          <rect x="345" y="80" width="140" height="44" rx="6" fill="#0a0a0a" stroke="#a78bfa" strokeWidth="1.3" />
          <g transform="translate(359, 98)">
            <rect x="1" y="6" width="3" height="6" rx="0.5" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <rect x="5.5" y="2" width="3" height="10" rx="0.5" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <rect x="10" y="8" width="3" height="4" rx="0.5" fill="none" stroke="#a78bfa" strokeWidth="1" />
          </g>
          <text x="381" y="108" fill="#a78bfa" fontSize="9" fontFamily="monospace">Observability Service</text>
          <text x="381" y="120" fill="#a78bfa" fontSize="6" fontFamily="monospace">LIVE</text>
          <rect x="395" y="150" width="60" height="60" rx="6" fill="#0a0a0a" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2" />
          <g transform="translate(418, 164)">
            <path d="M0,7 Q3.5,2 7,7 T14,7" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          </g>
          <text x="425" y="198" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">Stream</text>
        </svg>
        <h1 className="font-display-lg leading-tight text-[28px] mb-4 md:text-[42px] relative z-10">
          Designing & shipping <span className="text-primary italic">production-grade</span> systems at scale.
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-2xl leading-relaxed text-[16px] relative z-10">
          Full Stack Developer & Cybersecurity Expert with 5.5+ years of experience specializing in{' '}
          <span className="text-secondary">scalable backend architecture</span>, distributed microservices,
          and AI-native engineering — owning systems end-to-end from design through observability.
        </p>
      </div>
    </TerminalCard>
  );
}
