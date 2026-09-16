import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Footprints, Layers3, RotateCcw } from 'lucide-react';
import { tools } from '../data/catalog';
import { categories } from '../data/categories';
import { useLibrary } from '../lib/library-context';
import { useApp } from '../lib/app-context';
import { LibraryNav } from '../components/LibraryNav';
import { CategoryIcon, EmptyState, Logo } from '../components/ui';

export function Trail() {
  const { visitIds, stacks, clearTrail, persisted } = useLibrary();
  const { savedIds, notify } = useApp();
  const visited = visitIds
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool) => !!tool);
  const explored = new Set(visited.map((tool) => tool.category));
  const milestones = [
    {
      id: 'first-find',
      name: 'First find',
      note: 'Look inside one tool.',
      earned: visited.length >= 1,
    },
    {
      id: 'good-eye',
      name: 'Good eye',
      note: 'Save three tools for later.',
      earned: new Set(savedIds.filter((id) => tools.some((tool) => tool.id === id))).size >= 3,
    },
    {
      id: 'wide-angle',
      name: 'Wide angle',
      note: 'Explore three categories.',
      earned: explored.size >= 3,
    },
    {
      id: 'toolmaker',
      name: 'Toolkit ready',
      note: 'Create a stack with three tools.',
      earned: stacks.some((stack) => stack.toolIds.length >= 3),
    },
  ];
  const cleared = useRef(false);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  useLayoutEffect(() => {
    if (cleared.current && !visited.length) {
      exploreRef.current?.focus();
      cleared.current = false;
    }
  }, [visited.length]);
  const earned = milestones.filter((m) => m.earned).length;
  return (
    <div className="page trail-page">
      <LibraryNav />
      <div className="page-heading">
        <div>
          <div className="eyebrow">A LITTLE CURIOSITY GOES A LONG WAY</div>
          <h1>Your discovery trail.</h1>
          <p>Pick up a good find and see which corners you’ve explored.</p>
        </div>
        {visited.length > 0 && (
          <button
            className="button"
            onClick={() => {
              cleared.current = true;
              clearTrail();
              notify('Discovery history cleared');
            }}
          >
            <RotateCcw size={15} />
            Clear history
          </button>
        )}
      </div>
      {!persisted && (
        <p className="storage-notice" role="status">
          History lasts for this visit because browser storage is unavailable.
        </p>
      )}
      <section className="passport" aria-label="Discovery progress">
        <div className="passport-intro">
          <svg className="passport-seal" viewBox="0 0 112 112" fill="none" aria-hidden>
            <circle className="seal-track" cx="56" cy="56" r="45" />
            <circle
              className="seal-progress"
              cx="56"
              cy="56"
              r="45"
              pathLength="100"
              strokeDasharray={`${earned * 25} 100`}
              transform="rotate(-90 56 56)"
            />
            <path d="M72 36H53a20 20 0 0 0 0 40h19M63 54h18" />
            {earned > 0 && (
              <>
                <circle cx="88" cy="86" r="12" />
                <path className="seal-check" d="m83 86 4 4 7-8" />
              </>
            )}
          </svg>
          <div>
            <div className="eyebrow">YOUR EXPLORER’S PASSPORT</div>
            <h2>
              {earned === 4
                ? 'A well-earned sense of possibility.'
                : earned
                  ? 'A few good finds. More to come.'
                  : 'Small discoveries add up.'}
            </h2>
            <p>{earned} of 4 milestones · Saved on this device</p>
          </div>
        </div>
        <div className="milestone-grid">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className={`milestone ${milestone.earned ? 'earned' : ''}`}>
              <span className="milestone-mark">
                {milestone.earned ? (
                  <Check size={20} />
                ) : (
                  <span>{String(index + 1).padStart(2, '0')}</span>
                )}
              </span>
              <div>
                <h3>{milestone.name}</h3>
                <p>{milestone.note}</p>
              </div>
              <span className="sr-only">{milestone.earned ? 'Earned' : 'Not yet earned'}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="trail-categories">
        <div className="section-heading">
          <h2>
            Your map of the library{' '}
            <span className="count-badge">
              {explored.size}/{categories.length}
            </span>
          </h2>
        </div>
        <div className="category-map">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/?category=${category.id}`}
              className={explored.has(category.id) ? 'explored' : ''}
            >
              <CategoryIcon category={category.id} size={20} />
              <span>{category.label}</span>
              {explored.has(category.id) ? <Check size={14} /> : <ArrowUpRight size={14} />}
            </Link>
          ))}
        </div>
      </section>
      <section className="recent-section">
        <div className="section-heading">
          <h2>
            Recently explored <span className="count-badge">{visited.length}</span>
          </h2>
        </div>
        {visited.length ? (
          <div className="recent-grid">
            {visited.map((tool) => (
              <Link to={`?tool=${tool.id}`} className="recent-tool" key={tool.id}>
                <Logo tool={tool} />
                <span>
                  <strong>{tool.name}</strong>
                  <small>{tool.tagline}</small>
                </span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Footprints size={28} />}
            title="Your next discovery starts here."
            description="Open a tool’s details to leave your first footprint. Nothing is tracked outside this browser."
            action={
              <Link className="button button-dark" to="/" ref={exploreRef}>
                Explore the library
                <ArrowUpRight size={16} />
              </Link>
            }
          />
        )}
      </section>
      <div className="trail-next">
        <Layers3 size={22} />
        <span>Found a few that belong together?</span>
        <Link to="/stacks">
          Build a stack
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
