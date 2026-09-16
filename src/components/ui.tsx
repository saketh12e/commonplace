import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  X,
  Monitor,
  Globe2,
  Command,
  Code2,
  Palette,
  ShieldCheck,
  Play,
  Layers3,
  Grid2X2,
  Bot,
  BrainCircuit,
  Workflow,
} from 'lucide-react';
import { PlatformBrand } from './PlatformBrand';
import type { CategoryId, Platform, Tool } from '../lib/types';
export const categoryIcons = {
  design: Palette,
  development: Code2,
  productivity: Layers3,
  privacy: ShieldCheck,
  media: Play,
  utilities: Grid2X2,
  ai: BrainCircuit,
  agents: Bot,
  browsers: Globe2,
  automation: Workflow,
};
export function CategoryIcon({ category, size = 18 }: { category: CategoryId; size?: number }) {
  const Icon = categoryIcons[category];
  return <Icon size={size} strokeWidth={1.65} aria-hidden />;
}
export function PlatformIcon({
  platform,
  size = 15,
}: {
  platform: Platform | 'all';
  size?: number;
}) {
  return <PlatformBrand platform={platform} size={size} />;
}
export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden>
      <svg viewBox="0 0 64 64" fill="none">
        <path
          className="mark-back"
          d="M48 8H29C17.4 8 8 17.4 8 29v6c0 11.6 9.4 21 21 21h19V44H30c-5.5 0-10-4.5-10-10v-4c0-5.5 4.5-10 10-10h18V8Z"
          fill="currentColor"
        />
        <path className="mark-page" d="M35 25h21v12H35a6 6 0 0 1 0-12Z" fill="currentColor" />
      </svg>
    </span>
  );
}
export function Logo({
  tool,
  size = 'normal',
}: {
  tool: Tool;
  size?: 'small' | 'normal' | 'large';
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className={`tool-logo logo-${size}`}
      style={{ '--logo-bg': tool.logoBackground } as CSSProperties}
    >
      {failed ? (
        <span>{tool.name.slice(0, 1)}</span>
      ) : (
        <img
          src={tool.logo}
          alt=""
          width="44"
          height="44"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
const glassFrames = new WeakMap<HTMLElement, number>();
export function shiftGlass(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches)
    return;
  const target = event.currentTarget;
  const { clientX, clientY } = event;
  const pending = glassFrames.get(target);
  if (pending) cancelAnimationFrame(pending);
  glassFrames.set(
    target,
    requestAnimationFrame(() => {
      glassFrames.delete(target);
      if (!target.isConnected) return;
      const bounds = target.getBoundingClientRect();
      const x = Math.max(-0.5, Math.min(0.5, (clientX - bounds.left) / bounds.width - 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (clientY - bounds.top) / bounds.height - 0.5));
      target.style.setProperty('--shift-x', `${x * 4}px`);
      target.style.setProperty('--shift-y', `${y * 4}px`);
      target.style.setProperty('--tilt-x', `${-y * 8}deg`);
      target.style.setProperty('--tilt-y', `${x * 10}deg`);
    }),
  );
}
export function resetGlass(event: PointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  const pending = glassFrames.get(target);
  if (pending) cancelAnimationFrame(pending);
  glassFrames.delete(target);
  target.style.setProperty('--shift-x', '0px');
  target.style.setProperty('--shift-y', '0px');
  target.style.setProperty('--tilt-x', '0deg');
  target.style.setProperty('--tilt-y', '0deg');
}

export function animateSaved(button: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !Element.prototype.animate) return;
  const source = button.closest('.tool-card')?.querySelector<HTMLElement>('.tool-logo');
  const target = [...document.querySelectorAll<HTMLElement>('[data-shelf-target]')].find(
    (element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.top >= 0 && rect.bottom <= innerHeight;
    },
  );
  if (!source || !target) return;
  const from = source.getBoundingClientRect(),
    to = target.getBoundingClientRect();
  const clone = source.cloneNode(true) as HTMLElement;
  clone.classList.add('save-flight');
  clone.setAttribute('aria-hidden', 'true');
  Object.assign(clone.style, {
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
  });
  document.body.append(clone);
  const x = to.left + to.width / 2 - from.left - from.width / 2;
  const y = to.top + to.height / 2 - from.top - from.height / 2;
  const animation = clone.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 0.95 },
      {
        transform: `translate(${x * 0.4}px, ${y * 0.4 - 28}px) scale(.72)`,
        opacity: 0.85,
        offset: 0.42,
      },
      { transform: `translate(${x}px, ${y}px) scale(.16)`, opacity: 0 },
    ],
    { duration: 380, easing: 'cubic-bezier(.22,.7,.22,1)' },
  );
  animation.onfinish = animation.oncancel = () => clone.remove();
}
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className = '',
  titleIcon,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  titleIcon?: ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content
          className={`modal ${className}`}
          ref={contentRef}
          onOpenAutoFocus={(event) => {
            openerRef.current =
              document.activeElement instanceof HTMLElement ? document.activeElement : null;
            event.preventDefault();
            const input = contentRef.current?.querySelector<HTMLInputElement>(
              '[data-command-input], [data-autofocus]',
            );
            if (input && !matchMedia('(max-width: 600px)').matches) input.focus();
            else contentRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const opener = openerRef.current;
            const activeDialogs = [
              ...document.querySelectorAll<HTMLElement>('[role="dialog"][data-state="open"]'),
            ];
            const activeDialog = activeDialogs.at(-1);
            if (opener?.isConnected && (!activeDialog || activeDialog.contains(opener)))
              opener.focus();
            else if (activeDialog && !activeDialog.contains(document.activeElement))
              activeDialog.focus();
          }}
        >
          <div className="modal-header">
            <div>
              <Dialog.Title>
                {titleIcon}
                {title}
              </Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Close dialog">
              <X size={20} />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon ?? <Monitor size={25} strokeWidth={1.4} />}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
export function Shortcut() {
  return (
    <kbd>
      <Command size={11} /> K
    </kbd>
  );
}
