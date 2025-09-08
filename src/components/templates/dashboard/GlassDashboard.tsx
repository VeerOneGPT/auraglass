'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import { Glass } from '../../../primitives';
import { Motion } from '../../../primitives';
import { GlassGrid, GlassGridItem } from '../../layout/GlassGrid';
import { GlassCard } from '../../card/GlassCard';
import { GlassButton, IconButton } from '../../button/GlassButton';
import { PageHeader } from '../../layout/GlassAppShell';
import { VStack, HStack } from '../../layout/GlassStack';
import { cn } from '../../../lib/utilsComprehensive';

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'text' | 'custom';
  size: {
    cols: 1 | 2 | 3 | 4 | 6 | 12;
    rows: 1 | 2 | 3 | 4;
  };
  position: {
    x: number;
    y: number;
  };
  data?: any;
  config?: Record<string, any>;
  component?: React.ComponentType<any>;
  editable?: boolean;
  removable?: boolean;
  resizable?: boolean;
}

export interface DashboardLayout {
  id: string;
  name: string;
  widgets: DashboardWidget[];
  cols: number;
  gap: 'sm' | 'md' | 'lg';
}

export interface GlassDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Dashboard title
   */
  title?: string;
  /**
   * Dashboard description
   */
  description?: string;
  /**
   * Dashboard layout
   */
  layout: DashboardLayout;
  /**
   * Available widget types for adding
   */
  availableWidgets?: Array<{
    type: string;
    title: string;
    icon: React.ReactNode;
    defaultSize: DashboardWidget['size'];
  }>;
  /**
   * Whether dashboard is in edit mode
   */
  editMode?: boolean;
  /**
   * Edit mode change handler
   */
  onEditModeChange?: (editMode: boolean) => void;
  /**
   * Layout change handler
   */
  onLayoutChange?: (layout: DashboardLayout) => void;
  /**
   * Widget add handler
   */
  onWidgetAdd?: (widget: Partial<DashboardWidget>) => void;
  /**
   * Widget remove handler
   */
  onWidgetRemove?: (widgetId: string) => void;
  /**
   * Widget update handler
   */
  onWidgetUpdate?: (widgetId: string, updates: Partial<DashboardWidget>) => void;
  /**
   * Drag and drop enabled
   */
  dragEnabled?: boolean;
  /**
   * Custom widget renderers
   */
  widgetRenderers?: Record<string, React.ComponentType<{ widget: DashboardWidget }>>;
  /**
   * Dashboard actions
   */
  actions?: React.ReactNode;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Empty state component
   */
  emptyState?: React.ReactNode;
}

/**
 * GlassDashboard component
 * Drag-and-drop dashboard with glassmorphism widgets
 */
export const GlassDashboard = forwardRef<HTMLDivElement, GlassDashboardProps>(
  (
    {
      title = 'Dashboard',
      description,
      layout,
      availableWidgets = [],
      editMode = false,
      onEditModeChange,
      onLayoutChange,
      onWidgetAdd,
      onWidgetRemove,
      onWidgetUpdate,
      dragEnabled = true,
      widgetRenderers = {},
      actions,
      loading = false,
      emptyState,
      className,
      ...props
    },
    ref
  ) => {
    const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
    const [dragOverPosition, setDragOverPosition] = useState<{ x: number; y: number } | null>(null);

    // Handle drag start
    const handleDragStart = useCallback((widgetId: string) => {
      if (!editMode || !dragEnabled) return;
      setDraggedWidget(widgetId);
    }, [editMode, dragEnabled]);

    // Handle drag end
    const handleDragEnd = useCallback(() => {
      setDraggedWidget(null);
      setDragOverPosition(null);
    }, []);

    // Handle drop
    const handleDrop = useCallback((position: { x: number; y: number }) => {
      if (!draggedWidget || !onWidgetUpdate) return;

      onWidgetUpdate(draggedWidget, {
        position,
      });

      handleDragEnd();
    }, [draggedWidget, onWidgetUpdate, handleDragEnd]);

    // Add new widget
    const handleAddWidget = useCallback((widgetType: string) => {
      const widgetTemplate = availableWidgets.find(w => w.type === widgetType);
      if (!widgetTemplate || !onWidgetAdd) return;

      // Find empty position
      const usedPositions = new Set(
        layout.widgets.map(w => `${w.position.x},${w.position.y}`)
      );

      let position = { x: 0, y: 0 };
      for (let y = 0; y < 10; y++) {
        for (let x = 0; x < layout.cols; x++) {
          const posKey = `${x},${y}`;
          if (!usedPositions.has(posKey)) {
            position = { x, y };
            break;
          }
        }
        if (position.x !== 0 || position.y !== 0) break;
      }

      onWidgetAdd({
        title: widgetTemplate.title,
        type: widgetTemplate.type as 'metric' | 'chart' | 'table' | 'text' | 'custom',
        size: widgetTemplate.defaultSize,
        position,
      });
    }, [availableWidgets, layout.widgets, layout.cols, onWidgetAdd]);

    // Default widget renderers
    const defaultWidgetRenderers = {
      metric: ({ widget }: { widget: DashboardWidget }) => (
        <VStack space="md">
          <div className="text-2xl font-bold text-foreground">
            {widget.data?.value || '0'}
          </div>
          <div className="text-sm text-muted-foreground">
            {widget.data?.label || 'Metric'}
          </div>
          {widget.data?.change && (
            <div className={cn(
              'text-xs font-medium',
              widget.data.change > 0 ? 'text-success' : 'text-destructive'
            )}>
              {widget.data.change > 0 ? '+' : ''}{widget.data.change}%
            </div>
          )}
        </VStack>
      ),
      chart: ({ widget }: { widget: DashboardWidget }) => (
        <VStack space="md">
          <div className="text-sm font-medium text-foreground">
            {widget.data?.title || 'Chart'}
          </div>
          <div className="h-32 bg-muted/30 rounded flex items-center justify-center">
            <span className="text-muted-foreground">
              {widget.data?.chartType ? `${widget.data.chartType} Chart` : 'Chart Widget'}
            </span>
          </div>
        </VStack>
      ),
      table: ({ widget }: { widget: DashboardWidget }) => (
        <VStack space="md">
          <div className="text-sm font-medium text-foreground">
            {widget.data?.title || 'Table'}
          </div>
          <div className="space-y-2">
            {(widget.data?.rows || []).slice(0, 3).map((row: any, index: number) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-foreground">{row.name}</span>
                <span className="text-muted-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </VStack>
      ),
      text: ({ widget }: { widget: DashboardWidget }) => (
        <div className="text-sm text-foreground">
          {widget.data?.content || widget.data?.title || 'Text Widget'}
        </div>
      ),
    };

    // Render widget
    const renderWidget = (widget: DashboardWidget) => {
      const WidgetRenderer = widgetRenderers[widget.type] || 
                            defaultWidgetRenderers[widget.type as keyof typeof defaultWidgetRenderers] ||
                            widget.component;

      if (!WidgetRenderer) {
        return (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Unknown widget type: {widget.type}
          </div>
        );
      }

      return <WidgetRenderer widget={widget} />;
    };

    // Render add widget menu
    const renderAddWidgetMenu = () => {
      if (!editMode || availableWidgets.length === 0) return null;

      return (
        <div className="grid grid-cols-2 gap-2 p-2">
          {availableWidgets.map((widgetType) => (
            <GlassButton
              key={widgetType.type}
              variant="ghost"
              size="sm"
              leftIcon={widgetType.icon}
              onClick={() => handleAddWidget(widgetType.type)}
              className="justify-start"
            >
              {widgetType.title}
            </GlassButton>
          ))}
        </div>
      );
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (layout.widgets.length === 0 && emptyState) {
      return emptyState;
    }

    return (
      <div ref={ref} className={cn('w-full space-y-6', className)} {...props}>
        {/* Header */}
        <PageHeader
          title={title}
          description={description}
          actions={
            <HStack space="sm">
              {actions}
              {availableWidgets.length > 0 && (
                <GlassButton
                  variant={editMode ? 'primary' : 'outline'}
                  size="sm"
                  leftIcon={editMode ? '✓' : '✏️'}
                  onClick={() => onEditModeChange?.(!editMode)}
                >
                  {editMode ? 'Done' : 'Edit'}
                </GlassButton>
              )}
            </HStack>
          }
        />

        {/* Add widget section */}
        {editMode && availableWidgets.length > 0 && (
          <Motion preset="slideDown">
            <Glass rounded="lg" className="p-4">
              <VStack space="sm">
                <h3 className="text-sm font-medium text-foreground">Add Widget</h3>
                {renderAddWidgetMenu()}
              </VStack>
            </Glass>
          </Motion>
        )}

        {/* Dashboard grid */}
        <GlassGrid
          cols={layout.cols as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}
          gap={layout.gap}
          className="min-h-96"
        >
          {layout.widgets.map((widget) => (
            <GlassGridItem
              key={widget.id}
              colSpan={widget.size.cols}
              rowSpan={widget.size.rows}
              className={cn(
                'transition-all duration-200',
                draggedWidget === widget.id && 'opacity-50 scale-95',
                editMode && dragEnabled && 'cursor-move'
              )}
              draggable={editMode && dragEnabled}
              onDragStart={() => handleDragStart(widget.id)}
              onDragEnd={handleDragEnd}
            >
              <GlassCard
                variant="default"
                className={cn(
                  'h-full relative group',
                  editMode && 'hover:ring-2 hover:ring-primary/50'
                )}
              >
                {/* Widget header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {widget.title}
                  </h3>
                  {editMode && (
                    <HStack space="xs" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {widget.removable !== false && (
                        <IconButton
                          icon="🗑️"
                          variant="ghost"
                          size="xs"
                          onClick={() => onWidgetRemove?.(widget.id)}
                          aria-label="Remove widget"
                        />
                      )}
                      <IconButton
                        icon="⚙️"
                        variant="ghost"
                        size="xs"
                        onClick={() => {
                          // Handle widget configuration
                        }}
                        aria-label="Configure widget"
                      />
                    </HStack>
                  )}
                </div>

                {/* Widget content */}
                <div className="flex-1">
                  {renderWidget(widget)}
                </div>
              </GlassCard>
            </GlassGridItem>
          ))}

          {/* Drop zones for empty grid positions */}
          {editMode && draggedWidget && (
            <>
              {Array.from({ length: layout.cols * 4 }, (_, index) => {
                const x = index % layout.cols;
                const y = Math.floor(index / layout.cols);
                const isOccupied = layout.widgets.some(w => 
                  w.position.x === x && w.position.y === y
                );

                if (isOccupied) return null;

                return (
                  <GlassGridItem
                    key={`drop-zone-${x}-${y}`}
                    colSpan={1}
                    rowSpan={1}
                    className="min-h-24"
                    style={{ gridColumnStart: x + 1, gridRowStart: y + 1 }}
                  >
                    <div
                      className="h-full border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 flex items-center justify-center transition-colors hover:border-primary/50 hover:bg-primary/10"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverPosition({ x, y });
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDrop({ x, y });
                      }}
                    >
                      <span className="text-xs text-primary/60">Drop here</span>
                    </div>
                  </GlassGridItem>
                );
              })}
            </>
          )}
        </GlassGrid>
      </div>
    );
  }
);

GlassDashboard.displayName = 'GlassDashboard';