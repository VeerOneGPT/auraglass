'use client';

import React from 'react';
import { OptimizedGlass } from '../../primitives';
import { cn } from '@/lib/utilsComprehensive';

export interface GlassMetricChipProps {
  label: string;
  value: string | number;
  delta?: string;
  intent?: 'default' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  className?: string;
}

export function GlassMetricChip({ label, value, delta, intent = 'default', icon, className }: GlassMetricChipProps) {
  const intentColor = intent === 'success' ? 'text-emerald-300' : intent === 'warning' ? 'text-amber-300' : intent === 'danger' ? 'text-red-300' : 'glass-text-primary';
  return (
    <OptimizedGlass elevation={'level1'} className={cn('inline-flex items-center glass-gap-2 glass-px-3 glass-py-1.5 glass-radius-xl border border-white/15', className)}>
      {icon && <span className="opacity-80">{icon}</span>}
      <span className="glass-text-xs glass-text-primary/70">{label}</span>
      <span className={cn('font-semibold', intentColor)}>{value}</span>
      {delta && <span className="glass-text-xs glass-text-primary/60">{delta}</span>}
    </OptimizedGlass>
  );
}

export default GlassMetricChip;

