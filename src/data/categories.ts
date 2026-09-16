import type { CategoryId, Platform } from '../lib/types';
export const categories: { id: CategoryId; label: string; description: string }[] = [
  {
    id: 'ai',
    label: 'AI & machine learning',
    description: 'Local models, intelligent search, and tools you can inspect.',
  },
  {
    id: 'agents',
    label: 'Agentic tools',
    description: 'Coding partners and agents that can take action.',
  },
  {
    id: 'browsers',
    label: 'Web browsers',
    description: 'A more independent way to experience the web.',
  },
  {
    id: 'automation',
    label: 'Automation',
    description: 'Connect your tools and let repetitive work run itself.',
  },
  { id: 'design', label: 'Design', description: 'Make something worth looking at.' },
  { id: 'development', label: 'Development', description: 'A better toolkit for building.' },
  { id: 'productivity', label: 'Productivity', description: 'Less friction. More good work.' },
  { id: 'privacy', label: 'Privacy & security', description: 'Keep your digital life yours.' },
  { id: 'media', label: 'Photo, video & audio', description: 'Everything you need to create.' },
  {
    id: 'utilities',
    label: 'Everyday utilities',
    description: 'Small tools that make a difference.',
  },
];
export const platformLabels: Record<Platform | 'all', string> = {
  all: 'All platforms',
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  web: 'Web',
  ios: 'iOS',
  android: 'Android',
};
export const desktopPlatforms: Platform[] = ['macos', 'windows', 'linux'];
export const roles = ['Designer', 'Developer', 'Creator', 'Student', 'Everyday explorer'];
