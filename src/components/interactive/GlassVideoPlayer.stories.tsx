import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { GlassVideoPlayer } from './GlassVideoPlayer';
import { cn } from '../../lib/utils';

const meta: Meta<typeof GlassVideoPlayer> = {
  title: 'Components/Interactive/GlassVideoPlayer',
  component: GlassVideoPlayer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassvideoplayer component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    title: {
      control: 'text',
      description: 'Video title',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Auto-play video',
    },
    controls: {
      control: 'boolean',
      description: 'Show controls',
    },
    enableFullscreen: {
      control: 'boolean',
      description: 'Enable fullscreen',
    },
  },
  args: {
    className: '',
    title: 'Sample Video',
    autoPlay: false,
    controls: true,
    enableFullscreen: true,
  },
};

export default meta;
type Story = StoryObj<typeof GlassVideoPlayer>;

export const Default: Story = {
  args: {
    sources: [
      {
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4',
        quality: '720p',
      },
    ],
    poster: 'https://via.placeholder.com/640x360/0066cc/ffffff?text=Video+Poster',
    onPlay: fn(),
    onPause: fn(),
  },
};

export const WithSubtitles: Story = {
  args: {
    sources: [
      {
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        type: 'video/mp4',
      },
    ],
    title: 'Video with Subtitles',
    subtitles: [
      {
        src: 'https://example.com/subtitles.vtt',
        label: 'English',
        language: 'en',
        default: true,
      },
    ],
    enableFullscreen: true,
    enablePiP: true,
  },
};
