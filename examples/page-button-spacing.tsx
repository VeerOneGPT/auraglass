/**
 * Page Button Spacing Examples
 * Shows proper glassmorphism spacing for intelligence page button sections
 */

import React from 'react';
import { GlassButton } from '../src/components/button/GlassButton';
import { OptimizedGlass } from '../src/primitives/glass/OptimizedGlass';
import { GlassCard } from '../src/components/card/GlassCard';

// Trending Intelligence Page Example
export function TrendingIntelligencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 glass-p-6">
      {/* Header Section */}
      <div className="glass-container glass-container-7xl glass-mb-8">
        <OptimizedGlass
          elevation="level2"
          className="glass-p-8 glass-radius-2xl glass-mb-6"
        >
          <h1 className="glass-text-4xl glass-font-bold glass-text-balance glass-mb-4 text-white">
            Trending Intelligence
          </h1>
          <p className="glass-text-lg text-white/80">
            Real-time tracking of viral stories, emerging topics, and momentum shifts
          </p>
          
          {/* Filter buttons with timeframes */}
          <div className="flex items-center gap-4 glass-mt-6">
            <span className="glass-text-sm text-white/70">Timeframe:</span>
            <div className="flex gap-2">
              <GlassButton variant="ghost" size="sm">1h</GlassButton>
              <GlassButton variant="primary" size="sm">24h</GlassButton>
              <GlassButton variant="ghost" size="sm">7d</GlassButton>
              <GlassButton variant="ghost" size="sm">30d</GlassButton>
            </div>
          </div>
        </OptimizedGlass>

        {/* Navigation Buttons Section - ADDED PADDING HERE */}
        <div className="glass-mt-8 glass-mb-6">
          <OptimizedGlass
            elevation="level1"
            className="glass-p-6 glass-radius-xl"
          >
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <GlassButton 
                variant="outline" 
                size="md"
                leftIcon="📈"
                className="glass-touch-target-lg"
              >
                Trending Stories
              </GlassButton>
              <GlassButton 
                variant="outline" 
                size="md"
                leftIcon="🔥"
                className="glass-touch-target-lg"
              >
                Hot Topics
              </GlassButton>
              <GlassButton 
                variant="outline" 
                size="md"
                leftIcon="⭐"
                className="glass-touch-target-lg"
              >
                Rising Entities
              </GlassButton>
              <GlassButton 
                variant="outline" 
                size="md"
                leftIcon="🌐"
                className="glass-touch-target-lg"
              >
                Story Clusters
              </GlassButton>
            </div>
          </OptimizedGlass>
        </div>
      </div>

      {/* Content Area */}
      <div className="glass-container glass-container-7xl">
        <GlassCard className="glass-p-6">
          <div className="text-center text-white/60 glass-p-12">
            <p>Content area would appear here...</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// Latest Intelligence Page Example  
export function LatestIntelligencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 glass-p-6">
      {/* Header Section */}
      <div className="glass-container glass-container-7xl glass-mb-8">
        <OptimizedGlass
          elevation="level2"
          className="glass-p-8 glass-radius-2xl glass-mb-6"
        >
          <h1 className="glass-text-4xl glass-font-bold glass-text-balance glass-mb-4 text-white">
            Latest Intelligence
          </h1>
          <p className="glass-text-lg text-white/80">
            Real-time news across AI, markets, geopolitics, and emerging technologies
          </p>
          
          {/* Time filter buttons */}
          <div className="flex items-center gap-4 glass-mt-6">
            <div className="flex gap-2">
              <GlassButton variant="ghost" size="sm">1h</GlassButton>
              <GlassButton variant="primary" size="sm">24h</GlassButton>
              <GlassButton variant="ghost" size="sm">7 days</GlassButton>
              <GlassButton variant="ghost" size="sm">30 days</GlassButton>
              <GlassButton variant="ghost" size="sm">All</GlassButton>
            </div>
          </div>
        </OptimizedGlass>

        {/* Filter Buttons Section - ADDED PADDING HERE */}
        <div className="glass-mt-8 glass-mb-6">
          <OptimizedGlass
            elevation="level1"
            className="glass-p-6 glass-radius-xl"
          >
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <span className="glass-text-sm text-white/70 glass-mr-2">Filter by:</span>
              <GlassButton variant="primary" size="sm">All Categories</GlassButton>
              <GlassButton variant="outline" size="sm">AI</GlassButton>
              <GlassButton variant="outline" size="sm">MARKETS</GlassButton>
              <GlassButton variant="outline" size="sm">CLIMATE</GlassButton>
              <GlassButton variant="outline" size="sm">GEOPOLITICS</GlassButton>
              <GlassButton variant="outline" size="sm">HEALTH</GlassButton>
            </div>
          </OptimizedGlass>
        </div>
      </div>

      {/* Content Area */}
      <div className="glass-container glass-container-7xl">
        <GlassCard className="glass-p-6">
          <div className="text-center text-white/60 glass-p-12">
            <p>Latest articles and content would appear here...</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// Compact Button Group Component for Reuse
export function GlassButtonGroup({ 
  buttons, 
  className = '',
  paddingTop = 'glass-mt-8',
  paddingBottom = 'glass-mb-6'
}: {
  buttons: Array<{ label: string; icon?: string; variant?: 'primary' | 'outline' | 'ghost'; active?: boolean }>;
  className?: string;
  paddingTop?: string;
  paddingBottom?: string;
}) {
  return (
    <div className={`${paddingTop} ${paddingBottom} ${className}`}>
      <OptimizedGlass
        elevation="level1"
        className="glass-p-6 glass-radius-xl"
      >
        <div className="flex flex-wrap items-center gap-3 justify-center">
          {buttons.map((button, index) => (
            <GlassButton 
              key={index}
              variant={button.active ? 'primary' : (button.variant || 'outline')} 
              size="sm"
              leftIcon={button.icon}
              className="glass-touch-target"
            >
              {button.label}
            </GlassButton>
          ))}
        </div>
      </OptimizedGlass>
    </div>
  );
}
