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
