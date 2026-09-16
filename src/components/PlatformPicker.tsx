import type { CSSProperties } from 'react';
import type { Platform } from '../lib/types';
import { PlatformIcon } from './ui';
const desktopChoices = [
  { id: 'all', label: 'All' },
  { id: 'macos', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' },
] as const;
export function PlatformPicker({
  value,
  onChange,
}: {
  value: Platform | 'all';
  onChange: (value: Platform | 'all') => void;
}) {
  const index = desktopChoices.findIndex((choice) => choice.id === value);
  return (
    <div className="platform-picker">
      <div
        className="platform-dock"
        role="group"
        aria-label="Choose operating system"
        style={{ '--device-index': Math.max(0, index) } as CSSProperties}
      >
        <span className="platform-selection" aria-hidden style={{ opacity: index < 0 ? 0 : 1 }} />
        {desktopChoices.map((choice) => (
          <button
            key={choice.id}
            className="device-option"
            aria-pressed={value === choice.id}
            onClick={() => onChange(choice.id)}
          >
            <PlatformIcon platform={choice.id} size={21} />
            <span>{choice.label}</span>
          </button>
        ))}
      </div>
      <select
        aria-label="Other operating systems"
        className={`other-platforms ${index < 0 ? 'selected' : ''}`}
        value={index < 0 ? value : ''}
        onChange={(event) => {
          if (event.target.value) onChange(event.target.value as Platform);
        }}
      >
        <option value="" disabled>
          More devices
        </option>
        <option value="web">Web</option>
        <option value="ios">iOS</option>
        <option value="android">Android</option>
      </select>
    </div>
  );
}
