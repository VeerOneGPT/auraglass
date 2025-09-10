### GlassGradientPicker

Advanced gradient picker with preset gradients, custom color stop editing, and multiple gradient types.

```tsx
const customPresets = [
  {
    id: 'sunset',
    name: 'Sunset',
    type: 'linear',
    angle: 45,
    stops: [
      { color: '#ff6b35', position: 0 },
      { color: '#f7931e', position: 50 },
      { color: '#ffb627', position: 100 }
    ]
  },
  {
    id: 'ocean',
    name: 'Ocean Deep',
    type: 'radial',
    stops: [
      { color: '#1e3a8a', position: 0 },
      { color: '#3b82f6', position: 70 },
      { color: '#60a5fa', position: 100 }
    ]
  },
  {
    id: 'forest',
    name: 'Forest',
    type: 'conic',
    stops: [
      { color: '#166534', position: 0 },
      { color: '#16a34a', position: 33 },
      { color: '#22c55e', position: 66 },
      { color: '#4ade80', position: 100 }
    ]
  }
];

// Basic gradient picker
<GlassGradientPicker
  value="linear-gradient(45deg, #667eea 0%, #764ba2 100%)"
  presets={customPresets}
  enableCustom={true}
  onChange={(gradient, stops, type, angle) => {
    console.log('Gradient changed:', gradient);
    setSelectedGradient(gradient);
  }}
  onPresetSelect={(preset) => {
    console.log('Preset selected:', preset.name);
  }}
/>

// Full-featured gradient picker
<GlassGradientPicker
  presets={customPresets}
  enableCustom={true}
  showTypeSelector={true}
  showAngleControl={true}
  showStopsEditor={true}
  maxStops={6}
  onChange={(gradient, stops, type, angle) => {
    console.log('Custom gradient:', { gradient, stops, type, angle });
  }}
  className="w-full max-w-2xl"
/>
```

**Props:**
- `value?: string` - Current gradient CSS value
- `presets?: GradientPreset[]` - Array of gradient presets
- `enableCustom?: boolean` - Allow custom gradient creation
- `showTypeSelector?: boolean` - Show gradient type selector
- `showAngleControl?: boolean` - Show angle control for linear gradients
- `showStopsEditor?: boolean` - Show color stops editor
- `maxStops?: number` - Maximum number of color stops
- `onChange?: (gradient: string, stops: GradientStop[], type: string, angle?: number) => void` - Gradient change handler
- `onPresetSelect?: (preset: GradientPreset) => void` - Preset selection handler
- `className?: string` - Additional CSS classes

**GradientPreset Interface:**
- `id: string` - Unique preset identifier
- `name: string` - Preset display name
- `type: 'linear' | 'radial' | 'conic'` - Gradient type
- `angle?: number` - Angle for linear gradients (0-360)
- `stops: GradientStop[]` - Color stops array

**GradientStop Interface:**
- `color: string` - Color value (hex, rgb, hsl, etc.)
- `position: number` - Position along gradient (0-100)
