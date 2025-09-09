import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Filter, Search, SlidersHorizontal, Tag, X } from 'lucide-react';
import React, { useCallback, useMemo, useState } from 'react';
import { cn } from '../../lib/utilsComprehensive';
import { OptimizedGlass } from '../../primitives';
import { GlassButton } from '../button/GlassButton';
import { GlassCheckbox } from '../input/GlassCheckbox';
import { GlassDateRangePicker } from '../input/GlassDateRangePicker';
import { GlassInput } from '../input/GlassInput';
import { GlassSlider } from '../input/GlassSlider';

export interface Facet {
    id: string;
    label: string;
    type: 'checkbox' | 'range' | 'select' | 'daterange';
    options?: FacetOption[];
    min?: number;
    max?: number;
    step?: number;
    collapsed?: boolean;
    showCount?: boolean;
}

export interface FacetOption {
    id: string;
    label: string;
    value: string;
    count?: number;
    selected?: boolean;
    disabled?: boolean;
}

export interface SearchResult {
    id: string;
    title: string;
    description?: string;
    category?: string;
    tags?: string[];
    score?: number;
    metadata?: Record<string, any>;
}

export interface GlassFacetSearchProps {
    query: string;
    onQueryChange: (query: string) => void;
    facets: Facet[];
    facetValues: Record<string, any>;
    onFacetChange: (facetId: string, value: any) => void;
    results: SearchResult[];
    onResultSelect?: (result: SearchResult) => void;
    placeholder?: string;
    loading?: boolean;
    showFilters?: boolean;
    showResults?: boolean;
    maxResults?: number;
    className?: string;
    onSearch?: (query: string, filters: Record<string, any>) => void;
    suggestions?: string[];
    onSuggestionSelect?: (suggestion: string) => void;
    recentSearches?: string[];
    onRecentSearchSelect?: (search: string) => void;
    variant?: 'default' | 'compact' | 'minimal';
    size?: 'sm' | 'md' | 'lg';
    elevation?: 'low' | 'medium' | 'high';
}

const GlassFacetSearch = React.forwardRef<HTMLDivElement, GlassFacetSearchProps>(
    ({
        query,
        onQueryChange,
        facets,
        facetValues,
        onFacetChange,
        results,
        onResultSelect,
        placeholder = 'Search...',
        loading = false,
        showFilters = true,
        showResults = true,
        maxResults = 10,
        className,
        onSearch,
        suggestions = [],
        onSuggestionSelect,
        recentSearches = [],
        onRecentSearchSelect,
        variant = 'default',
        size = 'md',
        elevation = 'medium',
        ...props
    }, ref) => {
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [expandedFacets, setExpandedFacets] = useState<Record<string, boolean>>(
            Object.fromEntries(facets.map(f => [f.id, !f.collapsed]))
        );
        const [showFacetPanel, setShowFacetPanel] = useState(showFilters);

        const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            const newQuery = e.target.value;
            onQueryChange(newQuery);
            setShowSuggestions(true);
        }, [onQueryChange]);

        const handleSearch = useCallback(() => {
            onSearch?.(query, facetValues);
            setShowSuggestions(false);
        }, [query, facetValues, onSearch]);

        const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSearch();
            } else if (e.key === 'Escape') {
                setShowSuggestions(false);
            }
        }, [handleSearch]);

        const handleFacetToggle = useCallback((facetId: string) => {
            setExpandedFacets(prev => ({
                ...prev,
                [facetId]: !prev[facetId]
            }));
        }, []);

        const handleFacetChange = useCallback((facetId: string, value: any) => {
            onFacetChange(facetId, value);
            // Auto-search when facets change
            setTimeout(() => onSearch?.(query, { ...facetValues, [facetId]: value }), 300);
        }, [onFacetChange, onSearch, query, facetValues]);

        const clearFilters = useCallback(() => {
            const clearedValues = Object.fromEntries(
                facets.map(f => [f.id, f.type === 'checkbox' ? [] : null])
            );
            Object.keys(clearedValues).forEach(facetId => {
                onFacetChange(facetId, clearedValues[facetId]);
            });
            onSearch?.(query, clearedValues);
        }, [facets, onFacetChange, onSearch, query]);

        const hasActiveFilters = useMemo(() => {
            return Object.values(facetValues).some(value =>
                Array.isArray(value) ? (value?.length || 0) > 0 : value != null
            );
        }, [facetValues]);

        const displayedResults = useMemo(() => {
            return results.slice(0, maxResults);
        }, [results, maxResults]);

        const sizeClasses = {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg'
        };

        const variantClasses = {
            default: 'p-6',
            compact: 'p-4',
            minimal: 'p-2'
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
                    'rounded-xl',
                    elevationClasses[elevation],
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            >
                {/* Search Input */}
                <div className="relative mb-4">
                    <GlassInput
                        value={query}
                        onChange={handleQueryChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="w-full pr-12"
                        leftIcon={<Search className="w-4 h-4" />}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {loading && (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        {query && (
                            <button
                                onClick={() => onQueryChange('')}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                        {showFilters && (
                            <GlassButton
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowFacetPanel(!showFacetPanel)}
                                className={cn(
                                    'transition-colors',
                                    hasActiveFilters && 'text-blue-400'
                                )}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                            </GlassButton>
                        )}
                    </div>

                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-1 z-10 max-h-60 overflow-y-auto"
                            >
                                <OptimizedGlass elevation={2} className="rounded-lg overflow-hidden shadow-lg">
                                {suggestions.length > 0 && (
                                    <div className="p-2">
                                        <div className="text-xs text-white/70 px-2 py-1">Suggestions</div>
                                        {suggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    onSuggestionSelect?.(suggestion);
                                                    onQueryChange(suggestion);
                                                    setShowSuggestions(false);
                                                }}
                                                className="w-full text-left px-2 py-1 text-sm text-white hover:bg-white/10 rounded transition-colors"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {recentSearches.length > 0 && (
                                    <div className="p-2 border-t border-white/10">
                                        <div className="text-xs text-white/70 px-2 py-1">Recent Searches</div>
                                        {recentSearches.map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    onRecentSearchSelect?.(search);
                                                    onQueryChange(search);
                                                    setShowSuggestions(false);
                                                }}
                                                className="w-full text-left px-2 py-1 text-sm text-white hover:bg-white/10 rounded transition-colors"
                                            >
                                                {search}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                </OptimizedGlass>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Facet Panel */}
                <AnimatePresence>
                    {showFacetPanel && showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-6 border border-white/20 rounded-lg overflow-hidden"
                        >
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-white flex items-center gap-2">
                                        <Filter className="w-4 h-4" />
                                        Filters
                                    </h3>
                                    {hasActiveFilters && (
                                        <GlassButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearFilters}
                                            className="text-white/70 hover:text-white"
                                        >
                                            Clear All
                                        </GlassButton>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {facets.map((facet) => (
                                        <FacetGroup
                                            key={facet.id}
                                            facet={facet}
                                            value={facetValues[facet.id]}
                                            onChange={(value) => handleFacetChange(facet.id, value)}
                                            expanded={expandedFacets[facet.id]}
                                            onToggle={() => handleFacetToggle(facet.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results */}
                {showResults && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-white">
                                Results {results.length > 0 && `(${results.length})`}
                            </h3>
                            {results.length > maxResults && (
                                <span className="text-sm text-white/70">
                                    Showing {maxResults} of {results.length}
                                </span>
                            )}
                        </div>

                        <AnimatePresence>
                            {loading ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center py-8"
                                >
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </motion.div>
                            ) : displayedResults.length > 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-2"
                                >
                                    {displayedResults.map((result, index) => (
                                        <motion.div
                                            key={result.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ring-1 ring-transparent hover:ring-white/10"
                                            onClick={() => onResultSelect?.(result)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white">{result.title}</h4>
                                                    {result.description && (
                                                        <p className="text-sm text-white/70 mt-1">{result.description}</p>
                                                    )}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        {result.category && (
                                                            <span className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded">
                                                                {result.category}
                                                            </span>
                                                        )}
                                                        {result.tags && result.tags.map((tag, tagIndex) => (
                                                            <span key={tagIndex} className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded">
                                                                <Tag className="w-3 h-3" />
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                {result.score && (
                                                    <div className="text-xs text-white/50">
                                                        {Math.round(result.score * 100)}%
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : query ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8 text-white/70"
                                >
                                    No results found for "{query}"
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center py-8 text-white/70"
                                >
                                    Start typing to search...
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        );
    }
);

GlassFacetSearch.displayName = 'GlassFacetSearch';

// Facet Group Component
interface FacetGroupProps {
    facet: Facet;
    value: any;
    onChange: (value: any) => void;
    expanded: boolean;
    onToggle: () => void;
}

const FacetGroup: React.FC<FacetGroupProps> = ({
    facet,
    value,
    onChange,
    expanded,
    onToggle
}) => {
    return (
        <div className="border border-white/10 rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 text-left hover:bg-white/5 transition-colors"
            >
                <span className="font-medium text-white">{facet.label}</span>
                {expanded ? (
                    <ChevronDown className="w-4 h-4 text-white/70" />
                ) : (
                    <ChevronRight className="w-4 h-4 text-white/70" />
                )}
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-3"
                    >
                        <FacetContent
                            facet={facet}
                            value={value}
                            onChange={onChange}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Facet Content Component
interface FacetContentProps {
    facet: Facet;
    value: any;
    onChange: (value: any) => void;
}

const FacetContent: React.FC<FacetContentProps> = ({
    facet,
    value,
    onChange
}) => {
    switch (facet.type) {
        case 'checkbox':
            return (
                <div className="space-y-2">
                    {facet.options?.map((option) => (
                        <div key={option.id} className="flex items-center justify-between">
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
                            {facet.showCount && option.count != null && (
                                <span className="text-xs text-white/50">({option.count})</span>
                            )}
                        </div>
                    ))}
                </div>
            );

        case 'range':
            return (
                <div className="space-y-3">
                    <GlassSlider
                        min={facet.min || 0}
                        max={facet.max || 100}
                        step={facet.step || 1}
                        value={Array.isArray(value) ? value : [facet.min || 0]}
                        onValueChange={onChange}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-white/70">
                        <span>{facet.min || 0}</span>
                        <span>{facet.max || 100}</span>
                    </div>
                </div>
            );

        case 'select':
            return (
                <div className="space-y-2">
                    {facet.options?.map((option) => (
                        <GlassCheckbox
                            key={option.id}
                            id={option.id}
                            checked={value === option.value}
                            onCheckedChange={(checked) => {
                                onChange(checked ? option.value : null);
                            }}
                            disabled={option.disabled}
                            label={option.label}
                        />
                    ))}
                </div>
            );

        case 'daterange':
            return (
                <GlassDateRangePicker
                    value={value}
                    onChange={onChange}
                    placeholder="Select date range"
                />
            );

        default:
            return null;
    }
};

export { GlassFacetSearch };
