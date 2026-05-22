import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { FunnelChart } from './FunnelChart'
import { FunnelOrientation } from './FunnelChart.types'

const sampleData = [
  { stage: 'Awareness', interactions: 1000 },
  { stage: 'Interest', interactions: 800 },
  { stage: 'Decision', interactions: 400 },
  { stage: 'Action', interactions: 200 },
]

const meta = {
  title: 'Data Display/FunnelChart',
  component: FunnelChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    chartId: 'funnel-chart-default',
    data: sampleData,
    orientation: FunnelOrientation.Vertical,
    locale: 'en-US',
  },
  argTypes: {
    chartId: {
      control: 'text',
      description:
        'Unique ID for the chart container element. Must be unique when multiple charts are rendered on the same page.',
    },
    data: {
      control: 'object',
      description:
        'Data to be displayed in the chart. Each item represents a stage in the funnel with a label and value.',
    },
    orientation: {
      control: 'select',
      options: [FunnelOrientation.Vertical, FunnelOrientation.Horizontal],
      description: 'Orientation of the funnel chart.',
    },
    locale: {
      control: 'text',
      description:
        'Locale to use for formatting numbers (e.g., "en-US", "de-DE"). Affects how numbers are displayed in tooltips and labels.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FunnelChart>

export default meta
type Story = StoryObj<typeof FunnelChart>

export const Default: Story = {
  args: {
    chartId: 'funnel-chart-default',
    data: sampleData,
    orientation: FunnelOrientation.Vertical,
    locale: 'en-US',
  },
}

export const Vertical: Story = {
  args: {
    chartId: 'funnel-chart-vertical',
    data: sampleData,
    orientation: FunnelOrientation.Vertical,
    locale: 'en-US',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Vertical orientation displays the funnel with stages stacked from top to bottom.',
      },
    },
  },
}

export const Horizontal: Story = {
  args: {
    chartId: 'funnel-chart-horizontal',
    data: sampleData,
    orientation: FunnelOrientation.Horizontal,
    locale: 'en-US',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal orientation displays the funnel with stages flowing from left to right.',
      },
    },
  },
}

export const SalesFunnel: Story = {
  args: {
    chartId: 'funnel-chart-sales',
    data: [
      { stage: 'Leads', interactions: 5000 },
      { stage: 'Qualified', interactions: 2500 },
      { stage: 'Proposal', interactions: 1200 },
      { stage: 'Negotiation', interactions: 600 },
      { stage: 'Closed Won', interactions: 300 },
    ],
    orientation: FunnelOrientation.Vertical,
    locale: 'en-US',
  },
  parameters: {
    docs: {
      description: {
        story: 'A typical sales funnel showing the conversion from leads to closed deals.',
      },
    },
  },
}

export const MarketingFunnel: Story = {
  args: {
    chartId: 'funnel-chart-marketing',
    data: [
      { stage: 'Impressions', interactions: 100000 },
      { stage: 'Clicks', interactions: 15000 },
      { stage: 'Sign-ups', interactions: 3000 },
      { stage: 'Purchases', interactions: 500 },
    ],
    orientation: FunnelOrientation.Vertical,
    locale: 'en-US',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A marketing funnel demonstrating user journey from impressions to purchases.',
      },
    },
  },
}

export const GermanLocale: Story = {
  args: {
    chartId: 'funnel-chart-german',
    data: [
      { stage: 'Bewusstsein', interactions: 10000 },
      { stage: 'Interesse', interactions: 7500 },
      { stage: 'Entscheidung', interactions: 4000 },
      { stage: 'Aktion', interactions: 1500 },
    ],
    orientation: FunnelOrientation.Vertical,
    locale: 'de-DE',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates German locale formatting. Numbers will use German number formatting conventions.',
      },
    },
  },
}

export const OrientationComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          Vertical Orientation
        </div>
        <div style={{ height: '300px' }}>
          <FunnelChart
            chartId="funnel-comparison-vertical"
            data={sampleData}
            orientation={FunnelOrientation.Vertical}
            locale="en-US"
          />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          Horizontal Orientation
        </div>
        <div style={{ height: '300px' }}>
          <FunnelChart
            chartId="funnel-comparison-horizontal"
            data={sampleData}
            orientation={FunnelOrientation.Horizontal}
            locale="en-US"
          />
        </div>
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of vertical and horizontal orientations using the same data.',
      },
    },
  },
}

export const MinimalData: Story = {
  args: {
    chartId: 'funnel-chart-minimal',
    data: [
      { stage: 'Start', interactions: 100 },
      { stage: 'End', interactions: 50 },
    ],
    orientation: FunnelOrientation.Vertical,
    locale: 'en-US',
  },
  parameters: {
    docs: {
      description: {
        story: 'A simple two-stage funnel showing the minimum required data.',
      },
    },
  },
}

export const ManyStages: Story = {
  args: {
    chartId: 'funnel-chart-many-stages',
    data: [
      { stage: 'Stage 1', interactions: 10000 },
      { stage: 'Stage 2', interactions: 8500 },
      { stage: 'Stage 3', interactions: 7200 },
      { stage: 'Stage 4', interactions: 5800 },
      { stage: 'Stage 5', interactions: 4500 },
      { stage: 'Stage 6', interactions: 3200 },
      { stage: 'Stage 7', interactions: 2000 },
      { stage: 'Stage 8', interactions: 1000 },
    ],
    orientation: FunnelOrientation.Vertical,
    locale: 'en-US',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'A funnel with many stages demonstrating how the chart handles larger datasets with gradient colors.',
      },
    },
  },
}
