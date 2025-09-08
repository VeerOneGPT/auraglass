'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Motion } from '../../primitives/motion/Motion';

export interface VirtualListItem {
    id: string;
    height: number;
    component: React.ComponentType<any>;
    props?: Record<string, any>;
}

export interface GlassVirtualListProps {
    /**
     * Items to render
     */
    items: VirtualListItem[];
    /**
     * Container height
     */
    height: number;
    /**
     * Item height (if uniform)
     */
    itemHeight?: number;
    /**
     * Estimated item height for dynamic sizing
     */
    estimatedItemHeight?: number;
    /**
     * Overscan count (items to render outside visible area)
     */
    overscan?: number;
    /**
     * Enable smooth scrolling
     */
    smoothScroll?: boolean;
    /**
     * Loading state
     */
    loading?: boolean;
    /**
     * End reached handler (for infinite scroll)
     */
    onEndReached?: () => void;
    /**
     * End threshold (pixels from bottom)
     */
    endThreshold?: number;
    /**
     * Scroll position change handler
     */
    onScrollChange?: (scrollTop: number) => void;
    /**
     * Custom className
     */
    className?: string;
}

/**
 * GlassVirtualList component
 * High-performance virtualized list that only renders visible items
 */
export const GlassVirtualList: React.FC<GlassVirtualListProps> = ({
    items,
    height,
    itemHeight,
    estimatedItemHeight = 50,
    overscan = 5,
    smoothScroll = true,
    loading = false,
    onEndReached,
    endThreshold = 100,
    onScrollChange,
    className,
    ...props
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [containerHeight, setContainerHeight] = useState(height);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Calculate total height
    const totalHeight = useMemo(() => {
        if (itemHeight) {
            return items.length * itemHeight;
        }

        return items.reduce((sum, item) => sum + (item.height || estimatedItemHeight), 0);
    }, [items, itemHeight, estimatedItemHeight]);

    // Get visible range
    const visibleRange = useMemo(() => {
        const itemSize = itemHeight || estimatedItemHeight;

        const start = Math.floor(scrollTop / itemSize);
        const end = Math.min(
            items.length - 1,
            Math.ceil((scrollTop + containerHeight) / itemSize)
        );

        return {
            start: Math.max(0, start - overscan),
            end: Math.min(items.length - 1, end + overscan)
        };
    }, [scrollTop, containerHeight, itemHeight, estimatedItemHeight, items.length, overscan]);

    // Get visible items
    const visibleItems = useMemo(() => {
        return items.slice(visibleRange.start, visibleRange.end + 1);
    }, [items, visibleRange]);

    // Calculate offset
    const offsetY = useMemo(() => {
        if (itemHeight) {
            return visibleRange.start * itemHeight;
        }

        let offset = 0;
        for (let i = 0; i < visibleRange.start; i++) {
            offset += items[i]?.height || estimatedItemHeight;
        }
        return offset;
    }, [visibleRange.start, itemHeight, items, estimatedItemHeight]);

    // Handle scroll
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;
        setScrollTop(scrollTop);
        onScrollChange?.(scrollTop);

        // Check if near end for infinite scroll
        if (onEndReached && scrollTop + containerHeight >= totalHeight - endThreshold) {
            onEndReached();
        }
    }, [onScrollChange, onEndReached, containerHeight, totalHeight, endThreshold]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Update container height when prop changes
    useEffect(() => {
        setContainerHeight(height);
    }, [height]);

    return (
        <Motion preset="fadeIn" className="w-full">
            <div
                ref={containerRef}
                className={cn(
                    'relative overflow-auto',
                    smoothScroll && 'scroll-smooth',
                    className
                )}
                style={{ height: containerHeight }}
                onScroll={handleScroll}
                {...props}
            >
                <div
                    ref={contentRef}
                    className="relative"
                    style={{ height: totalHeight }}
                >
                    <div
                        className="absolute top-0 left-0 right-0"
                        style={{ transform: `translateY(${offsetY}px)` }}
                    >
                        {visibleItems.map((item, index) => {
                            const ItemComponent = item.component;
                            const actualIndex = visibleRange.start + index;

                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        height: itemHeight || item.height || estimatedItemHeight
                                    }}
                                >
                                    <ItemComponent {...(item.props || {})} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Loading indicator */}
                {loading && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-white text-sm">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </Motion>
    );
};

// Virtual Grid Component
export interface GlassVirtualGridProps extends Omit<GlassVirtualListProps, 'itemHeight'> {
    /**
     * Number of columns
     */
    columns: number;
    /**
     * Grid gap
     */
    gap?: number;
    /**
     * Item aspect ratio
     */
    aspectRatio?: number;
}

/**
 * GlassVirtualGrid component
 * Virtualized grid layout for large datasets
 */
export const GlassVirtualGrid: React.FC<GlassVirtualGridProps> = ({
    items,
    columns,
    gap = 8,
    aspectRatio = 1,
    height,
    estimatedItemHeight = 100,
    overscan = 5,
    className,
    ...props
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [containerHeight, setContainerHeight] = useState(height);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate item dimensions
    const itemWidth = useMemo(() => {
        return (containerWidth - (gap * (columns - 1))) / columns;
    }, [containerWidth, columns, gap]);

    const itemHeight = useMemo(() => {
        return itemWidth * aspectRatio;
    }, [itemWidth, aspectRatio]);

    // Calculate rows and visible range
    const totalRows = Math.ceil(items.length / columns);
    const rowHeight = itemHeight + gap;
    const visibleRows = Math.ceil(containerHeight / rowHeight);

    const visibleRange = useMemo(() => {
        const startRow = Math.floor(scrollTop / rowHeight);
        const endRow = Math.min(
            totalRows - 1,
            startRow + visibleRows + overscan
        );

        return {
            startRow: Math.max(0, startRow - overscan),
            endRow
        };
    }, [scrollTop, rowHeight, visibleRows, totalRows, overscan]);

    // Get visible items
    const visibleItems = useMemo(() => {
        const result = [];
        for (let row = visibleRange.startRow; row <= visibleRange.endRow; row++) {
            for (let col = 0; col < columns; col++) {
                const index = row * columns + col;
                if (index < items.length) {
                    result.push({
                        ...items[index],
                        row,
                        col,
                        index
                    });
                }
            }
        }
        return result;
    }, [items, visibleRange, columns]);

    // Calculate offset
    const offsetY = visibleRange.startRow * rowHeight;

    // Handle scroll
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, []);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight);
                setContainerWidth(containerRef.current.clientWidth);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Motion preset="fadeIn" className="w-full">
            <div
                ref={containerRef}
                className={cn(
                    'relative overflow-auto',
                    className
                )}
                style={{ height: containerHeight }}
                onScroll={handleScroll}
                {...props}
            >
                <div
                    className="relative"
                    style={{ height: totalRows * rowHeight }}
                >
                    <div
                        className="absolute top-0 left-0 right-0"
                        style={{ transform: `translateY(${offsetY}px)` }}
                    >
                        <div
                            className="grid gap-2"
                            style={{
                                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                gap: `${gap}px`
                            }}
                        >
                            {visibleItems.map((item) => {
                                const ItemComponent = item.component;

                                return (
                                    <div
                                        key={item.id}
                                        style={{
                                            height: itemHeight,
                                            width: itemWidth
                                        }}
                                    >
                                        <ItemComponent {...(item.props || {})} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Motion>
    );
};

export default GlassVirtualList;
