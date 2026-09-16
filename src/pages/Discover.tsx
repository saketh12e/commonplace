import { useDeferredValue, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Bookmark,
  Check,
  CornerDownLeft,
  ChevronDown,
} from 'lucide-react';
import { tools } from '../data/catalog';
import { categories, platformLabels } from '../data/categories';
import { topics } from '../data/topics';
import { discoverTools, getMatchReasons, rankForProfile } from '../lib/discovery';
import type { DiscoveryFilters } from '../lib/discovery';
import { useApp } from '../lib/app-context';
import { EmptyState } from '../components/ui';
import { DiscoveryFolders } from '../components/DiscoveryFolders';
import { PlatformPicker } from '../components/PlatformPicker';
import { LibraryNav } from '../components/LibraryNav';
import { ToolCard } from '../components/ToolCard';
import type { CategoryId, Platform } from '../lib/types';
export function Discover({ mode = 'discover' }: { mode?: 'discover' | 'personal' | 'shelf' }) {
  const [params, setParams] = useSearchParams();
  const { profile, savedIds, setProfileOpen, setExplorerOpen, explorerOpen } = useApp();
  const query = params.get('q') ?? '';
  const deferredQuery = useDeferredValue(query);
  const topic = topics.find((item) => item.id === params.get('topic'));
  const rawCategory = params.get('category');
  const category =
    !topic && categories.some((item) => item.id === rawCategory)
      ? (rawCategory as CategoryId)
      : 'all';
  const rawPlatform = params.get('platform');
  const platform =
    rawPlatform && Object.hasOwn(platformLabels, rawPlatform)
      ? (rawPlatform as Platform | 'all')
      : mode === 'personal'
        ? (profile?.platform ?? 'all')
        : 'all';
  const rawSort = params.get('sort');
  const sort: DiscoveryFilters['sort'] =
    rawSort === 'name' || rawSort === 'newest' ? rawSort : 'recommended';
  const list = params.get('view') === 'list';
  const offline = params.get('offline') === '1';
  const selfHost = params.get('selfhost') === '1';
  const update = (values: Record<string, string | null>, replace = false) => {
    const next = new URLSearchParams(params);
    Object.entries(values).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    );
    if (!('page' in values)) next.delete('page');
    setParams(next, { replace });
  };
  const result = useMemo(() => {
    const base = discoverTools(tools, {
      query: deferredQuery,
      category,
      topic: topic?.id,
      platform,
      offline,
      selfHost,
      sort,
      savedIds,
      savedOnly: mode === 'shelf',
    });
    return mode === 'personal' && profile && sort === 'recommended'
      ? rankForProfile(base, { ...profile, platform })
      : base;
  }, [deferredQuery, category, topic, platform, offline, selfHost, sort, savedIds, mode, profile]);
  const showIntro = mode === 'discover' && !query && category === 'all' && !topic;
  const rawPage = Number(params.get('page') ?? '1');
  const pageNumber =
    Number.isSafeInteger(rawPage) && rawPage > 0
      ? Math.min(rawPage, Math.max(1, Math.ceil(result.length / 12)))
      : 1;
  const shown = pageNumber * 12;
  const activeLabel =
    topic?.label ?? categories.find((item) => item.id === category)?.label ?? 'All software';
  return (
    <div className="page discover-page">
      {mode === 'shelf' && <LibraryNav />}
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            {mode === 'personal'
              ? 'A LITTLE MORE YOU'
              : mode === 'shelf'
                ? 'YOUR OWN LITTLE COLLECTION'
                : 'THE OPEN-SOURCE EDIT'}
          </div>
          <h1>
            {mode === 'personal'
              ? 'Good tools. Your kind of good.'
              : mode === 'shelf'
                ? 'Keep the good ones close.'
                : 'Good software. Open possibilities.'}
          </h1>
          <p>
            {mode === 'personal'
              ? 'A starting point shaped around your work and your device.'
              : mode === 'shelf'
                ? 'Your saved tools, ready when you need them. Stored on this device.'
                : 'An independent library of open-source tools, selected for the way you work.'}
          </p>
        </div>
        {mode !== 'shelf' && (
          <button className="button personalize-button" onClick={() => setProfileOpen(true)}>
            <SlidersHorizontal size={16} />
            Device & interests
          </button>
        )}
      </div>
      <div className="search-surface">
        <Search size={22} strokeWidth={1.55} />
        <input
          id="catalog-search"
          type="search"
          aria-label="Find a tool or describe what you need"
          placeholder="What do you want to do?"
          value={query}
          onChange={(event) => update({ q: event.target.value || null }, true)}
          autoComplete="off"
        />
        <span className="search-hint desktop-only">Try “edit photos”</span>
        <span className="search-return" aria-hidden>
          <CornerDownLeft size={18} />
        </span>
      </div>
      {mode === 'personal' && !profile && (
        <div className="personal-invitation">
          <span className="personal-icon">
            <SlidersHorizontal size={25} strokeWidth={1.5} />
          </span>
          <div>
            <h2>A few details. A better starting point.</h2>
            <p>Choose your device and what you do. We’ll surface tools that fit.</p>
          </div>
          <button className="button button-dark" onClick={() => setProfileOpen(true)}>
            Set your preferences <ArrowRight size={16} />
          </button>
        </div>
      )}
      {mode === 'personal' && profile && (
        <div className="profile-summary">
          <Check size={16} />
          <span>
            For {profile.role.toLowerCase()} · {platformLabels[profile.platform]}
            {profile.goal ? ` · ${profile.goal}` : ''}
          </span>
          <button onClick={() => setProfileOpen(true)}>Edit</button>
        </div>
      )}
      {showIntro && <DiscoveryFolders />}
      <div
        id="catalog"
        tabIndex={-1}
        className="catalog-section"
        aria-busy={query !== deferredQuery}
      >
        <div className="section-heading">
          <h2>
            {mode === 'shelf'
              ? 'Your saved tools'
              : mode === 'personal'
                ? 'Selected for you'
                : query
                  ? 'Search results'
                  : topic
                    ? topic.label
                    : category === 'all'
                      ? 'Explore the library'
                      : categories.find((item) => item.id === category)?.label}
            <span className="count-badge">{result.length}</span>
          </h2>
          <span className="catalog-caption">
            {mode === 'shelf'
              ? 'Your shelf stays on this device'
              : 'Curated with care, shared with you'}
          </span>
        </div>
        <div className="topic-switchboard">
          <button
            className="topic-trigger"
            onClick={() => setExplorerOpen(true)}
            aria-label={`Browse topics, current topic: ${activeLabel}`}
            aria-haspopup="dialog"
            aria-expanded={explorerOpen}
          >
            <span className="topic-trigger-icon">
              <LayoutGrid size={19} strokeWidth={1.6} />
            </span>
            <span>
              <small>EXPLORE</small>
              <strong>{activeLabel}</strong>
            </span>
            <ChevronDown size={17} />
          </button>
          <PlatformPicker
            value={platform}
            onChange={(value) =>
              update({ platform: value === 'all' && mode !== 'personal' ? null : value })
            }
          />
        </div>
        <div className="filter-bar">
          <div className="filter-controls">
            <button
              className={`filter-chip ${offline ? 'filter-active' : ''}`}
              onClick={() => update({ offline: offline ? null : '1' })}
              aria-pressed={offline}
            >
              {offline && <Check size={13} />}Works offline
            </button>
            <button
              className={`filter-chip ${selfHost ? 'filter-active' : ''}`}
              onClick={() => update({ selfhost: selfHost ? null : '1' })}
              aria-pressed={selfHost}
            >
              {selfHost && <Check size={13} />}Self-hostable
            </button>
            {(topic ||
              category !== 'all' ||
              platform !== 'all' ||
              query ||
              offline ||
              selfHost) && (
              <button className="clear-filters" onClick={() => setParams({})}>
                Reset <X size={12} />
              </button>
            )}
          </div>
          <div className="view-controls">
            <label className="sort-control">
              <span className="sr-only">Sort tools</span>
              <select
                aria-label="Sort tools"
                value={sort}
                onChange={(event) => update({ sort: event.target.value })}
              >
                <option value="recommended">Recommended</option>
                <option value="name">Name A–Z</option>
                <option value="newest">Recently added</option>
              </select>
            </label>
            <span className="view-toggle">
              <button
                className={!list ? 'selected' : ''}
                aria-label="Grid view"
                aria-pressed={!list}
                onClick={() => update({ view: null })}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={list ? 'selected' : ''}
                aria-label="List view"
                aria-pressed={list}
                onClick={() => update({ view: 'list' })}
              >
                <List size={17} />
              </button>
            </span>
          </div>
        </div>
        <p className="sr-only" role="status">
          {result.length} tools found
        </p>
        {result.length > 0 ? (
          <>
            <div className={`tools-grid ${list ? 'list-view' : ''}`}>
              {result.slice(0, shown).map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  reason={
                    mode === 'personal' && profile
                      ? getMatchReasons(tool, { ...profile, platform })[0]
                      : undefined
                  }
                />
              ))}
            </div>
            {shown < result.length && (
              <div className="load-more">
                <button className="button" onClick={() => update({ page: String(pageNumber + 1) })}>
                  Show more tools <span>{result.length - shown} more</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={
              mode === 'shelf' ? (
                <Bookmark size={27} strokeWidth={1.4} />
              ) : (
                <Search size={27} strokeWidth={1.4} />
              )
            }
            title={
              mode === 'shelf' && !savedIds.length
                ? 'Your next favorite belongs here.'
                : 'No tools found. Yet.'
            }
            description={
              mode === 'shelf' && !savedIds.length
                ? 'Save any tool in the library and come back to it whenever you like.'
                : 'Try a broader search or remove a filter. You can also suggest something we’re missing.'
            }
            action={
              <div className="empty-actions">
                {mode === 'shelf' && !savedIds.length ? (
                  <Link className="button button-dark" to="/">
                    Explore the library <ArrowRight size={16} />
                  </Link>
                ) : (
                  <>
                    <button className="button" onClick={() => setParams({})}>
                      Clear filters
                    </button>
                    <Link className="button button-dark" to="/alternatives">
                      Find an alternative
                    </Link>
                  </>
                )}
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
