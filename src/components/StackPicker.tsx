import { useState } from 'react';
import { Check, Layers3, Plus } from 'lucide-react';
import { useLibrary } from '../lib/library-context';
import { useApp } from '../lib/app-context';
import { Modal } from './ui';
export function StackPicker({ toolId, toolName }: { toolId: string; toolName: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const { stacks, createStack, updateStack } = useLibrary();
  const { notify } = useApp();
  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        <Layers3 size={16} />
        Add to stack
      </button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={`A place for ${toolName}.`}
        description="Group tools into a toolkit you can return to."
        className="stack-picker-modal"
      >
        <div className="stack-destinations">
          {stacks.map((stack) => (
            <button
              key={stack.id}
              disabled={stack.toolIds.includes(toolId)}
              onClick={() => {
                updateStack(stack.id, { toolIds: [...stack.toolIds, toolId] });
                notify(`Added to ${stack.name}`);
                setOpen(false);
              }}
            >
              <span className="stack-mini-symbol">
                <Layers3 size={20} />
              </span>
              <span>
                <strong>{stack.name}</strong>
                <small>{stack.toolIds.length} tools</small>
              </span>
              {stack.toolIds.includes(toolId) ? <Check size={18} /> : <Plus size={18} />}
            </button>
          ))}
          {!stacks.length && <p className="helper-text">Your first stack starts with this tool.</p>}
        </div>
        <form
          className="new-stack-inline"
          onSubmit={(event) => {
            event.preventDefault();
            const id = createStack(name, [toolId]);
            if (id) {
              notify(`Created ${name.trim()}`);
              setName('');
              setOpen(false);
            }
          }}
        >
          <label htmlFor="quick-stack-name">Create a new stack</label>
          <div>
            <input
              id="quick-stack-name"
              placeholder="e.g. My creative toolkit"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={60}
              required
            />
            <button
              className="button button-dark"
              type="submit"
              disabled={!name.trim() || stacks.length >= 60}
            >
              <Plus size={16} />
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
