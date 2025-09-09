import React from 'react';
// Animation type definitions
export type AnimationType = 'spring' | 'tween' | 'keyframes' | 'inertia';

export type EasingFunction =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | 'anticipate'
  | number[];

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
}

export interface TweenConfig {
  duration?: number;
  ease?: EasingFunction;
  times?: number[];
  yoyo?: boolean;
  loop?: number;
  repeat?: number;
  repeatDelay?: number;
}

export interface KeyframesConfig {
  times?: number[];
  ease?: EasingFunction | EasingFunction[];
  yoyo?: boolean;
  loop?: number;
  repeat?: number;
  repeatDelay?: number;
}

export interface InertiaConfig {
  velocity?: number;
  power?: number;
  timeConstant?: number;
  modifyTarget?: (target: number) => number;
  min?: number;
  max?: number;
}

export type AnimationConfig = SpringConfig | TweenConfig | KeyframesConfig | InertiaConfig;

export interface Transition {
  type: AnimationType;
  [key: string]: any;
}

export interface AnimationProps {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: Transition;
  variants?: Record<string, any>;
  whileHover?: any;
  whileTap?: any;
  whileDrag?: any;
  whileFocus?: any;
  whileInView?: any;
  viewport?: any;
  layout?: boolean | 'position' | 'size';
  layoutId?: string;
  drag?: boolean | 'x' | 'y';
  dragConstraints?: any;
  dragElastic?: number | boolean;
  dragMomentum?: boolean;
  onDragStart?: (event: any, info: any) => void;
  onDragEnd?: (event: any, info: any) => void;
  onDrag?: (event: any, info: any) => void;
}

// Physics-based interaction types
export interface PhysicsInteractionOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
  scale?: number;
  rotation?: number;
  duration?: number;
  delay?: number;
  affectsScale?: boolean;
  affectsRotation?: boolean;
  scaleAmplitude?: number;
  rotationAmplitude?: number;
  strength?: number;
  radius?: number;
}

export interface MagneticEffectOptions {
  strength?: number;
  radius?: number;
  ease?: EasingFunction;
  triggerDistance?: number;
}

// Predefined animation presets
export interface AnimationPresets {
  fadeIn: AnimationProps;
  fadeOut: AnimationProps;
  slideIn: AnimationProps;
  slideOut: AnimationProps;
  scaleIn: AnimationProps;
  scaleOut: AnimationProps;
  bounce: AnimationProps;
  shake: AnimationProps;
  pulse: AnimationProps;
  spin: AnimationProps;
}
