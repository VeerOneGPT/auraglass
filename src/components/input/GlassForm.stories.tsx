import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import {
  GlassForm,
  GlassFormField,
  GlassFormItem,
  GlassFormLabel,
  GlassFormControl,
  GlassFormDescription,
  GlassFormMessage
} from './GlassForm';
import { GlassInput } from './GlassInput';
import { GlassButton } from '../button/GlassButton';

const meta: Meta<typeof GlassForm> = {
  title: 'Components/Input/GlassForm',
  component: GlassForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism form system with form provider and form components.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassForm>;

const SampleForm = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      message: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <GlassForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        <GlassFormField
          control={form.control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address'
            }
          }}
          render={({ field }) => (
            <GlassFormItem>
              <GlassFormLabel required>Email</GlassFormLabel>
              <GlassFormControl>
                <GlassInput
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                />
              </GlassFormControl>
              <GlassFormDescription>
                We'll never share your email with anyone else.
              </GlassFormDescription>
              <GlassFormMessage />
            </GlassFormItem>
          )}
        />

        <GlassFormField
          control={form.control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          }}
          render={({ field }) => (
            <GlassFormItem>
              <GlassFormLabel required>Password</GlassFormLabel>
              <GlassFormControl>
                <GlassInput
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </GlassFormControl>
              <GlassFormMessage />
            </GlassFormItem>
          )}
        />

        <GlassFormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <GlassFormItem>
              <GlassFormLabel>Message</GlassFormLabel>
              <GlassFormControl>
                <textarea
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  rows={3}
                  placeholder="Enter your message"
                  {...field}
                />
              </GlassFormControl>
              <GlassFormMessage />
            </GlassFormItem>
          )}
        />

        <GlassButton type="submit" className="w-full">
          Submit
        </GlassButton>
      </form>
    </GlassForm>
  );
};

export const Default: Story = {
  render: () => <SampleForm />,
};

export const WithGlassStyling: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        name: '',
        email: ''
      }
    });

    const onSubmit = (data: any) => {
      console.log('Form submitted:', data);
    };

    return (
      <GlassForm {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
          <GlassFormField
            control={form.control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <GlassFormItem glass>
                <GlassFormLabel required>Name</GlassFormLabel>
                <GlassFormControl glass>
                  <GlassInput
                    placeholder="Enter your name"
                    {...field}
                  />
                </GlassFormControl>
                <GlassFormMessage />
              </GlassFormItem>
            )}
          />

          <GlassFormField
            control={form.control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field }) => (
              <GlassFormItem glass>
                <GlassFormLabel required>Email</GlassFormLabel>
                <GlassFormControl glass>
                  <GlassInput
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </GlassFormControl>
                <GlassFormMessage />
              </GlassFormItem>
            )}
          />

          <GlassButton type="submit" className="w-full">
            Submit with Glass Styling
          </GlassButton>
        </form>
      </GlassForm>
    );
  },
};
