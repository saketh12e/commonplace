import { matchesTopic } from '../data/topics';
import type { Tool, Platform, CategoryId } from './types';

export type DiscoveryFilters = {
  query?: string;
  topic?: string;
  category?: CategoryId | 'all';
  platform?: Platform | 'all';
  offline?: boolean;
  selfHost?: boolean;
  sort?: 'recommended' | 'name' | 'newest';
  savedIds?: string[];
  savedOnly?: boolean;
};

export type DiscoveryProfile = {
  platform: Platform | 'all';
  role: string;
  goal: string;
};

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'been',
  'by',
  'can',
  'could',
  'do',
  'does',
  'for',
  'from',
  'get',
  'help',
  'i',
  'in',
  'is',
  'it',
  'its',
  'like',
  'looking',
  'me',
  'my',
  'need',
  'of',
  'on',
  'or',
  'our',
  'please',
  'some',
  'something',
  'that',
  'the',
  'their',
  'them',
  'this',
  'to',
  'use',
  'using',
  'want',
  'while',
  'with',
  'would',
  'you',
  'your',
  'app',
  'apps',
  'application',
  'applications',
  'software',
  'tool',
  'tools',
  'take',
  'taking',
]);

// Deliberately finite aliases: no stemming, remote model, or fuzzy typo guessing.
const PHRASES: ReadonlyArray<readonly [RegExp, string]> = [
  [/\b(?:screen shots?|screen captures?|capture (?:my |the )?screen)\b/g, 'screenshot'],
  [/\b(?:screen recording|record (?:my |the )?screen)\b/g, 'screenrecording'],
  [/\b(?:note taking|taking notes|take notes)\b/g, 'notes'],
  [/\b(?:to do|to dos)\b/g, 'tasks'],
  [/\b(?:self host|self hosted|self hosting)\b/g, 'selfhost'],
  [/\b(?:version control|source control)\b/g, 'versioncontrol'],
  [/\b(?:without internet|without an internet connection|no internet)\b/g, 'offline'],
];

const ALIASES: Readonly<Record<string, string>> = {
  screenshots: 'screenshot',
  screencapture: 'screenshot',
  screencaptures: 'screenshot',
  note: 'notes',
  notetaking: 'notes',
  notebook: 'notes',
  notebooks: 'notes',
  todo: 'tasks',
  todos: 'tasks',
  task: 'tasks',
  photos: 'photo',
  photograph: 'photo',
  photographs: 'photo',
  photography: 'photo',
  images: 'image',
  pictures: 'image',
  picture: 'image',
  editing: 'edit',
  editor: 'edit',
  editors: 'edit',
  designing: 'design',
  designs: 'design',
  coding: 'code',
  programming: 'code',
  videos: 'video',
  movies: 'video',
  movie: 'video',
  passwords: 'password',
  private: 'privacy',
  privately: 'privacy',
  selfhosted: 'selfhost',
  selfhosting: 'selfhost',
  syncing: 'sync',
  synchronization: 'sync',
  synchronisation: 'sync',
};

function normalize(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function canonicalTokens(value: string): string[] {
  let normalized = normalize(value);
  for (const [pattern, replacement] of PHRASES) {
    normalized = normalized.replace(pattern, replacement);
  }
  return normalized
    .split(' ')
    .filter(Boolean)
    .map((term) => (Object.prototype.hasOwnProperty.call(ALIASES, term) ? ALIASES[term] : term));
}

function queryTerms(value: string): string[] {
  return [...new Set(canonicalTokens(value).filter((term) => !STOP_WORDS.has(term)))];
}

type SearchField = { text: string; tokens: string[]; weight: number; reason: string };
type Evidence = { score: number; reason: string };

function field(text: string, weight: number, reason: string): SearchField {
  return {
    text: normalize(text),
    // Keep original tokens too, so aliases never erase ordinary word prefixes.
    tokens: [...new Set([...normalize(text).split(' ').filter(Boolean), ...canonicalTokens(text)])],
    weight,
    reason,
  };
}

function fieldsFor(tool: Tool): SearchField[] {
  const fields = [
    field(tool.name, 60, `Name: ${tool.name}.`),
    ...tool.features.map((value) => field(value, 36, `Listed feature: ${value}.`)),
    ...tool.useCases.map((value) => field(value, 32, `Listed use case: ${value}.`)),
    ...tool.alternatives.map((value) => field(value, 28, `Listed alternative to ${value}.`)),
    field(tool.tagline, 20, `Catalog summary: ${tool.tagline}`),
    field(tool.category, 16, `Listed in ${tool.category}.`),
    field(tool.description, 10, 'Your terms appear in the catalog description.'),
  ];
  if (tool.offline) fields.push(field('offline', 36, 'Works offline.'));
  if (tool.selfHost) fields.push(field('selfhost', 36, 'Supports self-hosting.'));
  return fields;
}

function evidenceFor(term: string, fields: SearchField[]): Evidence | undefined {
  let best: Evidence | undefined;
  for (const candidate of fields) {
    const strength = candidate.tokens.includes(term)
      ? 1
      : term.length >= 2 && candidate.tokens.some((token) => token.startsWith(term))
        ? 0.6
        : 0;
    const score = strength * candidate.weight;
    if (score > 0 && (!best || score > best.score)) best = { score, reason: candidate.reason };
  }
  return best;
}

const DESKTOP_PLATFORMS: ReadonlySet<Platform> = new Set(['macos', 'windows', 'linux']);
const PLATFORM_LABELS: Record<Platform, string> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  web: 'the web',
  ios: 'iOS',
  android: 'Android',
};

function compatible(tool: Tool, platform: Platform | 'all' = 'all'): boolean {
  return (
    platform === 'all' ||
    tool.platforms.includes(platform) ||
    (DESKTOP_PLATFORMS.has(platform) && tool.platforms.includes('web'))
  );
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function compareNames(left: Tool, right: Tool): number {
  return compareText(normalize(left.name), normalize(right.name));
}

function addedTimestamp(value: string): number {
  // Date-only or timezone-qualified ISO values have no machine-local timezone dependency.
  if (!/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?$/.test(value))
    return -Infinity;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : -Infinity;
}

/** Intersect filters, then sort a new array without changing catalog objects. */
export function discoverTools(tools: Tool[], filters: DiscoveryFilters = {}): Tool[] {
  const terms = queryTerms(filters.query ?? '');
  const canonicalQuery = terms.join(' ');
  const savedIds = new Set(filters.savedIds ?? []);
  const ranked: Array<{ tool: Tool; score: number; index: number }> = [];

  tools.forEach((tool, index) => {
    if (filters.category && filters.category !== 'all' && tool.category !== filters.category)
      return;
    if (filters.topic && !matchesTopic(tool, filters.topic)) return;
    if (!compatible(tool, filters.platform)) return;
    // False means the checkbox is off, not "exclude capable tools".
    if (filters.offline && !tool.offline) return;
    if (filters.selfHost && !tool.selfHost) return;
    if (filters.savedOnly && !savedIds.has(tool.id)) return;

    let score = 0;
    if (terms.length) {
      const fields = fieldsFor(tool);
      for (const term of terms) {
        const match = evidenceFor(term, fields);
        if (!match) return;
        score += match.score;
      }
      const name = canonicalTokens(tool.name).join(' ');
      if (name === canonicalQuery) score += 120;
      else if (name.startsWith(canonicalQuery)) score += 60;
    }
    ranked.push({ tool, score, index });
  });

  ranked.sort((left, right) => {
    if (filters.sort === 'newest') {
      const dateOrder = compareNumbers(
        addedTimestamp(right.tool.addedAt),
        addedTimestamp(left.tool.addedAt),
      );
      if (dateOrder) return dateOrder;
    } else if (filters.sort !== 'name') {
      const recommendationOrder =
        right.score - left.score || Number(right.tool.featured) - Number(left.tool.featured);
      if (recommendationOrder) return recommendationOrder;
    }
    return compareNames(left.tool, right.tool) || left.index - right.index;
  });
  return ranked.map(({ tool }) => tool);
}

function compareNumbers(left: number, right: number): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

// Role labels are explicit, inspectable mappings to catalog terms, not user attributes.
const ROLE_TERMS: ReadonlyArray<{ labels: string[]; terms: string }> = [
  { labels: ['designer', 'designers', 'design'], terms: 'design vector prototype photo' },
  {
    labels: ['developer', 'developers', 'engineer', 'engineers', 'development', 'programmer'],
    terms: 'development code terminal versioncontrol',
  },
  { labels: ['writer', 'writers', 'writing'], terms: 'writing notes markdown' },
  {
    labels: ['student', 'students', 'learner', 'learning'],
    terms: 'notes study research tasks pdf',
  },
  { labels: ['researcher', 'researchers', 'research'], terms: 'research notes references pdf' },
  { labels: ['creator', 'creators', 'creative'], terms: 'media video audio photo design' },
];

function roleTerms(role: string): string[] {
  const words = normalize(role).split(' ');
  const mapped = ROLE_TERMS.filter(({ labels }) => labels.some((label) => words.includes(label)));
  return queryTerms(mapped.length ? mapped.map(({ terms }) => terms).join(' ') : role);
}

function profileEvidence(tool: Tool, terms: string[]): { score: number; reason?: string } {
  const fields = fieldsFor(tool);
  let score = 0;
  let best: Evidence | undefined;
  for (const term of terms) {
    const match = evidenceFor(term, fields);
    if (!match) continue;
    score += match.score;
    if (!best || match.score > best.score) best = match;
  }
  return { score, reason: best?.reason };
}

/** Return at most three actual catalog facts; never a percentage or inferred capability. */
export function getMatchReasons(tool: Tool, profile: DiscoveryProfile): string[] {
  if (!compatible(tool, profile.platform)) return [];
  const reasons: string[] = [];
  const goal = profileEvidence(tool, queryTerms(profile.goal));
  const role = profileEvidence(tool, roleTerms(profile.role));
  if (goal.reason) reasons.push(`Goal match — ${goal.reason}`);
  if (role.reason && role.reason !== goal.reason) reasons.push(`Role match — ${role.reason}`);
  if (profile.platform !== 'all') {
    if (tool.platforms.includes(profile.platform)) {
      reasons.push(`Available for ${PLATFORM_LABELS[profile.platform]}.`);
    } else {
      reasons.push(
        `Runs in your browser on ${PLATFORM_LABELS[profile.platform]}; native support is not listed.`,
      );
    }
  }
  return reasons.slice(0, 3);
}

/** Compatible catalog, ordered by goal evidence, role evidence, featured, then name. */
export function rankForProfile(tools: Tool[], profile: DiscoveryProfile): Tool[] {
  const goal = queryTerms(profile.goal);
  const role = roleTerms(profile.role);
  return tools
    .map((tool, index) => ({ tool, index }))
    .filter(({ tool }) => compatible(tool, profile.platform))
    .map(({ tool, index }) => ({
      tool,
      index,
      goalScore: profileEvidence(tool, goal).score,
      roleScore: profileEvidence(tool, role).score,
    }))
    .sort(
      (left, right) =>
        right.goalScore - left.goalScore ||
        right.roleScore - left.roleScore ||
        Number(right.tool.featured) - Number(left.tool.featured) ||
        compareNames(left.tool, right.tool) ||
        left.index - right.index,
    )
    .map(({ tool }) => tool);
}
