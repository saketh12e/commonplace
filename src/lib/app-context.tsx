import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { DiscoveryProfile } from './discovery';
import { profileSchema, savedSchema, useStored } from './storage';
interface AppState {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  saveMany: (ids: string[]) => void;
  profile: DiscoveryProfile | null;
  setProfile: (profile: DiscoveryProfile | null) => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  submitOpen: boolean;
  setSubmitOpen: (open: boolean) => void;
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  explorerOpen: boolean;
  setExplorerOpen: (open: boolean) => void;
  undoSave: (() => void) | null;
  toast: string;
  notify: (message: string) => void;
  storageAvailable: boolean;
}
const Context = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds, savedPersisted] = useStored('saved', savedSchema, []);
  const [profile, setProfile, profilePersisted] = useStored<DiscoveryProfile | null>(
    'profile',
    profileSchema,
    null,
  );
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [undoId, setUndoId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const notify = useCallback((message: string) => {
    clearTimeout(timer.current);
    setUndoId(null);
    setToast(message);
    timer.current = setTimeout(() => setToast(''), 3500);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const toggleSaved = (id: string) => {
    const exists = savedIds.includes(id);
    setSavedIds((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
    );
    notify(exists ? 'Removed from your shelf' : 'Saved to your shelf');
    if (exists) setUndoId(id);
  };
  const saveMany = (ids: string[]) => {
    setSavedIds((previous) => [...new Set([...previous, ...ids])]);
    const count = ids.filter((id) => !savedIds.includes(id)).length;
    notify(
      count
        ? `${count} ${count === 1 ? 'tool' : 'tools'} added to your shelf`
        : 'These tools are already on your shelf',
    );
  };
  const toggleCompare = (id: string) => {
    if (compareIds.includes(id))
      setCompareIds((previous) => previous.filter((item) => item !== id));
    else if (compareIds.length < 3) setCompareIds((previous) => [...previous, id]);
    else notify('Compare up to 3 tools. Remove one to add another.');
  };
  return (
    <Context.Provider
      value={{
        savedIds,
        toggleSaved,
        saveMany,
        profile,
        setProfile,
        compareIds,
        toggleCompare,
        clearCompare: () => setCompareIds([]),
        profileOpen,
        setProfileOpen,
        submitOpen,
        setSubmitOpen,
        commandOpen,
        setCommandOpen,
        explorerOpen,
        setExplorerOpen,
        undoSave: undoId
          ? () => {
              setSavedIds((previous) => [...new Set([...previous, undoId])]);
              notify('Restored to your shelf');
            }
          : null,
        toast,
        notify,
        storageAvailable: savedPersisted && profilePersisted,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const context = useContext(Context);
  if (!context) throw new Error('AppProvider is required');
  return context;
}
