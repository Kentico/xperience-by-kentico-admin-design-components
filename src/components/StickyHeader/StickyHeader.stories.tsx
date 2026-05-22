import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { StickyHeader } from './StickyHeader'

const meta = {
  title: 'Layout/StickyHeader',
  component: StickyHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    children: 'Sticky Header Content',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to display inside the sticky header',
    },
    className: {
      control: 'text',
      description: 'Optional additional CSS class name',
    },
  },
} satisfies Meta<typeof StickyHeader>

export default meta
type Story = StoryObj<typeof StickyHeader>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
        Sticky Header
      </div>
    ),
  },
}

export const WithScrollContent: Story = {
  render: () => (
    <div
      style={{
        height: 300,
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: 8,
      }}
    >
      <StickyHeader>
        <div
          style={{
            padding: 16,
            backgroundColor: '#fff',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <strong>Sticky Header</strong> - Scroll down to see the shadow effect
        </div>
      </StickyHeader>
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: '16px 0' }}>
            Content line {i + 1}. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the sticky header behavior. Scroll down to see the shadow appear when the header sticks to the top.',
      },
    },
  },
}

export const WithNavigation: Story = {
  render: () => (
    <div
      style={{
        height: 400,
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: 8,
      }}
    >
      <StickyHeader>
        <div
          style={{
            padding: 16,
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>Application Title</span>
          <nav style={{ display: 'flex', gap: 16 }}>
            <span style={{ cursor: 'pointer', color: '#0066cc' }}>Home</span>
            <span style={{ cursor: 'pointer', color: '#0066cc' }}>About</span>
            <span style={{ cursor: 'pointer', color: '#0066cc' }}>Contact</span>
          </nav>
        </div>
      </StickyHeader>
      <main style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Page Content</h2>
        {Array.from({ length: 15 }, (_, i) => (
          <section key={i} style={{ marginBottom: 24 }}>
            <h3>Section {i + 1}</h3>
            <p>
              This is content for section {i + 1}. The header above will stick
              to the top when you scroll down and display a subtle shadow to
              indicate it is floating above the content.
            </p>
          </section>
        ))}
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A common use case showing a navigation bar inside the sticky header.',
      },
    },
  },
}

export const CustomClassName: Story = {
  args: {
    className: 'custom-header-class',
    children: (
      <div style={{ padding: 16, backgroundColor: '#e3f2fd' }}>
        Header with custom className
      </div>
    ),
  },
}
