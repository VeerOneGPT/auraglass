'use client';

import React, { forwardRef, HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/design-system/utilsCore';

export type AnimationPreset =
  | 'fadeIn'
  | 'slideIn'
  | 'slideDown'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'rotateIn'
  | 'bounceIn'
  | 'pulseIn'
  | 'none';

export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';

export interface MotionProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  preset?: AnimationPreset;
  type?: 'fade' | 'slide' | 'scale' | 'bounce' | 'rotate' | 'pulse';
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
  duration?: number;
  delay?: number;
  easing?: AnimationEasing;
  animateOnMount?: boolean;
  animateOnHover?: boolean;
  animateOnScroll?: boolean;
}

function getVariants(preset: AnimationPreset): Variants {
  switch (preset) {
    case 'fadeIn':
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    case 'slideIn':
      return { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };
    case 'slideDown':
      return { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 } };
    case 'slideUp':
      return { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };
    case 'slideLeft':
      return { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 } };
    case 'slideRight':
      return { initial: { opacity: 0, x: -12 }, animate: { opacity: 1, x: 0 } };
    case 'scaleIn':
      return { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 } };
    case 'rotateIn':
      return { initial: { opacity: 0, rotate: -8 }, animate: { opacity: 1, rotate: 0 } };
    case 'bounceIn':
      return {
        initial: { opacity: 0, scale: 0.3 },
        animate: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 330, damping: 20 } },
      };
    case 'pulseIn':
      return {
        initial: { opacity: 0.8, scale: 1.04 },
        animate: { opacity: 1, scale: 1 },
      };
    default:
      return { initial: {}, animate: {} };
  }
}

export const MotionFramer = forwardRef<HTMLDivElement, MotionProps>(
  (
    {
      preset = 'none',
      duration = 300,
      delay = 0,
      easing = 'ease-in-out',
      animateOnMount = true,
      animateOnHover = false,
      animateOnScroll = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
      if (typeof window === 'undefined' || !('matchMedia' in window)) return;
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReduced(!!mq.matches);
      update();
      if ('addEventListener' in mq) {
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
      } else {
        // @ts-ignore older Safari
        mq.addListener(update);
        // @ts-ignore older Safari
        return () => mq.removeListener(update);
      }
    }, []);

    const effectivePreset = reduced ? 'none' : preset;
    const variants = useMemo(() => getVariants(effectivePreset), [effectivePreset]);
    const easingMap: Record<string, any> = {
      linear: 'linear',
      ease: 'easeInOut',
      'ease-in': 'easeIn',
      'ease-out': 'easeOut',
      'ease-in-out': 'easeInOut',
    };
    const transition: any = reduced ? { duration: 0.0001, delay: 0 } : { duration: duration / 1000, delay: delay / 1000 };
    if (easing === 'spring') {
      transition.type = 'spring';
    } else if (easing) {
      transition.ease = easingMap[easing] || 'easeInOut';
    }

    const baseProps: any = {
      ref,
      className: cn('motion-primitive', className),
      style,
      initial: reduced ? undefined : (animateOnMount || animateOnScroll ? 'initial' : undefined),
      animate: reduced ? undefined : 'animate',
      variants,
      transition,
    };

    if (!reduced && animateOnScroll) {
      baseProps.initial = 'initial';
      baseProps.whileInView = 'animate';
      baseProps.viewport = { once: true, amount: 0.2 };
    }

    if (!reduced && animateOnHover) {
      baseProps.whileHover = { scale: 1.015 };
    }

    return (
      <motion.div {...baseProps} {...props}>
        {children}
      </motion.div>
    );
  }
);

MotionFramer.displayName = 'MotionFramer';
