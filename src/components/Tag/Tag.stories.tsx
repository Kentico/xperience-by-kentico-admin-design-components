import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Tag } from './Tag'
import { TagMode } from './Tag.types'
import { Colors } from '@/tokens/colors'

const tagColors = [
  { name: 'Default', color: Colors.BackgroundTagDefault },
  { name: 'Grey', color: Colors.BackgroundTagGrey },
  { name: 'Kentico Orange', color: Colors.BackgroundTagKenticoOrange },
  { name: 'Kontent Turquoise', color: Colors.BackgroundTagKontentTurquoise },
  { name: 'Majorelle Blue', color: Colors.BackgroundTagMajorelleBlue },
  { name: 'Neon Green', color: Colors.BackgroundTagNeonGreen },
  { name: 'Rose', color: Colors.BackgroundTagRose },
  { name: 'Sky Blue', color: Colors.BackgroundTagSkyBlue },
  { name: 'Ultramarine Blue', color: Colors.BackgroundTagUltramarineBlue },
  { name: 'Warm Grey', color: Colors.BackgroundTagWarmGrey },
  { name: 'Xperience Violet', color: Colors.BackgroundTagXperienceViolet },
  { name: 'Yellow', color: Colors.BackgroundTagYellow },
] as const

const modes = [TagMode.Light, TagMode.Dark] as const

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: Object.values(TagMode),
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    removable: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    isDragging: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
    onRemoveClick: fn(),
    disabled: false,
    readOnly: false,
    removable: false,
    fullWidth: false,
    isDragging: false,
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    label: 'Tag',
    mode: TagMode.Light,
  },
}

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.map(({ name, color }) => (
        <Tag key={name} label={name} background={{ color }} />
      ))}
    </div>
  ),
}

export const AllColorsLightMode: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.map(({ name, color }) => (
        <Tag key={name} label={name} background={{ color }} mode={TagMode.Light} />
      ))}
    </div>
  ),
}

export const AllColorsDarkBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.map(({ name, color }) => (
        <Tag key={name} label={name} background={{ color }} mode={TagMode.Dark} />
      ))}
    </div>
  ),
}

export const ModeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {modes.map((mode) => (
        <div key={mode} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ width: 60, fontSize: 12, color: '#666' }}>{mode}</span>
          {tagColors.slice(0, 6).map(({ name, color }) => (
            <Tag key={`${mode}-${name}`} label={name} background={{ color }} mode={mode} />
          ))}
        </div>
      ))}
    </div>
  ),
}

export const Removable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.slice(0, 6).map(({ name, color }) => (
        <Tag
          key={name}
          label={name}
          background={{ color }}
          onRemoveClick={fn()}
        />
      ))}
    </div>
  ),
}

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.slice(0, 6).map(({ name, color }) => (
        <Tag
          key={name}
          label={name}
          background={{ color }}
          onClick={fn()}
        />
      ))}
    </div>
  ),
}

export const ClickableAndRemovable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.slice(0, 6).map(({ name, color }) => (
        <Tag
          key={name}
          label={name}
          background={{ color }}
          onClick={fn()}
          onRemoveClick={fn()}
        />
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.slice(0, 6).map(({ name, color }) => (
        <Tag
          key={name}
          label={name}
          background={{ color }}
          disabled
        />
      ))}
    </div>
  ),
}

export const DisabledRemovable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.slice(0, 6).map(({ name, color }) => (
        <Tag
          key={name}
          label={name}
          background={{ color }}
          onRemoveClick={fn()}
          disabled
        />
      ))}
    </div>
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      {tagColors.slice(0, 6).map(({ name, color }) => (
        <Tag
          key={name}
          label={name}
          background={{ color }}
          readOnly
        />
      ))}
    </div>
  ),
}

export const Dragging: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag label="Normal Tag" background={{ color: Colors.BackgroundTagDefault }} />
      <Tag
        label="Dragging Tag"
        background={{ color: Colors.BackgroundTagKenticoOrange }}
        isDragging
      />
      <Tag label="Another Normal Tag" background={{ color: Colors.BackgroundTagSkyBlue }} />
    </div>
  ),
}

export const DraggableStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Normal state:</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {tagColors.slice(0, 4).map(({ name, color }) => (
            <Tag key={name} label={name} background={{ color }} onRemoveClick={fn()} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Dragging state:</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {tagColors.slice(0, 4).map(({ name, color }) => (
            <Tag key={name} label={name} background={{ color }} isDragging onRemoveClick={fn()} />
          ))}
        </div>
      </div>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Tag
        label="Full Width Tag"
        background={{ color: Colors.BackgroundTagKenticoOrange }}
        fullWidth
      />
    </div>
  ),
}

export const WithTooltip: Story = {
  args: {
    label: 'Hover me',
    tooltipText: 'This is additional tooltip text',
    background: { color: Colors.BackgroundTagMajorelleBlue },
  },
}

export const LongLabel: Story = {
  render: () => (
    <div style={{ width: 200 }}>
      <Tag
        label="This is a very long tag label that should truncate"
        background={{ color: Colors.BackgroundTagDefault }}
      />
    </div>
  ),
}
