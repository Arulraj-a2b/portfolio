'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { CloseIcon } from './Icons';
import { EASE } from '@/lib/motion';
import { useIsTablet } from '@/lib/useMediaQuery';

/** Centred dialog on tablet+, full-screen bottom sheet (swipe down to close) on phones. */
export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const tablet = useIsTablet();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const returnTo = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('button, a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panel.current) {
        const items = Array.from(
          panel.current.querySelectorAll<HTMLElement>(
            'a[href], button, video, [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      returnTo?.focus?.();
    };
  }, [onClose]);

  const sheet = !tablet;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="glass relative w-full md:max-w-[960px] max-h-[94svh] md:max-h-[90vh] overflow-y-auto rounded-t-[var(--radius-lg)] md:rounded-[var(--radius-lg)] pb-[env(safe-area-inset-bottom)]"
        initial={sheet ? { y: '100%' } : { opacity: 0, scale: 0.96, y: 12 }}
        animate={sheet ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
        exit={sheet ? { y: '100%' } : { opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.35, ease: EASE }}
        drag={sheet ? 'y' : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={(_, info) => sheet && info.offset.y > 120 && onClose()}
      >
        {sheet && <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-[var(--glass-border)]" />}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60"
        >
          <CloseIcon />
        </button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
