'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { GlassDataTable } from './GlassDataTable';

export interface GlassVirtualTableProps<T=any> {
  columns: any[];
  rows: T[];
  [key: string]: any; // passthrough for DataTable props (cellRenderers, emptyState, className, etc.)
}

export function GlassVirtualTable<T=any>({ columns, rows, ...rest }: GlassVirtualTableProps<T>) {
  // In a future iteration, this can swap to an actual virtualized list implementation.
  return <GlassDataTable columns={columns as any} data={rows as any} {...rest} />;
}

export default GlassVirtualTable;
