'use client';

import React from 'react';
import { GlassButton } from '../button/GlassButton';
import { cn } from '@/lib/utilsComprehensive';

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
    <div className={cn('inline-flex items-center glass-gap-2', className)}>
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
            className="bg-transparent border border-white/20 glass-radius-lg glass-px-2 glass-py-1 glass-text-sm outline-none"
          />
          <GlassButton size="sm" variant="primary" onClick={(e) => { onChange(draft); setEditing(false); }}>Save</GlassButton>
          <GlassButton size="sm" variant="ghost" onClick={(e) => { setDraft(value); setEditing(false); }}>Cancel</GlassButton>
        </>
      ) : (
        <button className="glass-px-2 glass-py-1 glass-radius-lg hover:bg-white/10 glass-text-sm" onClick={(e) => setEditing(true)}>
          {value || <span className="glass-text-primary/60">{placeholder}</span>}
        </button>
      )}
    </div>
  );
}

export default GlassInlineEdit;

