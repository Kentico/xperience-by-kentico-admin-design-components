import * as React from 'react';
import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { TextArea } from './TextArea'
import './TextArea.css'

/** Wrapper that adds useState so each TextArea instance is independently editable */
const InteractiveTextArea = (props: Omit<ComponentProps<typeof TextArea>, 'onValueChange'>) => {
  const [value, setValue] = useState(props.value ?? '')
  return <TextArea {...props} value={value} onValueChange={setValue} />
}

const meta = {
  title: 'Forms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    autoResize: { control: 'boolean' },
    maxRows: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  args: {
    onValueChange: fn(),
    autoResize: false,
    disabled: false,
    readOnly: false,
  },
  render: function InteractiveTextAreaStory(args) {
    const [value, setValue] = useState(args.value ?? '')
    return (
      <TextArea
        {...args}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue)
          args.onValueChange?.(newValue)
        }}
      />
    )
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState(args.value ?? '')
    return (
      <TextArea
        {...args}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue)
          args.onValueChange?.(newValue)
        }}
      />
    )
  },
  args: {
    placeholder: 'Enter your message...',
    name: 'default-textarea',
  },
}

export const WithValue: Story = {
  args: {
    value: 'This is a pre-filled text area with some content that the user can edit or expand upon.',
    name: 'value-textarea',
  },
}

export const Placeholder: Story = {
  args: {
    placeholder: 'Type your comments here...',
    name: 'placeholder-textarea',
  },
}

export const AutoResize: Story = {
  render: function AutoResizeStory(args) {
    const [value, setValue] = useState(args.value ?? '')
    return (
      <TextArea
        {...args}
        value={value}
        onValueChange={(newValue) => {
          setValue(newValue)
          args.onValueChange?.(newValue)
        }}
      />
    )
  },
  args: {
    autoResize: true,
    maxRows: 5,
    placeholder: 'This textarea will grow as you type...',
    name: 'autoresize-textarea',
  },
}

export const AutoResizeWithContent: Story = {
  args: {
    autoResize: true,
    maxRows: 8,
    value: 'This textarea automatically resizes based on content.\n\nTry adding more lines to see it grow!\n\nLine 4\nLine 5\nLine 6',
    name: 'autoresize-content-textarea',
  },
}

export const Invalid: Story = {
  args: {
    value: 'This field has an error',
    className: 'TextArea-invalid',
    name: 'invalid-textarea',
  },
}

export const Disabled: Story = {
  args: {
    value: 'This content cannot be edited',
    disabled: true,
    name: 'disabled-textarea',
  },
}

export const ReadOnly: Story = {
  args: {
    value: 'This content is read-only and cannot be modified by the user.',
    readOnly: true,
    name: 'readonly-textarea',
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>Default</span>
        <InteractiveTextArea placeholder="Default state" value="" name="state-default" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>With value</span>
        <InteractiveTextArea value="Filled textarea" name="state-filled" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>Auto-resize</span>
        <InteractiveTextArea value="Auto-resize enabled" autoResize name="state-autoresize" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>Invalid</span>
        <InteractiveTextArea value="Invalid input" className={'TextArea-invalid'} name="state-invalid" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>Disabled</span>
        <TextArea value="Disabled textarea" disabled onValueChange={() => {}} name="state-disabled" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>Read-only</span>
        <TextArea value="Read-only content" readOnly onValueChange={() => {}} name="state-readonly" />
      </div>
    </div>
  ),
}

/** Demonstrates controlled textarea with auto-resize */
export const Controlled: Story = {
  render: function ControlledTextArea() {
    const [value, setValue] = useState('')

    return (
      <div style={{ width: 320 }}>
        <TextArea
          value={value}
          onValueChange={setValue}
          autoResize
          maxRows={6}
          placeholder="Type something..."
          name="controlled-textarea"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Characters: {value.length} | Lines: {value.split('\n').length}
        </p>
      </div>
    )
  },
}

/** Demonstrates Enter key submit behavior (Enter submits, Shift+Enter adds new line) */
export const WithSubmitHandler: Story = {
  render: function WithSubmit() {
    const [value, setValue] = useState('')
    const [submitted, setSubmitted] = useState<string[]>([])

    const handleSubmit = () => {
      if (value.trim()) {
        setSubmitted((prev) => [...prev, value])
        setValue('')
      }
    }

    return (
      <div style={{ width: 320 }}>
        <TextArea
          value={value}
          onValueChange={setValue}
          onSubmit={handleSubmit}
          autoResize
          maxRows={4}
          placeholder="Press Enter to submit, Shift+Enter for new line"
          name="submit-textarea"
        />
        {submitted.length > 0 && (
          <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            <strong>Submitted:</strong>
            <ul style={{ margin: '4px 0', paddingLeft: 16 }}>
              {submitted.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  },
}
