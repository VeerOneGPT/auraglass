import { GlassButton } from '../button/GlassButton';

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
import { cn } from '../../lib/utilsComprehensive';

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
        <div className="glass-glass-glass-relative -glass-glass-glass-m-6 glass-glass-glass-mb-4 overflow-hidden glass-radius-t-lg">
          <img
            src={image}
            alt={title}
            className="glass-glass-glass-w-full glass-glass-glass-h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {badge && (
            <div className="glass-glass-glass-absolute top-3 right-3 glass-glass-glass-px-2 glass-glass-glass-py-1 glass-surface-primary glass-glass-glass-text-primary-foreground glass-glass-glass-text-xs glass-glass-glass-font-medium glass-radius-full">
              {badge}
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-3">
          {icon && (
            <div className="glass-glass-glass-flex-shrink-0 glass-glass-glass-w-8 glass-glass-glass-h-8 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-text-primary">
              {icon}
            </div>
          )}
          <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
            <CardTitle size="lg" className="group-hover:glass-glass-glass-text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="glass-mt-1">{description}</CardDescription>
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
    neutral: 'glass-text-secondary',
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→',
  };

  return (
    <GlassCard variant="elevated" className={className}>
      <CardContent>
        <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-justify-between">
          <div className="glass-glass-glass-flex-1">
            <p className="glass-glass-glass-text-sm glass-glass-glass-font-medium glass-text-secondary">{title}</p>
            <div className="glass-glass-glass-flex items-baseline glass-glass-glass-gap-2 glass-mt-1">
              <p className="glass-glass-glass-text-2xl glass-glass-glass-font-bold">{value}</p>
              {change && (
                <span className={cn('glass-text-sm font-medium flex items-center glass-gap-1', trendColors?.[change.trend])}>
                  {trendIcons?.[change.trend]}
                  {change.value}
                </span>
              )}
            </div>
            {description && (
              <p className="glass-glass-glass-text-xs glass-text-secondary glass-mt-2">{description}</p>
            )}
          </div>
          {icon && (
            <div className="glass-glass-glass-flex-shrink-0 glass-glass-glass-w-8 glass-glass-glass-h-8 glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-text-secondary">
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
        <div className="glass-glass-glass-flex glass-glass-glass-flex-col glass-glass-glass-items-center glass-glass-glass-text-center">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="glass-glass-glass-w-16 glass-glass-glass-h-16 glass-radius-full object-cover glass-glass-glass-mb-4"
            />
          ) : (
            <div className="glass-glass-glass-w-16 glass-glass-glass-h-16 glass-radius-full glass-surface-subtle glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-center glass-glass-glass-mb-4">
              <span className="glass-glass-glass-text-lg glass-glass-glass-font-semibold">{name.charAt(0)}</span>
            </div>
          )}
          
          <CardTitle size="lg">{name}</CardTitle>
          {role && <CardDescription className="glass-mt-1">{role}</CardDescription>}
          {bio && <p className="glass-glass-glass-text-sm glass-text-secondary mt-3">{bio}</p>}
          
          {stats && (
            <div className="glass-glass-glass-flex glass-glass-glass-justify-center glass-glass-glass-gap-6 glass-mt-4 pt-4 glass-glass-glass-border-t glass-glass-glass-border-glass-glass-glass-border/20">
              {stats.map((stat, index) => (
                <div key={index} className="glass-glass-glass-text-center">
                  <p className="glass-glass-glass-text-lg glass-glass-glass-font-semibold">{stat.value}</p>
                  <p className="glass-glass-glass-text-xs glass-text-secondary">{stat.label}</p>
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
        <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-3">
          {avatar ? (
            <img src={avatar} alt="" className="glass-glass-glass-w-8 glass-glass-glass-h-8 glass-radius-full object-cover" />
          ) : (
            <span className="glass-glass-glass-text-lg">{typeIcons?.[type]}</span>
          )}
          
          <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
            <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-justify-between">
              <div className="glass-glass-glass-flex-1">
                <p className="glass-glass-glass-font-medium glass-glass-glass-text-sm">{title}</p>
                <p className="glass-glass-glass-text-sm glass-text-secondary glass-mt-1">{message}</p>
                {timestamp && (
                  <p className="glass-glass-glass-text-xs glass-text-secondary glass-mt-2">{timestamp}</p>
                )}
              </div>
              
              {onDismiss && (
                <GlassButton
                  onClick={onDismiss}
                  className="glass-glass-glass-flex-shrink-0 glass-text-secondary hover:glass-glass-glass-text-primary"
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
        <div className="glass-glass-glass-absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="glass-surface-primary glass-glass-glass-text-primary-foreground glass-glass-glass-px-3 glass-glass-glass-py-1 glass-glass-glass-text-xs glass-glass-glass-font-medium glass-radius-full">
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader bordered>
        <CardTitle size="lg">{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <div className="glass-glass-glass-flex items-baseline glass-glass-glass-gap-1 mt-3">
          <span className="glass-glass-glass-text-3xl glass-glass-glass-font-bold">{price}</span>
          {period && <span className="glass-glass-glass-text-sm glass-text-secondary">/{period}</span>}
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="glass-glass-glass-gap-2">
          {features.map((feature, index) => (
            <li key={index} className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2 glass-glass-glass-text-sm">
              <span className="glass-glass-glass-text-primary">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      
      {actions && (
        <CardFooter>
          <CardActions align="center" className="glass-glass-glass-w-full">
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
        <div className="divide-y divide-glass-glass-glass-border/20">
          {items.map((item) => (
            <div key={item?.id} className="glass-glass-glass-p-4 hover:glass-surface-subtle transition-colors">
              <div className="glass-glass-glass-flex glass-glass-glass-justify-between glass-glass-glass-items-start">
                <div className="glass-glass-glass-flex-1 glass-glass-glass-min-glass-glass-w-0">
                  <p className="glass-glass-glass-text-sm glass-glass-glass-font-medium">{item?.action}</p>
                  {item?.user && (
                    <p className="glass-glass-glass-text-xs glass-text-secondary">by {item?.user}</p>
                  )}
                  {item?.details && (
                    <p className="glass-glass-glass-text-xs glass-text-secondary glass-mt-1">{item?.details}</p>
                  )}
                </div>
                <time className="glass-glass-glass-text-xs glass-text-secondary">{item?.timestamp}</time>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
}
