import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { FileInput } from './FileInput'
import { Button } from '../Button'

const meta = {
  title: 'Forms/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    allowMultiple: { control: 'boolean' },
    accept: { control: 'text' },
  },
  args: {
    onClose: fn(),
    onFileChange: fn(),
    isOpen: false,
    allowMultiple: false,
  },
} satisfies Meta<typeof FileInput>

export default meta
type Story = StoryObj<typeof FileInput>

/** Interactive demo component for FileInput */
const FileInputDemo = ({
  allowMultiple = false,
  accept,
  label = 'Select File',
}: {
  allowMultiple?: boolean
  accept?: string
  label?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const handleFileChange = (files: FileList) => {
    const fileNames = Array.from(files).map((f) => f.name)
    setSelectedFiles(fileNames)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 280 }}>
      <Button onClick={() => setIsOpen(true)} color="secondary" label={label} />
      <FileInput
        isOpen={isOpen}
        allowMultiple={allowMultiple}
        accept={accept}
        onClose={() => setIsOpen(false)}
        onFileChange={handleFileChange}
       
      />
      {selectedFiles.length > 0 && (
        <div style={{ fontSize: 12, color: '#666' }}>
          <strong>Selected:</strong>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: 20 }}>
            {selectedFiles.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const Default: Story = {
  args: {
    isOpen: false,
    allowMultiple: false,
  },
  render: () => <FileInputDemo />,
}

export const MultipleFiles: Story = {
  args: {
    isOpen: false,
    allowMultiple: true,
  },
  render: () => <FileInputDemo allowMultiple label="Select Multiple Files" />,
}

export const ImagesOnly: Story = {
  args: {
    isOpen: false,
    allowMultiple: false,
    accept: 'image/*',
  },
  render: () => <FileInputDemo accept="image/*" label="Select Image" />,
}

export const DocumentsOnly: Story = {
  args: {
    isOpen: false,
    allowMultiple: false,
    accept: '.pdf,.doc,.docx,.txt',
  },
  render: () => <FileInputDemo accept=".pdf,.doc,.docx,.txt" label="Select Document" />,
}

export const MultipleImages: Story = {
  args: {
    isOpen: false,
    allowMultiple: true,
    accept: 'image/*',
  },
  render: () => <FileInputDemo allowMultiple accept="image/*" label="Select Multiple Images" />,
}

/** Shows all filter variants in a grid */
export const AllFilters: Story = {
  args: {
    isOpen: false,
    allowMultiple: false,
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          Any file (single)
        </span>
        <FileInputDemo label="Select Any File" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          Any file (multiple)
        </span>
        <FileInputDemo allowMultiple label="Select Any Files" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          Images only (image/*)
        </span>
        <FileInputDemo accept="image/*" label="Select Image" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          PDFs only (.pdf)
        </span>
        <FileInputDemo accept=".pdf" label="Select PDF" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          Videos only (video/*)
        </span>
        <FileInputDemo accept="video/*" label="Select Video" />
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
          Code files (.js,.ts,.tsx,.jsx)
        </span>
        <FileInputDemo accept=".js,.ts,.tsx,.jsx" label="Select Code File" />
      </div>
    </div>
  ),
}
