import type { Meta, StoryObj } from '@storybook/react';
import VoiceGlassControl from './VoiceGlassControl';

import { cn } from '../../lib/utils';
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
    <div className="min-h-screen glass-gradient-primary from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-text-secondary dark:glass-glass-text-primary mb-8">
          Voice Control Demo
        </h1>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6 mb-8">
          <div className="glass-glass-p-6 glass-surface-subtle/80 dark:bg-gray-800/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-subtle/50 dark:glass-glass-border-gray-700/50">
            <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-text-secondary dark:glass-glass-text-primary glass-glass-mb-4">
              Voice Commands
            </h3>
            <div className="glass-glass-space-y-2 glass-glass-text-sm glass-text-secondary dark:text-gray-300">
              <p>Try saying: "Hey Genesis"</p>
              <p>• "Show navigation"</p>
              <p>• "Play music"</p>
              <p>• "Increase volume"</p>
              <p>• "Toggle theme"</p>
              <p>• "Show help"</p>
            </div>
          </div>

          <div className="glass-glass-p-6 glass-surface-subtle/80 dark:bg-gray-800/80 backdrop-blur-lg glass-radius-xl glass-glass-border glass-glass-border-subtle/50 dark:glass-glass-border-gray-700/50">
            <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-text-secondary dark:glass-glass-text-primary glass-glass-mb-4">
              Voice Features
            </h3>
            <div className="glass-glass-space-y-3">
              <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                <div className="w-2 h-2 glass-surface-green glass-radius-full"></div>
                <span className="glass-glass-text-sm glass-text-secondary dark:text-gray-300">Wake word detection</span>
              </div>
              <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                <div className="w-2 h-2 glass-surface-blue glass-radius-full"></div>
                <span className="glass-glass-text-sm glass-text-secondary dark:text-gray-300">Natural language processing</span>
              </div>
              <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-2">
                <div className="w-2 h-2 bg-purple-500 glass-radius-full"></div>
                <span className="glass-glass-text-sm glass-text-secondary dark:text-gray-300">Voice feedback</span>
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
    <div className="min-h-screen glass-gradient-primary from-purple-900 via-pink-900 to-red-900 glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-glass-text-primary mb-8">
          Voice Music Player
        </h1>

        <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-p-6 mb-8">
          <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-mb-4">
            <div>
              <h3 className="glass-glass-text-xl glass-glass-font-semibold glass-glass-text-primary">Now Playing</h3>
              <p className="glass-glass-text-primary/80">Song Title - Artist Name</p>
            </div>
            <div className="glass-glass-flex glass-glass-items-center glass-glass-gap-4">
              <button className="glass-glass-p-2 glass-surface-subtle/20 glass-radius-lg hover:glass-surface-subtle/30 transition-colors">
                ⏮️
              </button>
              <button className="glass-glass-p-3 glass-surface-subtle/20 glass-radius-lg hover:glass-surface-subtle/30 transition-colors">
                ▶️
              </button>
              <button className="glass-glass-p-2 glass-surface-subtle/20 glass-radius-lg hover:glass-surface-subtle/30 transition-colors">
                ⏭️
              </button>
            </div>
          </div>

          <div className="glass-glass-mb-4">
            <div className="glass-glass-w-full glass-surface-subtle/20 glass-radius-full h-2">
              <div className="glass-surface-subtle h-2 glass-radius-full" style={{ width: '30%' }}></div>
            </div>
            <div className="glass-glass-flex glass-glass-justify-between glass-glass-text-sm glass-glass-text-primary/60 mt-1">
              <span>1:23</span>
              <span>4:15</span>
            </div>
          </div>

          <div className="glass-glass-text-center glass-glass-text-primary/80 glass-glass-text-sm">
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
    <div className="min-h-screen glass-gradient-primary from-green-900 via-teal-900 to-blue-900 glass-glass-p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-glass-text-primary mb-8">
          Smart Home Control
        </h1>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-3 glass-glass-gap-6 mb-8">
          <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-p-6">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-mb-4">
              <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary">Living Room</h3>
              <div className="w-3 h-3 glass-surface-yellow glass-radius-full"></div>
            </div>
            <div className="glass-glass-space-y-2 glass-glass-text-sm glass-glass-text-primary/80">
              <p>💡 Lights: On</p>
              <p>🌡️ Temperature: 72°F</p>
              <p>🎵 Music: Playing</p>
            </div>
          </div>

          <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-p-6">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-mb-4">
              <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary">Kitchen</h3>
              <div className="w-3 h-3 glass-surface-green glass-radius-full"></div>
            </div>
            <div className="glass-glass-space-y-2 glass-glass-text-sm glass-glass-text-primary/80">
              <p>💡 Lights: Off</p>
              <p>🌡️ Temperature: 70°F</p>
              <p>🔒 Security: Armed</p>
            </div>
          </div>

          <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-p-6">
            <div className="glass-glass-flex glass-glass-items-center glass-glass-justify-between glass-glass-mb-4">
              <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary">Bedroom</h3>
              <div className="w-3 h-3 glass-surface-blue glass-radius-full"></div>
            </div>
            <div className="glass-glass-space-y-2 glass-glass-text-sm glass-glass-text-primary/80">
              <p>💡 Lights: Dimmed</p>
              <p>🌡️ Temperature: 68°F</p>
              <p>😴 Sleep Mode: Active</p>
            </div>
          </div>
        </div>

        <div className="glass-surface-subtle/10 backdrop-blur-lg glass-radius-xl glass-glass-p-6 mb-8">
          <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">Voice Commands</h3>
          <div className="glass-glass-grid glass-glass-glass-grid-cols-2 md:glass-glass-glass-grid-cols-4 glass-glass-gap-4 glass-glass-text-sm glass-glass-text-primary/80">
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
    <div className="min-h-screen glass-surface-subtle glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-3xl font-bold glass-text-secondary mb-8">
          Accessibility Assistant
        </h1>

        <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-6 mb-8">
          <div className="glass-glass-p-6 glass-surface-subtle glass-radius-xl glass-glass-border glass-glass-border-subtle">
            <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">
              Screen Reader Support
            </h3>
            <div className="glass-glass-space-y-2 glass-glass-text-sm glass-text-secondary">
              <p>🔊 Voice feedback for all actions</p>
              <p>📖 Detailed descriptions</p>
              <p>🎯 Focus management</p>
              <p>⌨️ Keyboard navigation</p>
            </div>
          </div>

          <div className="glass-glass-p-6 glass-surface-subtle glass-radius-xl glass-glass-border glass-glass-border-subtle">
            <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">
              Voice Commands
            </h3>
            <div className="glass-glass-space-y-2 glass-glass-text-sm glass-text-secondary">
              <p>"Read this page"</p>
              <p>"Show help"</p>
              <p>"Increase text size"</p>
              <p>"Toggle high contrast"</p>
            </div>
          </div>
        </div>

        <div className="glass-glass-p-6 bg-blue-50 glass-radius-xl glass-glass-border glass-glass-border-blue-200 mb-8">
          <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-glass-text-primary glass-glass-mb-4">
            Try These Commands
          </h3>
          <div className="glass-glass-grid glass-glass-glass-grid-cols-1 md:glass-glass-glass-grid-cols-2 glass-glass-gap-4 glass-glass-text-sm glass-glass-text-primary">
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
    <div className="min-h-screen glass-surface-subtle glass-glass-p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="glass-glass-text-2xl font-bold glass-text-secondary mb-8">
          Minimal Voice Control
        </h1>

        <div className="glass-glass-p-6 glass-surface-subtle glass-radius-xl glass-glass-border glass-glass-border-subtle glass-glass-shadow-sm">
          <h3 className="glass-glass-text-lg glass-glass-font-semibold glass-text-secondary glass-glass-mb-4">
            Clean Interface
          </h3>
          <p className="glass-text-secondary glass-glass-mb-4">
            Minimal voice control interface with essential features only.
            Perfect for applications that need subtle voice interaction.
          </p>
          <div className="glass-glass-text-sm glass-text-secondary">
            Say "Hey" to activate voice control
          </div>
        </div>

        <VoiceGlassControl {...args} />
      </div>
    </div>
  )
};

