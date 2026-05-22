import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SearchInput } from './SearchInput'

const meta = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    debounceMs: { control: 'number' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
    onClear: { table: { disable: true } },
  },
  args: {
    placeholder: 'Search...',
    value: '',
    clearable: false,
    disabled: false,
    debounceMs: 0,
    onChange: fn(),
    onSubmit: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: 320 }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v)
            args.onChange(v)
          }}
          name="search-default"
        />
      </div>
    )
  },
}

export const Clearable: Story = {
  args: {
    clearable: true,
    clearButtonTooltip: 'Clear search',
  },
  render: function ClearableStory(args) {
    const [value, setValue] = useState('Initial search text')
    return (
      <div style={{ width: 320 }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v)
            args.onChange(v)
          }}
          onClear={() => {
            setValue('')
            args.onClear?.()
          }}
          name="search-clearable"
        />
      </div>
    )
  },
}

export const Debounced: Story = {
  args: {
    debounceMs: 500,
    placeholder: 'Type to search (500ms debounce)...',
  },
  render: function DebouncedStory(args) {
    const [value, setValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')

    return (
      <div style={{ width: 320 }}>
        <SearchInput
          {...args}
          value={value}
          onChange={(v) => {
            setValue(v)
            setDebouncedValue(v)
            args.onChange(v)
          }}
          name="search-debounced"
        />
        <p style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
          Debounced value: &quot;{debouncedValue}&quot;
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search disabled',
  },
  render: function DisabledStory(args) {
    const [value] = useState('Cannot edit')
    return (
      <div style={{ width: 320 }}>
        <SearchInput
          {...args}
          value={value}
          onChange={args.onChange}
          name="search-disabled"
        />
      </div>
    )
  },
}
