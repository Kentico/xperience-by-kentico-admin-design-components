import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { InfoCard } from './InfoCard'

const meta = {
  title: 'Data Display/InfoCard',
  component: InfoCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    caption: 'Total Users',
    tooltip: 'Total number of registered users in the system',
    text: '12,847',
    details: '+3.2% from last month',
  },
  argTypes: {
    caption: {
      control: 'text',
      description: 'The caption/title displayed at the top of the card',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text shown when hovering the info icon',
    },
    text: {
      control: 'text',
      description: 'The main emphasized value/text',
    },
    details: {
      control: 'text',
      description: 'Additional detail text displayed below the main text',
    },
  },
} satisfies Meta<typeof InfoCard>

export default meta
type Story = StoryObj<typeof InfoCard>

export const Default: Story = {
  args: {
    caption: 'Total Users',
    tooltip: 'Total number of registered users in the system',
    text: '12,847',
    details: '+3.2% from last month',
  },
}

export const PercentageValue: Story = {
  args: {
    caption: 'Conversion Rate',
    tooltip: 'Percentage of visitors who completed the target action',
    text: '4.8%',
    details: 'Above 4% target',
  },
}

export const DurationValue: Story = {
  args: {
    caption: 'Avg. Session',
    tooltip: 'Average time users spend per session',
    text: '6m 32s',
    details: 'Desktop users only',
  },
}

export const CurrencyValue: Story = {
  args: {
    caption: 'Revenue',
    tooltip: 'Total revenue for the current period',
    text: '$45,230',
    details: 'Q4 2024',
  },
}

export const ContentTypeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', maxWidth: 800 }}>
      <InfoCard
        caption="Total Users"
        tooltip="Total number of registered users in the system"
        text="12,847"
        details="+3.2% from last month"
      />
      <InfoCard
        caption="Conversion Rate"
        tooltip="Percentage of visitors who completed the target action"
        text="4.8%"
        details="Above 4% target"
      />
      <InfoCard
        caption="Avg. Session"
        tooltip="Average time users spend per session"
        text="6m 32s"
        details="Desktop users only"
      />
    </div>
  ),
}

export const DashboardLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        width: 800,
      }}
    >
      <InfoCard
        caption="Active Users"
        tooltip="Users who logged in within the last 30 days"
        text="8,421"
        details="65% of total users"
      />
      <InfoCard
        caption="New Signups"
        tooltip="Users registered this month"
        text="342"
        details="+12% from last month"
      />
      <InfoCard
        caption="Bounce Rate"
        tooltip="Percentage of single-page sessions"
        text="32.5%"
        details="Below 40% target"
      />
      <InfoCard
        caption="Page Views"
        tooltip="Total page views this month"
        text="1.2M"
        details="Across all pages"
      />
      <InfoCard
        caption="Avg. Load Time"
        tooltip="Average page load time"
        text="1.4s"
        details="Within acceptable range"
      />
      <InfoCard
        caption="Error Rate"
        tooltip="Percentage of requests resulting in errors"
        text="0.03%"
        details="Below 0.1% threshold"
      />
    </div>
  ),
}
