### GlassMindMap

Hierarchical data visualization component with interactive editing.

```tsx
<GlassMindMap
  data={mindMapData}
  editable={true}
  zoomable={true}
  direction="horizontal"
  onNodeClick={handleNodeClick}
/>
```

**Props:**
- `data: MindMapNode` - Root node data
- `connections?: MindMapConnection[]` - Custom connections
- `editable?: boolean` - Whether nodes are editable
- `zoomable?: boolean` - Whether zooming is enabled
- `direction?: 'horizontal' | 'vertical' | 'radial'` - Layout direction
- `onNodeClick?: (node: MindMapNode) => void` - Node click handler
