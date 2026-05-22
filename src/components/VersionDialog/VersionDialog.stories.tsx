import * as React from 'react';
import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VersionDialog } from './VersionDialog'

const meta = {
  title: 'Feedback/VersionDialog',
  component: VersionDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VersionDialog>

export default meta
type Story = StoryObj<typeof VersionDialog>

/* ------------------------------------------------------------------ */
/*  Helper: Interactive dialog wrapper                                 */
/* ------------------------------------------------------------------ */

interface VersionDialogDemoProps {
  productName?: string
  version?: string
}

const VersionDialogDemo = ({ productName, version }: VersionDialogDemoProps) => {
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
        Show Version Info
      </button>
      {isOpen && (
        <VersionDialog
          onClose={onClose}
          productName={productName}
          version={version}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    onClose: () => {},
  },
  render: () => <VersionDialogDemo />,
}

export const CustomProductName: Story = {
  args: {
    onClose: () => {},
  },
  render: () => <VersionDialogDemo productName="My Custom Product" />,
}

export const CustomVersion: Story = {
  args: {
    onClose: () => {},
  },
  render: () => <VersionDialogDemo version="1.2.3" />,
}

export const FullyCustomized: Story = {
  args: {
    onClose: () => {},
  },
  render: () => (
    <VersionDialogDemo
      productName="Enterprise CMS"
      version="25.1.0"
    />
  ),
}
