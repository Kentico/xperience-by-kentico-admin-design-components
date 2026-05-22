import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { ContentItemEditTemplate, FormEditMode } from './ContentItemEditTemplate'
import type {
  ContentItemState,
  FormItems,
} from './ContentItemEditTemplate.types'

const defaultItems: FormItems = [
  { name: 'title', label: 'Title', value: 'Getting Started with Xperience' },
  { name: 'summary', label: 'Summary', value: 'An introductory guide to the platform.' },
  { name: 'author', label: 'Author', value: 'Jane Doe' },
  { name: 'publishDate', label: 'Publish date', value: '2024-03-15' },
]

const defaultState: ContentItemState = {
  id: 42,
  contentTypeId: 10,
  contentFolderId: null,
  workspaceId: 1,
  displayName: 'Getting Started with Xperience',
  editMode: FormEditMode.Default,
  menuActions: [
    { name: 'save', label: 'Save', icon: 'xp-check' },
    { name: 'publish', label: 'Publish', icon: 'xp-check-circle' },
    { name: 'archive', label: 'Archive', icon: 'xp-archive' },
    { name: 'delete', label: 'Delete', icon: 'xp-bin', isDestructive: true },
  ],
  sidePanelActions: [],
  versionStatus: 'draft',
  status: {
    label: 'Draft',
    variant: 'default',
  },
}

const meta = {
  title: 'Templates/ContentItemEditTemplate',
  component: ContentItemEditTemplate,
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
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ContentItemEditTemplate
      createFormNamePrefix="content-item"
      items={defaultItems}
      state={defaultState}
      headline="Edit content item"
      editMode={FormEditMode.Default}
      formHeadings={{
        heading: 'Content details',
        subheading: 'Fill in the content item fields',
      }}
    />
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <ContentItemEditTemplate
      createFormNamePrefix="content-item"
      items={defaultItems}
      state={{
        ...defaultState,
        editMode: FormEditMode.ReadOnly,
        versionStatus: 'published',
        status: { label: 'Published', variant: 'success' },
      }}
      headline="View content item"
      editMode={FormEditMode.ReadOnly}
      formHeadings={{
        heading: 'Content details',
        subheading: 'Content item is read-only',
      }}
    />
  ),
}

export const NewItem: Story = {
  render: () => (
    <ContentItemEditTemplate
      createFormNamePrefix="content-item-new"
      items={[
        { name: 'title', label: 'Title', value: '' },
        { name: 'summary', label: 'Summary', value: '' },
        { name: 'author', label: 'Author', value: '' },
      ]}
      state={{
        ...defaultState,
        id: 0,
        displayName: 'New Article',
        menuActions: [
          { name: 'create', label: 'Create', icon: 'xp-plus' },
        ],
      }}
      headline="Create content item"
      editMode={FormEditMode.Default}
      formHeadings={{
        heading: 'New article',
        subheading: 'Enter the details for the new article',
      }}
    />
  ),
}
