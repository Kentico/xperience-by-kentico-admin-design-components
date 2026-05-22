import type { ApplicationCategory } from '@/templates/App/App.types'
import type { UserProfile } from '@/components'

/**
 * Shared mock application categories for Storybook stories.
 * Canonical set with 6 categories matching the Overview.png screenshot.
 */
export const mockCategories: ApplicationCategory[] = [
  {
    name: 'Channels',
    icon: 'xp-multi-channel',
    codeName: 'kentico.channels',
    applications: [
      { name: 'Corporate website', icon: 'xp-earth', path: '/channels/corporate-website' },
    ],
  },
  {
    name: 'Content management',
    icon: 'xp-tree-structure',
    codeName: 'kentico.cm',
    applications: [
      { name: 'Content hub', icon: 'xp-boxes', path: '/content-hub' },
    ],
  },
  {
    name: 'Digital marketing',
    icon: 'xp-market',
    codeName: 'kentico.dm',
    applications: [
      { name: 'Automation', icon: 'xp-organisational-scheme', path: '/automation' },
    ],
  },
  {
    name: 'Digital commerce',
    icon: 'xp-shopping-cart',
    codeName: 'kentico.dc',
    applications: [
      { name: 'Customers', icon: 'xp-heartshake', path: '/customers' },
    ],
  },
  {
    name: 'Development',
    icon: 'xp-xml-tag',
    codeName: 'kentico.development',
    applications: [
      { name: 'Event log', icon: 'xp-rectangle-paragraph', path: '/event-log' },
    ],
  },
  {
    name: 'Configuration',
    icon: 'xp-cogwheels',
    codeName: 'kentico.configuration',
    applications: [
      { name: 'Settings', icon: 'xp-cogwheel', path: '/settings' },
    ],
  },
]

/**
 * Shared mock user profile for Storybook stories.
 */
export const mockUserProfile: UserProfile = {
  username: 'admin',
  firstName: 'Admin',
  lastName: 'User',
}
