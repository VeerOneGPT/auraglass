'use client'

import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { OptimizedGlass } from '../../primitives'
import { useA11yId } from '../../utils/a11y'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import { createGlassStyle } from '../../utils/createGlassStyle'

export interface WaveEquation {
  id: string
  name: string
  type: 'sine' | 'cosine' | 'gaussian' | 'complex' | 'standing' | 'traveling'
  amplitude: number
  frequency: number
  phase: number
  wavelength: number
  velocity: number
  damping?: number
  color: string
}

export interface GlassWaveFunctionProps {
  width?: number
  height?: number
  waveEquations: WaveEquation[]
  showInterference?: boolean
  showPhaseSpace?: boolean
  showAmplitude?: boolean
  showFrequencySpectrum?: boolean
  animationSpeed?: number
  resolution?: number
  timeScale?: number
  showGrid?: boolean
  showLabels?: boolean
  realTimeMode?: boolean
  onWaveInteraction?: (waveId: string, position: { x: number; y: number }) => void
  className?: string
}

const waveTypes = {
  sine: (x: number, t: number, amplitude: number, frequency: number, phase: number, k: number, velocity: number) =>
    amplitude * Math.sin(k * x - 2 * Math.PI * frequency * t + phase),
  
  cosine: (x: number, t: number, amplitude: number, frequency: number, phase: number, k: number, velocity: number) =>
    amplitude * Math.cos(k * x - 2 * Math.PI * frequency * t + phase),
  
  gaussian: (x: number, t: number, amplitude: number, frequency: number, phase: number, k: number, velocity: number) =>
    amplitude * Math.exp(-Math.pow(x - velocity * t, 2) / 20) * Math.sin(k * x - 2 * Math.PI * frequency * t + phase),
  
  complex: (x: number, t: number, amplitude: number, frequency: number, phase: number, k: number, velocity: number) => {
    const real = amplitude * Math.cos(k * x - 2 * Math.PI * frequency * t + phase)
    const imag = amplitude * Math.sin(k * x - 2 * Math.PI * frequency * t + phase)
    return Math.sqrt(real * real + imag * imag)
  },
  
  standing: (x: number, t: number, amplitude: number, frequency: number, phase: number, k: number, velocity: number) =>
    amplitude * Math.sin(k * x + phase) * Math.cos(2 * Math.PI * frequency * t),
  
  traveling: (x: number, t: number, amplitude: number, frequency: number, phase: number, k: number, velocity: number) =>
    amplitude * Math.sin(k * x - 2 * Math.PI * frequency * t + phase)
}

export const GlassWaveFunction = forwardRef<HTMLDivElement, GlassWaveFunctionProps>(
  ({
    width = 800,
    height = 400,
    waveEquations,
    showInterference = true,
    showPhaseSpace = false,
    showAmplitude = true,
    showFrequencySpectrum = false,
    animationSpeed = 1,
    resolution = 2,
    timeScale = 1,
    showGrid = true,
    showLabels = true,
    realTimeMode = true,
    onWaveInteraction,
    className = '',
    ...props
  }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const phaseCanvasRef = useRef<HTMLCanvasElement>(null)
    const spectrumCanvasRef = useRef<HTMLCanvasElement>(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [selectedWave, setSelectedWave] = useState<string | null>(null)
    const [waveData, setWaveData] = useState<Record<string, number[]>>({})
    const id = useA11yId('glass-wave-function')
    const { shouldAnimate } = useMotionPreference()

    // Time evolution
    useEffect(() => {
      if (!realTimeMode) return

      const interval = setInterval(() => {
        setCurrentTime(prev => prev + 0.1 * animationSpeed * timeScale)
      }, 16)
      return () => clearInterval(interval)
    }, [realTimeMode, animationSpeed, timeScale])

    // Generate wave data
    const calculateWaves = useMemo(() => {
      const points = Math.floor(width / resolution)
      const newWaveData: Record<string, number[]> = {}
      
      waveEquations.forEach(wave => {
        const k = 2 * Math.PI / wave.wavelength
        const data: number[] = []
        
        for (let i = 0; i < points; i++) {
          const x = (i / points) * width - width / 2 // Center the wave
          const waveFunc = waveTypes[wave.type]
          let y = waveFunc(x, currentTime, wave.amplitude, wave.frequency, wave.phase, k, wave.velocity)
          
          // Apply damping if present
          if (wave.damping && wave.damping > 0) {
            y *= Math.exp(-wave.damping * Math.abs(x))
          }
          
          data.push(y)
        }
        
        newWaveData[wave.id] = data
      })
      
      setWaveData(newWaveData)
      return newWaveData
    }, [waveEquations, currentTime, width, resolution])

    // Main canvas rendering
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, width, height)

      // Grid
      if (showGrid) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.lineWidth = 1
        
        // Horizontal grid lines
        for (let y = 0; y <= height; y += 40) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }
        
        // Vertical grid lines
        for (let x = 0; x <= width; x += 40) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }
        
        // Center line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
      }

      // Draw individual waves
      Object.entries(waveData).forEach(([waveId, data]) => {
        const wave = waveEquations.find(w => w.id === waveId)
        if (!wave) return

        ctx.strokeStyle = wave.color
        ctx.lineWidth = selectedWave === waveId ? 3 : 2
        ctx.globalAlpha = selectedWave && selectedWave !== waveId ? 0.3 : 0.8
        
        ctx.beginPath()
        data.forEach((y, i) => {
          const x = (i / data.length) * width
          const canvasY = height / 2 - y * (height / 4) // Scale and center
          
          if (i === 0) {
            ctx.moveTo(x, canvasY)
          } else {
            ctx.lineTo(x, canvasY)
          }
        })
        ctx.stroke()

        // Wave labels
        if (showLabels) {
          ctx.fillStyle = wave.color
          ctx.font = '12px Arial'
          ctx.globalAlpha = 1
          ctx.fillText(wave.name, 10, 20 + Object.keys(waveData).indexOf(waveId) * 20)
        }
      })

      // Interference pattern
      if (showInterference && waveEquations.length > 1) {
        const interferenceData: number[] = []
        const dataLength = Math.min(...Object.values(waveData).map(d => d.length))
        
        for (let i = 0; i < dataLength; i++) {
          const sum = Object.values(waveData).reduce((total, data) => total + (data[i] || 0), 0)
          interferenceData.push(sum)
        }
        
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.9
        ctx.setLineDash([5, 5])
        
        ctx.beginPath()
        interferenceData.forEach((y, i) => {
          const x = (i / interferenceData.length) * width
          const canvasY = height / 2 - y * (height / 4)
          
          if (i === 0) {
            ctx.moveTo(x, canvasY)
          } else {
            ctx.lineTo(x, canvasY)
          }
        })
        ctx.stroke()
        ctx.setLineDash([])
      }

      ctx.globalAlpha = 1
    }, [waveData, waveEquations, width, height, showGrid, showLabels, showInterference, selectedWave])

    // Phase space visualization
    useEffect(() => {
      if (!showPhaseSpace) return
      
      const canvas = phaseCanvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const phaseWidth = 200
      const phaseHeight = 200
      
      ctx.clearRect(0, 0, phaseWidth, phaseHeight)
      
      // Grid for phase space
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      
      for (let i = 0; i <= 10; i++) {
        const x = (i / 10) * phaseWidth
        const y = (i / 10) * phaseHeight
        
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, phaseHeight)
        ctx.moveTo(0, y)
        ctx.lineTo(phaseWidth, y)
        ctx.stroke()
      }

      // Draw phase trajectories
      waveEquations.forEach((wave, index) => {
        const data = waveData[wave.id]
        if (!data) return

        ctx.strokeStyle = wave.color
        ctx.lineWidth = 2
        ctx.globalAlpha = 0.7

        ctx.beginPath()
        data.forEach((amplitude, i) => {
          if (i === 0) return
          
          const prevAmplitude = data[i - 1]
          const velocity = amplitude - prevAmplitude // Approximate velocity
          
          const x = (amplitude + 2) / 4 * phaseWidth // Normalize to canvas
          const y = phaseHeight - (velocity + 2) / 4 * phaseHeight
          
          if (i === 1) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        ctx.stroke()
      })

      ctx.globalAlpha = 1
    }, [showPhaseSpace, waveData, waveEquations])

    // Frequency spectrum
    useEffect(() => {
      if (!showFrequencySpectrum) return
      
      const canvas = spectrumCanvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const spectrumWidth = 300
      const spectrumHeight = 150
      
      ctx.clearRect(0, 0, spectrumWidth, spectrumHeight)
      
      // Draw frequency bars
      waveEquations.forEach((wave, index) => {
        const barWidth = spectrumWidth / waveEquations.length
        const barHeight = (wave.amplitude / 2) * spectrumHeight
        const x = index * barWidth
        const y = spectrumHeight - barHeight

        ctx.fillStyle = wave.color
        ctx.globalAlpha = 0.7
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight)

        // Frequency label
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '10px Arial'
        ctx.globalAlpha = 1
        ctx.fillText(`${wave.frequency.toFixed(1)}Hz`, x + 5, spectrumHeight - 5)
      })
    }, [showFrequencySpectrum, waveEquations])

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Find closest wave
      let closestWave: string | null = null
      let minDistance = Infinity

      Object.entries(waveData).forEach(([waveId, data]) => {
        const dataIndex = Math.floor((x / width) * data.length)
        const waveY = height / 2 - data[dataIndex] * (height / 4)
        const distance = Math.abs(y - waveY)
        
        if (distance < minDistance && distance < 30) {
          minDistance = distance
          closestWave = waveId
        }
      })

      if (closestWave) {
        setSelectedWave(prev => prev === closestWave ? null : closestWave)
        onWaveInteraction?.(closestWave, { x, y })
      }
    }

    return (
      <OptimizedGlass
        ref={ref}
        variant="frosted"
        className={`p-4 space-y-4 ${className}`}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white/90">
              Wave Function Visualization
            </h3>
            <p className="text-sm text-white/60">
              {waveEquations.length} wave{waveEquations.length !== 1 ? 's' : ''}
              {selectedWave && ` • Selected: ${waveEquations.find(w => w.id === selectedWave)?.name}`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {realTimeMode && (
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs">Live</span>
              </div>
            )}
            <div className="text-sm text-white/60">
              t = {currentTime.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Main wave canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="border border-white/20 rounded-lg bg-black/20 cursor-crosshair"
            onClick={handleCanvasClick}
          />
          
          {/* Amplitude indicators */}
          {showAmplitude && (
            <div className="absolute left-2 top-2 space-y-1">
              <div className="text-xs text-white/60">Amplitude</div>
              <div className="text-xs text-green-400">+2</div>
              <div className="text-xs text-white/40" style={{ marginTop: height/4 - 20 }}>0</div>
              <div className="text-xs text-red-400" style={{ marginTop: height/2 - 40 }}>-2</div>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          {/* Phase space */}
          {showPhaseSpace && (
            <div>
              <h4 className="text-sm font-medium text-white/80 mb-2">Phase Space</h4>
              <canvas
                ref={phaseCanvasRef}
                width={200}
                height={200}
                className="border border-white/20 rounded bg-black/20"
              />
              <div className="text-xs text-white/50 mt-1">Position vs Velocity</div>
            </div>
          )}

          {/* Frequency spectrum */}
          {showFrequencySpectrum && (
            <div>
              <h4 className="text-sm font-medium text-white/80 mb-2">Frequency Spectrum</h4>
              <canvas
                ref={spectrumCanvasRef}
                width={300}
                height={150}
                className="border border-white/20 rounded bg-black/20"
              />
            </div>
          )}
        </div>

        {/* Wave parameters */}
        <div className={`
          p-3 rounded-lg border border-white/10 space-y-3
          ${createGlassStyle({ blur: 'sm', opacity: 0.6 }).background}
        `}>
          <h4 className="text-sm font-semibold text-white/90">Wave Parameters</h4>
          
          <div className="grid gap-2">
            {waveEquations.map(wave => (
              <motion.div
                key={wave.id}
                className={`
                  p-2 rounded border transition-colors duration-200 cursor-pointer
                  ${selectedWave === wave.id 
                    ? 'border-white/40 bg-white/10' 
                    : 'border-white/20 hover:border-white/30'
                  }
                `}
                onClick={() => setSelectedWave(prev => prev === wave.id ? null : wave.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: wave.color }}
                    />
                    <span className="text-sm font-medium text-white/90">
                      {wave.name}
                    </span>
                    <span className="text-xs text-white/50 capitalize">
                      ({wave.type})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-white/70">
                    <span>A: {wave.amplitude.toFixed(1)}</span>
                    <span>f: {wave.frequency.toFixed(1)}Hz</span>
                    <span>λ: {wave.wavelength.toFixed(0)}</span>
                    <span>v: {wave.velocity.toFixed(0)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>Click waves to select • Time: {timeScale}x speed</span>
          <div className="flex items-center space-x-4">
            <span>Resolution: {resolution}px</span>
            <span>Animation: {animationSpeed}x</span>
          </div>
        </div>
      </OptimizedGlass>
    )
  }
)