import * as React from 'react';
// Fix: Stories were using generic Button/Headline children instead of ApplicationTile.
// Source stories render ApplicationTile with interactive selection state — matched here.
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { ViewMenu } from './ViewMenu'
import { ApplicationTile } from '@/components/ApplicationTile'
import { ApplicationTileState } from '@/components/ApplicationTile/ApplicationTile.types'
import { ShelfStickyPosition } from '@/components/Shelf'

const actions: Array<{ id: string; label: string; iconName: string; disabled?: boolean }> = [
  { id: 'Preview', label: 'Preview', iconName: 'xp-eye' },
  { id: 'Content', label: 'Content', iconName: 'xp-l-list-article' },
  { id: 'PageBuilder', label: 'Page builder', iconName: 'xp-l-header-cols-3-footer', disabled: true },
]

const meta = {
  title: 'Navigation/ViewMenu',
  component: ViewMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    sticky: {
      control: 'select',
      options: [undefined, ...Object.values(ShelfStickyPosition)],
    },
    onPaper: { control: 'boolean' },
    children: { table: { disable: true } },
  },
  args: {
    onPaper: false,
  },
} satisfies Meta<typeof ViewMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [selected, setSelected] = useState(actions[0].id)

    return (
      <ViewMenu {...args}>
        {actions.map((item) => (
          <ApplicationTile
            key={item.id}
            label={item.label}
            iconName={item.iconName}
            onClick={() => setSelected(item.id)}
            state={
              selected === item.id
                ? ApplicationTileState.Activated
                : item.disabled
                  ? ApplicationTileState.Disabled
                  : undefined
            }
          />
        ))}
      </ViewMenu>
    )
  },
}

export const Sticky: Story = {
  render: function StickyStory(args) {
    const [selected, setSelected] = useState(actions[0].id)

    return (
      <div style={{ height: 300, overflow: 'auto' }}>
        <ViewMenu {...args} sticky={ShelfStickyPosition.Left}>
          {actions.map((item) => (
            <ApplicationTile
              key={item.id}
              label={item.label}
              iconName={item.iconName}
              onClick={() => setSelected(item.id)}
              state={
                selected === item.id
                  ? ApplicationTileState.Activated
                  : item.disabled
                    ? ApplicationTileState.Disabled
                    : undefined
              }
            />
          ))}
        </ViewMenu>
        <div style={{ height: 600, padding: 16 }}>
          Scroll to see sticky behavior
        </div>
      </div>
    )
  },
}

export const OnPaper: Story = {
  render: function OnPaperStory(args) {
    const [selected, setSelected] = useState(actions[0].id)

    return (
      <ViewMenu {...args} onPaper>
        {actions.map((item) => (
          <ApplicationTile
            key={item.id}
            label={item.label}
            iconName={item.iconName}
            onClick={() => setSelected(item.id)}
            state={
              selected === item.id
                ? ApplicationTileState.Activated
                : item.disabled
                  ? ApplicationTileState.Disabled
                  : undefined
            }
          />
        ))}
      </ViewMenu>
    )
  },
}
