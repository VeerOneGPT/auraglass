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
        <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-3">
          <OptimizedGlass elevation={'level1'} className="glass-radius-lg glass-glass-glass-p-3 glass-glass-glass-border glass-glass-glass-border-white/15 glass-glass-glass-overflow-auto">
            <pre className="glass-glass-glass-text-xs glass-glass-glass-text-primary/80 whitespace-pre-wrap break-all">{left}</pre>
          </OptimizedGlass>
          <OptimizedGlass elevation={'level1'} className="glass-radius-lg glass-glass-glass-p-3 glass-glass-glass-border glass-glass-glass-border-white/15 glass-glass-glass-overflow-auto">
            <pre className="glass-glass-glass-text-xs glass-glass-glass-text-primary/80 whitespace-pre-wrap break-all">{right}</pre>
          </OptimizedGlass>
        </div>
      ) : (
        <OptimizedGlass elevation={'level1'} className="glass-radius-lg glass-glass-glass-p-3 glass-glass-glass-border glass-glass-glass-border-white/15 glass-glass-glass-overflow-auto">
          <pre className="glass-glass-glass-text-xs glass-glass-glass-text-primary/80 whitespace-pre-wrap break-all">{right}</pre>
        </OptimizedGlass>
      )}
    </div>
  );
}

export default GlassDiffViewer;

