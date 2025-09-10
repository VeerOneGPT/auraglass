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
