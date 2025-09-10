'use client';

import React, { forwardRef } from 'react';
import { GlassStack, type GlassStackProps } from './GlassStack';
import { useA11yId } from '@/utils/a11y';
import { useMotionPreferenceContext } from '@/contexts/MotionPreferenceContext';

export interface VStackProps extends Omit<GlassStackProps, 'direction'> {
  /**
   * Spacing between items (for backward compatibility)
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /** Glass surface intent */
  intent?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  
  /** Glass surface elevation */
  elevation?: 'level1' | 'level2' | 'level3' | 'level4';
  
  /** Performance tier */
  tier?: 'low' | 'medium' | 'high';

  /**
   * Whether to respect user's motion preferences
   */
  respectMotionPreference?: boolean;

  /**
   * Accessibility label for screen readers
   */
  'aria-label'?: string;

  /**
   * Accessibility role for semantic meaning
   */
  role?: string;
}

/**
 * Vertical Stack component
 * Wrapper around GlassStack with direction set to vertical
 */
export const VStack = forwardRef<HTMLDivElement, VStackProps>(
  ({ spacing, space, respectMotionPreference = true, 'aria-label': ariaLabel, role, ...props }, ref) => {
    const stackId = useA11yId();
    const { prefersReducedMotion } = useMotionPreferenceContext();
    const shouldRespectMotion = respectMotionPreference && !prefersReducedMotion;

    return (
      <GlassStack
        ref={ref}
        direction="vertical"
        space={spacing || space}
        respectMotionPreference={shouldRespectMotion}
        aria-label={ariaLabel || 'Vertical stack'}
        role={role}
        {...props}
      />
    );
  }
);

VStack.displayName = 'VStack';


