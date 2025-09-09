'use client';

import React from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { GlassDataTable } from './GlassDataTable';

export interface GlassDataGridProProps<T=any> {
  columns: any[];
  rows: T[];
  grouping?: string[];
  density?: 'compact'|'normal'|'spacious';
}

// Lightweight wrapper around GlassDataTable; placeholder for advanced features
export function GlassDataGridPro<T=any>({ columns, rows }: GlassDataGridProProps<T>) {
  return <GlassDataTable columns={columns as any} data={rows as any} />;
}

export default GlassDataGridPro;

