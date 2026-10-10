'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/useMediaQuery';

/** Types each phrase, pauses, deletes, and moves on. Static list under reduced motion. */
export function TypedText({ phrases, className = '' }: { phrases: string[]; className?: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const full = phrases[i % phrases.length];
    let delay = deleting ? 32 : 58;
    if (!deleting && text === full) delay = 1800;
    else if (deleting && text === '') delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setI((n) => n + 1);
      } else setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, i, phrases, reduced]);

  if (reduced) return <span className={className}>{phrases.join(' · ')}</span>;

  return (
    <span className={className} role="status" aria-live="polite" aria-label={phrases.join(', ')}>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="caret text-accent-2">
        |
      </span>
    </span>
  );
}
