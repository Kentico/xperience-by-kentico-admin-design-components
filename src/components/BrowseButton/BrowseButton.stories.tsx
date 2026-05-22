import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { BrowseButton } from './BrowseButton'

const meta = {
  title: 'Actions/BrowseButton',
  component: BrowseButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    allowMultipleFiles: { control: 'boolean' },
    accept: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    onUpload: fn(),
    disabled: false,
    allowMultipleFiles: false,
  },
} satisfies Meta<typeof BrowseButton>

export default meta
type Story = StoryObj<typeof BrowseButton>

export const Default: Story = {
  args: {
    label: 'Browse Files',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Browse Files',
    disabled: true,
  },
}

export const ImageFilesOnly: Story = {
  args: {
    label: 'Upload Image',
    accept: 'image/*',
  },
}

export const PDFFilesOnly: Story = {
  args: {
    label: 'Upload PDF',
    accept: '.pdf',
  },
}

export const DocumentFiles: Story = {
  args: {
    label: 'Upload Document',
    accept: '.doc,.docx,.pdf,.txt',
  },
}

export const SingleFileOnly: Story = {
  args: {
    label: 'Select File',
    allowMultipleFiles: false,
  },
}

export const AllVariants: Story = {
  args: {
    label: 'Browse Files',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, color: '#666' }}>Default</span>
        <BrowseButton label="Browse Files" onUpload={fn()} />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, color: '#666' }}>Disabled</span>
        <BrowseButton label="Browse Files" onUpload={fn()} disabled />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, color: '#666' }}>Images Only</span>
        <BrowseButton label="Upload Image" onUpload={fn()} accept="image/*" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, color: '#666' }}>PDF Only</span>
        <BrowseButton label="Upload PDF" onUpload={fn()} accept=".pdf" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ width: 120, fontSize: 12, color: '#666' }}>Single File</span>
        <BrowseButton label="Select File" onUpload={fn()} allowMultipleFiles={false} />
      </div>
    </div>
  ),
}
