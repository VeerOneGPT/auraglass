'use client';

import { GlassButton } from '../button/GlassButton';

import { cn } from '@/design-system/utilsCore';
import { X } from 'lucide-react';
import React, { forwardRef, useEffect, useState } from 'react';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';

export interface GlassDrawerProps {
  /**
   * Whether the drawer is open
   */
  open?: boolean;
  /**
   * Callback when drawer open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Drawer position
   */
  position?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Drawer size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Drawer title
   */
  title?: React.ReactNode;
  /**
   * Drawer description
   */
  description?: React.ReactNode;
  /**
   * Drawer content
   */
  children?: React.ReactNode;
  /**
   * Whether to close on backdrop click
   */
  closeOnBackdropClick?: boolean;
  /**
   * Whether to close on escape key
   */
  closeOnEscape?: boolean;
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether drawer is modal (blocks interaction with background)
   */
  modal?: boolean;
  /**
   * Custom backdrop blur
   */
  backdropBlur?: boolean;
  /**
   * Drawer elevation
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 'float' | 'modal';
  /**
   * Custom z-index
   */
  zIndex?: number;
  /**
   * Whether to show overlay
   */
  showOverlay?: boolean;
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
  /**
   * Whether drawer can be resized
   */
  resizable?: boolean;
  className?: string;
}

/**
 * GlassDrawer component
 * Slide-out panel with glassmorphism styling and comprehensive functionality
 */
export const GlassDrawer = forwardRef<HTMLDivElement, GlassDrawerProps>(
  (
    {
      open = false,
      onOpenChange,
      position = 'right',
      size = 'md',
      title,
      description,
      children,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      header,
      footer,
      modal = true,
      backdropBlur = true,
      elevation = 'modal',
      zIndex = 50,
      showOverlay = true,
      animationDuration = 300,
      resizable = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(open);

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape || !open) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange?.(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, open, onOpenChange]);

    // Handle body scroll lock
    useEffect(() => {
      if (modal && open) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = '';
        };
      }
    }, [modal, open]);

    // Handle visibility state
    useEffect(() => {
      if (open) {
        setIsVisible(true);
      } else {
        // Delay hiding to allow exit animation
        const timer = setTimeout(() => setIsVisible(false), animationDuration);
        return () => clearTimeout(timer);
      }
    }, [open, animationDuration]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onOpenChange?.(false);
      }
    };

    // Handle close
    const handleClose = () => {
      onOpenChange?.(false);
    };

    // Size classes based on position
    const getSizeClasses = () => {
      const isVertical = position === 'top' || position === 'bottom';

      if (isVertical) {
        // Height for top/bottom drawers
        switch (size) {
          case 'xs': return 'h-32';
          case 'sm': return 'h-48';
          case 'md': return 'h-64';
          case 'lg': return 'h-80';
          case 'xl': return 'h-96';
          case 'full': return 'h-full';
          default: return 'h-64';
        }
      } else {
        // Width for left/right drawers
        switch (size) {
          case 'xs': return 'w-64';
          case 'sm': return 'w-80';
          case 'md': return 'w-96';
          case 'lg': return 'w-[28rem]';
          case 'xl': return 'w-[32rem]';
          case 'full': return 'w-full';
          default: return 'w-96';
        }
      }
    };

    // Position classes
    const getPositionClasses = () => {
      switch (position) {
        case 'top':
          return 'top-0 left-0 right-0';
        case 'right':
          return 'top-0 right-0 bottom-0';
        case 'bottom':
          return 'bottom-0 left-0 right-0';
        case 'left':
          return 'top-0 left-0 bottom-0';
        default:
          return 'top-0 right-0 bottom-0';
      }
    };

    // Animation direction based on position
    const getAnimationPreset = () => {
      switch (position) {
        case 'top':
          return 'slideDown';
        case 'right':
          return 'slideLeft';
        case 'bottom':
          return 'slideUp';
        case 'left':
          return 'slideRight';
        default:
          return 'slideLeft';
      }
    };

    // Border radius based on position
    const getBorderRadius = () => {
      switch (position) {
        case 'top':
          return 'rounded-b-xl';
        case 'right':
          return 'rounded-l-xl';
        case 'bottom':
          return 'rounded-t-xl';
        case 'left':
          return 'rounded-r-xl';
        default:
          return 'rounded-l-xl';
      }
    };

    if (!isVisible) return null;

    return (
      <div
        className={cn(
          'fixed inset-0',
          `z-${zIndex}`
        )}
        role="dialog"
        aria-modal={modal}
        aria-labelledby={title ? 'drawer-title' : undefined}
        aria-describedby={description ? 'drawer-description' : undefined}
      >
        {/* Backdrop/Overlay */}
        {showOverlay && (
          <Motion
            preset="fadeIn"
            duration={animationDuration}
            className={cn(
              'absolute inset-0 bg-black/20 cursor-pointer',
              backdropBlur && 'backdrop-blur-sm'
            )}
            onClick={handleBackdropClick}
          />
        )}

        {/* Drawer Content */}
        <Motion
          preset={getAnimationPreset()}
          duration={animationDuration}
          className={cn(
            'absolute flex flex-col',
            getPositionClasses(),
            getSizeClasses()
          )}
        >
          <OptimizedGlass
            variant="frosted"
            elevation={2}
            intensity="medium"
            depth={2}
            tint="neutral"
            border="subtle"
            animation="none"
            performanceMode="medium"
            ref={ref}
            liftOnHover
            hoverSheen
            className={cn(
              'h-full flex flex-col border border-border/20 glass-radial-reveal',
              getBorderRadius(),
              resizable && 'resize overflow-auto',
              className
            )}
            {...props}
          >
            {/* Header */}
            {(header || title || description || showCloseButton) && (
              <div className="flex items-start justify-between p-6 border-b border-border/10 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  {header || (
                    <>
                      {title && (
                        <h2
                          id="drawer-title"
                          className="text-lg font-semibold text-foreground mb-1"
                        >
                          {title}
                        </h2>
                      )}
                      {description && (
                        <p
                          id="drawer-description"
                          className="text-sm text-muted-foreground"
                        >
                          {description}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {showCloseButton && (
                  <GlassButton
                    type="button"
                    className="ml-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-colors"
                    onClick={handleClose}
                    aria-label="Close drawer"
                  >
                    <X className="w-4 h-4" />
                  </GlassButton>
                )}
              </div>
            )}

            {/* Content */}
            {children && (
              <div className="flex-1 overflow-y-auto p-6">
                {children}
              </div>
            )}

            {/* Footer */}
            {footer && (
              <div className="p-6 border-t border-border/10 flex-shrink-0">
                {footer}
              </div>
            )}
          </OptimizedGlass>
        </Motion>
      </div>
    );
  }
);

GlassDrawer.displayName = 'GlassDrawer';

// Compound components for easier usage
export interface DrawerTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DrawerTrigger = forwardRef<HTMLButtonElement, DrawerTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(children as any, {
        ref,
        ...props,
      });
    }

    return (
      <GlassButton ref={ref} {...props}>
        {children}
      </GlassButton>
    );
  }
);

DrawerTrigger.displayName = 'DrawerTrigger';

export interface DrawerContentProps extends GlassDrawerProps { }

export const DrawerContent = GlassDrawer;

export interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

export interface DrawerTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

DrawerTitle.displayName = 'DrawerTitle';

export interface DrawerDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

DrawerDescription.displayName = 'DrawerDescription';

export interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';

// Hook for drawer state management
export const useDrawer = (defaultOpen = false) => {
  const [open, setOpen] = useState(defaultOpen);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleDrawer = () => setOpen(prev => !prev);

  return {
    open,
    setOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};

// Types are already exported via interface declarations above
