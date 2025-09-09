import { GlassButton } from '../button/GlassButton';

import { createGlassStyle } from '../../core/mixins/glassMixins';
/**
 * Card Composition Patterns
 * Common card layouts and patterns
 */

import React from 'react';
import {
  GlassCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardActions,
} from './GlassCard';
import { cn } from '@/design-system/utilsCore';

/**
 * Basic Card Pattern
 */
export interface BasicCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;

  /** Glass surface intent */
  intent?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  
  /** Glass surface elevation */
  elevation?: 'level1' | 'level2' | 'level3' | 'level4';
  
  /** Performance tier */
  tier?: 'low' | 'medium' | 'high';
}

export function BasicCard({ title, description, children, actions, className }: BasicCardProps) {
  return (
    <GlassCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {actions && (
        <CardFooter>
          <CardActions>{actions}</CardActions>
        </CardFooter>
      )}
    </GlassCard>
  );
}

/**
 * Feature Card Pattern
 */
export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  badge?: string;
  actions?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function FeatureCard({
  title,
  description,
  icon,
  image,
  badge,
  actions,
  className,
  onClick,
}: FeatureCardProps) {
  return (
    <GlassCard
      variant="feature"
      hoverable
      clickable={!!onClick}
      onClick={onClick}
      className={cn('group', className)}
    >
      {image && (
        <div className="relative -m-6 mb-4 overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {badge && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {badge}
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-start gap-3">
          {icon && (
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle size="lg" className="group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      {actions && (
        <CardFooter>
          <CardActions>{actions}</CardActions>
        </CardFooter>
      )}
    </GlassCard>
  );
}

/**
 * Stat Card Pattern
 */
export interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
  };
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, change, description, icon, className }: StatCardProps) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-muted-foreground',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→',
  };

  return (
    <GlassCard variant="elevated" className={className}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold">{value}</p>
              {change && (
                <span className={cn('text-sm font-medium flex items-center gap-1', trendColors?.[change.trend])}>
                  {trendIcons?.[change.trend]}
                  {change.value}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </GlassCard>
  );
}

/**
 * Profile Card Pattern
 */
export interface ProfileCardProps {
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
  stats?: Array<{ label: string; value: string | number }>;
  actions?: React.ReactNode;
  className?: string;
}

export function ProfileCard({ name, role, avatar, bio, stats, actions, className }: ProfileCardProps) {
  return (
    <GlassCard variant="elevated" className={className}>
      <CardContent>
        <div className="flex flex-col items-center text-center">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-16 h-16 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-lg font-semibold">{name.charAt(0)}</span>
            </div>
          )}
          
          <CardTitle size="lg">{name}</CardTitle>
          {role && <CardDescription className="mt-1">{role}</CardDescription>}
          {bio && <p className="text-sm text-muted-foreground mt-3">{bio}</p>}
          
          {stats && (
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-border/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      {actions && (
        <CardFooter align="center">
          <CardActions>{actions}</CardActions>
        </CardFooter>
      )}
    </GlassCard>
  );
}

/**
 * Notification Card Pattern
 */
export interface NotificationCardProps {
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  timestamp?: string;
  read?: boolean;
  avatar?: string;
  actions?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function NotificationCard({
  title,
  message,
  type = 'info',
  timestamp,
  read = false,
  avatar,
  actions,
  onDismiss,
  className,
}: NotificationCardProps) {
  const typeColors = {
    info: 'border-l-blue-500',
    success: 'border-l-green-500',
    warning: 'border-l-yellow-500',
    error: 'border-l-red-500',
  };

  const typeIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <GlassCard
      className={cn(
        'border-l-2',
        typeColors?.[type],
        {
          'opacity-60': read,
        },
        className
      )}
    >
      <CardContent>
        <div className="flex items-start gap-3">
          {avatar ? (
            <img src={avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <span className="text-lg">{typeIcons?.[type]}</span>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{title}</p>
                <p className="text-sm text-muted-foreground mt-1">{message}</p>
                {timestamp && (
                  <p className="text-xs text-muted-foreground mt-2">{timestamp}</p>
                )}
              </div>
              
              {onDismiss && (
                <GlassButton
                  onClick={onDismiss}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                >
                  ×
                </GlassButton>
              )}
            </div>
            
            {actions && <div className="mt-3">{actions}</div>}
          </div>
        </div>
      </CardContent>
    </GlassCard>
  );
}

/**
 * Pricing Card Pattern
 */
export interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  popular = false,
  actions,
  className,
}: PricingCardProps) {
  return (
    <GlassCard
      variant={popular ? 'feature' : 'elevated'}
      className={cn(
        'relative',
        {
          'ring-2 ring-primary ring-offset-2': popular,
        },
        className
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader bordered>
        <CardTitle size="lg">{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <div className="flex items-baseline gap-1 mt-3">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="text-sm text-muted-foreground">/{period}</span>}
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      
      {actions && (
        <CardFooter>
          <CardActions align="center" className="w-full">
            {actions}
          </CardActions>
        </CardFooter>
      )}
    </GlassCard>
  );
}

/**
 * Activity Card Pattern
 */
export interface ActivityCardProps {
  title: string;
  items: Array<{
    id: string;
    action: string;
    user?: string;
    timestamp: string;
    details?: string;
  }>;
  className?: string;
}

export function ActivityCard({ title, items, className }: ActivityCardProps) {
  return (
    <GlassCard className={className}>
      <CardHeader bordered>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      
      <CardContent padding="none">
        <div className="divide-y divide-border/20">
          {items.map((item) => (
            <div key={item?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item?.action}</p>
                  {item?.user && (
                    <p className="text-xs text-muted-foreground">by {item?.user}</p>
                  )}
                  {item?.details && (
                    <p className="text-xs text-muted-foreground mt-1">{item?.details}</p>
                  )}
                </div>
                <time className="text-xs text-muted-foreground">{item?.timestamp}</time>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
}
