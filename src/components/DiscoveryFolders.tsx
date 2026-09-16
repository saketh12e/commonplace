import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { collections } from '../data/collections';
import { tools } from '../data/catalog';
import { Logo } from './ui';
import { useApp } from '../lib/app-context';
import '../styles/discovery-folders.css';

const folders = [
  {
    id: 'design-without-limits',
    title: 'Design & create',
    description: 'From a first sketch to a fully formed idea.',
    tone: 'peach',
    toolIds: ['penpot', 'blender', 'krita'],
  },
  {
    id: 'ai-on-your-terms',
    title: 'AI & agents',
    description: 'Local models and a helping hand with code.',
    tone: 'lilac',
    toolIds: ['ollama', 'aider', 'continue'],
  },
  {
    id: 'a-calmer-digital-life',
    title: 'Everyday tools',
    description: 'Take notes, share files, and manage passwords.',
    tone: 'blue',
    toolIds: ['joplin', 'localsend', 'bitwarden'],
  },
  {
    id: 'made-for-your-next-video',
    title: 'Video & audio',
    description: 'Record a story. Shape the sound. Press play.',
    tone: 'sage',
    toolIds: ['obs-studio', 'audacity', 'vlc'],
  },
];

export function DiscoveryFolders() {
  const location = useLocation();
  const { setExplorerOpen } = useApp();
  return (
    <section className="discovery-folders" aria-labelledby="folder-heading">
      <div className="folder-section-heading">
        <div>
          <h2 id="folder-heading">A good place to start</h2>
          <p>Thoughtful tools, grouped around what you do.</p>
        </div>
        <button className="folder-browse" onClick={() => setExplorerOpen(true)}>
          All categories <ArrowRight size={15} />
        </button>
      </div>
      <div className="folder-grid">
        {folders.map((folder) => {
          const collection = collections.find((item) => item.id === folder.id)!;
          return (
            <article
              className={`discovery-folder folder-${folder.tone}`}
              key={folder.id}
              aria-labelledby={`folder-${folder.id}`}
            >
              <div
                className="folder-art"
                role="group"
                aria-label={`${folder.title}: featured tools`}
              >
                {folder.toolIds.map((id) => {
                  const tool = tools.find((item) => item.id === id)!;
                  const params = new URLSearchParams(location.search);
                  params.set('tool', id);
                  return (
                    <Link
                      key={id}
                      className="folder-tool"
                      to={`${location.pathname}?${params}`}
                      aria-label={`View ${tool.name}: ${tool.tagline}`}
                      data-tool={id}
                    >
                      <span className="folder-tool-object">
                        <Logo tool={tool} size="large" />
                        <span className="folder-tool-open" aria-hidden>
                          <ArrowUpRight size={12} />
                        </span>
                      </span>
                      <span className="folder-tool-name">{tool.name}</span>
                    </Link>
                  );
                })}
              </div>
              <Link
                className="folder-front"
                to={`/collections/${folder.id}`}
                aria-label={`Explore ${folder.title}, ${collection.toolIds.length} tools`}
              >
                <svg
                  className="folder-silhouette"
                  viewBox="0 0 480 142"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M16 0H321C331 0 337 4 343 11L351 21C357 28 363 31 373 31H464Q480 31 480 47V126Q480 142 464 142H16Q0 142 0 126V16Q0 0 16 0Z" />
                </svg>
                <div className="folder-front-content">
                  <h3 id={`folder-${folder.id}`}>{folder.title}</h3>
                  <div className="folder-front-line" />
                  <div className="folder-front-bottom">
                    <div>
                      <p>{folder.description}</p>
                      <span className="folder-tool-count">
                        {collection.toolIds.length} tools to explore
                      </span>
                    </div>
                    <span className="folder-open" aria-hidden>
                      <ArrowUpRight size={19} strokeWidth={1.65} />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
