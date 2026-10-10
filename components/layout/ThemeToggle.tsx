'use client';

import { useTheme } from '@/lib/useTheme';
import { MoonIcon, SunIcon } from '@/components/ui/Icons';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] text-muted hover:text-text hover:bg-[var(--glass-2)] transition-colors duration-300 ${className}`}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
