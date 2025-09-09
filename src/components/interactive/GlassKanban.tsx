'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { cn } from '@/design-system/utilsCore';
import { OptimizedGlass } from '../../primitives';

export interface KanbanCard { id: string; title: string; description?: string }
export interface KanbanColumn { id: string; title: string; cards: KanbanCard[] }
export interface GlassKanbanProps { columns: KanbanColumn[]; className?: string }

export function GlassKanban({ columns, className }: GlassKanbanProps) {
  return (
    <div className={cn('grid gap-3', className)} style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(220px,1fr))` }}>
      {columns.map(col => (
        <div key={col.id} className="space-y-2">
          <div className="text-sm text-white/80 font-medium px-1">{col.title}</div>
          <div className="space-y-2">
            {col.cards.map(card => (
              <OptimizedGlass elevation={'level1'} key={card.id} className="rounded-lg p-3 border border-white/15">
                <div className="text-sm text-white font-medium">{card.title}</div>
                {card.description && <div className="text-xs text-white/70">{card.description}</div>}
              </OptimizedGlass>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GlassKanban;

