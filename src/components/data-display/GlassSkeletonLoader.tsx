import React, { useEffect, useState, memo, useCallback } from 'react';
import { OptimizedGlass } from '../../primitives';
import { useAccessibleAnimation } from '../../hooks/useAccessibilitySettings';
import { GlassComponentErrorBoundary } from '../../utils/errorBoundary';

export interface GlassSkeletonLoaderProps {
  /** Whether the loader is active */
  loading?: boolean;
  /** Custom loading text */
  text?: string;
  /** Size of the loader */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Animation variant */
  variant?: 'pulse' | 'wave' | 'shimmer';
  /** Custom className */
  className?: string;
  /** Children to show when not loading */
  children?: React.ReactNode;
}

/** Animation keyframes for different variants */
const pulseKeyframes = `
  @keyframes glass-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.02);
    }
  }
`;

const waveKeyframes = `
  @keyframes glass-wave {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const shimmerKeyframes = `
  @keyframes glass-shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

export const GlassSkeletonLoader: React.FC<GlassSkeletonLoaderProps> = memo(({
  loading = true,
  text = "Loading...",
  size = 'md',
  variant = 'pulse',
  className = '',
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const { shouldAnimate, animationDuration } = useAccessibleAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderContent = useCallback(() => {
    if (!loading && mounted) {
      return <>{children}</>;
    }

    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    };

    const getAnimationStyle = (): React.CSSProperties => {
      if (!shouldAnimate) return {};

      switch (variant) {
        case 'wave':
          return {
            position: 'relative' as const,
            overflow: 'hidden',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200px 100%',
            animation: `glass-wave ${animationDuration * 5}ms infinite`,
          };
        case 'shimmer':
          return {
            position: 'relative' as const,
            overflow: 'hidden',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            backgroundSize: '200px 100%',
            animation: `glass-shimmer ${animationDuration * 7}ms infinite`,
          };
        case 'pulse':
        default:
          return {
            animation: `glass-pulse ${animationDuration * 7}ms ease-in-out infinite`,
          };
      }
    };

    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <OptimizedGlass
          className={`rounded-full ${sizeClasses[size]}`}
          style={getAnimationStyle()}
          blur="medium"
          elevation={1}
          interactive={false}
        />

        {text && (
          <OptimizedGlass
            className="px-4 py-2 rounded-lg"
            blur="subtle"
            elevation={0}
          >
            <span className="text-sm text-white/70 font-medium">
              {text}
            </span>
          </OptimizedGlass>
        )}
      </div>
    );
  }, [loading, mounted, children, size, variant, className, text, shouldAnimate, animationDuration]);

  return (
    <GlassComponentErrorBoundary componentName="GlassSkeletonLoader">
      <>
        <style>
          {pulseKeyframes}
          {waveKeyframes}
          {shimmerKeyframes}
        </style>
        {renderContent()}
      </>
    </GlassComponentErrorBoundary>
  );
  });

// Compound component for skeleton text
interface GlassSkeletonTextProps {
  lines?: number;
  width?: string | string[];
  className?: string;
}

export const GlassSkeletonText: React.FC<GlassSkeletonTextProps> = ({
  lines = 1,
  width = '100%',
  className = ''
}) => {
  const { shouldAnimate } = useAccessibleAnimation();
  const widths = Array.isArray(width) ? width : [width];

  const getAnimationStyle = (): React.CSSProperties => {
    return {
      animation: 'glass-pulse 2s ease-in-out infinite',
    };
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <OptimizedGlass
          key={i}
          className="h-4 rounded"
          style={{
            width: widths[i % widths.length],
            animation: 'glass-pulse 2s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }}
          blur="subtle"
          elevation={0}
          interactive={false}
        />
      ))}
    </div>
  );
};

// Compound component for skeleton card
export const GlassSkeletonCard: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <OptimizedGlass
      className={`p-6 space-y-4 ${className}`}
      blur="medium"
      elevation={1}
    >
      <GlassSkeletonText lines={1} width="60%" />
      <GlassSkeletonText lines={2} width={['100%', '80%']} />
      <div className="flex space-x-2">
        <OptimizedGlass
          className="h-8 w-16 rounded"
          style={{ animation: 'glass-pulse 2s ease-in-out infinite' }}
          blur="subtle"
          elevation={0}
        />
        <OptimizedGlass
          className="h-8 w-16 rounded"
          style={{
            animation: 'glass-pulse 2s ease-in-out infinite',
            animationDelay: '0.2s'
          }}
          blur="subtle"
          elevation={0}
        />
      </div>
    </OptimizedGlass>
  );
};