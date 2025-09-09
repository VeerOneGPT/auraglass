'use client';

import { cn } from '@/design-system/utilsCore';
import { ArrowDownIcon, ArrowUpIcon, Minus } from 'lucide-react';
import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { Motion } from '../../primitives';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface GlassKPICardProps {
    /**
     * KPI title/label
     */
    title: string;
    /**
     * Main KPI value
     */
    value: string | number;
    /**
     * KPI unit (e.g., '$', '%', 'users')
     */
    unit?: string;
    /**
     * Previous value for comparison
     */
    previousValue?: string | number;
    /**
     * Trend direction
     */
    trend?: 'up' | 'down' | 'neutral' | 'none';
    /**
     * Trend percentage change
     */
    trendPercentage?: number;
    /**
     * KPI description/subtitle
     */
    description?: string;
    /**
     * Icon to display
     */
    icon?: React.ReactNode;
    /**
     * Color variant for the card
     */
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Show trend indicator
     */
    showTrend?: boolean;
    /**
     * Custom trend label
     */
    trendLabel?: string;
    /**
     * Format function for the value
     */
    formatValue?: (value: string | number) => string;
    /**
     * Additional content to display
     */
    children?: React.ReactNode;
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
 * GlassKPICard component
 * A glassmorphism KPI card for displaying key performance indicators
 */
export const GlassKPICard: React.FC<GlassKPICardProps> = ({
    title,
    value,
    unit = '',
    previousValue,
    trend = 'none',
    trendPercentage,
    description,
    icon,
    variant = 'default',
    size = 'md',
    showTrend = true,
    trendLabel,
    formatValue,
    children,
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
            valueClass: 'text-2xl font-bold',
            iconSize: 'w-6 h-6',
            trendIconSize: 'w-4 h-4',
            trendTextSize: 'text-xs',
        },
        md: {
            cardClass: 'p-6',
            titleClass: 'text-base font-medium',
            valueClass: 'text-3xl font-bold',
            iconSize: 'w-8 h-8',
            trendIconSize: 'w-5 h-5',
            trendTextSize: 'text-sm',
        },
        lg: {
            cardClass: 'p-8',
            titleClass: 'text-lg font-semibold',
            valueClass: 'text-4xl font-bold',
            iconSize: 'w-10 h-10',
            trendIconSize: 'w-6 h-6',
            trendTextSize: 'text-base',
        },
        xl: {
            cardClass: 'p-10',
            titleClass: 'text-xl font-semibold',
            valueClass: 'text-5xl font-bold',
            iconSize: 'w-12 h-12',
            trendIconSize: 'w-7 h-7',
            trendTextSize: 'text-lg',
        },
    };

    const config = sizeConfigs[size];

    // Variant color configurations
    const variantConfigs = {
        default: {
            iconColor: 'text-white/70',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            valueColor: 'text-white',
        },
        success: {
            iconColor: 'text-green-400',
            trendUpColor: 'text-green-300',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            valueColor: 'text-green-200',
        },
        warning: {
            iconColor: 'text-yellow-400',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-300',
            valueColor: 'text-yellow-200',
        },
        error: {
            iconColor: 'text-red-400',
            trendUpColor: 'text-red-400',
            trendDownColor: 'text-red-300',
            trendNeutralColor: 'text-yellow-400',
            valueColor: 'text-red-200',
        },
        info: {
            iconColor: 'text-blue-400',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            valueColor: 'text-blue-200',
        },
        primary: {
            iconColor: 'text-primary',
            trendUpColor: 'text-green-400',
            trendDownColor: 'text-red-400',
            trendNeutralColor: 'text-yellow-400',
            valueColor: 'text-primary-foreground',
        },
    };

    const variantConfig = variantConfigs[variant];

    // Format the display value
    const displayValue = formatValue ? formatValue(value) : String(value);

    // Calculate trend information
    const getTrendInfo = () => {
        if (trend === 'none' || !showTrend) return null;

        let trendIcon;
        let trendColor;
        let trendText = '';

        switch (trend) {
            case 'up':
                trendIcon = <ArrowUpIcon className={cn(config.trendIconSize, variantConfig.trendUpColor)} />;
                trendColor = variantConfig.trendUpColor;
                break;
            case 'down':
                trendIcon = <ArrowDownIcon className={cn(config.trendIconSize, variantConfig.trendDownColor)} />;
                trendColor = variantConfig.trendDownColor;
                break;
            case 'neutral':
                trendIcon = <Minus className={cn(config.trendIconSize, variantConfig.trendNeutralColor)} />;
                trendColor = variantConfig.trendNeutralColor;
                break;
        }

        if (trendPercentage !== undefined) {
            trendText = `${trend === 'up' ? '+' : trend === 'down' ? '-' : ''}${Math.abs(trendPercentage)}%`;
        } else if (trendLabel) {
            trendText = trendLabel;
        }

        return { trendIcon, trendColor, trendText };
    };

    const trendInfo = getTrendInfo();

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
                </div>
            </GlassCard>
        );
    }

    return (
        <Motion preset="fadeIn" className="w-full glass-kpi-card">
            <GlassCard
                variant="elevated"
                elevation={'level2'}
                hoverable={!!onClick}
                clickable={!!onClick}
                onClick={onClick}
                className={cn(
                    config.cardClass,
                    'group relative overflow-hidden',
                    onClick && [
                        'cursor-pointer',
                        'hover:shadow-2xl hover:shadow-purple-500/20',
                        'transition-all duration-500 ease-out'
                    ],
                    className
                )}
                {...props}
            >
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className={cn(config.titleClass, 'text-white/90 flex items-center gap-2')}>
                            {icon && (
                                <div className={cn(
                                    'inline-flex items-center justify-center rounded-lg p-2 mr-3',
                                    'bg-gradient-to-br from-white/10 to-white/5 border border-white/20',
                                    'group-hover:from-white/15 group-hover:to-white/8',
                                    'group-hover:border-white/30 group-hover:shadow-lg',
                                    'group-hover:scale-110 group-hover:rotate-2',
                                    'transition-all duration-300 ease-out',
                                    variantConfig.iconColor
                                )}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <span className={cn(config.iconSize, 'relative z-10 transition-transform duration-300 group-hover:scale-110')}>
                                        {icon}
                                    </span>
                                </div>
                            )}
                            {title}
                        </CardTitle>
                        {trendInfo && trendInfo.trendIcon && (
                            <div className="flex items-center gap-1 trend-indicator">
                                <div className="p-1 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                                    <span data-icon className="transition-all duration-300">
                                        {trendInfo.trendIcon}
                                    </span>
                                </div>
                                {trendInfo.trendText && (
                                    <span className={cn(
                                        config.trendTextSize,
                                        trendInfo.trendColor,
                                        'font-medium transition-all duration-300',
                                        'group-hover:scale-105 group-hover:brightness-110'
                                    )}>
                                        {trendInfo.trendText}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                    {description && (
                        <p className="text-sm text-white/60 mt-1">{description}</p>
                    )}
                </CardHeader>

                <CardContent className="pt-0">
                    <div className="flex items-baseline gap-2 relative">
                        {/* Value with premium glow effect */}
                        <div className="relative premium-glow">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-cyan-400/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150" />
                            <span
                                data-value
                                className={cn(
                                    config.valueClass,
                                    variantConfig.valueColor,
                                    'relative z-10 font-bold tracking-tight',
                                    'group-hover:text-white transition-all duration-300',
                                    'drop-shadow-sm group-hover:drop-shadow-lg'
                                )}
                            >
                                {displayValue}
                            </span>
                        </div>

                        {unit && (
                            <span className={cn(
                                'text-lg text-white/70 font-medium',
                                'group-hover:text-white/90 transition-colors duration-300'
                            )}>
                                {unit}
                            </span>
                        )}
                    </div>

                    {previousValue && (
                        <div className="mt-2">
                            <span className="text-sm text-white/50">
                                Previous: {formatValue ? formatValue(previousValue) : String(previousValue)}{unit}
                            </span>
                        </div>
                    )}

                    {children && (
                        <div className="mt-4">
                            {children}
                        </div>
                    )}
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

// Compound component for KPI Card with built-in formatting
export interface KPIStat {
    label: string;
    value: number;
    unit?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendPercentage?: number;
}

export interface GlassKPIGridProps {
    kpis: KPIStat[];
    columns?: number;
    className?: string;
}

export const GlassKPIGrid: React.FC<GlassKPIGridProps> = ({
    kpis,
    columns = 3,
    className
}) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return (
        <div className={cn('grid gap-6', gridCols[columns as keyof typeof gridCols], className)}>
            {kpis.map((kpi, index) => (
                <GlassKPICard
                    key={kpi.label}
                    title={kpi.label}
                    value={kpi.value}
                    unit={kpi.unit}
                    trend={kpi.trend}
                    trendPercentage={kpi.trendPercentage}
                    size="md"
                />
            ))}
        </div>
    );
};

export default GlassKPICard;
