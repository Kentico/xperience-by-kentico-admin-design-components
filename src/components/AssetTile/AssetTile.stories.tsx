import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { AssetTile } from './AssetTile'
import { AssetTileType } from './AssetTile.types'
import { AssetTilePreview } from './AssetTilePreview'
import { AssetTileSelectable } from './AssetTileSelectable'
import { AssetTileSkeleton } from './AssetTileSkeleton'
import { Icon } from '../Icon'

const types = [
  AssetTileType.Preview,
  AssetTileType.Selectable,
  AssetTileType.Skeleton,
] as const

const meta = {
  title: 'Tiles/AssetTile',
  component: AssetTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(AssetTileType),
    },
    name: { control: 'text' },
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
} satisfies Meta<typeof AssetTile>

export default meta
type Story = StoryObj<typeof AssetTile>

export const Default: Story = {
  args: {
    type: AssetTileType.Preview,
    name: 'example-image.png',
    disabled: false,
  },
}

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {types.map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <AssetTile
            type={type}
            name={type === AssetTileType.Skeleton ? '' : `${type.toLowerCase()}.png`}
            disabled={false}
          />
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>{type}</div>
        </div>
      ))}
    </div>
  ),
}

export const Preview: Story = {
  args: {
    type: AssetTileType.Preview,
    name: 'preview-image.jpg',
    disabled: false,
  },
}

export const Selectable: Story = {
  args: {
    type: AssetTileType.Selectable,
    name: 'selectable-image.png',
    disabled: false,
    isSelected: false,
  },
}

export const SelectableSelected: Story = {
  args: {
    type: AssetTileType.Selectable,
    name: 'selected-image.png',
    disabled: false,
    isSelected: true,
  },
}

export const SelectableWithCheckbox: Story = {
  args: {
    type: AssetTileType.Selectable,
    name: 'checkbox-image.png',
    disabled: false,
    isSelected: false,
    isCheckboxVisible: true,
  },
}

export const Skeleton: Story = {
  args: {
    type: AssetTileType.Skeleton,
    name: '',
    disabled: false,
  },
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <AssetTile type={AssetTileType.Preview} name="disabled-preview.png" disabled />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Preview (disabled)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTile type={AssetTileType.Selectable} name="disabled-selectable.png" disabled />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selectable (disabled)</div>
      </div>
    </div>
  ),
}

export const WithActions: Story = {
  args: {
    type: AssetTileType.Preview,
    name: 'image-with-actions.png',
    disabled: false,
    actions: [
      { icon: <Icon name="edit" />, onClick: fn() },
      { icon: <Icon name="bin" />, onClick: fn() },
    ],
  },
}

export const Dragging: Story = {
  args: {
    type: AssetTileType.Selectable,
    name: 'dragging-image.png',
    disabled: false,
    isDragging: true,
  },
}

export const PreviewVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <AssetTilePreview name="preview-only.png" disabled={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>AssetTilePreview</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTilePreview name="preview-selected.png" isSelected disabled={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTilePreview name="preview-checkbox.png" isCheckboxVisible disabled={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>With Checkbox</div>
      </div>
    </div>
  ),
}

export const SelectableVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <AssetTileSelectable name="selectable-1.png" disabled={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>AssetTileSelectable</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTileSelectable name="selectable-2.png" isSelected disabled={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTileSelectable name="selectable-3.png" isDragging disabled={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Dragging</div>
      </div>
    </div>
  ),
}

export const SkeletonVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <AssetTileSkeleton />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>AssetTileSkeleton</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTileSkeleton />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Loading...</div>
      </div>
    </div>
  ),
}

export const SelectionStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <AssetTile
          type={AssetTileType.Selectable}
          name="unselected.png"
          disabled={false}
          isSelected={false}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Unselected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTile
          type={AssetTileType.Selectable}
          name="selected.png"
          disabled={false}
          isSelected={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <AssetTile
          type={AssetTileType.Selectable}
          name="disabled-selected.png"
          disabled={true}
          isSelected={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Disabled + Selected</div>
      </div>
    </div>
  ),
}
