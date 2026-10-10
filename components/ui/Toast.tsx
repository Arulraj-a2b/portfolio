'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import cn from 'classnames';
import { CheckIcon, CloseIcon } from './Icons';

export type ToastState = { kind: 'success' | 'error'; message: string } | null;

export function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(onDismiss, 4500);
    return () => clearTimeout(id);
  }, [toast, onDismiss]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className={cn('glass fixed bottom-5 left-1/2 z-[70] -translate-x-1/2 flex items-center gap-3 px-4 py-3 text-[14px] max-w-[calc(100vw-32px)]', toast.kind === 'success' ? 'text-success' : 'text-error')}
        >
          {toast.kind === 'success' ? <CheckIcon /> : <CloseIcon />}
          <span className="text-text">{toast.message}</span>
          <button type="button" onClick={onDismiss} aria-label="Dismiss" className="ml-1 text-muted hover:text-text">
            <CloseIcon width={16} height={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
