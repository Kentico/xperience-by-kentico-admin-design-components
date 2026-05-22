import * as React from 'react';
import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './Dialog'
import type { DialogAction } from './Dialog.types'
import { Icon } from '../Icon'
import { NotificationBarWarning } from '../NotificationBar'

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ */
/*  Helper: Interactive dialog wrapper                                 */
/* ------------------------------------------------------------------ */

const DialogDemo = ({
  headline = 'Dialog Title',
  children,
  confirmAction,
  cancelAction,
  secondaryAction,
  notificationBar,
  isDismissable,
  actionInProgress,
  isFullScreen,
  maxWidth,
  width,
  height,
  minHeight,
  headerContent,
  headerCloseButton,
}: Partial<React.ComponentProps<typeof Dialog>> & { children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = useCallback(() => setIsOpen(false), [])

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
        Open Dialog
      </button>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        headline={headline}
        isDismissable={isDismissable}
        actionInProgress={actionInProgress}
        isFullScreen={isFullScreen}
        maxWidth={maxWidth}
        width={width}
        height={height}
        minHeight={minHeight}
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        secondaryAction={secondaryAction}
        notificationBar={notificationBar}
        headerContent={headerContent}
        headerCloseButton={headerCloseButton}
      >
        {children ?? (
          <p style={{ margin: 0 }}>
            This is the dialog content area. You can place any content here.
          </p>
        )}
      </Dialog>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => <DialogDemo headline="Basic Dialog" />,
}

export const WithActions: Story = {
  render: () => {
    const confirmAction: DialogAction = {
      label: 'Save',
      onClick: () => alert('Saved!'),
    }
    const cancelAction: DialogAction = {
      label: 'Cancel',
    }

    return (
      <DialogDemo
        headline="Save Changes"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
      >
        <p style={{ margin: 0 }}>
          Are you sure you want to save these changes? This will update the
          published content.
        </p>
      </DialogDemo>
    )
  },
}

export const WithAllActions: Story = {
  render: () => {
    const confirmAction: DialogAction = {
      label: 'Confirm',
      icon: <Icon name="check-circle" />,
      onClick: () => alert('Confirmed'),
    }
    const cancelAction: DialogAction = {
      label: 'Cancel',
    }
    const secondaryAction: DialogAction = {
      label: 'Reset',
      icon: <Icon name="rotate-left" />,
      onClick: () => alert('Reset'),
    }

    return (
      <DialogDemo
        headline="Complete Actions"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        secondaryAction={secondaryAction}
      >
        <p style={{ margin: 0 }}>
          This dialog demonstrates all three action positions: secondary (left),
          cancel and confirm (right).
        </p>
      </DialogDemo>
    )
  },
}

export const DestructiveAction: Story = {
  render: () => {
    const confirmAction: DialogAction = {
      label: 'Delete',
      destructive: true,
      icon: <Icon name="bin" />,
    }
    const cancelAction: DialogAction = {
      label: 'Keep',
    }

    return (
      <DialogDemo headline="Delete Item" confirmAction={confirmAction} cancelAction={cancelAction}>
        <p style={{ margin: 0 }}>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
      </DialogDemo>
    )
  },
}

export const ActionInProgress: Story = {
  render: () => {
    const confirmAction: DialogAction = {
      label: 'Saving...',
    }
    const cancelAction: DialogAction = {
      label: 'Cancel',
    }

    return (
      <DialogDemo
        headline="Processing"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        actionInProgress
      >
        <p style={{ margin: 0 }}>
          While actionInProgress is true, buttons are disabled and the confirm
          button shows a spinner.
        </p>
      </DialogDemo>
    )
  },
}

export const NonDismissable: Story = {
  render: () => {
    const confirmAction: DialogAction = {
      label: 'I Understand',
    }

    return (
      <DialogDemo
        headline="Important Notice"
        isDismissable={false}
        confirmAction={confirmAction}
      >
        <p style={{ margin: 0 }}>
          This dialog cannot be dismissed by clicking outside, pressing Escape,
          or using the close button. Only the action button can close it.
        </p>
      </DialogDemo>
    )
  },
}

export const ScrollableContent: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Accept' }
    const cancelAction: DialogAction = { label: 'Decline' }

    return (
      <DialogDemo
        headline="Terms and Conditions"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        maxWidth={500}
        height={400}
      >
        <div>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ margin: '0 0 12px' }}>
              Section {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </DialogDemo>
    )
  },
}

export const FullScreen: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Done' }

    return (
      <DialogDemo
        headline="Full Screen Dialog"
        isFullScreen
        confirmAction={confirmAction}
      >
        <p style={{ margin: 0 }}>
          This dialog takes up the full available space. Useful for complex
          forms or content editors.
        </p>
      </DialogDemo>
    )
  },
}

export const CustomSize: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'OK' }

    return (
      <DialogDemo
        headline="Custom Size"
        width={600}
        height={300}
        confirmAction={confirmAction}
      >
        <p style={{ margin: 0 }}>
          This dialog has explicit width (600px) and height (300px) values.
        </p>
      </DialogDemo>
    )
  },
}

export const WithNotificationBar: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Proceed' }
    const cancelAction: DialogAction = { label: 'Cancel' }

    return (
      <DialogDemo
        headline="Warning Dialog"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        notificationBar={
          <NotificationBarWarning>
            This operation will affect 23 published pages.
          </NotificationBarWarning>
        }
      >
        <p style={{ margin: 0 }}>
          The notification bar appears above the footer to communicate
          important context about the action.
        </p>
      </DialogDemo>
    )
  },
}

export const WithHeaderCloseTooltip: Story = {
  render: () => (
    <DialogDemo
      headline="Keyboard Shortcut"
      headerCloseButton={{
        tooltipText: 'Close dialog',
        shortcuts: 'Esc',
      }}
    >
      <p style={{ margin: 0 }}>
        Hover the close button to see a tooltip with keyboard shortcut.
      </p>
    </DialogDemo>
  ),
}

/* ------------------------------------------------------------------ */
/*  Size Variants                                                      */
/* ------------------------------------------------------------------ */

export const SmallDialog: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'OK' }

    return (
      <DialogDemo
        headline="Small Dialog"
        maxWidth={320}
        confirmAction={confirmAction}
      >
        <p style={{ margin: 0 }}>
          A compact dialog for simple confirmations or brief messages.
        </p>
      </DialogDemo>
    )
  },
}

export const MediumDialog: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Save' }
    const cancelAction: DialogAction = { label: 'Cancel' }

    return (
      <DialogDemo
        headline="Medium Dialog"
        maxWidth={500}
        confirmAction={confirmAction}
        cancelAction={cancelAction}
      >
        <p style={{ margin: 0 }}>
          A medium-sized dialog suitable for forms and moderate content.
          This is the most common dialog size for typical interactions.
        </p>
      </DialogDemo>
    )
  },
}

export const LargeDialog: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Submit' }
    const cancelAction: DialogAction = { label: 'Cancel' }

    return (
      <DialogDemo
        headline="Large Dialog"
        maxWidth={800}
        minHeight={400}
        confirmAction={confirmAction}
        cancelAction={cancelAction}
      >
        <div>
          <p style={{ margin: '0 0 16px' }}>
            A large dialog for complex forms, detailed content, or data tables.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            padding: 16,
            background: '#f5f5f5',
            borderRadius: 4
          }}>
            <div>
              <strong>Section 1</strong>
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                Content for the first column of the dialog.
              </p>
            </div>
            <div>
              <strong>Section 2</strong>
              <p style={{ margin: '8px 0 0', color: '#666' }}>
                Content for the second column of the dialog.
              </p>
            </div>
          </div>
        </div>
      </DialogDemo>
    )
  },
}

export const SizeComparison: Story = {
  render: () => {
    const NestedDialogsDemo = () => {
      const [smallOpen, setSmallOpen] = useState(false)
      const [mediumOpen, setMediumOpen] = useState(false)
      const [largeOpen, setLargeOpen] = useState(false)

      return (
        <div style={{ padding: 24, display: 'flex', gap: 12 }}>
          <button
            onClick={() => setSmallOpen(true)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Small (320px)
          </button>
          <button
            onClick={() => setMediumOpen(true)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Medium (500px)
          </button>
          <button
            onClick={() => setLargeOpen(true)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Large (800px)
          </button>

          <Dialog
            isOpen={smallOpen}
            onClose={() => setSmallOpen(false)}
            headline="Small Dialog"
            maxWidth={320}
            confirmAction={{ label: 'OK' }}
          >
            <p style={{ margin: 0 }}>Compact size for quick confirmations.</p>
          </Dialog>

          <Dialog
            isOpen={mediumOpen}
            onClose={() => setMediumOpen(false)}
            headline="Medium Dialog"
            maxWidth={500}
            confirmAction={{ label: 'Save' }}
            cancelAction={{ label: 'Cancel' }}
          >
            <p style={{ margin: 0 }}>
              Standard size for most use cases including forms and moderate content.
            </p>
          </Dialog>

          <Dialog
            isOpen={largeOpen}
            onClose={() => setLargeOpen(false)}
            headline="Large Dialog"
            maxWidth={800}
            confirmAction={{ label: 'Submit' }}
            cancelAction={{ label: 'Cancel' }}
          >
            <p style={{ margin: 0 }}>
              Extended size for complex content, data tables, or multi-column layouts.
            </p>
          </Dialog>
        </div>
      )
    }

    return <NestedDialogsDemo />
  },
}

/* ------------------------------------------------------------------ */
/*  Nested Dialogs                                                     */
/* ------------------------------------------------------------------ */

export const NestedDialog: Story = {
  render: () => {
    const NestedDialogDemo = () => {
      const [outerOpen, setOuterOpen] = useState(false)
      const [innerOpen, setInnerOpen] = useState(false)

      return (
        <div style={{ padding: 24 }}>
          <button
            onClick={() => setOuterOpen(true)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Open Outer Dialog
          </button>

          <Dialog
            isOpen={outerOpen}
            onClose={() => setOuterOpen(false)}
            headline="Outer Dialog"
            maxWidth={600}
            confirmAction={{ label: 'Done' }}
            cancelAction={{ label: 'Cancel' }}
          >
            <div>
              <p style={{ margin: '0 0 16px' }}>
                This is the outer dialog. Click the button below to open a nested dialog.
              </p>
              <button
                onClick={() => setInnerOpen(true)}
                style={{
                  padding: '8px 16px',
                  cursor: 'pointer',
                  border: '1px solid #007bff',
                  borderRadius: 4,
                  background: '#007bff',
                  color: '#fff',
                }}
              >
                Open Inner Dialog
              </button>
            </div>
          </Dialog>

          <Dialog
            isOpen={innerOpen}
            onClose={() => setInnerOpen(false)}
            headline="Inner Dialog"
            maxWidth={400}
            confirmAction={{
              label: 'Confirm',
              onClick: () => setInnerOpen(false),
            }}
            cancelAction={{ label: 'Back' }}
          >
            <p style={{ margin: 0 }}>
              This is a nested dialog on top of the outer dialog.
              Useful for confirmations or additional input.
            </p>
          </Dialog>
        </div>
      )
    }

    return <NestedDialogDemo />
  },
}

export const NestedConfirmation: Story = {
  render: () => {
    const NestedConfirmationDemo = () => {
      const [formOpen, setFormOpen] = useState(false)
      const [confirmOpen, setConfirmOpen] = useState(false)

      const handleSave = () => {
        setConfirmOpen(true)
      }

      const handleConfirm = () => {
        setConfirmOpen(false)
        setFormOpen(false)
        alert('Form saved!')
      }

      return (
        <div style={{ padding: 24 }}>
          <button
            onClick={() => setFormOpen(true)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Open Form Dialog
          </button>

          <Dialog
            isOpen={formOpen}
            onClose={() => setFormOpen(false)}
            headline="Edit Settings"
            maxWidth={500}
            confirmAction={{
              label: 'Save',
              onClick: handleSave,
            }}
            cancelAction={{ label: 'Cancel' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </Dialog>

          <Dialog
            isOpen={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            headline="Confirm Save"
            maxWidth={360}
            confirmAction={{
              label: 'Yes, Save',
              onClick: handleConfirm,
            }}
            cancelAction={{
              label: 'No, Go Back',
            }}
          >
            <p style={{ margin: 0 }}>
              Are you sure you want to save these changes?
            </p>
          </Dialog>
        </div>
      )
    }

    return <NestedConfirmationDemo />
  },
}

/* ------------------------------------------------------------------ */
/*  Custom Header Variants                                             */
/* ------------------------------------------------------------------ */

export const WithCustomHeader: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Apply' }
    const cancelAction: DialogAction = { label: 'Cancel' }

    return (
      <DialogDemo
        headline="Filter Settings"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        maxWidth={500}
        headerContent={
          <div style={{
            padding: '12px 24px',
            background: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            gap: 8
          }}>
            <button
              style={{
                padding: '4px 12px',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              All
            </button>
            <button
              style={{
                padding: '4px 12px',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Active
            </button>
            <button
              style={{
                padding: '4px 12px',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Archived
            </button>
          </div>
        }
      >
        <p style={{ margin: 0 }}>
          The tabs above are rendered via the headerContent prop, appearing below
          the headline but above the main content area.
        </p>
      </DialogDemo>
    )
  },
}

export const WithHeaderSearch: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Select' }
    const cancelAction: DialogAction = { label: 'Cancel' }

    return (
      <DialogDemo
        headline="Select Items"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        maxWidth={500}
        height={400}
        headerContent={
          <div style={{ padding: '12px 24px' }}>
            <input
              type="search"
              placeholder="Search items..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: 4,
                boxSizing: 'border-box',
              }}
            />
          </div>
        }
      >
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              style={{
                padding: '12px 0',
                borderBottom: i < 9 ? '1px solid #eee' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <input type="checkbox" id={`item-${i}`} />
              <label htmlFor={`item-${i}`}>Item {i + 1}</label>
            </div>
          ))}
        </div>
      </DialogDemo>
    )
  },
}

export const WithHeaderBreadcrumb: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Save' }
    const cancelAction: DialogAction = { label: 'Cancel' }

    return (
      <DialogDemo
        headline="Edit Product"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        maxWidth={600}
        headerContent={
          <div style={{
            padding: '8px 24px',
            color: '#666',
            fontSize: 13,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <span style={{ cursor: 'pointer', color: '#007bff' }}>Products</span>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ cursor: 'pointer', color: '#007bff' }}>Electronics</span>
            <span style={{ margin: '0 8px' }}>/</span>
            <span>Smartphone X</span>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
              Product Name
            </label>
            <input
              type="text"
              defaultValue="Smartphone X"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: 4,
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
              Price
            </label>
            <input
              type="number"
              defaultValue={999}
              style={{
                width: '200px',
                padding: '8px 12px',
                border: '1px solid #ccc',
                borderRadius: 4
              }}
            />
          </div>
        </div>
      </DialogDemo>
    )
  },
}

export const WithHeaderStatus: Story = {
  render: () => {
    const confirmAction: DialogAction = { label: 'Publish' }
    const cancelAction: DialogAction = { label: 'Cancel' }

    return (
      <DialogDemo
        headline="Page Settings"
        confirmAction={confirmAction}
        cancelAction={cancelAction}
        maxWidth={500}
        headerContent={
          <div style={{
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#28a745'
              }} />
              <span style={{ fontSize: 13 }}>Published</span>
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              Last updated: Feb 12, 2024
            </div>
          </div>
        }
      >
        <p style={{ margin: 0 }}>
          The header area displays the page status and last update time,
          giving users immediate context about the content they're editing.
        </p>
      </DialogDemo>
    )
  },
}
