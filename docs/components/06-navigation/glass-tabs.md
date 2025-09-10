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
