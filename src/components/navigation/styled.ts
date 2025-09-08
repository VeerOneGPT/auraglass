import styled from 'styled-components';

export const TabBarContainer = styled.div<{
  $orientation?: 'horizontal' | 'vertical';
  $variant?: 'default' | 'pills' | 'underline';
  $glassVariant?: 'frosted' | 'dynamic' | 'clear' | 'tinted' | 'luminous';
  $blurStrength?: 'none' | 'light' | 'standard' | 'heavy';
  $elevated?: boolean;
  $background?: boolean;
  $color?: string;
  $width?: string | number;
  $height?: string | number;
  $borderRadius?: string | number;
  $iconPosition?: 'top' | 'left' | 'right';
  $verticalDisplayMode?: 'expanded' | 'compact';
  $placement?: 'top' | 'bottom' | 'left' | 'right';
  $isResponsive?: boolean;
}>`
  display: flex;
  align-items: center;
  position: relative;
  background: ${props => props.$background !== false ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  backdrop-filter: ${props => {
    switch (props.$blurStrength) {
      case 'none': return 'none';
      case 'light': return 'blur(4px)';
      case 'standard': return 'blur(8px)';
      case 'heavy': return 'blur(16px)';
      default: return 'blur(8px)';
    }
  }};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => typeof props.$borderRadius === 'number' ? `${props.$borderRadius}px` : props.$borderRadius || '8px'};
  padding: 4px;
  overflow: hidden;
  flex-direction: ${props => props.$orientation === 'vertical' ? 'column' : 'row'};
  ${props => props.$width && `width: ${typeof props.$width === 'number' ? `${props.$width}px` : props.$width};`}
  ${props => props.$height && `height: ${typeof props.$height === 'number' ? `${props.$height}px` : props.$height};`}
  ${props => props.$elevated && 'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);'}
`;

export const TabSelector = styled.div<{ $position: number; $width: number }>`
  position: absolute;
  height: calc(100% - 8px);
  left: ${props => props.$position}px;
  width: ${props => props.$width}px;
  border-radius: 8px;
  transition: transform 220ms ease, width 220ms ease, left 220ms ease, opacity 180ms ease;
  will-change: transform, left, width, opacity;

  /* Glassy highlight with subtle glow and local blur */
  background: linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.16) 100%);
  box-shadow: 0 6px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5);
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);

  /* Specular sheen */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 40%);
    mix-blend-mode: overlay;
    border-radius: inherit;
  }
`;
