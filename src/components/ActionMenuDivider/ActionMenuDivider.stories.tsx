import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { ActionMenuDivider } from './ActionMenuDivider'
import { DividerOrientation } from '@/components/Divider'
import { MenuItem } from '@/components/MenuItem'

const meta = {
  title: 'Navigation/ActionMenuDivider',
  component: ActionMenuDivider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: Object.values(DividerOrientation),
    },
  },
} satisfies Meta<typeof ActionMenuDivider>

export default meta
type Story = StoryObj<typeof ActionMenuDivider>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 200, background: 'var(--color-background-default, #fff)', borderRadius: 8, padding: 4 }}>
      <MenuItem primaryLabel="Edit" />
      <ActionMenuDivider orientation={DividerOrientation.Horizontal} />
      <MenuItem primaryLabel="Delete" />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
      <MenuItem primaryLabel="Copy" />
      <ActionMenuDivider orientation={DividerOrientation.Vertical} />
      <MenuItem primaryLabel="Paste" />
    </div>
  ),
}
