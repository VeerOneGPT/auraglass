'use client';

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useAccessibility } from '../../hooks/useAccessibility';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
  score: number;
  metadata?: Record<string, any>;
  highlights?: {
    title?: string[];
    description?: string[];
  };
}

export interface SearchFilter {
  id: string;
  name: string;
  type: 'select' | 'multiselect' | 'range' | 'date' | 'boolean';
  options?: Array<{ value: string; label: string; count?: number }>;
  range?: { min: number; max: number; step?: number };
  value?: any;
}

export interface SearchSuggestion {
  text: string;
  type: 'query' | 'category' | 'tag' | 'filter';
  category?: string;
  count?: number;
}

export interface IntelligentSearchProps {
  data: SearchResult[];
  onSearch?: (query: string, filters: Record<string, any>) => void;
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
  showFilters?: boolean;
  showSuggestions?: boolean;
  enableNLP?: boolean;
  enableVoiceSearch?: boolean;
  maxResults?: number;
  className?: string;
}

// NLP Query Analysis
const analyzeQuery = (query: string): {
  intent: string;
  entities: Array<{ type: string; value: string }>;
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
} => {
  const lowercaseQuery = query.toLowerCase();
  
  // Intent detection
  let intent = 'search';
  if (lowercaseQuery.includes('find') || lowercaseQuery.includes('show') || lowercaseQuery.includes('get')) {
    intent = 'retrieve';
  } else if (lowercaseQuery.includes('compare') || lowercaseQuery.includes('vs') || lowercaseQuery.includes('versus')) {
    intent = 'compare';
  } else if (lowercaseQuery.includes('best') || lowercaseQuery.includes('top') || lowercaseQuery.includes('recommend')) {
    intent = 'recommend';
  } else if (lowercaseQuery.includes('help') || lowercaseQuery.includes('how to') || lowercaseQuery.includes('tutorial')) {
    intent = 'help';
  }

  // Entity extraction (simplified)
  const entities: Array<{ type: string; value: string }> = [];
  
  // Date entities
  const dateMatches = query.match(/(\d{4}|\d{1,2}\/\d{1,2}\/\d{4}|today|yesterday|last week|this month)/gi);
  dateMatches?.forEach(match => {
    entities.push({ type: 'date', value: match });
  });

  // Number entities
  const numberMatches = query.match(/\b\d+(?:\.\d+)?\b/g);
  numberMatches?.forEach(match => {
    entities.push({ type: 'number', value: match });
  });

  // Category entities (simplified)
  const categories = ['product', 'service', 'article', 'document', 'image', 'video', 'user', 'project'];
  categories.forEach(category => {
    if (lowercaseQuery.includes(category)) {
      entities.push({ type: 'category', value: category });
    }
  });

  // Sentiment analysis (simplified)
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'best', 'love', 'fantastic'];
  const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'horrible', 'useless'];
  
  const hasPositive = positiveWords.some(word => lowercaseQuery.includes(word));
  const hasNegative = negativeWords.some(word => lowercaseQuery.includes(word));
  
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  if (hasPositive && !hasNegative) sentiment = 'positive';
  else if (hasNegative && !hasPositive) sentiment = 'negative';

  // Extract keywords (remove stop words)
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those'];
  const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word))
    .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates

  return { intent, entities, sentiment, keywords };
};

// Advanced search algorithm with NLP
const performIntelligentSearch = (
  query: string, 
  data: SearchResult[], 
  filters: Record<string, any>,
  enableNLP: boolean = true
): SearchResult[] => {
  if (!query.trim() && Object.keys(filters).length === 0) {
    return data;
  }

  const analysis = enableNLP ? analyzeQuery(query) : null;
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);

  return data
    .map(item => {
      let score = 0;

      // Text matching with different weights
      const titleMatch = searchTerms.reduce((acc, term) => {
        return acc + (item.title.toLowerCase().includes(term) ? 1 : 0);
      }, 0);
      
      const descriptionMatch = searchTerms.reduce((acc, term) => {
        return acc + (item.description.toLowerCase().includes(term) ? 0.5 : 0);
      }, 0);

      const tagMatch = searchTerms.reduce((acc, term) => {
        return acc + item.tags.filter(tag => tag.toLowerCase().includes(term)).length * 0.7;
      }, 0);

      score = titleMatch * 3 + descriptionMatch + tagMatch;

      // NLP-based scoring boost
      if (analysis && enableNLP) {
        // Intent-based scoring
        if (analysis.intent === 'recommend' && item.metadata?.rating) {
          score += item.metadata.rating * 0.5;
        }
        
        // Entity matching
        analysis.entities.forEach(entity => {
          if (entity.type === 'category' && item.category.toLowerCase().includes(entity.value)) {
            score += 1;
          }
        });

        // Keyword density bonus
        const keywordMatches = analysis.keywords.filter(keyword => 
          item.title.toLowerCase().includes(keyword) || 
          item.description.toLowerCase().includes(keyword)
        ).length;
        score += keywordMatches * 0.3;
      }

      // Filter matching
      let passesFilters = true;
      Object.entries(filters).forEach(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return;
        
        switch (key) {
          case 'category':
            if (Array.isArray(value)) {
              passesFilters = passesFilters && value.includes(item.category);
            } else {
              passesFilters = passesFilters && item.category === value;
            }
            break;
          case 'tags':
            if (Array.isArray(value)) {
              passesFilters = passesFilters && value.some(tag => item.tags.includes(tag));
            }
            break;
          case 'dateRange':
            if (item.metadata?.date) {
              const itemDate = new Date(item.metadata.date);
              const startDate = new Date(value.start);
              const endDate = new Date(value.end);
              passesFilters = passesFilters && itemDate >= startDate && itemDate <= endDate;
            }
            break;
          case 'rating':
            if (item.metadata?.rating) {
              passesFilters = passesFilters && item.metadata.rating >= value;
            }
            break;
        }
      });

      if (!passesFilters) {
        score = 0;
      }

      // Generate highlights
      const highlights: { title?: string[]; description?: string[] } = {};
      if (score > 0) {
        searchTerms.forEach(term => {
          if (item.title.toLowerCase().includes(term)) {
            if (!highlights.title) highlights.title = [];
            highlights.title.push(term);
          }
          if (item.description.toLowerCase().includes(term)) {
            if (!highlights.description) highlights.description = [];
            highlights.description.push(term);
          }
        });
      }

      return {
        ...item,
        score,
        highlights
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
};

// Generate search suggestions
const generateSuggestions = (
  query: string, 
  data: SearchResult[], 
  recentSearches: string[]
): SearchSuggestion[] => {
  const suggestions: SearchSuggestion[] = [];
  const lowercaseQuery = query.toLowerCase();

  // Recent searches
  recentSearches
    .filter(search => search.toLowerCase().includes(lowercaseQuery))
    .slice(0, 3)
    .forEach(search => {
      suggestions.push({
        text: search,
        type: 'query'
      });
    });

  // Category suggestions
  const categories = [...new Set(data.map(item => item.category))];
  categories
    .filter(category => category.toLowerCase().includes(lowercaseQuery))
    .slice(0, 3)
    .forEach(category => {
      const count = data.filter(item => item.category === category).length;
      suggestions.push({
        text: category,
        type: 'category',
        category: 'Categories',
        count
      });
    });

  // Tag suggestions
  const allTags = data.flatMap(item => item.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(tagCounts)
    .filter(([tag]) => tag.toLowerCase().includes(lowercaseQuery))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .forEach(([tag, count]) => {
      suggestions.push({
        text: tag,
        type: 'tag',
        category: 'Tags',
        count
      });
    });

  return suggestions;
};

export const GlassIntelligentSearch: React.FC<IntelligentSearchProps> = ({
  data,
  onSearch,
  onResultClick,
  placeholder = "Search with natural language...",
  showFilters = true,
  showSuggestions = true,
  enableNLP = true,
  enableVoiceSearch = false,
  maxResults = 50,
  className
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchAnalysis, setSearchAnalysis] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const suggestionRefs = useRef<(HTMLElement | null)[]>([]);
  
  const accessibility = useAccessibility();

  // Generate available filters from data
  const availableFilters = useMemo((): SearchFilter[] => {
    const categories = [...new Set(data.map(item => item.category))];
    const allTags = data.flatMap(item => item.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topTags = Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([tag, count]) => ({ value: tag, label: tag, count }));

    return [
      {
        id: 'category',
        name: 'Category',
        type: 'multiselect',
        options: categories.map(cat => ({ 
          value: cat, 
          label: cat, 
          count: data.filter(item => item.category === cat).length 
        }))
      },
      {
        id: 'tags',
        name: 'Tags',
        type: 'multiselect',
        options: topTags
      },
      {
        id: 'rating',
        name: 'Minimum Rating',
        type: 'range',
        range: { min: 0, max: 5, step: 0.5 }
      }
    ];
  }, [data]);

  // Debounced search
  const performSearch = useCallback((searchQuery: string, currentFilters: Record<string, any>) => {
    setIsSearching(true);
    
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      const searchResults = performIntelligentSearch(searchQuery, data, currentFilters, enableNLP);
      const limitedResults = searchResults.slice(0, maxResults);
      
      setResults(limitedResults);
      setIsSearching(false);
      
      if (enableNLP && searchQuery.trim()) {
        setSearchAnalysis(analyzeQuery(searchQuery));
      }
      
      onSearch?.(searchQuery, currentFilters);
    }, 300);
  }, [data, enableNLP, maxResults, onSearch]);

  // Update suggestions when query changes
  useEffect(() => {
    if (query.length > 0) {
      const newSuggestions = generateSuggestions(query, data, recentSearches);
      setSuggestions(newSuggestions);
      setShowSuggestionsList(true);
    } else {
      setSuggestions([]);
      setShowSuggestionsList(false);
    }
  }, [query, data, recentSearches]);

  // Perform search when query or filters change
  useEffect(() => {
    performSearch(query, filters);
  }, [query, filters, performSearch]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'query') {
      setQuery(suggestion.text);
    } else if (suggestion.type === 'category') {
      setFilters(prev => ({
        ...prev,
        category: [...(prev.category || []), suggestion.text]
      }));
    } else if (suggestion.type === 'tag') {
      setFilters(prev => ({
        ...prev,
        tags: [...(prev.tags || []), suggestion.text]
      }));
    }
    setShowSuggestionsList(false);
    searchInputRef.current?.focus();
  };

  const handleSearchSubmit = () => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => [query.trim(), ...prev.slice(0, 9)]);
    }
    setShowSuggestionsList(false);
  };

  const handleFilterChange = (filterId: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const startVoiceSearch = () => {
    if (!enableVoiceSearch || !('webkitSpeechRecognition' in window)) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const highlightText = (text: string, highlights: string[] = []) => {
    if (!highlights.length) return text;
    
    let highlightedText = text;
    highlights.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const getResultIcon = (category: string) => {
    const icons: Record<string, string> = {
      'document': '📄',
      'article': '📝',
      'image': '🖼️',
      'video': '🎥',
      'product': '🛍️',
      'user': '👤',
      'project': '📁',
      'service': '⚙️'
    };
    return icons[category.toLowerCase()] || '🔍';
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Search Input */}
      <Glass className="glass-glass-glass-relative">
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-glass-glass-p-4">
          <div className="glass-glass-glass-relative glass-glass-glass-flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                } else if (e.key === 'Escape') {
                  setShowSuggestionsList(false);
                }
              }}
              onFocus={() => setShowSuggestionsList(suggestions.length > 0)}
              placeholder={placeholder}
              className="glass-glass-glass-w-full pl-10 pr-4 glass-glass-glass-py-3 glass-glass-glass-border glass-glass-glass-border-subtle glass-radius-lg focus:ring-2 focus:ring-blue-500 focus:glass-glass-glass-border-blue"
              aria-label="Search input"
            />
            
            <div className="glass-glass-glass-absolute left-3 glass--glass--glass--glass--glassglass--glass-top-1/2 transform -translate-y-1/2">
              {isSearching ? (
                <div className="animate-spin glass-glass-glass-w-5 glass-glass-glass-h-5 glass-glass-glass-border-2 glass-glass-glass-border-blue glass-glass-glass-border-t-transparent glass-radius-full" />
              ) : (
                <span className="glass-text-secondary glass-glass-glass-text-lg">🔍</span>
              )}
            </div>
          </div>

          {enableVoiceSearch && (
            <button
              onClick={startVoiceSearch}
              disabled={isListening}
              className={cn(
                "px-3 py-3 rounded-lg transition-colors",
                isListening 
                  ? "bg-red-100 text-red-600 animate-pulse"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              title="Voice search"
            >
              🎤
            </button>
          )}

          <button
            onClick={handleSearchSubmit}
            className="glass-glass-glass-px-6 glass-glass-glass-py-3 glass-surface-blue glass-glass-glass-text-primary glass-radius-lg hover:glass-surface-blue transition-colors"
          >
            Search
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestionsList && suggestions.length > 0 && (
          <div className="glass-glass-glass-absolute top-full left-0 right-0 mt-2 glass-surface-subtle glass-glass-glass-border glass-glass-glass-border-subtle glass-radius-lg glass-glass-glass-shadow-lg glass-glass-glass-z-50 max-h-60 glass-glass-glass-overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${suggestion.text}`}
                ref={el => suggestionRefs.current[index] = el}
                onClick={() => handleSuggestionClick(suggestion)}
                className="glass-glass-glass-w-full glass-glass-glass-px-4 glass-glass-glass-py-2 glass-glass-glass-text-left hover:glass-surface-subtle glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-border-b glass-glass-glass-border-gray-100 last:glass-glass-glass-border-b-0"
              >
                <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                  <span className="glass-glass-glass-text-sm">
                    {suggestion.type === 'query' && '🔍'}
                    {suggestion.type === 'category' && '📁'}
                    {suggestion.type === 'tag' && '🏷️'}
                  </span>
                  <span className="glass-text-secondary">{suggestion.text}</span>
                  {suggestion.category && (
                    <span className="glass-glass-glass-text-xs glass-text-secondary">in {suggestion.category}</span>
                  )}
                </div>
                {suggestion.count && (
                  <span className="glass-glass-glass-text-xs glass-text-secondary">{suggestion.count}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </Glass>

      {/* NLP Analysis Display */}
      {enableNLP && searchAnalysis && query.trim() && (
        <Glass className="mt-4 glass-glass-glass-p-4 glass-surface-subtle">
          <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-4 glass-glass-glass-text-sm">
            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
              <span className="glass-glass-glass-font-medium glass-glass-glass-text-primary">Intent:</span>
              <span className="glass-glass-glass-px-2 glass-glass-glass-py-1 glass-surface-subtle glass-glass-glass-text-primary glass-radius glass-glass-glass-capitalize">
                {searchAnalysis.intent}
              </span>
            </div>
            
            {searchAnalysis.entities.length > 0 && (
              <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                <span className="glass-glass-glass-font-medium glass-glass-glass-text-primary">Entities:</span>
                <div className="glass-glass-glass-flex glass-glass-glass-gap-1">
                  {searchAnalysis.entities.slice(0, 3).map((entity: any, index: number) => (
                    <span key={index} className="glass-glass-glass-px-2 glass-glass-glass-py-1 glass-surface-subtle glass-glass-glass-text-primary glass-radius glass-glass-glass-text-xs">
                      {entity.type}: {entity.value}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
              <span className="glass-glass-glass-font-medium glass-glass-glass-text-primary">Keywords:</span>
              <div className="glass-glass-glass-flex glass-glass-glass-gap-1">
                {searchAnalysis.keywords.slice(0, 4).map((keyword: string, index: number) => (
                  <span key={index} className="glass-glass-glass-px-2 glass-glass-glass-py-1 glass-surface-subtle glass-glass-glass-text-primary glass-radius glass-glass-glass-text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Glass>
      )}

      {/* Filters */}
      {showFilters && availableFilters.length > 0 && (
        <Glass className="mt-4 glass-glass-glass-p-4">
          <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-4">
            <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold glass-text-secondary">Filters</h3>
            {Object.keys(filters).length > 0 && (
              <button
                onClick={clearFilters}
                className="glass-glass-glass-text-sm glass-glass-glass-text-primary hover:glass-glass-glass-text-primary"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-4">
            {availableFilters.map(filter => (
              <div key={filter.id}>
                <label className="glass-glass-glass-block glass-glass-glass-text-sm glass-glass-glass-font-medium glass-text-secondary glass-glass-glass-mb-2">
                  {filter.name}
                </label>
                
                {filter.type === 'multiselect' && (
                  <div className="glass-glass-glass-space-y-2 max-glass-glass-glass-h-32 glass-glass-glass-overflow-y-auto">
                    {filter.options?.map(option => (
                      <label key={option.value} className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-glass-glass-text-sm">
                        <input
                          type="checkbox"
                          checked={filters[filter.id]?.includes(option.value) || false}
                          onChange={(e) => {
                            const current = filters[filter.id] || [];
                            if (e.target.checked) {
                              handleFilterChange(filter.id, [...current, option.value]);
                            } else {
                              handleFilterChange(filter.id, current.filter((v: string) => v !== option.value));
                            }
                          }}
                          className="glass-radius glass-glass-glass-border-subtle glass-glass-glass-text-primary focus:ring-blue-500"
                        />
                        <span className="glass-glass-glass-flex-1">{option.label}</span>
                        <span className="glass-text-secondary glass-glass-glass-text-xs">({option.count})</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {filter.type === 'range' && filter.range && (
                  <div>
                    <input
                      type="range"
                      min={filter.range.min}
                      max={filter.range.max}
                      step={filter.range.step || 1}
                      value={filters[filter.id] || filter.range.min}
                      onChange={(e) => handleFilterChange(filter.id, parseFloat(e.target.value))}
                      className="glass-glass-glass-w-full"
                    />
                    <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-text-xs glass-text-secondary mt-1">
                      <span>{filter.range.min}</span>
                      <span className="glass-glass-glass-font-medium">{filters[filter.id] || filter.range.min}</span>
                      <span>{filter.range.max}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Glass>
      )}

      {/* Results */}
      <div className="mt-6">
        {query.trim() || Object.keys(filters).length > 0 ? (
          <div className="glass-glass-glass-mb-4 glass-glass-glass-text-sm glass-text-secondary">
            Found {results.length} results
            {query.trim() && (
              <span> for "<span className="glass-glass-glass-font-medium">{query}</span>"</span>
            )}
            {Object.keys(filters).length > 0 && (
              <span> with {Object.keys(filters).length} filters applied</span>
            )}
          </div>
        ) : null}

        <div className="glass-glass-glass-space-y-4">
          {results.map(result => (
            <Glass
              key={result.id}
              className="glass-glass-glass-p-6 glass-glass-glass-cursor-pointer hover:glass-glass-glass-shadow-lg transition-glass-glass-glass-shadow"
              onClick={() => onResultClick?.(result)}
            >
              <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-4">
                <div className="glass-glass-glass-text-2xl">{getResultIcon(result.category)}</div>
                
                <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                  <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3 glass-glass-glass-mb-2">
                    <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold glass-text-secondary">
                      {highlightText(result.title, result.highlights?.title)}
                    </h3>
                    <span className="glass-glass-glass-px-2 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-surface-subtle glass-text-secondary glass-radius">
                      {result.category}
                    </span>
                    {result.metadata?.rating && (
                      <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-1">
                        <span className="glass-glass-glass-text-primary">⭐</span>
                        <span className="glass-glass-glass-text-sm glass-text-secondary">{result.metadata.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="glass-text-secondary glass-glass-glass-mb-3">
                    {highlightText(result.description, result.highlights?.description)}
                  </p>
                  
                  {result.tags.length > 0 && (
                    <div className="glass-glass-glass-flex glass-glass-glass-flex-wrap glass-glass-glass-gap-1">
                      {result.tags.slice(0, 5).map(tag => (
                        <span
                          key={tag}
                          className="glass-glass-glass-px-2 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-surface-subtle glass-glass-glass-text-primary glass-radius"
                        >
                          {tag}
                        </span>
                      ))}
                      {result.tags.length > 5 && (
                        <span className="glass-glass-glass-px-2 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-surface-subtle glass-text-secondary glass-radius">
                          +{result.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="glass-glass-glass-text-sm glass-text-secondary">
                  Score: {result.score.toFixed(1)}
                </div>
              </div>
            </Glass>
          ))}
          
          {results.length === 0 && (query.trim() || Object.keys(filters).length > 0) && !isSearching && (
            <div className="glass-glass-glass-text-center glass-glass-glass-py-12 glass-text-secondary">
              <div className="glass-glass-glass-text-6xl glass-glass-glass-mb-4">🔍</div>
              <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-medium glass-glass-glass-mb-2">No results found</h3>
              <p className="glass-glass-glass-text-sm">
                Try adjusting your search terms or filters, or try using more general keywords.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
