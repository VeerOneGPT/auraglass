// AuraGlass Design System - Main Exports
// A comprehensive collection of glassmorphism UI components

// Core Glass Primitives
export { GlassCore as Glass, default as GlassPrimitive } from './primitives/GlassCore';
export { GlassAdvanced } from './primitives/glass/GlassAdvanced';
export { OptimizedGlassCore as OptimizedGlass } from './primitives/OptimizedGlassCore';
export { OptimizedGlassAdvanced } from './primitives/glass/OptimizedGlassAdvanced';
export { MotionNative as Motion } from './primitives/MotionNative';
export { MotionFramer } from './primitives/motion/MotionFramer';

// Localization Provider
export { GlassLocalizationProvider } from './lib/GlassLocalizationProvider';

// Theme Components
export { GlassContext } from './theme/GlassContext';
export { ThemeProvider } from './theme/ThemeProvider';

// Layout & Structure Components
export { GlassAppShell } from './components/layout/GlassAppShell';
export { GlassContainer } from './components/layout/GlassContainer';
export { GlassFlex } from './components/layout/GlassFlex';
export { GlassGrid } from './components/layout/GlassGrid';
export { GlassMasonry } from './components/layout/GlassMasonry';
export { GlassScrollArea } from './components/layout/GlassScrollArea';
export { GlassSeparator } from './components/layout/GlassSeparator';
export { GlassSplitPane } from './components/layout/GlassSplitPane';
export { GlassStack } from './components/layout/GlassStack';
export { OptimizedGlassContainer } from './components/layout/OptimizedGlassContainer';

// Navigation & Chrome Components
export { GlassBottomNav } from './components/navigation/GlassBottomNav';
export { GlassBreadcrumb } from './components/navigation/GlassBreadcrumb';
export { GlassCommandBar } from './components/navigation/GlassCommandBar';
export { GlassContextMenu } from './components/navigation/GlassContextMenu';
export { GlassDropdownMenu } from './components/navigation/GlassDropdownMenu';
export { GlassHeader } from './components/navigation/GlassHeader';
export { GlassMenubar } from './components/navigation/GlassMenubar';
export { GlassMobileNav } from './components/navigation/GlassMobileNav';
export { GlassNavigationMenu } from './components/navigation/GlassNavigationMenu';
export { GlassPagination } from './components/navigation/GlassPagination';
export { GlassResponsiveNav } from './components/navigation/GlassResponsiveNav';
export { GlassSegmentedControl } from './components/navigation/GlassSegmentedControl';
export { GlassSidebar } from './components/navigation/GlassSidebar';
export { GlassTabBar } from './components/navigation/GlassTabBar';
export { GlassTabs } from './components/navigation/GlassTabs';
export { GlassToolbar } from './components/navigation/GlassToolbar';

// Modal & Overlay Components
export { GlassBottomSheet } from './components/modal/GlassBottomSheet';
export { GlassDialog } from './components/modal/GlassDialog';
export { GlassDrawer } from './components/modal/GlassDrawer';
export { GlassHoverCard } from './components/modal/GlassHoverCard';
export { GlassModal } from './components/modal/GlassModal';
export { GlassPopover } from './components/modal/GlassPopover';

// Form & Input Components
export { GlassCheckbox } from './components/input/GlassCheckbox';
export { GlassColorPicker } from './components/input/GlassColorPicker';
export { GlassDatePicker } from './components/input/GlassDatePicker';
export { GlassDateRangePicker } from './components/input/GlassDateRangePicker';
export { GlassForm } from './components/input/GlassForm';
export { GlassFormStepper } from './components/input/GlassFormStepper';
export { GlassFormTable } from './components/input/GlassFormTable';
export { GlassInput } from './components/input/GlassInput';
export { GlassLabel } from './components/input/GlassLabel';
export { GlassMultiSelect } from './components/input/GlassMultiSelect';
export { GlassMultiStepForm } from './components/input/GlassMultiStepForm';
export { GlassRadioGroup } from './components/input/GlassRadioGroup';
export { GlassSelect } from './components/input/GlassSelect';
export { default as GlassSelectCompound } from './components/input/GlassSelectCompound';
export { GlassSlider } from './components/input/GlassSlider';
export { GlassStep } from './components/input/GlassStep';
export { GlassStepIcon } from './components/input/GlassStepIcon';
export { GlassStepLabel } from './components/input/GlassStepLabel';
export { GlassSwitch } from './components/input/GlassSwitch';
export { GlassTextarea } from './components/input/GlassTextarea';
export { GlassToggle } from './components/input/GlassToggle';
export { GlassWizard } from './components/input/GlassWizard';

// Button & Card Components
export { GlassButton } from './components/button/GlassButton';
export { GlassCardLink } from './components/card/glass-card-link';
export { GlassCard } from './components/card/GlassCard';

// Chart Components
export { GlassAreaChart } from './components/charts/GlassAreaChart';
export { GlassBarChart } from './components/charts/GlassBarChart';
export { GlassChart } from './components/charts/GlassChart';
export { GlassDataChart } from './components/charts/GlassDataChart';
export { GlassLineChart } from './components/charts/GlassLineChart';
export { GlassPieChart } from './components/charts/GlassPieChart';

// Data Display Components
export { GlassAccordion } from './components/data-display/GlassAccordion';
export { GlassAlert } from './components/data-display/GlassAlert';
export { GlassAvatar } from './components/data-display/GlassAvatar';
export { GlassBadge } from './components/data-display/GlassBadge';
export { GlassBadgeLine } from './components/data-display/GlassBadgeLine';
export { GlassDataGrid } from './components/data-display/GlassDataGrid';
export { GlassDataGridPro } from './components/data-display/GlassDataGridPro';
export { GlassDataTable } from './components/data-display/GlassDataTable';
export { GlassDiffViewer } from './components/data-display/GlassDiffViewer';
export { GlassHeatmap } from './components/data-display/GlassHeatmap';
export { GlassJSONViewer } from './components/data-display/GlassJSONViewer';
export { GlassLoadingSkeleton } from './components/data-display/GlassLoadingSkeleton';
export { GlassMetricChip } from './components/data-display/GlassMetricChip';
export { GlassProgress } from './components/data-display/GlassProgress';
export { GlassSchemaViewer } from './components/data-display/GlassSchemaViewer';
export { GlassSparkline } from './components/data-display/GlassSparkline';
export { GlassStatusDot } from './components/data-display/GlassStatusDot';
export { GlassTimeline } from './components/data-display/GlassTimeline';
export { GlassToast } from './components/data-display/GlassToast';
export { GlassVirtualTable } from './components/data-display/GlassVirtualTable';

// New Components - Phase 1 (High Priority)
export { GlassSkeletonLoader, GlassSkeletonText, GlassSkeletonCard } from './components/data-display/GlassSkeletonLoader';
export { GlassSkeleton, GlassSkeletonAvatar, GlassSkeletonButton } from './components/data-display/GlassSkeleton';
export { GlassNotificationCenter, GlassNotificationProvider, useNotifications, GlassNotificationItem } from './components/data-display/GlassNotificationCenter';
export { GlassTooltip, GlassTooltipTrigger, GlassTooltipContent } from './components/modal/GlassTooltip';

// New Components - Phase 2 (Medium Priority)
export { GlassAnimatedNumber, GlassAnimatedCounter, GlassAnimatedStat, useAnimatedNumber } from './components/data-display/GlassAnimatedNumber';
export { GlassCodeEditor, GlassCodeEditorWithFiles } from './components/interactive/GlassCodeEditor';
export { GlassColorSchemeGenerator } from './components/interactive/GlassColorSchemeGenerator';
export { GlassMotionController, GlassAnimated, GlassAnimationSequence, GlassAnimationTimeline, useMotionController, animationPresets } from './components/animations/GlassMotionController';

// New Components - Phase 3 (Future Phase)
export { GlassMindMap, useMindMap } from './components/interactive/GlassMindMap';
export { GlassWhiteboard } from './components/interactive/GlassWhiteboard';
export { GlassA11yAuditor, useA11yAudit } from './components/interactive/GlassA11yAuditor';
export { GlassComponentPlayground, usePlaygroundExample, createPlaygroundExample } from './components/interactive/GlassComponentPlayground';

// Interactive Components
export { GlassAdvancedSearch } from './components/interactive/GlassAdvancedSearch';
export { GlassAvatarGroup } from './components/interactive/GlassAvatarGroup';
export { GlassCarousel } from './components/interactive/GlassCarousel';
export { GlassChat } from './components/interactive/GlassChat';
export { GlassChatInput } from './components/interactive/GlassChatInput';
export { GlassCoachmarks } from './components/interactive/GlassCoachmarks';
export { GlassCommand } from './components/interactive/GlassCommand';
export { GlassCommandPalette } from './components/interactive/GlassCommandPalette';
export { GlassCommentThread } from './components/interactive/GlassCommentThread';
export { GlassDraggable } from './components/interactive/GlassDraggable';
export { GlassFacetSearch } from './components/interactive/GlassFacetSearch';
export { GlassFileExplorer } from './components/interactive/GlassFileExplorer';
export { GlassFileTree } from './components/interactive/GlassFileTree';
export { GlassFileUpload } from './components/interactive/GlassFileUpload';
export { GlassFilterPanel } from './components/interactive/GlassFilterPanel';
export { GlassFocusRing } from './components/interactive/GlassFocusRing';
export { GlassFormBuilder } from './components/interactive/GlassFormBuilder';
export { GlassGallery } from './components/interactive/GlassGallery';
export { GlassGradientPicker } from './components/interactive/GlassGradientPicker';
export { GlassImageViewer } from './components/interactive/GlassImageViewer';
export { GlassInfiniteScroll } from './components/interactive/GlassInfiniteScroll';
export { GlassInlineEdit } from './components/interactive/GlassInlineEdit';
export { GlassKanban } from './components/interactive/GlassKanban';
export { GlassKeyValueEditor } from './components/interactive/GlassKeyValueEditor';
export { GlassLazyImage } from './components/interactive/GlassLazyImage';
export { GlassMentionList } from './components/interactive/GlassMentionList';
export { GlassMessageList } from './components/interactive/GlassMessageList';
export { GlassQueryBuilder } from './components/interactive/GlassQueryBuilder';
export { GlassReactionBar } from './components/interactive/GlassReactionBar';
export { GlassSearchInterface } from './components/interactive/GlassSearchInterface';
export { GlassSpotlight } from './components/interactive/GlassSpotlight';
export { GlassStepper } from './components/interactive/GlassStepper';
export { GlassTagInput } from './components/interactive/GlassTagInput';
export { GlassThemeDemo } from './components/interactive/GlassThemeDemo';
export { GlassThemeSwitcher } from './components/interactive/GlassThemeSwitcher';
export { GlassUserPresence } from './components/interactive/GlassUserPresence';
export { GlassVideoPlayer } from './components/interactive/GlassVideoPlayer';
export { GlassVirtualList } from './components/interactive/GlassVirtualList';

// Dashboard Components
export { GlassActivityFeed } from './components/dashboard/GlassActivityFeed';
export { GlassChartWidget } from './components/dashboard/GlassChartWidget';
export { GlassKPICard } from './components/dashboard/GlassKPICard';
export { GlassMetricCard } from './components/dashboard/GlassMetricCard';
export { GlassStatCard } from './components/dashboard/GlassStatCard';

// Calendar Components
export { GlassCalendar } from './components/calendar/GlassCalendar';

// Template Components
export { GlassDashboard } from './components/templates/dashboard/GlassDashboard';
export { GlassDetailView } from './components/templates/detail/GlassDetailView';
export { GlassFormTemplate } from './components/templates/forms/GlassFormTemplate';
export { GlassFormWizardSteps } from './components/templates/forms/GlassFormWizardSteps';
export { GlassWizardTemplate } from './components/templates/forms/GlassWizardTemplate';
export { GlassListView } from './components/templates/list/GlassListView';

// Additional Button Components  
export { GlassFab } from './components/button/GlassFab';
export { MagneticButton } from './components/button/GlassMagneticButton';

// Specialized Components
export { DynamicAtmosphere } from './components/backgrounds/GlassDynamicAtmosphere';

// Surface Components
export { default as DimensionalGlass } from './components/surfaces/DimensionalGlass';
export { default as FrostedGlass } from './components/surfaces/FrostedGlass';
export { default as HeatGlass } from './components/surfaces/HeatGlass';
export { default as PageGlassContainer } from './components/surfaces/PageGlassContainer';
export { default as WidgetGlass } from './components/surfaces/WidgetGlass';

// Background Components
export { default as AtmosphericBackground } from './components/backgrounds/AtmosphericBackground';
export { default as ParticleBackground } from './components/backgrounds/ParticleBackground';

// Speed Dial Components
export { SpeedDial } from './components/speed-dial/SpeedDial';
export { default as SpeedDialAction } from './components/speed-dial/SpeedDialAction';
export { default as SpeedDialIcon } from './components/speed-dial/SpeedDialIcon';

// Toggle Button Components
export { ToggleButton } from './components/toggle-button/ToggleButton';
export { ToggleButtonGroup } from './components/toggle-button/ToggleButtonGroup';

// Tree View Components
export { TreeItem } from './components/tree-view/TreeItem';
export { TreeView } from './components/tree-view/TreeView';

// Visual Feedback Components
export { default as FocusIndicator } from './components/visual-feedback/FocusIndicator';
export { default as RippleButton } from './components/visual-feedback/RippleButton';
export { default as StateIndicator } from './components/visual-feedback/StateIndicator';
export { default as VisualFeedback } from './components/visual-feedback/VisualFeedback';

// Image List Components
export { ImageList } from './components/image-list/ImageList';
export { ImageListItem } from './components/image-list/ImageListItem';
export { ImageListItemBar } from './components/image-list/ImageListItemBar';

// Cookie Consent Components
export { CompactCookieNotice } from './components/cookie-consent/CompactCookieNotice';
export { CookieConsent } from './components/cookie-consent/CookieConsent';
export { GlobalCookieConsent } from './components/cookie-consent/GlobalCookieConsent';


// UI Components (App-specific)
export { GlassPanel } from './components/ui-components/glass-panel';
export { default as GlassAccordionUI } from './components/ui-components/GlassAccordionUI';
export { Checkbox as GlassCheckboxUI } from './components/ui-components/GlassCheckboxUI';

// Website Components
export { GlassLinkButton } from './components/website-components/GlassLinkButton';
export { GlassPrismComparison } from './components/website-components/GlassPrismComparison';
export { GlassWipeSlider } from './components/website-components/GlassWipeSlider';
export { MotionAwareGlass } from './components/website-components/MotionAwareGlass';


// Enhanced Hooks
export { useEnhancedPerformance, usePerformanceAwareRendering, usePerformanceLazyLoading, useAdaptiveImageLoading } from './hooks/useEnhancedPerformance';
export { useErrorBoundary, useAsyncError, useGracefulDegradation, useErrorReporting } from './hooks/useErrorBoundary';
export { useGlassOptimization, useOptimizedGlassComponent, useAdaptiveComponentLoading } from './hooks/useGlassOptimization';
export { useVirtualization, useGridVirtualization, useInfiniteVirtualization, useWindowVirtualization, useTableVirtualization } from './hooks/useVirtualization';
export { useGlassIntersection, useGlassLazyImage, useGlassIntersectionAnimation, useProgressiveLoading } from './hooks/useGlassIntersection';
export { useAccessibilityFeature, useAccessibleAnimation, useAccessibleColors } from './hooks/useAccessibilitySettings';
export { useSimplePhysicsHover, usePhysicsButton, usePhysicsDrag } from './hooks/usePhysicsInteraction';

// Extended Hooks
export * from './hooks/extended';

// Enhanced Core Mixins
export {
  createGlassMixin,
  createGlassHoverMixin,
  createGlassFocusMixin,
  createGlassDisabledMixin,
  createAdvancedGlassMixin,
  hexToRgba,
  generateGlassThemeVariables,
  createResponsiveGlassMixin,
  glassCSS,
  injectGlassAnimations,
  GLASS_ANIMATIONS
} from './core/mixins/glassMixins';

export {
  createPerformanceMixin,
  createOptimizedTransition,
  createMemoryEfficientAnimation,
  createLazyLoadMixin,
  createVirtualizationMixin,
  PerformanceMonitor,
  detectDeviceCapabilities,
  getAdaptivePerformanceConfig,
  createDebouncedResizeObserver,
  createCleanupManager,
  createOptimizedScrollHandler
} from './core/mixins/performanceMixins';

// Additional Mixins
export { zSpaceLayer, createZSpaceLayers } from './core/mixins/zSpaceLayer';
export { glowEffects } from './core/mixins/glowEffects';
export { interactiveGlass, createRippleEffect, createMagneticEffect } from './core/mixins/interactiveGlass';
export { edgeHighlight } from './core/mixins/edgeEffects';

// Animation System
export * from './animations/hooks';
export * from './animations/physics';
// Explicitly re-export orchestration to resolve ambiguity
export {
  useAnimationSequence as orchestrationUseAnimationSequence,
  orchestrationPresets,
  createOrchestration,
} from './animations/orchestration';

// Error Boundaries and Utils
export { GlassErrorBoundary, GlassAsyncErrorBoundary, GlassLightErrorBoundary, GlassComponentErrorBoundary, withGlassErrorBoundary } from './utils/errorBoundary';

// Production Utilities
export { logger, performance, safeExecute, safeExecuteAsync, features, memory, validate, data, css, browser, storage, analytics, productionConfig, initializeProduction, dev } from './utils/productionUtils';

// Core Production System
export { 
  AuraGlassProduction, 
  initializeAuraGlass, 
  productionUtils, 
  getAuraGlass, 
  devUtils,
  defaultProductionConfig,
} from './core/productionCore';

// Library Utilities
export * from './lib';

// Utility Modules
export * from './utils/themeHelpers';
export * from './utils/elementTypes';
export * from './utils/browserCompatibility';
export * from './utils/deviceCapabilities';
export * from './utils/performanceOptimizations';

// Design Tokens
export * from './tokens';

// Primitives
export * from './primitives';

// Development Utilities (Development Only)
// Note: Testing utilities are available in development builds only

// Type exports for TypeScript support
export type {
    GlassAlertProps,
    // Chart types
    GlassAreaChartProps, GlassBadgeProps, GlassBarChartProps,
    // Interactive types
    GlassCarouselProps,
    GlassChatProps, GlassCheckboxProps, GlassCommandBarProps,
    // Layout types
    GlassContainerProps,
    // Data display types
    GlassDataTableProps,
    // Modal types
    GlassDialogProps, GlassDrawerProps, GlassGridProps,
    // Navigation types
    GlassHeaderProps,
    // Form types
    GlassInputProps, GlassKanbanProps,
    // Dashboard types
    GlassKPICardProps, GlassLineChartProps, GlassMetricCardProps, GlassModalProps, GlassPieChartProps, GlassPopoverProps, GlassProgressProps, GlassSegmentedControlProps, GlassSelectProps, GlassSidebarProps, GlassSliderProps, GlassSplitPaneProps, GlassStackProps, GlassStatCardProps, GlassSwitchProps, GlassTextareaProps, GlassTimelineProps, GlassToolbarProps,
    // Glass primitive types
    OptimizedGlassProps,
    // Production types - these are exported from types/production.ts
} from './types';

// Re-export production types (explicitly to resolve PerformanceMetrics ambiguity)
export type {
  PerformanceMetrics as ProductionPerformanceMetrics,
  VirtualizationConfig,
  AccessibilitySettings,
  A11yAuditRule,
  AnimationConfig,
  MotionPreferences,
  GlassSkeletonLoaderProps,
  GlassSkeletonProps,
  GlassTooltipProps,
  GlassNotification,
  GlassNotificationCenterProps,
  GlassAnimatedNumberProps,
  GlassCodeEditorProps,
  GlassColorSchemeGeneratorProps,
  GlassMotionControllerProps,
  GlassMindMapProps,
  GlassWhiteboardProps,
  GlassA11yAuditorProps,
  GlassComponentPlaygroundProps,
  ThemeConfig,
  PhysicsInteractionReturn,
  IntersectionReturn,
  ValidationRule,
  ValidationResult,
  ChartDataPoint,
  PieDataPoint,
  TimelineItem,
  SelectOption,
  TableColumn,
  TableRow,
  FormField,
  FormState,
  GridConfig,
  FlexConfig,
  NavigationItem,
  BreadcrumbItem,
  ModalState,
  DrawerState,
  ComponentTestProps,
  MockData,
  GlassConfig,
  GlassGlobalState,
  GlassPlugin,
  ConditionalGlassProps,
  GlassPropsWithChildren,
  GlassComponentProps,
  PartialGlassProps,
  NestedGlassComponent,
  CreateGlassComponent,
} from './types/productionTypes';

