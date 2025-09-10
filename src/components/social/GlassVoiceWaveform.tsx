'use client'

import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { OptimizedGlass } from '../../primitives'
import { useGlassSound } from '../../utils/soundDesign'
import { useA11yId } from '../../utils/a11y'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import { createGlassStyle } from '../../utils/createGlassStyle'

export interface VoiceParticipant {
  id: string
  name: string
  avatar?: string
  color: string
  isSpeaking: boolean
  isMuted: boolean
  audioLevel: number
  lastActivity: number
  isConnected: boolean
}

export interface GlassVoiceWaveformProps {
  participants: VoiceParticipant[]
  currentUserId?: string
  showAvatars?: boolean
  showNames?: boolean
  showMuteStatus?: boolean
  showConnectionStatus?: boolean
  waveformStyle?: 'bars' | 'waves' | 'circular' | 'spectrum'
  sensitivity?: number
  smoothing?: number
  colorMode?: 'participant' | 'activity' | 'rainbow'
  maxBars?: number
  animationSpeed?: number
  realTimeMode?: boolean
  soundVisualization?: boolean
  showVoiceActivity?: boolean
  compactMode?: boolean
  onParticipantClick?: (participantId: string) => void
  onMuteToggle?: (participantId: string) => void
  className?: string
}

const activityColors = {
  low: '#4B5563',
  medium: '#10B981',
  high: '#F59E0B',
  peak: '#EF4444'
}

const rainbowColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
]

export const GlassVoiceWaveform = forwardRef<HTMLDivElement, GlassVoiceWaveformProps>(
  ({
    participants,
    currentUserId,
    showAvatars = true,
    showNames = true,
    showMuteStatus = true,
    showConnectionStatus = true,
    waveformStyle = 'bars',
    sensitivity = 1,
    smoothing = 0.8,
    colorMode = 'participant',
    maxBars = 32,
    animationSpeed = 1,
    realTimeMode = false,
    soundVisualization = true,
    showVoiceActivity = true,
    compactMode = false,
    onParticipantClick,
    onMuteToggle,
    className = '',
    ...props
  }, ref) => {
    const [audioData, setAudioData] = useState<Record<string, number[]>>({})
    const [speakingHistory, setSpeakingHistory] = useState<Record<string, number[]>>({})
    const [simulatedParticipants, setSimulatedParticipants] = useState(participants)
    const animationFrameRef = useRef<number>()
    const { play } = useGlassSound()
    const id = useA11yId('glass-voice-waveform')
    const { shouldAnimate } = useMotionPreference()

    // Generate realistic audio waveform data
    const generateWaveformData = (audioLevel: number, bars: number): number[] => {
      const data: number[] = []
      const baseLevel = audioLevel * sensitivity

      for (let i = 0; i < bars; i++) {
        const frequency = (i / bars) * Math.PI * 4
        let amplitude = Math.sin(frequency) * baseLevel
        
        // Add some randomness for more realistic waveform
        amplitude += (Math.random() - 0.5) * baseLevel * 0.3
        
        // Apply frequency-based falloff (higher frequencies typically lower amplitude)
        amplitude *= Math.max(0.1, 1 - (i / bars) * 0.7)
        
        data.push(Math.max(0, Math.min(1, amplitude)))
      }

      return data
    }

    // Simulated real-time audio activity
    useEffect(() => {
      if (!realTimeMode) return

      const interval = setInterval(() => {
        setSimulatedParticipants(prev => prev.map(participant => {
          if (!participant.isConnected) return participant

          const wasSpeaking = participant.isSpeaking
          const newIsSpeaking = Math.random() < 0.3
          const newAudioLevel = newIsSpeaking ? Math.random() * 0.8 + 0.2 : Math.random() * 0.1

          // Sound notification when someone starts speaking
          if (!wasSpeaking && newIsSpeaking && soundVisualization) {
            play('notification')
          }

          return {
            ...participant,
            isSpeaking: newIsSpeaking,
            audioLevel: newAudioLevel,
            lastActivity: newIsSpeaking ? Date.now() : participant.lastActivity
          }
        }))
      }, 200)

      return () => clearInterval(interval)
    }, [realTimeMode, soundVisualization, play])

    // Update audio data for waveforms
    useEffect(() => {
      const updateAudioData = () => {
        const newAudioData: Record<string, number[]> = {}
        
        simulatedParticipants.forEach(participant => {
          if (participant.isSpeaking && participant.audioLevel > 0.1) {
            const currentData = audioData[participant.id] || new Array(maxBars).fill(0)
            const newData = generateWaveformData(participant.audioLevel, maxBars)
            
            // Apply smoothing
            const smoothedData = currentData.map((current, index) => 
              current * smoothing + newData[index] * (1 - smoothing)
            )
            
            newAudioData[participant.id] = smoothedData
          } else {
            // Fade out when not speaking
            const currentData = audioData[participant.id] || new Array(maxBars).fill(0)
            newAudioData[participant.id] = currentData.map(value => value * 0.9)
          }
        })

        setAudioData(newAudioData)
        animationFrameRef.current = requestAnimationFrame(updateAudioData)
      }

      if (realTimeMode) {
        updateAudioData()
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }, [simulatedParticipants, realTimeMode, maxBars, sensitivity, smoothing, audioData])

    // Track speaking history for voice activity
    useEffect(() => {
      if (!showVoiceActivity) return

      setSpeakingHistory(prev => {
        const newHistory = { ...prev }
        const now = Date.now()

        simulatedParticipants.forEach(participant => {
          if (!newHistory[participant.id]) {
            newHistory[participant.id] = []
          }

          const history = newHistory[participant.id]
          
          if (participant.isSpeaking) {
            history.push(now)
          }

          // Keep only last 30 seconds of history
          newHistory[participant.id] = history.filter(timestamp => now - timestamp < 30000)
        })

        return newHistory
      })
    }, [simulatedParticipants, showVoiceActivity])

    const getParticipantColor = (participant: VoiceParticipant, index: number) => {
      switch (colorMode) {
        case 'activity':
          if (!participant.isSpeaking) return activityColors.low
          if (participant.audioLevel < 0.3) return activityColors.medium
          if (participant.audioLevel < 0.6) return activityColors.high
          return activityColors.peak
        case 'rainbow':
          return rainbowColors[index % rainbowColors.length]
        default:
          return participant.color
      }
    }

    const VoiceActivityIndicator = ({ participant }: { participant: VoiceParticipant }) => {
      const history = speakingHistory[participant.id] || []
      const activityLevel = history.length / 10 // Normalize to 0-1 range

      return (
        <div className="flex items-center space-x-1">
          <div className="flex space-x-0.5">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`
                  w-1 h-3 rounded-full transition-all duration-300
                  ${activityLevel > level * 0.2 
                    ? 'bg-green-400' 
                    : 'bg-white/20'
                  }
                `}
              />
            ))}
          </div>
          <span className="text-xs text-white/60">
            {history.length > 0 ? `${history.length}` : '0'}
          </span>
        </div>
      )
    }

    const WaveformBars = ({ participant, data }: { participant: VoiceParticipant; data: number[] }) => (
      <div className="flex items-end space-x-1 h-12">
        {data.map((amplitude, index) => (
          <motion.div
            key={index}
            className="bg-current rounded-full"
            style={{
              width: compactMode ? '2px' : '3px',
              color: getParticipantColor(participant, participants.indexOf(participant)),
              opacity: participant.isSpeaking ? 0.8 : 0.3
            }}
            animate={{
              height: `${Math.max(2, amplitude * 48)}px`,
              opacity: participant.isSpeaking ? 0.8 : 0.3
            }}
            transition={shouldAnimate ? {
              duration: 0.1 * animationSpeed,
              ease: 'easeOut'
            } : { duration: 0 }}
          />
        ))}
      </div>
    )

    const WaveformWaves = ({ participant, data }: { participant: VoiceParticipant; data: number[] }) => (
      <svg width={compactMode ? 120 : 200} height={48} className="overflow-visible">
        <path
          d={`M 0 24 ${data.map((amplitude, index) => 
            `L ${(index / (data.length - 1)) * (compactMode ? 120 : 200)} ${24 - amplitude * 20}`
          ).join(' ')} L ${compactMode ? 120 : 200} 24`}
          fill="none"
          stroke={getParticipantColor(participant, participants.indexOf(participant))}
          strokeWidth="2"
          opacity={participant.isSpeaking ? 0.8 : 0.3}
        />
      </svg>
    )

    const WaveformCircular = ({ participant, data }: { participant: VoiceParticipant; data: number[] }) => {
      const radius = compactMode ? 20 : 30
      const centerX = radius + 5
      const centerY = radius + 5

      return (
        <svg width={(radius + 5) * 2} height={(radius + 5) * 2} className="overflow-visible">
          {data.map((amplitude, index) => {
            const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2
            const innerRadius = radius * 0.6
            const outerRadius = innerRadius + amplitude * radius * 0.4
            
            const x1 = centerX + Math.cos(angle) * innerRadius
            const y1 = centerY + Math.sin(angle) * innerRadius
            const x2 = centerX + Math.cos(angle) * outerRadius
            const y2 = centerY + Math.sin(angle) * outerRadius

            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={getParticipantColor(participant, participants.indexOf(participant))}
                strokeWidth="2"
                opacity={participant.isSpeaking ? 0.8 : 0.3}
              />
            )
          })}
        </svg>
      )
    }

    const WaveformSpectrum = ({ participant, data }: { participant: VoiceParticipant; data: number[] }) => (
      <div className="flex items-end justify-center space-x-px h-12 w-32">
        {data.map((amplitude, index) => (
          <motion.div
            key={index}
            className="bg-current"
            style={{
              width: `${100 / data.length}%`,
              color: getParticipantColor(participant, participants.indexOf(participant)),
              opacity: participant.isSpeaking ? 0.8 : 0.3
            }}
            animate={{
              height: `${Math.max(1, amplitude * 48)}px`
            }}
            transition={shouldAnimate ? {
              duration: 0.1 * animationSpeed
            } : { duration: 0 }}
          />
        ))}
      </div>
    )

    const renderWaveform = (participant: VoiceParticipant) => {
      const data = audioData[participant.id] || new Array(maxBars).fill(0)

      switch (waveformStyle) {
        case 'waves':
          return <WaveformWaves participant={participant} data={data} />
        case 'circular':
          return <WaveformCircular participant={participant} data={data} />
        case 'spectrum':
          return <WaveformSpectrum participant={participant} data={data} />
        default:
          return <WaveformBars participant={participant} data={data} />
      }
    }

    const ParticipantCard = ({ participant, index }: { participant: VoiceParticipant; index: number }) => (
      <motion.div
        className={`
          flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors duration-200
          ${createGlassStyle({ blur: 'sm', opacity: 0.8 }).background}
          ${participant.isSpeaking ? 'ring-2 ring-green-400/50' : ''}
          hover:bg-white/10
        `}
        onClick={() => onParticipantClick?.(participant.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {showAvatars && (
          <div className="relative">
            <div className={`
              ${compactMode ? 'w-8 h-8' : 'w-12 h-12'}
              rounded-full bg-gradient-to-br from-gray-300 to-gray-500 
              flex items-center justify-center text-white font-semibold
              ${createGlassStyle({ blur: 'sm', opacity: 0.8 }).background}
            `}>
              {participant.avatar ? (
                <img 
                  src={participant.avatar} 
                  alt={participant.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                participant.name.charAt(0).toUpperCase()
              )}
            </div>
            
            {/* Connection status */}
            {showConnectionStatus && (
              <div className={`
                absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white
                ${participant.isConnected ? 'bg-green-400' : 'bg-red-400'}
              `} />
            )}
            
            {/* Speaking indicator */}
            {participant.isSpeaking && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={shouldAnimate ? {
                  duration: 0.8,
                  repeat: Infinity
                } : { duration: 0 }}
              />
            )}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {showNames && (
            <div className="flex items-center space-x-2">
              <p className={`
                font-medium text-white/90 truncate
                ${compactMode ? 'text-sm' : 'text-base'}
              `}>
                {participant.name}
                {participant.id === currentUserId && ' (You)'}
              </p>
              
              {showMuteStatus && participant.isMuted && (
                <span className="text-red-400 text-xs">🔇</span>
              )}
            </div>
          )}
          
          {showVoiceActivity && !compactMode && (
            <VoiceActivityIndicator participant={participant} />
          )}
        </div>

        <div className="flex items-center space-x-2">
          {renderWaveform(participant)}
          
          {showMuteStatus && !compactMode && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMuteToggle?.(participant.id)
              }}
              className={`
                p-1 rounded text-sm transition-colors duration-200
                ${participant.isMuted 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-white/60 hover:text-white'
                }
              `}
            >
              {participant.isMuted ? '🔇' : '🎤'}
            </button>
          )}
        </div>
      </motion.div>
    )

    const activeSpeakers = simulatedParticipants.filter(p => p.isSpeaking).length
    const connectedParticipants = simulatedParticipants.filter(p => p.isConnected).length

    return (
      <OptimizedGlass
        ref={ref}
        intensity="subtle"
        className={`p-4 space-y-4 ${className}`}
        {...props}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white/90">
            Voice Chat ({connectedParticipants})
          </h3>
          <div className="flex items-center space-x-4 text-sm text-white/60">
            {activeSpeakers > 0 && (
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>{activeSpeakers} speaking</span>
              </span>
            )}
            {realTimeMode && (
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Live</span>
              </span>
            )}
          </div>
        </div>

        <div className={`
          space-y-2
          ${compactMode ? 'max-h-64 overflow-y-auto' : ''}
        `}>
          <AnimatePresence>
            {simulatedParticipants
              .sort((a, b) => {
                if (a.isSpeaking && !b.isSpeaking) return -1
                if (!a.isSpeaking && b.isSpeaking) return 1
                if (a.isConnected && !b.isConnected) return -1
                if (!a.isConnected && b.isConnected) return 1
                return a.name.localeCompare(b.name)
              })
              .map((participant, index) => (
                <ParticipantCard 
                  key={participant.id} 
                  participant={participant} 
                  index={index} 
                />
              ))}
          </AnimatePresence>
        </div>

        {!compactMode && (
          <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
            <span>Waveform: {waveformStyle}</span>
            <span>Sensitivity: {sensitivity}</span>
          </div>
        )}
      </OptimizedGlass>
    )
  }
)