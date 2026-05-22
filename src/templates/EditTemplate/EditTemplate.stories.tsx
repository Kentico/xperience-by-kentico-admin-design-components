import * as React from 'react';
// Fix: Added Meta<typeof Component> typing, argTypes, and args spread for working controls.
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { EditTemplate, FormEditMode, CalloutType } from './EditTemplate'
import type { EditCalloutConfiguration } from './EditTemplate.types'

const defaultItems = [
  { name: 'displayName', label: 'Display name', value: 'Sample Page' },
  { name: 'urlSlug', label: 'URL slug', value: 'sample-page' },
  { name: 'description', label: 'Description', value: 'A sample page for the website.' },
]

const defaultSubmitButton = {
  visible: true,
  label: 'Save',
  tooltipText: 'Save changes',
}

const defaultDiscardDialog = {
  headline: 'Discard changes?',
  confirmLabel: 'Discard',
  cancelLabel: 'Keep editing',
  detail: 'You have unsaved changes that will be lost.',
}

const quickTipCallout: EditCalloutConfiguration = {
  type: CalloutType.QuickTip,
  headline: 'SEO tip',
  content: 'Keep your URL slug short and descriptive for better search engine rankings.',
}

const meta = {
  title: 'Templates/EditTemplate',
  component: EditTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    headline: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    preventDisplayNameUpdate: { control: 'boolean' },
    editMode: {
      control: 'select',
      options: Object.values(FormEditMode),
    },
    items: { table: { disable: true } },
    callouts: { table: { disable: true } },
    submitButton: { table: { disable: true } },
    discardChangesDialog: { table: { disable: true } },
    onSubmitResult: { table: { disable: true } },
    additionalActions: { table: { disable: true } },
    notificationBarMessages: { table: { disable: true } },
  },
  args: {
    headline: 'Edit page',
    items: defaultItems,
    disabled: false,
    editMode: FormEditMode.Default,
    callouts: [],
    submitButton: defaultSubmitButton,
    discardChangesDialog: defaultDiscardDialog,
    actionsPortalID: '',
    preventDisplayNameUpdate: false,
    fullWidth: false,
  },
} satisfies Meta<typeof EditTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCallouts: Story = {
  args: {
    callouts: [quickTipCallout],
  },
}

export const ReadOnly: Story = {
  args: {
    headline: 'View page (read-only)',
    editMode: FormEditMode.ReadOnly,
    submitButton: { visible: false, label: '', tooltipText: '' },
  },
}

export const FullWidth: Story = {
  args: {
    headline: 'Edit settings',
    items: [
      { name: 'siteName', label: 'Site name', value: 'My Website' },
      { name: 'siteUrl', label: 'Site URL', value: 'https://example.com' },
      { name: 'adminEmail', label: 'Admin email', value: 'admin@example.com' },
      { name: 'timezone', label: 'Timezone', value: 'UTC' },
    ],
    fullWidth: true,
  },
}

export const WithBackLink: Story = {
  args: {
    backLink: '/pages',
  },
}
