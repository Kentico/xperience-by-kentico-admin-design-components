import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { ContentItemTile } from './ContentItemTile'
import { ContentItemTileType } from './ContentItemTile.types'
import { ContentItemTilePreview } from './ContentItemTilePreview'
import { ContentItemTileSelectable } from './ContentItemTileSelectable'
import { ContentItemTileSkeleton } from './ContentItemTileSkeleton'
import { Icon } from '../Icon'

const types = [
  ContentItemTileType.Preview,
  ContentItemTileType.Selectable,
  ContentItemTileType.Skeleton,
] as const

const contentTypes = ['Article', 'Page', 'Blog Post', 'Landing Page'] as const

const meta = {
  title: 'Tiles/ContentItemTile',
  component: ContentItemTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(ContentItemTileType),
    },
    name: { control: 'text' },
    contentType: { control: 'text' },
    disabled: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    isCheckboxVisible: { control: 'boolean' },
    isDragging: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    onChange: fn(),
    disabled: false,
    isSelected: false,
    isCheckboxVisible: false,
    isDragging: false,
  },
} satisfies Meta<typeof ContentItemTile>

export default meta
type Story = StoryObj<typeof ContentItemTile>

export const Default: Story = {
  args: {
    type: ContentItemTileType.Preview,
    name: 'Getting Started Guide',
    contentType: 'Article',
    disabled: false,
  },
}

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {types.map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <ContentItemTile
            type={type}
            name={type === ContentItemTileType.Skeleton ? '' : `Example ${type}`}
            contentType={type === ContentItemTileType.Skeleton ? '' : 'Article'}
            disabled={false}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>{type}</div>
        </div>
      ))}
    </div>
  ),
}

export const ContentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {contentTypes.map((contentType) => (
        <div key={contentType} style={{ textAlign: 'center' }}>
          <ContentItemTile
            type={ContentItemTileType.Preview}
            name={`My ${contentType}`}
            contentType={contentType}
            disabled={false}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>{contentType}</div>
        </div>
      ))}
    </div>
  ),
}

export const Preview: Story = {
  args: {
    type: ContentItemTileType.Preview,
    name: 'Welcome to Our Platform',
    contentType: 'Page',
    disabled: false,
  },
}

export const Selectable: Story = {
  args: {
    type: ContentItemTileType.Selectable,
    name: 'Blog Post Title',
    contentType: 'Blog Post',
    disabled: false,
    isSelected: false,
  },
}

export const SelectableSelected: Story = {
  args: {
    type: ContentItemTileType.Selectable,
    name: 'Selected Article',
    contentType: 'Article',
    disabled: false,
    isSelected: true,
  },
}

export const SelectableWithCheckbox: Story = {
  args: {
    type: ContentItemTileType.Selectable,
    name: 'Checkbox Article',
    contentType: 'Article',
    disabled: false,
    isSelected: false,
    isCheckboxVisible: true,
  },
}

export const Skeleton: Story = {
  args: {
    type: ContentItemTileType.Skeleton,
    name: '',
    contentType: '',
    disabled: false,
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTile
          type={ContentItemTileType.Preview}
          name="Disabled Preview"
          contentType="Article"
          disabled
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Preview (disabled)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTile
          type={ContentItemTileType.Selectable}
          name="Disabled Selectable"
          contentType="Page"
          disabled
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selectable (disabled)</div>
      </div>
    </div>
  ),
}

export const WithActions: Story = {
  args: {
    type: ContentItemTileType.Preview,
    name: 'Article with Actions',
    contentType: 'Article',
    disabled: false,
    actions: [
      { icon: <Icon name="edit" />, onClick: fn() },
      { icon: <Icon name="bin" />, onClick: fn() },
    ],
  },
}

export const Dragging: Story = {
  args: {
    type: ContentItemTileType.Selectable,
    name: 'Dragging Item',
    contentType: 'Article',
    disabled: false,
    isDragging: true,
  },
}

export const PreviewVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTilePreview name="Preview Only" contentType="Article" disabled={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>ContentItemTilePreview</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTilePreview
          name="Preview Selected"
          contentType="Page"
          disabled={false}
          isSelected
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTilePreview
          name="Preview Checkbox"
          contentType="Blog Post"
          disabled={false}
          isCheckboxVisible
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>With Checkbox</div>
      </div>
    </div>
  ),
}

export const SelectableVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTileSelectable
          name="Selectable Item"
          contentType="Article"
          disabled={false}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>ContentItemTileSelectable</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTileSelectable
          name="Selected Item"
          contentType="Page"
          disabled={false}
          isSelected
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTileSelectable
          name="Dragging Item"
          contentType="Blog Post"
          disabled={false}
          isDragging
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Dragging</div>
      </div>
    </div>
  ),
}

export const SkeletonVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTileSkeleton />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>ContentItemTileSkeleton</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTileSkeleton />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Loading...</div>
      </div>
    </div>
  ),
}

export const SelectionStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTile
          type={ContentItemTileType.Selectable}
          name="Unselected Article"
          contentType="Article"
          disabled={false}
          isSelected={false}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Unselected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTile
          type={ContentItemTileType.Selectable}
          name="Selected Article"
          contentType="Article"
          disabled={false}
          isSelected={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ContentItemTile
          type={ContentItemTileType.Selectable}
          name="Disabled Selected"
          contentType="Article"
          disabled={true}
          isSelected={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Disabled + Selected</div>
      </div>
    </div>
  ),
}
