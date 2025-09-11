'use client'
import { cn } from '@/lib/utils';

import { motion } from 'framer-motion'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import { OptimizedGlass } from '../../primitives'
import { useA11yId } from '../../utils/a11y'
import { createGlassStyle } from '../../utils/createGlassStyle'
import { useGlassSound } from '../../utils/soundDesign'

export interface NeuralLayer {
  id: string
  name: string
  description: string
  type: 'conv' | 'pool' | 'dense' | 'inception' | 'residual'
  depth: number
  features: string[]
  strength: number
}

export interface DeepDreamSettings {
  layers: string[]
  iterations: number
  learningRate: number
  octaveScale: number
  octaves: number
  maxLoss: number
  stepSize: number
  tileSize: number
}

export interface GlassDeepDreamGlassProps {
  imageSource?: string
  availableLayers?: NeuralLayer[]
  selectedLayers?: string[]
  dreamSettings?: Partial<DeepDreamSettings>
  showLayerSelector?: boolean
  showPreview?: boolean
  showSettings?: boolean
  enableRealTime?: boolean
  enableAnimation?: boolean
  enableTiling?: boolean
  animationSpeed?: number
  canvasWidth?: number
  canvasHeight?: number
  onDreamGenerated?: (imageUrl: string, settings: DeepDreamSettings) => void
  onLayerActivation?: (layerId: string, activation: number[]) => void
  onProgress?: (progress: number, iteration: number) => void
  className?: string
}

const defaultNeuralLayers: NeuralLayer[] = [
  {
    id: 'conv2d_1',
    name: 'Early Features',
    description: 'Basic edges and textures',
    type: 'conv',
    depth: 1,
    features: ['edges', 'lines', 'basic_shapes'],
    strength: 0.5
  },
  {
    id: 'conv2d_5',
    name: 'Texture Patterns',
    description: 'Complex textures and patterns',
    type: 'conv',
    depth: 5,
    features: ['textures', 'patterns', 'repetition'],
    strength: 0.7
  },
  {
    id: 'mixed3a',
    name: 'Object Parts',
    description: 'Parts of objects and shapes',
    type: 'inception',
    depth: 10,
    features: ['object_parts', 'curves', 'complex_shapes'],
    strength: 1.0
  },
  {
    id: 'mixed4a',
    name: 'Abstract Objects',
    description: 'Abstract object representations',
    type: 'inception',
    depth: 15,
    features: ['abstract_objects', 'compositions', 'spatial_relations'],
    strength: 1.2
  },
  {
    id: 'mixed4d',
    name: 'Complex Structures',
    description: 'Complex architectural structures',
    type: 'inception',
    depth: 18,
    features: ['buildings', 'architecture', 'complex_structures'],
    strength: 1.5
  },
  {
    id: 'mixed5b',
    name: 'High-Level Concepts',
    description: 'Abstract concepts and scenes',
    type: 'inception',
    depth: 25,
    features: ['scenes', 'concepts', 'abstract_ideas'],
    strength: 2.0
  }
]

const defaultSettings: DeepDreamSettings = {
  layers: ['mixed3a'],
  iterations: 20,
  learningRate: 0.01,
  octaveScale: 1.4,
  octaves: 4,
  maxLoss: 10.0,
  stepSize: 1.5,
  tileSize: 512
}

export const GlassDeepDreamGlass = forwardRef<HTMLDivElement, GlassDeepDreamGlassProps>(
  ({
    imageSource,
    availableLayers = defaultNeuralLayers,
    selectedLayers = ['mixed3a'],
    dreamSettings = {},
    showLayerSelector = true,
    showPreview = true,
    showSettings = true,
    enableRealTime = false,
    enableAnimation = true,
    enableTiling = true,
    animationSpeed = 1.0,
    canvasWidth = 800,
    canvasHeight = 600,
    onDreamGenerated,
    onLayerActivation,
    onProgress,
    className = '',
    ...props
  }, ref) => {
    const [isGenerating, setIsGenerating] = useState(false)
    const [currentIteration, setCurrentIteration] = useState(0)
    const [progress, setProgress] = useState(0)
    const [originalImage, setOriginalImage] = useState<string>(imageSource || '')
    const [dreamedImage, setDreamedImage] = useState<string>('')
    const [layerActivations, setLayerActivations] = useState<{ [key: string]: number[] }>({})
    const [animationFrame, setAnimationFrame] = useState(0)
    const [enableTilingState, setEnableTilingState] = useState(enableTiling)
    const [enableAnimationState, setEnableAnimationState] = useState(enableAnimation)
    
    const [settings, setSettings] = useState<DeepDreamSettings>({
      ...defaultSettings,
      ...dreamSettings,
      layers: selectedLayers
    })
    
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const dreamCanvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()
    
    const id = useA11yId('glass-deep-dream')
    const { shouldAnimate } = useMotionPreference()
    const { play } = useGlassSound()

    // Simulate neural network layer activations
    const simulateLayerActivation = useCallback((layer: NeuralLayer, imageData: ImageData): number[] => {
      const { width, height } = imageData
      const activations: number[] = []
      
      // Simulate different layer types
      switch (layer.type) {
        case 'conv':
          // Convolutional layers detect local features
          for (let i = 0; i < 100; i++) {
            const x = Math.floor(Math.random() * width)
            const y = Math.floor(Math.random() * height)
            const pixelIndex = (y * width + x) * 4
            
            const r = imageData.data[pixelIndex]
            const g = imageData.data[pixelIndex + 1]
            const b = imageData.data[pixelIndex + 2]
            
            const activation = Math.tanh((r + g + b) / (255 * 3) - 0.5) * layer.strength
            activations.push(activation)
          }
          break
          
        case 'inception':
          // Inception layers detect complex patterns
          for (let i = 0; i < 50; i++) {
            const activation = (Math.random() - 0.5) * layer.strength * 2
            activations.push(Math.tanh(activation))
          }
          break
          
        default:
          // Default activation pattern
          for (let i = 0; i < 64; i++) {
            activations.push((Math.random() - 0.5) * layer.strength)
          }
      }
      
      return activations
    }, [])

    // Apply deep dream effect
    const applyDeepDream = useCallback((imageData: ImageData, layer: NeuralLayer, intensity: number): ImageData => {
      const data = new Uint8ClampedArray(imageData.data)
      const { width, height } = imageData
      
      // Generate dream patterns based on layer type
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4
          
          let r = data[index]
          let g = data[index + 1]
          let b = data[index + 2]
          
          // Apply different effects based on layer type
          switch (layer.type) {
            case 'conv':
              // Edge enhancement and texture amplification
              const edgeX = x / width - 0.5
              const edgeY = y / height - 0.5
              const edgeStrength = Math.sqrt(edgeX * edgeX + edgeY * edgeY)
              
              const enhancement = Math.sin(edgeStrength * 20) * intensity * layer.strength * 50
              r = Math.max(0, Math.min(255, r + enhancement))
              g = Math.max(0, Math.min(255, g + enhancement))
              b = Math.max(0, Math.min(255, b + enhancement))
              break
              
            case 'inception':
              // Complex pattern generation
              const spiralX = Math.cos((x + y) * 0.05) * Math.sin(x * 0.02)
              const spiralY = Math.sin((x + y) * 0.05) * Math.cos(y * 0.02)
              const spiralIntensity = (spiralX + spiralY) * intensity * layer.strength * 30
              
              r = Math.max(0, Math.min(255, r + spiralIntensity))
              g = Math.max(0, Math.min(255, g + spiralIntensity * 0.8))
              b = Math.max(0, Math.min(255, b + spiralIntensity * 0.6))
              break
              
            case 'dense':
              // Global feature amplification
              const globalPattern = Math.sin(x * 0.01) * Math.cos(y * 0.01)
              const amplification = globalPattern * intensity * layer.strength * 20
              
              r = Math.max(0, Math.min(255, r * (1 + amplification / 255)))
              g = Math.max(0, Math.min(255, g * (1 + amplification / 255)))
              b = Math.max(0, Math.min(255, b * (1 + amplification / 255)))
              break
              
            default:
              // Default pattern
              const wave = Math.sin(x * 0.03) * Math.cos(y * 0.03)
              const modification = wave * intensity * layer.strength * 15
              
              r = Math.max(0, Math.min(255, r + modification))
              g = Math.max(0, Math.min(255, g + modification))
              b = Math.max(0, Math.min(255, b + modification))
          }
          
          data[index] = r
          data[index + 1] = g
          data[index + 2] = b
        }
      }
      
      return new ImageData(data, width, height)
    }, [])

    // Generate deep dream
    const generateDeepDream = useCallback(async () => {
      if (!originalImage) return

      setIsGenerating(true)
      setCurrentIteration(0)
      setProgress(0)
      play('processing')

      const canvas = canvasRef.current
      const dreamCanvas = dreamCanvasRef.current
      
      if (!canvas || !dreamCanvas) return

      const ctx = canvas.getContext('2d')
      const dreamCtx = dreamCanvas.getContext('2d')
      
      if (!ctx || !dreamCtx) return

      // Load original image
      const img = new Image()
      img.onload = async () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        let currentImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        
        // Process through multiple octaves
        for (let octave = 0; octave < settings.octaves; octave++) {
          // Scale image for current octave
          const scale = Math.pow(settings.octaveScale, octave)
          const octaveWidth = Math.floor(canvas.width / scale)
          const octaveHeight = Math.floor(canvas.height / scale)
          
          // Process iterations for this octave
          for (let iteration = 0; iteration < Math.floor(settings.iterations / settings.octaves); iteration++) {
            const totalIteration = octave * Math.floor(settings.iterations / settings.octaves) + iteration
            setCurrentIteration(totalIteration)
            setProgress((totalIteration / settings.iterations) * 100)
            onProgress?.(progress, totalIteration)
            
            // Apply deep dream to selected layers
            for (const layerId of settings.layers) {
              const layer = availableLayers.find(l => l.id === layerId)
              if (layer) {
                // Simulate layer activation
                const activations = simulateLayerActivation(layer, currentImageData)
                setLayerActivations(prev => ({ ...prev, [layerId]: activations }))
                onLayerActivation?.(layerId, activations)
                
                // Apply dream effect
                const intensity = settings.learningRate * settings.stepSize
                currentImageData = applyDeepDream(currentImageData, layer, intensity)
              }
            }
            
            // Update dream canvas
            dreamCtx.putImageData(currentImageData, 0, 0)
            
            // Add delay for animation
            await new Promise(resolve => setTimeout(resolve, 100 / animationSpeed))
          }
        }
        
        const dreamUrl = dreamCanvas.toDataURL()
        setDreamedImage(dreamUrl)
        onDreamGenerated?.(dreamUrl, settings)
        
        setIsGenerating(false)
        play('success')
      }
      
      img.src = originalImage
    }, [originalImage, settings, availableLayers, simulateLayerActivation, applyDeepDream, animationSpeed, onProgress, onLayerActivation, onDreamGenerated, play, progress])

    // Animation loop
    const animateDeepDream = useCallback(() => {
      if (!enableAnimation || isGenerating) return

      setAnimationFrame(prev => prev + 1)
      
      const canvas = dreamCanvasRef.current
      if (canvas && dreamedImage) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          const img = new Image()
          img.onload = () => {
            // Create animated effect
            ctx.save()
            ctx.globalAlpha = 0.1
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(animationFrame * 0.01)
            ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2)
            ctx.restore()
          }
          img.src = dreamedImage
        }
      }

      animationRef.current = requestAnimationFrame(animateDeepDream)
    }, [enableAnimation, isGenerating, dreamedImage, animationFrame])

    // Handle layer selection
    const toggleLayer = useCallback((layerId: string) => {
      setSettings(prev => {
        const layers = prev.layers.includes(layerId)
          ? prev.layers.filter(id => id !== layerId)
          : [...prev.layers, layerId]
        return { ...prev, layers }
      })
      play('select')
    }, [play])

    // Initialize
    useEffect(() => {
      if (enableAnimation) {
        animateDeepDream()
      }
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [enableAnimation, animateDeepDream])

    useEffect(() => {
      if (enableRealTime && originalImage) {
        const debounceTimer = setTimeout(() => {
          generateDeepDream()
        }, 1000)
        return () => clearTimeout(debounceTimer)
      }
    }, [settings, enableRealTime, originalImage, generateDeepDream])

    const LayerSelector = () => (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white/80">Neural Layers</h4>
        
        <div className="space-y-2">
          {availableLayers.map((layer) => (
            <motion.div
              key={layer.id}
              className={`
                p-3 rounded-lg border cursor-pointer transition-all duration-200
                ${settings.layers.includes(layer.id)
                  ? 'border-blue-400 bg-blue-400/20'
                  : 'border-white/20 hover:border-white/40 bg-white/5'
                }
              `}
              whileHover={shouldAnimate ? { scale: 1.01 } : {}}
              whileTap={shouldAnimate ? { scale: 0.99 } : {}}
              onClick={() => toggleLayer(layer.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="text-sm font-medium text-white/90">{layer.name}</h5>
                    <span className={`
                      px-2 py-0.5 rounded text-xs font-medium
                      ${layer.type === 'conv' ? 'bg-green-500/20 text-green-300' :
                        layer.type === 'inception' ? 'bg-purple-500/20 text-purple-300' :
                        layer.type === 'dense' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-gray-500/20 text-gray-300'
                      }
                    `}>
                      {layer.type}
                    </span>
                  </div>
                  
                  <p className="text-xs text-white/60 mb-2">{layer.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-white/50">
                    <span>Depth: {layer.depth}</span>
                    <span>Strength: {layer.strength.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {layer.features.slice(0, 3).map(feature => (
                      <span
                        key={feature}
                        className="px-1.5 py-0.5 bg-white/10 text-white/60 rounded text-xs"
                      >
                        {feature.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                
                {settings.layers.includes(layer.id) && (
                  <div className="text-blue-400 ml-2">✓</div>
                )}
              </div>
              
              {/* Layer activation visualization */}
              {layerActivations[layer.id] && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <div className="flex items-center space-x-1">
                    {layerActivations[layer.id].slice(0, 20).map((activation, i) => (
                      <div
                        key={i}
                        className="w-1 bg-blue-400 rounded"
                        style={{ 
                          height: `${Math.abs(activation) * 10 + 2}px`,
                          opacity: Math.abs(activation)
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    )

    const SettingsPanel = () => (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-white/80">Dream Settings</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/70 mb-1">
              Iterations: {settings.iterations}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={settings.iterations}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                iterations: parseInt(e.target.value) 
              }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Learning Rate: {settings.learningRate.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={settings.learningRate}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                learningRate: parseFloat(e.target.value) 
              }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Octaves: {settings.octaves}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={settings.octaves}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                octaves: parseInt(e.target.value) 
              }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Octave Scale: {settings.octaveScale.toFixed(1)}
            </label>
            <input
              type="range"
              min="1.1"
              max="2.0"
              step="0.1"
              value={settings.octaveScale}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                octaveScale: parseFloat(e.target.value) 
              }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Step Size: {settings.stepSize.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={settings.stepSize}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                stepSize: parseFloat(e.target.value) 
              }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-1">
              Max Loss: {settings.maxLoss.toFixed(1)}
            </label>
            <input
              type="range"
              min="1.0"
              max="50.0"
              step="1.0"
              value={settings.maxLoss}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                maxLoss: parseFloat(e.target.value) 
              }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enableTilingState}
              onChange={(e) => setEnableTilingState(e.target.checked)}
              className="w-4 h-4 rounded border-white/30"
            />
            <span className="text-sm text-white/80">Enable Tiling</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={enableAnimationState}
              onChange={(e) => setEnableAnimationState(e.target.checked)}
              className="w-4 h-4 rounded border-white/30"
            />
            <span className="text-sm text-white/80">Animate Result</span>
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
              DeepDream Glass
            </h3>
            <p className="text-sm text-white/60">
              Neural network-powered surreal image generation
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {enableRealTime && (
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs">Real-time</span>
              </div>
            )}
            {isGenerating && (
              <div className="flex items-center space-x-1 text-blue-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Dreaming...</span>
              </div>
            )}
          </div>
        </div>

        {/* Preview area */}
        {showPreview && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Original */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">Original</h4>
              <div className="relative aspect-video bg-white/5 border border-white/20 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={canvasWidth}
                  height={canvasHeight}
                  className="w-full h-full object-cover"
                />
                {!originalImage && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p>No image loaded</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DeepDream result */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80">DeepDream</h4>
              <div className="relative aspect-video bg-white/5 border border-white/20 rounded-lg overflow-hidden">
                <canvas
                  ref={dreamCanvasRef}
                  width={canvasWidth}
                  height={canvasHeight}
                  className="w-full h-full object-cover"
                />
                {isGenerating && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <div className="text-sm">Iteration {currentIteration}</div>
                      <div className="text-xs mt-1">{Math.round(progress)}% complete</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Progress indicator */}
        {isGenerating && (
          <div className={`
            p-3 rounded-lg border border-blue-400/30
            ${createGlassStyle({ blur: 'sm', opacity: 0.8 }).background}
          `}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Generating Deep Dream...</span>
              <span className="text-sm font-medium text-blue-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-blue-400 h-2 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-white/60">
              <span>Iteration: {currentIteration} / {settings.iterations}</span>
              <span>Layers: {settings.layers.length}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Layer selector */}
          {showLayerSelector && <LayerSelector />}

          {/* Settings */}
          {showSettings && <SettingsPanel />}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const url = URL.createObjectURL(file)
                  setOriginalImage(url)
                  play('upload')
                  
                  // Load image to canvas
                  const canvas = canvasRef.current
                  if (canvas) {
                    const ctx = canvas.getContext('2d')
                    if (ctx) {
                      const img = new Image()
                      img.onload = () => {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                      }
                      img.src = url
                    }
                  }
                }
              }}
              className="hidden"
              id="dream-image-upload"
            />
            <motion.label
              htmlFor="dream-image-upload"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors"
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
            >
              Upload Image
            </motion.label>

            <motion.button
              className="px-4 py-2 border border-white/30 hover:border-white/50 text-white/80 rounded-lg text-sm transition-colors disabled:opacity-50"
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
              onClick={generateDeepDream}
              disabled={isGenerating || !originalImage || settings.layers.length === 0}
            >
              {isGenerating ? 'Generating...' : 'Generate Dream'}
            </motion.button>
          </div>

          {dreamedImage && (
            <motion.a
              href={dreamedImage}
              download="deep-dream.png"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
            >
              Download Dream
            </motion.a>
          )}
        </div>
      </OptimizedGlass>
    )
  }
)

GlassDeepDreamGlass.displayName = 'GlassDeepDreamGlass'