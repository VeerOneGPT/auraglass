'use client';

import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';
import { Motion } from '../../primitives/motion/Motion';
import { GlassButton } from '../button/GlassButton';
import { GlassBadge } from '../data-display/GlassBadge';
import { HStack } from '../layout/GlassStack';

export interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

export interface GlassBottomNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Navigation items
   */
  items: BottomNavItem[];
  /**
   * Current active item ID
   */
  activeId?: string;
  /**
   * Active item change handler
   */
  onActiveChange?: (id: string) => void;
  /**
   * Bottom nav variant
   */
  variant?: 'default' | 'floating' | 'minimal';
  /**
   * Glass elevation
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 'float' | 'modal';
  /**
   * Whether to show labels
   */
  showLabels?: boolean;
  /**
   * Label position
   */
  labelPosition?: 'below' | 'beside';
  /**
   * Navigation size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether navigation is sticky
   */
  sticky?: boolean;
  /**
   * Safe area padding for devices with home indicator
   */
  safeArea?: boolean;
  /**
   * Custom item renderer
   */
  renderItem?: (item: BottomNavItem, active: boolean) => React.ReactNode;
}

/**
 * GlassBottomNav component
 * Mobile bottom navigation with glassmorphism design
 */
export const GlassBottomNav = forwardRef<HTMLDivElement, GlassBottomNavProps>(
  (
    {
      items,
      activeId,
      onActiveChange,
      variant = 'default',
      elevation = 2,
      showLabels = true,
      labelPosition = 'below',
      size = 'md',
      sticky = true,
      safeArea = true,
      renderItem,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: {
        height: 'h-14',
        padding: 'px-2 py-2',
        iconSize: 'text-base',
        labelSize: 'text-xs',
      },
      md: {
        height: 'h-16',
        padding: 'px-4 py-3',
        iconSize: 'text-lg',
        labelSize: 'text-xs',
      },
      lg: {
        height: 'h-20',
        padding: 'px-6 py-4',
        iconSize: 'text-xl',
        labelSize: 'text-sm',
      },
    };

    const variantClasses = {
      default: 'border-t border-border/20',
      floating: 'mx-4 mb-4 rounded-xl border border-border/20',
      minimal: 'border-t border-border/10',
    };

    const config = sizeClasses[size];

    // Handle item click
    const handleItemClick = (item: BottomNavItem) => {
      if (item.disabled) return;

      onActiveChange?.(item.id);
      item.onClick?.();
    };

    // Render navigation item
    const renderNavigationItem = (item: BottomNavItem) => {
      if (renderItem) {
        const active = activeId === item.id;
        return renderItem(item, active);
      }

      const active = activeId === item.id;
      const iconToShow = active && item.activeIcon ? item.activeIcon : item.icon;

      return (
        <div key={item.id} className="relative flex-1">
          <GlassButton
            variant={active ? 'primary' : 'ghost'}
            size="sm"
            disabled={item.disabled}
            onClick={() => handleItemClick(item)}
            className={cn(
              'w-full h-full flex flex-col items-center justify-center gap-1 relative',
              labelPosition === 'beside' && 'flex-row gap-2',
              !showLabels && 'gap-0'
            )}
          >
            {/* Icon */}
            <div className={cn(
              'flex-shrink-0 transition-all duration-200',
              config.iconSize,
              active && 'scale-110'
            )}>
              {iconToShow}
            </div>

            {/* Label */}
            {showLabels && (
              <span className={cn(
                'font-medium transition-all duration-200 truncate',
                config.labelSize,
                active ? 'text-primary-foreground' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            )}

            {/* Active indicator */}
            {active && !showLabels && (
              <Motion
                preset="scaleIn"
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
              />
            )}
          </GlassButton>

          {/* Badge */}
          {item.badge && (
            <GlassBadge
              variant={item.badgeVariant || 'error'}
              size="xs"
              className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center"
            >
              {item.badge}
            </GlassBadge>
          )}
        </div>
      );
    };

    return (
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


        className={cn(
          'w-full flex items-center',
          config.height,
          config.padding,
          variantClasses[variant],
          sticky && 'sticky bottom-0',
          safeArea && 'pb-safe',
          className
        )}
        {...props}
      >
        <HStack space="none" className="w-full">
          {items.map(item => renderNavigationItem(item))}
        </HStack>
      </OptimizedGlass>
    );
  }
);

GlassBottomNav.displayName = 'GlassBottomNav';