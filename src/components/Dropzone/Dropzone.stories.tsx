import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Dropzone } from './Dropzone'
import { Icon } from '../Icon'

const meta = {
  title: 'Forms/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    onUpload: fn(),
    onActiveChange: fn(),
    disabled: false,
  },
} satisfies Meta<typeof Dropzone>

export default meta
type Story = StoryObj<typeof Dropzone>

/** Base styles for the dropzone container */
const baseDropzoneStyle = {
  minWidth: 320,
  minHeight: 200,
  border: '2px dashed #ccc',
  borderRadius: 8,
  padding: 24,
  textAlign: 'center' as const,
  transition: 'all 0.2s ease',
}

/** Styles when dropzone is in active (drag over) state */
const activeDropzoneStyle = {
  ...baseDropzoneStyle,
  borderColor: '#0066cc',
  backgroundColor: 'rgba(0, 102, 204, 0.05)',
}

/** Styles when dropzone is disabled */
const disabledDropzoneStyle = {
  ...baseDropzoneStyle,
  borderColor: '#e0e0e0',
  backgroundColor: '#f5f5f5',
  cursor: 'not-allowed',
}

/** Simple dropzone content component */
const DropzoneContent = ({
  isActive = false,
  disabled = false,
}: {
  isActive?: boolean
  disabled?: boolean
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <span style={{ color: disabled ? '#999' : isActive ? '#0066cc' : '#666' }}>
      <Icon name="cloud-upload" size="xxl" />
    </span>
    <div style={{ color: disabled ? '#999' : '#333' }}>
      {disabled ? (
        <span>Upload disabled</span>
      ) : isActive ? (
        <span style={{ color: '#0066cc', fontWeight: 500 }}>Drop files here</span>
      ) : (
        <span>Drag and drop files here</span>
      )}
    </div>
    <span style={{ fontSize: 12, color: '#999' }}>
      {!disabled && 'or click to browse'}
    </span>
  </div>
)

export const Default: Story = {
  args: {
    disabled: false,
    children: (
      <div style={baseDropzoneStyle}>
        <DropzoneContent />
      </div>
    ),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <div style={disabledDropzoneStyle}>
        <DropzoneContent disabled />
      </div>
    ),
  },
}

/** Interactive demo showing drag states */
const InteractiveDropzoneDemo = ({ disabled = false }: { disabled?: boolean }) => {
  const [isActive, setIsActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleUpload = (files: FileList) => {
    const fileNames = Array.from(files).map((f) => f.name)
    setUploadedFiles((prev) => [...prev, ...fileNames])
  }

  const currentStyle = disabled
    ? disabledDropzoneStyle
    : isActive
      ? activeDropzoneStyle
      : baseDropzoneStyle

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Dropzone
        onUpload={handleUpload}
        onActiveChange={setIsActive}
        disabled={disabled}
       
      >
        <div style={currentStyle}>
          <DropzoneContent isActive={isActive} disabled={disabled} />
        </div>
      </Dropzone>
      <div style={{ fontSize: 12, color: '#666' }}>
        <strong>Drag State:</strong> {isActive ? 'Active (dragging over)' : 'Inactive'}
      </div>
      {uploadedFiles.length > 0 && (
        <div style={{ fontSize: 12, color: '#666' }}>
          <strong>Uploaded Files:</strong>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: 20 }}>
            {uploadedFiles.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** Demonstrates interactive drag and drop behavior */
export const Interactive: Story = {
  args: {
    disabled: false,
    children: null,
  },
  render: () => <InteractiveDropzoneDemo />,
}

/** Shows both enabled and disabled states side by side */
export const AllStates: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          Enabled
        </span>
        <InteractiveDropzoneDemo />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          Disabled
        </span>
        <InteractiveDropzoneDemo disabled />
      </div>
    </div>
  ),
}

/** Demo showing visual feedback during active drag state */
export const DragStateDemo: Story = {
  args: {
    children: null,
  },
  render: function DragStateDemoComponent() {
    const [isActive, setIsActive] = useState(false)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
          Drag a file over the dropzone to see the active state visual feedback.
        </p>
        <Dropzone
          onUpload={() => {}}
          onActiveChange={setIsActive}
         
        >
          <div style={isActive ? activeDropzoneStyle : baseDropzoneStyle}>
            <DropzoneContent isActive={isActive} />
          </div>
        </Dropzone>
        <div
          style={{
            padding: 8,
            borderRadius: 4,
            backgroundColor: isActive ? '#e3f2fd' : '#f5f5f5',
            fontSize: 12,
            textAlign: 'center',
            transition: 'background-color 0.2s ease',
          }}
        >
          Current state:{' '}
          <strong style={{ color: isActive ? '#0066cc' : '#333' }}>
            {isActive ? 'ACTIVE (drag over)' : 'INACTIVE'}
          </strong>
        </div>
      </div>
    )
  },
}

/** Demo with custom transfer validation */
export const WithValidation: Story = {
  args: {
    children: null,
  },
  render: function ValidationDemo() {
    const [isActive, setIsActive] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const handleCurrentTransfer = (dataTransfer: DataTransfer): boolean => {
      // Only accept image files
      const items = dataTransfer.items
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (!items[i].type.startsWith('image/')) {
            return false
          }
        }
      }
      return true
    }

    const handleUpload = (files: FileList) => {
      const fileNames = Array.from(files).map((f) => f.name)
      setMessage(`Uploaded: ${fileNames.join(', ')}`)
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
          This dropzone only accepts image files. Try dragging different file types.
        </p>
        <Dropzone
          onUpload={handleUpload}
          onActiveChange={setIsActive}
          onCurrentTransfer={handleCurrentTransfer}
         
        >
          <div style={isActive ? activeDropzoneStyle : baseDropzoneStyle}>
            <div
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
            >
              <span style={{ color: isActive ? '#0066cc' : '#666' }}>
                <Icon name="image" size="xxl" />
              </span>
              <div style={{ color: '#333' }}>
                {isActive ? (
                  <span style={{ color: '#0066cc', fontWeight: 500 }}>Drop images here</span>
                ) : (
                  <span>Drop images here (images only)</span>
                )}
              </div>
              <span style={{ fontSize: 12, color: '#999' }}>
                Other file types will be rejected
              </span>
            </div>
          </div>
        </Dropzone>
        {message && (
          <div
            style={{
              padding: 8,
              borderRadius: 4,
              backgroundColor: '#e8f5e9',
              fontSize: 12,
              color: '#2e7d32',
            }}
          >
            {message}
          </div>
        )}
      </div>
    )
  },
}
