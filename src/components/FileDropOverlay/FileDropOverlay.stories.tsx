import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { FileDropOverlay } from './FileDropOverlay'
import { Icon } from '@/components/Icon'

const meta = {
  title: 'Forms/FileDropOverlay',
  component: FileDropOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Drop files here to upload',
    onDrop: fn(),
    onActiveChange: fn(),
    disabled: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title shown in the overlay when files are dragged over',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed to be dropped at once',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the dropzone will not respond to drag/drop events',
    },
    onDrop: {
      description: 'Callback when files are dropped',
      action: 'onDrop',
    },
    onActiveChange: {
      description: 'Callback when drag state changes (files enter/leave)',
      action: 'onActiveChange',
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
} satisfies Meta<typeof FileDropOverlay>

export default meta
type Story = StoryObj<typeof FileDropOverlay>

/** Placeholder content to display inside the dropzone */
const ContentPlaceholder = ({ text }: { text?: string }) => (
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
        {text ?? 'Files will be uploaded when dropped'}
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

export const MaxFilesOne: Story = {
  args: {
    title: 'Drop a single file',
    maxFiles: 1,
    children: <ContentPlaceholder text="Only 1 file allowed at a time" />,
  },
}

export const MaxFilesThree: Story = {
  args: {
    title: 'Drop up to 3 files',
    maxFiles: 3,
    children: <ContentPlaceholder text="Maximum 3 files allowed" />,
  },
}

export const MaxFilesFive: Story = {
  args: {
    title: 'Drop up to 5 files',
    maxFiles: 5,
    children: <ContentPlaceholder text="Maximum 5 files allowed" />,
  },
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
    title: 'Release to upload your documents',
    maxFiles: 10,
    children: <ContentPlaceholder text="Drop up to 10 documents" />,
  },
}

export const AllVariants: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ margin: '0 0 8px', color: '#333' }}>Unlimited files</h4>
        <FileDropOverlay
          title="Drop files here"
          onDrop={fn()}
          onActiveChange={fn()}
        >
          <ContentPlaceholder text="No file limit" />
        </FileDropOverlay>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', color: '#333' }}>Max 1 file</h4>
        <FileDropOverlay
          title="Drop a single file"
          maxFiles={1}
          onDrop={fn()}
          onActiveChange={fn()}
        >
          <ContentPlaceholder text="Single file only" />
        </FileDropOverlay>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px', color: '#333' }}>Max 5 files</h4>
        <FileDropOverlay
          title="Drop up to 5 files"
          maxFiles={5}
          onDrop={fn()}
          onActiveChange={fn()}
        >
          <ContentPlaceholder text="Maximum 5 files" />
        </FileDropOverlay>
      </div>
    </div>
  ),
}
