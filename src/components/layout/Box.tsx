import React from 'react';
import { cn } from '@/lib/utilsComprehensive';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as: Component = 'div', className, children, ...props }, ref) => {
    return React.createElement(Component, {
      className: cn(className),
      ref,
      ...props
    }, children);
  }
);

Box.displayName = 'Box';
