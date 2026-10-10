'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { profile } from '@/content/profile';
import { IconLink } from '@/components/ui/IconLink';
import { ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from '@/components/ui/Icons';

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="container-x pb-8 pt-4">
      <div className="glass flex flex-col-reverse sm:flex-row items-center justify-between gap-4 px-5 py-4 text-center sm:text-left">
        <p className="text-[13px] text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
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
          <IconLink href={`mailto:${profile.social.email}`} label="Email">
            <MailIcon />
          </IconLink>
        </div>
      </div>
      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#home"
            aria-label="Back to top"
            className="glass fixed bottom-5 right-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full text-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <ArrowUpIcon />
          </motion.a>
        )}
      </AnimatePresence>
    </footer>
  );
}
