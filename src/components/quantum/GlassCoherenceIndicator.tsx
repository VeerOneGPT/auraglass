'use client'

import React, { forwardRef, useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { OptimizedGlass } from '../../primitives'
import { useA11yId } from '../../utils/a11y'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import { createGlassStyle } from '../../utils/createGlassStyle'

export interface CoherenceData {
  timestamp: number
  coherence: number
  phase: number
  amplitude: number
  frequency: number
  decoherenceRate: number
  entanglementStrength?: number
}

export interface GlassCoherenceIndicatorProps {
  coherenceLevel: number
  phase?: number
  decoherenceRate?: number
  entanglementStrength?: number
  historicalData?: CoherenceData[]
  showPhaseIndicator?: boolean
  showWaveVisualization?: boolean
  showDecoherenceRate?: boolean
  showEntanglement?: boolean
  realTimeMode?: boolean
  coherenceThreshold?: number
  alertOnDecoherence?: boolean
  animationSpeed?: number
  onCoherenceLoss?: (coherenceLevel: number) => void
  onPhaseChange?: (phase: number) => void
  className?: string
}

const phaseColors = {
  0: '#FF6B6B',      // 0°
  90: '#4ECDC4',     // 90°
  180: '#45B7D1',    // 180°
  270: '#96CEB4'     // 270°
}

const getPhaseColor = (phase: number): string => {
  const normalizedPhase = ((phase % (2 * Math.PI)) / (2 * Math.PI)) * 360
  
  if (normalizedPhase < 45 || normalizedPhase >= 315) return phaseColors[0]
  if (normalizedPhase < 135) return phaseColors[90]
  if (normalizedPhase < 225) return phaseColors[180]
  return phaseColors[270]
}

export const GlassCoherenceIndicator = forwardRef<HTMLDivElement, GlassCoherenceIndicatorProps>(
  ({
    coherenceLevel,
    phase = 0,
    decoherenceRate = 0.02,
    entanglementStrength = 0,
    historicalData = [],
    showPhaseIndicator = true,
    showWaveVisualization = true,
    showDecoherenceRate = true,
    showEntanglement = true,
    realTimeMode = false,
    coherenceThreshold = 0.3,
    alertOnDecoherence = true,
    animationSpeed = 1,
    onCoherenceLoss,
    onPhaseChange,
    className = '',
    ...props
  }, ref) => {
    const [currentCoherence, setCurrentCoherence] = useState(coherenceLevel)
    const [currentPhase, setCurrentPhase] = useState(phase)
    const [animationTime, setAnimationTime] = useState(0)
    const [isDecohering, setIsDecohering] = useState(false)
    const [coherenceHistory, setCoherenceHistory] = useState<CoherenceData[]>(historicalData)
    const id = useA11yId('glass-coherence-indicator')
    const { shouldAnimate } = useMotionPreference()

    // Real-time coherence simulation
    useEffect(() => {
      if (!realTimeMode) return

      const interval = setInterval(() => {
        setCurrentCoherence(prev => {
          const noise = (Math.random() - 0.5) * 0.1
          const decay = prev * (1 - decoherenceRate)
          const newCoherence = Math.max(0, Math.min(1, decay + noise))
          
          if (newCoherence < coherenceThreshold && prev >= coherenceThreshold) {
            setIsDecohering(true)
            if (alertOnDecoherence) {
              onCoherenceLoss?.(newCoherence)
            }
          } else if (newCoherence >= coherenceThreshold) {
            setIsDecohering(false)
          }
          
          return newCoherence
        })

        setCurrentPhase(prev => {
          const newPhase = (prev + 0.1 * animationSpeed) % (2 * Math.PI)
          onPhaseChange?.(newPhase)
          return newPhase
        })

        setAnimationTime(prev => prev + 0.1 * animationSpeed)
      }, 100)

      return () => clearInterval(interval)
    }, [realTimeMode, decoherenceRate, coherenceThreshold, alertOnDecoherence, animationSpeed, onCoherenceLoss, onPhaseChange])

    // Update historical data
    useEffect(() => {
      if (realTimeMode) {
        const newDataPoint: CoherenceData = {
          timestamp: Date.now(),
          coherence: currentCoherence,
          phase: currentPhase,
          amplitude: currentCoherence,
          frequency: 1.0,
          decoherenceRate,
          entanglementStrength
        }

        setCoherenceHistory(prev => 
          [...prev.slice(-49), newDataPoint] // Keep last 50 points
        )
      }
    }, [currentCoherence, currentPhase, realTimeMode, decoherenceRate, entanglementStrength])

    const coherenceStatus = useMemo(() => {
      if (currentCoherence >= 0.8) return { label: 'Highly Coherent', color: '#10B981' }
      if (currentCoherence >= 0.5) return { label: 'Moderately Coherent', color: '#F59E0B' }
      if (currentCoherence >= 0.2) return { label: 'Low Coherence', color: '#EF4444' }
      return { label: 'Decoherent', color: '#7F1D1D' }
    }, [currentCoherence])

    const WaveVisualization = () => {
      const points = 100
      const waveData = useMemo(() => {
        return Array.from({ length: points }, (_, i) => {
          const x = (i / points) * 4 * Math.PI
          const amplitude = currentCoherence
          const wave1 = amplitude * Math.sin(x + currentPhase)
          const wave2 = entanglementStrength * amplitude * Math.sin(x + currentPhase + Math.PI / 2)
          return {
            x: (i / points) * 300,
            y1: 50 + wave1 * 30,
            y2: 50 + wave2 * 20,
            combined: 50 + (wave1 + wave2 * 0.5) * 25
          }
        })
      }, [currentCoherence, currentPhase, entanglementStrength, points])

      return (
        <svg width="300" height="100" className="border border-white/20 rounded bg-black/20">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Center line */}
          <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="5,5"/>

          {/* Primary wave */}
          <path
            d={`M ${waveData.map(p => `${p.x} ${p.y1}`).join(' L ')}`}
            fill="none"
            stroke={getPhaseColor(currentPhase)}
            strokeWidth="2"
            opacity={currentCoherence}
          />

          {/* Entangled wave */}
          {entanglementStrength > 0 && (
            <path
              d={`M ${waveData.map(p => `${p.x} ${p.y2}`).join(' L ')}`}
              fill="none"
              stroke="#FF9FF3"
              strokeWidth="1.5"
              opacity={entanglementStrength * 0.8}
              strokeDasharray="3,3"
            />
          )}

          {/* Combined interference pattern */}
          {entanglementStrength > 0.3 && (
            <path
              d={`M ${waveData.map(p => `${p.x} ${p.combined}`).join(' L ')}`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity={0.6}
            />
          )}

          {/* Decoherence visualization */}
          {isDecohering && (
            <g opacity="0.7">
              {Array.from({ length: 20 }, (_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 300}
                  cy={Math.random() * 100}
                  r={Math.random() * 3 + 1}
                  fill="#EF4444"
                  opacity={Math.random() * 0.8}
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    dur={`${1 + Math.random()}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          )}
        </svg>
      )
    }

    const PhaseIndicator = () => (
      <div className="relative w-24 h-24">
        <svg width="96" height="96" className="absolute inset-0">
          {/* Outer circle */}
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          
          {/* Phase markers */}
          {[0, 90, 180, 270].map(angle => (
            <g key={angle}>
              <line
                x1={48 + Math.cos((angle * Math.PI) / 180) * 35}
                y1={48 + Math.sin((angle * Math.PI) / 180) * 35}
                x2={48 + Math.cos((angle * Math.PI) / 180) * 42}
                y2={48 + Math.sin((angle * Math.PI) / 180) * 42}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
              />
              <text
                x={48 + Math.cos((angle * Math.PI) / 180) * 30}
                y={48 + Math.sin((angle * Math.PI) / 180) * 30 + 3}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(255,255,255,0.7)"
              >
                {angle}°
              </text>
            </g>
          ))}

          {/* Phase vector */}
          <motion.line
            x1="48"
            y1="48"
            x2={48 + Math.cos(currentPhase - Math.PI / 2) * (30 * currentCoherence)}
            y2={48 + Math.sin(currentPhase - Math.PI / 2) * (30 * currentCoherence)}
            stroke={getPhaseColor(currentPhase)}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{
              x2: 48 + Math.cos(currentPhase - Math.PI / 2) * (30 * currentCoherence),
              y2: 48 + Math.sin(currentPhase - Math.PI / 2) * (30 * currentCoherence)
            }}
            transition={shouldAnimate ? { duration: 0.1 } : { duration: 0 }}
          />

          {/* Center dot */}
          <circle
            cx="48"
            cy="48"
            r="3"
            fill={getPhaseColor(currentPhase)}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xs text-white/90 font-medium">
              {((currentPhase * 180) / Math.PI).toFixed(0)}°
            </div>
          </div>
        </div>
      </div>
    )

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
              Quantum Coherence
            </h3>
            <p className="text-sm text-white/60">
              {coherenceStatus.label}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {isDecohering && alertOnDecoherence && (
              <motion.div
                className="flex items-center space-x-1 text-red-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span>⚠️</span>
                <span className="text-xs font-medium">Decoherence</span>
              </motion.div>
            )}
            
            {realTimeMode && (
              <div className="flex items-center space-x-1 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs">Live</span>
              </div>
            )}
          </div>
        </div>

        {/* Main coherence display */}
        <div className="flex items-center space-x-6">
          {/* Coherence level */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">Coherence Level</span>
              <span className="text-sm font-medium text-white/90">
                {(currentCoherence * 100).toFixed(1)}%
              </span>
            </div>
            
            <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${coherenceStatus.color} 0%, ${coherenceStatus.color}80 100%)`
                }}
                animate={{
                  width: `${currentCoherence * 100}%`
                }}
                transition={shouldAnimate ? { duration: 0.3 } : { duration: 0 }}
              />
              
              {/* Coherence threshold indicator */}
              <div
                className="absolute top-0 h-full w-0.5 bg-white/50"
                style={{ left: `${coherenceThreshold * 100}%` }}
              />
            </div>

            <div className="flex justify-between mt-1 text-xs text-white/50">
              <span>0%</span>
              <span>Threshold ({(coherenceThreshold * 100).toFixed(0)}%)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Phase indicator */}
          {showPhaseIndicator && <PhaseIndicator />}
        </div>

        {/* Wave visualization */}
        {showWaveVisualization && (
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-2">Wave Function</h4>
            <WaveVisualization />
          </div>
        )}

        {/* Statistics */}
        <div className={`
          p-3 rounded-lg border border-white/10 space-y-2
          ${createGlassStyle({ blur: 'sm', opacity: 0.6 }).background}
        `}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-white/60">Phase:</span>
              <div className="text-white/90 font-medium">
                {((currentPhase * 180) / Math.PI).toFixed(1)}°
              </div>
            </div>

            {showDecoherenceRate && (
              <div>
                <span className="text-white/60">Decoherence:</span>
                <div className="text-white/90 font-medium">
                  {(decoherenceRate * 100).toFixed(2)}%/s
                </div>
              </div>
            )}

            {showEntanglement && entanglementStrength > 0 && (
              <div>
                <span className="text-white/60">Entanglement:</span>
                <div className="text-white/90 font-medium">
                  {(entanglementStrength * 100).toFixed(0)}%
                </div>
              </div>
            )}

            <div>
              <span className="text-white/60">Status:</span>
              <div className="font-medium" style={{ color: coherenceStatus.color }}>
                {currentCoherence >= coherenceThreshold ? 'Stable' : 'Unstable'}
              </div>
            </div>
          </div>

          {/* Historical data summary */}
          {coherenceHistory.length > 10 && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Avg Coherence (1m):</span>
                <span>
                  {(coherenceHistory.slice(-10).reduce((sum, d) => sum + d.coherence, 0) / 10 * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </OptimizedGlass>
    )
  }
)