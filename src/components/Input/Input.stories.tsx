import * as React from 'react';
import { useState, type ChangeEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Input } from './Input'

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    disabled: false,
    invalid: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    name: 'default-input',
  },
}

export const WithValue: Story = {
  render: function WithValueStory(args) {
    const [value, setValue] = useState(args.value ?? 'Hello, world!')
    return (
      <Input
        {...args}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    value: 'Hello, world!',
    name: 'value-input',
  },
}

export const Placeholder: Story = {
  args: {
    placeholder: 'Search content...',
    name: 'placeholder-input',
  },
}

export const Disabled: Story = {
  args: {
    value: 'Cannot edit this',
    disabled: true,
    name: 'disabled-input',
  },
}

export const Invalid: Story = {
  render: function InvalidStory(args) {
    const [value, setValue] = useState(args.value ?? 'invalid@')
    return (
      <Input
        {...args}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
          args.onChange?.(e)
        }}
      />
    )
  },
  args: {
    value: 'invalid@',
    invalid: true,
    name: 'invalid-input',
  },
}

export const InputTypes: Story = {
  render: () => {
    const types = ['text', 'password', 'email', 'number', 'search'] as const
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
        {types.map((type) => (
          <div key={type}>
            <label
              htmlFor={`input-type-${type}`}
              style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}
            >
              type=&quot;{type}&quot;
            </label>
            <Input
              type={type}
              placeholder={`Enter ${type}...`}
              name={`input-type-${type}`}
              id={`input-type-${type}`}
            />
          </div>
        ))}
      </div>
    )
  },
}

export const AllStates: Story = {
  render: function AllStatesStory() {
    const [filledValue, setFilledValue] = useState('Filled input')
    const [invalidValue, setInvalidValue] = useState('Invalid input')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Default</span>
          <Input placeholder="Default state" name="state-default" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>With value</span>
          <Input
            value={filledValue}
            onChange={(e) => setFilledValue(e.target.value)}
            name="state-filled"
          />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Disabled</span>
          <Input value="Disabled input" disabled name="state-disabled" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666' }}>Invalid</span>
          <Input
            value={invalidValue}
            onChange={(e) => setInvalidValue(e.target.value)}
            invalid
            name="state-invalid"
          />
        </div>
      </div>
    )
  },
}

/** Demonstrates controlled input behavior */
export const Controlled: Story = {
  render: function ControlledInput() {
    const [value, setValue] = useState('')

    return (
      <div style={{ width: 320 }}>
        <Input
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          placeholder="Type something..."
          name="controlled-input"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Value: &quot;{value}&quot; ({value.length} characters)
        </p>
      </div>
    )
  },
}
