'use client';

import { ReactNode, forwardRef } from 'react';
import Link from 'next/link';
import { Magnetic } from './Magnetic';
import styles from './MagneticButton.module.css';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
  label?: string;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export const MagneticButton = forwardRef<HTMLElement, Props>(function MagneticButton(
  { children, href, onClick, variant = 'primary', label, className, target, rel, download, type = 'button', disabled },
  _ref
) {
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(' ');
  const inner = (
    <span className={styles.inner}>
      <span className={styles.text}>{children}</span>
      <span className={styles.arrow} aria-hidden>
        ↗
      </span>
    </span>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href) || !!download;
    if (isExternal) {
      return (
        <Magnetic intensity={0.3} radius={160}>
          <a
            className={cls}
            href={href}
            target={target ?? '_blank'}
            rel={rel ?? 'noopener noreferrer'}
            data-cursor-label={label}
            data-cursor-hover
            download={download}
          >
            {inner}
          </a>
        </Magnetic>
      );
    }
    return (
      <Magnetic intensity={0.3} radius={160}>
        <Link href={href} className={cls} data-cursor-label={label} data-cursor-hover>
          {inner}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic intensity={0.3} radius={160}>
      <button
        type={type}
        className={cls}
        onClick={onClick}
        disabled={disabled}
        data-cursor-label={label}
        data-cursor-hover
      >
        {inner}
      </button>
    </Magnetic>
  );
});
