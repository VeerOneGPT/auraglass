'use client';

import { cn } from '@/design-system/utilsCore';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight } from 'lucide-react';
import React, { forwardRef } from 'react';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';

// DropdownMenu Root component
export interface GlassDropdownMenuProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> { }

export const GlassDropdownMenu = DropdownMenuPrimitive.Root;

// DropdownMenuTrigger component
export interface GlassDropdownMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
    variant?: 'default' | 'outline' | 'ghost' | 'minimal';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

export const GlassDropdownMenuTrigger = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
    GlassDropdownMenuTriggerProps
>(
    (
        {
            className,
            variant = 'outline',
            size = 'md',
            asChild = false,
            children,
            ...props
        },
        ref
    ) => {
        const sizeStyles = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
        };

        const variantStyles = {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            minimal: 'text-muted-foreground hover:text-foreground',
        };

        const baseStyles = cn(
            'inline-flex items-center justify-center gap-2',
            'whitespace-nowrap rounded-lg font-medium',
            'transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            sizeStyles?.[size],
            variantStyles?.[variant],
            className
        );

        return (
            <DropdownMenuPrimitive.Trigger
                ref={ref}
                className={baseStyles}
                asChild={asChild}
                {...props}
            >
                {children}
            </DropdownMenuPrimitive.Trigger>
        );
    }
);

GlassDropdownMenuTrigger.displayName = 'GlassDropdownMenuTrigger';

// DropdownMenuContent component
export interface GlassDropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const GlassDropdownMenuContent = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    GlassDropdownMenuContentProps
>(
    (
        {
            className,
            align = 'end',
            sideOffset = 4,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <DropdownMenuPrimitive.Portal>
                <Motion preset="scaleIn">
                    <DropdownMenuPrimitive.Content
                        ref={ref}
                        align={align}
                        sideOffset={sideOffset}
                        className={cn(
                            'z-50 min-w-[8rem] overflow-hidden rounded-xl p-1',
                            'shadow-lg border border-border/20',
                            'data-[state=open]:animate-in data-[state=closed]:animate-out',
                            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                            'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                            className
                        )}
                        {...props}
                    >
                        <OptimizedGlass
          variant="frosted"
          elevation={2}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
                            className="p-0 glass-radial-reveal glass-lift"
                        >
                            {children}
                        </OptimizedGlass>
                    </DropdownMenuPrimitive.Content>
                </Motion>
            </DropdownMenuPrimitive.Portal>
        );
    }
);

GlassDropdownMenuContent.displayName = 'GlassDropdownMenuContent';

// DropdownMenuItem component
export interface GlassDropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
    variant?: 'default' | 'destructive';
    icon?: React.ReactNode;
    shortcut?: string;
}

export const GlassDropdownMenuItem = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    GlassDropdownMenuItemProps
>(
    (
        {
            className,
            variant = 'default',
            icon,
            shortcut,
            children,
            ...props
        },
        ref
    ) => {
        const variantStyles = {
            default: 'text-foreground focus:bg-accent focus:text-accent-foreground',
            destructive: 'text-destructive focus:bg-destructive/10 focus:text-destructive',
        };

        return (
            <DropdownMenuPrimitive.Item
                ref={ref}
                className={cn(
                    'relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none',
                    'transition-all duration-200 hover:-translate-y-0.5',
                    'focus:bg-accent focus:text-accent-foreground ring-0',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    variantStyles?.[variant],
                    className
                )}
                {...props}
            >
                {icon && (
                    <span className="mr-3 flex h-4 w-4 items-center justify-center">
                        {icon}
                    </span>
                )}
                <span className="flex-1">{children}</span>
                {shortcut && (
                    <span className="ml-auto text-xs text-muted-foreground">
                        {shortcut}
                    </span>
                )}
            </DropdownMenuPrimitive.Item>
        );
    }
);

GlassDropdownMenuItem.displayName = 'GlassDropdownMenuItem';

// DropdownMenuCheckboxItem component
export interface GlassDropdownMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
    checked?: boolean | 'indeterminate';
    icon?: React.ReactNode;
}

export const GlassDropdownMenuCheckboxItem = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    GlassDropdownMenuCheckboxItemProps
>(
    (
        {
            className,
            checked,
            icon,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <DropdownMenuPrimitive.CheckboxItem
                ref={ref}
                className={cn(
                    'relative flex cursor-default select-none items-center',
                    'rounded-lg px-3 py-2 text-sm outline-none',
                    'transition-colors duration-200',
                    'focus:bg-accent focus:text-accent-foreground',
                    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    className
                )}
                checked={checked}
                {...props}
            >
                <DropdownMenuPrimitive.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-3 w-3" />
                </DropdownMenuPrimitive.ItemIndicator>
                {icon && (
                    <span className="ml-6 mr-3 flex h-4 w-4 items-center justify-center">
                        {icon}
                    </span>
                )}
                <span className="flex-1">{children}</span>
            </DropdownMenuPrimitive.CheckboxItem>
        );
    }
);

GlassDropdownMenuCheckboxItem.displayName = 'GlassDropdownMenuCheckboxItem';

// DropdownMenuRadioGroup component
export const GlassDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// DropdownMenuRadioItem component
export interface GlassDropdownMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
    icon?: React.ReactNode;
}

export const GlassDropdownMenuRadioItem = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    GlassDropdownMenuRadioItemProps
>(
    (
        {
            className,
            icon,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <DropdownMenuPrimitive.RadioItem
                ref={ref}
                className={cn(
                    'relative flex cursor-default select-none items-center',
                    'rounded-lg px-3 py-2 text-sm outline-none',
                    'transition-colors duration-200',
                    'focus:bg-accent focus:text-accent-foreground',
                    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    className
                )}
                {...props}
            >
                <DropdownMenuPrimitive.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-current" />
                </DropdownMenuPrimitive.ItemIndicator>
                {icon && (
                    <span className="ml-6 mr-3 flex h-4 w-4 items-center justify-center">
                        {icon}
                    </span>
                )}
                <span className="flex-1">{children}</span>
            </DropdownMenuPrimitive.RadioItem>
        );
    }
);

GlassDropdownMenuRadioItem.displayName = 'GlassDropdownMenuRadioItem';

// DropdownMenuLabel component
export interface GlassDropdownMenuLabelProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
    inset?: boolean;
}

export const GlassDropdownMenuLabel = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    GlassDropdownMenuLabelProps
>(
    (
        {
            className,
            inset = false,
            ...props
        },
        ref
    ) => {
        return (
            <DropdownMenuPrimitive.Label
                ref={ref}
                className={cn(
                    'px-2 py-1.5 text-sm font-semibold',
                    inset && 'pl-8',
                    className
                )}
                {...props}
            />
        );
    }
);

GlassDropdownMenuLabel.displayName = 'GlassDropdownMenuLabel';

// DropdownMenuSeparator component
export interface GlassDropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> { }

export const GlassDropdownMenuSeparator = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    GlassDropdownMenuSeparatorProps
>(
    (
        {
            className,
            ...props
        },
        ref
    ) => {
        return (
            <DropdownMenuPrimitive.Separator
                ref={ref}
                className={cn('-mx-1 my-1 h-px bg-border/20', className)}
                {...props}
            />
        );
    }
);

GlassDropdownMenuSeparator.displayName = 'GlassDropdownMenuSeparator';

// DropdownMenuShortcut component (for keyboard shortcuts)
export interface GlassDropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> { }

export const GlassDropdownMenuShortcut = forwardRef<
    HTMLSpanElement,
    GlassDropdownMenuShortcutProps
>(
    (
        {
            className,
            ...props
        },
        ref
    ) => {
        return (
            <span
                ref={ref}
                className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
                {...props}
            />
        );
    }
);

GlassDropdownMenuShortcut.displayName = 'GlassDropdownMenuShortcut';

// DropdownMenuSub component
export const GlassDropdownMenuSub = DropdownMenuPrimitive.Sub;

// DropdownMenuSubTrigger component
export interface GlassDropdownMenuSubTriggerProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
    icon?: React.ReactNode;
}

export const GlassDropdownMenuSubTrigger = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    GlassDropdownMenuSubTriggerProps
>(
    (
        {
            className,
            icon,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <DropdownMenuPrimitive.SubTrigger
                ref={ref}
                className={cn(
                    'flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none',
                    'focus:bg-accent focus:text-accent-foreground',
                    'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
                    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    className
                )}
                {...props}
            >
                {icon && (
                    <span className="mr-3 flex h-4 w-4 items-center justify-center">
                        {icon}
                    </span>
                )}
                <span className="flex-1">{children}</span>
                <ChevronRight className="ml-auto h-4 w-4" />
            </DropdownMenuPrimitive.SubTrigger>
        );
    }
);

GlassDropdownMenuSubTrigger.displayName = 'GlassDropdownMenuSubTrigger';

// DropdownMenuSubContent component
export interface GlassDropdownMenuSubContentProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> { }

export const GlassDropdownMenuSubContent = forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    GlassDropdownMenuSubContentProps
>(
    (
        {
            className,
            ...props
        },
        ref
    ) => {
        return (
            <DropdownMenuPrimitive.SubContent
                ref={ref}
                className={cn(
                    'z-50 min-w-[8rem] overflow-hidden rounded-xl p-1',
                    'shadow-lg border border-border/20',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                    'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    className
                )}
                {...props}
            >
                <OptimizedGlass
          variant="frosted"
          elevation={2}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
                    className="p-0 glass-radial-reveal glass-lift"
                >
                    {props?.children}
                </OptimizedGlass>
            </DropdownMenuPrimitive.SubContent>
        );
    }
);

GlassDropdownMenuSubContent.displayName = 'GlassDropdownMenuSubContent';

// Export all components for convenience
export {
    DropdownMenuPrimitive as DropdownMenu
};
