'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';


interface HoudiniGlassContextType {
  isSupported: boolean;
  hasPropertyAPI: boolean;
  hasPaintAPI: boolean;
  globalPreset: keyof typeof glassPresets;
  setGlobalPreset: (preset: keyof typeof glassPresets) => void;
  globalProperties: Record<string, string>;
  updateGlobalProperty: (property: string, value: string) => void;
  enabledEffects: string[];
  toggleEffect: (effect: string) => void;
  performanceMode: boolean;
  setPerformanceMode: (enabled: boolean) => void;
  debugMode: boolean;
  setDebugMode: (enabled: boolean) => void;
}

const HoudiniGlassContext = createContext<HoudiniGlassContextType | null>(null);

// Glass presets with CSS custom properties
export const glassPresets = {
  standard: {
    '--glass-background': 'rgba(255, 255, 255, 0.1)',
    '--glass-border': 'rgba(255, 255, 255, 0.2)',
    '--glass-blur': '20px',
    '--glass-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
    '--glass-animation-speed': '1',
    '--glass-blur-intensity': '10'
  },
  frosted: {
    '--glass-background': 'rgba(255, 255, 255, 0.15)',
    '--glass-border': 'rgba(255, 255, 255, 0.3)',
    '--glass-blur': '30px',
    '--glass-shadow': '0 12px 40px rgba(0, 0, 0, 0.15)',
    '--glass-animation-speed': '1.2',
    '--glass-blur-intensity': '15'
  },
  minimal: {
    '--glass-background': 'rgba(255, 255, 255, 0.05)',
    '--glass-border': 'rgba(255, 255, 255, 0.1)',
    '--glass-blur': '10px',
    '--glass-shadow': '0 4px 16px rgba(0, 0, 0, 0.05)',
    '--glass-animation-speed': '0.8',
    '--glass-blur-intensity': '5'
  },
  heavy: {
    '--glass-background': 'rgba(255, 255, 255, 0.25)',
    '--glass-border': 'rgba(255, 255, 255, 0.4)',
    '--glass-blur': '40px',
    '--glass-shadow': '0 16px 64px rgba(0, 0, 0, 0.2)',
    '--glass-animation-speed': '1.5',
    '--glass-blur-intensity': '20'
  },
  crystal: {
    '--glass-background': 'rgba(255, 255, 255, 0.02)',
    '--glass-border': 'rgba(255, 255, 255, 0.05)',
    '--glass-blur': '5px',
    '--glass-shadow': '0 2px 8px rgba(0, 0, 0, 0.03)',
    '--glass-animation-speed': '0.5',
    '--glass-blur-intensity': '2'
  }
} as const;

interface HoudiniGlassProviderProps {
  children: React.ReactNode;
  defaultPreset?: keyof typeof glassPresets;
  defaultProperties?: Record<string, string>;
  enabledEffects?: string[];
  performanceMode?: boolean;
  debugMode?: boolean;
}

export function HoudiniGlassProvider({
  children,
  defaultPreset = 'standard',
  defaultProperties = {},
  enabledEffects = ['frost', 'caustics', 'border'],
  performanceMode = false,
  debugMode = false
}: HoudiniGlassProviderProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [hasPropertyAPI, setHasPropertyAPI] = useState(false);
  const [hasPaintAPI, setHasPaintAPI] = useState(false);
  const [globalPreset, setGlobalPreset] = useState<keyof typeof glassPresets>(defaultPreset);
  const [globalProperties, setGlobalProperties] = useState<Record<string, string>>(defaultProperties);
  const [enabledEffectsState, setEnabledEffectsState] = useState<string[]>(enabledEffects);
  const [performanceModeState, setPerformanceModeState] = useState(performanceMode);
  const [debugModeState, setDebugModeState] = useState(debugMode);
  const [stylesInjected, setStylesInjected] = useState(false);

  // Initialize Houdini support detection and registration
  useEffect(() => {
    const detectSupport = () => {
      const propertyAPI = typeof CSS !== 'undefined' && 'registerProperty' in CSS;
      const paintAPI = typeof CSS !== 'undefined' && 'paintWorklet' in CSS;

      setHasPropertyAPI(propertyAPI);
      setHasPaintAPI(paintAPI);
      setIsSupported(propertyAPI || paintAPI);

      if (debugModeState) {
        console.log('Houdini Support Detection:', {
          propertyAPI,
          paintAPI,
          overall: propertyAPI || paintAPI
        });
      }

      return { propertyAPI, paintAPI };
    };

    const { propertyAPI, paintAPI } = detectSupport();

    // Register properties if supported
    if (propertyAPI) {
      try {
        registerGlassProperties();
        if (debugModeState) {
          console.log('Glass properties registered successfully');
        }
      } catch (error) {
        console.warn('Failed to register glass properties:', error);
      }
    }

    // Register worklets if supported and not in performance mode
    if (paintAPI && !performanceModeState) {
      try {
        registerGlassWorklets();
        if (debugModeState) {
          console.log('Glass worklets registered successfully');
        }
      } catch (error) {
        console.warn('Failed to register glass worklets:', error);
      }
    }
  }, [debugModeState, performanceModeState]);

  // Inject global styles
  useEffect(() => {
    if (!stylesInjected) {
      const styleElement = document.createElement('style');
      styleElement.textContent = houdiniGlassStyles;
      document.head.appendChild(styleElement);
      setStylesInjected(true);

      return () => {
        if (document.head.contains(styleElement)) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, [stylesInjected]);

  // Apply global preset to document root
  useEffect(() => {
    if (hasPropertyAPI && globalPreset) {
      const preset = glassPresets[globalPreset];
      Object.entries(preset).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });

      if (debugModeState) {
        console.log(`Applied global preset: ${globalPreset}`, preset);
      }
    }
  }, [globalPreset, hasPropertyAPI, debugModeState]);

  // Apply global properties to document root
  useEffect(() => {
    if (hasPropertyAPI) {
      Object.entries(globalProperties).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value);
      });

      if (debugModeState) {
        console.log('Applied global properties:', globalProperties);
      }
    }
  }, [globalProperties, hasPropertyAPI, debugModeState]);

  // Performance mode adjustments
  useEffect(() => {
    if (performanceModeState) {
      // Disable expensive effects in performance mode
      const reducedEffects = enabledEffectsState.filter(effect =>
        !['caustics', 'refraction'].includes(effect)
      );
      setEnabledEffectsState(reducedEffects);

      // Reduce animation complexity
      document.documentElement.style.setProperty('--glass-animation-speed', '0.5');
      document.documentElement.style.setProperty('--glass-blur-intensity', '5');

      if (debugModeState) {
        console.log('Performance mode enabled - reduced effects:', reducedEffects);
      }
    } else {
      // Restore full effects
      setEnabledEffectsState(enabledEffects);
      document.documentElement.style.setProperty('--glass-animation-speed', '1');
      document.documentElement.style.setProperty('--glass-blur-intensity', '10');
    }
  }, [performanceModeState, enabledEffects, debugModeState]);

  // Debug information logging
  useEffect(() => {
    if (debugModeState) {
      const interval = setInterval(() => {
        console.log('Houdini Glass Debug Info:', {
          isSupported,
          hasPropertyAPI,
          hasPaintAPI,
          globalPreset,
          enabledEffects: enabledEffectsState,
          performanceMode: performanceModeState,
          globalPropertiesCount: Object.keys(globalProperties).length
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [
    debugModeState,
    isSupported,
    hasPropertyAPI,
    hasPaintAPI,
    globalPreset,
    enabledEffectsState,
    performanceModeState,
    globalProperties
  ]);

  const updateGlobalProperty = useCallback((property: string, value: string) => {
    setGlobalProperties(prev => ({ ...prev, [property]: value }));

    if (hasPropertyAPI) {
      document.documentElement.style.setProperty(property, value);
    }

    if (debugModeState) {
      console.log(`Updated global property: ${property} = ${value}`);
    }
  }, [hasPropertyAPI, debugModeState]);

  const toggleEffect = useCallback((effect: string) => {
    setEnabledEffectsState(prev => {
      const newEffects = prev.includes(effect)
        ? prev.filter(e => e !== effect)
        : [...prev, effect];

      if (debugModeState) {
        console.log(`Toggled effect: ${effect}. New effects:`, newEffects);
      }

      return newEffects;
    });
  }, [debugModeState]);

  const setPerformanceMode = useCallback((enabled: boolean) => {
    setPerformanceModeState(enabled);

    if (debugModeState) {
      console.log(`Performance mode ${enabled ? 'enabled' : 'disabled'}`);
    }
  }, [debugModeState]);

  const setDebugMode = useCallback((enabled: boolean) => {
    setDebugModeState(enabled);
    console.log(`Houdini Glass debug mode ${enabled ? 'enabled' : 'disabled'}`);
  }, []);

  const contextValue: HoudiniGlassContextType = {
    isSupported,
    hasPropertyAPI,
    hasPaintAPI,
    globalPreset,
    setGlobalPreset,
    globalProperties,
    updateGlobalProperty,
    enabledEffects: enabledEffectsState,
    toggleEffect,
    performanceMode: performanceModeState,
    setPerformanceMode,
    debugMode: debugModeState,
    setDebugMode
  };

  return (
    <HoudiniGlassContext.Provider value={contextValue}>
      {children}

      {/* Debug overlay */}
      {debugModeState && (
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 10000,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <div><strong>Houdini Glass Debug</strong></div>
          <div>Support: {isSupported ? '✅' : '❌'}</div>
          <div>Property API: {hasPropertyAPI ? '✅' : '❌'}</div>
          <div>Paint API: {hasPaintAPI ? '✅' : '❌'}</div>
          <div>Preset: {globalPreset}</div>
          <div>Effects: {enabledEffectsState.join(', ')}</div>
          <div>Performance: {performanceModeState ? '🚀' : '🎨'}</div>
          <div>Properties: {Object.keys(globalProperties).length}</div>
        </div>
      )}
    </HoudiniGlassContext.Provider>
  );
}

// Hook to use Houdini Glass context
export function useHoudiniGlass() {
  const context = useContext(HoudiniGlassContext);
  if (!context) {
    throw new Error('useHoudiniGlass must be used within a HoudiniGlassProvider');
  }
  return context;
}

// Hook for component-specific glass effects
export function useGlassEffect(
  elementRef: React.RefObject<HTMLElement>,
  effects: string[] = [],
  options: {
    preset?: keyof typeof glassPresets;
    customProperties?: Record<string, string>;
    enableWorklets?: boolean;
  } = {}
) {
  const { isSupported, hasPropertyAPI, hasPaintAPI, performanceMode } = useHoudiniGlass();
  const [appliedEffects, setAppliedEffects] = useState<string[]>([]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isSupported) return;

    // Apply preset
    if (options.preset && hasPropertyAPI) {
      const preset = glassPresets[options.preset];
      Object.entries(preset).forEach(([property, value]) => {
        element.style.setProperty(property, value);
      });
    }

    // Apply custom properties
    if (options.customProperties && hasPropertyAPI) {
      Object.entries(options.customProperties).forEach(([property, value]) => {
        element.style.setProperty(property, value);
      });
    }

    // Apply worklet effects
    if (options.enableWorklets && hasPaintAPI && !performanceMode) {
      const workletStyles: string[] = [];

      if (effects.includes('frost')) {
        workletStyles.push('paint(glass-frost)');
      }
      if (effects.includes('caustics')) {
        workletStyles.push('paint(glass-caustics)');
      }
      if (effects.includes('refraction')) {
        element.style.borderImage = 'paint(glass-refraction) 1';
      }
      if (effects.includes('border')) {
        element.style.borderImageSource = 'paint(glass-border)';
        element.style.borderImageSlice = '1';
      }

      if (workletStyles.length > 0) {
        element.style.backgroundImage = workletStyles.join(', ');
      }

      setAppliedEffects(effects);
    }
  }, [
    elementRef,
    effects,
    options.preset,
    options.customProperties,
    options.enableWorklets,
    isSupported,
    hasPropertyAPI,
    hasPaintAPI,
    performanceMode
  ]);

  return {
    isSupported,
    appliedEffects,
    canUseWorklets: hasPaintAPI && !performanceMode
  };
}

// Mock functions for Houdini API registration - in real implementation these would register actual worklets
function registerGlassProperties() {
  // Register CSS custom properties for glass effects
  if (typeof CSS !== 'undefined' && CSS.registerProperty) {
    try {
      CSS.registerProperty({
        name: '--glass-background',
        syntax: '<color>',
        inherits: false,
        initialValue: 'rgba(255, 255, 255, 0.1)'
      });

      CSS.registerProperty({
        name: '--glass-border',
        syntax: '<color>',
        inherits: false,
        initialValue: 'rgba(255, 255, 255, 0.2)'
      });

      CSS.registerProperty({
        name: '--glass-blur',
        syntax: '<length>',
        inherits: false,
        initialValue: '20px'
      });

      CSS.registerProperty({
        name: '--glass-shadow',
        syntax: '<string>',
        inherits: false,
        initialValue: '0 8px 32px rgba(0, 0, 0, 0.1)'
      });

      CSS.registerProperty({
        name: '--glass-animation-speed',
        syntax: '<number>',
        inherits: false,
        initialValue: '1'
      });

      CSS.registerProperty({
        name: '--glass-blur-intensity',
        syntax: '<number>',
        inherits: false,
        initialValue: '10'
      });
    } catch (error) {
      console.warn('Failed to register glass properties:', error);
    }
  }
}

// Extend CSS interface for Houdini Paint Worklet API
declare global {
  interface CSS {
    paintWorklet?: Worklet;
  }
}

function registerGlassWorklets() {
  // Register paint worklets for advanced glass effects
  if (typeof CSS !== 'undefined' && (CSS as any).paintWorklet) {
    try {
      // In a real implementation, these would be actual worklet files
      // CSS.paintWorklet.addModule('/worklets/glass-frost.js');
      // CSS.paintWorklet.addModule('/worklets/glass-caustics.js');
      // CSS.paintWorklet.addModule('/worklets/glass-border.js');
      // CSS.paintWorklet.addModule('/worklets/glass-refraction.js');

      console.log('Glass worklets registered (mock implementation)');
    } catch (error) {
      console.warn('Failed to register glass worklets:', error);
    }
  }
}

// Global CSS styles for Houdini glass effects
const houdiniGlassStyles = `
  .houdini-glass {
    background: var(--glass-background, rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(var(--glass-blur, 20px));
    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.2));
    box-shadow: var(--glass-shadow, 0 8px 32px rgba(0, 0, 0, 0.1));
    transition: all calc(0.3s * var(--glass-animation-speed, 1));
  }

  .houdini-glass:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @supports (backdrop-filter: blur(20px)) {
    .houdini-glass-fallback {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
  }

  /* Performance mode styles */
  .houdini-glass-performance {
    --glass-blur: 10px;
    --glass-animation-speed: 0.5;
    backdrop-filter: blur(10px);
    transition: all 0.15s;
  }

  /* Debug styles */
  .houdini-glass-debug {
    outline: 2px solid rgba(255, 0, 0, 0.5);
    outline-offset: -1px;
  }
`;

export default HoudiniGlassProvider;
