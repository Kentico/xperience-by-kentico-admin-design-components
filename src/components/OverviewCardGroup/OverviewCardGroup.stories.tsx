import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { OverviewCardGroup } from './OverviewCardGroup'
import { OverviewCard } from '@/components/OverviewCard'

const meta = {
  title: 'Data Display/OverviewCardGroup',
  component: OverviewCardGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    useEqualWidth: {
      control: 'boolean',
      description:
        'When true, all cards have equal width. When false, cards size based on their content.',
    },
    children: { table: { disable: true } },
  },
  args: {
    useEqualWidth: false,
  },
} satisfies Meta<typeof OverviewCardGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <OverviewCardGroup {...args}>
      <OverviewCard headline="Analytics">
        <p style={{ margin: 0 }}>Total visits: 12,345</p>
      </OverviewCard>
      <OverviewCard headline="Revenue">
        <p style={{ margin: 0 }}>Monthly: $45,678</p>
      </OverviewCard>
      <OverviewCard headline="Users">
        <p style={{ margin: 0 }}>Active: 1,234</p>
      </OverviewCard>
    </OverviewCardGroup>
  ),
}

export const EqualWidth: Story = {
  args: {
    useEqualWidth: true,
  },
  render: (args) => (
    <OverviewCardGroup {...args}>
      <OverviewCard headline="Short">
        <p style={{ margin: 0 }}>Brief content</p>
      </OverviewCard>
      <OverviewCard headline="Medium Content Card">
        <p style={{ margin: 0 }}>
          This card has more content than the others, but all cards share equal
          width.
        </p>
      </OverviewCard>
      <OverviewCard headline="Tiny">
        <p style={{ margin: 0 }}>OK</p>
      </OverviewCard>
    </OverviewCardGroup>
  ),
}
