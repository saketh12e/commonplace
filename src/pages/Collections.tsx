import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Bookmark, Layers3 } from 'lucide-react';
import { collections } from '../data/collections';
import { tools } from '../data/catalog';
import { Logo, EmptyState, shiftGlass, resetGlass } from '../components/ui';
import { ToolCard } from '../components/ToolCard';
import { useApp } from '../lib/app-context';
export function Collections() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">BETTER TOGETHER</div>
          <h1>A good place to start.</h1>
          <p>Thoughtful combinations for the things you want to do.</p>
        </div>
        <span className="heading-icon">
          <Layers3 size={25} strokeWidth={1.25} />
        </span>
      </div>
      <div className="collections-grid">
        {collections.map((collection) => (
          <Link
            className={`collection-card collection-${collection.color}`}
            key={collection.id}
            to={`/collections/${collection.id}`}
            onPointerMove={shiftGlass}
            onPointerLeave={resetGlass}
          >
            <div className="eyebrow">{collection.category}</div>
            <div className="collection-logo-row">
              {collection.toolIds
                .map((id) => tools.find((tool) => tool.id === id))
                .filter((tool) => !!tool)
                .map((tool) => (
                  <Logo key={tool.id} tool={tool} />
                ))}
            </div>
            <h2>{collection.title}</h2>
            <p>{collection.description}</p>
            <div className="collection-card-footer">
              <span>
                {collection.toolIds.filter((id) => tools.some((tool) => tool.id === id)).length}{' '}
                tools · Community curated
              </span>
              <span className="collection-open">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export function CollectionDetail() {
  const { id } = useParams();
  const collection = collections.find((item) => item.id === id);
  const { saveMany } = useApp();
  if (!collection)
    return (
      <div className="page">
        <EmptyState
          title="This collection hasn’t found its place yet."
          description="Explore another collection to find a useful starting point."
          action={
            <Link className="button" to="/collections">
              View collections
            </Link>
          }
        />
      </div>
    );
  const selected = collection.toolIds
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool) => !!tool);
  return (
    <div className="page">
      <Link className="back-link" to="/collections">
        <ArrowLeft size={15} />
        All collections
      </Link>
      <div className={`collection-detail-hero collection-${collection.color}`}>
        <div className="eyebrow">{collection.category}</div>
        <div className="collection-logo-row">
          {selected.map((tool) => (
            <Logo tool={tool} key={tool.id} size="large" />
          ))}
        </div>
        <h1>{collection.title}</h1>
        <p>{collection.description}</p>
        <button
          className="button button-dark"
          onClick={() => saveMany(selected.map((tool) => tool.id))}
        >
          <Bookmark size={16} />
          Save {selected.length} tools
        </button>
      </div>
      <div className="section-heading">
        <h2>
          Inside this collection <span className="count-badge">{selected.length}</span>
        </h2>
        <span className="catalog-caption">Check each tool for device compatibility</span>
      </div>
      <div className="tools-grid">
        {selected.map((tool) => (
          <ToolCard tool={tool} key={tool.id} />
        ))}
      </div>
    </div>
  );
}
