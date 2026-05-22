import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'
import { AvatarStaticSize } from './Avatar.types'
import { TooltipPlacement } from '@/components/Tooltip'
import { DarkGradients, LightGradients } from '@/lib/gradients'
import { Icon } from '@/components/Icon'

const sizes = [
  AvatarStaticSize.XS,
  AvatarStaticSize.S,
  AvatarStaticSize.M,
  AvatarStaticSize.L,
] as const

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(AvatarStaticSize),
    },
    tooltipPlacement: {
      control: 'select',
      options: Object.values(TooltipPlacement),
    },
    shadow: { control: 'boolean' },
  },
  args: {
    size: AvatarStaticSize.M,
    tooltipText: 'John Doe',
    initials: 'JD',
    background: { gradient: DarkGradients[0] },
    shadow: false,
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {sizes.map((size) => (
        <Avatar
          key={size}
          size={size}
          tooltipText={`Size ${size}`}
          initials="JD"
          background={{ gradient: DarkGradients[2] }}
        />
      ))}
    </div>
  ),
}

export const WithImage: Story = {
  args: {
    img: 'https://i.pravatar.cc/150?u=jane',
    tooltipText: 'Jane Smith',
    initials: 'JS',
  },
}

export const WithShadow: Story = {
  args: {
    shadow: true,
    initials: 'JD',
    tooltipText: 'John Doe (shadow)',
  },
}

export const LightBackground: Story = {
  args: {
    initials: 'AB',
    tooltipText: 'Light gradient',
    background: { gradient: LightGradients[3], isDark: false },
  },
}

export const GradientSampler: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {DarkGradients.map((g, i) => (
        <Avatar
          key={i}
          size={AvatarStaticSize.M}
          tooltipText={`Gradient ${i + 1}`}
          initials={String(i + 1).padStart(2, '0')}
          background={{ gradient: g }}
        />
      ))}
    </div>
  ),
}

export const WithCustomContent: Story = {
  args: {
    tooltipText: 'Custom icon',
    initials: '',
    customContent: <Icon name="xp-user" size="s" />,
    background: { gradient: DarkGradients[5] },
  },
}

export const SingleInitialXS: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar
        size={AvatarStaticSize.XS}
        tooltipText="XS shows 1 initial"
        initials="JD"
        background={{ gradient: DarkGradients[1] }}
      />
      <Avatar
        size={AvatarStaticSize.M}
        tooltipText="M shows 2 initials"
        initials="JD"
        background={{ gradient: DarkGradients[1] }}
      />
    </div>
  ),
}
