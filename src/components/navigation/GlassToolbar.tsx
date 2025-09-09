'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { cn } from '@/lib/utilsComprehensive';
import { OptimizedGlass } from '../../primitives';

export interface GlassToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  sticky?: boolean;
  floating?: boolean;
}

export function GlassToolbar({ left, center, right, sticky = false, floating = false, className, ...rest }: GlassToolbarProps) {
  return (
    <OptimizedGlass
      elevation={floating ? "level2" : "level1"}
      className={cn(
        'w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl',
        sticky && 'sticky top-0 z-30',
        floating && 'shadow-xl',
        className
      )}
      {...rest}
    >
      <div className="min-w-0 flex items-center gap-2">{left}</div>
      <div className="min-w-0 flex-1 flex items-center justify-center">{center}</div>
      <div className="min-w-0 flex items-center gap-2">{right}</div>
    </OptimizedGlass>
  );
}

export default GlassToolbar;

