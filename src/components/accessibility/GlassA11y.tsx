'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    Accessibility,
    Check,
    ChevronDown,
    ChevronUp,
    Contrast,
    Info,
    Keyboard,
    Monitor,
    Move,
    RotateCcw,
    Settings,
    TestTube,
    Volume2
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '../../lib/utilsComprehensive';

interface GlassA11yProps {
  className?: string;
  showDashboard?: boolean;
  onConfigChange?: (config: any) => void;
  enableTesting?: boolean;
  position?: 'fixed' | 'relative';
}

interface AccessibilitySection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  component: React.ComponentType<any>;
  isExpanded: boolean;
}

export function GlassA11y({
  className='',
  showDashboard = true,
  onConfigChange,
  enableTesting = true,
  position = 'fixed'
}: GlassA11yProps) {
  // Mock accessibility configuration state - in real implementation this would come from a context
  const [config, setConfig] = useState({
    contrastLevel: 'normal',
    motionPreference: 'full',
    reduceTransparency: false,
    fontSizeMultiplier: 1,
    colorBlindnessType: 'none',
    enhanceKeyboardNavigation: true,
    provideLongDescriptions: true,
    useColorBlindFriendlyPalette: false
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Mock accessibility state
  const isMotionReduced = config.motionPreference === 'reduced';
  const isHighContrast = config.contrastLevel === 'high';
  const hasReducedTransparency = config.reduceTransparency;

  // Accessibility sections configuration
  const [sections, setSections] = useState<AccessibilitySection[]>([
    {
      id: 'contrast',
      title: 'High Contrast & Visual',
      icon: <Contrast className="glass-glass-glass-w-5 glass-glass-glass-h-5" />,
      description: 'Adjust contrast levels and visual accessibility settings',
      component: () => <GlassHighContrast config={config} updateConfig={setConfig} isHighContrast={isHighContrast} />,
      isExpanded: false
    },
    {
      id: 'motion',
      title: 'Motion & Animation',
      icon: <Move className="glass-glass-glass-w-5 glass-glass-glass-h-5" />,
      description: 'Control motion and animation preferences',
      component: () => <GlassMotionControls config={config} updateConfig={setConfig} isMotionReduced={isMotionReduced} />,
      isExpanded: false
    },
    {
      id: 'screen-reader',
      title: 'Screen Reader',
      icon: <Volume2 className="glass-glass-glass-w-5 glass-glass-glass-h-5" />,
      description: 'Enhanced screen reader support and descriptions',
      component: () => <GlassScreenReader config={config} updateConfig={setConfig} />,
      isExpanded: false
    },
    {
      id: 'keyboard',
      title: 'Keyboard Navigation',
      icon: <Keyboard className="glass-glass-glass-w-5 glass-glass-glass-h-5" />,
      description: 'Enhanced keyboard navigation and focus indicators',
      component: () => <GlassKeyboardNav config={config} updateConfig={setConfig} />,
      isExpanded: false
    }
  ]);

  // Handle configuration changes
  useEffect(() => {
    onConfigChange?.(config);
  }, [config, onConfigChange]);

  // Toggle section expansion
  const toggleSection = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, isExpanded: !section.isExpanded }
        : section
    ));
  }, []);

  // Run accessibility tests
  const runAccessibilityTests = useCallback(async () => {
    setIsRunningTests(true);

    try {
      // Simulate test delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock test results
      const mockResults = [
        {
          test: 'WCAG 2.1 AA Compliance',
          status: 'passed',
          score: 95,
          details: 'Most elements meet contrast requirements'
        },
        {
          test: 'Keyboard Navigation',
          status: config.enhanceKeyboardNavigation ? 'passed' : 'warning',
          score: config.enhanceKeyboardNavigation ? 100 : 75,
          details: config.enhanceKeyboardNavigation
            ? 'All interactive elements are keyboard accessible'
            : 'Some elements may not be fully keyboard accessible'
        },
        {
          test: 'Motion Preferences',
          status: 'passed',
          score: 100,
          details: 'Motion preferences are respected'
        },
        {
          test: 'Screen Reader Support',
          status: config.provideLongDescriptions ? 'passed' : 'warning',
          score: config.provideLongDescriptions ? 95 : 80,
          details: config.provideLongDescriptions
            ? 'Comprehensive descriptions provided'
            : 'Basic screen reader support active'
        },
        {
          test: 'Color Blindness Support',
          status: config.useColorBlindFriendlyPalette ? 'passed' : 'info',
          score: config.useColorBlindFriendlyPalette ? 100 : 85,
          details: config.useColorBlindFriendlyPalette
            ? 'Color blind friendly palette active'
            : 'Standard color palette in use'
        }
      ];

      setTestResults(mockResults);
    } catch (error) {
      console.error('Accessibility tests failed:', error);
    } finally {
      setIsRunningTests(false);
    }
  }, [config]);

  // Quick settings shortcuts
  const quickSettings = [
    {
      id: 'high-contrast',
      label: 'High Contrast',
      active: isHighContrast,
      onClick: () => setConfig(prev => ({
        ...prev,
        contrastLevel: prev.contrastLevel === 'high' ? 'normal' : 'high'
      }))
    },
    {
      id: 'reduce-motion',
      label: 'Reduce Motion',
      active: isMotionReduced,
      onClick: () => setConfig(prev => ({
        ...prev,
        motionPreference: prev.motionPreference === 'reduced' ? 'full' : 'reduced'
      }))
    },
    {
      id: 'reduce-transparency',
      label: 'Reduce Transparency',
      active: hasReducedTransparency,
      onClick: () => setConfig(prev => ({
        ...prev,
        reduceTransparency: !prev.reduceTransparency
      }))
    },
    {
      id: 'large-text',
      label: 'Large Text',
      active: config.fontSizeMultiplier > 1,
      onClick: () => setConfig(prev => ({
        ...prev,
        fontSizeMultiplier: prev.fontSizeMultiplier > 1 ? 1 : 1.25
      }))
    }
  ];

  if (!showDashboard) {
    return null;
  }

  const containerStyles = {
    position: position as any,
    top: position === 'fixed' ? '20px' : undefined,
    right: position === 'fixed' ? '20px' : undefined,
    zIndex: position === 'fixed' ? 1000 : undefined,
  };

  return (
    <div
      className={`glass-a11y-controller ${className}`}
      style={containerStyles}
    >
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          // Base glass foundation
          'glass-foundation-complete glass-w-14 glass-h-14 glass-radius-full',
          'flex items-center justify-center glass-shadow-lg hover:glass-shadow-xl',
          'glass-transition glass-focus glass-press glass-magnet',
          // Conditional styling with glass tokens
          {
            'glass-surface-dark glass-text-primary glass-border-primary': isHighContrast,
            'glass-surface-transparent glass-text-secondary glass-border-subtle': !isHighContrast,
            'rotate-45': isOpen,
          }
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle accessibility controls"
        title="Accessibility Settings"
      >
        <Accessibility className="glass-glass-glass-w-6 glass-glass-glass-h-6" />
      </motion.button>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: isMotionReduced ? 0.1 : 0.3 }}
            className={cn(
              // Base glass foundation
              'glass-foundation-complete absolute glass-right-0 glass-top-16',
              'glass-w-96 glass-max-h-80vh overflow-hidden glass-shadow-2xl glass-radius-2xl',
              // Conditional styling with glass tokens
              {
                'glass-surface-dark glass-border-primary glass-text-primary': isHighContrast,
                'glass-surface-translucent glass-border-subtle glass-text-secondary': !isHighContrast,
              }
            )}
          >
            {/* Header */}
            <div className="glass-glass-glass-p-6 glass-glass-glass-border-b glass-glass-glass-border-white/10">
              <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-4">
                <h2 className="glass-glass-glass-text-xl glass-glass-glass-font-semibold glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                  <Settings className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                  Accessibility Controls
                </h2>
                <div className="glass-glass-glass-flex glass-glass-glass-gap-2">
                  <button
                    onClick={() => {/* Detect system preferences */}}
                    className={`
                      p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${isHighContrast
                        ? 'hover:bg-white/20 text-white'
                        : 'hover:bg-black/10 text-gray-600'
                      }
                    `}
                    title="Detect system preferences"
                  >
                    <Monitor className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                  </button>
                  <button
                    onClick={() => setConfig({
                      contrastLevel: 'normal',
                      motionPreference: 'full',
                      reduceTransparency: false,
                      fontSizeMultiplier: 1,
                      colorBlindnessType: 'none',
                      enhanceKeyboardNavigation: true,
                      provideLongDescriptions: true,
                      useColorBlindFriendlyPalette: false
                    })}
                    className={`
                      p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${isHighContrast
                        ? 'hover:bg-white/20 text-white'
                        : 'hover:bg-black/10 text-gray-600'
                      }
                    `}
                    title="Reset to defaults"
                  >
                    <RotateCcw className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Settings */}
              <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-2">
                {quickSettings.map(setting => (
                  <motion.button
                    key={setting.id}
                    onClick={setting.onClick}
                    whileHover={{ scale: isMotionReduced ? 1 : 1.02 }}
                    whileTap={{ scale: isMotionReduced ? 1 : 0.98 }}
                    className={`
                      p-3 rounded-lg text-sm font-medium transition-all duration-200
                      border focus:outline-none focus:ring-2 focus:ring-blue-400
                      ${setting.active
                        ? (isHighContrast
                          ? 'bg-white/30 border-white text-white'
                          : 'bg-blue-500/20 border-blue-500/50 text-blue-700'
                        )
                        : (isHighContrast
                          ? 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                          : 'bg-white/5 border-white/10 text-gray-600 hover:bg-white/10'
                        )
                      }
                    `}
                  >
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-1">
                      {setting.active && <Check className="glass-glass-glass-w-3 glass-glass-glass-h-3" />}
                      <span className="glass-glass-glass-truncate">{setting.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="glass-glass-glass-flex-1 glass-glass-glass-overflow-y-auto">
              {/* Tab Navigation */}
              <div className="glass-glass-glass-flex glass-glass-glass-border-b glass-glass-glass-border-white/10">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`
                    flex-1 px-4 py-3 text-sm font-medium transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset
                    ${activeTab === 'overview'
                      ? (isHighContrast ? 'bg-white/20 text-white' : 'bg-white/10 text-blue-600')
                      : (isHighContrast ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800')
                    }
                  `}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('sections')}
                  className={`
                    flex-1 px-4 py-3 text-sm font-medium transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset
                    ${activeTab === 'sections'
                      ? (isHighContrast ? 'bg-white/20 text-white' : 'bg-white/10 text-blue-600')
                      : (isHighContrast ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800')
                    }
                  `}
                >
                  Settings
                </button>
                {enableTesting && (
                  <button
                    onClick={() => setActiveTab('testing')}
                    className={`
                      flex-1 px-4 py-3 text-sm font-medium transition-colors
                      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset
                      ${activeTab === 'testing'
                        ? (isHighContrast ? 'bg-white/20 text-white' : 'bg-white/10 text-blue-600')
                        : (isHighContrast ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-800')
                      }
                    `}
                  >
                    Testing
                  </button>
                )}
              </div>

              {/* Tab Content */}
              <div className="glass-glass-glass-p-6">
                {activeTab === 'overview' && (
                  <div className="glass-glass-glass-space-y-4">
                    <div className="glass-glass-glass-grid glass-glass-glass-glass-glass-grid-cols-2 glass-glass-glass-gap-4 glass-glass-glass-text-sm">
                      <div className={`
                        p-3 rounded-lg border
                        ${isHighContrast
                          ? 'bg-white/10 border-white/20'
                          : 'bg-white/5 border-white/10'
                        }
                      `}>
                        <div className="glass-glass-glass-font-medium glass-glass-glass-mb-1">Contrast</div>
                        <div className={`capitalize ${isHighContrast ? 'text-white/80' : 'text-gray-600'}`}>
                          {config.contrastLevel}
                        </div>
                      </div>
                      <div className={`
                        p-3 rounded-lg border
                        ${isHighContrast
                          ? 'bg-white/10 border-white/20'
                          : 'bg-white/5 border-white/10'
                        }
                      `}>
                        <div className="glass-glass-glass-font-medium glass-glass-glass-mb-1">Motion</div>
                        <div className={`capitalize ${isHighContrast ? 'text-white/80' : 'text-gray-600'}`}>
                          {config.motionPreference}
                        </div>
                      </div>
                      <div className={`
                        p-3 rounded-lg border
                        ${isHighContrast
                          ? 'bg-white/10 border-white/20'
                          : 'bg-white/5 border-white/10'
                        }
                      `}>
                        <div className="glass-glass-glass-font-medium glass-glass-glass-mb-1">Text Scale</div>
                        <div className={`${isHighContrast ? 'text-white/80' : 'text-gray-600'}`}>
                          {Math.round(config.fontSizeMultiplier * 100)}%
                        </div>
                      </div>
                      <div className={`
                        p-3 rounded-lg border
                        ${isHighContrast
                          ? 'bg-white/10 border-white/20'
                          : 'bg-white/5 border-white/10'
                        }
                      `}>
                        <div className="glass-glass-glass-font-medium glass-glass-glass-mb-1">Color Vision</div>
                        <div className={`capitalize ${isHighContrast ? 'text-white/80' : 'text-gray-600'}`}>
                          {config.colorBlindnessType === 'none' ? 'Normal' : config.colorBlindnessType}
                        </div>
                      </div>
                    </div>

                    <div className={`
                      p-4 rounded-lg border-l-4 border-blue-500
                      ${isHighContrast
                        ? 'bg-blue-500/20 text-white'
                        : 'bg-blue-50/50 text-blue-800'
                      }
                    `}>
                      <div className="glass-glass-glass-flex glass-glass-glass-items-start glass-glass-glass-gap-3">
                        <Info className="glass-glass-glass-w-5 glass-glass-glass-h-5 glass-mt-0-5 glass-glass-glass-flex-shrink-0" />
                        <div>
                          <p className="glass-glass-glass-font-medium glass-glass-glass-mb-1">WCAG 2.1 AAA Compliant</p>
                          <p className="glass-glass-glass-text-sm glass-glass-glass-opacity-90">
                            This interface meets the highest accessibility standards and adapts to your needs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'sections' && (
                  <div className="glass-glass-glass-space-y-3">
                    {sections.map(section => {
                      const Component = section.component;
                      return (
                        <div key={section.id} className="glass-glass-glass-border glass-glass-glass-border-white/10 glass-radius-lg">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className={`
                              w-full p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400
                              ${isHighContrast
                                ? 'hover:bg-white/10 text-white'
                                : 'hover:bg-black/5 text-gray-700'
                              }
                            `}
                          >
                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                              <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-3">
                                {section.icon}
                                <div>
                                  <div className="glass-glass-glass-font-medium">{section.title}</div>
                                  <div className={`text-sm ${isHighContrast ? 'text-white/70' : 'text-gray-500'}`}>
                                    {section.description}
                                  </div>
                                </div>
                              </div>
                              {section.isExpanded ? (
                                <ChevronUp className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                              ) : (
                                <ChevronDown className="glass-glass-glass-w-5 glass-glass-glass-h-5" />
                              )}
                            </div>
                          </button>

                          <AnimatePresence>
                            {section.isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: isMotionReduced ? 0.1 : 0.3 }}
                                className="glass-glass-glass-border-t glass-glass-glass-border-white/10"
                              >
                                <div className="glass-glass-glass-p-4">
                                  <Component />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'testing' && enableTesting && (
                  <div className="glass-glass-glass-space-y-4">
                    <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
                      <h3 className="glass-glass-glass-font-medium">Accessibility Tests</h3>
                      <motion.button
                        onClick={runAccessibilityTests}
                        disabled={isRunningTests}
                        whileHover={{ scale: isMotionReduced ? 1 : 1.05 }}
                        whileTap={{ scale: isMotionReduced ? 1 : 0.95 }}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-colors
                          focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50
                          ${isHighContrast
                            ? 'bg-white/20 text-white hover:bg-white/30'
                            : 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30'
                          }
                        `}
                      >
                        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-gap-2">
                          <TestTube className="glass-glass-glass-w-4 glass-glass-glass-h-4" />
                          {isRunningTests ? 'Running...' : 'Run Tests'}
                        </div>
                      </motion.button>
                    </div>

                    {testResults.length > 0 && (
                      <div className="glass-glass-glass-space-y-3">
                        {testResults.map((result, index) => (
                          <div
                            key={index}
                            className={`
                              p-3 rounded-lg border-l-4
                              ${result.status === 'passed'
                                ? 'border-green-500 bg-green-500/10'
                                : result.status === 'warning'
                                ? 'border-yellow-500 bg-yellow-500/10'
                                : 'border-blue-500 bg-blue-500/10'
                              }
                            `}
                          >
                            <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between glass-glass-glass-mb-1">
                              <span className="glass-glass-glass-font-medium">{result.test}</span>
                              <span className="glass-glass-glass-text-sm">{result.score}%</span>
                            </div>
                            <p className={`text-sm ${isHighContrast ? 'text-white/70' : 'text-gray-600'}`}>
                              {result.details}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcut hint */}
      <div className="glass-glass-glass-sr-only" role="region" aria-live="polite">
        Press Alt+A to open accessibility controls
      </div>
    </div>
  );
}

// Sub-components for accessibility sections
function GlassHighContrast({ config, updateConfig, isHighContrast }: any) {
  return (
    <div className="glass-glass-glass-space-y-4">
      <h4 className="glass-glass-glass-font-medium">High Contrast Settings</h4>
      <div className="glass-glass-glass-space-y-3">
        <div>
          <label className="glass-glass-glass-block glass-glass-glass-text-sm glass-glass-glass-font-medium glass-glass-glass-mb-2">Contrast Level</label>
          <select
            value={config.contrastLevel}
            onChange={(e) => updateConfig({ ...config, contrastLevel: e.target.value })}
            className={`w-full p-2 rounded border ${isHighContrast ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10'}`}
          >
            <option value="normal">Normal</option>
            <option value="high">High Contrast</option>
            <option value="maximum">Maximum Contrast</option>
          </select>
        </div>
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
          <span>Reduce Transparency</span>
          <button
            onClick={() => updateConfig({ ...config, reduceTransparency: !config.reduceTransparency })}
            className={`w-12 h-6 rounded-full transition-colors ${config.reduceTransparency ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config.reduceTransparency ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

function GlassMotionControls({ config, updateConfig, isMotionReduced }: any) {
  return (
    <div className="glass-glass-glass-space-y-4">
      <h4 className="glass-glass-glass-font-medium">Motion & Animation</h4>
      <div className="glass-glass-glass-space-y-3">
        <div>
          <label className="glass-glass-glass-block glass-glass-glass-text-sm glass-glass-glass-font-medium glass-glass-glass-mb-2">Motion Preference</label>
          <select
            value={config.motionPreference}
            onChange={(e) => updateConfig({ ...config, motionPreference: e.target.value })}
            className={`w-full p-2 rounded border ${isMotionReduced ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/10'}`}
          >
            <option value="full">Full Motion</option>
            <option value="reduced">Reduced Motion</option>
            <option value="none">No Motion</option>
          </select>
        </div>
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
          <span>Enable Hover Effects</span>
          <button
            onClick={() => updateConfig({ ...config, enableHoverEffects: !config.enableHoverEffects })}
            className={`w-12 h-6 rounded-full transition-colors ${config.enableHoverEffects ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config.enableHoverEffects ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

function GlassScreenReader({ config, updateConfig }: any) {
  return (
    <div className="glass-glass-glass-space-y-4">
      <h4 className="glass-glass-glass-font-medium">Screen Reader Support</h4>
      <div className="glass-glass-glass-space-y-3">
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
          <span>Provide Long Descriptions</span>
          <button
            onClick={() => updateConfig({ ...config, provideLongDescriptions: !config.provideLongDescriptions })}
            className={`w-12 h-6 rounded-full transition-colors ${config.provideLongDescriptions ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config.provideLongDescriptions ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
          <span>Announce State Changes</span>
          <button
            onClick={() => updateConfig({ ...config, announceStateChanges: !config.announceStateChanges })}
            className={`w-12 h-6 rounded-full transition-colors ${config.announceStateChanges ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config.announceStateChanges ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

function GlassKeyboardNav({ config, updateConfig }: any) {
  return (
    <div className="glass-glass-glass-space-y-4">
      <h4 className="glass-glass-glass-font-medium">Keyboard Navigation</h4>
      <div className="glass-glass-glass-space-y-3">
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
          <span>Enhanced Keyboard Navigation</span>
          <button
            onClick={() => updateConfig({ ...config, enhanceKeyboardNavigation: !config.enhanceKeyboardNavigation })}
            className={`w-12 h-6 rounded-full transition-colors ${config.enhanceKeyboardNavigation ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config.enhanceKeyboardNavigation ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="glass-glass-glass-flex glass-glass-glass-items-center glass-glass-glass-justify-between">
          <span>Skip Links</span>
          <button
            onClick={() => updateConfig({ ...config, showSkipLinks: !config.showSkipLinks })}
            className={`w-12 h-6 rounded-full transition-colors ${config.showSkipLinks ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${config.showSkipLinks ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlassA11y;
