import React, { forwardRef, useState, useMemo } from 'react';
import { Glass } from '../../../primitives';
import { Motion } from '../../../primitives';
import { GlassSearchInterface } from '../../../components/interactive/GlassSearchInterface';
import { GlassDataTable } from '../../../components/data-display/GlassDataTable';
import { GlassButton, IconButton } from '../../../components/button/GlassButton';
import { GlassBadge } from '../../../components/data-display/GlassBadge';
import { PageHeader } from '../../../components/layout/GlassAppShell';
import { VStack, HStack } from '../../../components/layout/GlassStack';
import { GlassGrid, GlassGridItem } from '../../../components/layout/GlassGrid';
import { GlassCard } from '../../../components/card/GlassCard';
import { GlassInput } from '../../../components/input/GlassInput';
import { cn } from '../../../lib/utilsComprehensive';

export interface ListItem {
  id: string;
  [key: string]: any;
}

export interface ListColumn {
  id: string;
  header: string;
  accessorKey?: string;
  accessorFn?: (row: ListItem) => any;
  cell?: (props: { row: ListItem; value: any }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface ListFilter {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'range' | 'date' | 'text';
  options?: Array<{ value: string; label: string; count?: number }>;
  value?: any;
  placeholder?: string;
}

export interface ListSort {
  column: string;
  direction: 'asc' | 'desc';
}

export interface ListAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'error';
  onClick: (items: ListItem[]) => void;
  requiresSelection?: boolean;
  single?: boolean; // Only for single item selection
}

export interface GlassListViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Page title
   */
  title: string;
  /**
   * Page description
   */
  description?: string;
  /**
   * List data
   */
  data: ListItem[];
  /**
   * Table columns
   */
  columns: ListColumn[];
  /**
   * Available filters
   */
  filters?: ListFilter[];
  /**
   * Active filters
   */
  activeFilters?: Record<string, any>;
  /**
   * Filter change handler
   */
  onFiltersChange?: (filters: Record<string, any>) => void;
  /**
   * Search query
   */
  searchQuery?: string;
  /**
   * Search change handler
   */
  onSearchChange?: (query: string) => void;
  /**
   * Sort configuration
   */
  sort?: ListSort;
  /**
   * Sort change handler
   */
  onSortChange?: (sort: ListSort) => void;
  /**
   * Current page
   */
  currentPage?: number;
  /**
   * Page size
   */
  pageSize?: number;
  /**
   * Total items count
   */
  totalItems?: number;
  /**
   * Pagination change handler
   */
  onPaginationChange?: (page: number, pageSize: number) => void;
  /**
   * View mode
   */
  viewMode?: 'table' | 'grid' | 'list';
  /**
   * View mode change handler
   */
  onViewModeChange?: (mode: 'table' | 'grid' | 'list') => void;
  /**
   * Available actions
   */
  actions?: ListAction[];
  /**
   * Primary action (for create/add)
   */
  primaryAction?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  /**
   * Selected items
   */
  selectedItems?: string[];
  /**
   * Selection change handler
   */
  onSelectionChange?: (selectedIds: string[]) => void;
  /**
   * Row click handler
   */
  onRowClick?: (item: ListItem) => void;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty state
   */
  emptyState?: React.ReactNode;
  /**
   * Card renderer for grid/list view
   */
  renderCard?: (item: ListItem, index: number) => React.ReactNode;
  /**
   * Bulk selection enabled
   */
  selectable?: boolean;
}

/**
 * GlassListView component
 * Comprehensive list view with filtering, search, and multiple view modes
 */
export const GlassListView = forwardRef<HTMLDivElement, GlassListViewProps>(
  (
    {
      title,
      description,
      data = [],
      columns = [],
      filters = [],
      activeFilters = {},
      onFiltersChange,
      searchQuery = '',
      onSearchChange,
      sort,
      onSortChange,
      currentPage = 1,
      pageSize = 20,
      totalItems,
      onPaginationChange,
      viewMode = 'table',
      onViewModeChange,
      actions = [],
      primaryAction,
      selectedItems = [],
      onSelectionChange,
      onRowClick,
      loading = false,
      emptyState,
      renderCard,
      selectable = true,
      className,
      ...props
    },
    ref
  ) => {
    const [showFilters, setShowFilters] = useState(false);

    // Filter and search data locally if no external handlers
    const filteredData = useMemo(() => {
      let result = [...data];

      // Apply search
      if (searchQuery && !onSearchChange) {
        result = result.filter(item =>
          columns.some(column => {
            const value = column.accessorFn
              ? column.accessorFn(item)
              : column.accessorKey
              ? item[column.accessorKey]
              : '';
            return String(value).toLowerCase().includes(searchQuery.toLowerCase());
          })
        );
      }

      // Apply filters
      if (Object.keys(activeFilters).length > 0 && !onFiltersChange) {
        result = result.filter(item => {
          return Object.entries(activeFilters).every(([filterId, filterValue]) => {
            const filter = filters.find(f => f.id === filterId);
            if (!filter || !filterValue) return true;

            const itemValue = item[filterId];

            switch (filter.type) {
              case 'select':
                return itemValue === filterValue;
              case 'multiselect':
                return Array.isArray(filterValue) ? filterValue.includes(itemValue) : true;
              case 'text':
                return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
              case 'range':
                if (Array.isArray(filterValue) && filterValue.length === 2) {
                  return itemValue >= filterValue[0] && itemValue <= filterValue[1];
                }
                return true;
              default:
                return true;
            }
          });
        });
      }

      return result;
    }, [data, searchQuery, activeFilters, filters, columns, onSearchChange, onFiltersChange]);

    // Calculate pagination
    const totalFilteredItems = totalItems || filteredData.length;
    const totalPages = Math.ceil(totalFilteredItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = onPaginationChange ? filteredData : filteredData.slice(startIndex, endIndex);

    // Handle selection
    const handleSelectionChange = (newSelection: string[]) => {
      onSelectionChange?.(newSelection);
    };

    // Handle bulk actions
    const handleBulkAction = (action: ListAction) => {
      const selectedData = data.filter(item => selectedItems.includes(item.id));
      action.onClick(selectedData);
    };

    // Render view mode toggle
    const renderViewModeToggle = () => {
      if (!onViewModeChange) return null;

      const modes = [
        { key: 'table', icon: '📊', label: 'Table' },
        { key: 'grid', icon: '▦', label: 'Grid' },
        { key: 'list', icon: '☰', label: 'List' },
      ];

      return (
        <HStack space="none">
          {modes.map((mode) => (
            <IconButton
              key={mode.key}
              icon={mode.icon}
              variant={viewMode === mode.key ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange(mode.key as any)}
              aria-label={mode.label}
            />
          ))}
        </HStack>
      );
    };

    // Render filters
    const renderFilters = () => {
      if (!showFilters || filters.length === 0) return null;

      return (
        <Motion preset="slideDown">
          <Glass rounded="lg" className="p-4">
            <VStack space="md">
              <HStack space="sm" align="center" justify="between">
                <h3 className="text-sm font-medium text-foreground">Filters</h3>
                <GlassButton
                  variant="ghost"
                  size="sm"
                  onClick={() => onFiltersChange?.({})}
                  disabled={Object.keys(activeFilters).length === 0}
                >
                  Clear All
                </GlassButton>
              </HStack>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filters.map((filter) => (
                  <div key={filter.id}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {filter.label}
                    </label>
                    
                    {filter.type === 'select' && (
                      <select
                        value={activeFilters[filter.id] || ''}
                        onChange={(e) => onFiltersChange?.({
                          ...activeFilters,
                          [filter.id]: e.target.value
                        })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">{filter.placeholder || 'Select...'}</option>
                        {filter.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label} {option.count && `(${option.count})`}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {filter.type === 'text' && (
                      <GlassInput type="text"
                        value={activeFilters[filter.id] || ''}
                        onChange={(e) => onFiltersChange?.({
                          ...activeFilters,
                          [filter.id]: e.target.value
                        })}
                        placeholder={filter.placeholder}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                  </div>
                ))}
              </div>
            </VStack>
          </Glass>
        </Motion>
      );
    };

    // Render actions bar
    const renderActionsBar = () => {
      const hasSelectedItems = selectedItems.length > 0;
      const availableActions = actions.filter(action => 
        !action.requiresSelection || hasSelectedItems
      );

      if (availableActions.length === 0 && !primaryAction) return null;

      return (
        <HStack space="sm" align="center" justify="between">
          <HStack space="sm" align="center">
            {hasSelectedItems && (
              <span className="text-sm text-muted-foreground">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
            )}
            
            {availableActions.map((action) => (
              <GlassButton
                key={action.id}
                variant={action.variant || 'outline'}
                size="sm"
                leftIcon={action.icon}
                onClick={() => handleBulkAction(action)}
                disabled={action.requiresSelection && selectedItems.length === 0}
              >
                {action.label}
              </GlassButton>
            ))}
          </HStack>

          <HStack space="sm" align="center">
            {renderViewModeToggle()}
            
            {filters.length > 0 && (
              <IconButton
                icon="🔍"
                variant={showFilters ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
              />
            )}
            
            {primaryAction && (
              <GlassButton
                variant="default"
                size="sm"
                leftIcon={primaryAction.icon}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </GlassButton>
            )}
          </HStack>
        </HStack>
      );
    };

    // Render grid view
    const renderGridView = () => (
      <GlassGrid cols={12} gap="md">
        {currentPageData.map((item, index) => (
          <GlassGridItem key={item.id} colSpan={4}>
            {renderCard ? renderCard(item, index) : (
              <GlassCard
                variant="default"
                className="h-full cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onRowClick?.(item)}
              >
                <VStack space="sm">
                  <div className="text-sm font-medium text-foreground">
                    {item.name || item.title || item.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.description || 'No description'}
                  </div>
                </VStack>
              </GlassCard>
            )}
          </GlassGridItem>
        ))}
      </GlassGrid>
    );

    // Render list view
    const renderListView = () => (
      <VStack space="sm">
        {currentPageData.map((item, index) => (
          <Motion key={item.id} preset="slideDown" delay={index * 50}>
            {renderCard ? renderCard(item, index) : (
              <GlassCard
                variant="outlined"
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onRowClick?.(item)}
              >
                <HStack space="md" align="center">
                  {selectable && (
                    <GlassInput type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        const newSelection = e.target.checked
                          ? [...selectedItems, item.id]
                          : selectedItems.filter(id => id !== item.id);
                        handleSelectionChange(newSelection);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-border focus:ring-primary"
                    />
                  )}
                  
                  <VStack space="xs" className="flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {item.name || item.title || item.id}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.description || 'No description'}
                    </div>
                  </VStack>
                  
                  {item.status && (
                    <GlassBadge variant="outline" size="xs">
                      {item.status}
                    </GlassBadge>
                  )}
                </HStack>
              </GlassCard>
            )}
          </Motion>
        ))}
      </VStack>
    );

    // Render main content
    const renderContent = () => {
      if (loading) {
        return (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        );
      }

      if (currentPageData.length === 0) {
        return emptyState || (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-lg font-medium text-muted-foreground mb-2">
              No items found
            </div>
            <div className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </div>
          </div>
        );
      }

      switch (viewMode) {
        case 'grid':
          return renderGridView();
        case 'list':
          return renderListView();
        default:
          return (
            <GlassDataTable
              data={currentPageData}
              columns={columns}
              selectable={selectable}
              selectedRows={selectedItems}
              onSelectionChange={handleSelectionChange}
              onRowClick={onRowClick}
              getRowId={(row) => row.id}
              loading={loading}
              pagination={!!onPaginationChange}
              pageSizeOptions={[10, 20, 50, 100]}
              initialPageSize={pageSize}
            />
          );
      }
    };

    return (
      <div ref={ref} className={cn('w-full space-y-6', className)} {...props}>
        {/* Header */}
        <PageHeader
          title={title}
          description={description}
          actions={
            <GlassSearchInterface
              variant="compact"
              placeholder="Search..."
              value={searchQuery}
              onChange={onSearchChange}
              showFilters={false}
              showCategories={false}
              className="w-64"
            />
          }
        />

        {/* Actions and filters */}
        <VStack space="md">
          {renderActionsBar()}
          {renderFilters()}
        </VStack>

        {/* Content */}
        <div>
          {renderContent()}
        </div>

        {/* Pagination */}
        {onPaginationChange && totalPages > 1 && (
          <HStack space="sm" align="center" justify="center">
            <GlassButton
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => onPaginationChange(currentPage - 1, pageSize)}
            >
              Previous
            </GlassButton>
            
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <GlassButton
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => onPaginationChange(currentPage + 1, pageSize)}
            >
              Next
            </GlassButton>
          </HStack>
        )}
      </div>
    );
  }
);

GlassListView.displayName = 'GlassListView';
