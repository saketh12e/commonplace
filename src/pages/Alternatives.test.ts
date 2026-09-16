import { describe, expect, it } from 'vitest';
import { tools } from '../data/catalog';
import { alternativeApps, alternativeMatches } from './Alternatives';
import type { Platform } from '../lib/types';

const ids = (source: string, platform: Platform | 'all' = 'all') =>
  alternativeMatches(source, platform)
    .map((tool) => tool.id)
    .sort();

describe('exact curated alternative sources', () => {
  it.each(['Figma', 'figma', 'FIGMA', 'fIgMa'])('normalizes case for %s', (source) => {
    expect(ids(source)).toEqual(['penpot']);
  });

  it.each([
    '',
    ' ',
    'Fig',
    'Figma Pro',
    'design',
    'vector design',
    'constructor',
    '__proto__',
    'not-a-real-source',
  ])('does not invent matches for %j', (source) => {
    expect(ids(source)).toEqual([]);
  });

  it('requires the full source name, not discovery tokenization or punctuation aliases', () => {
    expect(ids('vIsUaL sTuDiO cOdE')).toEqual(['vscodium', 'zed']);
    for (const value of ['Visual Studio', 'Studio Code', 'Visual-Studio-Code', 'VSCode']) {
      expect(ids(value)).toEqual([]);
    }
  });

  it('uses only explicit alternative relationships rather than tool identity or descriptions', () => {
    expect(ids('Ollama')).toEqual(['llama-cpp']);
    expect(ids('Krita')).toEqual(['gimp']);
    expect(ids('Notion')).toEqual(['appflowy']);
    expect(ids('ChatGPT')).toEqual(['gpt4all', 'jan', 'ollama']);
  });

  it('returns each matching tool once when a source is shared across the catalog', () => {
    const matches = alternativeMatches('Photoshop');
    expect(matches.map((tool) => tool.id).sort()).toEqual(['gimp', 'krita']);
    expect(new Set(matches.map((tool) => tool.id)).size).toBe(matches.length);
  });
});

describe('device compatibility within the selected source', () => {
  it.each(['macos', 'windows', 'linux', 'web'] as const)(
    'keeps the listed browser alternative to Figma on %s',
    (platform) => {
      expect(ids('Figma', platform)).toEqual(['penpot']);
    },
  );

  it.each(['ios', 'android'] as const)(
    'requires explicit mobile support on %s instead of treating web as mobile',
    (platform) => {
      expect(ids('Figma', platform)).toEqual([]);
      expect(ids('AirDrop', platform)).toEqual(['localsend']);
      expect(ids('1Password', platform)).toEqual(['bitwarden']);
    },
  );

  it('excludes Windows-only alternatives on macOS/Linux without dropping them from all devices', () => {
    expect(ids('Snagit', 'all')).toEqual(['flameshot', 'sharex']);
    expect(ids('Snagit', 'windows')).toEqual(['flameshot', 'sharex']);
    expect(ids('Snagit', 'macos')).toEqual(['flameshot']);
    expect(ids('Snagit', 'linux')).toEqual(['flameshot']);
    expect(ids('Snagit', 'web')).toEqual([]);
  });

  it('does not widen an empty platform intersection to unrelated compatible tools', () => {
    expect(ids('Photoshop', 'web')).toEqual([]);
    expect(ids('Postman', 'ios')).toEqual([]);
    expect(ids('1Password', 'linux')).toEqual(['bitwarden', 'keepassxc']);
    expect(ids('1Password', 'web')).toEqual(['bitwarden']);
  });
});

describe('source picker integrity and isolation', () => {
  it('offers canonical, nonempty, unique source labels without duplicate case variants', () => {
    expect(alternativeApps).toEqual(
      expect.arrayContaining([
        'Figma',
        'Photoshop',
        'Notion',
        'Postman',
        'Microsoft 365',
        '1Password',
      ]),
    );
    for (const name of alternativeApps) {
      expect(name).toBe(name.trim());
      expect(name.length).toBeGreaterThan(0);
    }
    expect(new Set(alternativeApps.map((name) => name.toLowerCase())).size).toBe(
      alternativeApps.length,
    );
    for (let i = 1; i < alternativeApps.length; i++) {
      expect(alternativeApps[i - 1].localeCompare(alternativeApps[i])).toBeLessThanOrEqual(0);
    }
  });

  it('never offers a dead-end source under all devices, including case-insensitive URLs', () => {
    for (const source of alternativeApps) {
      const matches = alternativeMatches(source);
      expect(matches.length, source).toBeGreaterThan(0);
      expect(ids(source.toUpperCase()), source).toEqual(ids(source));
      for (const tool of matches) expect(tools).toContain(tool);
    }
  });

  it('covers every declared source without turning categories or feature text into picker options', () => {
    for (const tool of tools) {
      for (const source of tool.alternatives) expect(alternativeApps, tool.id).toContain(source);
    }
    expect(alternativeApps).not.toContain('AI & machine learning');
    expect(alternativeApps).not.toContain('Vector design');
  });

  it('keeps repeated calls independent and does not reorder or mutate the catalog', () => {
    const before = structuredClone(tools);
    const appsBefore = [...alternativeApps];
    const first = alternativeMatches('1Password');
    const expected = first.map((tool) => tool.id);
    first.reverse();
    first.pop();
    expect(alternativeMatches('1Password').map((tool) => tool.id)).toEqual(expected);
    alternativeMatches('Snagit', 'macos');
    alternativeMatches('Figma', 'ios');
    expect(tools).toEqual(before);
    expect(alternativeApps).toEqual(appsBefore);
  });
});
