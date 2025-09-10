import React from 'react';
export interface ColumnDefinition {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
  id?: string;
  header?: string;
  cellRenderer?: (value: any, row: any) => React.ReactNode;
  accessorKey?: string;
}

export interface SortState {
  key: string;
  direction: 'asc' | 'desc' | null;
}

export interface GlassDataGridProps {
  data: any[];
  columns: ColumnDefinition[];
  sortable?: boolean;
  onSort?: (sortState: SortState) => void;
  className?: string;
  style?: React.CSSProperties;
  height?: string | number;
  initialSort?: SortState;
  enableRowDragging?: boolean;
  onRowOrderChange?: (newOrder: any[]) => void;

  /** Glass surface intent */
  intent?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  
  /** Glass surface elevation */
  elevation?: 'level1' | 'level2' | 'level3' | 'level4';
  
  /** Performance tier */
  tier?: 'low' | 'medium' | 'high';
}