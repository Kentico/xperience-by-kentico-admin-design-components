import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { EditableHeader } from './EditableHeader'
import { HeadlineSize } from '@/components/Headline/Headline.types'

const meta = {
  title: 'Data Display/EditableHeader',
  component: EditableHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    headlineSize: {
      control: 'select',
      options: ['S', 'M', 'L'],
    },
    texts: { control: 'object' },
    onConfirm: { table: { disable: true } },
  },
  args: {
    value: 'My Page Title',
    disabled: false,
    headlineSize: HeadlineSize.S,
    texts: {
      dialogHeadline: 'Edit page name',
      inputLabel: 'Name',
      confirmLabel: 'Save',
      cancelLabel: 'Cancel',
      closeTooltip: 'Close',
    },
    onConfirm: async (value: string) => {
      await new Promise((r) => setTimeout(r, 300))
      return { isValid: value.length > 0 }
    },
  },
} satisfies Meta<typeof EditableHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValidationError: Story = {
  args: {
    value: 'Protected Page',
    texts: {
      dialogHeadline: 'Rename page',
      inputLabel: 'Page name',
      confirmLabel: 'Rename',
      cancelLabel: 'Cancel',
      closeTooltip: 'Close',
    },
    onConfirm: async (value: string) => {
      await new Promise((r) => setTimeout(r, 500))
      if (!value.trim()) {
        return { isValid: false, validationMessage: 'Name cannot be empty' }
      }
      if (value.toLowerCase() === 'protected page') {
        return {
          isValid: false,
          validationMessage: 'Please choose a different name',
        }
      }
      return { isValid: true }
    },
  },
}

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['S', 'M', 'L'] as const).map((size) => (
        <div key={size}>
          <div style={{ marginBottom: 4, fontSize: 12, color: '#666' }}>
            headlineSize=&quot;{size}&quot;
          </div>
          <EditableHeader
            value={`Headline Size ${size}`}
            headlineSize={size}
            texts={{
              dialogHeadline: 'Edit name',
              inputLabel: 'Name',
              confirmLabel: 'Save',
              cancelLabel: 'Cancel',
              closeTooltip: 'Close',
            }}
            onConfirm={async (v) => ({ isValid: v.length > 0 })}
          />
        </div>
      ))}
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    value: 'Read-Only Title',
    disabled: true,
  },
}
