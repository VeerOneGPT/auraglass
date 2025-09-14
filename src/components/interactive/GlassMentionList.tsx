'use client';

import React from 'react';
import { OptimizedGlass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';

export interface MentionItem { id: string; label: string; meta?: string }
export interface GlassMentionListProps { items: MentionItem[]; onSelect: (id:string)=>void; className?: string }

export function GlassMentionList({ items, onSelect, className }: GlassMentionListProps) {
  return (
    <OptimizedGlass elevation={'level2'} className={cn('glass-radius-lg glass-p-1 border border-white/15', className)}>
      <ul className="max-h-60 glass-glass-glass-overflow-auto">
        {items.map(it => (
          <li key={it.id}>
            <button onClick={(e) =>onSelect(it.id)} className="glass-glass-glass-w-full glass-glass-glass-text-left glass-glass-glass-px-3 glass-glass-glass-py-2 glass-radius-md hover:glass-surface-subtle/10">
              <div className="glass-glass-glass-text-sm glass-glass-glass-text-primary">{it.label}</div>
              {it.meta && <div className="glass-glass-glass-text-xs glass-glass-glass-text-primary/60">{it.meta}</div>}
            </button>
          </li>
        ))}
      </ul>
    </OptimizedGlass>
  );
}

export default GlassMentionList;

