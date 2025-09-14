'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';
import { useImageProcessing, ImageFile, FilterOptions, WatermarkOptions, Template, OptimizationOptions } from './GlassImageProcessingProvider';

export interface IntelligentImageUploaderProps {
  className?: string;
  maxFiles?: number;
  acceptedFormats?: string[];
  maxFileSize?: number; // MB
  showEditor?: boolean;
  showOptimization?: boolean;
  showTemplates?: boolean;
  showAIFeatures?: boolean;
  onImagesUploaded?: (images: ImageFile[]) => void;
  onImageEdited?: (image: ImageFile) => void;
}

interface ImageEditorProps {
  image: ImageFile;
  onSave: (image: ImageFile) => void;
  onClose: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ image, onSave, onClose }) => {
  const {
    optimizeImage,
    applyFilter,
    cropImage,
    resizeImage,
    addWatermark,
    detectFaces,
    removeBackground,
    enhanceImage,
    smartCrop,
    templates,
    applyTemplate
  } = useImageProcessing();

  const [activeTab, setActiveTab] = useState<'basic' | 'filters' | 'ai' | 'templates'>('basic');
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFilters] = useState<Partial<FilterOptions>>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    blur: 0,
    sharpen: 0
  });

  const handleOptimize = async () => {
    setIsProcessing(true);
    try {
      const optimized = await optimizeImage(image.id, { quality: 85 });
      onSave(optimized);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFilterChange = async (filterType: keyof FilterOptions, value: number) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    try {
      await applyFilter(image.id, { [filterType]: value });
    } catch (error) {
      console.error('Filter failed:', error);
    }
  };

  const handleAIEnhance = async () => {
    setIsProcessing(true);
    try {
      const enhanced = await enhanceImage(image.id);
      onSave(enhanced);
    } catch (error) {
      console.error('AI enhancement failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    try {
      const processed = await removeBackground(image.id);
      onSave(processed);
    } catch (error) {
      console.error('Background removal failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTemplateApply = async (templateId: string) => {
    setIsProcessing(true);
    try {
      const templated = await applyTemplate(image.id, templateId);
      onSave(templated);
    } catch (error) {
      console.error('Template application failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-glass-glass-fixed glass-glass-glass-inset-0 glass-glass-glass-z-50 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-surface-dark bg-opacity-75">
      <Glass className="glass-glass-glass-w-full max-w-6xl max-h-[90vh] glass-glass-glass-m-4 overflow-hidden">
        <div className="glass-glass-glass-flex glass-glass-glass-h-full">
          {/* Image Preview */}
          <div className="glass-glass-glass-flex-1 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-surface-subtle glass-glass-glass-p-4">
            <div className="glass-glass-glass-relative max-glass-glass-glass-w-full max-glass-glass-glass-h-full">
              <img
                src={image.url}
                alt={image.name}
                className="max-glass-glass-glass-w-full max-glass-glass-glass-h-full object-contain"
                ref={(el)=>{ if(el) el.style.maxHeight = '70vh'; }}
              />
              {isProcessing && (
                <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-surface-dark glass-opacity-50 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">
                  <div className="glass-surface-subtle glass-radius-lg glass-glass-glass-p-4 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                    <div className="animate-spin glass-glass-glass-w-6 glass-glass-glass-h-6 glass-glass-glass-border-2 glass-glass-glass-border-blue glass-glass-glass-border-t-transparent glass-radius-full"></div>
                    <span>Processing...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="glass-glass-glass-w-80 glass-glass-glass-border-l glass-glass-glass-border-subtle glass-glass-glass-flex glass-glass-glass-flex-col">
            {/* Header */}
            <div className="glass-glass-glass-p-4 glass-glass-glass-border-b glass-glass-glass-border-subtle">
              <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-semibold">{image.name}</h3>
                <button
                  onClick={onClose}
                  className="glass-text-secondary hover:glass-text-secondary glass-glass-glass-p-1 glass-focus"
                >
                  ✕
                </button>
              </div>
              <div className="glass-glass-glass-text-sm glass-text-secondary glass-mt-1">
                {image.width} × {image.height} • {(image.size / 1024).toFixed(1)} KB
              </div>
            </div>

            {/* Tabs */}
            <div className="glass-glass-glass-flex glass-glass-glass-border-b glass-glass-glass-border-subtle">
              {[
                { key: 'basic', label: 'Basic', icon: '⚙️' },
                { key: 'filters', label: 'Filters', icon: '🎨' },
                { key: 'ai', label: 'AI', icon: '🤖' },
                { key: 'templates', label: 'Templates', icon: '📐' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={cn(
                    'glass-glass-glass-flex-1 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-gap-1 glass-glass-glass-py-3 glass-glass-glass-text-sm glass-glass-glass-font-medium glass-transition',
                    activeTab === tab.key ? 'glass-text-primary glass-border-b-2 glass-border glass-surface-primary/10' : 'glass-text-secondary hover:glass-text-primary'
                  )}
                >
                  <span className="glass-glass-glass-text-xs">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="glass-glass-glass-flex-1 glass-glass-glass-overflow-y-auto glass-glass-glass-p-4">
              {activeTab === 'basic' && (
                <div className="glass-glass-glass-space-y-4">
                  <div>
                    <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-3">Optimization</h4>
                    <button
                      onClick={handleOptimize}
                      disabled={isProcessing}
                      className="glass-glass-glass-w-full glass-glass-glass-py-2 glass-surface-blue glass-glass-glass-text-primary glass-radius hover:glass-surface-blue disabled:opacity-50 transition-colors glass-focus"
                      aria-label="Run smart optimization"
                    >
                      {isProcessing ? 'Optimizing...' : 'Smart Optimize'}
                    </button>
                    <p className="glass-glass-glass-text-xs glass-text-secondary glass-mt-2">
                      Reduces file size while maintaining quality
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-3">Quick Actions</h4>
                    <div className="glass-glass-glass-space-y-2">
                      <button className="glass-glass-glass-w-full glass-glass-glass-py-2 glass-glass-glass-border glass-glass-glass-border-subtle glass-radius hover:glass-surface-subtle transition-colors glass-focus" aria-label="Crop and resize image">
                        Crop & Resize
                      </button>
                      <button className="glass-glass-glass-w-full glass-glass-glass-py-2 glass-glass-glass-border glass-glass-glass-border-subtle glass-radius hover:glass-surface-subtle transition-colors glass-focus" aria-label="Add watermark">
                        Add Watermark
                      </button>
                      <button className="glass-glass-glass-w-full glass-glass-glass-py-2 glass-glass-glass-border glass-glass-glass-border-subtle glass-radius hover:glass-surface-subtle transition-colors">
                        Download
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-3">Image Info</h4>
                    <div className="glass-glass-glass-space-y-2 glass-glass-glass-text-sm">
                      <div className="glass-glass-glass-flex glass-glass-glass-justify-between">
                        <span className="glass-text-secondary">Format:</span>
                        <span>{image.metadata.format.toUpperCase()}</span>
                      </div>
                      <div className="glass-glass-glass-flex glass-glass-glass-justify-between">
                        <span className="glass-text-secondary">Quality:</span>
                        <span>{image.metadata.quality}%</span>
                      </div>
                      <div className="glass-glass-glass-flex glass-glass-glass-justify-between">
                        <span className="glass-text-secondary">Color Space:</span>
                        <span>{image.metadata.colorSpace}</span>
                      </div>
                      <div className="glass-glass-glass-flex glass-glass-glass-justify-between">
                        <span className="glass-text-secondary">Has Alpha:</span>
                        <span>{image.metadata.hasAlpha ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'filters' && (
                <div className="glass-glass-glass-space-y-4">
                  <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-3">Adjust Filters</h4>
                  
                  {Object.entries(filters).map(([key, value]) => (
                    <div key={key}>
                      <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-mb-2">
                        <label className="glass-glass-glass-text-sm glass-glass-glass-font-medium glass-glass-glass-capitalize">
                          {key}
                        </label>
                        <span className="glass-glass-glass-text-sm glass-text-secondary">{value}</span>
                      </div>
                      <input
                        type="range"
                        min={key === 'blur' || key === 'sharpen' ? 0 : -100}
                        max={key === 'blur' || key === 'sharpen' ? 10 : 100}
                        value={value}
                        onChange={(e) => handleFilterChange(key as keyof FilterOptions, Number(e.target.value))}
                        className="glass-glass-glass-w-full"
                      />
                    </div>
                  ))}
                  
                  <button
                    onClick={() => setFilters({ brightness: 0, contrast: 0, saturation: 0, hue: 0, blur: 0, sharpen: 0 })}
                    className="glass-glass-glass-w-full glass-glass-glass-py-2 glass-glass-glass-border glass-glass-glass-border-subtle glass-radius hover:glass-surface-subtle transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="glass-glass-glass-space-y-4">
                  <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-3">AI-Powered Features</h4>
                  
                  <div className="glass-glass-glass-space-y-3">
                    <button
                      onClick={handleAIEnhance}
                      disabled={isProcessing}
                      className="glass-glass-glass-w-full glass-glass-glass-py-3 glass-surface-primary glass-glass-glass-text-primary glass-radius hover:glass-surface-subtle disabled:opacity-50 transition-colors glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-gap-2"
                    >
                      <span>🤖</span>
                      AI Auto-Enhance
                    </button>
                    
                    <button
                      onClick={handleRemoveBackground}
                      disabled={isProcessing}
                      className="glass-glass-glass-w-full glass-glass-glass-py-3 glass-surface-green glass-glass-glass-text-primary glass-radius hover:glass-surface-green disabled:opacity-50 transition-colors glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-gap-2"
                    >
                      <span>✂️</span>
                      Remove Background
                    </button>
                    
                    <button
                      onClick={() => detectFaces(image.id)}
                      disabled={isProcessing}
                      className="glass-glass-glass-w-full glass-glass-glass-py-3 glass-surface-primary glass-glass-glass-text-primary glass-radius hover:glass-surface-subtle disabled:opacity-50 transition-colors glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-gap-2"
                    >
                      <span>👤</span>
                      Detect Faces
                    </button>
                    
                    <button
                      onClick={() => smartCrop(image.id, 1.0)}
                      disabled={isProcessing}
                      className="glass-glass-glass-w-full glass-glass-glass-py-3 bg-indigo-600 glass-glass-glass-text-primary glass-radius hover:bg-indigo-700 disabled:opacity-50 transition-colors glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-gap-2"
                    >
                      <span>🎯</span>
                      Smart Crop
                    </button>
                  </div>
                  
                  <div className="glass-surface-subtle glass-glass-glass-p-3 glass-radius-lg">
                    <h5 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-1">AI Insights</h5>
                    <p className="glass-glass-glass-text-sm glass-glass-glass-text-primary">
                      Dominant colors: {image.metadata.dominantColors.slice(0, 3).join(', ')}
                    </p>
                    <p className="glass-glass-glass-text-sm glass-glass-glass-text-primary">
                      Brightness: {Math.round(image.metadata.brightness)}% 
                      • Contrast: {Math.round(image.metadata.contrast)}%
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="glass-glass-glass-space-y-4">
                  <h4 className="glass-glass-glass-font-medium glass-glass-glass-mb-3">Templates</h4>
                  
                  <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-3">
                    {templates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateApply(template.id)}
                        disabled={isProcessing}
                        className="glass-glass-glass-p-3 glass-glass-glass-border glass-glass-glass-border-subtle glass-radius-lg hover:glass-glass-glass-border-blue hover:glass-surface-subtle transition-colors glass-glass-glass-text-left disabled:opacity-50"
                      >
                        <div className="glass-glass-glass-text-sm glass-glass-glass-font-medium">{template.name}</div>
                      <div className="glass-glass-glass-text-xs glass-text-secondary glass-mt-1">
                          {template.width} × {template.height}
                        </div>
                      <div className="glass-glass-glass-text-xs glass-glass-glass-text-primary glass-mt-1 glass-glass-glass-capitalize">
                          {template.category}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="glass-glass-glass-p-4 glass-glass-glass-border-t glass-glass-glass-border-subtle glass-glass-glass-flex glass-glass-glass-gap-2">
              <button
                onClick={onClose}
                className="glass-glass-glass-flex-1 glass-glass-glass-py-2 glass-glass-glass-border glass-glass-glass-border-subtle glass-radius hover:glass-surface-subtle transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(image)}
                className="glass-glass-glass-flex-1 glass-glass-glass-py-2 glass-surface-blue glass-glass-glass-text-primary glass-radius hover:glass-surface-blue transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Glass>
    </div>
  );
};

export const GlassIntelligentImageUploader: React.FC<IntelligentImageUploaderProps> = ({
  className,
  maxFiles = 10,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  maxFileSize = 10, // MB
  showEditor = true,
  showOptimization = true,
  showTemplates = true,
  showAIFeatures = true,
  onImagesUploaded,
  onImageEdited
}) => {
  const {
    images,
    addImages,
    removeImage,
    uploadProgresses,
    clearProgress,
    getOptimizationStats,
    autoOptimize
  } = useImageProcessing();

  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [showStats, setShowStats] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFiles(files);
    }
  }, []);

  const handleFiles = useCallback(async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      if (!acceptedFormats.includes(file.type)) {
        console.warn(`File ${file.name} has unsupported format`);
        return false;
      }
      if (file.size > maxFileSize * 1024 * 1024) {
        console.warn(`File ${file.name} exceeds size limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const filesToProcess = validFiles.slice(0, maxFiles - images.length);
    const fileList = new DataTransfer();
    filesToProcess.forEach(file => fileList.items.add(file));

    try {
      const uploadedImages = await addImages(fileList.files);
      onImagesUploaded?.(uploadedImages);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, [acceptedFormats, maxFileSize, maxFiles, images.length, addImages, onImagesUploaded]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const optimizationStats = getOptimizationStats();

  return (
    <Glass className={cn("p-6", className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
          <div>
            <h2 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-text-secondary">
              🤖 Intelligent Image Uploader
            </h2>
            <p className="glass-text-secondary glass-mt-1">
              AI-powered image optimization and editing
            </p>
          </div>
          
          {showOptimization && (
            <button
              onClick={() => setShowStats(!showStats)}
              className="glass-glass-glass-px-4 glass-glass-glass-py-2 glass-surface-subtle glass-glass-glass-text-primary glass-radius-lg hover:glass-surface-subtle transition-colors"
            >
              📊 Stats
            </button>
          )}
        </div>

        {/* Stats Panel */}
        {showStats && showOptimization && (
          <div className="glass-surface-subtle glass-glass-glass-border glass-glass-glass-border-green-200 glass-radius-lg glass-glass-glass-p-4">
            <h3 className="glass-glass-glass-font-medium glass-glass-glass-text-primary glass-glass-glass-mb-3">Optimization Statistics</h3>
            <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-2 md:glass-glass-glass-glass-glass-grid-cols-4 glass-glass-glass-gap-4 glass-glass-glass-text-sm">
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-2xl glass-glass-glass-font-bold glass-glass-glass-text-primary">
                  {optimizationStats.totalSaved}KB
                </div>
                <div className="glass-glass-glass-text-primary">Total Saved</div>
              </div>
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-2xl glass-glass-glass-font-bold glass-glass-glass-text-primary">
                  {optimizationStats.averageReduction}%
                </div>
                <div className="glass-glass-glass-text-primary">Avg. Reduction</div>
              </div>
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-2xl glass-glass-glass-font-bold glass-glass-glass-text-primary">
                  {optimizationStats.imagesProcessed}
                </div>
                <div className="glass-glass-glass-text-primary">Images Processed</div>
              </div>
              <div className="glass-glass-glass-text-center">
                <div className="glass-glass-glass-text-2xl glass-glass-glass-font-bold glass-glass-glass-text-primary">
                  {optimizationStats.mostUsedFormat}
                </div>
                <div className="glass-glass-glass-text-primary">Most Used Format</div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-12 text-center transition-colors",
            dragActive 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-300 hover:border-gray-400"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="glass-glass-glass-space-y-4">
            <div className="glass-glass-glass-text-6xl">📸</div>
            <div>
              <h3 className="glass-glass-glass-text-lg glass-glass-glass-font-medium glass-text-secondary">
                Drop images here or click to upload
              </h3>
              <p className="glass-text-secondary glass-mt-1">
                Supports JPEG, PNG, WebP, GIF up to {maxFileSize}MB each
              </p>
            </div>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="glass-glass-glass-px-6 glass-glass-glass-py-3 glass-surface-blue glass-glass-glass-text-primary glass-radius-lg hover:glass-surface-blue transition-colors"
            >
              Choose Files
            </button>
            
            {autoOptimize && (
              <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-gap-2 glass-glass-glass-text-sm glass-glass-glass-text-primary">
                <span>✅</span>
                <span>Auto-optimization enabled</span>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFormats.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Upload Progress */}
        {uploadProgresses.length > 0 && (
          <div className="glass-glass-glass-space-y-3">
            <h3 className="glass-glass-glass-font-medium glass-text-secondary">Processing Images</h3>
            {uploadProgresses.map(progress => (
              <div key={progress.imageId} className="glass-glass-glass-space-y-2">
                <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-text-sm">
                  <span>{progress.message || 'Processing...'}</span>
                  <span>{progress.progress}%</span>
                </div>
                <div className="glass-glass-glass-w-full glass-surface-subtle glass-radius-full glass-glass-glass-h-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all",
                      progress.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    )}
                    ref={(el)=>{ if(el) el.style.width = `${progress.progress}%`; }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className="glass-glass-glass-space-y-4">
            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
              <h3 className="glass-glass-glass-font-medium glass-text-secondary">
                Uploaded Images ({images.length})
              </h3>
              {images.length > 1 && (
                <div className="glass-glass-glass-flex glass-glass-glass-gap-2">
                  <button className="glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-sm glass-surface-subtle glass-glass-glass-text-primary glass-radius hover:glass-surface-subtle transition-colors">
                    Batch Optimize
                  </button>
                  <button className="glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-sm glass-surface-subtle glass-glass-glass-text-primary glass-radius hover:glass-surface-subtle transition-colors">
                    Batch Download
                  </button>
                </div>
              )}
            </div>
            
            <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-2 md:glass-glass-glass-glass-glass-grid-cols-3 lg:glass-glass-glass-glass-glass-grid-cols-4 glass-glass-glass-gap-4">
              {images.map(image => (
                <div key={image.id} className="group glass-glass-glass-relative">
                  <div className="aspect-square glass-surface-subtle glass-radius-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="glass-glass-glass-w-full glass-glass-glass-h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="glass-glass-glass-absolute glass-glass-glass-inset-0 glass-surface-dark bg-opacity-0 group-hover:glass-opacity-50 transition-opacity glass-radius-lg glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity glass-glass-glass-flex glass-glass-glass-gap-2">
                      {showEditor && (
                        <button
                          onClick={() => setSelectedImage(image)}
                          className="glass-glass-glass-p-2 glass-surface-subtle glass-radius-full glass-text-secondary hover:glass-glass-glass-text-primary transition-colors"
                          title="Edit Image"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={() => removeImage(image.id)}
                        className="glass-glass-glass-p-2 glass-surface-subtle glass-radius-full glass-text-secondary hover:glass-glass-glass-text-primary transition-colors"
                        title="Remove Image"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="mt-2 glass-glass-glass-text-xs glass-text-secondary">
                    <div className="glass-glass-glass-truncate glass-glass-glass-font-medium">{image.name}</div>
                    <div>{image.width} × {image.height} • {(image.size / 1024).toFixed(1)}KB</div>
                    {image.optimizedAt && (
                      <div className="glass-glass-glass-text-primary">✅ Optimized</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        {showAIFeatures && (
          <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-1 md:glass-glass-glass-glass-glass-grid-cols-3 glass-glass-glass-gap-4">
            <div className="glass-glass-glass-text-center glass-glass-glass-p-4 glass-surface-subtle glass-radius-lg">
              <div className="glass-glass-glass-text-2xl glass-glass-glass-mb-2">🤖</div>
              <h3 className="glass-glass-glass-font-medium glass-glass-glass-text-primary">AI Enhancement</h3>
              <p className="glass-glass-glass-text-sm glass-glass-glass-text-primary glass-mt-1">
                Automatic brightness, contrast, and sharpness optimization
              </p>
            </div>
            <div className="glass-glass-glass-text-center glass-glass-glass-p-4 glass-surface-subtle glass-radius-lg">
              <div className="glass-glass-glass-text-2xl glass-glass-glass-mb-2">✂️</div>
              <h3 className="glass-glass-glass-font-medium glass-glass-glass-text-primary">Smart Tools</h3>
              <p className="glass-glass-glass-text-sm glass-glass-glass-text-primary glass-mt-1">
                Background removal, face detection, and smart cropping
              </p>
            </div>
            <div className="glass-glass-glass-text-center glass-glass-glass-p-4 glass-surface-subtle glass-radius-lg">
              <div className="glass-glass-glass-text-2xl glass-glass-glass-mb-2">⚡</div>
              <h3 className="glass-glass-glass-font-medium glass-glass-glass-text-primary">Optimization</h3>
              <p className="glass-glass-glass-text-sm glass-glass-glass-text-primary glass-mt-1">
                Reduce file sizes by up to 80% while maintaining quality
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image Editor Modal */}
      {selectedImage && showEditor && (
        <ImageEditor
          image={selectedImage}
          onSave={(editedImage) => {
            onImageEdited?.(editedImage);
            setSelectedImage(null);
          }}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </Glass>
  );
};
