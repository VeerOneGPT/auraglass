'use client';

import { cn } from '@/design-system/utilsCore';
import {
    Activity,
    ArrowDownIcon,
    ArrowUpIcon,
    BarChart3,
    DollarSign,
    Minus,
    Target,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import React from 'react';
import { Motion } from '../../primitives';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface GlassStatCardProps {
    /**
     * Statistic title/label
     */
    title: string;
    /**
     * Main statistic value
     */
    value: string | number;
    /**
     * Statistic unit (e.g., '$', '%', 'users')
     */
    unit?: string;
    /**
     * Statistic description/subtitle
     */
    description?: string;
    /**
     * Icon to display
     */
    icon?: React.ReactNode;
    /**
     * Statistic type for automatic icon
     */
    type?: 'revenue' | 'users' | 'conversion' | 'performance' | 'growth' | 'target' | 'activity' | 'analytics' | 'custom';
    /**
     * Color variant for the card
     */
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Layout variant
     */
    layout?: 'horizontal' | 'vertical' | 'compact';
    /**
     * Trend information
     */
    trend?: {
        value: number;
        label: string;
        direction: 'up' | 'down' | 'neutral';
    };
    /**
     * Previous period value for comparison
     */
    previousValue?: string | number;
    /**
     * Additional stats to display
     */
    additionalStats?: Array<{
        label: string;
        value: string | number;
        change?: number;
    }>;
    /**
     * Show sparkline or mini chart
     */
    showSparkline?: boolean;
    /**
     * Sparkline data (simplified)
     */
    sparklineData?: number[];
    /**
     * Progress value (0-100)
     */
    progress?: number;
    /**
     * Loading state
     */
    loading?: boolean;
    /**
     * Click handler
     */
    onClick?: () => void;
    /**
     * Custom className
     */
    className?: string;
}

/**
 * GlassStatCard component
 * A glassmorphism statistics card with trend indicators and additional metrics
 */
export const GlassStatCard: React.FC<GlassStatCardProps> = ({
    title,
    value,
    unit = '',
    description,
    icon,
    type = 'custom',
    variant = 'default',
    size = 'md',
    layout = 'vertical',
    trend,
    previousValue,
    additionalStats,
    showSparkline = false,
    sparklineData = [],
    progress,
    loading = false,
    onClick,
    className,
    ...props
}) => {
    // Size configurations
    const sizeConfigs = {
        sm: {
            cardClass: 'p-4',
            titleClass: 'text-sm font-medium',
            valueClass: 'text-xl font-bold',
            iconSize: 'w-6 h-6',
            sparklineHeight: 'h-6',
        },
        md: {
            cardClass: 'p-6',
            titleClass: 'text-base font-medium',
            valueClass: 'text-2xl font-bold',
            iconSize: 'w-8 h-8',
            sparklineHeight: 'h-8',
        },
        lg: {
            cardClass: 'p-8',
            titleClass: 'text-lg font-semibold',
            valueClass: 'text-3xl font-bold',
            iconSize: 'w-10 h-10',
            sparklineHeight: 'h-10',
        },
        xl: {
            cardClass: 'p-10',
            titleClass: 'text-xl font-semibold',
            valueClass: 'text-4xl font-bold',
            iconSize: 'w-12 h-12',
            sparklineHeight: 'h-12',
        },
    };

    // Get automatic icon based on type
    const getTypeIcon = () => {
        switch (type) {
            case 'revenue': return <DollarSign className={sizeConfigs[size].iconSize} />;
            case 'users': return <Users className={sizeConfigs[size].iconSize} />;
            case 'conversion': return <Target className={sizeConfigs[size].iconSize} />;
            case 'performance': return <Activity className={sizeConfigs[size].iconSize} />;
            case 'growth': return <TrendingUp className={sizeConfigs[size].iconSize} />;
            case 'target': return <Target className={sizeConfigs[size].iconSize} />;
            case 'activity': return <Zap className={sizeConfigs[size].iconSize} />;
            case 'analytics': return <BarChart3 className={sizeConfigs[size].iconSize} />;
            default: return null;
        }
    };

    // Variant color configurations
    const variantConfigs = {
        default: {
            iconColor: 'text-white/70',
            valueColor: 'text-white',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            sparklineColor: 'text-white/60',
        },
        success: {
            iconColor: 'text-green-400',
            valueColor: 'text-green-200',
            trendUpColor: 'text-green-300',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            sparklineColor: 'text-green-400',
        },
        warning: {
            iconColor: 'text-yellow-400',
            valueColor: 'text-yellow-200',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-300',
            sparklineColor: 'text-yellow-400',
        },
        error: {
            iconColor: 'text-red-400',
            valueColor: 'text-red-200',
            trendUpColor: 'text-red-400',
            trendDownColor: 'text-red-300',
            trendNeutralColor: 'text-yellow-400',
            sparklineColor: 'text-red-400',
        },
        info: {
            iconColor: 'text-blue-400',
            valueColor: 'text-blue-200',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            sparklineColor: 'text-blue-400',
        },
        primary: {
            iconColor: 'text-primary',
            valueColor: 'text-primary-foreground',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            sparklineColor: 'text-primary',
        },
    };

    const config = sizeConfigs?.[size];
    const variantConfig = variantConfigs?.[variant];
    const displayIcon = icon || getTypeIcon();

    // Generate sparkline path
    const generateSparklinePath = (data: number[]) => {
        if ((data?.length || 0) === 0) return '';

        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;
        const height = parseInt(config.sparklineHeight.replace('h-', '')) * 4; // Convert to pixels

        let path = '';
        data?.forEach((value, index) => {
            const x = (index / ((data?.length || 0) - 1)) * 100;
            const y = height - ((value - min) / range) * height;

            if (index === 0) {
                path += `M ${x} ${y}`;
            } else {
                path += ` L ${x} ${y}`;
            }
        });

        return path;
    };

    // Loading skeleton
    if (loading) {
        return (
            <GlassCard className={cn('animate-pulse', config.cardClass, className)}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="h-4 bg-white/20 rounded w-24"></div>
                        <div className="w-8 h-8 bg-white/20 rounded"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-8 bg-white/20 rounded w-32"></div>
                        <div className="h-4 bg-white/20 rounded w-20"></div>
                    </div>
                    {showSparkline && (
                        <div className={cn('bg-white/10 rounded', config.sparklineHeight)}></div>
                    )}
                </div>
            </GlassCard>
        );
    }

    return (
        <Motion preset="fadeIn" className="w-full glass-stat-card">
            <GlassCard
                variant={variant === 'default' ? 'default' : 'elevated'}
                elevation={2}
                hoverable={!!onClick}
                clickable={!!onClick}
                onClick={onClick}
                className={cn(
                    config.cardClass,
                    'group relative overflow-hidden',
                    onClick && [
                        'cursor-pointer',
                        'hover:shadow-2xl hover:shadow-emerald-500/20',
                        'transition-all duration-500 ease-out'
                    ],
                    className
                )}
                {...props}
            >
                <CardHeader className="pb-2">
                    <div className={cn(
                        'flex items-start justify-between',
                        layout === 'horizontal' ? 'flex-row items-center' : 'flex-col'
                    )}>
                        <div className="flex-1">
                            <CardTitle className={cn(config.titleClass, 'text-white/90 flex items-center gap-2')}>
                                {displayIcon && (
                                    <span className={cn(config.iconSize, variantConfig.iconColor)}>
                                        {displayIcon}
                                    </span>
                                )}
                                {title}
                            </CardTitle>
                            {description && (
                                <p className="text-sm text-white/60 mt-1">{description}</p>
                            )}
                        </div>

                        {/* Trend indicator */}
                        {trend && (
                            <div className="flex items-center gap-1 mt-2">
                                {trend.direction === 'up' && <ArrowUpIcon className={cn('w-4 h-4', variantConfig.trendUpColor)} />}
                                {trend.direction === 'down' && <ArrowDownIcon className={cn('w-4 h-4', variantConfig.trendDownColor)} />}
                                {trend.direction === 'neutral' && <Minus className={cn('w-4 h-4', variantConfig.trendNeutralColor)} />}
                                <span className={cn('text-sm font-medium',
                                    trend.direction === 'up' ? variantConfig.trendUpColor :
                                        trend.direction === 'down' ? variantConfig.trendDownColor :
                                            variantConfig.trendNeutralColor
                                )}>
                                    {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
                                </span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    <div className={cn(
                        'flex items-baseline gap-2 mb-4',
                        layout === 'horizontal' ? 'justify-start' : 'justify-center'
                    )}>
                        <span className={cn(config.valueClass, variantConfig.valueColor)}>
                            {value}
                        </span>
                        {unit && (
                            <span className="text-lg text-white/70 font-medium">
                                {unit}
                            </span>
                        )}
                    </div>

                    {/* Sparkline */}
                    {showSparkline && (sparklineData?.length || 0) > 0 && (
                        <div className="mb-4">
                            <svg
                                width="100%"
                                height={config.sparklineHeight.replace('h-', '')}
                                className="overflow-visible"
                            >
                                <path
                                    d={generateSparklinePath(sparklineData)}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className={cn('opacity-60', variantConfig.sparklineColor)}
                                />
                            </svg>
                        </div>
                    )}

                    {/* Progress bar */}
                    {progress !== undefined && (
                        <div className="mb-4">
                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <Motion
                                    preset="slideRight"
                                    className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-white/60">Progress</span>
                                <span className="text-xs text-white/60">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    )}

                    {/* Previous value comparison */}
                    {previousValue && (
                        <div className="mb-4 p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/70">Previous period</span>
                                <span className="text-sm font-medium text-white">{previousValue}{unit}</span>
                            </div>
                        </div>
                    )}

                    {/* Additional stats */}
                    {additionalStats && (additionalStats?.length || 0) > 0 && (
                        <div className="space-y-3">
                            {additionalStats.map((stat, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-white/70">{stat.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-white">{stat.value}</span>
                                        {stat.change !== undefined && (
                                            <span className={cn(
                                                'text-xs font-medium',
                                                stat.change > 0 ? 'text-green-400' :
                                                    stat.change < 0 ? 'text-red-400' : 'text-yellow-400'
                                            )}>
                                                {stat.change > 0 ? '+' : ''}{stat.change}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

// Stat Grid Component
export interface GlassStatGridProps {
    stats: Array<Omit<GlassStatCardProps, 'size'>>;
    columns?: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const GlassStatGrid: React.FC<GlassStatGridProps> = ({
    stats,
    columns = 3,
    size = 'md',
    className
}) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return (
        <div className={cn('grid gap-6', gridCols?.[columns as keyof typeof gridCols], className)}>
            {stats.map((stat, index) => (
                <GlassStatCard
                    key={stat.title}
                    {...stat}
                    size={size}
                />
            ))}
        </div>
    );
};

export default GlassStatCard;
