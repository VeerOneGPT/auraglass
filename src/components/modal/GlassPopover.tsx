'use client';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { FocusTrap } from '../../primitives/focus/FocusTrap';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';

export type PopoverPlacement =
  | 'top' | 'top-start' | 'top-end'
  | 'right' | 'right-start' | 'right-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end';

export interface GlassPopoverProps {
  /**
   * Whether the popover is open
   */
  open?: boolean;
  /**
   * Callback when popover should close
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Initial open state when uncontrolled
   */
  defaultOpen?: boolean;
  /**
   * Popover content
   */
  content: React.ReactNode;
  /**
   * Trigger element
   */
  children: React.ReactElement;
  /**
   * Popover placement
   */
  placement?: PopoverPlacement;
  /**
   * Trigger type
   */
  trigger?: 'click' | 'hover' | 'focus' | 'manual';
  /**
   * Delay before showing (for hover trigger)
   */
  showDelay?: number;
  /**
   * Delay before hiding (for hover trigger)
   */
  hideDelay?: number;
  /**
   * Whether to show arrow
   */
  showArrow?: boolean;
  /**
   * Offset from trigger
   */
  offset?: number;
  /**
   * Whether to close on click outside
   */
  closeOnClickOutside?: boolean;
  /**
   * Whether to close on escape key
   */
  closeOnEscape?: boolean;
  /**
   * Animation preset
   */
  animation?: 'fade' | 'scale' | 'slide';
  /**
   * Z-index
   */
  zIndex?: number;
  /**
   * Appearance of the surface
   * glass: translucent glass effect (default)
   * solid: opaque panel (no bleed-through)
   */
  appearance?: 'glass' | 'solid';
  /**
   * Whether to apply radial reveal mask on open
   * Tooltips often should not be masked; defaults to true for popovers
   */
  radialReveal?: boolean;
  /**
   * Custom class for popover content
   */
  contentClassName?: string;
  /**
   * Popover title
   */
  title?: string;
  /**
   * Popover description
   */
  description?: string;
}

/**
 * GlassPopover component
 * A floating popover with glassmorphism styling
 */
export const GlassPopover = forwardRef<HTMLDivElement, GlassPopoverProps>(
  (
    {
      open,
      onOpenChange,
      defaultOpen = false,
      content,
      children,
      placement = 'bottom',
      trigger: triggerType = 'click',
      showDelay = 200,
      hideDelay = 200,
      showArrow = true,
      offset = 8,
      closeOnClickOutside = true,
      closeOnEscape = true,
      animation = 'scale',
      zIndex = 9999,
      contentClassName,
      appearance = 'glass',
      radialReveal = true,
      title,
      description,
      ...props
    },
    ref
  ) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [actualPlacement, setActualPlacement] = useState<PopoverPlacement>(placement);
    const triggerRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const showTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const hideTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Support controlled and uncontrolled usage
    const isControlled = typeof open === 'boolean';
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isOpen = isControlled ? (open as boolean) : internalOpen;
    const setOpen = useCallback((value: boolean) => {
      if (typeof onOpenChange === 'function') {
        onOpenChange(value);
      } else {
        setInternalOpen(value);
      }
    }, [onOpenChange]);

    // Calculate position
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !popoverRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      let newPlacement = placement;
      let top = 0;
      let left = 0;

      // Calculate initial position based on placement
      switch (placement) {
        case 'top':
          top = triggerRect.top - popoverRect.height - offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'top-start':
          top = triggerRect.top - popoverRect.height - offset;
          left = triggerRect.left;
          break;
        case 'top-end':
          top = triggerRect.top - popoverRect.height - offset;
          left = triggerRect.right - popoverRect.width;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.right + offset;
          break;
        case 'right-start':
          top = triggerRect.top;
          left = triggerRect.right + offset;
          break;
        case 'right-end':
          top = triggerRect.bottom - popoverRect.height;
          left = triggerRect.right + offset;
          break;
        case 'bottom':
          top = triggerRect.bottom + offset;
          left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
          break;
        case 'bottom-start':
          top = triggerRect.bottom + offset;
          left = triggerRect.left;
          break;
        case 'bottom-end':
          top = triggerRect.bottom + offset;
          left = triggerRect.right - popoverRect.width;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
          left = triggerRect.left - popoverRect.width - offset;
          break;
        case 'left-start':
          top = triggerRect.top;
          left = triggerRect.left - popoverRect.width - offset;
          break;
        case 'left-end':
          top = triggerRect.bottom - popoverRect.height;
          left = triggerRect.left - popoverRect.width - offset;
          break;
      }

      // Flip if out of bounds
      if (top < 0 && placement.startsWith('top')) {
        newPlacement = placement.replace('top', 'bottom') as PopoverPlacement;
        top = triggerRect.bottom + offset;
      } else if (top + popoverRect.height > viewport.height && placement.startsWith('bottom')) {
        newPlacement = placement.replace('bottom', 'top') as PopoverPlacement;
        top = triggerRect.top - popoverRect.height - offset;
      }

      if (left < 0 && placement.startsWith('left')) {
        newPlacement = placement.replace('left', 'right') as PopoverPlacement;
        left = triggerRect.right + offset;
      } else if (left + popoverRect.width > viewport.width && placement.startsWith('right')) {
        newPlacement = placement.replace('right', 'left') as PopoverPlacement;
        left = triggerRect.left - popoverRect.width - offset;
      }

      // Adjust for viewport boundaries
      if (left < 0) left = 8;
      if (left + popoverRect.width > viewport.width) {
        left = viewport.width - popoverRect.width - 8;
      }
      if (top < 0) top = 8;
      if (top + popoverRect.height > viewport.height) {
        top = viewport.height - popoverRect.height - 8;
      }

      setPosition({ top, left });
      setActualPlacement(newPlacement);
    }, [placement, offset]);

    // Handle trigger interactions
    const handleShow = useCallback(() => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = undefined;
      }

      if (triggerType === 'hover') {
        showTimeoutRef.current = setTimeout(() => {
          setOpen(true);
        }, showDelay);
      } else {
        setOpen(true);
      }
    }, [triggerType, showDelay, setOpen]);

    const handleHide = useCallback(() => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = undefined;
      }

      if (triggerType === 'hover') {
        hideTimeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, hideDelay);
      } else {
        setOpen(false);
      }
    }, [triggerType, hideDelay, setOpen]);

    const handleClick = useCallback(() => {
      if (triggerType === 'click') {
        setOpen(!isOpen);
      }
    }, [triggerType, isOpen, setOpen]);

    // Update position when open
    useEffect(() => {
      if (isOpen) {
        calculatePosition();

        const handleResize = () => calculatePosition();
        const handleScroll = () => calculatePosition();

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);

        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('scroll', handleScroll, true);
        };
      }
    }, [isOpen, calculatePosition]);

    // Handle click outside
    useEffect(() => {
      if (!isOpen || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          triggerRef.current?.contains(target) ||
          popoverRef.current?.contains(target)
        ) {
          return;
        }
        setOpen(false);
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeOnClickOutside, setOpen]);

    // Get arrow position
    const getArrowClasses = () => {
      const base = 'absolute w-2 h-2 bg-background border border-border/20 rotate-45';

      switch (actualPlacement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          return `${base} -bottom-1 border-t-0 border-l-0`;
        case 'right':
        case 'right-start':
        case 'right-end':
          return `${base} -left-1 border-r-0 border-b-0`;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          return `${base} -top-1 border-b-0 border-r-0`;
        case 'left':
        case 'left-start':
        case 'left-end':
          return `${base} -right-1 border-l-0 border-t-0`;
        default:
          return base;
      }
    };

    const getArrowPosition = () => {
      switch (actualPlacement) {
        case 'top':
        case 'bottom':
          return { left: '50%', transform: 'translateX(-50%)' };
        case 'top-start':
        case 'bottom-start':
          return { left: '12px' };
        case 'top-end':
        case 'bottom-end':
          return { right: '12px' };
        case 'left':
        case 'right':
          return { top: '50%', transform: 'translateY(-50%)' };
        case 'left-start':
        case 'right-start':
          return { top: '12px' };
        case 'left-end':
        case 'right-end':
          return { bottom: '12px' };
        default:
          return {};
      }
    };

    const getAnimationPreset = () => {
      switch (animation) {
        case 'fade':
          return 'fadeIn';
        case 'scale':
          return 'scaleIn';
        case 'slide':
          if (actualPlacement.startsWith('top')) return 'slideUp';
          if (actualPlacement.startsWith('bottom')) return 'slideDown';
          if (actualPlacement.startsWith('left')) return 'slideLeft';
          if (actualPlacement.startsWith('right')) return 'slideRight';
          return 'slideDown';
        default:
          return 'scaleIn';
      }
    };

    // Clone trigger with event handlers
    const triggerElement = React.cloneElement(children as any, {
      ref: triggerRef,
      onClick: (e: MouseEvent) => {
        (children as any).props?.onClick?.(e);
        handleClick();
      },
      onMouseEnter: (e: MouseEvent) => {
        (children as any).props?.onMouseEnter?.(e);
        if (triggerType === 'hover') handleShow();
      },
      onMouseLeave: (e: MouseEvent) => {
        (children as any).props?.onMouseLeave?.(e);
        if (triggerType === 'hover') handleHide();
      },
      onFocus: (e: FocusEvent) => {
        (children as any).props?.onFocus?.(e);
        if (triggerType === 'focus') handleShow();
      },
      onBlur: (e: FocusEvent) => {
        (children as any).props?.onBlur?.(e);
        if (triggerType === 'focus') handleHide();
      },
    });

    return (
      <>
        {triggerElement}

        {isOpen && (
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex }}>
            <Motion
              preset={getAnimationPreset()}
              className="pointer-events-auto"
              style={{ position: 'absolute', top: position.top, left: position.left }}
            >
              {appearance === 'glass' ? (
                <OptimizedGlass
                  variant="frosted"
                  elevation={4}
                  intensity="strong"
                  depth={2}
                  tint="neutral"
                  border="subtle"
                  animation="none"
                  performanceMode="medium"
                  ref={popoverRef}
                  className={cn(
                    'relative max-w-xs glass-lift glass-sheen',
                    radialReveal && 'glass-radial-reveal',
                    'bg-background/95 backdrop-blur-xl',
                    'border border-border/20 shadow-lg',
                    contentClassName
                  )}
                  onMouseEnter={triggerType === 'hover' ? handleShow : undefined}
                  onMouseLeave={triggerType === 'hover' ? handleHide : undefined}
                  {...props}
                >
                  <FocusTrap
                    active={isOpen && (triggerType === 'focus' || triggerType === 'click')}
                    onEscape={closeOnEscape ? () => setOpen(false) : undefined}
                  >
                    <div className="p-3">
                      {title && <h3 className="font-medium text-foreground mb-1">{title}</h3>}
                      {description && (
                        <p className="text-sm text-muted-foreground mb-2">{description}</p>
                      )}
                      {content}
                    </div>
                  </FocusTrap>
                  {showArrow && (
                    <div className={getArrowClasses()} style={getArrowPosition()} />
                  )}
                </OptimizedGlass>
              ) : (
                <div
                  ref={popoverRef}
                  className={cn(
                    'relative max-w-xs rounded-xl bg-background text-foreground',
                    'border border-border/30 shadow-2xl',
                    contentClassName
                  )}
                  onMouseEnter={triggerType === 'hover' ? handleShow : undefined}
                  onMouseLeave={triggerType === 'hover' ? handleHide : undefined}
                >
                  <FocusTrap
                    active={isOpen && (triggerType === 'focus' || triggerType === 'click')}
                    onEscape={closeOnEscape ? () => setOpen(false) : undefined}
                  >
                    <div className="p-3">
                      {title && <h3 className="font-medium mb-1">{title}</h3>}
                      {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
                      {content}
                    </div>
                  </FocusTrap>
                </div>
              )}
            </Motion>
          </div>
        )}
      </>
    );
  }
);

GlassPopover.displayName = 'GlassPopover';

/**
 * Tooltip component (Simple popover for hover)
 */
export interface GlassTooltipProps extends Omit<GlassPopoverProps, 'trigger' | 'content' | 'title' | 'description' | 'open' | 'onOpenChange'> {
  /**
   * Tooltip text
   */
  content: string;
  /**
   * Whether tooltip is disabled
   */
  disabled?: boolean;
}

export const GlassTooltip = forwardRef<HTMLDivElement, GlassTooltipProps>(
  (
    {
      content,
      disabled = false,
      ...props
    },
    ref
  ) => {
    if (disabled) {
      return props.children;
    }

    const [open, setOpen] = React.useState(false)

    return (
      <GlassPopover
        ref={ref}
        open={open}
        onOpenChange={setOpen}
        trigger="hover"
        showDelay={500}
        hideDelay={0}
        placement="top"
        radialReveal={false}
        content={
          <span className="text-sm text-foreground">
            {content}
          </span>
        }
        contentClassName="px-2 py-1"
        {...props}
      />
    );
  }
);

GlassTooltip.displayName = 'GlassTooltip';
