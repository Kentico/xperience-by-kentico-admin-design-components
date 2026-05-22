import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { OptionTile } from './OptionTile'

const meta = {
  title: 'Actions/OptionTile',
  component: OptionTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed in the tile',
    },
    startIcon: {
      control: 'text',
      description: 'Icon name to display at the start of the tile',
    },
    endIcon: {
      control: 'text',
      description: 'Icon name to display at the end of the tile',
    },
    block: {
      control: 'boolean',
      description: 'Whether the tile should take full width of its container',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the tile',
    },
    shouldExpand: {
      control: 'boolean',
      description: 'Whether the tile should expand to fill available space',
    },
  },
  args: {
    onClick: fn(),
    block: false,
    shouldExpand: false,
  },
} satisfies Meta<typeof OptionTile>

export default meta
type Story = StoryObj<typeof OptionTile>

export const Default: Story = {
  args: {
    label: 'Option Tile',
  },
}

export const Inline: Story = {
  args: {
    label: 'Option',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <OptionTile label="Option 1" />
      <OptionTile label="Option 2" />
      <OptionTile label="Option 3" />
    </div>
  ),
}

export const Block: Story = {
  args: {
    label: 'Option',
  },
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <OptionTile label="Full Width Option 1" block />
      <OptionTile label="Full Width Option 2" block />
      <OptionTile label="Full Width Option 3" block />
    </div>
  ),
}

export const WithStartIcon: Story = {
  args: {
    label: 'Home',
    startIcon: 'home',
  },
}

export const WithEndIcon: Story = {
  args: {
    label: 'Settings',
    endIcon: 'cogwheel',
  },
}

export const WithBothIcons: Story = {
  args: {
    label: 'User Profile',
    startIcon: 'user',
    endIcon: 'chevron-right',
  },
}

export const WithIconsInline: Story = {
  args: {
    label: 'Option',
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <OptionTile label="Home" startIcon="home" />
      <OptionTile label="Settings" startIcon="cogwheel" />
      <OptionTile label="Profile" startIcon="user" />
      <OptionTile label="Notifications" startIcon="bell" />
    </div>
  ),
}

export const WithIconsBlock: Story = {
  args: {
    label: 'Option',
  },
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <OptionTile label="Home" startIcon="home" endIcon="chevron-right" block />
      <OptionTile label="Settings" startIcon="cogwheel" endIcon="chevron-right" block />
      <OptionTile label="Profile" startIcon="user" endIcon="chevron-right" block />
    </div>
  ),
}

export const WithMaxWidth: Story = {
  args: {
    label: 'This is a very long option tile label that should be truncated',
    maxWidth: 200,
    startIcon: 'i-circle',
  },
}
