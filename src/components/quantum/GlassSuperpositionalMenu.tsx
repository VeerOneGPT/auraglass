'use client'

import React, { forwardRef, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OptimizedGlass } from '../../primitives'
import { useA11yId } from '../../utils/a11y'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import { createGlassStyle } from '../../utils/createGlassStyle'

export interface QuantumMenuState {
  id: string
  label: string
  icon?: string
  probability: number
  energy: number
  coherence: number
  entangled?: string[]
  subStates?: QuantumMenuState[]
}

export interface GlassSuperpositionalMenuProps {
  menuStates: QuantumMenuState[]
  isObserved?: boolean
  measurementType?: 'collapse' | 'decoherence' | 'interference'
  coherenceDecay?: number
  entanglementStrength?: number
  visualizeWaveFunction?: boolean
  showProbabilities?: boolean
  showQuantumNoise?: boolean
  maxSuperpositions?: number
  onStateCollapse?: (stateId: string) => void
  onMeasurement?: (states: QuantumMenuState[]) => void
  onEntanglement?: (stateIds: string[]) => void
  className?: string
}

const quantumColors = {
  superposition: '#4F46E5',
  entangled: '#EC4899',
  collapsed: '#10B981',
  decoherent: '#F59E0B',
  interference: '#8B5CF6'
}

const wavePatterns = {
  sine: (t: number, frequency: number) => Math.sin(t * frequency),
  cosine: (t: number, frequency: number) => Math.cos(t * frequency),
  complex: (t: number, frequency: number) => Math.sin(t * frequency) * Math.cos(t * frequency / 2),
  damped: (t: number, frequency: number) => Math.sin(t * frequency) * Math.exp(-t * 0.1)
}

export const GlassSuperpositionalMenu = forwardRef<HTMLDivElement, GlassSuperpositionalMenuProps>(
  ({
    menuStates,
    isObserved = false,
    measurementType = 'collapse',
    coherenceDecay = 0.02,
    entanglementStrength = 0.5,
    visualizeWaveFunction = true,
    showProbabilities = true,
    showQuantumNoise = true,
    maxSuperpositions = 8,
    onStateCollapse,
    onMeasurement,
    onEntanglement,
    className = '',
    ...props
  }, ref) => {
    const [currentStates, setCurrentStates] = useState(menuStates)
    const [measurementTime, setMeasurementTime] = useState<number | null>(null)
    const [collapsedState, setCollapsedState] = useState<string | null>(null)
    const [quantumTime, setQuantumTime] = useState(0)
    const [interactionHistory, setInteractionHistory] = useState<Array<{
      type: string
      stateId: string
      timestamp: number
      probability: number
    }>>([])
    const id = useA11yId('glass-superposition-menu')

    // Motion preference hook
    const { shouldAnimate } = useMotionPreference()

    // Helper function to respect motion preferences
    const respectMotionPreference = (config: any) => shouldAnimate ? config : { duration: 0 }

    // Quantum time evolution
    useEffect(() => {
      const interval = setInterval(() => {
        setQuantumTime(prev => prev + 0.1)
      }, 16)
      return () => clearInterval(interval)
    }, [])

    // Coherence decay simulation
    useEffect(() => {
      if (isObserved || collapsedState) return

      const interval = setInterval(() => {
        setCurrentStates(prev => prev.map(state => ({
          ...state,
          coherence: Math.max(0, state.coherence - coherenceDecay),
          probability: state.coherence > 0.1 ? 
            state.probability + (Math.random() - 0.5) * 0.02 : 
            state.probability * 0.98
        })).map(state => ({
          ...state,
          probability: Math.max(0.01, Math.min(1, state.probability))
        })))
      }, 100)

      return () => clearInterval(interval)
    }, [isObserved, collapsedState, coherenceDecay])

    // Normalize probabilities to ensure they sum to 1
    useEffect(() => {
      const totalProb = currentStates.reduce((sum, state) => sum + state.probability, 0)
      if (totalProb > 0) {
        setCurrentStates(prev => prev.map(state => ({
          ...state,
          probability: state.probability / totalProb
        })))
      }
    }, [currentStates.length])

    const performMeasurement = (targetStateId?: string) => {
      setMeasurementTime(Date.now())
      
      let selectedState: QuantumMenuState

      if (targetStateId) {
        selectedState = currentStates.find(s => s.id === targetStateId)!
      } else {
        // Quantum measurement based on probability amplitudes
        const random = Math.random()
        let cumulativeProb = 0
        
        selectedState = currentStates.find(state => {
          cumulativeProb += state.probability * state.probability // |ψ|²
          return random <= cumulativeProb
        }) || currentStates[0]
      }

      if (measurementType === 'collapse') {
        setCollapsedState(selectedState.id)
        setCurrentStates([{ 
          ...selectedState, 
          probability: 1,
          coherence: 0 
        }])
      }

      setInteractionHistory(prev => [...prev, {
        type: 'measurement',
        stateId: selectedState.id,
        timestamp: Date.now(),
        probability: selectedState.probability
      }])

      onStateCollapse?.(selectedState.id)
      onMeasurement?.(currentStates)
    }

    const createEntanglement = (stateIds: string[]) => {
      setCurrentStates(prev => prev.map(state => {
        if (stateIds.includes(state.id)) {
          return {
            ...state,
            entangled: stateIds.filter(id => id !== state.id),
            coherence: Math.min(1, state.coherence + 0.2)
          }
        }
        return state
      }))

      onEntanglement?.(stateIds)
    }

    const getStateOpacity = (state: QuantumMenuState) => {
      if (collapsedState) {
        return state.id === collapsedState ? 1 : 0.1
      }
      return 0.3 + (state.probability * 0.7)
    }

    const getStateScale = (state: QuantumMenuState) => {
      if (collapsedState && state.id !== collapsedState) return 0.5
      return 0.8 + (state.probability * 0.4)
    }

    const getQuantumPhase = (state: QuantumMenuState) => {
      return quantumTime * (1 + state.energy * 0.5) + state.probability * Math.PI
    }

    const WaveFunction = ({ state, index }: { state: QuantumMenuState; index: number }) => {
      const points = useMemo(() => {
        const numPoints = 50
        const amplitude = state.probability * 20
        const frequency = 0.5 + state.energy * 0.3
        const phase = getQuantumPhase(state)
        
        return Array.from({ length: numPoints }, (_, i) => {
          const t = (i / numPoints) * 4 * Math.PI
          const y = amplitude * wavePatterns.complex(t + phase, frequency)
          return { x: (i / numPoints) * 200, y: y + 25 }
        })
      }, [state, quantumTime])

      return (
        <svg
          className="absolute inset-0 pointer-events-none"
          width="200"
          height="50"
          style={{ zIndex: -1 }}
        >
          <path
            d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            stroke={state.entangled?.length ? quantumColors.entangled : quantumColors.superposition}
            strokeWidth="2"
            fill="none"
            opacity={state.coherence * 0.6}
            strokeDasharray={state.coherence < 0.5 ? "5,5" : "none"}
          />
          
          {/* Probability density */}
          <path
            d={`M ${points.map(p => `${p.x} ${25 + Math.abs(p.y - 25) * 0.3}`).join(' L ')}`}
            fill={state.entangled?.length ? quantumColors.entangled : quantumColors.superposition}
            opacity={state.probability * 0.2}
          />
        </svg>
      )
    }

    const QuantumNoise = () => (
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    )

    const EntanglementLines = () => (
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {currentStates.map(state => 
          state.entangled?.map(entangledId => {
            const entangledState = currentStates.find(s => s.id === entangledId)
            if (!entangledState) return null

            const startIndex = currentStates.indexOf(state)
            const endIndex = currentStates.indexOf(entangledState)
            
            const startY = startIndex * 80 + 40
            const endY = endIndex * 80 + 40

            return (
              <motion.line
                key={`${state.id}-${entangledId}`}
                x1="50"
                y1={startY}
                x2="150"
                y2={endY}
                stroke={quantumColors.entangled}
                strokeWidth="2"
                opacity={entanglementStrength}
                strokeDasharray="10,5"
                animate={{
                  strokeDashoffset: [0, 15]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )
          })
        ).filter(Boolean)}
      </svg>
    )

    const QuantumState = ({ state, index }: { state: QuantumMenuState; index: number }) => (
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: getStateOpacity(state),
          scale: getStateScale(state),
          y: isObserved ? 0 : Math.sin(getQuantumPhase(state)) * 5,
          rotateY: visualizeWaveFunction ? Math.sin(getQuantumPhase(state)) * 10 : 0
        }}
        transition={respectMotionPreference({
          duration: 0.3,
          type: collapsedState ? 'spring' : 'tween'
        })}
        whileHover={{ 
          scale: getStateScale(state) * 1.05,
          rotateY: 0
        }}
        onClick={() => performMeasurement(state.id)}
      >
        <div
          className={`
            relative p-4 rounded-lg cursor-pointer border-2 transition-all duration-300
            ${createGlassStyle({ 
              variant: 'default',
              opacity: state.coherence 
            })}
            ${collapsedState === state.id 
              ? 'border-green-400 bg-green-400/20' 
              : state.entangled?.length 
                ? 'border-pink-400 bg-pink-400/20'
                : 'border-indigo-400 bg-indigo-400/20'
            }
          `}
          style={{
            backdropFilter: `blur(${4 + state.coherence * 8}px)`,
            boxShadow: `0 0 ${state.probability * 20}px ${
              state.entangled?.length ? quantumColors.entangled : quantumColors.superposition
            }40`
          }}
        >
          {visualizeWaveFunction && !collapsedState && (
            <WaveFunction state={state} index={index} />
          )}

          <div className="relative z-10">
            <div className="flex items-center space-x-3">
              {state.icon && (
                <span className="text-2xl">{state.icon}</span>
              )}
              <div className="flex-1">
                <h3 className="text-white/90 font-medium">
                  {state.label}
                </h3>
                {showProbabilities && (
                  <div className="flex items-center space-x-2 text-sm text-white/60">
                    <span>P: {(state.probability * 100).toFixed(1)}%</span>
                    <span>•</span>
                    <span>C: {(state.coherence * 100).toFixed(0)}%</span>
                    {state.entangled?.length && (
                      <>
                        <span>•</span>
                        <span className="text-pink-400">
                          ⚛ {state.entangled.length}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quantum indicators */}
            <div className="mt-2 flex space-x-2">
              <div
                className="h-1 bg-indigo-400 rounded-full"
                style={{ width: `${state.probability * 100}%` }}
              />
              <div
                className="h-1 bg-blue-400 rounded-full opacity-60"
                style={{ width: `${state.coherence * 100}%` }}
              />
            </div>
          </div>

          {/* Quantum field visualization */}
          {!collapsedState && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              animate={{
                background: [
                  `radial-gradient(circle at ${50 + Math.sin(quantumTime) * 20}% ${50 + Math.cos(quantumTime * 0.7) * 20}%, 
                   ${quantumColors.superposition}20 0%, transparent 50%)`,
                  `radial-gradient(circle at ${50 + Math.sin(quantumTime + Math.PI) * 20}% ${50 + Math.cos(quantumTime * 0.7 + Math.PI) * 20}%, 
                   ${quantumColors.superposition}20 0%, transparent 50%)`
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
        </div>
      </motion.div>
    )

    const superpositionStates = collapsedState 
      ? currentStates.filter(s => s.id === collapsedState)
      : currentStates.slice(0, maxSuperpositions)

    return (
      <OptimizedGlass
        ref={ref}
        variant="frosted"
        className={`relative p-6 space-y-4 ${className}`}
        {...props}
      >
        {/* Quantum field background */}
        {showQuantumNoise && <QuantumNoise />}
        {visualizeWaveFunction && <EntanglementLines />}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white/90">
              Quantum Menu
            </h2>
            <p className="text-sm text-white/60">
              {collapsedState ? 'State Collapsed' : 
               `${superpositionStates.length} superposition${superpositionStates.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {!collapsedState && (
              <>
                <button
                  onClick={() => performMeasurement()}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${createGlassStyle({ variant: 'default' })}
                    text-white/80 hover:text-white border border-white/20 hover:border-white/40
                  `}
                >
                  🔬 Measure
                </button>
                
                <button
                  onClick={() => {
                    const randomStates = currentStates
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 2)
                      .map(s => s.id)
                    createEntanglement(randomStates)
                  }}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${createGlassStyle({ variant: 'default' })}
                    text-pink-300 hover:text-pink-200 border border-pink-400/20 hover:border-pink-400/40
                  `}
                >
                  ⚛ Entangle
                </button>
              </>
            )}

            <div className="text-sm text-white/50">
              t: {quantumTime.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Quantum states */}
        <div className="space-y-3">
          <AnimatePresence>
            {superpositionStates.map((state, index) => (
              <QuantumState key={state.id} state={state} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Quantum information */}
        <div className={`
          p-4 rounded-lg border border-white/10
          ${createGlassStyle({ variant: 'default' })}
        `}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-white/60">Total Coherence:</span>
              <span className="ml-2 text-white/90">
                {(currentStates.reduce((sum, s) => sum + s.coherence, 0) / currentStates.length * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-white/60">Entangled Pairs:</span>
              <span className="ml-2 text-white/90">
                {currentStates.filter(s => s.entangled?.length).length / 2}
              </span>
            </div>
            <div>
              <span className="text-white/60">Measurements:</span>
              <span className="ml-2 text-white/90">
                {interactionHistory.filter(h => h.type === 'measurement').length}
              </span>
            </div>
            <div>
              <span className="text-white/60">State:</span>
              <span className="ml-2 text-white/90">
                {collapsedState ? 'Collapsed' : 'Superposition'}
              </span>
            </div>
          </div>
        </div>

        {/* Reset button */}
        {collapsedState && (
          <motion.button
            onClick={() => {
              setCollapsedState(null)
              setCurrentStates(menuStates)
              setMeasurementTime(null)
            }}
            className={`
              w-full p-3 rounded-lg text-sm font-medium transition-colors duration-200
              ${createGlassStyle({ variant: 'default' })}
              text-blue-300 hover:text-blue-200 border border-blue-400/20 hover:border-blue-400/40
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={respectMotionPreference({ delay: 0.5 })}
          >
            🔄 Reset Quantum State
          </motion.button>
        )}
      </OptimizedGlass>
    )
  }
)