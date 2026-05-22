import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { BaseTile } from './BaseTile'
import { BaseTileType, BaseTilePreviewIconSize } from './BaseTile.types'
import { Icon } from '../Icon'

const types = [
  BaseTileType.Preview,
  BaseTileType.Selectable,
  BaseTileType.Skeleton,
] as const

const meta = {
  title: 'Tiles/BaseTile',
  component: BaseTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(BaseTileType),
    },
    name: { control: 'text' },
    disabled: { control: 'boolean' },
    isSelected: { control: 'boolean' },
    isCheckboxVisible: { control: 'boolean' },
    isDragging: { control: 'boolean' },
    selectOnClick: { control: 'boolean' },
    previewIconSize: {
      control: 'select',
      options: Object.values(BaseTilePreviewIconSize),
    },
  },
  args: {
    onClick: fn(),
    onChange: fn(),
    disabled: false,
    isSelected: false,
    isCheckboxVisible: false,
    isDragging: false,
    selectOnClick: false,
  },
} satisfies Meta<typeof BaseTile>

export default meta
type Story = StoryObj<typeof BaseTile>

export const Default: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'example-file.png',
    disabled: false,
  },
}

export const AllTypes: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'all-types.png',
    disabled: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      {types.map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <BaseTile
            type={type}
            name={type === BaseTileType.Skeleton ? '' : `${type.toLowerCase()}.png`}
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
    type: BaseTileType.Preview,
    name: 'preview-image.jpg',
    disabled: false,
  },
}

export const Selectable: Story = {
  args: {
    type: BaseTileType.Selectable,
    name: 'selectable-image.png',
    disabled: false,
    isSelected: false,
  },
}

export const SelectableSelected: Story = {
  args: {
    type: BaseTileType.Selectable,
    name: 'selected-image.png',
    disabled: false,
    isSelected: true,
  },
}

export const Skeleton: Story = {
  args: {
    type: BaseTileType.Skeleton,
    name: '',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'disabled-tiles.png',
    disabled: true,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Preview}
          name="disabled-preview.png"
          disabled
          inactiveMessage="This tile is disabled"
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Preview (disabled)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="disabled-selectable.png"
          disabled
          inactiveMessage="Cannot select this item"
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selectable (disabled)</div>
      </div>
    </div>
  ),
}

export const WithActions: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'image-with-actions.png',
    disabled: false,
    actions: [
      { icon: <Icon name="edit" />, onClick: fn(), 'aria-label': 'Edit' },
      { icon: <Icon name="bin" />, onClick: fn(), 'aria-label': 'Delete' },
    ],
  },
}

export const Dragging: Story = {
  args: {
    type: BaseTileType.Selectable,
    name: 'dragging-image.png',
    disabled: false,
    isDragging: true,
  },
}

export const SelectionStates: Story = {
  args: {
    type: BaseTileType.Selectable,
    name: 'selection-states.png',
    disabled: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="unselected.png"
          disabled={false}
          isSelected={false}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Unselected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="selected.png"
          disabled={false}
          isSelected={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selected</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="disabled-selected.png"
          disabled={true}
          isSelected={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Disabled + Selected</div>
      </div>
    </div>
  ),
}

export const ErrorState: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'error-states.png',
    disabled: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Preview}
          name="error-file.png"
          disabled={false}
          errorState={{
            errorMessage: 'File upload failed',
            onErrorClose: fn(),
          }}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Preview with error</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="error-selectable.png"
          disabled={false}
          errorState={{
            errorMessage: 'Invalid file format',
            onErrorClose: fn(),
          }}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Selectable with error</div>
      </div>
    </div>
  ),
}

export const UploadState: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'upload-progress.png',
    disabled: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Preview}
          name="uploading-25.png"
          disabled={false}
          uploadState={{
            uploadProgress: 25,
            onUploadCancel: fn(),
          }}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>25% Progress</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Preview}
          name="uploading-50.png"
          disabled={false}
          uploadState={{
            uploadProgress: 50,
            onUploadCancel: fn(),
          }}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>50% Progress</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Preview}
          name="uploading-75.png"
          disabled={false}
          uploadState={{
            uploadProgress: 75,
            onUploadCancel: fn(),
          }}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>75% Progress</div>
      </div>
    </div>
  ),
}

export const WithDimensions: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'sized-image.png',
    disabled: false,
    dimensions: {
      width: 1920,
      height: 1080,
    },
    size: 2048576,
  },
}

export const WithContentType: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'document.pdf',
    disabled: false,
    contentType: 'PDF',
    size: 1024000,
  },
}

export const WithPreviewIcon: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'preview-icon.txt',
    disabled: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Preview}
          name="custom-icon.txt"
          disabled={false}
          previewIcon="xp-file"
          previewIconSize={BaseTilePreviewIconSize.L}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Size L</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Preview}
          name="large-icon.doc"
          disabled={false}
          previewIcon="xp-file"
          previewIconSize={BaseTilePreviewIconSize.XXL}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Size XXL</div>
      </div>
    </div>
  ),
}

export const MissingPermission: Story = {
  args: {
    type: BaseTileType.Preview,
    name: 'restricted-file.png',
    disabled: false,
    isMissingPermission: true,
  },
}

export const CheckboxVisibility: Story = {
  args: {
    type: BaseTileType.Selectable,
    name: 'checkbox-visibility.png',
    disabled: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="with-checkbox.png"
          disabled={false}
          isCheckboxVisible={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Checkbox Visible</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="no-checkbox.png"
          disabled={false}
          isCheckboxVisible={false}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Checkbox Hidden</div>
      </div>
    </div>
  ),
}

export const SelectOnClickBehavior: Story = {
  args: {
    type: BaseTileType.Selectable,
    name: 'select-on-click.png',
    disabled: false,
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="click-selects.png"
          disabled={false}
          selectOnClick={true}
          isCheckboxVisible={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Click Selects</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <BaseTile
          type={BaseTileType.Selectable}
          name="checkbox-only.png"
          disabled={false}
          selectOnClick={false}
          isCheckboxVisible={true}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Checkbox Only</div>
      </div>
    </div>
  ),
}
