import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { UnsavedChangesWrapper } from './UnsavedChangesWrapper'

const meta = {
  title: 'Feedback/UnsavedChangesWrapper',
  component: UnsavedChangesWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const WithoutChanges: Story = {
  render: function WithoutChangesStory() {
    const [closed, setClosed] = useState(false)

    return (
      <div style={{ padding: 24 }}>
        {closed ? (
          <p>Panel closed without confirmation (no unsaved changes).</p>
        ) : (
          <UnsavedChangesWrapper
            unsavedChanges={false}
            onCloseAction={() => setClosed(true)}
            onConfirmAction={() => setClosed(true)}
            texts={{
              headline: 'Unsaved changes',
              message:
                'You have unsaved changes. Are you sure you want to leave?',
              confirmLabel: 'Discard changes',
              cancelLabel: 'Stay',
            }}
          >
            {(handleClose) => (
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  padding: 16,
                }}
              >
                <p style={{ margin: '0 0 12px' }}>
                  No unsaved changes. Clicking close will immediately close the
                  panel.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    background: '#fff',
                  }}
                >
                  Close Panel
                </button>
              </div>
            )}
          </UnsavedChangesWrapper>
        )}
      </div>
    )
  },
}

export const WithChanges: Story = {
  render: function WithChangesStory() {
    const [closed, setClosed] = useState(false)

    return (
      <div style={{ padding: 24 }}>
        {closed ? (
          <p>Panel closed after confirmation (unsaved changes discarded).</p>
        ) : (
          <UnsavedChangesWrapper
            unsavedChanges={true}
            onCloseAction={() => setClosed(true)}
            onConfirmAction={() => setClosed(true)}
            texts={{
              headline: 'Unsaved changes',
              message:
                'You have unsaved changes. Are you sure you want to leave?',
              confirmLabel: 'Discard changes',
              cancelLabel: 'Stay',
            }}
          >
            {(handleClose) => (
              <div
                style={{
                  border: '1px solid #dc3545',
                  borderRadius: 4,
                  padding: 16,
                }}
              >
                <p style={{ margin: '0 0 12px' }}>
                  There are unsaved changes. Clicking close will show a
                  confirmation dialog first.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    border: '1px solid #dc3545',
                    borderRadius: 4,
                    background: '#fff',
                    color: '#dc3545',
                  }}
                >
                  Close Panel
                </button>
              </div>
            )}
          </UnsavedChangesWrapper>
        )}
      </div>
    )
  },
}

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [inputValue, setInputValue] = useState('')
    const [savedValue, setSavedValue] = useState('')
    const [closed, setClosed] = useState(false)

    const hasChanges = inputValue !== savedValue

    if (closed) {
      return (
        <div style={{ padding: 24 }}>
          <p>
            Panel closed. Saved value: &quot;{savedValue || '(empty)'}&quot;
          </p>
          <button
            onClick={() => setClosed(false)}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fff',
            }}
          >
            Reopen
          </button>
        </div>
      )
    }

    return (
      <div style={{ padding: 24 }}>
        <UnsavedChangesWrapper
          unsavedChanges={hasChanges}
          onCloseAction={() => setClosed(true)}
          onConfirmAction={() => setClosed(true)}
          texts={{
            headline: 'Unsaved changes',
            message:
              'You have unsaved changes. Are you sure you want to leave?',
            confirmLabel: 'Discard changes',
            cancelLabel: 'Stay',
          }}
        >
          {(handleClose) => (
            <div
              style={{
                border: `1px solid ${hasChanges ? '#ffc107' : '#ccc'}`,
                borderRadius: 4,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
                {hasChanges
                  ? 'You have unsaved changes'
                  : 'No unsaved changes'}
              </p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type something to create unsaved changes..."
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setSavedValue(inputValue)}
                  disabled={!hasChanges}
                  style={{
                    padding: '8px 16px',
                    cursor: hasChanges ? 'pointer' : 'default',
                    border: '1px solid #28a745',
                    borderRadius: 4,
                    background: hasChanges ? '#28a745' : '#eee',
                    color: hasChanges ? '#fff' : '#999',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleClose}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    background: '#fff',
                  }}
                >
                  Close Panel
                </button>
              </div>
            </div>
          )}
        </UnsavedChangesWrapper>
      </div>
    )
  },
}
