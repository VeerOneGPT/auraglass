import React from 'react';

import { createGlassStyle } from '../../core/mixins/glassMixins';
export interface TreeItem {
  id: string;
  label: string;
  children?: TreeItem[];
  icon?: React.ReactNode;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  data?: any;
}

export interface TreeViewProps extends React.HTMLAttributes<HTMLUListElement> {
  items?: TreeItem[];
  selectedIds?: string[];
  expandedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onExpansionChange?: (expandedIds: string[]) => void;
  multiSelect?: boolean;
  showIcons?: boolean;
  showLines?: boolean;
  glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  blurStrength?: 'none' | 'light' | 'standard' | 'heavy';

  /** Glass surface intent */
  intent?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  
  /** Glass surface elevation */
  elevation?: 'level1' | 'level2' | 'level3' | 'level4';
  
  /** Performance tier */
  tier?: 'low' | 'medium' | 'high';
}

export interface TreeViewContextProps {
  selectedIds: string[];
  expandedIds: string[];
  expanded?: string[];
  selected?: string[];
  focused?: string[];
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  glass?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  onExpansionChange?: (expandedIds: string[]) => void;
  selectNode?: (nodeId: string) => void;
  toggleNode?: (nodeId: string) => void;
  focusNode?: (nodeId: string) => void;
  multiSelect?: boolean;
  showIcons?: boolean;
  showLines?: boolean;
}
