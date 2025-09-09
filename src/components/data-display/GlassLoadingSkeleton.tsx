'use client';

import React, { forwardRef } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { glassTokenUtils } from '../../tokens/glass';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';
import { cn } from '@/lib/utilsComprehensive';

export interface GlassLoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of skeleton rows to display */
  rows?: number;
  /** Height of each row */
  height?: string | number;
  /** Width of the skeleton */
  width?: string | number;
  /** Whether to show avatar skeleton */
  avatar?: boolean;
  /** Avatar size */
  avatarSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to animate the skeleton */
  animate?: boolean;
  /** Layout variant */
  variant?: 'default' | 'card' | 'list' | 'table' | 'form' | 'dashboard';
  /** Show shimmer effect */
  shimmer?: boolean;
}

export const GlassLoadingSkeleton = forwardRef<HTMLDivElement, GlassLoadingSkeletonProps>(
  (
    {
      rows = 3,
      height = '1rem',
      width = '100%',
      avatar = false,
      avatarSize = 'md',
      animate = true,
      variant = 'default',
      shimmer = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const avatarSizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20',
    };

    const baseClasses = cn(
      'glass-skeleton',
      'rounded-md',
      shimmer && animate && 'animate-pulse',
      'backdrop-blur-md'
    );

    // Consistent glassmorphism styling for all skeleton elements
    const getSkeletonStyle = () => ({
      background: `
        linear-gradient(135deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.005) 50%, rgba(255,255,255,0.015) 100%),
        linear-gradient(135deg, ${glassTokenUtils.getSurface('neutral', 'level1').border.color} 0%, rgba(147,51,234,0.1) 100%)
      `,
      border: '1px solid rgba(255,255,255,0.04)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.03) inset'
    });

    const renderBasicSkeleton = () => (
      <div className="space-y-3">
        {avatar && (
          <div 
            className={cn('rounded-full', baseClasses, avatarSizes[avatarSize])} 
            style={getSkeletonStyle()}
          />
        )}
        
        {Array.from({ length: rows }, (_, index) => {
          const isLast = index === rows - 1;
          const rowWidth = isLast && rows > 1 ? '80%' : width;
          
          return (
            <div
              key={index}
              className={baseClasses}
              style={{ 
                height: typeof height === 'number' ? `${height}px` : height,
                width: typeof rowWidth === 'number' ? `${rowWidth}px` : rowWidth,
                ...getSkeletonStyle()
              }}
            />
          );
        })}
      </div>
    );

    const renderCardSkeleton = () => (
      <OptimizedGlass
          elevation={'level1'}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
           className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center space-x-4">
            {avatar && (
              <div className={cn('rounded-full', baseClasses, avatarSizes[avatarSize])} style={getSkeletonStyle()} />
            )}
            <div className="space-y-2 flex-1">
              <div className={cn(baseClasses, 'h-5 w-3/4')} style={getSkeletonStyle()} />
              <div className={cn(baseClasses, 'h-4 w-1/2')} style={getSkeletonStyle()} />
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            {Array.from({ length: rows }, (_, index) => (
              <div
                key={index}
                className={cn(baseClasses, 'h-4')}
                style={{ width: index === rows - 1 ? '60%' : '100%', ...getSkeletonStyle() }}
              />
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex space-x-3 pt-2">
            <div className={cn(baseClasses, 'h-9 w-20 rounded-lg')} style={getSkeletonStyle()} />
            <div className={cn(baseClasses, 'h-9 w-16 rounded-lg')} style={getSkeletonStyle()} />
          </div>
        </div>
      </OptimizedGlass>
    );

    const renderListSkeleton = () => (
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center space-x-4 p-3">
            <div className={cn('rounded-full', baseClasses, 'w-10 h-10')} style={getSkeletonStyle()} />
            <div className="space-y-2 flex-1">
              <div className={cn(baseClasses, 'h-4 w-3/4')} style={getSkeletonStyle()} />
              <div className={cn(baseClasses, 'h-3 w-1/2')} style={getSkeletonStyle()} />
            </div>
            <div className={cn(baseClasses, 'h-6 w-16 rounded')} style={getSkeletonStyle()} />
          </div>
        ))}
      </div>
    );

    const renderTableSkeleton = () => (
      <div className="space-y-2">
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className={cn(baseClasses, 'h-4 w-16')} style={getSkeletonStyle()} />
          ))}
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4">
            {Array.from({ length: 4 }, (_, colIndex) => (
              <div key={colIndex} className={cn(baseClasses, 'h-4')} style={getSkeletonStyle()} />
            ))}
          </div>
        ))}
      </div>
    );

    const renderFormSkeleton = () => (
      <div className="space-y-6">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="space-y-2">
            <div className={cn(baseClasses, 'h-4 w-24')} style={getSkeletonStyle()} />
            <div className={cn(baseClasses, 'h-10 w-full rounded-lg')} style={getSkeletonStyle()} />
          </div>
        ))}
        
        <div className="flex space-x-3 pt-4">
          <div className={cn(baseClasses, 'h-10 w-24 rounded-lg')} style={getSkeletonStyle()} />
          <div className={cn(baseClasses, 'h-10 w-20 rounded-lg')} style={getSkeletonStyle()} />
        </div>
      </div>
    );

    const renderDashboardSkeleton = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: rows }, (_, index) => (
          <OptimizedGlass
          elevation={'level1'}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          key={index}  className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={cn(baseClasses, 'h-5 w-24')} style={getSkeletonStyle()} />
                <div className={cn(baseClasses, 'h-6 w-6 rounded')} style={getSkeletonStyle()} />
              </div>
              
              <div className={cn(baseClasses, 'h-8 w-16')} style={getSkeletonStyle()} />
              
              <div className="space-y-2">
                <div className={cn(baseClasses, 'h-3 w-full')} style={getSkeletonStyle()} />
                <div className={cn(baseClasses, 'h-3 w-3/4')} style={getSkeletonStyle()} />
              </div>
            </div>
          </OptimizedGlass>
        ))}
      </div>
    );

    const renderSkeleton = () => {
      if (children) {
        return children;
      }

      switch (variant) {
        case 'card':
          return renderCardSkeleton();
        case 'list':
          return renderListSkeleton();
        case 'table':
          return renderTableSkeleton();
        case 'form':
          return renderFormSkeleton();
        case 'dashboard':
          return renderDashboardSkeleton();
        default:
          return renderBasicSkeleton();
      }
    };

    return (
      <Motion
        preset={animate ? 'fadeIn' : undefined}
        className={cn('glass-loading-skeleton', className)}
      >
        <div
          ref={ref}
          role="status"
          aria-label="Loading content"
          className="relative"
          {...props}
        >
          {renderSkeleton()}
          
          {/* Premium Shimmer overlay */}
          {shimmer && (
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-blue-300/10 to-transparent animate-shimmer" />
          )}
        </div>
      </Motion>
    );
  }
);

GlassLoadingSkeleton.displayName = 'GlassLoadingSkeleton';

// Utility components for common patterns
export const GlassSkeletonText = forwardRef<HTMLDivElement, Omit<GlassLoadingSkeletonProps, 'variant'>>(
  (props, ref) => <GlassLoadingSkeleton ref={ref} variant="default" {...props} />
);

export const GlassSkeletonCard = forwardRef<HTMLDivElement, Omit<GlassLoadingSkeletonProps, 'variant'>>(
  (props, ref) => <GlassLoadingSkeleton ref={ref} variant="card" {...props} />
);

export const GlassSkeletonList = forwardRef<HTMLDivElement, Omit<GlassLoadingSkeletonProps, 'variant'>>(
  (props, ref) => <GlassLoadingSkeleton ref={ref} variant="list" {...props} />
);

export const GlassSkeletonTable = forwardRef<HTMLDivElement, Omit<GlassLoadingSkeletonProps, 'variant'>>(
  (props, ref) => <GlassLoadingSkeleton ref={ref} variant="table" {...props} />
);

GlassSkeletonText.displayName = 'GlassSkeletonText';
GlassSkeletonCard.displayName = 'GlassSkeletonCard';
GlassSkeletonList.displayName = 'GlassSkeletonList';
GlassSkeletonTable.displayName = 'GlassSkeletonTable';

// CSS for shimmer animation (should be added to globals.css)
export const skeletonAnimationCSS = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
`;

export default GlassLoadingSkeleton;
