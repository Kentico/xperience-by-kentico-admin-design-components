import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { ActionButtons } from './ActionButtons'
import { Button } from '@/components/Button'

const meta = {
  title: 'Layout/ActionButtons',
  component: ActionButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between'],
      description: 'Horizontal alignment of buttons',
    },
    spacing: {
      control: 'select',
      options: ['S', 'M', 'L'],
      description: 'Spacing between buttons',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether buttons should wrap on narrow containers',
    },
    fillContainer: {
      control: 'boolean',
      description: 'Whether buttons should fill the container width equally',
    },
    children: { table: { disable: true } },
  },
  args: {
    align: 'start',
    spacing: 'M',
    wrap: false,
    fillContainer: false,
  },
} satisfies Meta<typeof ActionButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <ActionButtons {...args}>
      <Button color="secondary">Cancel</Button>
      <Button color="primary">Save</Button>
    </ActionButtons>
  ),
}

export const AllAlignments: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['start', 'center', 'end', 'space-between'] as const).map((align) => (
        <div key={align}>
          <div style={{ marginBottom: 4, fontSize: 12, color: '#666' }}>
            align=&quot;{align}&quot;
          </div>
          <ActionButtons {...args} align={align}>
            <Button color="secondary">Cancel</Button>
            <Button color="primary">Save</Button>
          </ActionButtons>
        </div>
      ))}
    </div>
  ),
}

export const FillContainer: Story = {
  args: {
    fillContainer: true,
  },
  render: (args) => (
    <ActionButtons {...args}>
      <Button color="secondary">Cancel</Button>
      <Button color="primary">Confirm</Button>
      <Button color="primary">Save &amp; Close</Button>
    </ActionButtons>
  ),
}

export const WithWrap: Story = {
  args: {
    wrap: true,
  },
  render: (args) => (
    <div style={{ maxWidth: 300 }}>
      <ActionButtons {...args}>
        <Button color="secondary">Cancel</Button>
        <Button color="secondary">Reset</Button>
        <Button color="primary">Save</Button>
        <Button color="primary">Save &amp; Close</Button>
      </ActionButtons>
    </div>
  ),
}
