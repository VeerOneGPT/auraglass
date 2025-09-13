'use client';

import React from 'react';
import { OptimizedGlass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';

export interface GlassDiffViewerProps {
  left: string;
  right: string;
  sideBySide?: boolean;
  className?: string;
}

export function GlassDiffViewer({ left, right, sideBySide = true, className }: GlassDiffViewerProps) {
  return (
    <div className={cn('w-full', className)}>
      {sideBySide ? (
        <div className="glass-glass-grid glass-glass-glass-grid-cols-2 glass-glass-gap-3">
          <OptimizedGlass elevation={'level1'} className="glass-radius-lg glass-glass-p-3 glass-glass-border glass-glass-border-white/15 glass-glass-overflow-auto">
            <pre className="glass-glass-text-xs glass-glass-text-primary/80 whitespace-pre-wrap break-all">{left}</pre>
          </OptimizedGlass>
          <OptimizedGlass elevation={'level1'} className="glass-radius-lg glass-glass-p-3 glass-glass-border glass-glass-border-white/15 glass-glass-overflow-auto">
            <pre className="glass-glass-text-xs glass-glass-text-primary/80 whitespace-pre-wrap break-all">{right}</pre>
          </OptimizedGlass>
        </div>
      ) : (
        <OptimizedGlass elevation={'level1'} className="glass-radius-lg glass-glass-p-3 glass-glass-border glass-glass-border-white/15 glass-glass-overflow-auto">
          <pre className="glass-glass-text-xs glass-glass-text-primary/80 whitespace-pre-wrap break-all">{right}</pre>
        </OptimizedGlass>
      )}
    </div>
  );
}

export default GlassDiffViewer;

