'use client';

import { cn } from '@/design-system/utilsCore';
import React, { createContext, useContext, useState } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';

export interface GlassToggleProps {
    /**
     * Whether toggle is pressed/active
     */
    pressed?: boolean;
    /**
     * Default pressed state
     */
    defaultPressed?: boolean;
    /**
     * Callback when pressed state changes
     */
    onPressedChange?: (pressed: boolean) => void;
    /**
     * Toggle size
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Toggle variant
     */
    variant?: 'default' | 'outline' | 'ghost';
    /**
     * Whether toggle is disabled
     */
    disabled?: boolean;
    /**
     * Toggle content
     */
    children?: React.ReactNode;
    /**
     * Left icon
     */
    leftIcon?: React.ReactNode;
    /**
     * Right icon
     */
    rightIcon?: React.ReactNode;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Toggle shape
     */
    shape?: 'rounded' | 'square' | 'circle';
    /**
     * Animation type
     */
    animation?: 'none' | 'scale' | 'slide';
}

export interface GlassToggleGroupProps {
    /**
     * Selected toggle values
     */
    value?: string[];
    /**
     * Default selected values
     */
    defaultValue?: string[];
    /**
     * Callback when selection changes
     */
    onValueChange?: (value: string[]) => void;
    /**
     * Toggle group type
     */
    type?: 'single' | 'multiple';
    /**
     * Whether group is disabled
     */
    disabled?: boolean;
    /**
     * Toggle group orientation
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Group size
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Group variant
     */
    variant?: 'default' | 'outline' | 'ghost';
    /**
     * Children (GlassToggle components)
     */
    children: React.ReactNode;
    /**
     * Custom className
     */
    className?: string;
}

export interface GlassToggleGroupItemProps extends Omit<GlassToggleProps, 'pressed' | 'onPressedChange'> {
    /**
     * Toggle value
     */
    value: string;
}

// Context for toggle group
const ToggleGroupContext = createContext<{
    value?: string[];
    onValueChange?: (value: string[]) => void;
    type?: 'single' | 'multiple';
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline' | 'ghost';
} | null>(null);

const useToggleGroupContext = () => {
    return useContext(ToggleGroupContext);
};

/**
 * GlassToggle component
 * A glassmorphism toggle button
 */
export const GlassToggle = React.forwardRef<HTMLButtonElement, GlassToggleProps>(
    (
        {
            pressed: controlledPressed,
            defaultPressed = false,
            onPressedChange,
            size = 'md',
            variant = 'default',
            disabled = false,
            children,
            leftIcon,
            rightIcon,
            className,
            shape = 'rounded',
            animation = 'scale',
            ...props
        },
        ref
    ) => {
        const [internalPressed, setInternalPressed] = useState(defaultPressed);
        const pressed = controlledPressed !== undefined ? controlledPressed : internalPressed;

        // Check if this toggle is part of a group
        const groupContext = useToggleGroupContext();
        const isInGroup = !!groupContext;

        const handleClick = () => {
            if (disabled) return;

            if (isInGroup && 'value' in props) {
                // Handle as group item
                const itemValue = (props as GlassToggleGroupItemProps).value;
                const currentValues = groupContext.value || [];

                if (groupContext.type === 'single') {
                    const newValues = currentValues.includes(itemValue) ? [] : [itemValue];
                    groupContext.onValueChange?.(newValues);
                } else {
                    const newValues = currentValues.includes(itemValue)
                        ? currentValues.filter(v => v !== itemValue)
                        : [...currentValues, itemValue];
                    groupContext.onValueChange?.(newValues);
                }
            } else {
                // Handle as standalone toggle
                const newPressed = !pressed;
                if (controlledPressed === undefined) {
                    setInternalPressed(newPressed);
                }
                onPressedChange?.(newPressed);
            }
        };

        const sizeClasses = {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-base',
            lg: 'h-12 px-6 text-lg',
        };

        const shapeClasses = {
            rounded: 'rounded-lg',
            square: 'rounded-none',
            circle: 'rounded-full',
        };

        const getVariantClasses = () => {
            const baseClasses = 'backdrop-blur-md border border-white/20 transition-all duration-300';

            switch (variant) {
                case 'outline':
                    return cn(
                        baseClasses,
                        pressed
                            ? 'bg-white/20 border-white/40 text-white shadow-lg'
                            : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white hover:border-white/30'
                    );
                case 'ghost':
                    return cn(
                        pressed
                            ? 'bg-white/20 text-white shadow-md'
                            : 'hover:bg-white/10 text-white/70 hover:text-white',
                        'transition-all duration-300'
                    );
                default:
                    return cn(
                        baseClasses,
                        pressed
                            ? 'bg-white/20 border-white/40 text-white shadow-lg scale-105'
                            : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white hover:border-white/30 hover:scale-105'
                    );
            }
        };

        const getAnimationProps = () => {
            if (animation === 'none') return {};

            switch (animation) {
                case 'scale':
                    return {
                        whileHover: { scale: disabled ? 1 : 1.05 },
                        whileTap: { scale: disabled ? 1 : 0.95 },
                    };
                case 'slide':
                    return {
                        initial: { x: pressed ? 2 : 0 },
                        animate: { x: pressed ? 2 : 0 },
                        whileHover: { x: pressed ? 4 : 2 },
                    };
                default:
                    return {};
            }
        };

        return (
            <Motion
                {...getAnimationProps()}
                className="inline-block"
            >
                <OptimizedGlass
                    intent="neutral"
                    elevation={pressed ? "level3" : "level1"}
                    intensity="medium"
                    depth={2}
                    tint="neutral"
                    border="subtle"
                    animation="none"
                    performanceMode="medium"
                    ref={ref as any}



                    className={cn(
                        'relative flex items-center justify-center gap-2 font-medium',
                        'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent',
                        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none',
                        sizeClasses[size],
                        shapeClasses[shape],
                        getVariantClasses(),
                        className
                    )}

                    onClick={handleClick}
                    aria-pressed={pressed}
                    {...props}
                >
                    {/* Content */}
                    {leftIcon && (
                        <span className="flex items-center justify-center">
                            {leftIcon}
                        </span>
                    )}

                    {children && (
                        <span className="flex items-center justify-center">
                            {children}
                        </span>
                    )}

                    {rightIcon && (
                        <span className="flex items-center justify-center">
                            {rightIcon}
                        </span>
                    )}

                    {/* Active indicator for ghost variant */}
                    {variant === 'ghost' && pressed && (
                        <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse" />
                    )}
                </OptimizedGlass>
            </Motion>
        );
    }
);

GlassToggle.displayName = 'GlassToggle';

/**
 * GlassToggleGroup component
 * A group of toggle buttons
 */
export const GlassToggleGroup: React.FC<GlassToggleGroupProps> = ({
    value: controlledValue,
    defaultValue = [],
    onValueChange,
    type = 'multiple',
    disabled = false,
    orientation = 'horizontal',
    size = 'md',
    variant = 'default',
    children,
    className,
}) => {
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (newValue: string[]) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };

    const contextValue = {
        value,
        onValueChange: handleValueChange,
        type,
        disabled,
        size,
        variant,
    };

    return (
        <ToggleGroupContext.Provider value={contextValue}>
            <div
                className={cn(
                    'flex gap-2 p-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg',
                    {
                        'flex-row': orientation === 'horizontal',
                        'flex-col': orientation === 'vertical',
                    },
                    className
                )}
                role="group"
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    );
};

/**
 * GlassToggleGroupItem component
 * Individual toggle item within a group
 */
export const GlassToggleGroupItem: React.FC<GlassToggleGroupItemProps> = ({
    value,
    children,
    ...props
}) => {
    const groupContext = useToggleGroupContext();
    if (!groupContext) {
        throw new Error('GlassToggleGroupItem must be used within a GlassToggleGroup');
    }

    const isPressed = groupContext.value?.includes(value) || false;

    return (
        <GlassToggle
            pressed={isPressed}
            size={groupContext.size}
            variant={groupContext.variant}
            disabled={groupContext.disabled}
            {...props}
        >
            {children}
        </GlassToggle>
    );
};

/**
 * Hook for managing toggle state
 */
export const useToggle = (initialPressed = false) => {
    const [pressed, setPressed] = useState(initialPressed);

    return {
        pressed,
        setPressed,
        toggle: () => setPressed(!pressed),
        onPressedChange: setPressed,
    };
};

/**
 * Hook for managing toggle group state
 */
export const useToggleGroup = (initialValue: string[] = []) => {
    const [value, setValue] = useState<string[]>(initialValue);

    return {
        value,
        setValue,
        onValueChange: setValue,
        toggle: (itemValue: string) => {
            setValue(prev =>
                prev.includes(itemValue)
                    ? prev.filter(v => v !== itemValue)
                    : [...prev, itemValue]
            );
        },
    };
};
