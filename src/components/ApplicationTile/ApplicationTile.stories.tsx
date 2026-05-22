import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { MemoryRouter } from 'react-router-dom'
import { ApplicationTile } from './ApplicationTile'
import { ApplicationTileState } from './ApplicationTile.types'
import { TooltipPlacement } from '../Tooltip'

const states = [
  ApplicationTileState.Default,
  ApplicationTileState.Activated,
  ApplicationTileState.Disabled,
] as const

const meta = {
  title: 'Tiles/ApplicationTile',
  component: ApplicationTile,
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
      options: Object.values(ApplicationTileState),
    },
    iconName: { control: 'text' },
    label: { control: 'text' },
    tooltip: { control: 'text' },
    tooltipPlacement: {
      control: 'select',
      options: Object.values(TooltipPlacement),
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ApplicationTile>

export default meta
type Story = StoryObj<typeof ApplicationTile>

export const Default: Story = {
  args: {
    label: 'Application',
    iconName: 'cogwheel',
    state: ApplicationTileState.Default,
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {states.map((state) => (
        <ApplicationTile key={state} state={state} label={state} iconName="cogwheel" />
      ))}
    </div>
  ),
}

export const Activated: Story = {
  args: {
    label: 'Active App',
    iconName: 'check',
    state: ApplicationTileState.Activated,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled App',
    iconName: 'xp-ban-sign',
    state: ApplicationTileState.Disabled,
  },
}

export const Favourite: Story = {
  args: {
    label: 'Favourite App',
    iconName: 'xp-star-full',
    favouriteTile: {
      withStar: true,
    },
  },
}

export const FavouriteWithCustomTooltip: Story = {
  args: {
    label: 'Pinned App',
    iconName: 'pin',
    favouriteTile: {
      withStar: true,
      starTooltip: 'This app is pinned to your favourites',
      starTooltipPlacement: TooltipPlacement.Right,
    },
  },
}

export const FavouriteStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {states.map((state) => (
        <ApplicationTile
          key={state}
          state={state}
          label={state}
          iconName="cogwheel"
          favouriteTile={{ withStar: true }}
        />
      ))}
    </div>
  ),
}

export const WithTooltip: Story = {
  args: {
    label: 'Hover me',
    iconName: 'i-circle',
    tooltip: 'This is a tooltip with additional information',
    tooltipPlacement: TooltipPlacement.Right,
  },
}

export const WithNavigation: Story = {
  args: {
    label: 'Navigate',
    iconName: 'arrow-right',
    link: '/example-page',
  },
}

export const LongLabel: Story = {
  args: {
    label: 'This is a very long application name that should truncate',
    iconName: 'doc',
  },
}
