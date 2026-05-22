import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardTemplate, CalloutType, CalloutPlacementType } from './DashboardTemplate'
import type { ApplicationCategory } from '../App/App.types'
import type { DashboardCalloutConfiguration } from './DashboardTemplate.types'

const mockCategories: ApplicationCategory[] = [
  {
    name: 'Content Management',
    codeName: 'content',
    icon: 'xp-doc',
    applications: [
      { name: 'Pages', icon: 'xp-doc', path: '/pages' },
      { name: 'Content hub', icon: 'xp-box', path: '/content-hub' },
      { name: 'Media libraries', icon: 'xp-picture', path: '/media' },
      { name: 'Forms', icon: 'xp-form', path: '/forms' },
    ],
  },
  {
    name: 'Digital Marketing',
    codeName: 'marketing',
    icon: 'xp-piechart',
    applications: [
      { name: 'Email marketing', icon: 'xp-message', path: '/email' },
      { name: 'Contact groups', icon: 'xp-users', path: '/contacts' },
      { name: 'Automation', icon: 'xp-cogwheels', path: '/automation' },
    ],
  },
  {
    name: 'Configuration',
    codeName: 'configuration',
    icon: 'xp-cogwheel',
    applications: [
      { name: 'Users', icon: 'xp-user', path: '/users' },
      { name: 'Roles', icon: 'xp-lock', path: '/roles' },
      { name: 'Settings', icon: 'xp-cogwheel', path: '/settings' },
      { name: 'Modules', icon: 'xp-puzzle', path: '/modules' },
      { name: 'Staging', icon: 'xp-loop', path: '/staging' },
    ],
  },
]

const mockCallout: DashboardCalloutConfiguration = {
  headline: 'Welcome to Xperience by Kentico',
  content: 'Get started by exploring the dashboard. Visit the Content management section to create and manage your pages.',
  type: CalloutType.QuickTip,
  placement: CalloutPlacementType.OnDesk,
}

const meta = {
  title: 'Pages/Dashboard',
  component: DashboardTemplate,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <DashboardTemplate categories={mockCategories} />
  ),
}

export const WithCallout: Story = {
  render: () => (
    <DashboardTemplate
      categories={mockCategories}
      callouts={[mockCallout]}
    />
  ),
}

export const WithWarningCallout: Story = {
  render: () => (
    <DashboardTemplate
      categories={mockCategories}
      callouts={[
        {
          headline: 'License expiration',
          content: 'Your license will expire in 30 days. Please contact your administrator to renew it.',
          type: CalloutType.FriendlyWarning,
          placement: CalloutPlacementType.OnDesk,
          actionButton: {
            text: 'Renew license',
            redirectUrl: '#',
            disabled: false,
            inProgress: false,
          },
        },
      ]}
    />
  ),
}
