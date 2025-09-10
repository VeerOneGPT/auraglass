'use client';

import { cn } from '@/lib/utilsComprehensive';
import {
    Check,
    Copy,
    Download,
    Palette,
    RotateCcw,
    Shuffle,
    Upload
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Motion } from '../../primitives';
import { GlassButton } from '../button';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface GradientStop {
    color: string;
    position: number; // 0-100
}

export interface GradientPreset {
    id: string;
    name: string;
    type: 'linear' | 'radial' | 'conic';
    angle?: number; // For linear gradients
    stops: GradientStop[];
}

export interface GlassGradientPickerProps {
    /**
     * Current gradient
     */
    value?: string;
    /**
     * Gradient presets
     */
    presets?: GradientPreset[];
    /**
     * Enable custom gradient creation
     */
    enableCustom?: boolean;
    /**
     * Show gradient type selector
     */
    showTypeSelector?: boolean;
    /**
     * Show angle control for linear gradients
     */
    showAngleControl?: boolean;
    /**
     * Show color stops editor
     */
    showStopsEditor?: boolean;
    /**
     * Maximum number of color stops
     */
    maxStops?: number;
    /**
     * Gradient change handler
     */
    onChange?: (gradient: string, stops: GradientStop[], type: string, angle?: number) => void;
    /**
     * Preset selection handler
     */
    onPresetSelect?: (preset: GradientPreset) => void;
    /**
     * Custom className
     */
    className?: string;
}

/**
 * GlassGradientPicker component
 * Advanced gradient picker with presets and custom creation
 */
export const GlassGradientPicker: React.FC<GlassGradientPickerProps> = ({
    value,
    presets = [],
    enableCustom = true,
    showTypeSelector = true,
    showAngleControl = true,
    showStopsEditor = true,
    maxStops = 5,
    onChange,
    onPresetSelect,
    className,
    ...props
}) => {
    const [selectedType, setSelectedType] = useState<'linear' | 'radial' | 'conic'>('linear');
    const [angle, setAngle] = useState(45);
    const [stops, setStops] = useState<GradientStop[]>([
        { color: '#3b82f6', position: 0 },
        { color: '#8b5cf6', position: 100 }
    ]);
    const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    // Default presets
    const defaultPresets: GradientPreset[] = [
        {
            id: 'sunset',
            name: 'Sunset',
            type: 'linear',
            angle: 45,
            stops: [
                { color: '#ff6b6b', position: 0 },
                { color: '#ffa500', position: 50 },
                { color: '#ff1493', position: 100 }
            ]
        },
        {
            id: 'ocean',
            name: 'Ocean',
            type: 'linear',
            angle: 90,
            stops: [
                { color: '#0077be', position: 0 },
                { color: '#00a8cc', position: 50 },
                { color: '#90e0ef', position: 100 }
            ]
        },
        {
            id: 'forest',
            name: 'Forest',
            type: 'radial',
            stops: [
                { color: '#2d5016', position: 0 },
                { color: '#4a7c59', position: 70 },
                { color: '#90a955', position: 100 }
            ]
        },
        {
            id: 'fire',
            name: 'Fire',
            type: 'conic',
            stops: [
                { color: '#ff0000', position: 0 },
                { color: '#ff8000', position: 25 },
                { color: '#ffff00', position: 50 },
                { color: '#ff0000', position: 100 }
            ]
        }
    ];

    const allPresets = [...defaultPresets, ...presets];

    // Generate CSS gradient string
    const generateGradient = useCallback(() => {
        if (stops.length === 0) return 'transparent';

        const colorStops = stops
            .sort((a, b) => a.position - b.position)
            .map(stop => `${stop.color} ${stop.position}%`)
            .join(', ');

        switch (selectedType) {
            case 'linear':
                return `linear-gradient(${angle}deg, ${colorStops})`;
            case 'radial':
                return `radial-gradient(circle, ${colorStops})`;
            case 'conic':
                return `conic-gradient(from 0deg, ${colorStops})`;
            default:
                return `linear-gradient(45deg, ${colorStops})`;
        }
    }, [stops, selectedType, angle]);

    // Handle stop change
    const handleStopChange = useCallback((index: number, updates: Partial<GradientStop>) => {
        setStops(prev => prev.map((stop, i) =>
            i === index ? { ...stop, ...updates } : stop
        ));
    }, []);

    // Add new stop
    const handleAddStop = useCallback(() => {
        if (stops.length >= maxStops) return;

        const newStop: GradientStop = {
            color: '#ffffff',
            position: 50
        };
        setStops(prev => [...prev, newStop]);
        setSelectedStopIndex(stops.length);
    }, [stops.length, maxStops]);

    // Remove stop
    const handleRemoveStop = useCallback((index: number) => {
        if (stops.length <= 2) return; // Keep at least 2 stops

        setStops(prev => prev.filter((_, i) => i !== index));
        setSelectedStopIndex(null);
    }, [stops.length]);

    // Handle preset selection
    const handlePresetSelect = useCallback((preset: GradientPreset) => {
        setSelectedType(preset.type);
        if (preset.angle !== undefined) {
            setAngle(preset.angle);
        }
        setStops([...preset.stops]);
        setSelectedStopIndex(null);

        const gradient = generateGradient();
        onChange?.(gradient, preset.stops, preset.type, preset.angle);
        onPresetSelect?.(preset);
    }, [generateGradient, onChange, onPresetSelect]);

    // Generate random gradient
    const handleRandomGradient = useCallback(() => {
        const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
        const newStops = [
            { color: randomColor(), position: 0 },
            { color: randomColor(), position: 100 }
        ];

        if (Math.random() > 0.5) {
            newStops.push({ color: randomColor(), position: 50 });
        }

        setStops(newStops);
        setSelectedStopIndex(null);

        const gradient = generateGradient();
        onChange?.(gradient, newStops, selectedType, angle);
    }, [generateGradient, selectedType, angle, onChange]);

    // Copy gradient to clipboard
    const handleCopyGradient = useCallback(async () => {
        const gradient = generateGradient();
        try {
            await navigator.clipboard.writeText(gradient);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy gradient:', err);
        }
    }, [generateGradient]);

    // Reset to default
    const handleReset = useCallback(() => {
        setSelectedType('linear');
        setAngle(45);
        setStops([
            { color: '#3b82f6', position: 0 },
            { color: '#8b5cf6', position: 100 }
        ]);
        setSelectedStopIndex(null);
    }, []);

    const currentGradient = generateGradient();

    return (
        <Motion preset="fadeIn" className="w-full">
            <GlassCard className={cn('overflow-hidden', className)} {...props}>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="glass-text-primary glass-text-lg font-semibold flex items-center glass-gap-2">
                            <Palette className="w-5 h-5" />
                            Gradient Picker
                        </CardTitle>

                        <div className="flex glass-gap-2">
                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={handleRandomGradient}
                                className="glass-p-2"
                                title="Random Gradient"
                            >
                                <Shuffle className="w-4 h-4" />
                            </GlassButton>

                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={handleCopyGradient}
                                className="glass-p-2"
                                title="Copy Gradient"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </GlassButton>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-0 glass-auto-gap glass-auto-gap-2xl">
                    {/* Current Gradient Preview */}
                    <div className="glass-auto-gap glass-auto-gap-md">
                        <div
                            className="w-full h-32 glass-radius-lg border border-white/20"
                            style={{ background: currentGradient }}
                        />

                        <div className="flex items-center justify-between">
                            <code className="glass-text-xs glass-text-primary/60 bg-white/10 glass-px-2 glass-py-1 glass-radius-md font-mono truncate flex-1 glass-mr-2">
                                {currentGradient}
                            </code>

                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={handleReset}
                                className="glass-p-2"
                                title="Reset"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </GlassButton>
                        </div>
                    </div>

                    {/* Gradient Type Selector */}
                    {showTypeSelector && (
                        <div className="glass-auto-gap glass-auto-gap-md">
                            <h4 className="glass-text-primary/80 glass-text-sm font-medium">Type</h4>
                            <div className="flex glass-gap-2">
                                {(['linear', 'radial', 'conic'] as const).map((type) => (
                                    <GlassButton
                                        key={type}
                                        variant={selectedType === type ? "primary" : "ghost"}
                                        size="sm"
                                        onClick={(e) => setSelectedType(type)}
                                        className="capitalize"
                                    >
                                        {type}
                                    </GlassButton>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Angle Control for Linear */}
                    {showAngleControl && selectedType === 'linear' && (
                        <div className="glass-auto-gap glass-auto-gap-md">
                            <h4 className="glass-text-primary/80 glass-text-sm font-medium">Angle: {angle}°</h4>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={angle}
                                onChange={(e) => setAngle(Number(e.target.value))}
                                className="w-full h-2 bg-white/20 glass-radius-lg appearance-none cursor-pointer"
                            />
                        </div>
                    )}

                    {/* Color Stops Editor */}
                    {showStopsEditor && enableCustom && (
                        <div className="glass-auto-gap glass-auto-gap-md">
                            <div className="flex items-center justify-between">
                                <h4 className="glass-text-primary/80 glass-text-sm font-medium">Color Stops</h4>
                                {stops.length < maxStops && (
                                    <GlassButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleAddStop}
                                        className="glass-p-1"
                                    >
                                        <Upload className="w-4 h-4" />
                                    </GlassButton>
                                )}
                            </div>

                            {/* Stops List */}
                            <div className="glass-auto-gap glass-auto-gap-sm">
                                {stops.map((stop, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            'flex items-center glass-gap-3 glass-p-3 glass-radius-lg border transition-all',
                                            selectedStopIndex === index
                                                ? 'border-primary bg-primary/20'
                                                : 'border-white/20 bg-white/5'
                                        )}
                                        onClick={(e) => setSelectedStopIndex(index)}
                                    >
                                        <input
                                            type="color"
                                            value={stop.color}
                                            onChange={(e) => handleStopChange(index, { color: e.target.value })}
                                            className="w-8 h-8 glass-radius-md border border-white/20 cursor-pointer"
                                        />

                                        <div className="flex-1">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={stop.position}
                                                onChange={(e) => handleStopChange(index, { position: Number(e.target.value) })}
                                                className="w-full h-2 bg-white/20 glass-radius-lg appearance-none cursor-pointer"
                                            />
                                            <div className="glass-text-xs glass-text-primary/60 glass-mt-1">
                                                Position: {stop.position}%
                                            </div>
                                        </div>

                                        {stops.length > 2 && (
                                            <GlassButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => handleRemoveStop(index)}
                                                className="glass-p-1 text-red-400 hover:text-red-300"
                                            >
                                                <Download className="w-4 h-4" />
                                            </GlassButton>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Presets */}
                    {allPresets.length > 0 && (
                        <div className="glass-auto-gap glass-auto-gap-md">
                            <h4 className="glass-text-primary/80 glass-text-sm font-medium">Presets</h4>
                            <div className="grid grid-cols-2 glass-gap-3">
                                {allPresets.map((preset) => (
                                    <div
                                        key={preset.id}
                                        className="cursor-pointer group"
                                        onClick={(e) => handlePresetSelect(preset)}
                                    >
                                        <div
                                            className="w-full h-16 glass-radius-lg border border-white/20 group-hover:border-white/40 transition-all"
                                            style={{
                                                background: preset.stops.length > 0
                                                    ? `${preset.type}-gradient(${preset.angle || 0}deg, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                                                    : 'transparent'
                                            }}
                                        />
                                        <p className="glass-text-primary/80 glass-text-xs glass-mt-2 text-center group-hover:glass-text-primary transition-colors">
                                            {preset.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

export default GlassGradientPicker;
