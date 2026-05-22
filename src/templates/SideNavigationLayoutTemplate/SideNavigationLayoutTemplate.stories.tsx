import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SideNavigationLayoutTemplate } from './SideNavigationLayoutTemplate'
import type { TemplateProperties } from './SideNavigationLayoutTemplate.types'

const mockTemplateProperties: TemplateProperties = {
  routes: [
    { path: '/channel/overview' },
    { path: '/channel/pages' },
    { path: '/channel/urls' },
    { path: '/channel/settings' },
  ],
  navigation: {
    items: [
      { label: 'Overview', path: '/channel/overview', icon: 'xp-home' },
      { label: 'Pages', path: '/channel/pages', icon: 'xp-doc' },
      { label: 'URL redirects', path: '/channel/urls', icon: 'xp-chain' },
      { label: 'Channel settings', path: '/channel/settings', icon: 'xp-cogwheel' },
    ],
  },
}

const meta = {
  title: 'Templates/SideNavigationLayoutTemplate',
  component: SideNavigationLayoutTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/channel/overview']}>
        <Routes>
          <Route path="*" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <SideNavigationLayoutTemplate templateProperties={mockTemplateProperties}>
      <div style={{ padding: 24 }}>
        <h2>Channel overview</h2>
        <p>This is the main content area of the side navigation layout.</p>
      </div>
    </SideNavigationLayoutTemplate>
  ),
}

export const WithDisabledItem: Story = {
  render: () => (
    <SideNavigationLayoutTemplate
      templateProperties={{
        ...mockTemplateProperties,
        navigation: {
          items: [
            ...mockTemplateProperties.navigation.items,
            { label: 'Analytics', path: '/channel/analytics', icon: 'xp-piechart', disabled: true, inactiveMessage: 'Analytics not configured' },
          ],
        },
      }}
    >
      <div style={{ padding: 24 }}>
        <h2>Channel overview</h2>
        <p>One navigation item is disabled.</p>
      </div>
    </SideNavigationLayoutTemplate>
  ),
}
