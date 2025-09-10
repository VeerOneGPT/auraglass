### GlassComponentPlayground

Interactive component development environment.

```tsx
<GlassComponentPlayground
  examples={componentExamples}
  defaultExample="GlassButton"
  showCode={true}
  showProps={true}
/>
```

**Props:**
- `examples: ComponentExample[]` - Available component examples
- `defaultExample?: string` - Default selected example
- `showCode?: boolean` - Whether to show code panel
- `showProps?: boolean` - Whether to show props panel
- `customTabs?: PlaygroundTab[]` - Custom tabs
