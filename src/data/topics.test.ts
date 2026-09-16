import { describe, expect, it } from 'vitest';
import { discoverTools } from '../lib/discovery';
import { tools } from './catalog';
import { matchesTopic, topics } from './topics';

describe('focused topic discovery', () => {
  it('keeps catalog topic tags valid and every edit useful', () => {
    for (const tool of tools)
      for (const id of tool.topics ?? [])
        expect(
          topics.some((topic) => topic.id === id),
          `${tool.id}: ${id}`,
        ).toBe(true);
    for (const topic of topics)
      expect(
        tools.some((tool) => matchesTopic(tool, topic.id)),
        topic.id,
      ).toBe(true);
  });
  it('finds local AI across both AI applications and coding agents', () => {
    const ids = discoverTools(tools, { topic: 'local-ai' }).map((tool) => tool.id);
    expect(ids).toContain('ollama');
    expect(ids).toContain('aider');
    expect(ids).not.toContain('firefox');
  });
  it('separates a browser with an agent from a browser automation library', () => {
    expect(discoverTools(tools, { topic: 'ai-browsers' }).map((tool) => tool.id)).toContain(
      'browseros',
    );
    expect(discoverTools(tools, { topic: 'ai-browsers' }).map((tool) => tool.id)).not.toContain(
      'browser-use',
    );
    expect(discoverTools(tools, { topic: 'browser-agents' }).map((tool) => tool.id)).toEqual(
      expect.arrayContaining(['browseros', 'browser-use']),
    );
  });
  it('intersects topic, query, category, offline and saved constraints', () => {
    const result = discoverTools(tools, {
      topic: 'local-ai',
      category: 'agents',
      query: 'aider',
      offline: true,
      savedOnly: true,
      savedIds: ['aider', 'firefox'],
      platform: 'linux',
    });
    expect(result.map((tool) => tool.id)).toEqual(['aider']);
    expect(
      discoverTools(tools, { topic: 'ai-browsers', savedOnly: true, savedIds: ['firefox'] }),
    ).toEqual([]);
  });
  it('returns all browser choices through the open-source browser edit', () => {
    expect(discoverTools(tools, { topic: 'open-source-browsers' })).toEqual(
      discoverTools(tools, { category: 'browsers' }),
    );
  });
  it('treats unknown and prototype-looking topic IDs as no selection', () => {
    for (const topic of ['missing', 'toString', '__proto__'])
      expect(discoverTools(tools, { topic })).toEqual(discoverTools(tools));
  });
});
