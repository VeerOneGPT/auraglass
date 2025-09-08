'use client';

import React from 'react';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';
import { cn } from '@/design-system/utils';

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
        <div className="grid grid-cols-2 gap-3">
          <OptimizedGlass elevation={1} className="rounded-lg p-3 border border-white/15 overflow-auto">
            <pre className="text-xs text-white/80 whitespace-pre-wrap break-all">{left}</pre>
          </OptimizedGlass>
          <OptimizedGlass elevation={1} className="rounded-lg p-3 border border-white/15 overflow-auto">
            <pre className="text-xs text-white/80 whitespace-pre-wrap break-all">{right}</pre>
          </OptimizedGlass>
        </div>
      ) : (
        <OptimizedGlass elevation={1} className="rounded-lg p-3 border border-white/15 overflow-auto">
          <pre className="text-xs text-white/80 whitespace-pre-wrap break-all">{right}</pre>
        </OptimizedGlass>
      )}
    </div>
  );
}

export default GlassDiffViewer;

