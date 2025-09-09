'use client';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FocusTrap } from '../../primitives/focus/FocusTrap';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';
import { IconButton } from '../button/GlassButton';

export interface GlassModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal description
   */
  description?: string;
  /**
   * Modal size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /**
   * Modal variant
   */
  variant?: 'default' | 'centered' | 'drawer' | 'fullscreen';
  /**
   * Whether modal can be closed by clicking backdrop
   */
  closeOnBackdropClick?: boolean;
  /**
   * Whether modal can be closed by pressing escape
   */
  closeOnEscape?: boolean;
  /**
   * Custom close button
   */
  closeButton?: React.ReactNode;
  /**
   * Whether to show default close button
   */
  showCloseButton?: boolean;
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  /**
   * Modal children
   */
  children: React.ReactNode;
  /**
   * Custom backdrop
   */
  backdrop?: React.ReactNode;
  /**
   * Backdrop blur intensity
   */
  backdropBlur?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Animation preset
   */
  animation?: 'fade' | 'scale' | 'slide' | 'flip';
  /**
   * Whether to lock scroll when open
   */
  lockScroll?: boolean;
  /**
   * Z-index
   */
  zIndex?: number;
  className?: string;
}

/**
 * GlassModal component
 * A versatile modal with glassmorphism styling
 */
export const GlassModal = forwardRef<HTMLDivElement, GlassModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      size = 'md',
      variant = 'default',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      closeButton,
      showCloseButton = true,
      footer,
      children,
      backdrop,
      backdropBlur = 'md',
      animation = 'scale',
      lockScroll = true,
      zIndex = 50,
      className,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!mounted) return;

      if (open && lockScroll) {
        const scrollY = window.scrollY;
        const body = document.body;

        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';

        return () => {
          body.style.position = '';
          body.style.top = '';
          body.style.width = '';
          body.style.overflow = '';
          window.scrollTo(0, scrollY);
        };
      }
    }, [open, lockScroll, mounted]);

    const sizeClasses = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      full: 'max-w-full mx-4',
    };

    const variantClasses = {
      default: 'items-center justify-center p-4',
      centered: 'items-center justify-center p-4',
      drawer: 'items-end justify-center pb-0',
      fullscreen: 'items-center justify-center p-0',
    };

    const backdropBlurClasses = {
      none: '',
      sm: 'backdrop-blur-md',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-md',
    };

    const getAnimationPreset = () => {
      switch (animation) {
        case 'fade':
          return 'fadeIn';
        case 'scale':
          return 'scaleIn';
        case 'slide':
          return variant === 'drawer' ? 'slideUp' : 'slideDown';
        case 'flip':
          return 'scaleIn';
        default:
          return 'scaleIn';
      }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleEscapeKey = () => {
      if (closeOnEscape) {
        onClose();
      }
    };

    if (!mounted || !open) {
      return null;
    }

    return (
      <div
        className={cn(
          'fixed inset-0 flex',
          variantClasses[variant],
          backdropBlurClasses[backdropBlur]
        )}
        style={{ zIndex }}
      >
        {/* Backdrop */}
        {backdrop || (
          <Motion
            preset="fadeIn"
            className="absolute inset-0 bg-black/50"
            onClick={handleBackdropClick}
          />
        )}

        {/* Modal content */}
        <Motion
          preset={getAnimationPreset()}
          className={cn(
            'relative w-full',
            sizeClasses[size],
            variant === 'fullscreen' ? 'h-full' : 'max-h-full'
          )}
        >
          <FocusTrap
            active={open}
            onEscape={handleEscapeKey}
            lockScroll={false}
          >
            <OptimizedGlass
              variant="frosted"
              elevation={4}
              intensity="strong"
              depth={2}
              tint="neutral"
              border="subtle"
              animation="none"
              performanceMode="medium"
              ref={ref}


              className={cn(
                'w-full flex flex-col',
                variant === 'fullscreen' ? 'h-full' : 'max-h-full overflow-hidden',
                className
              )}
              {...props}
            >
              {/* Header */}
              {(title || description || showCloseButton) && (
                <div className="flex-shrink-0 p-6 border-b border-border/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {title && (
                        <h2 className="text-lg font-semibold text-foreground">
                          {title}
                        </h2>
                      )}
                      {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {description}
                        </p>
                      )}
                    </div>

                    {showCloseButton && (
                      <div className="flex-shrink-0 ml-4">
                        {closeButton || (
                          <IconButton
                            icon={
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            }
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            aria-label="Close modal"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Body */}
              <div
                ref={contentRef}
                className="flex-1 overflow-y-auto p-6"
              >
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="flex-shrink-0 p-6 border-t border-border/20">
                  {footer}
                </div>
              )}
            </OptimizedGlass>
          </FocusTrap>
        </Motion>
      </div>
    );
  }
);

GlassModal.displayName = 'GlassModal';

// Re-export dialog and drawer from their dedicated modules for compatibility
export { GlassDialog } from './GlassDialog';
export type { GlassDialogProps } from './GlassDialog';
export { GlassDrawer } from './GlassDrawer';
export type { GlassDrawerProps } from './GlassDrawer';

// (Note) Dialog and Drawer live in their dedicated files.
