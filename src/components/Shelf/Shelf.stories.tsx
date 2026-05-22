import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Shelf } from './Shelf'
import { ShelfStickyPosition } from './Shelf.types'

const stickyPositions = [undefined, ShelfStickyPosition.Left, ShelfStickyPosition.Right] as const

const meta = {
  title: 'Layout/Shelf',
  component: Shelf,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Shelf Content',
    onPaper: false,
    fullHeight: false,
  },
  argTypes: {
    sticky: {
      control: 'select',
      options: [undefined, ShelfStickyPosition.Left, ShelfStickyPosition.Right],
      description: 'Sticky position that removes border radius on the specified side',
    },
    onPaper: {
      control: 'boolean',
      description: 'Adds box-shadow when shelf is placed on a paper background',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Makes the shelf take up 100% of parent height',
    },
  },
} satisfies Meta<typeof Shelf>

export default meta
type Story = StoryObj<typeof Shelf>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 16 }}>Default Shelf Content</div>
    ),
  },
}

export const StickyLeft: Story = {
  args: {
    sticky: ShelfStickyPosition.Left,
    children: (
      <div style={{ padding: 16 }}>
        Sticky Left - No left border radius
      </div>
    ),
  },
}

export const StickyRight: Story = {
  args: {
    sticky: ShelfStickyPosition.Right,
    children: (
      <div style={{ padding: 16 }}>
        Sticky Right - No right border radius
      </div>
    ),
  },
}

export const OnPaper: Story = {
  args: {
    onPaper: true,
    children: (
      <div style={{ padding: 16 }}>Shelf with shadow (on paper)</div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
}

export const FullHeight: Story = {
  args: {
    fullHeight: true,
    children: (
      <div style={{ padding: 16 }}>Full Height Shelf</div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ height: 200, border: '1px dashed #ccc' }}>
        <Story />
      </div>
    ),
  ],
}

export const AllStickyVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {stickyPositions.map((sticky) => (
        <div
          key={sticky ?? 'none'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ minWidth: 100, fontSize: 12, color: '#666' }}>
            {sticky ?? 'None'}:
          </span>
          <Shelf sticky={sticky}>
            <div style={{ padding: 16 }}>
              {sticky ? `Sticky ${sticky}` : 'No sticky position'}
            </div>
          </Shelf>
        </div>
      ))}
    </div>
  ),
}

export const CombinedVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      <div style={{ padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          Sticky Left + On Paper
        </div>
        <Shelf sticky={ShelfStickyPosition.Left} onPaper>
          <div style={{ padding: 16 }}>Content</div>
        </Shelf>
      </div>
      <div style={{ padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          Sticky Right + On Paper
        </div>
        <Shelf sticky={ShelfStickyPosition.Right} onPaper>
          <div style={{ padding: 16 }}>Content</div>
        </Shelf>
      </div>
      <div style={{ height: 120, border: '1px dashed #ccc' }}>
        <div style={{ marginBottom: 8, fontSize: 12, color: '#666', padding: '8px 8px 0' }}>
          Full Height
        </div>
        <Shelf fullHeight>
          <div style={{ padding: 16 }}>Full height content</div>
        </Shelf>
      </div>
      <div
        style={{
          height: 120,
          padding: 16,
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          Full Height + On Paper
        </div>
        <Shelf fullHeight onPaper>
          <div style={{ padding: 16 }}>Combined</div>
        </Shelf>
      </div>
    </div>
  ),
}
