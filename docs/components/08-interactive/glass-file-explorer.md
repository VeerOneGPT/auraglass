### GlassFileExplorer

File system browser component.

```tsx
<GlassFileExplorer
  files={files}
  onFileSelect={handleFileSelect}
  onFolderOpen={handleFolderOpen}
/>
```

**Props:**
- `files?: FileItem[]` - File system structure
- `onFileSelect?: (file: FileItem) => void` - File selection handler
- `onFolderOpen?: (folder: FileItem) => void` - Folder open handler
