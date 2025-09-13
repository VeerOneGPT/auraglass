'use client';

import React, { useState, useMemo } from 'react';
import { Glass } from '../../../primitives';
import { cn } from '../../../lib/utilsComprehensive';

export interface ColumnDef<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  width?: string;
}

export interface GlassDataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  searchable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  loadingRows?: number;
}

export function GlassDataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  searchable = true,
  paginated = true,
  pageSize = 10,
  emptyMessage = 'No data available',
  loadingRows = 5,
  className,
  ...props
}: GlassDataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchTerm) {
      result = result.filter(item =>
        columns.some(col => 
          col.filterable !== false && 
          String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, columns, searchTerm, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = paginated 
    ? processedData.slice(startIndex, startIndex + pageSize)
    : processedData;

  const handleSort = (columnKey: keyof T) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const renderLoadingSkeleton = () => (
    <>
      {Array.from({ length: loadingRows }).map((_, index) => (
        <tr key={`loading-${index}`} className="animate-pulse">
          {columns.map((column, colIndex) => (
            <td key={`loading-${index}-${colIndex}`} className="glass-glass-p-4">
              <div className="glass-glass-h-4 bg-gray-300 glass-radius"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  const renderEmptyState = () => (
    <tr>
      <td colSpan={columns.length} className="glass-glass-p-12 glass-glass-text-center">
        <div className="glass-glass-flex glass-glass-flex-col glass-glass-items-center glass-glass-gap-4 glass-text-secondary">
          <div className="glass-glass-text-6xl opacity-50">📭</div>
          <div className="glass-glass-font-medium">{emptyMessage}</div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="glass-glass-px-4 glass-glass-py-2 glass-surface-primary/10 hover:glass-surface-primary/20 glass-radius-lg glass-glass-text-primary glass-glass-text-sm glass-glass-font-medium transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  const renderPagination = () => {
    if (!paginated || totalPages <= 1) return null;

    return (
      <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-p-4 glass-glass-border-t glass-glass-border-glass-glass-border">
        <div className="glass-glass-text-sm glass-text-secondary">
          Showing {startIndex + 1} to {Math.min(startIndex + pageSize, processedData.length)} of {processedData.length} results
        </div>
        
        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="glass-glass-px-3 glass-glass-py-1 glass-radius-md glass-glass-border glass-glass-border-glass-glass-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  'glass-px-3 glass-py-1 glass-radius-md border transition-colors',
                  currentPage === page
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                )}
              >
                {page}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="glass-glass-px-3 glass-glass-py-1 glass-radius-md glass-glass-border glass-glass-border-glass-glass-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <Glass className={cn('glass-radius-xl overflow-hidden', className)} {...props}>
      {/* Header with search */}
      {searchable && (
        <div className="glass-glass-p-4 glass-glass-border-b glass-glass-border-glass-glass-border">
          <div className="glass-glass-relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="glass-glass-w-full glass-glass-px-4 glass-glass-py-2 glass-pl-10 bg-background glass-glass-border glass-glass-border-glass-glass-border glass-radius-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
            />
            <div className="glass-glass-absolute left-3 glass--glass-top-1/2 -translate-y-1/2 glass-text-secondary">
              🔍
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="glass-overflow-x-auto">
        <table className="glass-glass-w-full">
          <thead className="bg-muted">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    'glass-px-4 glass-py-3 text-left text-sm font-medium glass-text-secondary',
                    column.sortable && 'cursor-pointer hover:bg-muted/80 transition-colors select-none',
                    column.width && `w-${column.width}`
                  )}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                    {column.label}
                    {column.sortable && (
                      <div className="glass-glass-flex glass-glass-flex-col">
                        <div className={cn(
                          'text-xs transition-colors',
                          sortColumn === column.key && sortDirection === 'asc'
                            ? 'text-primary'
                            : 'glass-text-secondary/50'
                        )}>
                          ▲
                        </div>
                        <div className={cn(
                          'text-xs transition-colors -mt-1',
                          sortColumn === column.key && sortDirection === 'desc'
                            ? 'text-primary'
                            : 'glass-text-secondary/50'
                        )}>
                          ▼
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? renderLoadingSkeleton() : (
              paginatedData.length === 0 ? renderEmptyState() : (
                paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-muted/30 transition-colors glass-glass-border-b glass-glass-border-glass-glass-border last:glass-glass-border-b-0"
                  >
                    {columns.map((column) => (
                      <td key={String(column.key)} className="glass-glass-px-4 glass-glass-py-3 glass-glass-text-sm">
                        {column.render
                          ? column.render(item[column.key], item)
                          : String(item[column.key])
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {renderPagination()}
    </Glass>
  );
}

GlassDataTable.displayName = 'GlassDataTable';