import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import {
  IconToggleButtons,
  NameToggleButtons,
  type IconToggleButton,
  type NameToggleButton,
} from '.'

const iconItems: IconToggleButton[] = [
  { id: 'grid', icon: 'xp-boxes', tooltip: 'Grid view' },
  { id: 'list', icon: 'xp-list', tooltip: 'List view' },
  { id: 'tree', icon: 'xp-tree-structure', tooltip: 'Tree view' },
]

const nameItems: NameToggleButton[] = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
]

const meta = {
  title: 'Forms/ToggleButtons',
  component: IconToggleButtons,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedItemId: {
      control: 'text',
      description: 'ID of the currently selected item',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the toggle buttons',
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof IconToggleButtons>

export default meta
type Story = StoryObj<typeof IconToggleButtons>

// Interactive wrapper for IconToggleButtons
const IconToggleButtonsDemo = ({
  orientation,
  initialSelected = 'grid',
}: {
  orientation?: 'horizontal' | 'vertical'
  initialSelected?: string
}) => {
  const [selected, setSelected] = useState(initialSelected)
  return (
    <IconToggleButtons
      items={iconItems}
      selectedItemId={selected}
      onChange={setSelected}
      orientation={orientation}
    />
  )
}

// Interactive wrapper for NameToggleButtons
const NameToggleButtonsDemo = ({
  orientation,
  initialSelected = 'week',
}: {
  orientation?: 'horizontal' | 'vertical'
  initialSelected?: string
}) => {
  const [selected, setSelected] = useState(initialSelected)
  return (
    <NameToggleButtons
      items={nameItems}
      selectedItemId={selected}
      onChange={setSelected}
      orientation={orientation}
    />
  )
}

export const Default: Story = {
  render: function DefaultStory(args) {
    const [selected, setSelected] = useState(args.selectedItemId ?? 'grid')
    return (
      <IconToggleButtons
        {...args}
        items={iconItems}
        selectedItemId={selected}
        onChange={(id) => {
          setSelected(id)
          args.onChange?.(id)
        }}
      />
    )
  },
  args: {
    items: iconItems,
    selectedItemId: 'grid',
  },
}

export const IconToggleButtonsHorizontal: Story = {
  name: 'Icon Toggle Buttons (Horizontal)',
  render: () => <IconToggleButtonsDemo orientation="horizontal" />,
}

export const IconToggleButtonsVertical: Story = {
  name: 'Icon Toggle Buttons (Vertical)',
  render: () => <IconToggleButtonsDemo orientation="vertical" />,
}

export const NameToggleButtonsHorizontal: Story = {
  name: 'Name Toggle Buttons (Horizontal)',
  render: () => <NameToggleButtonsDemo orientation="horizontal" />,
}

export const NameToggleButtonsVertical: Story = {
  name: 'Name Toggle Buttons (Vertical)',
  render: () => <NameToggleButtonsDemo orientation="vertical" />,
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#666' }}>
          Icon Toggle Buttons (Horizontal)
        </h3>
        <IconToggleButtonsDemo orientation="horizontal" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#666' }}>
          Icon Toggle Buttons (Vertical)
        </h3>
        <IconToggleButtonsDemo orientation="vertical" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#666' }}>
          Name Toggle Buttons (Horizontal)
        </h3>
        <NameToggleButtonsDemo orientation="horizontal" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#666' }}>
          Name Toggle Buttons (Vertical)
        </h3>
        <NameToggleButtonsDemo orientation="vertical" />
      </div>
    </div>
  ),
}

export const WithTooltips: Story = {
  name: 'Icon Buttons with Tooltips',
  render: () => {
    const [selected, setSelected] = useState('bold')
    const items: IconToggleButton[] = [
      { id: 'bold', icon: 'b', tooltip: 'Bold (Ctrl+B)', tooltipPlacement: 'top' },
      { id: 'italic', icon: 'i', tooltip: 'Italic (Ctrl+I)', tooltipPlacement: 'top' },
      { id: 'underline', icon: 'u', tooltip: 'Underline (Ctrl+U)', tooltipPlacement: 'top' },
    ]
    return (
      <IconToggleButtons
        items={items}
        selectedItemId={selected}
        onChange={setSelected}
      />
    )
  },
}

export const TwoOptions: Story = {
  name: 'Two Options (Binary Toggle)',
  render: () => {
    const [selected, setSelected] = useState('on')
    const items: NameToggleButton[] = [
      { id: 'on', label: 'On' },
      { id: 'off', label: 'Off' },
    ]
    return (
      <NameToggleButtons
        items={items}
        selectedItemId={selected}
        onChange={setSelected}
      />
    )
  },
}

export const ManyOptions: Story = {
  name: 'Many Options',
  render: () => {
    const [selected, setSelected] = useState('1h')
    const items: NameToggleButton[] = [
      { id: '1h', label: '1h' },
      { id: '6h', label: '6h' },
      { id: '24h', label: '24h' },
      { id: '7d', label: '7d' },
      { id: '30d', label: '30d' },
      { id: '90d', label: '90d' },
    ]
    return (
      <NameToggleButtons
        items={items}
        selectedItemId={selected}
        onChange={setSelected}
      />
    )
  },
}
