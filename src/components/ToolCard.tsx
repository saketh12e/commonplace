import type { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Plus, Check, ArrowUpRight } from 'lucide-react';
import { useApp } from '../lib/app-context';
import type { Tool } from '../lib/types';
import { getToolTint } from '../lib/tool-colors';
import { Logo, PlatformIcon, animateSaved, resetGlass, shiftGlass } from './ui';
import { categories, platformLabels } from '../data/categories';
import '../styles/tool-motion.css';
export function ToolCard({ tool, reason }: { tool: Tool; reason?: string }) {
  const { savedIds, toggleSaved, compareIds, toggleCompare } = useApp();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  params.set('tool', tool.id);
  const saved = savedIds.includes(tool.id);
  const compared = compareIds.includes(tool.id);
  return (
    <article
      className="tool-card tool-motion"
      style={{ '--tool-tint': getToolTint(tool) } as CSSProperties}
      onPointerMove={shiftGlass}
      onPointerLeave={resetGlass}
      onPointerCancel={resetGlass}
    >
      <div className="card-top">
        <Link to={`${location.pathname}?${params}`} className="tool-identity">
          <span className="tool-card-logo" aria-hidden="true">
            <Logo tool={tool} />
          </span>
          <span>
            <h3>{tool.name}</h3>
            <span className="tool-category">
              {categories.find((category) => category.id === tool.category)?.label}
            </span>
          </span>
        </Link>
        <button
          type="button"
          className={`icon-button save-button ${saved ? 'is-saved' : ''}`}
          onClick={(event) => {
            if (!saved) animateSaved(event.currentTarget);
            toggleSaved(tool.id);
          }}
          aria-label={`${saved ? 'Unsave' : 'Save'} ${tool.name}`}
          aria-pressed={saved}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.6} />
        </button>
      </div>
      <p className="tool-tagline">{tool.tagline}</p>
      <div className="card-tags">
        {tool.features.slice(0, 2).map((feature) => (
          <span key={feature}>{feature}</span>
        ))}
      </div>
      {reason && (
        <p className="match-reason">
          <Check size={12} />
          {reason}
        </p>
      )}
      <div className="card-bottom">
        <span
          className="platforms"
          aria-label={tool.platforms.map((platform) => platformLabels[platform]).join(', ')}
        >
          {tool.platforms.slice(0, 4).map((platform) => (
            <span key={platform} title={platformLabels[platform]}>
              <PlatformIcon platform={platform} />
            </span>
          ))}
          <span className="platform-separator" />
          <span className="license-label" title={tool.license}>
            Open source
          </span>
        </span>
        <button
          type="button"
          className={`compare-button ${compared ? 'selected' : ''}`}
          aria-label={`${compared ? 'Remove' : 'Add'} ${tool.name} ${compared ? 'from' : 'to'} comparison`}
          aria-pressed={compared}
          onClick={() => toggleCompare(tool.id)}
        >
          {compared ? <Check size={14} /> : <Plus size={14} />}
          <span>Compare</span>
        </button>
      </div>
      <Link
        className="card-detail-link"
        to={`${location.pathname}?${params}`}
        aria-label={`View ${tool.name}`}
      >
        <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
