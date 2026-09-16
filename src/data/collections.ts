import type { Collection } from '../lib/types';
export const collections: Collection[] = [
  {
    id: 'design-without-limits',
    title: 'Design without limits.',
    description:
      'From the first sketch to the final pixel. A creative toolkit you can make your own.',
    category: 'FOR THE CREATORS',
    toolIds: ['penpot', 'blender', 'krita', 'inkscape'],
    color: 'blue',
  },
  {
    id: 'your-next-side-project',
    title: 'Build your next idea.',
    description: 'A focused toolkit for writing code, testing APIs, and working with data.',
    category: 'FOR THE BUILDERS',
    toolIds: ['vscodium', 'bruno', 'dbeaver', 'zed'],
    color: 'peach',
  },
  {
    id: 'a-calmer-digital-life',
    title: 'A calmer digital life.',
    description: 'A place for your notes, your files, and a little more peace of mind.',
    category: 'FOR EVERY DAY',
    toolIds: ['joplin', 'localsend', 'bitwarden', 'syncthing'],
    color: 'sage',
  },
  {
    id: 'made-for-your-next-video',
    title: 'Ready. Record. Create.',
    description: 'Capture a great story, shape the sound, and get it ready to share.',
    category: 'FOR THE STORYTELLERS',
    toolIds: ['obs-studio', 'audacity', 'handbrake', 'vlc'],
    color: 'lavender',
  },
  {
    id: 'study-on-your-terms',
    title: 'A little more headspace.',
    description: 'Organize your research, connect your thinking, and get your ideas onto the page.',
    category: 'FOR THE CURIOUS',
    toolIds: ['zotero', 'logseq', 'libreoffice', 'joplin'],
    color: 'sand',
  },
  {
    id: 'keep-it-yours',
    title: 'Your data. Your rules.',
    description: 'Practical starting points for passwords, encrypted files, and private syncing.',
    category: 'FOR YOUR PEACE OF MIND',
    toolIds: ['keepassxc', 'cryptomator', 'syncthing', 'bitwarden'],
    color: 'silver',
  },
  {
    id: 'ai-on-your-terms',
    title: 'AI, on your terms.',
    description:
      'Explore local models, a desktop chat workspace, and coding support. Download models first; hardware and model licenses vary.',
    category: 'FOR THE INDEPENDENT',
    toolIds: ['ollama', 'jan', 'aider', 'continue'],
    color: 'silver',
  },
  {
    id: 'a-better-way-to-browse',
    title: 'A different window.',
    description:
      'Four alternative browsers to explore, from familiar Firefox to the agentic workflows of BrowserOS.',
    category: 'FOR THE WEB',
    toolIds: ['firefox', 'brave', 'zen', 'browseros'],
    color: 'blue',
  },
  {
    id: 'less-repeat-more-create',
    title: 'Let the routine run.',
    description:
      'Self-hosted options for connecting services and automating recurring work. Each needs setup; start with one that fits.',
    category: 'FOR YOUR WORKFLOWS',
    toolIds: ['node-red', 'huginn', 'activepieces'],
    color: 'sage',
  },
];
