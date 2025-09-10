### GlassDiffViewer

Side-by-side or unified diff viewer with syntax highlighting.

```tsx
const oldCode = `function hello() {
  console.log("Hello World");
}`;

const newCode = `function hello(name) {
  console.log(`Hello ${name}!`);
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

```