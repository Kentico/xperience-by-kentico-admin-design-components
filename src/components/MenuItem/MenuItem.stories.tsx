import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { MenuItem } from './MenuItem'
import { Icon } from '../Icon'

const meta = {
  title: 'Navigation/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    primaryLabel: { control: 'text' },
    secondaryLabel: { control: 'text' },
    tooltipText: { control: 'text' },
    tooltipPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    destructive: { control: 'boolean' },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    isNested: { control: 'boolean' },
    isSubmenuOpened: { control: 'boolean' },
    isMultiSelect: { control: 'boolean' },
    large: { control: 'boolean' },
    noHoverCss: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    destructive: false,
    disabled: false,
    selected: false,
    isNested: false,
    isSubmenuOpened: false,
    isMultiSelect: false,
    large: false,
    noHoverCss: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 260, background: '#fff', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MenuItem>

export default meta
type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  args: {
    primaryLabel: 'Menu Item',
  },
}

export const WithSecondaryLabel: Story = {
  args: {
    primaryLabel: 'Edit Profile',
    secondaryLabel: 'Change your display name and settings',
  },
}

export const WithLeadingIcon: Story = {
  args: {
    primaryLabel: 'Edit',
    leadingElement: {
      type: 'icon',
      element: <Icon name="edit" />,
    },
  },
}

export const WithTrailingIcon: Story = {
  args: {
    primaryLabel: 'More Options',
    trailingElement: {
      type: 'icon',
      element: <Icon name="caret-right" />,
    },
  },
}

export const WithTrailingLabel: Story = {
  args: {
    primaryLabel: 'Open Recent',
    trailingElement: {
      type: 'label',
      element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+R</span>,
    },
  },
}

export const WithBothElements: Story = {
  args: {
    primaryLabel: 'Save As...',
    leadingElement: {
      type: 'icon',
      element: <Icon name="doc" />,
    },
    trailingElement: {
      type: 'label',
      element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+Shift+S</span>,
    },
  },
}

export const Destructive: Story = {
  args: {
    primaryLabel: 'Delete',
    leadingElement: {
      type: 'icon',
      element: <Icon name="bin" />,
    },
    destructive: true,
  },
}

export const Disabled: Story = {
  args: {
    primaryLabel: 'Disabled Action',
    leadingElement: {
      type: 'icon',
      element: <Icon name="ban-sign" />,
    },
    disabled: true,
  },
}

export const Selected: Story = {
  args: {
    primaryLabel: 'Selected Item',
    leadingElement: {
      type: 'icon',
      element: <Icon name="check" />,
    },
    selected: true,
  },
}

export const MultiSelectChecked: Story = {
  args: {
    primaryLabel: 'Multi-select Checked',
    isMultiSelect: true,
    selected: true,
  },
}

export const MultiSelectUnchecked: Story = {
  args: {
    primaryLabel: 'Multi-select Unchecked',
    isMultiSelect: true,
    selected: false,
  },
}

export const Nested: Story = {
  args: {
    primaryLabel: 'Nested Menu Item',
    isNested: true,
  },
}

export const SubmenuOpened: Story = {
  args: {
    primaryLabel: 'Submenu',
    trailingElement: {
      type: 'icon',
      element: <Icon name="caret-right" />,
    },
    isSubmenuOpened: true,
  },
}

export const Large: Story = {
  args: {
    primaryLabel: 'Large Menu Item',
    secondaryLabel: 'This uses the large height variant',
    leadingElement: {
      type: 'icon',
      element: <Icon name="folder" />,
    },
    large: true,
  },
}

export const WithTooltip: Story = {
  args: {
    primaryLabel: 'Action with tooltip',
    tooltipText: 'This action performs something important',
    tooltipPlacement: 'right',
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <MenuItem primaryLabel="Default" onClick={() => {}} />
      <MenuItem
        primaryLabel="With Icon"
        leadingElement={{ type: 'icon', element: <Icon name="edit" /> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="With Secondary"
        secondaryLabel="Additional description"
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="With Trailing"
        trailingElement={{ type: 'label', element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+S</span> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Selected"
        leadingElement={{ type: 'icon', element: <Icon name="check" /> }}
        selected
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Disabled"
        leadingElement={{ type: 'icon', element: <Icon name="ban-sign" /> }}
        disabled
      />
      <MenuItem
        primaryLabel="Destructive"
        leadingElement={{ type: 'icon', element: <Icon name="bin" /> }}
        destructive
        onClick={() => {}}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const MultiSelectList: Story = {
  render: function MultiSelectListStory() {
    const [selected, setSelected] = useState<Record<string, boolean>>({
      A: true,
      B: false,
      C: true,
      D: false,
      E: false,
    })
    const toggle = (key: string) => setSelected((prev) => ({ ...prev, [key]: !prev[key] }))
    return (
      <div style={{ width: 260 }}>
        <MenuItem primaryLabel="Option A" isMultiSelect selected={selected.A} onClick={() => toggle('A')} />
        <MenuItem primaryLabel="Option B" isMultiSelect selected={selected.B} onClick={() => toggle('B')} />
        <MenuItem primaryLabel="Option C" isMultiSelect selected={selected.C} onClick={() => toggle('C')} />
        <MenuItem primaryLabel="Option D" isMultiSelect selected={selected.D} onClick={() => toggle('D')} />
        <MenuItem primaryLabel="Option E" isMultiSelect selected={false} disabled />
      </div>
    )
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const ActionMenu: Story = {
  render: () => (
    <div style={{ width: 220 }}>
      <MenuItem
        primaryLabel="View Details"
        leadingElement={{ type: 'icon', element: <Icon name="eye" /> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Edit"
        leadingElement={{ type: 'icon', element: <Icon name="edit" /> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Duplicate"
        leadingElement={{ type: 'icon', element: <Icon name="doc-copy" /> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Share"
        leadingElement={{ type: 'icon', element: <Icon name="paper-plane" /> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Archive"
        leadingElement={{ type: 'icon', element: <Icon name="binder" /> }}
        disabled
      />
      <MenuItem
        primaryLabel="Delete"
        leadingElement={{ type: 'icon', element: <Icon name="bin" /> }}
        destructive
        onClick={() => {}}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}

export const WithKeyboardShortcuts: Story = {
  render: () => (
    <div style={{ width: 220 }}>
      <MenuItem
        primaryLabel="New File"
        leadingElement={{ type: 'icon', element: <Icon name="doc-plus" /> }}
        trailingElement={{ type: 'label', element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+N</span> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Open"
        leadingElement={{ type: 'icon', element: <Icon name="folder-opened" /> }}
        trailingElement={{ type: 'label', element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+O</span> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Save"
        leadingElement={{ type: 'icon', element: <Icon name="doc" /> }}
        trailingElement={{ type: 'label', element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+S</span> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Save As..."
        leadingElement={{ type: 'icon', element: <Icon name="doc" /> }}
        trailingElement={{ type: 'label', element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+Shift+S</span> }}
        onClick={() => {}}
      />
      <MenuItem
        primaryLabel="Print"
        leadingElement={{ type: 'icon', element: <Icon name="printer" /> }}
        trailingElement={{ type: 'label', element: <span style={{ fontSize: 12, color: '#666' }}>Ctrl+P</span> }}
        onClick={() => {}}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ background: '#fff', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}
