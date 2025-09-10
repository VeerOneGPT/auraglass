'use client';

import React, { forwardRef, HTMLAttributes, KeyboardEvent } from 'react';
import { cn } from '@/design-system/utilsCore';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * HTML element tag to render as
   */
  as?: React.ElementType;
  
  /**
   * Elevation level for depth perception (0-6)
   */
  elev?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Glass variant for semantic surfaces
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  
  /**
   * Border radius preset
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  
  /**
   * Blur intensity
   */
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Motion animation preset
   */
  motion?: 'none' | 'float' | 'shimmer' | 'ambient' | 'press';
  
  /**
   * Enable interactive states
   */
  interactive?: boolean;
  
  /**
   * Contrast guard mode
   */
  contrast?: 'auto' | 'on' | 'off';
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Add noise texture overlay
   */
  noise?: boolean;
  
  /**
   * Add specular overlay
   */
  specular?: boolean;
  
  /**
   * Add edge frost effect
   */
  edge?: boolean;
  
  /**
   * Glow effect variant
   */
  glow?: 'none' | 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

/**
 * Advanced Glass Primitive Component
 * Token-first glassmorphism with full a11y support
 */
export const GlassAdvanced = forwardRef<HTMLDivElement, GlassProps>(
  (
    {
      as: Component = 'div',
      elev = 2,
      variant = 'default',
      radius = 'lg',
      blur = 'lg',
      motion = 'none',
      interactive = false,
      contrast = 'auto',
      disabled = false,
      noise = false,
      specular = false,
      edge = false,
      glow = 'none',
      className,
      children,
      onKeyDown,
      onClick,
      role,
      tabIndex,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    
    // Handle keyboard accessibility for interactive elements
    const isClickable = !!onClick && !disabled;
    const computedRole = role || (isClickable && Component === 'div' ? 'button' : undefined);
    const computedTabIndex = tabIndex ?? (isClickable || interactive ? 0 : undefined);
    
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      // Call custom handler first
      onKeyDown?.(e);
      
      // Handle space/enter for clickable divs
      if (isClickable && Component === 'div' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as any);
      }
    };
    
    // Token validation in development
    if (process.env.NODE_ENV === 'development') {
      const validElevations = [0, 1, 2, 3, 4, 5, 6];
      const validRadii = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'];
      const validBlurs = ['none', 'sm', 'md', 'lg', 'xl'];
      const validMotions = ['none', 'float', 'shimmer', 'ambient', 'press'];
      
      if (!validElevations.includes(elev)) {
        console.warn(`GlassAdvanced: Invalid elevation "${elev}". Use 0-6.`);
      }
      if (!validRadii.includes(radius)) {
        console.warn(`GlassAdvanced: Invalid radius "${radius}". Use ${validRadii.join(', ')}.`);
      }
      if (!validBlurs.includes(blur)) {
        console.warn(`GlassAdvanced: Invalid blur "${blur}". Use ${validBlurs.join(', ')}.`);
      }
      if (!validMotions.includes(motion)) {
        console.warn(`GlassAdvanced: Invalid motion "${motion}". Use ${validMotions.join(', ')}.`);
      }
    }
    
    // Build class names using tokens
    const classes = cn(
      // Base glass foundation
      'glass-foundation-complete',
      
      // Elevation
      elev > 0 && `glass-elev-${elev}`,
      
      // Radius
      `glass-radius-${radius}`,
      
      // Blur
      blur !== 'lg' && `glass-blur-${blur}`,
      
      // Variant surfaces
      variant !== 'default' && `glass-surface-${variant}`,
      
      // Motion (respect reduced motion)
      motion !== 'none' && !prefersReducedMotion && `glass-animate-${motion}`,
      
      // Interactive states
      interactive && 'glass-state-hoverable glass-state-active',
      
      // Contrast guard
      contrast === 'auto' && 'glass-contrast-guard',
      
      // Disabled state
      disabled && 'glass-state-disabled',
      
      // Overlay effects
      noise && 'glass-overlay-noise',
      specular && 'glass-overlay-specular',
      edge && 'glass-edge',
      
      // Glow effects
      glow !== 'none' && `glass-glow${glow !== 'default' ? `-${glow}` : ''}`,
      
      // Focus utilities
      (isClickable || interactive) && 'glass-focus',
      
      // Custom classes
      className
    );
    
    // Ensure minimum touch target for interactive elements
    const touchTargetClasses = (isClickable || interactive) ? 'glass-touch-target' : '';
    
    return React.createElement(
      Component,
      {
        ref,
        className: cn(classes, touchTargetClasses),
        role: computedRole,
        tabIndex: computedTabIndex,
        'aria-disabled': disabled || undefined,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        onClick: disabled ? undefined : onClick,
        onKeyDown: handleKeyDown,
        ...(props as any)
      } as any,
      React.createElement('div', { className: 'glass-layer-frost' }),
      React.createElement('div', { className: 'glass-layer-ink' }, children)
    );
  }
);

GlassAdvanced.displayName = 'GlassAdvanced';

/**
 * SSR-safe class composition helper
 */
export function composeGlassClasses(props: Partial<GlassProps>): string {
  const {
    elev = 2,
    variant = 'default',
    radius = 'lg',
    blur = 'lg',
    motion = 'none',
    interactive = false,
    contrast = 'auto',
    disabled = false,
    noise = false,
    specular = false,
    edge = false,
    glow = 'none',
  } = props;
  
  return cn(
    'glass-foundation-complete',
    elev > 0 && `glass-elev-${elev}`,
    `glass-radius-${radius}`,
    blur !== 'lg' && `glass-blur-${blur}`,
    variant !== 'default' && `glass-surface-${variant}`,
    motion !== 'none' && `glass-animate-${motion}`,
    interactive && 'glass-state-hoverable glass-state-active',
    contrast === 'auto' && 'glass-contrast-guard',
    disabled && 'glass-state-disabled',
    noise && 'glass-overlay-noise',
    specular && 'glass-overlay-specular',
    edge && 'glass-edge',
    glow !== 'none' && `glass-glow${glow !== 'default' ? `-${glow}` : ''}`,
    (interactive) && 'glass-focus'
  );
}