'use client';

import React, { forwardRef } from 'react';
import { GlassStack, type GlassStackProps } from './GlassStack';

export interface VStackProps extends Omit<GlassStackProps, 'direction'> {
  /**
   * Spacing between items (for backward compatibility)
   */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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


