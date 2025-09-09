'use client';

import { cn } from '@/design-system/utilsCore';
import React, { useMemo, useState } from 'react';
import { Motion } from '../../primitives';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface AreaDataPoint {
    x: number | string;
    y: number;
    label?: string;
}

export interface AreaSeries {
    id: string;
    name: string;
    data: AreaDataPoint[];
    color?: string;
    strokeWidth?: number;
    fillOpacity?: number;
}

export interface GlassAreaChartProps {
    /**
     * Chart title
     */
    title?: string;
    /**
     * Chart data series
     */
    series: AreaSeries[];
    /**
     * Chart width
     */
    width?: number;
    /**
     * Chart height
     */
    height?: number;
    /**
     * Show grid lines
     */
    showGrid?: boolean;
    /**
     * Show data points
     */
    showPoints?: boolean;
    /**
     * Show legend
     */
    showLegend?: boolean;
    /**
     * X-axis label
     */
    xAxisLabel?: string;
    /**
     * Y-axis label
     */
    yAxisLabel?: string;
    /**
     * Custom colors for series
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
     * Format function for Y-axis values
     */
    formatYValue?: (value: number) => string;
    /**
     * Format function for X-axis values
     */
    formatXValue?: (value: number | string) => string;
    /**
     * Fill opacity for areas
     */
    fillOpacity?: number;
    /**
     * Show stacked areas
     */
    stacked?: boolean;
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
 * GlassAreaChart component
 * A glassmorphism area chart with multiple series support and smooth area fills
 */
export const GlassAreaChart: React.FC<GlassAreaChartProps> = ({
    title,
    series = [],
    width = 600,
    height = 300,
    showGrid = true,
    showPoints = false,
    showLegend = true,
    xAxisLabel,
    yAxisLabel,
    colors = [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
        '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6b7280'
    ],
    animationDuration = 1200,
    showTooltips = true,
    formatYValue = (value) => value.toString(),
    formatXValue = (value) => value.toString(),
    fillOpacity = 0.6,
    stacked = false,
    className,
    loading = false,
    ...props
}) => {
    const [hoveredPoint, setHoveredPoint] = useState<{
        seriesId: string;
        index: number;
        x: number;
        y: number;
        values: number[];
    } | null>(null);

    const [hoveredSeriesId, setHoveredSeriesId] = useState<string | null>(null);

    // Chart dimensions with padding
    const padding = { top: 20, right: 60, bottom: 60, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Process data for chart
    const processedData = useMemo(() => {
        if (!series || !Array.isArray(series) || series.length === 0) {
            return { scaledSeries: [], xLabels: [], yLabels: [] };
        }

        // Find min/max values across all series
        const allPoints = series.flatMap(s => s.data);
        const xValues = allPoints.map(p => typeof p.x === 'number' ? p.x : 0);
        const yValues = allPoints.map(p => p.y);

        const xMin = Math.min(...xValues);
        const xMax = Math.max(...xValues);
        let yMin = Math.min(...yValues);
        let yMax = Math.max(...yValues);

        // For stacked charts, calculate cumulative values
        let stackedSeries = series;
        let stackedData: Array<Array<{ seriesId: string; x: number | string; y: number; originalY: number }>> | undefined;

        if (stacked && series.length > 1) {
            // Create stacked data by accumulating values at each x point
            const xPoints = new Set(allPoints.map(p => p.x));
            stackedData = Array.from(xPoints).map(x => {
                let cumulativeY = 0;
                return series.map(s => {
                    const point = s.data?.find(p => p.x === x);
                    const y = point ? point.y : 0;
                    cumulativeY += y;
                    return {
                        seriesId: s.id,
                        x,
                        y: cumulativeY,
                        originalY: y
                    };
                });
            });

            // Calculate new min/max for stacked chart
            yMin = 0;
            yMax = Math.max(...stackedData!.flat().map(p => p.y));

            // Transform series data for stacked display
            stackedSeries = series.map((s, index) => ({
                ...s,
                data: stackedData!.map(stackPoint => ({
                    x: stackPoint[index].x,
                    y: stackPoint[index].y,
                    label: s.data?.find(p => p.x === stackPoint[index].x)?.label
                }))
            }));
        }

        // Add some padding to Y axis
        const yRange = yMax - yMin;
        const yPadding = yRange * 0.1;
        const yMinPadded = Math.max(0, yMin - yPadding);
        const yMaxPadded = yMax + yPadding;

        // Scale functions
        const scaleX = (x: number) => ((x - xMin) / (xMax - xMin)) * chartWidth;
        const scaleY = (y: number) => chartHeight - ((y - yMinPadded) / (yMaxPadded - yMinPadded)) * chartHeight;

        // Process each series
        const scaledSeries = stackedSeries.map((s, seriesIndex) => {
            const points = s.data?.map((point, pointIndex) => ({
                ...point,
                scaledX: padding.left + scaleX(typeof point.x === 'number' ? point.x : pointIndex),
                scaledY: padding.top + scaleY(point.y),
                originalY: stacked && stackedData ? (stackedData.find(sd => sd[seriesIndex].x === point.x)?.[seriesIndex].originalY || point.y) : point.y
            }));

            // Generate area path
            let areaPath = '';
            if ((points?.length || 0) > 0) {
                // Start from bottom-left
                areaPath = `M ${points[0].scaledX} ${padding.top + chartHeight}`;

                // Draw to first point
                areaPath += ` L ${points[0].scaledX} ${points[0].scaledY}`;

                // Draw through all points
                for (let i = 1; i < (points?.length || 0); i++) {
                    areaPath += ` L ${points[i].scaledX} ${points[i].scaledY}`;
                }

                // Draw back to bottom-right and close
                areaPath += ` L ${points[(points?.length || 0) - 1].scaledX} ${padding.top + chartHeight} Z`;
            }

            return {
                ...s,
                color: s.color || colors[seriesIndex % (colors?.length || 0)],
                points,
                areaPath
            };
        });

        // Generate axis labels
        const xLabels = scaledSeries[0]?.points.map((point, index) => ({
            x: point.scaledX,
            y: height - padding.bottom + 20,
            label: formatXValue(point.x)
        })) || [];

        const yLabels = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const value = yMinPadded + (yMaxPadded - yMinPadded) * ratio;
            return {
                x: padding.left - 10,
                y: padding.top + chartHeight - (chartHeight * ratio) + 4,
                label: formatYValue(value)
            };
        });

        return { scaledSeries, xLabels, yLabels };
    }, [series, width, height, padding, chartWidth, chartHeight, formatYValue, formatXValue, colors, stacked]);

    // Generate path for line
    const generatePath = (points: any[]) => {
        if ((points?.length || 0) === 0) return '';

        let path = `M ${points[0].scaledX} ${points[0].scaledY}`;
        for (let i = 1; i < (points?.length || 0); i++) {
            path += ` L ${points[i].scaledX} ${points[i].scaledY}`;
        }
        return path;
    };

    // Handle point hover
    const handlePointHover = (seriesId: string, pointIndex: number, x: number, y: number, _event: React.MouseEvent) => {
        if (showTooltips) {
            const values = processedData.scaledSeries.map(s => s.points[pointIndex]?.originalY || 0);
            setHoveredPoint({ seriesId, index: pointIndex, x, y, values });
        }
    };

    const handlePointLeave = () => {
        setHoveredPoint(null);
    };

    // Loading skeleton
    if (loading) {
        return (
            <GlassCard className={cn('p-6', className)}>
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-white/20 rounded w-48"></div>
                    <div className="h-64 bg-white/10 rounded"></div>
                    <div className="flex justify-center gap-4">
                        <div className="h-4 bg-white/20 rounded w-20"></div>
                        <div className="h-4 bg-white/20 rounded w-20"></div>
                        <div className="h-4 bg-white/20 rounded w-20"></div>
                    </div>
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
                    <div className="relative">
                        <svg width={width} height={height} className="overflow-visible">
                            {/* Grid lines */}
                            {showGrid && (
                                <g className="opacity-20">
                                    {/* Horizontal grid lines */}
                                    {processedData.yLabels.map((label, index) => (
                                        <line
                                            key={`h-grid-${index}`}
                                            x1={padding.left}
                                            y1={label.y - 4}
                                            x2={width - padding.right}
                                            y2={label.y - 4}
                                            stroke="currentColor"
                                            strokeWidth="1"
                                            className="text-white/30"
                                        />
                                    ))}
                                    {/* Vertical grid lines */}
                                    {processedData.xLabels.map((label, index) => (
                                        <line
                                            key={`v-grid-${index}`}
                                            x1={label.x}
                                            y1={padding.top}
                                            x2={label.x}
                                            y2={height - padding.bottom}
                                            stroke="currentColor"
                                            strokeWidth="1"
                                            className="text-white/30"
                                        />
                                    ))}
                                </g>
                            )}

                            {/* Area fills (drawn first, behind lines) */}
                            {processedData.scaledSeries.map((s, seriesIndex) => (
                                <Motion
                                    key={`${s.id}-area`}
                                    preset="fadeIn"
                                    delay={seriesIndex * 200}
                                    className="relative"
                                >
                                    <defs>
                                        <linearGradient id={`area-gradient-${s.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor={s.color} stopOpacity={fillOpacity} />
                                            <stop offset="100%" stopColor={s.color} stopOpacity={fillOpacity * 0.3} />
                                        </linearGradient>
                                    </defs>

                                    <path
                                        d={s.areaPath}
                                        fill={`url(#area-gradient-${s.id})`}
                                        className="transition-opacity duration-300 hover:opacity-80"
                                        style={{
                                            animation: `areaFill ${animationDuration}ms ease-out ${seriesIndex * 200}ms both`,
                                            opacity: hoveredSeriesId && hoveredSeriesId !== s.id ? 0.35 : 1,
                                        }}
                                    />
                                </Motion>
                            ))}

                            {/* Chart lines */}
                            {processedData.scaledSeries.map((s, seriesIndex) => (
                                <Motion
                                    key={`${s.id}-line`}
                                    preset="slideUp"
                                    delay={seriesIndex * 100 + 300}
                                    className="relative"
                                >
                                    {/* Line */}
                                    <path
                                        d={generatePath(s.points)}
                                        fill="none"
                                        stroke={s.color}
                                        strokeWidth={s.strokeWidth || 2}
                                        className="drop-shadow-sm"
                                        style={{
                                            animation: `drawLine ${animationDuration}ms ease-out ${seriesIndex * 100 + 300}ms both`,
                                            opacity: hoveredSeriesId && hoveredSeriesId !== s.id ? 0.35 : 1,
                                        }}
                                    />

                                    {/* Data points */}
                                    {showPoints && s.points.map((point, pointIndex) => (
                                        <circle
                                            key={`${s.id}-point-${pointIndex}`}
                                            cx={point.scaledX}
                                            cy={point.scaledY}
                                            r="4"
                                            fill={s.color}
                                            stroke="rgba(255, 255, 255, 0.8)"
                                            strokeWidth="2"
                                            className="cursor-pointer hover:r-6 transition-all duration-200"
                                            onMouseEnter={(e) => handlePointHover(s.id, pointIndex, point.scaledX, point.scaledY, e)}
                                            onMouseLeave={handlePointLeave}
                                            style={{
                                                animation: `fadeInPoint 300ms ease-out ${animationDuration + seriesIndex * 100 + pointIndex * 50 + 300}ms both`,
                                                opacity: hoveredSeriesId && hoveredSeriesId !== s.id ? 0.35 : 1,
                                            }}
                                        />
                                    ))}
                                </Motion>
                            ))}

                            {/* Crosshair */}
                            {hoveredPoint && (
                                <g className="pointer-events-none">
                                    <line
                                        x1={hoveredPoint.x}
                                        y1={padding.top}
                                        x2={hoveredPoint.x}
                                        y2={height - padding.bottom}
                                        stroke="white"
                                        strokeOpacity={0.25}
                                        strokeDasharray="4 4"
                                    />
                                    <line
                                        x1={padding.left}
                                        y1={hoveredPoint.y}
                                        x2={width - padding.right}
                                        y2={hoveredPoint.y}
                                        stroke="white"
                                        strokeOpacity={0.25}
                                        strokeDasharray="4 4"
                                    />
                                    <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="8" fill="none" stroke="white" strokeOpacity={0.35} />
                                </g>
                            )}

                            {/* X-axis */}
                            <line
                                x1={padding.left}
                                y1={height - padding.bottom}
                                x2={width - padding.right}
                                y2={height - padding.bottom}
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-white/50"
                            />

                            {/* Y-axis */}
                            <line
                                x1={padding.left}
                                y1={padding.top}
                                x2={padding.left}
                                y2={height - padding.bottom}
                                stroke="currentColor"
                                strokeWidth="1"
                                className="text-white/50"
                            />

                            {/* Axis labels */}
                            {processedData.xLabels.map((label, index) => (
                                <text
                                    key={`x-label-${index}`}
                                    x={label.x}
                                    y={label.y}
                                    textAnchor="middle"
                                    className="text-xs fill-white/70"
                                    style={{ fontSize: '10px' }}
                                >
                                    {label.label}
                                </text>
                            ))}

                            {processedData.yLabels.map((label, index) => (
                                <text
                                    key={`y-label-${index}`}
                                    x={label.x}
                                    y={label.y}
                                    textAnchor="end"
                                    className="text-xs fill-white/70"
                                    style={{ fontSize: '10px' }}
                                >
                                    {label.label}
                                </text>
                            ))}

                            {/* Axis titles */}
                            {xAxisLabel && (
                                <text
                                    x={width / 2}
                                    y={height - 10}
                                    textAnchor="middle"
                                    className="text-sm fill-white/80 font-medium"
                                >
                                    {xAxisLabel}
                                </text>
                            )}

                            {yAxisLabel && (
                                <text
                                    x={15}
                                    y={height / 2}
                                    textAnchor="middle"
                                    transform={`rotate(-90, 15, ${height / 2})`}
                                    className="text-sm fill-white/80 font-medium"
                                >
                                    {yAxisLabel}
                                </text>
                            )}
                        </svg>

                        {/* Tooltip */}
                        {hoveredPoint && (
                            <Motion preset="fadeIn" className="absolute z-10">
                                <div
                                    className={cn('absolute rounded-xl p-3 shadow-xl', 'bg-black/70 backdrop-blur-md ring-1 ring-white/10 glass-radial-reveal glass-lift')}
                                    style={{
                                        left: hoveredPoint.x + 10,
                                        top: hoveredPoint.y - 10,
                                        transform: hoveredPoint.x > width / 2 ? 'translateX(-100%)' : 'none'
                                    }}
                                >
                                    <div className="text-white text-sm space-y-2">
                                        <div className="font-medium">
                                            {processedData.scaledSeries[0]?.points[hoveredPoint.index] &&
                                                formatXValue(processedData.scaledSeries[0].points[hoveredPoint.index].x)}
                                        </div>
                                        {processedData.scaledSeries.map((s, index) => (
                                            <div key={s.id} className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
                                                <span className="text-white/80">{s.name}: {formatYValue(hoveredPoint.values?.[index] || 0)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Motion>
                        )}
                    </div>

                    {/* Legend */}
                    {showLegend && (processedData.scaledSeries?.length || 0) > 0 && (
                        <div className="flex flex-wrap justify-center gap-4 mt-6">
                            {processedData.scaledSeries.map((s) => (
                                <div
                                    key={s.id}
                                    className={cn('flex items-center gap-2 px-2 py-1 rounded-md transition-all duration-200 hover:-translate-y-0.5',
                                        hoveredSeriesId && hoveredSeriesId !== s.id ? 'opacity-50' : 'opacity-100'
                                    )}
                                    onMouseEnter={() => setHoveredSeriesId(s.id)}
                                    onMouseLeave={() => setHoveredSeriesId(null)}
                                >
                                    <div className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
                                    <span className="text-sm text-white/80">{s.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

export default GlassAreaChart;
