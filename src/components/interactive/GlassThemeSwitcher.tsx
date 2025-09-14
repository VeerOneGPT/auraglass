'use client';

import { cn } from '../../lib/utilsComprehensive';
import {
    Check,
    Eye,
    Monitor,
    Moon,
    Palette,
    Save,
    Settings,
    Sun
} from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Motion } from '../../primitives';
import { GlassButton } from '../button';
import { CardContent, CardHeader, CardTitle, GlassCard } from '../card';

export interface ThemeOption {
    id: string;
    name: string;
    preview: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
    };
    colors: Record<string, string>;
}

export interface GlassThemeSwitcherProps {
    /**
     * Current theme
     */
    currentTheme?: string;
    /**
     * Available themes
     */
    themes: ThemeOption[];
    /**
     * Enable system theme detection
     */
    enableSystemTheme?: boolean;
    /**
     * Show theme preview
     */
    showPreview?: boolean;
    /**
     * Show custom theme option
     */
    showCustomOption?: boolean;
    /**
     * Compact mode
     */
    compact?: boolean;
    /**
     * Theme change handler
     */
    onThemeChange?: (themeId: string) => void;
    /**
     * Custom theme save handler
     */
    onCustomThemeSave?: (colors: Record<string, string>) => void;
    /**
     * Custom className
     */
    className?: string;
}

/**
 * GlassThemeSwitcher component
 * Theme switching interface with preview and customization
 */
export const GlassThemeSwitcher: React.FC<GlassThemeSwitcherProps> = ({
    currentTheme = 'light',
    themes,
    enableSystemTheme = true,
    showPreview = true,
    showCustomOption = false,
    compact = false,
    onThemeChange,
    onCustomThemeSave,
    className,
    ...props
}) => {
    const [selectedTheme, setSelectedTheme] = useState(currentTheme);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [customColors, setCustomColors] = useState<Record<string, string>>({
        primary: '#3b82f6',
        secondary: '#64748b',
        background: '#ffffff',
        text: '#000000'
    });

    // System theme options
    const systemThemes = [
        { id: 'light', name: 'Light', icon: Sun, preview: { primary: '#3b82f6', secondary: '#64748b', background: '#ffffff', text: '#000000' } },
        { id: 'dark', name: 'Dark', icon: Moon, preview: { primary: '#60a5fa', secondary: '#94a3b8', background: '#0f172a', text: '#ffffff' } },
        ...(enableSystemTheme ? [{ id: 'system', name: 'System', icon: Monitor, preview: { primary: '#8b5cf6', secondary: '#64748b', background: '#f8fafc', text: '#1e293b' } }] : [])
    ];

    // Handle theme selection
    const handleThemeSelect = useCallback((themeId: string) => {
        setSelectedTheme(themeId);
        onThemeChange?.(themeId);
    }, [onThemeChange]);

    // Handle custom color change
    const handleCustomColorChange = useCallback((colorKey: string, value: string) => {
        setCustomColors(prev => ({
            ...prev,
            [colorKey]: value
        }));
    }, []);

    // Save custom theme
    const handleSaveCustomTheme = useCallback(() => {
        onCustomThemeSave?.(customColors);
        setShowCustomizer(false);
    }, [customColors, onCustomThemeSave]);

    // Get theme preview style
    const getPreviewStyle = useCallback((preview: any) => ({
        backgroundColor: preview.background,
        color: preview.text,
        '--preview-primary': preview.primary,
        '--preview-secondary': preview.secondary
    } as React.CSSProperties), []);

    return (
        <Motion preset="fadeIn" className="glass-glass-glass-w-full">
            <GlassCard className={cn('overflow-hidden', className)} {...props}>
                <CardHeader className="pb-3">
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                        <CardTitle className="glass-glass-glass-text-primary glass-glass-glass-text-lg glass-glass-glass-font-semibold glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                            <Palette className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                            Theme
                        </CardTitle>

                        {!compact && showCustomOption && (
                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={(e) => setShowCustomizer(!showCustomizer)}
                                className="glass-glass-glass-p-2"
                            >
                                <Settings className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                            </GlassButton>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    {/* System Themes */}
                    <div className={cn(
                        'grid glass-gap-3 mb-6',
                        compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    )}>
                        {systemThemes.map((theme) => {
                            const IconComponent = theme.icon;
                            const isSelected = selectedTheme === theme.id;

                            return (
                                <Motion
                                    key={theme.id}
                                    preset="scaleIn"
                                    className={cn(
                                        'relative glass-p-4 glass-radius-lg cursor-pointer transition-all duration-200',
                                        'hover:scale-[1.02] hover:shadow-lg',
                                        isSelected
                                            ? 'ring-2 ring-primary bg-primary/20'
                                            : 'ring-1 ring-white/10 bg-white/5 hover:ring-white/30'
                                    )}
                                    onClick={(e) => handleThemeSelect(theme.id)}
                                >
                                    {/* Preview */}
                                    {showPreview && (
                                        <div
                                            className="glass-glass-glass-w-full glass-glass-glass-h-16 glass-radius-md glass-glass-glass-mb-3 ring-1 ring-white/10"
                                            style={getPreviewStyle(theme.preview)}
                                        >
                                            <div className="glass-glass-glass-p-2 glass-glass-glass-gap-1">
                                                <div
                                                    className="glass-glass-glass-h-2 glass-radius-md"
                                                    style={{ backgroundColor: 'var(--preview-primary)' }}
                                                />
                                                <div
                                                    className="glass-glass-glass-h-1 glass-radius-md"
                                                    style={{ backgroundColor: 'var(--preview-secondary)' }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Theme Info */}
                                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                                        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                            <IconComponent className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                                            <span className="glass-glass-glass-font-medium glass-glass-glass-text-sm">{theme.name}</span>
                                        </div>

                                        {isSelected && (
                                            <Check className="glass-glass-glass-w-4 glass-glass-glass-h-4 glass-glass-glass-text-primary" />
                                        )}
                                    </div>
                                </Motion>
                            );
                        })}
                    </div>

                    {/* Custom Themes */}
                    {themes.length > 0 && (
                        <>
                            <div className="glass-glass-glass-mb-3">
                                <h4 className="glass-glass-glass-text-primary/80 glass-glass-glass-text-sm glass-glass-glass-font-medium">Custom Themes</h4>
                            </div>

                            <div className={cn(
                                'grid glass-gap-3',
                                compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                            )}>
                                {themes.map((theme) => {
                                    const isSelected = selectedTheme === theme.id;

                                    return (
                                        <Motion
                                            key={theme.id}
                                            preset="scaleIn"
                                            className={cn(
                                                'relative glass-p-4 glass-radius-lg cursor-pointer transition-all duration-200',
                                                'hover:scale-[1.02] hover:shadow-lg',
                                                isSelected
                                                    ? 'ring-2 ring-primary bg-primary/20'
                                                    : 'ring-1 ring-white/10 bg-white/5 hover:ring-white/30'
                                            )}
                                            onClick={(e) => handleThemeSelect(theme.id)}
                                        >
                                            {/* Preview */}
                                            {showPreview && (
                                                <div
                                                    className="glass-glass-glass-w-full glass-glass-glass-h-16 glass-radius-md glass-glass-glass-mb-3 glass-glass-glass-border glass-glass-glass-border-white/20"
                                                    style={getPreviewStyle(theme.preview)}
                                                >
                                                    <div className="glass-glass-glass-p-2 glass-glass-glass-gap-1">
                                                        <div
                                                            className="glass-glass-glass-h-2 glass-radius-md"
                                                            style={{ backgroundColor: theme.preview.primary }}
                                                        />
                                                        <div
                                                            className="glass-glass-glass-h-1 glass-radius-md"
                                                            style={{ backgroundColor: theme.preview.secondary }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Theme Info */}
                                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                                                <span className="glass-glass-glass-font-medium glass-glass-glass-text-sm">{theme.name}</span>
                                                {isSelected && (
                                                    <Check className="glass-glass-glass-w-4 glass-glass-glass-h-4 glass-glass-glass-text-primary" />
                                                )}
                                            </div>
                                        </Motion>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* Custom Theme Customizer */}
                    {showCustomizer && (
                        <Motion preset="slideDown" className="mt-6 glass-glass-glass-p-4 glass-surface-subtle/5 glass-radius-lg">
                            <div className="glass-glass-glass-gap-4">
                                <h4 className="glass-glass-glass-text-primary glass-glass-glass-font-medium glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                                    <Eye className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                                    Customize Theme
                                </h4>

                                {/* Color Pickers */}
                                <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-4">
                                    {Object.entries(customColors).map(([key, value]) => (
                                        <div key={key} className="glass-glass-glass-gap-2">
                                            <label className="glass-glass-glass-text-primary/80 glass-glass-glass-text-sm glass-glass-glass-capitalize">
                                                {key}
                                            </label>
                                            <div className="glass-glass-glass-flex glass-glass-glass-gap-2">
                                                <input
                                                    type="color"
                                                    value={value}
                                                    onChange={(e) => handleCustomColorChange(key, e.target.value)}
                                                    className="glass-glass-glass-w-10 glass-glass-glass-h-8 glass-radius-md ring-1 ring-white/10 glass-glass-glass-cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={value}
                                                    onChange={(e) => handleCustomColorChange(key, e.target.value)}
                                                    className="glass-glass-glass-flex-1 glass-glass-glass-px-3 glass-glass-glass-py-1 glass-surface-subtle/10 ring-1 ring-white/10 glass-radius-md glass-glass-glass-text-primary glass-glass-glass-text-sm focus:outline-none focus:ring-white/30"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Preview */}
                                <div
                                    className="glass-glass-glass-w-full glass-glass-glass-h-20 glass-radius-md ring-1 ring-white/10"
                                    style={{
                                        backgroundColor: customColors.background,
                                        color: customColors.text
                                    }}
                                >
                                    <div className="glass-glass-glass-p-3 glass-glass-glass-gap-2">
                                        <div
                                            className="glass-glass-glass-h-3 glass-radius-md"
                                            style={{ backgroundColor: customColors.primary }}
                                        />
                                        <div
                                            className="glass-glass-glass-h-2 glass-radius-md"
                                            style={{ backgroundColor: customColors.secondary }}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="glass-glass-glass-flex glass-glass-glass-gap-2">
                                    <GlassButton
                                        variant="primary"
                                        size="sm"
                                        onClick={handleSaveCustomTheme}
                                        className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2"
                                    >
                                        <Save className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                                        Save Theme
                                    </GlassButton>

                                    <GlassButton
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => setShowCustomizer(false)}
                                    >
                                        Cancel
                                    </GlassButton>
                                </div>
                            </div>
                        </Motion>
                    )}
                </CardContent>
            </GlassCard>
        </Motion>
    );
};

export default GlassThemeSwitcher;
