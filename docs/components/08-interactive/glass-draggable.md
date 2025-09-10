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
