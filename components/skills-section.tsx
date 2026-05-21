'use client';

import { TerminalCard } from './terminal-card';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'TypeScript', level: 92, category: 'frontend', icon: 'javascript' },
  { name: 'React', level: 85, category: 'frontend', icon: 'code' },
  { name: 'Angular', level: 80, category: 'frontend', icon: 'code' },
  { name: 'Tailwind', level: 85, category: 'frontend', icon: 'palette' },
  { name: 'Java/Kotlin', level: 95, category: 'backend', icon: 'terminal' },
  { name: 'Spring Boot', level: 92, category: 'backend', icon: 'terminal' },
  { name: 'Python', level: 75, category: 'backend', icon: 'vital_signs' },
  { name: 'PostgreSQL', level: 80, category: 'backend', icon: 'database' },
  { name: 'Docker', level: 80, category: 'devops', icon: 'deployed_code' },
  { name: 'Kubernetes', level: 70, category: 'devops', icon: 'deployed_code' },
  { name: 'AWS', level: 78, category: 'devops', icon: 'cloud' },
  { name: 'Terraform', level: 72, category: 'devops', icon: 'cloud' },
  { name: 'Wireshark', level: 75, category: 'security', icon: 'security' },
  { name: 'OWASP ZAP', level: 72, category: 'security', icon: 'security' },
  { name: 'Burp Suite', level: 70, category: 'security', icon: 'security' },
  { name: 'Kafka/SNS', level: 65, category: 'backend', icon: 'data_exploration' },
  { name: 'PyTorch', level: 60, category: 'ai', icon: 'neurology' },
  { name: 'Scikit-learn', level: 65, category: 'ai', icon: 'neurology' },
];

const categories = ['backend', 'frontend', 'devops', 'security', 'ai'] as const;

const categoryColors: Record<string, { text: string; textMuted: string; border: string; bar: string }> = {
  frontend: { text: 'text-amber-400', textMuted: 'text-amber-400/60', border: 'border-amber-500/30', bar: 'from-amber-500/60 to-amber-400/80' },
  backend: { text: 'text-cyan-400', textMuted: 'text-cyan-400/60', border: 'border-cyan-500/30', bar: 'from-cyan-500/60 to-cyan-400/80' },
  devops: { text: 'text-purple-400', textMuted: 'text-purple-400/60', border: 'border-purple-500/30', bar: 'from-purple-500/60 to-purple-400/80' },
  security: { text: 'text-rose-400', textMuted: 'text-rose-400/60', border: 'border-rose-500/30', bar: 'from-rose-500/60 to-rose-400/80' },
  ai: { text: 'text-emerald-400', textMuted: 'text-emerald-400/60', border: 'border-emerald-500/30', bar: 'from-emerald-500/60 to-emerald-400/80' },
};

export function SkillsSection() {
  return (
    <TerminalCard title="Skills.sh" icon="category" className="md:col-span-4">
      <div className="font-mono text-[12px] p-4 space-y-0 flex flex-col flex-1 overflow-hidden">
        <div className="overflow-y-auto flex-1 max-h-[520px]">
          <div className="space-y-4">
            {categories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              const color = categoryColors[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={color.textMuted}>[</span>
                    <span className={`text-[10px] uppercase tracking-widest ${color.text} font-bold`}>{cat}</span>
                    <span className={color.textMuted}>]</span>
                  </div>
                  <div className="space-y-1.5">
                    {catSkills.map((skill) => {
                      return (
                        <div key={skill.name} className="flex items-center gap-1.5 pl-2 group/skill cursor-default hover:bg-white/[0.02] transition-colors rounded">
                          <span className={`${color.text} text-[10px]`}>&gt;</span>
                          <span className={`material-symbols-outlined ${color.text}/40 group-hover/skill:${color.text} text-[12px] transition-all duration-200`}>{skill.icon}</span>
                          <span className="text-white/50 group-hover/skill:text-white/90 text-[10px] w-16 flex-shrink-0 transition-colors duration-200">{skill.name}</span>
                          <span className={`${color.text}/30 group-hover/skill:${color.text} text-[9px] transition-all duration-200`}>{String(skill.level).padStart(2, '0')}%</span>
                          <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${color.bar} rounded transition-all duration-500 opacity-60 group-hover/skill:opacity-100`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TerminalCard>
  );
}
