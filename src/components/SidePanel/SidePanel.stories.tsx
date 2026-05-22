import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SidePanel, SidePanelSize, SidePanelManager } from './index'
import type { SidePanelCloseEvent } from './SidePanel.types'
import { Button, ButtonColor } from '../Button'
import { BaseNotificationBar } from '../NotificationBar'

const meta = {
  title: 'Feedback/SidePanel',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <SidePanelManager>
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Story />
        </div>
      </SidePanelManager>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ */
/*  Helper: SidePanel demo with trigger button                         */
/* ------------------------------------------------------------------ */

interface SidePanelDemoProps {
  size?: SidePanelSize
  headline?: string
  showFooter?: boolean
  showNotification?: boolean
  isMaximizable?: boolean
  showCloseButton?: boolean
  isOutsideClickCloseable?: boolean
  children?: React.ReactNode
}

const SidePanelDemo = ({
  size = SidePanelSize.Stackable,
  headline = 'Panel Title',
  showFooter = true,
  showNotification = false,
  isMaximizable = false,
  showCloseButton = true,
  isOutsideClickCloseable = true,
  children,
}: SidePanelDemoProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClose = async (_event: SidePanelCloseEvent) => {
    setIsVisible(false)
  }

  return (
    <div style={{ padding: 24 }}>
      <Button onClick={() => setIsVisible(true)}>Open Panel</Button>

      <SidePanel
        headline={headline}
        size={size}
        isVisible={isVisible}
        onClose={handleClose}
        isMaximizable={isMaximizable}
        showCloseButton={showCloseButton}
        isOutsideClickCloseable={isOutsideClickCloseable}
        tooltips={{ close: 'Close', maximize: 'Maximize', minimize: 'Minimize' }}
        footer={
          showFooter ? (
            <>
              <Button onClick={() => setIsVisible(false)}>Cancel</Button>
              <Button color={ButtonColor.Primary} onClick={() => setIsVisible(false)}>
                Save
              </Button>
            </>
          ) : undefined
        }
        notificationBar={
          showNotification ? (
            <BaseNotificationBar type="warning">Unsaved changes</BaseNotificationBar>
          ) : undefined
        }
      >
        {children ?? (
          <div style={{ padding: 16 }}>
            <p>Panel content goes here. This is a {size} size panel.</p>
            <p style={{ marginTop: 16 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        )}
      </SidePanel>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => <SidePanelDemo />,
}

export const StackableSize: Story = {
  render: () => <SidePanelDemo size={SidePanelSize.Stackable} headline="Stackable Panel" />,
}

export const FullSize: Story = {
  render: () => <SidePanelDemo size={SidePanelSize.Full} headline="Full Panel" />,
}

export const WrappedSize: Story = {
  render: () => (
    <SidePanelDemo size={SidePanelSize.Wrapped} headline="Wrapped Panel">
      <div style={{ padding: 16, width: 400 }}>
        <p>This panel adjusts to fit its content width.</p>
      </div>
    </SidePanelDemo>
  ),
}

export const Maximizable: Story = {
  render: () => <SidePanelDemo isMaximizable headline="Maximizable Panel" />,
}

export const WithoutCloseButton: Story = {
  render: () => (
    <SidePanelDemo showCloseButton={false} headline="No Close Button">
      <div style={{ padding: 16 }}>
        <p>This panel has no close button. Use the footer Cancel button or click outside to close.</p>
      </div>
    </SidePanelDemo>
  ),
}

export const WithNotification: Story = {
  render: () => <SidePanelDemo showNotification headline="Panel with Notification" />,
}

export const WithoutFooter: Story = {
  render: () => (
    <SidePanelDemo showFooter={false} headline="No Footer">
      <div style={{ padding: 16 }}>
        <p>This panel has no footer actions.</p>
      </div>
    </SidePanelDemo>
  ),
}

export const ScrollableContent: Story = {
  render: () => (
    <SidePanelDemo headline="Scrollable Content">
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ marginBottom: 16 }}>
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </SidePanelDemo>
  ),
}

export const StackedPanels: Story = {
  render: () => {
    const StackedDemo = () => {
      const [panel1Visible, setPanel1Visible] = useState(false)
      const [panel2Visible, setPanel2Visible] = useState(false)

      const handleClose1 = async () => {
        setPanel2Visible(false)
        setPanel1Visible(false)
      }
      const handleClose2 = async () => {
        setPanel2Visible(false)
      }

      return (
        <div style={{ padding: 24 }}>
          <Button onClick={() => setPanel1Visible(true)}>Open First Panel</Button>

          <SidePanel
            headline="First Panel"
            size={SidePanelSize.Stackable}
            isVisible={panel1Visible}
            onClose={handleClose1}
            tooltips={{ close: 'Close' }}
            footer={
              <>
                <Button onClick={() => setPanel1Visible(false)}>Close</Button>
                <Button color={ButtonColor.Primary} onClick={() => setPanel2Visible(true)}>
                  Open Second Panel
                </Button>
              </>
            }
          >
            <div style={{ padding: 16 }}>
              <p>This is the first panel. Click the button below to open a second stacked panel.</p>
            </div>
          </SidePanel>

          <SidePanel
            headline="Second Panel"
            size={SidePanelSize.Stackable}
            isVisible={panel2Visible}
            onClose={handleClose2}
            tooltips={{ close: 'Close' }}
            footer={
              <Button onClick={() => setPanel2Visible(false)}>Close</Button>
            }
          >
            <div style={{ padding: 16 }}>
              <p>This is the second stacked panel.</p>
            </div>
          </SidePanel>
        </div>
      )
    }

    return <StackedDemo />
  },
}
