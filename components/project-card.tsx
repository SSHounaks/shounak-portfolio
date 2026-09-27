'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { techList, type Project } from '@/lib/projects';
import { TechIcon } from '@/components/tech-icon';
import { techBrandColor } from '@/lib/tech-icons';

const accentColors = [
  { border: 'border-cyan-500/15 hover:border-cyan-500/40', text: 'text-cyan-400' },
  { border: 'border-emerald-500/15 hover:border-emerald-500/40', text: 'text-emerald-400' },
  { border: 'border-amber-500/15 hover:border-amber-500/40', text: 'text-amber-400' },
  { border: 'border-purple-500/15 hover:border-purple-500/40', text: 'text-purple-400' },
];

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [imgError, setImgError] = useState(false);
  const accent = accentColors[index % accentColors.length];
  const techs = techList(project.technologies);

  return (
    <article
      className={cn(
        'group/card relative rounded-lg border overflow-hidden flex flex-col bg-black/40 backdrop-blur-md transition-all duration-300',
        accent.border,
      )}
    >
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.04]">
        <div className="w-2 h-2 rounded-full bg-white/10 group-hover/card:bg-red-500/60 transition-colors duration-200" />
        <div className="w-2 h-2 rounded-full bg-white/10 group-hover/card:bg-yellow-500/60 transition-colors duration-200" />
        <div className="w-2 h-2 rounded-full bg-white/10 group-hover/card:bg-emerald-500/60 transition-colors duration-200" />
      </div>

      <div className="aspect-video relative overflow-hidden bg-zinc-950 border-b border-white/[0.04]">
        {project.video ? (
          <video
            src={project.video}
            poster={!imgError ? project.image : undefined}
            controls
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : !imgError ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover/card:scale-105 group-hover/card:brightness-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
            <img
              src="/am.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20 scale-150"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className={cn('relative font-mono text-xs uppercase tracking-widest', accent.text)}>
              {project.name}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <h2 className={cn('font-mono text-[13px] font-bold leading-snug', accent.text)}>{project.name}</h2>
          <div className="shrink-0 flex items-center gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} page`}
                title="Open project page"
                className="inline-block p-2.5 -m-2.5 text-white/55 hover:text-cyan-400 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] align-middle">extension</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.name}`}
                title="View source"
                className="inline-block p-2.5 -m-2.5 text-white/55 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] align-middle">code</span>
              </a>
            )}
          </div>
        </div>

        <p className="text-[11px] text-white/50 leading-relaxed font-mono flex-1">{project.description}</p>

        {project.joke && (
          <div className="relative rounded-md border-2 border-dashed border-fuchsia-500/40 bg-fuchsia-500/[0.04] px-3 py-2 group-hover/card:border-fuchsia-400/70 transition-colors">
            <span className="absolute -top-2 left-2 px-1 bg-black/60 font-mono text-xs uppercase tracking-widest text-fuchsia-400/70">
              joke.exe
            </span>
            <p className="font-mono text-xs leading-relaxed text-fuchsia-300/70 pt-1">
              {project.joke}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/[0.04]">
          {techs.map((tech) => (
            <TechIcon
              key={tech}
              tech={tech}
              label
              color={techBrandColor(tech)}
              className="h-4 w-auto"
            />
          ))}
        </div>
      </div>
    </article>
  );
}
