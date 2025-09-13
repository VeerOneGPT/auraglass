/**
 * Consciousness Interface Performance Optimization Utilities
 */

import { useCallback, useMemo, useRef, useEffect } from 'react';

// Performance optimization strategies for consciousness features
export const OPTIMIZATION_STRATEGIES = {
  LAZY_LOADING: 'lazy',
  WEB_WORKER: 'worker',
  DEBOUNCING: 'debounce',
  THROTTLING: 'throttle',
  CACHING: 'cache',
  BATCHING: 'batch',
} as const;

// Consciousness feature resource pool
class ConsciousnessResourcePool {
  private eyeTrackingWorkers: Worker[] = [];
  private biometricProcessors: Worker[] = [];
  private predictiveAnalyzers: Worker[] = [];
  private spatialAudioContexts: AudioContext[] = [];
  
  // Initialize resource pools
  initialize() {
    // Pre-create Web Workers for heavy computations
    if (typeof Worker !== 'undefined') {
      this.eyeTrackingWorkers.push(
        new Worker(new URL('../workers/eyeTrackingWorker.ts', import.meta.url))
      );
      this.biometricProcessors.push(
        new Worker(new URL('../workers/biometricWorker.ts', import.meta.url))
      );
      this.predictiveAnalyzers.push(
        new Worker(new URL('../workers/predictiveWorker.ts', import.meta.url))
      );
    }
    
  }
  
  // Get eye tracking worker
  getEyeTrackingWorker(): Worker | null {
    return this.eyeTrackingWorkers.pop() || null;
  }
  
  // Return eye tracking worker
  returnEyeTrackingWorker(worker: Worker) {
    this.eyeTrackingWorkers.push(worker);
  }
  
  // Get biometric processor
  getBiometricProcessor(): Worker | null {
    return this.biometricProcessors.pop() || null;
  }
  
  // Return biometric processor
  returnBiometricProcessor(worker: Worker) {
    this.biometricProcessors.push(worker);
  }
  
  // Get spatial audio context
  getSpatialAudioContext(): AudioContext | null {
    return this.spatialAudioContexts.pop() || null;
  }

  // Return spatial audio context
  returnSpatialAudioContext(context: AudioContext) {
    this.spatialAudioContexts.push(context);
  }

  // Clean up resources
  cleanup() {
    [...this.eyeTrackingWorkers, ...this.biometricProcessors, ...this.predictiveAnalyzers]
      .forEach(worker => worker.terminate());

    this.spatialAudioContexts.forEach(context => {
      if (context.state !== 'closed') {
        context.close();
      }
    });
  }
}

// Global resource pool
export const consciousnessResourcePool = new ConsciousnessResourcePool();

// Initialize on load
if (typeof window !== 'undefined') {
  consciousnessResourcePool.initialize();
  
  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    consciousnessResourcePool.cleanup();
  });
}

// Performance-optimized consciousness hooks
export const useOptimizedEyeTracking = (
  enabled: boolean,
  onGazeChange: (data: any) => void,
  options: { throttleMs?: number } = {}
) => {
  const { throttleMs = 16.67 } = options; // 60fps default
  const lastUpdateRef = useRef<number>(0);
  const workerRef = useRef<Worker | null>(null);
  
  const throttledGazeChange = useCallback((data: any) => {
    const now = Date.now();
    if (now - lastUpdateRef.current >= throttleMs) {
      lastUpdateRef.current = now;
      onGazeChange(data);
    }
  }, [onGazeChange, throttleMs]);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Get worker from pool
    const worker = consciousnessResourcePool.getEyeTrackingWorker();
    if (worker) {
      workerRef.current = worker;
      
      worker.onmessage = (event) => {
        throttledGazeChange(event.data);
      };
      
      // Start eye tracking
      worker.postMessage({ command: 'start' });
    }
    
    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ command: 'stop' });
        consciousnessResourcePool.returnEyeTrackingWorker(workerRef.current);
        workerRef.current = null;
      }
    };
  }, [enabled, throttledGazeChange]);
  
  return {
    isActive: enabled && !!workerRef.current,
  };
};

// Optimized biometric monitoring
export const useOptimizedBiometricMonitoring = (
  enabled: boolean,
  onBiometricChange: (data: any) => void,
  options: { batchSize?: number; intervalMs?: number } = {}
) => {
  const { batchSize = 10, intervalMs = 100 } = options;
  const dataBuffer = useRef<any[]>([]);
  const workerRef = useRef<Worker | null>(null);
  
  const processBatch = useCallback(() => {
    if (dataBuffer.current.length >= batchSize) {
      const batch = dataBuffer.current.splice(0, batchSize);
      
      if (workerRef.current) {
        workerRef.current.postMessage({
          command: 'processBatch',
          data: batch,
        });
      }
    }
  }, [batchSize]);
  
  useEffect(() => {
    if (!enabled) return;
    
    const worker = consciousnessResourcePool.getBiometricProcessor();
    if (worker) {
      workerRef.current = worker;
      
      worker.onmessage = (event) => {
        onBiometricChange(event.data);
      };
      
      // Process batches at regular intervals
      const interval = setInterval(processBatch, intervalMs);
      
      return () => {
        clearInterval(interval);
        if (workerRef.current) {
          consciousnessResourcePool.returnBiometricProcessor(workerRef.current);
          workerRef.current = null;
        }
      };
    }
  }, [enabled, onBiometricChange, processBatch, intervalMs]);
  
  const addBiometricData = useCallback((data: any) => {
    dataBuffer.current.push(data);
    
    // Process immediately if buffer is full
    if (dataBuffer.current.length >= batchSize) {
      processBatch();
    }
  }, [batchSize, processBatch]);
  
  return {
    addBiometricData,
    bufferSize: dataBuffer.current.length,
    isActive: enabled && !!workerRef.current,
  };
};

// Optimized predictive analysis with caching
export const useOptimizedPredictiveAnalysis = (
  enabled: boolean,
  patterns: any[],
  options: { cacheSize?: number; debounceMs?: number } = {}
) => {
  const { cacheSize = 100, debounceMs = 200 } = options;
  const cacheRef = useRef<Map<string, any>>(new Map());
  const debounceRef = useRef<NodeJS.Timeout>();
  
  const getCacheKey = useCallback((patterns: any[]) => {
    return JSON.stringify(patterns.slice(0, 10)); // Use first 10 patterns for key
  }, []);
  
  const runPredictiveAnalysis = useCallback(async (patterns: any[]) => {
    const cacheKey = getCacheKey(patterns);
    
    // Check cache first
    if (cacheRef.current.has(cacheKey)) {
      return cacheRef.current.get(cacheKey);
    }
    
    return new Promise((resolve) => {
      const worker = new Worker(new URL('../workers/predictiveWorker.ts', import.meta.url));
      
      worker.onmessage = (event) => {
        const result = event.data;
        
        // Cache result
        if (cacheRef.current.size >= cacheSize) {
          const firstKey = cacheRef.current.keys().next().value;
          if (firstKey !== undefined) {
            cacheRef.current.delete(firstKey);
          }
        }
        cacheRef.current.set(cacheKey, result);
        
        worker.terminate();
        resolve(result);
      };
      
      worker.postMessage({ patterns });
    });
  }, [getCacheKey, cacheSize]);
  
  const debouncedAnalysis = useCallback((patterns: any[]) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      runPredictiveAnalysis(patterns);
    }, debounceMs);
  }, [runPredictiveAnalysis, debounceMs]);
  
  useEffect(() => {
    if (enabled && patterns.length > 0) {
      debouncedAnalysis(patterns);
    }
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [enabled, patterns, debouncedAnalysis]);
  
  return {
    getCachedResult: (patterns: any[]) => {
      const cacheKey = getCacheKey(patterns);
      return cacheRef.current.get(cacheKey);
    },
    cacheSize: cacheRef.current.size,
    runAnalysis: runPredictiveAnalysis,
  };
};

// Optimized spatial audio with pooled contexts
export const useOptimizedSpatialAudio = (
  enabled: boolean,
  position: { x: number; y: number; z: number },
  options: { maxSources?: number } = {}
) => {
  const { maxSources = 8 } = options;
  const contextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const pannersRef = useRef<PannerNode[]>([]);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Get audio context from pool or create new one
    contextRef.current = consciousnessResourcePool.getSpatialAudioContext();
    if (!contextRef.current && typeof AudioContext !== 'undefined') {
      contextRef.current = new AudioContext();
    }
    
    return () => {
      // Clean up sources and panners
      sourcesRef.current.forEach(source => {
        try {
          source.disconnect();
          source.stop();
        } catch (e) {
          // Source might already be stopped
        }
      });
      
      pannersRef.current.forEach(panner => {
        panner.disconnect();
      });
      
      sourcesRef.current = [];
      pannersRef.current = [];
      
      // Return context to pool
      if (contextRef.current) {
        consciousnessResourcePool.returnSpatialAudioContext(contextRef.current);
        contextRef.current = null;
      }
    };
  }, [enabled]);
  
  const playSound = useCallback(async (audioUrl: string, volume: number = 1) => {
    if (!contextRef.current || sourcesRef.current.length >= maxSources) return;
    
    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await contextRef.current.decodeAudioData(arrayBuffer);
      
      const source = contextRef.current.createBufferSource();
      const panner = contextRef.current.createPanner();
      const gainNode = contextRef.current.createGain();
      
      source.buffer = audioBuffer;
      panner.positionX.setValueAtTime(position.x, contextRef.current.currentTime);
      panner.positionY.setValueAtTime(position.y, contextRef.current.currentTime);
      panner.positionZ.setValueAtTime(position.z, contextRef.current.currentTime);
      gainNode.gain.setValueAtTime(volume, contextRef.current.currentTime);
      
      source.connect(panner);
      panner.connect(gainNode);
      gainNode.connect(contextRef.current.destination);
      
      source.onended = () => {
        // Clean up
        const sourceIndex = sourcesRef.current.indexOf(source);
        const pannerIndex = pannersRef.current.indexOf(panner);
        
        if (sourceIndex > -1) sourcesRef.current.splice(sourceIndex, 1);
        if (pannerIndex > -1) pannersRef.current.splice(pannerIndex, 1);
        
        source.disconnect();
        panner.disconnect();
        gainNode.disconnect();
      };
      
      source.start();
      
      sourcesRef.current.push(source);
      pannersRef.current.push(panner);
    } catch (error) {
      console.error('Failed to play spatial audio:', error);
    }
  }, [position, maxSources]);
  
  const updateListenerPosition = useCallback((listenerPos: { x: number; y: number; z: number }) => {
    if (contextRef.current?.listener) {
      const { listener } = contextRef.current;
      listener.positionX.setValueAtTime(listenerPos.x, contextRef.current.currentTime);
      listener.positionY.setValueAtTime(listenerPos.y, contextRef.current.currentTime);
      listener.positionZ.setValueAtTime(listenerPos.z, contextRef.current.currentTime);
    }
  }, []);
  
  return {
    playSound,
    updateListenerPosition,
    activeSourcesCount: sourcesRef.current.length,
    isActive: enabled && !!contextRef.current,
  };
};

// Performance monitoring integration
export const useConsciousnessPerformanceOptimization = (componentName: string) => {
  const metricsRef = useRef<{
    renderTimes: number[];
    consciousnessOperations: Map<string, number[]>;
  }>({
    renderTimes: [],
    consciousnessOperations: new Map(),
  });
  
  const measureRender = useCallback(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      metricsRef.current.renderTimes.push(renderTime);
      
      // Keep only last 100 measurements
      if (metricsRef.current.renderTimes.length > 100) {
        metricsRef.current.renderTimes.shift();
      }
      
      // Warn if render is slow
      if (renderTime > 16.67) {
        console.warn(`Slow render in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
  
  const measureConsciousnessOperation = useCallback((operation: string) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!metricsRef.current.consciousnessOperations.has(operation)) {
        metricsRef.current.consciousnessOperations.set(operation, []);
      }
      
      const measurements = metricsRef.current.consciousnessOperations.get(operation)!;
      measurements.push(duration);
      
      // Keep only last 50 measurements per operation
      if (measurements.length > 50) {
        measurements.shift();
      }
    };
  }, []);
  
  const getPerformanceReport = useCallback(() => {
    const { renderTimes, consciousnessOperations } = metricsRef.current;
    
    const avgRenderTime = renderTimes.length > 0 
      ? renderTimes.reduce((a, b) => a + b) / renderTimes.length 
      : 0;
    
    const consciousnessStats: Record<string, any> = {};
    consciousnessOperations.forEach((measurements, operation) => {
      if (measurements.length > 0) {
        consciousnessStats[operation] = {
          avg: measurements.reduce((a, b) => a + b) / measurements.length,
          max: Math.max(...measurements),
          min: Math.min(...measurements),
          count: measurements.length,
        };
      }
    });
    
    return {
      component: componentName,
      avgRenderTime,
      maxRenderTime: Math.max(...renderTimes),
      consciousness: consciousnessStats,
      timestamp: Date.now(),
    };
  }, [componentName]);
  
  return {
    measureRender,
    measureConsciousnessOperation,
    getPerformanceReport,
  };
};
