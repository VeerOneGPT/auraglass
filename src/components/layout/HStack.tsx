'use client';

import React, { forwardRef } from 'react';
import { GlassStack, type GlassStackProps } from './GlassStack';

export interface HStackProps extends Omit<GlassStackProps, 'direction'> {
  /**
   * Spacing between items (for backward compatibility)
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * Horizontal Stack component  
 * Wrapper around GlassStack with direction set to horizontal
 */
export const HStack = forwardRef<HTMLDivElement, HStackProps>(
  ({ spacing, space, ...props }, ref) => {
    return (
      <GlassStack
        ref={ref}
        direction="horizontal"
        space={spacing || space}
        {...props}
      />
    );
  }
);

HStack.displayName = 'HStack';


