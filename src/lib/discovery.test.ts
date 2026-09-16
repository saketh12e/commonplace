import { describe, expect, it } from 'vitest';
import { discoverTools, getMatchReasons, rankForProfile } from './discovery';
import type { DiscoveryFilters, DiscoveryProfile } from './discovery';
import type { Tool } from './types';

function tool(id: string, overrides: Partial<Tool> = {}): Tool {
  return {
    id,
    name: id,
    tagline: '',
    description: '',
    category: 'utilities',
    platforms: ['macos'],
    license: 'MIT',
    website: 'https://example.test',
    repository: 'https://example.test/repo',
    logo: 'T',
    logoBackground: '#fff',
    features: [],
    useCases: [],
    alternatives: [],
    setup: 'easy',
    offline: false,
    selfHost: false,
    featured: false,
    addedAt: '2026-01-01',
    verifiedAt: '2026-01-01',
    sourceUrls: [],
    ...overrides,
  };
}

const ids = (tools: Tool[]) => tools.map(({ id }) => id);
const profile = (overrides: Partial<DiscoveryProfile> = {}): DiscoveryProfile => ({
  platform: 'all',
  role: '',
  goal: '',
  ...overrides,
});

const notebook = tool('notes', {
  name: 'Quiet Pages',
  category: 'productivity',
  platforms: ['macos', 'linux'],
  features: ['Markdown notes', 'Full text search'],
  useCases: ['Taking notes'],
  alternatives: ['Notion'],
  offline: true,
  selfHost: true,
});
const screenshot = tool('capture', {
  name: 'Snap Desk',
  features: ['Screenshot annotation'],
  platforms: ['windows'],
});
const designer = tool('design', {
  name: 'Vector Studio',
  category: 'design',
  platforms: ['web'],
  features: ['Vector design', 'Prototyping'],
  useCases: ['Design interfaces'],
});
const catalog = [screenshot, notebook, designer];

describe('discoverTools filters and empty states', () => {
  it('returns a fresh empty array for an empty catalog', () => {
    expect(discoverTools([], {})).toEqual([]);
    expect(discoverTools([], { query: 'notes', savedOnly: true })).toEqual([]);
  });

  it('orders an empty query by featured then normalized name', () => {
    const entries = [
      tool('z', { name: 'Zulu' }),
      tool('b', { name: 'Beta', featured: true }),
      tool('a', { name: 'Alpha' }),
      tool('c', { name: 'Cedar', featured: true }),
    ];
    expect(ids(discoverTools(entries, {}))).toEqual(['b', 'c', 'a', 'z']);
    expect(ids(discoverTools(entries, { query: ' \n\t ' }))).toEqual(['b', 'c', 'a', 'z']);
  });

  it('treats punctuation-only and stop-word-only queries as empty queries', () => {
    for (const query of ['???', 'I want an app for me', 'the software tools']) {
      expect(discoverTools(catalog, { query })).toEqual(discoverTools(catalog, {}));
    }
  });

  it('returns no arbitrary or partly unknown search matches', () => {
    expect(discoverTools(catalog, { query: 'zxqv987' })).toEqual([]);
    expect(discoverTools(catalog, { query: 'notes zxqv987' })).toEqual([]);
    expect(discoverTools(catalog, { query: 'constructor' })).toEqual([]);
  });

  it('intersects every filter including saved IDs and semantic text', () => {
    const filters: DiscoveryFilters = {
      query: 'taking notes',
      category: 'productivity',
      platform: 'linux',
      offline: true,
      selfHost: true,
      savedOnly: true,
      savedIds: ['notes', 'design'],
    };
    expect(ids(discoverTools(catalog, filters))).toEqual(['notes']);
    for (const change of [
      { category: 'design' as const },
      { platform: 'windows' as const },
      { savedIds: ['capture'] },
      { query: 'screenshot' },
    ])
      expect(discoverTools(catalog, { ...filters, ...change })).toEqual([]);
  });

  it('uses boolean true as an opt-in requirement, false as no requirement', () => {
    expect(ids(discoverTools(catalog, { offline: true }))).toEqual(['notes']);
    expect(ids(discoverTools(catalog, { selfHost: true }))).toEqual(['notes']);
    expect(discoverTools(catalog, { offline: false, selfHost: false })).toHaveLength(3);
    expect(
      discoverTools([tool('online'), tool('offline', { offline: true })], {
        offline: true,
        selfHost: true,
      }),
    ).toEqual([]);
  });

  it('handles missing, empty and duplicate saved IDs without duplicating results', () => {
    expect(discoverTools(catalog, { savedOnly: true })).toEqual([]);
    expect(discoverTools(catalog, { savedOnly: true, savedIds: [] })).toEqual([]);
    expect(
      ids(discoverTools(catalog, { savedOnly: true, savedIds: ['notes', 'notes', 'missing'] })),
    ).toEqual(['notes']);
    expect(discoverTools(catalog, { savedIds: ['notes'] })).toHaveLength(3);
  });

  it('treats all category and platform as unrestricted', () => {
    expect(discoverTools(catalog, { category: 'all', platform: 'all' })).toHaveLength(3);
  });
});

describe('search evidence and aliases', () => {
  it.each(['screen capture', 'screen-shot', 'screenshots', 'screensh', 'screenshot app'])(
    'recognizes screenshot intent: %s',
    (query) => {
      expect(ids(discoverTools(catalog, { query }))).toEqual(['capture']);
    },
  );

  it.each(['taking notes', 'note-taking', 'I want an app for taking notes', 'noteboo', 'notes'])(
    'recognizes note intent: %s',
    (query) => {
      const entries = [notebook, tool('book', { features: ['Notebook'] })];
      const matches = ids(discoverTools(entries, { query }));
      if (query === 'noteboo') expect(matches).toEqual(['book']);
      else expect(matches).toContain('notes');
    },
  );

  it('recognizes plain design descriptions and category evidence', () => {
    expect(ids(discoverTools(catalog, { query: 'I need software for designing' }))).toEqual([
      'design',
    ]);
    expect(ids(discoverTools(catalog, { query: 'design apps' }))).toEqual(['design']);
  });

  it('finds alternative product names and partial names', () => {
    expect(ids(discoverTools(catalog, { query: 'notion' }))).toEqual(['notes']);
    expect(ids(discoverTools(catalog, { query: 'noti' }))).toEqual(['notes']);
    expect(ids(discoverTools(catalog, { query: 'snap d' }))).toEqual([]);
    expect(ids(discoverTools(catalog, { query: 'snap de' }))).toEqual(['capture']);
  });

  it('normalizes accents, case, punctuation, and repeated words', () => {
    const entries = [tool('cafe', { name: 'Café Notes' })];
    expect(ids(discoverTools(entries, { query: 'CAFÉ—notes notes' }))).toEqual(['cafe']);
    expect(discoverTools(entries, { query: 'afe' })).toEqual([]);
  });

  it('preserves Unicode letters and exact one-character words', () => {
    const entries = [tool('jp', { name: '写真' }), tool('c', { name: 'C' })];
    expect(ids(discoverTools(entries, { query: '写真' }))).toEqual(['jp']);
    expect(ids(discoverTools(entries, { query: 'c' }))).toEqual(['c']);
  });

  it('orders exact name, name prefix, feature, alternative, then description evidence', () => {
    const entries = [
      tool('description', { description: 'A terminal', featured: true }),
      tool('alternative', { alternatives: ['Terminal'] }),
      tool('feature', { features: ['Terminal'] }),
      tool('prefix', { name: 'Terminal Plus' }),
      tool('exact', { name: 'Terminal' }),
    ];
    expect(ids(discoverTools(entries, { query: 'terminal' }))).toEqual([
      'exact',
      'prefix',
      'feature',
      'alternative',
      'description',
    ]);
  });

  it('allows query terms to be supported by different fields', () => {
    expect(ids(discoverTools(catalog, { query: 'markdown notion offline' }))).toEqual(['notes']);
  });

  it('matches aliases symmetrically across catalog text and input', () => {
    expect(
      ids(
        discoverTools([tool('screen', { features: ['Screen capture'] })], { query: 'screenshot' }),
      ),
    ).toEqual(['screen']);
    expect(
      ids(discoverTools([tool('code', { features: ['Programming'] })], { query: 'coding' })),
    ).toEqual(['code']);
  });

  it('does not confuse screen recording with screenshots', () => {
    const entries = [screenshot, tool('record', { features: ['Screen recording'] })];
    expect(ids(discoverTools(entries, { query: 'record screen' }))).toEqual(['record']);
    expect(ids(discoverTools(entries, { query: 'screen capture' }))).toEqual(['capture']);
  });

  it('supports offline and self-hosting intents only with corresponding flags', () => {
    expect(ids(discoverTools(catalog, { query: 'notes without internet' }))).toEqual(['notes']);
    expect(ids(discoverTools(catalog, { query: 'self-hosted notes' }))).toEqual(['notes']);
    expect(discoverTools([tool('plain')], { query: 'offline' })).toEqual([]);
  });

  it('safely handles object-property names as ordinary catalog words', () => {
    const entries = [tool('literal', { features: ['Constructor helpers'] })];
    expect(ids(discoverTools(entries, { query: 'constructor' }))).toEqual(['literal']);
  });
});

describe('platform compatibility', () => {
  it.each(['macos', 'windows', 'linux'] as const)('includes browser tools for %s', (platform) => {
    const entries = [
      tool('browser', { platforms: ['web'] }),
      tool('native', { platforms: [platform] }),
      tool('mobile', { platforms: ['ios'] }),
    ];
    expect(ids(discoverTools(entries, { platform }))).toEqual(['browser', 'native']);
  });

  it('excludes incompatible desktop natives while retaining a listed browser option', () => {
    const entries = [
      screenshot,
      notebook,
      designer,
      tool('both', { platforms: ['windows', 'web'] }),
    ];
    expect(ids(discoverTools(entries, { platform: 'macos' }))).toEqual(['both', 'notes', 'design']);
  });

  it('requires explicit support on web and mobile selections', () => {
    const entries = [...catalog, tool('mobile', { platforms: ['ios', 'android'] })];
    expect(ids(discoverTools(entries, { platform: 'web' }))).toEqual(['design']);
    expect(ids(discoverTools(entries, { platform: 'ios' }))).toEqual(['mobile']);
    expect(ids(discoverTools(entries, { platform: 'android' }))).toEqual(['mobile']);
  });

  it('does not invent compatibility for missing platform metadata', () => {
    expect(discoverTools([tool('none', { platforms: [] })], { platform: 'macos' })).toEqual([]);
  });
});

describe('deterministic sorting', () => {
  it('explicit name sort overrides featured and relevance', () => {
    const entries = [
      tool('z', { name: 'Zulu', features: ['Notes'], featured: true }),
      tool('a', { name: 'Alpha', description: 'Notes' }),
    ];
    expect(ids(discoverTools(entries, { query: 'notes', sort: 'name' }))).toEqual(['a', 'z']);
  });

  it('newest uses addedAt, puts invalid dates last, and sorts ties by name', () => {
    const entries = [
      tool('old', { addedAt: '2025-01-01', featured: true, verifiedAt: '2030-01-01' }),
      tool('new-z', { addedAt: '2026-09-01', name: 'Zulu' }),
      tool('bad', { addedAt: 'not a date', name: 'Aardvark' }),
      tool('new-a', { addedAt: '2026-09-01', name: 'Alpha' }),
    ];
    expect(ids(discoverTools(entries, { sort: 'newest' }))).toEqual([
      'new-a',
      'new-z',
      'old',
      'bad',
    ]);
  });

  it('compares timezone-qualified dates by instant', () => {
    const entries = [
      tool('earlier', { addedAt: '2026-01-01T10:00:00+02:00' }),
      tool('later', { addedAt: '2026-01-01T09:00:00Z' }),
    ];
    expect(ids(discoverTools(entries, { sort: 'newest' }))).toEqual(['later', 'earlier']);
  });

  it.each(['recommended', 'name', 'newest'] as const)(
    'preserves input order on complete %s ties',
    (sort) => {
      const entries = [tool('second', { name: 'Same' }), tool('first', { name: 'Same' })];
      expect(ids(discoverTools(entries, { sort }))).toEqual(['second', 'first']);
    },
  );

  it('does not mutate frozen input arrays, tool objects, or filter arrays', () => {
    const entries = [tool('b'), tool('a')];
    for (const entry of entries) {
      Object.freeze(entry.features);
      Object.freeze(entry.platforms);
      Object.freeze(entry);
    }
    const savedIds = ['a', 'b'];
    Object.freeze(savedIds);
    Object.freeze(entries);
    const result = discoverTools(entries, { savedIds, savedOnly: true });
    expect(ids(entries)).toEqual(['b', 'a']);
    expect(ids(result)).toEqual(['a', 'b']);
    expect(result).not.toBe(entries);
    expect(result[0]).toBe(entries[1]);
    expect(() => rankForProfile(entries, profile({ goal: 'notes' }))).not.toThrow();
  });
});

describe('profile ranking and truthful match reasons', () => {
  it('returns empty results for an empty catalog and incompatible tools', () => {
    expect(rankForProfile([], profile())).toEqual([]);
    expect(rankForProfile([screenshot], profile({ platform: 'macos' }))).toEqual([]);
    expect(getMatchReasons(screenshot, profile({ platform: 'macos', goal: 'screenshot' }))).toEqual(
      [],
    );
  });

  it('ranks matching goals before roles, featured status, and alphabetical order', () => {
    const dev = tool('dev', {
      name: 'AAA',
      category: 'development',
      featured: true,
      features: ['Code terminal'],
    });
    expect(
      ids(rankForProfile([dev, notebook], profile({ role: 'developer', goal: 'taking notes' }))),
    ).toEqual(['notes', 'dev']);
  });

  it.each([
    ['designer', 'design'],
    ['software engineer', 'dev'],
    ['student', 'notes'],
    ['writer', 'notes'],
    ['content creator', 'media'],
  ])('maps %s to explicit relevant catalog evidence', (role, expected) => {
    const entries = [
      tool('misc', { featured: true }),
      designer,
      notebook,
      tool('dev', { category: 'development', features: ['Code terminal'] }),
      tool('media', { category: 'media', features: ['Video audio photo'] }),
    ];
    expect(rankForProfile(entries, profile({ role }))[0].id).toBe(expected);
  });

  it('uses aliases, partial goal words, and capability flags in profile ranking', () => {
    expect(rankForProfile(catalog, profile({ goal: 'screensh' }))[0]).toBe(screenshot);
    expect(rankForProfile(catalog, profile({ goal: 'screen capture' }))[0]).toBe(screenshot);
    expect(rankForProfile(catalog, profile({ goal: 'offline' }))[0]).toBe(notebook);
  });

  it('keeps compatible fallback entries without inventing relevance for unknown profiles', () => {
    const result = rankForProfile(catalog, profile({ role: 'zxqv', goal: 'qzzq' }));
    expect(result).toEqual(discoverTools(catalog, {}));
    expect(getMatchReasons(notebook, profile({ role: 'zxqv', goal: 'qzzq' }))).toEqual([]);
  });

  it('states browser fallback explicitly and never implies native desktop support', () => {
    const reasons = getMatchReasons(
      designer,
      profile({ platform: 'macos', role: 'designer', goal: 'design' }),
    );
    expect(reasons).toContain('Runs in your browser on macOS; native support is not listed.');
    expect(reasons).not.toContain('Available for macOS.');
    expect(reasons.length).toBeLessThanOrEqual(3);
  });

  it('provides distinct goal, role, and platform facts up to a maximum of three', () => {
    const entry = tool('all', { category: 'development', features: ['Screenshot'], offline: true });
    const reasons = getMatchReasons(
      entry,
      profile({ platform: 'macos', role: 'developer', goal: 'screen capture' }),
    );
    expect(reasons).toEqual([
      'Goal match — Listed feature: Screenshot.',
      'Role match — Listed in development.',
      'Available for macOS.',
    ]);
    expect(reasons.join(' ')).not.toMatch(/%|popular|best/i);
    expect(getMatchReasons(entry, profile({ goal: 'offline' }))).toContain(
      'Goal match — Works offline.',
    );
  });

  it('deduplicates shared role/goal evidence and does not manufacture empty-profile claims', () => {
    const reasons = getMatchReasons(notebook, profile({ role: 'writer', goal: 'notes' }));
    expect(reasons).toEqual(['Goal match — Listed feature: Markdown notes.']);
    expect(getMatchReasons(notebook, profile())).toEqual([]);
  });

  it('preserves exact ties and produces the same result on repeated calls', () => {
    const entries = [
      tool('z', { name: 'Same', features: ['Notes'] }),
      tool('a', { name: 'Same', features: ['Notes'] }),
    ];
    const selected = profile({ goal: 'notes' });
    expect(ids(rankForProfile(entries, selected))).toEqual(['z', 'a']);
    expect(rankForProfile(entries, selected)).toEqual(rankForProfile(entries, selected));
  });
});
