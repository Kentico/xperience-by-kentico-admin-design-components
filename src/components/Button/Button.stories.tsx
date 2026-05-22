import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Button } from './Button'
import { ButtonColor, ButtonSize } from './Button.types'
import { Icon } from '../Icon'

const colors = [
  ButtonColor.Primary,
  ButtonColor.Secondary,
  ButtonColor.Tertiary,
  ButtonColor.Quinary,
  ButtonColor.Alert,
] as const

const sizes = [
  ButtonSize.XS,
  ButtonSize.S,
  ButtonSize.M,
  ButtonSize.L,
] as const

const meta = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(ButtonColor),
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
    },
    destructive: { control: 'boolean' },
    active: { control: 'boolean' },
    inProgress: { control: 'boolean' },
    fillContainer: { control: 'boolean' },
    badge: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    destructive: false,
    active: false,
    inProgress: false,
    fillContainer: false,
    badge: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
    size: ButtonSize.M,
  },
}

export const Primary: Story = {
  args: {
    children: 'Button',
    color: ButtonColor.Primary,
    size: ButtonSize.M,
  },
}

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {colors.map((color) => (
        <Button key={color} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {colors.map((color) => (
        <div key={color} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ width: 80, fontSize: 12, color: '#666' }}>{color}</span>
          {sizes.map((size) => (
            <Button key={`${color}-${size}`} color={color} size={size}>
              {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Destructive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {colors.map((color) => (
        <Button key={color} color={color} destructive>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button icon={<Icon name="plus" />} color={ButtonColor.Primary}>Add item</Button>
      <Button icon={<Icon name="edit" />} color={ButtonColor.Secondary}>
        Edit
      </Button>
      <Button trailingIcon={<Icon name="arrow-right" />} color={ButtonColor.Tertiary}>
        Next
      </Button>
      <Button
        icon={<Icon name="bin" />}
        trailingIcon={<Icon name="exclamation-triangle" />}
        destructive
      >
        Delete
      </Button>
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button icon={<Icon name="plus" />} size={ButtonSize.XS} />
      <Button icon={<Icon name="edit" />} size={ButtonSize.S} color={ButtonColor.Secondary} />
      <Button icon={<Icon name="cogwheel" />} size={ButtonSize.M} color={ButtonColor.Tertiary} />
      <Button icon={<Icon name="bin" size="s" />} size={ButtonSize.L} color={ButtonColor.Quinary} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {colors.map((color) => (
        <Button key={color} color={color} disabled>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const Active: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {colors.map((color) => (
        <Button key={color} color={color} active>
          {color}
        </Button>
      ))}
    </div>
  ),
}

export const InProgress: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button inProgress color={ButtonColor.Primary}>Saving...</Button>
      <Button inProgress color={ButtonColor.Secondary}>
        Loading...
      </Button>
      <Button inProgress color={ButtonColor.Tertiary}>
        Processing...
      </Button>
    </div>
  ),
}

export const FillContainer: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Button fillContainer color={ButtonColor.Primary}>Full Width Button</Button>
    </div>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button badge color={ButtonColor.Secondary}>Notifications</Button>
      <Button badge icon={<Icon name="bell" />} color={ButtonColor.Tertiary} />
      <Button badge icon={<Icon name="bell" size="s" />} color={ButtonColor.Quinary} />
    </div>
  ),
}
