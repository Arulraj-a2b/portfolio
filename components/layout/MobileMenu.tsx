'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import cn from 'classnames';
import Image from 'next/image';
import { navItems } from '@/content/nav';
import { profile } from '@/content/profile';
import { CloseIcon, GitHubIcon, LinkedInIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { IconLink } from '@/components/ui/IconLink';
import { ButtonLink } from '@/components/ui/Button';
import { EASE } from '@/lib/motion';

export function MobileMenu({ active, onClose }: { active: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = panel.current?.querySelector<HTMLElement>('a,button');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('a,button');
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="glass absolute inset-x-2 bottom-2 rounded-[var(--radius-lg)] p-4 pb-[max(16px,env(safe-area-inset-bottom))]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.4 }}
        onDragEnd={(_, info) => info.offset.y > 80 && onClose()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--glass-border)]" />
        <div className="flex items-center justify-between mb-2">
          <span className="display flex items-center gap-2 text-[16px] font-semibold">
            <Image src="/logo.svg" alt="" width={26} height={26} className="h-[26px] w-[26px]" />
            <span>
              {profile.shortName}
              <span className="text-accent-2">.</span>
            </span>
          </span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)]">
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Primary" className="grid grid-cols-2 gap-2">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={onClose}
              aria-current={active === n.id ? 'page' : undefined}
              className={cn('h-12 flex items-center rounded-[var(--radius)] px-4 text-[15px] border transition-colors', active === n.id ? 'bg-accent text-on-accent border-transparent' : 'glass-2 text-text')}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <IconLink href={profile.social.github} label="GitHub">
              <GitHubIcon />
            </IconLink>
            <IconLink href={profile.social.linkedin} label="LinkedIn">
              <LinkedInIcon />
            </IconLink>
            <IconLink href={profile.social.whatsapp} label="WhatsApp">
              <WhatsAppIcon />
            </IconLink>
          </div>
          <ButtonLink href="#contact" onClick={onClose}>
            Hire me
          </ButtonLink>
        </div>
      </motion.div>
    </motion.div>
  );
}
