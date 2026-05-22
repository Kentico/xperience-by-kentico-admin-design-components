import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { VirtualGrid } from './VirtualGrid'
import { Spacing } from '@/components/Layout'

interface MockItem {
  id: number
  label: string
  color: string
}

const colors = ['#e3f2fd', '#fce4ec', '#e8f5e9', '#fff3e0', '#f3e5f5', '#e0f7fa']

const generateItems = (count: number): MockItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    label: `Item ${i + 1}`,
    color: colors[i % colors.length],
  }))

const meta = {
  title: 'Data Display/VirtualGrid',
  component: VirtualGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <VirtualGrid
        items={generateItems(50)}
        columnCount={4}
        estimateRowHeight={120}
        rowGap={Spacing.M}
        columnGap={Spacing.M}
      >
        {(item: MockItem) => (
          <div
            style={{
              background: item.color,
              borderRadius: 8,
              padding: 16,
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 500,
            }}
          >
            {item.label}
          </div>
        )}
      </VirtualGrid>
    </div>
  ),
}

export const ManyItems: Story = {
  render: () => (
    <div style={{ height: 500 }}>
      <VirtualGrid
        items={generateItems(500)}
        columnCount={5}
        estimateRowHeight={80}
        rowGap={Spacing.S}
        columnGap={Spacing.S}
      >
        {(item: MockItem) => (
          <div
            style={{
              background: item.color,
              borderRadius: 4,
              padding: 8,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
            }}
          >
            {item.label}
          </div>
        )}
      </VirtualGrid>
    </div>
  ),
}

export const TwoColumns: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <VirtualGrid
        items={generateItems(30)}
        columnCount={2}
        estimateRowHeight={160}
        rowGap={Spacing.L}
        columnGap={Spacing.L}
      >
        {(item: MockItem) => (
          <div
            style={{
              background: item.color,
              borderRadius: 8,
              padding: 24,
              height: 130,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: '#666' }}>
              A card with more content in a two-column layout.
            </div>
          </div>
        )}
      </VirtualGrid>
    </div>
  ),
}
