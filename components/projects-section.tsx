'use client';

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
    metric: 'High Distinction | WAM: 84.5',
    icon: 'security',
    focus: ['Network Defense', 'Cloud Security Architecture', 'Cryptography', 'Threat Intelligence', 'Python for SecOps'],
  },
  {
    degree: 'B.E. in Computer Science',
    school: 'DIEMS, Chh. Sambhajinagar',
    year: '2020',
    metric: 'Distinction',
    icon: 'computer',
    focus: ['Data Structures & Algorithms', 'Database Systems', 'OS Fundamentals', 'Java & C++', 'Web Development'],
  },
];

export function ProjectsSection() {
  return (
    <>
      <TerminalCard title="Open-Source.sh" icon="folder_open" variant="primary">
        <div className="font-mono text-[12px] p-4 flex flex-col flex-1 overflow-hidden">
          <div className="border border-white/5 rounded overflow-y-auto flex-1 relative">
            <div className="absolute left-[16px] top-3 bottom-3 w-[2px] pointer-events-none">
              <div className="h-full w-full border-l-2 border-emerald-500/30 border-dashed" />
            </div>
            {projects.map((project, index) => (
              <details key={index} name="os" className="group">
                <summary className="p-3 hover:bg-emerald-500/[0.02] transition-colors cursor-pointer relative flex items-start gap-3 list-none [&::-webkit-details-marker]:hidden">
                  <div className="shrink-0 mt-[10px] relative z-10">
                    <div className="w-[9px] h-[9px] rounded-full border-2 border-emerald-500/60 bg-emerald-500/10 group-hover:bg-emerald-500/40 transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-300/90 font-bold text-[11px] truncate group-hover:text-emerald-200 transition-colors">
                            {project.title}
                          </span>
                          <span className="ml-auto text-[10px] transition-transform duration-200 group-open:rotate-90 shrink-0">
                            <span className="material-symbols-outlined text-emerald-400/60 text-[12px]">chevron_right</span>
                          </span>
                        </div>
                        <div className="text-white/30 text-[9px] font-normal truncate mt-0.5">
                          — {project.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
                <div className="px-3 pb-3 pt-0 border-t border-emerald-500/10 ml-[33px] mr-3">
                  <div className="pt-3 space-y-2 text-[10px]">
                    <div className="flex items-center gap-2 px-1 py-1 bg-white/[0.02] rounded border border-white/5">
                      <span className="text-cyan-400/60 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">deployed_code</span>
                      </span>
                      <span className="text-white/40">tech:</span>
                      <span className="text-cyan-400/80 text-[10px] font-medium">{project.tech}</span>
                    </div>
                    <div className="flex items-center gap-2 px-1 py-1 bg-white/[0.02] rounded border border-white/5">
                      <span className="text-amber-400/60 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">link</span>
                      </span>
                      <span className="text-white/40">repo:</span>
                      <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-amber-400/80 text-[10px] underline underline-offset-2 hover:text-amber-300 transition-colors">{project.link}</a>
                    </div>
                    <div className="px-1 py-1">
                      <span className="text-white/40 block mb-1">description:</span>
                      <span className="text-white/50 leading-relaxed block">{project.details}</span>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </TerminalCard>

      <TerminalCard title="Education.sh" icon="school" variant="secondary">
        <div className="font-mono text-[12px] p-4 flex flex-col gap-4">
          {education.map((edu, i) => {
            const isMasters = i === 0;
            return (
              <div key={i} className="group/card border border-white/[0.06] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[18px]">{edu.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-secondary font-bold text-[13px] leading-tight">{edu.degree}</div>
                    <div className="text-white/40 text-[10px] mt-0.5">{edu.school}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-amber-400/90 text-[11px] font-mono font-bold">{edu.year}</div>
                    <div className="text-white/20 text-[8px] uppercase tracking-wider">Completed</div>
                  </div>
                </div>

                <div className="mb-3 w-full">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-white/30 text-[9px]">[</span>
                    <span className="text-white/40 text-[9px] uppercase tracking-wider font-bold">
                      {isMasters ? 'KEY FOCUS AREAS' : 'FOUNDATION SKILLS'}
                    </span>
                    <span className="text-white/30 text-[9px]">]</span>
                  </div>
                  <div className="text-white/50 text-[10px] leading-relaxed">
                    {edu.focus?.map((f, j) => (
                      <span key={j}>
                        {j > 0 && <span className="text-white/20 mx-1">•</span>}
                        <span className="group-hover/card:text-white/70 transition-colors duration-75">{f}</span>
                      </span>
                    ))}
                  </div>
                </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04]">
                  <span className="text-white/30 text-[9px]">Performance Metric:</span>
                  <span className="text-amber-400/90 text-[10px] font-mono font-bold">{edu.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </TerminalCard>
    </>
  );
}
