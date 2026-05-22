import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Spinner, type SpinnerProps } from './Spinner'

const spinnerSizes: SpinnerProps['size'][] = ['small', 'medium', 'large']

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'medium',
  },
  argTypes: {
    size: {
      control: 'select',
      options: spinnerSizes,
      description: 'Size variant of the spinner',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {spinnerSizes.map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Spinner size={size} />
          <span style={{ fontSize: 12, color: '#666' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
}
