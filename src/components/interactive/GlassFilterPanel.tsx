import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Filter, RotateCcw, Save, Search } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import { GlassButton } from '../button/GlassButton';
import { GlassCheckbox } from '../input/GlassCheckbox';
import { GlassDateRangePicker } from '../input/GlassDateRangePicker';
import { GlassInput } from '../input/GlassInput';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../input/GlassSelectCompound';
import { GlassSlider } from '../input/GlassSlider';

export interface FilterOption {
    id: string;
    label: string;
    value: string;
    count?: number;
    disabled?: boolean;
}

export interface FilterGroup {
    id: string;
    label: string;
    type: 'checkbox' | 'select' | 'slider' | 'daterange' | 'search';
    options?: FilterOption[];
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    collapsed?: boolean;
    required?: boolean;
}

export interface FilterPreset {
    id: string;
    name: string;
    filters: Record<string, any>;
}

export interface GlassFilterPanelProps {
    filters: FilterGroup[];
    values: Record<string, any>;
    onChange: (filters: Record<string, any>) => void;
    onApply?: () => void;
    onClear?: () => void;
    presets?: FilterPreset[];
    onSavePreset?: (name: string) => void;
    className?: string;
    title?: string;
    collapsible?: boolean;
    showSearch?: boolean;
    showPresets?: boolean;
    showApplyButton?: boolean;
    showClearButton?: boolean;
    variant?: 'default' | 'compact' | 'minimal';
    size?: 'sm' | 'md' | 'lg';
    elevation?: 'low' | 'medium' | 'high';
}

const GlassFilterPanel = React.forwardRef<HTMLDivElement, GlassFilterPanelProps>(
    ({
        filters,
        values,
        onChange,
        onApply,
        onClear,
        presets = [],
        onSavePreset,
        className,
        title = 'Filters',
        collapsible = true,
        showSearch = true,
        showPresets = true,
        showApplyButton = true,
        showClearButton = true,
        variant = 'default',
        size = 'md',
        elevation = 'medium',
        ...props
    }, ref) => {
        const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
            Object.fromEntries(filters.map(f => [f.id, !f.collapsed]))
        );
        const [searchQuery, setSearchQuery] = useState('');
        const [showPresetDialog, setShowPresetDialog] = useState(false);
        const [newPresetName, setNewPresetName] = useState('');

        const toggleGroup = useCallback((groupId: string) => {
            setExpandedGroups(prev => ({
                ...prev,
                [groupId]: !prev[groupId]
            }));
        }, []);

        const handleFilterChange = useCallback((groupId: string, value: any) => {
            onChange({
                ...values,
                [groupId]: value
            });
        }, [values, onChange]);

        const handleClearAll = useCallback(() => {
            const clearedValues = Object.fromEntries(
                filters.map(f => [f.id, f.type === 'checkbox' ? [] : null])
            );
            onChange(clearedValues);
            onClear?.();
        }, [filters, onChange, onClear]);

        const handleApplyFilters = useCallback(() => {
            onApply?.();
        }, [onApply]);

        const handlePresetSelect = useCallback((preset: FilterPreset) => {
            onChange(preset.filters);
        }, [onChange]);

        const handleSavePreset = useCallback(() => {
            if (newPresetName.trim()) {
                onSavePreset?.(newPresetName.trim());
                setNewPresetName('');
                setShowPresetDialog(false);
            }
        }, [newPresetName, onSavePreset]);

        const filteredGroups = useMemo(() => {
            if (!searchQuery) return filters;

            return filters.filter(group =>
                group.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                group.options?.some(option =>
                    option.label.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }, [filters, searchQuery]);

        const hasActiveFilters = useMemo(() => {
            return Object.values(values).some(value =>
                Array.isArray(value) ? (value?.length || 0) > 0 : value != null
            );
        }, [values]);

        const sizeClasses = {
            sm: 'glass-text-sm',
            md: 'glass-text-base',
            lg: 'glass-text-lg'
        };

        const variantClasses = {
            default: 'glass-p-6',
            compact: 'glass-p-4',
            minimal: 'glass-p-2'
        };

        const elevationClasses = {
            low: 'backdrop-blur-md bg-white/10 border border-white/20',
            medium: 'backdrop-blur-md bg-white/20 border border-white/30 shadow-lg',
            high: 'backdrop-blur-md bg-white/30 border border-white/40 shadow-2xl'
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'glass-radius-xl',
                    elevationClasses[elevation],
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                {/* Header */}
                <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between mb-6">
                    <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                        <Filter className="glass-glass-w-5 glass-glass-h-5 glass-glass-text-primary/70" />
                        <h3 className="glass-glass-font-semibold glass-glass-text-primary">{title}</h3>
                        {hasActiveFilters && (
                            <span className="glass-glass-px-2 glass-glass-py-1 glass-glass-text-xs glass-surface-blue/20 text-blue-300 glass-radius-full">
                                Active
                            </span>
                        )}
                    </div>

                    <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                        {showClearButton && hasActiveFilters && (
                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={handleClearAll}
                                className="glass-glass-text-primary/70 hover:glass-glass-text-primary"
                            >
                                <RotateCcw className="glass-glass-w-4 glass-glass-h-4 glass-mr-1" />
                                Clear
                            </GlassButton>
                        )}

                        {showApplyButton && (
                            <GlassButton
                                variant="primary"
                                size="sm"
                                onClick={handleApplyFilters}
                                disabled={!hasActiveFilters}
                            >
                                Apply Filters
                            </GlassButton>
                        )}
                    </div>
                </div>

                {/* Search */}
                {showSearch && (
                    <div className="glass-glass-mb-4">
                        <GlassInput
                            placeholder="Search filters..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="glass-glass-w-full"
                            leftIcon={<Search className="glass-glass-w-4 glass-glass-h-4" />}
                        />
                    </div>
                )}

                {/* Presets */}
                {showPresets && presets.length > 0 && (
                    <div className="mb-6">
                        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-mb-2">
                            <span className="glass-glass-text-sm glass-glass-font-medium glass-glass-text-primary/70">Presets</span>
                            {onSavePreset && (
                                <GlassButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => setShowPresetDialog(true)}
                                    className="glass-glass-text-primary/70 hover:glass-glass-text-primary"
                                >
                                    <Save className="glass-glass-w-4 glass-glass-h-4 glass-mr-1" />
                                    Save
                                </GlassButton>
                            )}
                        </div>

                        <div className="glass-glass-flex glass-glass-flex-wrap glass-glass-gap-2">
                            {presets.map((preset) => (
                                <GlassButton
                                    key={preset.id}
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => handlePresetSelect(preset)}
                                    className="glass-glass-text-xs"
                                >
                                    {preset.name}
                                </GlassButton>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter Groups */}
                <div className="glass-glass-gap-4">
                    <AnimatePresence>
                        {filteredGroups.map((group) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="glass-radius-lg overflow-hidden ring-1 ring-white/10"
                            >
                                {/* Group Header */}
                                {collapsible && (
                                    <button
                                        onClick={(e) => toggleGroup(group.id)}
                                        className="glass-glass-w-full glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-p-3 glass-glass-text-left hover:glass-surface-subtle/5 transition-colors"
                                    >
                                        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                                            <span className="glass-glass-font-medium glass-glass-text-primary">{group.label}</span>
                                            {group.required && (
                                                <span className="glass-glass-text-xs glass-glass-text-primary">*</span>
                                            )}
                                        </div>
                                        {expandedGroups[group.id] ? (
                                            <ChevronDown className="glass-glass-w-4 glass-glass-h-4 glass-glass-text-primary/70" />
                                        ) : (
                                            <ChevronRight className="glass-glass-w-4 glass-glass-h-4 glass-glass-text-primary/70" />
                                        )}
                                    </button>
                                )}

                                {/* Group Content */}
                                <AnimatePresence>
                                    {(!collapsible || expandedGroups[group.id]) && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="glass-glass-p-3 glass-glass-border-t glass-glass-border-white/10"
                                        >
                                            <FilterGroupContent
                                                group={group}
                                                value={values[group.id]}
                                                onChange={(value) => handleFilterChange(group.id, value)}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Save Preset Dialog */}
                {showPresetDialog && (
                    <div className="glass-glass-fixed glass-glass-inset-0 glass-surface-dark/50 backdrop-blur-md glass-z-50 glass-glass-flex glass-glass-items-center glass-glass-justify-center">
                        <div className="glass-radius-lg glass-glass-p-6 max-w-md glass-glass-w-full glass-glass-mx-4 glass-surface-subtle/5 ring-1 ring-white/10">
                            <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Save Filter Preset</h3>
                            <GlassInput
                                placeholder="Preset name..."
                                value={newPresetName}
                                onChange={(e) => setNewPresetName(e.target.value)}
                                className="glass-glass-mb-4"
                            />
                            <div className="glass-glass-flex glass-glass-gap-2">
                                <GlassButton
                                    variant="ghost"
                                    onClick={(e) => setShowPresetDialog(false)}
                                    className="glass-glass-flex-1"
                                >
                                    Cancel
                                </GlassButton>
                                <GlassButton
                                    variant="primary"
                                    onClick={handleSavePreset}
                                    disabled={!newPresetName.trim()}
                                    className="glass-glass-flex-1"
                                >
                                    Save
                                </GlassButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

GlassFilterPanel.displayName = 'GlassFilterPanel';

// Filter Group Content Component
interface FilterGroupContentProps {
    group: FilterGroup;
    value: any;
    onChange: (value: any) => void;
}

const FilterGroupContent: React.FC<FilterGroupContentProps> = ({
    group,
    value,
    onChange
}) => {
    switch (group.type) {
        case 'checkbox':
            return (
                <div className="glass-glass-gap-2">
                    {group.options?.map((option) => (
                        <div key={option.id} className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
                            <GlassCheckbox
                                id={option.id}
                                checked={Array.isArray(value) && value.includes(option.value)}
                                onCheckedChange={(checked) => {
                                    const currentValues = Array.isArray(value) ? value : [];
                                    const newValues = checked
                                        ? [...currentValues, option.value]
                                        : currentValues.filter(v => v !== option.value);
                                    onChange(newValues);
                                }}
                                disabled={option.disabled}
                                label={option.label}
                            />
                            {option.count != null && (
                                <span className="glass-glass-text-xs glass-glass-text-primary/50">({option.count})</span>
                            )}
                        </div>
                    ))}
                </div>
            );

        case 'select':
            return (
                <GlassSelect
                    value={value || ''}
                    onValueChange={onChange}
                >
                    <GlassSelectTrigger>
                        <GlassSelectValue placeholder={group.placeholder || 'Select...'} />
                    </GlassSelectTrigger>
                    <GlassSelectContent>
                        {group.options?.map((option) => (
                            <GlassSelectItem
                                key={option.id}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-w-full">
                                    <span>{option.label}</span>
                                    {option.count != null && (
                                        <span className="glass-glass-text-xs glass-glass-text-primary/50 glass-ml-2">({option.count})</span>
                                    )}
                                </div>
                            </GlassSelectItem>
                        ))}
                    </GlassSelectContent>
                </GlassSelect>
            );

        case 'slider':
            return (
                <div className="glass-glass-gap-3">
                    <GlassSlider
                        min={group.min || 0}
                        max={group.max || 100}
                        step={group.step || 1}
                        value={Array.isArray(value) ? value : [group.min || 0]}
                        onValueChange={(newValue) => onChange(newValue)}
                        className="glass-glass-w-full"
                    />
                    <div className="glass-glass-flex glass-glass-justify-between glass-glass-text-sm glass-glass-text-primary/70">
                        <span>{group.min || 0}</span>
                        <span>{group.max || 100}</span>
                    </div>
                </div>
            );

        case 'daterange':
            return (
                <GlassDateRangePicker
                    value={value}
                    onChange={onChange}
                    placeholder={group.placeholder}
                />
            );

        case 'search':
            return (
                <GlassInput
                    placeholder={group.placeholder || 'Search...'}
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    leftIcon={<Search className="glass-glass-w-4 glass-glass-h-4" />}
                />
            );

        default:
            return null;
    }
};

export { GlassFilterPanel };
