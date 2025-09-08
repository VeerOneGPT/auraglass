import type { Meta, StoryObj } from '@storybook/react';
import { GlassCalendar } from './GlassCalendar';

const meta: Meta<typeof GlassCalendar> = {
  title: 'Components/Calendar/GlassCalendar',
  component: GlassCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A full-featured calendar with glassmorphism styling, event support, and smooth animations.',
      },
    },
  },
  argTypes: {
    selectedDate: {
      control: 'date',
      description: 'Currently selected date',
    },
    view: {
      control: { type: 'select' },
      options: ['month', 'week', 'day'],
      description: 'Calendar view mode',
    },
    showEvents: {
      control: 'boolean',
      description: 'Show events in calendar cells',
    },
    showToday: {
      control: 'boolean',
      description: 'Highlight today\'s date',
    },
    showWeekends: {
      control: 'boolean',
      description: 'Show weekend days',
    },
    dateFormat: {
      control: { type: 'select' },
      options: ['short', 'long', 'numeric'],
      description: 'Date formatting style',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    selectedDate: new Date(),
    view: 'month',
    showEvents: true,
    showToday: true,
    showWeekends: true,
    dateFormat: 'short',
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof GlassCalendar>;

// Sample events for demonstration
const sampleEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    type: 'meeting' as const,
    color: '#3b82f6',
  },
  {
    id: '2',
    title: 'Project Review',
    date: new Date(Date.now() + 86400000), // Tomorrow
    startTime: '14:00',
    endTime: '15:30',
    type: 'meeting' as const,
    color: '#10b981',
  },
  {
    id: '3',
    title: 'Design Workshop',
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    startTime: '09:00',
    endTime: '12:00',
    type: 'event' as const,
    color: '#f59e0b',
  },
];

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <GlassCalendar {...args} />
    </div>
  ),
  args: {
    events: sampleEvents,
  },
};

export const Views: Story = {
  render: (args) => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Month View</h4>
        <GlassCalendar {...args} view="month" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Week View</h4>
        <GlassCalendar {...args} view="week" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Day View</h4>
        <GlassCalendar {...args} view="day" />
      </div>
    </div>
  ),
  args: {
    events: sampleEvents,
  },
};

export const WithEvents: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <GlassCalendar {...args} />
    </div>
  ),
  args: {
    events: sampleEvents,
    showEvents: true,
  },
};

export const WithoutWeekends: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <GlassCalendar {...args} />
    </div>
  ),
  args: {
    showWeekends: false,
    events: sampleEvents,
  },
};

export const Loading: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <GlassCalendar {...args} />
    </div>
  ),
  args: {
    loading: true,
  },
};

export const CustomDate: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl">
      <GlassCalendar {...args} />
    </div>
  ),
  args: {
    selectedDate: new Date(2024, 11, 25), // Christmas
    events: [
      {
        id: 'holiday',
        title: 'Christmas Day',
        date: new Date(2024, 11, 25),
        type: 'event' as const,
        color: '#ef4444',
      },
    ],
  },
};
