/**
 * Dynamic Glass Morphing Engine
 * Real-time glass effects that adapt to environment, time, weather, and user activity
 */

import { motion, useAnimation, useSpring, useTransform } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utilsComprehensive';

// Environmental adaptation types
type EnvironmentalContext = {
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';
  weather: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  temperature: number; // Celsius
  humidity: number; // 0-100%
  lightLevel: number; // 0-100%
};

type UserActivity = 'focused' | 'browsing' | 'searching' | 'creating' | 'analyzing' | 'idle';
type ContentType = 'text' | 'data' | 'media' | 'interactive' | 'dashboard' | 'form';

interface GlassProperties {
  opacity: number;
  blur: number;
  refraction: number;
  reflection: number;
  chromatic: number;
  caustic: number;
  temperature: number; // Visual temperature effect
  viscosity: number; // Fluid-like behavior
  crystalline: number; // Crystal formation effect
  iridescence: number; // Color-shifting effect
}

interface GlassMorphingEngineProps {
  children: React.ReactNode;
  className?: string;
  environmentalContext?: Partial<EnvironmentalContext>;
  userActivity?: UserActivity;
  contentType?: ContentType;
  intensity?: number;
  adaptationSpeed?: number;
  enableRealTimeAdaptation?: boolean;
  onMorphingChange?: (properties: GlassProperties) => void;
}

// Environmental glass property mappings
const ENVIRONMENTAL_GLASS_CONFIGS: Record<string, Partial<GlassProperties>> = {
  // Time of day variations
  'timeOfDay-dawn': {
    opacity: 0.85,
    blur: 8,
    temperature: 0.3,
    iridescence: 0.7,
    chromatic: 0.4,
  },
  'timeOfDay-morning': {
    opacity: 0.9,
    blur: 6,
    temperature: 0.1,
    reflection: 0.8,
    chromatic: 0.2,
  },
  'timeOfDay-afternoon': {
    opacity: 0.75,
    blur: 4,
    temperature: -0.1,
    caustic: 0.6,
    chromatic: 0.1,
  },
  'timeOfDay-evening': {
    opacity: 0.8,
    blur: 10,
    temperature: 0.4,
    iridescence: 0.9,
    chromatic: 0.5,
  },
  'timeOfDay-night': {
    opacity: 0.95,
    blur: 12,
    temperature: 0.6,
    crystalline: 0.3,
    chromatic: 0.7,
  },

  // Weather variations
  'weather-sunny': {
    caustic: 0.8,
    reflection: 0.9,
    chromatic: 0.3,
    iridescence: 0.4,
  },
  'weather-cloudy': {
    opacity: 0.9,
    blur: 8,
    refraction: 0.6,
    chromatic: 0.2,
  },
  'weather-rainy': {
    viscosity: 0.7,
    blur: 15,
    caustic: 0.9,
    chromatic: 0.6,
  },
  'weather-stormy': {
    opacity: 0.7,
    blur: 20,
    viscosity: 0.9,
    crystalline: 0.1,
  },
  'weather-snowy': {
    crystalline: 0.8,
    opacity: 0.95,
    blur: 6,
    temperature: 1.0,
  },
  'weather-foggy': {
    blur: 25,
    opacity: 0.6,
    viscosity: 0.4,
    chromatic: 0.1,
  },

  // Seasonal variations
  'season-spring': {
    iridescence: 0.6,
    chromatic: 0.4,
    temperature: 0.2,
    viscosity: 0.3,
  },
  'season-summer': {
    caustic: 0.7,
    reflection: 0.8,
    temperature: -0.2,
    chromatic: 0.2,
  },
  'season-autumn': {
    temperature: 0.3,
    iridescence: 0.8,
    chromatic: 0.5,
    crystalline: 0.2,
  },
  'season-winter': {
    crystalline: 0.9,
    temperature: 0.8,
    opacity: 0.9,
    chromatic: 0.3,
  },

  // User activity adaptations
  'activity-focused': {
    opacity: 0.85,
    blur: 4,
    refraction: 0.3,
    chromatic: 0.1,
  },
  'activity-browsing': {
    opacity: 0.8,
    blur: 6,
    iridescence: 0.4,
    chromatic: 0.3,
  },
  'activity-searching': {
    blur: 8,
    caustic: 0.5,
    chromatic: 0.4,
    viscosity: 0.3,
  },
  'activity-creating': {
    iridescence: 0.7,
    chromatic: 0.6,
    caustic: 0.4,
    temperature: 0.2,
  },
  'activity-analyzing': {
    crystalline: 0.5,
    reflection: 0.7,
    chromatic: 0.2,
    opacity: 0.9,
  },
  'activity-idle': {
    blur: 12,
    viscosity: 0.6,
    iridescence: 0.8,
    chromatic: 0.5,
  },

  // Content type adaptations
  'content-text': {
    opacity: 0.9,
    blur: 3,
    chromatic: 0.1,
    reflection: 0.4,
  },
  'content-data': {
    crystalline: 0.6,
    reflection: 0.8,
    chromatic: 0.2,
    opacity: 0.85,
  },
  'content-media': {
    caustic: 0.7,
    iridescence: 0.6,
    chromatic: 0.5,
    refraction: 0.7,
  },
  'content-interactive': {
    viscosity: 0.4,
    caustic: 0.5,
    iridescence: 0.5,
    chromatic: 0.4,
  },
  'content-dashboard': {
    opacity: 0.8,
    blur: 5,
    crystalline: 0.4,
    reflection: 0.6,
  },
  'content-form': {
    opacity: 0.9,
    blur: 4,
    chromatic: 0.1,
    viscosity: 0.2,
  },
};

const defaultGlassProperties: GlassProperties = {
  opacity: 0.8,
  blur: 6,
  refraction: 0.5,
  reflection: 0.5,
  chromatic: 0.3,
  caustic: 0.4,
  temperature: 0.0,
  viscosity: 0.3,
  crystalline: 0.2,
  iridescence: 0.4,
};

export const GlassMorphingEngine: React.FC<GlassMorphingEngineProps> = ({
  children,
  className = '',
  environmentalContext = {},
  userActivity = 'browsing',
  contentType = 'text',
  intensity = 1,
  adaptationSpeed = 1000,
  enableRealTimeAdaptation = true,
  onMorphingChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentProperties, setCurrentProperties] = useState<GlassProperties>(defaultGlassProperties);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const controls = useAnimation();
  
  // Motion values for smooth transitions
  const opacityMotion = useSpring(currentProperties.opacity, { stiffness: 100, damping: 30 });
  const blurMotion = useSpring(currentProperties.blur, { stiffness: 80, damping: 25 });
  const refractionMotion = useSpring(currentProperties.refraction, { stiffness: 120, damping: 35 });
  const reflectionMotion = useSpring(currentProperties.reflection, { stiffness: 110, damping: 32 });
  const chromaticMotion = useSpring(currentProperties.chromatic, { stiffness: 90, damping: 28 });
  const causticMotion = useSpring(currentProperties.caustic, { stiffness: 100, damping: 30 });
  const temperatureMotion = useSpring(currentProperties.temperature, { stiffness: 70, damping: 20 });
  const viscosityMotion = useSpring(currentProperties.viscosity, { stiffness: 85, damping: 25 });
  const crystallineMotion = useSpring(currentProperties.crystalline, { stiffness: 95, damping: 30 });
  const iridescenceMotion = useSpring(currentProperties.iridescence, { stiffness: 105, damping: 32 });

  // Calculate target glass properties based on context
  const calculateTargetProperties = useCallback((
    environmental: Partial<EnvironmentalContext>,
    activity: UserActivity,
    content: ContentType,
    intensityFactor: number
  ): GlassProperties => {
    let targetProperties = { ...defaultGlassProperties };

    // Apply environmental adaptations
    if (environmental.timeOfDay) {
      const config = ENVIRONMENTAL_GLASS_CONFIGS[`timeOfDay-${environmental.timeOfDay}`];
      targetProperties = { ...targetProperties, ...config };
    }

    if (environmental.weather) {
      const config = ENVIRONMENTAL_GLASS_CONFIGS[`weather-${environmental.weather}`];
      targetProperties = { ...targetProperties, ...config };
    }

    if (environmental.season) {
      const config = ENVIRONMENTAL_GLASS_CONFIGS[`season-${environmental.season}`];
      targetProperties = { ...targetProperties, ...config };
    }

    // Apply user activity adaptations
    const activityConfig = ENVIRONMENTAL_GLASS_CONFIGS[`activity-${activity}`];
    if (activityConfig) {
      targetProperties = { ...targetProperties, ...activityConfig };
    }

    // Apply content type adaptations
    const contentConfig = ENVIRONMENTAL_GLASS_CONFIGS[`content-${content}`];
    if (contentConfig) {
      targetProperties = { ...targetProperties, ...contentConfig };
    }

    // Apply environmental sensor data
    if (environmental.temperature !== undefined) {
      const tempFactor = (environmental.temperature - 20) / 30; // Normalize around 20°C
      targetProperties.temperature += tempFactor * 0.3;
      targetProperties.crystalline += Math.max(0, -tempFactor * 0.4);
      targetProperties.viscosity += tempFactor * 0.2;
    }

    if (environmental.humidity !== undefined) {
      const humidityFactor = environmental.humidity / 100;
      targetProperties.viscosity += humidityFactor * 0.3;
      targetProperties.blur += humidityFactor * 3;
      targetProperties.caustic += humidityFactor * 0.2;
    }

    if (environmental.lightLevel !== undefined) {
      const lightFactor = environmental.lightLevel / 100;
      targetProperties.reflection *= (0.5 + lightFactor * 0.5);
      targetProperties.caustic *= lightFactor;
      targetProperties.iridescence *= (0.3 + lightFactor * 0.7);
    }

    // Apply intensity scaling
    Object.keys(targetProperties).forEach(key => {
      const prop = key as keyof GlassProperties;
      if (prop !== 'opacity') {
        targetProperties[prop] = targetProperties[prop] * intensityFactor;
      } else {
        // Opacity scaling is inverse for better visibility
        targetProperties[prop] = 1 - ((1 - targetProperties[prop]) * intensityFactor);
      }
    });

    // Clamp values to valid ranges
    targetProperties.opacity = Math.max(0.1, Math.min(1, targetProperties.opacity));
    targetProperties.blur = Math.max(0, Math.min(30, targetProperties.blur));
    targetProperties.refraction = Math.max(0, Math.min(1, targetProperties.refraction));
    targetProperties.reflection = Math.max(0, Math.min(1, targetProperties.reflection));
    targetProperties.chromatic = Math.max(0, Math.min(1, targetProperties.chromatic));
    targetProperties.caustic = Math.max(0, Math.min(1, targetProperties.caustic));
    targetProperties.temperature = Math.max(-1, Math.min(1, targetProperties.temperature));
    targetProperties.viscosity = Math.max(0, Math.min(1, targetProperties.viscosity));
    targetProperties.crystalline = Math.max(0, Math.min(1, targetProperties.crystalline));
    targetProperties.iridescence = Math.max(0, Math.min(1, targetProperties.iridescence));

    return targetProperties;
  }, []);

  // Real-time environmental data fetching
  const fetchEnvironmentalData = useCallback(async (): Promise<Partial<EnvironmentalContext>> => {
    // In a real implementation, this would fetch from weather APIs, device sensors, etc.
    const now = new Date();
    const hour = now.getHours();
    
    let timeOfDay: EnvironmentalContext['timeOfDay'] = 'morning';
    if (hour >= 5 && hour < 8) timeOfDay = 'dawn';
    else if (hour >= 8 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 20) timeOfDay = 'evening';
    else timeOfDay = 'night';

    const month = now.getMonth();
    let season: EnvironmentalContext['season'] = 'spring';
    if (month >= 2 && month <= 4) season = 'spring';
    else if (month >= 5 && month <= 7) season = 'summer';
    else if (month >= 8 && month <= 10) season = 'autumn';
    else season = 'winter';

    // Mock environmental data - in real app, would use actual sensors/APIs
    return {
      timeOfDay,
      season,
      weather: 'sunny', // Would come from weather API
      temperature: 22, // Would come from device sensors or location-based weather
      humidity: 45,
      lightLevel: 75,
    };
  }, []);

  // Morphing transition effect
  const performMorphingTransition = useCallback(async (targetProperties: GlassProperties) => {
    setIsTransitioning(true);

    // Animate all properties smoothly
    opacityMotion.set(targetProperties.opacity);
    blurMotion.set(targetProperties.blur);
    refractionMotion.set(targetProperties.refraction);
    reflectionMotion.set(targetProperties.reflection);
    chromaticMotion.set(targetProperties.chromatic);
    causticMotion.set(targetProperties.caustic);
    temperatureMotion.set(targetProperties.temperature);
    viscosityMotion.set(targetProperties.viscosity);
    crystallineMotion.set(targetProperties.crystalline);
    iridescenceMotion.set(targetProperties.iridescence);

    // Update state
    setCurrentProperties(targetProperties);

    // Notify parent component
    onMorphingChange?.(targetProperties);

    // End transition after animation completes
    setTimeout(() => setIsTransitioning(false), adaptationSpeed);
  }, [
    opacityMotion, blurMotion, refractionMotion, reflectionMotion,
    chromaticMotion, causticMotion, temperatureMotion, viscosityMotion,
    crystallineMotion, iridescenceMotion, adaptationSpeed, onMorphingChange
  ]);

  // Update glass properties when context changes
  useEffect(() => {
    const updateGlassProperties = async () => {
      let finalEnvironmentalContext = { ...environmentalContext };

      // Fetch real-time data if enabled
      if (enableRealTimeAdaptation) {
        const realTimeData = await fetchEnvironmentalData();
        finalEnvironmentalContext = { ...finalEnvironmentalContext, ...realTimeData };
      }

      const targetProperties = calculateTargetProperties(
        finalEnvironmentalContext,
        userActivity,
        contentType,
        intensity
      );

      performMorphingTransition(targetProperties);
    };

    updateGlassProperties();
  }, [
    environmentalContext,
    userActivity,
    contentType,
    intensity,
    enableRealTimeAdaptation,
    calculateTargetProperties,
    performMorphingTransition,
    fetchEnvironmentalData
  ]);

  // Auto-update environmental data periodically
  useEffect(() => {
    if (!enableRealTimeAdaptation) return;

    const interval = setInterval(async () => {
      const realTimeData = await fetchEnvironmentalData();
      const targetProperties = calculateTargetProperties(
        { ...environmentalContext, ...realTimeData },
        userActivity,
        contentType,
        intensity
      );
      performMorphingTransition(targetProperties);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [
    enableRealTimeAdaptation,
    environmentalContext,
    userActivity,
    contentType,
    intensity,
    calculateTargetProperties,
    performMorphingTransition,
    fetchEnvironmentalData
  ]);

  // Generate dynamic CSS for glass effects
  const glassStyleProps = useMemo(() => ({
    '--glass-opacity': opacityMotion,
    '--glass-blur': useTransform(blurMotion, value => `${value}px`),
    '--glass-refraction': refractionMotion,
    '--glass-reflection': reflectionMotion,
    '--glass-chromatic': chromaticMotion,
    '--glass-caustic': causticMotion,
    '--glass-temperature': temperatureMotion,
    '--glass-viscosity': viscosityMotion,
    '--glass-crystalline': crystallineMotion,
    '--glass-iridescence': iridescenceMotion,
  }), [
    opacityMotion, blurMotion, refractionMotion, reflectionMotion,
    chromaticMotion, causticMotion, temperatureMotion, viscosityMotion,
    crystallineMotion, iridescenceMotion
  ]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("glass-morphing-container", className)}
      style={{
        ...glassStyleProps,
        position: 'relative',
        overflow: 'hidden',
      }}
      animate={controls}
    >
      {/* Dynamic glass layers */}
      <div className={cn("glass-morphing-effects")}>
        {/* Base glass layer */}
        <motion.div
          className={cn("glass-layer glass-base")}
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: useTransform(blurMotion, value => `blur(${value}px)`),
            background: useTransform(
              [opacityMotion, temperatureMotion, iridescenceMotion],
              (values: number[]) => {
                const [opacity, temp, iridescence] = values;
                const hue = temp * 60 + 200; // Blue to warm spectrum
                const iridescenceAlpha = iridescence * 0.3;
                return `linear-gradient(45deg,
                  hsla(${hue}, 70%, 80%, ${opacity * 0.1}),
                  hsla(${hue + 60}, 60%, 75%, ${opacity * 0.1}),
                  hsla(${hue + 120}, 80%, 85%, ${iridescenceAlpha})
                )`;
              }
            ),
            borderRadius: 'inherit',
          }}
        />

        {/* Refraction layer */}
        <motion.div
          className={cn("glass-layer glass-refraction")}
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              refractionMotion,
              value => `radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, ${value * 0.2}) 0%, 
                transparent 50%
              )`
            ),
            borderRadius: 'inherit',
          }}
        />

        {/* Reflection layer */}
        <motion.div
          className={cn("glass-layer glass-reflection")}
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              reflectionMotion,
              value => `linear-gradient(135deg, 
                rgba(255, 255, 255, ${value * 0.4}) 0%, 
                transparent 30%, 
                rgba(255, 255, 255, ${value * 0.1}) 100%
              )`
            ),
            borderRadius: 'inherit',
          }}
        />

        {/* Chromatic aberration layer */}
        <motion.div
          className={cn("glass-layer glass-chromatic")}
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              chromaticMotion,
              value => `linear-gradient(90deg, 
                rgba(255, 0, 0, ${value * 0.05}) 0%, 
                transparent 20%, 
                rgba(0, 255, 0, ${value * 0.05}) 40%, 
                transparent 60%, 
                rgba(0, 0, 255, ${value * 0.05}) 80%, 
                transparent 100%
              )`
            ),
            borderRadius: 'inherit',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Caustic pattern layer */}
        <motion.div
          className={cn("glass-layer glass-caustic")}
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              causticMotion,
              value => `radial-gradient(ellipse at 60% 20%, 
                rgba(255, 255, 255, ${value * 0.3}) 0%, 
                transparent 25%
              ), radial-gradient(ellipse at 20% 70%, 
                rgba(255, 255, 255, ${value * 0.2}) 0%, 
                transparent 25%
              )`
            ),
            borderRadius: 'inherit',
            animation: isTransitioning ? 'none' : 'caustic-shimmer 4s ease-in-out infinite',
          }}
        />

        {/* Crystalline structure layer */}
        <motion.div
          className={cn("glass-layer glass-crystalline")}
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              crystallineMotion,
              value => `conic-gradient(from 45deg, 
                rgba(255, 255, 255, ${value * 0.1}) 0deg, 
                transparent 60deg, 
                rgba(255, 255, 255, ${value * 0.15}) 120deg, 
                transparent 180deg, 
                rgba(255, 255, 255, ${value * 0.1}) 240deg, 
                transparent 300deg
              )`
            ),
            borderRadius: 'inherit',
            clipPath: useTransform(
              crystallineMotion,
              value => `polygon(
                0% 0%, 
                ${100 - value * 20}% 0%, 
                100% ${value * 30}%, 
                100% 100%, 
                ${value * 15}% 100%, 
                0% ${100 - value * 25}%
              )`
            ),
          }}
        />

        {/* Viscosity flow layer */}
        <motion.div
          className={cn("glass-layer glass-viscosity")}
          style={{
            position: 'absolute',
            inset: 0,
            background: useTransform(
              viscosityMotion,
              value => `linear-gradient(180deg, 
                rgba(255, 255, 255, ${value * 0.1}) 0%, 
                rgba(255, 255, 255, ${value * 0.2}) 40%, 
                rgba(255, 255, 255, ${value * 0.05}) 100%
              )`
            ),
            borderRadius: 'inherit',
            transform: useTransform(viscosityMotion, value => `scaleY(${1 + value * 0.02})`),
            filter: useTransform(viscosityMotion, value => `blur(${value * 2}px)`),
          }}
        />
      </div>

      {/* Content */}
      <div className={cn("glass-morphing-content")} style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Transition indicators */}
      {isTransitioning && (
        <div className={cn("glass-morphing-transition-indicator")}>
          <div className={cn("transition-shimmer")} />
        </div>
      )}

      <style>{`
        @keyframes caustic-shimmer {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .glass-morphing-transition-indicator {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .transition-shimmer {
          position: absolute;
          inset: -2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            transparent 100%
          );
          border-radius: inherit;
          animation: shimmer 2s ease-in-out;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
};

// Specialized morphing components for different use cases
export const EnvironmentalGlass: React.FC<Omit<GlassMorphingEngineProps, 'enableRealTimeAdaptation'>> = (props) => (
  <GlassMorphingEngine {...props} enableRealTimeAdaptation={true} />
);

export const ContextualGlass: React.FC<GlassMorphingEngineProps> = (props) => (
  <GlassMorphingEngine {...props} adaptationSpeed={500} />
);

export const SeasonalGlass: React.FC<GlassMorphingEngineProps> = (props) => {
  const now = new Date();
  const month = now.getMonth();
  let season: EnvironmentalContext['season'] = 'spring';
  
  if (month >= 2 && month <= 4) season = 'spring';
  else if (month >= 5 && month <= 7) season = 'summer';
  else if (month >= 8 && month <= 10) season = 'autumn';
  else season = 'winter';

  return (
    <GlassMorphingEngine 
      {...props} 
      environmentalContext={{ ...props.environmentalContext, season }}
    />
  );
};

export default GlassMorphingEngine;