import { useEffect, useState } from 'react';

export type ThemeChoice = 'light' | 'dark' | 'system';
const key = 'commonplace:theme';
const valid = (value: unknown): value is ThemeChoice =>
  value === 'light' || value === 'dark' || value === 'system';
function readTheme(): ThemeChoice {
  try {
    const stored = localStorage.getItem(key);
    return valid(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(readTheme);
  const [persisted, setPersisted] = useState(true);
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const resolved = choice === 'system' ? (media.matches ? 'dark' : 'light') : choice;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themeChoice = choice;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', resolved === 'dark' ? '#111214' : '#f7f8fa');
    };
    apply();
    try {
      localStorage.setItem(key, choice);
      setPersisted(true);
    } catch {
      setPersisted(false);
    }
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [choice]);
  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === key || event.key === null) setChoice(readTheme());
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  return { choice, setChoice, persisted };
}
