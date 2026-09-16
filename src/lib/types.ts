export const categoryIds = [
  'design',
  'development',
  'productivity',
  'privacy',
  'media',
  'utilities',
  'ai',
  'browsers',
  'agents',
  'automation',
] as const;
export type CategoryId = (typeof categoryIds)[number];

export type Platform = 'macos' | 'windows' | 'linux' | 'web' | 'ios' | 'android';

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: CategoryId;
  topics?: string[];
  platforms: Platform[];
  license: string;
  website: string;
  repository: string;
  logo: string;
  logoBackground: string;
  features: string[];
  useCases: string[];
  alternatives: string[];
  setup: 'easy' | 'moderate' | 'advanced';
  offline: boolean;
  selfHost: boolean;
  featured: boolean;
  addedAt: string;
  verifiedAt: string;
  sourceUrls: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  category: string;
  toolIds: string[];
  color: string;
}
