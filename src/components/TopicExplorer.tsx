import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowRight, Check, Grid2X2, Search, X } from 'lucide-react';
import { categories, platformLabels } from '../data/categories';
import { topics } from '../data/topics';
import { tools } from '../data/catalog';
import { useApp } from '../lib/app-context';
import { discoverTools } from '../lib/discovery';
import type { CategoryId, Platform } from '../lib/types';
import { CategoryIcon, Logo, Modal } from './ui';

type Choice = {
  id: string;
  label: string;
  description: string;
  category?: CategoryId;
  kind: 'all' | 'category' | 'topic';
  aliases?: string;
};
const choices: Choice[] = [
  {
    id: 'all',
    label: 'All software',
    description: 'Independent tools for your work, your ideas, and your everyday.',
    kind: 'all',
  },
  ...categories.map((category) => ({
    ...category,
    category: category.id,
    kind: 'category' as const,
  })),
  ...topics.map((topic) => ({ ...topic, kind: 'topic' as const })),
];

export function TopicExplorer() {
  const { explorerOpen, setExplorerOpen, profile, savedIds } = useApp();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [previewId, setPreviewId] = useState('all');
  const params = new URLSearchParams(location.search);
  const discoveryScope = ['/', '/shelf', '/for-you'].includes(location.pathname);
  const scope = discoveryScope ? location.pathname : '/';
  const scopeParams = discoveryScope ? params : new URLSearchParams();
  const rawPlatform = scopeParams.get('platform');
  const platform =
    rawPlatform && Object.hasOwn(platformLabels, rawPlatform)
      ? (rawPlatform as Platform | 'all')
      : scope === '/for-you'
        ? (profile?.platform ?? 'all')
        : 'all';
  const currentId =
    topics.find((topic) => topic.id === scopeParams.get('topic'))?.id ??
    categories.find((category) => category.id === scopeParams.get('category'))?.id ??
    'all';
  useEffect(() => {
    if (explorerOpen) setPreviewId(currentId);
  }, [explorerOpen, currentId]);
  const matches = useMemo(() => {
    const terms = query.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
    return choices.filter((choice) => {
      const words =
        `${choice.label} ${choice.description} ${choice.aliases ?? ''}`
          .toLowerCase()
          .match(/[\p{L}\p{N}]+/gu) ?? [];
      return terms.every((term) => words.some((word) => word.startsWith(term)));
    });
  }, [query]);
  const selection = matches.find((choice) => choice.id === previewId) ?? matches[0];
  const resultsFor = (choice: Choice) =>
    discoverTools(tools, {
      query: scopeParams.get('q') ?? '',
      category: choice.kind === 'category' ? choice.category : 'all',
      topic: choice.kind === 'topic' ? choice.id : undefined,
      platform,
      offline: scopeParams.get('offline') === '1',
      selfHost: scopeParams.get('selfhost') === '1',
      savedOnly: scope === '/shelf',
      savedIds,
    });
  const hrefFor = (choice: Choice) => {
    const next = new URLSearchParams(scopeParams);
    ['category', 'topic', 'page', 'tool'].forEach((key) => next.delete(key));
    if (choice.kind !== 'all') next.set(choice.kind, choice.id);
    return `${scope}${next.size ? `?${next}` : ''}`;
  };
  const close = () => {
    setExplorerOpen(false);
    setQuery('');
  };
  const previewTools = selection ? resultsFor(selection) : [];
  return (
    <Modal
      open={explorerOpen}
      onOpenChange={(open) => {
        setExplorerOpen(open);
        if (!open) setQuery('');
      }}
      title="Find your corner."
      description="Browse by category, or follow a more specific curiosity."
      className="topic-explorer"
    >
      <div className="topic-search">
        <Search size={21} strokeWidth={1.6} />
        <input
          data-autofocus
          aria-label="Search topics"
          value={query}
          placeholder="Try browsers, local AI, or design…"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              document.querySelector<HTMLAnchorElement>('.topic-option')?.focus();
            }
          }}
        />
        {query ? (
          <button
            className="icon-button"
            aria-label="Clear topic search"
            onClick={() => setQuery('')}
          >
            <X size={16} />
          </button>
        ) : (
          <kbd className="desktop-only">
            <ArrowDown size={12} />
          </kbd>
        )}
      </div>
      <div className="topic-workspace">
        <div
          className="topic-options"
          aria-label="Available topics"
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
            const links = [
              ...event.currentTarget.querySelectorAll<HTMLAnchorElement>('.topic-option'),
            ];
            const index = links.indexOf(document.activeElement as HTMLAnchorElement);
            if (index < 0) return;
            event.preventDefault();
            if (event.key === 'ArrowUp' && index === 0) {
              document.querySelector<HTMLInputElement>('[aria-label="Search topics"]')?.focus();
              return;
            }
            const next =
              event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? links.length - 1
                  : Math.max(
                      0,
                      Math.min(links.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)),
                    );
            links[next]?.focus();
          }}
        >
          {(['all', 'category', 'topic'] as const).map((kind) => {
            const group = matches.filter((choice) => choice.kind === kind);
            return (
              group.length > 0 && (
                <div className="topic-group" key={kind}>
                  {kind !== 'all' && (
                    <p className="topic-group-label">
                      {kind === 'category' ? 'THE WHOLE PICTURE' : 'A CLOSER LOOK'}
                    </p>
                  )}
                  {group.map((choice) => {
                    const results = resultsFor(choice);
                    return (
                      <Link
                        key={choice.id}
                        className={`topic-option ${selection?.id === choice.id ? 'previewing' : ''}`}
                        to={hrefFor(choice)}
                        aria-current={currentId === choice.id ? 'true' : undefined}
                        onFocus={() => setPreviewId(choice.id)}
                        onPointerEnter={(event) => {
                          if (event.pointerType === 'mouse') setPreviewId(choice.id);
                        }}
                        onClick={(event) => {
                          if (
                            !event.metaKey &&
                            !event.ctrlKey &&
                            !event.shiftKey &&
                            !event.altKey &&
                            event.button === 0
                          )
                            close();
                        }}
                      >
                        <span className="topic-option-icon">
                          {choice.category ? (
                            <CategoryIcon category={choice.category} size={20} />
                          ) : (
                            <Grid2X2 size={20} strokeWidth={1.6} />
                          )}
                        </span>
                        <span className="topic-option-copy">
                          <strong>{choice.label}</strong>
                          <small className="topic-touch-description">
                            {results.length} {results.length === 1 ? 'tool' : 'tools'} to explore
                          </small>
                        </span>
                        <span className="topic-touch-logos" aria-hidden>
                          {results.slice(0, 3).map((tool) => (
                            <Logo tool={tool} key={tool.id} size="small" />
                          ))}
                        </span>
                        {currentId === choice.id ? (
                          <Check size={16} aria-label="Selected" />
                        ) : (
                          <span className="topic-option-count">{results.length}</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )
            );
          })}
          {!matches.length && (
            <div className="topic-empty">
              <Search size={26} />
              <h3>No matching topics</h3>
              <p>Try a broader term, or explore all categories.</p>
              <button className="button" onClick={() => setQuery('')}>
                Clear search
              </button>
            </div>
          )}
        </div>
        <div className="topic-preview" aria-label="Topic preview">
          {selection && (
            <div key={selection.id} className="topic-preview-content">
              <span className="topic-preview-symbol">
                {selection.category ? (
                  <CategoryIcon category={selection.category} size={28} />
                ) : (
                  <Grid2X2 size={28} strokeWidth={1.4} />
                )}
              </span>
              <p className="eyebrow">
                {selection.kind === 'topic' ? 'A CLOSER LOOK' : 'ROOM TO EXPLORE'}
              </p>
              <h3>{selection.label}</h3>
              <p className="topic-description">{selection.description}</p>
              <div className="topic-preview-tools">
                {previewTools.slice(0, 3).map((tool) => (
                  <div key={tool.id}>
                    <Logo tool={tool} size="large" />
                    <span>{tool.name}</span>
                  </div>
                ))}
                {!previewTools.length && (
                  <p>
                    No tools match your current filters here. You can still open this topic and
                    adjust them.
                  </p>
                )}
              </div>
              <Link
                className="button button-dark"
                to={hrefFor(selection)}
                onClick={(event) => {
                  if (
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey &&
                    event.button === 0
                  )
                    close();
                }}
              >
                Explore {previewTools.length} {previewTools.length === 1 ? 'tool' : 'tools'}{' '}
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="topic-dialog-footer">
        <span>
          {scope === '/shelf'
            ? 'Browsing your saved tools'
            : scope === '/for-you'
              ? 'Using your device preferences'
              : 'Browsing the library'}{' '}
          · {platformLabels[platform]}
        </span>
        <span className="desktop-only">Preview first. Follow your curiosity.</span>
      </div>
    </Modal>
  );
}
