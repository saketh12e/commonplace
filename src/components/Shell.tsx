import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  Compass,
  SlidersHorizontal,
  Layers3,
  Bookmark,
  ArrowUpRight,
  Search,
  Radio,
  Footprints,
  ArrowLeftRight,
  LockKeyhole,
  ChevronRight,
  LibraryBig,
  Grid2X2,
  Check,
  X,
  BrainCircuit,
  Bot,
  Globe,
  PenTool,
  Code2,
  CheckCheck,
  ShieldCheck,
  Play,
  Wrench,
  Workflow,
} from 'lucide-react';
import type { CategoryId } from '../lib/types';
import { useApp } from '../lib/app-context';
import { Appearance } from './Appearance';
import { BrandMark, Logo, PlatformIcon, Shortcut, shiftGlass, resetGlass } from './ui';
import { platformLabels } from '../data/categories';
import { tools } from '../data/catalog';
import { topics } from '../data/topics';
import '../styles/library-rail.css';
const navigation = [
  { to: '/', label: 'Discover', Icon: Compass },
  { to: '/collections', label: 'Collections', Icon: Layers3 },
  { to: '/alternatives', label: 'Alternatives', Icon: ArrowLeftRight },
  { to: '/updates', label: 'Release radar', Icon: Radio },
];
const libraryNavigation = [
  { to: '/shelf', label: 'Saved tools', Icon: Bookmark },
  { to: '/stacks', label: 'Your stacks', Icon: Layers3 },
  { to: '/trail', label: 'Discovery trail', Icon: Footprints },
];
const mobileNavigation = [
  navigation[0],
  { ...navigation[2], label: 'Switch' },
  navigation[1],
  { ...navigation[3], label: 'Radar' },
  { ...libraryNavigation[0], label: 'Library' },
];
const categoryNavigation = [
  { id: 'ai', label: 'AI tools', Icon: BrainCircuit },
  { id: 'agents', label: 'Agentic tools', Icon: Bot },
  { id: 'browsers', label: 'Browsers', Icon: Globe },
  { id: 'design', label: 'Design', Icon: PenTool },
  { id: 'development', label: 'Development', Icon: Code2 },
  { id: 'productivity', label: 'Productivity', Icon: CheckCheck },
  { id: 'privacy', label: 'Privacy', Icon: ShieldCheck },
  { id: 'media', label: 'Media', Icon: Play },
  { id: 'utilities', label: 'Utilities', Icon: Wrench },
  { id: 'automation', label: 'Automation', Icon: Workflow },
] satisfies { id: CategoryId; label: string; Icon: typeof Compass }[];
const categoryCounts = new Map(
  categoryNavigation.map(({ id }) => [id, tools.filter((tool) => tool.category === id).length]),
);

function WorkspaceNav({
  items,
  label,
  savedCount,
  categoryActive = false,
}: {
  items: typeof navigation;
  label: string;
  savedCount: number;
  categoryActive?: boolean;
}) {
  const location = useLocation();
  return (
    <nav aria-label={label} className="workspace-nav">
      {items.map(({ to, label, Icon }) => {
        const isActive =
          to === '/'
            ? location.pathname === '/' && !categoryActive
            : location.pathname === to || location.pathname.startsWith(`${to}/`);
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            title={label}
            aria-current={isActive ? 'page' : undefined}
            data-shelf-target={to === '/shelf' ? 'true' : undefined}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onPointerMove={shiftGlass}
            onPointerLeave={resetGlass}
          >
            <Icon size={18} strokeWidth={1.65} aria-hidden="true" />
            <span>{label}</span>
            {to === '/shelf' && savedCount > 0 && <span className="nav-count">{savedCount}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
export function Shell({ children }: { children: ReactNode }) {
  const {
    savedIds,
    profile,
    setProfileOpen,
    setCommandOpen,
    setExplorerOpen,
    explorerOpen,
    compareIds,
    toggleCompare,
    clearCompare,
    toast,
    undoSave,
    storageAvailable,
  } = useApp();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeTopic =
    location.pathname === '/'
      ? topics.find((topic) => topic.id === params.get('topic'))
      : undefined;
  const activeCategory =
    location.pathname === '/' && !activeTopic
      ? categoryNavigation.find(({ id }) => id === params.get('category'))
      : undefined;
  const categoryHref = (id: CategoryId) => {
    const next = new URLSearchParams();
    // Explicit category browsing retains only the current catalog's display/filter choices.
    if (location.pathname === '/') {
      for (const key of ['platform', 'offline', 'selfhost', 'view', 'sort']) {
        const value = params.get(key);
        if (value !== null) next.set(key, value);
      }
    }
    next.set('category', id);
    return `/?${next.toString()}`;
  };
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.isComposing || document.querySelector('[role="dialog"][data-state="open"]')) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setCommandOpen]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname, activeCategory?.id, activeTopic?.id]);
  const current =
    activeCategory?.label ??
    (location.pathname === '/' ? activeTopic?.label : undefined) ??
    [...navigation, ...libraryNavigation].find((item) => item.to === location.pathname)?.label ??
    (location.pathname.startsWith('/collections/')
      ? 'Collections'
      : location.pathname.startsWith('/stacks/')
        ? 'Your stacks'
        : location.pathname === '/compare'
          ? 'Compare tools'
          : 'Discover');
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside className="sidebar library-rail">
        <Link
          to="/"
          className="brand"
          aria-label="Commonplace home"
          onPointerMove={shiftGlass}
          onPointerLeave={resetGlass}
        >
          <BrandMark />
          <span>commonplace</span>
        </Link>
        <button
          className="rail-search"
          aria-label="Quick search"
          title="Quick search"
          onClick={() => setCommandOpen(true)}
        >
          <Search size={16} />
          <span>Quick search</span>
          <Shortcut />
        </button>
        <div
          className="library-rail-scroll"
          tabIndex={0}
          role="region"
          aria-label="Library navigation"
        >
          <WorkspaceNav
            items={navigation}
            label="Main navigation"
            savedCount={savedIds.length}
            categoryActive={Boolean(activeCategory)}
          />
          <section className="library-rail-explore" aria-labelledby="rail-explore-heading">
            <div className="rail-divider" />
            <h2 id="rail-explore-heading" className="rail-label">
              EXPLORE
            </h2>
            <nav className="library-category-nav" aria-label="Explore categories">
              {categoryNavigation.map(({ id, label, Icon }) => (
                <Link
                  key={id}
                  to={categoryHref(id)}
                  className={`library-category-link ${activeCategory?.id === id ? 'active' : ''}`}
                  aria-current={activeCategory?.id === id ? 'page' : undefined}
                  aria-label={label}
                  title={label}
                >
                  <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                  <span>{label}</span>
                  <span className="category-count">{categoryCounts.get(id)}</span>
                </Link>
              ))}
            </nav>
          </section>
          <div className="rail-divider" />
          <h2 className="rail-label">YOUR LIBRARY</h2>
          <WorkspaceNav
            items={libraryNavigation}
            label="Personal library"
            savedCount={savedIds.length}
          />
          <button
            className="rail-topic-button library-rail-topics"
            aria-label="Browse topics"
            title="Browse topics"
            onClick={() => setExplorerOpen(true)}
            aria-expanded={explorerOpen}
            aria-haspopup="dialog"
          >
            <Grid2X2 size={19} strokeWidth={1.5} aria-hidden="true" />
            <span>Browse topics</span>
          </button>
        </div>
        <div className="rail-bottom">
          <button
            className="profile-control"
            aria-label="Edit device and interests"
            title="Device & interests"
            onClick={() => setProfileOpen(true)}
          >
            <span className="profile-avatar">
              <PlatformIcon platform={profile?.platform ?? 'all'} size={22} />
            </span>
            <span>
              <strong>Device & interests</strong>
              <small>
                {profile
                  ? `${platformLabels[profile.platform]} · ${profile.role}`
                  : 'Choose your platform and work'}
              </small>
            </span>
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <div className="breadcrumb">
            <LibraryBig className="desktop-only" size={17} strokeWidth={1.5} />
            <span className="desktop-only breadcrumb-divider" />
            <Link to="/" className="mobile-brand">
              <BrandMark />
              <span>commonplace</span>
            </Link>
            <span className="desktop-only">Library</span>
            <ChevronRight className="desktop-only" size={13} />
            <strong className="desktop-only">{current}</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="library-topics-trigger"
              aria-label="Browse all topics"
              title="Browse all topics"
              onClick={() => setExplorerOpen(true)}
              aria-expanded={explorerOpen}
              aria-haspopup="dialog"
            >
              <Grid2X2 size={15} strokeWidth={1.6} aria-hidden="true" />
              <span>Browse all topics</span>
            </button>
            <Appearance />
            <span className="open-source-note">
              <span /> Open source.
            </span>
            <button
              className="icon-button mobile-only"
              onClick={() => setCommandOpen(true)}
              aria-label="Search tools"
            >
              <Search size={19} />
            </button>
            <Link className="button button-small topbar-library" to="/stacks">
              <Layers3 size={16} />
              <span>Your stacks</span>
            </Link>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          {!storageAvailable && (
            <div role="status" className="storage-notice">
              Browser storage is unavailable. Your choices will last for this visit.
            </div>
          )}
          {children}
        </main>
        <footer className="site-footer">
          <span>Independent software, thoughtfully selected.</span>
          <span className="contributions-paused">
            <LockKeyhole size={12} />
            Tool submissions are paused
          </span>
        </footer>
      </div>
      <nav className="mobile-navigation" aria-label="Mobile navigation">
        {mobileNavigation.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={label}
            title={label}
            data-shelf-target={to === '/shelf' ? 'true' : undefined}
            className={({ isActive }) =>
              isActive ||
              (to === '/shelf' &&
                ['/stacks', '/trail'].some((path) => location.pathname.startsWith(path)))
                ? 'active'
                : ''
            }
          >
            <Icon size={20} strokeWidth={1.6} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      {compareIds.length > 0 && location.pathname !== '/compare' && (
        <div className="compare-tray">
          <span className="tray-label">
            Compare <b>{compareIds.length}/3</b>
          </span>
          <div className="tray-logos">
            {compareIds.map((id) => {
              const tool = tools.find((item) => item.id === id);
              return tool ? (
                <button
                  key={id}
                  className="tray-logo"
                  title={`Remove ${tool.name}`}
                  aria-label={`Remove ${tool.name} from comparison`}
                  onClick={() => toggleCompare(id)}
                >
                  <Logo tool={tool} size="small" />
                  <X size={11} />
                </button>
              ) : null;
            })}
          </div>
          <Link className="button button-dark" to={`/compare?tools=${compareIds.join(',')}`}>
            Compare tools <ArrowUpRight size={15} />
          </Link>
          <button className="icon-button" aria-label="Clear comparison" onClick={clearCompare}>
            <X size={18} />
          </button>
        </div>
      )}
      <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">
        {toast && (
          <>
            <Check size={16} />
            {toast}
            {undoSave && (
              <button className="toast-undo" onClick={undoSave}>
                Undo
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
