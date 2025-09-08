# AuraGlass Component Reference

**🎯 AuraGlass Design System Statistics:**
- **Total Glass Components**: 142+ components
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

