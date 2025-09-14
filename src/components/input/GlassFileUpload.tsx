'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';

export interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

export interface GlassFileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Accepted file types (e.g., '.jpg,.png,.pdf' or 'image/*')
   */
  accept?: string;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Maximum number of files
   */
  maxFiles?: number;
  /**
   * Whether to allow multiple file selection
   */
  multiple?: boolean;
  /**
   * Upload handler function
   */
  onUpload?: (files: File[]) => Promise<void>;
  /**
   * File change handler
   */
  onChange?: (files: UploadedFile[]) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Custom upload text
   */
  uploadText?: string;
  /**
   * Custom browse text
   */
  browseText?: string;
  /**
   * Show file preview
   */
  showPreview?: boolean;
  /**
   * Custom validation function
   */
  validator?: (file: File) => string | null;
  /**
   * Upload URL endpoint
   */
  uploadUrl?: string;
}

export const GlassFileUpload: React.FC<GlassFileUploadProps> = ({
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  multiple = true,
  onUpload,
  onChange,
  disabled = false,
  uploadText = "Drag and drop files here, or click to browse",
  browseText = "Browse Files",
  showPreview = true,
  validator,
  uploadUrl,
  className,
  ...props
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File validation
  const validateFile = useCallback((file: File): string | null => {
    // Custom validator first
    if (validator) {
      const customError = validator(file);
      if (customError) return customError;
    }

    // Size validation
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)} limit`;
    }

    // Type validation
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const isValidType = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        } else if (type.includes('/*')) {
          return file.type.startsWith(type.split('/')[0]);
        } else {
          return file.type === type;
        }
      });
      
      if (!isValidType) {
        return `File type not supported. Accepted types: ${accept}`;
      }
    }

    return null;
  }, [accept, maxSize, validator]);

  // Handle file selection
  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    
    // Check max files limit
    if (files.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles: UploadedFile[] = [];
    const invalidFiles: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        invalidFiles.push(`${file.name}: ${error}`);
      } else {
        validFiles.push({
          file,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          progress: 0,
          status: 'uploading',
        });
      }
    });

    if (invalidFiles.length > 0) {
      alert(`Invalid files:\n${invalidFiles.join('\n')}`);
    }

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onChange?.(updatedFiles);

      // Start upload if handler provided
      if (onUpload || uploadUrl) {
        uploadFiles(validFiles);
      } else {
        // Mark as completed if no upload handler
        const completedFiles = validFiles.map(f => ({ ...f, status: 'completed' as const, progress: 100 }));
        setFiles(prev => prev.map(f => completedFiles.find(cf => cf.id === f.id) || f));
      }
    }
  }, [files, maxFiles, validateFile, onChange, onUpload, uploadUrl]);

  // Upload files
  const uploadFiles = async (filesToUpload: UploadedFile[]) => {
    setIsUploading(true);

    for (const uploadedFile of filesToUpload) {
      try {
        if (onUpload) {
          // Custom upload handler
          await onUpload([uploadedFile.file]);
          updateFileStatus(uploadedFile.id, 'completed', 100);
        } else if (uploadUrl) {
          // Upload to URL endpoint
          await uploadFileToUrl(uploadedFile);
        }
      } catch (error) {
        updateFileStatus(uploadedFile.id, 'error', 0, error instanceof Error ? error.message : 'Upload failed');
      }
    }

    setIsUploading(false);
  };

  // Upload file to URL
  const uploadFileToUrl = async (uploadedFile: UploadedFile) => {
    const formData = new FormData();
    formData.append('file', uploadedFile.file);

    const xhr = new XMLHttpRequest();

    return new Promise<void>((resolve, reject) => {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          updateFileProgress(uploadedFile.id, progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          updateFileStatus(uploadedFile.id, 'completed', 100);
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));

      xhr.open('POST', uploadUrl!);
      xhr.send(formData);
    });
  };

  // Update file progress
  const updateFileProgress = (id: string, progress: number) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, progress } : f));
  };

  // Update file status
  const updateFileStatus = (id: string, status: UploadedFile['status'], progress?: number, error?: string) => {
    setFiles(prev => prev.map(f => 
      f.id === id 
        ? { ...f, status, progress: progress ?? f.progress, error }
        : f
    ));
  };

  // Remove file
  const removeFile = (id: string) => {
    const updatedFiles = files.filter(f => f.id !== id);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  }, [disabled, handleFiles]);

  // File input click handler
  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // File input change handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleFiles(selectedFiles);
    }
    // Reset input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon
  const getFileIcon = (file: File): string => {
    const type = file.type.toLowerCase();
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📽️';
    if (type.includes('zip') || type.includes('archive')) return '📦';
    return '📄';
  };

  // Render file preview
  const renderFilePreview = (uploadedFile: UploadedFile) => {
    const { file, progress, status, error } = uploadedFile;
    
    return (
      <div key={uploadedFile.id} className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-p-3 glass-surface-subtle glass-radius-lg glass-glass-glass-border">
        <div className="glass-glass-glass-text-2xl mr-3">{getFileIcon(file)}</div>
        
        <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
          <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
            <p className="glass-glass-glass-text-sm glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-truncate">{file.name}</p>
            <button
              onClick={() => removeFile(uploadedFile.id)}
              className="ml-2 glass-glass-glass-text-primary hover:glass-glass-glass-text-primary glass-glass-glass-text-sm"
              disabled={status === 'uploading'}
            >
              ✕
            </button>
          </div>
          
          <p className="glass-glass-glass-text-xs glass-text-secondary">
            {formatFileSize(file.size)}
            {status === 'completed' && <span className="glass-glass-glass-text-primary ml-2">✓ Completed</span>}
            {status === 'error' && <span className="glass-glass-glass-text-primary ml-2">✗ {error}</span>}
          </p>
          
          {status === 'uploading' && (
            <div className="mt-2">
              <div className="glass-glass-glass-w-full glass-surface-subtle glass-radius-full glass-glass-glass-h-1">
                <div 
                  className="glass-surface-blue glass-glass-glass-h-1 glass-radius-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="glass-glass-glass-text-xs glass-text-secondary mt-1">{progress}%</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Upload area */}
      <Glass
        className={cn(
          'border-2 border-dashed glass-p-8 text-center transition-all duration-200 cursor-pointer',
          isDragOver && !disabled && 'border-primary bg-primary/5',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5',
          files.length > 0 ? 'glass-radius-t-xl' : 'glass-radius-xl'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-items-center glass-glass-glass-gap-4">
          <div className="glass-glass-glass-text-4xl opacity-60">
            {isUploading ? '⏳' : '📁'}
          </div>
          
          <div>
            <p className="glass-glass-glass-text-lg glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-2">
              {isUploading ? 'Uploading...' : uploadText}
            </p>
            <p className="glass-text-secondary">
              {accept && `Accepted formats: ${accept}`}
              {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
              {multiple && ` • Max files: ${maxFiles}`}
            </p>
          </div>
          
          {!isUploading && (
            <button
              type="button"
              className="glass-glass-glass-px-4 glass-glass-glass-py-2 glass-surface-primary glass-glass-glass-text-primary-foreground glass-radius-lg hover:glass-surface-primary/90 transition-colors glass-glass-glass-font-medium"
              disabled={disabled}
            >
              {browseText}
            </button>
          )}
        </div>
      </Glass>

      {/* File list */}
      {showPreview && files.length > 0 && (
        <Glass className="glass-glass-glass-border-t-0 glass-radius-b-xl glass-glass-glass-p-4 glass-glass-glass-space-y-3">
          <h4 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-3">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          {files.map(renderFilePreview)}
        </Glass>
      )}
    </div>
  );
};

GlassFileUpload.displayName = 'GlassFileUpload';