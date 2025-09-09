'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';
import { cn } from '@/design-system/utilsCore';

export interface GlassJSONViewerProps { value: any; className?: string }

export function GlassJSONViewer({ value, className }: GlassJSONViewerProps) {
  return (
    <OptimizedGlass elevation={'level1'} className={cn('rounded-lg p-3 overflow-auto border border-white/15', className)}>
      <pre className="text-xs text-white/80 whitespace-pre-wrap break-all">
        {JSON.stringify(value, null, 2)}
      </pre>
    </OptimizedGlass>
  );
}

export default GlassJSONViewer;

