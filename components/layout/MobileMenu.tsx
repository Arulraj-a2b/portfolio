'use client';

import { useEffect, useRef, type SVGProps } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import cn from 'classnames';
import Image from 'next/image';
import { navItems } from '@/content/nav';
import { profile } from '@/content/profile';
import {
  BriefcaseIcon,
  FileIcon,
  CloseIcon,
  GitHubIcon,
  GridIcon,
  HomeIcon,
  LinkedInIcon,
  MailIcon,
  MoonIcon,
  SunIcon,
  ToolIcon,
  UserIcon,
  WhatsAppIcon,
} from '@/components/ui/Icons';
import { useTheme } from '@/lib/useTheme';
import { EASE } from '@/lib/motion';
import { scrollTargetFor } from '@/lib/scrollTarget';

const navIcons: Record<string, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  home: HomeIcon,
  about: UserIcon,
  skills: ToolIcon,
  work: GridIcon,
  experience: FileIcon,
  services: BriefcaseIcon,
  contact: MailIcon,
};

const row =
  'flex h-11 items-center gap-3 rounded-l-full pl-5 pr-6 text-[15px] font-medium text-white/85 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 active:bg-white/15';
const social =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/85 hover:bg-white/10';

/**
 * Right side menu. The menu is the full-height background; the page (`.page-shell`) slides left as a smaller
 * rounded card while `html[data-menu='open']` is set (see globals.css). Scrolling is locked (see SmoothScroll).
 */
export function MobileMenu({ active, onClose }: { active: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  /** Hash of the link that closed the menu; scrolled to once the page is released. */
  const pendingHash = useRef<string | null>(null);
  const navigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    pendingHash.current = e.currentTarget.getAttribute('href');
    onClose();
  };
  const { theme, toggle: toggleTheme } = useTheme();

  // Lock the page under the menu. Runs once per open; overflow:hidden alone is ignored by touch scrolling on
  // iOS, so the body is pinned and the scroll position restored on close.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prevStyle = body.getAttribute('style');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    // Scale the page around the centre of the current viewport, not the centre of the whole document.
    html.style.setProperty('--menu-origin-y', `${scrollY + window.innerHeight / 2}px`);
    html.dataset.menu = 'open';
    panel.current?.querySelector<HTMLElement>('a,button')?.focus();

    const onTouchMove = (e: TouchEvent) => {
      if (!panel.current?.contains(e.target as Node)) e.preventDefault();
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      document.removeEventListener('touchmove', onTouchMove);
      delete html.dataset.menu;
      html.style.removeProperty('--menu-origin-y');
      if (prevStyle === null) body.removeAttribute('style');
      else body.setAttribute('style', prevStyle);
      window.scrollTo({ top: scrollY, behavior: 'auto' });
      const hash = pendingHash.current;
      if (!hash) return;
      pendingHash.current = null;
      if (html.classList.contains('lenis')) {
        // Two frames later: Lenis restarts on the data-menu change and absorbs the native scroll event from the
        // restore above first; dispatching earlier makes it fight that event and stop short.
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            window.dispatchEvent(new CustomEvent('menu:navigate', { detail: hash })),
          ),
        );
      } else {
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const top = scrollTargetFor(hash);
            if (top !== null) window.scrollTo({ top, behavior: 'smooth' });
            history.replaceState(null, '', hash);
          }),
        );
      }
    };
  }, []);

  useEffect(() => {
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
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button type="button" aria-label="Close menu" className="absolute inset-0" onClick={onClose} />

      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="menu-panel absolute inset-y-0 right-0 flex w-[70%] max-w-[320px] flex-col pl-3 pt-[max(28px,env(safe-area-inset-top))] pb-[max(24px,env(safe-area-inset-bottom))]"
        initial={{ x: 32, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 32, opacity: 0 }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-4 top-[max(16px,env(safe-area-inset-top))] inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        >
          <CloseIcon width={18} height={18} />
        </button>
        <div className="mt-8 flex items-center gap-3 pr-6">
          <Image
            src={profile.avatarCircleUrl}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-white/40"
          />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold leading-tight text-white">{profile.name}</p>
            <p className="text-[12px] text-white/70">{profile.roleShort}</p>
          </div>
        </div>
        <div className="mr-6 mt-6 h-px bg-white/15" />

        <nav aria-label="Primary" className="mt-4 flex flex-col gap-1">
          {navItems.map((n, i) => {
            const Icon = navIcons[n.id] ?? HomeIcon;
            const isActive = active === n.id;
            return (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={navigate}
                aria-current={isActive ? 'page' : undefined}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.04, duration: 0.28, ease: EASE }}
                className={cn(row, isActive && 'menu-active')}
              >
                <Icon width={18} height={18} />
                {n.label}
              </motion.a>
            );
          })}
        </nav>

        <div className="mr-6 mt-5 h-px bg-white/15" />
        <div className="mt-4 flex flex-col gap-1">
          <a href={profile.resumeUrl} download className={row}>
            <FileIcon width={18} height={18} /> Download CV
          </a>
          <button type="button" onClick={toggleTheme} className={cn(row, 'text-left')}>
            {theme === 'light' ? <MoonIcon width={18} height={18} /> : <SunIcon width={18} height={18} />}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>

        <div className="mt-auto flex items-center gap-2 pr-6">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={social}
          >
            <GitHubIcon width={16} height={16} />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={social}
          >
            <LinkedInIcon width={16} height={16} />
          </a>
          <a
            href={profile.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={social}
          >
            <WhatsAppIcon width={16} height={16} />
          </a>
          <a
            href="#contact"
            onClick={navigate}
            className="ml-auto rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#1e1b4b]"
          >
            Hire me
          </a>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
