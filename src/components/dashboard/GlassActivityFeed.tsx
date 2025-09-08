'use client';

import { cn } from '@/lib/utilsComprehensive';
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
                    color: 'text-gray-400',
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

        if (filterBy.length > 0) {
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
            <GlassCard className={cn('p-6', className)}>
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-white/20 rounded w-48"></div>
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                                    <div className="h-3 bg-white/20 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </GlassCard>
        );
    }

    return (
        <Motion preset="fadeIn" className="w-full">
            <GlassCard className={cn('overflow-hidden', className)} {...props}>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-white text-xl font-semibold">
                                {title}
                            </CardTitle>
                            {subtitle && (
                                <p className="text-sm text-white/60 mt-1">{subtitle}</p>
                            )}
                        </div>

                        {/* Filters */}
                        {showFilters && filterOptions.length > 1 && (
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-white/60" />
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className="bg-glass-fill ring-1 ring-white/10 rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-white/30"
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
                        <div className="flex flex-col items-center justify-center py-12">
                            <Activity className="w-12 h-12 text-white/40 mb-4" />
                            <p className="text-white/60 text-center">{emptyMessage}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {groupByDate ? (
                                Object.entries(groupedActivities).map(([date, items]) => (
                                    <div key={date}>
                                        {groupByDate && items.length > 0 && (
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="h-px bg-white/20 flex-1"></div>
                                                <span className="text-xs text-white/60 font-medium px-2 py-1 bg-white/10 rounded">
                                                    {new Date(date).toLocaleDateString(undefined, {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <div className="h-px bg-white/20 flex-1"></div>
                                            </div>
                                        )}

                                        <div className="space-y-3">
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
                                                        <Motion
                                                            key={activity.id}
                                                            preset="slideUp"
                                                            delay={index * 50}
                                                            className={cn(
                                                                'flex gap-3 p-3 rounded-lg border transition-all duration-200',
                                                                'hover:bg-white/5 cursor-pointer',
                                                                config.bgColor,
                                                                config.borderColor,
                                                                compact && 'p-2'
                                                            )}
                                                            onClick={() => onActivityClick?.(activity)}
                                                        >
                                                            {/* Activity Icon */}
                                                            <div className={cn(
                                                                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                                                                config.bgColor,
                                                                compact && 'w-6 h-6'
                                                            )}>
                                                                {activity.icon ? (
                                                                    <span className="w-4 h-4">{activity.icon}</span>
                                                                ) : (
                                                                    <IconComponent className={cn('w-4 h-4', config.color, compact && 'w-3 h-3')} />
                                                                )}
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2 min-w-0">
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className={cn(
                                                                            'text-white font-medium truncate',
                                                                            compact ? 'text-sm' : 'text-base'
                                                                        )} title={activity.title}>
                                                                            {activity.title}
                                                                        </p>
                                                                        {activity.description && (
                                                                            <p className={cn(
                                                                                'text-white/70 mt-1 line-clamp-2',
                                                                                compact ? 'text-xs' : 'text-sm'
                                                                            )} title={activity.description}>
                                                                                {activity.description}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {/* Actions */}
                                                                    {activity.actions && activity.actions.length > 0 && (
                                                                        <div className="flex items-center gap-1">
                                                                            {activity.actions.map((action, actionIndex) => (
                                                                                <GlassButton
                                                                                    key={actionIndex}
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        action.onClick();
                                                                                    }}
                                                                                    className="p-1"
                                                                                >
                                                                                    {action.icon || <MoreHorizontal className="w-3 h-3" />}
                                                                                </GlassButton>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Metadata */}
                                                                <div className="flex items-center gap-3 mt-2">
                                                                    {activity.user && showAvatars && (
                                                                        <div className="flex items-center gap-2">
                                                                            {activity.user.avatar ? (
                                                                                <img
                                                                                    src={activity.user.avatar}
                                                                                    alt={activity.user.name}
                                                                                    className="w-5 h-5 rounded-full"
                                                                                />
                                                                            ) : (
                                                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                                                    <span className="text-xs text-white/80 font-medium">
                                                                                        {activity.user.name.charAt(0).toUpperCase()}
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                            <span className="text-xs text-white/60">
                                                                                {activity.user.name}
                                                                            </span>
                                                                        </div>
                                                                    )}

                                                                    {showTimestamps && (
                                                                        <span className="text-xs text-white/50 flex items-center gap-1">
                                                                            <Clock className="w-3 h-3" />
                                                                            {formatTimestamp(activity.timestamp)}
                                                                        </span>
                                                                    )}

                                                                    {activity.category && showCategories && (
                                                                        <GlassBadge
                                                                            variant="secondary"
                                                                            size="sm"
                                                                            className="truncate max-w-[100px]"
                                                                            title={activity.category}
                                                                        >
                                                                            {activity.category.length > 12 ? `${activity.category.slice(0, 12)}...` : activity.category}
                                                                        </GlassBadge>
                                                                    )}

                                                                    {activity.tags && activity.tags.length > 0 && (
                                                                        <div className="flex flex-wrap gap-1 items-center">
                                                                            {activity.tags.slice(0, compact ? 1 : 2).map((tag, tagIndex) => (
                                                                                <GlassBadge
                                                                                    key={tagIndex}
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    className="truncate max-w-[80px]"
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
                                                        </Motion>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Ungrouped view
                                <div className="space-y-3">
                                    {filteredActivities.map((activity, index) => {
                                        const config = getActivityTypeConfig(activity.type);
                                        const IconComponent = config.icon;

                                        return (
                                            <Motion
                                                key={activity.id}
                                                preset="slideUp"
                                                delay={index * 50}
                                                className={cn(
                                                    'flex gap-3 p-3 rounded-lg border transition-all duration-200',
                                                    'hover:bg-white/5 cursor-pointer',
                                                    config.bgColor,
                                                    config.borderColor,
                                                    compact && 'p-2'
                                                )}
                                                onClick={() => onActivityClick?.(activity)}
                                            >
                                                {/* Activity Icon */}
                                                <div className={cn(
                                                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                                                    config.bgColor,
                                                    compact && 'w-6 h-6'
                                                )}>
                                                    {activity.icon ? (
                                                        <span className="w-4 h-4">{activity.icon}</span>
                                                    ) : (
                                                        <IconComponent className={cn('w-4 h-4', config.color, compact && 'w-3 h-3')} />
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2 min-w-0">
                                                        <div className="flex-1 min-w-0">
                                                            <p className={cn(
                                                                'text-white font-medium truncate',
                                                                compact ? 'text-sm' : 'text-base'
                                                            )} title={activity.title}>
                                                                {activity.title}
                                                            </p>
                                                            {activity.description && (
                                                                <p className={cn(
                                                                    'text-white/70 mt-1 line-clamp-2',
                                                                    compact ? 'text-xs' : 'text-sm'
                                                                )} title={activity.description}>
                                                                    {activity.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Metadata */}
                                                    <div className="flex items-center gap-3 mt-2">
                                                        {activity.user && showAvatars && (
                                                            <div className="flex items-center gap-2">
                                                                {activity.user.avatar ? (
                                                                    <img
                                                                        src={activity.user.avatar}
                                                                        alt={activity.user.name}
                                                                        className="w-5 h-5 rounded-full"
                                                                    />
                                                                ) : (
                                                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                                        <span className="text-xs text-white/80 font-medium">
                                                                            {activity.user.name.charAt(0).toUpperCase()}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <span className="text-xs text-white/60">
                                                                    {activity.user.name}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {showTimestamps && (
                                                            <span className="text-xs text-white/50 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
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
                                <div className="flex justify-center mt-6">
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
