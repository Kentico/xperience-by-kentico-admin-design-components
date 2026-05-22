import * as React from 'react';
import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { FormDeleteDialog } from './FormDeleteDialog'
import { FormDeleteDialogContent } from './FormDeleteDialogContent'
import type { FormDeleteDialogProps } from './FormDeleteDialog.types'
import type { FormDeleteItem } from './FormDeleteDialogContent.types'
import { CalloutType, CalloutPlacementType } from '@/components/Callout'

const meta = {
  title: 'Forms/FormDeleteDialog',
  component: FormDeleteDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onDelete: fn(),
    onClose: fn(),
    texts: {
      headline: 'Delete form?',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      closeTooltip: 'Close',
    },
  },
} satisfies Meta<typeof FormDeleteDialog>

export default meta
type Story = StoryObj<typeof meta>

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const singleItem: FormDeleteItem = {
  id: 1,
  name: 'Contact Form',
  description: '23 submissions',
}

const multipleItems: FormDeleteItem[] = [
  { id: 1, name: 'Contact Form', description: '23 submissions' },
  { id: 2, name: 'Newsletter Signup', description: '156 submissions' },
  { id: 3, name: 'Feedback Survey', description: '42 submissions' },
]

const defaultTexts: FormDeleteDialogProps['texts'] = {
  headline: 'Delete form?',
  confirmLabel: 'Delete',
  cancelLabel: 'Cancel',
  closeTooltip: 'Close',
}

/* ------------------------------------------------------------------ */
/*  Helper: Interactive dialog wrapper                                 */
/* ------------------------------------------------------------------ */

interface FormDeleteDialogDemoProps {
  texts?: FormDeleteDialogProps['texts']
  inProgress?: boolean
  maxWidth?: number | string
  children?: React.ReactNode
}

const FormDeleteDialogDemo = ({
  texts = defaultTexts,
  inProgress = false,
  maxWidth,
  children,
}: FormDeleteDialogDemoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = useCallback(() => setIsOpen(false), [])
  const onDelete = useCallback(() => {
    alert('Delete action triggered!')
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
        Open Delete Dialog
      </button>
      {isOpen && (
        <FormDeleteDialog
          onClose={onClose}
          onDelete={onDelete}
          texts={texts}
          inProgress={inProgress}
          maxWidth={maxWidth}
        >
          {children}
        </FormDeleteDialog>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <FormDeleteDialogDemo>
      <FormDeleteDialogContent items={singleItem} />
    </FormDeleteDialogDemo>
  ),
}

export const SingleItemDeletion: Story = {
  render: () => (
    <FormDeleteDialogDemo
      texts={{
        headline: 'Delete "Contact Form"?',
        confirmLabel: 'Delete form',
        cancelLabel: 'Keep form',
        closeTooltip: 'Close dialog',
      }}
    >
      <FormDeleteDialogContent items={singleItem} />
    </FormDeleteDialogDemo>
  ),
}

export const MultipleItemsDeletion: Story = {
  render: () => (
    <FormDeleteDialogDemo
      texts={{
        headline: 'Delete 3 forms?',
        confirmLabel: 'Delete all',
        cancelLabel: 'Cancel',
        closeTooltip: 'Close',
      }}
    >
      <FormDeleteDialogContent items={multipleItems} />
    </FormDeleteDialogDemo>
  ),
}

export const WithWarningCallout: Story = {
  render: () => (
    <FormDeleteDialogDemo
      texts={{
        headline: 'Delete form permanently?',
        confirmLabel: 'Delete permanently',
        cancelLabel: 'Cancel',
        closeTooltip: 'Close',
      }}
    >
      <FormDeleteDialogContent
        callout={{
          type: CalloutType.FriendlyWarning,
          placement: CalloutPlacementType.OnPaper,
          headline: 'This action cannot be undone',
          content:
            'Deleting this form will permanently remove all associated submissions and data. This cannot be recovered.',
        }}
        items={singleItem}
      />
    </FormDeleteDialogDemo>
  ),
}

export const WithTipCallout: Story = {
  render: () => (
    <FormDeleteDialogDemo
      texts={{
        headline: 'Delete these forms?',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
        closeTooltip: 'Close',
      }}
    >
      <FormDeleteDialogContent
        callout={{
          type: CalloutType.QuickTip,
          placement: CalloutPlacementType.OnPaper,
          headline: 'Tip',
          subheadline: 'Export data first',
          content:
            'You can export submission data before deleting forms to keep a backup.',
        }}
        items={multipleItems}
      />
    </FormDeleteDialogDemo>
  ),
}

export const InProgress: Story = {
  render: () => (
    <FormDeleteDialogDemo
      inProgress
      texts={{
        headline: 'Deleting form...',
        confirmLabel: 'Deleting...',
        cancelLabel: 'Cancel',
        closeTooltip: 'Close',
      }}
    >
      <FormDeleteDialogContent
        items={singleItem}
        callout={{
          type: CalloutType.FriendlyWarning,
          placement: CalloutPlacementType.OnPaper,
          content: 'Please wait while the form is being deleted.',
        }}
      />
    </FormDeleteDialogDemo>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <FormDeleteDialogDemo
      texts={{
        headline: 'Delete submission data?',
        confirmLabel: 'Delete data',
        cancelLabel: 'Cancel',
        closeTooltip: 'Close',
      }}
    >
      <FormDeleteDialogContent items={[]}>
        <div style={{ padding: '8px 0' }}>
          <p style={{ margin: '0 0 12px 0', fontWeight: 500 }}>
            You are about to delete all submissions for:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Contact Form (23 submissions)</li>
            <li>Newsletter Signup (156 submissions)</li>
          </ul>
          <p style={{ margin: '12px 0 0 0', color: '#666' }}>
            This will free up 2.4 MB of storage.
          </p>
        </div>
      </FormDeleteDialogContent>
    </FormDeleteDialogDemo>
  ),
}

export const CustomMaxWidth: Story = {
  render: () => (
    <FormDeleteDialogDemo
      maxWidth={800}
      texts={{
        headline: 'Delete multiple forms?',
        confirmLabel: 'Delete all',
        cancelLabel: 'Cancel',
        closeTooltip: 'Close',
      }}
    >
      <FormDeleteDialogContent
        callout={{
          type: CalloutType.FriendlyWarning,
          placement: CalloutPlacementType.OnPaper,
          headline: 'Warning: Large operation',
          content:
            'You are about to delete multiple forms with a combined total of over 200 submissions. This may take a moment to complete.',
        }}
        items={multipleItems}
      />
    </FormDeleteDialogDemo>
  ),
}
