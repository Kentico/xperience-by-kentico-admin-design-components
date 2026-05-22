import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { AvatarButton } from './AvatarButton'
import { AvatarSize } from './AvatarButton.types'

const sizes = [
  AvatarSize.XS,
  AvatarSize.S,
  AvatarSize.M,
  AvatarSize.L,
] as const

const meta = {
  title: 'Actions/AvatarButton',
  component: AvatarButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(AvatarSize),
    },
    isActive: { control: 'boolean' },
    firstName: { control: 'text' },
    lastName: { control: 'text' },
    username: { control: 'text' },
    imageUrl: { control: 'text' },
  },
  args: {
    onClick: fn(),
    isActive: false,
  },
} satisfies Meta<typeof AvatarButton>

export default meta
type Story = StoryObj<typeof AvatarButton>

export const Default: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    size: AvatarSize.M,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => (
        <AvatarButton
          key={size}
          firstName="John"
          lastName="Doe"
          size={size}
        />
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => (
        <AvatarButton
          key={size}
          firstName="John"
          lastName="Doe"
          imageUrl="https://i.pravatar.cc/150?u=john"
          size={size}
        />
      ))}
    </div>
  ),
}

export const Active: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#666' }}>Inactive</span>
        <AvatarButton firstName="John" lastName="Doe" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#666' }}>Active</span>
        <AvatarButton firstName="John" lastName="Doe" isActive />
      </div>
    </div>
  ),
}

export const ActiveAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => (
        <AvatarButton
          key={size}
          firstName="Jane"
          lastName="Smith"
          size={size}
          isActive
        />
      ))}
    </div>
  ),
}

export const InitialsVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <AvatarButton firstName="John" lastName="Doe" />
      <AvatarButton firstName="Alice" />
      <AvatarButton username="admin" />
      <AvatarButton />
    </div>
  ),
}

export const SizeMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 80, fontSize: 12, color: '#666' }}>Initials</span>
        {sizes.map((size) => (
          <AvatarButton
            key={`initials-${size}`}
            firstName="John"
            lastName="Doe"
            size={size}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 80, fontSize: 12, color: '#666' }}>Image</span>
        {sizes.map((size) => (
          <AvatarButton
            key={`image-${size}`}
            firstName="Jane"
            lastName="Smith"
            imageUrl="https://i.pravatar.cc/150?u=jane"
            size={size}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 80, fontSize: 12, color: '#666' }}>Active</span>
        {sizes.map((size) => (
          <AvatarButton
            key={`active-${size}`}
            firstName="Bob"
            lastName="Wilson"
            size={size}
            isActive
          />
        ))}
      </div>
    </div>
  ),
}
