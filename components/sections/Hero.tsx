'use client';

import { motion } from 'motion/react';
import { profile } from '@/content/profile';
import { ButtonLink } from '@/components/ui/Button';
import { IconLink } from '@/components/ui/IconLink';
import { TypedText } from '@/components/ui/TypedText';
import { AvatarOrb } from '@/components/avatar/AvatarOrb';
import dynamic from 'next/dynamic';

const HeroOrbit = dynamic(() => import('@/components/scene/HeroOrbit').then((m) => m.HeroOrbit), {
  ssr: false,
});
import {
  ChevronDownIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from '@/components/ui/Icons';
import { EASE, fadeUp, stagger } from '@/lib/motion';

const words = profile.name.split(' ');

export function Hero() {
  return (
    <section id="home" className="relative pt-6 md:pt-10 pb-8 md:pb-12">
      <div className="container-x">
        <motion.div
          className="glass relative overflow-hidden px-6 py-10 sm:px-8 md:px-12 md:py-14 lg:px-16 lg:py-20 min-h-[calc(100svh-140px)] md:min-h-0 flex items-center"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="relative grid w-full gap-10 lg:grid-cols-12 lg:items-center">
            <motion.div
              variants={stagger(0.06, 0.2)}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left min-w-0"
            >
              <motion.p
                variants={fadeUp}
                className="mono text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-accent-2"
              >
                Hello, I&apos;m
              </motion.p>
              <h1 className="mt-3 text-[clamp(40px,10vw,56px)] md:text-[60px] lg:text-[clamp(44px,4.6vw,72px)] font-bold break-words">
                {words.map((w, i) => (
                  <motion.span key={i} variants={fadeUp} className="inline-block mr-[0.25em] last:mr-0">
                    {w}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                variants={fadeUp}
                className="mt-4 text-[18px] md:text-[22px] lg:text-[26px] text-muted min-h-[1.6em]"
              >
                <TypedText phrases={profile.roles} />
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-[56ch] mx-auto lg:mx-0 text-[15px] md:text-[17px] text-muted"
              >
                {profile.tagline}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <ButtonLink href="#contact" size="lg">
                  Hire me
                </ButtonLink>
                <ButtonLink href={profile.resumeUrl} variant="outline" size="lg" download>
                  <DownloadIcon /> Download CV
                </ButtonLink>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 flex gap-2 justify-center lg:justify-start">
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
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              <div className="relative flex shrink-0 items-center justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[min(460px,34vw)] lg:h-[min(460px,34vw)]">
                <div className="absolute inset-0" aria-hidden="true">
                  <HeroOrbit count={8} />
                </div>
                <AvatarOrb size={140} className="md:hidden" />
                <AvatarOrb size={180} className="hidden md:block lg:hidden" />
                <AvatarOrb size={230} className="hidden lg:block" />
              </div>
            </motion.div>
          </div>

          <a
            href="#about"
            aria-label="Scroll to about"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:inline-flex text-muted hover:text-text animate-bounce"
          >
            <ChevronDownIcon />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
