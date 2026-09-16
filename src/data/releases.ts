import { z } from 'zod';
import { tools } from './catalog';

export interface ReleaseSnapshot {
  id: string;
  toolId: string;
  title: string;
  tag: string;
  publishedAt: string;
  url: string;
  sourceApi: string;
  checkedAt: string;
  headline: string;
  summary: string;
}

// Curated upstream snapshots; never populated by browser API requests.
// Full source responses and retrieval evidence: work/research/v3-releases/.
export const releasesCheckedAt = '2026-09-16T12:19:38.936492+00:00';
export const releaseReadStorageKey = 'release-radar:read';
export const releaseReadSchema = z.array(z.string().max(160)).max(10000);

export const releases: readonly ReleaseSnapshot[] = [
  {
    id: 'ollama:v0.34.1',
    toolId: 'ollama',
    title: 'v0.34.1',
    tag: 'v0.34.1',
    publishedAt: '2026-09-14T22:14:03Z',
    url: 'https://github.com/ollama/ollama/releases/tag/v0.34.1',
    sourceApi: 'https://api.github.com/repos/ollama/ollama/releases/388717036',
    checkedAt: '2026-09-16T12:19:38.500220+00:00',
    headline: 'MLX model creation leaves experimental status',
    summary:
      'MLX safetensors model creation is no longer experimental. This update also improves Apple Silicon memory handling and speeds up model listings. GGUF conversion and quantization now require llama.cpp tooling.',
  },
  {
    id: 'goose:v1.50.1',
    toolId: 'goose',
    title: 'v1.50.1',
    tag: 'v1.50.1',
    publishedAt: '2026-09-14T21:00:01Z',
    url: 'https://github.com/aaif-goose/goose/releases/tag/v1.50.1',
    sourceApi: 'https://api.github.com/repos/aaif-goose/goose/releases/388709907',
    checkedAt: '2026-09-16T12:19:38.936492+00:00',
    headline: 'A focused rollback for model and MCP changes',
    summary:
      'This patch reverts model updates and rolls back the change to MCP default version selection.',
  },
  {
    id: 'brave:v1.95.101',
    toolId: 'brave',
    title: 'Release v1.95.101 (Chromium 153.0.8010.37)',
    tag: 'v1.95.101',
    publishedAt: '2026-09-11T03:31:20Z',
    url: 'https://github.com/brave/brave-browser/releases/tag/v1.95.101',
    sourceApi: 'https://api.github.com/repos/brave/brave-browser/releases/386767914',
    checkedAt: '2026-09-16T12:19:38.649578+00:00',
    headline: 'Share Leo conversations and tidy duplicate tabs',
    summary:
      'Adds Leo conversation sharing, calculator results in the address bar, and a shortcut to close duplicate tabs. Chromium is updated to 153.0.8010.37.',
  },
  {
    id: 'zed:v1.19.2',
    toolId: 'zed',
    title: 'v1.19.2',
    tag: 'v1.19.2',
    publishedAt: '2026-09-09T17:41:24Z',
    url: 'https://github.com/zed-industries/zed/releases/tag/v1.19.2',
    sourceApi: 'https://api.github.com/repos/zed-industries/zed/releases/385649911',
    checkedAt: '2026-09-16T12:19:38.500510+00:00',
    headline: 'Follow calls and select more in Git',
    summary:
      'Adds incoming and outgoing call hierarchy, multi-select in the Git Panel, and language detection for untitled buffers. Project search now runs as you type by default; the setting can be turned off.',
  },
  {
    id: 'node-red:5.0.7',
    toolId: 'node-red',
    title: '5.0.7: Maintenance Release',
    tag: '5.0.7',
    publishedAt: '2026-09-08T13:35:43Z',
    url: 'https://github.com/node-red/node-red/releases/tag/5.0.7',
    sourceApi: 'https://api.github.com/repos/node-red/node-red/releases/384759508',
    checkedAt: '2026-09-16T12:19:38.417185+00:00',
    headline: 'A maintenance pass for flows and the editor',
    summary:
      'Moves to patched JSONata, makes disabled wires visible in dark mode, and fixes single-type input rendering. Also fixes file-node completion after a filename evaluation error.',
  },
  {
    id: 'penpot:2.17.2',
    toolId: 'penpot',
    title: '2.17.2',
    tag: '2.17.2',
    publishedAt: '2026-08-27T08:31:12Z',
    url: 'https://github.com/penpot/penpot/releases/tag/2.17.2',
    sourceApi: 'https://api.github.com/repos/penpot/penpot/releases/377670384',
    checkedAt: '2026-09-16T12:19:38.890332+00:00',
    headline: 'More reliable text editing and SVG exports',
    summary:
      'Fixes linear gradients in SVG text exports and typography tokens detaching while editing text. Also addresses command injection in the SVG exporter through legacy fill-color.',
  },
  {
    id: 'localsend:v1.18.2',
    toolId: 'localsend',
    title: 'v1.18.2',
    tag: 'v1.18.2',
    publishedAt: '2026-08-21T14:02:01Z',
    url: 'https://github.com/localsend/localsend/releases/tag/v1.18.2',
    sourceApi: 'https://api.github.com/repos/localsend/localsend/releases/374422528',
    checkedAt: '2026-09-16T12:19:38.518887+00:00',
    headline: 'Reconnect with older devices; drop files into web sharing',
    summary:
      'Restores compatibility with version 1.17.0 and earlier, adds drag-and-drop to Receive via link, and stops following HTTP redirects sent by peers. Windows binaries now include a signature.',
  },
  {
    id: 'jan:v0.8.4',
    toolId: 'jan',
    title: '0.8.4',
    tag: 'v0.8.4',
    publishedAt: '2026-07-23T06:29:15Z',
    url: 'https://github.com/janhq/jan/releases/tag/v0.8.4',
    sourceApi: 'https://api.github.com/repos/janhq/jan/releases/358419250',
    checkedAt: '2026-09-16T12:19:38.489662+00:00',
    headline: 'Settings move to the backend; secrets to the OS keyring',
    summary:
      'Automatically migrates settings and API keys to a backend-managed store, with secrets in the OS keyring. The old localStorage snapshot remains for downgrades; later changes stay in the new store.',
  },
];

export function formatReleaseDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));
}

export interface ReleaseFilters {
  shelfOnly?: boolean;
  savedIds?: readonly string[];
  category?: string;
  unreadOnly?: boolean;
  readIds?: readonly string[];
  now?: number;
}

export function filterReleases(
  snapshots: readonly ReleaseSnapshot[],
  {
    shelfOnly = false,
    savedIds = [],
    category = 'all',
    unreadOnly = false,
    readIds = [],
    now = Date.now(),
  }: ReleaseFilters = {},
): ReleaseSnapshot[] {
  return snapshots
    .filter((release) => {
      const tool = tools.find((item) => item.id === release.toolId);
      return (
        tool &&
        Date.parse(release.publishedAt) <= now &&
        (!shelfOnly || savedIds.includes(release.toolId)) &&
        (category === 'all' || tool.category === category) &&
        (!unreadOnly || !readIds.includes(release.id))
      );
    })
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
