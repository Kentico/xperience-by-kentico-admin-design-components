import type { Meta, StoryObj } from '@storybook/react'
import { InfoCardGroup } from './InfoCardGroup'

const mockCards = [
  {
    caption: 'Page Views',
    tooltip: 'Total number of page views in the selected period',
    text: '12,345',
    details: '+5.2% from last month',
  },
  {
    caption: 'Unique Visitors',
    tooltip: 'Number of unique visitors in the selected period',
    text: '3,456',
    details: '+2.1% from last month',
  },
  {
    caption: 'Bounce Rate',
    tooltip: 'Percentage of single-page sessions',
    text: '42.3%',
    details: '-1.5% from last month',
  },
]

const meta = {
  title: 'Data Display/InfoCardGroup',
  component: InfoCardGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    cards: {
      control: 'object',
      description: 'Array of card data objects to render',
    },
  },
  args: {
    cards: mockCards,
  },
} satisfies Meta<typeof InfoCardGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleCard: Story = {
  args: {
    cards: [mockCards[0]],
  },
}

export const ManyCards: Story = {
  args: {
    cards: [
      ...mockCards,
      {
        caption: 'Avg. Session',
        tooltip: 'Average session duration',
        text: '2m 34s',
        details: '+12s from last month',
      },
      {
        caption: 'Conversion Rate',
        tooltip: 'Percentage of visitors who completed a goal',
        text: '3.2%',
        details: '+0.4% from last month',
      },
    ],
  },
}
