'use client';

import { cn } from '@/lib/utilsComprehensive';
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Minimize2,
    Pause,
    Play
} from 'lucide-react';
import React, { Children, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Motion } from '../../primitives';
import { GlassButton } from '../button';
import { CardContent, GlassCard } from '../card';

export interface CarouselItem {
    id: string;
    content: ReactNode;
    title?: string;
    description?: string;
    image?: string;
}

export interface GlassCarouselProps {
    /**
     * Carousel items or children
     */
    children?: ReactNode;
    items?: CarouselItem[];
    /**
     * Initial active slide index
     */
    initialIndex?: number;
    /**
     * Number of slides to show at once
     */
    slidesToShow?: number;
    /**
     * Number of slides to scroll at once
     */
    slidesToScroll?: number;
    /**
     * Enable infinite loop
     */
    infinite?: boolean;
    /**
     * Enable auto-play
     */
    autoPlay?: boolean;
    /**
     * Auto-play interval in milliseconds
     */
    autoPlayInterval?: number;
    /**
     * Show navigation arrows
     */
    showArrows?: boolean;
    /**
     * Show navigation dots
     */
    showDots?: boolean;
    /**
     * Show slide indicators
     */
    showIndicators?: boolean;
    /**
     * Enable swipe gestures
     */
    enableSwipe?: boolean;
    /**
     * Enable keyboard navigation
     */
    enableKeyboard?: boolean;
    /**
     * Animation duration in milliseconds
     */
    animationDuration?: number;
    /**
     * Pause auto-play on hover
     */
    pauseOnHover?: boolean;
    /**
     * Carousel height
     */
    height?: string | number;
    /**
     * Gap between slides
     */
    gap?: string | number;
    /**
     * Show fullscreen toggle
     */
    showFullscreen?: boolean;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Slide change callback
     */
    onSlideChange?: (index: number) => void;
    /**
     * Custom arrow components
     */
    customPrevArrow?: ReactNode;
    customNextArrow?: ReactNode;
}

/**
 * GlassCarousel component
 * A flexible carousel/slider with smooth animations and multiple display modes
 */
export const GlassCarousel: React.FC<GlassCarouselProps> = ({
    children,
    items = [],
    initialIndex = 0,
    slidesToShow = 1,
    slidesToScroll = 1,
    infinite = true,
    autoPlay = false,
    autoPlayInterval = 3000,
    showArrows = true,
    showDots = true,
    showIndicators = false,
    enableSwipe = true,
    enableKeyboard = true,
    animationDuration = 500,
    pauseOnHover = true,
    height = '400px',
    gap = '1rem',
    showFullscreen = false,
    className,
    onSlideChange,
    customPrevArrow,
    customNextArrow,
    ...props
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [dragStart, setDragStart] = useState<number | null>(null);
    const [dragEnd, setDragEnd] = useState<number | null>(null);

    const carouselRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout>();
    const transitionRef = useRef<NodeJS.Timeout>();

    // Get carousel items
    const carouselItems = children
        ? Children.toArray(children).map((child, index) => ({
            id: `item-${index}`,
            content: child as ReactNode
        }))
        : items;

    const totalItems = carouselItems.length;
    const maxIndex = Math.max(0, totalItems - slidesToShow);

    // Handle slide change
    const handleSlideChange = useCallback((newIndex: number) => {
        if (isTransitioning) return;

        let targetIndex = newIndex;

        if (infinite) {
            if (targetIndex < 0) {
                targetIndex = maxIndex;
            } else if (targetIndex > maxIndex) {
                targetIndex = 0;
            }
        } else {
            targetIndex = Math.max(0, Math.min(maxIndex, targetIndex));
        }

        if (targetIndex !== currentIndex) {
            setIsTransitioning(true);
            setCurrentIndex(targetIndex);
            onSlideChange?.(targetIndex);

            // Reset transition state after animation
            if (transitionRef.current) {
                clearTimeout(transitionRef.current);
            }
            transitionRef.current = setTimeout(() => {
                setIsTransitioning(false);
            }, animationDuration);
        }
    }, [currentIndex, maxIndex, infinite, isTransitioning, animationDuration, onSlideChange]);

    // Navigation functions
    const goToPrev = useCallback(() => {
        handleSlideChange(currentIndex - slidesToScroll);
    }, [currentIndex, slidesToScroll, handleSlideChange]);

    const goToNext = useCallback(() => {
        handleSlideChange(currentIndex + slidesToScroll);
    }, [currentIndex, slidesToScroll, handleSlideChange]);

    const goToSlide = useCallback((index: number) => {
        handleSlideChange(index);
    }, [handleSlideChange]);

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying && totalItems > slidesToShow) {
            autoPlayRef.current = setInterval(() => {
                goToNext();
            }, autoPlayInterval);
        } else {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isPlaying, totalItems, slidesToShow, autoPlayInterval, goToNext]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!enableKeyboard) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNext();
                    break;
                case ' ':
                    e.preventDefault();
                    setIsPlaying(!isPlaying);
                    break;
                case 'Escape':
                    if (isFullscreen) {
                        setIsFullscreen(false);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [enableKeyboard, goToPrev, goToNext, isPlaying, isFullscreen]);

    // Handle mouse/touch events for swipe
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!enableSwipe) return;
        setDragStart(e.clientX);
    }, [enableSwipe]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!enableSwipe || dragStart === null) return;
        setDragEnd(e.clientX);
    }, [enableSwipe, dragStart]);

    const handleMouseUp = useCallback(() => {
        if (!enableSwipe || dragStart === null || dragEnd === null) return;

        const diff = dragStart - dragEnd;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }

        setDragStart(null);
        setDragEnd(null);
    }, [enableSwipe, dragStart, dragEnd, goToNext, goToPrev]);

    // Handle hover for pause on hover
    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover && isPlaying) {
            setIsPlaying(false);
        }
    }, [pauseOnHover, isPlaying]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover && autoPlay) {
            setIsPlaying(true);
        }
    }, [pauseOnHover, autoPlay]);

    // Calculate transform for slides
    const getTransform = () => {
        const slideWidth = 100 / slidesToShow;
        return `translateX(-${currentIndex * slideWidth}%)`;
    };

    // Check if navigation is needed
    const needsNavigation = totalItems > slidesToShow;

    if (totalItems === 0) {
        return (
            <GlassCard className={cn('p-8', className)}>
                <div className="text-center text-white/60">
                    No items to display
                </div>
            </GlassCard>
        );
    }

    return (
        <Motion preset="fadeIn" className="w-full">
            <GlassCard
                className={cn(
                    'overflow-hidden relative',
                    isFullscreen && 'fixed inset-0 z-50 rounded-none',
                    className
                )}
                {...props}
            >
                <CardContent className="p-0">
                    {/* Main Carousel Container */}
                    <div
                        ref={carouselRef}
                        className={cn('relative overflow-hidden')}
                        style={{
                            height: typeof height === 'number' ? `${height}px` : height
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                    >
                        {/* Slides Container */}
                        <div
                            className="flex h-full transition-transform duration-500 ease-in-out"
                            style={{
                                transform: getTransform(),
                                gap: typeof gap === 'number' ? `${gap}px` : gap
                            }}
                        >
                            {carouselItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0"
                                    style={{
                                        width: `${100 / slidesToShow}%`,
                                        paddingLeft: index === 0 ? 0 : undefined,
                                        paddingRight: index === carouselItems.length - 1 ? 0 : undefined
                                    }}
                                >
                                    <div className="h-full w-full relative">
                                        {item.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        {showArrows && needsNavigation && (
                            <>
                                {/* Previous Arrow */}
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                    {customPrevArrow ? (
                                        <div onClick={goToPrev}>{customPrevArrow}</div>
                                    ) : (
                                        <GlassButton
                                            variant="secondary"
                                            size="lg"
                                            onClick={goToPrev}
                                            disabled={!infinite && currentIndex === 0}
                                            className="p-3 shadow-lg hover:-translate-y-0.5 glass-ripple"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </GlassButton>
                                    )}
                                </div>

                                {/* Next Arrow */}
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                                    {customNextArrow ? (
                                        <div onClick={goToNext}>{customNextArrow}</div>
                                    ) : (
                                        <GlassButton
                                            variant="secondary"
                                            size="lg"
                                            onClick={goToNext}
                                            disabled={!infinite && currentIndex >= maxIndex}
                                            className="p-3 shadow-lg hover:-translate-y-0.5 glass-ripple"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </GlassButton>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Play/Pause Controls */}
                        {autoPlay && needsNavigation && (
                            <div className="absolute top-4 right-4 z-10">
                                <GlassButton
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-2"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-4 h-4" />
                                    ) : (
                                        <Play className="w-4 h-4" />
                                    )}
                                </GlassButton>
                            </div>
                        )}

                        {/* Fullscreen Toggle */}
                        {showFullscreen && (
                            <div className="absolute top-4 left-4 z-10">
                                <GlassButton
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="p-2"
                                >
                                    {isFullscreen ? (
                                        <Minimize2 className="w-4 h-4" />
                                    ) : (
                                        <Maximize2 className="w-4 h-4" />
                                    )}
                                </GlassButton>
                            </div>
                        )}
                    </div>

                    {/* Indicators */}
                    {showIndicators && needsNavigation && (
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between text-sm text-white/80">
                                <span>
                                    {currentIndex + 1} / {Math.ceil(totalItems / slidesToScroll)}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span>Slide {currentIndex + 1}</span>
                                    <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-300"
                                            style={{
                                                width: `${((currentIndex + 1) / Math.ceil(totalItems / slidesToScroll)) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Dots Navigation */}
                    {showDots && needsNavigation && (
                        <div className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                                {Array.from({ length: Math.ceil(totalItems / slidesToScroll) }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index * slidesToScroll)}
                                        className={cn(
                                            'w-3 h-3 rounded-full transition-all duration-200',
                                            Math.floor(currentIndex / slidesToScroll) === index
                                                ? 'bg-primary scale-125'
                                                : 'bg-white/40 hover:bg-white/60'
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Item Info */}
                    {(carouselItems[currentIndex] as any)?.title && (
                        <div className="px-6 py-4 border-t border-white/10">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {(carouselItems[currentIndex] as any).title}
                                </h3>
                                {(carouselItems[currentIndex] as any)?.description && (
                                    <p className="text-sm text-white/70">
                                        {(carouselItems[currentIndex] as any).description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

// Thumbnail Carousel Variant
export interface GlassThumbnailCarouselProps extends Omit<GlassCarouselProps, 'slidesToShow'> {
    /**
     * Show thumbnails
     */
    showThumbnails?: boolean;
    /**
     * Thumbnail size
     */
    thumbnailSize?: 'sm' | 'md' | 'lg';
    /**
     * Thumbnail position
     */
    thumbnailPosition?: 'bottom' | 'left' | 'right';
}

export const GlassThumbnailCarousel: React.FC<GlassThumbnailCarouselProps> = ({
    showThumbnails = true,
    thumbnailSize = 'sm',
    thumbnailPosition = 'bottom',
    items = [],
    children,
    ...props
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const thumbnailItems = children
        ? Children.toArray(children).map((child, index) => ({
            id: `thumb-${index}`,
            content: child as ReactNode
        }))
        : items;

    const thumbnailSizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-20 h-20',
        lg: 'w-24 h-24'
    };

    if (!showThumbnails) {
        return <GlassCarousel {...props} />;
    }

    return (
        <div className={cn(
            'flex gap-4',
            thumbnailPosition === 'bottom' && 'flex-col',
            thumbnailPosition === 'left' && 'flex-row-reverse',
            thumbnailPosition === 'right' && 'flex-row'
        )}>
            {/* Main Carousel */}
            <div className="flex-1">
                <GlassCarousel
                    {...props}
                    items={thumbnailItems}
                    onSlideChange={setSelectedIndex}
                />
            </div>

            {/* Thumbnails */}
            <div className={cn(
                'flex gap-2 overflow-x-auto',
                thumbnailPosition === 'bottom' && 'flex-row justify-center',
                thumbnailPosition === 'left' && 'flex-col',
                thumbnailPosition === 'right' && 'flex-col'
            )}>
                {thumbnailItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            'flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200',
                            thumbnailSizeClasses[thumbnailSize],
                            selectedIndex === index
                                ? 'border-primary scale-105 shadow-lg'
                                : 'border-white/20 hover:border-white/40 hover:scale-102'
                        )}
                    >
                        {(item as any).image ? (
                            <img
                                src={(item as any).image}
                                alt={(item as any).title || `Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-white/10 flex items-center justify-center">
                                <span className="text-xs text-white/60">{index + 1}</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GlassCarousel;
