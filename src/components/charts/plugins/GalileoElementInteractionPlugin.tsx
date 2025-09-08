import React from 'react';
import { ChartPlugin, ChartEvent, ChartDataPoint, ChartSeries, ChartEventType } from '../types';

export interface GalileoInteractionConfig {
  enabled: boolean;
  magneticEffect: boolean;
  rippleEffect: boolean;
  glowEffect: boolean;
  physics: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  visual: {
    scale: number;
    glowIntensity: number;
    rippleSpeed: number;
    rippleSize: number;
  };
}

export class GalileoElementInteractionPlugin implements ChartPlugin {
  id = 'galileo-element-interaction';
  name = 'Galileo Element Interaction';
  version = '1.0.0';
  enabled = true;

  config: GalileoInteractionConfig;
  private elements = new Map<string, HTMLElement>();
  private animations = new Map<string, Animation>();
  private eventListeners = new Map<string, EventListener>();

  constructor(config: Partial<GalileoInteractionConfig> = {}) {
    this.config = {
      enabled: true,
      magneticEffect: true,
      rippleEffect: true,
      glowEffect: true,
      physics: {
        stiffness: 200,
        damping: 15,
        mass: 0.8,
        ...config.physics,
      },
      visual: {
        scale: 1.05,
        glowIntensity: 0.3,
        rippleSpeed: 0.6,
        rippleSize: 2,
        ...config.visual,
      },
    };
  }

  init(chart: any): void {
    if (!this.config.enabled) return;

    this.setupEventListeners(chart);
    this.injectStyles();
  }

  destroy(): void {
    // Clean up event listeners
    this.eventListeners.forEach((listener, key) => {
      const [elementId, eventType] = key.split(':');
      const element = this.elements.get(elementId);
      if (element) {
        element.removeEventListener(eventType, listener);
      }
    });

    // Clean up animations
    this.animations.forEach((animation) => {
      animation.cancel();
    });

    // Clear maps
    this.elements.clear();
    this.animations.clear();
    this.eventListeners.clear();
  }

  onEvent(event: ChartEvent): void {
    switch (event.type) {
      case 'hover':
        this.handleHover(event);
        break;
      case 'click':
        this.handleClick(event);
        break;
      case 'dataUpdate':
        this.handleDataUpdate(event);
        break;
    }
  }

  render(context: any): React.ReactNode {
    // Return overlay elements for interactions
    return (
      <div
        className="galileo-interaction-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 100,
        }}
      >
        {Array.from(this.elements.entries()).map(([id, element]) => (
          <div
            key={id}
            className={`galileo-element-${id}`}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
              transform: 'scale(0)',
              transition: 'transform 0.3s ease-out',
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
    );
  }

  private setupEventListeners(chart: any): void {
    // Get chart container
    const container = chart.container;
    if (!container) return;

    // Mouse move for magnetic effect
    if (this.config.magneticEffect) {
      const handleMouseMove = this.createMouseMoveHandler();
      container.addEventListener('mousemove', handleMouseMove);
      this.eventListeners.set(`${container.id || 'chart'}:mousemove`, handleMouseMove as EventListener);
    }

    // Click for ripple effect
    if (this.config.rippleEffect) {
      const handleClick = this.createClickHandler();
      container.addEventListener('click', handleClick);
      this.eventListeners.set(`${container.id || 'chart'}:click`, handleClick as EventListener);
    }
  }

  private createMouseMoveHandler() {
    return (event: MouseEvent) => {
      const elements = document.elementsFromPoint(event.clientX, event.clientY);
      const chartElements = elements.filter(el =>
        el.classList.contains('chart-element') ||
        el.closest('.chart-element')
      );

      chartElements.forEach(element => {
        const el = element as HTMLElement;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(event.clientX - centerX, 2) +
          Math.pow(event.clientY - centerY, 2)
        );

        const maxDistance = 100;
        const intensity = Math.max(0, 1 - distance / maxDistance);

        if (intensity > 0.1) {
          this.applyMagneticEffect(el, intensity);
        } else {
          this.removeMagneticEffect(el);
        }
      });
    };
  }

  private createClickHandler() {
    return (event: MouseEvent) => {
      const elements = document.elementsFromPoint(event.clientX, event.clientY);
      const chartElement = elements.find(el =>
        el.classList.contains('chart-element') ||
        el.closest('.chart-element')
      );

      if (chartElement) {
        this.createRippleEffect(chartElement as HTMLElement, event);
      }
    };
  }

  private applyMagneticEffect(element: HTMLElement, intensity: number): void {
    const elementId = element.id || `element-${Math.random().toString(36).substr(2, 9)}`;
    element.id = elementId;
    this.elements.set(elementId, element);

    const scale = 1 + (this.config.visual.scale - 1) * intensity;
    const glowOpacity = this.config.visual.glowIntensity * intensity;

    element.style.transform = `scale(${scale})`;
    element.style.filter = `drop-shadow(0 0 ${10 * intensity}px rgba(59, 130, 246, ${glowOpacity}))`;

    // Apply physics-based animation
    if (this.config.physics.stiffness > 0) {
      this.applyPhysicsAnimation(element, scale, intensity);
    }
  }

  private removeMagneticEffect(element: HTMLElement): void {
    element.style.transform = 'scale(1)';
    element.style.filter = 'none';

    // Cancel any ongoing physics animation
    const elementId = element.id;
    if (elementId) {
      const animation = this.animations.get(elementId);
      if (animation) {
        animation.cancel();
        this.animations.delete(elementId);
      }
    }
  }

  private applyPhysicsAnimation(element: HTMLElement, targetScale: number, intensity: number): void {
    const elementId = element.id;
    if (!elementId) return;

    // Cancel existing animation
    const existingAnimation = this.animations.get(elementId);
    if (existingAnimation) {
      existingAnimation.cancel();
    }

    const keyframes = [
      {
        transform: element.style.transform,
        filter: element.style.filter,
      },
      {
        transform: `scale(${targetScale})`,
        filter: `drop-shadow(0 0 ${10 * intensity}px rgba(59, 130, 246, ${this.config.visual.glowIntensity * intensity}))`,
      },
    ];

    const animation = element.animate(keyframes, {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards',
    });

    this.animations.set(elementId, animation);
  }

  private createRippleEffect(element: HTMLElement, event: MouseEvent): void {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const ripple = document.createElement('div');
    ripple.className = 'galileo-ripple';
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
      transform: scale(0);
      opacity: 1;
      pointer-events: none;
      z-index: 1000;
      left: ${event.clientX - centerX}px;
      top: ${event.clientY - centerY}px;
      width: ${20 * this.config.visual.rippleSize}px;
      height: ${20 * this.config.visual.rippleSize}px;
      margin-left: ${-10 * this.config.visual.rippleSize}px;
      margin-top: ${-10 * this.config.visual.rippleSize}px;
    `;

    element.style.position = element.style.position || 'relative';
    element.appendChild(ripple);

    const animation = ripple.animate(
      [
        {
          transform: 'scale(0)',
          opacity: 1,
        },
        {
          transform: `scale(${this.config.visual.rippleSize})`,
          opacity: 0,
        },
      ],
      {
        duration: 600 / this.config.visual.rippleSpeed,
        easing: 'ease-out',
      }
    );

    animation.onfinish = () => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    };
  }

  private handleHover(event: ChartEvent): void {
    const { data, series } = event;
    if (data && this.config.magneticEffect) {
      // Find the corresponding DOM element for this data point
      const element = this.findElementForDataPoint(data, series);
      if (element) {
        this.applyMagneticEffect(element, 0.8);
      }
    }
  }

  private handleClick(event: ChartEvent): void {
    const { data, series } = event;
    if (data && this.config.rippleEffect) {
      // Create ripple effect on click
      const element = this.findElementForDataPoint(data, series);
      if (element) {
        // Simulate click event for ripple
        const fakeEvent = {
          clientX: element.offsetLeft + element.offsetWidth / 2,
          clientY: element.offsetTop + element.offsetHeight / 2,
        } as MouseEvent;
        this.createRippleEffect(element, fakeEvent);
      }
    }
  }

  private handleDataUpdate(event: ChartEvent): void {
    // Update element references when data changes
    this.elements.clear();
    // Re-scan for elements after data update
    setTimeout(() => this.scanForElements(), 100);
  }

  private findElementForDataPoint(data: ChartDataPoint, series?: ChartSeries): HTMLElement | null {
    // This is a simplified implementation - in a real chart library,
    // you'd need to map data points to their corresponding DOM elements
    const elements = document.querySelectorAll('.chart-element[data-point-id]');
    for (const element of elements) {
      const el = element as HTMLElement;
      const pointId = el.getAttribute('data-point-id');
      if (pointId === `${series?.id || 'default'}-${data.x}-${data.y}`) {
        return el;
      }
    }
    return null;
  }

  private scanForElements(): void {
    const elements = document.querySelectorAll('.chart-element');
    elements.forEach((element, index) => {
      const el = element as HTMLElement;
      const elementId = el.id || `chart-element-${index}`;
      el.id = elementId;
      this.elements.set(elementId, el);
    });
  }

  private injectStyles(): void {
    if (document.getElementById('galileo-interaction-styles')) return;

    const style = document.createElement('style');
    style.id = 'galileo-interaction-styles';
    style.textContent = `
      .chart-element {
        transition: transform 0.2s ease-out, filter 0.2s ease-out;
        cursor: pointer;
      }

      .galileo-ripple {
        will-change: transform, opacity;
      }

      .galileo-interaction-overlay {
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
  }

  // Public API methods
  setConfig(config: Partial<GalileoInteractionConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): GalileoInteractionConfig {
    return { ...this.config };
  }

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
    this.destroy();
  }
}

// Factory function for easy instantiation
export const createGalileoInteractionPlugin = (config?: Partial<GalileoInteractionConfig>) => {
  return new GalileoElementInteractionPlugin(config);
};

// Factory function with explicit typing to avoid Chart.js type inference
export const createGalileoPlugin: (config?: Partial<GalileoInteractionConfig>) => GalileoElementInteractionPlugin = (config?: Partial<GalileoInteractionConfig>) => {
  return new GalileoElementInteractionPlugin(config);
};

// Default export
export default createGalileoPlugin;
