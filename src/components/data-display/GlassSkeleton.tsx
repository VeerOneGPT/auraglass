import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded';

export interface GlassSkeletonProps {
  /** Shape variant of the skeleton */
  variant?: SkeletonVariant;
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Animation variant */
  animation?: 'pulse' | 'wave' | 'none';
  /** Custom className */
  className?: string;
  /** Number of skeleton lines (for text variant) */
  lines?: number;
  /** Spacing between lines (for text variant) */
  spacing?: string;
}

// Animation keyframes
const skeletonKeyframes = `
  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  @keyframes skeleton-wave {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export const GlassSkeleton: React.FC<GlassSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
  lines = 1,
  spacing = '0.5rem',
}) => {
  const getBaseStyles = (): React.CSSProperties => {
    const baseWidth = typeof width === 'number' ? `${width}px` : width || '100%';
    const baseHeight = typeof height === 'number' ? `${height}px` : height;

    switch (variant) {
      case 'circular':
        const size = baseHeight || baseWidth || '2rem';
        return {
          width: size,
          height: size,
          borderRadius: '50%',
        };
      case 'rounded':
        return {
          width: baseWidth,
          height: baseHeight || '1rem',
          borderRadius: '0.375rem',
        };
      case 'rectangular':
        return {
          width: baseWidth,
          height: baseHeight || '1rem',
          borderRadius: '0.25rem',
        };
      case 'text':
      default:
        return {
          width: baseWidth,
          height: baseHeight || '1rem',
          borderRadius: '0.125rem',
        };
    }
  };

  const getAnimationStyles = (): React.CSSProperties => {
    switch (animation) {
      case 'pulse':
        return {
          animation: 'skeleton-pulse 2s ease-in-out infinite',
        };
      case 'wave':
        return {
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(90deg, transparent, ${glassStyles.surface?.base || "rgba(255, 255, 255, 0.1)"}, transparent)',
          backgroundSize: '200% 100%',
          animation: 'skeleton-wave 2s infinite',
        };
      case 'none':
      default:
        return {};
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <>
        <style>{skeletonKeyframes}</style>
        <div className={`space-y-${spacing} ${className}`}>
          {Array.from({ length: lines }, (_, index) => {
            const lineWidth = Array.isArray(width)
              ? width[index % width.length]
              : typeof width === 'string' && width.includes(',')
                ? width.split(',')[index % width.split(',').length].trim()
                : index === lines - 1
                  ? '60%'
                  : '100%';

            return (
              <OptimizedGlass
                key={index}
                className="block"
                style={{
                  ...getBaseStyles(),
                  width: lineWidth,
                  ...getAnimationStyles(),
                  animationDelay: `${index * 0.1}s`,
                }}
                blur="subtle"
                elevation="level1"
                interactive={false}
              />
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <style>{skeletonKeyframes}</style>
      <OptimizedGlass
        className={`block ${className}`}
        style={{
          ...getBaseStyles(),
          ...getAnimationStyles(),
        }}
        blur="subtle"
        elevation="level1"
        interactive={false}
      />
    </>
  );
};

// Pre-built skeleton components for common use cases

export const GlassSkeletonAvatar: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <GlassSkeleton
      variant="circular"
      className={`${sizeClasses[size]} ${className}`}
      animation="pulse"
    />
  );
};

export const GlassSkeletonButton: React.FC<{
  width?: string;
  className?: string;
}> = ({ width = '80px', className = '' }) => {
  return (
    <GlassSkeleton
      variant="rounded"
      width={width}
      height="2.5rem"
      className={className}
      animation="pulse"
    />
  );
};

export const GlassSkeletonCard: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <OptimizedGlass
      className={`p-6 space-y-4 ${className}`}
      blur="medium"
      elevation={'level1'}
    >
      {/* Header skeleton */}
      <div className="flex items-center space-x-4">
        <GlassSkeletonAvatar size="md" />
        <div className="space-y-2 flex-1">
          <GlassSkeleton width="60%" height="1rem" />
          <GlassSkeleton width="40%" height="0.75rem" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        <GlassSkeleton height="1rem" />
        <GlassSkeleton height="1rem" width="80%" />
        <GlassSkeleton height="1rem" width="60%" />
      </div>

      {/* Actions skeleton */}
      <div className="flex space-x-2 pt-2">
        <GlassSkeleton width="60px" height="2rem" variant="rounded" />
        <GlassSkeleton width="60px" height="2rem" variant="rounded" />
      </div>
    </OptimizedGlass>
  );
};

export const GlassSkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className = '' }) => {
  return (
    <OptimizedGlass
      className={`overflow-hidden ${className}`}
      blur="medium"
      elevation={'level1'}
    >
      {/* Table header */}
      <div className="p-4 border-b border-white/10">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }, (_, i) => (
            <GlassSkeleton key={`header-${i}`} height="1rem" width="80%" />
          ))}
        </div>
      </div>

      {/* Table rows */}
      <div className="divide-y divide-white/5">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <GlassSkeleton
                  key={`cell-${rowIndex}-${colIndex}`}
                  height="1rem"
                  width={colIndex === columns - 1 ? '60%' : '100%'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </OptimizedGlass>
  );
};

export const GlassSkeletonList: React.FC<{
  items?: number;
  className?: string;
}> = ({ items = 3, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }, (_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <GlassSkeletonAvatar size="sm" />
          <div className="flex-1 space-y-2">
            <GlassSkeleton height="1rem" width="70%" />
            <GlassSkeleton height="0.75rem" width="50%" />
          </div>
          <GlassSkeleton width="60px" height="1.5rem" variant="rounded" />
        </div>
      ))}
    </div>
  );
};
