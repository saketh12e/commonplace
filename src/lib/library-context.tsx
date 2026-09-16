import { createContext, useCallback, useContext } from 'react';
import type { ReactNode } from 'react';
import { z } from 'zod';
import { useStored } from './storage';
import { tools } from '../data/catalog';

export const stackSchema = z.object({
  id: z.string().trim().min(1).max(100),
  name: z.string().trim().min(1).max(60),
  note: z.string().max(600),
  toolIds: z.array(z.string().max(100)).max(100),
  createdAt: z.string().datetime(),
});
export type Stack = z.infer<typeof stackSchema>;
const stacksSchema = z
  .array(stackSchema)
  .max(60)
  .transform((stacks) => {
    const seen = new Set<string>();
    return stacks
      .filter((stack) => {
        if (seen.has(stack.id)) return false;
        seen.add(stack.id);
        return true;
      })
      .map((stack) => ({ ...stack, toolIds: cleanStackIds(stack.toolIds) }));
  });
const trailSchema = z.array(z.string().max(100)).max(60).transform(cleanStackIds);
const known = new Set(tools.map((tool) => tool.id));
export function cleanStackIds(ids: string[]) {
  return [...new Set(ids)].filter((id) => known.has(id)).slice(0, 100);
}
interface LibraryState {
  stacks: Stack[];
  createStack: (name: string, toolIds?: string[], note?: string) => string | null;
  updateStack: (id: string, changes: Partial<Pick<Stack, 'name' | 'note' | 'toolIds'>>) => void;
  deleteStack: (id: string) => void;
  visitIds: string[];
  recordVisit: (id: string) => void;
  clearTrail: () => void;
  persisted: boolean;
}
const Context = createContext<LibraryState | null>(null);
export function LibraryProvider({ children }: { children: ReactNode }) {
  const [stacks, setStacks, stacksPersisted] = useStored<Stack[]>('stacks', stacksSchema, []);
  const [visitIds, setVisitIds, trailPersisted] = useStored<string[]>('trail', trailSchema, []);
  const recordVisit = useCallback(
    (id: string) => {
      if (!known.has(id)) return;
      setVisitIds((previous) =>
        previous[0] === id
          ? previous
          : [id, ...previous.filter((item) => item !== id)].slice(0, 60),
      );
    },
    [setVisitIds],
  );
  const createStack = (name: string, toolIds: string[] = [], note = '') => {
    if (!name.trim() || stacks.length >= 60) return null;
    const id = crypto.randomUUID();
    let created = false;
    setStacks((previous) => {
      if (previous.length >= 60) return previous;
      created = true;
      return [
        ...previous,
        {
          id,
          name: name.trim().slice(0, 60),
          note: note.slice(0, 600),
          toolIds: cleanStackIds(toolIds),
          createdAt: new Date().toISOString(),
        },
      ];
    });
    return created ? id : null;
  };

  const updateStack = (id: string, changes: Partial<Pick<Stack, 'name' | 'note' | 'toolIds'>>) =>
    setStacks((previous) =>
      previous.map((stack) =>
        stack.id === id
          ? {
              ...stack,
              ...changes,
              name: (changes.name?.trim() || stack.name).slice(0, 60),
              note: (changes.note ?? stack.note).slice(0, 600),
              toolIds: changes.toolIds ? cleanStackIds(changes.toolIds) : stack.toolIds,
            }
          : stack,
      ),
    );
  return (
    <Context.Provider
      value={{
        stacks,
        createStack,
        updateStack,
        deleteStack: (id) => setStacks((previous) => previous.filter((stack) => stack.id !== id)),
        visitIds,
        recordVisit,
        clearTrail: () => setVisitIds([]),
        persisted: stacksPersisted && trailPersisted,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useLibrary() {
  const value = useContext(Context);
  if (!value) throw new Error('LibraryProvider is required');
  return value;
}
