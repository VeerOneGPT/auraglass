import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToastHelpers } from './GlassToast';
import React from 'react';

const meta: Meta = {
  title: 'Feedback/GlassToast',
  component: ToastProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive toast notification system with multiple types, auto-dismiss, and customizable positioning.',
      },
    },
  },
};

export default meta;

// Demo component to showcase toast functionality
const ToastDemo: React.FC<{ position?: any }> = ({ position = 'top-right' }) => {
  const { success, error, warning, info } = useToastHelpers();

  const handleSuccess = () => {
    success('Success!', 'Your action has been completed successfully.');
  };

  const handleError = () => {
    error('Error occurred', 'Something went wrong. Please try again later.');
  };

  const handleWarning = () => {
    warning('Warning', 'This action may have unexpected consequences.');
  };

  const handleInfo = () => {
    info('Information', 'Here\'s some helpful information for you.');
  };

  const handleWithAction = () => {
    success('File uploaded', 'Your file has been uploaded successfully.', {
      action: {
        label: 'View file',
        onClick: () => alert('Opening file viewer...')
      },
      duration: 8000
    });
  };

  const handlePersistent = () => {
    error('Connection lost', 'Unable to connect to the server. Please check your internet connection.', {
      duration: 0, // Persistent toast
      dismissible: true
    });
  };

  const handleNonDismissible = () => {
    warning('System maintenance', 'The system will be under maintenance in 5 minutes.', {
      dismissible: false,
      duration: 10000
    });
  };

  const handleMultiple = () => {
    success('First notification', 'This is the first notification.');
    setTimeout(() => info('Second notification', 'This is the second notification.'), 500);
    setTimeout(() => warning('Third notification', 'This is the third notification.'), 1000);
    setTimeout(() => error('Fourth notification', 'This is the fourth notification.'), 1500);
  };

  return (
    <div className="min-h-screen glass-gradient-primary from-slate-100 to-blue-100 glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-glass-text-center mb-12">
          <h1 className="glass-glass-text-4xl font-bold glass-text-secondary glass-glass-mb-4">Toast Notification System</h1>
          <p className="glass-glass-text-xl glass-text-secondary mb-8">
            Click the buttons below to see different types of toast notifications
          </p>
          <p className="glass-glass-text-sm glass-text-secondary">
            Position: {position} • Max 5 toasts • Auto-dismiss after 5 seconds
          </p>
        </div>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 lg:glass-glass-glass-grid-cols-4 glass-glass-gap-4 mb-8">
          <button
            onClick={handleSuccess}
            className="glass-surface-green hover:glass-surface-green glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            ✅ Success Toast
          </button>

          <button
            onClick={handleError}
            className="glass-surface-red hover:glass-surface-red glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            ❌ Error Toast
          </button>

          <button
            onClick={handleWarning}
            className="glass-surface-yellow hover:glass-surface-yellow glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            ⚠️ Warning Toast
          </button>

          <button
            onClick={handleInfo}
            className="glass-surface-blue hover:glass-surface-blue glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            ℹ️ Info Toast
          </button>
        </div>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-4 mb-8">
          <button
            onClick={handleWithAction}
            className="bg-purple-500 hover:bg-purple-600 glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            🔗 Toast with Action
          </button>

          <button
            onClick={handlePersistent}
            className="bg-gray-600 hover:bg-gray-700 glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            📌 Persistent Toast
          </button>
        </div>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-4">
          <button
            onClick={handleNonDismissible}
            className="bg-orange-500 hover:bg-orange-600 glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            🚫 Non-Dismissible Toast
          </button>

          <button
            onClick={handleMultiple}
            className="bg-indigo-500 hover:bg-indigo-600 glass-glass-text-primary glass-glass-font-semibold glass-glass-py-3 glass-glass-px-6 glass-radius-lg transition-colors glass-glass-shadow-lg hover:glass-glass-shadow-xl"
          >
            📚 Multiple Toasts
          </button>
        </div>

        <div className="mt-12 glass-surface-subtle glass-radius-xl glass-glass-p-6 glass-glass-shadow-lg">
          <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">Features:</h3>
          <ul className="glass-text-secondary glass-glass-space-y-2">
            <li>✅ <strong>Multiple Types:</strong> Success, Error, Warning, Info</li>
            <li>✅ <strong>Auto-dismiss:</strong> Configurable duration with progress bar</li>
            <li>✅ <strong>Actions:</strong> Add interactive buttons to toasts</li>
            <li>✅ <strong>Positioning:</strong> 6 different positions available</li>
            <li>✅ <strong>Persistent:</strong> Toasts that stay until manually dismissed</li>
            <li>✅ <strong>Non-dismissible:</strong> Critical notifications users must see</li>
            <li>✅ <strong>Queue Management:</strong> Maximum toast limit with automatic cleanup</li>
            <li>✅ <strong>Smooth Animations:</strong> Enter/exit animations with stagger effect</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

type Story = StoryObj<typeof ToastProvider>;

export const TopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemo position="top-right" />
    </ToastProvider>
  ),
};

export const TopLeft: Story = {
  render: () => (
    <ToastProvider position="top-left">
      <ToastDemo position="top-left" />
    </ToastProvider>
  ),
};

export const BottomRight: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <ToastDemo position="bottom-right" />
    </ToastProvider>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <ToastProvider position="bottom-left">
      <ToastDemo position="bottom-left" />
    </ToastProvider>
  ),
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <ToastDemo position="top-center" />
    </ToastProvider>
  ),
};

export const BottomCenter: Story = {
  render: () => (
    <ToastProvider position="bottom-center">
      <ToastDemo position="bottom-center" />
    </ToastProvider>
  ),
};

export const RealWorldExample: Story = {
  render: () => {
    const RealWorldDemo = () => {
      const { success, error, warning, info } = useToastHelpers();

      const handleSave = () => {
        success('Document saved', 'Your changes have been saved successfully.', {
          action: {
            label: 'View',
            onClick: () => info('Opening document...', 'Redirecting to document view.')
          }
        });
      };

      const handleDelete = () => {
        error('Delete failed', 'Unable to delete the item. It may be in use by another process.', {
          action: {
            label: 'Retry',
            onClick: () => warning('Retrying...', 'Attempting to delete again.')
          }
        });
      };

      const handleUpload = () => {
        info('Upload started', 'Your file is being uploaded...');
        setTimeout(() => {
          success('Upload complete', 'File uploaded successfully to the server.', {
            action: {
              label: 'Share',
              onClick: () => info('Share link copied', 'The share link has been copied to your clipboard.')
            }
          });
        }, 3000);
      };

      const handleMaintenance = () => {
        warning('Scheduled maintenance', 'System will be unavailable for maintenance from 2:00 AM to 4:00 AM EST.', {
          duration: 10000,
          action: {
            label: 'Learn more',
            onClick: () => info('Maintenance details', 'This maintenance will improve system performance and security.')
          }
        });
      };

      return (
        <div className="min-h-screen glass-gradient-primary from-gray-50 to-blue-50 glass-glass-p-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-glass-text-center mb-12">
              <h1 className="glass-glass-text-4xl font-bold glass-text-secondary glass-glass-mb-4">Real-World Toast Examples</h1>
              <p className="glass-glass-text-xl glass-text-secondary">
                Common scenarios where toast notifications provide great user feedback
              </p>
            </div>

            <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6">
              <div className="glass-surface-subtle glass-glass-p-6 glass-radius-xl glass-glass-shadow-lg">
                <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">Document Management</h3>
                <button
                  onClick={handleSave}
                  className="glass-glass-w-full glass-surface-green hover:glass-surface-green glass-glass-text-primary glass-glass-font-medium glass-glass-py-2 glass-glass-px-4 glass-radius-lg transition-colors glass-glass-mb-3"
                >
                  Save Document
                </button>
                <button
                  onClick={handleDelete}
                  className="glass-glass-w-full glass-surface-red hover:glass-surface-red glass-glass-text-primary glass-glass-font-medium glass-glass-py-2 glass-glass-px-4 glass-radius-lg transition-colors"
                >
                  Delete Document
                </button>
              </div>

              <div className="glass-surface-subtle glass-glass-p-6 glass-radius-xl glass-glass-shadow-lg">
                <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">File Operations</h3>
                <button
                  onClick={handleUpload}
                  className="glass-glass-w-full glass-surface-blue hover:glass-surface-blue glass-glass-text-primary glass-glass-font-medium glass-glass-py-2 glass-glass-px-4 glass-radius-lg transition-colors glass-glass-mb-3"
                >
                  Upload File
                </button>
                <button
                  onClick={handleMaintenance}
                  className="glass-glass-w-full glass-surface-yellow hover:glass-surface-yellow glass-glass-text-primary glass-glass-font-medium glass-glass-py-2 glass-glass-px-4 glass-radius-lg transition-colors"
                >
                  System Announcement
                </button>
              </div>
            </div>

            <div className="mt-12 glass-surface-subtle glass-radius-xl glass-glass-p-6 glass-glass-shadow-lg">
              <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">Best Practices:</h3>
              <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6">
                <div>
                  <h4 className="glass-glass-font-medium glass-text-secondary glass-glass-mb-2">Success Toasts</h4>
                  <ul className="glass-glass-text-sm glass-text-secondary space-y-1">
                    <li>• Use for completed actions</li>
                    <li>• Include relevant action buttons</li>
                    <li>• Keep messages concise and positive</li>
                  </ul>
                </div>
                <div>
                  <h4 className="glass-glass-font-medium glass-text-secondary glass-glass-mb-2">Error Toasts</h4>
                  <ul className="glass-glass-text-sm glass-text-secondary space-y-1">
                    <li>• Explain what went wrong</li>
                    <li>• Suggest next steps or solutions</li>
                    <li>• Provide retry or help actions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <ToastProvider position="top-right" maxToasts={3}>
        <RealWorldDemo />
      </ToastProvider>
    );
  },
};