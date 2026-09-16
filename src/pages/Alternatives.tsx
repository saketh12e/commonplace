import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeftRight, ArrowRight, Check, Search, X } from 'lucide-react';
import { tools } from '../data/catalog';
import { platformLabels } from '../data/categories';
import { discoverTools } from '../lib/discovery';
import type { Platform } from '../lib/types';
import { ToolCard } from '../components/ToolCard';
import { EmptyState } from '../components/ui';
import { PlatformPicker } from '../components/PlatformPicker';

export const alternativeApps = [...new Set(tools.flatMap((tool) => tool.alternatives))].sort(
  (a, b) => a.localeCompare(b),
);
export function alternativeMatches(source: string, platform: Platform | 'all' = 'all') {
  return discoverTools(
    tools.filter((tool) =>
      tool.alternatives.some((name) => name.toLowerCase() === source.toLowerCase()),
    ),
    { platform },
  );
}
const startingPoints = ['Figma', 'Photoshop', 'Notion', 'Postman', 'Microsoft 365', '1Password'];
export function Alternatives() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const sourcePickerRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const source = params.get('from') ?? '';
  const rawPlatform = params.get('platform') ?? 'all';
  const platform = Object.hasOwn(platformLabels, rawPlatform)
    ? (rawPlatform as Platform | 'all')
    : 'all';
  const matches = alternativeMatches(source, platform);
  const choices = query
    ? alternativeApps.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
    : expanded
      ? alternativeApps
      : startingPoints;
  const update = (values: Record<string, string>) => {
    const next = new URLSearchParams(params);
    Object.entries(values).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    );
    setParams(next);
  };
  return (
    <div className="page alternatives-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">THE ALTERNATIVE FINDER</div>
          <h1>Your workflow. More possibilities.</h1>
          <p>Find open-source alternatives to software you already use.</p>
        </div>
        <span className="heading-icon">
          <ArrowLeftRight size={26} strokeWidth={1.4} />
        </span>
      </div>
      <div className="switch-steps" aria-label="How it works">
        <span className="complete">
          <b>01</b>Choose an app
        </span>
        <span className={source ? 'complete' : ''}>
          <b>02</b>Choose your device
        </span>
        <span className={matches.length ? 'complete' : ''}>
          <b>03</b>Explore the fit
        </span>
      </div>
      <div className="alternative-workspace">
        <section
          className="source-picker"
          ref={sourcePickerRef}
          aria-labelledby="source-picker-title"
        >
          <h2 id="source-picker-title">What do you use today?</h2>
          <p>A familiar starting point.</p>
          <div className="source-search">
            <Search size={18} />
            <input
              aria-label="Search apps to replace"
              placeholder="Try Photoshop or Notion…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                className="icon-button"
                aria-label="Clear app search"
                onClick={() => setQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="source-choices">
            {choices.map((name) => (
              <button
                key={name}
                aria-pressed={source.toLowerCase() === name.toLowerCase()}
                onClick={() => update({ from: name })}
              >
                <span className="source-initial" aria-hidden>
                  {name.slice(0, 1)}
                </span>
                <span>{name}</span>
                {source.toLowerCase() === name.toLowerCase() ? (
                  <Check size={17} />
                ) : (
                  <ArrowRight size={15} />
                )}
              </button>
            ))}
            {!choices.length && (
              <p className="helper-text">
                This app isn’t in the curated matches yet. Try another name.
              </p>
            )}
          </div>
          {!query && (
            <button className="all-apps-button" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Show starting points' : `Browse all ${alternativeApps.length} apps`}
              <ArrowRight size={14} />
            </button>
          )}
        </section>
        <section className="alternative-results" aria-label="Matching alternatives">
          <div className="alternative-platform">
            <span className="eyebrow">FIND THE RIGHT FIT FOR YOUR DEVICE</span>
            <PlatformPicker
              value={platform}
              onChange={(value) => update({ platform: value === 'all' ? '' : value })}
            />
          </div>
          {source ? (
            <>
              <div className="alternative-result-title">
                <div>
                  <span className="eyebrow">OPEN ALTERNATIVES TO</span>
                  <h2>
                    {source}
                    <span className="count-badge">{matches.length}</span>
                  </h2>
                </div>
                <button
                  className="icon-button"
                  aria-label="Clear selected app"
                  onClick={() => {
                    update({ from: '' });
                    sourcePickerRef.current
                      ?.querySelector<HTMLElement>('.source-choices button, input')
                      ?.focus();
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <p className="alternative-note">
                Curated for similar work. Check features and setup before switching.
              </p>
              {matches.length ? (
                <div className="tools-grid">
                  {matches.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<Search size={27} />}
                  title="No matches for this combination."
                  description="Try another device or a different starting app."
                  action={
                    <button className="button" onClick={() => update({ platform: '' })}>
                      Show all devices
                    </button>
                  }
                />
              )}
            </>
          ) : (
            <div className="alternative-start">
              <svg viewBox="0 0 250 132" fill="none" aria-hidden>
                <rect x="10" y="30" width="80" height="80" rx="22" />
                <path d="M35 56h30M35 70h21M35 84h25" />
                <path className="switch-path" d="M106 70h39m-8-8 8 8-8 8" />
                <rect x="162" y="15" width="80" height="80" rx="22" />
                <path d="m186 55 11 11 22-24" />
              </svg>
              <h2>
                A different tool.
                <br />A familiar kind of work.
              </h2>
              <p>Choose the app you use today. Discover open-source tools for similar work.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
