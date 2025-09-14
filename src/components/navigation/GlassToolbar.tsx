'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utilsComprehensive';
import { OptimizedGlass } from '../../primitives';
import { useA11yId } from '@/utils/a11y';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface GlassToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  sticky?: boolean;
  floating?: boolean;
  /**
   * Whether to respect motion preferences for animations
   */
  respectMotionPreference?: boolean;
}

export const GlassToolbar = forwardRef<HTMLDivElement, GlassToolbarProps>(({ 
  left, 
  center, 
  right, 
  sticky = false, 
  floating = false, 
  respectMotionPreference = true,
  className, 
  ...rest 
}, ref) => {
  // Accessibility and motion preferences
  const toolbarId = useA11yId('toolbar');
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = respectMotionPreference && prefersReducedMotion;
  return (
    <OptimizedGlass
      ref={ref}
      elevation={floating ? "level2" : "level1"}
      animation={shouldReduceMotion ? 'none' : 'gentle'}
      role="toolbar"
      aria-label="Toolbar"
      id={toolbarId}
      className={cn(
        'w-full flex items-center justify-between glass-gap-3 glass-px-3 glass-py-2 glass-radius-xl',
        sticky && 'sticky top-0 z-30',
        floating && 'shadow-xl',
        className
      )}
      {...rest}
    >
      <div className="glass-glass-glass-min-glass-glass-w-0 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">{left}</div>
      <div className="glass-glass-glass-min-glass-glass-w-0 glass-glass-glass-flex-1 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">{center}</div>
      <div className="glass-glass-glass-min-glass-glass-w-0 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">{right}</div>
    </OptimizedGlass>
  );
});

GlassToolbar.displayName = 'GlassToolbar';

export default GlassToolbar;

