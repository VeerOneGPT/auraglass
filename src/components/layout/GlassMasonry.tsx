'use client';

import React from 'react';
import { cn } from '@/design-system/utilsCore';

export interface GlassMasonryProps {
  columns?: number;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

export function GlassMasonry({ columns = 3, gap = 12, children, className }: GlassMasonryProps) {
  return (
    <div className={cn('w-full', className)} style={{ columnCount: columns as any, columnGap: gap }}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{ breakInside: 'avoid', marginBottom: gap }}>
          {child}
        </div>
      ))}
    </div>
  );
}

export default GlassMasonry;

