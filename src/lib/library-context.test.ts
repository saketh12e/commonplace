import { afterEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { tools } from '../data/catalog';
import { cleanStackIds, LibraryProvider, stackSchema, useLibrary } from './library-context';
import type { Stack } from './library-context';

const validStack = (changes: Partial<Stack> = {}): Stack => ({
  id: 'weekend-kit',
  name: 'Weekend writing',
  note: 'Draft locally, share when ready. ✍️',
  toolIds: ['joplin', 'localsend'],
  createdAt: '2026-09-16T12:00:00.000Z',
  ...changes,
});

// Exercise the actual private collection schemas through the provider's initial read.
// Server rendering runs real useState initializers; no DOM, hook or schema mock is needed.
function restore(stacks: string | null, trail: string | null = null) {
  const getItem = vi.fn((key: string) =>
    key === 'commonplace:v1:stacks' ? stacks : key === 'commonplace:v1:trail' ? trail : null,
  );
  vi.stubGlobal('localStorage', { getItem });
  let state: Pick<ReturnType<typeof useLibrary>, 'stacks' | 'visitIds'> | undefined;
  function Probe() {
    const { stacks, visitIds } = useLibrary();
    state = { stacks, visitIds };
    return null;
  }
  renderToStaticMarkup(createElement(LibraryProvider, null, createElement(Probe)));
  expect(getItem).toHaveBeenCalledWith('commonplace:v1:stacks');
  expect(state).toBeDefined();
  return state!;
}

afterEach(() => vi.unstubAllGlobals());

describe('stack record validation', () => {
  it('accepts a named empty stack, Unicode notes, and documented size boundaries', () => {
    expect(stackSchema.parse(validStack({ toolIds: [], note: '' })).toolIds).toEqual([]);
    const boundary = validStack({
      id: 'i'.repeat(100),
      name: 'n'.repeat(60),
      note: 'é'.repeat(600),
      toolIds: Array(100).fill('joplin'),
    });
    expect(stackSchema.safeParse(boundary).success).toBe(true);
  });

  it.each([
    ['empty ID', { id: '' }],
    ['oversized ID', { id: 'i'.repeat(101) }],
    ['empty name', { name: '' }],
    ['oversized name', { name: 'n'.repeat(61) }],
    ['oversized note', { note: 'n'.repeat(601) }],
    ['too many references', { toolIds: Array(101).fill('joplin') }],
    ['oversized reference', { toolIds: ['i'.repeat(101)] }],
    ['non-string reference', { toolIds: [42] }],
    ['non-array references', { toolIds: 'joplin' }],
    ['null note', { note: null }],
    ['numeric ID', { id: 123 }],
    ['non-date', { createdAt: 'yesterday' }],
    ['date without time', { createdAt: '2026-09-16' }],
    ['impossible date', { createdAt: '2026-02-30T00:00:00Z' }],
  ])('rejects %s instead of coercing stored data', (_label, changes) => {
    expect(stackSchema.safeParse({ ...validStack(), ...changes }).success).toBe(false);
  });

  it('requires every persisted field and strips unknown properties', () => {
    for (const field of ['id', 'name', 'note', 'toolIds', 'createdAt'] as const) {
      const record: Record<string, unknown> = { ...validStack() };
      delete record[field];
      expect(stackSchema.safeParse(record).success, field).toBe(false);
    }
    expect(stackSchema.parse({ ...validStack(), injected: { admin: true } })).toEqual(validStack());
  });

  it.each(['id', 'name'] as const)('rejects whitespace-only stored %s', (field) => {
    expect(stackSchema.safeParse({ ...validStack(), [field]: ' \t\n ' }).success).toBe(false);
  });
});

describe('stack label normalization', () => {
  it('trims ID and name edges without rewriting meaningful internal spacing or notes', () => {
    const record = validStack({
      id: ' \tweekend-kit\n',
      name: '  Research  kit \n',
      note: '  Keep these spaces.\n',
    });
    expect(stackSchema.parse(record)).toEqual({
      ...record,
      id: 'weekend-kit',
      name: 'Research  kit',
    });
  });

  it('applies label length bounds after trimming', () => {
    const expected = validStack({ id: 'i'.repeat(100), name: 'n'.repeat(60) });
    expect(
      stackSchema.parse({ ...expected, id: ` ${expected.id} `, name: `\t${expected.name}\n` }),
    ).toEqual(expected);
  });
});

describe('canonical stack membership', () => {
  it('removes stale and repeated IDs while preserving the first selected order', () => {
    expect(cleanStackIds(['missing', 'zed', 'penpot', 'zed', '', 'joplin', 'penpot'])).toEqual([
      'zed',
      'penpot',
      'joplin',
    ]);
  });

  it('does not guess canonical IDs from names, case, whitespace, or inherited properties', () => {
    expect(
      cleanStackIds([
        'Penpot',
        'PENPOT',
        ' penpot ',
        'node_red',
        'constructor',
        '__proto__',
        'node-red',
      ]),
    ).toEqual(['node-red']);
    expect(cleanStackIds([])).toEqual([]);
    expect(cleanStackIds(['unknown', ''])).toEqual([]);
  });

  it('cleans before applying the limit, retains valid late entries and is idempotent', () => {
    const input = [...Array(120).fill('stale'), ...Array(120).fill('zed'), 'penpot'];
    const first = cleanStackIds(input);
    expect(first).toEqual(['zed', 'penpot']);
    expect(cleanStackIds(first)).toEqual(first);
  });

  it('does not mutate callers or share the returned array, and recognizes the whole catalog', () => {
    const input = ['zed', 'zed', 'penpot'];
    Object.freeze(input);
    const result = cleanStackIds(input);
    result.pop();
    expect(input).toEqual(['zed', 'zed', 'penpot']);
    expect(cleanStackIds(input)).toEqual(['zed', 'penpot']);
    const catalogIds = tools.map((tool) => tool.id);
    expect(cleanStackIds(catalogIds)).toEqual(catalogIds.slice(0, 100));
  });
});

describe('persisted stack collection boundaries', () => {
  it.each([null, '', '{broken', 'null', '{}', '42', '[null]'])(
    'recovers safely from malformed storage: %s',
    (raw) => {
      expect(restore(raw).stacks).toEqual([]);
    },
  );

  it('restores valid stack data independently of a malformed trail', () => {
    const stack = validStack();
    expect(restore(JSON.stringify([stack]), '{broken')).toEqual({ stacks: [stack], visitIds: [] });
    expect(restore('{broken', JSON.stringify(['zed', 'penpot'])).visitIds).toEqual([
      'zed',
      'penpot',
    ]);
  });

  it('accepts 60 stacks and rejects overflow or a single malformed member', () => {
    const sixty = Array.from({ length: 60 }, (_, i) => validStack({ id: `stack-${i}` }));
    expect(restore(JSON.stringify(sixty)).stacks).toHaveLength(60);
    expect(restore(JSON.stringify([...sixty, validStack()])).stacks).toEqual([]);
    expect(
      restore(JSON.stringify([validStack(), { ...validStack(), toolIds: [false] }])).stacks,
    ).toEqual([]);
  });

  it('bounds trail storage without poisoning valid stacks', () => {
    const stack = validStack();
    for (const invalid of [Array(61).fill('zed'), [false], ['x'.repeat(101)], {}]) {
      expect(restore(JSON.stringify([stack]), JSON.stringify(invalid))).toEqual({
        stacks: [stack],
        visitIds: [],
      });
    }
    const atLimit = [...Array(59).fill('zed'), 'penpot'];
    expect(restore('[]', JSON.stringify(atLimit)).visitIds).toEqual(['zed', 'penpot']);
  });

  it('keeps the first stack for each trimmed ID, preserving its contents and collection order', () => {
    const first = validStack({ name: 'First kit', note: 'Keep this note', toolIds: ['zed'] });
    const second = validStack({ id: 'research', name: 'Research', toolIds: ['zotero'] });
    const duplicate = validStack({
      id: 'weekend-kit',
      name: 'Do not overwrite',
      note: 'Different note',
      toolIds: ['penpot'],
    });
    const { stacks } = restore(
      JSON.stringify([
        { ...first, id: ' \tweekend-kit\n ', name: ' First kit ' },
        second,
        duplicate,
        { ...second, id: ' research ', name: 'Also a duplicate' },
      ]),
    );
    expect(stacks).toEqual([first, second]);
  });

  it('normalizes restored membership before counts or milestones consume it', () => {
    const { stacks } = restore(
      JSON.stringify([validStack({ toolIds: ['joplin', 'joplin', 'removed-tool', ''] })]),
    );
    expect(stacks[0].toolIds).toEqual(['joplin']);
  });
});

describe('restored trail normalization', () => {
  it('retains first-visit order among known canonical IDs while removing duplicates and stale references', () => {
    const stored = [
      'removed-tool',
      'zed',
      'penpot',
      'zed',
      '',
      'PENPOT',
      ' penpot ',
      '__proto__',
      'joplin',
      'penpot',
    ];
    const stack = validStack();
    expect(restore(JSON.stringify([stack]), JSON.stringify(stored))).toEqual({
      stacks: [stack],
      visitIds: ['zed', 'penpot', 'joplin'],
    });
  });

  it('restores an empty trail if every saved reference is stale or invalid', () => {
    expect(
      restore('[]', JSON.stringify(['removed-tool', '', 'constructor', 'Zed'])).visitIds,
    ).toEqual([]);
  });

  it('keeps an already normalized trail stable through another restore', () => {
    const first = restore(
      '[]',
      JSON.stringify(['localsend', 'zed', 'localsend', 'stale', 'penpot']),
    );
    expect(first.visitIds).toEqual(['localsend', 'zed', 'penpot']);
    expect(restore('[]', JSON.stringify(first.visitIds)).visitIds).toEqual(first.visitIds);
  });
});
