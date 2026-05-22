import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { MemoryRouter } from 'react-router-dom'
import { ActionTile } from './ActionTile'
import { ActionTileState, ActionTileSize, ActionTileType } from './ActionTile.types'

const states = [
  ActionTileState.Default,
  ActionTileState.Selected,
  ActionTileState.Disabled,
  ActionTileState.InProgress,
] as const

const sizes = [
  ActionTileSize.XS,
  ActionTileSize.S,
  ActionTileSize.L,
] as const

const types = [
  ActionTileType.Default,
  ActionTileType.Dashboard,
] as const

const meta = {
  title: 'Actions/ActionTile',
  component: ActionTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    state: {
      control: 'select',
      options: Object.values(ActionTileState),
    },
    size: {
      control: 'select',
      options: Object.values(ActionTileSize),
    },
    type: {
      control: 'select',
      options: Object.values(ActionTileType),
    },
    icon: { control: 'text' },
    label: { control: 'text' },
    tooltip: { control: 'text' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ActionTile>

export default meta
type Story = StoryObj<typeof ActionTile>

export const Default: Story = {
  args: {
    label: 'Action Tile',
    icon: 'plus',
    state: ActionTileState.Default,
    size: ActionTileSize.L,
    type: ActionTileType.Default,
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {states.map((state) => (
        <ActionTile key={state} state={state} label={state} icon="plus" />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
      {sizes.map((size) => (
        <ActionTile key={size} size={size} label={size} icon="plus" />
      ))}
    </div>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {types.map((type) => (
        <ActionTile key={type} type={type} label={type} icon="cogwheel" />
      ))}
    </div>
  ),
}

export const StateSizeMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {states.map((state) => (
        <div key={state} style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          <span style={{ width: 100, fontSize: 12, color: '#666' }}>{state}</span>
          {sizes.map((size) => (
            <ActionTile
              key={`${state}-${size}`}
              state={state}
              size={size}
              label={size}
              icon="plus"
            />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const TypeSizeMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {types.map((type) => (
        <div key={type} style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          <span style={{ width: 100, fontSize: 12, color: '#666' }}>{type}</span>
          {sizes.map((size) => (
            <ActionTile
              key={`${type}-${size}`}
              type={type}
              size={size}
              label={size}
              icon="cogwheel"
            />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Selected: Story = {
  args: {
    label: 'Selected Tile',
    icon: 'check',
    state: ActionTileState.Selected,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Tile',
    icon: 'xp-ban-sign',
    state: ActionTileState.Disabled,
  },
}

export const InProgress: Story = {
  args: {
    label: 'Loading...',
    icon: 'plus',
    state: ActionTileState.InProgress,
  },
}

export const DashboardType: Story = {
  args: {
    label: 'Dashboard Tile',
    icon: 'layouts',
    type: ActionTileType.Dashboard,
  },
}

export const WithTooltip: Story = {
  args: {
    label: 'Hover me',
    icon: 'i-circle',
    tooltip: 'This is a tooltip with additional information',
  },
}

export const WithNavigation: Story = {
  args: {
    label: 'Navigate',
    icon: 'arrow-right',
    href: '/example-page',
  },
}

export const LongLabel: Story = {
  args: {
    label: 'This is a very long label that should truncate',
    icon: 'doc',
    size: ActionTileSize.S,
  },
}
