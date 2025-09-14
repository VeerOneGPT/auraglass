'use client';

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utilsComprehensive';
import { OptimizedGlass, Motion } from '../../primitives';
import { useA11yId } from '../../utils/a11y';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface GlassCardLinkProps {
  /** Icon to display in the card */
  icon?: React.ReactNode;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** URL to navigate to when clicked */
  link: string;
  /** Button text for the call to action */
  buttonText?: string;
  /** Additional class name */
  className?: string;
  /** Custom content to display in the card */
  customPreview?: React.ReactNode;
  /** Glass variant styling */
  glassVariant?: 'clear' | 'frosted' | 'tinted' | 'luminous';
  /** Click handler (optional - will use link navigation if not provided) */
  onClick?: (e: React.MouseEvent) => void;
  /** Optional children to render instead of default content */
  children?: React.ReactNode;
  /** Respect user's motion preferences */
  respectMotionPreference?: boolean;
  /** Custom ID */
  id?: string;
  /** Custom ARIA label */
  'aria-label'?: string;
}

/**
 * GlassCardLink Component
 * 
 * An enhanced card with 3D transform effects and link functionality.
 * Features physics-inspired animations and intuitive hover states.
 * Modernized to use OptimizedGlass architecture.
 */
export const GlassCardLink = forwardRef<HTMLAnchorElement, GlassCardLinkProps>(({
  icon,
  title,
  description,
  link,
  buttonText = "Learn more",
  className="",
  customPreview,
  glassVariant = "frosted",
  onClick,
  children,
  respectMotionPreference = true,
  id,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const componentId = id || useA11yId('card-link');
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
      e.preventDefault();
    }
  };
  
  const defaultAriaLabel = ariaLabel || `${title}. ${description}. ${buttonText}.`;

  const ArrowIcon = () => (
    <svg 
      className="glass-glass-glass-w-4 glass-glass-glass-h-4 glass-ml-1 transition-transform duration-300 group-hover:translate-x-1"
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  // Map glass variants to OptimizedGlass props
  const variantMap = {
    clear: { intensity: 'subtle' as const, tint: 'neutral' as const },
    frosted: { intensity: 'medium' as const, tint: 'neutral' as const },
    tinted: { intensity: 'medium' as const, tint: 'cool' as const },
    luminous: { intensity: 'strong' as const, tint: 'warm' as const },
  };

  const variant = variantMap[glassVariant];

  // Render card content
  const renderCardContent = () => {
    if (children) return children;

    return (
      <>
        {/* Header */}
        {icon && (
          <div className="glass-glass-glass-relative glass-glass-glass-z-10 mb-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105">
            <div className="glass-glass-glass-relative">
              {icon}
              {/* Glow effect */}
              <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 -inset-2 glass-radius-lg bg-gradient-radial glass-gradient-primary via-blue-500/10 glass-gradient-primary opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="glass-glass-glass-relative glass-glass-glass-z-10 mb-6">
          <h3 
            className="glass-glass-glass-mb-2 glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-text-primary transition-colors duration-200"
          >
            {title}
          </h3>
          <p className="glass-glass-glass-mb-4 glass-glass-glass-text-sm glass-glass-glass-text-primary/70 transition-colors duration-200">
            {description}
          </p>
          
          {customPreview && (
            <div className="custom-preview-container">
              {customPreview}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="glass-glass-glass-relative glass-glass-glass-z-10 mt-auto pt-4 glass-glass-glass-border-t glass-glass-glass-border-white/10">
          <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
            <div 
              className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-text-sm glass-glass-glass-font-medium glass-glass-glass-text-primary/90 group transition-colors duration-300 group-hover:glass-glass-glass-text-primary"
              aria-hidden="true"
            >
              <span>{buttonText}</span>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Motion
      preset="fadeIn"
      className="group glass-glass-glass-block"
    >
      <a
        ref={ref}
        id={componentId}
        href={link}
        onClick={handleClick}
        aria-label={defaultAriaLabel}
        aria-describedby={`${componentId}-description`}
        className="glass-glass-glass-block"
      >
        <OptimizedGlass
          intent="neutral"
          elevation="level2"
          intensity={variant.intensity}
          depth={3}
          tint={variant.tint}
          border="subtle"
          animation="float"
          performanceMode="medium"
          liftOnHover
          press
          className={cn(
            // Base styles
            'group relative block overflow-hidden glass-radius-xl glass-p-6 text-decoration-none',
            'transform-gpu transition-all duration-500 ease-out',
            'perspective-1000 transform-style-preserve-3d',

            // Hover effects
            'hover:-translate-y-2 hover:scale-[1.01] hover:rotate-x-1',
            'hover:shadow-2xl hover:shadow-blue-500/20',

            // Glass overlay effect
            'before:absolute before:inset-0 before:z-0',
            'before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent',
            'before:opacity-0 before:transition-opacity before:duration-500',
            'hover:before:opacity-100',

            // Focus styles
            'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent',

            className
          )}
          style={{
            transformStyle: 'preserve-3d',
          }}
          {...props}
        >
          <div id={`${componentId}-description`} className="glass-glass-glass-sr-only">
            Interactive card link: {title}. {description}
          </div>
          <div className="glass-glass-glass-relative glass-glass-glass-z-10 glass-glass-glass-flex glass-glass-glass-h-full min-h-[200px] glass-glass-glass-flex-col">
            {renderCardContent()}
          </div>
        </OptimizedGlass>
      </a>
    </Motion>
  );
});

GlassCardLink.displayName = 'GlassCardLink';

export default GlassCardLink;