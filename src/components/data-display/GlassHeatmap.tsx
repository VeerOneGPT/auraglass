'use client';

import React from 'react';
import { cn } from '@/design-system/utils';

export interface HeatmapCell { value: number; label?: string }
export interface GlassHeatmapProps {
  data: HeatmapCell[][];
  className?: string;
}

export function GlassHeatmap({ data, className }: GlassHeatmapProps) {
  const max = Math.max(...data.flat().map(c => c.value));
  return (
    <div className={cn('inline-block rounded-xl p-2 bg-white/5 border border-white/10', className)}>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${data[0]?.length || 0}, 1fr)` }}>
        {data.flat().map((c, i) => (
          <div key={i} className="w-5 h-5 m-[2px] rounded-sm" title={c.label}
            style={{ backgroundColor: `rgba(99,102,241,${(c.value/(max||1))*0.9+0.1})` }} />
        ))}
      </div>
    </div>
  );
}

export default GlassHeatmap;

