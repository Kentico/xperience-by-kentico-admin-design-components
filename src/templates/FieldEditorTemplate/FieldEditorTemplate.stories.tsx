// Fix: Added Meta<typeof Component> typing, argTypes, and args for working controls.
import type { Meta, StoryObj } from '@storybook/react'
import { FieldEditorTemplate } from './FieldEditorTemplate'

const meta = {
  title: 'Templates/FieldEditorTemplate',
  component: FieldEditorTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    caption: { control: 'text' },
    supportsCategory: { control: 'boolean' },
    supportsSchema: { control: 'boolean' },
  },
  args: {
    caption: 'Content type fields',
    supportsCategory: true,
    supportsSchema: false,
  },
} satisfies Meta<typeof FieldEditorTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSchemaSupport: Story = {
  args: {
    caption: 'Page fields',
    supportsSchema: true,
  },
}

export const NoCategorySupport: Story = {
  args: {
    caption: 'Form fields',
    supportsCategory: false,
  },
}
