import type { Meta, StoryObj } from '@storybook/react';
import VoiceGlassControl from './VoiceGlassControl';

import { cn } from '@/lib/utils';
const meta: Meta<typeof VoiceGlassControl> = {
  title: 'Voice/VoiceGlassControl',
  component: VoiceGlassControl,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced voice interaction system with wake word detection, natural language processing, and hands-free glass UI control.'
      }
    }
  },
  argTypes: {
    position: {
      control: { type: 'select', options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'] },
      description: 'Control panel position'
    },
    autoEnable: {
      control: 'boolean',
      description: 'Automatically enable on mount'
    },
    showTranscript: {
      control: 'boolean',
      description: 'Display speech transcript'
    },
    wakeWord: {
      control: 'text',
      description: 'Wake word for activation'
    },
    enableFeedback: {
      control: 'boolean',
      description: 'Enable voice feedback'
    },
    showHelp: {
      control: 'boolean',
      description: 'Show help button'
    }
  }
};

export default meta;
type Story = StoryObj<typeof VoiceGlassControl>;

export const Default: Story = {
  args: {
    position: 'top-left',
    autoEnable: false,
    showTranscript: true,
    wakeWord: 'Hey Genesis',
    enableFeedback: true,
    showHelp: true
  },
  render: (args: any) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Voice Control Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Voice Commands
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Try saying: "Hey Genesis"</p>
              <p>• "Show navigation"</p>
              <p>• "Play music"</p>
              <p>• "Increase volume"</p>
              <p>• "Toggle theme"</p>
              <p>• "Show help"</p>
            </div>
          </div>

          <div className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Voice Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Wake word detection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Natural language processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Voice feedback</span>
              </div>
            </div>
          </div>
        </div>

        <VoiceGlassControl {...args} />
      </div>
    </div>
  )
};

export const MusicPlayer: Story = {
  args: {
    position: 'bottom-right',
    autoEnable: true,
    showTranscript: true,
    wakeWord: 'Hey Music',
    enableFeedback: true,
    showHelp: true
  },
  render: (args: any) => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Voice Music Player
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">Now Playing</h3>
              <p className="text-white/80">Song Title - Artist Name</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                ⏮️
              </button>
              <button className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                ▶️
              </button>
              <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                ⏭️
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-white/60 mt-1">
              <span>1:23</span>
              <span>4:15</span>
            </div>
          </div>

          <div className="text-center text-white/80 text-sm">
            Try saying: "Play music", "Pause music", "Next track", "Increase volume"
          </div>
        </div>

        <VoiceGlassControl {...args} />
      </div>
    </div>
  )
};

export const SmartHome: Story = {
  args: {
    position: 'top-right',
    autoEnable: true,
    showTranscript: true,
    wakeWord: 'Hey Home',
    enableFeedback: true,
    showHelp: true
  },
  render: (args: any) => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Smart Home Control
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Living Room</h3>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <p>💡 Lights: On</p>
              <p>🌡️ Temperature: 72°F</p>
              <p>🎵 Music: Playing</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Kitchen</h3>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <p>💡 Lights: Off</p>
              <p>🌡️ Temperature: 70°F</p>
              <p>🔒 Security: Armed</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Bedroom</h3>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
            <div className="space-y-2 text-sm text-white/80">
              <p>💡 Lights: Dimmed</p>
              <p>🌡️ Temperature: 68°F</p>
              <p>😴 Sleep Mode: Active</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Voice Commands</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/80">
            <div>"Turn on lights"</div>
            <div>"Set temperature to 72"</div>
            <div>"Play music"</div>
            <div>"Arm security"</div>
            <div>"Good night"</div>
            <div>"Wake up"</div>
            <div>"Lock doors"</div>
            <div>"Show cameras"</div>
          </div>
        </div>

        <VoiceGlassControl {...args} />
      </div>
    </div>
  )
};

export const Accessibility: Story = {
  args: {
    position: 'bottom-left',
    autoEnable: true,
    showTranscript: true,
    wakeWord: 'Hey Assist',
    enableFeedback: true,
    showHelp: true
  },
  render: (args: any) => (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Accessibility Assistant
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Screen Reader Support
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🔊 Voice feedback for all actions</p>
              <p>📖 Detailed descriptions</p>
              <p>🎯 Focus management</p>
              <p>⌨️ Keyboard navigation</p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Voice Commands
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>"Read this page"</p>
              <p>"Show help"</p>
              <p>"Increase text size"</p>
              <p>"Toggle high contrast"</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Try These Commands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>"What's on this page?"</div>
            <div>"Read the main content"</div>
            <div>"Show navigation menu"</div>
            <div>"Go to settings"</div>
            <div>"Increase font size"</div>
            <div>"Toggle dark mode"</div>
          </div>
        </div>

        <VoiceGlassControl {...args} />
      </div>
    </div>
  )
};

export const Minimal: Story = {
  args: {
    position: 'top-left',
    autoEnable: false,
    showTranscript: false,
    wakeWord: 'Hey',
    enableFeedback: false,
    showHelp: false
  },
  render: (args: any) => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Minimal Voice Control
        </h1>

        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Clean Interface
          </h3>
          <p className="text-gray-600 mb-4">
            Minimal voice control interface with essential features only.
            Perfect for applications that need subtle voice interaction.
          </p>
          <div className="text-sm text-gray-500">
            Say "Hey" to activate voice control
          </div>
        </div>

        <VoiceGlassControl {...args} />
      </div>
    </div>
  )
};

