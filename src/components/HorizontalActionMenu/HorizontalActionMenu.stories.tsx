import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { HorizontalActionMenu } from './HorizontalActionMenu'
import type { HorizontalActionMenuItem } from './HorizontalActionMenu.types'

const createActions = (count: number): HorizontalActionMenuItem[] =>
  Array.from({ length: count }, (_, i) => ({
    identifier: `action-${i}`,
    label: `Action ${i + 1}`,
    icon: 'xp-edit',
    onClick: fn(),
  }))

const meta = {
  title: 'Navigation/HorizontalActionMenu',
  component: HorizontalActionMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    areActionsVisible: { control: 'boolean' },
    moreActionsButtonLabel: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    areActionsVisible: true,
    moreActionsButtonLabel: 'More actions',
    label: null,
  },
} satisfies Meta<typeof HorizontalActionMenu>

export default meta
type Story = StoryObj<typeof HorizontalActionMenu>

export const Default: Story = {
  args: {
    actionItems: createActions(4),
  },
}

export const WithLabel: Story = {
  args: {
    actionItems: createActions(3),
    label: '3 items selected',
  },
}

export const WithOverflow: Story = {
  render: (args) => (
    <div style={{ width: 400, border: '1px dashed #ccc', padding: 4 }}>
      <HorizontalActionMenu {...args} />
    </div>
  ),
  args: {
    actionItems: createActions(8),
    areActionsVisible: true,
    moreActionsButtonLabel: 'More actions',
    label: null,
  },
}

export const ActionsHidden: Story = {
  args: {
    actionItems: createActions(4),
    areActionsVisible: false,
    label: 'Draft',
  },
}

export const WithDestructiveAction: Story = {
  args: {
    actionItems: [
      { identifier: 'edit', label: 'Edit', icon: 'xp-edit', onClick: fn() },
      { identifier: 'copy', label: 'Copy', icon: 'xp-doc-copy', onClick: fn() },
      { identifier: 'delete', label: 'Delete', icon: 'xp-bin', destructive: true, onClick: fn() },
    ],
    label: 'Published',
  },
}

export const WithDisabledAction: Story = {
  args: {
    actionItems: [
      { identifier: 'edit', label: 'Edit', icon: 'xp-edit', onClick: fn() },
      { identifier: 'publish', label: 'Publish', icon: 'xp-check', disabled: true, onClick: fn() },
      { identifier: 'delete', label: 'Delete', icon: 'xp-bin', onClick: fn() },
    ],
  },
}
