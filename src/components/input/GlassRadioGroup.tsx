'use client';

import { GlassInput } from './GlassInput';

import { cn } from '@/design-system/utils';
import React, { createContext, useContext, useState } from 'react';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';
import { Motion } from '../../primitives/motion/Motion';

export interface RadioOption {
    value: string | number;
    label: string;
    description?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export interface GlassRadioGroupProps {
    /**
     * Radio options
     */
    options: RadioOption[];
    /**
     * Selected value
     */
    value?: string | number;
    /**
     * Default selected value
     */
    defaultValue?: string | number;
    /**
     * Callback when value changes
     */
    onValueChange?: (value: string | number) => void;
    /**
     * Group name (for form compatibility)
     */
    name?: string;
    /**
     * Whether radio group is disabled
     */
    disabled?: boolean;
    /**
     * Radio group orientation
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Custom className
     */
    className?: string;
    /**
     * Whether to show as card-style radios
     */
    variant?: 'default' | 'card';
    /**
     * Custom render function for options
     */
    renderOption?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
}

export interface GlassRadioGroupItemProps {
    /**
     * Radio option
     */
    option: RadioOption;
    /**
     * Whether this item is selected
     */
    isSelected: boolean;
    /**
     * Whether this item is disabled
     */
    isDisabled: boolean;
    /**
     * Callback when item is selected
     */
    onSelect: (value: string | number) => void;
    /**
     * Item size
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Item variant
     */
    variant?: 'default' | 'card';
    /**
     * Group name
     */
    name?: string;
    /**
     * Custom className
     */
    className?: string;
}

// Context for radio group state
const RadioGroupContext = createContext<{
    value?: string | number;
    onValueChange?: (value: string | number) => void;
    name?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'card';
} | null>(null);

const useRadioGroupContext = () => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error('RadioGroupItem must be used within a RadioGroup');
    }
    return context;
};

/**
 * GlassRadioGroup component
 * A glassmorphism radio button group
 */
export const GlassRadioGroup: React.FC<GlassRadioGroupProps> = ({
    options,
    value: controlledValue,
    defaultValue,
    onValueChange,
    name,
    disabled = false,
    orientation = 'vertical',
    size = 'md',
    variant = 'default',
    className,
    renderOption,
}) => {
    const [internalValue, setInternalValue] = useState<string | number>(defaultValue || '');
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (newValue: string | number) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };

    const contextValue = {
        value,
        onValueChange: handleValueChange,
        name,
        disabled,
        size,
        variant,
    };

    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div
                className={cn(
                    'flex gap-3',
                    {
                        'flex-col': orientation === 'vertical',
                        'flex-row flex-wrap': orientation === 'horizontal',
                    },
                    className
                )}
                role="radiogroup"
            >
                {options.map((option) => (
                    <GlassRadioGroupItem
                        key={option.value}
                        option={option}
                        isSelected={value === option.value}
                        isDisabled={disabled || option.disabled || false}
                        onSelect={handleValueChange}
                        size={size}
                        variant={variant}
                        name={name}
                        renderOption={renderOption}
                    />
                ))}
            </div>
        </RadioGroupContext.Provider>
    );
};

/**
 * GlassRadioGroupItem component
 * Individual radio button item
 */
export const GlassRadioGroupItem: React.FC<GlassRadioGroupItemProps & {
    renderOption?: GlassRadioGroupProps['renderOption'];
}> = ({
    option,
    isSelected,
    isDisabled,
    onSelect,
    size = 'md',
    variant = 'default',
    name,
    className,
    renderOption,
}) => {
        const sizeClasses = {
            sm: 'w-4 h-4',
            md: 'w-5 h-5',
            lg: 'w-6 h-6',
        };

        const textSizeClasses = {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        };

        const handleClick = () => {
            if (!isDisabled) {
                onSelect(option.value);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        };

        if (renderOption) {
            return (
                <div onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0}>
                    {renderOption(option, isSelected)}
                </div>
            );
        }

        if (variant === 'card') {
            return (
                <Motion
                    preset={isSelected ? "scaleIn" : "fadeIn"}
                    animateOnHover={!isDisabled}
                    duration={200}
                >
                    <OptimizedGlass
                        variant="frosted"
                        elevation={isSelected ? 3 : 1}
                        intensity="medium"
                        depth={2}
                        tint="neutral"
                        border="subtle"
                        animation="none"
                        performanceMode="medium"
                        liftOnHover
                        press

                        className={cn(
                            'relative cursor-pointer transition-all duration-200 p-4 glass-sheen',
                            'backdrop-blur-sm border border-white/20',
                            'hover:bg-white/10 hover:border-white/30',
                            {
                                'bg-white/20 border-white/40 shadow-lg': isSelected,
                                'opacity-50 cursor-not-allowed': isDisabled,
                                'hover:bg-transparent hover:border-white/20': isDisabled,
                            },
                            className
                        )}
                        onClick={handleClick}
                        onKeyDown={handleKeyDown}
                        tabIndex={isDisabled ? -1 : 0}
                        role="radio"
                        aria-checked={isSelected}
                        aria-disabled={isDisabled}
                    >
                        {/* Hidden native radio for form compatibility */}
                        <GlassInput type="radio"
                            name={name}
                            value={option.value}
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => onSelect(option.value)}
                            className="sr-only"
                        />

                        <div className="flex items-start gap-3">
                            {/* Custom radio indicator */}
                            <div
                                className={cn(
                                    'relative flex items-center justify-center rounded-full border-2',
                                    'transition-all duration-200 mt-0.5',
                                    sizeClasses[size],
                                    {
                                        'border-white/40 bg-white/10': !isSelected,
                                        'border-white bg-white/20': isSelected && !isDisabled,
                                        'border-white/20 bg-white/5': isDisabled,
                                    }
                                )}
                            >
                                {isSelected && (
                                    <Motion
                                        preset="scaleIn"
                                        duration={200}
                                        className="w-2 h-2 rounded-full bg-white"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    {option.icon && (
                                        <div className="flex items-center justify-center text-white/70">
                                            {option.icon}
                                        </div>
                                    )}
                                    <h3 className={cn(
                                        'font-medium text-white',
                                        textSizeClasses[size]
                                    )}>
                                        {option.label}
                                    </h3>
                                </div>

                                {option.description && (
                                    <p className="text-white/60 text-sm mt-1 leading-relaxed">
                                        {option.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </OptimizedGlass>
                </Motion>
            );
        }

        // Default variant
        return (
            <div
                className={cn(
                    'flex items-center gap-3 cursor-pointer group',
                    'transition-all duration-200 p-2 rounded-lg',
                    'hover:bg-white/5',
                    {
                        'opacity-50 cursor-not-allowed': isDisabled,
                    },
                    className
                )}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                tabIndex={isDisabled ? -1 : 0}
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isDisabled}
            >
                {/* Hidden native radio for form compatibility */}
                <GlassInput type="radio"
                    name={name}
                    value={option.value}
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => onSelect(option.value)}
                    className="sr-only"
                />

                {/* Custom radio indicator */}
                <div
                    className={cn(
                        'relative flex items-center justify-center rounded-full border-2',
                        'transition-all duration-200',
                        sizeClasses[size],
                        {
                            'border-white/40 bg-white/10': !isSelected,
                            'border-white bg-white/20': isSelected && !isDisabled,
                            'border-white/20 bg-white/5': isDisabled,
                        }
                    )}
                >
                    {isSelected && (
                        <Motion
                            preset="scaleIn"
                            duration={200}
                            className="w-2 h-2 rounded-full bg-white"
                        />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        {option.icon && (
                            <div className="flex items-center justify-center text-white/70">
                                {option.icon}
                            </div>
                        )}
                        <span className={cn(
                            'text-white/90',
                            textSizeClasses[size],
                            {
                                'font-medium': isSelected,
                            }
                        )}>
                            {option.label}
                        </span>
                    </div>

                    {option.description && (
                        <p className="text-white/60 text-sm mt-1">
                            {option.description}
                        </p>
                    )}
                </div>
            </div>
        );
    };

/**
 * Hook for managing radio group state
 */
export const useRadioGroup = (initialValue?: string | number) => {
    const [value, setValue] = useState<string | number>(initialValue || '');

    return {
        value,
        setValue,
        onValueChange: setValue,
    };
};
