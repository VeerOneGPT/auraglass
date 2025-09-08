// Device capability detection and optimization

export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop' | 'unknown';
  os: 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'unknown';
  browser: string;
  capabilities: DeviceCapabilities;
  performance: DevicePerformance;
  screen: ScreenInfo;
  input: InputCapabilities;
}

export interface DeviceCapabilities {
  touch: boolean;
  multiTouch: boolean;
  hover: boolean;
  pointer: boolean;
  gpu: boolean;
  webgl: boolean;
  webgl2: boolean;
  hardwareAcceleration: boolean;
  highDPI: boolean;
  vibration: boolean;
  geolocation: boolean;
  camera: boolean;
  microphone: boolean;
  speakers: boolean;
  bluetooth: boolean;
  usb: boolean;
}

export interface DevicePerformance {
  memory: number; // MB
  cores: number;
  clockSpeed: number; // MHz
  battery: boolean;
  network: 'slow' | 'fast' | 'unknown';
  storage: 'low' | 'medium' | 'high';
  tier: 'low' | 'medium' | 'high' | 'ultra';
}

export interface ScreenInfo {
  width: number;
  height: number;
  pixelRatio: number;
  orientation: 'portrait' | 'landscape';
  colorDepth: number;
  refreshRate: number;
  touchScreen: boolean;
  ppi: number;
}

export interface InputCapabilities {
  keyboard: boolean;
  mouse: boolean;
  touch: boolean;
  stylus: boolean;
  gamepad: boolean;
  microphone: boolean;
  camera: boolean;
}

// Device detection
export const detectDevice = (): DeviceInfo => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  // Detect device type
  const type = detectDeviceType(ua, platform);

  // Detect OS
  const os = detectOS(ua, platform);

  // Detect browser
  const browser = detectBrowser(ua);

  // Detect capabilities
  const capabilities = detectDeviceCapabilities();

  // Detect performance
  const performance = detectDevicePerformance();

  // Detect screen info
  const screen = detectScreenInfo();

  // Detect input capabilities
  const input = detectInputCapabilities();

  return {
    type,
    os,
    browser,
    capabilities,
    performance,
    screen,
    input,
  };
};

const detectDeviceType = (ua: string, platform: string): DeviceInfo['type'] => {
  // Check for mobile devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    // Distinguish between phone and tablet
    if (/iPad|Android(?=.*\bMobile\b)|Tablet|PlayBook/i.test(ua)) {
      return 'tablet';
    }
    return 'mobile';
  }

  // Check for desktop
  if (/Windows|Mac|Linux/i.test(platform)) {
    return 'desktop';
  }

  return 'unknown';
};

const detectOS = (ua: string, platform: string): DeviceInfo['os'] => {
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return 'ios';
  }

  if (/Android/i.test(ua)) {
    return 'android';
  }

  if (/Windows/i.test(platform)) {
    return 'windows';
  }

  if (/Mac/i.test(platform)) {
    return 'macos';
  }

  if (/Linux/i.test(platform)) {
    return 'linux';
  }

  return 'unknown';
};

const detectBrowser = (ua: string): string => {
  if (ua.includes('Chrome') && !ua.includes('Edg/')) {
    return 'Chrome';
  }

  if (ua.includes('Firefox')) {
    return 'Firefox';
  }

  if (ua.includes('Safari') && !ua.includes('Chrome')) {
    return 'Safari';
  }

  if (ua.includes('Edg/')) {
    return 'Edge';
  }

  if (ua.includes('MSIE') || ua.includes('Trident')) {
    return 'Internet Explorer';
  }

  return 'Unknown';
};

const detectDeviceCapabilities = (): DeviceCapabilities => {
  const canvas = document.createElement('canvas');

  return {
    touch: 'ontouchstart' in window,
    multiTouch: navigator.maxTouchPoints > 1,
    hover: window.matchMedia('(hover: hover)').matches,
    pointer: 'PointerEvent' in window,
    gpu: (() => {
      try {
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch {
        return false;
      }
    })(),
    webgl: (() => {
      try {
        return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      } catch {
        return false;
      }
    })(),
    webgl2: (() => {
      try {
        return !!canvas.getContext('webgl2');
      } catch {
        return false;
      }
    })(),
    hardwareAcceleration: (() => {
      const testElement = document.createElement('div');
      testElement.style.setProperty('transform', 'translateZ(0)');
      return testElement.style.getPropertyValue('transform') === 'translateZ(0)';
    })(),
    highDPI: window.devicePixelRatio > 1,
    vibration: 'vibrate' in navigator,
    geolocation: 'geolocation' in navigator,
    camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    microphone: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    speakers: 'AudioContext' in window || 'webkitAudioContext' in window,
    bluetooth: 'bluetooth' in navigator,
    usb: 'usb' in navigator,
  };
};

const detectDevicePerformance = (): DevicePerformance => {
  // Estimate memory
  const memory = (navigator as any).deviceMemory || 4; // Default to 4GB if not available

  // Get CPU cores
  const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores

  // Estimate clock speed (rough approximation)
  const clockSpeed = cores > 4 ? 3000 : cores > 2 ? 2500 : 2000;

  // Check battery
  const battery = 'getBattery' in navigator;

  // Estimate network speed
  const network = detectNetworkSpeed();

  // Estimate storage
  const storage = memory > 8 ? 'high' : memory > 4 ? 'medium' : 'low';

  // Calculate performance tier
  const tier = calculatePerformanceTier(memory, cores, network);

  return {
    memory,
    cores,
    clockSpeed,
    battery,
    network,
    storage,
    tier,
  };
};

const detectNetworkSpeed = (): 'slow' | 'fast' | 'unknown' => {
  const connection = (navigator as any).connection;
  if (!connection) return 'unknown';

  const effectiveType = connection.effectiveType;
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  }

  return 'fast';
};

const calculatePerformanceTier = (
  memory: number,
  cores: number,
  network: string
): DevicePerformance['tier'] => {
  const score = (memory * 0.4) + (cores * 0.4) + (network === 'fast' ? 2 : 1) * 0.2;

  if (score >= 6) return 'ultra';
  if (score >= 4) return 'high';
  if (score >= 2.5) return 'medium';
  return 'low';
};

const detectScreenInfo = (): ScreenInfo => {
  const width = window.screen.width;
  const height = window.screen.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const orientation = width > height ? 'landscape' : 'portrait';
  const colorDepth = window.screen.colorDepth || 24;
  const refreshRate = 60; // Default, hard to detect accurately

  // Estimate PPI (pixels per inch)
  const ppi = estimatePPI(width, height, pixelRatio);

  return {
    width,
    height,
    pixelRatio,
    orientation,
    colorDepth,
    refreshRate,
    touchScreen: 'ontouchstart' in window,
    ppi,
  };
};

const estimatePPI = (width: number, height: number, pixelRatio: number): number => {
  // Rough PPI estimation based on common device sizes
  const diagonalPixels = Math.sqrt(width ** 2 + height ** 2);
  const diagonalInches = diagonalPixels / (pixelRatio * 96); // Assuming 96 PPI base

  return diagonalPixels / diagonalInches;
};

const detectInputCapabilities = (): InputCapabilities => {
  return {
    keyboard: true, // Assume keyboard support
    mouse: window.matchMedia('(hover: hover)').matches,
    touch: 'ontouchstart' in window,
    stylus: navigator.maxTouchPoints > 1, // Rough approximation
    gamepad: 'getGamepads' in navigator,
    microphone: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    camera: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
  };
};

// Performance optimization utilities
export const performanceOptimizations = {
  // Get optimal animation settings based on device
  getOptimalAnimationSettings: (device: DeviceInfo) => {
    const { performance, capabilities } = device;

    switch (performance.tier) {
      case 'ultra':
        return {
          duration: 300,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          useHardwareAcceleration: true,
          useWebAnimations: capabilities.webgl,
        };

      case 'high':
        return {
          duration: 400,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          useHardwareAcceleration: true,
          useWebAnimations: capabilities.webgl,
        };

      case 'medium':
        return {
          duration: 500,
          easing: 'ease',
          useHardwareAcceleration: capabilities.hardwareAcceleration,
          useWebAnimations: false,
        };

      case 'low':
        return {
          duration: 600,
          easing: 'linear',
          useHardwareAcceleration: false,
          useWebAnimations: false,
        };

      default:
        return {
          duration: 400,
          easing: 'ease',
          useHardwareAcceleration: capabilities.hardwareAcceleration,
          useWebAnimations: false,
        };
    }
  },

  // Get optimal rendering settings
  getOptimalRenderingSettings: (device: DeviceInfo) => {
    const { performance, screen } = device;

    return {
      useCanvas: performance.tier === 'ultra' || performance.tier === 'high',
      useWebGL: device.capabilities.webgl && performance.tier !== 'low',
      pixelRatio: screen.pixelRatio > 2 ? 2 : screen.pixelRatio,
      maxTextureSize: performance.tier === 'ultra' ? 4096 : 2048,
      antialiasing: performance.tier !== 'low',
      shadows: performance.tier === 'ultra' || performance.tier === 'high',
      particles: performance.tier === 'ultra' ? 1000 : performance.tier === 'high' ? 500 : 100,
    };
  },

  // Get optimal memory settings
  getOptimalMemorySettings: (device: DeviceInfo) => {
    const { performance } = device;

    return {
      maxCacheSize: performance.memory * 1024 * 1024 * 0.1, // 10% of available memory
      textureCacheSize: performance.tier === 'ultra' ? 100 : 50,
      geometryCacheSize: performance.tier === 'ultra' ? 50 : 25,
      shaderCacheSize: performance.tier === 'ultra' ? 20 : 10,
    };
  },

  // Get optimal network settings
  getOptimalNetworkSettings: (device: DeviceInfo) => {
    const { performance } = device;

    return {
      preloadAssets: performance.network !== 'slow',
      compressTextures: performance.network === 'slow',
      useCDN: performance.network === 'fast',
      cacheStrategy: performance.network === 'fast' ? 'aggressive' : 'conservative',
    };
  },
};

// Device-specific optimizations
export const deviceOptimizations = {
  // Mobile optimizations
  mobile: {
    reduceMotion: () => ({
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      disableParallax: true,
      simplifyAnimations: true,
      reduceParticleCount: true,
    }),

    optimizeTouch: () => ({
      preventZoom: true,
      improveTapTargets: true,
      disableDoubleTapZoom: true,
      optimizeScroll: true,
    }),

    optimizeBattery: () => ({
      reduceFrameRate: true,
      disableNonEssentialAnimations: true,
      optimizeRendering: true,
    }),
  },

  // Tablet optimizations
  tablet: {
    hybridInput: () => ({
      supportTouchAndMouse: true,
      optimizeForBoth: true,
      adaptiveUI: true,
    }),
  },

  // Desktop optimizations
  desktop: {
    maximizePerformance: () => ({
      useAdvancedShaders: true,
      enablePostProcessing: true,
      optimizeForGPU: true,
    }),
  },
};

// Adaptive rendering utilities
export const adaptiveRendering = {
  // Adjust quality based on performance
  adjustQualityForPerformance: (
    currentFPS: number,
    targetFPS: number = 60,
    currentQuality: number
  ): number => {
    const fpsRatio = currentFPS / targetFPS;

    if (fpsRatio < 0.8) {
      // Reduce quality if FPS is too low
      return Math.max(0.1, currentQuality * 0.8);
    } else if (fpsRatio > 1.2) {
      // Increase quality if FPS is good
      return Math.min(1, currentQuality * 1.1);
    }

    return currentQuality;
  },

  // Adjust detail level based on device
  getDetailLevel: (device: DeviceInfo): 'low' | 'medium' | 'high' | 'ultra' => {
    switch (device.performance.tier) {
      case 'ultra':
        return device.screen.pixelRatio > 2 ? 'ultra' : 'high';
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      case 'low':
        return 'low';
      default:
        return 'medium';
    }
  },

  // Get optimal texture size
  getOptimalTextureSize: (device: DeviceInfo, baseSize: number): number => {
    const detailLevel = adaptiveRendering.getDetailLevel(device);
    const multipliers = {
      ultra: 1,
      high: 0.8,
      medium: 0.6,
      low: 0.4,
    };

    return Math.floor(baseSize * multipliers[detailLevel]);
  },
};

// Export main detection function
export { detectDevice as default };
