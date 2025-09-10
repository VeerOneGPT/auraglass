'use client';

import React from 'react';
import { GlassJSONViewer } from './GlassJSONViewer';

export interface GlassSchemaViewerProps { schema: any; className?: string }

export function GlassSchemaViewer({ schema, className }: GlassSchemaViewerProps) {
  return <GlassJSONViewer value={schema} className={className} />;
}

export default GlassSchemaViewer;

