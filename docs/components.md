# AuraGlass Component Reference

**🎯 AuraGlass Design System Statistics:**
- **Total Glass Components**: 200+ components
- **Component Categories**: 21+ specialized categories
- **Pure Glass Focus**: 100% glassmorphism design system

This document provides detailed information about all components available in the AuraGlass design system.

## Core Concepts

### OptimizedGlass Primitive

All AuraGlass components are built on the `OptimizedGlass` primitive, which provides the glassmorphism effects and performance optimizations.

```tsx
import { OptimizedGlass } from '@aura/aura-glass';

<OptimizedGlass
  elevation={2}           // Shadow depth: 0-4 or 'float'
  blur="medium"           // Backdrop blur: 'none' | 'subtle' | 'medium' | 'strong' | 'intense'
  variant="frosted"       // Color variant
  tint="blue"             // Color tint
  animation="float"       // Animation effect
  intensity="strong"      // Effect intensity
  interactive             // Enable hover/interaction states
  hoverSheen              // Add sheen effect on hover
  liftOnHover             // Lift effect on hover
>
  {/* Your content */}
</OptimizedGlass>
```

## Layout Components

### GlassContainer

Responsive container with max-width constraints and centering options.

```tsx
<GlassContainer maxWidth="1200px" center padding="2rem">
  <YourContent />
</GlassContainer>
```

**Props:**
- `maxWidth?: string` - Maximum width of the container
- `padding?: string` - Padding around the container
- `center?: boolean` - Center the container horizontally

### GlassAppShell

Application shell layout with header, sidebar, and main content areas.

```tsx
<GlassAppShell
  header={<GlassHeader />}
  sidebar={<GlassSidebar />}
  main={<MainContent />}
  footer={<GlassFooter />}
/>
```

**Props:**
- `header?: ReactNode` - Header content
- `sidebar?: ReactNode` - Sidebar content
- `main?: ReactNode` - Main content area
- `footer?: ReactNode` - Footer content

### GlassFlex

Flexible layout container with direction and alignment controls.

```tsx
<GlassFlex direction="row" align="center" justify="space-between" gap="1rem">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GlassFlex>
```

**Props:**
- `direction?: 'row' | 'column'` - Flex direction
- `align?: string` - Align items
- `justify?: string` - Justify content
- `gap?: string` - Gap between items

### GlassStack

Vertical or horizontal stack layout with consistent spacing.

```tsx
<GlassStack direction="vertical" spacing="1rem">
  <GlassCard>Card 1</GlassCard>
  <GlassCard>Card 2</GlassCard>
  <GlassCard>Card 3</GlassCard>
</GlassStack>
```

**Props:**
- `direction?: 'vertical' | 'horizontal'` - Stack direction
- `spacing?: string` - Spacing between items

### GlassMasonry

Pinterest-style masonry layout for dynamic content.

```tsx
<GlassMasonry columns={3} gap="1rem">
  <GlassCard height="200px">Item 1</GlassCard>
  <GlassCard height="150px">Item 2</GlassCard>
  <GlassCard height="180px">Item 3</GlassCard>
</GlassMasonry>
```

**Props:**
- `columns?: number` - Number of columns
- `gap?: string` - Gap between items

### GlassScrollArea

Custom scrollable area with styled scrollbars.

```tsx
<GlassScrollArea height="300px" width="100%">
  <LongContent />
</GlassScrollArea>
```

**Props:**
- `height?: string` - Container height
- `width?: string` - Container width

### GlassSeparator

Visual content separators and dividers.

```tsx
<div>
  <Section1 />
  <GlassSeparator />
  <Section2 />
</div>
```

**Props:**
- `orientation?: 'horizontal' | 'vertical'` - Separator orientation

### OptimizedGlassContainer

Performance-optimized container with lazy loading.

```tsx
<OptimizedGlassContainer lazyLoad>
  <HeavyContent />
</OptimizedGlassContainer>
```

**Props:**
- `lazyLoad?: boolean` - Enable lazy loading

### GlassGrid

Flexible grid layout system with responsive columns.

```tsx
<GlassGrid columns={3} gap="1rem" responsive>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GlassGrid>
```

**Props:**
- `columns?: number` - Number of grid columns
- `gap?: string` - Gap between grid items
- `responsive?: boolean` - Enable responsive behavior

### GlassBox

Flexible layout container with comprehensive CSS-in-JS styling system and optional glassmorphism effects.

```tsx
<GlassBox
  display="flex"
  justifyContent="center"
  alignItems="center"
  p={4}
  m={2}
  width="100%"
  height="200px"
  glass={true}
  elevation={2}
  borderRadius={8}
>
  Content
</GlassBox>
```

**Props:**
- `children?: ReactNode` - Box content
- `component?: React.ElementType` - HTML element to render as
- `display?: 'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex' | 'grid' | 'inline-grid' | 'none'` - CSS display property
- `flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'` - Flex direction
- `flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'` - Flex wrap
- `justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'` - Justify content
- `alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'` - Align items
- `alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'` - Align content
- `alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'` - Align self
- `p?, pt?, pr?, pb?, pl?, px?, py?: number | string` - Padding properties
- `m?, mt?, mr?, mb?, ml?, mx?, my?: number | string` - Margin properties
- `width?, height?: number | string` - Dimensions
- `minWidth?, minHeight?, maxWidth?, maxHeight?: number | string` - Min/max dimensions
- `borderRadius?: number | string` - Border radius
- `bgcolor?: string` - Background color
- `glass?: boolean` - Enable glassmorphism effects
- `elevation?: 0 | 1 | 2 | 3 | 4 | 5` - Shadow elevation level
- `className?: string` - Additional CSS classes
- `style?: React.CSSProperties` - Inline styles
- `onClick?: (event: React.MouseEvent<HTMLDivElement>) => void` - Click handler

### GlassSplitPane

Resizable split panel layout with horizontal/vertical orientation.

```tsx
<GlassSplitPane direction="horizontal" initial={60} min={20} max={80}>
  <GlassSplitPane.Left>
    <Sidebar />
  </GlassSplitPane.Left>
  <GlassSplitPane.Right>
    <MainContent />
  </GlassSplitPane.Right>
</GlassSplitPane>
```

**Props:**
- `direction?: 'horizontal' | 'vertical'` - Split direction
- `initial?: number` - Initial split percentage
- `min?: number` - Minimum split percentage
- `max?: number` - Maximum split percentage

## Navigation Components

### GlassHeader

Application header with branding, navigation, and user controls.

```tsx
<GlassHeader sticky transparent>
  <div className="flex items-center justify-between">
    <Logo />
    <Navigation />
    <UserMenu />
  </div>
</GlassHeader>
```

**Props:**
- `sticky?: boolean` - Make header sticky on scroll
- `transparent?: boolean` - Transparent background

### GlassSidebar

Collapsible sidebar navigation with customizable width.

```tsx
<GlassSidebar collapsible defaultCollapsed={false} width="280px">
  <NavigationItems />
</GlassSidebar>
```

**Props:**
- `collapsible?: boolean` - Enable collapse functionality
- `defaultCollapsed?: boolean` - Initial collapsed state
- `width?: string` - Sidebar width

### GlassToolbar

Action toolbar with left, center, and right content slots.

```tsx
<GlassToolbar sticky>
  <GlassToolbar.Left>
    <BackButton />
  </GlassToolbar.Left>
  <GlassToolbar.Center>
    <Title />
  </GlassToolbar.Center>
  <GlassToolbar.Right>
    <ActionButtons />
  </GlassToolbar.Right>
</GlassToolbar>
```

**Props:**
- `left?: ReactNode` - Left slot content
- `center?: ReactNode` - Center slot content
- `right?: ReactNode` - Right slot content
- `sticky?: boolean` - Make toolbar sticky
- `floating?: boolean` - Enable floating appearance

### GlassCommandBar

Keyboard shortcut action bar with glassmorphism styling.

```tsx
<GlassCommandBar>
  <GlassCommandBar.Item
    icon={<SaveIcon />}
    label="Save"
    shortcut="Ctrl+S"
    onClick={() => handleSave()}
  />
  <GlassCommandBar.Item
    icon={<PrintIcon />}
    label="Print"
    shortcut="Ctrl+P"
    onClick={() => handlePrint()}
  />
  <GlassCommandBar.Item
    icon={<ShareIcon />}
    label="Share"
    shortcut="Ctrl+Shift+S"
    onClick={() => handleShare()}
  />
</GlassCommandBar>
```

**Props:**
- `children?: ReactNode` - Command bar items
- `position?: 'top' | 'bottom'` - Bar position
- `size?: 'sm' | 'md' | 'lg'` - Bar size
- `variant?: 'default' | 'compact'` - Visual variant
- `className?: string` - Additional CSS classes

**GlassCommandBar.Item Props:**
- `icon?: ReactNode` - Item icon
- `label: string` - Item label
- `shortcut?: string` - Keyboard shortcut
- `onClick?: () => void` - Click handler
- `disabled?: boolean` - Disabled state

### GlassPagination

Advanced pagination component with glassmorphism styling and customizable controls.

```tsx
<GlassPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  maxPageButtons={7}
  showFirstLast={true}
  showPrevNext={true}
  size="md"
/>

// With custom styling
<GlassPagination
  currentPage={2}
  totalPages={25}
  onPageChange={(page) => console.log('Navigate to page:', page)}
  maxPageButtons={5}
  size="lg"
  className="my-4"
/>
```

**Props:**
- `currentPage: number` - Current page number (1-based)
- `totalPages: number` - Total number of pages
- `onPageChange: (page: number) => void` - Page change handler
- `maxPageButtons?: number` - Maximum page buttons to show (default: 7)
- `showFirstLast?: boolean` - Show first/last page buttons (default: true)
- `showPrevNext?: boolean` - Show previous/next buttons (default: true)
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state

### GlassBottomNav

Bottom navigation bar for mobile interfaces.

```tsx
<GlassBottomNav>
  <GlassBottomNav.Item icon={<HomeIcon />} label="Home" />
  <GlassBottomNav.Item icon={<SearchIcon />} label="Search" />
  <GlassBottomNav.Item icon={<ProfileIcon />} label="Profile" />
</GlassBottomNav>
```

**Props:**
- `children?: ReactNode` - Navigation items

### GlassBreadcrumb

Navigation breadcrumb component with glassmorphism styling and collapsible items.

```tsx
// Simple usage
<GlassBreadcrumb>
  <GlassBreadcrumbItem>
    <GlassBreadcrumbLink href="/home">Home</GlassBreadcrumbLink>
  </GlassBreadcrumbItem>
  <GlassBreadcrumbItem>
    <GlassBreadcrumbLink href="/products">Products</GlassBreadcrumbLink>
  </GlassBreadcrumbItem>
  <GlassBreadcrumbItem isCurrentPage>
    Current Page
  </GlassBreadcrumbItem>
</GlassBreadcrumb>

// Compound usage with automatic structure
<GlassBreadcrumbCompound
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Details', isCurrentPage: true }
  ]}
  separator=">"
  maxItems={3}
/>
```

**Props:**
- `separator?: ReactNode` - Separator between items (default: '/')
- `children: ReactNode` - Breadcrumb items
- `maxItems?: number` - Maximum items to show (shows ellipsis for overflow)
- `showEllipsis?: boolean` - Show ellipsis for collapsed items
- `ellipsisComponent?: ReactNode` - Custom ellipsis component
- `elevation?: 1 | 2 | 3` - Glass elevation level
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `className?: string` - Additional CSS classes

**GlassBreadcrumbItem Props:**
- `isCurrentPage?: boolean` - Whether this is the current page
- `children: ReactNode` - Item content

**GlassBreadcrumbLink Props:**
- `children: ReactNode` - Link content
- `href?: string` - Link destination
- `isCurrentPage?: boolean` - Whether this is the current page

**GlassBreadcrumbSeparator Props:**
- `children?: ReactNode` - Custom separator content
- `className?: string` - Additional CSS classes

### GlassNavigation

Advanced navigation component with glassmorphism effects, physics-based interactions, and multiple layout options.

```tsx
const navigationItems = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
    badge: 'New'
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    icon: <FolderIcon />,
    children: [
      { id: 'active', label: 'Active', href: '/projects/active' },
      { id: 'completed', label: 'Completed', href: '/projects/completed' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
    featured: true
  }
];

<GlassNavigation
  items={navigationItems}
  position="left"
  variant="sidebar"
  activeItem="home"
  glassIntensity={0.8}
  onItemClick={(item) => console.log('Navigation:', item)}
/>
```

**Props:**
- `items: NavigationItem[]` - Navigation items with hierarchy support
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Navigation position
- `variant?: 'default' | 'minimal' | 'prominent' | 'sidebar'` - Visual variant
- `activeItem?: string` - Currently active item ID
- `glassIntensity?: number` - Glass effect intensity (0-1)
- `sticky?: boolean` - Make navigation sticky
- `compact?: boolean` - Compact layout
- `centered?: boolean` - Center navigation items
- `zIndex?: number` - Z-index for layering
- `width?: string | number` - Navigation width (for sidebars)
- `onItemClick?: (item: NavigationItem) => void` - Item click handler

**NavigationItem Interface:**
- `id: string` - Unique identifier
- `label: string` - Display label
- `href?: string` - Navigation link
- `icon?: ReactNode` - Item icon
- `description?: string` - Item description
- `badge?: string | number` - Badge/count indicator
- `disabled?: boolean` - Disabled state
- `external?: boolean` - External link indicator
- `children?: NavigationItem[]` - Nested navigation items
- `action?: () => void` - Custom action handler
- `separator?: boolean` - Render as separator
- `featured?: boolean` - Featured/highlighted item

### GlassNavigationMenu

Hierarchical navigation menu with collapsible sections and glass styling.

```tsx
const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    id: 'analytics',
    label: 'Analytics',
    children: [
      { id: 'reports', label: 'Reports', href: '/analytics/reports' },
      { id: 'metrics', label: 'Metrics', href: '/analytics/metrics' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    featured: true
  }
];

<GlassNavigationMenu
  items={menuItems}
  orientation="vertical"
  variant="sidebar"
  activeItem="dashboard"
  size="md"
  onItemClick={(item) => console.log('Menu item:', item.label)}
/>
```

**Props:**
- `items: NavigationItem[]` - Menu items with optional hierarchy
- `orientation?: 'horizontal' | 'vertical'` - Menu orientation
- `variant?: 'default' | 'sidebar' | 'header'` - Menu variant
- `size?: 'sm' | 'md' | 'lg'` - Menu size
- `activeItem?: string` - Active item ID
- `className?: string` - Additional CSS classes
- `collapsed?: boolean` - Collapsed state (sidebar variant)
- `onItemClick?: (item: NavigationItem) => void` - Item click handler

### GlassStepIcon

Icon component for step indicators with animated states.

```tsx
// Basic step icon
<GlassStepIcon
  index={1}
  active={false}
  completed={true}
/>

// Custom icon
<GlassStepIcon
  index={2}
  active={true}
  completed={false}
  icon={<StarIcon />}
/>
```

**Props:**
- `index: number` - Step number/index
- `active: boolean` - Whether step is currently active
- `completed: boolean` - Whether step is completed
- `icon?: ReactNode | string` - Custom icon (defaults to step number)

### GlassStepper

Horizontal step indicator component with glass styling.

```tsx
const steps = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'address', label: 'Address', optional: true },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' }
];

<GlassStepper
  steps={steps}
  active="address"
  onChange={(stepId) => console.log('Step changed:', stepId)}
/>
```

**Props:**
- `steps: Step[]` - Array of step definitions
- `active: string` - Currently active step ID
- `onChange?: (id: string) => void` - Step change handler
- `className?: string` - Additional CSS classes

**Step Interface:**
- `id: string` - Unique step identifier
- `label: string` - Step label
- `optional?: boolean` - Whether step is optional

### GlassTabs

Enhanced tab navigation component.

```tsx
<GlassTabs value={activeTab} onChange={setActiveTab}>
  <GlassTabs.List>
    <GlassTabs.Trigger value="tab1">Tab 1</GlassTabs.Trigger>
    <GlassTabs.Trigger value="tab2">Tab 2</GlassTabs.Trigger>
  </GlassTabs.List>
  <GlassTabs.Content value="tab1">
    <Tab1Content />
  </GlassTabs.Content>
  <GlassTabs.Content value="tab2">
    <Tab2Content />
  </GlassTabs.Content>
</GlassTabs>
```

**Props:**
- `value?: string` - Active tab value
- `onChange?: (value: string) => void` - Tab change handler

### GlassMenubar

Menu bar with multiple menu sections.

```tsx
<GlassMenubar>
  <GlassMenubar.Menu>
    <GlassMenubar.Trigger>File</GlassMenubar.Trigger>
    <GlassMenubar.Content>
      <GlassMenubar.Item>New</GlassMenubar.Item>
      <GlassMenubar.Item>Open</GlassMenubar.Item>
    </GlassMenubar.Content>
  </GlassMenubar.Menu>
</GlassMenubar>
```

**Props:**
- `children?: ReactNode` - Menu items

### GlassContextMenu

Right-click context menu.

```tsx
<GlassContextMenu>
  <GlassContextMenu.Trigger>
    <div>Right-click me</div>
  </GlassContextMenu.Trigger>
  <GlassContextMenu.Content>
    <GlassContextMenu.Item>Copy</GlassContextMenu.Item>
    <GlassContextMenu.Item>Paste</GlassContextMenu.Item>
  </GlassContextMenu.Content>
</GlassContextMenu>
```

**Props:**
- `trigger?: ReactNode` - Trigger element
- `children?: ReactNode` - Menu content

### GlassDropdownMenu

Dropdown menu component.

```tsx
<GlassDropdownMenu>
  <GlassDropdownMenu.Trigger>
    <GlassButton>Menu</GlassButton>
  </GlassDropdownMenu.Trigger>
  <GlassDropdownMenu.Content>
    <GlassDropdownMenu.Item>Option 1</GlassDropdownMenu.Item>
    <GlassDropdownMenu.Item>Option 2</GlassDropdownMenu.Item>
  </GlassDropdownMenu.Content>
</GlassDropdownMenu>
```

**Props:**
- `trigger?: ReactNode` - Trigger element
- `children?: ReactNode` - Menu content

### GlassMobileNav

Mobile-optimized navigation menu.

```tsx
<GlassMobileNav open={isOpen} onOpenChange={setIsOpen}>
  <GlassMobileNav.Item href="/">Home</GlassMobileNav.Item>
  <GlassMobileNav.Item href="/about">About</GlassMobileNav.Item>
</GlassMobileNav>
```

**Props:**
- `open?: boolean` - Menu visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler

### GlassResponsiveNav

Responsive navigation that adapts to screen size.

```tsx
<GlassResponsiveNav>
  <GlassResponsiveNav.Brand>
    <Logo />
  </GlassResponsiveNav.Brand>
  <GlassResponsiveNav.Items>
    <GlassResponsiveNav.Item>Home</GlassResponsiveNav.Item>
    <GlassResponsiveNav.Item>About</GlassResponsiveNav.Item>
  </GlassResponsiveNav.Items>
</GlassResponsiveNav>
```

**Props:**
- `brand?: ReactNode` - Brand/logo content
- `items?: ReactNode` - Navigation items

### GlassSegmentedControl

Tab-like segmented control for switching between modes or views.

```tsx
<GlassSegmentedControl
  items={[
    { id: 'grid', label: 'Grid', icon: GridIcon },
    { id: 'list', label: 'List', icon: ListIcon },
    { id: 'table', label: 'Table', icon: TableIcon }
  ]}
  value={viewMode}
  onChange={setViewMode}
  size="md"
/>
```

**Props:**
- `items: SegmentedItem[]` - Array of segment items
- `value?: string` - Currently selected value
- `onChange?: (value: string) => void` - Change handler
- `size?: 'sm' | 'md' | 'lg'` - Control size
- `condensed?: boolean` - Compact appearance

## Modal Components

### GlassDialog

Modal dialog with backdrop and focus management.

```tsx
<GlassDialog open={isOpen} onOpenChange={setIsOpen}>
  <GlassCard className="p-6">
    <h3>Dialog Title</h3>
    <p>Dialog content...</p>
    <div className="flex justify-end space-x-3">
      <GlassButton variant="ghost" onClick={() => setIsOpen(false)}>
        Cancel
      </GlassButton>
      <GlassButton onClick={handleConfirm}>
        Confirm
      </GlassButton>
    </div>
  </GlassCard>
</GlassDialog>
```

**Props:**
- `open?: boolean` - Dialog visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler
- `title?: string` - Dialog title
- `description?: string` - Dialog description

### GlassModal

Full-screen modal overlay.

```tsx
<GlassModal open={isOpen} onOpenChange={setIsOpen}>
  <div className="p-8">
    <ModalContent />
  </div>
</GlassModal>
```

**Props:**
- `open?: boolean` - Modal visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler

### GlassDrawer

Slide-out drawer panel from any side.

```tsx
<GlassDrawer open={isOpen} onOpenChange={setIsOpen} side="right">
  <DrawerContent />
</GlassDrawer>
```

**Props:**
- `open?: boolean` - Drawer visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler
- `side?: 'left' | 'right' | 'top' | 'bottom'` - Drawer slide direction

### GlassPopover

Floating content popover with trigger element.

```tsx
<GlassPopover>
  <GlassPopover.Trigger>
    <GlassButton>Open Menu</GlassButton>
  </GlassPopover.Trigger>
  <GlassPopover.Content>
    <MenuItems />
  </GlassPopover.Content>
</GlassPopover>
```

**Props:**
- `open?: boolean` - Popover visibility
- `onOpenChange?: (open: boolean) => void` - Visibility change handler
- `trigger?: ReactNode` - Trigger element

### GlassTooltip

Glassmorphism styled tooltip component with positioning and animation.

```tsx
<GlassTooltip
  content="This is a tooltip with glassmorphism styling"
  position="top"
  showDelay={300}
>
  <GlassButton>Hover me</GlassButton>
</GlassTooltip>
```

**Props:**
- `content: ReactNode` - Tooltip content
- `children: ReactNode` - Trigger element
- `position?: TooltipPosition` - Tooltip position ('top' | 'bottom' | 'left' | 'right' | 'auto')
- `showDelay?: number` - Delay before showing (ms)
- `hideDelay?: number` - Delay before hiding (ms)
- `disabled?: boolean` - Whether tooltip is disabled
- `maxWidth?: string` - Maximum tooltip width
- `showArrow?: boolean` - Whether to show arrow pointer
- `variant?: 'fade' | 'scale' | 'slide'` - Animation variant

### GlassBottomSheet

Mobile-optimized bottom sheet modal with glassmorphism styling and smooth slide animations.

```tsx
<GlassBottomSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  height="70%"
>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-4">Bottom Sheet Content</h3>
    <p>This is the content of the bottom sheet.</p>
    <GlassButton className="mt-4" onClick={() => setIsOpen(false)}>
      Close
    </GlassButton>
  </div>
</GlassBottomSheet>
```

**Props:**
- `open: boolean` - Whether the bottom sheet is open
- `onOpenChange: (open: boolean) => void` - Callback when open state changes
- `children: ReactNode` - Bottom sheet content
- `height?: number | string` - Height of the bottom sheet (default: '70%')
- `className?: string` - Additional CSS classes

## Interactive Components

### GlassCarousel

Image/content carousel with navigation controls.

```tsx
<GlassCarousel>
  <GlassCarousel.Item>
    <img src="slide1.jpg" alt="Slide 1" />
  </GlassCarousel.Item>
  <GlassCarousel.Item>
    <img src="slide2.jpg" alt="Slide 2" />
  </GlassCarousel.Item>
</GlassCarousel>
```

**Props:**
- `children?: ReactNode` - Carousel items
- `autoplay?: boolean` - Enable autoplay
- `indicators?: boolean` - Show navigation indicators

### GlassChat

Chat interface component.

```tsx
<GlassChat messages={messages} onSendMessage={handleSend}>
  <GlassChat.Header>
    <h3>Chat</h3>
  </GlassChat.Header>
  <GlassChat.Messages />
  <GlassChat.Input />
</GlassChat>
```

**Props:**
- `messages?: Message[]` - Chat messages
- `onSendMessage?: (message: string) => void` - Send message handler

### GlassKanban

Kanban board for task management.

```tsx
<GlassKanban>
  <GlassKanban.Column title="To Do">
    <GlassKanban.Card id="1" title="Task 1" />
    <GlassKanban.Card id="2" title="Task 2" />
  </GlassKanban.Column>
  <GlassKanban.Column title="In Progress">
    <GlassKanban.Card id="3" title="Task 3" />
  </GlassKanban.Column>
</GlassKanban>
```

**Props:**
- `children?: ReactNode` - Kanban columns
- `onCardMove?: (cardId: string, fromColumn: string, toColumn: string) => void` - Card move handler

### GlassToast

Toast notification component with glassmorphism styling and smooth animations.

```tsx
// Using with ToastProvider
<GlassToastProvider position="top-right" maxToasts={3}>
  <div>
    <GlassButton onClick={() => addToast({
      title: "Success!",
      description: "Your changes have been saved.",
      type: "success"
    })}>
      Show Toast
    </GlassButton>
  </div>

  <GlassToastViewport />
</GlassToastProvider>

// Individual toast usage
<GlassToast
  id="toast-1"
  title="Operation Complete"
  description="Your file has been uploaded successfully."
  type="success"
  duration={4000}
  action={{
    label: "View File",
    onClick: () => console.log("View file clicked")
  }}
  onDismiss={(id) => console.log("Toast dismissed:", id)}
/>
```

**Props:**
- `id: string` - Unique toast identifier
- `title?: string` - Toast title
- `description?: string` - Toast description
- `type?: 'success' | 'error' | 'warning' | 'info'` - Toast type
- `duration?: number` - Auto-dismiss duration (ms)
- `action?: { label: string; onClick: () => void }` - Action button
- `onClose?: () => void` - Close callback
- `onDismiss?: (id: string) => void` - Dismiss callback
- `className?: string` - Additional CSS classes

**GlassToastProvider Props:**
- `children: ReactNode` - Child components
- `duration?: number` - Default toast duration
- `maxToasts?: number` - Maximum toasts to display
- `position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'` - Toast position

**ToastData Interface:**
- `id: string` - Unique identifier
- `title?: string` - Toast title
- `description?: string` - Toast description
- `type?: 'success' | 'error' | 'warning' | 'info'` - Toast type
- `duration?: number` - Display duration
- `action?: { label: string; onClick: () => void }` - Action button
- `onClose?: () => void` - Close callback

### GlassFileExplorer

File system browser component.

```tsx
<GlassFileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderOpen={handleFolderOpen}
/>
```

**Props:**
- `files?: FileItem[]` - File system structure
- `onFileSelect?: (file: FileItem) => void` - File selection handler
- `onFolderOpen?: (folder: FileItem) => void` - Folder open handler

### GlassImageViewer

Image viewer with zoom and pan controls.

```tsx
<GlassImageViewer
  src="image.jpg"
  alt="Image description"
  zoomable
  pannable
/>
```

**Props:**
- `src?: string` - Image source
- `alt?: string` - Alt text
- `zoomable?: boolean` - Enable zoom
- `pannable?: boolean` - Enable pan

### GlassVideoPlayer

Video player component with controls.

```tsx
<GlassVideoPlayer
  src="video.mp4"
  controls
  autoplay={false}
/>
```

**Props:**
- `src?: string` - Video source
- `controls?: boolean` - Show controls
- `autoplay?: boolean` - Autoplay video

### GlassInfiniteScroll

Infinite scrolling container.

```tsx
<GlassInfiniteScroll
  loadMore={loadMoreItems}
  hasMore={hasMoreItems}
  loader={<GlassLoadingSkeleton />}
>
  {items.map(item => <ItemComponent key={item.id} item={item} />)}
</GlassInfiniteScroll>
```

**Props:**
- `loadMore?: () => void` - Load more function
- `hasMore?: boolean` - Whether more items exist
- `loader?: ReactNode` - Loading indicator

### GlassVirtualList

Virtualized list for performance with large datasets.

```tsx
<GlassVirtualList
  items={largeDataset}
  itemHeight={50}
  containerHeight={400}
>
  {(item) => <ListItem item={item} />}
</GlassVirtualList>
```

**Props:**
- `items?: any[]` - Data items
- `itemHeight?: number` - Height of each item
- `containerHeight?: number` - Container height

### GlassAvatarGroup

Grouped user avatars display.

```tsx
<GlassAvatarGroup max={3}>
  <GlassAvatar src="user1.jpg" />
  <GlassAvatar src="user2.jpg" />
  <GlassAvatar src="user3.jpg" />
  <GlassAvatar src="user4.jpg" />
</GlassAvatarGroup>
```

**Props:**
- `max?: number` - Maximum avatars to show
- `children?: ReactNode` - Avatar components

### GlassCommandPalette

Quick action command palette.

```tsx
<GlassCommandPalette
  commands={commands}
  onCommandSelect={handleCommand}
/>
```

**Props:**
- `commands?: Command[]` - Available commands
- `onCommandSelect?: (command: Command) => void` - Command selection handler

### GlassThemeSwitcher

Theme switching component.

```tsx
<GlassThemeSwitcher
  themes={['light', 'dark', 'auto']}
  value={currentTheme}
  onChange={setTheme}
/>
```

**Props:**
- `themes?: string[]` - Available themes
- `value?: string` - Current theme
- `onChange?: (theme: string) => void` - Theme change handler

### GlassCodeEditor

Code editor with syntax highlighting and glassmorphism styling.

```tsx
<GlassCodeEditor
  value={code}
  language="javascript"
  readOnly={false}
  fontSize={14}
  lineNumbers={true}
  onChange={setCode}
/>
```

**Props:**
- `value?: string` - Code content
- `language?: Language` - Programming language for syntax highlighting
- `readOnly?: boolean` - Whether editor is read-only
- `fontSize?: number` - Font size
- `lineNumbers?: boolean` - Whether to show line numbers
- `wordWrap?: boolean` - Whether to enable word wrap
- `onChange?: (value: string) => void` - Change handler

### GlassColorSchemeGenerator

Interactive color scheme generation tool with glassmorphism interface.

```tsx
<GlassColorSchemeGenerator
  initialScheme={currentScheme}
  advanced={true}
  generateCSS={true}
  onSchemeChange={handleSchemeChange}
/>
```

**Props:**
- `initialScheme?: Partial<ColorScheme>` - Initial color scheme
- `advanced?: boolean` - Whether to show advanced options
- `generateCSS?: boolean` - Whether to generate CSS variables
- `generateTailwind?: boolean` - Whether to generate Tailwind config
- `onSchemeChange?: (scheme: ColorScheme) => void` - Scheme change handler

### GlassMindMap

Hierarchical data visualization component with interactive editing.

```tsx
<GlassMindMap
  data={mindMapData}
  editable={true}
  zoomable={true}
  direction="horizontal"
  onNodeClick={handleNodeClick}
/>
```

**Props:**
- `data: MindMapNode` - Root node data
- `connections?: MindMapConnection[]` - Custom connections
- `editable?: boolean` - Whether nodes are editable
- `zoomable?: boolean` - Whether zooming is enabled
- `direction?: 'horizontal' | 'vertical' | 'radial'` - Layout direction
- `onNodeClick?: (node: MindMapNode) => void` - Node click handler

### GlassWhiteboard

Collaborative drawing canvas with glassmorphism styling.

```tsx
<GlassWhiteboard
  width={800}
  height={600}
  collaborative={true}
  userId="user1"
  onDrawingChange={handleDrawingChange}
/>
```

**Props:**
- `initialData?: DrawingData[]` - Initial drawing data
- `collaborative?: boolean` - Whether collaborative mode is enabled
- `userId?: string` - Current user ID
- `width?: number` - Canvas width
- `height?: number` - Canvas height
- `onDrawingChange?: (data: DrawingData[]) => void` - Drawing change handler

### GlassA11yAuditor

Accessibility testing and auditing tool with glassmorphism interface.

```tsx
<GlassA11yAuditor
  showPanel={true}
  autoAudit={false}
  rules={['img-alt', 'heading-order', 'color-contrast']}
  onAuditComplete={handleAuditComplete}
/>
```

**Props:**
- `showPanel?: boolean` - Whether to show audit panel
- `autoAudit?: boolean` - Whether to run audit automatically
- `rules?: string[]` - Audit rules to check
- `onAuditComplete?: (result: A11yAuditResult) => void` - Audit complete handler

### GlassComponentPlayground

Interactive component development environment.

```tsx
<GlassComponentPlayground
  examples={componentExamples}
  defaultExample="GlassButton"
  showCode={true}
  showProps={true}
/>
```

**Props:**
- `examples: ComponentExample[]` - Available component examples
- `defaultExample?: string` - Default selected example
- `showCode?: boolean` - Whether to show code panel
- `showProps?: boolean` - Whether to show props panel
- `customTabs?: PlaygroundTab[]` - Custom tabs

### GlassCardLink

Enhanced card component with 3D glass effects, animated hover states, and link functionality.

```tsx
<GlassCardLink href="/projects/advanced-dashboard">
  <CardHeader>
    <GlassIconContainer>
      <DashboardIcon />
    </GlassIconContainer>
    <CardTitle>Advanced Dashboard</CardTitle>
    <CardDescription>
      Comprehensive analytics and reporting dashboard with real-time data visualization.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400">1,247</div>
        <div className="text-sm text-white/70">Active Users</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">98.5%</div>
        <div className="text-sm text-white/70">Uptime</div>
      </div>
    </div>

    <FloatingArrow>
      <span>Explore Dashboard</span>
      <ArrowRightIcon />
    </FloatingArrow>
  </CardContent>
</GlassCardLink>
```

**Props:**
- `href?: string` - Link destination URL
- `target?: '_blank' | '_self' | '_parent' | '_top'` - Link target
- `rel?: string` - Link relationship attribute
- `children: ReactNode` - Card content
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Disabled state
- `onClick?: (event: React.MouseEvent) => void` - Click handler

### GlassChatInput

Advanced chat input component with attachments, formatting, voice messages, and emoji support.

```tsx
<GlassChatInput
  placeholder="Type your message..."
  enableAttachments={true}
  enableVoice={true}
  enableEmoji={true}
  enableFormatting={true}
  enableMentions={true}
  maxLength={1000}
  maxFileSize={10 * 1024 * 1024} // 10MB
  acceptedFileTypes="image/*,video/*,audio/*,.pdf,.doc,.docx"
  showCharCount={true}
  autoResize={true}
  onSendMessage={(content, attachments) => {
    console.log('Sending:', content, attachments);
  }}
  onTyping={(isTyping) => {
    console.log('Typing:', isTyping);
  }}
/>
```

**Props:**
- `placeholder?: string` - Input placeholder text
- `enableAttachments?: boolean` - Enable file attachments
- `enableVoice?: boolean` - Enable voice messages
- `enableEmoji?: boolean` - Enable emoji picker
- `enableFormatting?: boolean` - Enable rich text formatting
- `enableMentions?: boolean` - Enable user mentions
- `maxLength?: number` - Maximum character count
- `maxFileSize?: number` - Maximum file size in bytes
- `acceptedFileTypes?: string` - Accepted file types
- `showCharCount?: boolean` - Show character count
- `autoResize?: boolean` - Auto-resize textarea
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `onSendMessage?: (content: string, attachments?: ChatAttachment[]) => void` - Send message handler
- `onTyping?: (isTyping: boolean) => void` - Typing indicator handler
- `onAttachmentAdd?: (attachment: ChatAttachment) => void` - Attachment add handler
- `onAttachmentRemove?: (id: string) => void` - Attachment remove handler
- `className?: string` - Additional CSS classes

**ChatAttachment Interface:**
- `id: string` - Unique attachment identifier
- `file: File` - File object
- `type: 'image' | 'video' | 'audio' | 'file'` - Attachment type
- `preview?: string` - Preview URL for media files
- `size: number` - File size in bytes

### GlassCoachmarks

Guided tour component with step-by-step instructions and glassmorphism styling.

```tsx
const tourSteps = [
  {
    id: 'welcome',
    content: (
      <div>
        <h3>Welcome to the Dashboard!</h3>
        <p>This is your main analytics view.</p>
      </div>
    )
  },
  {
    id: 'navigation',
    content: (
      <div>
        <h3>Navigation</h3>
        <p>Use the sidebar to navigate between different sections.</p>
      </div>
    )
  },
  {
    id: 'charts',
    content: (
      <div>
        <h3>Data Visualization</h3>
        <p>View your analytics data in beautiful chart formats.</p>
      </div>
    )
  }
];

<GlassCoachmarks
  steps={tourSteps}
  current={currentStep}
  onNext={() => setCurrentStep(prev => prev + 1)}
  onPrev={() => setCurrentStep(prev => prev - 1)}
  onClose={() => setShowTour(false)}
/>
```

**Props:**
- `steps: CoachmarkStep[]` - Array of tour steps
- `current: number` - Current step index
- `onNext: () => void` - Next step handler
- `onPrev: () => void` - Previous step handler
- `onClose: () => void` - Close tour handler

**CoachmarkStep Interface:**
- `id: string` - Unique step identifier
- `content: ReactNode` - Step content to display

### GlassDatePicker

Advanced date picker component with calendar interface and glassmorphism styling.

```tsx
// Single date selection
<GlassDatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  placeholder="Select a date"
  minDate={new Date('2020-01-01')}
  maxDate={new Date('2030-12-31')}
  showWeekNumbers={true}
  firstDayOfWeek={1} // Monday
/>

// Range date selection
<GlassDatePicker
  mode="range"
  rangeValue={dateRange}
  onRangeChange={setDateRange}
  placeholder="Select date range"
  disabledDates={[new Date('2024-01-01')]} // Disable New Year's Day
/>
```

**Props:**
- `value?: Date | null` - Selected date (single mode)
- `defaultValue?: Date | null` - Default selected date (single mode)
- `onChange?: (date: Date | null) => void` - Date change handler (single mode)
- `mode?: 'single' | 'range'` - Selection mode
- `rangeValue?: DateRange` - Selected date range (range mode)
- `defaultRangeValue?: DateRange` - Default date range (range mode)
- `onRangeChange?: (range: DateRange) - Range change handler (range mode)
- `minDate?: Date` - Minimum selectable date
- `maxDate?: Date` - Maximum selectable date
- `disabledDates?: Date[] | ((date: Date) => boolean)` - Disabled dates
- `format?: string` - Date format string
- `placeholder?: string` - Input placeholder
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `disabled?: boolean` - Disabled state
- `required?: boolean` - Required field
- `error?: boolean` - Error state
- `helperText?: string` - Helper text
- `errorMessage?: string` - Error message
- `showWeekNumbers?: boolean` - Show week numbers
- `firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6` - First day of week (0=Sunday)
- `showTodayButton?: boolean` - Show today button
- `todayButtonText?: string` - Today button text
- `clearButtonText?: string` - Clear button text
- `locale?: string` - Locale for date formatting

**DateRange Interface:**
- `from: Date | null` - Start date
- `to: Date | null` - End date

### GlassDraggable

Draggable component with physics-based interactions and visual feedback.

```tsx
<GlassDraggable
  id="item-1"
  type="card"
  data={{ title: "Draggable Card" }}
  onDragStart={(data) => console.log('Drag started:', data)}
  onDragEnd={(data) => console.log('Drag ended:', data)}
>
  <GlassCard>
    <h3>Draggable Card</h3>
    <p>This card can be dragged around.</p>
  </GlassCard>
</GlassDraggable>
```

**Props:**
- `id: string` - Unique identifier
- `type: string` - Drag type/category
- `data?: any` - Additional data to pass during drag
- `handle?: ReactNode` - Custom drag handle
- `children: ReactNode` - Content to make draggable
- `disabled?: boolean` - Disable dragging
- `onDragStart?: (data: DragData) => void` - Drag start handler
- `onDragEnd?: (data: DragData) => void` - Drag end handler
- `className?: string` - Additional CSS classes

**DragData Interface:**
- `id: string` - Unique identifier
- `type: string` - Drag type
- `data?: any` - Additional drag data

### GlassCommand

Powerful command palette with search functionality, keyboard navigation, and glassmorphism styling.

```tsx
const commandItems = [
  {
    id: 'create-project',
    label: 'Create Project',
    description: 'Start a new project',
    icon: <PlusIcon />,
    keywords: ['new', 'project', 'start'],
    action: () => console.log('Creating project...')
  },
  {
    id: 'open-settings',
    label: 'Open Settings',
    description: 'Configure application settings',
    icon: <SettingsIcon />,
    action: () => console.log('Opening settings...')
  }
];

<GlassCommand
  items={commandItems}
  placeholder="Search commands..."
  emptyMessage="No commands found"
/>
```

**Props:**
- `items: CommandItem[]` - Array of command items with id, label, description, icon, keywords, and action
- `placeholder?: string` - Search input placeholder text
- `emptyMessage?: string` - Message shown when no results found
- `loading?: boolean` - Loading state
- `maxHeight?: string` - Maximum height of command list
- `filterItems?: (items: CommandItem[], query: string) => CommandItem[]` - Custom filter function
- `groupBy?: (item: CommandItem) => string` - Function to group items
- `renderItem?: (item: CommandItem, isSelected: boolean) => ReactNode` - Custom item renderer
- `renderEmpty?: () => ReactNode` - Custom empty state renderer
- `onSelect?: (item: CommandItem) => void` - Selection callback
- `onSearchChange?: (query: string) => void` - Search query change callback

**CommandItem Interface:**
- `id: string` - Unique identifier
- `label: string` - Display label
- `description?: string` - Optional description
- `icon?: ReactNode` - Optional icon
- `keywords?: string[]` - Search keywords
- `action: () => void` - Action to execute
- `group?: string` - Group identifier
- `disabled?: boolean` - Whether item is disabled

### GlassCommandDialog

Modal version of the command palette with backdrop and focus management.

```tsx
<GlassCommandDialog
  items={commandItems}
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Command Palette"
  description="Search for commands..."
/>
```

**Props:**
- Inherits all GlassCommand props
- `open: boolean` - Whether dialog is open
- `onOpenChange: (open: boolean) => void` - Open state change handler
- `title?: string` - Dialog title
- `description?: string` - Dialog description

### GlassCommandInput

Search input component for the command palette.

```tsx
<GlassCommandInput
  placeholder="Search commands..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  autoFocus
/>
```

**Props:**
- `className?: string` - Additional CSS classes

### GlassCommandList

Scrollable list container for command items.

```tsx
<GlassCommandList maxHeight="300px">
  {filteredItems.map(item => (
    <CommandItem key={item.id} item={item} />
  ))}
</GlassCommandList>
```

**Props:**
- `children: ReactNode` - Command list items
- `maxHeight?: string` - Maximum container height
- `className?: string` - Additional CSS classes

### GlassChart

Unified chart component with glassmorphism effects, physics-based interactions, and Z-Space layering.

```tsx
const chartData = [
  {
    id: 'series1',
    name: 'Revenue',
    color: '#6366F1',
    data: [
      { label: 'Jan', value: 1000 },
      { label: 'Feb', value: 1200 },
      { label: 'Mar', value: 900 }
    ]
  }
];

<GlassChart
  type="bar"
  data={chartData}
  title="Monthly Revenue"
  description="Revenue trends over time"
  width="100%"
  height={400}
  glass={true}
  zElevation={2}
  magneticEffect={true}
/>
```

**Props:**
- `type: 'bar' | 'line' | 'area' | 'pie' | 'scatter'` - Chart type
- `data: any` - Chart data (supports Chart.js format and custom format)
- `width?: string | number` - Chart width
- `height?: string | number` - Chart height
- `title?: string` - Chart title
- `description?: string` - Chart description
- `forcedSimplified?: boolean` - Force simplified rendering
- `zElevation?: 0 | 1 | 2 | 3 | 4` - Z-Space elevation level
- `magneticEffect?: boolean` - Enable magnetic hover effects
- `magneticStrength?: number` - Magnetic effect strength
- `depthAnimation?: boolean` - Enable depth animations
- `tabs?: Array<{id: string, label: string, icon?: ReactNode}>` - Chart navigation tabs
- `activeTab?: string` - Active tab ID
- `onTabChange?: (tabId: string) => void` - Tab change callback
- `chartProps?: Record<string, any>` - Additional chart-specific props
- `toolbarItems?: ReactNode` - Custom toolbar items
- `allowTypeSwitch?: boolean` - Allow chart type switching
- `availableTypes?: Array<'bar' | 'line' | 'area' | 'pie' | 'scatter'>` - Available chart types
- `focusMode?: boolean` - Enable focus mode with zoom
- `allowDownload?: boolean` - Show download button
- `onDownload?: () => void` - Custom download handler
- `theme?: DefaultTheme` - Custom theme object

### GlassActivityFeed

Activity feed component for displaying chronological events, notifications, and user actions with glassmorphism styling.

```tsx
const activities = [
  {
    id: '1',
    type: 'user',
    title: 'John Doe updated the project',
    description: 'Modified the dashboard layout and added new metrics',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    user: {
      name: 'John Doe',
      avatar: '/avatars/john.jpg',
      id: 'user1'
    },
    category: 'project',
    tags: ['update', 'dashboard']
  },
  {
    id: '2',
    type: 'system',
    title: 'Backup completed',
    description: 'Daily database backup finished successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    metadata: { size: '2.4GB', duration: '45min' }
  }
];

<GlassActivityFeed
  activities={activities}
  title="Recent Activity"
  maxItems={10}
  showFilters={true}
  showTimestamps={true}
  showAvatars={true}
  groupByDate={true}
/>
```

**Props:**
- `activities: ActivityItem[]` - Array of activity items to display
- `title?: string` - Feed title
- `subtitle?: string` - Feed subtitle
- `maxItems?: number` - Maximum activities to show
- `showFilters?: boolean` - Show filter options
- `showCategories?: boolean` - Show activity categories
- `showTimestamps?: boolean` - Show timestamps
- `showAvatars?: boolean` - Show user avatars
- `compact?: boolean` - Compact display mode
- `loading?: boolean` - Loading state
- `emptyMessage?: string` - Empty state message
- `filterBy?: string[]` - Filter activities by type
- `groupByDate?: boolean` - Group activities by date
- `showLoadMore?: boolean` - Show load more button
- `onLoadMore?: () => void` - Load more handler
- `onActivityClick?: (activity: ActivityItem) => void` - Activity click handler
- `className?: string` - Additional CSS classes

**ActivityItem Interface:**
- `id: string` - Unique identifier
- `type: 'user' | 'system' | 'notification' | 'error' | 'success' | 'warning' | 'info'` - Activity type
- `title: string` - Activity title
- `description?: string` - Activity description
- `timestamp: Date` - Activity timestamp
- `user?: { name: string; avatar?: string; id: string }` - User information
- `metadata?: Record<string, any>` - Additional metadata
- `icon?: ReactNode` - Custom icon
- `color?: string` - Custom color
- `category?: string` - Activity category
- `tags?: string[]` - Activity tags
- `actions?: Array<{ label: string; onClick: () => void; icon?: ReactNode }>` - Action buttons

### GlassAdvancedSearch

Advanced search interface with filters, suggestions, and result management.

```tsx
const searchFilters = [
  {
    id: 'type',
    label: 'Content Type',
    type: 'select',
    options: [
      { label: 'Documents', value: 'document' },
      { label: 'Images', value: 'image' },
      { label: 'Videos', value: 'video' }
    ]
  },
  {
    id: 'dateRange',
    label: 'Date Range',
    type: 'date',
    placeholder: 'Select date range'
  },
  {
    id: 'tags',
    label: 'Tags',
    type: 'multiselect',
    options: [
      { label: 'Important', value: 'important' },
      { label: 'Urgent', value: 'urgent' },
      { label: 'Review', value: 'review' }
    ]
  }
];

const searchSuggestions = [
  { id: '1', text: 'project management', category: 'topic', count: 25 },
  { id: '2', text: 'team collaboration', category: 'topic', count: 18 },
  { id: '3', text: 'recent documents', category: 'filter' }
];

<GlassAdvancedSearch
  placeholder="Search documents, images, videos..."
  filters={searchFilters}
  suggestions={searchSuggestions}
  enableHistory={true}
  enableSavedSearches={true}
  enableAdvancedFilters={true}
  showStats={true}
  onSearch={(query, filters) => console.log('Search:', query, filters)}
/>
```

**Props:**
- `placeholder?: string` - Search input placeholder
- `filters?: SearchFilter[]` - Available search filters
- `suggestions?: SearchSuggestion[]` - Search suggestions
- `results?: SearchResult[]` - Search results
- `loading?: boolean` - Loading state
- `enableHistory?: boolean` - Enable search history
- `enableSavedSearches?: boolean` - Enable saved searches
- `enableAdvancedFilters?: boolean` - Enable advanced filters
- `showStats?: boolean` - Show result statistics
- `onSearch?: (query: string, filters: Record<string, any>) => void` - Search handler
- `onFilterChange?: (filters: Record<string, any>) => void` - Filter change handler
- `onSuggestionSelect?: (suggestion: SearchSuggestion) => void` - Suggestion select handler
- `onResultClick?: (result: SearchResult) => void` - Result click handler
- `className?: string` - Additional CSS classes

**SearchFilter Interface:**
- `id: string` - Filter identifier
- `label: string` - Filter label
- `type: 'text' | 'select' | 'multiselect' | 'date' | 'range' | 'boolean'` - Filter type
- `value?: any` - Current filter value
- `options?: Array<{ label: string; value: any }>` - Select options
- `placeholder?: string` - Filter placeholder

**SearchSuggestion Interface:**
- `id: string` - Suggestion identifier
- `text: string` - Suggestion text
- `category?: string` - Suggestion category
- `icon?: ReactNode` - Suggestion icon
- `count?: number` - Result count

**SearchResult Interface:**
- `id: string` - Result identifier
- `title: string` - Result title
- `description?: string` - Result description
- `type: 'document' | 'image' | 'video' | 'audio' | 'user' | 'location' | 'tag'` - Result type
- `thumbnail?: string` - Result thumbnail
- `metadata: Record<string, any>` - Result metadata
- `relevance: number` - Search relevance score
- `createdAt: Date` - Creation date
- `updatedAt: Date` - Last update date

## Form Components

### GlassInput

Text input field with validation states.

```tsx
<GlassInput
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  disabled={loading}
  error={hasError}
/>
```

**Props:**
- `type?: string` - Input type
- `placeholder?: string` - Placeholder text
- `value?: string` - Input value
- `onChange?: (value: string) => void` - Change handler
- `disabled?: boolean` - Disabled state
- `error?: boolean` - Error state

### GlassSelect

Dropdown selection component.

```tsx
<GlassSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Select an option"
/>
```

**Props:**
- `options?: SelectOption[]` - Array of options
- `value?: string` - Selected value
- `onChange?: (value: string) => void` - Change handler
- `placeholder?: string` - Placeholder text

### GlassCheckbox

Checkbox input with label.

```tsx
<GlassCheckbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Accept terms and conditions"
/>
```

**Props:**
- `checked?: boolean` - Checked state
- `onChange?: (checked: boolean) => void` - Change handler
- `label?: string` - Checkbox label

### GlassSlider

Range slider input.

```tsx
<GlassSlider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={1}
/>
```

**Props:**
- `value?: number` - Current value
- `onChange?: (value: number) => void` - Change handler
- `min?: number` - Minimum value
- `max?: number` - Maximum value
- `step?: number` - Step increment

### GlassTextarea

Multi-line text input.

```tsx
<GlassTextarea
  placeholder="Enter your message"
  value={message}
  onChange={setMessage}
  rows={4}
/>
```

**Props:**
- `placeholder?: string` - Placeholder text
- `value?: string` - Text value
- `onChange?: (value: string) => void` - Change handler
- `rows?: number` - Number of rows

### GlassColorPicker

Color selection component.

```tsx
<GlassColorPicker
  value={color}
  onChange={setColor}
  format="hex"
/>
```

**Props:**
- `value?: string` - Selected color
- `onChange?: (color: string) => void` - Color change handler
- `format?: 'hex' | 'rgb' | 'hsl'` - Color format

### GlassMultiSelect

Multi-selection dropdown component.

```tsx
<GlassMultiSelect
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  value={selectedValues}
  onChange={setSelectedValues}
  placeholder="Select multiple options"
/>
```

**Props:**
- `options?: SelectOption[]` - Available options
- `value?: string[]` - Selected values
- `onChange?: (values: string[]) => void` - Selection change handler
- `placeholder?: string` - Placeholder text

### GlassStep

Individual step in a multi-step form.

```tsx
<GlassStep
  title="Step 1"
  description="First step description"
  completed={step1Complete}
  active={currentStep === 1}
/>
```

**Props:**
- `title?: string` - Step title
- `description?: string` - Step description
- `completed?: boolean` - Completion status
- `active?: boolean` - Active status

### GlassFormStepper

Multi-step form navigation.

```tsx
<GlassFormStepper
  steps={[
    { title: 'Personal Info', completed: true },
    { title: 'Address', active: true },
    { title: 'Review' }
  ]}
  currentStep={1}
  onStepChange={setCurrentStep}
/>
```

**Props:**
- `steps?: Step[]` - Form steps
- `currentStep?: number` - Current step index
- `onStepChange?: (step: number) => void` - Step change handler

### GlassToggle

Toggle switch component.

```tsx
<GlassToggle
  checked={isToggled}
  onChange={setIsToggled}
  label="Enable feature"
/>
```

**Props:**
- `checked?: boolean` - Toggle state
- `onChange?: (checked: boolean) => void` - State change handler
- `label?: string` - Toggle label

### GlassDataGrid

Advanced data grid component with sorting, filtering, pagination, and physics-based interactions.

```tsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'status', header: 'Status', filterable: true }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
];

<GlassDataGrid
  columns={columns}
  data={data}
  sortable
  filterable
  pagination={{ pageSize: 10 }}
  onRowClick={(row) => console.log('Row clicked:', row)}
/>
```

**Props:**
- `columns: ColumnDefinition[]` - Column definitions with keys, headers, and options
- `data: any[]` - Array of row data
- `sortable?: boolean` - Enable column sorting
- `filterable?: boolean` - Enable column filtering
- `pagination?: { pageSize: number; currentPage?: number }` - Pagination configuration
- `onRowClick?: (row: any) => void` - Row click handler
- `onSort?: (sortState: SortState) => void` - Sort change handler
- `loading?: boolean` - Loading state
- `emptyMessage?: string` - Empty state message
- `height?: string | number` - Grid height
- `width?: string | number` - Grid width
- `glass?: boolean` - Enable glassmorphism effects
- `elevation?: number` - Glass elevation level
- `interactive?: boolean` - Enable hover and click effects

**ColumnDefinition Interface:**
- `key: string` - Data key for the column
- `header: string` - Column header text
- `sortable?: boolean` - Whether column is sortable
- `filterable?: boolean` - Whether column is filterable
- `width?: string | number` - Column width
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `render?: (value: any, row: any) => ReactNode` - Custom cell renderer

### GlassForm

Complete form system with react-hook-form integration, validation states, and glassmorphism styling.

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  return (
    <GlassForm {...form}>
      <GlassFormField name="name">
        <GlassFormItem>
          <GlassFormLabel>Name</GlassFormLabel>
          <GlassFormControl>
            <GlassInput placeholder="Enter your name" />
          </GlassFormControl>
          <GlassFormMessage />
        </GlassFormItem>
      </GlassFormField>

      <GlassFormField name="email">
        <GlassFormItem>
          <GlassFormLabel>Email</GlassFormLabel>
          <GlassFormControl>
            <GlassInput type="email" placeholder="Enter your email" />
          </GlassFormControl>
          <GlassFormMessage />
        </GlassFormItem>
      </GlassFormField>

      <GlassButton type="submit">Submit</GlassButton>
    </GlassForm>
  );
}
```

**Props:**
- `children: ReactNode` - Form content
- All react-hook-form FormProvider props

**Components:**
- `GlassFormField` - Form field wrapper with validation
- `GlassFormItem` - Form item container with spacing
- `GlassFormLabel` - Form label with error states
- `GlassFormControl` - Form control wrapper
- `GlassFormDescription` - Form field description
- `GlassFormMessage` - Form validation message

### GlassLabel

Accessible form label component with multiple variants and states.

```tsx
<GlassLabel
  size="md"
  variant="default"
  required={true}
  disabled={false}
>
  Email Address
</GlassLabel>

<GlassLabel
  variant="success"
  icon={<CheckIcon />}
>
  Verified
</GlassLabel>
```

**Props:**
- `size?: 'xs' | 'sm' | 'md' | 'lg'` - Label size
- `variant?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error'` - Visual variant
- `required?: boolean` - Show required indicator (*)
- `disabled?: boolean` - Disabled state
- `icon?: ReactNode` - Optional icon
- `children: ReactNode` - Label content

### GlassWizard

Multi-step form wizard with validation, progress tracking, and glassmorphism styling.

```tsx
const wizardSteps = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Tell us about yourself',
    content: (
      <div>
        <GlassInput label="Name" />
        <GlassInput label="Email" type="email" />
      </div>
    ),
    validation: () => {
      // Custom validation logic
      return true;
    }
  },
  {
    id: 'preferences',
    title: 'Preferences',
    content: <PreferencesForm />,
    optional: true
  },
  {
    id: 'review',
    title: 'Review',
    content: <ReviewStep />
  }
];

<GlassWizard
  steps={wizardSteps}
  title="Setup Wizard"
  description="Complete your profile setup"
  showProgress={true}
  showStepNavigation={true}
  onComplete={(data) => console.log('Wizard completed!', data)}
  onCancel={() => console.log('Wizard cancelled')}
/>
```

**Props:**
- `steps: WizardStep[]` - Array of wizard steps
- `currentStep?: number` - Current active step (controlled)
- `onStepChange?: (stepIndex: number) => void` - Step change callback
- `onComplete?: (data?: any) => void` - Completion callback
- `onCancel?: () => void` - Cancellation callback
- `title?: string` - Wizard title
- `description?: string` - Wizard description
- `showStepNavigation?: boolean` - Show step navigation (default: true)
- `showProgress?: boolean` - Show progress bar (default: true)
- `allowSkip?: boolean` - Allow skipping optional steps
- `loading?: boolean` - Loading state
- `validationMode?: 'onChange' | 'onNext'` - When to validate steps

**WizardStep Interface:**
- `id: string` - Unique step identifier
- `title: string` - Step title
- `description?: string` - Step description
- `icon?: ReactNode` - Step icon
- `content: ReactNode` - Step content
- `validation?: () => boolean | Promise<boolean>` - Validation function
- `optional?: boolean` - Whether step is optional
- `disabled?: boolean` - Whether step is disabled

### GlassMultiStepForm

Advanced multi-step form component with validation, progress tracking, and smooth transitions.

```tsx
const formSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    component: PersonalInfoForm,
    validation: (data) => data.name && data.email,
    validationMessage: 'Please fill in all required fields'
  },
  {
    id: 'preferences',
    title: 'Preferences',
    component: PreferencesForm,
    optional: true
  },
  {
    id: 'review',
    title: 'Review',
    component: ReviewForm
  }
];

<GlassMultiStepForm
  steps={formSteps}
  title="Complete Your Profile"
  description="Fill out the form to get started"
  showProgress={true}
  showNavigation={true}
  allowSkip={true}
  onSubmit={(data) => console.log('Form submitted:', data)}
  onCancel={() => console.log('Form cancelled')}
/>
```

**Props:**
- `steps: FormStep[]` - Array of form steps with components and validation
- `initialData?: Record<string, any>` - Initial form data
- `onSubmit?: (data: Record<string, any>) => void | Promise<void>` - Form submission handler
- `onCancel?: () => void` - Form cancellation handler
- `onStepChange?: (stepIndex: number, data: Record<string, any>) => void` - Step change handler
- `title?: string` - Form title
- `description?: string` - Form description
- `showProgress?: boolean` - Show progress indicator
- `showNavigation?: boolean` - Show navigation buttons
- `allowSkip?: boolean` - Allow skipping optional steps
- `submitButtonText?: string` - Custom submit button text
- `cancelButtonText?: string` - Custom cancel button text
- `loading?: boolean` - Loading state
- `validationMode?: 'onChange' | 'onSubmit' | 'onBlur'` - When to validate
- `showSummary?: boolean` - Show form summary
- `className?: string` - Additional CSS classes

**FormStep Interface:**
- `id: string` - Unique step identifier
- `title: string` - Step title
- `description?: string` - Step description
- `icon?: ReactNode` - Step icon
- `component: React.ComponentType<any>` - React component for step content
- `validation?: (data: any) => boolean | Promise<boolean>` - Validation function
- `validationMessage?: string` - Validation error message
- `optional?: boolean` - Whether step is optional
- `data?: any` - Step-specific data

### GlassFormTable

Dynamic form table for editing tabular data with add/remove functionality.

```tsx
const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' }
];

const [tableData, setTableData] = useState([
  { name: 'John Doe', email: 'john@example.com', role: 'Developer' }
]);

<GlassFormTable
  columns={columns}
  rows={tableData}
  onChange={setTableData}
/>
```

**Props:**
- `columns: ColumnDef<T>[]` - Column definitions with keys and headers
- `rows: T[]` - Array of row data
- `onChange: (rows: T[]) => void` - Data change handler

**ColumnDef Interface:**
- `key: keyof T` - Data key for the column
- `header: string` - Column header text

### GlassRadioGroup

Radio button group component with glassmorphism styling and flexible layouts.

```tsx
const radioOptions = [
  {
    value: 'option1',
    label: 'Option 1',
    description: 'This is the first option with additional description'
  },
  {
    value: 'option2',
    label: 'Option 2',
    icon: <StarIcon />
  },
  {
    value: 'option3',
    label: 'Option 3',
    disabled: true
  }
];

// Default variant
<GlassRadioGroup
  options={radioOptions}
  value={selectedValue}
  onValueChange={setSelectedValue}
  name="radio-group"
  orientation="vertical"
/>

// Card variant
<GlassRadioGroup
  options={radioOptions}
  value={selectedValue}
  onValueChange={setSelectedValue}
  variant="card"
  size="lg"
/>
```

**Props:**
- `options: RadioOption[]` - Array of radio options
- `value?: string | number` - Currently selected value
- `defaultValue?: string | number` - Default selected value
- `onValueChange?: (value: string | number) => void` - Value change handler
- `name?: string` - Group name for form compatibility
- `disabled?: boolean` - Whether the entire group is disabled
- `orientation?: 'vertical' | 'horizontal'` - Layout orientation
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `variant?: 'default' | 'card'` - Visual variant
- `renderOption?: (option: RadioOption, isSelected: boolean) => ReactNode` - Custom option renderer
- `className?: string` - Additional CSS classes

**RadioOption Interface:**
- `value: string | number` - Option value
- `label: string` - Option label
- `description?: string` - Optional description
- `disabled?: boolean` - Whether option is disabled
- `icon?: ReactNode` - Optional icon

### GlassSwitch

Toggle switch component with glassmorphism styling, smooth animations, and customizable states.

```tsx
// Basic switch
<GlassSwitch
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable feature"
  description="This will activate the advanced features"
/>

// Controlled switch with custom styling
<GlassSwitch
  checked={darkMode}
  onCheckedChange={toggleDarkMode}
  size="lg"
  variant="success"
  label="Dark Mode"
  icons={{
    checked: <MoonIcon />,
    unchecked: <SunIcon />
  }}
/>

// Switch with focus ring
<GlassSwitch
  checked={notifications}
  onChange={setNotifications}
  label="Push Notifications"
  focusRing={true}
  disabled={false}
/>
```

**Props:**
- `checked?: boolean` - Switch state (controlled)
- `defaultChecked?: boolean` - Default state (uncontrolled)
- `onChange?: (checked: boolean) => void` - State change handler
- `onCheckedChange?: (checked: boolean) => void` - Alternative change handler
- `size?: 'sm' | 'md' | 'lg'` - Switch size
- `variant?: 'default' | 'success' | 'warning' | 'error' | 'info'` - Visual variant
- `label?: string` - Switch label
- `description?: string` - Additional description
- `labelPosition?: 'left' | 'right' | 'top' | 'bottom'` - Label position
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `icons?: { checked?: ReactNode; unchecked?: ReactNode }` - Custom icons
- `focusRing?: boolean` - Show focus ring
- `thumbContent?: ReactNode` - Custom thumb content
- `className?: string` - Additional CSS classes

## Data Display Components

### GlassDataTable

Data table with sorting, filtering, and pagination.

```tsx
<GlassDataTable
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status' }
  ]}
  rows={tableData}
/>
```

**Props:**
- `columns?: Column[]` - Table columns
- `rows?: Row[]` - Table data rows

### GlassTimeline

Chronological event timeline.

```tsx
<GlassTimeline
  items={[
    {
      id: '1',
      title: 'Project Started',
      subtitle: 'Initial setup completed',
      time: '2 hours ago',
      icon: <ProjectIcon />
    }
  ]}
/>
```

**Props:**
- `items?: TimelineItem[]` - Timeline items

### GlassAlert

Status alert messages.

```tsx
<GlassAlert
  variant="success"
  title="Success!"
  description="Your action was completed successfully."
/>
```

**Props:**
- `variant?: 'default' | 'success' | 'warning' | 'error'` - Alert variant
- `title?: string` - Alert title
- `description?: string` - Alert description

### GlassBadge

Status badges and labels.

```tsx
<GlassBadge variant="success">Active</GlassBadge>
```

**Props:**
- `variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error'` - Badge variant
- `children: ReactNode` - Badge content

### GlassProgress

Progress indicators.

```tsx
<GlassProgress value={75} max={100} showValue />
```

**Props:**
- `value?: number` - Current progress value
- `max?: number` - Maximum value
- `showValue?: boolean` - Show numeric value

### GlassSkeletonLoader

Advanced loading component with multiple animation variants and customizable content.

```tsx
<GlassSkeletonLoader
  loading={isLoading}
  text="Loading amazing content..."
  size="md"
  variant="pulse"
/>
```

**Props:**
- `loading?: boolean` - Whether to show loading state
- `text?: string` - Loading text
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Loader size
- `variant?: 'pulse' | 'wave' | 'shimmer'` - Animation variant
- `children?: ReactNode` - Content to show when not loading

### GlassSkeleton

Content placeholder component with various shapes and animations.

```tsx
<GlassSkeleton
  variant="rectangular"
  width="200px"
  height="100px"
  animation="wave"
/>
```

**Props:**
- `variant?: SkeletonVariant` - Shape variant ('text' | 'rectangular' | 'circular' | 'rounded')
- `width?: string | number` - Skeleton width
- `height?: string | number` - Skeleton height
- `animation?: 'pulse' | 'wave' | 'none'` - Animation type
- `lines?: number` - Number of text lines (for text variant)

### GlassNotificationCenter

System notification management with glassmorphism styling.

```tsx
<GlassNotificationProvider>
  <GlassNotificationCenter
    position="top-right"
    maxNotifications={5}
    autoHideDelay={5000}
  />
  {/* Your app content */}
</GlassNotificationProvider>
```

**Props:**
- `position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'` - Notification position
- `maxNotifications?: number` - Maximum notifications to show
- `autoHideDelay?: number` - Auto-hide delay (ms)

### GlassAnimatedNumber

Smooth number transitions with customizable animations.

```tsx
<GlassAnimatedNumber
  value={count}
  from={0}
  duration={1000}
  decimals={0}
  separator={true}
  prefix="$"
/>
```

**Props:**
- `value: number` - Target number to animate to
- `from?: number` - Starting value
- `duration?: number` - Animation duration (ms)
- `easing?: EasingType` - Animation easing function
- `decimals?: number` - Decimal places to show
- `separator?: boolean` - Whether to use comma separators
- `prefix?: string` - Text to show before number
- `suffix?: string` - Text to show after number
- `variant?: 'count' | 'scale' | 'glow'` - Animation variant

### GlassDataChart

Advanced chart component with physics-based interactions, accessibility features, and comprehensive customization options.

```tsx
import { GlassDataChartProps } from '@aura/aura-glass';

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [{
    label: 'Revenue',
    data: [12000, 19000, 15000, 25000, 22000],
    borderColor: 'rgba(75, 192, 192, 1)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    tension: 0.4
  }]
};

<GlassDataChart
  type="line"
  data={chartData}
  title="Monthly Revenue"
  description="Revenue trends over the past 5 months"
  width="100%"
  height={400}
  glass={true}
  interactive={true}
  accessibility={{
    enabled: true,
    announceOnFocus: true,
    description: 'Line chart showing monthly revenue trends'
  }}
  physics={{
    enabled: true,
    gravity: 0.5,
    friction: 0.8
  }}
  onPointClick={(data) => console.log('Point clicked:', data)}
  onLegendClick={(dataset) => console.log('Legend clicked:', dataset)}
/>
```

**Props:**
- `type: 'bar' | 'line' | 'area' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter'` - Chart type
- `data: ChartData` - Chart.js compatible data object
- `options?: ChartOptions` - Chart.js options object
- `title?: string` - Chart title
- `description?: string` - Chart description
- `width?: string | number` - Chart width
- `height?: string | number` - Chart height
- `glass?: boolean` - Enable glassmorphism effects
- `interactive?: boolean` - Enable chart interactions
- `responsive?: boolean` - Enable responsive behavior
- `maintainAspectRatio?: boolean` - Maintain aspect ratio
- `accessibility?: AccessibilityOptions` - Accessibility configuration
- `physics?: PhysicsOptions` - Physics-based interaction settings
- `animation?: AnimationOptions` - Animation configuration
- `theme?: ThemeOptions` - Custom theme settings
- `plugins?: Plugin[]` - Additional Chart.js plugins
- `onDataUpdate?: (data: ChartData) => void` - Data update callback
- `onPointClick?: (data: PointData) => void` - Point click callback
- `onLegendClick?: (dataset: Dataset) => void` - Legend click callback
- `className?: string` - Additional CSS classes

**ChartData Interface:**
- `labels?: string[]` - Chart labels
- `datasets: Dataset[]` - Chart datasets

**Dataset Interface:**
- `label?: string` - Dataset label
- `data: number[]` - Dataset values
- `borderColor?: string | string[]` - Border color
- `backgroundColor?: string | string[]` - Background color
- `borderWidth?: number` - Border width
- `fill?: boolean | string` - Fill configuration

### GlassHeatmap

Matrix data visualization component that displays values as colored cells.

```tsx
const heatmapData = [
  [
    { value: 10, label: 'Low' },
    { value: 25, label: 'Medium' },
    { value: 80, label: 'High' }
  ],
  [
    { value: 5, label: 'Very Low' },
    { value: 45, label: 'Medium-High' },
    { value: 95, label: 'Very High' }
  ]
];

<GlassHeatmap
  data={heatmapData}
  className="w-64 h-32"
/>
```

**Props:**
- `data: HeatmapCell[][]` - 2D array of heatmap cells
- `className?: string` - Additional CSS classes

**HeatmapCell Interface:**
- `value: number` - Cell value (used for color intensity)
- `label?: string` - Optional tooltip/label

### GlassSparkline

Miniature line chart for displaying trends and patterns.

```tsx
const data = [10, 15, 12, 18, 25, 22, 28, 30, 27, 32];

// Default sparkline
<GlassSparkline
  data={data}
  width={120}
  height={32}
  stroke="currentColor"
/>

// Custom styled sparkline
<GlassSparkline
  data={data}
  width={150}
  height={40}
  stroke="#3B82F6"
  fill="rgba(59, 130, 246, 0.1)"
  className="text-blue-400"
/>
```

**Props:**
- `data: number[]` - Array of numeric values
- `width?: number` - Chart width (default: 120)
- `height?: number` - Chart height (default: 32)
- `stroke?: string` - Line color (default: 'currentColor')
- `fill?: string` - Fill color (default: 'none')
- `className?: string` - Additional CSS classes

### GlassAccordion

Collapsible accordion component with smooth animations, keyboard navigation, and glassmorphism styling.

```tsx
<GlassAccordion
  items={[
    {
      id: 'item1',
      title: 'Section 1',
      content: <div>Content for section 1</div>,
      icon: <ChevronIcon />
    },
    {
      id: 'item2',
      title: 'Section 2',
      content: <div>Content for section 2</div>
    }
  ]}
  variant="bordered"
  multiple={true}
  animated={true}
/>
```

**Props:**
- `items: AccordionItem[]` - Array of accordion items with id, title, content, and optional icon/disabled
- `variant?: 'default' | 'bordered' | 'flush'` - Visual variant
- `size?: 'sm' | 'md' | 'lg'` - Size of the accordion
- `multiple?: boolean` - Allow multiple items to be open simultaneously
- `value?: string | string[]` - Controlled open items (single or multiple)
- `defaultValue?: string | string[]` - Initially open items (uncontrolled)
- `onValueChange?: (value: string | string[]) => void` - Callback when open items change
- `showIcons?: boolean` - Whether to show expand/collapse icons
- `expandIcon?: ReactNode` - Custom expand icon
- `collapseIcon?: ReactNode` - Custom collapse icon
- `animationDuration?: number` - Animation duration in milliseconds
- `animated?: boolean` - Enable smooth height animations
- `collapsible?: boolean` - Allow items to be collapsed

### GlassBadgeLine

Inline badge collection component for displaying multiple status indicators.

```tsx
<GlassBadgeLine
  items={[
    { label: 'Active', intent: 'success' },
    { label: 'Beta', intent: 'warning' },
    { label: 'New', intent: 'default' }
  ]}
/>
```

**Props:**
- `items: { label: string; intent?: 'default' | 'success' | 'warning' | 'danger' }[]` - Badge items with label and optional intent
- `className?: string` - Additional CSS classes

### GlassDataGridPro

Advanced data grid component with enhanced features and performance optimizations.

```tsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', filterable: true },
  { key: 'role', header: 'Role', width: 150 }
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' }
];

<GlassDataGridPro
  columns={columns}
  rows={data}
  grouping={['role']}
  density="normal"
/>
```

**Props:**
- `columns: any[]` - Column definitions
- `rows: T[]` - Data rows
- `grouping?: string[]` - Grouping configuration
- `density?: 'compact' | 'normal' | 'spacious'` - Row density

### GlassDiffViewer

Side-by-side or unified diff viewer with syntax highlighting.

```tsx
const oldCode = `function hello() {
  console.log("Hello World");
}`;

const newCode = `function hello(name) {
  console.log(\`Hello \${name}!\`);
}`;

<GlassDiffViewer
  left={oldCode}
  right={newCode}
  sideBySide={true}
/>
```

**Props:**
- `left: string` - Original content
- `right: string` - Modified content
- `sideBySide?: boolean` - Show side-by-side view (default: true)
- `className?: string` - Additional CSS classes

### GlassJSONViewer

JSON data viewer with syntax highlighting and collapsible structure.

```tsx
const jsonData = {
  users: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ],
  metadata: {
    total: 2,
    page: 1,
    limit: 10
  }
};

<GlassJSONViewer value={jsonData} />
```

**Props:**
- `value: any` - JSON data to display
- `className?: string` - Additional CSS classes

### GlassSchemaViewer

Database schema viewer with JSON formatting.

```tsx
const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer', primaryKey: true },
    name: { type: 'string', maxLength: 100 },
    email: { type: 'string', format: 'email' }
  },
  required: ['id', 'name']
};

<GlassSchemaViewer schema={schema} />
```

**Props:**
- `schema: any` - Schema object to display
- `className?: string` - Additional CSS classes

### GlassVirtualTable

Virtualized table component for handling large datasets efficiently.

```tsx
const columns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' }
];

const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`
}));

<GlassVirtualTable
  columns={columns}
  rows={largeDataset}
  height="400px"
/>
```

**Props:**
- `columns: any[]` - Column definitions
- `rows: T[]` - Data rows
- Additional props passed to GlassDataTable

### GlassStatusDot

Status indicator dot with color-coded states and customizable sizing.

```tsx
// Basic status dots
<div className="flex items-center gap-4">
  <div className="flex items-center gap-2">
    <GlassStatusDot status="ok" />
    <span>Online</span>
  </div>
  <div className="flex items-center gap-2">
    <GlassStatusDot status="warn" />
    <span>Warning</span>
  </div>
  <div className="flex items-center gap-2">
    <GlassStatusDot status="error" />
    <span>Error</span>
  </div>
  <div className="flex items-center gap-2">
    <GlassStatusDot status="busy" />
    <span>Busy</span>
  </div>
</div>

// Custom size
<GlassStatusDot status="ok" size={12} />
```

**Props:**
- `status?: 'ok' | 'warn' | 'error' | 'busy' | 'offline'` - Status type (default: 'ok')
- `size?: number` - Dot size in pixels (default: 8)
- `className?: string` - Additional CSS classes

### GlassMetricChip

Compact metric display component with label, value, and optional delta information.

```tsx
// Basic metric chip
<GlassMetricChip
  label="Revenue"
  value="$12,345"
  delta="+12.5%"
  intent="success"
/>

// With icon
<GlassMetricChip
  label="Users"
  value="1,247"
  delta="+8.2%"
  intent="success"
  icon={<UsersIcon />}
/>

// Different intents
<div className="flex gap-2">
  <GlassMetricChip label="CPU" value="45%" intent="warning" />
  <GlassMetricChip label="Memory" value="78%" intent="danger" />
  <GlassMetricChip label="Disk" value="23%" intent="default" />
</div>
```

**Props:**
- `label: string` - Metric label
- `value: string | number` - Metric value
- `delta?: string` - Optional delta/change indicator
- `intent?: 'default' | 'success' | 'warning' | 'danger'` - Visual intent/color
- `icon?: ReactNode` - Optional icon
- `className?: string` - Additional CSS classes

## Chart Components

### GlassAreaChart

Area chart visualization.

```tsx
<GlassAreaChart
  data={[
    { x: 'Jan', y: 100 },
    { x: 'Feb', y: 200 },
    { x: 'Mar', y: 150 }
  ]}
  width={400}
  height={300}
/>
```

**Props:**
- `data?: ChartDataPoint[]` - Chart data points
- `width?: number` - Chart width
- `height?: number` - Chart height

### GlassBarChart

Bar chart visualization.

```tsx
<GlassBarChart
  data={[
    { x: 'A', y: 10 },
    { x: 'B', y: 20 },
    { x: 'C', y: 15 }
  ]}
  width={400}
  height={300}
/>
```

**Props:**
- `data?: ChartDataPoint[]` - Chart data points
- `width?: number` - Chart width
- `height?: number` - Chart height

### GlassLineChart

Line chart visualization.

```tsx
<GlassLineChart
  data={[
    { x: 1, y: 10 },
    { x: 2, y: 20 },
    { x: 3, y: 15 }
  ]}
  width={400}
  height={300}
/>
```

**Props:**
- `data?: ChartDataPoint[]` - Chart data points
- `width?: number` - Chart width
- `height?: number` - Chart height

### GlassPieChart

Pie chart visualization.

```tsx
<GlassPieChart
  data={[
    { value: 30, label: 'Category A', color: '#ff6b6b' },
    { value: 40, label: 'Category B', color: '#4ecdc4' },
    { value: 30, label: 'Category C', color: '#45b7d1' }
  ]}
  width={400}
  height={300}
/>
```

**Props:**
- `data?: PieDataPoint[]` - Pie chart data points
- `width?: number` - Chart width
- `height?: number` - Chart height

## Dashboard Components

### GlassKPICard

KPI metric display card.

```tsx
<GlassKPICard
  title="Revenue"
  value="$125,000"
  change={12.5}
  changeLabel="vs last month"
/>
```

**Props:**
- `title: string` - KPI title
- `value: string | number` - KPI value
- `change?: number` - Percentage change
- `changeLabel?: string` - Change description

### GlassMetricCard

General metric display card.

```tsx
<GlassMetricCard
  title="Active Users"
  value="1,234"
  icon={<UsersIcon />}
/>
```

**Props:**
- `title: string` - Metric title
- `value: string | number` - Metric value
- `icon?: ReactNode` - Metric icon

### GlassStatCard

Statistics display card.

```tsx
<GlassStatCard
  title="Conversion Rate"
  value="3.2%"
  description="12% increase from last month"
/>
```

**Props:**
- `title: string` - Statistic title
- `value: string | number` - Statistic value
- `description?: string` - Additional description

## Button Components

### GlassButton

Primary action button with multiple variants.

```tsx
<GlassButton
  variant="primary"
  size="md"
  disabled={loading}
  loading={loading}
  onClick={handleClick}
>
  Click me
</GlassButton>
```

**Props:**
- `variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link'` - Button variant
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `disabled?: boolean` - Disabled state
- `loading?: boolean` - Loading state
- `onClick?: () => void` - Click handler

### GlassFab

Floating action button with glassmorphism effects.

```tsx
<GlassFab
  icon={<PlusIcon />}
  onClick={handleAdd}
  position="bottom-right"
  size="lg"
/>
```

**Props:**
- `icon?: ReactNode` - Button icon
- `onClick?: () => void` - Click handler
- `position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'` - FAB position
- `size?: 'sm' | 'md' | 'lg'` - Button size

### GlassMagneticButton

Button with magnetic hover effects and glass styling.

```tsx
<GlassMagneticButton
  onClick={handleClick}
  magneticStrength={0.3}
>
  Magnetic Button
</GlassMagneticButton>
```

**Props:**
- `magneticStrength?: number` - Strength of magnetic effect
- `onClick?: () => void` - Click handler

## Card Components

### GlassCard

Content container with glass effects.

```tsx
<GlassCard padding="1.5rem" shadow>
  <CardContent />
</GlassCard>
```

**Props:**
- `padding?: string` - Card padding
- `shadow?: boolean` - Enable shadow

## Calendar Components

### GlassCalendar

Calendar component for date selection.

```tsx
<GlassCalendar
  value={selectedDate}
  onChange={setSelectedDate}
  minDate={new Date('2020-01-01')}
  maxDate={new Date('2030-12-31')}
/>
```

**Props:**
- `value?: Date` - Selected date
- `onChange?: (date: Date) => void` - Date change handler
- `minDate?: Date` - Minimum selectable date
- `maxDate?: Date` - Maximum selectable date

## Surface & Background Components

### DimensionalGlass

Glass surface with enhanced depth and lighting effects.

```tsx
<DimensionalGlass elevation={3} lighting="directional">
  <Content />
</DimensionalGlass>
```

**Props:**
- `elevation?: number` - Surface elevation level
- `lighting?: string` - Lighting effect type

### FrostedGlass

Frosted glass effect with customizable blur intensity.

```tsx
<FrostedGlass blur="strong" opacity={0.8}>
  <Content />
</FrostedGlass>
```

**Props:**
- `blur?: 'subtle' | 'medium' | 'strong'` - Blur intensity
- `opacity?: number` - Surface opacity

### HeatGlass

Glass surface with thermal/heat distortion effects.

```tsx
<HeatGlass intensity={0.5} distortion={0.2}>
  <Content />
</HeatGlass>
```

**Props:**
- `intensity?: number` - Effect intensity
- `distortion?: number` - Distortion amount

### WidgetGlass

Optimized glass container for dashboard widgets.

```tsx
<WidgetGlass padding="1rem" interactive>
  <WidgetContent />
</WidgetGlass>
```

**Props:**
- `padding?: string` - Container padding
- `interactive?: boolean` - Enable interaction effects

### PageGlassContainer

Full-page glass container with background integration.

```tsx
<PageGlassContainer backgroundImage="hero-bg.jpg">
  <PageContent />
</PageGlassContainer>
```

**Props:**
- `backgroundImage?: string` - Background image URL

### AtmosphericBackground

Dynamic atmospheric background effects.

```tsx
<AtmosphericBackground
  particleCount={50}
  colors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
/>
```

**Props:**
- `particleCount?: number` - Number of particles
- `colors?: string[]` - Particle colors

### ParticleBackground

Particle system background with customizable effects.

```tsx
<ParticleBackground
  density={0.8}
  speed={1.2}
  size={2}
/>
```

**Props:**
- `density?: number` - Particle density
- `speed?: number` - Animation speed
- `size?: number` - Particle size

### GlassDynamicAtmosphere

Dynamic atmospheric background with interactive effects, physics-based animations, and customizable visual themes.

```tsx
<GlassDynamicAtmosphere
  type="nebula"
  primaryColor="#6366F1"
  secondaryColor="#8B5CF6"
  accentColor="#EC4899"
  intensity={0.8}
  speed={0.5}
  interactionMode="mouse"
  interactionSensitivity={0.3}
  fullSize={true}
  zIndex={-1}
/>
```

**Props:**
- `type?: AtmosphereType` - Effect type ('subtle' | 'nebula' | 'aurora' | 'particles' | 'waves' | 'gradient' | 'ambient' | 'custom')
- `primaryColor?: string` - Primary color for effects
- `secondaryColor?: string` - Secondary color for effects
- `accentColor?: string` - Accent color for effects
- `intensity?: number` - Effect intensity (0-1)
- `speed?: number` - Animation speed (0-1)
- `interactionMode?: InteractionMode` - Interaction type ('none' | 'mouse' | 'scroll' | 'audio' | 'time')
- `interactionSensitivity?: number` - Interaction sensitivity (0-1)
- `fullSize?: boolean` - Fill container completely
- `width?: string | number` - Atmosphere width
- `height?: string | number` - Atmosphere height
- `zIndex?: number` - Z-index for layering
- `position?: 'absolute' | 'fixed' | 'relative'` - CSS position
- `respectReducedMotion?: boolean` - Respect reduced motion preferences
- `elementCount?: number` - Number of animated elements
- `className?: string` - Additional CSS classes

**AtmosphereType:**
- `'subtle'` - Minimal glassmorphism effects
- `'nebula'` - Cloud-like particle effects
- `'aurora'` - Northern lights inspired gradients
- `'particles'` - Interactive particle system
- `'waves'` - Fluid wave animations
- `'gradient'` - Dynamic color transitions
- `'ambient'` - Subtle background lighting
- `'custom'` - Custom effect configuration

**InteractionMode:**
- `'none'` - No user interaction
- `'mouse'` - Mouse movement effects
- `'scroll'` - Scroll-based animations
- `'audio'` - Audio-reactive effects
- `'time'` - Time-based transitions

## Utility Components

### SpeedDial

Expandable floating action button with multiple actions.

```tsx
<SpeedDial>
  <SpeedDialAction icon={<EditIcon />} tooltip="Edit" />
  <SpeedDialAction icon={<DeleteIcon />} tooltip="Delete" />
  <SpeedDialAction icon={<ShareIcon />} tooltip="Share" />
</SpeedDial>
```

**Props:**
- `children?: ReactNode` - Speed dial actions
- `direction?: 'up' | 'down' | 'left' | 'right'` - Expansion direction

### ToggleButton

Toggleable button component.

```tsx
<ToggleButton
  selected={isSelected}
  onChange={setIsSelected}
>
  Toggle Me
</ToggleButton>
```

**Props:**
- `selected?: boolean` - Selection state
- `onChange?: (selected: boolean) => void` - State change handler

### ToggleButtonGroup

Group of toggle buttons with single/multiple selection.

```tsx
<ToggleButtonGroup
  value={selectedValues}
  onChange={setSelectedValues}
  exclusive
>
  <ToggleButton value="option1">Option 1</ToggleButton>
  <ToggleButton value="option2">Option 2</ToggleButton>
  <ToggleButton value="option3">Option 3</ToggleButton>
</ToggleButtonGroup>
```

**Props:**
- `value?: string | string[]` - Selected values
- `onChange?: (value: string | string[]) => void` - Selection change handler
- `exclusive?: boolean` - Single selection mode

### TreeView

Hierarchical tree structure component.

```tsx
<TreeView>
  <TreeItem label="Root">
    <TreeItem label="Child 1" />
    <TreeItem label="Child 2">
      <TreeItem label="Grandchild" />
    </TreeItem>
  </TreeItem>
</TreeView>
```

**Props:**
- `children?: ReactNode` - Tree items

### ImageList

Grid layout for images with optional bars.

```tsx
<ImageList cols={3} gap={8}>
  <ImageListItem>
    <img src="image1.jpg" alt="Image 1" />
    <ImageListItemBar title="Image 1" />
  </ImageListItem>
  <ImageListItem>
    <img src="image2.jpg" alt="Image 2" />
  </ImageListItem>
</ImageList>
```

**Props:**
- `cols?: number` - Number of columns
- `gap?: number` - Gap between items

### Cookie Components

#### CompactCookieNotice

Minimal cookie consent notice.

```tsx
<CompactCookieNotice
  onAccept={handleAccept}
  onDecline={handleDecline}
/>
```

#### CookieConsent

Full-featured cookie consent dialog.

```tsx
<CookieConsent
  categories={cookieCategories}
  onAccept={handleAccept}
  onDecline={handleDecline}
/>
```

#### GlobalCookieConsent

Global cookie consent management.

```tsx
<GlobalCookieConsent
  settings={consentSettings}
  onSettingsChange={handleSettingsChange}
/>
```

## Template Components

### GlassDashboard

Pre-built dashboard template with widgets.

```tsx
<GlassDashboard>
  <GlassDashboard.Header>
    <h1>Dashboard</h1>
  </GlassDashboard.Header>
  <GlassDashboard.Content>
    <GlassKPICard title="Revenue" value="$125,000" />
    <GlassChartWidget>
      <GlassAreaChart data={chartData} />
    </GlassChartWidget>
  </GlassDashboard.Content>
</GlassDashboard>
```

**Props:**
- `header?: ReactNode` - Dashboard header
- `content?: ReactNode` - Dashboard content

### GlassDetailView

Detail view template for displaying item information.

```tsx
<GlassDetailView
  title="Item Details"
  data={itemData}
  actions={<ActionButtons />}
>
  <GlassDetailView.Header>
    <GlassAvatar src={itemData.avatar} />
    <h1>{itemData.title}</h1>
  </GlassDetailView.Header>
  <GlassDetailView.Content>
    <DetailContent />
  </GlassDetailView.Content>
</GlassDetailView>
```

**Props:**
- `title?: string` - View title
- `data?: any` - Item data
- `actions?: ReactNode` - Action buttons

### GlassFormTemplate

Pre-configured form layout template.

```tsx
<GlassFormTemplate
  title="Contact Form"
  onSubmit={handleSubmit}
>
  <GlassInput label="Name" placeholder="Your name" />
  <GlassInput label="Email" type="email" />
  <GlassTextarea label="Message" />
  <GlassButton type="submit">Send</GlassButton>
</GlassFormTemplate>
```

**Props:**
- `title?: string` - Form title
- `onSubmit?: (data: any) => void` - Submit handler

### GlassListView

List view template with search and filtering.

```tsx
<GlassListView
  items={listItems}
  onItemClick={handleItemClick}
  searchPlaceholder="Search items..."
>
  <GlassListView.Header>
    <h2>Items List</h2>
  </GlassListView.Header>
  <GlassListView.Filters>
    <FilterControls />
  </GlassListView.Filters>
</GlassListView>
```

**Props:**
- `items?: any[]` - List items
- `onItemClick?: (item: any) => void` - Item click handler
- `searchPlaceholder?: string` - Search input placeholder

## Website & Demo Components

### GlassChartsDemo

Demonstration component for chart visualizations.

```tsx
<GlassChartsDemo
  theme="glass"
  animation={true}
  interactive={true}
/>
```

**Props:**
- `theme?: string` - Chart theme
- `animation?: boolean` - Enable animations
- `interactive?: boolean` - Enable interactivity

### GlassLinkButton

Styled link button with glass effects.

```tsx
<GlassLinkButton href="/about" variant="primary">
  Learn More
</GlassLinkButton>
```

**Props:**
- `href?: string` - Link destination
- `variant?: string` - Button variant

### GlassPrismComparison

Visual comparison component for prism effects.

```tsx
<GlassPrismComparison
  leftContent={<OriginalContent />}
  rightContent={<PrismContent />}
  labels={['Original', 'With Prism']}
/>
```

**Props:**
- `leftContent?: ReactNode` - Left side content
- `rightContent?: ReactNode` - Right side content
- `labels?: string[]` - Content labels

### GlassWipeSlider

Wipe transition slider component.

```tsx
<GlassWipeSlider
  slides={[
    { content: <Slide1 />, background: 'bg1.jpg' },
    { content: <Slide2 />, background: 'bg2.jpg' }
  ]}
  autoplay={true}
  duration={3000}
/>
```

**Props:**
- `slides?: SlideData[]` - Slider slides
- `autoplay?: boolean` - Enable autoplay
- `duration?: number` - Slide duration in ms

### MotionAwareGlass

Glass component with motion detection and responsive effects.

```tsx
<MotionAwareGlass sensitivity={0.5} effects={['blur', 'opacity']}>
  <Content />
</MotionAwareGlass>
```

**Props:**
- `sensitivity?: number` - Motion sensitivity
- `effects?: string[]` - Active effects

## Animation Components

### GlassMotionController

Animation orchestration system for complex motion sequences and interactions.

```tsx
<GlassMotionController enabled={true} speed={1} reduceMotion={false}>
  <GlassAnimated
    animation={{
      type: 'fadeIn',
      direction: 'up',
      duration: 600,
      easing: 'easeOut'
    }}
  >
    <GlassCard>Animated Content</GlassCard>
  </GlassAnimated>
</GlassMotionController>
```

**Props:**
- `enabled?: boolean` - Whether animations are globally enabled
- `speed?: number` - Global animation speed multiplier
- `reduceMotion?: boolean` - Whether to reduce motion for accessibility
- `children: ReactNode` - Animated content

### GlassAnimated

Wrapper component for individual animated elements.

```tsx
<GlassAnimated
  animation={{
    type: 'scaleIn',
    duration: 400,
    easing: 'easeOut'
  }}
  trigger="hover"
>
  <GlassButton>Hover to Animate</GlassButton>
</GlassAnimated>
```

**Props:**
- `animation?: AnimationConfig` - Animation configuration
- `trigger?: 'mount' | 'hover' | 'click' | 'manual'` - Animation trigger
- `className?: string` - Additional CSS classes

### GlassAnimationSequence

Sequential animation component for staggered animations.

```tsx
<GlassAnimationSequence staggerDelay={100}>
  <GlassCard>Card 1</GlassCard>
  <GlassCard>Card 2</GlassCard>
  <GlassCard>Card 3</GlassCard>
</GlassAnimationSequence>
```

**Props:**
- `staggerDelay?: number` - Delay between each child animation (ms)
- `className?: string` - Additional CSS classes

### GlassAnimationTimeline

Complex animation timeline for coordinated multi-element animations.

```tsx
<GlassAnimationTimeline
  timeline={[
    {
      selector: '.hero-title',
      animation: { type: 'slideIn', direction: 'left', duration: 600 },
      startTime: 0
    },
    {
      selector: '.hero-subtitle',
      animation: { type: 'fadeIn', duration: 400 },
      startTime: 300
    }
  ]}
>
  <div className="hero-title">Title</div>
  <div className="hero-subtitle">Subtitle</div>
</GlassAnimationTimeline>
```

**Props:**
- `timeline: TimelineItem[]` - Animation timeline configuration
- `className?: string` - Additional CSS classes

## Theming and Customization

All AuraGlass components support extensive customization through the `OptimizedGlass` primitive. You can customize:

- **Colors**: Background variants, tints, and color schemes
- **Effects**: Blur intensity, lighting, refraction, caustics
- **Animations**: Hover effects, transitions, micro-interactions
- **Performance**: Lazy loading, performance modes, adaptive effects

For advanced customization, you can create your own component variants by wrapping existing components with custom `OptimizedGlass` configurations.

