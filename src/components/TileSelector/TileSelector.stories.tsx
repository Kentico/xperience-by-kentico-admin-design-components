import * as React from 'react';
import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { TileSelector } from './TileSelector'
import type { TileSelectorItem } from './TileSelector.types'

const mockItems: TileSelectorItem[] = [
  { identifier: 'page', label: 'Page', icon: 'xp-doc' },
  { identifier: 'article', label: 'Article', icon: 'xp-doc' },
  { identifier: 'product', label: 'Product', icon: 'xp-box' },
  { identifier: 'event', label: 'Event', icon: 'xp-calendar' },
  { identifier: 'faq', label: 'FAQ', icon: 'xp-chat' },
  { identifier: 'download', label: 'Download', icon: 'xp-download' },
  { identifier: 'video', label: 'Video', icon: 'xp-play' },
  { identifier: 'image', label: 'Image Gallery', icon: 'xp-image' },
  { identifier: 'blog', label: 'Blog Post', icon: 'xp-edit' },
  { identifier: 'landing', label: 'Landing Page', icon: 'xp-home' },
]

const defaultTexts = {
  searchPlaceholder: 'Search content types...',
  noSearchResultTitle: 'No results found',
  noSearchResultText: 'Try a different search term.',
  clearButtonLabel: 'Clear search',
}

const meta = {
  title: 'Forms/TileSelector',
  component: TileSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    items: { control: 'object' },
    debounceMs: { control: 'number' },
    noItemsHeading: { control: 'text' },
    noItemsMessage: { control: 'text' },
    value: { table: { disable: true } },
    onItemSelect: { table: { disable: true } },
    emptyStateChildren: { table: { disable: true } },
  },
  args: {
    items: mockItems,
    texts: defaultTexts,
    noItemsHeading: 'No content types',
    noItemsMessage: 'There are no content types available.',
    debounceMs: 250,
    onItemSelect: fn(),
  },
} satisfies Meta<typeof TileSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [selected, setSelected] = useState<TileSelectorItem | undefined>()
    return (
      <div style={{ maxWidth: 600 }}>
        <TileSelector
          {...args}
          value={selected}
          onItemSelect={setSelected}
        />
        {selected && (
          <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
            Selected: <strong>{selected.label}</strong>
          </p>
        )}
      </div>
    )
  },
}

export const WithPreselection: Story = {
  render: function WithPreselectionStory(args) {
    const [selected, setSelected] = useState<TileSelectorItem | undefined>(
      mockItems[2]
    )
    return (
      <div style={{ maxWidth: 600 }}>
        <TileSelector
          {...args}
          value={selected}
          onItemSelect={setSelected}
        />
      </div>
    )
  },
}

export const WithDisabledItems: Story = {
  render: function WithDisabledItemsStory(args) {
    const [selected, setSelected] = useState<TileSelectorItem | undefined>()
    const itemsWithDisabled: TileSelectorItem[] = mockItems.map((item) =>
      item.identifier === 'video' || item.identifier === 'download'
        ? { ...item, disabled: true, tooltip: 'Not available in this context' }
        : item
    )
    return (
      <div style={{ maxWidth: 600 }}>
        <TileSelector
          {...args}
          items={itemsWithDisabled}
          value={selected}
          onItemSelect={setSelected}
        />
      </div>
    )
  },
}

export const EmptyState: Story = {
  args: {
    items: [],
    noItemsHeading: 'No content types available',
    noItemsMessage: 'Create a content type to get started.',
  },
  render: function EmptyStateStory(args) {
    const handleSelect = useCallback(() => {}, [])
    return (
      <div style={{ maxWidth: 600 }}>
        <TileSelector
          {...args}
          value={undefined}
          onItemSelect={handleSelect}
        />
      </div>
    )
  },
}

export const FewItems: Story = {
  render: function FewItemsStory(args) {
    const [selected, setSelected] = useState<TileSelectorItem | undefined>()
    return (
      <div style={{ maxWidth: 600 }}>
        <TileSelector
          {...args}
          items={mockItems.slice(0, 3)}
          value={selected}
          onItemSelect={setSelected}
        />
      </div>
    )
  },
}
