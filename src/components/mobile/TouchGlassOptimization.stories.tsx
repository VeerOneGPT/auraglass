import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
    AdaptiveGlassDensity,
    MobileGlassBottomSheet,
    MobileGlassNavigation,
    TouchOptimizedGlass,
    TouchRippleEffects
} from './TouchGlassOptimization';

const meta: Meta<typeof TouchOptimizedGlass> = {
  title: 'Mobile/TouchGlassOptimization',
  component: TouchOptimizedGlass,
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive touch interaction optimization for glassmorphism components with haptic feedback, gesture recognition, and mobile-first interactions.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TouchOptimizedGlass>;

const TouchDemo = () => {
  const [tapCount, setTapCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string>('');

  const handleTap = () => {
    setTapCount(prev => prev + 1);
    setLastAction('Tap');
  };

  const handleLongPress = () => {
    setLongPressCount(prev => prev + 1);
    setLastAction('Long Press');
  };

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    setSwipeDirection(direction);
    setLastAction(`Swipe ${direction}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Touch Glass Interactions</h2>
        <p className="text-white/80">
          Try tapping, long pressing, and swiping on the glass below
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{tapCount}</div>
          <div className="text-white/80">Taps</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{longPressCount}</div>
          <div className="text-white/80">Long Presses</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
          <div className="text-2xl font-bold text-white mb-2">
            {swipeDirection ? swipeDirection.toUpperCase() : '—'}
          </div>
          <div className="text-white/80">Last Swipe</div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3">
          <div className="text-white/60 text-sm">Last Action:</div>
          <div className="text-white font-medium">{lastAction || 'None'}</div>
        </div>
      </div>

      <div className="text-center">
        <TouchOptimizedGlass
          onTap={handleTap}
          onLongPress={handleLongPress}
          onSwipe={handleSwipe}
          touchFeedback={true}
          rippleEffect={true}
          hapticsEnabled={true}
          glassIntensity="medium"
          className="mx-auto"
        >
          <div className="p-8 min-h-[200px] flex flex-col items-center justify-center">
            <div className="text-4xl mb-4">👆</div>
            <div className="text-xl font-semibold text-white mb-2">Touch Glass</div>
            <div className="text-white/70 text-sm text-center max-w-xs">
              Tap, long press, or swipe this glass surface to see different interactions
            </div>
          </div>
        </TouchOptimizedGlass>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Touch Instructions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span><strong>Tap:</strong> Quick touch for immediate action</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span><strong>Long Press:</strong> Hold for 500ms for context menu</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span><strong>Swipe Left/Right:</strong> Navigate between content</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-400" />
              <span><strong>Swipe Up/Down:</strong> Scroll or dismiss</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveTouch: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <TouchDemo />
      </div>
    </div>
  ),
};

export const TouchFeedback: Story = {
  args: {
    touchFeedback: true,
    rippleEffect: true,
    hapticsEnabled: true,
    children: (
      <div className="p-6 text-center">
        <div className="text-4xl mb-3">📱</div>
        <div className="text-white font-medium">Touch Feedback</div>
        <div className="text-white/70 text-sm">Visual, haptic, and ripple effects</div>
      </div>
    )
  },
  render: (args) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            🎯 Touch Feedback Demo
          </h1>
          <p className="text-xl text-white/80">
            Experience visual feedback, haptic responses, and ripple effects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <TouchOptimizedGlass
            {...args}
            onTap={() => console.log('Light feedback')}
            glassIntensity="light"
          />

          <TouchOptimizedGlass
            {...args}
            onTap={() => console.log('Medium feedback')}
            glassIntensity="medium"
          />

          <TouchOptimizedGlass
            {...args}
            onTap={() => console.log('Heavy feedback')}
            glassIntensity="heavy"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Feedback Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">👆</div>
              <h4 className="font-medium text-white mb-2">Visual Feedback</h4>
              <p className="text-white/70 text-sm">Scale and opacity changes on touch</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">📳</div>
              <h4 className="font-medium text-white mb-2">Haptic Feedback</h4>
              <p className="text-white/70 text-sm">Vibration patterns for touch confirmation</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">💫</div>
              <h4 className="font-medium text-white mb-2">Ripple Effects</h4>
              <p className="text-white/70 text-sm">Material Design-inspired touch ripples</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MobileNavigation: Story = {
  args: {},
  render: () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [swipeHistory, setSwipeHistory] = useState<string[]>([]);

    const pages = [
      { title: 'Dashboard', icon: '📊', color: 'from-blue-500 to-cyan-500' },
      { title: 'Messages', icon: '💬', color: 'from-green-500 to-emerald-500' },
      { title: 'Settings', icon: '⚙️', color: 'from-purple-500 to-pink-500' },
      { title: 'Profile', icon: '👤', color: 'from-orange-500 to-red-500' }
    ];

    const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
      setSwipeHistory(prev => [...prev.slice(-4), direction]);

      if (direction === 'left' && currentPage < pages.length - 1) {
        setCurrentPage(prev => prev + 1);
      } else if (direction === 'right' && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              📱 Mobile Glass Navigation
            </h1>
            <p className="text-xl text-white/80">
              Swipe left/right to navigate between pages
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {pages.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPage ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div className="text-center mb-6">
              <div className="inline-block bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3">
                <div className="text-white/60 text-sm">Current Page</div>
                <div className="text-white font-medium">{pages[currentPage].title}</div>
              </div>
            </div>
          </div>

          <MobileGlassNavigation
            onSwipeLeft={() => handleSwipe('left')}
            onSwipeRight={() => handleSwipe('right')}
            onSwipeUp={() => handleSwipe('up')}
            onSwipeDown={() => handleSwipe('down')}
          >
            <div className="p-8 text-center">
              <div className={`inline-block p-8 rounded-3xl bg-gradient-to-br ${pages[currentPage].color} mb-6`}>
                <div className="text-6xl">{pages[currentPage].icon}</div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{pages[currentPage].title}</h2>
              <p className="text-white/70 text-lg">
                Swipe left or right to navigate between different sections
              </p>
            </div>
          </MobileGlassNavigation>

          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Swipe History</h3>
            <div className="flex flex-wrap gap-2">
              {swipeHistory.length === 0 ? (
                <div className="text-white/60">No swipes yet</div>
              ) : (
                swipeHistory.map((swipe, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-white/20 rounded-lg text-white text-sm"
                  >
                    {swipe} →
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Navigation Controls</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleSwipe('left')}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-medium transition-colors"
                disabled={currentPage >= pages.length - 1}
              >
                ← Left
              </button>

              <button
                onClick={() => handleSwipe('right')}
                className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-medium transition-colors"
                disabled={currentPage <= 0}
              >
                Right →
              </button>

              <button
                onClick={() => handleSwipe('up')}
                className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition-colors"
              >
                ↑ Up
              </button>

              <button
                onClick={() => handleSwipe('down')}
                className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition-colors"
              >
                Down ↓
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AdaptiveDensity: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            📐 Adaptive Glass Density
          </h1>
          <p className="text-xl text-white/80">
            Glass effects that automatically adapt to screen size and device capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AdaptiveGlassDensity screenSize="small" devicePixelRatio={1} autoAdapt={true}>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-xl font-semibold text-white mb-2">Mobile (Small)</h3>
              <p className="text-white/70 text-sm">
                Optimized for small screens with reduced effects for better performance
              </p>
              <div className="mt-4 text-white/60 text-xs">
                • Lower density effects<br/>
                • Reduced blur intensity<br/>
                • Minimal animations<br/>
                • Touch-optimized
              </div>
            </div>
          </AdaptiveGlassDensity>

          <AdaptiveGlassDensity screenSize="medium" devicePixelRatio={1.5} autoAdapt={true}>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-xl font-semibold text-white mb-2">Tablet (Medium)</h3>
              <p className="text-white/70 text-sm">
                Balanced effects for medium screens with moderate performance impact
              </p>
              <div className="mt-4 text-white/60 text-xs">
                • Medium density effects<br/>
                • Standard blur intensity<br/>
                • Balanced animations<br/>
                • Touch-friendly
              </div>
            </div>
          </AdaptiveGlassDensity>

          <AdaptiveGlassDensity screenSize="large" devicePixelRatio={2} autoAdapt={true}>
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🖥️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Desktop (Large)</h3>
              <p className="text-white/70 text-sm">
                Full effects for large screens with high-performance capabilities
              </p>
              <div className="mt-4 text-white/60 text-xs">
                • High density effects<br/>
                • Maximum blur intensity<br/>
                • Complex animations<br/>
                • Mouse optimized
              </div>
            </div>
          </AdaptiveGlassDensity>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Adaptive Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📏</div>
              <h4 className="font-semibold text-white mb-2">Screen Size</h4>
              <p className="text-white/70 text-sm">Adapts to viewport dimensions</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="font-semibold text-white mb-2">Pixel Ratio</h4>
              <p className="text-white/70 text-sm">Considers device pixel density</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-white mb-2">Performance</h4>
              <p className="text-white/70 text-sm">Auto-adjusts based on capabilities</p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">♿</div>
              <h4 className="font-semibold text-white mb-2">Accessibility</h4>
              <p className="text-white/70 text-sm">Maintains usability across devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const RippleEffects: Story = {
  args: {},
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            💫 Touch Ripple Effects
          </h1>
          <p className="text-xl text-white/80">
            Material Design-inspired ripple effects with customizable colors and timing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <TouchRippleEffects
            color="rgba(255, 255, 255, 0.4)"
            maxRipples={3}
            rippleDuration={600}
          >
            <div className="p-8 text-center bg-white/10 backdrop-blur-lg rounded-2xl">
              <div className="text-4xl mb-3">🌊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Default Ripple</h3>
              <p className="text-white/70 text-sm">
                Standard white ripple with medium duration and up to 3 simultaneous ripples
              </p>
            </div>
          </TouchRippleEffects>

          <TouchRippleEffects
            color="rgba(59, 130, 246, 0.6)"
            maxRipples={5}
            rippleDuration={800}
          >
            <div className="p-8 text-center bg-white/10 backdrop-blur-lg rounded-2xl">
              <div className="text-4xl mb-3">💙</div>
              <h3 className="text-xl font-semibold text-white mb-2">Blue Ripple</h3>
              <p className="text-white/70 text-sm">
                Custom blue color with longer duration and more simultaneous ripples
              </p>
            </div>
          </TouchRippleEffects>

          <TouchRippleEffects
            color="rgba(16, 185, 129, 0.5)"
            maxRipples={2}
            rippleDuration={400}
          >
            <div className="p-8 text-center bg-white/10 backdrop-blur-lg rounded-2xl">
              <div className="text-4xl mb-3">💚</div>
              <h3 className="text-xl font-semibold text-white mb-2">Green Ripple</h3>
              <p className="text-white/70 text-sm">
                Fast green ripple with limited simultaneous effects for subtle feedback
              </p>
            </div>
          </TouchRippleEffects>

          <TouchRippleEffects
            color="rgba(249, 115, 22, 0.7)"
            maxRipples={4}
            rippleDuration={1000}
          >
            <div className="p-8 text-center bg-white/10 backdrop-blur-lg rounded-2xl">
              <div className="text-4xl mb-3">🧡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Orange Ripple</h3>
              <p className="text-white/70 text-sm">
                Bold orange ripple with slow, dramatic animation and multiple effects
              </p>
            </div>
          </TouchRippleEffects>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Ripple Effect Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-white mb-3">Customization Options</h4>
              <div className="space-y-2 text-white/80">
                <div>• Custom colors and opacity</div>
                <div>• Adjustable animation duration</div>
                <div>• Configurable ripple limits</div>
                <div>• Size and scale control</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Performance Features</h4>
              <div className="space-y-2 text-white/80">
                <div>• Efficient DOM manipulation</div>
                <div>• Automatic cleanup</div>
                <div>• GPU-accelerated animations</div>
                <div>• Memory leak prevention</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BottomSheet: Story = {
  args: {},
  render: () => {
    const [sheets, setSheets] = useState({
      menu: false,
      settings: false,
      profile: false
    });

    const openSheet = (sheet: keyof typeof sheets) => {
      setSheets(prev => ({ ...prev, [sheet]: true }));
    };

    const closeSheet = (sheet: keyof typeof sheets) => {
      setSheets(prev => ({ ...prev, [sheet]: false }));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">
              📄 Mobile Glass Bottom Sheet
            </h1>
            <p className="text-xl text-white/80">
              Touch-optimized bottom sheets with snap points and smooth animations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl mb-4">
                <div className="text-4xl mb-3">🍽️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Menu Sheet</h3>
                <p className="text-white/70 text-sm mb-4">
                  Navigation menu with quick actions and shortcuts
                </p>
                <button
                  onClick={() => openSheet('menu')}
                  className="px-6 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-medium transition-colors"
                >
                  Open Menu
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl mb-4">
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="text-xl font-semibold text-white mb-2">Settings Sheet</h3>
                <p className="text-white/70 text-sm mb-4">
                  Configuration options and preferences panel
                </p>
                <button
                  onClick={() => openSheet('settings')}
                  className="px-6 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition-colors"
                >
                  Open Settings
                </button>
              </div>
            </div>

            <div className="text-center">
              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl mb-4">
                <div className="text-4xl mb-3">👤</div>
                <h3 className="text-xl font-semibold text-white mb-2">Profile Sheet</h3>
                <p className="text-white/70 text-sm mb-4">
                  User profile information and account settings
                </p>
                <button
                  onClick={() => openSheet('profile')}
                  className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg font-medium transition-colors"
                >
                  Open Profile
                </button>
              </div>
            </div>
          </div>

          {/* Menu Sheet */}
          <MobileGlassBottomSheet
            isOpen={sheets.menu}
            onClose={() => closeSheet('menu')}
            height="60vh"
            snapPoints={['30vh', '60vh', '80vh']}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Navigation Menu</h2>
              <div className="space-y-4">
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  🏠 Home
                </button>
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  🔍 Search
                </button>
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  ❤️ Favorites
                </button>
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  📱 Downloads
                </button>
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </MobileGlassBottomSheet>

          {/* Settings Sheet */}
          <MobileGlassBottomSheet
            isOpen={sheets.settings}
            onClose={() => closeSheet('settings')}
            height="70vh"
            snapPoints={['40vh', '70vh']}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Notifications</span>
                  <div className="w-12 h-6 bg-white/20 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full transform translate-x-6"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Dark Mode</span>
                  <div className="w-12 h-6 bg-blue-500 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Auto-play</span>
                  <div className="w-12 h-6 bg-white/20 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <button className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors">
                    Clear Cache
                  </button>
                </div>
              </div>
            </div>
          </MobileGlassBottomSheet>

          {/* Profile Sheet */}
          <MobileGlassBottomSheet
            isOpen={sheets.profile}
            onClose={() => closeSheet('profile')}
            height="75vh"
            snapPoints={['50vh', '75vh']}
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">John Doe</h2>
                <p className="text-white/70">john.doe@example.com</p>
              </div>

              <div className="space-y-4">
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  ✏️ Edit Profile
                </button>
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  🔒 Privacy Settings
                </button>
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  🔔 Notification Preferences
                </button>
                <button className="w-full p-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors text-left">
                  💳 Subscription
                </button>

                <div className="pt-4 border-t border-white/20">
                  <button className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </MobileGlassBottomSheet>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Bottom Sheet Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">📏</div>
                <h4 className="font-semibold text-white mb-2">Snap Points</h4>
                <p className="text-white/70 text-sm">Multiple height positions</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">👆</div>
                <h4 className="font-semibold text-white mb-2">Touch Drag</h4>
                <p className="text-white/70 text-sm">Smooth drag interactions</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold text-white mb-2">Backdrop</h4>
                <p className="text-white/70 text-sm">Modal backdrop with blur</p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-semibold text-white mb-2">Mobile First</h4>
                <p className="text-white/70 text-sm">Optimized for mobile UX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
