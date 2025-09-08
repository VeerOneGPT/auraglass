import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { OptimizedGlass } from '../../primitives';

export type AnimationType =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideIn'
  | 'slideOut'
  | 'scaleIn'
  | 'scaleOut'
  | 'bounce'
  | 'shake'
  | 'pulse'
  | 'rotate'
  | 'flip';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'center';

export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce' | 'elastic';

export interface AnimationConfig {
  type: AnimationType;
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  easing?: EasingType;
  repeat?: number;
  yoyo?: boolean; // Reverse animation on repeat
  amplitude?: number; // For bounce/elastic effects
  frequency?: number; // For oscillation effects
}

export interface MotionControllerProps {
  /** Whether animations are globally enabled */
  enabled?: boolean;
  /** Global animation duration multiplier */
  speed?: number;
  /** Whether to reduce motion for accessibility */
  reduceMotion?: boolean;
  /** Children to animate */
  children: React.ReactNode;
}

interface MotionContextType {
  enabled: boolean;
  speed: number;
  reduceMotion: boolean;
  animate: (element: HTMLElement, config: AnimationConfig) => Promise<void>;
  batchAnimate: (animations: Array<{ element: HTMLElement; config: AnimationConfig }>) => Promise<void>;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export const useMotionController = () => {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotionController must be used within a GlassMotionController');
  }
  return context;
};

// Easing functions
const easings = {
  linear: (t: number) => t,
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  bounce: (t: number) => {
    if (t < 1 / 2.75) return 7.5625 * t * t;
    if (t < 2 / 2.75) return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    if (t < 2.5 / 2.75) return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  elastic: (t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return -Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
  },
};

export const GlassMotionController: React.FC<MotionControllerProps> = ({
  enabled = true,
  speed = 1,
  reduceMotion = false,
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = async (element: HTMLElement, config: AnimationConfig): Promise<void> => {
    if (!enabled || reduceMotion) return;

    return new Promise((resolve) => {
      const {
        type,
        direction = 'center',
        duration = 1000,
        delay = 0,
        easing = 'easeOut',
        repeat = 0,
        yoyo = false,
        amplitude = 1,
        frequency = 1,
      } = config;

      const actualDuration = duration * speed;
      let startTime: number;
      let animationFrame: number;
      let repeatCount = 0;

      const animateFrame = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        if (timestamp - startTime < delay) {
          animationFrame = requestAnimationFrame(animateFrame);
          return;
        }

        const elapsed = timestamp - startTime - delay;
        const progress = Math.min(elapsed / actualDuration, 1);

        const easedProgress = easings[easing](progress);

        applyAnimation(element, type, direction, easedProgress, amplitude, frequency);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateFrame);
        } else {
          repeatCount++;
          if (repeatCount <= repeat) {
            startTime = timestamp;
            if (yoyo) {
              // For yoyo effect, we need to reverse the animation
              const reverseAnimateFrame = createReverseAnimationFrame(element, type, direction, actualDuration, easing, amplitude, frequency);
              animationFrame = requestAnimationFrame(reverseAnimateFrame);
              return;
            }
          } else {
            resolve();
          }
        }
      };

      animationFrame = requestAnimationFrame(animateFrame);
    });
  };

  const batchAnimate = async (animations: Array<{ element: HTMLElement; config: AnimationConfig }>) => {
    if (!enabled || reduceMotion) return;

    const promises = animations.map(({ element, config }) => animate(element, config));
    await Promise.all(promises);
  };

  const createReverseAnimationFrame = (
    element: HTMLElement,
    type: AnimationType,
    direction: AnimationDirection,
    duration: number,
    easing: EasingType,
    amplitude: number,
    frequency: number
  ) => {
    return (timestamp: number) => {
      // Reverse animation logic would go here
      // For simplicity, we'll just run the normal animation again
    };
  };

  const applyAnimation = (
    element: HTMLElement,
    type: AnimationType,
    direction: AnimationDirection,
    progress: number,
    amplitude: number,
    frequency: number
  ) => {
    const styles: Partial<CSSStyleDeclaration> = {};

    switch (type) {
      case 'fadeIn':
      case 'fadeOut':
        styles.opacity = type === 'fadeIn' ? progress.toString() : (1 - progress).toString();
        break;

      case 'slideIn':
      case 'slideOut':
        const slideDistance = 100;
        const slideProgress = type === 'slideIn' ? 1 - progress : progress;
        switch (direction) {
          case 'up':
            styles.transform = `translateY(${slideDistance * slideProgress}px)`;
            break;
          case 'down':
            styles.transform = `translateY(-${slideDistance * slideProgress}px)`;
            break;
          case 'left':
            styles.transform = `translateX(${slideDistance * slideProgress}px)`;
            break;
          case 'right':
            styles.transform = `translateX(-${slideDistance * slideProgress}px)`;
            break;
        }
        break;

      case 'scaleIn':
      case 'scaleOut':
        const scaleStart = type === 'scaleIn' ? 0 : 1;
        const scaleEnd = type === 'scaleIn' ? 1 : 0;
        const scaleProgress = scaleStart + (scaleEnd - scaleStart) * progress;
        styles.transform = `scale(${scaleProgress})`;
        break;

      case 'bounce':
        const bounceHeight = amplitude * 50;
        const bounceProgress = easings.bounce(progress);
        styles.transform = `translateY(${bounceHeight * (1 - bounceProgress)}px)`;
        break;

      case 'shake':
        const shakeIntensity = amplitude * 10;
        const shakeOffset = Math.sin(progress * frequency * Math.PI * 2) * shakeIntensity;
        styles.transform = `translateX(${shakeOffset}px)`;
        break;

      case 'pulse':
        const pulseScale = 1 + Math.sin(progress * frequency * Math.PI * 2) * amplitude * 0.1;
        styles.transform = `scale(${pulseScale})`;
        break;

      case 'rotate':
        const rotation = progress * 360 * frequency;
        styles.transform = `rotate(${rotation}deg)`;
        break;

      case 'flip':
        const flipRotation = progress * 180;
        styles.transform = `rotateY(${flipRotation}deg)`;
        break;
    }

    // Apply styles
    Object.assign(element.style, styles);
  };

  return (
    <MotionContext.Provider value={{
      enabled,
      speed,
      reduceMotion,
      animate,
      batchAnimate,
    }}>
      {children}
    </MotionContext.Provider>
  );
};

// Animated component wrapper
export const GlassAnimated: React.FC<{
  animation?: AnimationConfig;
  children: React.ReactNode;
  className?: string;
  trigger?: 'mount' | 'hover' | 'click' | 'manual';
}> = ({ animation, children, className = '', trigger = 'mount' }) => {
  const { animate, enabled } = useMotionController();
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!enabled || !animation || !elementRef.current || hasAnimated) return;

    if (trigger === 'mount') {
      animate(elementRef.current, animation).then(() => setHasAnimated(true));
    }
  }, [animate, animation, enabled, trigger, hasAnimated]);

  const handleTrigger = async () => {
    if (!enabled || !animation || !elementRef.current) return;

    if (trigger === 'click') {
      await animate(elementRef.current, animation);
    }
  };

  const handleHover = async () => {
    if (!enabled || !animation || !elementRef.current || trigger !== 'hover') return;

    await animate(elementRef.current, animation);
  };

  return (
    <div
      ref={elementRef}
      className={className}
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleHover : undefined}
    >
      {children}
    </div>
  );
};

// Sequence animation component
export const GlassAnimationSequence: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 100, className = '' }) => {
  const { batchAnimate, enabled } = useMotionController();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const elements = containerRef.current.children;
    const animations = Array.from(elements).map((element, index) => ({
      element: element as HTMLElement,
      config: {
        type: 'fadeIn' as AnimationType,
        direction: 'up' as AnimationDirection,
        duration: 600,
        delay: index * staggerDelay,
        easing: 'easeOut' as EasingType,
      },
    }));

    batchAnimate(animations);
  }, [batchAnimate, enabled, staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Preset animations
export const animationPresets = {
  fadeInUp: {
    type: 'fadeIn' as AnimationType,
    direction: 'up' as AnimationDirection,
    duration: 600,
    easing: 'easeOut' as EasingType,
  },
  fadeInDown: {
    type: 'fadeIn' as AnimationType,
    direction: 'down' as AnimationDirection,
    duration: 600,
    easing: 'easeOut' as EasingType,
  },
  slideInLeft: {
    type: 'slideIn' as AnimationType,
    direction: 'left' as AnimationDirection,
    duration: 500,
    easing: 'easeOut' as EasingType,
  },
  slideInRight: {
    type: 'slideIn' as AnimationType,
    direction: 'right' as AnimationDirection,
    duration: 500,
    easing: 'easeOut' as EasingType,
  },
  scaleIn: {
    type: 'scaleIn' as AnimationType,
    duration: 400,
    easing: 'easeOut' as EasingType,
  },
  bounceIn: {
    type: 'bounce' as AnimationType,
    duration: 800,
    easing: 'bounce' as EasingType,
  },
  shake: {
    type: 'shake' as AnimationType,
    duration: 500,
    amplitude: 1,
    frequency: 5,
  },
  pulse: {
    type: 'pulse' as AnimationType,
    duration: 1000,
    amplitude: 1,
    frequency: 2,
    repeat: Infinity,
  },
};

// Animation timeline component for complex sequences
export const GlassAnimationTimeline: React.FC<{
  timeline: Array<{
    selector: string;
    animation: AnimationConfig;
    startTime?: number;
  }>;
  children: React.ReactNode;
  className?: string;
}> = ({ timeline, children, className = '' }) => {
  const { animate, enabled } = useMotionController();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    timeline.forEach(({ selector, animation, startTime = 0 }) => {
      const element = containerRef.current?.querySelector(selector) as HTMLElement;
      if (element) {
        setTimeout(() => {
          animate(element, animation);
        }, startTime);
      }
    });
  }, [animate, enabled, timeline]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};
