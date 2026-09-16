import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { tools } from './catalog';
import { collections } from './collections';
import { categories } from './categories';
import { z } from 'zod';
import { categoryIds } from '../lib/types';
const secureUrl = z
  .string()
  .url()
  .refine((value) => {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  });
const schema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: z.string().min(2),
    tagline: z.string().min(10).max(160),
    description: z.string().min(30),
    category: z.enum(categoryIds),
    topics: z.array(z.string().min(2)).optional(),
    platforms: z.array(z.enum(['macos', 'windows', 'linux', 'web', 'ios', 'android'])).min(1),
    license: z.string().min(2),
    website: secureUrl,
    repository: secureUrl,
    logo: z.string().regex(/^\/logos\/[a-z0-9-]+\.(svg|png|webp)$/),
    logoBackground: z.string().regex(/^#[a-fA-F0-9]{6}$/),
    features: z.array(z.string().min(2)).min(2),
    useCases: z.array(z.string().min(2)).min(1),
    alternatives: z.array(z.string()),
    setup: z.enum(['easy', 'moderate', 'advanced']),
    offline: z.boolean(),
    selfHost: z.boolean(),
    featured: z.boolean(),
    addedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    sourceUrls: z.array(secureUrl).min(1),
  })
  .strict();
describe('published catalog integrity', () => {
  it('has unique stable identifiers, names and source repositories', () => {
    expect(tools.length).toBeGreaterThanOrEqual(20);
    for (const field of ['id', 'name', 'repository'] as const)
      expect(new Set(tools.map((tool) => tool[field].toLowerCase())).size).toBe(tools.length);
  });
  it('represents every category with useful choices', () => {
    for (const category of categories)
      expect(tools.filter((tool) => tool.category === category.id).length).toBeGreaterThanOrEqual(
        2,
      );
  });
  for (const tool of tools) {
    it(`${tool.name} has complete, valid metadata and local safe artwork`, () => {
      expect(schema.safeParse(tool).error).toBeUndefined();
      expect(new Set(tool.platforms).size).toBe(tool.platforms.length);
      const path = resolve(process.cwd(), 'public', tool.logo.slice(1));
      expect(existsSync(path)).toBe(true);
      const content = readFileSync(path);
      expect(content.byteLength).toBeGreaterThan(40);
      expect(content.byteLength).toBeLessThan(500_000);
      if (tool.logo.endsWith('.svg')) {
        const svg = content.toString();
        expect(svg).toMatch(/<svg\b/);
        expect(svg).not.toMatch(
          /<script\b|<foreignObject\b|\bon[a-z]+\s*=|(?:href|xlink:href)\s*=\s*["'](?:https?:|javascript:|data:)/i,
        );
      }
      expect(Number.isFinite(Date.parse(tool.verifiedAt))).toBe(true);
      expect(Date.parse(tool.addedAt)).toBeLessThanOrEqual(Date.now());
    });
  }
  it('never leaves a collection pointing to missing or duplicate tools', () => {
    for (const collection of collections) {
      expect(collection.toolIds.length).toBeGreaterThanOrEqual(3);
      expect(new Set(collection.toolIds).size).toBe(collection.toolIds.length);
      for (const id of collection.toolIds)
        expect(
          tools.some((tool) => tool.id === id),
          `${collection.id}: missing ${id}`,
        ).toBe(true);
    }
  });
});
