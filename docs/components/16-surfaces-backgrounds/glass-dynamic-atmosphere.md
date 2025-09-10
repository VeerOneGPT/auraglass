### GlassDynamicAtmosphere

Dynamic atmospheric background with interactive effects, physics-based animations, and customizable visual themes.

```tsx
<GlassDynamicAtmosphere
  type="nebula"
  primaryColor="#6366F1"
  secondaryColor="#8B5CF6"
  accentColor="#EC4899"
  intensity={0.8}
  speed={0.5}
  interactionMode="mouse"
  interactionSensitivity={0.3}
  fullSize={true}
  zIndex={-1}
/>
```

**Props:**
- `type?: AtmosphereType` - Effect type ('subtle' | 'nebula' | 'aurora' | 'particles' | 'waves' | 'gradient' | 'ambient' | 'custom')
- `primaryColor?: string` - Primary color for effects
- `secondaryColor?: string` - Secondary color for effects
- `accentColor?: string` - Accent color for effects
- `intensity?: number` - Effect intensity (0-1)
- `speed?: number` - Animation speed (0-1)
- `interactionMode?: InteractionMode` - Interaction type ('none' | 'mouse' | 'scroll' | 'audio' | 'time')
- `interactionSensitivity?: number` - Interaction sensitivity (0-1)
- `fullSize?: boolean` - Fill container completely
- `width?: string | number` - Atmosphere width
- `height?: string | number` - Atmosphere height
- `zIndex?: number` - Z-index for layering
- `position?: 'absolute' | 'fixed' | 'relative'` - CSS position
- `respectReducedMotion?: boolean` - Respect reduced motion preferences
- `elementCount?: number` - Number of animated elements
- `className?: string` - Additional CSS classes

**AtmosphereType:**
- `'subtle'` - Minimal glassmorphism effects
- `'nebula'` - Cloud-like particle effects
- `'aurora'` - Northern lights inspired gradients
- `'particles'` - Interactive particle system
- `'waves'` - Fluid wave animations
- `'gradient'` - Dynamic color transitions
- `'ambient'` - Subtle background lighting
- `'custom'` - Custom effect configuration

**InteractionMode:**
- `'none'` - No user interaction
- `'mouse'` - Mouse movement effects
- `'scroll'` - Scroll-based animations
- `'audio'` - Audio-reactive effects
- `'time'` - Time-based transitions
