import React, { useState, useRef, useEffect } from 'react';
import { OptimizedGlass } from '../../primitives';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface GlassTooltipProps {
  /** Content to show in the tooltip */
  content: React.ReactNode;
  /** Children element that triggers the tooltip */
  children: React.ReactNode;
  /** Position of the tooltip relative to trigger */
  position?: TooltipPosition;
  /** Delay before showing tooltip (ms) */
  showDelay?: number;
  /** Delay before hiding tooltip (ms) */
  hideDelay?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
  /** Custom className for tooltip */
  className?: string;
  /** Custom className for trigger */
  triggerClassName?: string;
  /** Maximum width of tooltip */
  maxWidth?: string;
  /** Whether to show arrow pointer */
  showArrow?: boolean;
  /** Animation variant */
  variant?: 'fade' | 'scale' | 'slide';
}

const tooltipKeyframes = `
  @keyframes tooltip-fade {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes tooltip-scale {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes tooltip-slide-up {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes tooltip-slide-down {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes tooltip-slide-left {
    from { opacity: 0; transform: translateX(8px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes tooltip-slide-right {
    from { opacity: 0; transform: translateX(-8px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;

export const GlassTooltip: React.FC<GlassTooltipProps> = ({
  content,
  children,
  position = 'top',
  showDelay = 300,
  hideDelay = 150,
  disabled = false,
  className = '',
  triggerClassName = '',
  maxWidth = '200px',
  showArrow = true,
  variant = 'fade',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState<TooltipPosition>(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout>();
  const hideTimeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return position;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if tooltip fits in preferred position
    const fitsTop = triggerRect.top > tooltipRect.height + 8;
    const fitsBottom = triggerRect.bottom + tooltipRect.height + 8 < viewportHeight;
    const fitsLeft = triggerRect.left > tooltipRect.width + 8;
    const fitsRight = triggerRect.right + tooltipRect.width + 8 < viewportWidth;

    // Auto-positioning logic
    if (position === 'auto') {
      if (fitsTop) return 'top';
      if (fitsBottom) return 'bottom';
      if (fitsRight) return 'right';
      if (fitsLeft) return 'left';
      return 'top'; // fallback
    }

    return position;
  };

  const handleMouseEnter = () => {
    if (disabled) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    showTimeoutRef.current = setTimeout(() => {
      setActualPosition(calculatePosition());
      setIsVisible(true);
    }, showDelay);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const getTooltipStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
      maxWidth,
      pointerEvents: 'none',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      transition: 'opacity 0.2s ease, visibility 0.2s ease',
    };

    if (!isVisible) return baseStyles;

    const animationName = getAnimationName();
    return {
      ...baseStyles,
      animation: `${animationName} 0.2s ease`,
    };
  };

  const getAnimationName = () => {
    switch (variant) {
      case 'scale':
        return 'tooltip-scale';
      case 'slide':
        return getSlideAnimation();
      case 'fade':
      default:
        return 'tooltip-fade';
    }
  };

  const getSlideAnimation = () => {
    switch (actualPosition) {
      case 'top':
        return 'tooltip-slide-up';
      case 'bottom':
        return 'tooltip-slide-down';
      case 'left':
        return 'tooltip-slide-left';
      case 'right':
        return 'tooltip-slide-right';
      default:
        return 'tooltip-fade';
    }
  };

  const getPositionStyles = (): React.CSSProperties => {
    if (!triggerRef.current || !tooltipRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    switch (actualPosition) {
      case 'top':
        return {
          top: triggerRect.top - tooltipRect.height - 8,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        };
      case 'bottom':
        return {
          top: triggerRect.bottom + 8,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        };
      case 'left':
        return {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.left - tooltipRect.width - 8,
        };
      case 'right':
        return {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.right + 8,
        };
      default:
        return {};
    }
  };

  const getArrowStyles = (): React.CSSProperties => {
    switch (actualPosition) {
      case 'top':
        return { bottom: '-4px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom':
        return { top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(180deg)' };
      case 'left':
        return { right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(90deg)' };
      case 'right':
        return { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)' };
      default:
        return {};
    }
  };

  return (
    <>
      <style>{tooltipKeyframes}</style>

      <div
        ref={triggerRef}
        className={`inline-block ${triggerClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      <div
        ref={tooltipRef}
        style={{
          ...getTooltipStyles(),
          ...getPositionStyles(),
        }}
        className={`absolute ${className}`}
      >
        <OptimizedGlass
          className="px-3 py-2 rounded-lg text-sm text-white shadow-lg"
          blur="medium"
          elevation={2}
        >
          {content}

          {showArrow && (
            <div
              className="absolute w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white/20"
              style={getArrowStyles()}
            />
          )}
        </OptimizedGlass>
      </div>
    </>
  );
};

// Compound component for tooltip with trigger
export const GlassTooltipTrigger: React.FC<{
  asChild?: boolean;
  children: React.ReactNode;
}> = ({ asChild, children }) => {
  return <>{children}</>;
};

export const GlassTooltipContent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};
