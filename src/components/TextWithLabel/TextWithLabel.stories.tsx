import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { TextWithLabel } from './TextWithLabel'

const meta = {
  title: 'Data Display/TextWithLabel',
  component: TextWithLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    valueAsHtml: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    value: 'Value text',
    valueAsHtml: false,
  },
} satisfies Meta<typeof TextWithLabel>

export default meta
type Story = StoryObj<typeof TextWithLabel>

export const Default: Story = {
  args: {
    label: 'Full Name',
    value: 'John Doe',
  },
}

export const WithoutLabel: Story = {
  args: {
    value: 'Just a value without a label',
  },
}

export const EmptyValue: Story = {
  args: {
    label: 'Status',
    value: undefined,
  },
}

export const WithHtmlContent: Story = {
  args: {
    label: 'Description',
    value: '<strong>Bold text</strong> and <em>italic text</em> with a <a href="#">link</a>',
    valueAsHtml: true,
  },
}

export const HtmlVsPlainText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <strong style={{ fontSize: 12, color: '#666' }}>With valueAsHtml=true:</strong>
        <TextWithLabel
          label="HTML Content"
          value="<strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>"
          valueAsHtml
        />
      </div>
      <div>
        <strong style={{ fontSize: 12, color: '#666' }}>With valueAsHtml=false (default):</strong>
        <TextWithLabel
          label="Plain Text"
          value="<strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>"
        />
      </div>
    </div>
  ),
}

export const RichHtmlContent: Story = {
  args: {
    label: 'Bio',
    value: `
      <p>This is a <strong>rich text</strong> paragraph.</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    `,
    valueAsHtml: true,
  },
}

export const MultipleFields: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextWithLabel label="First Name" value="John" />
      <TextWithLabel label="Last Name" value="Doe" />
      <TextWithLabel label="Email" value="john.doe@example.com" />
      <TextWithLabel label="Phone" value="+1 (555) 123-4567" />
      <TextWithLabel label="Notes" value={undefined} />
    </div>
  ),
}

export const LongContent: Story = {
  args: {
    label: 'Address',
    value: '123 Main Street, Suite 456, New York, NY 10001, United States of America',
  },
}
