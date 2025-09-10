/**
 * AuraGlass Dashboard Example
 * Production-ready dashboard with all glass components
 */

import React from 'react';
import { GlassAdvanced } from '../src/primitives/glass/GlassAdvanced';
import { GlassErrorBoundary } from '../src/components/GlassErrorBoundary';
import { useDynamicTheme } from '../src/utils/dynamicTheme';
import { glassPerformance } from '../src/utils/performance';

export function GlassDashboard() {
  // Performance monitoring
  React.useEffect(() => {
    glassPerformance.start();
    return () => glassPerformance.stop();
  }, []);
  
  // Dynamic theming
  useDynamicTheme({
    name: 'dashboard',
    mode: 'auto',
    primary: '#3b82f6',
    blur: {
      amount: 16,
      saturate: 1.8,
      brightness: 1.1,
      contrast: 1.05,
    },
  });
  
  return (
    <GlassErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
        {/* Header */}
        <header className="glass-foundation-complete glass-elev-2 glass-p-4">
          <nav className="glass-container glass-container-7xl flex items-center justify-between">
            <h1 className="glass-text-2xl glass-font-bold glass-text-balance">
              AuraGlass Dashboard
            </h1>
            
            <div className="flex glass-gap-4">
              <button className="glass-button glass-touch-target">
                Settings
              </button>
              <button className="glass-button glass-surface-primary glass-touch-target">
                Profile
              </button>
            </div>
          </nav>
        </header>
        
        {/* Main Content */}
        <main className="glass-container glass-container-7xl glass-p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 glass-gap-6">
            {/* Stats Cards */}
            <GlassAdvanced
              elev={2}
              variant="default"
              motion="float"
              className="glass-p-6"
              data-lazy-glass
            >
              <div className="glass-stack glass-gap-2">
                <p className="glass-text-secondary glass-text-sm">Total Revenue</p>
                <p className="glass-text-3xl glass-font-bold">$124,500</p>
                <p className="glass-text-sm glass-surface-success glass-radius-sm glass-p-1 inline-block">
                  +12.5% from last month
                </p>
              </div>
            </GlassAdvanced>
            
            <GlassAdvanced
              elev={2}
              variant="default"
              motion="float"
              className="glass-p-6"
              data-lazy-glass
            >
              <div className="glass-stack glass-gap-2">
                <p className="glass-text-secondary glass-text-sm">Active Users</p>
                <p className="glass-text-3xl glass-font-bold">8,420</p>
                <p className="glass-text-sm glass-surface-info glass-radius-sm glass-p-1 inline-block">
                  +5.2% from last week
                </p>
              </div>
            </GlassAdvanced>
            
            <GlassAdvanced
              elev={2}
              variant="default"
              motion="float"
              className="glass-p-6"
              data-lazy-glass
            >
              <div className="glass-stack glass-gap-2">
                <p className="glass-text-secondary glass-text-sm">Conversion Rate</p>
                <p className="glass-text-3xl glass-font-bold">3.24%</p>
                <p className="glass-text-sm glass-surface-warning glass-radius-sm glass-p-1 inline-block">
                  -0.3% from last month
                </p>
              </div>
            </GlassAdvanced>
          </div>
          
          {/* Chart Section */}
          <GlassAdvanced
            elev={3}
            variant="default"
            className="glass-mt-6 glass-p-6"
            specular
            edge
          >
            <h2 className="glass-text-xl glass-font-semibold glass-mb-4">
              Performance Overview
            </h2>
            
            <div className="h-64 flex items-center justify-center glass-text-secondary">
              {/* Chart would go here */}
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto glass-mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <p>Chart visualization here</p>
              </div>
            </div>
          </GlassAdvanced>
          
          {/* Table Section */}
          <GlassAdvanced
            elev={2}
            variant="default"
            className="glass-mt-6 glass-p-6"
            noise
          >
            <h2 className="glass-text-xl glass-font-semibold glass-mb-4">
              Recent Transactions
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left glass-p-2 glass-text-secondary">ID</th>
                    <th className="text-left glass-p-2 glass-text-secondary">Customer</th>
                    <th className="text-left glass-p-2 glass-text-secondary">Amount</th>
                    <th className="text-left glass-p-2 glass-text-secondary">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                      <td className="glass-p-2">#000{i}</td>
                      <td className="glass-p-2">Customer {i}</td>
                      <td className="glass-p-2">${(Math.random() * 1000).toFixed(2)}</td>
                      <td className="glass-p-2">
                        <span className="glass-surface-success glass-radius-sm glass-px-2 glass-py-1 text-xs">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassAdvanced>
        </main>
        
        {/* Footer */}
        <footer className="glass-mt-12 glass-p-6 text-center glass-text-secondary">
          <p>© 2024 AuraGlass. Built with zero compromises.</p>
        </footer>
      </div>
    </GlassErrorBoundary>
  );
}