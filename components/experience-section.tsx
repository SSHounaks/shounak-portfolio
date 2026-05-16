'use client';

import { useState } from 'react';
import { TerminalCard } from './terminal-card';

interface ExperienceItem {
  years: string;
  title: string;
  company: string;
  isCurrent?: boolean;
  tech: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    years: '2025-PRESENT',
    title: 'SDE 3',
    company: '@ Atlassian',
    isCurrent: true,
    tech: 'Java 25, Terraform, AWS, SSE, LLM, SignalFx, Splunk, BitBucket Pipelines, Google Gemini',
    highlights: [
      'Refactored synchronous flows into async non-blocking architectures, reducing thread contention',
      'Implemented SSE streaming endpoints for long-running research queries, improving response continuity',
      'Spearheaded Agentic AI Bot that auto-scans repos, finds vulnerabilities, and auto-generates patches — lifting security rating from 84% to 90% in two weeks',
      'Designed consumption-based pricing model for internal AI apps with action/skill-based credit tiers',
      'Integrated Google Gemini into Rovo Chat via A2A protocol enabling multi-model conversational workflows',
      'Reduced time to mitigation by 5% via SignalFx & Splunk dashboards with structured logging',
    ],
  },
  {
    years: '2022-2024',
    title: 'PROGRAMMER ANALYST',
    company: '@ Manulife / Cognizant',
    tech: 'Java, Spring Boot, Reactive Spring, Spring Security 6, SQL, NoSQL, Microservices',
    highlights: [
      'Maintained 100% production deployment track record',
      'Reduced response time by 95% (12s → 0.6s) via optimizing storage, aggregation & retrieval',
      'Optimized Compute & Storage resources by 90th percentile, reducing millions of Yen in OpEx',
      'Led a team of 3 including Front-end & Database engineers to ship 2 features successfully',
      'Owned microservices catering to millions of requests with high reliability',
    ],
  },
  {
    years: '2020-2022',
    title: 'SENIOR SYSTEMS ENGINEER',
    company: '@ Sabre / Infosys',
    tech: 'Spring Boot, Groovy, COBOL, Strangler Pattern, Functional Reactive Programming',
    highlights: [
      'Achieved seamless integration for a new Microservice shadowing COBOL-based systems with Spring Boot',
      'Leveraged Strangler Design Pattern to transition from legacy systems in 2 years with enhanced observability',
      'Refined Groovy automation test quality by 35-40% and improved code quality via FRP practices',
    ],
  },
];

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const hash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h).toString(16).slice(0, 7).padStart(7, '0');
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <TerminalCard title="Work Experience.sh" icon="history_edu" variant="secondary" className="md:col-span-5">
      <div className="font-mono text-[12px] p-6 space-y-0 flex flex-col flex-1 overflow-hidden">
        <div className="border border-white/5 rounded overflow-hidden divide-y divide-white/5 overflow-y-auto flex-1 max-h-[360px]">
          {experiences.map((exp, index) => (
            <div key={index}>
              <div
                className={`relative p-4 cursor-pointer transition-colors ${
                  exp.isCurrent ? 'bg-secondary/[0.03]' : 'hover:bg-emerald-500/[0.02]'
                }`}
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`${exp.isCurrent ? 'text-secondary' : 'text-emerald-400'}`}>&gt;</span>
                      <span className={`text-[11px] font-bold ${exp.isCurrent ? 'text-secondary' : 'text-white/80'}`}>
                        {exp.title} <span className="text-white/40 font-normal">@ {exp.company.replace('@ ', '')}</span>
                      </span>
                      {exp.isCurrent && (
                        <span className="text-[9px] bg-secondary/20 text-secondary px-1.5 py-0.5 rounded border border-secondary/30 uppercase tracking-wider">
                          ACTIVE
                        </span>
                      )}
                      <span className={`text-[10px] ml-auto transition-transform duration-200 ${expandedIndex === index ? 'rotate-90' : ''}`}>
                        <span className="material-symbols-outlined text-emerald-400/60 text-[12px]">chevron_right</span>
                      </span>
                    </div>
                    <p className="text-white/40 text-[9px] ml-5 mt-0.5 font-mono">
                      <span className={`${exp.isCurrent ? 'text-secondary/60' : 'text-emerald-500/60'}`}>//</span> {exp.years}
                    </p>
                  </div>
                </div>
              </div>
              {expandedIndex === index && (
                <div className={`px-3 pb-4 pt-0 border-t ${exp.isCurrent ? 'border-secondary/10' : 'border-emerald-500/10'} mx-3`}>
                  <div className="pt-3 space-y-2 text-[10px]">
                    <div className="flex items-center gap-2 px-1 py-1 bg-white/[0.02] rounded border border-white/5">
                      <span className="text-emerald-400/60 text-[9px] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">deployed_code</span>
                      </span>
                      <span className="text-white/40 text-[9px]">stack:</span>
                      <span className="text-amber-400/80 text-[10px] font-medium">{exp.tech}</span>
                    </div>
                    <div className="space-y-0">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 py-1 px-1 border-b border-white/[0.02] last:border-b-0 hover:bg-white/[0.02] transition-colors">
                          <span className="text-emerald-500/50 text-[9px] font-mono w-16 shrink-0 leading-relaxed">{hash(h)}</span>
                          <span className="text-white/50 text-[10px] leading-relaxed flex-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </TerminalCard>
  );
}
