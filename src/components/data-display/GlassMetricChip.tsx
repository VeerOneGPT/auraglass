'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';
import { cn } from '@/design-system/utilsCore';

export interface GlassMetricChipProps {
  label: string;
  value: string | number;
  delta?: string;
  intent?: 'default' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  className?: string;
}

export function GlassMetricChip({ label, value, delta, intent = 'default', icon, className }: GlassMetricChipProps) {
  const intentColor = intent === 'success' ? 'text-emerald-300' : intent === 'warning' ? 'text-amber-300' : intent === 'danger' ? 'text-red-300' : 'text-white';
  return (
    <OptimizedGlass elevation={'level1'} className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/15', className)}>
      {icon && <span className="opacity-80">{icon}</span>}
      <span className="text-xs text-white/70">{label}</span>
      <span className={cn('font-semibold', intentColor)}>{value}</span>
      {delta && <span className="text-xs text-white/60">{delta}</span>}
    </OptimizedGlass>
  );
}

export default GlassMetricChip;

