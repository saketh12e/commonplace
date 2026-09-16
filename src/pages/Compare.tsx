import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Minus, Copy, Columns3, X } from 'lucide-react';
import { tools } from '../data/catalog';
import { platformLabels } from '../data/categories';
import { Logo, EmptyState } from '../components/ui';
import { PlatformBrand } from '../components/PlatformBrand';
import { useApp } from '../lib/app-context';
import type { Tool } from '../lib/types';
import '../styles/comparison.css';

const catalogOptions = [...tools].sort((a, b) => a.name.localeCompare(b.name));
type FactKey = 'platforms' | 'license' | 'offline' | 'selfHost' | 'setup';
const factLabels: Record<FactKey, string> = {
  platforms: 'Available on',
  license: 'License',
  offline: 'Works offline',
  selfHost: 'Self-hostable',
  setup: 'Getting started',
};
const factKeys = Object.keys(factLabels) as FactKey[];

// Filter before limiting: stale links must not displace valid selections.
export function comparisonIds(raw: string, catalog: readonly Tool[] = tools): string[] {
  const known = new Set(catalog.map((tool) => tool.id));
  return [
    ...new Set(
      raw
        .split(',')
        .map((id) => id.trim())
        .filter((id) => known.has(id)),
    ),
  ].slice(0, 3);
}

export function differingComparisonFacts(selected: readonly Tool[]): FactKey[] {
  if (selected.length < 2) return [];
  return factKeys.filter(
    (key) =>
      new Set(
        selected.map((tool) => {
          if (key === 'platforms') return [...new Set(tool.platforms)].sort().join(',');
          if (key === 'license') return tool.license.trim();
          return tool[key];
        }),
      ).size > 1,
  );
}

function factValue(tool: Tool, key: FactKey): ReactNode {
  switch (key) {
    case 'platforms':
      return (
        <div className="comparison-platforms">
          {tool.platforms.map((platform) => (
            <span key={platform}>
              <PlatformBrand platform={platform} />
              <span>{platformLabels[platform]}</span>
            </span>
          ))}
        </div>
      );
    case 'license':
      return tool.license;
    case 'offline':
      return (
        <span className={tool.offline ? 'comparison-yes' : 'comparison-no'}>
          {tool.offline ? <Check size={16} aria-hidden /> : <Minus size={16} aria-hidden />}
          {tool.offline ? 'Yes, core features' : 'No'}
        </span>
      );
    case 'selfHost':
      return (
        <span className={tool.selfHost ? 'comparison-yes' : 'comparison-no'}>
          {tool.selfHost ? <Check size={16} aria-hidden /> : <Minus size={16} aria-hidden />}
          {tool.selfHost ? 'Yes' : 'No'}
        </span>
      );
    case 'setup':
      return tool.setup === 'easy'
        ? 'Straightforward'
        : tool.setup === 'moderate'
          ? 'Some setup'
          : 'Technical setup';
  }
}

export function Compare() {
  const [params, setParams] = useSearchParams();
  const { notify } = useApp();
  const ids = comparisonIds(params.get('tools') ?? '');
  const selected = ids.map((id) => tools.find((tool) => tool.id === id)!);
  const differencesOnly = params.get('differences') === '1';
  const differences = differingComparisonFacts(selected);
  const visibleFacts = differencesOnly && selected.length >= 2 ? differences : factKeys;
  const addRef = useRef<HTMLSelectElement>(null);
  const removeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingRemoval = useRef<number | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const selectionKey = ids.join(',');

  useLayoutEffect(() => {
    if (pendingRemoval.current !== null) {
      const index = Math.min(pendingRemoval.current, selected.length - 1);
      (removeRefs.current[index] ?? addRef.current)?.focus();
      pendingRemoval.current = null;
    } else if (lastFocused.current && !lastFocused.current.isConnected) {
      addRef.current?.focus();
    }
  }, [selectionKey, selected.length, differencesOnly]);

  const updateSelection = (nextIds: string[]) => {
    const next = new URLSearchParams(params);
    const validIds = comparisonIds(nextIds.join(','));
    if (validIds.length) next.set('tools', validIds.join(','));
    else next.delete('tools');
    setParams(next, { preventScrollReset: true });
  };
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify('Comparison link copied');
    } catch {
      notify('Copy the address from your browser to share this comparison.');
    }
  };
  return (
    <div
      className="page comparison-page"
      onFocusCapture={(event) => {
        lastFocused.current = event.target as HTMLElement;
      }}
    >
      <Link to="/" className="back-link">
        <ArrowLeft size={15} aria-hidden />
        Back to the library
      </Link>
      <div className="page-heading">
        <div>
          <div className="eyebrow">A CLOSER LOOK</div>
          <h1>Find the fit. Side by side.</h1>
          <p>The details that matter, in one place.</p>
        </div>
        {selected.length > 0 && (
          <button className="button" onClick={share}>
            <Copy size={15} aria-hidden />
            Copy comparison link
          </button>
        )}
      </div>
      <div className="comparison-controls">
        <label className="comparison-add" htmlFor="comparison-add">
          <span>
            Add a tool <span className="comparison-count">{selected.length}/3</span>
          </span>
          <select
            id="comparison-add"
            ref={addRef}
            value=""
            aria-describedby="comparison-selection-hint"
            onChange={(event) => {
              if (event.target.value && selected.length < 3) {
                updateSelection([...ids, event.target.value]);
                notify('Tool added to comparison');
              }
            }}
          >
            <option value="">
              {selected.length === 3 ? 'Three tools selected' : 'Choose from the catalog…'}
            </option>
            {selected.length < 3 &&
              catalogOptions
                .filter((tool) => !ids.includes(tool.id))
                .map((tool) => (
                  <option key={tool.id} value={tool.id}>
                    {tool.name}
                  </option>
                ))}
          </select>
        </label>
        <label className="comparison-differences">
          <input
            type="checkbox"
            checked={differencesOnly}
            onChange={(event) => {
              const next = new URLSearchParams(params);
              if (event.target.checked) next.set('differences', '1');
              else next.delete('differences');
              setParams(next, { preventScrollReset: true });
            }}
          />
          <span>Differences only</span>
        </label>
      </div>
      <p className="comparison-selection-hint" id="comparison-selection-hint">
        {selected.length === 3
          ? 'To choose another tool, replace or remove one below.'
          : 'Choose up to three tools. Each tool can appear once.'}
      </p>
      <p className="comparison-filter-status" role="status">
        {differencesOnly
          ? selected.length < 2
            ? 'Add at least two tools to find differences. Showing all recorded facts for now.'
            : `${differences.length} of 5 common facts differ. Matching facts and project-specific descriptions are hidden.`
          : 'Compare platforms, license, offline use, self-hosting, and setup.'}
      </p>
      {!selected.length ? (
        <EmptyState
          icon={<Columns3 size={27} aria-hidden />}
          title="A good comparison starts with a few options."
          description="Choose tools from the catalog above to start your comparison."
        />
      ) : (
        <>
          <p className="mobile-only helper-text">Swipe across the table to see every tool.</p>
          <div
            className="comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Tool comparison table"
          >
            <table className={`comparison-table comparison-columns-${selected.length}`}>
              <caption className="comparison-visually-hidden">
                {selected.map((tool) => tool.name).join(' compared with ')}.{' '}
                {differencesOnly ? 'Differences in common facts.' : 'All recorded facts.'}
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span>Tool details</span>
                  </th>
                  {selected.map((tool, index) => (
                    // A column's controls retain DOM identity when its tool is replaced.
                    <th scope="col" key={index}>
                      <div className="comparison-column-controls">
                        <label className="comparison-replace">
                          <span>Replace tool</span>
                          <select
                            aria-label={`Replace ${tool.name}`}
                            value={tool.id}
                            onChange={(event) => {
                              const replacement = event.target.value;
                              if (replacement === tool.id || ids.includes(replacement)) return;
                              updateSelection(
                                ids.map((id, slot) => (slot === index ? replacement : id)),
                              );
                              notify(`${tool.name} replaced`);
                            }}
                          >
                            {catalogOptions
                              .filter((option) => option.id === tool.id || !ids.includes(option.id))
                              .map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                          </select>
                        </label>
                        <button
                          type="button"
                          className="comparison-remove"
                          ref={(node) => {
                            removeRefs.current[index] = node;
                          }}
                          aria-label={`Remove ${tool.name} from comparison`}
                          onClick={() => {
                            pendingRemoval.current = index;
                            updateSelection(ids.filter((id) => id !== tool.id));
                            notify(`${tool.name} removed from comparison`);
                          }}
                        >
                          <X size={17} aria-hidden />
                        </button>
                      </div>
                      <div className="comparison-identity">
                        <Logo key={tool.id} tool={tool} />
                        <h2>{tool.name}</h2>
                      </div>
                      <p>{tool.tagline}</p>
                      <div className="comparison-project-links">
                        <a
                          href={tool.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-small"
                        >
                          Visit website <ArrowUpRight size={14} aria-hidden />
                        </a>
                        <a
                          href={tool.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${tool.name} source code`}
                        >
                          Source code <ArrowUpRight size={13} aria-hidden />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleFacts.map((key) => (
                  <tr key={key}>
                    <th scope="row">{factLabels[key]}</th>
                    {selected.map((tool) => (
                      <td key={tool.id}>{factValue(tool, key)}</td>
                    ))}
                  </tr>
                ))}
                {differencesOnly && selected.length >= 2 && !differences.length && (
                  <tr>
                    <td colSpan={selected.length + 1} className="comparison-no-differences">
                      <strong>No differences in these five facts.</strong>
                      <span>
                        The recorded platforms, license, offline use, self-hosting, and setup match.
                        Features and capabilities may still differ.
                      </span>
                      <button
                        className="button button-small"
                        onClick={() => {
                          const next = new URLSearchParams(params);
                          next.delete('differences');
                          setParams(next, { preventScrollReset: true });
                        }}
                      >
                        Show all details
                      </button>
                    </td>
                  </tr>
                )}
                {!differencesOnly && (
                  <>
                    <tr>
                      <th scope="row">Useful for</th>
                      {selected.map((tool) => (
                        <td key={tool.id}>
                          <ul>
                            {tool.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Alternatives to explore</th>
                      {selected.map((tool) => (
                        <td key={tool.id}>{tool.alternatives.join(', ') || '—'}</td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <p className="helper-text comparison-disclaimer">
            Different tools solve different problems. Visit each project for complete features and
            requirements.
          </p>
        </>
      )}
    </div>
  );
}
