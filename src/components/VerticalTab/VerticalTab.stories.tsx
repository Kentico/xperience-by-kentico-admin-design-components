import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { VerticalTab } from './VerticalTab'
import { Icon } from '@/components/Icon'

const meta = {
  title: 'Navigation/VerticalTab',
  component: VerticalTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof VerticalTab>

export default meta
type Story = StoryObj<typeof VerticalTab>

export const Default: Story = {
  args: {
    label: 'Tab label',
  },
}

export const Selected: Story = {
  args: {
    label: 'Selected tab',
    selected: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled tab',
    disabled: true,
  },
}

export const WithIcon: Story = {
  args: {
    label: 'With icon',
    icon: <Icon name="xp-cogwheel" />,
  },
}

export const TabGroup: Story = {
  render: () => {
    const Tabs = () => {
      const [selected, setSelected] = useState(0)
      const tabs = ['General', 'Appearance', 'Advanced']
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 200 }}>
          {tabs.map((tab, i) => (
            <VerticalTab
              key={tab}
              label={tab}
              selected={selected === i}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      )
    }
    return <Tabs />
  },
}

export const WithIconsGroup: Story = {
  render: () => {
    const Tabs = () => {
      const [selected, setSelected] = useState(0)
      const tabs = [
        { label: 'Home', icon: 'xp-home' },
        { label: 'Settings', icon: 'xp-cogwheel' },
        { label: 'Users', icon: 'xp-user' },
      ]
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 200 }}>
          {tabs.map((tab, i) => (
            <VerticalTab
              key={tab.label}
              label={tab.label}
              icon={<Icon name={tab.icon} />}
              selected={selected === i}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      )
    }
    return <Tabs />
  },
}
