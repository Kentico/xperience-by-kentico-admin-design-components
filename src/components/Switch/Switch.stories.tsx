import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Switch } from './Switch'
import { SwitchSize } from './Switch.types'

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [SwitchSize.M, SwitchSize.L],
    },
    value: { control: 'boolean' },
    disabled: { control: 'boolean' },
    inProgress: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    onChange: fn(),
    size: SwitchSize.M,
    value: false,
    disabled: false,
    inProgress: false,
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState(args.value ?? false)
    return (
      <Switch
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          args.onChange?.(newValue)
        }}
      />
    )
  },
  args: {
    value: false,
    size: SwitchSize.M,
  },
}

export const On: Story = {
  render: function OnStory(args) {
    const [value, setValue] = useState(args.value ?? true)
    return (
      <Switch
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          args.onChange?.(newValue)
        }}
      />
    )
  },
  args: {
    value: true,
    size: SwitchSize.M,
  },
}

export const WithLabel: Story = {
  render: function WithLabelStory(args) {
    const [value, setValue] = useState(args.value ?? false)
    return (
      <Switch
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
          args.onChange?.(newValue)
        }}
      />
    )
  },
  args: {
    value: false,
    size: SwitchSize.M,
    label: 'Enable notifications',
  },
}

export const Disabled: Story = {
  args: {
    value: false,
    size: SwitchSize.M,
    disabled: true,
    label: 'Disabled switch',
  },
}

export const DisabledOn: Story = {
  args: {
    value: true,
    size: SwitchSize.M,
    disabled: true,
    label: 'Disabled switch (on)',
  },
}

export const InProgress: Story = {
  args: {
    value: false,
    size: SwitchSize.M,
    inProgress: true,
    label: 'Processing...',
  },
}

export const SizeVariants: Story = {
  render: function SizeVariantsStory() {
    const [mediumValue, setMediumValue] = useState(true)
    const [largeValue, setLargeValue] = useState(true)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>
            Size M (Medium)
          </span>
          <Switch value={mediumValue} size={SwitchSize.M} onChange={setMediumValue} label="Medium switch" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>
            Size L (Large)
          </span>
          <Switch value={largeValue} size={SwitchSize.L} onChange={setLargeValue} label="Large switch" />
        </div>
      </div>
    )
  },
}

export const AllStates: Story = {
  render: function AllStatesStory() {
    const [offValue, setOffValue] = useState(false)
    const [onValue, setOnValue] = useState(true)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Off</span>
          <Switch value={offValue} size={SwitchSize.M} onChange={setOffValue} label="Off state" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>On</span>
          <Switch value={onValue} size={SwitchSize.M} onChange={setOnValue} label="On state" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Disabled (off)</span>
          <Switch value={false} size={SwitchSize.M} onChange={() => {}} disabled label="Disabled off" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Disabled (on)</span>
          <Switch value={true} size={SwitchSize.M} onChange={() => {}} disabled label="Disabled on" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>In Progress</span>
          <Switch value={false} size={SwitchSize.M} onChange={() => {}} inProgress label="In progress" />
        </div>
      </div>
    )
  },
}

/** Demonstrates controlled switch behavior */
export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [value, setValue] = useState(false)

    return (
      <div>
        <Switch
          value={value}
          onChange={setValue}
          size={SwitchSize.M}
          label="Toggle me"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Switch is: {value ? 'ON' : 'OFF'}
        </p>
      </div>
    )
  },
}
