import * as React from 'react';
import { useState, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DraggableProviderWrapper } from './DraggableProviderWrapper'
import { TableRowDraggable } from './TableRowDraggable'

const meta = {
  title: 'Layout/Draggable',
  component: DraggableProviderWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj

interface DemoItem {
  id: string
  label: string
}

const initialItems: DemoItem[] = [
  { id: '1', label: 'First item' },
  { id: '2', label: 'Second item' },
  { id: '3', label: 'Third item' },
  { id: '4', label: 'Fourth item' },
  { id: '5', label: 'Fifth item' },
]

export const Default: Story = {
  render: function DefaultStory() {
    const [items, setItems] = useState(initialItems)

    const handleDragOver = useCallback(
      (dragItemId: string, hoverIndex: number) => {
        setItems((prev) => {
          const dragIndex = prev.findIndex((i) => i.id === dragItemId)
          if (dragIndex === -1 || dragIndex === hoverIndex) return prev
          const next = [...prev]
          const [draggedItem] = next.splice(dragIndex, 1)
          next.splice(hoverIndex, 0, draggedItem)
          return next
        })
      },
      []
    )

    return (
      <DraggableProviderWrapper>
        <div
          style={{
            maxWidth: 400,
            border: '1px solid #e0e0e0',
            borderRadius: 4,
          }}
        >
          {items.map((item, index) => (
            <TableRowDraggable
              key={item.id}
              index={index}
              identifier={item.id}
              onDragOver={handleDragOver}
            >
              {({ dragElement }) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 16px',
                    borderBottom:
                      index < items.length - 1 ? '1px solid #eee' : 'none',
                    background: '#fff',
                  }}
                >
                  {dragElement}
                  <span>{item.label}</span>
                </div>
              )}
            </TableRowDraggable>
          ))}
        </div>
      </DraggableProviderWrapper>
    )
  },
}

export const DragDisabled: Story = {
  render: () => (
    <DraggableProviderWrapper>
      <div
        style={{
          maxWidth: 400,
          border: '1px solid #e0e0e0',
          borderRadius: 4,
        }}
      >
        {initialItems.map((item, index) => (
          <TableRowDraggable
            key={item.id}
            index={index}
            identifier={item.id}
            onDragOver={() => {}}
            isDragAndDropDisabled
          >
            {({ dragElement }) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 16px',
                  borderBottom:
                    index < initialItems.length - 1
                      ? '1px solid #eee'
                      : 'none',
                  background: '#f9f9f9',
                  color: '#999',
                }}
              >
                {dragElement}
                <span>{item.label} (drag disabled)</span>
              </div>
            )}
          </TableRowDraggable>
        ))}
      </div>
    </DraggableProviderWrapper>
  ),
}

export const WithClickHandler: Story = {
  render: function WithClickHandlerStory() {
    const [items, setItems] = useState(initialItems)
    const [lastClicked, setLastClicked] = useState<string | null>(null)

    const handleDragOver = useCallback(
      (dragItemId: string, hoverIndex: number) => {
        setItems((prev) => {
          const dragIndex = prev.findIndex((i) => i.id === dragItemId)
          if (dragIndex === -1 || dragIndex === hoverIndex) return prev
          const next = [...prev]
          const [draggedItem] = next.splice(dragIndex, 1)
          next.splice(hoverIndex, 0, draggedItem)
          return next
        })
      },
      []
    )

    return (
      <DraggableProviderWrapper>
        <div
          style={{
            maxWidth: 400,
            border: '1px solid #e0e0e0',
            borderRadius: 4,
          }}
        >
          {items.map((item, index) => (
            <TableRowDraggable
              key={item.id}
              index={index}
              identifier={item.id}
              onDragOver={handleDragOver}
              onClick={() => setLastClicked(item.id)}
              selected={lastClicked === item.id}
            >
              {({ dragElement }) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 16px',
                    borderBottom:
                      index < items.length - 1 ? '1px solid #eee' : 'none',
                    background:
                      lastClicked === item.id ? '#e3f2fd' : '#fff',
                    cursor: 'pointer',
                  }}
                >
                  {dragElement}
                  <span>{item.label}</span>
                  {lastClicked === item.id && (
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: '#666' }}>
                      selected
                    </span>
                  )}
                </div>
              )}
            </TableRowDraggable>
          ))}
        </div>
        {lastClicked && (
          <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
            Last clicked: Item {lastClicked}
          </p>
        )}
      </DraggableProviderWrapper>
    )
  },
}
