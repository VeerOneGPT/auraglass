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
