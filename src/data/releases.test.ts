import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { tools } from './catalog';
import {
  filterReleases,
  formatReleaseDate,
  releases,
  releasesCheckedAt,
  releaseReadSchema,
  releaseReadStorageKey,
} from './releases';

const evidenceRoot = resolve(process.cwd(), 'src/data/__fixtures__/releases');
const checked = Date.parse(releasesCheckedAt);
const fixture = (id: string) =>
  JSON.parse(readFileSync(resolve(evidenceRoot, `${id}.json`), 'utf8'));
const source = (id: string) => fixture(id).upstream;

describe('verified upstream release snapshots', () => {
  it('covers 8–10 distinct catalog tools with durable per-release IDs', () => {
    expect(releases.length).toBeGreaterThanOrEqual(8);
    expect(releases.length).toBeLessThanOrEqual(10);
    expect(new Set(releases.map((r) => r.toolId)).size).toBe(releases.length);
    expect(new Set(releases.map((r) => r.id)).size).toBe(releases.length);
    for (const release of releases) {
      expect(tools.some((tool) => tool.id === release.toolId)).toBe(true);
      expect(release.id).toBe(`${release.toolId}:${release.tag}`);
    }
  });

  it('uses actual publication dates, sorted newest first, and never a future check date', () => {
    expect(Number.isFinite(checked)).toBe(true);
    expect(checked).toBeLessThanOrEqual(Date.now());
    const dates = releases.map((r) => Date.parse(r.publishedAt));
    expect(dates).toEqual([...dates].sort((a, b) => b - a));
    for (const release of releases) {
      expect(release.publishedAt).toMatch(/T\d{2}:\d{2}:\d{2}Z$/);
      expect(Date.parse(release.publishedAt)).toBeLessThanOrEqual(Date.parse(release.checkedAt));
      expect(Date.parse(release.checkedAt)).toBeLessThanOrEqual(checked);
      // The initial shipment uses latest stable releases published within the past 90 days.
      expect(checked - Date.parse(release.publishedAt)).toBeLessThan(90 * 86400000);
    }
  });

  for (const release of releases) {
    it(`${release.toolId} matches captured official release metadata, not a catalog addition`, () => {
      const upstream = source(release.toolId);
      const fetched = fixture(release.toolId).fetched;
      expect(upstream.draft).toBe(false);
      expect(upstream.prerelease).toBe(false);
      expect(release.title).toBe(upstream.name.trim());
      expect(release.tag).toBe(upstream.tag_name);
      expect(release.publishedAt).toBe(upstream.published_at);
      expect(release.url).toBe(upstream.html_url);
      expect(release.sourceApi).toBe(upstream.url);
      expect(release.checkedAt).toBe(fetched.fetchedAt);
      expect(upstream.bodyLength).toBeGreaterThan(50);
      expect(upstream.bodySha256).toMatch(/^[a-f0-9]{64}$/);
      expect(release.headline.length).toBeGreaterThan(15);
      expect(release.summary.length).toBeGreaterThan(60);
      expect(release.summary.length).toBeLessThan(400);
      const tool = tools.find((item) => item.id === release.toolId)!;
      expect(release.summary).not.toBe(tool.tagline);
      // GitHub records a repository transfer for Goose; all other repositories match the catalog.
      const repo =
        release.toolId === 'goose' ? 'https://github.com/aaif-goose/goose' : tool.repository;
      const url = new URL(release.url);
      expect(url.protocol).toBe('https:');
      expect(url.hostname).toBe('github.com');
      expect(url.username + url.password + url.search + url.hash).toBe('');
      expect(decodeURIComponent(release.url)).toBe(`${repo}/releases/tag/${release.tag}`);
      expect(fetched.url).toBe(
        `${tool.repository.replace('https://github.com/', 'https://api.github.com/repos/')}/releases/latest`,
      );
    });
  }

  it('has HTTP redirect evidence for the Goose repository transfer', () => {
    const statuses = fixture('goose').httpStatuses;
    expect(statuses).toContain(301);
    expect(statuses.at(-1)).toBe(200);
    expect(source('goose').html_url).toContain('github.com/aaif-goose/goose/');
  });
});

describe('release views and local read state', () => {
  it('filters by saved catalog IDs, ignoring unknown and duplicate saved entries', () => {
    const selected = filterReleases(releases, {
      shelfOnly: true,
      savedIds: ['ollama', 'penpot', 'ollama', 'missing'],
      now: checked,
    });
    expect(selected.map((r) => r.toolId)).toEqual(['ollama', 'penpot']);
    expect(filterReleases(releases, { shelfOnly: true, savedIds: [], now: checked })).toEqual([]);
  });

  it('intersects shelf, category, and read filters without hiding new versions of a tool', () => {
    const jan = releases.find((r) => r.toolId === 'jan')!;
    const selected = filterReleases(releases, {
      shelfOnly: true,
      savedIds: ['ollama', 'jan', 'penpot'],
      category: 'ai',
      unreadOnly: true,
      readIds: [jan.id, 'ollama:older-version'],
      now: checked,
    });
    expect(selected.map((r) => r.toolId)).toEqual(['ollama']);
    expect(
      filterReleases(releases, {
        unreadOnly: true,
        readIds: releases.map((r) => r.id),
        now: checked,
      }),
    ).toEqual([]);
    expect(
      filterReleases(releases, { readIds: releases.map((r) => r.id), now: checked }),
    ).toHaveLength(releases.length);
  });

  it('excludes future and orphaned records and sorts without mutating the source', () => {
    const reversed = [...releases].reverse();
    const before = [...reversed];
    const synthetic = [
      ...reversed,
      { ...releases[0], id: 'future', publishedAt: '2999-01-01T00:00:00Z' },
      { ...releases[0], id: 'orphan', toolId: 'not-in-catalog' },
    ];
    expect(filterReleases(synthetic, { now: checked })).toEqual(releases);
    expect(reversed).toEqual(before);
    expect(filterReleases(releases, { now: Date.parse('2020-01-01T00:00:00Z') })).toEqual([]);
  });

  it('formats dates in UTC across day boundaries', () => {
    expect(formatReleaseDate('2026-09-16T00:30:00+05:30')).toBe('15 Sept 2026');
    expect(formatReleaseDate('2026-09-15T23:30:00-07:00')).toBe('16 Sept 2026');
  });

  it('validates bounded persisted read IDs with a key distinct from the shelf', () => {
    expect(releaseReadStorageKey).not.toBe('saved');
    expect(releaseReadSchema.safeParse([releases[0].id]).success).toBe(true);
    expect(releaseReadSchema.safeParse({ read: true }).success).toBe(false);
    expect(releaseReadSchema.safeParse([42]).success).toBe(false);
    expect(releaseReadSchema.safeParse(['x'.repeat(161)]).success).toBe(false);
    expect(releaseReadSchema.safeParse(Array(10001).fill('x')).success).toBe(false);
  });
});
