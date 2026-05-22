import * as React from 'react';
// Uses loose Meta typing since stories render different sub-components.
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  SettingsLayoutTemplate,
  SettingsDetailsTemplate,
  SettingsContextProvider,
} from './SettingsTemplate'
import type {
  TreeTemplateNode,
  Category,
} from './SettingsTemplate.types'

const settingsTree: TreeTemplateNode = {
  id: 'root',
  name: 'Settings',
  icon: 'xp-cogwheel',
  children: [
    {
      id: 'general',
      name: 'General',
      path: '/settings/general',
      icon: 'xp-cogwheel',
      children: [],
    },
    {
      id: 'security',
      name: 'Security',
      path: '/settings/security',
      icon: 'xp-shield',
      children: [
        {
          id: 'authentication',
          name: 'Authentication',
          path: '/settings/security/auth',
          children: [],
        },
        {
          id: 'permissions',
          name: 'Permissions',
          path: '/settings/security/permissions',
          children: [],
        },
      ],
    },
    {
      id: 'email',
      name: 'Email',
      path: '/settings/email',
      icon: 'xp-email',
      children: [],
    },
    {
      id: 'integrations',
      name: 'Integrations',
      path: '/settings/integrations',
      icon: 'xp-puzzle',
      children: [],
    },
  ],
}

const mockCategories: Category[] = [
  {
    categoryId: 1,
    categoryParentId: 0,
    categoryIdPath: '/1',
    displayName: 'Site settings',
    components: [
      { name: 'siteName', label: 'Site name', value: 'My Website' },
      { name: 'siteDescription', label: 'Site description', value: 'A sample website' },
      { name: 'defaultLanguage', label: 'Default language', value: 'English' },
    ],
  },
  {
    categoryId: 2,
    categoryParentId: 0,
    categoryIdPath: '/2',
    displayName: 'SEO',
    components: [
      { name: 'metaTitle', label: 'Default meta title', value: 'My Website' },
      { name: 'metaDescription', label: 'Default meta description', value: '' },
      { name: 'robotsTxt', label: 'Robots.txt content', value: 'User-agent: *\nAllow: /' },
    ],
  },
]

const meta = {
  title: 'Templates/SettingsTemplate',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => (
      <MemoryRouter initialEntries={[context.parameters.initialRoute ?? '/settings/general']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj

export const Layout: Story = {
  render: () => (
    <SettingsLayoutTemplate
      root={settingsTree}
      expandedByDefault
    />
  ),
}

export const LayoutWithNestedActive: Story = {
  parameters: {
    initialRoute: '/settings/security/auth',
  },
  render: () => (
    <SettingsLayoutTemplate
      root={settingsTree}
      expandedByDefault
    />
  ),
}

export const Details: Story = {
  render: () => (
    <SettingsContextProvider categories={{ 1: 'Site settings', 2: 'SEO' }}>
      <SettingsDetailsTemplate
        title="General Settings"
        categories={mockCategories}
      />
    </SettingsContextProvider>
  ),
}
