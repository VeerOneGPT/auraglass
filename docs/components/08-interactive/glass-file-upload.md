### GlassFileUpload

Advanced file upload component with drag-and-drop, progress tracking, and preview capabilities.

```tsx
// Basic file upload
<GlassFileUpload
  accept="image/*,.pdf,.doc,.docx"
  multiple={true}
  maxSize={5 * 1024 * 1024} // 5MB
  maxFiles={10}
  onChange={(files) => console.log('Files changed:', files)}
  onUpload={async (file) => {
    // Simulate upload
    return new Promise((resolve) => {
      setTimeout(() => resolve({ url: `https://example.com/${file.name}` }), 2000);
    });
  }}
  showPreviews={true}
  showProgress={true}
  instruction="Drag and drop files here or click to browse"
  variant="default"
  size="md"
/>

// Custom file renderer
<GlassFileUpload
  files={uploadedFiles}
  onRemove={(fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }}
  onPreview={(file) => {
    window.open(file.url, '_blank');
  }}
  customFileRenderer={(file) => (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
      <FileIcon className="w-8 h-8" />
      <div className="flex-1">
        <div className="font-medium">{file.name}</div>
        <div className="text-sm text-white/60">{(file.size / 1024).toFixed(1)} KB</div>
      </div>
      <GlassButton variant="ghost" size="sm">Remove</GlassButton>
    </div>
  )}
/>
```

**Props:**
- `accept?: string` - Accepted file types (e.g., "image/*,.pdf")
- `multiple?: boolean` - Allow multiple file selection
- `maxSize?: number` - Maximum file size in bytes
- `maxFiles?: number` - Maximum number of files
- `variant?: 'default' | 'compact' | 'minimal' | 'grid'` - Upload variant
- `size?: 'sm' | 'md' | 'lg'` - Component size
- `disabled?: boolean` - Disabled state
- `files?: UploadedFile[]` - Uploaded files array
- `onChange?: (files: UploadedFile[]) => void` - Files change handler
- `onUpload?: (file: File) => Promise<{ url: string } | void>` - Upload function
- `onRemove?: (fileId: string) => void` - File removal handler
- `onPreview?: (file: UploadedFile) => void` - File preview handler
- `showPreviews?: boolean` - Show file previews
- `showProgress?: boolean` - Show upload progress
- `instruction?: string` - Upload instruction text
- `helperText?: string` - Helper text
- `error?: string` - Error message
- `autoUpload?: boolean` - Auto-upload on file selection
- `customFileRenderer?: (file: UploadedFile) => ReactNode` - Custom file display
- `className?: string` - Additional CSS classes

**UploadedFile Interface:**
- `id: string` - Unique file identifier
- `file: File` - Original File object
- `name: string` - File name
- `size: number` - File size in bytes
- `type: string` - MIME type
- `url?: string` - Uploaded file URL
- `preview?: string` - Preview URL for images
- `status: 'pending' | 'uploading' | 'completed' | 'error'` - Upload status
- `progress?: number` - Upload progress (0-100)
- `error?: string` - Error message
