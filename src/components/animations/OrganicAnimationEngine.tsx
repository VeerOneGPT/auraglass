/**
import { cn } from '@/lib/utils';
 * Organic Animation Engine
 * Advanced animation framework with natural motion patterns, physics simulation,
 * and contextual micro-interactions that mimic real-world glass behavior
 */

import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { 
  motion, 
  useAnimation, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  AnimationControls,
  Variants,
  Transition
} from 'framer-motion';

// Organic motion pattern types
type OrganicMotionPattern = 
  | 'breathe' | 'pulse' | 'wave' | 'flutter' | 'drift' | 'bloom' 
  | 'cascade' | 'ripple' | 'shimmer' | 'flow' | 'crystallize' | 'dissolve';

// Emotional context for animations
type EmotionalContext = 
  | 'calm' | 'excited' | 'focused' | 'stressed' | 'joyful' 
  | 'melancholy' | 'energetic' | 'peaceful' | 'urgent' | 'contemplative';

// Physics simulation properties
interface PhysicsProperties {
  mass: number;
  tension: number;
  friction: number;
  velocity: number;
  acceleration: number;
  gravity: number;
  elasticity: number;
  viscosity: number;
}

// Animation sequence definition
interface AnimationSequence {
  id: string;
  pattern: OrganicMotionPattern;
  duration: number;
  delay: number;
  intensity: number;
  emotional: EmotionalContext;
  physics?: Partial<PhysicsProperties>;
  loop?: boolean | number;
  trigger?: 'auto' | 'hover' | 'click' | 'scroll' | 'focus' | 'visibility';
}

interface OrganicAnimationEngineProps {
  children: React.ReactNode;
  className?: string;
  sequences?: AnimationSequence[];
  emotionalContext?: EmotionalContext;
  enablePhysics?: boolean;
  enableAdaptiveSpeed?: boolean;
  enableMicroInteractions?: boolean;
  performanceLevel?: 'low' | 'medium' | 'high' | 'ultra';
  onAnimationStart?: (sequenceId: string) => void;
  onAnimationComplete?: (sequenceId: string) => void;
  onEmotionalShift?: (from: EmotionalContext, to: EmotionalContext) => void;
}

// Default physics properties
const DEFAULT_PHYSICS: PhysicsProperties = {
  mass: 1,
  tension: 300,
  friction: 30,
  velocity: 0,
  acceleration: 0,
  gravity: 0.5,
  elasticity: 0.8,
  viscosity: 0.1,
};

// Emotional context animation mappings
const EMOTIONAL_ANIMATIONS: Record<EmotionalContext, Partial<Transition>> = {
  calm: {
    duration: 3,
    ease: [0.25, 0.46, 0.45, 0.94], // Calm bezier curve
    type: 'spring',
    stiffness: 50,
    damping: 20,
  },
  excited: {
    duration: 0.8,
    ease: [0.68, -0.55, 0.265, 1.55], // Excited bounce
    type: 'spring',
    stiffness: 400,
    damping: 15,
  },
  focused: {
    duration: 2,
    ease: [0.4, 0, 0.2, 1], // Linear focus
    type: 'tween',
  },
  stressed: {
    duration: 0.5,
    ease: [0.76, 0, 0.24, 1], // Sharp stressed motion
    type: 'spring',
    stiffness: 500,
    damping: 25,
  },
  joyful: {
    duration: 1.2,
    ease: [0.175, 0.885, 0.32, 1.275], // Joyful bounce
    type: 'spring',
    stiffness: 200,
    damping: 10,
  },
  melancholy: {
    duration: 4,
    ease: [0.77, 0, 0.175, 1], // Slow melancholy
    type: 'tween',
  },
  energetic: {
    duration: 0.6,
    ease: [0.23, 1, 0.32, 1], // Quick energy
    type: 'spring',
    stiffness: 350,
    damping: 12,
  },
  peaceful: {
    duration: 5,
    ease: [0.25, 0.46, 0.45, 0.94], // Very calm
    type: 'spring',
    stiffness: 30,
    damping: 25,
  },
  urgent: {
    duration: 0.3,
    ease: [0.55, 0.055, 0.675, 0.19], // Sharp urgent
    type: 'tween',
  },
  contemplative: {
    duration: 6,
    ease: [0.19, 1, 0.22, 1], // Slow contemplation
    type: 'spring',
    stiffness: 40,
    damping: 30,
  },
};

// Organic motion pattern definitions
const MOTION_PATTERNS: Record<OrganicMotionPattern, Variants> = {
  breathe: {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.8, 1, 0.8],
    },
  },
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      boxShadow: [
        '0 0 0 0 rgba(255, 255, 255, 0.3)',
        '0 0 0 20px rgba(255, 255, 255, 0)',
        '0 0 0 0 rgba(255, 255, 255, 0)',
      ],
    },
  },
  wave: {
    animate: {
      y: [0, -10, 0, 10, 0],
      rotateX: [0, 5, 0, -5, 0],
    },
  },
  flutter: {
    animate: {
      x: [0, 2, -2, 1, -1, 0],
      y: [0, -1, 1, -0.5, 0.5, 0],
      rotate: [0, 1, -1, 0.5, -0.5, 0],
    },
  },
  drift: {
    animate: {
      x: [0, 20, -20, 15, -15, 0],
      y: [0, -5, 5, -3, 3, 0],
      rotate: [0, 2, -2, 1, -1, 0],
    },
  },
  bloom: {
    animate: {
      scale: [0.8, 1.2, 1],
      opacity: [0.5, 1, 1],
      filter: [
        'blur(10px) brightness(0.8)',
        'blur(0px) brightness(1.2)',
        'blur(0px) brightness(1)',
      ],
    },
  },
  cascade: {
    animate: {
      y: [0, 0, 0, 0, 0],
      opacity: [0, 1, 1, 1, 0],
      scale: [0.9, 1, 1, 1, 0.9],
    },
  },
  ripple: {
    animate: {
      scale: [1, 1.1, 1.05, 1],
      borderRadius: ['10px', '50%', '10px', '10px'],
    },
  },
  shimmer: {
    animate: {
      background: [
        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
        'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.4) 75%, transparent 100%)',
        'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.2) 100%, transparent 100%)',
      ],
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
  },
  flow: {
    animate: {
      clipPath: [
        'ellipse(100% 100% at 0% 50%)',
        'ellipse(100% 100% at 50% 50%)',
        'ellipse(100% 100% at 100% 50%)',
        'ellipse(100% 100% at 50% 50%)',
        'ellipse(100% 100% at 0% 50%)',
      ],
    },
  },
  crystallize: {
    animate: {
      clipPath: [
        'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        'polygon(20% 0%, 80% 20%, 100% 100%, 0% 80%)',
        'polygon(10% 10%, 90% 0%, 90% 90%, 10% 100%)',
        'polygon(0% 20%, 100% 10%, 80% 100%, 20% 90%)',
        'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      ],
      filter: [
        'brightness(1) contrast(1)',
        'brightness(1.2) contrast(1.1)',
        'brightness(1.1) contrast(1.05)',
        'brightness(1.15) contrast(1.08)',
        'brightness(1) contrast(1)',
      ],
    },
  },
  dissolve: {
    animate: {
      opacity: [1, 0.8, 0.6, 0.8, 1],
      filter: [
        'blur(0px)',
        'blur(2px)',
        'blur(5px)',
        'blur(2px)',
        'blur(0px)',
      ],
      scale: [1, 0.98, 0.95, 0.98, 1],
    },
  },
};

export const OrganicAnimationEngine: React.FC<OrganicAnimationEngineProps> = ({
  children,
  className='',
  sequences = [],
  emotionalContext = 'calm',
  enablePhysics = true,
  enableAdaptiveSpeed = true,
  enableMicroInteractions = true,
  performanceLevel = 'high',
  onAnimationStart,
  onAnimationComplete,
  onEmotionalShift,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSequences, setActiveSequences] = useState<Set<string>>(new Set());
  const [currentEmotion, setCurrentEmotion] = useState<EmotionalContext>(emotionalContext);
  const [isVisible, setIsVisible] = useState(false);
  
  const controls = useAnimation();
  
  // Physics-based motion values
  const physicsX = useSpring(0, { 
    stiffness: DEFAULT_PHYSICS.tension,
    damping: DEFAULT_PHYSICS.friction 
  });
  const physicsY = useSpring(0, { 
    stiffness: DEFAULT_PHYSICS.tension,
    damping: DEFAULT_PHYSICS.friction 
  });
  const physicsRotate = useSpring(0, { 
    stiffness: DEFAULT_PHYSICS.tension * 0.5,
    damping: DEFAULT_PHYSICS.friction 
  });
  const physicsScale = useSpring(1, { 
    stiffness: DEFAULT_PHYSICS.tension,
    damping: DEFAULT_PHYSICS.friction 
  });

  // Performance optimization based on level
  const optimizeForPerformance = useMemo(() => {
    switch (performanceLevel) {
      case 'low':
        return { maxSequences: 2, reducedMotion: true, skipComplexAnimations: true };
      case 'medium':
        return { maxSequences: 4, reducedMotion: false, skipComplexAnimations: false };
      case 'high':
        return { maxSequences: 8, reducedMotion: false, skipComplexAnimations: false };
      case 'ultra':
        return { maxSequences: 16, reducedMotion: false, skipComplexAnimations: false };
      default:
        return { maxSequences: 8, reducedMotion: false, skipComplexAnimations: false };
    }
  }, [performanceLevel]);

  // Adaptive speed calculation based on device performance
  const adaptiveSpeedFactor = useMemo(() => {
    if (!enableAdaptiveSpeed) return 1;
    
    // Simple performance detection (in a real app, would use more sophisticated metrics)
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isLowEnd = /Android.*Chrome\/[1-6][0-9]\./.test(userAgent);
    
    if (isLowEnd) return 0.5;
    if (isMobile) return 0.7;
    return 1;
  }, [enableAdaptiveSpeed]);

  // Emotional context change handler
  useEffect(() => {
    if (currentEmotion !== emotionalContext) {
      onEmotionalShift?.(currentEmotion, emotionalContext);
      setCurrentEmotion(emotionalContext);
    }
  }, [emotionalContext, currentEmotion, onEmotionalShift]);

  // Visibility observer for performance optimization
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Execute animation sequence
  const executeSequence = useCallback(async (sequence: AnimationSequence) => {
    if (!isVisible && sequence.trigger !== 'auto') return;
    if (activeSequences.size >= optimizeForPerformance.maxSequences) return;
    if (optimizeForPerformance.skipComplexAnimations && ['crystallize', 'dissolve', 'flow'].includes(sequence.pattern)) return;

    setActiveSequences(prev => new Set([...prev, sequence.id]));
    onAnimationStart?.(sequence.id);

    try {
      const emotionalTransition = EMOTIONAL_ANIMATIONS[sequence.emotional] || EMOTIONAL_ANIMATIONS[currentEmotion];
      const motionPattern = MOTION_PATTERNS[sequence.pattern];
      
      // Apply adaptive speed
      const adaptedDuration = (sequence.duration || (emotionalTransition as any).duration || 2) * adaptiveSpeedFactor;
      
      // Merge physics properties if enabled
      let finalTransition = { ...emotionalTransition, duration: adaptedDuration };
      
      if (enablePhysics && sequence.physics) {
        finalTransition = {
          ...finalTransition,
          type: 'spring' as const,
          stiffness: sequence.physics.tension || DEFAULT_PHYSICS.tension,
          damping: sequence.physics.friction || DEFAULT_PHYSICS.friction,
        };
      }

      // Execute the animation
      await controls.start({
        ...motionPattern.animate,
        transition: finalTransition,
      });

      // Handle looping
      if (sequence.loop === true) {
        // Infinite loop - restart the sequence
        setTimeout(() => executeSequence(sequence), sequence.delay || 0);
      } else if (typeof sequence.loop === 'number' && sequence.loop > 1) {
        // Finite loop - decrement and restart
        const remainingLoops = sequence.loop - 1;
        const loopingSequence = { ...sequence, loop: remainingLoops };
        setTimeout(() => executeSequence(loopingSequence), sequence.delay || 0);
      }

    } catch (error) {
      console.warn('Animation sequence failed:', error);
    } finally {
      setActiveSequences(prev => {
        const next = new Set(prev);
        next.delete(sequence.id);
        return next;
      });
      onAnimationComplete?.(sequence.id);
    }
  }, [
    isVisible,
    activeSequences.size,
    optimizeForPerformance,
    currentEmotion,
    adaptiveSpeedFactor,
    enablePhysics,
    controls,
    onAnimationStart,
    onAnimationComplete,
  ]);

  // Auto-trigger sequences
  useEffect(() => {
    sequences
      .filter(seq => seq.trigger === 'auto')
      .forEach(sequence => {
        const delay = sequence.delay || 0;
        setTimeout(() => executeSequence(sequence), delay);
      });
  }, [sequences, executeSequence]);

  // Micro-interaction handlers
  const handleHover = useCallback(() => {
    if (!enableMicroInteractions) return;
    
    const hoverSequences = sequences.filter(seq => seq.trigger === 'hover');
    hoverSequences.forEach(executeSequence);
    
    // Physics-based hover effect
    if (enablePhysics) {
      physicsScale.set(1.02);
      physicsY.set(-2);
    }
  }, [enableMicroInteractions, sequences, executeSequence, enablePhysics, physicsScale, physicsY]);

  const handleHoverEnd = useCallback(() => {
    if (!enableMicroInteractions || !enablePhysics) return;
    
    physicsScale.set(1);
    physicsY.set(0);
  }, [enableMicroInteractions, enablePhysics, physicsScale, physicsY]);

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (!enableMicroInteractions) return;

    const clickSequences = sequences.filter(seq => seq.trigger === 'click');
    clickSequences.forEach(executeSequence);

    // Physics-based click effect
    if (enablePhysics) {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (bounds) {
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        const clickX = event.clientX - bounds.left;
        const clickY = event.clientY - bounds.top;
        
        const offsetX = (clickX - centerX) / centerX;
        const offsetY = (clickY - centerY) / centerY;
        
        physicsX.set(offsetX * 10);
        physicsY.set(offsetY * 10);
        physicsRotate.set(offsetX * 2);
        physicsScale.set(0.98);
        
        // Reset after animation
        setTimeout(() => {
          physicsX.set(0);
          physicsY.set(0);
          physicsRotate.set(0);
          physicsScale.set(1);
        }, 200);
      }
    }
  }, [enableMicroInteractions, sequences, executeSequence, enablePhysics, physicsX, physicsY, physicsRotate, physicsScale]);

  const handleFocus = useCallback(() => {
    if (!enableMicroInteractions) return;
    
    const focusSequences = sequences.filter(seq => seq.trigger === 'focus');
    focusSequences.forEach(executeSequence);
  }, [enableMicroInteractions, sequences, executeSequence]);

  // Scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      if (!enableMicroInteractions) return;
      
      const scrollSequences = sequences.filter(seq => seq.trigger === 'scroll');
      scrollSequences.forEach(executeSequence);
    };

    if (enableMicroInteractions) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [enableMicroInteractions, sequences, executeSequence]);

  return (
    <motion.div
      ref={containerRef}
      className={`organic-animation-container ${className}`}
      style={{
        position: 'relative',
        x: enablePhysics ? physicsX : 0,
        y: enablePhysics ? physicsY : 0,
        rotate: enablePhysics ? physicsRotate : 0,
        scale: enablePhysics ? physicsScale : 1,
      }}
      animate={controls}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      onClick={handleClick}
      onFocus={handleFocus}
      whileTap={enableMicroInteractions ? { scale: 0.98 } : undefined}
    >
      {children}
      
      {/* Animation state indicators for debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="animation-debug-info" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          background: '/* Use createGlassStyle({ intent: "primary", elevation: "level2" }) */',
          color: 'white',
          padding: '4px 8px',
          fontSize: '10px',
          borderRadius: '0 0 0 8px',
          pointerEvents: 'none',
        }}>
          Emotion: {currentEmotion} | Active: {activeSequences.size} | Perf: {performanceLevel}
        </div>
      )}
    </motion.div>
  );
};

// Predefined animation sequences for common use cases
export const COMMON_SEQUENCES: Record<string, AnimationSequence[]> = {
  gentle: [
    {
      id: 'gentle-breathe',
      pattern: 'breathe',
      duration: 4,
      delay: 0,
      intensity: 0.3,
      emotional: 'calm',
      loop: true,
      trigger: 'auto',
    },
  ],
  energetic: [
    {
      id: 'energetic-pulse',
      pattern: 'pulse',
      duration: 1,
      delay: 0,
      intensity: 0.8,
      emotional: 'energetic',
      loop: true,
      trigger: 'auto',
    },
  ],
  interactive: [
    {
      id: 'hover-shimmer',
      pattern: 'shimmer',
      duration: 1.5,
      delay: 0,
      intensity: 0.6,
      emotional: 'focused',
      trigger: 'hover',
    },
    {
      id: 'click-ripple',
      pattern: 'ripple',
      duration: 0.8,
      delay: 0,
      intensity: 1,
      emotional: 'excited',
      trigger: 'click',
    },
  ],
  contemplative: [
    {
      id: 'drift-slow',
      pattern: 'drift',
      duration: 8,
      delay: 2,
      intensity: 0.2,
      emotional: 'contemplative',
      loop: true,
      trigger: 'auto',
    },
  ],
};

// Specialized organic animation components
export const GentleAnimation: React.FC<Omit<OrganicAnimationEngineProps, 'sequences'>> = (props) => (
  <OrganicAnimationEngine {...props} sequences={COMMON_SEQUENCES.gentle} />
);

export const EnergeticAnimation: React.FC<Omit<OrganicAnimationEngineProps, 'sequences'>> = (props) => (
  <OrganicAnimationEngine {...props} sequences={COMMON_SEQUENCES.energetic} />
);

export const InteractiveAnimation: React.FC<Omit<OrganicAnimationEngineProps, 'sequences'>> = (props) => (
  <OrganicAnimationEngine {...props} sequences={COMMON_SEQUENCES.interactive} />
);

export const ContemplativeAnimation: React.FC<Omit<OrganicAnimationEngineProps, 'sequences'>> = (props) => (
  <OrganicAnimationEngine {...props} sequences={COMMON_SEQUENCES.contemplative} />
);

export default OrganicAnimationEngine;