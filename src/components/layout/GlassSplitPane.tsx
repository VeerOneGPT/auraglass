'use client';

import React from 'react';
import { cn } from '@/design-system/utils';

export interface GlassSplitPaneProps {
  direction?: 'horizontal' | 'vertical';
  initial?: number; // percentage for first pane
  min?: number;
  max?: number;
  left?: React.ReactNode; // or top
  right?: React.ReactNode; // or bottom
  className?: string;
}

export function GlassSplitPane({
  direction = 'horizontal',
  initial = 50,
  min = 20,
  max = 80,
  left,
  right,
  className
}: GlassSplitPaneProps) {
  const [pct, setPct] = React.useState(initial);
  const dragging = React.useRef(false);

  const onDown = () => (dragging.current = true);
  const onUp = () => (dragging.current = false);
  const onMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    if (direction === 'horizontal') {
      const next = (e.clientX / window.innerWidth) * 100;
      setPct(Math.max(min, Math.min(max, next)));
    } else {
      const next = (e.clientY / window.innerHeight) * 100;
      setPct(Math.max(min, Math.min(max, next)));
    }
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div
      className={cn(
        'relative w-full h-full',
        direction === 'horizontal' ? 'grid grid-cols-[var(--a)_12px_1fr]' : 'grid grid-rows-[var(--a)_12px_1fr]',
        className
      )}
      style={{
        // @ts-ignore custom var
        ['--a' as any]: `${pct}%`
      }}
    >
      <div className="min-w-0 min-h-0 overflow-auto">{left}</div>
      <div
        role="separator"
        aria-orientation={direction === 'horizontal' ? 'vertical' : 'horizontal'}
        onMouseDown={onDown}
        className={cn(
          'cursor-col-resize select-none rounded-full',
          direction === 'horizontal' ? 'w-3 h-full' : 'h-3 w-full cursor-row-resize',
          'bg-white/10 hover:bg-white/20'
        )}
      />
      <div className="min-w-0 min-h-0 overflow-auto">{right}</div>
    </div>
  );
}

export default GlassSplitPane;

