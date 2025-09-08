import React, { useState, useEffect, createContext, useContext } from 'react';
import { OptimizedGlass } from '../../primitives';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface GlassNotification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

export interface GlassNotificationCenterProps {
  /** Position of the notification center */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Maximum number of notifications to show */
  maxNotifications?: number;
  /** Custom className */
  className?: string;
  /** Auto-hide delay for non-persistent notifications (ms) */
  autoHideDelay?: number;
}

interface NotificationContextType {
  notifications: GlassNotification[];
  addNotification: (notification: Omit<GlassNotification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a GlassNotificationProvider');
  }
  return context;
};

export const GlassNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<GlassNotification[]>([]);

  const addNotification = (notification: Omit<GlassNotification, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newNotification: GlassNotification = {
      ...notification,
      id,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove non-persistent notifications
    if (!newNotification.persistent) {
      const duration = newNotification.duration || 5000;
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const GlassNotificationCenter: React.FC<GlassNotificationCenterProps> = ({
  position = 'top-right',
  maxNotifications = 5,
  className = '',
  autoHideDelay = 5000,
}) => {
  const { notifications, removeNotification, clearAll } = useNotifications();

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const displayedNotifications = notifications.slice(0, maxNotifications);

  const getTypeStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return {
          icon: '✓',
          bgClass: 'border-green-500/20 bg-green-500/10',
          iconClass: 'text-green-400',
        };
      case 'error':
        return {
          icon: '✕',
          bgClass: 'border-red-500/20 bg-red-500/10',
          iconClass: 'text-red-400',
        };
      case 'warning':
        return {
          icon: '⚠',
          bgClass: 'border-yellow-500/20 bg-yellow-500/10',
          iconClass: 'text-yellow-400',
        };
      case 'info':
      default:
        return {
          icon: 'ℹ',
          bgClass: 'border-blue-500/20 bg-blue-500/10',
          iconClass: 'text-blue-400',
        };
    }
  };

  if (displayedNotifications.length === 0) {
    return null;
  }

  return (
    <div className={`fixed z-50 space-y-2 ${positionClasses[position]} ${className}`}>
      {/* Clear All Button */}
      {notifications.length > 1 && (
        <OptimizedGlass
          className="px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-white/10 transition-colors"
          blur="subtle"
          elevation={1}
          onClick={clearAll}
        >
          Clear All ({notifications.length})
        </OptimizedGlass>
      )}

      {/* Notifications */}
      {displayedNotifications.map((notification, index) => {
        const typeStyles = getTypeStyles(notification.type);

        return (
          <OptimizedGlass
            key={notification.id}
            className={`min-w-80 max-w-sm p-4 rounded-lg border backdrop-blur-md ${typeStyles.bgClass}
                       animate-in slide-in-from-right-2 fade-in duration-300`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            blur="medium"
            elevation={2}
          >
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${typeStyles.iconClass}`}>
                {typeStyles.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white">
                  {notification.title}
                </h4>
                {notification.message && (
                  <p className="mt-1 text-sm text-white/80">
                    {notification.message}
                  </p>
                )}

                {/* Action Button */}
                {notification.action && (
                  <button
                    onClick={notification.action.onClick}
                    className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {notification.action.label}
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white/60 hover:text-white/90 hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar for Auto-hide */}
            {!notification.persistent && notification.duration && (
              <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/40 rounded-full transition-all duration-100 ease-linear"
                  style={{
                    animation: `shrink ${notification.duration}ms linear forwards`,
                  }}
                />
              </div>
            )}
          </OptimizedGlass>
        );
      })}
    </div>
  );
};

// Helper component for creating notifications
export const GlassNotificationItem: React.FC<{
  notification: GlassNotification;
  onClose: () => void;
}> = ({ notification, onClose }) => {
  const typeStyles = getTypeStyles(notification.type);

  return (
    <OptimizedGlass
      className={`p-4 rounded-lg border ${typeStyles.bgClass}`}
      blur="medium"
      elevation={1}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${typeStyles.iconClass}`}>
          {typeStyles.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{notification.title}</h4>
          {notification.message && <p className="text-sm opacity-80">{notification.message}</p>}
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
      </div>
    </OptimizedGlass>
  );
};

// Helper function for notification styles
const getTypeStyles = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return {
        icon: '✓',
        bgClass: 'border-green-500/20 bg-green-500/10',
        iconClass: 'text-green-400',
      };
    case 'error':
      return {
        icon: '✕',
        bgClass: 'border-red-500/20 bg-red-500/10',
        iconClass: 'text-red-400',
      };
    case 'warning':
      return {
        icon: '⚠',
        bgClass: 'border-yellow-500/20 bg-yellow-500/10',
        iconClass: 'text-yellow-400',
      };
    case 'info':
    default:
      return {
        icon: 'ℹ',
        bgClass: 'border-blue-500/20 bg-blue-500/10',
        iconClass: 'text-blue-400',
      };
  }
};

// Add shrink animation for progress bar
const shrinkKeyframes = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;

// Inject keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shrinkKeyframes;
  document.head.appendChild(style);
}
