import * as React from 'react';
import { useCallback, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SnackbarProvider } from './SnackbarProvider'
import { useSnackbar } from './SnackbarContext'
import { SnackbarItem } from './SnackbarItem'
import { SnackbarVariant, SnackbarPosition, SnackbarSpacing } from './Snackbar.types'
import { Button, ButtonColor } from '../Button'
import { Icon } from '../Icon'

/**
 * The Snackbar system uses a Provider + Context pattern.
 * All stories wrap content in SnackbarProvider so useSnackbar() works.
 */
const meta = {
  title: 'Feedback/Snackbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 400, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* ------------------------------------------------------------------ */
/*  Helper: Trigger Buttons                                            */
/* ------------------------------------------------------------------ */

const SnackbarTrigger = ({
  variant,
  message,
  position,
  autoHide,
  duration,
}: {
  variant: SnackbarVariant
  message: string
  position?: SnackbarPosition
  autoHide?: boolean
  duration?: number
}) => {
  const { addMessage } = useSnackbar()

  const handleClick = useCallback(() => {
    addMessage({ message, variant, position, autoHide, duration })
  }, [addMessage, message, variant, position, autoHide, duration])

  const colorMap: Record<SnackbarVariant, string> = {
    [SnackbarVariant.Success]: ButtonColor.Primary,
    [SnackbarVariant.Error]: ButtonColor.Alert,
    [SnackbarVariant.Warning]: ButtonColor.Secondary,
    [SnackbarVariant.Info]: ButtonColor.Tertiary,
  }

  return (
    <Button onClick={handleClick} color={colorMap[variant] as never} label={`Show ${variant}`} />
  )
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <SnackbarProvider position={SnackbarPosition.TopRight}>
      <SnackbarTrigger
        variant={SnackbarVariant.Success}
        message="Changes saved successfully!"
      />
    </SnackbarProvider>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <SnackbarProvider position={SnackbarPosition.TopRight}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <SnackbarTrigger
          variant={SnackbarVariant.Success}
          message="Item created successfully"
        />
        <SnackbarTrigger
          variant={SnackbarVariant.Info}
          message="Your session will expire in 5 minutes"
        />
        <SnackbarTrigger
          variant={SnackbarVariant.Warning}
          message="This action cannot be undone"
        />
        <SnackbarTrigger
          variant={SnackbarVariant.Error}
          message="Failed to save changes. Please try again."
        />
      </div>
    </SnackbarProvider>
  ),
}

export const PositionTopLeft: Story = {
  name: 'Position: Top Left',
  render: () => (
    <SnackbarProvider position={SnackbarPosition.TopLeft}>
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Top left notification"
        position={SnackbarPosition.TopLeft}
      />
    </SnackbarProvider>
  ),
}

export const PositionTopCenter: Story = {
  name: 'Position: Top Center',
  render: () => (
    <SnackbarProvider position={SnackbarPosition.Top}>
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Top center notification"
        position={SnackbarPosition.Top}
      />
    </SnackbarProvider>
  ),
}

export const PositionBottomRight: Story = {
  name: 'Position: Bottom Right',
  render: () => (
    <SnackbarProvider position={SnackbarPosition.BottomRight}>
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Bottom right notification"
        position={SnackbarPosition.BottomRight}
      />
    </SnackbarProvider>
  ),
}

export const PositionBottomLeft: Story = {
  name: 'Position: Bottom Left',
  render: () => (
    <SnackbarProvider position={SnackbarPosition.BottomLeft}>
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Bottom left notification"
        position={SnackbarPosition.BottomLeft}
      />
    </SnackbarProvider>
  ),
}

export const PositionBottomCenter: Story = {
  name: 'Position: Bottom Center',
  render: () => (
    <SnackbarProvider position={SnackbarPosition.Bottom}>
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Bottom center notification"
        position={SnackbarPosition.Bottom}
      />
    </SnackbarProvider>
  ),
}

export const MultipleMessages: Story = {
  render: () => {
    const QueueDemo = () => {
      const { addMessage } = useSnackbar()

      const showAll = useCallback(() => {
        addMessage({
          message: 'First: Item saved',
          variant: SnackbarVariant.Success,
        })
        setTimeout(() => {
          addMessage({
            message: 'Second: Notification sent',
            variant: SnackbarVariant.Info,
          })
        }, 300)
        setTimeout(() => {
          addMessage({
            message: 'Third: Review required',
            variant: SnackbarVariant.Warning,
          })
        }, 600)
      }, [addMessage])

      return <Button onClick={showAll} label="Show queue (3 messages)" />
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <QueueDemo />
      </SnackbarProvider>
    )
  },
}

export const Persistent: Story = {
  render: () => (
    <SnackbarProvider position={SnackbarPosition.TopRight}>
      <div style={{ display: 'flex', gap: 12 }}>
        <SnackbarTrigger
          variant={SnackbarVariant.Error}
          message="Errors persist until manually dismissed"
          autoHide={false}
        />
        <SnackbarTrigger
          variant={SnackbarVariant.Warning}
          message="Warnings also persist by default"
          autoHide={false}
        />
      </div>
    </SnackbarProvider>
  ),
}

export const CustomDuration: Story = {
  render: () => (
    <SnackbarProvider position={SnackbarPosition.TopRight}>
      <div style={{ display: 'flex', gap: 12 }}>
        <SnackbarTrigger
          variant={SnackbarVariant.Success}
          message="Quick (1s)"
          duration={1000}
        />
        <SnackbarTrigger
          variant={SnackbarVariant.Info}
          message="Default (4s)"
          duration={4000}
        />
        <SnackbarTrigger
          variant={SnackbarVariant.Success}
          message="Long (10s)"
          duration={10000}
        />
      </div>
    </SnackbarProvider>
  ),
}

/* ------------------------------------------------------------------ */
/*  SnackbarItem Direct Usage                                          */
/* ------------------------------------------------------------------ */

export const SnackbarItemDirect: Story = {
  name: 'SnackbarItem (Direct)',
  render: () => (
    <SnackbarProvider position={SnackbarPosition.TopRight}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
          The SnackbarItem component can be used directly for static displays:
        </p>
        <div style={{ position: 'relative' }}>
          <SnackbarItem
            id="static-success"
            message="This is a success message"
            variant={SnackbarVariant.Success}
            autoHide={false}
            onClose={() => {}}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <SnackbarItem
            id="static-error"
            message="This is an error message"
            variant={SnackbarVariant.Error}
            autoHide={false}
            onClose={() => {}}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <SnackbarItem
            id="static-warning"
            message="This is a warning message"
            variant={SnackbarVariant.Warning}
            autoHide={false}
            onClose={() => {}}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <SnackbarItem
            id="static-info"
            message="This is an info message"
            variant={SnackbarVariant.Info}
            autoHide={false}
            onClose={() => {}}
          />
        </div>
      </div>
    </SnackbarProvider>
  ),
}

/* ------------------------------------------------------------------ */
/*  HTML Message Content                                               */
/* ------------------------------------------------------------------ */

export const HtmlMessage: Story = {
  name: 'HTML Message',
  render: () => {
    const HtmlDemo = () => {
      const { addMessage } = useSnackbar()

      const showHtml = useCallback(() => {
        addMessage({
          message: '<strong>Bold text</strong> with <em>italic</em> and <u>underline</u>',
          variant: SnackbarVariant.Info,
          messageAsHtml: true,
        })
      }, [addMessage])

      const showLink = useCallback(() => {
        addMessage({
          message: 'Click <a href="#" style="color: inherit; text-decoration: underline;">this link</a> for more info',
          variant: SnackbarVariant.Success,
          messageAsHtml: true,
        })
      }, [addMessage])

      const showList = useCallback(() => {
        addMessage({
          message: 'Multiple items:<br/>• Item 1<br/>• Item 2<br/>• Item 3',
          variant: SnackbarVariant.Warning,
          messageAsHtml: true,
          autoHide: false,
        })
      }, [addMessage])

      return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button onClick={showHtml} color={ButtonColor.Secondary} label="Formatted Text" />
          <Button onClick={showLink} color={ButtonColor.Primary} label="With Link" />
          <Button onClick={showList} color={ButtonColor.Tertiary} label="With List" />
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <HtmlDemo />
      </SnackbarProvider>
    )
  },
}

/* ------------------------------------------------------------------ */
/*  ReactNode Message Content                                          */
/* ------------------------------------------------------------------ */

export const ReactNodeMessage: Story = {
  name: 'ReactNode Message',
  render: () => {
    const ReactNodeDemo = () => {
      const { addMessage } = useSnackbar()

      const showWithIcon = useCallback(() => {
        addMessage({
          message: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="xp-star-full" />
              <span>Favorited successfully!</span>
            </span>
          ),
          variant: SnackbarVariant.Success,
        })
      }, [addMessage])

      const showWithButton = useCallback(() => {
        addMessage({
          message: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>Item moved to trash.</span>
              <button
                style={{
                  background: 'transparent',
                  border: '1px solid currentColor',
                  borderRadius: 4,
                  padding: '2px 8px',
                  cursor: 'pointer',
                  color: 'inherit',
                  fontSize: 12,
                }}
                onClick={() => alert('Undo clicked!')}
              >
                Undo
              </button>
            </span>
          ),
          variant: SnackbarVariant.Warning,
          autoHide: false,
        })
      }, [addMessage])

      const showMultiLine = useCallback(() => {
        addMessage({
          message: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <strong>Upload Complete</strong>
              <span style={{ fontSize: 13, opacity: 0.9 }}>3 files uploaded to Documents folder</span>
            </div>
          ),
          variant: SnackbarVariant.Success,
        })
      }, [addMessage])

      return (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button onClick={showWithIcon} color={ButtonColor.Primary} label="With Icon" />
          <Button onClick={showWithButton} color={ButtonColor.Secondary} label="With Action Button" />
          <Button onClick={showMultiLine} color={ButtonColor.Tertiary} label="Multi-line" />
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <ReactNodeDemo />
      </SnackbarProvider>
    )
  },
}

/* ------------------------------------------------------------------ */
/*  Spacing Variants                                                   */
/* ------------------------------------------------------------------ */

export const SpacingMedium: Story = {
  name: 'Spacing: Medium (Default)',
  render: () => (
    <SnackbarProvider
      position={SnackbarPosition.TopRight}
      verticalSpacing={SnackbarSpacing.M}
      horizontalSpacing={SnackbarSpacing.M}
    >
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Medium spacing (default) - 16px from edges"
      />
    </SnackbarProvider>
  ),
}

export const SpacingLarge: Story = {
  name: 'Spacing: Large',
  render: () => (
    <SnackbarProvider
      position={SnackbarPosition.TopRight}
      verticalSpacing={SnackbarSpacing.L}
      horizontalSpacing={SnackbarSpacing.L}
    >
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Large spacing - 24px from edges"
      />
    </SnackbarProvider>
  ),
}

export const SpacingExtraLarge: Story = {
  name: 'Spacing: Extra Large',
  render: () => (
    <SnackbarProvider
      position={SnackbarPosition.TopRight}
      verticalSpacing={SnackbarSpacing.XL}
      horizontalSpacing={SnackbarSpacing.XL}
    >
      <SnackbarTrigger
        variant={SnackbarVariant.Info}
        message="Extra large spacing - 32px from edges"
      />
    </SnackbarProvider>
  ),
}

/* ------------------------------------------------------------------ */
/*  Context Methods                                                    */
/* ------------------------------------------------------------------ */

export const WithOnCloseCallback: Story = {
  name: 'With onClose Callback',
  render: () => {
    const CallbackDemo = () => {
      const { addMessage } = useSnackbar()
      const [log, setLog] = useState<string[]>([])

      const showWithCallback = useCallback(() => {
        const id = `msg-${Date.now()}`
        addMessage({
          id,
          message: 'Click X to dismiss (check log below)',
          variant: SnackbarVariant.Warning,
          autoHide: false,
          onClose: (closedId) => {
            setLog((prev) => [...prev, `Closed: ${closedId} at ${new Date().toLocaleTimeString()}`])
          },
        })
      }, [addMessage])

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Button onClick={showWithCallback} color={ButtonColor.Secondary} label="Show Snackbar with Callback" />
          {log.length > 0 && (
            <div style={{
              padding: 12,
              background: '#f5f5f5',
              borderRadius: 4,
              fontFamily: 'monospace',
              fontSize: 13
            }}>
              <strong>Close Log:</strong>
              {log.map((entry, i) => (
                <div key={i}>{entry}</div>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <CallbackDemo />
      </SnackbarProvider>
    )
  },
}

export const ClearAllMessages: Story = {
  name: 'Clear All Messages',
  render: () => {
    const ClearDemo = () => {
      const { addMessage, clearMessages } = useSnackbar()

      const showMultiple = useCallback(() => {
        addMessage({ message: 'Message 1', variant: SnackbarVariant.Success, autoHide: false })
        setTimeout(() => {
          addMessage({ message: 'Message 2', variant: SnackbarVariant.Info, autoHide: false })
        }, 100)
        setTimeout(() => {
          addMessage({ message: 'Message 3', variant: SnackbarVariant.Warning, autoHide: false })
        }, 200)
      }, [addMessage])

      return (
        <div style={{ display: 'flex', gap: 12 }}>
          <Button onClick={showMultiple} color={ButtonColor.Primary} label="Show 3 Messages" />
          <Button onClick={clearMessages} color={ButtonColor.Alert} label="Clear All" />
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <ClearDemo />
      </SnackbarProvider>
    )
  },
}

export const RemoveSpecificMessage: Story = {
  name: 'Remove Specific Message',
  render: () => {
    const RemoveDemo = () => {
      const { addMessage, removeMessage, messages } = useSnackbar()
      const [ids, setIds] = useState<(string | number)[]>([])

      const showMessage = useCallback(() => {
        const id = `custom-${Date.now()}`
        addMessage({
          id,
          message: `Message ID: ${id.slice(-6)}`,
          variant: SnackbarVariant.Info,
          autoHide: false,
        })
        setIds((prev) => [...prev, id])
      }, [addMessage])

      const removeFirst = useCallback(() => {
        if (ids.length > 0) {
          removeMessage(ids[0])
          setIds((prev) => prev.slice(1))
        }
      }, [ids, removeMessage])

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button onClick={showMessage} color={ButtonColor.Primary} label="Add Message" />
            <Button
              onClick={removeFirst}
              color={ButtonColor.Secondary}
              disabled={ids.length === 0}
              label="Remove First (programmatic)"
            />
          </div>
          <div style={{ fontSize: 13, color: '#666' }}>
            Active messages: {messages.length}
          </div>
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <RemoveDemo />
      </SnackbarProvider>
    )
  },
}

/* ------------------------------------------------------------------ */
/*  Edge Cases                                                         */
/* ------------------------------------------------------------------ */

export const LongMessage: Story = {
  name: 'Long Message',
  render: () => (
    <SnackbarProvider position={SnackbarPosition.TopRight}>
      <SnackbarTrigger
        variant={SnackbarVariant.Warning}
        message="This is an extremely long notification message that demonstrates how the snackbar component handles text that exceeds the typical length. The component should wrap the text appropriately and maintain readability."
        autoHide={false}
      />
    </SnackbarProvider>
  ),
}

export const RapidFire: Story = {
  name: 'Rapid Fire Messages',
  render: () => {
    const RapidDemo = () => {
      const { addMessage, clearMessages } = useSnackbar()

      const fireRapid = useCallback(() => {
        const variants = [
          SnackbarVariant.Success,
          SnackbarVariant.Info,
          SnackbarVariant.Warning,
          SnackbarVariant.Error,
        ]

        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            addMessage({
              message: `Rapid message #${i + 1}`,
              variant: variants[i % variants.length],
              duration: 3000,
            })
          }, i * 100)
        }
      }, [addMessage])

      return (
        <div style={{ display: 'flex', gap: 12 }}>
          <Button onClick={fireRapid} color={ButtonColor.Primary} label="Fire 8 Messages" />
          <Button onClick={clearMessages} color={ButtonColor.Secondary} label="Clear All" />
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <RapidDemo />
      </SnackbarProvider>
    )
  },
}

export const CustomId: Story = {
  name: 'Custom Message ID',
  render: () => {
    const CustomIdDemo = () => {
      const { addMessage, removeMessage } = useSnackbar()

      const showWithId = useCallback(() => {
        addMessage({
          id: 'my-custom-id-123',
          message: 'This message has a custom ID: "my-custom-id-123"',
          variant: SnackbarVariant.Info,
          autoHide: false,
        })
      }, [addMessage])

      const removeById = useCallback(() => {
        removeMessage('my-custom-id-123')
      }, [removeMessage])

      return (
        <div style={{ display: 'flex', gap: 12 }}>
          <Button onClick={showWithId} color={ButtonColor.Primary} label="Show (ID: my-custom-id-123)" />
          <Button onClick={removeById} color={ButtonColor.Secondary} label="Remove by ID" />
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <CustomIdDemo />
      </SnackbarProvider>
    )
  },
}

/* ------------------------------------------------------------------ */
/*  All Positions Overview                                             */
/* ------------------------------------------------------------------ */

export const AllPositionsOverview: Story = {
  name: 'All Positions Overview',
  render: () => {
    const PositionsDemo = () => {
      const positions = [
        { position: SnackbarPosition.TopLeft, label: 'Top Left' },
        { position: SnackbarPosition.Top, label: 'Top Center' },
        { position: SnackbarPosition.TopRight, label: 'Top Right' },
        { position: SnackbarPosition.BottomLeft, label: 'Bottom Left' },
        { position: SnackbarPosition.Bottom, label: 'Bottom Center' },
        { position: SnackbarPosition.BottomRight, label: 'Bottom Right' },
      ]

      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          maxWidth: 600
        }}>
          {positions.map(({ position, label }) => (
            <div key={position} style={{
              padding: 12,
              border: '1px solid #e0e0e0',
              borderRadius: 4,
              textAlign: 'center',
              background: '#fafafa'
            }}>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>{label}</div>
              <code style={{ fontSize: 11, color: '#666' }}>{position}</code>
            </div>
          ))}
        </div>
      )
    }

    return (
      <SnackbarProvider position={SnackbarPosition.TopRight}>
        <div>
          <p style={{ margin: '0 0 16px', color: '#666' }}>
            The SnackbarPosition constant provides 6 positions. See individual position stories for demos.
          </p>
          <PositionsDemo />
        </div>
      </SnackbarProvider>
    )
  },
}
