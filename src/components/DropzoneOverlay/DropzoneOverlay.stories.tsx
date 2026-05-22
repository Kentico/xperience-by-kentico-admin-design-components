import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { DropzoneOverlay } from './DropzoneOverlay'
import { Icon } from '@/components/Icon'

const meta = {
  title: 'Forms/DropzoneOverlay',
  component: DropzoneOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Drop files here to upload',
    onUpload: fn(),
    onActiveChange: fn(),
    disabled: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title shown in the overlay when files are dragged over',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the dropzone will not respond to drag/drop events',
    },
    onUpload: {
      description: 'Callback when files are dropped',
      action: 'onUpload',
    },
    onActiveChange: {
      description: 'Callback when drag state changes (files enter/leave)',
      action: 'onActiveChange',
    },
    onCurrentTransfer: {
      description: 'Optional callback to validate drag transfer before accepting',
    },
    className: {
      control: 'text',
      description: 'Additional class name for the container',
    },
    overlayClassName: {
      control: 'text',
      description: 'Additional class name for the overlay element',
    },
  },
} satisfies Meta<typeof DropzoneOverlay>

export default meta
type Story = StoryObj<typeof DropzoneOverlay>

/** Placeholder content to display inside the dropzone */
const ContentPlaceholder = () => (
  <div
    style={{
      padding: 40,
      border: '2px dashed #ccc',
      borderRadius: 8,
      textAlign: 'center',
      color: '#666',
      backgroundColor: '#fafafa',
      minWidth: 400,
      minHeight: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    }}
  >
    <Icon name="cloud" size="xl" />
    <div>
      <strong>Drag files here</strong>
      <p style={{ margin: '8px 0 0', fontSize: 14 }}>
        Files will be uploaded when dropped
      </p>
    </div>
  </div>
)

export const Default: Story = {
  args: {
    title: 'Drop files here to upload',
    children: <ContentPlaceholder />,
  },
}

/**
 * Shows what the overlay looks like when files are being dragged over the component.
 * In actual usage, this overlay appears automatically during drag operations.
 */
export const ActiveOverlayPreview: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div
      style={{
        position: 'relative',
        width: 400,
        height: 200,
        border: '2px dashed #ccc',
        borderRadius: 8,
        backgroundColor: '#fafafa',
      }}
    >
      <div
        style={{
          padding: 40,
          textAlign: 'center',
          color: '#666',
        }}
      >
        <Icon name="cloud" size="xl" />
        <p>Content underneath</p>
      </div>
      {/* Simulated overlay for visual demonstration */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(241, 243, 255, 0.7)',
          backdropFilter: 'blur(3px)',
          borderRadius: 8,
          pointerEvents: 'none',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon name="arrow-up" size="xxl" />
          <div
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 12,
            }}
          >
            Drop files here to upload
          </div>
        </div>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    title: 'Drop files here to upload',
    disabled: true,
    children: (
      <div
        style={{
          padding: 40,
          border: '2px dashed #ddd',
          borderRadius: 8,
          textAlign: 'center',
          color: '#999',
          backgroundColor: '#f5f5f5',
          minWidth: 400,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          opacity: 0.6,
        }}
      >
        <Icon name="cloud" size="xl" />
        <div>
          <strong>Upload disabled</strong>
          <p style={{ margin: '8px 0 0', fontSize: 14 }}>
            Drag and drop is currently disabled
          </p>
        </div>
      </div>
    ),
  },
}

export const WithCustomTitle: Story = {
  args: {
    title: 'Release to upload your images',
    children: <ContentPlaceholder />,
  },
}

export const LargeDropArea: Story = {
  args: {
    title: 'Drop your files anywhere in this area',
    children: (
      <div
        style={{
          padding: 60,
          border: '2px dashed #ccc',
          borderRadius: 12,
          textAlign: 'center',
          color: '#666',
          backgroundColor: '#fafafa',
          minWidth: 600,
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <Icon name="folder-opened" size="xxl" />
        <div>
          <h3 style={{ margin: '0 0 8px' }}>Large Drop Area</h3>
          <p style={{ margin: 0, fontSize: 14 }}>
            Drag and drop files here or click to browse
          </p>
        </div>
      </div>
    ),
  },
}
