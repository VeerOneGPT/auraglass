'use client';


import { cn } from '@/design-system/utilsCore';
import React from 'react';
import { OptimizedGlass } from '../../primitives';

export interface GlassBreadcrumbProps {
    /**
     * Breadcrumb separator
     */
    separator?: React.ReactNode;
    /**
     * Breadcrumb items
     */
    children: React.ReactNode;
    /**
     * Maximum items to show
     */
    maxItems?: number;
    /**
     * Show ellipsis for collapsed items
     */
    showEllipsis?: boolean;
    /**
     * Custom ellipsis component
     */
    ellipsisComponent?: React.ReactNode;
    /**
     * Glass elevation
     */
    elevation?: 1 | 2 | 3;
    /**
     * Size variant
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Custom className
     */
    className?: string;
}

export interface GlassBreadcrumbItemProps {
    /**
     * Whether this is the current page
     */
    isCurrentPage?: boolean;
    /**
     * Item content
     */
    children: React.ReactNode;
}

export interface GlassBreadcrumbSeparatorProps {
    /**
     * Custom separator content
     */
    children?: React.ReactNode;
    /**
     * Custom className
     */
    className?: string;
}

export interface GlassBreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Link content
     */
    children: React.ReactNode;
    /**
     * Link href
     */
    href?: string;
    /**
     * Whether this is the current page
     */
    isCurrentPage?: boolean;
}

/**
 * GlassBreadcrumb component
 * A glassmorphism breadcrumb navigation component
 */
export const GlassBreadcrumb: React.FC<GlassBreadcrumbProps> = ({
    separator = '/',
    children,
    maxItems,
    showEllipsis = true,
    ellipsisComponent = '...',
    elevation = 1,
    size = 'md',
    className,
}) => {
    const childArray = React.Children.toArray(children);
    let itemsToRender = childArray;

    // Handle max items with ellipsis
    if (maxItems && (childArray?.length || 0) > maxItems) {
        const startItems = childArray.slice(0, Math.ceil(maxItems / 2));
        const endItems = childArray.slice(-Math.floor(maxItems / 2));
        itemsToRender = [
            ...startItems,
            ...(showEllipsis ? [ellipsisComponent] : []),
            ...endItems,
        ].filter((item): item is React.ReactElement => React.isValidElement(item) || typeof item === 'string' || typeof item === 'number');
    }

    const sizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    return (
        <OptimizedGlass
          variant="frosted"
          elevation={elevation}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          liftOnHover
          
            className={cn(
                'inline-flex items-center px-3 py-1.5 backdrop-blur-sm ring-1 ring-white/10 bg-white/5',
                sizeClasses?.[size],
                className
            )}
        >
            <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                    {itemsToRender.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 text-white/40" aria-hidden="true">
                                    {separator}
                                </span>
                            )}
                            {item}
                        </li>
                    ))}
                </ol>
            </nav>
        </OptimizedGlass>
    );
};

/**
 * GlassBreadcrumbItem component
 * Individual breadcrumb item
 */
export const GlassBreadcrumbItem: React.FC<GlassBreadcrumbItemProps> = ({
    isCurrentPage = false,
    children,
}) => {
    return (
        <span
            className={cn(
                'text-white/80 transition-all duration-200',
                !isCurrentPage && 'hover:-translate-y-0.5',
                isCurrentPage && 'text-white font-medium'
            )}
            aria-current={isCurrentPage ? 'page' : undefined}
        >
            {children}
        </span>
    );
};

/**
 * GlassBreadcrumbSeparator component
 * Separator between breadcrumb items
 */
export const GlassBreadcrumbSeparator: React.FC<GlassBreadcrumbSeparatorProps> = ({
    children = '/',
    className,
}) => {
    return (
        <span
            className={cn(
                'text-white/60 mx-2 select-none',
                className
            )}
            aria-hidden="true"
        >
            {children}
        </span>
    );
};

/**
 * GlassBreadcrumbLink component
 * Clickable breadcrumb link
 */
export const GlassBreadcrumbLink: React.FC<GlassBreadcrumbLinkProps> = ({
    children,
    href,
    isCurrentPage = false,
    className,
    ...props
}) => {
    const linkClasses = cn(
        'text-white/70 hover:text-white transition-all duration-200',
        'focus:outline-none glass-pulse-ring',
        'rounded-sm px-1 py-0.5 -mx-1 -my-0.5',
        !isCurrentPage && 'hover:-translate-y-0.5',
        isCurrentPage && 'text-white font-medium cursor-default',
        className
    );

    if (isCurrentPage) {
        return (
            <span className={linkClasses} aria-current="page">
                {children}
            </span>
        );
    }

    if (href) {
        return (
            <a href={href} className={linkClasses} {...props}>
                {children}
            </a>
        );
    }

    // Use a regular button since GlassButton expects button props but we have anchor props
    return (
        <button className={linkClasses} onClick={props?.onClick as any} {...(props as any)}>
            {children}
        </button>
    );
};

/**
 * Compound Breadcrumb component with built-in structure
 */
export interface GlassBreadcrumbCompoundProps extends Omit<GlassBreadcrumbProps, 'children'> {
    /**
     * Breadcrumb items
     */
    items: Array<{
        label: string;
        href?: string;
        isCurrentPage?: boolean;
    }>;
}

export const GlassBreadcrumbCompound: React.FC<GlassBreadcrumbCompoundProps> = ({
    items,
    ...props
}) => {
    return (
        <GlassBreadcrumb {...props}>
            {items.map((item, index) => (
                <GlassBreadcrumbItem key={index} isCurrentPage={item?.isCurrentPage}>
                    <GlassBreadcrumbLink
                        href={item?.href}
                        isCurrentPage={item?.isCurrentPage}
                    >
                        {item?.label}
                    </GlassBreadcrumbLink>
                </GlassBreadcrumbItem>
            ))}
        </GlassBreadcrumb>
    );
};
