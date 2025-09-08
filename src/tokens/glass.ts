// Glass morphism design tokens
export const glassTokens = {
  // Opacity values for glass effects
  opacity: {
    clear: 0,
    subtle: 0.05,
    light: 0.1,
    standard: 0.15,
    strong: 0.2,
    intense: 0.3,
    heavy: 0.4,
  },

  // Blur values for backdrop filter
  blur: {
    none: 'none',
    subtle: 'blur(2px)',
    light: 'blur(4px)',
    standard: 'blur(8px)',
    strong: 'blur(12px)',
    heavy: 'blur(16px)',
    intense: 'blur(20px)',
  },

  // Border radius values
  radius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    full: '9999px',
  },

  // Glass variant configurations
  variants: {
    frosted: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    dynamic: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    },
    clear: {
      background: 'transparent',
      backdropFilter: 'none',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: 'none',
    },
    tinted: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(6px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    },
    luminous: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    },
  },

  // Color schemes for different glass themes
  colors: {
    light: {
      surface: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      text: 'rgba(0, 0, 0, 0.9)',
      textSecondary: 'rgba(0, 0, 0, 0.6)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      surface: 'rgba(0, 0, 0, 0.1)',
      border: 'rgba(255, 255, 255, 0.1)',
      text: 'rgba(255, 255, 255, 0.9)',
      textSecondary: 'rgba(255, 255, 255, 0.6)',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
    glass: {
      surface: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      text: 'rgba(255, 255, 255, 0.9)',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      shadow: 'rgba(0, 0, 0, 0.15)',
    },
  },

  // Glow effects
  glow: {
    subtle: '0 0 10px rgba(255, 255, 255, 0.1)',
    light: '0 0 20px rgba(255, 255, 255, 0.2)',
    standard: '0 0 30px rgba(255, 255, 255, 0.3)',
    strong: '0 0 40px rgba(255, 255, 255, 0.4)',
    intense: '0 0 50px rgba(255, 255, 255, 0.5)',
    primary: 'rgba(59, 130, 246, 0.3)',
  },

  // Interactive states
  states: {
    hover: {
      scale: 1.02,
      shadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      glow: '0 0 25px rgba(255, 255, 255, 0.25)',
    },
    active: {
      scale: 0.98,
      shadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
      glow: '0 0 15px rgba(255, 255, 255, 0.15)',
    },
    focus: {
      outline: '2px solid rgba(59, 130, 246, 0.5)',
      outlineOffset: '2px',
      glow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      filter: 'grayscale(50%)',
    },
  },

  // Z-index layers for glass elements
  zIndex: {
    base: 1,
    elevated: 10,
    overlay: 100,
    modal: 1000,
    tooltip: 1100,
    dropdown: 1200,
    popover: 1300,
    notification: 1400,
  },

  // Animation tokens
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    spring: {
      gentle: { stiffness: 120, damping: 14, mass: 1 },
      wobbly: { stiffness: 180, damping: 12, mass: 1 },
      stiff: { stiffness: 210, damping: 20, mass: 1 },
      slow: { stiffness: 280, damping: 60, mass: 1 },
      bouncy: { stiffness: 170, damping: 8, mass: 1 },
    },
  },

  // Spacing tokens for glass elements
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  // Typography tokens for glass text
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },

  // Breakpoint tokens for responsive glass
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },

  // Device-specific tokens
  device: {
    mobile: {
      blur: 'blur(4px)',
      opacity: 0.08,
      shadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    },
    tablet: {
      blur: 'blur(6px)',
      opacity: 0.1,
      shadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
    },
    desktop: {
      blur: 'blur(8px)',
      opacity: 0.12,
      shadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    },
  },

  // Elevation system for depth
  elevation: {
    1: {
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      zIndex: 1,
    },
    2: {
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      zIndex: 2,
    },
    3: {
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      zIndex: 3,
    },
    4: {
      boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
      zIndex: 4,
    },
    float: {
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
    },
    modal: {
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
      zIndex: 1000,
    },
  },

  // Backdrop filters
  backdrop: {
    none: 'none',
    subtle: 'blur(2px)',
    medium: 'blur(8px)',
    strong: 'blur(12px)',
    intense: 'blur(20px)',
  },

  // Gradient backgrounds
  gradients: {
    primary: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
    secondary: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
    primaryRadial: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
    mesh: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%)',
    iridescent: 'linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(0, 255, 255, 0.1) 50%, rgba(255, 255, 0, 0.1) 100%)',
  },

  // Border colors
  border: {
    primary: 'rgba(255, 255, 255, 0.2)',
    secondary: 'rgba(0, 0, 0, 0.1)',
    subtle: 'rgba(255, 255, 255, 0.1)',
    gradient: {
      rainbow: 'linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #88ff00, #00ff00, #00ff88, #00ffff, #0088ff, #0000ff, #8800ff, #ff00ff)',
    },
  },

  // Surface colors
  surface: {
    success: 'rgba(34, 197, 94, 0.1)',
    warning: 'rgba(245, 158, 11, 0.1)',
    error: 'rgba(239, 68, 68, 0.1)',
    dark: 'rgba(0, 0, 0, 0.2)',
    darkSubtle: 'rgba(0, 0, 0, 0.1)',
  },

  // Noise textures
  noise: {
    subtle: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
  },
} as const;

// Utility functions for working with glass tokens
export const glassUtils = {
  // Get glass variant configuration
  getVariant: (variant: keyof typeof glassTokens.variants) => glassTokens.variants[variant],

  // Get color scheme
  getColorScheme: (scheme: keyof typeof glassTokens.colors) => glassTokens.colors[scheme],

  // Get responsive blur value
  getResponsiveBlur: (breakpoint: keyof typeof glassTokens.breakpoints) => {
    const breakpoints = Object.keys(glassTokens.breakpoints);
    const index = breakpoints.indexOf(breakpoint);

    if (index <= 1) return glassTokens.device.mobile.blur;
    if (index <= 3) return glassTokens.device.tablet.blur;
    return glassTokens.device.desktop.blur;
  },

  // Get opacity value
  getOpacity: (level: keyof typeof glassTokens.opacity) => glassTokens.opacity[level],

  // Get blur value
  getBlur: (level: keyof typeof glassTokens.blur) => glassTokens.blur[level],

  // Get glow value
  getGlow: (level: keyof typeof glassTokens.glow) => glassTokens.glow[level],

  // Get spacing value
  getSpacing: (size: keyof typeof glassTokens.spacing) => glassTokens.spacing[size],

  // Get animation duration
  getDuration: (speed: keyof typeof glassTokens.animation.duration) => glassTokens.animation.duration[speed],

  // Get animation easing
  getEasing: (type: keyof typeof glassTokens.animation.easing) => glassTokens.animation.easing[type],

  // Get spring configuration
  getSpring: (type: keyof typeof glassTokens.animation.spring) => glassTokens.animation.spring[type],
};

export default glassTokens;
