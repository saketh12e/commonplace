import type { Tool } from './types';

// Muted artwork accents, not action colors. Monochrome marks stay in the slate family.
const slate = '#74818f';
const toolTints: Readonly<Record<string, string>> = {
  penpot: slate,
  blender: '#c8824e',
  krita: '#b8759e',
  inkscape: slate,
  gimp: '#948475',
  vscodium: '#648eb3',
  bruno: '#b78d68',
  dbeaver: '#93816f',
  zed: slate,
  joplin: '#6c8dbb',
  localsend: '#6b9f9e',
  bitwarden: '#6a8fc3',
  syncthing: '#68a2bb',
  'obs-studio': slate,
  audacity: '#748fc0',
  handbrake: '#9cab72',
  vlc: '#cf925b',
  zotero: '#b77379',
  logseq: '#77a8b9',
  libreoffice: '#7a9c73',
  keepassxc: '#7d9f76',
  cryptomator: '#9baa6b',
  appflowy: '#a58abc',
  flameshot: '#b7789b',
  sharex: '#8298bc',
  kdeconnect: '#78a4b6',
  ollama: slate,
  'llama-cpp': '#b88f72',
  jan: '#bd9a74',
  gpt4all: '#7e9b7b',
  firefox: '#c78b79',
  brave: '#c78765',
  zen: slate,
  librewolf: '#718faa',
  chromium: '#729ab9',
  browseros: '#8f93b4',
  aider: '#88a16e',
  openhands: slate,
  goose: slate,
  continue: slate,
  opencode: slate,
  'browser-use': slate,
  'node-red': '#b7767c',
  huginn: '#b79966',
  windmill: '#7496c1',
  activepieces: '#a18bb8',
};

// New tools get a predictable category accent until their artwork is curated.
const categoryTints: Record<Tool['category'], string> = {
  design: '#a48ea9',
  development: '#8099b0',
  productivity: '#819d99',
  privacy: '#859c86',
  media: '#b49385',
  utilities: '#a8997d',
  ai: '#9392aa',
  browsers: '#859eb2',
  agents: slate,
  automation: '#8e9eaa',
};

/** A curated hex accent for a tool's decorative surfaces, shared with the spotlight. */
export function getToolTint(tool: Pick<Tool, 'id' | 'category'>): string {
  return Object.hasOwn(toolTints, tool.id) ? toolTints[tool.id] : categoryTints[tool.category];
}
