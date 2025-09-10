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
