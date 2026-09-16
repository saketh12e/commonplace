import { StackArt } from '../components/StackArt';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  Layers3,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { tools } from '../data/catalog';
import { useLibrary } from '../lib/library-context';
import { useApp } from '../lib/app-context';
import { EmptyState, Logo, Modal } from '../components/ui';
import { LibraryNav } from '../components/LibraryNav';
import { ToolCard } from '../components/ToolCard';
import { downloadJson } from '../lib/download';

export function Stacks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stacks, createStack, updateStack, deleteStack, persisted } = useLibrary();
  const { notify } = useApp();
  const stack = stacks.find((item) => item.id === id);
  const [editor, setEditor] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<string[]>([]);
  useEffect(() => {
    setEditor(false);
    setAdding(false);
    setDeleting(false);
  }, [id]);
  const edit = () => {
    setName(stack?.name ?? '');
    setNote(stack?.note ?? '');
    setEditor(true);
  };
  const add = () => {
    setDraft(stack?.toolIds ?? []);
    setQuery('');
    setAdding(true);
  };
  const toolsRef = useRef<HTMLDivElement>(null);
  const addToolsRef = useRef<HTMLButtonElement>(null);
  const removedIndex = useRef<number | null>(null);
  useLayoutEffect(() => {
    if (removedIndex.current === null) return;
    const buttons = toolsRef.current?.querySelectorAll<HTMLButtonElement>('.stack-remove');
    const target = buttons?.[Math.min(removedIndex.current, (buttons?.length ?? 0) - 1)];
    (target ?? addToolsRef.current)?.focus();
    removedIndex.current = null;
  }, [stack?.toolIds.join(',')]);
  if (id && !stack)
    return (
      <div className="page">
        <LibraryNav />
        <EmptyState
          icon={<Layers3 size={28} />}
          title="This stack isn’t on this device."
          description="Your stacks are saved in this browser. Return to your library to create one."
          action={
            <Link className="button" to="/stacks">
              Your stacks
            </Link>
          }
        />
      </div>
    );
  const selected =
    stack?.toolIds
      .map((toolId) => tools.find((tool) => tool.id === toolId))
      .filter((tool) => !!tool) ?? [];
  const matches = tools.filter((tool) =>
    `${tool.name} ${tool.tagline}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="page stacks-page">
      <LibraryNav />
      {stack && (
        <Link to="/stacks" className="back-link">
          <ArrowLeft size={15} />
          All your stacks
        </Link>
      )}
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR TOOLS, TOGETHER</div>
          <h1>{stack ? stack.name : 'Your tools. Better together.'}</h1>
          <p>
            {stack
              ? stack.note || 'A focused set of tools for the way you work.'
              : 'Keep a few good tools together. Add a name, a purpose, and your next idea.'}
          </p>
        </div>
        <button
          className="button button-dark"
          ref={stack ? addToolsRef : undefined}
          onClick={stack ? add : edit}
        >
          <Plus size={17} />
          {stack ? 'Add tools' : 'New stack'}
        </button>
      </div>
      {!persisted && (
        <p role="status" className="storage-notice">
          Stacks will last for this visit. Browser storage is unavailable.
        </p>
      )}
      {stack ? (
        <>
          <div className="stack-detail-bar">
            <span>
              <Layers3 size={16} />
              {selected.length} tools in this stack
            </span>
            <div>
              <button className="button button-small" onClick={edit}>
                <Pencil size={14} />
                Edit details
              </button>
              <button
                className="button button-small"
                onClick={() => {
                  downloadJson(
                    `commonplace-${stack.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`,
                    {
                      format: 'commonplace-stack',
                      version: 1,
                      name: stack.name,
                      note: stack.note,
                      tools: selected.map((tool) => ({
                        id: tool.id,
                        name: tool.name,
                        website: tool.website,
                        repository: tool.repository,
                      })),
                    },
                  );
                  notify('Stack exported');
                }}
              >
                <Download size={15} />
                Export
              </button>
              <button
                className="icon-button"
                aria-label="Delete stack"
                onClick={() => setDeleting(true)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {selected.length ? (
            <div className="tools-grid" ref={toolsRef}>
              {selected.map((tool, index) => (
                <div className="stack-tool" key={tool.id}>
                  <ToolCard tool={tool} />
                  <button
                    className="stack-remove"
                    aria-label={`Remove ${tool.name} from stack`}
                    onClick={() => {
                      removedIndex.current = index;
                      updateStack(stack.id, {
                        toolIds: stack.toolIds.filter((toolId) => toolId !== tool.id),
                      });
                      notify(`Removed ${tool.name} from this stack`);
                    }}
                  >
                    <X size={13} />
                    Remove from stack
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Layers3 size={28} />}
              title="A little space for good tools."
              description="Add the tools you want to use together. You can edit the stack at any time."
              action={
                <button className="button button-dark" onClick={add}>
                  <Plus size={16} />
                  Choose tools
                </button>
              }
            />
          )}
        </>
      ) : stacks.length ? (
        <div className="stacks-grid">
          {stacks.map((item) => (
            <Link className="stack-card" to={`/stacks/${item.id}`} key={item.id}>
              <div className="stack-card-visual">
                <StackArt count={item.toolIds.length} />
                <div className="stack-card-logos">
                  {item.toolIds.slice(0, 3).map((toolId) => {
                    const tool = tools.find((tool) => tool.id === toolId);
                    return tool ? <Logo tool={tool} key={toolId} /> : null;
                  })}
                </div>
              </div>
              <h2>{item.name}</h2>
              <p>{item.note || 'Your own selection, ready to explore.'}</p>
              <div className="stack-card-bottom">
                <span>{item.toolIds.length} tools · On this device</span>
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="stacks-empty">
          <StackArt />
          <h2>Every good workflow starts somewhere.</h2>
          <p>
            A research toolkit. A creative workspace. Your next side project.
            <br />
            Bring the tools that belong together into a stack.
          </p>
          <button className="button button-dark" onClick={edit}>
            <Plus size={17} />
            Create your first stack
          </button>
        </div>
      )}
      <Modal
        open={editor}
        onOpenChange={setEditor}
        title={stack ? 'Give it a little context.' : 'A new place for your tools.'}
        description="Stacks are personal collections saved on this device."
      >
        <form
          className="stack-editor"
          onSubmit={(event) => {
            event.preventDefault();
            if (stack) {
              updateStack(stack.id, { name, note });
              setEditor(false);
              notify('Stack details saved');
            } else {
              const newId = createStack(name, [], note);
              if (newId) {
                setEditor(false);
                navigate(`/stacks/${newId}`);
                notify('Your first tools can go here.');
              }
            }
          }}
        >
          <label>
            Stack name
            <input
              data-autofocus
              required
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="My research toolkit"
            />
          </label>
          <label>
            What’s this stack for? <span>Optional</span>
            <textarea
              maxLength={600}
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="A few tools for finding and connecting ideas."
            />
          </label>
          <div className="form-footer">
            <button type="button" className="button" onClick={() => setEditor(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="button button-dark"
              disabled={!name.trim() || (!stack && stacks.length >= 60)}
            >
              {stack ? 'Save changes' : 'Create stack'}
              <ArrowUpRight size={16} />
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        open={adding}
        onOpenChange={setAdding}
        title="Build your toolkit."
        description="Choose tools to keep together. Existing selections stay checked."
        className="stack-add-modal"
      >
        <div className="stack-search">
          <Search size={19} />
          <input
            data-autofocus
            aria-label="Search tools for stack"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools…"
          />
        </div>
        <div className="stack-tool-picker">
          {matches.map((tool) => (
            <button
              key={tool.id}
              aria-pressed={draft.includes(tool.id)}
              onClick={() =>
                setDraft((previous) =>
                  previous.includes(tool.id)
                    ? previous.filter((id) => id !== tool.id)
                    : [...previous, tool.id],
                )
              }
            >
              <Logo tool={tool} />
              <span>
                <strong>{tool.name}</strong>
                <small>{tool.tagline}</small>
              </span>
              <span className="picker-checkbox">
                {draft.includes(tool.id) && <Check size={15} />}
              </span>
            </button>
          ))}
          {!matches.length && <p className="helper-text">No tools match that search.</p>}
        </div>
        <div className="form-footer">
          <span>{draft.length} selected</span>
          <button
            className="button button-dark"
            onClick={() => {
              if (stack) updateStack(stack.id, { toolIds: draft });
              setAdding(false);
              notify('Stack updated');
            }}
          >
            Save selection
            <Check size={16} />
          </button>
        </div>
      </Modal>
      <Modal
        open={deleting}
        onOpenChange={setDeleting}
        title="Delete this stack?"
        description="This removes the stack and its note. Your saved tools stay on your shelf."
      >
        <div className="form-footer">
          <button className="button" onClick={() => setDeleting(false)}>
            Keep stack
          </button>
          <button
            className="button button-danger"
            onClick={() => {
              if (stack) deleteStack(stack.id);
              setDeleting(false);
              navigate('/stacks');
              notify('Stack deleted');
            }}
          >
            Delete stack
          </button>
        </div>
      </Modal>
    </div>
  );
}
