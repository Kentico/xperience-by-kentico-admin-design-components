import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { FilterStatusIndicator, FilterPanel } from './Filters'
import type { FilterStatusItem } from './Filters.types'

/* ------------------------------------------------------------------ */
/*  FilterStatusIndicator                                              */
/* ------------------------------------------------------------------ */

const mockFilterItems: FilterStatusItem[] = [
  { name: 'status', label: 'Status: Active' },
  { name: 'category', label: 'Category: News', tooltip: 'Filtering by News category' },
  { name: 'author', label: 'Author: John Doe' },
]

const meta = {
  title: 'Data Display/FilterStatusIndicator',
  component: FilterStatusIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    filterItems: { control: 'object' },
    onClearAll: { table: { disable: true } },
    onClear: { table: { disable: true } },
    onTagClick: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
  args: {
    filterItems: mockFilterItems,
    onClearAll: fn(),
    onClear: fn(),
    onTagClick: fn(),
    texts: {
      appliedFiltersLabel: 'Applied filters:',
      clearAllButtonLabel: 'Clear all',
    },
  },
} satisfies Meta<typeof FilterStatusIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Interactive: Story = {
  render: function InteractiveStory(args) {
    const [filters, setFilters] = useState<FilterStatusItem[]>(mockFilterItems)

    return (
      <div>
        {filters.length > 0 ? (
          <FilterStatusIndicator
            {...args}
            filterItems={filters}
            onClearAll={() => setFilters([])}
            onClear={(name) =>
              setFilters((f) => f.filter((item) => item.name !== name))
            }
          />
        ) : (
          <p style={{ color: '#666' }}>
            No active filters.{' '}
            <button
              onClick={() => setFilters(mockFilterItems)}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Reset
            </button>
          </p>
        )}
      </div>
    )
  },
}

export const WithActions: Story = {
  args: {
    actions: [
      {
        identifier: 'save',
        label: 'Save filter',
        icon: 'xp-save',
        onClick: fn(),
      },
    ],
  },
}

export const SingleFilter: Story = {
  args: {
    filterItems: [{ name: 'status', label: 'Status: Published' }],
  },
}

/* ------------------------------------------------------------------ */
/*  FilterPanel — separate story section via named export               */
/* ------------------------------------------------------------------ */

export const Panel: Story = {
  render: function PanelStory() {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <div style={{ padding: 24 }}>
        <button
          onClick={() => setIsVisible(true)}
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: 4,
            background: '#fff',
          }}
        >
          Open Filter Panel
        </button>
        <FilterPanel
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
          onApply={() => setIsVisible(false)}
          onClear={() => {}}
          texts={{
            headline: 'Filters',
            clearAllButtonLabel: 'Clear all',
            cancelButtonLabel: 'Cancel',
            applyButtonLabel: 'Apply',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label
                style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}
              >
                Status
              </label>
              <select
                defaultValue="all"
                style={{ width: '100%', padding: 8, borderRadius: 4 }}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label
                style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}
              >
                Category
              </label>
              <select
                defaultValue=""
                style={{ width: '100%', padding: 8, borderRadius: 4 }}
              >
                <option value="">Any</option>
                <option value="news">News</option>
                <option value="blog">Blog</option>
                <option value="events">Events</option>
              </select>
            </div>
            <div>
              <label
                style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}
              >
                Author
              </label>
              <input
                type="text"
                placeholder="Search by author..."
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </FilterPanel>
      </div>
    )
  },
}
