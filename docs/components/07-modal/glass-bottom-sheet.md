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
