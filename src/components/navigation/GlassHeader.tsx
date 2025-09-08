'use client';

import { GlassButton } from '@/design-system';

import { cn } from '@/lib/utils';
import React, { forwardRef, useRef, useState } from 'react';
import { FocusTrap } from '../../primitives/focus/FocusTrap';
import { OptimizedGlass } from '../../primitives/glass/OptimizedGlass';
import { Motion } from '../../primitives/motion/Motion';
import { IconButton } from '../button/GlassButton';
import { GlassInput } from '../input/GlassInput';

export interface HeaderAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface UserMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface GlassHeaderProps {
  /**
   * Header variant
   */
  variant?: 'default' | 'floating' | 'sticky' | 'transparent';
  /**
   * Header size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Left content (logo, brand)
   */
  logo?: React.ReactNode;
  /**
   * Navigation items
   */
  navigation?: React.ReactNode;
  /**
   * Header actions
   */
  actions?: HeaderAction[];
  /**
   * Search configuration
   */
  search?: {
    placeholder?: string;
    onSearch?: (query: string) => void;
    suggestions?: string[];
  };
  /**
   * User menu configuration
   */
  userMenu?: {
    user: {
      name: string;
      email?: string;
      avatar?: string;
      status?: 'online' | 'away' | 'busy' | 'offline';
    };
    items: UserMenuItem[];
  };
  /**
   * Mobile menu toggle
   */
  mobileMenuOpen?: boolean;
  /**
   * Mobile menu toggle callback
   */
  onMobileMenuToggle?: () => void;
  /**
   * Breadcrumbs
   */
  breadcrumbs?: React.ReactNode;
  /**
   * Custom content
   */
  children?: React.ReactNode;
  className?: string;
}

/**
 * GlassHeader component
 * A glassmorphism header with navigation, search, and user menu
 */
export const GlassHeader = forwardRef<HTMLDivElement, GlassHeaderProps>(
  (
    {
      variant = 'default',
      size = 'md',
      logo,
      navigation,
      actions = [],
      search,
      userMenu,
      mobileMenuOpen = false,
      onMobileMenuToggle,
      breadcrumbs,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const sizeClasses = {
      sm: 'h-12 px-4',
      md: 'h-16 px-6',
      lg: 'h-20 px-8',
    };

    const variantClasses = {
      default: 'border-b border-border/20',
      floating: 'border border-border/20 rounded-lg mx-4 mt-4',
      sticky: 'border-b border-border/30 sticky top-0 z-40',
      transparent: 'bg-transparent',
    };

    return (
      <OptimizedGlass
        ref={ref}
        variant="primary"
        elevation={variant === 'transparent' ? 0 : variant === 'floating' ? 2 : 1}
        intensity="medium"
        depth={2}
        tint="lavender"
        border={variant === 'floating' ? 'gradient' : 'subtle'}
        animation="none"
        performanceMode="medium"
        // Allow dropdowns/popovers to escape header bounds
        style={{ overflow: 'visible' }}
        className={cn(
          'w-full flex items-center justify-between',
          'transition-all duration-200',
          sizeClasses[size],
          variantClasses[variant],
          variant === 'floating' ? 'squiricle' : '',
          className
        )}
        {...props}
      >
        {/* Removed extra color overlay to follow global background */}
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          {onMobileMenuToggle && (
            <IconButton
              icon={
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className={cn(
                    'h-0.5 bg-current transition-all duration-200',
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'w-5'
                  )} />
                  <div className={cn(
                    'h-0.5 bg-current transition-all duration-200',
                    mobileMenuOpen ? 'opacity-0' : 'w-5'
                  )} />
                  <div className={cn(
                    'h-0.5 bg-current transition-all duration-200',
                    mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'w-5'
                  )} />
                </div>
              }
              variant="ghost"
              size="sm"
              onClick={onMobileMenuToggle}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden"
            />
          )}

          {/* Logo */}
          {logo && (
            <div className="flex-shrink-0">
              {logo}
            </div>
          )}

          {/* Navigation */}
          {navigation && (
            <nav className="hidden md:block">
              {navigation}
            </nav>
          )}
        </div>

        {/* Center section */}
        <div className="flex-1 flex justify-center px-4">
          {search && (
            <div className="relative w-full max-w-md">
              <GlassInput
                placeholder={search.placeholder || 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                clearable
                onClear={() => setSearchQuery('')}
                className="w-full"
              />

              {/* Search suggestions */}
              {isSearchFocused && search.suggestions && search.suggestions.length > 0 && (
                <Motion preset="slideDown" className="absolute top-full left-0 right-0 mt-1 z-[1000]">
                  <OptimizedGlass
                    variant="frosted"
                    elevation={4}
                    intensity="strong"
                    depth={2}
                    tint="neutral"
                    border="subtle"
                    animation="none"
                    performanceMode="high"
                    className="max-h-60 overflow-y-auto"
                    style={{
                      borderRadius: 'var(--popover-radius, 24px)',
                      background: 'linear-gradient(180deg, rgba(9,14,24, var(--popover-glass-opacity, 0.90)), rgba(11,18,30, var(--popover-glass-opacity-2, 0.94)))',
                      backdropFilter: 'blur(var(--popover-blur, 20px)) saturate(var(--popover-saturate, 140%)) brightness(var(--popover-brightness, 1.05))',
                      WebkitBackdropFilter: 'blur(var(--popover-blur, 20px)) saturate(var(--popover-saturate, 140%)) brightness(var(--popover-brightness, 1.05))',
                      borderColor: 'rgba(255, 255, 255, 0.10)'
                    }}
                  >
                    <div className="p-3">
                      {search.suggestions.map((suggestion, index) => (
                        <GlassButton
                          key={index}
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors mb-2 last:mb-0"
                          onClick={() => {
                            setSearchQuery(suggestion);
                            search.onSearch?.(suggestion);
                          }}
                        >
                          {suggestion}
                        </GlassButton>
                      ))}
                    </div>
                  </OptimizedGlass>
                </Motion>
              )}
            </div>
          )}

          {/* Breadcrumbs */}
          {breadcrumbs && !search && (
            <div className="flex items-center">
              {breadcrumbs}
            </div>
          )}

          {/* Custom content */}
          {children && !search && !breadcrumbs && (
            <div className="flex items-center">
              {children}
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {/* Actions */}
          {(actions || []).map((action) => (
            <NotificationButton key={action.id} action={action} />
          ))}

          {/* User Menu */}
          {userMenu && <UserMenu {...userMenu} />}
        </div>
      </OptimizedGlass>
    );
  }
);

GlassHeader.displayName = 'GlassHeader';

/**
 * NotificationButton component
 */
interface NotificationButtonProps {
  action: HeaderAction;
}

function NotificationButton({ action }: NotificationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape for accessibility and convenience
  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <div className="relative">
      <GlassButton
        variant="ghost"
        flat
        onClick={() => {
          setIsOpen(!isOpen);
          action.onClick?.();
        }}
        disabled={action.disabled}
        className={cn(
          "relative p-2 rounded-md transition-colors",
          "hover:bg-white/10 focus:outline-none",
          action.disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-label={action.label}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {action.icon}
        </div>
        {action.badge && (
          <span className="absolute top-0 right-0 z-20 pointer-events-none bg-red-500 text-white text-[10px] rounded-full min-w-4 h-4 flex items-center justify-center px-1 font-semibold shadow-md">
            {action.badge}
          </span>
        )}
      </GlassButton>

      {/* Notification Dropdown */}
      {isOpen && action.id === 'notifications' && (
        <Motion preset="slideDown" className="absolute top-full right-0 mt-2 z-[1000]">
          <OptimizedGlass
          variant="frosted"
          elevation={4}
          intensity="strong"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
            className="w-80 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(17,24,39,0.45)]"
            style={{
              // Increase opacity/darken for readability (blue-leaning neutral)
              borderRadius: 'var(--popover-radius, 24px)',
              background:
                'linear-gradient(180deg, rgba(10,16,28, 0.88), rgba(10,16,28, 0.92)), ' +
                'radial-gradient(72% 54% at 8% 0%, rgba(99,102,241, 0.04) 0%, rgba(99,102,241, 0) 60%), ' +
                'radial-gradient(72% 54% at 92% 8%, rgba(167,139,250, 0.035) 0%, rgba(167,139,250, 0) 60%)',
              backdropFilter: 'blur(var(--popover-blur, 18px)) saturate(var(--popover-saturate, 130%)) brightness(1.02)',
              WebkitBackdropFilter: 'blur(var(--popover-blur, 18px)) saturate(var(--popover-saturate, 130%)) brightness(1.02)',
              borderColor: 'rgba(255, 255, 255, 0.12)'
            }}
          >
            <div className="p-4">
              <h3 className="font-semibold text-white mb-3 flex items-center justify-between">
                Notifications
                <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">3</span>
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <div className="p-3 bg-white/8 border border-white/15 transition-colors cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" style={{ borderRadius: 'var(--popover-item-radius, 18px)' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-white font-medium">New evaluation completed</p>
                      <p className="text-xs text-blue-300 mt-1">Customer Support QA Template</p>
                    </div>
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2"></span>
                  </div>
                  <p className="text-xs text-white/70 mt-2">2 minutes ago</p>
                </div>
                <div className="p-3 bg-white/8 border border-white/15 transition-colors cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" style={{ borderRadius: 'var(--popover-item-radius, 18px)' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-white font-medium">Model comparison ready</p>
                      <p className="text-xs text-green-300 mt-1">GPT-4 vs Claude-3.5 Sonnet</p>
                    </div>
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                  </div>
                  <p className="text-xs text-white/70 mt-2">15 minutes ago</p>
                </div>
                <div className="p-3 bg-white/8 border border-white/15 transition-colors cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" style={{ borderRadius: 'var(--popover-item-radius, 18px)' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-white font-medium">Team member joined</p>
                      <p className="text-xs text-indigo-300 mt-1">Sarah Chen joined your organization</p>
                    </div>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></span>
                  </div>
                  <p className="text-xs text-white/70 mt-2">1 hour ago</p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-white/10">
                <GlassButton className="w-full text-sm text-blue-300 hover:text-blue-200 font-medium transition-colors bg-gradient-to-r from-white/5 to-white/0 rounded-[14px]">
                  View all notifications
                </GlassButton>
              </div>
            </div>
          </OptimizedGlass>
        </Motion>
      )}

      {/* Backdrop for closing */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

/**
 * UserMenu component
 */
interface UserMenuProps {
  user: {
    name: string;
    email?: string;
    avatar?: string;
    status?: 'online' | 'away' | 'busy' | 'offline';
  };
  items: UserMenuItem[];
}

function UserMenu({ user, items }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-500',
  };

  const handleItemClick = (item: UserMenuItem) => {
    if (item.disabled) return;

    item.onClick?.();
    setIsOpen(false);

    if (item.href) {
      window.location.href = item.href;
    }
  };

  return (
    <div className="relative">
      <GlassButton
        variant="ghost"
        flat
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-md hover:bg-white/5 active:bg-white/10 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium" suppressHydrationWarning>
                {user.name.charAt(0)}
              </span>
            </div>
          )}

          {user.status && (
            <div className={cn(
              'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background',
              statusColors[user.status]
            )} />
          )}
        </div>

        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground" suppressHydrationWarning>
            {user.name}
          </p>
          {user.email && (
            <p className="text-xs text-foreground/70" suppressHydrationWarning>
              {user.email}
            </p>
          )}
        </div>

        <svg
          className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </GlassButton>

      {/* Dropdown menu */}
      {isOpen && (
        <Motion preset="slideDown" className="absolute top-full right-0 mt-2 z-[1000]">
          <OptimizedGlass
          variant="frosted"
          elevation={4}
          intensity="strong"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
            className="w-80 p-1 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(2,8,23,0.55)]"
            style={{
              borderRadius: '24px',
              // Subtle bluish–lavender glass, no heavy purple
              background:
                'linear-gradient(180deg, rgba(10,16,28,0.70), rgba(12,18,30,0.78)), ' +
                'radial-gradient(60% 40% at 10% 0%, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0) 80%), ' +
                'radial-gradient(60% 40% at 90% 10%, rgba(167,139,250,0.06) 0%, rgba(167,139,250,0) 80%)',
              backdropFilter: 'blur(18px) saturate(140%)',
              WebkitBackdropFilter: 'blur(18px) saturate(140%)',
              borderColor: 'rgba(255,255,255,0.10)'
            }}
          >
            <FocusTrap active={isOpen} onEscape={() => setIsOpen(false)}>
              <div className="p-3">
                {/* User info header */}
                <div className="px-3 py-3 bg-gradient-to-br from-white/6 via-white/3 to-transparent border border-white/12 rounded-[18px] mb-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-400 flex items-center justify-center border-2 border-white/20">
                        <span className="text-white font-semibold" suppressHydrationWarning>
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-white text-sm" suppressHydrationWarning>
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="text-xs text-blue-300" suppressHydrationWarning>
                          {user.email}
                        </p>
                      )}
                      {user.status && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className={cn(
                            'w-2 h-2 rounded-full',
                            statusColors[user.status]
                          )} />
                          <span className="text-xs text-white/70 capitalize">{user.status}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="space-y-1">
                  {items.map((item) => (
                    <React.Fragment key={item.id}>
                      {item.divider ? (
                        <div className="my-2 border-t border-white/10" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleItemClick(item)}
                          disabled={item.disabled}
                          className={cn(
                            'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-[14px]',
                            'text-sm text-left transition-colors',
                            item.id === 'logout'
                              ? 'text-red-300 hover:bg-red-500/10'
                              : 'text-white/90 hover:text-white hover:bg-white/10',
                            item.disabled && 'opacity-50 cursor-not-allowed'
                          )}
                        >
                          <span className="inline-flex items-center gap-3 truncate">
                            {item.icon && (
                              <span className={cn('w-4 h-4 flex items-center justify-center', item.id === 'logout' ? 'text-red-400' : 'text-white/80')}>
                                {item.icon}
                              </span>
                            )}
                            <span className="truncate font-medium">{item.label}</span>
                          </span>
                          {item.id !== 'logout' && (
                            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </FocusTrap>
          </OptimizedGlass>
        </Motion>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

/**
 * HeaderBreadcrumbs component
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface HeaderBreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function HeaderBreadcrumbs({
  items,
  separator = '/',
  className
}: HeaderBreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <span className="text-muted-foreground">{separator}</span>
            )}

            {index === items.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : item.href ? (
              <a
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : item.onClick ? (
              <GlassButton
                onClick={item.onClick}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </GlassButton>
            ) : (
              <span className="text-muted-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * HeaderNavigation component
 */
export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface HeaderNavigationProps {
  items: NavItem[];
  className?: string;
}

export function HeaderNavigation({ items, className }: HeaderNavigationProps) {
  return (
    <nav className={className}>
      <ul className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <a
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  'hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  {
                    'bg-primary/10 text-primary': item.active,
                    'text-muted-foreground hover:text-foreground': !item.active,
                    'opacity-50 cursor-not-allowed': item.disabled,
                  }
                )}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </a>
            ) : (
              <GlassButton
                onClick={item.onClick}
                disabled={item.disabled}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  'hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
                  {
                    'bg-primary/10 text-primary': item.active,
                    'text-muted-foreground hover:text-foreground': !item.active,
                    'opacity-50 cursor-not-allowed': item.disabled,
                  }
                )}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </GlassButton>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
