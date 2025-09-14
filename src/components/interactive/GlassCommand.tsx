'use client';

import { GlassInput } from '../input/GlassInput';

import { cn } from '../../lib/utilsComprehensive';
import { Search } from 'lucide-react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';

export interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    keywords?: string[];
    action: () => void;
    group?: string;
    disabled?: boolean;
}

export interface GlassCommandProps {
    /**
     * Command items to display
     */
    items: CommandItem[];
    /**
     * Placeholder text for search input
     */
    placeholder?: string;
    /**
     * Empty state message
     */
    emptyMessage?: string;
    /**
     * Loading state
     */
    loading?: boolean;
    /**
     * Maximum height of the command list
     */
    maxHeight?: string;
    /**
     * Custom filter function
     */
    filterItems?: (items: CommandItem[], query: string) => CommandItem[];
    /**
     * Group items by category
     */
    groupBy?: (item: CommandItem) => string;
    /**
     * Custom render function for items
     */
    renderItem?: (item: CommandItem, isSelected: boolean) => React.ReactNode;
    /**
     * Custom render function for empty state
     */
    renderEmpty?: () => React.ReactNode;
    /**
     * Callback when command is selected
     */
    onSelect?: (item: CommandItem) => void;
    /**
     * Callback when search query changes
     */
    onSearchChange?: (query: string) => void;
}

export interface GlassCommandDialogProps extends GlassCommandProps {
    /**
     * Whether dialog is open
     */
    open: boolean;
    /**
     * Callback when dialog closes
     */
    onOpenChange: (open: boolean) => void;
    /**
     * Dialog title
     */
    title?: string;
    /**
     * Dialog description
     */
    description?: string;
}

export interface GlassCommandInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Custom className
     */
    className?: string;
}

export interface GlassCommandListProps {
    /**
     * Command items to display
     */
    children: React.ReactNode;
    /**
     * Maximum height
     */
    maxHeight?: string;
    /**
     * Custom className
     */
    className?: string;
}

// Context for command state
const CommandContext = createContext<{
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    query: string;
    setQuery: (query: string) => void;
} | null>(null);

const useCommandContext = () => {
    const context = useContext(CommandContext);
    if (!context) {
        throw new Error('Command components must be used within a Command provider');
    }
    return context;
};

/**
 * GlassCommand component
 * A glassmorphism command palette with search functionality
 */
export const GlassCommand: React.FC<GlassCommandProps> = ({
    items,
    placeholder = 'Search commands...',
    emptyMessage = 'No commands found',
    loading = false,
    maxHeight = '300px',
    filterItems,
    groupBy,
    renderItem,
    renderEmpty,
    onSelect,
    onSearchChange,
}) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [filteredItems, setFilteredItems] = useState(items);
    const listRef = useRef<HTMLDivElement>(null);

    // Default filter function
    const defaultFilter = (items: CommandItem[], query: string): CommandItem[] => {
        if (!query) return items;

        const lowerQuery = query.toLowerCase();
        return items.filter(item => {
            const searchableText = [
                item?.label,
                item?.description,
                ...(item?.keywords || []),
            ].join(' ').toLowerCase();

            return searchableText.includes(lowerQuery);
        });
    };

    // Filter items when query changes
    useEffect(() => {
        const filtered = filterItems ? filterItems(items, query) : defaultFilter(items, query);
        setFilteredItems(filtered);
        setSelectedIndex(0);
        onSearchChange?.(query);
    }, [query, items, filterItems, onSearchChange]);

    // Group items if groupBy is provided
    const groupedItems = React.useMemo(() => {
        if (!groupBy) return { '': filteredItems };

        const groups: Record<string, CommandItem[]> = {};
        filteredItems.forEach(item => {
            const group = groupBy(item);
              if (!groups[group]) groups[group] = [];
            groups[group].push(item);
        });

        return groups;
    }, [filteredItems, groupBy]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        const totalItems = (filteredItems?.length || 0);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % totalItems);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    handleSelect(filteredItems[selectedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setQuery('');
                setSelectedIndex(0);
                break;
        }
    };

    const handleSelect = (item: CommandItem) => {
        if (item?.disabled) return;
        item?.action();
        onSelect?.(item);
    };

    return (
        <CommandContext.Provider value={{ selectedIndex, setSelectedIndex, query, setQuery }}>
            <OptimizedGlass
                intent="neutral"
                elevation="level3"
                intensity="strong"
                depth={2}
                tint="neutral"
                border="subtle"
                animation="pulse"
                performanceMode="high"
                className="glass-radius-lg"
            >
                <div className="glass-glass-glass-p-4">
                    {/* Search Input */}
                    <GlassCommandInput
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />

                    {/* Command List */}
                    <GlassCommandList maxHeight={maxHeight}>
                        {loading ? (
                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-py-8">
                                <div className="glass-glass-glass-w-6 glass-glass-glass-h-6 glass-glass-glass-border-2 glass-glass-glass-border-white/30 glass-glass-glass-border-t-white/60 glass-radius-full animate-spin" />
                            </div>
                        ) : (filteredItems?.length || 0) === 0 ? (
                            renderEmpty ? (
                                renderEmpty()
                            ) : (
                                <div className="glass-glass-glass-text-center glass-glass-glass-py-8 glass-glass-glass-text-primary/50">
                                    {emptyMessage}
                                </div>
                            )
                        ) : (
                            Object.entries(groupedItems).map(([groupName, groupItems]) => (
                                <div key={groupName}>
                                    {groupName && (
                                        <div className="glass-glass-glass-px-3 glass-glass-glass-py-2 glass-glass-glass-text-xs glass-glass-glass-font-medium glass-glass-glass-text-primary/60 glass-glass-glass-border-b glass-glass-glass-border-white/10">
                                            {groupName}
                                        </div>
                                    )}
                                    {groupItems.map((item, itemIndex) => {
                                        const globalIndex = filteredItems.indexOf(item);
                                        const isSelected = globalIndex === selectedIndex;

                                        return (
                                            <div
                                                key={item?.id}
                                                className={cn(
                                                    'flex items-center glass-px-3 glass-py-2 cursor-pointer transition-all duration-200 glass-radius-md',
                                                    'hover:bg-white/10 hover:-translate-y-0.5',
                                                    {
                                                        'bg-white/20 glass-text-primary shadow-md ring-1 ring-white/20': isSelected,
                                                        'opacity-50 cursor-not-allowed': item?.disabled,
                                                    }
                                                )}
                                                onClick={(e) => handleSelect(item)}
                                            >
                                                {renderItem ? (
                                                    renderItem(item, isSelected)
                                                ) : (
                                                    <>
                                                        {item?.icon && (
                                                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-w-5 glass-glass-glass-h-5 mr-3 glass-glass-glass-text-primary/70">
                                                                {item?.icon}
                                                            </div>
                                                        )}
                                                        <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                                                            <div className="glass-glass-glass-text-primary/90 glass-glass-glass-font-medium glass-glass-glass-truncate">
                                                                {item?.label}
                                                            </div>
                                                            {item?.description && (
                                                                <div className="glass-glass-glass-text-primary/60 glass-glass-glass-text-sm glass-glass-glass-truncate">
                                                                    {item?.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                        )}
                    </GlassCommandList>
                </div>
            </OptimizedGlass>
        </CommandContext.Provider>
    );
};

/**
 * GlassCommandDialog component
 * A modal dialog containing the command palette
 */
export const GlassCommandDialog: React.FC<GlassCommandDialogProps> = ({
    open,
    onOpenChange,
    title = 'Command Palette',
    description = 'Search for commands...',
    ...commandProps
}) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onOpenChange(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onOpenChange]);

    // Handle outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dialogRef.current && !dialogRef.current.contains(e.target as Node) && open) {
                onOpenChange(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onOpenChange]);

    if (!open) return null;

    return (
        <div className="glass-glass-glass-fixed glass-glass-glass-inset-0 z-[9999] glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-p-4 glass-surface-dark/50 backdrop-blur-md">
            <Motion
                preset="scaleIn"
                className="glass-glass-glass-w-full max-w-lg"
                onAnimationEnd={() => {
                    // Focus first input when animation completes
                    const input = dialogRef.current?.querySelector('input');
                    input?.focus();
                }}
            >
                <div ref={dialogRef}>
                    <GlassCommand {...commandProps} />
                </div>
            </Motion>
        </div>
    );
};

/**
 * GlassCommandInput component
 * Search input for the command palette
 */
export const GlassCommandInput: React.FC<GlassCommandInputProps> = ({
    className,
    ...props
}) => {
    // Convert Booleanish ARIA attributes to boolean
    const inputProps = {
        ...props,
        'aria-required': props['aria-required'] === 'true' ? true : props['aria-required'] === 'false' ? false : props['aria-required'],
        'aria-invalid': typeof props['aria-invalid'] === 'boolean' ? props['aria-invalid'] :
                        props['aria-invalid'] === 'true' ? true :
                        props['aria-invalid'] === 'false' ? false : undefined,
    };

    return (
        <div className="glass-glass-glass-relative glass-glass-glass-mb-4">
            <Search className="glass-glass-glass-absolute left-3 glass--glass--glass--glass--glassglass--glass-top-1/2 transform -translate-y-1/2 glass-glass-glass-w-4 glass-glass-glass-h-4 glass-glass-glass-text-primary/50" />
            <OptimizedGlass
                variant="clear"
                elevation={'level1'}
                className="backdrop-blur-md glass-radius-lg"
            >
                <GlassInput className={cn(
                    'w-full pl-10 pr-4 glass-py-3 bg-transparent border-0 outline-none',
                    'glass-text-primary placeholder-white/50',
                    'focus:ring-2 focus:ring-white/30',
                    className
                )}
                    {...inputProps} />
            </OptimizedGlass>
        </div>
    );
};

/**
 * GlassCommandList component
 * Scrollable list container for command items
 */
export const GlassCommandList: React.FC<GlassCommandListProps> = ({
    children,
    maxHeight = '300px',
    className,
}) => {
    return (
        <div
            className={cn('overflow-y-auto', className)}
            style={{ maxHeight }}
        >
            {children}
        </div>
    );
};

/**
 * Hook for using command palette globally
 */
export const useCommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<CommandItem[]>([]);

    const openPalette = (commands: CommandItem[]) => {
        setItems(commands);
        setIsOpen(true);
    };

    const closePalette = () => {
        setIsOpen(false);
    };

    return {
        isOpen,
        items,
        openPalette,
        closePalette,
        setIsOpen,
    };
};
