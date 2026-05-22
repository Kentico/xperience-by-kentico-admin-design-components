import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { ContentLanguageTemplate } from './ContentLanguageTemplate'

const meta = {
  title: 'Templates/ContentLanguageTemplate',
  component: ContentLanguageTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ContentLanguageTemplate
      languageName="en-US"
      languages={[
        { id: 'en-US', displayName: 'English (US)', isDefault: true },
        { id: 'de-DE', displayName: 'German' },
        { id: 'fr-FR', displayName: 'French' },
        { id: 'es-ES', displayName: 'Spanish' },
      ]}
      selectionDisabled={false}
    />
  ),
}

export const SingleLanguage: Story = {
  render: () => (
    <ContentLanguageTemplate
      languageName="en-US"
      languages={[{ id: 'en-US', displayName: 'English (US)', isDefault: true }]}
      selectionDisabled={false}
    />
  ),
}

export const SelectionDisabled: Story = {
  render: () => (
    <ContentLanguageTemplate
      languageName="en-US"
      languages={[
        { id: 'en-US', displayName: 'English (US)', isDefault: true },
        { id: 'de-DE', displayName: 'German' },
      ]}
      selectionDisabled
    />
  ),
}
