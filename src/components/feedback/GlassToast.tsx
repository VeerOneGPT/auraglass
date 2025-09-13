'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Glass } from '../../primitives';
import { cn } from '../../lib/utilsComprehensive';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxToasts = 5,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = {
      id,
      duration: 5000,
      dismissible: true,
      ...toastData,
    };

    setToasts((prev) => {
      const newToasts = [newToast, ...prev];
      return newToasts.slice(0, maxToasts);
    });

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const getPositionClasses = () => {
    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'top-center': 'top-4 left-1/2 -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    };
    return positions[position];
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
      
      {/* Toast Container */}
      <div className={cn('fixed z-50 flex flex-col gap-2', getPositionClasses())}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getToastIcon = () => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[toast.type];
  };

  const getToastColors = () => {
    const colors = {
      success: 'border-green-200 bg-green-50 text-green-900',
      error: 'border-red-200 bg-red-50 text-red-900',
      warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
      info: 'border-blue-200 bg-blue-50 text-blue-900',
    };
    return colors[toast.type];
  };

  const getProgressBarColor = () => {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    };
    return colors[toast.type];
  };

  return (
    <Glass
      className={cn(
        'w-96 max-w-sm glass-p-4 glass-radius-lg border-2 shadow-lg transition-all duration-300 transform',
        getToastColors(),
        isVisible && !isRemoving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        isRemoving && '-translate-x-full opacity-0'
      )}
    >
      <div className="glass-glass-flex glass-glass-items-start glass-glass-gap-3">
        <div className="glass-glass-text-lg glass-glass-flex-shrink-0 glass-mt-0-5">
          {getToastIcon()}
        </div>
        
        <div className="glass-glass-flex-1 glass-glass-min-w-0">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between">
            <h4 className="glass-glass-font-semibold glass-glass-text-sm glass-glass-truncate pr-2">{toast.title}</h4>
            {toast.dismissible && (
              <button
                onClick={handleRemove}
                className="glass-glass-flex-shrink-0 glass-glass-w-5 glass-glass-h-5 glass-glass-flex glass-glass-items-center glass-glass-justify-center glass-radius-full hover:glass-surface-dark/10 transition-colors glass-glass-text-xs opacity-70 hover:opacity-100"
              >
                ✕
              </button>
            )}
          </div>
          
          {toast.message && (
            <p className="glass-glass-text-sm glass-glass-opacity-90 mt-1 leading-relaxed">{toast.message}</p>
          )}
          
          {toast.action && (
            <button
              onClick={() => {
                toast.action!.onClick();
                handleRemove();
              }}
              className="mt-2 glass-glass-text-sm glass-glass-font-medium underline hover:no-underline transition-all"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>
      
      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="mt-3 glass-glass-w-full h-1 glass-surface-dark/10 glass-radius-full overflow-hidden">
          <div 
            className={cn('h-full glass-radius-full transition-all ease-linear', getProgressBarColor())}
            style={{
              animation: `shrink ${toast.duration}ms linear forwards`,
            }}
          />
        </div>
      )}
      
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </Glass>
  );
};

// Convenience hook for common toast types
export const useToastHelpers = () => {
  const { addToast } = useToast();

  return {
    success: (title: string, message?: string, options?: Partial<Toast>) =>
      addToast({ type: 'success', title, message, ...options }),
    
    error: (title: string, message?: string, options?: Partial<Toast>) =>
      addToast({ type: 'error', title, message, ...options }),
    
    warning: (title: string, message?: string, options?: Partial<Toast>) =>
      addToast({ type: 'warning', title, message, ...options }),
    
    info: (title: string, message?: string, options?: Partial<Toast>) =>
      addToast({ type: 'info', title, message, ...options }),
  };
};