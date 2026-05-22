import type { Meta, StoryObj } from '@storybook/react'
import { ActionSplitButton } from './ActionSplitButtons'
import type { Action, ActionDivider } from './ActionSplitButtons.types'

const meta = {
  title: 'Actions/ActionSplitButton',
  component: ActionSplitButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    inProgress: { control: 'boolean' },
    action: { control: 'object' },
  },
  args: {
    size: 'M',
    inProgress: false,
  },
} satisfies Meta<typeof ActionSplitButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    action: {
      type: 'click',
      label: 'Save',
      buttonColor: 'primary',
      onClick: async () => {},
      actions: [
        { type: 'click', label: 'Save and close', onClick: async () => {} },
        { type: 'click', label: 'Save as draft', onClick: async () => {} },
      ],
    },
  },
}

export const WithNestedActions: Story = {
  args: {
    action: {
      type: 'click',
      label: 'Publish',
      buttonColor: 'primary',
      icon: 'xp-check-circle',
      onClick: async () => {},
      actions: [
        { type: 'click', label: 'Publish now', icon: 'xp-check-circle', onClick: async () => {} },
        { type: 'click', label: 'Schedule', icon: 'xp-calendar', onClick: async () => {} },
        { isDivider: true } as ActionDivider as Action & ActionDivider,
        { type: 'link', label: 'Preview', icon: 'xp-eye', href: '#' },
      ] as (Action | ActionDivider)[],
    },
  },
}

export const WithDividers: Story = {
  args: {
    action: {
      type: 'click',
      label: 'Actions',
      buttonColor: 'secondary',
      onClick: async () => {},
      actions: [
        { type: 'click', label: 'Edit', icon: 'xp-edit', onClick: async () => {} },
        { type: 'click', label: 'Duplicate', onClick: async () => {} },
        { isDivider: true } as ActionDivider as Action & ActionDivider,
        { type: 'click', label: 'Archive', onClick: async () => {} },
        { type: 'click', label: 'Delete', destructive: true, icon: 'bin', onClick: async () => {} },
      ] as (Action | ActionDivider)[],
    },
  },
}

export const Disabled: Story = {
  args: {
    action: {
      type: 'click',
      label: 'Save',
      buttonColor: 'primary',
      disabled: true,
      onClick: async () => {},
      actions: [
        { type: 'click', label: 'Save and close', disabled: true, onClick: async () => {} },
        { type: 'click', label: 'Save as draft', disabled: true, onClick: async () => {} },
      ],
    },
  },
}

export const InProgress: Story = {
  args: {
    inProgress: true,
    action: {
      type: 'click',
      label: 'Saving...',
      buttonColor: 'primary',
      onClick: async () => {},
      actions: [
        { type: 'click', label: 'Save and close', onClick: async () => {} },
      ],
    },
  },
}
