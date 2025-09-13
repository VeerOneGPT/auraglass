'use client';

import React, { useState } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useDragDrop, PageComponent, ComponentDefinition } from './GlassDragDropProvider';

interface PageStructureProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface TreeItemProps {
  component: PageComponent;
  level: number;
  isSelected?: boolean;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  expandedItems: Set<string>;
  componentDefinition?: ComponentDefinition;
}

const TreeItem: React.FC<TreeItemProps> = ({
  component,
  level,
  isSelected,
  onSelect,
  onToggleExpand,
  expandedItems,
  componentDefinition
}) => {
  const {
    deleteComponent,
    duplicateComponent,
    onDragStart,
    dragDropState,
    componentLibrary
  } = useDragDrop();
  
  const [showActions, setShowActions] = useState(false);
  const isExpanded = expandedItems.has(component.id);
  const hasChildren = component.children.length > 0;
  
  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    onDragStart(component, 'element');
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(component.id);
    }
  };

  const getComponentIcon = (type: string): string => {
    const definition = componentLibrary.find(def => def.type === type);
    return definition?.icon || '📦';
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleDragStart}
        onClick={handleClick}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer transition-colors relative group",
          isSelected 
            ? "bg-blue-100 text-blue-900" 
            : "hover:bg-gray-50",
          dragDropState.draggedItem?.id === component.id && "opacity-50"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={handleToggleExpand}
          className={cn(
            "w-4 h-4 flex items-center justify-center text-xs transition-transform",
            hasChildren 
              ? "text-gray-500 hover:text-gray-700" 
              : "text-transparent",
            isExpanded ? "rotate-90" : "rotate-0"
          )}
        >
          {hasChildren && '▶'}
        </button>

        {/* Component Icon */}
        <span className="glass-glass-text-sm">{getComponentIcon(component.type)}</span>

        {/* Component Name */}
        <div className="glass-glass-flex-1 glass-glass-min-w-0">
          <span className="glass-glass-text-sm glass-glass-font-medium glass-glass-truncate">
            {componentDefinition?.name || component.type}
          </span>
          {component.props.content && (
            <span className="glass-glass-text-xs glass-text-secondary ml-1 glass-glass-truncate">
              "{component.props.content.substring(0, 20)}{component.props.content.length > 20 ? '...' : ''}"
            </span>
          )}
        </div>

        {/* Children Count */}
        {hasChildren && (
          <span className="glass-glass-text-xs glass-text-secondary bg-gray-200 glass-glass-px-1.5 glass-glass-py-0.5 glass-radius">
            {component.children.length}
          </span>
        )}

        {/* Component Status Indicators */}
        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-1">
          {component.locked && (
            <span className="glass-glass-text-xs text-orange-500" title="Locked">🔒</span>
          )}
          {!component.props.visible && (
            <span className="glass-glass-text-xs glass-text-secondary" title="Hidden">👁️‍🗨️</span>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateComponent(component.id);
              }}
              className="glass-glass-w-6 glass-glass-h-6 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-text-xs glass-text-secondary hover:glass-glass-text-primary hover:bg-blue-50 glass-radius"
              title="Duplicate"
            >
              📋
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(component.id);
              }}
              className="glass-glass-w-6 glass-glass-h-6 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-text-xs glass-text-secondary hover:glass-glass-text-primary hover:bg-red-50 glass-radius"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {component.children.map(child => (
            <TreeItem
              key={child.id}
              component={child}
              level={level + 1}
              isSelected={isSelected}
              onSelect={onSelect}
              onToggleExpand={onToggleExpand}
              expandedItems={expandedItems}
              componentDefinition={componentLibrary.find(def => def.type === child.type)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const GlassPageStructure: React.FC<PageStructureProps> = ({
  className,
  collapsed = false,
  onToggleCollapse
}) => {
  const {
    pageState,
    componentLibrary,
    selectComponent,
    getSelectedComponent,
    clearPage,
    exportPage,
    importPage
  } = useDragDrop();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const selectedComponent = getSelectedComponent();

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const allIds = new Set<string>();
    const addIds = (components: PageComponent[]) => {
      components.forEach(component => {
        allIds.add(component.id);
        addIds(component.children);
      });
    };
    addIds(pageState.components);
    setExpandedItems(allIds);
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  const handleExport = () => {
    const data = exportPage();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-structure.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            importPage(data);
          } catch (error) {
            alert('Error importing page structure: Invalid JSON file');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Filter components based on search
  const filteredComponents = searchQuery
    ? pageState.components.filter(component => {
        const searchInComponent = (comp: PageComponent): boolean => {
          const definition = componentLibrary.find(def => def.type === comp.type);
          const name = definition?.name || comp.type;
          const content = comp.props.content || '';
          
          const matches = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.type.toLowerCase().includes(searchQuery.toLowerCase());
          
          return matches || comp.children.some(searchInComponent);
        };
        return searchInComponent(component);
      })
    : pageState.components;

  if (collapsed) {
    return (
      <div className={cn("w-12", className)}>
        <Glass className="glass-glass-h-full">
          <button
            onClick={onToggleCollapse}
            className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-w-full glass-glass-h-12 glass-text-secondary hover:glass-text-secondary transition-colors"
            title="Expand Page Structure"
          >
            <div className="glass-glass-text-lg">🌳</div>
          </button>
        </Glass>
      </div>
    );
  }

  return (
    <div className={cn("w-80 h-full flex flex-col", className)}>
      <Glass className="glass-glass-h-full glass-glass-flex glass-glass-flex-col">
        {/* Header */}
        <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-p-4 glass-glass-border-b glass-glass-border-subtle">
          <h2 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary">Structure</h2>
          <button
            onClick={onToggleCollapse}
            className="glass-glass-p-2 glass-text-secondary hover:glass-text-secondary transition-colors"
            title="Collapse Structure"
          >
            ◀
          </button>
        </div>

        {/* Controls */}
        <div className="glass-glass-p-4 glass-glass-border-b glass-glass-border-subtle glass-glass-space-y-3">
          {/* Search */}
          <div className="glass-glass-relative">
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-glass-w-full glass-glass-px-3 glass-glass-py-2 pl-10 glass-glass-text-sm glass-glass-border glass-glass-border-subtle glass-radius-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="glass-glass-absolute left-3 glass--glass-top-1/2 transform -translate-y-1/2 glass-text-secondary">
              🔍
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="glass-glass-absolute right-3 glass--glass-top-1/2 transform -translate-y-1/2 glass-text-secondary hover:glass-text-secondary"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-text-xs">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
              <button
                onClick={expandAll}
                className="glass-glass-text-primary hover:glass-glass-text-primary"
              >
                Expand All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={collapseAll}
                className="glass-glass-text-primary hover:glass-glass-text-primary"
              >
                Collapse All
              </button>
            </div>
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
              <button
                onClick={handleExport}
                className="glass-glass-text-primary hover:glass-glass-text-primary"
                title="Export Structure"
              >
                💾
              </button>
              <button
                onClick={handleImport}
                className="text-purple-600 hover:text-purple-800"
                title="Import Structure"
              >
                📁
              </button>
              <button
                onClick={clearPage}
                className="glass-glass-text-primary hover:glass-glass-text-primary"
                title="Clear All"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        {/* Component Tree */}
        <div className="glass-glass-flex-1 glass-glass-overflow-y-auto glass-glass-p-2">
          {filteredComponents.length === 0 ? (
            <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-h-full">
              <div className="glass-glass-text-center">
                <div className="glass-glass-text-4xl glass-glass-mb-4">🌳</div>
                <h3 className="glass-glass-text-lg glass-glass-font-medium glass-text-secondary glass-glass-mb-2">
                  {searchQuery ? 'No matches found' : 'Empty Page'}
                </h3>
                <p className="glass-text-secondary glass-glass-text-sm">
                  {searchQuery 
                    ? 'Try a different search term'
                    : 'Start by adding components to your page'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredComponents
                .filter(component => !component.parent) // Only show root components
                .map(component => (
                  <TreeItem
                    key={component.id}
                    component={component}
                    level={0}
                    isSelected={selectedComponent?.id === component.id}
                    onSelect={selectComponent}
                    onToggleExpand={toggleExpanded}
                    expandedItems={expandedItems}
                    componentDefinition={componentLibrary.find(def => def.type === component.type)}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="glass-glass-p-4 glass-surface-subtle glass-glass-border-t glass-glass-border-subtle">
          <div className="glass-glass-text-xs glass-text-secondary space-y-1">
            <div className="glass-glass-flex glass-glass-justify-between">
              <span>Total Components:</span>
              <span>{pageState.components.length}</span>
            </div>
            <div className="glass-glass-flex glass-glass-justify-between">
              <span>Root Components:</span>
              <span>{pageState.components.filter(c => !c.parent).length}</span>
            </div>
            <div className="glass-glass-flex glass-glass-justify-between">
              <span>Selected:</span>
              <span>{selectedComponent ? selectedComponent.type : 'None'}</span>
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
};