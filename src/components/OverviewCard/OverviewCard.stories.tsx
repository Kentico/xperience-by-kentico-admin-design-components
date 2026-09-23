import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { OverviewCard } from './OverviewCard'
import { Button } from '@/components/Button'
import { ButtonSize } from '@/components/Button/Button.types'

const meta = {
  title: 'Data Display/OverviewCard',
  component: OverviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    headline: {
      control: 'text',
      description: 'Optional headline text displayed at the top of the card',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether the card should fill the full height of its parent',
    },
    actions: {
      control: false,
      description: 'Actions rendered in the card footer',
    },
    children: { table: { disable: true } },
  },
  args: {
    headline: 'Overview',
    fullHeight: false,
  },
} satisfies Meta<typeof OverviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <OverviewCard {...args}>
      <p style={{ margin: 0 }}>First section with summary content.</p>
      <p style={{ margin: 0 }}>Second section with additional details.</p>
    </OverviewCard>
  ),
}

export const WithActions: Story = {
  args: {
    headline: 'Analytics',
    actions: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button color="secondary" size={ButtonSize.S} label="Export" />
        <Button color="primary" size={ButtonSize.S} label="View Details" />
      </div>
    ),
  },
  render: (args) => (
    <OverviewCard {...args}>
      <p style={{ margin: 0 }}>Total visits: 12,345</p>
      <p style={{ margin: 0 }}>Conversion rate: 3.2%</p>
    </OverviewCard>
  ),
}

export const FullHeight: Story = {
  args: {
    headline: 'Full Height Card',
    fullHeight: true,
  },
  render: (args) => (
    <div style={{ height: 300, display: 'flex' }}>
      <OverviewCard {...args}>
        <p style={{ margin: 0 }}>
          This card fills the full height of its container.
        </p>
      </OverviewCard>
    </div>
  ),
}
