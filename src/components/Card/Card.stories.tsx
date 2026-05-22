import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { Button } from '@/components/Button'
import { ButtonSize } from '@/components/Button/Button.types'

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    headline: {
      control: 'text',
      description: 'Optional headline text displayed at the top of the card',
    },
    footer: {
      control: false,
      description: 'Optional footer content displayed at the bottom of the card',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether the card should fill the full height of its parent',
    },
    children: {
      control: false,
      description: 'Card body content',
    },
  },
  args: {
    fullHeight: false,
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: (
      <p style={{ margin: 0 }}>
        This is a basic card with some content. Cards provide a subtle elevation
        to visually group related content.
      </p>
    ),
  },
}

export const WithHeadline: Story = {
  args: {
    headline: 'Card Title',
    children: (
      <p style={{ margin: 0 }}>
        This card has a headline that describes its content. The headline
        appears at the top of the card with appropriate styling.
      </p>
    ),
  },
}

export const WithFooter: Story = {
  args: {
    children: (
      <p style={{ margin: 0 }}>
        This card includes a footer area that can contain actions or additional
        information.
      </p>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button color="secondary" size={ButtonSize.S}>
          Cancel
        </Button>
        <Button color="primary" size={ButtonSize.S}>
          Save
        </Button>
      </div>
    ),
  },
}

export const WithHeadlineAndFooter: Story = {
  args: {
    headline: 'Complete Card',
    children: (
      <p style={{ margin: 0 }}>
        This card demonstrates all features together: a headline at the top,
        content in the body, and action buttons in the footer.
      </p>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button color="secondary" size={ButtonSize.S}>
          Cancel
        </Button>
        <Button color="primary" size={ButtonSize.S}>
          Confirm
        </Button>
      </div>
    ),
  },
}

export const FullHeight: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ height: 300, display: 'flex' }}>
      <Card headline="Full Height Card" fullHeight>
        <p style={{ margin: 0 }}>
          This card fills the full height of its parent container. This is
          useful for layouts where cards need to align vertically.
        </p>
      </Card>
    </div>
  ),
}

export const CardGrid: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 280px)',
        gap: 16,
      }}
    >
      <Card headline="Analytics">
        <p style={{ margin: 0 }}>
          View detailed analytics and insights for your application.
        </p>
      </Card>
      <Card headline="Settings">
        <p style={{ margin: 0 }}>
          Configure application settings and preferences.
        </p>
      </Card>
      <Card headline="Reports">
        <p style={{ margin: 0 }}>
          Generate and download reports for your data.
        </p>
      </Card>
    </div>
  ),
}
