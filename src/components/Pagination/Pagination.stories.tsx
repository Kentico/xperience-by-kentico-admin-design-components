import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Pagination } from './Pagination'

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [page, setPage] = useState(args.selectedPage ?? 1)
    return (
      <Pagination
        {...args}
        selectedPage={page}
        onPageChange={(p) => {
          setPage(p)
          args.onPageChange?.(p)
        }}
      />
    )
  },
  args: {
    selectedPage: 1,
    totalPages: 10,
  },
}

export const MiddlePage: Story = {
  render: function MiddlePageStory(args) {
    const [page, setPage] = useState(args.selectedPage ?? 5)
    return (
      <Pagination
        {...args}
        selectedPage={page}
        onPageChange={(p) => {
          setPage(p)
          args.onPageChange?.(p)
        }}
      />
    )
  },
  args: {
    selectedPage: 5,
    totalPages: 10,
  },
}

export const LastPage: Story = {
  render: function LastPageStory(args) {
    const [page, setPage] = useState(args.selectedPage ?? 10)
    return (
      <Pagination
        {...args}
        selectedPage={page}
        onPageChange={(p) => {
          setPage(p)
          args.onPageChange?.(p)
        }}
      />
    )
  },
  args: {
    selectedPage: 10,
    totalPages: 10,
  },
}

export const FewPages: Story = {
  render: function FewPagesStory(args) {
    const [page, setPage] = useState(args.selectedPage ?? 1)
    return (
      <Pagination
        {...args}
        selectedPage={page}
        onPageChange={(p) => {
          setPage(p)
          args.onPageChange?.(p)
        }}
      />
    )
  },
  args: {
    selectedPage: 1,
    totalPages: 3,
  },
}

export const ManyPages: Story = {
  render: function ManyPagesStory(args) {
    const [page, setPage] = useState(args.selectedPage ?? 1)
    return (
      <Pagination
        {...args}
        selectedPage={page}
        onPageChange={(p) => {
          setPage(p)
          args.onPageChange?.(p)
        }}
      />
    )
  },
  args: {
    selectedPage: 1,
    totalPages: 50,
  },
}

export const Interactive: Story = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(1)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Pagination selectedPage={page} totalPages={20} onPageChange={setPage} />
          <span style={{ fontSize: 14, color: '#666' }}>Page {page} of 20</span>
        </div>
      )
    }
    return <Demo />
  },
}
