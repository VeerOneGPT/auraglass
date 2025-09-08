# AuraGlass

A comprehensive glassmorphism design system for React applications. AuraGlass provides a complete set of beautifully designed, highly customizable glass components that bring modern glassmorphism aesthetics to your user interfaces.

## ✨ Features

- **200+ Glass Components** - Complete component library with glassmorphism styling
- **Advanced Physics Engine** - Realistic spring animations and magnetic interactions
- **Performance Optimized** - Device-adaptive rendering with quality tiers and monitoring
- **TypeScript Support** - Full TypeScript definitions with comprehensive type safety
- **Enterprise-Grade Architecture** - Production-ready with error handling and monitoring
- **Accessibility First** - WCAG compliant components with proper ARIA support
- **Modern Build** - ES modules, tree-shaking, and multiple bundle formats
- **Design Token System** - Comprehensive design tokens with theme management
- **Advanced Animation System** - Physics-based animations with orchestration

## 🚀 Installation

```bash
npm install @aura/aura-glass
# or
yarn add @aura/aura-glass
# or
pnpm add @aura/aura-glass
```

## 📦 Usage

```tsx
import {
  GlassButton,
  GlassCard,
  GlassInput,
  OptimizedGlass,
  OptimizedGlassAdvanced, // Advanced performance variant
  initializeAuraGlass,
  Motion,
  MotionFramer, // Framer Motion variant
  Glass,
  GlassAdvanced, // Advanced glass variant
} from '@aura/aura-glass';

// Initialize AuraGlass with production configuration
await initializeAuraGlass({
  qualityTier: 'auto',
  monitoring: true,
  animations: { enabled: true, duration: 300 }
});

// Basic usage with enhanced primitives
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <OptimizedGlass 
        variant="frosted" 
        blur="standard" 
        className="p-8 m-4"
        physics={true}
      >
        <Motion type="fade" animateOnMount>
          <GlassCard className="p-6" hoverable>
            <h1 className="text-2xl font-bold mb-4">Welcome to AuraGlass</h1>
            <GlassInput 
              placeholder="Enter your name" 
              className="mb-4"
              glassVariant="tinted" 
            />
            <GlassButton magnetic ripple>
              Submit
            </GlassButton>
          </GlassCard>
        </Motion>
      </OptimizedGlass>
    </div>
  );
}

// Using advanced variants for complex projects
function AdvancedApp() {
  return (
    <div className="min-h-screen">
      <OptimizedGlassAdvanced 
        variant="ethereal" 
        performanceMode="ultra"
        hoverSheen={true}
        refraction={true}
        caustics={true}
      >
        <MotionFramer 
          preset="bounceIn" 
          animateOnMount 
          animateOnScroll
        >
          <GlassAdvanced 
            variant="iridescent"
            elevation="modal"
            gradient="mesh"
            texture={true}
          >
            <h1>Advanced Glass Effects</h1>
          </GlassAdvanced>
        </MotionFramer>
      </OptimizedGlassAdvanced>
    </div>
  );
}
```

## 🎨 Component Categories (20+ Categories)

### Layout & Structure
- `GlassContainer` - Responsive container with max-width constraints
- `GlassGrid` - Flexible grid layout system
- `GlassStack` - Vertical/horizontal stacking layout
- `GlassSplitPane` - Resizable split panel layout
- `GlassMasonry` - Pinterest-style masonry layout
- `GlassScrollArea` - Custom scrollable area
- `GlassSeparator` - Visual content separators
- `GlassAppShell` - Application shell layout
- `GlassFlex` - Flexible layout container
- `OptimizedGlassContainer` - Performance-optimized container

### Navigation & Chrome
- `GlassHeader` - Application header with branding and navigation
- `GlassSidebar` - Collapsible sidebar navigation
- `GlassToolbar` - Action toolbar with left/center/right slots
- `GlassBreadcrumb` - Navigation breadcrumb trail
- `GlassCommandBar` - Keyboard shortcut action bar
- `GlassSegmentedControl` - Tab-like segmented control
- `GlassPagination` - Data pagination controls
- `GlassTabs` - Tab navigation component
- `GlassNavigationMenu` - Dropdown navigation menu
- `GlassBottomNav` - Bottom navigation for mobile
- `GlassContextMenu` - Right-click context menus
- `GlassDropdownMenu` - Dropdown menu component
- `GlassMenubar` - Menu bar with multiple sections
- `GlassMobileNav` - Mobile-optimized navigation
- `GlassResponsiveNav` - Responsive navigation system
- `GlassTabBar` - Advanced tab bar with badges

### Modals & Overlays
- `GlassDialog` - Modal dialog with backdrop
- `GlassModal` - Full-screen modal overlay
- `GlassDrawer` - Slide-out drawer panel
- `GlassBottomSheet` - Mobile bottom sheet
- `GlassPopover` - Floating content popover
- `GlassHoverCard` - Hover-triggered information card
- `GlassTooltip` - Glassmorphism styled tooltips
- `GlassCoachmarks` - Step-by-step guided tours
- `GlassSpotlight` - Interactive spotlight overlay

### Forms & Inputs
- `GlassInput` - Text input field
- `GlassTextarea` - Multi-line text input
- `GlassSelect` - Dropdown selection
- `GlassSelectCompound` - Advanced select with search
- `GlassCheckbox` - Checkbox input
- `GlassRadioGroup` - Radio button group
- `GlassSlider` - Range slider input
- `GlassSwitch` - Toggle switch
- `GlassDatePicker` - Date selection calendar
- `GlassDateRangePicker` - Date range picker
- `GlassTagInput` - Tag/chip input with suggestions
- `GlassInlineEdit` - Inline text editor
- `GlassKeyValueEditor` - Key-value pair editor
- `GlassQueryBuilder` - Visual query builder
- `GlassStepper` - Multi-step form stepper
- `GlassFormTable` - Tabular form editor
- `GlassWizard` - Multi-step wizard
- `GlassForm` - Form wrapper component
- `GlassColorPicker` - Color selection component
- `GlassFormStepper` - Form step navigation
- `GlassLabel` - Form label component
- `GlassMultiSelect` - Multi-selection dropdown
- `GlassMultiStepForm` - Advanced multi-step forms
- `GlassStep` - Individual form step
- `GlassStepIcon` - Step indicator icons
- `GlassStepLabel` - Step labels
- `GlassToggle` - Toggle switch component

### Buttons & Cards
- `GlassButton` - Primary action button
- `GlassCard` - Content container card
- `GlassCardLink` - Interactive card with link functionality
- `GlassFab` - Floating action button
- `GlassMagneticButton` - Button with magnetic hover effects

### Charts & Visualization
- `GlassAreaChart` - Area chart visualization
- `GlassBarChart` - Bar chart visualization
- `GlassLineChart` - Line chart visualization
- `GlassPieChart` - Pie chart visualization
- `GlassChart` - Unified chart component with physics interactions
- `GlassDataChart` - Advanced chart with accessibility features

### Data Display
- `GlassDataTable` - Data table with sorting/filtering
- `GlassDataGridPro` - Advanced data grid
- `GlassVirtualTable` - Virtualized table for large datasets
- `GlassDataGrid` - Advanced data grid with sorting and filtering
- `GlassTimeline` - Chronological event timeline
- `GlassHeatmap` - Matrix data heatmap
- `GlassAlert` - Status alert messages
- `GlassBadge` - Status badges and labels
- `GlassBadgeLine` - Inline badge collection
- `GlassProgress` - Progress indicators
- `GlassSparkline` - Mini trend charts
- `GlassStatusDot` - Status indicator dots
- `GlassMetricChip` - Compact metric display
- `GlassDiffViewer` - Code/diff viewer
- `GlassJSONViewer` - JSON data viewer
- `GlassSchemaViewer` - Schema structure viewer
- `GlassLoadingSkeleton` - Loading state placeholders
- `GlassSkeletonLoader` - Advanced loading states with animations
- `GlassSkeleton` - Content placeholder components
- `GlassNotificationCenter` - System notification management
- `GlassAnimatedNumber` - Smooth number transitions
- `GlassAccordion` - Collapsible content sections
- `GlassAvatar` - User avatar component
- `GlassToast` - Toast notification system

### Interactive Components
- `GlassCarousel` - Image/content carousel
- `GlassChat` - Chat interface
- `GlassChatInput` - Chat message input
- `GlassKanban` - Kanban board
- `GlassFileExplorer` - File system browser
- `GlassFileTree` - Hierarchical file tree
- `GlassAdvancedSearch` - Advanced search interface
- `GlassFacetSearch` - Faceted search filters
- `GlassFilterPanel` - Filter configuration panel
- `GlassCommand` - Command palette
- `GlassCommandPalette` - Quick action palette
- `GlassFormBuilder` - Drag-and-drop form builder
- `GlassGallery` - Image gallery
- `GlassImageViewer` - Image viewer with zoom
- `GlassVideoPlayer` - Video player component
- `GlassInfiniteScroll` - Infinite scrolling container
- `GlassLazyImage` - Lazy loading images
- `GlassMessageList` - Message list component
- `GlassSearchInterface` - Search interface
- `GlassThemeSwitcher` - Theme switching component
- `GlassVirtualList` - Virtualized list for performance
- `GlassAvatarGroup` - Grouped user avatars
- `GlassReactionBar` - Emoji reaction buttons
- `GlassCommentThread` - Threaded comments
- `GlassMentionList` - User mention suggestions
- `GlassCodeEditor` - Code editor with syntax highlighting
- `GlassColorSchemeGenerator` - Color scheme generation tool
- `GlassMindMap` - Hierarchical data visualization
- `GlassWhiteboard` - Collaborative drawing canvas
- `GlassA11yAuditor` - Accessibility testing tool
- `GlassComponentPlayground` - Component development environment
- `GlassCoachmarks` - Guided tour system
- `GlassDraggable` - Draggable component wrapper
- `GlassFacetSearch` - Advanced faceted search
- `GlassFilterPanel` - Filter configuration panel
- `GlassFocusRing` - Accessible focus indicators
- `GlassFormBuilder` - Dynamic form builder
- `GlassGallery` - Image gallery component
- `GlassGradientPicker` - Gradient color picker
- `GlassSpotlight` - Interactive spotlight overlay
- `GlassUserPresence` - User presence indicators

### Dashboard Widgets
- `GlassKPICard` - KPI metric card
- `GlassMetricCard` - Metric display card
- `GlassStatCard` - Statistics card
- `GlassChartWidget` - Chart widget container
- `GlassActivityFeed` - Activity feed component

### Calendar
- `GlassCalendar` - Calendar component

### Surface & Background
- `DimensionalGlass` - Enhanced depth and lighting effects
- `FrostedGlass` - Frosted glass with customizable blur
- `HeatGlass` - Thermal distortion effects
- `WidgetGlass` - Optimized dashboard widgets
- `AtmosphericBackground` - Dynamic particle backgrounds
- `ParticleBackground` - Customizable particle systems

### Utility Components
- `SpeedDial` - Expandable floating action buttons
- `SpeedDialAction` - Speed dial action items
- `SpeedDialIcon` - Speed dial icons
- `ToggleButton` - Toggleable button component
- `ToggleButtonGroup` - Toggle button groups
- `TreeView` - Hierarchical tree structures
- `TreeItem` - Tree structure items
- `ImageList` - Grid layout for images
- `ImageListItem` - Image list items
- `ImageListItemBar` - Image list item bars
- `CompactCookieNotice` - Minimal cookie consent
- `CookieConsent` - Full cookie consent dialog
- `GlobalCookieConsent` - Global cookie management
- `FocusIndicator` - Focus state indicators
- `RippleButton` - Button with ripple effects
- `StateIndicator` - Visual state indicators
- `VisualFeedback` - Visual feedback components

### Template Components
- `GlassDashboard` - Pre-built dashboard template
- `GlassDetailView` - Detail view template
- `GlassFormTemplate` - Form layout template
- `GlassFormWizardSteps` - Form wizard step components
- `GlassWizardTemplate` - Complete wizard template
- `GlassListView` - List view with search/filtering

### Animation Components
- `GlassMotionController` - Animation orchestration system
- `GlassAnimated` - Animated wrapper component
- `GlassAnimationSequence` - Sequential animations
- `GlassAnimationTimeline` - Complex animation timelines

### Website Components
- `GlassChartsDemo` - Chart visualization demo
- `GlassLinkButton` - Styled link buttons
- `GlassWipeSlider` - Wipe transition sliders
- `MotionAwareGlass` - Motion-responsive glass effects
- `GlassPrismComparison` - Visual comparison component
- `GlassThemeDemo` - Theme demonstration component

### Core Primitives & Utilities
- `Glass` - Base glass primitive component (aliased to `GlassCore`)
  - **GlassCore** - Simplified glass with mixin-based styling
  - **GlassAdvanced** - Full-featured glass with tokens and gradients
- `OptimizedGlass` - Performance-optimized glass primitive (aliased to `OptimizedGlassCore`)
  - **OptimizedGlassCore** - Device capability-based optimization
  - **OptimizedGlassAdvanced** - Advanced performance optimizations with CSS variables
- `Motion` - Advanced animation wrapper component (aliased to `MotionNative`)
  - **MotionNative** - Web Animations API-based motion system
  - **MotionFramer** - Framer Motion-based animation system
- `GlassContext` - Theme context provider
- `ThemeProvider` - Theme management system
- `GlassLocalizationProvider` - Internationalization support

### Production System
- `AuraGlassProduction` - Production configuration and monitoring
- `initializeAuraGlass` - Production initialization function
- `productionUtils` - Production utility functions
- `PerformanceMonitor` - Real-time performance monitoring
- `DeviceCapabilities` - Device detection and optimization

### Advanced Hooks
- `useGlassFocus` - Advanced focus management with glass effects
- `useGlassPerformance` - Performance monitoring and optimization
- `useSortableData` - Data sorting with multiple criteria
- `useDraggableListPhysics` - Physics-based drag and drop
- `useGalileoSprings` - Multi-spring physics animations
- `useZSpaceAnimation` - 3D depth and layering animations
- `useMouseMagneticEffect` - Magnetic interaction effects

### Design Token System
- `glassTokens` - Complete glassmorphism design tokens
- `constants` - Design system constants and configuration
- `themeUtils` - Theme creation and manipulation utilities
- `lightTheme` / `darkTheme` / `glassTheme` - Predefined theme configurations

### Animation Framework
- `useAnimationSequenceBasic` - Basic animation orchestration
- `useAnimationSequenceOrchestrator` - Advanced parallel/sequential animation orchestration
- `useMultiSpringBasic` - Basic multi-value spring physics
- `useMultiSpringPhysics` - Advanced physics-based multi-spring system
- `InterpolationUtils` - Advanced interpolation functions
- `GalileoElementInteractionPlugin` - Chart.js physics plugin

## 🎛️ Glass Effects & Customization

AuraGlass provides multiple implementation variants for maximum flexibility:

### Component Variants

#### Glass Components
- **`Glass` (GlassCore)** - Use for simple projects with basic glassmorphism needs
- **`GlassAdvanced`** - Use for complex projects requiring full design token integration

#### OptimizedGlass Components  
- **`OptimizedGlass` (OptimizedGlassCore)** - Use for projects needing device capability adaptation
- **`OptimizedGlassAdvanced`** - Use for high-performance applications with advanced CSS variable optimizations

#### Motion Components
- **`Motion` (MotionNative)** - Use for lightweight animations with Web Animations API
- **`MotionFramer`** - Use for complex animations requiring Framer Motion features

### Customization Options

AuraGlass components provide extensive customization options:

```tsx
// Basic Glass Primitive
<Glass
  variant="frosted"
  blur="standard"
  opacity={0.1}
  rounded="md"
  glow={true}
  hover={true}
>
  {/* Your content */}
</Glass>

// Performance-Optimized Glass
<OptimizedGlass
  variant="luminous"
  blur="heavy"
  optimization="auto"
  hardwareAcceleration={true}
  physics={true}
>
  {/* Performance-optimized content */}
</OptimizedGlass>

// Motion-Enhanced Glass
<Motion
  type="elastic"
  physics={true}
  animateOnMount={true}
  springConfig={{ stiffness: 200, damping: 25, mass: 1 }}
>
  <Glass variant="dynamic" glow={true}>
    {/* Animated glass content */}
  </Glass>
</Motion>
```

### Glass Properties
- **Variant**: Glass morphism variants ('frosted', 'dynamic', 'clear', 'tinted', 'luminous')
- **Blur**: Backdrop blur intensity ('none', 'light', 'standard', 'heavy')
- **Opacity**: Background opacity (0-1)
- **Rounded**: Border radius ('none', 'sm', 'md', 'lg', 'xl', 'full')
- **Glow**: Enable glow effects with customizable color and intensity
- **Physics**: Enable physics-based animations and interactions
- **Optimization**: Performance optimization ('auto', 'high', 'medium', 'low')
- **Hardware Acceleration**: Enable GPU acceleration for better performance

### Advanced Features
- **Magnetic Effects**: Mouse-driven magnetic interactions
- **Spring Physics**: Realistic spring-based animations
- **Quality Tiers**: Adaptive rendering based on device capabilities
- **Performance Monitoring**: Real-time FPS and memory tracking
- **Accessibility**: WCAG compliance with reduced motion support
- **Design Tokens**: Comprehensive token system for consistent styling

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Start development build
pnpm run dev

# Build for production
pnpm run build

# Run type checking
pnpm run typecheck

# Run linting
pnpm run lint

# Run production build
pnpm run build

# Run performance analysis
pnpm run analyze

# Initialize production system
node -e "
  import('./dist/index.js').then(async ({ initializeAuraGlass }) => {
    await initializeAuraGlass({ monitoring: true, qualityTier: 'auto' });
    console.log('✅ AuraGlass production system initialized');
  });
"
```

## 📚 Storybook

Explore all 200+ components interactively with our comprehensive Storybook:

```bash
# Start Storybook in development mode
pnpm run storybook

# Build for production
pnpm run build-storybook
```

**Storybook Features:**
- **Interactive Component Testing** - Test all variants, sizes, and states
- **Glassmorphism Theme Integration** - Consistent styling with theme provider
- **Accessibility Testing** - Built-in a11y checks and guidelines
- **Responsive Design Testing** - Viewport controls for mobile/desktop
- **Component Documentation** - Auto-generated docs with prop tables
- **Visual Regression Testing** - Automated visual testing capabilities

**Live Demo:** [https://storybook.aura-glass.auraone.com](https://storybook.aura-glass.auraone.com)

## 📚 Documentation

For detailed component documentation, API references, and usage examples, see the [Component Reference](./docs/components.md).

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

AuraGlass is inspired by modern glassmorphism design trends and built for the AuraOne platform.

