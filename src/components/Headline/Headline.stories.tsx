import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Headline } from './Headline'
import { HeadlineSize } from './Headline.types'
import { Colors } from '@/tokens/colors'

const meta = {
  title: 'Data Display/Headline',
  component: Headline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(HeadlineSize),
    },
  },
} satisfies Meta<typeof Headline>

export default meta
type Story = StoryObj<typeof Headline>

export const Small: Story = {
  args: {
    children: 'Small Headline',
    size: HeadlineSize.S,
  },
}

export const Medium: Story = {
  args: {
    children: 'Medium Headline',
    size: HeadlineSize.M,
  },
}

export const Large: Story = {
  args: {
    children: 'Large Headline',
    size: HeadlineSize.L,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Headline size={HeadlineSize.L}>Large Headline</Headline>
      <Headline size={HeadlineSize.M}>Medium Headline</Headline>
      <Headline size={HeadlineSize.S}>Small Headline</Headline>
    </div>
  ),
}

export const WithCustomColor: Story = {
  args: {
    children: 'Colored Headline',
    size: HeadlineSize.M,
    labelColor: Colors.InfoText,
  },
}

export const WithSpacing: Story = {
  render: () => (
    <div style={{ background: '#f5f5f5', padding: 8 }}>
      <Headline size={HeadlineSize.M} spacingTop="24px" spacingBottom="16px">
        Headline with spacing
      </Headline>
      <p style={{ margin: 0 }}>Content below the headline</p>
    </div>
  ),
}
