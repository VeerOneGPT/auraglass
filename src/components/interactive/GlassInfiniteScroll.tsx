'use client';

import { cn } from '../../lib/utilsComprehensive';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Motion } from '../../primitives';

export interface GlassInfiniteScrollProps {
    /**
     * Children to render
     */
    children: ReactNode;
    /**
     * Load more handler
     */
    onLoadMore: () => void | Promise<void>;
    /**
     * Has more items to load
     */
    hasMore: boolean;
    /**
     * Loading state
     */
    loading?: boolean;
    /**
     * Error state
     */
    error?: string | null;
    /**
     * Threshold distance from bottom to trigger load (pixels)
     */
    threshold?: number;
    /**
     * Custom loading indicator
     */
    loadingIndicator?: ReactNode;
    /**
     * Custom error indicator
     */
    errorIndicator?: ReactNode;
    /**
     * End of list message
     */
    endMessage?: ReactNode;
    /**
     * Scroll container className
     */
    className?: string;
    /**
     * Reverse scroll direction (for chat-like interfaces)
     */
    reverse?: boolean;
    /**
     * Auto-scroll to bottom on new content
     */
    autoScroll?: boolean;
}

/**
 * GlassInfiniteScroll component
 * Infinite scrolling container with loading states and error handling
 */
export const GlassInfiniteScroll: React.FC<GlassInfiniteScrollProps> = ({
    children,
    onLoadMore,
    hasMore,
    loading = false,
    error = null,
    threshold = 100,
    loadingIndicator,
    errorIndicator,
    endMessage,
    className,
    reverse = false,
    autoScroll = false,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(loading);
    const [loadError, setLoadError] = useState<string | null>(error);
    const [hasReachedEnd, setHasReachedEnd] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isLoadingMoreRef = useRef(false);

    // Handle intersection observer
    const handleIntersection = useCallback(async (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (
            entry.isIntersecting &&
            hasMore &&
            !isLoadingMoreRef.current &&
            !loadError
        ) {
            isLoadingMoreRef.current = true;
            setIsLoading(true);
            setLoadError(null);

            try {
                await onLoadMore();
            } catch (err) {
                console.error('Error loading more items:', err);
                setLoadError('Failed to load more items');
            } finally {
                setIsLoading(false);
                isLoadingMoreRef.current = false;
            }
        }

        if (!hasMore && entry.isIntersecting) {
            setHasReachedEnd(true);
        }
    }, [hasMore, onLoadMore, loadError]);

    // Setup intersection observer
    useEffect(() => {
        if (!sentinelRef.current) return;

        observerRef.current = new IntersectionObserver(handleIntersection, {
            root: containerRef.current,
            rootMargin: `${threshold}px`,
            threshold: 0.1
        });

        observerRef.current.observe(sentinelRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleIntersection, threshold]);

    // Update loading state when prop changes
    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    // Update error state when prop changes
    useEffect(() => {
        setLoadError(error);
    }, [error]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (autoScroll && containerRef.current && reverse) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [children, autoScroll, reverse]);

    // Handle retry
    const handleRetry = useCallback(async () => {
        setLoadError(null);
        setIsLoading(true);

        try {
            await onLoadMore();
        } catch (err) {
            console.error('Error retrying load:', err);
            setLoadError('Failed to load more items');
        } finally {
            setIsLoading(false);
        }
    }, [onLoadMore]);

    // Default loading indicator
    const defaultLoadingIndicator = (
        <Motion preset="fadeIn" className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-py-8">
            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-glass-glass-px-4 glass-glass-glass-py-2 glass-surface-subtle/10 backdrop-blur-md glass-radius-full">
                <Loader2 className="glass-glass-glass-w-5 glass-glass-glass-h-5 animate-spin glass-glass-glass-text-primary" />
                <span className="glass-glass-glass-text-primary/80 glass-glass-glass-text-sm">Loading more...</span>
            </div>
        </Motion>
    );

    // Default error indicator
    const defaultErrorIndicator = (
        <Motion preset="fadeIn" className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-py-8 glass-glass-glass-px-4">
            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-glass-glass-text-primary glass-glass-glass-mb-3">
                <AlertCircle className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                <span className="glass-glass-glass-text-sm glass-glass-glass-font-medium">Error loading more items</span>
            </div>
            <button
                onClick={handleRetry}
                className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-glass-glass-px-4 glass-glass-glass-py-2 glass-surface-dark/30 hover:glass-surface-dark/40 glass-radius-lg transition-colors glass-glass-glass-border glass-glass-glass-border-white/20 hover:glass-glass-glass-border-white/30"
            >
                <RefreshCw className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                <span className="glass-glass-glass-text-sm">Try again</span>
            </button>
        </Motion>
    );

    // Default end message
    const defaultEndMessage = (
        <Motion preset="fadeIn" className="glass-glass-glass-text-center glass-glass-glass-py-8">
            <div className="glass-glass-glass-text-primary/60 glass-glass-glass-text-sm">
                You've reached the end
            </div>
        </Motion>
    );

    return (
        <div
            ref={containerRef}
            className={cn(
                'overflow-y-auto',
                reverse && 'flex flex-col-reverse',
                className
            )}
            {...props}
        >
            {/* Content */}
            <div className={cn(reverse && 'flex flex-col-reverse')}>
                {children}
            </div>

            {/* Sentinel for intersection observer */}
            {!reverse && (
                <div ref={sentinelRef} className="glass-glass-glass-h-4" />
            )}

            {/* Loading State */}
            {isLoading && !reverse && (
                <div className="glass-glass-glass-py-4">
                    {loadingIndicator || defaultLoadingIndicator}
                </div>
            )}

            {/* Error State */}
            {loadError && !reverse && (
                <div className="glass-glass-glass-py-4">
                    {errorIndicator || defaultErrorIndicator}
                </div>
            )}

            {/* End of List */}
            {hasReachedEnd && !hasMore && !isLoading && !loadError && !reverse && (
                <div className="glass-glass-glass-py-4">
                    {endMessage || defaultEndMessage}
                </div>
            )}

            {/* Reverse direction indicators */}
            {reverse && (
                <div className="glass-glass-glass-flex glass-glass-glass-flex-col-reverse">
                    {/* Sentinel for reverse direction */}
                    <div ref={sentinelRef} className="glass-glass-glass-h-4" />

                    {/* Loading State */}
                    {isLoading && (
                        <div className="glass-glass-glass-py-4">
                            {loadingIndicator || defaultLoadingIndicator}
                        </div>
                    )}

                    {/* Error State */}
                    {loadError && (
                        <div className="glass-glass-glass-py-4">
                            {errorIndicator || defaultErrorIndicator}
                        </div>
                    )}

                    {/* End of List */}
                    {hasReachedEnd && !hasMore && !isLoading && !loadError && (
                        <div className="glass-glass-glass-py-4">
                            {endMessage || defaultEndMessage}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlassInfiniteScroll;
