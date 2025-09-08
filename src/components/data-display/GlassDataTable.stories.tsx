import type { Meta, StoryObj } from '@storybook/react';
import { GlassDataTable } from './GlassDataTable';

const meta: Meta<typeof GlassDataTable> = {
  title: 'Components/Data-display/GlassDataTable',
  component: GlassDataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A glass morphism glassdatatable component.',
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered', 'minimal'],
      description: 'Table variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Table size',
    },
    sortable: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    filterable: {
      control: 'boolean',
      description: 'Enable column filtering',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    pagination: {
      control: 'boolean',
      description: 'Enable pagination',
    },
  },
  args: {
    className: '',
    variant: 'default',
    size: 'md',
    sortable: true,
    filterable: true,
    searchable: true,
    pagination: true,
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
    ],
    columns: [
      { header: 'Name', accessorKey: 'name', sortable: true },
      { header: 'Email', accessorKey: 'email', sortable: true },
      { header: 'Role', accessorKey: 'role', filterable: true },
      { header: 'Status', accessorKey: 'status', filterable: true },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof GlassDataTable>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <GlassDataTable {...args} />
    </div>
  ),
};
