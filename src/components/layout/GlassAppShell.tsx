'use client';

import { cn } from '@/design-system/utilsCore';
import React, { forwardRef, useEffect, useState } from 'react';
import { createGlassStyle } from '../../core/mixins/glassMixins';
import { OptimizedGlass } from '../../primitives';
import { Motion } from '../../primitives';
import { GlassContainer } from './GlassContainer';
import { VStack } from './GlassStack';

export interface GlassAppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * App shell variant
   */
  variant?: 'default' | 'floating' | 'minimal';
  /**
   * Header component
   */
  header?: React.ReactNode;
  /**
   * Sidebar component
   */
  sidebar?: React.ReactNode;
  /**
   * Footer component
   */
  footer?: React.ReactNode;
  /**
   * Whether sidebar is collapsible
   */
  collapsible?: boolean;
  /**
   * Whether sidebar is collapsed by default
   */
  defaultCollapsed?: boolean;
  /**
   * Sidebar width
   */
  sidebarWidth?: 'sm' | 'md' | 'lg';
  /**
   * Whether to show sidebar on mobile as overlay
   */
  mobileOverlay?: boolean;
  /**
   * Mobile breakpoint
   */
  mobileBreakpoint?: number;
  /**
   * Page padding
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Content max width
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /**
   * Whether content should be centered
   */
  centered?: boolean;
  /**
   * Glass elevation for main content
   */
  contentElevation?: 0 | 1 | 2 | 3 | 4;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Loading component
   */
  loadingComponent?: React.ReactNode;
  /**
   * Page transition animation
   */
  pageTransition?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  /**
   * Page title
   */
  title: string;
  /**
   * Page description
   */
  description?: string;
  /**
   * Breadcrumb navigation - can be an array of breadcrumb items or any React node
   */
  breadcrumb?: BreadcrumbItem[] | React.ReactNode;
  /**
   * Page actions
   */
  actions?: React.ReactNode;
  /**
   * Header variant
   */
  variant?: 'default' | 'centered' | 'minimal';
  className?: string;
}

export interface ContentSectionProps {
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section actions
   */
  actions?: React.ReactNode;
  /**
   * Section content
   */
  children: React.ReactNode;
  /**
   * Section variant
   */
  variant?: 'default' | 'card' | 'minimal';
  /**
   * Glass elevation (for card variant)
   */
  elevation?: 0 | 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * GlassAppShell component
 * Modern application shell with glassmorphism design
 */
export const GlassAppShell = forwardRef<HTMLDivElement, GlassAppShellProps>(
  (
    {
      variant = 'default',
      header,
      sidebar,
      footer,
      collapsible = true,
      defaultCollapsed = false,
      sidebarWidth = 'md',
      mobileOverlay = true,
      mobileBreakpoint = 1024,
      padding = 'lg',
      maxWidth = 'full',
      centered = false,
      contentElevation = 0,
      loading = false,
      loadingComponent,
      pageTransition = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);
    const [sidebarOverlay, setSidebarOverlay] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive behavior
    useEffect(() => {
      const checkScreenSize = () => {
        const mobile = window.innerWidth < mobileBreakpoint;
        setIsMobile(mobile);
        if (mobile && mobileOverlay) {
          setSidebarOverlay(false);
        }
      };

      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, [mobileBreakpoint, mobileOverlay]);

    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    };

    const maxWidthClasses = {
      sm: 'max-w-sm',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-8xl',
      full: 'max-w-full',
    };

    const variantClasses = {
      default: '',
      floating: 'p-4',
      minimal: 'bg-transparent',
    };

    // Clone sidebar with props (align with GlassSidebar API)
    const sidebarExtraProps: any = {
      collapsed: isMobile ? false : sidebarCollapsed,
      onCollapsedChange: setSidebarCollapsed,
      width: sidebarWidth,
    };
    if (isMobile && mobileOverlay) {
      sidebarExtraProps.variant = 'overlay';
      sidebarExtraProps.open = sidebarOverlay;
      sidebarExtraProps.onOpenChange = setSidebarOverlay;
    }
    const sidebarElement = sidebar ? React.cloneElement(sidebar as React.ReactElement, sidebarExtraProps) : null;

    // Clone header with props (align with GlassHeader API)
    const headerElement = header ? React.cloneElement(header as React.ReactElement, {
      mobileMenuOpen: Boolean(isMobile && mobileOverlay && sidebarOverlay),
      onMobileMenuToggle: () => setSidebarOverlay((v) => !v),
    } as any) : null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-screen overflow-hidden',
          'bg-gradient-to-br from-background via-background/95 to-surface/50',
          variantClasses?.[variant],
          className
        )}
        {...props}
      >
        {/* Sidebar */}
        {sidebarElement}

        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          {headerElement}

          {/* Main content */}
          <main className={cn(
            'flex-1 overflow-auto',
            'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/30',
            'hover:scrollbar-thumb-border/50'
          )}>
            {loading && loadingComponent ? (
              <div className="flex items-center justify-center h-full">
                {loadingComponent}
              </div>
            ) : (
              <GlassContainer
                size={maxWidth}
                centered={centered}
                padding={padding}
                glass={contentElevation > 0}
                elevation={contentElevation}
                radius={variant === 'floating' ? 'lg' : 'none'}
                className={cn(
                  'min-h-full',
                  variant === 'floating' && 'my-4'
                )}
              >
                {pageTransition ? (
                  <Motion preset="fadeIn" className="h-full">
                    {children}
                  </Motion>
                ) : (
                  children
                )}
              </GlassContainer>
            )}
          </main>

          {/* Footer */}
          {footer && (
            <footer className="flex-shrink-0 border-t border-border/20">
              {footer}
            </footer>
          )}
        </div>
      </div>
    );
  }
);

GlassAppShell.displayName = 'GlassAppShell';

/**
 * PageHeader component
 * Consistent page header with title, description, and actions
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    {
      title,
      description,
      breadcrumb,
      actions,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'text-left',
      centered: 'text-center',
      minimal: 'text-left border-none pb-4',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'space-y-4 pb-8 border-b border-border/20',
          variantClasses?.[variant],
          className
        )}
        {...props}
      >
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="text-sm text-muted-foreground">
            {Array.isArray(breadcrumb) ? (
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  {breadcrumb.map((item, index) => {
                    const isLast = index === breadcrumb.length - 1;
                    return (
                      <li key={index} className="flex items-center">
                        {index > 0 && <span className="mx-2">/</span>}
                        {item?.href && !isLast ? (
                          <a
                            href={item?.href}
                            className="hover:text-foreground transition-colors"
                          >
                            {item?.label}
                          </a>
                        ) : (
                          <span className={isLast ? 'text-foreground font-medium' : ''}>
                            {item?.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            ) : (
              breadcrumb
            )}
          </div>
        )}

        {/* Title section */}
        <div className={cn(
          'flex gap-4',
          variant === 'centered' ? 'flex-col items-center' : 'flex-col sm:flex-row sm:items-center sm:justify-between'
        )}>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {title}
            </h1>
            {description && (
              <p className={cn(
                'text-lg text-muted-foreground',
                variant === 'centered' ? 'max-w-2xl' : 'max-w-3xl'
              )}>
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';

/**
 * ContentSection component
 * Reusable content section with optional glassmorphism
 */
export const ContentSection = forwardRef<HTMLDivElement, ContentSectionProps>(
  (
    {
      title,
      description,
      actions,
      children,
      variant = 'default',
      elevation = 'level1',
      className,
      ...props
    },
    ref
  ) => {
    const content = (
      <VStack space="lg" className="w-full">
        {/* Section header */}
        {(title || description || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              {title && (
                <h2 className="text-xl font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            {actions && (
              <div className="flex-shrink-0">
                {actions}
              </div>
            )}
          </div>
        )}

        {/* Section content */}
        <div className="w-full">
          {children}
        </div>
      </VStack>
    );

    if (variant === 'card') {
      return (
        <OptimizedGlass
          variant="frosted"
          elevation={elevation}
          intensity="medium"
          depth={2}
          tint="neutral"
          border="subtle"
          animation="none"
          performanceMode="medium"
          ref={ref}
          className={cn('p-6 w-full', className)}
          {...props}
        >
          {content}
        </OptimizedGlass>
      );
    }

    return (
      <section
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {content}
      </section>
    );
  }
);

ContentSection.displayName = 'ContentSection';
