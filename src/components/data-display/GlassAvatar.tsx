'use client';

import { cn } from '@/lib/utilsComprehensive';
import React, { forwardRef } from 'react';
import { OptimizedGlass } from '../../primitives';

export interface GlassAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Avatar variant
     */
    variant?: 'default' | 'circle' | 'square' | 'rounded';
    /**
     * Avatar size
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /**
     * Avatar status indicator
     */
    status?: 'online' | 'offline' | 'away' | 'busy';
    /**
     * Show status indicator
     */
    showStatus?: boolean;
    /**
     * Glass elevation
     */
    elevation?: 1 | 2 | 3;
    /**
     * Custom fallback content
     */
    fallback?: React.ReactNode;
    /**
     * Fallback text (will generate initials)
     */
    fallbackText?: string;
}

export interface GlassAvatarGroupProps {
    /**
     * Maximum number of avatars to show
     */
    max?: number;
    /**
     * Spacing between avatars
     */
    spacing?: 'tight' | 'normal' | 'loose';
    /**
     * Avatar size for group
     */
    size?: GlassAvatarProps['size'];
    /**
     * Children (GlassAvatar components)
     */
    children: React.ReactNode;
}

export interface GlassAvatarFallbackProps {
    /**
     * Delay before showing fallback (ms)
     */
    delayMs?: number;
    /**
     * Children content
     */
    children: React.ReactNode;
}

/**
 * GlassAvatar component
 * A glassmorphism avatar with status indicators and fallbacks
 */
export const GlassAvatar = forwardRef<HTMLImageElement, GlassAvatarProps>(
    (
        {
            variant = 'circle',
            size = 'md',
            status,
            showStatus = false,
            elevation = 1,
            fallback,
            fallbackText,
            className,
            src,
            alt,
            onError,
            ...props
        },
        ref
    ) => {
        const [hasError, setHasError] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(!!src);

        const sizeClasses = {
            xs: 'w-6 h-6 text-xs',
            sm: 'w-8 h-8 text-sm',
            md: 'w-10 h-10 text-base',
            lg: 'w-12 h-12 text-lg',
            xl: 'w-16 h-16 text-xl',
            '2xl': 'w-20 h-20 text-2xl',
        };

        const variantClasses = {
            default: 'rounded-md',
            circle: 'rounded-full',
            square: 'rounded-none',
            rounded: 'rounded-lg',
        };

        const statusColors = {
            online: 'bg-green-400',
            offline: 'bg-gray-400',
            away: 'bg-yellow-400',
            busy: 'bg-red-400',
        };

        const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
            setHasError(true);
            setIsLoading(false);
            onError?.(e);
        };

        const handleLoad = () => {
            setIsLoading(false);
        };

        // Generate initials from fallback text
        const getInitials = (text: string) => {
            return text
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        };

        const showFallback = hasError || !src;
        const fallbackContent = fallback || (
            fallbackText ? (
                <span className="font-medium text-white/80">
                    {getInitials(fallbackText)}
                </span>
            ) : (
                <div className="w-4 h-4 bg-white/30 rounded" />
            )
        );

        return (
            <div className="relative inline-block">
                <OptimizedGlass
          variant="frosted"
          elevation={elevation}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          
                    

                    className={cn(
                        'relative overflow-hidden',
                        sizeClasses[size],
                        variantClasses[variant],
                        'backdrop-blur-sm bg-white/10 border border-white/20',
                        className
                    )}
                >
                    {showFallback ? (
                        <div className="flex items-center justify-center w-full h-full">
                            {fallbackContent}
                        </div>
                    ) : (
                        <img
                            ref={ref}
                            src={src}
                            alt={alt}
                            onError={handleError}
                            onLoad={handleLoad}
                            className="w-full h-full object-cover"
                            {...props}
                        />
                    )}

                    {isLoading && !hasError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white/60 rounded-full animate-spin" />
                        </div>
                    )}
                </OptimizedGlass>

                {showStatus && status && (
                    <div
                        className={cn(
                            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                            statusColors[status]
                        )}
                    />
                )}
            </div>
        );
    }
);

GlassAvatar.displayName = 'GlassAvatar';

/**
 * GlassAvatarGroup component
 * Groups multiple avatars with overlap and max display
 */
export const GlassAvatarGroup: React.FC<GlassAvatarGroupProps> = ({
    max = 5,
    spacing = 'normal',
    size = 'md',
    children,
}) => {
    const childArray = React.Children.toArray(children);
    const visibleCount = Math.min(childArray.length, max);
    const hasOverflow = childArray.length > max;

    const spacingClasses = {
        tight: '-space-x-1',
        normal: '-space-x-2',
        loose: '-space-x-3',
    };

    return (
        <div className={cn('flex items-center', spacingClasses[spacing])}>
            {childArray.slice(0, visibleCount).map((child, index) => (
                <div key={index} className="relative">
                    {React.cloneElement(child as React.ReactElement, {
                        size,
                        elevation: 2,
                    })}
                </div>
            ))}

            {hasOverflow && (
                <div className="relative">
                    <GlassAvatar
                        size={size}
                        elevation={2}
                        fallback={
                            <span className="font-medium text-white/60 text-xs">
                                +{childArray.length - max}
                            </span>
                        }
                    />
                </div>
            )}
        </div>
    );
};

/**
 * GlassAvatarFallback component
 * Shows fallback content with optional delay
 */
export const GlassAvatarFallback: React.FC<GlassAvatarFallbackProps> = ({
    delayMs = 0,
    children,
}) => {
    const [showFallback, setShowFallback] = React.useState(delayMs === 0);

    React.useEffect(() => {
        if (delayMs > 0) {
            const timer = setTimeout(() => setShowFallback(true), delayMs);
            return () => clearTimeout(timer);
        }
    }, [delayMs]);

    if (!showFallback) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black/10">
                <div className="w-3 h-3 border border-white/30 border-t-white/60 rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
};
