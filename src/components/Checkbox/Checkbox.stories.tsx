import * as React from 'react';
import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Checkbox } from './Checkbox'
import { CheckboxSize } from './Checkbox.types'

const sizes = [CheckboxSize.S, CheckboxSize.M, CheckboxSize.L] as const

/** Interactive wrapper for showcase stories where each checkbox needs its own state */
const InteractiveCheckbox = ({
  checked: initialChecked = false,
  indetermined: initialIndetermined = false,
  ...props
}: ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState(initialChecked)
  const [indetermined, setIndetermined] = useState(initialIndetermined)
  return (
    <Checkbox
      {...props}
      checked={checked}
      indetermined={indetermined}
      onChange={(_e, newChecked) => {
        setChecked(newChecked)
        setIndetermined(false)
      }}
    />
  )
}

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(CheckboxSize),
    },
    checked: { control: 'boolean' },
    indetermined: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    highlighted: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    onChange: fn(),
    onClick: fn(),
    checked: false,
    indetermined: false,
    disabled: false,
    readOnly: false,
    invalid: false,
    highlighted: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [checked, setChecked] = useState(args.checked ?? false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(_e, newChecked) => {
          setChecked(newChecked)
          args.onChange?.(_e, newChecked)
        }}
      />
    )
  },
  args: {
    label: 'Checkbox',
    name: 'default-checkbox',
  },
}

export const Checked: Story = {
  render: function CheckedStory(args) {
    const [checked, setChecked] = useState(args.checked ?? true)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(_e, newChecked) => {
          setChecked(newChecked)
          args.onChange?.(_e, newChecked)
        }}
      />
    )
  },
  args: {
    label: 'Checked checkbox',
    checked: true,
    name: 'checked-checkbox',
  },
}

export const Indeterminate: Story = {
  render: function IndeterminateStory(args) {
    const [checked, setChecked] = useState(false)
    const [indetermined, setIndetermined] = useState(args.indetermined ?? true)
    return (
      <Checkbox
        {...args}
        checked={checked}
        indetermined={indetermined}
        onChange={(_e, newChecked) => {
          setChecked(newChecked)
          setIndetermined(false)
          args.onChange?.(_e, newChecked)
        }}
      />
    )
  },
  args: {
    label: 'Indeterminate checkbox',
    indetermined: true,
    name: 'indeterminate-checkbox',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {sizes.map((size) => (
        <InteractiveCheckbox key={size} size={size} label={`Size ${size}`} name={`size-${size}-checkbox`} />
      ))}
    </div>
  ),
}

export const AllSizesChecked: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {sizes.map((size) => (
        <InteractiveCheckbox
          key={size}
          size={size}
          checked
          label={`Size ${size}`}
          name={`size-checked-${size}-checkbox`}
        />
      ))}
    </div>
  ),
}

export const AllSizesIndeterminate: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {sizes.map((size) => (
        <Checkbox
          key={size}
          size={size}
          indetermined
          label={`Size ${size}`}
          name={`size-indeterminate-${size}-checkbox`}
        />
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Checkbox label="Disabled unchecked" disabled name="disabled-unchecked-checkbox" />
      <Checkbox label="Disabled checked" disabled checked name="disabled-checked-checkbox" />
      <Checkbox
        label="Disabled indeterminate"
        disabled
        indetermined
        name="disabled-indeterminate-checkbox"
      />
    </div>
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Checkbox label="Read-only unchecked" readOnly name="readonly-unchecked-checkbox" />
      <Checkbox label="Read-only checked" readOnly checked name="readonly-checked-checkbox" />
    </div>
  ),
}

export const Invalid: Story = {
  render: function InvalidStory(args) {
    const [checked, setChecked] = useState(args.checked ?? false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(_e, newChecked) => {
          setChecked(newChecked)
          args.onChange?.(_e, newChecked)
        }}
      />
    )
  },
  args: {
    label: 'Invalid checkbox',
    invalid: true,
    validationMessage: 'This field is required',
    name: 'invalid-checkbox',
  },
}

export const WithExplanationText: Story = {
  render: function WithExplanationTextStory(args) {
    const [checked, setChecked] = useState(args.checked ?? false)
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(_e, newChecked) => {
          setChecked(newChecked)
          args.onChange?.(_e, newChecked)
        }}
      />
    )
  },
  args: {
    label: 'Subscribe to newsletter',
    explanationText: 'Receive weekly updates about new features and offers.',
    name: 'explanation-checkbox',
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>
          Default
        </span>
        <InteractiveCheckbox label="Default checkbox" name="state-default-checkbox" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>
          Checked
        </span>
        <InteractiveCheckbox label="Checked checkbox" checked name="state-checked-checkbox" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>
          Indeterminate
        </span>
        <InteractiveCheckbox label="Indeterminate checkbox" indetermined name="state-indeterminate-checkbox" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>
          Disabled
        </span>
        <Checkbox label="Disabled checkbox" disabled name="state-disabled-checkbox" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>
          Invalid
        </span>
        <InteractiveCheckbox label="Invalid checkbox" invalid name="state-invalid-checkbox" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>
          Highlighted
        </span>
        <InteractiveCheckbox label="Highlighted checkbox" highlighted name="state-highlighted-checkbox" />
      </div>
    </div>
  ),
}

/** Demonstrates controlled checkbox behavior */
export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false)

    return (
      <div>
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onChange={(_e, newChecked) => setChecked(newChecked)}
          name="controlled-checkbox"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Checked: {checked ? 'true' : 'false'}
        </p>
      </div>
    )
  },
}

/** Demonstrates indeterminate state behavior for "select all" patterns */
export const SelectAllPattern: Story = {
  render: function SelectAllCheckbox() {
    const [items, setItems] = useState([
      { id: 1, label: 'Item 1', checked: false },
      { id: 2, label: 'Item 2', checked: true },
      { id: 3, label: 'Item 3', checked: false },
    ])

    const checkedCount = items.filter((item) => item.checked).length
    const allChecked = checkedCount === items.length
    const someChecked = checkedCount > 0 && checkedCount < items.length

    const handleSelectAll = () => {
      setItems(items.map((item) => ({ ...item, checked: !allChecked })))
    }

    const handleItemChange = (id: number) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox
          label="Select all"
          checked={allChecked}
          indetermined={someChecked}
          onChange={handleSelectAll}
          name="select-all-checkbox"
        />
        <div style={{ marginLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onChange={() => handleItemChange(item.id)}
              name={`item-${item.id}-checkbox`}
            />
          ))}
        </div>
      </div>
    )
  },
}
