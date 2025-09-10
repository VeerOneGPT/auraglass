### GlassFileTree

Hierarchical file tree component with search, CRUD operations, and glassmorphism styling.

```tsx
const fileTreeData = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: '/src',
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        path: '/src/components',
        children: [
          {
            id: '3',
            name: 'Button.tsx',
            type: 'file',
            path: '/src/components/Button.tsx',
            size: 2048,
            extension: 'tsx',
            modifiedAt: new Date('2024-01-15')
          },
          {
            id: '4',
            name: 'Input.tsx',
            type: 'file',
            path: '/src/components/Input.tsx',
            size: 1536,
            extension: 'tsx',
            modifiedAt: new Date('2024-01-14')
          }
        ]
      },
      {
        id: '5',
        name: 'utils',
        type: 'folder',
        path: '/src/utils',
        children: [
          {
            id: '6',
            name: 'helpers.ts',
            type: 'file',
            path: '/src/utils/helpers.ts',
            size: 1024,
            extension: 'ts'
          }
        ]
      }
    ]
  }
];

<GlassFileTree
  nodes={fileTreeData}
  selectedNodeId="3"
  onNodeSelect={(node) => console.log('Selected:', node)}
  onNodeToggle={(nodeId, expanded) => console.log('Toggle:', nodeId, expanded)}
  onNodeCreate={(parentId, name, type) => console.log('Create:', parentId, name, type)}
  onNodeDelete={(nodeId) => console.log('Delete:', nodeId)}
  onNodeRename={(nodeId, newName) => console.log('Rename:', nodeId, newName)}
  showIcons={true}
  showSize={true}
  showModified={true}
  allowCreate={true}
  allowDelete={true}
  allowRename={true}
  maxHeight="500px"
  variant="default"
  size="md"
/>
```

**Props:**
- `nodes: TreeNode[]` - Tree node data
- `onNodeSelect?: (node: TreeNode) => void` - Node selection handler
- `onNodeToggle?: (nodeId: string, expanded: boolean) => void` - Node expand/collapse handler
- `onNodeCreate?: (parentId: string, name: string, type: 'file' | 'folder') => void` - Node creation handler
- `onNodeDelete?: (nodeId: string) => void` - Node deletion handler
- `onNodeRename?: (nodeId: string, newName: string) => void` - Node rename handler
- `onNodeMove?: (nodeId: string, newParentId: string) => void` - Node move handler
- `onNodeCopy?: (nodeId: string, newParentId: string) => void` - Node copy handler
- `selectedNodeId?: string` - Currently selected node ID
- `expandedNodes?: string[]` - Expanded node IDs
- `onExpandedChange?: (expandedNodes: string[]) => void` - Expanded nodes change handler
- `searchQuery?: string` - Search query
- `onSearchChange?: (query: string) => void` - Search query change handler
- `showIcons?: boolean` - Show file/folder icons
- `showSize?: boolean` - Show file sizes
- `showModified?: boolean` - Show modification dates
- `allowCreate?: boolean` - Enable node creation
- `allowDelete?: boolean` - Enable node deletion
- `allowRename?: boolean` - Enable node renaming
- `allowMove?: boolean` - Enable node moving
- `allowCopy?: boolean` - Enable node copying
- `className?: string` - Additional CSS classes
- `maxHeight?: string | number` - Maximum tree height
- `virtualize?: boolean` - Enable virtualization for large trees
- `variant?: 'default' | 'compact' | 'minimal'` - Visual variant
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `elevation?: 'low' | 'medium' | 'high'` - Glass elevation

**TreeNode Interface:**
- `id: string` - Unique node identifier
- `name: string` - Node name
- `type: 'file' | 'folder'` - Node type
- `path: string` - Full node path
- `size?: number` - File size in bytes
- `modifiedAt?: Date` - Last modification date
- `extension?: string` - File extension
- `children?: TreeNode[]` - Child nodes
- `isExpanded?: boolean` - Expansion state
- `isLoading?: boolean` - Loading state
- `canExpand?: boolean` - Whether node can be expanded
- `level: number` - Node depth level
