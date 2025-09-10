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
