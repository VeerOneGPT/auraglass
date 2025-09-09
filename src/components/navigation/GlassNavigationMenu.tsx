'use client';

// Removed circular import - using regular button element

import { cn } from '@/design-system/utilsCore';
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';

export interface NavigationItem {
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    description?: string;
    badge?: string | number;
    disabled?: boolean;
    external?: boolean;
    children?: NavigationItem[];
    action?: () => void;
    separator?: boolean;
    featured?: boolean;
}

export interface GlassNavigationMenuProps {
    /**
     * Navigation items
     */
    items: NavigationItem[];
    /**
     * Menu orientation
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Menu variant
     */
    variant?: 'default' | 'sidebar' | 'header';
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Active item ID
     */
    activeItem?: string;
    /**
     * Custom className
     */
    className?: string;
    /**
     * Whether menu is collapsed (for sidebar variant)
     */
    collapsed?: boolean;
    /**
     * Callback when item is clicked
     */
    onItemClick?: (item: NavigationItem) => void;
}

export interface GlassNavigationMenuContentProps {
    /**
     * Menu content
     */
    children: React.ReactNode;
    /**
     * Content className
     */
    className?: string;
    /**
     * Whether content is open
     */
    isOpen?: boolean;
}

export interface GlassNavigationMenuItemProps {
    /**
     * Navigation item
     */
    item: NavigationItem;
    /**
     * Whether item is active
     */
    isActive?: boolean;
    /**
     * Whether item has submenu open
     */
    hasSubmenuOpen?: boolean;
    /**
     * Whether menu is collapsed
     */
    collapsed?: boolean;
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Callback when item is clicked
     */
    onClick: (item: NavigationItem) => void;
    /**
     * Callback to toggle submenu
     */
    onToggleSubmenu: (itemId: string) => void;
    /**
     * Custom className
     */
    className?: string;
}

/**
 * GlassNavigationMenu component
 * Advanced glassmorphism navigation menu with nested items
 */
export const GlassNavigationMenu: React.FC<GlassNavigationMenuProps> = ({
    items,
    orientation = 'vertical',
    variant = 'default',
    size = 'md',
    activeItem,
    className,
    collapsed = false,
    onItemClick,
}) => {
    const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

    const handleItemClick = (item: NavigationItem) => {
        if (item?.disabled) return;

        if (item?.children && item?.children.length > 0) {
            // Toggle submenu
            setOpenSubmenus(prev => {
                const newSet = new Set(prev);
                if (newSet.has(item?.id)) {
                    newSet.delete(item?.id);
                } else {
                    newSet.add(item?.id);
                }
                return newSet;
            });
        } else {
            // Execute action
            if (item?.href) {
                if (item?.external) {
                    window.open(item?.href, '_blank');
                } else {
                    window.location.href = item?.href;
                }
            } else {
                item?.action?.();
            }
            onItemClick?.(item);
        }
    };

    const toggleSubmenu = (itemId: string) => {
        setOpenSubmenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const variantClasses = {
        default: 'backdrop-blur-md ring-1 ring-white/10 bg-white/5',
        sidebar: 'backdrop-blur-md ring-0 border-r border-white/10 bg-white/5',
        header: 'backdrop-blur-md ring-0 border-b border-white/10 bg-white/5',
    };

    return (
        <OptimizedGlass
            variant="frosted"
            elevation={1}
            intensity="medium"
            depth={2}
            tint="neutral"
            border="subtle"
            animation="none"
            performanceMode="medium"

            className={cn(
                variantClasses?.[variant],
                orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
                className
            )}
        >
            {items.map((item, index) => (
                <React.Fragment key={item?.id}>
                    {item?.separator && (
                        <div className={cn(
                            'bg-white/20',
                            orientation === 'horizontal' ? 'w-px h-8 mx-4' : 'h-px w-full my-2 mx-4'
                        )} />
                    )}

                    <GlassNavigationMenuItem
                        item={item}
                        isActive={activeItem === item?.id}
                        hasSubmenuOpen={openSubmenus.has(item?.id)}
                        collapsed={collapsed}
                        size={size}
                        onClick={handleItemClick}
                        onToggleSubmenu={toggleSubmenu}
                    />

                    {/* Submenu */}
                    {item?.children && openSubmenus.has(item?.id) && !collapsed && (
                        <Motion
                            preset="slideDown"
                            duration={200}
                        >
                            <div className={cn(
                                'ml-4 border-l border-white/20 pl-4',
                                orientation === 'horizontal' && 'absolute top-full left-0 mt-2 z-50'
                            )}>
                                <GlassNavigationMenu
                                    items={item?.children}
                                    orientation="vertical"
                                    variant="default"
                                    size={size}
                                    activeItem={activeItem}
                                    onItemClick={onItemClick}
                                />
                            </div>
                        </Motion>
                    )}
                </React.Fragment>
            ))}
        </OptimizedGlass>
    );
};

/**
 * GlassNavigationMenuContent component
 * Container for navigation menu content
 */
export const GlassNavigationMenuContent: React.FC<GlassNavigationMenuContentProps> = ({
    children,
    className,
    isOpen = true,
}) => {
    if (!isOpen) return null;

    return (
        <Motion
            preset="slideDown"
            duration={200}
        >
            <div className={className}>
                {children}
            </div>
        </Motion>
    );
};

/**
 * GlassNavigationMenuItem component
 * Individual navigation menu item
 */
export const GlassNavigationMenuItem: React.FC<GlassNavigationMenuItemProps> = ({
    item,
    isActive = false,
    hasSubmenuOpen = false,
    collapsed = false,
    size = 'md',
    onClick,
    onToggleSubmenu,
    className,
}) => {
    const hoverTimer = React.useRef<number | null>(null);

    const clearHoverTimer = () => {
        if (hoverTimer.current) {
            window.clearTimeout(hoverTimer.current);
            hoverTimer.current = null;
        }
    };

    const onHoverEnter = () => {
        if (!item?.children || item?.children.length === 0 || collapsed) return;
        clearHoverTimer();
        hoverTimer.current = window.setTimeout(() => {
            if (!hasSubmenuOpen) onToggleSubmenu(item?.id);
        }, 120);
    };

    const onHoverLeave = () => {
        if (!item?.children || item?.children.length === 0 || collapsed) return;
        clearHoverTimer();
        hoverTimer.current = window.setTimeout(() => {
            if (hasSubmenuOpen) onToggleSubmenu(item?.id);
        }, 180);
    };

    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            clearHoverTimer();
        };
    }, []);

    const sizeClasses = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
    };

    const handleClick = () => {
        onClick(item);
    };

    const handleSubmenuToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleSubmenu(item?.id);
    };

    if (item?.separator) {
        return (
            <div className="h-px bg-white/20 mx-4 my-2" />
        );
    }

    if (collapsed) {
        return (
            <Motion
                preset="none"
            >
                <button
                    className={cn(
                        'relative flex items-center justify-center w-full',
                        'text-white/70 hover:text-white transition-colors duration-200',
                        'hover:bg-white/10 rounded-lg',
                        'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        sizeClasses?.[size],
                        {
                            'bg-white/20 text-white': isActive,
                            'text-white': isActive,
                        },
                        className
                    )}
                    onClick={handleClick}
                    disabled={item?.disabled}
                    title={item?.label}
                    type="button"
                >
                    {item?.icon && (
                        <div className="flex items-center justify-center">
                            {item?.icon}
                        </div>
                    )}

                    {item?.badge && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                            {typeof item?.badge === 'number' && item?.badge > 99 ? '99+' : item?.badge}
                        </div>
                    )}
                </button>
            </Motion>
        );
    }

    return (
        <Motion
            preset="none"
        >
            <button
                className={cn(
                    'relative flex items-center justify-between w-full',
                    'text-white/70 hover:text-white transition-all duration-200',
                    'hover:bg-white/10 rounded-lg',
                    'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    sizeClasses?.[size],
                    {
                        'bg-white/20 text-white shadow-md': isActive,
                        'text-white': isActive,
                    },
                    className
                )}
                onClick={handleClick}
                onMouseEnter={onHoverEnter}
                onMouseLeave={onHoverLeave}
                disabled={item?.disabled}
                type="button"
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Icon */}
                    {item?.icon && (
                        <div className="flex items-center justify-center flex-shrink-0">
                            {item?.icon}
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2">
                            <span className="truncate font-medium">
                                {item?.label}
                            </span>

                            {item?.badge && (
                                <span className="flex-shrink-0 px-2 py-0.5 bg-red-500/20 text-red-300 rounded-full text-xs font-medium">
                                    {typeof item?.badge === 'number' && item?.badge > 99 ? '99+' : item?.badge}
                                </span>
                            )}
                        </div>

                        {item?.description && (
                            <p className="text-white/50 text-sm truncate mt-0.5">
                                {item?.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* External link indicator */}
                    {item?.external && (
                        <div className="w-3 h-3 text-white/50">
                            ↗
                        </div>
                    )}

                    {/* Featured indicator */}
                    {item?.featured && (
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    )}

                    {/* Submenu toggle */}
                    {item?.children && item?.children.length > 0 && (
                        <button
                            onClick={handleSubmenuToggle}
                            className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
                            aria-label="Toggle submenu"
                        >
                            <Motion
                                preset="rotateIn"
                                duration={200}
                            >
                                <ChevronRight className="w-4 h-4 text-white/50" />
                            </Motion>
                        </button>
                    )}
                </div>
            </button>
        </Motion>
    );
};

/**
 * Hook for managing navigation menu state
 */
export const useNavigationMenu = (initialActiveItem?: string) => {
    const [activeItem, setActiveItem] = useState(initialActiveItem);
    const [collapsed, setCollapsed] = useState(false);

    const navigateTo = (item: NavigationItem) => {
        setActiveItem(item?.id);
        if (item?.href) {
            if (item?.external) {
                window.open(item?.href, '_blank');
            } else {
                window.location.href = item?.href;
            }
        } else {
            item?.action?.();
        }
    };

    return {
        activeItem,
        setActiveItem,
        collapsed,
        setCollapsed,
        navigateTo,
        toggleCollapsed: () => setCollapsed(!collapsed),
    };
};

/**
 * Preset navigation configurations
 */
export const createDashboardNavigation = (): NavigationItem[] => [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '📊',
        href: '/dashboard',
        description: 'Overview and analytics',
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: '📁',
        href: '/projects',
        badge: 3,
        children: [
            {
                id: 'projects-active',
                label: 'Active Projects',
                href: '/projects/active',
                badge: 2,
            },
            {
                id: 'projects-completed',
                label: 'Completed',
                href: '/projects/completed',
                badge: 1,
            },
        ],
    },
    {
        id: 'analytics',
        label: 'Analytics',
        icon: '📈',
        href: '/analytics',
        featured: true,
    },
];

export const createAdminNavigation = (): NavigationItem[] => [
    {
        id: 'users',
        label: 'User Management',
        icon: '👥',
        href: '/admin/users',
        children: [
            {
                id: 'users-list',
                label: 'All Users',
                href: '/admin/users',
            },
            {
                id: 'users-roles',
                label: 'Roles & Permissions',
                href: '/admin/users/roles',
            },
        ],
    },
    {
        id: 'system',
        label: 'System Settings',
        icon: '⚙️',
        href: '/admin/system',
    },
    {
        id: 'logs',
        label: 'Audit Logs',
        icon: '📋',
        href: '/admin/logs',
    },
];
