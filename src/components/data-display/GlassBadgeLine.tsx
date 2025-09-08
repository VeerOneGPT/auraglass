'use client';

import React from 'react';
import { cn } from '@/design-system/utils';

export interface GlassBadgeLineProps {
  items: { label: string; intent?: 'default' | 'success' | 'warning' | 'danger' }[];
  className?: string;
}

export function GlassBadgeLine({ items, className }: GlassBadgeLineProps) {
  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {items.map((it, i) => (
        <span
          key={i}
          className={cn(
            'px-2 py-0.5 text-xs rounded-full border',
            it.intent === 'success' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30' :
            it.intent === 'warning' ? 'bg-amber-500/15 text-amber-300 border-amber-400/30' :
            it.intent === 'danger' ? 'bg-red-500/15 text-red-300 border-red-400/30' :
            'bg-white/10 text-white/80 border-white/20'
          )}
        >
          {it.label}
        </span>
      ))}
    </div>
  );
}

export default GlassBadgeLine;

