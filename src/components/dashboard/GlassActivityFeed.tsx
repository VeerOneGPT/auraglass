'use client';

import { cn } from '../../lib/utilsComprehensive';
import {
    Activity,
    AlertCircle,
    CheckCircle,
    Clock,
    Filter,
    Info,
    MoreHorizontal,
    Settings,
    User,
    XCircle
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Motion } from '../../primitives';
import { GlassButton } from '../button';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';
import { GlassBadge } from '../data-display';

export interface ActivityItem {
    id: string;
    type: 'user' | 'system' | 'notification' | 'error' | 'success' | 'warning' | 'info';
    title: string;
    description?: string;
    timestamp: Date;
    user?: {
        name: string;
        avatar?: string;
        id: string;
    };
    metadata?: Record<string, any>;
    icon?: React.ReactNode;
    color?: string;
    category?: string;
    tags?: string[];
    actions?: Array<{
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    }>;
}

export interface GlassActivityFeedProps {
    /**
     * Activity items to display
     */
    activities: ActivityItem[];
    /**
     * Feed title
     */
    title?: string;
    /**
     * Feed subtitle
     */
    subtitle?: string;
    /**
     * Maximum number of activities to show
     */
    maxItems?: number;
    /**
     * Show filter options
     */
    showFilters?: boolean;
    /**
     * Show activity categories
     */
    showCategories?: boolean;
    /**
     * Show timestamps
     */
    showTimestamps?: boolean;
    /**
     * Show user avatars
     */
    showAvatars?: boolean;
    /**
     * Compact mode
     */
    compact?: boolean;
    /**
     * Loading state
     */
    loading?: boolean;
    /**
     * Empty state message
     */
    emptyMessage?: string;
    /**
     * Filter activities by type
     */
    filterBy?: string[];
    /**
     * Group activities by date
     */
    groupByDate?: boolean;
    /**
     * Show load more button
     */
    showLoadMore?: boolean;
    /**
     * Load more handler
     */
    onLoadMore?: () => void;
    /**
     * Activity click handler
     */
    onActivityClick?: (activity: ActivityItem) => void;
    /**
     * Custom className
     */
    className?: string;
}

/**
 * GlassActivityFeed component
 * A glassmorphism activity timeline with filtering and grouping
 */
export const GlassActivityFeed: React.FC<GlassActivityFeedProps> = ({
    activities,
    title = 'Activity Feed',
    subtitle,
    maxItems,
    showFilters = true,
    showCategories = true,
    showTimestamps = true,
    showAvatars = true,
    compact = false,
    loading = false,
    emptyMessage = 'No recent activity',
    filterBy = [],
    groupByDate = true,
    showLoadMore = false,
    onLoadMore,
    onActivityClick,
    className,
    ...props
}) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [visibleCount, setVisibleCount] = useState(maxItems || 10);

    // Get activity type icon and color
    const getActivityTypeConfig = (type: ActivityItem['type']) => {
        switch (type) {
            case 'user':
                return {
                    icon: User,
                    color: 'text-blue-400',
                    bgColor: 'bg-blue-500/20',
                    borderColor: 'border-blue-500/30'
                };
            case 'system':
                return {
                    icon: Settings,
                    color: 'text-purple-400',
                    bgColor: 'bg-purple-500/20',
                    borderColor: 'border-purple-500/30'
                };
            case 'notification':
                return {
                    icon: Info,
                    color: 'text-cyan-400',
                    bgColor: 'bg-cyan-500/20',
                    borderColor: 'border-cyan-500/30'
                };
            case 'error':
                return {
                    icon: XCircle,
                    color: 'text-red-400',
                    bgColor: 'bg-red-500/20',
                    borderColor: 'border-red-500/30'
                };
            case 'success':
                return {
                    icon: CheckCircle,
                    color: 'text-green-400',
                    bgColor: 'bg-green-500/20',
                    borderColor: 'border-green-500/30'
                };
            case 'warning':
                return {
                    icon: AlertCircle,
                    color: 'text-yellow-400',
                    bgColor: 'bg-yellow-500/20',
                    borderColor: 'border-yellow-500/30'
                };
            default:
                return {
                    icon: Activity,
                    color: 'glass-text-secondary',
                    bgColor: 'bg-gray-500/20',
                    borderColor: 'border-gray-500/30'
                };
        }
    };

    // Format timestamp
    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    // Group activities by date
    const groupedActivities = useMemo(() => {
        if (!groupByDate) return { 'All Activities': activities };

        const groups: Record<string, ActivityItem[]> = {};

        activities.forEach(activity => {
            const date = activity.timestamp.toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(activity);
        });

        return groups;
    }, [activities, groupByDate]);

    // Filter activities
    const filteredActivities = useMemo(() => {
        let filtered = activities;

        if (selectedFilter !== 'all') {
            filtered = filtered.filter(activity => activity.type === selectedFilter);
        }

            if (filterBy && filterBy.length > 0) {
            filtered = filtered.filter(activity => filterBy.includes(activity.type));
        }

        return filtered.slice(0, visibleCount);
    }, [activities, selectedFilter, filterBy, visibleCount]);

    // Get available filter options
    const filterOptions = useMemo(() => {
        const types = new Set(activities.map(activity => activity.type));
        return ['all', ...Array.from(types)];
    }, [activities]);

    // Handle load more
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + (maxItems || 10));
        onLoadMore?.();
    };

    // Loading skeleton
    if (loading) {
        return (
            <GlassCard className={cn('glass-p-6', className)}>
                <div className="animate-pulse glass-auto-gap glass-auto-gap-lg">
                    <div className="glass-glass-glass-h-6 glass-surface-subtle/20 glass-radius-md glass-glass-glass-w-48"></div>
                    <div className="glass-auto-gap glass-auto-gap-md">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="glass-glass-glass-flex glass-glass-glass-gap-3">
                                <div className="glass-glass-glass-w-8 glass-glass-glass-h-8 glass-surface-subtle/20 glass-radius-full glass-glass-glass-flex-shrink-0"></div>
                                <div className="glass-glass-glass-flex-1 glass-auto-gap glass-auto-gap-sm">
                                    <div className="glass-glass-glass-h-4 glass-surface-subtle/20 glass-radius-md glass-glass-glass-w-3-4"></div>
                                    <div className="glass-glass-glass-h-3 glass-surface-subtle/20 glass-radius-md glass-glass-glass-w-1-2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </GlassCard>
        );
    }

    return (
        <Motion preset="fadeIn" className="glass-glass-glass-w-full">
            <GlassCard className={cn('overflow-hidden', className)} {...props}>
                <CardHeader className="pb-4">
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                        <div>
                            <CardTitle className="glass-glass-glass-text-primary glass-glass-glass-text-xl glass-glass-glass-font-semibold">
                                {title}
                            </CardTitle>
                            {subtitle && (
                                <p className="glass-glass-glass-text-sm glass-glass-glass-text-primary/60 glass-mt-1">{subtitle}</p>
                            )}
                        </div>

                        {/* Filters */}
                        {showFilters && filterOptions.length > 1 && (
                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                <Filter className="glass-glass-glass-w-4 glass-glass-glass-h-4 glass-glass-glass-text-primary/60" />
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className="bg-glass-fill ring-1 ring-white/10 glass-radius-md glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-sm glass-glass-glass-text-primary focus:outline-none focus:ring-white/30"
                                >
                                    <option value="all">All Types</option>
                                    {filterOptions.slice(1).map(type => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    {filteredActivities.length === 0 ? (
                        <div className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-py-12">
                            <Activity className="glass-glass-glass-w-12 glass-glass-glass-h-12 glass-glass-glass-text-primary/40 glass-glass-glass-mb-4" />
                            <p className="glass-glass-glass-text-primary/60 glass-glass-glass-text-center">{emptyMessage}</p>
                        </div>
                    ) : (
                        <div className="glass-auto-gap glass-auto-gap-lg">
                            {groupByDate ? (
                                Object.entries(groupedActivities).map(([date, items]) => (
                                    <div key={date}>
                                        {groupByDate && items.length > 0 && (
                                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-glass-glass-mb-3">
                                                <div className="glass-glass-glass-h-px glass-surface-subtle/20 glass-glass-glass-flex-1"></div>
                                                <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/60 glass-glass-glass-font-medium glass-glass-glass-px-2 glass-glass-glass-py-1 glass-surface-subtle/10 glass-radius-md">
                                                    {new Date(date).toLocaleDateString(undefined, {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <div className="glass-glass-glass-h-px glass-surface-subtle/20 glass-glass-glass-flex-1"></div>
                                            </div>
                                        )}

                                        <div className="glass-auto-gap glass-auto-gap-md">
                                            {items
                                                .filter(activity => {
                                                    if (selectedFilter === 'all') return true;
                                                    return activity.type === selectedFilter;
                                                })
                                                .slice(0, visibleCount)
                                                .map((activity, index) => {
                                                    const config = getActivityTypeConfig(activity.type);
                                                    const IconComponent = config.icon;

                                                    return (
                                                        <div
                                                            key={activity.id}
                                                            className={cn(
                                                                'flex glass-gap-3 glass-p-3 glass-radius-lg border transition-all duration-200 animate-slide-in-up',
                                                                'hover:bg-white/5 cursor-pointer glass-foundation-complete backdrop-blur-md bg-transparent border-white/40 shadow-2xl',
                                                                config.bgColor,
                                                                config.borderColor,
                                                                compact && 'glass-p-2'
                                                            )}
                                                            style={{ 
                                                                animationDelay: `${Math.min(index, 15) * 50}ms`,
                                                                animationFillMode: 'both'
                                                            }}
                                                            onClick={(e) => onActivityClick?.(activity)}
                                                        >
                                                            {/* Activity Icon */}
                                                            <div className={cn(
                                                                'flex-shrink-0 w-8 h-8 glass-radius-full flex items-center justify-center',
                                                                config.bgColor,
                                                                compact && 'w-6 h-6'
                                                            )}>
                                                                {activity.icon ? (
                                                                    <span className="glass-glass-glass-w-4 glass-glass-glass-h-4">{activity.icon}</span>
                                                                ) : (
                                                                    <IconComponent className={cn('w-4 h-4', config.color, compact && 'w-3 h-3')} />
                                                                )}
                                                            </div>

                                                            {/* Content */}
                                                            <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                                                                <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-justify-between glass-glass-glass-gap-2 glass-glass-glass-min-glass-glass-w-0">
                                                                    <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                                                                        <p className={cn(
                                                                            'glass-text-primary font-medium truncate',
                                                                            compact ? 'glass-text-sm' : 'glass-text-base'
                                                                        )} title={activity.title}>
                                                                            {activity.title}
                                                                        </p>
                                                                        {activity.description && (
                                                                            <p className={cn(
                                                                                'glass-text-primary/70 glass-mt-1 line-clamp-2',
                                                                                compact ? 'glass-text-xs' : 'glass-text-sm'
                                                                            )} title={activity.description}>
                                                                                {activity.description}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {/* Actions */}
                                                                    {activity.actions && activity.actions.length > 0 && (
                                                                        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-1">
                                                                            {activity.actions.map((action, actionIndex) => (
                                                                                <GlassButton
                                                                                    key={actionIndex}
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        action.onClick();
                                                                                    }}
                                                                                    className="glass-glass-glass-p-1"
                                                                                >
                                                                                    {action.icon || <MoreHorizontal className="glass-glass-glass-w-3 glass-glass-glass-h-3" />}
                                                                                </GlassButton>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Metadata */}
                                                                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-mt-2">
                                                                    {activity.user && showAvatars && (
                                                                        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                                                            {activity.user.avatar ? (
                                                                                <img
                                                                                    src={activity.user.avatar}
                                                                                    alt={activity.user.name}
                                                                                    className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-radius-full"
                                                                                />
                                                                            ) : (
                                                                                <div className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-radius-full glass-surface-subtle/20 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">
                                                                                    <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/80 glass-glass-glass-font-medium">
                                                                                        {activity.user.name.charAt(0).toUpperCase()}
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                            <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/60">
                                                                                {activity.user.name}
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {showTimestamps && (
                                                                        <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/50 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-1">
                                                                            <Clock className="glass-glass-glass-w-3 glass-glass-glass-h-3" />
                                                                            {formatTimestamp(activity.timestamp)}
                                                                        </span>
                                                                    )}

                                                                    {activity.category && showCategories && (
                                                                        <GlassBadge
                                                                            variant="secondary"
                                                                            size="sm"
                                                                            className="glass-glass-glass-truncate max-w-[100px]"
                                                                            title={activity.category}
                                                                        >
                                                                            {activity.category.length > 12 ? `${activity.category.slice(0, 12)}...` : activity.category}
                                                                        </GlassBadge>
                                                                    )}

                                                                    {activity.tags && activity.tags.length > 0 && (
                                                                        <div className="glass-glass-glass-flex glass-glass-glass-flex-wrap glass-glass-glass-gap-1 glass-glass-glass-items-center">
                                                                            {activity.tags.slice(0, compact ? 1 : 2).map((tag, tagIndex) => (
                                                                                <GlassBadge
                                                                                    key={tagIndex}
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    className="glass-glass-glass-truncate max-w-[80px]"
                                                                                    title={tag}
                                                                                >
                                                                                    {tag.length > 8 ? `${tag.slice(0, 8)}...` : tag}
                                                                                </GlassBadge>
                                                                            ))}
                                                                            {activity.tags.length > (compact ? 1 : 2) && (
                                                                                <GlassBadge variant="secondary" size="sm" className="opacity-60">
                                                                                    +{activity.tags.length - (compact ? 1 : 2)}
                                                                                </GlassBadge>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Ungrouped view
                                <div className="glass-auto-gap glass-auto-gap-md">
                                    {filteredActivities.map((activity, index) => {
                                        const config = getActivityTypeConfig(activity.type);
                                        const IconComponent = config.icon;

                                        return (
                                            <Motion
                                                key={activity.id}
                                                preset="slideUp"
                                                delay={index * 50}
                                                className={cn(
                                                    'flex glass-gap-3 glass-p-3 glass-radius-lg border transition-all duration-200',
                                                    'hover:bg-white/5 cursor-pointer',
                                                    config.bgColor,
                                                    config.borderColor,
                                                    compact && 'glass-p-2'
                                                )}
                                                onClick={(e) => onActivityClick?.(activity)}
                                            >
                                                {/* Activity Icon */}
                                                <div className={cn(
                                                    'flex-shrink-0 w-8 h-8 glass-radius-full flex items-center justify-center',
                                                    config.bgColor,
                                                    compact && 'w-6 h-6'
                                                )}>
                                                    {activity.icon ? (
                                                        <span className="glass-glass-glass-w-4 glass-glass-glass-h-4">{activity.icon}</span>
                                                    ) : (
                                                        <IconComponent className={cn('w-4 h-4', config.color, compact && 'w-3 h-3')} />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                                                    <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-justify-between glass-glass-glass-gap-2 glass-glass-glass-min-glass-glass-w-0">
                                                        <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                                                            <p className={cn(
                                                                'glass-text-primary font-medium truncate',
                                                                compact ? 'glass-text-sm' : 'glass-text-base'
                                                            )} title={activity.title}>
                                                                {activity.title}
                                                            </p>
                                                            {activity.description && (
                                                                <p className={cn(
                                                                    'glass-text-primary/70 glass-mt-1 line-clamp-2',
                                                                    compact ? 'glass-text-xs' : 'glass-text-sm'
                                                                )} title={activity.description}>
                                                                    {activity.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Metadata */}
                                                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-mt-2">
                                                        {activity.user && showAvatars && (
                                                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                                                {activity.user.avatar ? (
                                                                    <img
                                                                        src={activity.user.avatar}
                                                                        alt={activity.user.name}
                                                                        className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-radius-full"
                                                                    />
                                                                ) : (
                                                                    <div className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-radius-full glass-surface-subtle/20 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">
                                                                        <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/80 glass-glass-glass-font-medium">
                                                                            {activity.user.name.charAt(0).toUpperCase()}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/60">
                                                                    {activity.user.name}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {showTimestamps && (
                                                            <span className="glass-glass-glass-text-xs glass-glass-glass-text-primary/50 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-1">
                                                                <Clock className="glass-glass-glass-w-3 glass-glass-glass-h-3" />
                                                                {formatTimestamp(activity.timestamp)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Motion>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Load More */}
                            {showLoadMore && visibleCount < activities.length && (
                                <div className="glass-glass-glass-flex glass-glass-glass-justify-center mt-6">
                                    <GlassButton variant="outline" onClick={handleLoadMore}>
                                        Load More Activities
                                    </GlassButton>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

export default GlassActivityFeed;
