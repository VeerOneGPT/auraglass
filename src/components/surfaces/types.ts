// Surface component types
export interface SurfaceProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  elevation?: number;
  interactive?: boolean;
  className?: string;
}

export interface GlassSurfaceProps extends SurfaceProps {
  glassIntensity?: number;
  blur?: number;
  backdrop?: boolean;
}

export type SurfaceVariant = 'default' | 'elevated' | 'outlined' | 'glass';
