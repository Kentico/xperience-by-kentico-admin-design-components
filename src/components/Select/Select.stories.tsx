import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Select } from './Select'
import { MenuItem } from '@/components/MenuItem'

const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    clearable: { control: 'boolean' },
    markAsRequired: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    validationMessage: { control: 'text' },
    explanationText: { control: 'text' },
    clearButtonTooltip: { control: 'text' },
  },
  args: {
    onChange: fn(),
    disabled: false,
    readOnly: false,
    invalid: false,
    clearable: false,
    markAsRequired: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

const defaultOptions = (
  <>
    <MenuItem primaryLabel="Option 1" value="option1" onClick={() => {}} />
    <MenuItem primaryLabel="Option 2" value="option2" onClick={() => {}} />
    <MenuItem primaryLabel="Option 3" value="option3" onClick={() => {}} />
    <MenuItem primaryLabel="Option 4" value="option4" onClick={() => {}} />
  </>
)

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<string | undefined>(undefined)
    return (
      <Select
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val)
          args.onChange?.(val)
        }}
      />
    )
  },
  args: {
    name: 'default-select',
    label: 'Content type',
    placeholder: 'Select an option...',
    children: defaultOptions,
  },
}

export const WithValue: Story = {
  render: function WithValueStory(args) {
    const [value, setValue] = useState<string | undefined>((args.value as string) ?? 'option2')
    return (
      <Select
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val)
          args.onChange?.(val)
        }}
      />
    )
  },
  args: {
    name: 'value-select',
    label: 'Content type',
    value: 'option2',
    children: defaultOptions,
  },
}

export const Placeholder: Story = {
  args: {
    name: 'placeholder-select',
    label: 'Select content',
    placeholder: 'Choose an item...',
    children: defaultOptions,
  },
}

export const Clearable: Story = {
  render: function ClearableStory(args) {
    const [value, setValue] = useState<string | undefined>((args.value as string) ?? 'react')
    return (
      <Select
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val)
          args.onChange?.(val)
        }}
      />
    )
  },
  args: {
    name: 'clearable-select',
    label: 'Framework',
    value: 'react',
    clearable: true,
    clearButtonTooltip: 'Clear selection',
    children: (
      <>
        <MenuItem primaryLabel="React" value="react" onClick={() => {}} />
        <MenuItem primaryLabel="Vue" value="vue" onClick={() => {}} />
        <MenuItem primaryLabel="Angular" value="angular" onClick={() => {}} />
        <MenuItem primaryLabel="Svelte" value="svelte" onClick={() => {}} />
      </>
    ),
  },
}

export const Invalid: Story = {
  args: {
    name: 'invalid-select',
    label: 'Required field',
    markAsRequired: true,
    invalid: true,
    validationMessage: 'Please select an option',
    placeholder: 'Choose...',
    children: (
      <>
        <MenuItem primaryLabel="Option A" value="a" onClick={() => {}} />
        <MenuItem primaryLabel="Option B" value="b" onClick={() => {}} />
      </>
    ),
  },
}

export const Disabled: Story = {
  args: {
    name: 'disabled-select',
    label: 'Disabled',
    value: 'option1',
    disabled: true,
    children: defaultOptions,
  },
}

export const ReadOnly: Story = {
  args: {
    name: 'readonly-select',
    label: 'Read-only',
    value: 'option1',
    readOnly: true,
    children: defaultOptions,
  },
}

export const WithExplanation: Story = {
  render: function WithExplanationStory(args) {
    const [value, setValue] = useState<string | undefined>((args.value as string) ?? 'eu')
    return (
      <Select
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val)
          args.onChange?.(val)
        }}
      />
    )
  },
  args: {
    name: 'explanation-select',
    label: 'Region',
    value: 'eu',
    explanationText: 'Select the primary deployment region for your application.',
    children: (
      <>
        <MenuItem primaryLabel="United States" value="us" onClick={() => {}} />
        <MenuItem primaryLabel="Europe" value="eu" onClick={() => {}} />
        <MenuItem primaryLabel="Asia Pacific" value="ap" onClick={() => {}} />
      </>
    ),
  },
}

export const AllStates: Story = {
  render: function AllStatesStory() {
    const [filledValue, setFilledValue] = useState<string | undefined>('option1')
    const [clearableValue, setClearableValue] = useState<string | undefined>('option1')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Default</span>
          <Select name="state-default" label="Default" placeholder="Select...">
            <MenuItem primaryLabel="Option 1" value="option1" onClick={() => {}} />
            <MenuItem primaryLabel="Option 2" value="option2" onClick={() => {}} />
          </Select>
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>With value</span>
          <Select name="state-filled" label="With value" value={filledValue} onChange={setFilledValue}>
            <MenuItem primaryLabel="Option 1" value="option1" onClick={() => {}} />
            <MenuItem primaryLabel="Option 2" value="option2" onClick={() => {}} />
          </Select>
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Clearable</span>
          <Select
            name="state-clearable"
            label="Clearable"
            value={clearableValue}
            onChange={setClearableValue}
            clearable
            clearButtonTooltip="Clear"
          >
            <MenuItem primaryLabel="Option 1" value="option1" onClick={() => {}} />
            <MenuItem primaryLabel="Option 2" value="option2" onClick={() => {}} />
          </Select>
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Invalid</span>
          <Select
            name="state-invalid"
            label="Invalid"
            invalid
            validationMessage="This field is required"
            placeholder="Select..."
          >
            <MenuItem primaryLabel="Option 1" value="option1" onClick={() => {}} />
            <MenuItem primaryLabel="Option 2" value="option2" onClick={() => {}} />
          </Select>
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Disabled</span>
          <Select name="state-disabled" label="Disabled" value="option1" disabled>
            <MenuItem primaryLabel="Option 1" value="option1" onClick={() => {}} />
            <MenuItem primaryLabel="Option 2" value="option2" onClick={() => {}} />
          </Select>
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Read-only</span>
          <Select name="state-readonly" label="Read-only" value="option1" readOnly>
            <MenuItem primaryLabel="Option 1" value="option1" onClick={() => {}} />
            <MenuItem primaryLabel="Option 2" value="option2" onClick={() => {}} />
          </Select>
        </div>
      </div>
    )
  },
}

/** Demonstrates controlled select behavior */
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState<string | undefined>('react')

    return (
      <div style={{ width: 320 }}>
        <Select
          name="controlled-select"
          label="Framework"
          value={value}
          onChange={(val) => setValue(val)}
          clearable
          clearButtonTooltip="Clear selection"
        >
          <MenuItem primaryLabel="React" value="react" onClick={() => {}} />
          <MenuItem primaryLabel="Vue" value="vue" onClick={() => {}} />
          <MenuItem primaryLabel="Angular" value="angular" onClick={() => {}} />
          <MenuItem primaryLabel="Svelte" value="svelte" onClick={() => {}} />
        </Select>
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Selected: &quot;{value || 'None'}&quot;
        </p>
      </div>
    )
  },
}
