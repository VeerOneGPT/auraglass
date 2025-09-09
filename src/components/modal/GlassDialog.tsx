'use client';

import { cn } from '@/design-system/utilsCore';
import { X } from 'lucide-react';
import React, { forwardRef, useEffect, useState } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';
import { GlassButton } from '../button/GlassButton';

export interface GlassDialogProps {
  /**
   * Whether the dialog is open
   */
  open?: boolean;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /** Optional close callback for compatibility */
  onClose?: () => void;
  /**
   * Dialog title
   */
  title?: React.ReactNode;
  /**
   * Dialog description
   */
  description?: React.ReactNode;
  /**
   * Dialog content
   */
  children?: React.ReactNode;
  /**
   * Dialog size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /**
   * Dialog variant
   */
  variant?: 'default' | 'centered' | 'fullscreen';
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
   * Animation preset
   */
  animation?: 'fade' | 'scale' | 'slide' | 'flip';
  /**
   * Dialog footer content
   */
  footer?: React.ReactNode;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Whether dialog is modal (blocks interaction with background)
   */
  modal?: boolean;
  /**
   * Custom backdrop blur
   */
  backdropBlur?: boolean;
  /**
   * Dialog elevation
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 'float' | 'modal';
  /**
   * Custom z-index
   */
  zIndex?: number;
  className?: string;
}

/**
 * GlassDialog component
 * Modal dialog with glassmorphism styling and comprehensive functionality
 */
export const GlassDialog = forwardRef<HTMLDivElement, GlassDialogProps>(
  (
    {
      open = false,
      onOpenChange,
      title,
      description,
      children,
      size = 'md',
      variant = 'default',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      animation = 'scale',
      footer,
      header,
      modal = true,
      backdropBlur = true,
      elevation = 'modal',
      zIndex = 50,
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
        const timer = setTimeout(() => setIsVisible(false), 200);
        return () => clearTimeout(timer);
      }
    }, [open]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onOpenChange?.(false);
        (props as any).onClose?.();
      }
    };

    // Handle close
    const handleClose = () => {
      onOpenChange?.(false);
      (props as any).onClose?.();
    };

    // Size classes
    const sizeClasses = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full mx-4',
    };

    // Animation presets
    const getAnimationPreset = () => {
      switch (animation) {
        case 'fade':
          return 'fadeIn';
        case 'scale':
          return 'scaleIn';
        case 'slide':
          return 'slideUp';
        case 'flip':
          return 'rotateIn';
        default:
          return 'scaleIn';
      }
    };

    if (!isVisible) return null;

    return (
      <div
        className={cn(
          'fixed inset-0 flex items-center justify-center',
          variant === 'fullscreen' ? 'p-0' : 'p-4',
          `z-${zIndex}`
        )}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal={modal}
        aria-labelledby={title ? 'dialog-title' : undefined}
        aria-describedby={description ? 'dialog-description' : undefined}
      >
        {/* Backdrop */}
        <Motion
          preset="fadeIn"
          duration={200}
          className={cn(
            'absolute inset-0 bg-black/20',
            backdropBlur && 'backdrop-blur-md'
          )}
        />

        {/* Dialog Content */}
        <Motion
          preset={getAnimationPreset()}
          duration={200}
          className={cn(
            'relative w-full',
            variant === 'fullscreen' ? 'h-full' : 'max-h-[90vh]',
            sizeClasses[size]
          )}
        >
          <OptimizedGlass
            intent="neutral"
            elevation="level2"
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
              'w-full overflow-hidden border border-border/20 glass-radial-reveal',
              variant === 'fullscreen' && 'h-full rounded-none',
              className
            )}
            {...props}
          >
            {/* Header */}
            {(header || title || description || showCloseButton) && (
              <div className="flex items-start justify-between p-6 border-b border-border/10">
                <div className="flex-1 min-w-0">
                  {header || (
                    <>
                      {title && (
                        <h2
                          id="dialog-title"
                          className="text-lg font-semibold text-foreground mb-1"
                        >
                          {title}
                        </h2>
                      )}
                      {description && (
                        <p
                          id="dialog-description"
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
                    aria-label="Close dialog"
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
              <div className="p-6 border-t border-border/10">
                {footer}
              </div>
            )}
          </OptimizedGlass>
        </Motion>
      </div>
    );
  }
);

GlassDialog.displayName = 'GlassDialog';

// Compound components for easier usage
export interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
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

DialogTrigger.displayName = 'DialogTrigger';

export interface DialogContentProps extends GlassDialogProps { }

export const DialogContent = GlassDialog;

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
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

DialogTitle.displayName = 'DialogTitle';

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
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

DialogDescription.displayName = 'DialogDescription';

export interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
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

DialogFooter.displayName = 'DialogFooter';

// Hook for dialog state management
export const useDialog = (defaultOpen = false) => {
  const [open, setOpen] = useState(defaultOpen);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const toggleDialog = () => setOpen(prev => !prev);

  return {
    open,
    setOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
};

// Types are already exported via interface declarations above
