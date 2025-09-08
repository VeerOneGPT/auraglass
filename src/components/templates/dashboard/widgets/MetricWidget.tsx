'use client';

import React, { forwardRef } from 'react';
import { Glass } from '../../../primitives/glass/Glass';
import { Motion } from '../../../primitives/motion/Motion';
import { GlassBadge } from '../../../components/data-display/GlassBadge';
import { VStack, HStack } from '../../../components/layout/GlassStack';
import { cn } from '@/lib/utils';

export interface MetricData {
  value: string | number;
  label: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  target?: number;
  unit?: string;
  description?: string;
}

export interface MetricWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Metric data
   */
  data: MetricData;
  /**
   * Widget variant
   */
  variant?: 'default' | 'minimal' | 'featured' | 'compact';
  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Color scheme
   */
  colorScheme?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
  /**
   * Whether to show trend indicator
   */
  showTrend?: boolean;
  /**
   * Whether to show target progress
   */
  showTarget?: boolean;
  /**
   * Custom trend icons
   */
  trendIcons?: {
    up: React.ReactNode;
    down: React.ReactNode;
    neutral: React.ReactNode;
  };
}

/**
 * MetricWidget component
 * Display key metrics with trends and targets
 */
export const MetricWidget = forwardRef<HTMLDivElement, MetricWidgetProps>(
  (
    {
      data,
      variant = 'default',
      size = 'md',
      colorScheme = 'default',
      showTrend = true,
      showTarget = false,
      trendIcons,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: {
        value: 'text-lg',
        label: 'text-xs',
        icon: 'text-lg',
        padding: 'p-3',
      },
      md: {
        value: 'text-2xl',
        label: 'text-sm',
        icon: 'text-xl',
        padding: 'p-4',
      },
      lg: {
        value: 'text-3xl',
        label: 'text-base',
        icon: 'text-2xl',
        padding: 'p-6',
      },
    };

    const colorSchemes = {
      default: {
        value: 'text-foreground',
        change: {
          up: 'text-success',
          down: 'text-destructive',
          neutral: 'text-muted-foreground',
        },
        icon: 'text-muted-foreground',
        background: '',
      },
      primary: {
        value: 'text-primary',
        change: {
          up: 'text-success',
          down: 'text-destructive', 
          neutral: 'text-muted-foreground',
        },
        icon: 'text-primary/70',
        background: 'bg-primary/5',
      },
      success: {
        value: 'text-success',
        change: {
          up: 'text-success',
          down: 'text-destructive',
          neutral: 'text-muted-foreground',
        },
        icon: 'text-success/70',
        background: 'bg-success/5',
      },
      warning: {
        value: 'text-warning',
        change: {
          up: 'text-success',
          down: 'text-destructive',
          neutral: 'text-muted-foreground',
        },
        icon: 'text-warning/70',
        background: 'bg-warning/5',
      },
      destructive: {
        value: 'text-destructive',
        change: {
          up: 'text-success',
          down: 'text-destructive',
          neutral: 'text-muted-foreground',
        },
        icon: 'text-destructive/70',
        background: 'bg-destructive/5',
      },
    };

    const config = sizeClasses[size];
    const colors = colorSchemes[colorScheme];

    const defaultTrendIcons = {
      up: '↗️',
      down: '↘️',
      neutral: '→',
    };

    const icons = trendIcons || defaultTrendIcons;

    const formatValue = (value: string | number) => {
      if (typeof value === 'number') {
        return new Intl.NumberFormat().format(value);
      }
      return value;
    };

    const getTrendIcon = () => {
      if (!data.trend) return null;
      return icons[data.trend];
    };

    const getChangeColor = () => {
      if (!data.change) return colors.change.neutral;
      
      if (data.change > 0) return colors.change.up;
      if (data.change < 0) return colors.change.down;
      return colors.change.neutral;
    };

    const getTargetProgress = () => {
      if (!data.target || typeof data.value !== 'number') return 0;
      return Math.min((data.value / data.target) * 100, 100);
    };

    const renderContent = () => {
      switch (variant) {
        case 'minimal':
          return (
            <HStack space="sm" align="center">
              {data.icon && (
                <div className={cn(config.icon, colors.icon)}>
                  {data.icon}
                </div>
              )}
              <VStack space="none">
                <div className={cn('font-bold', config.value, colors.value)}>
                  {formatValue(data.value)}{data.unit}
                </div>
                <div className={cn('text-muted-foreground', config.label)}>
                  {data.label}
                </div>
              </VStack>
              {showTrend && data.change && (
                <GlassBadge
                  variant="outline"
                  size="xs"
                  className={getChangeColor()}
                >
                  {getTrendIcon()} {data.change > 0 ? '+' : ''}{data.change}%
                </GlassBadge>
              )}
            </HStack>
          );

        case 'featured':
          return (
            <VStack space="md">
              <HStack space="sm" align="center" justify="between">
                <div className={cn('text-muted-foreground', config.label)}>
                  {data.label}
                </div>
                {data.icon && (
                  <div className={cn(config.icon, colors.icon)}>
                    {data.icon}
                  </div>
                )}
              </HStack>
              
              <VStack space="xs">
                <div className={cn('font-bold', config.value, colors.value)}>
                  {formatValue(data.value)}{data.unit}
                </div>
                
                {showTarget && data.target && (
                  <div className="w-full">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{Math.round(getTargetProgress())}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <Motion
                        preset="slideRight"
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          getTargetProgress() >= 100 ? 'bg-success' : 'bg-primary'
                        )}
                        style={{ width: `${getTargetProgress()}%` }}
                      />
                    </div>
                  </div>
                )}
              </VStack>

              {showTrend && (data.change || data.changeLabel) && (
                <HStack space="sm" align="center">
                  {data.change && (
                    <div className={cn('text-xs font-medium flex items-center gap-1', getChangeColor())}>
                      <span>{getTrendIcon()}</span>
                      <span>{data.change > 0 ? '+' : ''}{data.change}%</span>
                    </div>
                  )}
                  {data.changeLabel && (
                    <div className="text-xs text-muted-foreground">
                      {data.changeLabel}
                    </div>
                  )}
                </HStack>
              )}

              {data.description && (
                <div className="text-xs text-muted-foreground">
                  {data.description}
                </div>
              )}
            </VStack>
          );

        case 'compact':
          return (
            <HStack space="sm" align="center" justify="between">
              <VStack space="none">
                <div className={cn('font-bold text-lg', colors.value)}>
                  {formatValue(data.value)}{data.unit}
                </div>
                <div className="text-xs text-muted-foreground">
                  {data.label}
                </div>
              </VStack>
              {data.icon && (
                <div className={cn('text-lg', colors.icon)}>
                  {data.icon}
                </div>
              )}
            </HStack>
          );

        default:
          return (
            <VStack space="md">
              <HStack space="sm" align="center" justify="between">
                <div className={cn('text-muted-foreground', config.label)}>
                  {data.label}
                </div>
                {data.icon && (
                  <div className={cn(config.icon, colors.icon)}>
                    {data.icon}
                  </div>
                )}
              </HStack>
              
              <div className={cn('font-bold', config.value, colors.value)}>
                {formatValue(data.value)}{data.unit}
              </div>

              {showTrend && data.change && (
                <HStack space="sm" align="center">
                  <div className={cn('text-sm font-medium flex items-center gap-1', getChangeColor())}>
                    <span>{getTrendIcon()}</span>
                    <span>{data.change > 0 ? '+' : ''}{data.change}%</span>
                  </div>
                  {data.changeLabel && (
                    <div className="text-sm text-muted-foreground">
                      {data.changeLabel}
                    </div>
                  )}
                </HStack>
              )}
            </VStack>
          );
      }
    };

    return (
      <Glass
        ref={ref}
        elevation={1}
        radius="lg"
        className={cn(
          'w-full h-full',
          config.padding,
          colors.background,
          className
        )}
        {...props}
      >
        {renderContent()}
      </Glass>
    );
  }
);

MetricWidget.displayName = 'MetricWidget';