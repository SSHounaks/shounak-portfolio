'use client';

import { useState } from 'react';
import { TerminalCard } from './terminal-card';

interface Project {
  title: string;
  description: string;
  icon: string;
  tech: string;
  link: string;
  details: string;
}

const projects: Project[] = [
  {
    title: 'ThothTech/OnTrack',
    description: 'Amazon SNS Email Service & Angular 15 migration',
    icon: 'commit',
    tech: 'Angular 15, Ruby on Rails, Amazon SNS, Astro.js',
    link: 'github.com/thoth-tech/ontrack',
    details: 'Ideated and built an Amazon SNS-based Email Service improving student satisfaction. Migrated legacy Angular 1.x to Angular 15. Championed documentation overhaul using Astro.js, adding onboarding guides and architecture diagrams reducing dev ramp-up time. Fixed 6 long-standing frontend & backend bugs.',
  },
  {
    title: 'FasterXML/Jackson-Jr',
    description: 'Java serialization & deserialization engine',
    icon: 'data_object',
    tech: 'Java 17, Groovy, Maven, JUnit',
    link: 'github.com/FasterXML/jackson-jr',
    details: 'Engineered support for int[] deserialization, serialization of Java 17 & Groovy Records. Fixed issues regarding Duplicate Key Detection for simple Objects and BigDecimal support for floats. Implemented multi-level testing POC using Maven for different target JREs.',
  },
];

const education = [
  {
    degree: 'Master of Cybersecurity',
    school: 'Deakin University, GIFT City',
    year: '2026',
    score: 'High Distinction (84.5 WAM)',
    icon: 'security',
  },
  {
    degree: 'B.E. in Computer Science',
    school: 'DIEMS, Chh. Sambhajinagar',
    year: '2020',
    score: 'Distinction',
    icon: 'computer',
  },
];

export function ProjectsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <TerminalCard title="Open-Source.sh" icon="folder_open" variant="primary">
        <div className="font-mono text-[12px] p-4 space-y-0 flex flex-col flex-1 overflow-hidden">
          <div className="border border-white/5 rounded overflow-hidden divide-y divide-white/5 overflow-y-auto flex-1">
            {projects.map((project, index) => (
              <div key={index}>
                <div
                  className="p-3 hover:bg-emerald-500/[0.02] transition-colors group cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold">$</span>
                        <span className="text-emerald-300/90 font-bold text-[11px] truncate group-hover:text-emerald-200 transition-colors">
                          {project.title}
                        </span>
                        <span className="text-white/30 text-[9px] font-normal truncate">— {project.description}</span>
                        <span className="text-white/20 text-[9px] ml-auto font-mono shrink-0">[{index + 1}/{projects.length}]</span>
                        <span className={`text-[10px] transition-transform duration-200 ${expandedIndex === index ? 'rotate-90' : ''}`}>
                          <span className="material-symbols-outlined text-emerald-400/60 text-[12px]">chevron_right</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {expandedIndex === index && (
                  <div className="px-3 pb-3 pt-0 border-t border-emerald-500/10 mx-3">
                    <div className="pt-3 space-y-2 text-[10px]">
                      <div className="flex items-center gap-2 px-1 py-1 bg-white/[0.02] rounded border border-white/5">
                        <span className="text-cyan-400/60 text-[9px] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">deployed_code</span>
                        </span>
                        <span className="text-white/40 text-[9px]">tech:</span>
                        <span className="text-cyan-400/80 text-[10px] font-medium">{project.tech}</span>
                      </div>
                      <div className="flex items-center gap-2 px-1 py-1 bg-white/[0.02] rounded border border-white/5">
                        <span className="text-amber-400/60 text-[9px] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">link</span>
                        </span>
                        <span className="text-white/40 text-[9px]">repo:</span>
                        <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-amber-400/80 text-[10px] underline underline-offset-2 hover:text-amber-300 transition-colors">{project.link}</a>
                      </div>
                      <div className="px-1 py-1">
                        <span className="text-white/40 text-[9px] block mb-1">description:</span>
                        <span className="text-white/50 text-[10px] leading-relaxed block">{project.details}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </TerminalCard>

      <TerminalCard title="Education.sh" icon="school" variant="secondary">
        <div className="font-mono text-[12px] p-4 flex flex-col gap-3">
          {education.map((edu, i) => (
            <div key={i} className="border border-white/5 rounded p-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[14px]">{edu.icon}</span>
                <span className="text-secondary font-bold text-[11px]">{edu.degree}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="material-symbols-outlined text-white/30 text-[10px]">school</span>
                <span className="text-white/50">{edu.school}</span>
              </div>
              <div className="flex items-center gap-4 text-[9px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-white/30 text-[9px]">calendar_today</span>
                  <span className="text-white/30">{edu.year}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-white/30 text-[9px]">stars</span>
                  <span className="text-amber-400/80">{edu.score}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </TerminalCard>
    </>
  );
}
