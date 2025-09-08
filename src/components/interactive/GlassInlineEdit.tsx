'use client';

import React from 'react';
import { GlassButton } from '../button/GlassButton';
import { cn } from '@/design-system/utils';

export interface GlassInlineEditProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export function GlassInlineEdit({ value, onChange, placeholder = 'Edit…', className }: GlassInlineEditProps) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);
  React.useEffect(() => setDraft(value), [value]);
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      {editing ? (
        <>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { onChange(draft); setEditing(false); }
              if (e.key === 'Escape') { setDraft(value); setEditing(false); }
            }}
            placeholder={placeholder}
            className="bg-transparent border border-white/20 rounded-lg px-2 py-1 text-sm outline-none"
          />
          <GlassButton size="sm" variant="primary" onClick={() => { onChange(draft); setEditing(false); }}>Save</GlassButton>
          <GlassButton size="sm" variant="ghost" onClick={() => { setDraft(value); setEditing(false); }}>Cancel</GlassButton>
        </>
      ) : (
        <button className="px-2 py-1 rounded-lg hover:bg-white/10 text-sm" onClick={() => setEditing(true)}>
          {value || <span className="text-white/60">{placeholder}</span>}
        </button>
      )}
    </div>
  );
}

export default GlassInlineEdit;

