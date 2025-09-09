'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { cn } from '@/lib/utilsComprehensive';
import { OptimizedGlass } from '../../primitives';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  time?: string;
  icon?: React.ReactNode;
}

export interface GlassTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function GlassTimeline({ items, className }: GlassTimelineProps) {
  return (
    <div className={cn('relative pl-5', className)}>
      <div className="absolute top-0 bottom-0 left-2 w-px bg-white/10" />
      <ul className="space-y-3">
        {items.map(it => (
          <li key={it.id} className="relative">
            <span className="absolute left-0 top-2 -ml-1 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_0_3px_rgba(59,130,246,0.25)]" />
            <OptimizedGlass elevation={'level1'} className="rounded-lg p-3 border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 min-w-0">
                  {it.icon && <div className="mt-0.5 opacity-80">{it.icon}</div>}
                  <div className="min-w-0">
                    <div className="font-medium text-white truncate">{it.title}</div>
                    {it.subtitle && <div className="text-sm text-white/70 truncate">{it.subtitle}</div>}
                  </div>
                </div>
                {it.time && <div className="text-xs text-white/60 ml-3 whitespace-nowrap">{it.time}</div>}
              </div>
            </OptimizedGlass>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GlassTimeline;

