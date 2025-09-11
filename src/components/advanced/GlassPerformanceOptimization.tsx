'use client'

import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import './GlassPerformanceOptimization.css'

// Performance Context
interface PerformanceContextType {
  performanceMode: 'high' | 'balanced' | 'battery-saver'
  gpuAcceleration: boolean
  reducedMotion: boolean
  lazyLoading: boolean
  setPerformanceMode: (mode: 'high' | 'balanced' | 'battery-saver') => void
  batteryLevel?: number
  cpuLoad: number
}

const PerformanceContext = createContext<PerformanceContextType | null>(null)

// Performance Provider Component
interface PerformanceProviderProps {
  children: React.ReactNode
  adaptivePerformance?: boolean
}

export function GlassPerformanceProvider({
  children,
  adaptivePerformance = true
}: PerformanceProviderProps) {
  const [performanceMode, setPerformanceMode] = useState<'high' | 'balanced' | 'battery-saver'>('balanced')
  const [batteryLevel, setBatteryLevel] = useState<number>()
  const [cpuLoad, setCpuLoad] = useState(0)
  const [gpuAcceleration, setGpuAcceleration] = useState(true)
  const [lazyLoading, setLazyLoading] = useState(true)

  const reducedMotion = useReducedMotion() || false

  // Battery API monitoring
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryInfo = () => {
          setBatteryLevel(Math.round(battery.level * 100))
        }

        updateBatteryInfo()
        battery.addEventListener('levelchange', updateBatteryInfo)
        battery.addEventListener('chargingchange', updateBatteryInfo)

        return () => {
          battery.removeEventListener('levelchange', updateBatteryInfo)
          battery.removeEventListener('chargingchange', updateBatteryInfo)
        }
      })
    }
  }, [])

  // CPU load estimation (simplified)
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const measurePerformance = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round(frameCount * 1000 / (currentTime - lastTime))
        const load = Math.max(0, Math.min(100, 100 - (fps / 60) * 100))
        setCpuLoad(load)

        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(measurePerformance)
    }

    const animationFrame = requestAnimationFrame(measurePerformance)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  // Adaptive performance adjustments
  useEffect(() => {
    if (!adaptivePerformance) return

    let newMode = performanceMode

    // Battery-based adjustments
    if (batteryLevel !== undefined && batteryLevel < 20) {
      newMode = 'battery-saver'
    } else if (batteryLevel !== undefined && batteryLevel > 80 && cpuLoad < 30) {
      newMode = 'high'
    } else {
      newMode = 'balanced'
    }

    // CPU load adjustments
    if (cpuLoad > 70) {
      newMode = 'battery-saver'
      setGpuAcceleration(false)
    } else if (cpuLoad < 30) {
      setGpuAcceleration(true)
    }

    if (newMode !== performanceMode) {
      setPerformanceMode(newMode)
    }
  }, [batteryLevel, cpuLoad, adaptivePerformance, performanceMode])

  const contextValue: PerformanceContextType = {
    performanceMode,
    gpuAcceleration,
    reducedMotion,
    lazyLoading,
    setPerformanceMode,
    batteryLevel,
    cpuLoad
  }

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function useGlassPerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('useGlassPerformance must be used within a GlassPerformanceProvider')
  }
  return context
}

// Efficient Glass Rendering Component
interface EfficientGlassRenderingProps {
  children: React.ReactNode
  className?: string
  enableGPU?: boolean
  virtualizeContent?: boolean
  deferRender?: boolean
  renderDistance?: number
  style?: React.CSSProperties
}

export function EfficientGlassRendering({
  children,
  className = '',
  enableGPU = true,
  virtualizeContent = false,
  deferRender = false,
  renderDistance = 100,
  style = {}
}: EfficientGlassRenderingProps) {
  const { performanceMode, gpuAcceleration } = useGlassPerformance()
  const [isVisible, setIsVisible] = useState(!deferRender)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, {
    margin: `${renderDistance}px`,
    once: false
  })

  useEffect(() => {
    if (deferRender) {
      setIsVisible(isInView)
    }
  }, [isInView, deferRender])

  // Performance-based glass styles
  const getOptimizedGlassStyles = useMemo(() => {
    let baseBackground = 'rgba(255, 255, 255, 0.1)'
    let backdropBlur = 12
    let shadow = '0 8px 32px rgba(0, 0, 0, 0.1)'

    switch (performanceMode) {
      case 'battery-saver':
        backdropBlur = 0
        shadow = 'none'
        break
      case 'high':
        backdropBlur = 20
        shadow = '0 16px 64px rgba(0, 0, 0, 0.15)'
        break
      default:
        backdropBlur = 12
    }

    return {
      background: baseBackground,
      backdropFilter: enableGPU && gpuAcceleration
        ? `blur(${backdropBlur}px)`
        : 'none',
      WebkitBackdropFilter: enableGPU && gpuAcceleration
        ? `blur(${backdropBlur}px)`
        : 'none',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '12px',
      boxShadow: performanceMode === 'battery-saver' ? 'none' : shadow,
      willChange: enableGPU && gpuAcceleration ? 'transform, opacity' : 'auto',
      transform: enableGPU && gpuAcceleration ? 'translate3d(0, 0, 0)' : 'none',
      ...style
    }
  }, [performanceMode, enableGPU, gpuAcceleration, style])

  if (!isVisible && deferRender) {
    return (
      <div
        ref={containerRef}
        className={cn('glass-surface-placeholder glass-border-dashed', className)}
        style={{
          minHeight: '100px',
          background: 'transparent',
          border: '1px dashed rgba(0, 0, 0, 0.1)'
        }}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('glass-surface-primary glass-blur-backdrop', className)}
      style={getOptimizedGlassStyles}
    >
      {virtualizeContent ? (
        <VirtualizedContent>
          {children}
        </VirtualizedContent>
      ) : (
        children
      )}
    </div>
  )
}

// Lazy Glass Loading Component
interface LazyGlassProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
  onLoad?: () => void
}

export function LazyGlassLoading({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
  className = '',
  onLoad
}: LazyGlassProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, {
    amount: threshold,
    margin: rootMargin as any,
    once: true
  })

  useEffect(() => {
    if (isInView && !isLoaded) {
      // Simulate async glass effect loading
      const timer = setTimeout(() => {
        setIsLoaded(true)
        onLoad?.()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isInView, isLoaded, onLoad])

  const defaultPlaceholder = (
    <div
      className={cn('glass-surface-placeholder glass-animate-pulse')}
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '12px',
        minHeight: '100px'
      }}
    />
  )

  return (
    <div ref={containerRef} className={className}>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {placeholder || defaultPlaceholder}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

// Reduced Motion Glass Component
interface ReducedMotionGlassProps {
  children: React.ReactNode
  className?: string
  staticAlternative?: React.ReactNode
  respectUserPreference?: boolean
}

export function ReducedMotionGlass({
  children,
  className = '',
  staticAlternative,
  respectUserPreference = true
}: ReducedMotionGlassProps) {
  const { reducedMotion } = useGlassPerformance()
  const shouldReduceMotion = respectUserPreference && reducedMotion

  if (shouldReduceMotion && staticAlternative) {
    return (
      <div className={cn('glass-surface-primary glass-reduced-motion', className)}>
        {staticAlternative}
      </div>
    )
  }

  const motionProps = shouldReduceMotion ? {
    // Disable animations when reduced motion is preferred
    animate: undefined,
    transition: { duration: 0 },
    whileHover: undefined,
    whileTap: undefined
  } : {
    // Normal animation props
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, type: 'spring' },
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 }
  }

  return (
    <motion.div
      className={cn('glass-surface-primary glass-reduced-motion', className)}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

// Battery-Aware Glass Effects
interface BatteryAwareGlassProps {
  children: React.ReactNode
  className?: string
  energyThresholds?: {
    high: number // Above this percentage, use full effects
    medium: number // Between medium and high, use reduced effects
    low: number // Below this, use minimal effects
  }
}

export function BatteryAwareGlass({
  children,
  className = '',
  energyThresholds = { high: 50, medium: 25, low: 10 }
}: BatteryAwareGlassProps) {
  const { batteryLevel, performanceMode } = useGlassPerformance()

  const getEnergyEfficientStyles = () => {
    const level = batteryLevel || 100

    if (level > energyThresholds.high && performanceMode !== 'battery-saver') {
      // Full effects
      return {
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.25)'
      }
    } else if (level > energyThresholds.medium) {
      // Reduced effects
      return {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.18)'
      }
    } else {
      // Minimal effects
      return {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'none', // Disable blur to save battery
        boxShadow: 'none',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }
    }
  }

  return (
    <motion.div
      className={cn('glass-surface-adaptive glass-border-radius-lg', className)}
      style={{
        borderRadius: '12px',
        transition: 'all 0.3s ease-in-out',
        ...getEnergyEfficientStyles()
      }}
      layout
    >
      {children}

      {/* Battery indicator for development */}
      {process.env.NODE_ENV === 'development' && batteryLevel !== undefined && (
        <div className={cn('glass-absolute glass-top-2 glass-left-2 glass-text-xs glass-surface-debug glass-text-on-debug glass-px-2 glass-py-1 glass-radius-sm glass-opacity-50')}>
          Battery: {batteryLevel}%
        </div>
      )}
    </motion.div>
  )
}

// Progressive Glass Enhancement
interface ProgressiveGlassProps {
  children: React.ReactNode
  tiers?: {
    basic: React.CSSProperties
    enhanced: React.CSSProperties
    premium: React.CSSProperties
  }
  className?: string
  autoDetect?: boolean
}

export function ProgressiveGlassEnhancement({
  children,
  tiers = {
    basic: {
      background: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px'
    },
    enhanced: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    premium: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: '16px',
      boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)'
    }
  },
  className = '',
  autoDetect = true
}: ProgressiveGlassProps) {
  const { performanceMode, gpuAcceleration, cpuLoad } = useGlassPerformance()

  const getTierStyles = () => {
    if (!autoDetect) {
      return tiers.enhanced // Default to enhanced if not auto-detecting
    }

    // Determine tier based on performance indicators
    if (performanceMode === 'battery-saver' || cpuLoad > 70 || !gpuAcceleration) {
      return tiers.basic
    } else if (performanceMode === 'high' && cpuLoad < 30) {
      return tiers.premium
    } else {
      return tiers.enhanced
    }
  }

  return (
    <motion.div
      className={cn('glass-surface-progressive', className)}
      style={getTierStyles()}
      layout
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Virtualized Content Helper
function VirtualizedContent({ children }: { children: React.ReactNode }) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerHeight = container.clientHeight
      const scrollTop = container.scrollTop
      const itemHeight = 100 // Approximate item height

      const start = Math.floor(scrollTop / itemHeight)
      const end = Math.ceil((scrollTop + containerHeight) / itemHeight)

      setVisibleRange({ start: Math.max(0, start - 2), end: end + 2 })
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const childArray = React.Children.toArray(children)
  const visibleChildren = childArray.slice(visibleRange.start, visibleRange.end)

  return (
    <div ref={containerRef} className={cn('glass-virtualized-content glass-h-400 glass-overflow-y-auto')}>
      <div style={{ height: visibleRange.start * 100 }} /> {/* Spacer for scrolled items */}
      {visibleChildren}
      <div style={{ height: (childArray.length - visibleRange.end) * 100 }} /> {/* Spacer for remaining items */}
    </div>
  )
}

// Performance Monitor Component
export function GlassPerformanceMonitor({ className = '' }: { className?: string }) {
  const { performanceMode, batteryLevel, cpuLoad, gpuAcceleration } = useGlassPerformance()

  return (
    <motion.div
      className={cn('glass-performance-monitor glass-fixed glass-top-10 glass-right-10 glass-z-max', className)}
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '12px',
        color: '#333',
        zIndex: 9999
      }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div>Mode: {performanceMode}</div>
      {batteryLevel !== undefined && <div>Battery: {batteryLevel}%</div>}
      <div>CPU: {cpuLoad.toFixed(1)}%</div>
      <div>GPU: {gpuAcceleration ? 'ON' : 'OFF'}</div>
    </motion.div>
  )
}
