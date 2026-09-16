import type { CategoryId, Tool } from '../lib/types';

export interface Topic {
  id: string;
  label: string;
  description: string;
  category: CategoryId;
  categoryMatch?: CategoryId;
  toolIds?: string[];
  aliases: string;
}

// Focused edits cross category boundaries without giving a project duplicate records.
export const topics: Topic[] = [
  {
    id: 'local-ai',
    label: 'Local AI',
    description:
      'Run models on your own hardware. Check each tool for model and setup requirements.',
    category: 'ai',
    aliases: 'offline models llm private artificial intelligence',
  },
  {
    id: 'open-source-browsers',
    label: 'Open-source browsers',
    description: 'Explore browsers whose source code is available to inspect and build.',
    category: 'browsers',
    categoryMatch: 'browsers',
    aliases: 'web internet firefox chromium',
  },
  {
    id: 'ai-browsers',
    label: 'AI browsers',
    description: 'Browsers with integrated AI workflows. Model services may have separate costs.',
    category: 'browsers',
    aliases: 'agentic browser assistant intelligent',
  },
  {
    id: 'coding-agents',
    label: 'Coding agents',
    description: 'Agents and assistants for navigating, editing, and understanding a codebase.',
    category: 'agents',
    aliases: 'developer programming assistant coding',
  },
  {
    id: 'browser-agents',
    label: 'Browser agents',
    description: 'Tools that can navigate websites and carry out browser tasks.',
    category: 'agents',
    aliases: 'web automation agentic',
  },
  {
    id: 'private-browsing',
    label: 'Privacy-minded browsing',
    description: 'Browsers with a focus on tracking protection and privacy controls.',
    category: 'browsers',
    aliases: 'privacy security tracking private browser',
  },
  {
    id: 'workflow-automation',
    label: 'Workflow automation',
    description: 'Connect services, schedule jobs, and put repetitive work in motion.',
    category: 'automation',
    aliases: 'workflow scheduled tasks integrations',
  },
];

export function matchesTopic(tool: Tool, id: string): boolean {
  const topic = topics.find((entry) => entry.id === id);
  if (!topic) return true;
  return (
    tool.topics?.includes(id) === true ||
    topic.toolIds?.includes(tool.id) === true ||
    tool.category === topic.categoryMatch
  );
}
