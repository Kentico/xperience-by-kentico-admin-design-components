import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { StandardMediaDimensionsTemplate } from './StandardMediaDimensionsTemplate'
import type { StandardMediaDimensionsData } from './StandardMediaDimensionsTemplate.types'
import { CropState, MediaTransformationType } from './StandardMediaDimensionsTemplate.types'

const mockCropDimensions: StandardMediaDimensionsData[] = [
  {
    cropId: 1,
    cropName: 'thumbnail',
    cropDisplayName: 'Thumbnail',
    cropWidth: 150,
    cropHeight: 150,
    cropGuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    cropType: MediaTransformationType.SmartCrop,
    state: CropState.Unchanged,
  },
  {
    cropId: 2,
    cropName: 'hero-banner',
    cropDisplayName: 'Hero Banner',
    cropWidth: 1920,
    cropHeight: 600,
    cropGuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    cropType: MediaTransformationType.Scale,
    state: CropState.Unchanged,
  },
  {
    cropId: 3,
    cropName: 'social-share',
    cropDisplayName: 'Social Share',
    cropWidth: 1200,
    cropHeight: 630,
    cropGuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    cropType: MediaTransformationType.SmartCrop,
    state: CropState.Unchanged,
  },
]

const meta = {
  title: 'Templates/StandardMediaDimensionsTemplate',
  component: StandardMediaDimensionsTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StandardMediaDimensionsTemplate
      caption="Standard media dimensions"
      initialCropDimensions={mockCropDimensions}
    />
  ),
}

export const Empty: Story = {
  render: () => (
    <StandardMediaDimensionsTemplate caption="Standard media dimensions" />
  ),
}

export const Disabled: Story = {
  render: () => (
    <StandardMediaDimensionsTemplate
      caption="Standard media dimensions (disabled)"
      disabled
      initialCropDimensions={mockCropDimensions}
    />
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <StandardMediaDimensionsTemplate
      caption="Standard media dimensions (read-only)"
      userHasCreatePermission={false}
      userHasUpdatePermission={false}
      userHasDeletePermission={false}
      initialCropDimensions={mockCropDimensions}
    />
  ),
}
