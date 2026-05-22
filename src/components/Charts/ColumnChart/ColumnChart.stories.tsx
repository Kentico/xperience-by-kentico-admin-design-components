import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { ColumnChart } from './ColumnChart'
import type { ColumnChartData } from './ColumnChart.types'

const sampleData: ColumnChartData[] = [
  { columnId: 'q1', columnValue: 1000, columnLabelTooltip: 'First Quarter' },
  { columnId: 'q2', columnValue: 800, columnLabelTooltip: 'Second Quarter' },
  { columnId: 'q3', columnValue: 600, columnLabelTooltip: 'Third Quarter' },
  { columnId: 'q4', columnValue: 450, columnLabelTooltip: 'Fourth Quarter' },
]

const defaultGetColumnLabel = (d: ColumnChartData): string => d.columnId
const defaultGetBetweenColumnLabel = (d: ColumnChartData): string =>
  `-${Math.round((d.columnValue / sampleData[0].columnValue) * 100)}%`
const defaultGetBetweenColumnTooltip = (d: ColumnChartData): string =>
  `Drop-off: ${d.columnValue} (${Math.round((d.columnValue / sampleData[0].columnValue) * 100)}%)`
const defaultGetColumnTooltip = (d: ColumnChartData): string =>
  `Value: ${d.columnValue.toLocaleString()}`

const meta = {
  title: 'Data Display/ColumnChart',
  component: ColumnChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    chartId: 'column-chart-default',
    data: sampleData,
    getColumnLabel: defaultGetColumnLabel,
    getBetweenColumnLabel: defaultGetBetweenColumnLabel,
    getBetweenColumnTooltip: defaultGetBetweenColumnTooltip,
    getColumnTooltip: defaultGetColumnTooltip,
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
        'Data to be displayed in the chart. Each item represents a column with columnId, columnValue, and optional columnLabelTooltip.',
    },
    getColumnLabel: {
      table: { disable: true },
      description: 'Callback to generate the label displayed below each column.',
    },
    getBetweenColumnLabel: {
      table: { disable: true },
      description:
        'Callback to generate the label displayed between columns (drop-off indicator).',
    },
    getBetweenColumnTooltip: {
      table: { disable: true },
      description: 'Callback to generate the tooltip for the label between columns.',
    },
    getColumnTooltip: {
      table: { disable: true },
      description:
        'Callback to generate the tooltip displayed when hovering over a column.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ColumnChart>

export default meta
type Story = StoryObj<typeof ColumnChart>

export const Default: Story = {
  args: {
    chartId: 'column-chart-default',
    data: sampleData,
    getColumnLabel: defaultGetColumnLabel,
    getBetweenColumnLabel: defaultGetBetweenColumnLabel,
    getBetweenColumnTooltip: defaultGetBetweenColumnTooltip,
    getColumnTooltip: defaultGetColumnTooltip,
  },
}

export const QuarterlyRevenue: Story = {
  args: {
    chartId: 'column-chart-quarterly',
    data: [
      { columnId: 'Q1', columnValue: 1200, columnLabelTooltip: 'January - March' },
      { columnId: 'Q2', columnValue: 1500, columnLabelTooltip: 'April - June' },
      { columnId: 'Q3', columnValue: 1100, columnLabelTooltip: 'July - September' },
      { columnId: 'Q4', columnValue: 1800, columnLabelTooltip: 'October - December' },
    ],
    getColumnLabel: (d: ColumnChartData) => d.columnId,
    getBetweenColumnLabel: (d: ColumnChartData) => `$${d.columnValue}`,
    getBetweenColumnTooltip: (d: ColumnChartData) =>
      `Revenue: $${d.columnValue.toLocaleString()}`,
    getColumnTooltip: (d: ColumnChartData) =>
      `${d.columnId}: $${d.columnValue.toLocaleString()}`,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Quarterly revenue comparison showing values between columns with currency formatting.',
      },
    },
  },
}

export const ConversionFunnel: Story = {
  args: {
    chartId: 'column-chart-conversion',
    data: [
      { columnId: 'Visitors', columnValue: 10000 },
      { columnId: 'Sign-ups', columnValue: 3500 },
      { columnId: 'Active', columnValue: 1200 },
      { columnId: 'Paid', columnValue: 400 },
    ],
    getColumnLabel: (d: ColumnChartData) => d.columnId,
    getBetweenColumnLabel: (d: ColumnChartData) => {
      const data = [
        { columnId: 'Visitors', columnValue: 10000 },
        { columnId: 'Sign-ups', columnValue: 3500 },
        { columnId: 'Active', columnValue: 1200 },
        { columnId: 'Paid', columnValue: 400 },
      ]
      const idx = data.findIndex((item) => item.columnId === d.columnId)
      if (idx <= 0) return ''
      const dropOff = data[idx - 1].columnValue - d.columnValue
      return `-${dropOff.toLocaleString()}`
    },
    getBetweenColumnTooltip: (d: ColumnChartData) => {
      const data = [
        { columnId: 'Visitors', columnValue: 10000 },
        { columnId: 'Sign-ups', columnValue: 3500 },
        { columnId: 'Active', columnValue: 1200 },
        { columnId: 'Paid', columnValue: 400 },
      ]
      const idx = data.findIndex((item) => item.columnId === d.columnId)
      if (idx <= 0) return 'Starting point'
      const prev = data[idx - 1].columnValue
      const rate = ((d.columnValue / prev) * 100).toFixed(1)
      return `Conversion: ${rate}%`
    },
    getColumnTooltip: (d: ColumnChartData) =>
      `${d.columnId}: ${d.columnValue.toLocaleString()} users`,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A conversion funnel showing user drop-off at each stage with percentage-based tooltips.',
      },
    },
  },
}

export const WebsiteTraffic: Story = {
  args: {
    chartId: 'column-chart-traffic',
    data: [
      { columnId: 'Mon', columnValue: 2500 },
      { columnId: 'Tue', columnValue: 3200 },
      { columnId: 'Wed', columnValue: 2800 },
      { columnId: 'Thu', columnValue: 3100 },
      { columnId: 'Fri', columnValue: 2900 },
      { columnId: 'Sat', columnValue: 1800 },
      { columnId: 'Sun', columnValue: 1500 },
    ],
    getColumnLabel: (d: ColumnChartData) => d.columnId,
    getBetweenColumnLabel: () => '',
    getBetweenColumnTooltip: () => '',
    getColumnTooltip: (d: ColumnChartData) =>
      `${d.columnId}: ${d.columnValue.toLocaleString()} visits`,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '1000px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Weekly website traffic without drop-off labels, demonstrating the chart with many columns.',
      },
    },
  },
}

export const MinimalData: Story = {
  args: {
    chartId: 'column-chart-minimal',
    data: [
      { columnId: 'Start', columnValue: 100 },
      { columnId: 'End', columnValue: 75 },
    ],
    getColumnLabel: (d: ColumnChartData) => d.columnId,
    getBetweenColumnLabel: () => '-25%',
    getBetweenColumnTooltip: () => 'Decrease of 25 units',
    getColumnTooltip: (d: ColumnChartData) => `${d.columnId}: ${d.columnValue}`,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'A simple two-column chart showing the minimum required data.',
      },
    },
  },
}

export const CustomLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          With Percentage Labels
        </div>
        <div style={{ width: '600px', height: '300px' }}>
          <ColumnChart
            chartId="column-chart-percentage"
            data={sampleData}
            getColumnLabel={(d) => d.columnId.toUpperCase()}
            getBetweenColumnLabel={(d) =>
              `-${Math.round(100 - (d.columnValue / sampleData[0].columnValue) * 100)}%`
            }
            getBetweenColumnTooltip={(d) =>
              `${Math.round((d.columnValue / sampleData[0].columnValue) * 100)}% of initial`
            }
            getColumnTooltip={(d) => `${d.columnId}: ${d.columnValue}`}
          />
        </div>
      </div>
      <div>
        <div style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          With Absolute Value Labels
        </div>
        <div style={{ width: '600px', height: '300px' }}>
          <ColumnChart
            chartId="column-chart-absolute"
            data={sampleData}
            getColumnLabel={(d) => `Col ${d.columnId}`}
            getBetweenColumnLabel={(d) => d.columnValue.toString()}
            getBetweenColumnTooltip={(d) => `Value: ${d.columnValue}`}
            getColumnTooltip={(d) => `Column ${d.columnId} = ${d.columnValue}`}
          />
        </div>
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates different label formatting options using custom callback functions.',
      },
    },
  },
}

export const ManyColumns: Story = {
  args: {
    chartId: 'column-chart-many',
    data: [
      { columnId: 'Jan', columnValue: 900 },
      { columnId: 'Feb', columnValue: 850 },
      { columnId: 'Mar', columnValue: 920 },
      { columnId: 'Apr', columnValue: 880 },
      { columnId: 'May', columnValue: 950 },
      { columnId: 'Jun', columnValue: 910 },
      { columnId: 'Jul', columnValue: 870 },
      { columnId: 'Aug', columnValue: 830 },
      { columnId: 'Sep', columnValue: 890 },
      { columnId: 'Oct', columnValue: 940 },
      { columnId: 'Nov', columnValue: 900 },
      { columnId: 'Dec', columnValue: 980 },
    ],
    getColumnLabel: (d: ColumnChartData) => d.columnId,
    getBetweenColumnLabel: () => '',
    getBetweenColumnTooltip: () => '',
    getColumnTooltip: (d: ColumnChartData) =>
      `${d.columnId}: ${d.columnValue.toLocaleString()}`,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '1200px', height: '400px', overflowX: 'auto' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'A chart with 12 columns showing monthly data. The chart automatically adjusts width based on the number of columns.',
      },
    },
  },
}
