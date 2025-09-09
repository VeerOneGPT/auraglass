'use client';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef } from 'react';
import { OptimizedGlassCore as OptimizedGlass, type OptimizedGlassProps } from '../../primitives';

export interface GlassCardProps extends Omit<OptimizedGlassProps, 'variant'> {
  /**
   * Card variant style
   */
  variant?: 'default' | 'outlined' | 'elevated' | 'interactive' | 'feature' | 'minimal' | 'primary' | 'outline';
  /**
   * Card size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether the card is hoverable
   */
  hoverable?: boolean;
  /**
   * Whether the card is clickable
   */
  clickable?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * GlassCard component
 * A versatile card component with glassmorphism styling
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      size = 'md',
      elevation = 1,
      hoverable = false,
      clickable = false,
      loading = false,
      disabled = false,
      interactive,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };

    const variantClasses = {
      default: '',
      outlined: 'ring-1 ring-border/20',
      elevated: '',
      interactive: 'transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
      feature: 'relative overflow-hidden',
      minimal: 'backdrop-blur-md bg-transparent border-0',
      primary: '',
      outline: 'ring-1 ring-border/20',
    };

    const getElevation = () => {
      if (variant === 'elevated') return 2;
      if (variant === 'feature') return 3;
      if (variant === 'minimal') return 0;
      return elevation;
    };

    const isInteractive = interactive || hoverable || clickable;

    return (
      <OptimizedGlass
        ref={ref}
        variant={variant === 'feature' ? 'feature' : variant === 'elevated' ? 'elevated' : variant === 'outlined' ? 'outlined' : 'default'}
        elevation={getElevation()}
        blur="medium"
        intensity="medium"
        depth={variant === 'elevated' ? 3 : 1}
        tint="neutral"
        border={variant === 'outlined' ? 'glow' : 'subtle'}
        animation="none"
        interactive={isInteractive}
        performanceMode="medium"
        className={cn(
          'glass-foundation-complete relative rounded-xl overflow-hidden',
          'transition-all duration-300 ease-out',
          // Advanced hover effects with glass enhancement
          hoverable && [
            'group'
          ],
          sizeClasses[size],
          variantClasses[variant],
          {
            // Sophisticated micro-interactions
            'hover:scale-[1.008] hover:-translate-y-1': hoverable && !disabled,
            'hover:shadow-2xl hover:shadow-blue-500/10': hoverable && !disabled,
            // Enhanced click feedback
            'cursor-pointer': clickable && !disabled,
            'active:scale-[0.995] active:translate-y-0': clickable && !disabled,
            '': clickable && !disabled, // Remove broken CSS class
            // Disabled state
            'opacity-50 pointer-events-none': disabled,
            // Loading state
            'animate-pulse': loading,
          },
          className
        )}
        {...props}
      >
        {/* Advanced micro-interaction overlays */}
        {hoverable && (
          <>
            {/* Subtle glow overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-lg" />

            {/* Border glow enhancement */}
            <div className="absolute inset-0 rounded-lg border border-white/0 group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />
          </>
        )}

        {/* Feature variant enhancement */}
        {variant === 'feature' && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-secondary/4 to-accent/6 rounded-lg" />
        )}

        {/* Content with enhanced loading state */}
        <div className="relative z-10">
          {loading ? (
            <div className="space-y-3">
              <div className="h-4 bg-white/20 animate-pulse rounded shimmer" />
              <div className="h-4 bg-white/15 animate-pulse rounded w-3/4 shimmer" />
              <div className="h-4 bg-white/10 animate-pulse rounded w-1/2 shimmer" />
            </div>
          ) : (
            children
          )}
        </div>
      </OptimizedGlass>
    );
  }
);

GlassCard.displayName = 'GlassCard';

/**
 * CardHeader component
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether to show border below header
   */
  bordered?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ size = 'md', bordered = false, className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'pb-2',
      md: 'pb-3',
      lg: 'pb-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-1.5',
          sizeClasses[size],
          {
            'border-b border-border/20': bordered,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle component
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Title size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Heading level
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ size = 'md', level = 3, className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-base font-medium',
      md: 'text-lg font-semibold',
      lg: 'text-xl font-semibold',
      xl: 'text-2xl font-bold',
    };

    const headingProps = {
      ref,
      className: cn(
        'text-card-foreground leading-none tracking-tight',
        sizeClasses[size],
        className
      ),
      ...props,
      children
    };

    switch (level) {
      case 1:
        return <h1 {...headingProps} />;
      case 2:
        return <h2 {...headingProps} />;
      case 3:
        return <h3 {...headingProps} />;
      case 4:
        return <h4 {...headingProps} />;
      case 5:
        return <h5 {...headingProps} />;
      case 6:
        return <h6 {...headingProps} />;
      default:
        return <h3 {...headingProps} />;
    }
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription component
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Description size
   */
  size?: 'sm' | 'md' | 'lg';
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <p
        ref={ref}
        className={cn(
          'text-muted-foreground',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * CardContent component
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content padding
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ padding = 'none', className, children, ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'text-card-foreground',
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * CardFooter component
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Footer alignment
   */
  align?: 'left' | 'center' | 'right' | 'between' | 'around';
  /**
   * Whether to show border above footer
   */
  bordered?: boolean;
  /**
   * Footer padding
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'left', bordered = false, padding = 'md', className, children, ...props }, ref) => {
    const alignClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    };

    const paddingClasses = {
      none: '',
      sm: 'pt-2',
      md: 'pt-3',
      lg: 'pt-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          alignClasses[align],
          paddingClasses[padding],
          {
            'border-t border-border/20': bordered,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

/**
 * CardActions component
 */
export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Actions alignment
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Actions spacing
   */
  spacing?: 'sm' | 'md' | 'lg';
}

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ align = 'right', spacing = 'md', className, children, ...props }, ref) => {
    const alignClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    const spacingClasses = {
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-3',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          alignClasses[align],
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardActions.displayName = 'CardActions';
