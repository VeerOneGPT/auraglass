# AuraGlass

A comprehensive glassmorphism design system for React applications. AuraGlass provides a complete set of beautifully designed, highly customizable glass components that bring modern glassmorphism aesthetics to your user interfaces.

## ✨ Features

- **142+ Glass Components** - Complete component library with glassmorphism styling
- **Optimized Performance** - Built-in performance optimizations with lazy loading and efficient rendering
- **TypeScript Support** - Full TypeScript definitions for all components
- **Highly Customizable** - Extensive theming and customization options
- **Accessibility First** - WCAG compliant components with proper ARIA support
- **Modern Build** - ES modules and tree-shaking support

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
import { GlassButton, GlassCard, GlassInput, OptimizedGlass } from '@aura/aura-glass';

// Basic usage
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <OptimizedGlass className="p-8 m-4">
        <GlassCard className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome to AuraGlass</h1>
          <GlassInput placeholder="Enter your name" className="mb-4" />
          <GlassButton>Submit</GlassButton>
        </GlassCard>
      </OptimizedGlass>
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

### Buttons & Cards
- `GlassButton` - Primary action button
- `GlassCard` - Content container card

### Charts & Visualization
- `GlassAreaChart` - Area chart visualization
- `GlassBarChart` - Bar chart visualization
- `GlassLineChart` - Line chart visualization
- `GlassPieChart` - Pie chart visualization

### Data Display
- `GlassDataTable` - Data table with sorting/filtering
- `GlassDataGridPro` - Advanced data grid
- `GlassVirtualTable` - Virtualized table for large datasets
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
- `ToggleButton` - Toggleable button component
- `TreeView` - Hierarchical tree structures
- `ImageList` - Grid layout for images
- `Cookie Components` - Cookie consent management

### Template Components
- `GlassDashboard` - Pre-built dashboard template
- `GlassDetailView` - Detail view template
- `GlassFormTemplate` - Form layout template
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

## 🎛️ Glass Effects & Customization

AuraGlass components are built on the `OptimizedGlass` primitive which provides extensive customization options:

```tsx
<OptimizedGlass
  elevation={2}
  blur="medium"
  variant="frosted"
  tint="blue"
  animation="float"
  intensity="strong"
  lighting="directional"
  interactive
  hoverSheen
  liftOnHover
>
  {/* Your content */}
</OptimizedGlass>
```

### Glass Properties
- **Elevation**: Shadow depth (0-4, 'float')
- **Blur**: Backdrop blur intensity ('none', 'subtle', 'medium', 'strong', 'intense')
- **Variant**: Color scheme variants
- **Tint**: Color tinting options
- **Animation**: Hover and interaction animations
- **Lighting**: Advanced lighting effects
- **Interactive**: Enable interaction states

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
```

## 📚 Documentation

For detailed component documentation, API references, and usage examples, see the [Component Reference](./docs/components.md).

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

AuraGlass is inspired by modern glassmorphism design trends and built for the AuraOne platform.

