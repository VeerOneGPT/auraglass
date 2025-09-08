import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlassLocalizationProvider, useDateAdapter } from './GlassLocalizationProvider';
import { GlassCard } from '../components/card/GlassCard';
import { GlassButton } from '../components/button/GlassButton';

const meta: Meta<typeof GlassLocalizationProvider> = {
  title: 'Lib/GlassLocalizationProvider',
  component: GlassLocalizationProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A localization provider with glass morphism styling for date formatting and internationalization.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassLocalizationProvider>;

// Component that uses the date adapter
const DateDisplayComponent = () => {
  const adapter = useDateAdapter();

  const now = new Date();
  const tomorrow = adapter.addDays(now, 1);
  const nextMonth = adapter.addMonths(now, 1);
  const nextYear = adapter.addYears(now, 1);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Date Formatting Demo</h3>
        <p className="text-sm opacity-80">Using the Glass Localization Provider for date operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard>
          <div className="p-4">
            <h4 className="font-medium mb-2">Current Date</h4>
            <p className="text-sm opacity-80">{adapter.format(now, 'PPP')}</p>
            <p className="text-xs opacity-60 mt-1">{adapter.format(now, 'PPpp')}</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <h4 className="font-medium mb-2">Tomorrow</h4>
            <p className="text-sm opacity-80">{adapter.format(tomorrow, 'PPP')}</p>
            <p className="text-xs opacity-60 mt-1">{adapter.format(tomorrow, 'EEEE')}</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <h4 className="font-medium mb-2">Next Month</h4>
            <p className="text-sm opacity-80">{adapter.format(nextMonth, 'PPP')}</p>
            <p className="text-xs opacity-60 mt-1">{adapter.format(nextMonth, 'MMMM yyyy')}</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-4">
            <h4 className="font-medium mb-2">Next Year</h4>
            <p className="text-sm opacity-80">{adapter.format(nextYear, 'PPP')}</p>
            <p className="text-xs opacity-60 mt-1">{adapter.format(nextYear, 'yyyy')}</p>
          </div>
        </GlassCard>
      </div>

      <div className="text-center">
        <GlassButton
          onClick={() => {
            const testDate = new Date('2024-03-15');
            alert(`Test date: ${adapter.format(testDate, 'PPP')}\nValid: ${adapter.isValid(testDate)}`);
          }}
        >
          Test Date Operations
        </GlassButton>
      </div>
    </div>
  );
};

// Component that demonstrates parsing
const DateParsingDemo = () => {
  const adapter = useDateAdapter();
  const [inputValue, setInputValue] = React.useState('2024-03-15');
  const [parsedDate, setParsedDate] = React.useState<Date | null>(null);

  const handleParse = () => {
    const parsed = adapter.parse(inputValue, 'yyyy-MM-dd');
    setParsedDate(parsed);
  };

  return (
    <GlassCard>
      <div className="p-6">
        <h4 className="font-medium mb-4">Date Parsing Demo</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date String (yyyy-MM-dd)</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="2024-03-15"
            />
          </div>

          <GlassButton onClick={handleParse} size="sm">
            Parse Date
          </GlassButton>

          {parsedDate && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm font-medium text-green-400">Parsed Successfully!</p>
              <p className="text-sm opacity-80">{adapter.format(parsedDate, 'PPP')}</p>
              <p className="text-xs opacity-60">{parsedDate.toISOString()}</p>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export const Default: Story = {
  render: (args) => (
    <GlassLocalizationProvider {...args}>
      <DateDisplayComponent />
    </GlassLocalizationProvider>
  ),
};

export const DateOperations: Story = {
  render: (args) => (
    <GlassLocalizationProvider {...args}>
      <DateDisplayComponent />
    </GlassLocalizationProvider>
  ),
};

export const DateParsing: Story = {
  render: (args) => (
    <GlassLocalizationProvider {...args}>
      <DateParsingDemo />
    </GlassLocalizationProvider>
  ),
};

export const MultipleComponents: Story = {
  render: (args) => (
    <GlassLocalizationProvider {...args}>
      <div className="space-y-6 max-w-4xl">
        <DateDisplayComponent />
        <DateParsingDemo />
      </div>
    </GlassLocalizationProvider>
  ),
};

export const WithCalendar: Story = {
  render: (args) => (
    <GlassLocalizationProvider {...args}>
      <div className="space-y-6">
        <DateDisplayComponent />

        <GlassCard>
          <div className="p-6">
            <h4 className="font-medium mb-4">Calendar Integration</h4>
            <p className="text-sm opacity-80">
              The GlassLocalizationProvider works seamlessly with date picker and calendar components
              to provide consistent date formatting and localization across your application.
            </p>
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm font-medium text-blue-400">Integration Ready</p>
              <p className="text-xs opacity-80 mt-1">
                Ready to be used with GlassCalendar, GlassDatePicker, and other date components.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </GlassLocalizationProvider>
  ),
};
