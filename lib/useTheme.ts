'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';
const KEY = 'theme';
const EVENT = 'themechange';

export function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const current = document.documentElement.dataset.theme;
  if (current === 'dark' || current === 'light') return current;
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};
const getServerSnapshot = (): Theme => 'dark';

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);
  const toggle = useCallback(() => applyTheme(readTheme() === 'light' ? 'dark' : 'light'), []);
  return { theme, toggle };
}

/** Inline script that sets the theme before first paint (no flash). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${KEY}');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){}})();`;
