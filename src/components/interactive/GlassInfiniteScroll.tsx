'use client';

import { cn } from '@/lib/utilsComprehensive';
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
        <Motion preset="fadeIn" className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-white/80 text-sm">Loading more...</span>
            </div>
        </Motion>
    );

    // Default error indicator
    const defaultErrorIndicator = (
        <Motion preset="fadeIn" className="flex flex-col items-center justify-center py-8 px-4">
            <div className="flex items-center gap-2 text-red-400 mb-3">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Error loading more items</span>
            </div>
            <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Try again</span>
            </button>
        </Motion>
    );

    // Default end message
    const defaultEndMessage = (
        <Motion preset="fadeIn" className="text-center py-8">
            <div className="text-white/60 text-sm">
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
                <div ref={sentinelRef} className="h-4" />
            )}

            {/* Loading State */}
            {isLoading && !reverse && (
                <div className="py-4">
                    {loadingIndicator || defaultLoadingIndicator}
                </div>
            )}

            {/* Error State */}
            {loadError && !reverse && (
                <div className="py-4">
                    {errorIndicator || defaultErrorIndicator}
                </div>
            )}

            {/* End of List */}
            {hasReachedEnd && !hasMore && !isLoading && !loadError && !reverse && (
                <div className="py-4">
                    {endMessage || defaultEndMessage}
                </div>
            )}

            {/* Reverse direction indicators */}
            {reverse && (
                <div className="flex flex-col-reverse">
                    {/* Sentinel for reverse direction */}
                    <div ref={sentinelRef} className="h-4" />

                    {/* Loading State */}
                    {isLoading && (
                        <div className="py-4">
                            {loadingIndicator || defaultLoadingIndicator}
                        </div>
                    )}

                    {/* Error State */}
                    {loadError && (
                        <div className="py-4">
                            {errorIndicator || defaultErrorIndicator}
                        </div>
                    )}

                    {/* End of List */}
                    {hasReachedEnd && !hasMore && !isLoading && !loadError && (
                        <div className="py-4">
                            {endMessage || defaultEndMessage}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlassInfiniteScroll;
