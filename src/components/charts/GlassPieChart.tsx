'use client';

import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import { Motion } from '../../primitives/motion/Motion';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface PieDataPoint {
    label: string;
    value: number;
    color?: string;
}

export interface GlassPieChartProps {
    /**
     * Chart title
     */
    title?: string;
    /**
     * Chart data
     */
    data: PieDataPoint[];
    /**
     * Chart width and height
     */
    size?: number;
    /**
     * Inner radius for donut chart (0 for pie chart)
     */
    innerRadius?: number;
    /**
     * Show legend
     */
    showLegend?: boolean;
    /**
     * Legend position
     */
    legendPosition?: 'right' | 'bottom' | 'top';
    /**
     * Show data labels on segments
     */
    showLabels?: boolean;
    /**
     * Show percentage labels
     */
    showPercentages?: boolean;
    /**
     * Custom colors for segments
     */
    colors?: string[];
    /**
     * Animation duration
     */
    animationDuration?: number;
    /**
     * Show tooltips on hover
     */
    showTooltips?: boolean;
    /**
     * Format function for values
     */
    formatValue?: (value: number) => string;
    /**
     * Format function for percentages
     */
    formatPercentage?: (percentage: number) => string;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Loading state
     */
    loading?: boolean;
}

/**
 * GlassPieChart component
 * A glassmorphism pie/donut chart with interactive segments and smooth animations
 */
export const GlassPieChart: React.FC<GlassPieChartProps> = ({
    title,
    data,
    size = 300,
    innerRadius = 0,
    showLegend = true,
    legendPosition = 'right',
    showLabels = false,
    showPercentages = true,
    colors = [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
        '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6b7280'
    ],
    animationDuration = 1000,
    showTooltips = true,
    formatValue = (value) => value.toString(),
    formatPercentage = (percentage) => `${Math.round(percentage)}%`,
    className,
    loading = false,
    ...props
}) => {
    const [hoveredSegment, setHoveredSegment] = useState<{
        index: number;
        x: number;
        y: number;
        label: string;
        value: number;
        percentage: number;
    } | null>(null);
    const [hoveredLegendIndex, setHoveredLegendIndex] = useState<number | null>(null);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - 40) / 2; // Padding around the chart
    const labelRadius = radius + 30; // Distance for labels

    // Process data for chart
    const processedData = useMemo(() => {
        if (!data.length) return { segments: [], total: 0 };

        const total = data.reduce((sum, item) => sum + item.value, 0);
        let currentAngle = -Math.PI / 2; // Start from top

        const segments = data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 2 * Math.PI;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;

            // Calculate path for segment
            const x1 = centerX + Math.cos(startAngle) * radius;
            const y1 = centerY + Math.sin(startAngle) * radius;
            const x2 = centerX + Math.cos(endAngle) * radius;
            const y2 = centerY + Math.sin(endAngle) * radius;

            const largeArcFlag = angle > Math.PI ? 1 : 0;

            let path = '';
            if (innerRadius > 0) {
                // Donut chart
                const innerX1 = centerX + Math.cos(startAngle) * innerRadius;
                const innerY1 = centerY + Math.sin(startAngle) * innerRadius;
                const innerX2 = centerX + Math.cos(endAngle) * innerRadius;
                const innerY2 = centerY + Math.sin(endAngle) * innerRadius;

                path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${innerX2} ${innerY2} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1} Z`;
            } else {
                // Pie chart
                path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            }

            // Calculate label position
            const labelAngle = startAngle + angle / 2;
            const labelX = centerX + Math.cos(labelAngle) * labelRadius;
            const labelY = centerY + Math.sin(labelAngle) * labelRadius;

            currentAngle = endAngle;

            return {
                ...item,
                path,
                percentage,
                startAngle,
                endAngle,
                labelX,
                labelY,
                color: item.color || colors[index % colors.length]
            };
        });

        return { segments, total };
    }, [data, centerX, centerY, radius, innerRadius, labelRadius, colors]);

    // Handle segment hover
    const handleSegmentHover = (segment: typeof processedData.segments[0], event: React.MouseEvent) => {
        if (showTooltips) {
            const rect = event.currentTarget.getBoundingClientRect();
            setHoveredSegment({
                index: processedData.segments.indexOf(segment),
                x: rect.left + rect.width / 2,
                y: rect.top,
                label: segment.label,
                value: segment.value,
                percentage: segment.percentage
            });
        }
    };

    const handleSegmentLeave = () => {
        setHoveredSegment(null);
    };

    // Calculate legend layout
    const legendItems = processedData.segments.map((segment, index) => ({
        ...segment,
        index
    }));

    // Loading skeleton
    if (loading) {
        return (
            <GlassCard className={cn('p-6', className)}>
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-white/20 rounded w-48"></div>
                    <div className="flex items-center justify-center">
                        <div className="w-64 h-64 bg-white/10 rounded-full"></div>
                    </div>
                    {showLegend && (
                        <div className="flex justify-center gap-4">
                            <div className="h-4 bg-white/20 rounded w-20"></div>
                            <div className="h-4 bg-white/20 rounded w-20"></div>
                            <div className="h-4 bg-white/20 rounded w-20"></div>
                        </div>
                    )}
                </div>
            </GlassCard>
        );
    }

    return (
        <Motion preset="fadeIn" className="w-full">
            <GlassCard className={cn('overflow-hidden', className)} {...props}>
                {title && (
                    <CardHeader>
                        <CardTitle className="text-white text-lg font-semibold">
                            {title}
                        </CardTitle>
                    </CardHeader>
                )}

                <CardContent className="p-4">
                    <div className={cn(
                        'flex',
                        legendPosition === 'right' ? 'flex-row' : 'flex-col',
                        'items-center gap-6'
                    )}>
                        {/* Chart */}
                        <div className="relative flex-shrink-0">
                            <svg width={size} height={size} className="overflow-visible">
                                {/* Segments */}
                                {processedData.segments.map((segment, index) => (
                                    <Motion
                                        key={`${segment.label}-${index}`}
                                        preset="scaleIn"
                                        delay={index * 100}
                                        className="relative"
                                    >
                                        <path
                                            d={segment.path}
                                            fill={segment.color}
                                            stroke="rgba(255, 255, 255, 0.2)"
                                            strokeWidth="1"
                                            className="cursor-pointer transition-all duration-200 hover:opacity-80"
                                            onMouseEnter={(e) => handleSegmentHover(segment, e)}
                                            onMouseLeave={handleSegmentLeave}
                                            style={{
                                                animation: `pieSegment ${animationDuration}ms ease-out ${index * 100}ms both`,
                                                opacity: hoveredLegendIndex !== null && hoveredLegendIndex !== index ? 0.35 : 1,
                                            }}
                                        />

                                        {/* Segment labels */}
                                        {showLabels && (
                                            <text
                                                x={segment.labelX}
                                                y={segment.labelY}
                                                textAnchor={segment.labelX > centerX ? 'start' : 'end'}
                                                className="text-xs fill-white/80 font-medium"
                                                style={{ fontSize: '11px' }}
                                            >
                                                {segment.label}
                                                {showPercentages && (
                                                    <tspan x={segment.labelX} dy="14" className="text-xs fill-white/60">
                                                        {formatPercentage(segment.percentage)}
                                                    </tspan>
                                                )}
                                            </text>
                                        )}
                                    </Motion>
                                ))}

                                {/* Center text for donut chart */}
                                {innerRadius > 0 && (
                                    <g>
                                        <circle
                                            cx={centerX}
                                            cy={centerY}
                                            r={innerRadius}
                                            fill="rgba(255, 255, 255, 0.1)"
                                            stroke="rgba(255, 255, 255, 0.2)"
                                            strokeWidth="1"
                                        />
                                        <text
                                            x={centerX}
                                            y={centerY - 5}
                                            textAnchor="middle"
                                            className="text-sm fill-white/80 font-medium"
                                        >
                                            Total
                                        </text>
                                        <text
                                            x={centerX}
                                            y={centerY + 15}
                                            textAnchor="middle"
                                            className="text-lg fill-white font-semibold"
                                        >
                                            {formatValue(processedData.total)}
                                        </text>
                                    </g>
                                )}
                            </svg>

                            {/* Tooltip */}
                            {hoveredSegment && (
                                <Motion preset="fadeIn" className="absolute z-10">
                                    <div
                                        className={cn('absolute rounded-xl p-3 shadow-xl', 'bg-black/70 backdrop-blur-xl ring-1 ring-white/10 glass-radial-reveal glass-lift')}
                                        style={{
                                            left: hoveredSegment.x + 10,
                                            top: hoveredSegment.y - 10,
                                            transform: hoveredSegment.x > size / 2 ? 'translateX(-100%)' : 'none'
                                        }}
                                    >
                                        <div className="text-white text-sm">
                                            <div className="font-medium">{hoveredSegment.label}</div>
                                            <div className="text-white/80">
                                                {formatValue(hoveredSegment.value)} ({formatPercentage(hoveredSegment.percentage)})
                                            </div>
                                        </div>
                                    </div>
                                </Motion>
                            )}
                        </div>

                        {/* Legend */}
                        {showLegend && legendItems.length > 0 && (
                            <div className={cn(
                                'flex flex-wrap gap-3',
                                legendPosition === 'right' ? 'flex-col' : 'justify-center'
                            )}>
                                {legendItems.map((item) => (
                                    <Motion
                                        key={item.label}
                                        preset="slideUp"
                                        delay={item.index * 50}
                                        className={cn('flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-200 hover:-translate-y-0.5',
                                          hoveredLegendIndex !== null && hoveredLegendIndex !== item.index ? 'opacity-50' : 'opacity-100'
                                        )}
                                        onMouseEnter={() => setHoveredLegendIndex(item.index)}
                                        onMouseLeave={() => setHoveredLegendIndex(null)}
                                    >
                                        <div
                                            className="w-3 h-3 rounded"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <div className="text-sm text-white/80">
                                            <span className="font-medium">{item.label}</span>
                                            <span className="ml-2 text-white/60">
                                                {formatValue(item.value)} ({formatPercentage(item.percentage)})
                                            </span>
                                        </div>
                                    </Motion>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

// Donut Chart variant
export interface GlassDonutChartProps extends Omit<GlassPieChartProps, 'innerRadius'> {
    /**
     * Inner radius as percentage of outer radius (0-1)
     */
    innerRadiusRatio?: number;
}

export const GlassDonutChart: React.FC<GlassDonutChartProps> = ({
    size = 300,
    innerRadiusRatio = 0.6,
    ...props
}) => {
    const innerRadius = (size - 40) / 2 * innerRadiusRatio;

    return (
        <GlassPieChart
            {...props}
            size={size}
            innerRadius={innerRadius}
        />
    );
};

export default GlassPieChart;
