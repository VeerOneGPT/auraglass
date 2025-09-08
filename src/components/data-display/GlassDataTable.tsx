'use client';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef, useMemo, useState } from 'react';
import { OptimizedGlass } from '../../primitives';
import { IconButton } from '../button/GlassButton';
import { GlassInput } from '../input/GlassInput';
import { GlassSelect } from '../input/GlassSelect';

export interface ColumnDef<T = any> {
  id?: string;
  header: string | ((props: any) => React.ReactNode);
  accessorKey?: string;
  accessorFn?: (row: T) => any;
  cell?: (props: { row: T; value: any }) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  enableSorting?: boolean;
  enableHiding?: boolean;
}

export interface SortState {
  id: string;
  desc: boolean;
}

export interface FilterState {
  [key: string]: any;
}

export interface GlassDataTableProps<T = any> {
  /**
   * Table data
   */
  data: T[];
  /**
   * Column definitions
   */
  columns: ColumnDef<T>[];
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty state message
   */
  emptyMessage?: string;
  /**
   * Table variant
   */
  variant?: 'default' | 'striped' | 'bordered' | 'minimal';
  /**
   * Table size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Enable sorting
   */
  sortable?: boolean;
  /**
   * Enable filtering
   */
  filterable?: boolean;
  /**
   * Enable search
   */
  searchable?: boolean;
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  /**
   * Enable pagination
   */
  pagination?: boolean;
  /**
   * Page size options
   */
  pageSizeOptions?: number[];
  /**
   * Initial page size
   */
  initialPageSize?: number;
  /**
   * Enable row selection
   */
  selectable?: boolean;
  /**
   * Selection mode
   */
  selectionMode?: 'single' | 'multiple';
  /**
   * Selected rows
   */
  selectedRows?: string[];
  /**
   * Selection change handler
   */
  onSelectionChange?: (selectedRows: string[]) => void;
  /**
   * Row click handler
   */
  onRowClick?: (row: T) => void;
  /**
   * Get row ID
   */
  getRowId?: (row: T, index?: number) => string;
  /**
   * Custom row props
   */
  getRowProps?: (row: T) => React.HTMLAttributes<HTMLTableRowElement>;
  /**
   * Sticky header
   */
  stickyHeader?: boolean;
  /**
   * Table actions
   */
  actions?: React.ReactNode;
  className?: string;
  /**
   * Optional per-column cell renderers by column id or accessorKey
   */
  cellRenderers?: Record<string, (value: any, row: T) => React.ReactNode>;
  /**
   * Optional rich empty state
   */
  emptyState?: {
    icon?: React.ReactNode;
    message?: string;
    description?: string;
  };
}

/**
 * GlassDataTable component
 * A comprehensive data table with glassmorphism styling
 */
export const GlassDataTable = <T = any,>(props: GlassDataTableProps<T> & { ref?: React.Ref<HTMLDivElement> }) => {
  return <GlassDataTableInner {...props} />;
};

const GlassDataTableInner = forwardRef<HTMLDivElement, GlassDataTableProps>(
  (
    {
      data,
      columns,
      loading = false,
      emptyMessage = 'No data available',
      variant = 'default',
      size = 'md',
      sortable = true,
      filterable = false,
      searchable = true,
      searchPlaceholder = 'Search...',
      pagination = true,
      pageSizeOptions = [10, 25, 50, 100],
      initialPageSize = 10,
      selectable = false,
      selectionMode = 'multiple',
      selectedRows = [],
      onSelectionChange,
      onRowClick,
      getRowId = (row: any, index: any) => index.toString(),
      getRowProps,
      stickyHeader = false,
      actions,
      cellRenderers,
      emptyState,
      className
    },
    ref
  ) => {
    const [sortState, setSortState] = useState<SortState | null>(null);
    const [filterState, setFilterState] = useState<FilterState>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const cellPaddingClasses = {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    };

    // Filter and search data
    const filteredData = useMemo(() => {
      let result = [...data];

      // Apply search
      if (searchQuery) {
        result = result.filter(row =>
          columns.some(column => {
            const value = column.accessorFn
              ? column.accessorFn(row)
              : column.accessorKey
                ? row[column.accessorKey]
                : '';
            return String(value).toLowerCase().includes(searchQuery.toLowerCase());
          })
        );
      }

      // Apply filters
      Object.entries(filterState).forEach(([columnId, filterValue]) => {
        if (filterValue) {
          const column = columns.find(col => col.id === columnId);
          if (column) {
            result = result.filter(row => {
              const value = column.accessorFn
                ? column.accessorFn(row)
                : column.accessorKey
                  ? row[column.accessorKey]
                  : '';
              return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
            });
          }
        }
      });

      return result;
    }, [data, columns, searchQuery, filterState]);

    // Sort data
    const sortedData = useMemo(() => {
      if (!sortState) return filteredData;

      const column = columns.find(col => (col.id || `col-${columns.indexOf(col)}`) === sortState.id);
      if (!column) return filteredData;

      return [...filteredData].sort((a, b) => {
        const aValue = column.accessorFn
          ? column.accessorFn(a)
          : column.accessorKey
            ? a[column.accessorKey]
            : '';
        const bValue = column.accessorFn
          ? column.accessorFn(b)
          : column.accessorKey
            ? b[column.accessorKey]
            : '';

        if (aValue < bValue) return sortState.desc ? 1 : -1;
        if (aValue > bValue) return sortState.desc ? -1 : 1;
        return 0;
      });
    }, [filteredData, sortState, columns]);

    // Paginate data
    const paginatedData = useMemo(() => {
      if (!pagination) return sortedData;

      const startIndex = (currentPage - 1) * pageSize;
      return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, currentPage, pageSize, pagination]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    // Handle sorting
    const handleSort = (columnId: string) => {
      const column = columns.find(col => (col.id || `col-${columns.indexOf(col)}`) === columnId);
      if (!column?.sortable && !sortable) return;

      setSortState(prev => {
        if (prev?.id === columnId) {
          return prev.desc ? null : { id: columnId, desc: true };
        }
        return { id: columnId, desc: false };
      });
    };

    // Handle selection
    const handleRowSelection = (rowId: string, selected: boolean) => {
      if (!onSelectionChange) return;

      if (selectionMode === 'single') {
        onSelectionChange(selected ? [rowId] : []);
      } else {
        const newSelection = selected
          ? [...selectedRows, rowId]
          : selectedRows.filter(id => id !== rowId);
        onSelectionChange(newSelection);
      }
    };

    const handleSelectAll = (selected: boolean) => {
      if (!onSelectionChange) return;

      if (selected) {
        const allIds = paginatedData.map((row, index) => getRowId(row, index));
        onSelectionChange(allIds);
      } else {
        onSelectionChange([]);
      }
    };

    const isAllSelected = paginatedData.length > 0 &&
      paginatedData.every((row, index) => selectedRows.includes(getRowId(row, index)));

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Table header with search and actions */}
        {(searchable || actions || filterable) && (
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              {searchable && (
                <GlassInput
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                  clearable
                  className="w-64"
                />
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        )}

        {/* Table container */}
        <OptimizedGlass
          variant="frosted"
          elevation={2}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          className={cn(
            'overflow-hidden transition-all duration-500',
            variant === 'bordered' && 'border border-border/20'
          )}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table header */}
              <thead
                className={cn(
                  'relative bg-muted/20 border-b border-border/20',
                  stickyHeader && 'sticky top-0 z-10'
                )}
              >
                <tr>
                  {selectable && (
                    <th className={cn('w-12', cellPaddingClasses[size])}>
                      <GlassInput type="checkbox"
                        checked={isAllSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-border focus:ring-primary"
                      />
                    </th>
                  )}

                  {columns.map((column, index) => {
                    const columnId = column.id || `col-${index}`;
                    const headerContent = typeof column.header === 'function' ? column.header({ column }) : column.header;

                    return (
                      <th
                        key={columnId}
                        className={cn(
                          'font-semibold text-foreground border-b border-border/10 transition-all duration-200',
                          cellPaddingClasses[size],
                          sizeClasses[size],
                          {
                            'text-center': column.align === 'center',
                            'text-right': column.align === 'right',
                            'cursor-pointer hover:bg-muted/10 hover:text-foreground': column.sortable || sortable,
                          }
                        )}
                        style={{ width: column.width }}
                        onClick={() => handleSort(columnId)}
                      >
                        <div className="flex items-center gap-2">
                          <span>{headerContent}</span>

                          {(column.sortable || sortable) && (
                            <div className="flex flex-col">
                              <svg
                                className={cn(
                                  'w-3 h-3 -mb-1 transition-colors',
                                  sortState?.id === columnId && !sortState.desc
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                )}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                              </svg>
                              <svg
                                className={cn(
                                  'w-3 h-3 rotate-180 transition-colors',
                                  sortState?.id === columnId && sortState.desc
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                )}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Table body */}
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={columns.length + (selectable ? 1 : 0)}
                      className={cn('text-center', cellPaddingClasses[size])}
                    >
                      <div className="flex items-center justify-center gap-2 py-8">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-muted-foreground">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + (selectable ? 1 : 0)}
                      className={cn('text-center text-muted-foreground py-8', cellPaddingClasses[size])}
                    >
                      {emptyState ? (
                        <div className="flex flex-col items-center gap-2">
                          {emptyState.icon}
                          <div className="font-medium">{emptyState.message || emptyMessage}</div>
                          {emptyState.description && (
                            <div className="text-sm text-muted-foreground">{emptyState.description}</div>
                          )}
                        </div>
                      ) : (
                        emptyMessage
                      )}
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, index) => {
                    const rowId = getRowId(row, index);
                    const isSelected = selectedRows.includes(rowId);
                    const rowProps = getRowProps?.(row) || {};

                    return (
                      <tr
                        key={rowId}
                        className={cn(
                          'group transition-all duration-200 rounded-md',
                          {
                            'bg-muted/5': variant === 'striped' && index % 2 === 1,
                            'bg-primary/10 shadow-md shadow-primary/20 ring-1 ring-primary/20': isSelected,
                            'hover:bg-muted/10 cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 hover:ring-1 hover:ring-white/10': onRowClick,
                          }
                        )}
                        onClick={() => onRowClick?.(row)}
                        {...rowProps}
                      >
                        {selectable && (
                          <td className={cellPaddingClasses[size]}>
                            <GlassInput type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleRowSelection(rowId, e.target.checked)}
                              className="rounded border-border focus:ring-primary"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </td>
                        )}

                        {columns.map((column, colIndex) => {
                          const columnId = column.id || `col-${colIndex}`;
                          const value = column.accessorFn
                            ? column.accessorFn(row)
                            : column.accessorKey
                              ? row[column.accessorKey]
                              : '';

                          return (
                            <td
                              key={columnId}
                              className={cn(
                                'border-b border-border/5 text-foreground/80 transition-colors group-hover:text-foreground',
                                cellPaddingClasses[size],
                                sizeClasses[size],
                                {
                                  'text-center': column.align === 'center',
                                  'text-right': column.align === 'right',
                                }
                              )}
                            >
                              {column.cell
                                ? column.cell({ row, value })
                                : cellRenderers && (cellRenderers[column.id || (column.accessorKey as string) || '']
                                  ? cellRenderers[column.id || (column.accessorKey as string) || '']!(value, row as any)
                                  : String(value))}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && !loading && paginatedData.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/10 bg-muted/5">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * pageSize + 1} to{' '}
                  {Math.min(currentPage * pageSize, sortedData.length)} of{' '}
                  {sortedData.length} results
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Rows per page:</span>
                  <GlassSelect
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    options={pageSizeOptions.map(size => ({
                      value: size,
                      label: size.toString(),
                    }))}
                    size="sm"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <IconButton
                    icon="←"
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    aria-label="First page"
                  />
                  <IconButton
                    icon="‹"
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    aria-label="Previous page"
                  />

                  <span className="px-3 py-1 text-sm">
                    {currentPage} of {totalPages}
                  </span>

                  <IconButton
                    icon="›"
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    aria-label="Next page"
                  />
                  <IconButton
                    icon="→"
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    aria-label="Last page"
                  />
                </div>
              </div>
            </div>
          )}
        </OptimizedGlass>
      </div>
    );
  }
);

GlassDataTableInner.displayName = 'GlassDataTable';
