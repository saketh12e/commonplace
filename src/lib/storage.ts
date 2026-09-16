import { useCallback, useEffect, useRef, useState } from 'react';
import type { SetStateAction } from 'react';
import { z } from 'zod';
const PREFIX = 'commonplace:v1:';
export function readStored<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    const value = schema.safeParse(JSON.parse(raw));
    return value.success ? value.data : fallback;
  } catch {
    return fallback;
  }
}
export function useStored<T>(key: string, schema: z.ZodType<T>, fallback: T) {
  const [value, setValue] = useState<T>(() => readStored(key, schema, fallback));
  const [persisted, setPersisted] = useState(true);
  const current = useRef(value);
  const initial = useRef(fallback);
  const available = useRef(true);
  useEffect(() => {
    // Probe separately: mounting an old tab must never write its stale snapshot.
    try {
      localStorage.setItem(PREFIX + 'storage-probe', '1');
      localStorage.removeItem(PREFIX + 'storage-probe');
      available.current = true;
      setPersisted(true);
    } catch {
      available.current = false;
      setPersisted(false);
    }
    const receive = (event: StorageEvent) => {
      if (event.key !== PREFIX + key && event.key !== null) return;
      const next = readStored(key, schema, initial.current);
      current.current = next;
      setValue(() => next);
    };
    window.addEventListener('storage', receive);
    return () => window.removeEventListener('storage', receive);
  }, [key, schema]);
  const commit = useCallback(
    (action: SetStateAction<T>) => {
      // Rebase functional changes on the latest persisted value, once per action.
      // Keep writes outside React state updaters, which StrictMode may replay.
      const previous = available.current
        ? readStored(key, schema, current.current)
        : current.current;
      const next = typeof action === 'function' ? (action as (previous: T) => T)(previous) : action;
      current.current = next;
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(next));
        available.current = true;
        setPersisted(true);
      } catch {
        available.current = false;
        setPersisted(false);
      }
      setValue(() => next);
    },
    [key, schema],
  );
  return [value, commit, persisted] as const;
}
export const savedSchema = z
  .array(z.string().max(100))
  .max(10000)
  .transform((ids) => [...new Set(ids)]);
export const profileSchema = z
  .object({
    platform: z.enum(['all', 'macos', 'windows', 'linux', 'web', 'ios', 'android']),
    role: z.string().max(100),
    goal: z.string().max(500),
  })
  .nullable();
