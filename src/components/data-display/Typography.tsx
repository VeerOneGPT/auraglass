import React from 'react';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  children?: React.ReactNode;
}

const variantMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  div: 'div',
} as const;

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'p', className, children, ...props }, ref) => {
    const Component = variantMap[variant];
    return React.createElement(Component, {
      className: cn(className),
      ref,
      ...props
    }, children);
  }
);

Typography.displayName = 'Typography';
