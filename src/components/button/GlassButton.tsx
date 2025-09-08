'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef } from 'react';
import { OptimizedGlass, type OptimizedGlassProps } from '../../primitives/glass/OptimizedGlass';
import { Motion } from '../../primitives/motion/Motion';

export interface GlassButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * Button variant
   */
  variant?:
  | 'default'
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'error' // deprecated: use 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'gradient';
  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Glass elevation
   */
  elevation?: OptimizedGlassProps['elevation'];
  /**
   * Glass variant for advanced effects
   */
  glassVariant?: OptimizedGlassProps['variant'];
  /**
   * Glass intensity
   */
  intensity?: OptimizedGlassProps['intensity'];
  /**
   * Glass depth layers
   */
  depth?: OptimizedGlassProps['depth'];
  /**
   * Glass tint color
   */
  tint?: OptimizedGlassProps['tint'];
  /**
   * Glass border style
   */
  glassBorder?: OptimizedGlassProps['border'];
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Icon only button
   */
  iconOnly?: boolean;
  /**
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Animation preset
   */
  animation?: 'none' | 'scale' | 'bounce' | 'pulse';
  /**
   * Left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * Right icon
   */
  rightIcon?: React.ReactNode;
  /**
   * Loading spinner
   */
  loadingSpinner?: React.ReactNode;
  /**
   * Loading text to display
   */
  loadingText?: string;
  /**
   * Render the button as its child element (Slot pattern)
   */
  asChild?: boolean;
  /**
   * Flat style override for ghost/link — removes bg/border/shadow/rings
   */
  flat?: boolean;
}

/**
 * GlassButton component
 * A glassmorphism button with multiple variants and animations
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      variant = 'default',
      size = 'md',
      elevation = 2,
      glassVariant = 'frosted',
      intensity = 'medium',
      depth = 2,
      tint = 'neutral',
      glassBorder = 'subtle',
      loading = false,
      iconOnly = false,
      fullWidth = false,
      animation = 'none',
      leftIcon,
      rightIcon,
      loadingSpinner,
      loadingText = 'Loading...',
      className,
      children,
      disabled,
      asChild = false,
      flat = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: iconOnly ? 'h-6 w-6 p-0' : 'h-6 px-2 text-xs',
      sm: iconOnly ? 'h-8 w-8 p-0' : 'h-8 px-3 text-sm',
      md: iconOnly ? 'h-10 w-10 p-0' : 'h-10 px-4 text-sm',
      lg: iconOnly ? 'h-12 w-12 p-0' : 'h-12 px-6 text-base',
      xl: iconOnly ? 'h-14 w-14 p-0' : 'h-14 px-8 text-lg',
    };

    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium',
      'transition-all duration-300 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'relative overflow-hidden',
      // Size
      sizeClasses[size],
      // Full width
      {
        'w-full': fullWidth,
      }
    );

    const variantStyles = {
      default: {
        glassVariant: 'frosted' as const,
        tint: 'neutral' as const,
        intensity: 'medium' as const,
        glassBorder: 'subtle' as const,
        className: 'text-white hover:text-white/90 border-0',
      },
      primary: {
        glassVariant: 'liquid' as const,
        tint: 'blue' as const,
        intensity: 'strong' as const,
        glassBorder: 'glow' as const,
        lighting: 'volumetric' as const,
        caustics: true,
        className: 'text-white hover:text-white/90 border-0',
      },
      secondary: {
        glassVariant: 'crystal' as const,
        tint: 'purple' as const,
        intensity: 'strong' as const,
        glassBorder: 'glow' as const,
        lighting: 'directional' as const,
        refraction: true,
        className: 'text-white hover:text-white/90 border-0',
      },
      destructive: {
        glassVariant: 'frosted' as const,
        tint: 'red' as const,
        intensity: 'extreme' as const,
        glassBorder: 'neon' as const,
        lighting: 'directional' as const,
        chromatic: true,
        className: 'text-white hover:text-white/90 border-0',
      },
      error: {
        glassVariant: 'frosted' as const,
        tint: 'red' as const,
        intensity: 'extreme' as const,
        glassBorder: 'neon' as const,
        lighting: 'directional' as const,
        chromatic: true,
        className: 'text-white hover:text-white/90 border-0',
      },
      outline: {
        glassVariant: 'ethereal' as const,
        tint: 'neutral' as const,
        intensity: 'medium' as const,
        glassBorder: 'glow' as const,
        lighting: 'ambient' as const,
        adaptive: true,
        className: 'text-white hover:text-white/90',
      },
      ghost: {
        glassVariant: 'ethereal' as const,
        tint: 'neutral' as const,
        intensity: 'subtle' as const,
        glassBorder: 'none' as const,
        lighting: 'ambient' as const,
        adaptive: true,
        className: 'text-white/90 hover:text-white shadow-none',
      },
      link: {
        glassVariant: 'ethereal' as const,
        tint: 'blue' as const,
        intensity: 'subtle' as const,
        glassBorder: 'none' as const,
        className: 'text-blue-300 hover:text-blue-200 underline-offset-4 hover:underline',
      },
      gradient: {
        glassVariant: 'holographic' as const,
        tint: 'rainbow' as const,
        intensity: 'ultra' as const,
        glassBorder: 'dynamic' as const,
        lighting: 'iridescent' as const,
        chromatic: true,
        parallax: true,
        className: 'text-white hover:text-white/90 border-0',
      },
    };

    const variantConfig = variantStyles[variant];

    const getAnimationPreset = () => {
      switch (animation) {
        case 'scale':
          return 'scaleIn';
        case 'bounce':
          return 'bounceIn';
        case 'pulse':
          return 'pulseIn';
        default:
          return 'none';
      }
    };

    const renderContent = () => {
      if (loading) {
        return (
          <>
            {loadingSpinner || (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            )}
            {!iconOnly && <span className="ml-2">{loadingText}</span>}
          </>
        );
      }

      if (iconOnly) {
        return leftIcon || rightIcon || children;
      }

      return (
        <>
          {leftIcon && <span className="mr-2" data-icon>{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2" data-icon>{rightIcon}</span>}
        </>
      );
    };

    if (variant === 'ghost' || variant === 'link') {
      const Comp: any = asChild ? Slot : 'button';
      return (
        <Motion
          preset={getAnimationPreset()}
          animateOnHover={animation !== 'none'}
          className="inline-block"
        >
          <Comp
            ref={ref}
            className={cn(
              baseClasses,
              variantConfig.className,
              'rounded-md overflow-visible glass-magnet glass-ripple glass-press',
              flat && 'bg-transparent border-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
              className
            )}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            {...((() => {
              const {
                loadingText: _,
                asChild: __,
                leftIcon: ___,
                rightIcon: ____,
                loadingSpinner: _____,
                animation: ______,
                flat: _______,
                ...validProps
              } = props as any;
              return validProps;
            })())}
          >
            {renderContent()}
          </Comp>
        </Motion>
      );
    }

    return (
      <Motion
        preset={getAnimationPreset()}
        animateOnHover={animation !== 'none'}
        className="inline-block"
      >
        <OptimizedGlass as={asChild ? (Slot as any) : 'button'}
          ref={ref as any}
          variant={glassVariant || variantConfig.glassVariant}
          elevation={elevation}
          intensity={intensity || variantConfig.intensity}
          depth={depth}
          tint={tint || variantConfig.tint}
          border={glassBorder || variantConfig.glassBorder || 'subtle'}
          animation={animation === 'none' ? 'none' : animation === 'scale' ? 'float' : animation === 'bounce' ? 'pulse' : 'shimmer'}
          lighting={(variantConfig as any).lighting || 'ambient'}
          caustics={(variantConfig as any).caustics || false}
          chromatic={(variantConfig as any).chromatic || false}
          parallax={(variantConfig as any).parallax || false}
          refraction={(variantConfig as any).refraction || false}
          adaptive={(variantConfig as any).adaptive || false}
          interactive
          hoverSheen
          liftOnHover
          press
          magnet
          cursorHighlight={false}
          performanceMode="ultra"
          className={cn(
            baseClasses,
            variantConfig.className,
            'rounded-md glass-ripple glass-magnet',
            className
          )}
          disabled={disabled || loading}
          aria-busy={loading || undefined}
          {...((() => {
            const {
              loadingText: _,
              asChild: __,
              leftIcon: ___,
              rightIcon: ____,
              loadingSpinner: _____,
              animation: ______,
              ...validProps
            } = props as any;
            return validProps;
          })())}
        >
          {asChild ? (
            // When rendering asChild (Slot), Slot expects exactly one child element.
            // Defer content to the passed child to avoid React.Children.only errors.
            children as any
          ) : (
            <>
              {variant === 'gradient' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-md" />
              )}
              <span className="relative z-10">
                {renderContent()}
              </span>
            </>
          )}
        </OptimizedGlass>
      </Motion>
    );
  }
);

GlassButton.displayName = 'GlassButton';

/**
 * Icon Button component
 */
export interface IconButtonProps extends Omit<GlassButtonProps, 'iconOnly' | 'leftIcon' | 'rightIcon'> {
  /**
   * Icon to display
   */
  icon: React.ReactNode;
  /**
   * Accessible label
   */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ...props }, ref) => {
    return (
      <GlassButton
        ref={ref}
        iconOnly
        {...props}
      >
        {icon}
      </GlassButton>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * Button Group component
 */
export interface ButtonGroupProps {
  children: React.ReactNode;
  /**
   * Group orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Group size
   */
  size?: GlassButtonProps['size'];
  /**
   * Group variant
   */
  variant?: GlassButtonProps['variant'];
  /**
   * Whether buttons are connected
   */
  connected?: boolean;
  className?: string;
}

export function ButtonGroup({
  children,
  orientation = 'horizontal',
  size,
  variant,
  connected = true,
  className,
}: ButtonGroupProps) {
  const groupClasses = cn(
    'inline-flex',
    {
      'flex-row': orientation === 'horizontal',
      'flex-col': orientation === 'vertical',
    },
    className
  );

  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;

    const isFirst = index === 0;
    const isLast = index === React.Children.count(children) - 1;

    const additionalProps: any = {};

    if (size) additionalProps.size = size;
    if (variant) additionalProps.variant = variant;

    if (connected) {
      if (orientation === 'horizontal') {
        additionalProps.className = cn(
          (child as any).props.className,
          {
            'rounded-r-none border-r-0': !isLast,
            'rounded-l-none': !isFirst,
          }
        );
      } else {
        additionalProps.className = cn(
          (child as any).props.className,
          {
            'rounded-b-none border-b-0': !isLast,
            'rounded-t-none': !isFirst,
          }
        );
      }
    } else {
      additionalProps.className = cn(
        (child as any).props.className,
        orientation === 'horizontal' ? 'mr-2 last:mr-0' : 'mb-2 last:mb-0'
      );
    }

    return React.cloneElement(child, additionalProps);
  });

  return <div className={groupClasses}>{enhancedChildren}</div>;
}

/**
 * Toggle Button component
 */
export interface ToggleButtonProps extends Omit<GlassButtonProps, 'variant'> {
  /**
   * Whether the button is pressed/active
   */
  pressed?: boolean;
  /**
   * Callback when pressed state changes
   */
  onPressedChange?: (pressed: boolean) => void;
  /**
   * Pressed variant
   */
  pressedVariant?: GlassButtonProps['variant'];
  /**
   * Unpressed variant
   */
  unpressedVariant?: GlassButtonProps['variant'];
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      pressed = false,
      onPressedChange,
      pressedVariant = 'primary',
      unpressedVariant = 'outline',
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPressedChange?.(!pressed);
      onClick?.(event);
    };

    return (
      <GlassButton
        ref={ref}
        variant={pressed ? pressedVariant : unpressedVariant}
        onClick={handleClick}
        aria-pressed={pressed}
        {...props}
      />
    );
  }
);

ToggleButton.displayName = 'ToggleButton';

/**
 * Floating Action Button component
 */
export interface FloatingActionButtonProps extends Omit<GlassButtonProps, 'size' | 'iconOnly'> {
  /**
   * FAB size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * FAB position
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /**
   * Icon to display
   */
  icon: React.ReactNode;
  /**
   * Extended FAB with text
   */
  extended?: boolean;
  /**
   * Accessible label
   */
  'aria-label': string;
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  (
    {
      size = 'md',
      position = 'bottom-right',
      icon,
      extended = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const positionClasses = {
      'bottom-right': 'fixed bottom-6 right-6',
      'bottom-left': 'fixed bottom-6 left-6',
      'top-right': 'fixed top-6 right-6',
      'top-left': 'fixed top-6 left-6',
    };

    const sizeClasses = {
      sm: extended ? 'h-10 px-4' : 'h-10 w-10',
      md: extended ? 'h-12 px-6' : 'h-12 w-12',
      lg: extended ? 'h-14 px-8' : 'h-14 w-14',
    };

    return (
      <GlassButton
        ref={ref}
        variant="default"
        elevation={3}
        animation="bounce"
        iconOnly={!extended}
        leftIcon={extended ? icon : undefined}
        className={cn(
          'shadow-lg z-50',
          'rounded-full',
          positionClasses[position],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {extended ? children : icon}
      </GlassButton>
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';
