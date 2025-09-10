### Choosing the Right Implementation

**When to use Glass vs GlassAdvanced:**
- **Use `Glass` (GlassCore)** for simple projects, prototypes, or when you need basic glassmorphism effects with minimal complexity
- **Use `GlassAdvanced`** for production applications requiring full design token integration, advanced variants (iridescent, mesh, neural), and gradient support

**When to use OptimizedGlass vs OptimizedGlassAdvanced:**
- **Use `OptimizedGlass` (OptimizedGlassCore)** when you need automatic device capability detection and want the system to adapt based on hardware
- **Use `OptimizedGlassAdvanced`** for high-performance applications where you want manual control over optimization modes and need advanced features like CSS variables, lazy effects, and micro-interactions

**When to use Motion vs MotionFramer:**
- **Use `Motion` (MotionNative)** for lightweight animations, better performance on low-end devices, and when you want to minimize bundle size
- **Use `MotionFramer`** when you need advanced animation features like presets, scroll triggers, complex easing functions, and Framer Motion's ecosystem
