'use client';

import React, { forwardRef, useState } from 'react';
import { Glass } from '../../../primitives/glass/Glass';
import { Motion } from '../../../primitives/motion/Motion';
import { GlassButton, IconButton } from '../../../components/button/GlassButton';
import { GlassBadge } from '../../../components/data-display/GlassBadge';
import { VStack, HStack } from '../../../components/layout/GlassStack';
import { cn } from '@/lib/utils';

export interface TableColumn {
  id: string;
  header: string;
  accessor: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableRow {
  id: string;
  [key: string]: any;
}

export interface TableData {
  title: string;
  subtitle?: string;
  columns: TableColumn[];
  rows: TableRow[];
  summary?: {
    total?: number;
    filtered?: number;
    message?: string;
  };
}

export interface TableWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Table data
   */
  data: TableData;
  /**
   * Widget variant
   */
  variant?: 'default' | 'minimal' | 'compact';
  /**
   * Table size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Maximum rows to display
   */
  maxRows?: number;
  /**
   * Whether to show header
   */
  showHeader?: boolean;
  /**
   * Whether table is sortable
   */
  sortable?: boolean;
  /**
   * Whether to show row numbers
   */
  showRowNumbers?: boolean;
  /**
   * Row hover effect
   */
  hoverable?: boolean;
  /**
   * Striped rows
   */
  striped?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Table actions
   */
  actions?: React.ReactNode;
  /**
   * Row click handler
   */
  onRowClick?: (row: TableRow) => void;
  /**
   * Sort handler
   */
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
}

/**
 * TableWidget component
 * Display tabular data with sorting and styling
 */
export const TableWidget = forwardRef<HTMLDivElement, TableWidgetProps>(
  (
    {
      data,
      variant = 'default',
      size = 'md',
      maxRows = 5,
      showHeader = true,
      sortable = true,
      showRowNumbers = false,
      hoverable = true,
      striped = false,
      loading = false,
      actions,
      onRowClick,
      onSort,
      className,
      ...props
    },
    ref
  ) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sizeClasses = {
      sm: {
        padding: 'p-3',
        title: 'text-sm',
        subtitle: 'text-xs',
        cell: 'px-2 py-1 text-xs',
        header: 'px-2 py-2 text-xs',
      },
      md: {
        padding: 'p-4',
        title: 'text-base',
        subtitle: 'text-sm',
        cell: 'px-3 py-2 text-sm',
        header: 'px-3 py-2 text-sm',
      },
      lg: {
        padding: 'p-6',
        title: 'text-lg',
        subtitle: 'text-base',
        cell: 'px-4 py-3 text-base',
        header: 'px-4 py-3 text-base',
      },
    };

    const config = sizeClasses[size];

    // Handle column sort
    const handleSort = (columnId: string) => {
      const column = data.columns.find(col => col.id === columnId);
      if (!column?.sortable && !sortable) return;

      const newDirection = sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc';
      setSortColumn(columnId);
      setSortDirection(newDirection);
      onSort?.(columnId, newDirection);
    };

    // Sort data if local sorting
    const sortedRows = React.useMemo(() => {
      if (!sortColumn || onSort) return data.rows;

      const column = data.columns.find(col => col.id === sortColumn);
      if (!column) return data.rows;

      return [...data.rows].sort((a, b) => {
        const aValue = a[column.accessor];
        const bValue = b[column.accessor];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }, [data.rows, data.columns, sortColumn, sortDirection, onSort]);

    const displayRows = sortedRows.slice(0, maxRows);

    const renderCellContent = (column: TableColumn, row: TableRow) => {
      const value = row[column.accessor];
      
      if (column.render) {
        return column.render(value, row);
      }

      // Default renderers for common data types
      if (typeof value === 'boolean') {
        return (
          <GlassBadge variant={value ? 'success' : 'error'} size="xs">
            {value ? 'Yes' : 'No'}
          </GlassBadge>
        );
      }

      if (typeof value === 'number') {
        return value.toLocaleString();
      }

      if (value === null || value === undefined) {
        return <span className="text-muted-foreground">—</span>;
      }

      return String(value);
    };

    const renderTable = () => {
      if (loading) {
        return (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        );
      }

      if (displayRows.length === 0) {
        return (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            No data available
          </div>
        );
      }

      return (
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Header */}
            {showHeader && (
              <thead>
                <tr className="border-b border-border/20">
                  {showRowNumbers && (
                    <th className={cn(config.header, 'w-12 text-left font-medium text-muted-foreground')}>
                      #
                    </th>
                  )}
                  {data.columns.map((column) => (
                    <th
                      key={column.id}
                      className={cn(
                        config.header,
                        'font-medium text-muted-foreground',
                        {
                          'text-left': column.align === 'left' || !column.align,
                          'text-center': column.align === 'center',
                          'text-right': column.align === 'right',
                          'cursor-pointer hover:text-foreground': column.sortable || sortable,
                        }
                      )}
                      style={{ width: column.width }}
                      onClick={() => handleSort(column.id)}
                    >
                      <HStack space="xs" align="center" className="justify-start">
                        <span>{column.header}</span>
                        {(column.sortable || sortable) && (
                          <div className="flex flex-col">
                            <div className={cn(
                              'w-0 h-0 border-l-[3px] border-r-[3px] border-b-[4px] border-transparent',
                              sortColumn === column.id && sortDirection === 'asc'
                                ? 'border-b-primary'
                                : 'border-b-muted-foreground/30'
                            )} />
                            <div className={cn(
                              'w-0 h-0 border-l-[3px] border-r-[3px] border-t-[4px] border-transparent mt-0.5',
                              sortColumn === column.id && sortDirection === 'desc'
                                ? 'border-t-primary'
                                : 'border-t-muted-foreground/30'
                            )} />
                          </div>
                        )}
                      </HStack>
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            {/* Body */}
            <tbody>
              {displayRows.map((row, index) => (
                <Motion
                  key={row.id}
                  preset="fadeIn"
                  delay={index * 50}
                  as="tr"
                  className={cn(
                    'transition-colors',
                    {
                      'bg-muted/20': striped && index % 2 === 1,
                      'hover:bg-muted/30': hoverable,
                      'cursor-pointer': onRowClick,
                    }
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {showRowNumbers && (
                    <td className={cn(config.cell, 'text-muted-foreground')}>
                      {index + 1}
                    </td>
                  )}
                  {data.columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        config.cell,
                        'text-foreground',
                        {
                          'text-left': column.align === 'left' || !column.align,
                          'text-center': column.align === 'center',
                          'text-right': column.align === 'right',
                        }
                      )}
                    >
                      {renderCellContent(column, row)}
                    </td>
                  ))}
                </Motion>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const renderContent = () => {
      switch (variant) {
        case 'minimal':
          return renderTable();
          
        case 'compact':
          return (
            <VStack space="sm">
              <HStack space="sm" align="center" justify="between">
                <h3 className={cn('font-medium text-foreground', config.title)}>
                  {data.title}
                </h3>
                {actions}
              </HStack>
              {renderTable()}
            </VStack>
          );
          
        default:
          return (
            <VStack space="md">
              {/* Header */}
              <HStack space="sm" align="center" justify="between">
                <VStack space="xs">
                  <h3 className={cn('font-medium text-foreground', config.title)}>
                    {data.title}
                  </h3>
                  {data.subtitle && (
                    <p className={cn('text-muted-foreground', config.subtitle)}>
                      {data.subtitle}
                    </p>
                  )}
                </VStack>
                {actions}
              </HStack>

              {/* Summary */}
              {data.summary && (
                <HStack space="sm" align="center">
                  {data.summary.total && (
                    <span className="text-sm text-muted-foreground">
                      Total: {data.summary.total.toLocaleString()}
                    </span>
                  )}
                  {data.summary.filtered && data.summary.filtered !== data.summary.total && (
                    <span className="text-sm text-muted-foreground">
                      Showing: {data.summary.filtered.toLocaleString()}
                    </span>
                  )}
                  {data.summary.message && (
                    <GlassBadge variant="outline" size="xs">
                      {data.summary.message}
                    </GlassBadge>
                  )}
                </HStack>
              )}

              {/* Table */}
              <div className="flex-1">
                {renderTable()}
              </div>

              {/* Footer */}
              {data.rows.length > maxRows && (
                <HStack space="sm" align="center" justify="center">
                  <span className="text-xs text-muted-foreground">
                    Showing {maxRows} of {data.rows.length} rows
                  </span>
                  <GlassButton variant="ghost" size="xs">
                    View All
                  </GlassButton>
                </HStack>
              )}
            </VStack>
          );
      }
    };

    return (
      <Glass
        ref={ref}
        elevation={1}
        radius="lg"
        className={cn('w-full h-full', config.padding, className)}
        {...props}
      >
        {renderContent()}
      </Glass>
    );
  }
);

TableWidget.displayName = 'TableWidget';