'use client';

import { TerminalCard } from './terminal-card';

interface Skill {
  name: string;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'TypeScript', category: 'frontend', icon: 'javascript' },
  { name: 'Angular', category: 'frontend', icon: 'code' },
  { name: 'HTML/CSS/JS', category: 'frontend', icon: 'web' },
  { name: 'AstroJS', category: 'frontend', icon: 'rocket_launch' },
  { name: 'SolidStart', category: 'frontend', icon: 'rocket_launch' },
  { name: 'React', category: 'frontend', icon: 'code' },
  { name: 'Next.js', category: 'frontend', icon: 'rocket_launch' },
  { name: 'Java', category: 'backend', icon: 'terminal' },
  { name: 'Kotlin', category: 'backend', icon: 'terminal' },
  { name: 'Python', category: 'backend', icon: 'vital_signs' },
  { name: 'SQL', category: 'backend', icon: 'database' },
  { name: 'Spring', category: 'backend', icon: 'terminal' },
  { name: 'Spring Boot', category: 'backend', icon: 'terminal' },
  { name: 'Hibernate', category: 'backend', icon: 'database' },
  { name: 'Node.js', category: 'backend', icon: 'code' },
  { name: 'GraphQL', category: 'backend', icon: 'api' },
  { name: 'Swagger', category: 'backend', icon: 'description' },
  { name: 'Groovy', category: 'backend', icon: 'terminal' },
  { name: 'Junit', category: 'backend', icon: 'check_circle' },
  { name: 'Mockito', category: 'backend', icon: 'fact_check' },
  { name: 'Ruby on Rails', category: 'backend', icon: 'terminal' },
  { name: 'MySQL', category: 'backend', icon: 'database' },
  { name: 'Postgres', category: 'backend', icon: 'database' },
  { name: 'OracleDB', category: 'backend', icon: 'database' },
  { name: 'AWS Aurora', category: 'backend', icon: 'database' },
  { name: 'AWS Dynamo', category: 'backend', icon: 'database' },
  { name: 'NoSQL', category: 'backend', icon: 'database' },
  { name: 'Railway', category: 'backend', icon: 'database' },
  { name: 'ElastiSearch', category: 'backend', icon: 'database' },
  { name: 'Docker', category: 'devops', icon: 'deployed_code' },
  { name: 'Kubernetes', category: 'devops', icon: 'deployed_code' },
  { name: 'Jenkins', category: 'devops', icon: 'build_circle' },
  { name: 'Istio', category: 'devops', icon: 'science' },
  { name: 'Kafka/SNS', category: 'devops', icon: 'data_exploration' },
  { name: 'SonarQube', category: 'devops', icon: 'bug_report' },
  { name: 'Terraform', category: 'devops', icon: 'deployed_code' },
  { name: 'AWS', category: 'devops', icon: 'cloud' },
  { name: 'GCP', category: 'devops', icon: 'cloud' },
  { name: 'Azure CLI', category: 'devops', icon: 'cloud' },
  { name: 'Azure', category: 'devops', icon: 'cloud' },
  { name: 'IAM', category: 'devops', icon: 'admin_panel_settings' },
  { name: 'Wireshark', category: 'security', icon: 'security' },
  { name: 'OWASP ZAP', category: 'security', icon: 'security' },
  { name: 'Burp Suite', category: 'security', icon: 'security' },
  { name: 'Nmap', category: 'security', icon: 'travel_explore' },
  { name: 'Security Onion', category: 'security', icon: 'layers' },
  { name: 'Autopsy', category: 'security', icon: 'search_insights' },
  { name: 'Volatility3', category: 'security', icon: 'psychology' },
  { name: 'Keycloak', category: 'security', icon: 'lock' },
  { name: 'PyTorch', category: 'ai', icon: 'neurology' },
  { name: 'Scikit-learn', category: 'ai', icon: 'neurology' },
  { name: 'pandas', category: 'ai', icon: 'table' },
  { name: 'NumPy', category: 'ai', icon: 'grid_view' },
  { name: 'Matplotlib', category: 'ai', icon: 'bar_chart' },
  { name: 'Seaborn', category: 'ai', icon: 'monitoring' },
  { name: 'imbalanced-learn', category: 'ai', icon: 'neurology' },
  { name: 'Requests', category: 'ai', icon: 'link' },
  { name: 'Struct', category: 'ai', icon: 'data_object' },
  { name: 'RovoDev', category: 'agentic', icon: 'smart_toy' },
  { name: 'ClaudeCode', category: 'agentic', icon: 'smart_toy' },
  { name: 'OpenCode', category: 'agentic', icon: 'smart_toy' },
  { name: 'ChatGPT', category: 'agentic', icon: 'smart_toy' },
  { name: 'Antigravity', category: 'agentic', icon: 'smart_toy' },
  { name: 'Stitch', category: 'agentic', icon: 'smart_toy' },
  { name: 'v0', category: 'agentic', icon: 'smart_toy' },
];

const categories = ['backend', 'frontend', 'devops', 'security', 'ai', 'agentic'] as const;

const categoryMeta: Record<string, { text: string; icon: string }> = {
  frontend: { text: 'text-amber-400', icon: 'code' },
  backend: { text: 'text-cyan-400', icon: 'terminal' },
  devops: { text: 'text-purple-400', icon: 'cloud' },
  security: { text: 'text-rose-400', icon: 'security' },
  ai: { text: 'text-emerald-400', icon: 'neurology' },
  agentic: { text: 'text-sky-400', icon: 'smart_toy' },
};

export function SkillsSection() {
  return (
    <TerminalCard title="Skills.sh" icon="category" className="flex-1 min-h-0">
      <div className="font-mono text-[12px] p-4 flex flex-col flex-1 overflow-hidden">
        <div className="overflow-y-auto flex-1">
          <div className="space-y-6">
            {categories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              const meta = categoryMeta[cat];

              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`material-symbols-outlined ${meta.text} text-[14px]`}>{meta.icon}</span>
                    <span className={`${meta.text} text-[11px] font-bold uppercase tracking-[0.15em]`}>
                      {cat}
                    </span>
                  </div>
                  <div className="pl-4 text-white/50 text-[11px] leading-relaxed">
                    {catSkills.map((s, i) => (
                      <span key={s.name}>
                        {i > 0 && <span>, </span>}
                        <span className={`transition-colors duration-200 cursor-default hover:${meta.text}`}>
                          {s.name}
                        </span>
                      </span>
                    ))}
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
