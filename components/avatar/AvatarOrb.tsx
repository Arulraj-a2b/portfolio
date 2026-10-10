'use client';

import Image from 'next/image';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/content/profile';
import { usePointerFine, useReducedMotion } from '@/lib/useMediaQuery';

/** Glass orb with the avatar; floats and tilts gently toward the cursor on pointer devices. */
export function AvatarOrb({ size = 260, className = '' }: { size?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const [hasImage, setHasImage] = useState(true);

  useEffect(() => {
    if (!fine || reduced || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  return (
    <div className={cn('float-y', className)} style={{ width: size, height: size, perspective: 800 }}>
      <div
        ref={ref}
        className="glass relative h-full w-full overflow-hidden rounded-full transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 0 0 1px var(--glass-border), inset 0 -30px 60px -30px color-mix(in srgb, var(--accent-2) 55%, transparent)' }} />
        <div className="absolute -inset-1 rounded-full" style={{ background: 'radial-gradient(60% 60% at 30% 25%, color-mix(in srgb, var(--accent-2) 35%, transparent), transparent 70%)' }} />
        {hasImage ? (
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name}, 3D portrait`}
            width={size}
            height={size}
            priority
            sizes={`${size}px`}
            onError={() => setHasImage(false)}
            className="relative h-full w-full object-cover object-top"
          />
        ) : (
          <Silhouette />
        )}
      </div>
    </div>
  );
}

function Silhouette() {
  return (
    <svg viewBox="0 0 100 100" className="relative h-full w-full" aria-hidden="true">
      <circle cx="50" cy="38" r="18" fill="var(--accent)" opacity="0.9" />
      <path d="M14 96c2-22 16-32 36-32s34 10 36 32z" fill="var(--accent)" opacity="0.75" />
    </svg>
  );
}
