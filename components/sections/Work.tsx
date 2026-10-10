'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { projectCategories, projectList, type Project } from '@/content/projects';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChipButton, Chip } from '@/components/ui/Chip';
import { ProjectCard, linkIcon } from '@/components/ui/ProjectCard';
import { Modal } from '@/components/ui/Modal';
import { ButtonLink } from '@/components/ui/Button';

export function Work() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]['id']>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const items = useMemo(() => (filter === 'all' ? projectList : projectList.filter((p) => p.categories.includes(filter))), [filter]);

  return (
    <Section id="work">
      <div className="glass px-6 py-10 sm:px-8 md:px-12 md:py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeading number="04" eyebrow="Work" title="Things I've shipped" lead="Platforms, apps and libraries. Independent projects are listed as projects, not jobs." />
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 lg:mb-10 [mask-image:linear-gradient(90deg,transparent,#000_12px,#000_calc(100%-12px),transparent)]" role="group" aria-label="Filter projects">
            {projectCategories.map((c) => (
              <ChipButton key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                {c.label}
              </ChipButton>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid gap-4 md:gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((p) => (
                <ProjectCard key={p.slug} project={p} onOpen={setOpen} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      <AnimatePresence>{open && <ProjectDialog project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const src = project.media?.mp4 ?? project.media?.legacy;
  return (
    <Modal title={project.title} onClose={onClose}>
      <div className="grid md:grid-cols-12">
        <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[420px] bg-black/30">
          {src ? (
            <video src={src} poster={project.media?.poster} controls playsInline preload={project.media?.heavy ? 'none' : 'metadata'} className="absolute inset-0 h-full w-full object-contain bg-black/40" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `radial-gradient(70% 70% at 30% 30%, color-mix(in srgb, ${project.accent} 50%, transparent), transparent 70%)` }}>
              <span className="display text-[28px] font-semibold px-8 text-center">{project.title}</span>
            </div>
          )}
        </div>
        <div className="md:col-span-5 p-6 md:p-8 flex flex-col gap-5">
          <div>
            <p className="mono text-[11px] tracking-[0.18em] uppercase text-accent-2">{project.dates ?? 'Independent project'}</p>
            <h3 className="mt-2 text-[24px] md:text-[28px] font-bold">{project.title}</h3>
            <p className="mt-3 text-[15px] text-muted">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <Chip key={t} tone="tech">
                {t}
              </Chip>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.links.map((l, i) => {
              const Icon = linkIcon[l.type];
              return (
                <ButtonLink key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" variant={i === 0 ? 'primary' : 'outline'}>
                  <Icon width={18} height={18} /> {l.type}
                </ButtonLink>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}
