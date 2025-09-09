'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { cn } from '@/design-system/utilsCore';
import { OptimizedGlass } from '../../primitives';

export interface GlassBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  height?: number | string; // e.g. 70% or 560
  className?: string;
}

export function GlassBottomSheet({ open, onOpenChange, children, height = '70%', className }: GlassBottomSheetProps) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[1100]" onClick={() => onOpenChange(false)}>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      <div
        className={cn(
          'fixed left-0 right-0 bottom-0 z-[1101] transition-transform duration-300',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        role="dialog"
        aria-modal="true"
      >
        <OptimizedGlass elevation={'level3'} className={cn('h-full rounded-t-2xl p-4', className)}>
          <div className="mx-auto w-10 h-1.5 rounded-full bg-white/30 mb-3" />
          {children}
        </OptimizedGlass>
      </div>
    </>
  );
}

export default GlassBottomSheet;

