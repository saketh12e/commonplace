import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Check, CheckCheck, Radar, RotateCcw } from 'lucide-react';
import { tools } from '../data/catalog';
import { categories } from '../data/categories';
import { CategoryIcon, EmptyState, Logo, Modal } from '../components/ui';
import { useApp } from '../lib/app-context';
import { useStored } from '../lib/storage';
import {
  filterReleases,
  formatReleaseDate,
  releases,
  releasesCheckedAt,
  releaseReadSchema,
  releaseReadStorageKey,
} from '../data/releases';
import '../styles/releases.css';

export function Updates() {
  const { savedIds, notify } = useApp();
  const [readIds, setReadIds, persisted] = useStored<string[]>(
    releaseReadStorageKey,
    releaseReadSchema,
    [],
  );
  const [scope, setScope] = useState<'all' | 'shelf'>('all');
  const [category, setCategory] = useState('all');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const available = filterReleases(releases);
  const shelfReleases = available.filter((release) => savedIds.includes(release.toolId));
  const visible = filterReleases(available, {
    shelfOnly: scope === 'shelf',
    savedIds,
    category,
    unreadOnly,
    readIds,
  });
  const visibleUnread = visible.filter((release) => !readIds.includes(release.id));
  const readCount = available.filter((release) => readIds.includes(release.id)).length;
  const releaseCategories = categories.filter((item) =>
    available.some(
      (release) => tools.find((tool) => tool.id === release.toolId)?.category === item.id,
    ),
  );
  const hasNoShelfReleases = scope === 'shelf' && shelfReleases.length === 0;

  function toggleRead(id: string, name: string) {
    const isRead = readIds.includes(id);
    setReadIds((previous) =>
      isRead ? previous.filter((item) => item !== id) : [...new Set([...previous, id])],
    );
    notify(`${name} marked ${isRead ? 'unread' : 'read'}`);
  }

  function markVisibleRead() {
    setReadIds((previous) => [...new Set([...previous, ...visibleUnread.map((r) => r.id)])]);
    notify(
      `${visibleUnread.length} ${visibleUnread.length === 1 ? 'release' : 'releases'} marked read`,
    );
  }

  return (
    <div className="page release-radar">
      <header className="release-heading">
        <div className="eyebrow">FOLLOW WHAT CHANGES</div>
        <h1>Release radar</h1>
        <p>
          Upstream releases for software in the library. Find what changed, then read the official
          notes.
        </p>
        <div className="release-snapshot-note">
          <Radar size={16} aria-hidden />
          <span>
            Snapshot checked{' '}
            <time dateTime={releasesCheckedAt}>{formatReleaseDate(releasesCheckedAt)}</time>
          </span>
          <span className="release-snapshot-scope">
            {available.length} tools · Curated, not live
          </span>
        </div>
      </header>

      <div className="release-controls">
        <div className="release-scope" role="group" aria-label="Release source">
          <button type="button" aria-pressed={scope === 'all'} onClick={() => setScope('all')}>
            All releases <span>{available.length}</span>
          </button>
          <button type="button" aria-pressed={scope === 'shelf'} onClick={() => setScope('shelf')}>
            <Bookmark size={15} aria-hidden /> From your shelf <span>{shelfReleases.length}</span>
          </button>
        </div>
        <div className="release-filters">
          <label className="release-category">
            <span className="sr-only">Filter releases by category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {releaseCategories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label className="release-unread-filter">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(event) => setUnreadOnly(event.target.checked)}
            />
            Unread only
          </label>
        </div>
      </div>

      <div className="release-results-bar">
        <p role="status" aria-live="polite" aria-atomic="true">
          <strong>{visible.length}</strong> {visible.length === 1 ? 'release' : 'releases'}
          <span> · {visibleUnread.length} unread</span>
        </p>
        <div className="release-bulk-actions">
          <button type="button" onClick={markVisibleRead} disabled={visibleUnread.length === 0}>
            <CheckCheck size={16} aria-hidden /> Mark visible read
          </button>
          <button type="button" onClick={() => setResetOpen(true)} disabled={readCount === 0}>
            <RotateCcw size={14} aria-hidden /> Reset read status
          </button>
        </div>
      </div>
      {!persisted && (
        <p role="alert" className="release-storage-note">
          Read status is kept for this visit only. Your browser could not save it.
        </p>
      )}

      {visible.length ? (
        <ol className="release-timeline" aria-label="Upstream releases, newest first">
          {visible.map((release) => {
            const tool = tools.find((item) => item.id === release.toolId)!;
            const isRead = readIds.includes(release.id);
            return (
              <li className="release-entry" key={release.id}>
                <div className="release-date">
                  <time dateTime={release.publishedAt}>
                    {formatReleaseDate(release.publishedAt)}
                  </time>
                  <span>Published · UTC</span>
                </div>
                <article
                  className="release-card"
                  aria-labelledby={`release-${tool.id}`}
                  data-read={isRead}
                >
                  <div className="release-card-top">
                    <Link
                      to={`?tool=${tool.id}`}
                      className="release-tool"
                      aria-label={`View ${tool.name} in the library`}
                    >
                      <Logo tool={tool} size="small" />
                      <span>
                        <strong>{tool.name}</strong>
                        <span className="release-tool-category">
                          <CategoryIcon category={tool.category} size={12} />
                          {categories.find((item) => item.id === tool.category)?.label}
                        </span>
                      </span>
                    </Link>
                    <span className={`release-read-state ${isRead ? 'is-read' : ''}`}>
                      {isRead ? (
                        <Check size={13} aria-hidden />
                      ) : (
                        <span className="release-unread-dot" aria-hidden />
                      )}
                      {isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>
                  <div className="release-version" title={`Upstream tag: ${release.tag}`}>
                    {release.title}
                    {release.title !== release.tag && !release.title.includes(release.tag) && (
                      <span> · {release.tag}</span>
                    )}
                  </div>
                  <h2 id={`release-${tool.id}`}>{release.headline}</h2>
                  <p className="release-summary">{release.summary}</p>
                  <footer className="release-card-actions">
                    <a
                      className="release-official"
                      href={release.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Official release notes for ${tool.name} ${release.tag} (opens in a new tab)`}
                    >
                      Official release <ArrowUpRight size={16} aria-hidden />
                    </a>
                    <Link
                      className="release-library-link"
                      to={`?tool=${tool.id}`}
                      aria-label={`About ${tool.name}`}
                    >
                      About this tool
                    </Link>
                    <button
                      type="button"
                      className="release-mark"
                      aria-label={`Mark ${tool.name} ${release.tag} ${isRead ? 'unread' : 'read'}`}
                      onClick={() => toggleRead(release.id, tool.name)}
                    >
                      {isRead ? (
                        <RotateCcw size={14} aria-hidden />
                      ) : (
                        <Check size={15} aria-hidden />
                      )}
                      Mark {isRead ? 'unread' : 'read'}
                    </button>
                  </footer>
                </article>
              </li>
            );
          })}
        </ol>
      ) : (
        <EmptyState
          icon={hasNoShelfReleases ? <Bookmark size={25} /> : <CheckCheck size={25} />}
          title={
            hasNoShelfReleases
              ? savedIds.length
                ? 'No shelf releases in this snapshot'
                : 'Your shelf starts here'
              : unreadOnly
                ? 'No unread releases in this view'
                : 'No releases match this view'
          }
          description={
            hasNoShelfReleases
              ? 'Save tools from the library to see their releases here when they are included in a snapshot.'
              : 'Try another category or include releases you have already read.'
          }
          action={
            hasNoShelfReleases ? (
              <Link className="button" to="/">
                Explore the library
              </Link>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => {
                  setCategory('all');
                  setUnreadOnly(false);
                }}
              >
                Clear filters
              </button>
            )
          }
        />
      )}
      <p className="release-footnote">
        One stable release per selected tool, as checked above. Coverage is selective. Read status
        stays in this browser.
      </p>

      <Modal
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset read status?"
        description="All releases in this snapshot will be marked unread in this browser, including those outside your current filters."
        className="release-reset-modal"
      >
        <div className="release-reset-actions">
          <button type="button" className="button" onClick={() => setResetOpen(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="button"
            onClick={() => {
              setReadIds([]);
              setResetOpen(false);
              notify('Read status reset. All releases are unread.');
            }}
          >
            Mark all unread
          </button>
        </div>
      </Modal>
    </div>
  );
}
