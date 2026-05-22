import * as React from 'react';
import { useState, useCallback, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupSize, RadioButton } from './index'

/** Interactive wrapper for showcase stories where each RadioGroup needs its own state */
const InteractiveRadioGroup = ({
  value: initialValue,
  children,
  ...props
}: ComponentProps<typeof RadioGroup>) => {
  const [value, setValue] = useState(initialValue ?? '')
  return (
    <RadioGroup {...props} value={value} onChange={setValue}>
      {children}
    </RadioGroup>
  )
}

/**
 * RadioGroup is a container for multiple radio buttons rendered via RadioButton components.
 * It uses React Aria's radio group primitives and provides context to child RadioButtons.
 *
 * RadioButton components MUST be placed inside a RadioGroup.
 */
const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [RadioGroupSize.Small, RadioGroupSize.Medium, RadioGroupSize.Large],
      description: 'Size of the radio buttons',
    },
    inline: {
      control: 'boolean',
      description: 'Whether to render radio buttons in a horizontal row',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire group is disabled',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the group is read-only',
    },
    label: {
      control: 'text',
      description: 'Label displayed above the radio group',
    },
    explanationText: {
      control: 'text',
      description: 'Helper text displayed below the label',
    },
    children: { table: { disable: true } },
  },
  args: {
    name: 'default-group',
    label: 'Select an option',
    size: RadioGroupSize.Medium,
    inline: false,
    disabled: false,
    readOnly: false,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="option1">Option 1</RadioButton>
      <RadioButton value="option2">Option 2</RadioButton>
      <RadioButton value="option3">Option 3</RadioButton>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof RadioGroup>

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {}

export const SizeSmall: Story = {
  name: 'Size: Small',
  args: {
    name: 'size-small-group',
    label: 'Small size radio buttons',
    size: RadioGroupSize.Small,
  },
}

export const SizeMedium: Story = {
  name: 'Size: Medium (Default)',
  args: {
    name: 'size-medium-group',
    label: 'Medium size radio buttons',
    size: RadioGroupSize.Medium,
  },
}

export const SizeLarge: Story = {
  name: 'Size: Large',
  args: {
    name: 'size-large-group',
    label: 'Large size radio buttons',
    size: RadioGroupSize.Large,
  },
}

export const AllSizes: Story = {
  name: 'All Sizes Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
      <InteractiveRadioGroup name="size-small" label="Small" size={RadioGroupSize.Small} value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
      </InteractiveRadioGroup>
      <InteractiveRadioGroup name="size-medium" label="Medium" size={RadioGroupSize.Medium} value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
      </InteractiveRadioGroup>
      <InteractiveRadioGroup name="size-large" label="Large" size={RadioGroupSize.Large} value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
      </InteractiveRadioGroup>
    </div>
  ),
}

export const InlineLayout: Story = {
  name: 'Layout: Inline',
  args: {
    name: 'inline-group',
    label: 'Inline radio group',
    inline: true,
  },
}

export const StackedLayout: Story = {
  name: 'Layout: Stacked (Default)',
  args: {
    name: 'stacked-group',
    label: 'Stacked radio group',
    inline: false,
  },
}

export const LayoutComparison: Story = {
  name: 'Layout Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <InteractiveRadioGroup name="inline-demo" label="Inline Layout" inline value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
        <RadioButton value="opt3">Option 3</RadioButton>
      </InteractiveRadioGroup>
      <InteractiveRadioGroup name="stacked-demo" label="Stacked Layout (Default)" value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
        <RadioButton value="opt3">Option 3</RadioButton>
      </InteractiveRadioGroup>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    name: 'disabled-group',
    label: 'Disabled radio group',
    disabled: true,
  },
}

export const ReadOnly: Story = {
  args: {
    name: 'readonly-group',
    label: 'Read-only radio group',
    readOnly: true,
  },
}

export const WithCaptions: Story = {
  args: {
    name: 'captions-group',
    label: 'Select a plan',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="free" caption="Limited features, suitable for personal use">
        Free Plan
      </RadioButton>
      <RadioButton value="pro" caption="Full features, priority support included">
        Pro Plan
      </RadioButton>
      <RadioButton value="enterprise" caption="Custom features, dedicated account manager">
        Enterprise Plan
      </RadioButton>
    </RadioGroup>
  ),
}

export const WithAlert: Story = {
  args: {
    name: 'alert-group',
    label: 'Select an option',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="option1">Valid option</RadioButton>
      <RadioButton value="option2" alert alertCaption="This option has an issue">
        Option with alert
      </RadioButton>
      <RadioButton value="option3">Another valid option</RadioButton>
    </RadioGroup>
  ),
}

export const DisabledIndividualOptions: Story = {
  name: 'Individual Disabled Options',
  args: {
    name: 'partial-disabled-group',
    label: 'Some options are disabled',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="option1">Available</RadioButton>
      <RadioButton value="option2" disabled>
        Unavailable (disabled)
      </RadioButton>
      <RadioButton value="option3">Also available</RadioButton>
    </RadioGroup>
  ),
}

export const Controlled: Story = {
  render: (args) => {
    const ControlledDemo = () => {
      const [value, setValue] = useState('option1')
      const handleChange = useCallback((newValue: string) => setValue(newValue), [])

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <RadioGroup {...args} name="controlled-group" label="Controlled radio group" value={value} onChange={handleChange}>
            <RadioButton value="option1">Option 1</RadioButton>
            <RadioButton value="option2">Option 2</RadioButton>
            <RadioButton value="option3">Option 3</RadioButton>
          </RadioGroup>
          <div style={{ padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
            <strong>Selected value:</strong> {value}
          </div>
        </div>
      )
    }

    return <ControlledDemo />
  },
}

export const WithExplanationText: Story = {
  args: {
    name: 'explanation-group',
    label: 'Notification preferences',
    explanationText: 'Choose how you want to receive notifications',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioButton value="email" caption="Receive updates via email">
        Email
      </RadioButton>
      <RadioButton value="sms" caption="Receive updates via SMS">
        SMS
      </RadioButton>
      <RadioButton value="push" caption="Receive push notifications">
        Push Notifications
      </RadioButton>
    </RadioGroup>
  ),
}

export const InlineAllSizes: Story = {
  name: 'Inline Layout - All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <InteractiveRadioGroup name="inline-small" label="Small Inline" size={RadioGroupSize.Small} inline value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
        <RadioButton value="opt3">Option 3</RadioButton>
      </InteractiveRadioGroup>
      <InteractiveRadioGroup name="inline-medium" label="Medium Inline" size={RadioGroupSize.Medium} inline value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
        <RadioButton value="opt3">Option 3</RadioButton>
      </InteractiveRadioGroup>
      <InteractiveRadioGroup name="inline-large" label="Large Inline" size={RadioGroupSize.Large} inline value="opt1">
        <RadioButton value="opt1">Option 1</RadioButton>
        <RadioButton value="opt2">Option 2</RadioButton>
        <RadioButton value="opt3">Option 3</RadioButton>
      </InteractiveRadioGroup>
    </div>
  ),
}
