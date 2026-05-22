import * as React from 'react';
import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PromptDialog } from './PromptDialog'

const meta = {
  title: 'Feedback/PromptDialog',
  component: PromptDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

const PromptDialogDemo = (
  props: Partial<React.ComponentProps<typeof PromptDialog>> & {
    buttonLabel?: string
  }
) => {
  const [isOpen, setIsOpen] = useState(false)
  const [lastValue, setLastValue] = useState('')

  const handleConfirm = useCallback((value: string) => {
    setLastValue(value)
    setIsOpen(false)
  }, [])

  const handleCancel = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: 4,
          background: '#fff',
        }}
      >
        {props.buttonLabel ?? 'Open Prompt'}
      </button>
      {lastValue && (
        <p style={{ marginTop: 12, color: '#666' }}>
          Last submitted value: <strong>{lastValue}</strong>
        </p>
      )}
      <PromptDialog
        isOpen={isOpen}
        onConfirmation={handleConfirm}
        onCancellation={handleCancel}
        texts={{
          headline: 'Enter Value',
          confirmLabel: 'Submit',
          cancelLabel: 'Cancel',
          inputPlaceholder: 'Type something...',
        }}
        {...props}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <PromptDialogDemo />,
}

export const Required: Story = {
  render: () => (
    <PromptDialogDemo
      required
      texts={{
        headline: 'Enter Required Value',
        confirmLabel: 'Submit',
        cancelLabel: 'Cancel',
        inputPlaceholder: 'This field is required...',
      }}
      message="You must enter a value before submitting."
      buttonLabel="Open Required Prompt"
    />
  ),
}

export const PasswordInput: Story = {
  render: () => (
    <PromptDialogDemo
      inputType="password"
      required
      texts={{
        headline: 'Enter Password',
        confirmLabel: 'Authenticate',
        cancelLabel: 'Cancel',
        inputPlaceholder: 'Enter your password...',
      }}
      message="Please enter your password to continue."
      buttonLabel="Open Password Prompt"
    />
  ),
}

export const WithInitialValue: Story = {
  render: () => (
    <PromptDialogDemo
      initialValue="Default text"
      texts={{
        headline: 'Rename Item',
        confirmLabel: 'Rename',
        cancelLabel: 'Cancel',
        inputPlaceholder: 'Enter new name...',
      }}
      message="Enter a new name for this item."
      buttonLabel="Open with Initial Value"
    />
  ),
}

export const WithMessage: Story = {
  render: () => (
    <PromptDialogDemo
      texts={{
        headline: 'Add Comment',
        confirmLabel: 'Save',
        cancelLabel: 'Discard',
        inputPlaceholder: 'Write your comment...',
      }}
      message="Add a comment to explain the changes you made. This will be visible to other editors."
      buttonLabel="Open with Message"
    />
  ),
}
