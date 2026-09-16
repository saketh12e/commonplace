import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Code2,
  Globe2,
  Grid2X2,
  Layers3,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { tools } from '../data/catalog';
import { categories, desktopPlatforms, platformLabels, roles } from '../data/categories';
import { useApp } from '../lib/app-context';
import { discoverTools } from '../lib/discovery';
import { Modal, Logo, PlatformIcon, BrandMark } from './ui';
import type { Platform } from '../lib/types';
import { useLibrary } from '../lib/library-context';
import { StackPicker } from './StackPicker';
export function ToolDialog() {
  const [params, setParams] = useSearchParams();
  const id = params.get('tool');
  const tool = tools.find((item) => item.id === id);
  const { savedIds, toggleSaved, compareIds, toggleCompare } = useApp();
  const { recordVisit } = useLibrary();
  useEffect(() => {
    if (tool) recordVisit(tool.id);
  }, [tool, recordVisit]);
  const close = () => {
    const next = new URLSearchParams(params);
    next.delete('tool');
    setParams(next, { replace: true });
  };
  if (!id) return null;
  if (!tool)
    return (
      <Modal
        open
        onOpenChange={close}
        title="Tool not found"
        description="This link may be outdated. Browse the library to find a new favorite."
      >
        <button className="button" onClick={close}>
          Back to the library
        </button>
      </Modal>
    );
  return (
    <Modal
      open
      onOpenChange={close}
      title={tool.name}
      titleIcon={<Logo tool={tool} />}
      description={tool.tagline}
      className="tool-modal"
    >
      <div className="detail-identity">
        <div>
          <span className="detail-category">
            {categories.find((category) => category.id === tool.category)?.label}
          </span>
          <span className="source-pill">
            <Code2 size={13} />
            Open source
          </span>
        </div>
      </div>
      <p className="detail-description">{tool.description}</p>
      <div className="detail-actions">
        <a
          className="button button-dark"
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website <ArrowUpRight size={16} />
        </a>
        <button
          className="button"
          onClick={() => toggleSaved(tool.id)}
          aria-pressed={savedIds.includes(tool.id)}
        >
          <Bookmark size={16} fill={savedIds.includes(tool.id) ? 'currentColor' : 'none'} />
          {savedIds.includes(tool.id) ? 'Saved to your shelf' : 'Save to your shelf'}
        </button>
        <button
          className="button icon-button"
          onClick={() => toggleCompare(tool.id)}
          aria-label={`${compareIds.includes(tool.id) ? 'Remove from' : 'Add to'} comparison`}
          aria-pressed={compareIds.includes(tool.id)}
        >
          {compareIds.includes(tool.id) ? <Check size={17} /> : <Plus size={17} />}
        </button>
      </div>
      <div className="tool-stack-action">
        <StackPicker toolId={tool.id} toolName={tool.name} />
        <span>Keep it with the tools you’ll use together.</span>
      </div>
      <div className="detail-facts">
        <div>
          <span>Available on</span>
          <strong>
            {tool.platforms.map((platform) => (
              <span className="fact-platform" key={platform}>
                <PlatformIcon platform={platform} />
                {platformLabels[platform]}
              </span>
            ))}
          </strong>
        </div>
        <div>
          <span>License</span>
          <strong>{tool.license}</strong>
        </div>
        <div>
          <span>Getting started</span>
          <strong>
            {tool.setup === 'easy'
              ? 'Straightforward'
              : tool.setup === 'moderate'
                ? 'Some setup involved'
                : 'Technical setup'}
          </strong>
        </div>
        <div>
          <span>Works offline</span>
          <strong>
            {tool.offline ? 'Yes, for core features' : 'An internet connection is needed'}
          </strong>
        </div>
      </div>
      <section className="detail-section">
        <h3>A few things it does well</h3>
        <div className="feature-list">
          {tool.features.map((feature) => (
            <span key={feature}>
              <Check size={15} />
              {feature}
            </span>
          ))}
        </div>
      </section>
      {tool.alternatives.length > 0 && (
        <section className="detail-section">
          <h3>Explore as an alternative to</h3>
          <div className="card-tags">
            {tool.alternatives.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <p className="helper-text">
            Features and workflows differ. Check the project’s documentation for your needs.
          </p>
        </section>
      )}
      <div className="source-box">
        <ShieldCheck size={21} strokeWidth={1.5} />
        <div>
          <strong>Go straight to the source.</strong>
          <p>
            License and platforms checked{' '}
            {new Intl.DateTimeFormat('en', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              timeZone: 'UTC',
            }).format(new Date(tool.verifiedAt))}
            .
          </p>
          <a href={tool.repository} target="_blank" rel="noopener noreferrer">
            Source code <ArrowUpRight size={13} />
          </a>
          <a href={tool.sourceUrls[0] ?? tool.website} target="_blank" rel="noopener noreferrer">
            Project information <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </Modal>
  );
}
export function ProfileDialog() {
  const { profileOpen, setProfileOpen, profile, setProfile, notify } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [role, setRole] = useState('Everyday explorer');
  const [goal, setGoal] = useState('');
  useEffect(() => {
    if (profileOpen) {
      setStep(1);
      setPlatform(profile?.platform ?? 'all');
      setRole(profile?.role ?? 'Everyday explorer');
      setGoal(profile?.goal ?? '');
    }
  }, [profileOpen, profile]);
  const finish = (event: FormEvent) => {
    event.preventDefault();
    setProfile({ platform, role, goal: goal.trim() });
    setProfileOpen(false);
    notify('Your preferences are ready');
    navigate('/for-you');
  };
  return (
    <Modal
      open={profileOpen}
      onOpenChange={setProfileOpen}
      title={step === 1 ? 'Make yourself at home.' : 'What do you want to do?'}
      description={
        step === 1
          ? 'Let’s start with the device you use most.'
          : 'A little context helps us find a useful starting point.'
      }
      className="profile-modal"
    >
      <div className="step-indicator" aria-label={`Step ${step} of 2`}>
        <span className="complete" />
        <span className={step === 2 ? 'complete' : ''} />
        <small>{step} of 2</small>
      </div>
      <form onSubmit={finish}>
        {step === 1 ? (
          <>
            <div
              className="platform-options"
              role="group"
              aria-label="Choose your operating system"
            >
              {[...desktopPlatforms, 'all' as const].map((os) => (
                <button
                  type="button"
                  className={platform === os ? 'selected' : ''}
                  key={os}
                  onClick={() => setPlatform(os)}
                  aria-pressed={platform === os}
                >
                  <PlatformIcon platform={os} size={28} />
                  <strong>{os === 'all' ? 'A little of everything' : platformLabels[os]}</strong>
                  {platform === os && <Check size={16} />}
                </button>
              ))}
            </div>
            <p className="helper-text">
              <Globe2 size={14} />
              Browser-based tools are included wherever they work.
            </p>
            <button
              className="button button-dark full-width"
              type="button"
              onClick={() => setStep(2)}
            >
              Continue <ArrowRight size={17} />
            </button>
          </>
        ) : (
          <>
            <fieldset className="role-fieldset">
              <legend>I’m here as a…</legend>
              <div className="role-options">
                {roles.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={role === item ? 'selected' : ''}
                    aria-pressed={role === item}
                    onClick={() => setRole(item)}
                  >
                    {item}
                    {role === item && <Check size={13} />}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="form-label" htmlFor="profile-goal">
              Anything you’re looking to do? <span>Optional</span>
            </label>
            <textarea
              id="profile-goal"
              maxLength={500}
              rows={3}
              placeholder="For example, organize my research or edit a short video…"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
            <div className="form-footer">
              <button className="button" type="button" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="button button-dark" type="submit">
                Find my tools <ArrowRight size={16} />
              </button>
            </div>
          </>
        )}
        <button type="button" className="profile-skip" onClick={() => setProfileOpen(false)}>
          Skip for now
        </button>
        <p className="privacy-footnote">
          Saved only on this device. Change these whenever you like.
        </p>
        {profile && (
          <button
            type="button"
            className="reset-profile"
            onClick={() => {
              setProfile(null);
              setProfileOpen(false);
              notify('Preferences reset');
            }}
          >
            Reset my preferences
          </button>
        )}
      </form>
    </Modal>
  );
}
export function SubmitDialog() {
  const { submitOpen, setSubmitOpen } = useApp();
  return (
    <Modal
      open={submitOpen}
      onOpenChange={setSubmitOpen}
      title="Submissions are paused."
      description="Community tool submissions are currently closed. You can keep exploring and organize your own stacks."
    >
      <button className="button button-dark" onClick={() => setSubmitOpen(false)}>
        Back to the library
      </button>
    </Modal>
  );
}
export function CommandDialog() {
  const { commandOpen, setCommandOpen, setProfileOpen, setExplorerOpen } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (commandOpen) setQuery('');
  }, [commandOpen]);
  const result = discoverTools(tools, { query }).slice(0, 5);
  const open = (url: string) => {
    navigate(url);
    setCommandOpen(false);
  };
  return (
    <Modal
      open={commandOpen}
      onOpenChange={setCommandOpen}
      title="Find your next favorite."
      description="Search the whole library, or jump to a favorite corner."
      className="command-modal"
    >
      <div className="command-search">
        <Search size={21} />
        <input
          data-command-input
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              document.querySelector<HTMLButtonElement>('.command-results button')?.focus();
            } else if (event.key === 'Enter') {
              event.preventDefault();
              const firstResult =
                document.querySelector<HTMLButtonElement>('.command-results button');
              if (firstResult) firstResult.click();
              else open(`/?q=${encodeURIComponent(query)}`);
            }
          }}
          aria-label="Quick search"
          placeholder="Search the library…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
      </div>
      <div
        className="command-results"
        onKeyDown={(event) => {
          if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const buttons = [...event.currentTarget.querySelectorAll('button')];
          const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
          if (event.key === 'ArrowUp' && current === 0) {
            document.querySelector<HTMLInputElement>('[data-command-input]')?.focus();
            return;
          }
          const next =
            event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? buttons.length - 1
                : Math.max(
                    0,
                    Math.min(buttons.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)),
                  );
          buttons[next]?.focus();
        }}
      >
        {!query && (
          <>
            <button
              onClick={() => {
                setCommandOpen(false);
                setExplorerOpen(true);
              }}
            >
              <Grid2X2 size={23} />
              <span>
                <strong>Browse topics</strong>
                <small>Preview categories and focused edits</small>
              </span>
              <ArrowUpRight size={15} />
            </button>
            <button onClick={() => open('/shelf')}>
              <Bookmark size={23} />
              <span>
                <strong>Your shelf</strong>
                <small>Pick up where you left off</small>
              </span>
              <ArrowUpRight size={15} />
            </button>
            <button onClick={() => open('/collections')}>
              <Layers3 size={23} />
              <span>
                <strong>Curated collections</strong>
                <small>Useful combinations, chosen with care</small>
              </span>
              <ArrowUpRight size={15} />
            </button>
            <p className="command-section-label">A FEW GOOD STARTING POINTS</p>
          </>
        )}
        {result.slice(0, query ? 5 : 3).map((tool) => (
          <button key={tool.id} onClick={() => open(`/?tool=${tool.id}`)}>
            <Logo tool={tool} size="small" />
            <span>
              <strong>{tool.name}</strong>
              <small>{tool.tagline}</small>
            </span>
            <ArrowUpRight size={15} />
          </button>
        ))}
        {!result.length && (
          <p className="no-command-results">
            No tools found. Try a different name or a simpler description.
          </p>
        )}
      </div>
      <div className="command-footer">
        <button onClick={() => open(`/?q=${encodeURIComponent(query)}`)}>
          See all results <ArrowRight size={15} />
        </button>
        <button
          onClick={() => {
            setCommandOpen(false);
            setProfileOpen(true);
          }}
        >
          <SlidersHorizontal size={15} />
          Preferences
        </button>
      </div>
      <div className="command-brand">
        <BrandMark />
        <span>A little curiosity goes a long way.</span>
      </div>
    </Modal>
  );
}
