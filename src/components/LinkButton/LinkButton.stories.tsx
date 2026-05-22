import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { LinkButton } from './LinkButton'
import { ButtonColor, ButtonSize } from '../Button/Button.types'
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
  title: 'Actions/LinkButton',
  component: LinkButton,
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
    disabled: { control: 'boolean' },
    inProgress: { control: 'boolean' },
    fillContainer: { control: 'boolean' },
    href: { control: 'text' },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    title: { control: 'text' },
  },
  args: {
    onClick: fn(),
    destructive: false,
    disabled: false,
    inProgress: false,
    fillContainer: false,
  },
} satisfies Meta<typeof LinkButton>

export default meta
type Story = StoryObj<typeof LinkButton>

export const Default: Story = {
  args: {
    label: 'Link Button',
    href: '#',
    color: ButtonColor.Primary,
    size: ButtonSize.M,
  },
}

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {colors.map((color) => (
        <LinkButton key={color} color={color} label={color} href="#" />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => (
        <LinkButton key={size} size={size} label={size} href="#" />
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
            <LinkButton key={`${color}-${size}`} color={color} size={size} label={size} href="#" />
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
        <LinkButton key={color} color={color} destructive label={color} href="#" />
      ))}
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <LinkButton icon={<Icon name="plus" />} label="Add item" href="#" />
      <LinkButton icon={<Icon name="edit" />} color={ButtonColor.Secondary} label="Edit" href="#" />
      <LinkButton trailingIcon={<Icon name="arrow-right" />} color={ButtonColor.Tertiary} label="Next" href="#" />
      <LinkButton
        icon={<Icon name="bin" />}
        trailingIcon={<Icon name="exclamation-triangle" />}
        destructive
        label="Delete"
        href="#"
      />
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <LinkButton icon={<Icon name="plus" />} size={ButtonSize.XS} href="#" />
      <LinkButton icon={<Icon name="edit" />} size={ButtonSize.S} color={ButtonColor.Secondary} href="#" />
      <LinkButton icon={<Icon name="cogwheel" />} size={ButtonSize.M} color={ButtonColor.Tertiary} href="#" />
      <LinkButton icon={<Icon name="bin" size="s" />} size={ButtonSize.L} color={ButtonColor.Quinary} href="#" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {colors.map((color) => (
        <LinkButton key={color} color={color} disabled label={color} href="#" />
      ))}
    </div>
  ),
}

export const InProgress: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <LinkButton inProgress label="Saving..." href="#" />
      <LinkButton inProgress color={ButtonColor.Secondary} label="Loading..." href="#" />
      <LinkButton inProgress color={ButtonColor.Tertiary} label="Processing..." href="#" />
    </div>
  ),
}

export const FillContainer: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <LinkButton fillContainer label="Full Width Link Button" href="#" />
    </div>
  ),
}

export const ExternalLink: Story = {
  args: {
    label: 'Open External Link',
    href: 'https://example.com',
    target: '_blank',
    icon: <Icon name="arrow-right-top-square" />,
  },
}
