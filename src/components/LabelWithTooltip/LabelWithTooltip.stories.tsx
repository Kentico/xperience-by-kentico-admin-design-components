import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { LabelWithTooltip } from './LabelWithTooltip'

const meta = {
  title: 'Data Display/LabelWithTooltip',
  component: LabelWithTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Label',
    tooltipText: 'Tooltip text',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text displayed in the label',
    },
    tooltipText: {
      control: 'text',
      description: 'Text displayed in the tooltip',
    },
  },
} satisfies Meta<typeof LabelWithTooltip>

export default meta
type Story = StoryObj<typeof LabelWithTooltip>

export const Default: Story = {
  args: {
    label: 'Label',
    tooltipText: 'This is a tooltip with helpful information.',
  },
}

export const WithShortTooltip: Story = {
  args: {
    label: 'Field Name',
    tooltipText: 'Short tip',
  },
}

export const WithLongTooltip: Story = {
  args: {
    label: 'Configuration Option',
    tooltipText:
      'This is a longer tooltip text that provides more detailed information about the label. It explains what the field is for and how to use it properly.',
  },
}

export const WithLongLabel: Story = {
  args: {
    label: 'This is a very long label that might wrap',
    tooltipText: 'Tooltip for the long label.',
  },
}

export const MultipleLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <LabelWithTooltip label="Username" tooltipText="Enter your unique username." />
      <LabelWithTooltip label="Email Address" tooltipText="Your primary email for notifications." />
      <LabelWithTooltip
        label="Password"
        tooltipText="Must be at least 8 characters with one uppercase letter."
      />
    </div>
  ),
}
