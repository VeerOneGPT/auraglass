'use client';

import React, { forwardRef } from 'react';
import { GlassStack, type GlassStackProps } from './GlassStack';

import { createGlassStyle } from '../../core/mixins/glassMixins';
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
}

/**
 * Vertical Stack component
 * Wrapper around GlassStack with direction set to vertical
 */
export const VStack = forwardRef<HTMLDivElement, VStackProps>(
  ({ spacing, space, ...props }, ref) => {
    return (
      <GlassStack
        ref={ref}
        direction="vertical"
        space={spacing || space}
        {...props}
      />
    );
  }
);

VStack.displayName = 'VStack';


