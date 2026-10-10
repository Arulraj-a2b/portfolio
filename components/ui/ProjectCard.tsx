'use client';

import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import type { Project } from '@/content/projects';
import { Chip } from './Chip';
import { AndroidIcon, AppleIcon, CodeIcon, ExternalIcon, PlayIcon } from './Icons';
import { usePointerFine } from '@/lib/useMediaQuery';
import { EASE } from '@/lib/motion';

export const linkIcon = { Website: ExternalIcon, Android: AndroidIcon, iOS: AppleIcon, Source: CodeIcon } as const;

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const fine = usePointerFine();
  const [posterOk, setPosterOk] = useState(true);
  const src = project.media?.mp4 ?? project.media?.legacy;
  const canHover = fine && !!src && !project.media?.heavy;

  const play = () => {
    if (!canHover || !video.current) return;
    video.current.play().catch(() => {});
  };
  const pause = () => {
    if (!video.current) return;
    video.current.pause();
    video.current.currentTime = 0;
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE }}
      whileHover={{ y: -6 }}
      className="glass-2 group overflow-hidden flex flex-col"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
    >
      <button type="button" onClick={() => onOpen(project)} className="relative block w-full aspect-[16/10] overflow-hidden text-left" aria-label={`Open ${project.title}`}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(80% 80% at 30% 20%, color-mix(in srgb, ${project.accent} 45%, transparent), transparent 70%), var(--glass-2)` }} />
        {project.media?.poster && posterOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.media.poster} alt="" loading="lazy" onError={() => setPosterOk(false)} className="absolute inset-0 h-full w-full object-cover" />
        )}
        {canHover && (
          <video ref={video} src={src} muted playsInline loop preload="none" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        )}
        {!project.media?.poster || !posterOk ? (
          <span className="absolute inset-0 flex items-center justify-center display text-[22px] font-semibold text-text/80 px-6 text-center">{project.title}</span>
        ) : null}
        {src && (
          <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur">
            <PlayIcon width={16} height={16} />
          </span>
        )}
      </button>
      <div className="p-4 md:p-5 flex flex-col gap-3 grow">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[16px] md:text-[17px] font-semibold">{project.title}</h3>
            {project.dates && <span className="mono text-[11px] text-muted whitespace-nowrap">{project.dates}</span>}
          </div>
          <p className="mt-1 text-[13.5px] text-muted">{project.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <Chip key={t} tone="tech">
              {t}
            </Chip>
          ))}
          {project.technologies.length > 4 && <Chip>+{project.technologies.length - 4}</Chip>}
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex gap-1">
            {project.links.map((l) => {
              const Icon = linkIcon[l.type];
              return (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on ${l.type}`} title={l.type} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-text hover:bg-[var(--glass-2)]">
                  <Icon width={18} height={18} />
                </a>
              );
            })}
          </div>
          <button type="button" onClick={() => onOpen(project)} className="text-[13px] text-accent-2 hover:underline underline-offset-4">
            Details →
          </button>
        </div>
      </div>
    </motion.article>
  );
}
