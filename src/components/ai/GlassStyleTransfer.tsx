'use client'
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion'
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import { OptimizedGlass } from '../../primitives'
import { useA11yId } from '../../utils/a11y'
import { createGlassStyle } from '../../utils/createGlassStyle'
import { useGlassSound } from '../../utils/soundDesign'

export interface StyleModel {
  id: string
  name: string
  description: string
  previewUrl: string
  strength: number
  category: 'artistic' | 'photographic' | 'abstract' | 'vintage' | 'modern'
}

export interface GlassStyleTransferProps {
  sourceImage?: string
  styleModels?: StyleModel[]
  selectedStyle?: string
  transferStrength?: number
  realTimePreview?: boolean
  showProgressIndicator?: boolean
  showStyleLibrary?: boolean
  showAdvancedControls?: boolean
  preserveColors?: boolean
  enhanceDetails?: boolean
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light'
  resolution?: 'low' | 'medium' | 'high' | 'ultra'
  onStyleSelect?: (styleId: string) => void
  onTransferComplete?: (result: string) => void
  onProgressUpdate?: (progress: number) => void
  className?: string
}

const defaultStyleModels: StyleModel[] = [
  {
    id: 'van-gogh',
    name: 'Van Gogh Starry Night',
    description: 'Impressionistic swirls and bold brushstrokes',
    previewUrl: '/styles/van-gogh.jpg',
    strength: 0.8,
    category: 'artistic'
  },
  {
    id: 'picasso',
    name: 'Picasso Cubism',
    description: 'Geometric fragmentation and multiple perspectives',
    previewUrl: '/styles/picasso.jpg',
    strength: 0.7,
    category: 'artistic'
  },
  {
    id: 'monet',
    name: 'Monet Water Lilies',
    description: 'Soft impressionistic light and color',
    previewUrl: '/styles/monet.jpg',
    strength: 0.6,
    category: 'artistic'
  },
  {
    id: 'film-noir',
    name: 'Film Noir',
    description: 'High contrast black and white cinematography',
    previewUrl: '/styles/film-noir.jpg',
    strength: 0.9,
    category: 'photographic'
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    description: 'Retro-futuristic neon aesthetics',
    previewUrl: '/styles/synthwave.jpg',
    strength: 0.8,
    category: 'modern'
  },
  {
    id: 'kandinsky',
    name: 'Kandinsky Abstract',
    description: 'Geometric abstraction with vibrant colors',
    previewUrl: '/styles/kandinsky.jpg',
    strength: 0.7,
    category: 'abstract'
  }
]

export const GlassStyleTransfer = forwardRef<HTMLDivElement, GlassStyleTransferProps>(
  ({
    sourceImage,
    styleModels = defaultStyleModels,
    selectedStyle = '',
    transferStrength = 0.7,
    realTimePreview = true,
    showProgressIndicator = true,
    showStyleLibrary = true,
    showAdvancedControls = true,
    preserveColors = false,
    enhanceDetails = true,
    blendMode = 'normal',
    resolution = 'medium',
    onStyleSelect,
    onTransferComplete,
    onProgressUpdate,
    className = '',
    ...props
  }, ref) => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [uploadedImage, setUploadedImage] = useState<string>(sourceImage || '')
    const [selectedStyleId, setSelectedStyleId] = useState(selectedStyle)
    const [transferParams, setTransferParams] = useState({
      strength: transferStrength,
      preserveColors,
      enhanceDetails,
      blendMode,
      resolution
    })
    
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const id = useA11yId('glass-style-transfer')
    const { shouldAnimate } = useMotionPreference()
    const { play } = useGlassSound()

    // Simulate style transfer processing
    const processStyleTransfer = useCallback(async (imageData: string, styleId: string) => {
      if (!imageData || !styleId) return

      setIsProcessing(true)
      setProgress(0)
      play('processing')

      // Simulate processing with progress updates
      const steps = [
        { label: 'Loading models...', duration: 500 },
        { label: 'Analyzing content...', duration: 800 },
        { label: 'Extracting style features...', duration: 1000 },
        { label: 'Applying style transfer...', duration: 1500 },
        { label: 'Optimizing result...', duration: 700 },
        { label: 'Finalizing...', duration: 400 }
      ]

      let totalProgress = 0
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        await new Promise(resolve => setTimeout(resolve, step.duration))
        totalProgress = ((i + 1) / steps.length) * 100
        setProgress(totalProgress)
        onProgressUpdate?.(totalProgress)
      }

      // Simulate result generation
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // Create a stylized version using advanced canvas rendering
          const selectedStyleModel = styleModels.find(s => s.id === styleId)
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          
          // Apply different effects based on style category
          switch (selectedStyleModel?.category) {
            case 'artistic':
              gradient.addColorStop(0, '#FF6B6B')
              gradient.addColorStop(0.5, '#4ECDC4')
              gradient.addColorStop(1, '#45B7D1')
              break
            case 'photographic':
              gradient.addColorStop(0, '#2D3748')
              gradient.addColorStop(0.5, '#4A5568')
              gradient.addColorStop(1, '#718096')
              break
            case 'abstract':
              gradient.addColorStop(0, '#9F7AEA')
              gradient.addColorStop(0.5, '#F093FB')
              gradient.addColorStop(1, '#F9844A')
              break
            default:
              gradient.addColorStop(0, '#667EEA')
              gradient.addColorStop(1, '#764BA2')
          }
          
          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          
          // Add style-specific effects
          if (selectedStyleModel?.category === 'artistic') {
            // Add brush stroke effect
            for (let i = 0; i < 50; i++) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`
              ctx.lineWidth = Math.random() * 3 + 1
              ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
              ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
              ctx.stroke()
            }
          }
          
          const resultUrl = canvas.toDataURL()
          setPreviewImage(resultUrl)
          onTransferComplete?.(resultUrl)
        }
      }

      setIsProcessing(false)
      play('success')
    }, [styleModels, onProgressUpdate, onTransferComplete, play])

    // Handle file upload
    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImage(result)
        if (realTimePreview && selectedStyleId) {
          processStyleTransfer(result, selectedStyleId)
        }
      }
      reader.readAsDataURL(file)
    }, [realTimePreview, selectedStyleId, processStyleTransfer])

    // Handle style selection
    const handleStyleSelect = useCallback((styleId: string) => {
      setSelectedStyleId(styleId)
      onStyleSelect?.(styleId)
      play('select')
      
      if (realTimePreview && uploadedImage) {
        processStyleTransfer(uploadedImage, styleId)
      }
    }, [realTimePreview, uploadedImage, processStyleTransfer, onStyleSelect, play])

    // Real-time parameter updates
    useEffect(() => {
      if (realTimePreview && uploadedImage && selectedStyleId) {
        const debounceTimer = setTimeout(() => {
          processStyleTransfer(uploadedImage, selectedStyleId)
        }, 500)
        return () => clearTimeout(debounceTimer)
      }
    }, [transferParams, realTimePreview, uploadedImage, selectedStyleId, processStyleTransfer])

    const StyleLibrary = () => (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white/80">Style Library</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {styleModels.map((style) => (
            <motion.div
              key={style.id}
              className={`
                relative p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${selectedStyleId === style.id 
                  ? 'border-blue-400 bg-blue-400/20' 
                  : 'border-white/20 hover:border-white/40 bg-white/5'
                }
              `}
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
              onClick={() => handleStyleSelect(style.id)}
            >
              <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg mb-2 overflow-hidden">
                <div className={`
                  w-full h-full bg-gradient-to-br 
                  ${style.category === 'artistic' ? 'from-red-400 to-blue-400' :
                    style.category === 'photographic' ? 'from-gray-600 to-gray-800' :
                    style.category === 'abstract' ? 'from-purple-400 to-pink-400' :
                    style.category === 'vintage' ? 'from-yellow-600 to-orange-800' :
                    'from-blue-400 to-purple-600'
                  }
                `} />
              </div>
              
              <div className="text-xs text-white/90 font-medium mb-1">
                {style.name}
              </div>
              <div className="text-xs text-white/60">
                {style.description}
              </div>
              
              <div className="absolute top-2 right-2">
                <div className={`
                  px-1.5 py-0.5 rounded text-xs font-medium
                  ${style.category === 'artistic' ? 'bg-red-500/20 text-red-300' :
                    style.category === 'photographic' ? 'bg-gray-500/20 text-gray-300' :
                    style.category === 'abstract' ? 'bg-purple-500/20 text-purple-300' :
                    style.category === 'vintage' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-blue-500/20 text-blue-300'
                  }
                `}>
                  {style.category}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )

    const AdvancedControls = () => (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white/80">Advanced Controls</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/70 mb-2">
              Transfer Strength: {Math.round(transferParams.strength * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={transferParams.strength}
              onChange={(e) => setTransferParams(prev => ({ 
                ...prev, 
                strength: parseFloat(e.target.value) 
              }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-2">Resolution</label>
            <select
              value={transferParams.resolution}
              onChange={(e) => setTransferParams(prev => ({ 
                ...prev, 
                resolution: e.target.value as any 
              }))}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white/90 text-sm"
            >
              <option value="low">Low (512px)</option>
              <option value="medium">Medium (1024px)</option>
              <option value="high">High (2048px)</option>
              <option value="ultra">Ultra (4096px)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-2">Blend Mode</label>
            <select
              value={transferParams.blendMode}
              onChange={(e) => setTransferParams(prev => ({ 
                ...prev, 
                blendMode: e.target.value as any 
              }))}
              className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white/90 text-sm"
            >
              <option value="normal">Normal</option>
              <option value="multiply">Multiply</option>
              <option value="screen">Screen</option>
              <option value="overlay">Overlay</option>
              <option value="soft-light">Soft Light</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={transferParams.preserveColors}
              onChange={(e) => setTransferParams(prev => ({ 
                ...prev, 
                preserveColors: e.target.checked 
              }))}
              className="w-4 h-4 rounded border-white/30"
            />
            <span className="text-sm text-white/80">Preserve Colors</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={transferParams.enhanceDetails}
              onChange={(e) => setTransferParams(prev => ({ 
                ...prev, 
                enhanceDetails: e.target.checked 
              }))}
              className="w-4 h-4 rounded border-white/30"
            />
            <span className="text-sm text-white/80">Enhance Details</span>
          </label>
        </div>
      </div>
    )

    return (
      <OptimizedGlass
        ref={ref}
        variant="frosted"
        className={`p-6 space-y-6 ${className}`}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white/90">
              Style Transfer AI
            </h3>
            <p className="text-sm text-white/60">
              Transform your images with artistic styles
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {realTimePreview && (
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs">Real-time</span>
              </div>
            )}
          </div>
        </div>

        {/* Main interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source image */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/80">Source Image</h4>
            
            <div 
              className="relative aspect-square bg-white/5 border-2 border-dashed border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-white/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Source" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/50">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <p>Click to upload image</p>
                    <p className="text-xs mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white/80">Style Preview</h4>
              {isProcessing && showProgressIndicator && (
                <div className="flex items-center space-x-2 text-blue-400">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">{Math.round(progress)}%</span>
                </div>
              )}
            </div>
            
            <div className="relative aspect-square bg-white/5 border border-white/20 rounded-lg overflow-hidden">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Styled preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white/50">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <p>Style preview will appear here</p>
                  </div>
                </div>
              )}
              
              {/* Processing overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <div className="text-sm">Processing...</div>
                    <div className="text-xs mt-1">{Math.round(progress)}% complete</div>
                  </div>
                </div>
              )}
            </div>
            
            <canvas
              ref={canvasRef}
              width={512}
              height={512}
              className="hidden"
            />
          </div>
        </div>

        {/* Style library */}
        {showStyleLibrary && <StyleLibrary />}

        {/* Advanced controls */}
        {showAdvancedControls && <AdvancedControls />}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-4">
            <motion.button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
              onClick={() => uploadedImage && selectedStyleId && processStyleTransfer(uploadedImage, selectedStyleId)}
              disabled={isProcessing || !uploadedImage || !selectedStyleId}
            >
              {isProcessing ? 'Processing...' : 'Apply Style'}
            </motion.button>

            <motion.button
              className="px-4 py-2 border border-white/30 hover:border-white/50 text-white/80 rounded-lg text-sm transition-colors"
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
              onClick={() => {
                setPreviewImage('')
                setProgress(0)
              }}
            >
              Clear
            </motion.button>
          </div>

          {previewImage && (
            <motion.a
              href={previewImage}
              download="styled-image.png"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
            >
              Download Result
            </motion.a>
          )}
        </div>

        {/* Progress indicator */}
        {isProcessing && showProgressIndicator && (
          <div className={`
            p-3 rounded-lg border border-blue-400/30
            ${createGlassStyle({ blur: 'sm', opacity: 0.8 }).background}
          `}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Processing Style Transfer</span>
              <span className="text-sm font-medium text-blue-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-blue-400 h-2 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </OptimizedGlass>
    )
  }
)

GlassStyleTransfer.displayName = 'GlassStyleTransfer'