import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { UploadTile } from './UploadTile'
import { UploadTileSize } from './UploadTile.types'

const sizes: UploadTileSize[] = [UploadTileSize.Full, UploadTileSize.Compact]

const meta = {
  title: 'Forms/UploadTile',
  component: UploadTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    firstLineLabel: 'Drag and drop your files here',
    secondLineLabel: 'or',
    buttonLabel: 'Browse',
    disabled: false,
    onUpload: (files: FileList) => {
      console.log('Files uploaded:', files)
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
      description: 'Size variant of the upload tile',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the upload tile is disabled',
    },
    firstLineLabel: {
      control: 'text',
      description: 'Text displayed in the first line',
    },
    secondLineLabel: {
      control: 'text',
      description: 'Text displayed in the second line',
    },
    buttonLabel: {
      control: 'text',
      description: 'Text displayed on the browse button',
    },
    acceptFiles: {
      control: 'text',
      description: 'File types the tile should accept',
    },
    inactiveMessage: {
      control: 'text',
      description: 'Tooltip message when disabled',
    },
  },
} satisfies Meta<typeof UploadTile>

export default meta
type Story = StoryObj<typeof UploadTile>

export const Default: Story = {
  args: {
    size: UploadTileSize.Full,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {sizes.map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>
            {size}
          </span>
          <UploadTile
            size={size}
            firstLineLabel="Drag and drop your files here"
            secondLineLabel="or"
            buttonLabel="Browse"
            onUpload={(files) => {
              console.log(`${size} - Files uploaded:`, files)
            }}
          />
        </div>
      ))}
    </div>
  ),
}

export const Full: Story = {
  args: {
    size: UploadTileSize.Full,
  },
}

export const Compact: Story = {
  args: {
    size: UploadTileSize.Compact,
  },
}

export const Disabled: Story = {
  args: {
    size: UploadTileSize.Full,
    disabled: true,
    inactiveMessage: 'Uploading is currently disabled',
  },
}

export const WithFileTypeRestriction: Story = {
  args: {
    size: UploadTileSize.Full,
    firstLineLabel: 'Drag and drop images here',
    secondLineLabel: 'Accepts PNG, JPG, and GIF',
    buttonLabel: 'Browse Images',
    acceptFiles: '.png,.jpg,.jpeg,.gif',
  },
}
