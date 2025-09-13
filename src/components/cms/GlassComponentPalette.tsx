'use client';

import React, { useState } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useDragDrop, ComponentDefinition } from './GlassDragDropProvider';

interface ComponentPaletteProps {
  className?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const CategoryIcon: React.FC<{ category: ComponentDefinition['category'] }> = ({ category }) => {
  const icons = {
    layout: '🏗️',
    content: '📝',
    media: '🎬',
    interactive: '🎯',
    advanced: '⚡'
  };
  
  return <span className="glass-glass-text-lg">{icons[category]}</span>;
};

const ComponentItem: React.FC<{
  component: ComponentDefinition;
  isDragging?: boolean;
}> = ({ component, isDragging }) => {
  const { onDragStart } = useDragDrop();
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(component, 'component');
  };

  const handleMouseDown = () => {
    onDragStart(component, 'component');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-grab",
        "hover:border-blue-300 hover:bg-blue-50 transition-colors",
        "active:cursor-grabbing active:scale-95",
        isDragging && "opacity-50 scale-95"
      )}
      title={`Drag to add ${component.name}`}
    >
      <div className="glass-glass-text-2xl">{component.icon}</div>
      <div className="glass-glass-flex-1 glass-glass-min-w-0">
        <div className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary glass-glass-truncate">
          {component.name}
        </div>
        <div className="glass-glass-text-xs glass-text-secondary glass-glass-capitalize">
          {component.category}
        </div>
      </div>
      <div className="glass-glass-text-xs glass-text-secondary">⋯</div>
    </div>
  );
};

const CategorySection: React.FC<{
  category: ComponentDefinition['category'];
  components: ComponentDefinition[];
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ category, components, isExpanded, onToggle }) => {
  const categoryNames = {
    layout: 'Layout',
    content: 'Content',
    media: 'Media',
    interactive: 'Interactive',
    advanced: 'Advanced'
  };

  return (
    <div className="glass-glass-mb-4">
      <button
        onClick={onToggle}
        className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-w-full glass-glass-p-2 glass-radius-lg hover:glass-surface-subtle transition-colors"
      >
        <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
          <CategoryIcon category={category} />
          <span className="glass-glass-text-sm glass-glass-font-medium glass-text-secondary">
            {categoryNames[category]}
          </span>
          <span className="glass-glass-text-xs glass-text-secondary">
            ({components.length})
          </span>
        </div>
        <div className={cn(
          "text-gray-400 transition-transform",
          isExpanded ? "rotate-90" : "rotate-0"
        )}>
          ▶
        </div>
      </button>
      
      {isExpanded && (
        <div className="mt-2 glass-glass-space-y-2 pl-4">
          {components.map(component => (
            <ComponentItem
              key={component.id}
              component={component}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const GlassComponentPalette: React.FC<ComponentPaletteProps> = ({
  className,
  collapsed = false,
  onToggleCollapse
}) => {
  const { componentLibrary, dragDropState } = useDragDrop();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['layout', 'content'])
  );
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Group components by category
  const componentsByCategory = componentLibrary.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ComponentDefinition[]>);

  // Filter components by search query
  const filteredComponents = searchQuery
    ? componentLibrary.filter(component =>
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  if (collapsed) {
    return (
      <div className={cn("w-12", className)}>
        <Glass className="glass-glass-h-full">
          <button
            onClick={onToggleCollapse}
            className="glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-glass-w-full glass-glass-h-12 glass-text-secondary hover:glass-text-secondary transition-colors"
            title="Expand Component Palette"
          >
            <div className="glass-glass-text-lg">📦</div>
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
          <h2 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary">Components</h2>
          <button
            onClick={onToggleCollapse}
            className="glass-glass-p-2 glass-text-secondary hover:glass-text-secondary transition-colors"
            title="Collapse Palette"
          >
            ◀
          </button>
        </div>

        {/* Search */}
        <div className="glass-glass-p-4 glass-glass-border-b glass-glass-border-subtle">
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
        </div>

        {/* Components */}
        <div className="glass-glass-flex-1 glass-glass-overflow-y-auto glass-glass-p-4">
          {searchQuery && filteredComponents ? (
            // Search Results
            <div className="glass-glass-space-y-2">
              <div className="glass-glass-text-sm glass-text-secondary glass-glass-mb-3">
                {filteredComponents.length} components found
              </div>
              {filteredComponents.map(component => (
                <ComponentItem
                  key={component.id}
                  component={component}
                  isDragging={dragDropState.draggedItem?.id === component.id}
                />
              ))}
              {filteredComponents.length === 0 && (
                <div className="glass-glass-text-center glass-glass-py-8 glass-text-secondary">
                  <div className="glass-glass-text-2xl glass-glass-mb-2">🔍</div>
                  <p>No components found</p>
                  <p className="glass-glass-text-xs">Try a different search term</p>
                </div>
              )}
            </div>
          ) : (
            // Categories
            <div>
              {Object.entries(componentsByCategory).map(([category, components]) => (
                <CategorySection
                  key={category}
                  category={category as ComponentDefinition['category']}
                  components={components}
                  isExpanded={expandedCategories.has(category)}
                  onToggle={() => toggleCategory(category)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="glass-glass-p-4 glass-glass-border-t glass-glass-border-subtle glass-surface-subtle">
          <div className="glass-glass-text-xs glass-text-secondary glass-glass-text-center">
            💡 Drag components onto the canvas to add them
          </div>
        </div>
      </Glass>
    </div>
  );
};