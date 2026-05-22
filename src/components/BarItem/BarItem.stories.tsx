import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BarItem, BarItemDraggable, BarItemGroup, BarItemHeaderColumnAlign } from './index'
import type { BarItemHeaderColumn, LeadingButtonProps, DropResult } from './BarItem.types'

const meta = {
  title: 'Data Display/BarItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj

/* ------------------------------------------------------------------ */
/*  Sample data                                                        */
/* ------------------------------------------------------------------ */

const sampleColumns: BarItemHeaderColumn[] = [
  { content: 'Workflow Step', width: 200 },
  { content: 'Status: Active', align: BarItemHeaderColumnAlign.Right },
]

const sampleButtons: LeadingButtonProps[] = [
  { label: 'Edit', icon: 'edit', tooltip: 'Edit item' },
  { label: 'Duplicate', icon: 'doc-copy', tooltip: 'Duplicate item' },
  { label: 'Delete', icon: 'bin', destructive: true, tooltip: 'Delete item' },
]

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  render: () => (
    <BarItem headerColumns={[{ content: 'Simple Bar Item' }]} />
  ),
}

export const WithColumns: Story = {
  render: () => (
    <BarItem headerColumns={sampleColumns} />
  ),
}

export const WithLeadingButtons: Story = {
  render: () => (
    <BarItem
      headerColumns={[{ content: 'Item with actions' }]}
      leadingButtons={sampleButtons}
    />
  ),
}

export const Expandable: Story = {
  render: () => {
    const ExpandableDemo = () => {
      const [expanded, setExpanded] = useState(false)

      return (
        <BarItem
          headerColumns={[{ content: 'Click to expand' }]}
          expanded={expanded}
          onHeaderClick={() => setExpanded(!expanded)}
        >
          <div>
            <p>Expanded content goes here.</p>
            <p style={{ marginTop: 8 }}>
              This area is revealed when the bar item is expanded. It can contain
              forms, details, or any other content.
            </p>
          </div>
        </BarItem>
      )
    }

    return <ExpandableDemo />
  },
}

export const ExpandedWithActions: Story = {
  render: () => {
    const Demo = () => {
      const [expanded, setExpanded] = useState(true)

      return (
        <BarItem
          headerColumns={sampleColumns}
          leadingButtons={sampleButtons}
          expanded={expanded}
          onHeaderClick={() => setExpanded(!expanded)}
        >
          <div>
            <p>This item is expanded by default and has leading action buttons.</p>
          </div>
        </BarItem>
      )
    }

    return <Demo />
  },
}

export const Disabled: Story = {
  render: () => (
    <BarItem
      headerColumns={[{ content: 'Disabled item' }]}
      leadingButtons={sampleButtons}
      disabled
    />
  ),
}

export const DraggingState: Story = {
  render: () => (
    <BarItem
      headerColumns={[{ content: 'This item is being dragged' }]}
      isDragging
    />
  ),
}

export const OverflowButtons: Story = {
  render: () => {
    const manyButtons: LeadingButtonProps[] = [
      { label: 'View', icon: 'eye', tooltip: 'View details' },
      { label: 'Edit', icon: 'edit', tooltip: 'Edit item' },
      { label: 'Duplicate', icon: 'doc-copy', tooltip: 'Duplicate' },
      { label: 'Share', icon: 'paper-plane', tooltip: 'Share' },
      { label: 'Archive', icon: 'xp-box', tooltip: 'Archive' },
      { label: 'Delete', icon: 'bin', destructive: true, tooltip: 'Delete' },
    ]

    return (
      <BarItem
        headerColumns={[{ content: 'Item with many actions (overflow menu)' }]}
        leadingButtons={manyButtons}
      />
    )
  },
}

export const MultipleColumns: Story = {
  render: () => (
    <BarItem
      headerColumns={[
        { content: 'Step 1', width: 120 },
        { content: 'Review & Approve', width: 200 },
        { content: 'Priority: High', align: BarItemHeaderColumnAlign.Right },
      ]}
      leadingButtons={[
        { label: 'Edit', icon: 'edit' },
      ]}
    />
  ),
}

/* ------------------------------------------------------------------ */
/*  BarItemDraggable Stories                                           */
/* ------------------------------------------------------------------ */

export const Draggable: Story = {
  render: () => (
    <BarItemDraggable
      draggableId="item-1"
      index={0}
      headerColumns={[{ content: 'Draggable item' }]}
    />
  ),
}

export const DraggableExpanded: Story = {
  render: () => {
    const Demo = () => {
      const [expanded, setExpanded] = useState(true)

      return (
        <BarItemDraggable
          draggableId="item-1"
          index={0}
          headerColumns={[{ content: 'Draggable & expandable' }]}
          expanded={expanded}
          onHeaderClick={() => setExpanded(!expanded)}
        >
          <div>
            <p>Expanded content. The drag handle is hidden when expanded.</p>
          </div>
        </BarItemDraggable>
      )
    }

    return <Demo />
  },
}

/* ------------------------------------------------------------------ */
/*  BarItemGroup Stories                                                */
/* ------------------------------------------------------------------ */

export const Group: Story = {
  render: () => {
    const GroupDemo = () => {
      const [items, setItems] = useState([
        { id: 'step-1', label: 'Draft' },
        { id: 'step-2', label: 'Review' },
        { id: 'step-3', label: 'Approved' },
        { id: 'step-4', label: 'Published' },
      ])

      const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const reordered = [...items]
        const [moved] = reordered.splice(result.source.index, 1)
        reordered.splice(result.destination.index, 0, moved)
        setItems(reordered)
      }

      return (
        <BarItemGroup droppableId="workflow-steps" onDragEnd={handleDragEnd}>
          {items.map((item, index) => (
            <BarItemDraggable
              key={item.id}
              draggableId={item.id}
              index={index}
              headerColumns={[
                { content: `Step ${index + 1}`, width: 80 },
                { content: item.label },
              ]}
              leadingButtons={[
                { label: 'Edit', icon: 'edit' },
              ]}
            />
          ))}
        </BarItemGroup>
      )
    }

    return <GroupDemo />
  },
}
