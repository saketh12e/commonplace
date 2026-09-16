import { useState } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { Modal } from './ui';
const choices = [
  { id: 'light', label: 'Light', note: 'Clear and bright', Icon: Sun },
  { id: 'dark', label: 'Dark', note: 'A quieter canvas', Icon: Moon },
  { id: 'system', label: 'System', note: 'Follow your device', Icon: Monitor },
] as const;
export function Appearance() {
  const [open, setOpen] = useState(false);
  const { choice, setChoice, persisted } = useTheme();
  const CurrentIcon = choices.find((item) => item.id === choice)!.Icon;
  return (
    <>
      <button
        className="icon-button appearance-trigger"
        aria-label={`Appearance: ${choice} theme`}
        title="Appearance"
        onClick={() => setOpen(true)}
      >
        <CurrentIcon size={19} strokeWidth={1.7} />
      </button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="A space that feels like you."
        description="Choose your light. The little details follow along."
        className="appearance-modal"
      >
        <div className="appearance-options" role="group" aria-label="Color theme">
          {choices.map(({ id, label, note, Icon }) => (
            <button
              type="button"
              key={id}
              className={`appearance-option ${choice === id ? 'selected' : ''}`}
              aria-pressed={choice === id}
              onClick={() => setChoice(id)}
            >
              <span className={`theme-preview preview-${id}`} aria-hidden>
                <i />
                <span>
                  <b />
                  <b />
                  <b />
                </span>
              </span>
              <span className="appearance-label">
                <Icon size={17} />
                <strong>{label}</strong>
                {choice === id && <Check size={15} />}
              </span>
              <small>{note}</small>
            </button>
          ))}
        </div>
        <p className="helper-text appearance-note">
          {choice === 'system'
            ? 'Your appearance changes automatically with your device’s light or dark setting.'
            : 'Your choice stays the same, even when your device changes appearance.'}
        </p>
        {!persisted && (
          <p className="helper-text" role="status">
            Your browser can’t save this setting. It will last for this visit.
          </p>
        )}
        <div className="form-footer">
          <button className="button button-dark" onClick={() => setOpen(false)}>
            Done
          </button>
        </div>
      </Modal>
    </>
  );
}
