import * as React from 'react';
import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ConfirmationDialog } from './ConfirmationDialog'
import { Icon } from '@/components/Icon'

const meta = {
  title: 'Feedback/ConfirmationDialog',
  component: ConfirmationDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

const ConfirmationDialogDemo = (
  props: Partial<React.ComponentProps<typeof ConfirmationDialog>> & {
    buttonLabel?: string
  }
) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleConfirm = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleCancel = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setIsVisible(true)}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: 4,
          background: '#fff',
        }}
      >
        {props.buttonLabel ?? 'Open Confirmation'}
      </button>
      {isVisible && (
        <ConfirmationDialog
          headline="Confirm Action"
          onConfirmation={handleConfirm}
          onCancellation={handleCancel}
          texts={{
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            closeTooltip: 'Close',
          }}
          {...props}
        >
          <p style={{ margin: 0 }}>Are you sure you want to proceed?</p>
        </ConfirmationDialog>
      )}
    </div>
  )
}

export const Default: Story = {
  render: () => <ConfirmationDialogDemo />,
}

export const Destructive: Story = {
  render: () => (
    <ConfirmationDialogDemo
      headline="Delete Item"
      isConfirmationButtonDestructive
      texts={{
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        closeTooltip: 'Close',
      }}
      buttonLabel="Delete Item"
    >
      <p style={{ margin: 0 }}>
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
    </ConfirmationDialogDemo>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <ConfirmationDialogDemo
      headline="Delete Permanently"
      isConfirmationButtonDestructive
      confirmationButtonIcon={<Icon name="bin" />}
      texts={{
        confirmLabel: 'Delete',
        cancelLabel: 'Keep',
        closeTooltip: 'Close',
      }}
      buttonLabel="Delete with Icon"
    >
      <p style={{ margin: 0 }}>
        This will permanently remove the item and all associated data.
      </p>
    </ConfirmationDialogDemo>
  ),
}

export const ActionInProgress: Story = {
  render: () => {
    const ActionInProgressDemo = () => {
      const [isVisible, setIsVisible] = useState(false)
      const [isDeleting, setIsDeleting] = useState(false)

      const handleConfirm = () => {
        setIsDeleting(true)
        setTimeout(() => {
          setIsDeleting(false)
          setIsVisible(false)
        }, 2000)
      }

      return (
        <div style={{ padding: 24 }}>
          <button
            onClick={() => setIsVisible(true)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Open with Loading
          </button>
          {isVisible && (
            <ConfirmationDialog
              headline="Processing..."
              actionInProgress={isDeleting}
              onConfirmation={handleConfirm}
              onCancellation={() => setIsVisible(false)}
              texts={{
                confirmLabel: 'Confirm',
                cancelLabel: 'Cancel',
                closeTooltip: 'Close',
              }}
            >
              <p style={{ margin: 0 }}>
                Click confirm to see the loading state. Buttons will be disabled
                for 2 seconds.
              </p>
            </ConfirmationDialog>
          )}
        </div>
      )
    }

    return <ActionInProgressDemo />
  },
}
