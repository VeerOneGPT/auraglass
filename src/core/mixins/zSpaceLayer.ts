import { CSSProperties } from 'react';

export interface ZSpaceLayerConfig {
  zIndex?: number;
  elevation?: number;
  backdrop?: boolean;
  blur?: number;
  opacity?: number;
}

export const zSpaceLayer = (config: ZSpaceLayerConfig = {}): CSSProperties => {
  const {
    zIndex = 1,
    elevation = 0,
    backdrop = false,
    blur = 0,
    opacity = 1,
  } = config;

  const baseElevation = elevation * 100;
  const backdropFilter = blur > 0 ? `blur(${blur}px)` : 'none';

  return {
    position: 'relative',
    zIndex,
    transform: `translateZ(${baseElevation}px)`,
    opacity,
    ...(backdrop && {
      backdropFilter,
      WebkitBackdropFilter: backdropFilter, // Safari support
    }),
  };
};

export const createZSpaceLayers = (layers: ZSpaceLayerConfig[]): CSSProperties[] => {
  return layers.map((layer, index) => ({
    ...zSpaceLayer({
      ...layer,
      zIndex: layer.zIndex ?? index + 1,
    }),
  }));
};

export const zSpacePresets = {
  background: {
    zIndex: 0,
    elevation: 0,
    backdrop: true,
    blur: 10,
  },
  content: {
    zIndex: 1,
    elevation: 1,
    backdrop: false,
  },
  overlay: {
    zIndex: 10,
    elevation: 2,
    backdrop: true,
    blur: 5,
  },
  modal: {
    zIndex: 100,
    elevation: 3,
    backdrop: true,
    blur: 8,
  },
  tooltip: {
    zIndex: 1000,
    elevation: 4,
    backdrop: true,
    blur: 4,
  },
  dropdown: {
    zIndex: 100,
    elevation: 2,
    backdrop: true,
    blur: 3,
  },
} as const;

export const getZSpaceLayer = (preset: keyof typeof zSpacePresets): CSSProperties => {
  return zSpaceLayer(zSpacePresets[preset]);
};

// Utility for managing z-space hierarchies
export class ZSpaceManager {
  private static instance: ZSpaceManager;
  private layers: Map<string, number> = new Map();

  static getInstance(): ZSpaceManager {
    if (!ZSpaceManager.instance) {
      ZSpaceManager.instance = new ZSpaceManager();
    }
    return ZSpaceManager.instance;
  }

  registerLayer(id: string, baseZIndex: number = 1): number {
    const existing = this.layers.get(id);
    if (existing !== undefined) {
      return existing;
    }

    // Find the highest z-index and add 1
    const highestZ = Math.max(...Array.from(this.layers.values()), baseZIndex - 1);
    const newZ = highestZ + 1;

    this.layers.set(id, newZ);
    return newZ;
  }

  unregisterLayer(id: string): void {
    this.layers.delete(id);
  }

  getLayerZIndex(id: string): number {
    return this.layers.get(id) ?? 1;
  }

  clear(): void {
    this.layers.clear();
  }
}

export const zSpaceManager = ZSpaceManager.getInstance();
