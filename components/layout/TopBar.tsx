'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import cn from 'classnames';
import Image from 'next/image';
import { navItems } from '@/content/nav';
import { profile } from '@/content/profile';
import { useActiveSection } from '@/lib/useActiveSection';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { MenuIcon } from '@/components/ui/Icons';
import { ButtonLink } from '@/components/ui/Button';

const ids = navItems.map((n) => n.id);

export function TopBar() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const current = navItems.find((n) => n.id === active)?.label ?? 'Home';

  return (
    <>
      <header className={cn('sticky top-0 z-40 transition-[padding] duration-300', scrolled ? 'pt-2' : 'pt-3 md:pt-4')}>
        <div className="container-x">
          <div className={cn('glass-bar flex h-14 md:h-16 items-center justify-between gap-3 px-4 md:px-5', scrolled && 'shadow-lg')}>
            <a href="#home" aria-label={`${profile.shortName} — home`} className="flex items-center">
              <Image src="/lockup-dark.png" alt={profile.shortName} width={1491} height={380} priority className="lockup-dark h-8 w-auto md:h-9" />
              <Image src="/lockup-light.png" alt="" width={1491} height={380} priority className="lockup-light h-8 w-auto md:h-9" />
            </a>

            <nav aria-label="Primary" className="hidden md:flex items-center gap-0 lg:gap-1">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'page' : undefined}
                  className={cn('relative px-2 lg:px-3 py-2 text-[13px] lg:text-[13.5px] transition-colors duration-300', active === n.id ? 'text-text' : 'text-muted hover:text-text')}
                >
                  {n.label}
                  {active === n.id && (
                    <motion.span layoutId="nav-underline" className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-accent-2" transition={{ type: 'spring', stiffness: 400, damping: 36 }} />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <span className="md:hidden text-[12px] text-muted mr-1" aria-live="polite">
                {current}
              </span>
              <ThemeToggle />
              <ButtonLink href="#contact" className="hidden xl:inline-flex">
                Hire me
              </ButtonLink>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)]"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>{open && <MobileMenu active={active} onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
