import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const targets = ['_self', '_blank', '_parent', '_top'] as const

const meta = {
  title: 'Actions/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    href: { control: 'text' },
    text: { control: 'text' },
    target: {
      control: 'select',
      options: targets,
    },
    inactive: { control: 'boolean' },
    ellipsis: { control: 'boolean' },
  },
  args: {
    href: 'https://example.com',
    inactive: false,
    ellipsis: false,
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  args: {
    href: 'https://example.com',
    text: 'Example Link',
  },
}

export const WithTextAndHref: Story = {
  args: {
    href: 'https://example.com/path/to/page',
    text: 'Click here to visit',
  },
}

export const HrefAsText: Story = {
  args: {
    href: 'https://example.com/documentation',
    text: '',
  },
}

export const AllTargets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {targets.map((target) => (
        <Link key={target} href="https://example.com" text={`Target: ${target}`} target={target} />
      ))}
    </div>
  ),
}

export const OpenInNewTab: Story = {
  args: {
    href: 'https://example.com',
    text: 'Open in new tab',
    target: '_blank',
  },
}

export const Inactive: Story = {
  args: {
    href: 'https://example.com',
    text: 'Inactive link (rendered as text)',
    inactive: true,
  },
}

export const ActiveVsInactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <strong>Active (clickable):</strong>{' '}
        <Link href="https://example.com" text="Click me" />
      </div>
      <div>
        <strong>Inactive (text only):</strong>{' '}
        <Link href="https://example.com" text="Not clickable" inactive />
      </div>
    </div>
  ),
}

export const WithEllipsis: Story = {
  render: () => (
    <div style={{ width: 200, border: '1px dashed #ccc', padding: 8 }}>
      <Link
        href="https://example.com/very/long/path/that/should/be/truncated"
        text="This is a very long link text that should be truncated with ellipsis"
        ellipsis
      />
    </div>
  ),
}

export const WithoutEllipsis: Story = {
  render: () => (
    <div style={{ width: 200, border: '1px dashed #ccc', padding: 8 }}>
      <Link
        href="https://example.com/very/long/path/that/should/wrap"
        text="This is a very long link text that will wrap to multiple lines"
      />
    </div>
  ),
}

export const EllipsisComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <strong>With ellipsis:</strong>
        <div style={{ width: 200, border: '1px dashed #ccc', padding: 8 }}>
          <Link href="https://example.com" text="Long text that gets truncated" ellipsis />
        </div>
      </div>
      <div>
        <strong>Without ellipsis:</strong>
        <div style={{ width: 200, border: '1px dashed #ccc', padding: 8 }}>
          <Link href="https://example.com" text="Long text that wraps normally" />
        </div>
      </div>
    </div>
  ),
}
