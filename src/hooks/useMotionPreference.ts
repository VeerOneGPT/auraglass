import { useReducedMotion } from './useReducedMotion';

export interface MotionAwareAnimationConfig {
  getAnimationProps: (props?: any) => any;
  getTransition: (duration?: number, easing?: string) => any;
}

export interface AnimationDurationConfig {
  duration: number;
}

export function useMotionAwareAnimation(): MotionAwareAnimationConfig {
  const prefersReducedMotion = useReducedMotion();

  const getAnimationProps = (props: any = {}) => {
    if (prefersReducedMotion) {
      return {
        ...props,
        transition: 'none',
        animate: props?.initial || {},
      };
    }
    return props;
  };

  const getTransition = (duration: number = 0.3, easing: string = 'ease-out') => {
    if (prefersReducedMotion) {
      return { duration: 0 };
    }
    return { duration, ease: easing };
  };

  return {
    getAnimationProps,
    getTransition,
  };
}

export function useAnimationDuration(baseDuration: number = 200): AnimationDurationConfig {
  const prefersReducedMotion = useReducedMotion();

  return {
    duration: prefersReducedMotion ? 0 : baseDuration,
  };
}
