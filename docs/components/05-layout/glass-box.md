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
