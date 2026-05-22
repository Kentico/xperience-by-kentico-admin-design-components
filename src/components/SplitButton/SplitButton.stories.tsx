import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SplitButton } from './SplitButton'
import { SplitButtonDisabledState } from './SplitButton.types'
import { MenuItem } from '../MenuItem'
import { Icon } from '../Icon'

const colors = ['primary', 'secondary'] as const

const sizes = ['S', 'M', 'L'] as const

const meta = {
  title: 'Actions/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: colors,
    },
    size: {
      control: 'select',
      options: sizes,
    },
    disabledState: {
      control: 'select',
      options: Object.values(SplitButtonDisabledState),
    },
    inProgress: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    onToggle: fn(),
    inProgress: false,
    disabled: false,
  },
} satisfies Meta<typeof SplitButton>

export default meta
type Story = StoryObj<typeof SplitButton>

const defaultMenuItems = (
  <>
    <MenuItem
      primaryLabel="Edit"
      leadingElement={{ type: 'icon', element: <Icon name="edit" /> }}
      onClick={() => alert('Edit clicked')}
    />
    <MenuItem
      primaryLabel="Duplicate"
      leadingElement={{ type: 'icon', element: <Icon name="doc-copy" /> }}
      onClick={() => alert('Duplicate clicked')}
    />
    <MenuItem
      primaryLabel="Delete"
      leadingElement={{ type: 'icon', element: <Icon name="bin" /> }}
      destructive
      onClick={() => alert('Delete clicked')}
    />
  </>
)

export const Default: Story = {
  args: {
    label: 'Save',
    color: 'primary',
    size: 'M',
    children: defaultMenuItems,
  },
}

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {colors.map((color) => (
        <SplitButton key={color} color={color} size="M" label={color}>
          {defaultMenuItems}
        </SplitButton>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {sizes.map((size) => (
        <SplitButton key={size} color="primary" size={size} label={size}>
          {defaultMenuItems}
        </SplitButton>
      ))}
    </div>
  ),
}

export const ColorSizeMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {colors.map((color) => (
        <div key={color} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ width: 80, fontSize: 12, color: '#666' }}>{color}</span>
          {sizes.map((size) => (
            <SplitButton key={`${color}-${size}`} color={color} size={size} label={size}>
              {defaultMenuItems}
            </SplitButton>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SplitButton
        color="primary"
        size="M"
        label="Add"
        icon={<Icon name="plus" />}
      >
        {defaultMenuItems}
      </SplitButton>
      <SplitButton
        color="secondary"
        size="M"
        label="Settings"
        icon={<Icon name="cogwheel" />}
      >
        {defaultMenuItems}
      </SplitButton>
    </div>
  ),
}

export const DisabledStateNone: Story = {
  args: {
    label: 'Enabled',
    color: 'primary',
    size: 'M',
    disabledState: SplitButtonDisabledState.NONE,
    children: defaultMenuItems,
  },
}

export const DisabledStateAll: Story = {
  args: {
    label: 'All Disabled',
    color: 'primary',
    size: 'M',
    disabledState: SplitButtonDisabledState.ALL,
    children: defaultMenuItems,
  },
}

export const DisabledStatePartial: Story = {
  args: {
    label: 'Main Disabled',
    color: 'primary',
    size: 'M',
    disabledState: SplitButtonDisabledState.PARTIAL,
    children: defaultMenuItems,
  },
}

export const AllDisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <SplitButton
          color="primary"
          size="M"
          label="None"
          disabledState={SplitButtonDisabledState.NONE}
        >
          {defaultMenuItems}
        </SplitButton>
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>NONE</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SplitButton
          color="primary"
          size="M"
          label="All"
          disabledState={SplitButtonDisabledState.ALL}
        >
          {defaultMenuItems}
        </SplitButton>
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>ALL</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SplitButton
          color="primary"
          size="M"
          label="Partial"
          disabledState={SplitButtonDisabledState.PARTIAL}
        >
          {defaultMenuItems}
        </SplitButton>
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>PARTIAL</p>
      </div>
    </div>
  ),
}

export const InProgress: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SplitButton
        color="primary"
        size="M"
        label="Saving..."
        inProgress
      >
        {defaultMenuItems}
      </SplitButton>
      <SplitButton
        color="secondary"
        size="M"
        label="Loading..."
        inProgress
      >
        {defaultMenuItems}
      </SplitButton>
    </div>
  ),
}

export const InProgressWithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SplitButton
        color="primary"
        size="M"
        label="Saving..."
        icon={<Icon name="check" />}
        inProgress
      >
        {defaultMenuItems}
      </SplitButton>
      <SplitButton
        color="secondary"
        size="M"
        label="Processing..."
        icon={<Icon name="cogwheel" />}
        inProgress
      >
        {defaultMenuItems}
      </SplitButton>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SplitButton
        color="primary"
        size="M"
        label="Open Page"
        href="https://example.com"
        target="_blank"
      >
        {defaultMenuItems}
      </SplitButton>
      <SplitButton
        color="secondary"
        size="M"
        label="Navigate"
        href="https://example.com"
        icon={<Icon name="arrow-right-top-square" />}
      >
        {defaultMenuItems}
      </SplitButton>
    </div>
  ),
}

export const WithTooltip: Story = {
  args: {
    label: 'Hover me',
    color: 'primary',
    size: 'M',
    title: 'This is a tooltip',
    children: defaultMenuItems,
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {colors.map((color) => (
        <SplitButton key={color} color={color} size="M" label={color} disabled>
          {defaultMenuItems}
        </SplitButton>
      ))}
    </div>
  ),
}
