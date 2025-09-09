'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';
import { cn } from '@/design-system/utilsCore';

export interface MentionItem { id: string; label: string; meta?: string }
export interface GlassMentionListProps { items: MentionItem[]; onSelect: (id:string)=>void; className?: string }

export function GlassMentionList({ items, onSelect, className }: GlassMentionListProps) {
  return (
    <OptimizedGlass elevation={'level2'} className={cn('rounded-lg p-1 border border-white/15', className)}>
      <ul className="max-h-60 overflow-auto">
        {items.map(it => (
          <li key={it.id}>
            <button onClick={()=>onSelect(it.id)} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10">
              <div className="text-sm text-white">{it.label}</div>
              {it.meta && <div className="text-xs text-white/60">{it.meta}</div>}
            </button>
          </li>
        ))}
      </ul>
    </OptimizedGlass>
  );
}

export default GlassMentionList;

