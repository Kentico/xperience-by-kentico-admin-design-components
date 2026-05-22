import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { fn } from 'storybook/test'
import { Cell } from './Cell'
import { Icon } from '@/components/Icon'

const meta = {
  title: 'Layout/Cell',
  component: Cell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Cell>

export default meta
type Story = StoryObj<typeof Cell>

export const Default: Story = {
  args: {
    children: 'Cell',
    ariaLabel: 'Cell button',
  },
}

export const Active: Story = {
  args: {
    children: 'Active cell',
    active: true,
    ariaLabel: 'Active cell',
  },
}

export const WithIcon: Story = {
  args: {
    children: <Icon name="xp-cogwheel" />,
    ariaLabel: 'Settings',
  },
}

export const AsNavLink: Story = {
  render: () => (
    <MemoryRouter>
      <div style={{ display: 'flex', gap: 4 }}>
        <Cell link="/home" ariaLabel="Home">Home</Cell>
        <Cell link="/settings" ariaLabel="Settings">Settings</Cell>
      </div>
    </MemoryRouter>
  ),
}

export const Group: Story = {
  render: () => {
    const CellGroup = () => {
      const [activeIndex, setActiveIndex] = useState(0)
      const items = ['Overview', 'Details', 'History']
      return (
        <div style={{ display: 'flex', gap: 4 }}>
          {items.map((item, i) => (
            <Cell
              key={item}
              active={activeIndex === i}
              onClick={() => setActiveIndex(i)}
              ariaLabel={item}
            >
              {item}
            </Cell>
          ))}
        </div>
      )
    }
    return <CellGroup />
  },
}
