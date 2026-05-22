import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { ApplicationMenu } from './ApplicationMenu'
import { ApplicationMenuMobile } from './ApplicationMenuMobile'
import { ApplicationListMobile } from './ApplicationListMobile'
import { ApplicationListGroup } from './ApplicationListGroup'
import { ApplicationListItem } from './ApplicationListItem'
import { ApplicationListView, ApplicationListItemState } from './ApplicationMenu.types'
import type { ApplicationCategory } from '@/templates/App/App.types'

// Kentico Xperience application categories — matches the real admin UI (from App.tsx)
const sampleCategories: ApplicationCategory[] = [
  {
    name: 'Channels',
    icon: 'xp-multi-channel',
    codeName: 'kentico.channels',
    applications: [
      { name: 'Corporate website', icon: 'xp-earth', path: '/channels/corporate-website' },
      { name: 'Email campaigns', icon: 'xp-message', path: '/channels/email-campaigns' },
      { name: 'E-shop', icon: 'xp-earth', path: '/channels/e-shop' },
      { name: 'Product catalog', icon: 'xp-headless', path: '/channels/product-catalog' },
    ],
  },
  {
    name: 'Content management',
    icon: 'xp-tree-structure',
    codeName: 'kentico.cm',
    applications: [
      { name: 'Content hub', icon: 'xp-boxes', path: '/content-hub' },
      { name: 'Media libraries', icon: 'xp-pictures', path: '/media-libraries' },
      { name: 'Preset templates', icon: 'xp-layouts', path: '/preset-templates' },
      { name: 'Recycle bin', icon: 'xp-bin', path: '/recycle-bin' },
      { name: 'URLs', icon: 'xp-chain-broken', path: '/urls' },
    ],
  },
  {
    name: 'Digital marketing',
    icon: 'xp-market',
    codeName: 'kentico.dm',
    applications: [
      { name: 'Automation', icon: 'xp-organisational-scheme', path: '/automation' },
      { name: 'Contact groups', icon: 'xp-id-cards', path: '/contact-groups' },
      { name: 'Contact management', icon: 'xp-id-card', path: '/contact-management' },
      { name: 'Forms', icon: 'xp-form', path: '/forms' },
    ],
  },
]

const sampleUserProfile = {
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
}

// Shared decorator — provides MemoryRouter only (no layout opinion)
const withRouter = (Story: React.ComponentType) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
)

const meta = {
  title: 'Navigation/ApplicationMenu',
  component: ApplicationMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRouter],
} satisfies Meta<typeof ApplicationMenu>

export default meta
type Story = StoryObj<typeof ApplicationMenu>

/* ------------------------------------------------------------------ */
/*  ApplicationMenu Stories                                            */
/* ------------------------------------------------------------------ */

// Desktop stories need a full-height flex container for the sidebar layout
const desktopDecorator = (Story: React.ComponentType) => (
  <div style={{ height: '100vh', display: 'flex' }}>
    <Story />
  </div>
)

export const Default: Story = {
  args: {
    categories: sampleCategories,
    userProfile: sampleUserProfile,
  },
  decorators: [desktopDecorator],
}

export const WithDefaultUserProfile: Story = {
  args: {
    categories: sampleCategories,
  },
  decorators: [desktopDecorator],
}

export const SingleCategory: Story = {
  args: {
    categories: [sampleCategories[0]],
    userProfile: sampleUserProfile,
  },
  decorators: [desktopDecorator],
}

export const ManyCategories: Story = {
  decorators: [desktopDecorator],
  args: {
    categories: [
      ...sampleCategories,
      {
        name: 'Digital commerce',
        icon: 'xp-shopping-cart',
        codeName: 'kentico.dc',
        applications: [
          { name: 'Customers', icon: 'xp-heartshake', path: '/customers' },
          { name: 'Orders', icon: 'xp-dollar-sign', path: '/orders' },
          { name: 'Promotions', icon: 'xp-percent-sign', path: '/promotions' },
        ],
      },
      {
        name: 'Development',
        icon: 'xp-xml-tag',
        codeName: 'kentico.development',
        applications: [
          { name: 'Event log', icon: 'xp-rectangle-paragraph', path: '/event-log' },
          { name: 'Modules', icon: 'xp-puzzle', path: '/modules' },
          { name: 'Scheduled tasks', icon: 'xp-clock', path: '/scheduled-tasks' },
          { name: 'System', icon: 'xp-circle-square', path: '/system' },
        ],
      },
      {
        name: 'Configuration',
        icon: 'xp-cogwheels',
        codeName: 'kentico.configuration',
        applications: [
          { name: 'Channel management', icon: 'xp-multi-channel', path: '/channels' },
          { name: 'Content types', icon: 'xp-box-cogwheel', path: '/content-types' },
          { name: 'Settings', icon: 'xp-cogwheel', path: '/settings' },
          { name: 'Users', icon: 'xp-users', path: '/users' },
        ],
      },
    ],
    userProfile: sampleUserProfile,
  },
}

/* ------------------------------------------------------------------ */
/*  ApplicationMenuMobile Stories                                      */
/*  Mirrors the layout from MainMobile.tsx — ApplicationMenuMobile is  */
/*  the bottom bar, ApplicationListMobile shows the actual app list.   */
/*  Uses Storybook viewport to simulate iPhone 16 Pro (402 x 874).    */
/* ------------------------------------------------------------------ */

const mobileViewportOptions = {
  iphone16pro: {
    name: 'iPhone 16 Pro',
    styles: { width: '402px', height: '874px' },
    type: 'mobile' as const,
  },
}

export const Mobile: StoryObj<typeof ApplicationMenuMobile> = {
  render: () => {
    const MobileDemo = () => {
      const [applicationListVisible, setApplicationListVisible] = useState(false)
      const [isAppListOverflowing, setAppListOverflowing] = useState(false)

      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: '0 var(--spacing-xxl, 32px)' }}>
            {applicationListVisible ? (
              <ApplicationListMobile
                categories={sampleCategories}
                isOverflowing={isAppListOverflowing}
                setIsOverflowing={setAppListOverflowing}
                handleClick={() => setApplicationListVisible(false)}
              />
            ) : (
              <div style={{ padding: 'var(--spacing-xl, 24px)' }}>
                <p style={{ color: 'var(--color-text-low-emphasis, #525252)' }}>
                  Click &ldquo;Applications&rdquo; in the bottom bar to open the app list.
                </p>
              </div>
            )}
          </div>
          <ApplicationMenuMobile
            categories={sampleCategories}
            applicationListVisible={applicationListVisible}
            setApplicationListVisible={setApplicationListVisible}
            showError={false}
            showWarning={false}
            expiringLicenseMessage=""
          />
        </div>
      )
    }

    return <MobileDemo />
  },
  parameters: {
    viewport: { options: mobileViewportOptions },
  },
  globals: {
    viewport: { value: 'iphone16pro', isRotated: false },
  },
}

export const MobileWithListOpen: StoryObj<typeof ApplicationMenuMobile> = {
  render: () => {
    const MobileDemo = () => {
      const [applicationListVisible, setApplicationListVisible] = useState(true)
      const [isAppListOverflowing, setAppListOverflowing] = useState(false)

      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
          <div style={{ flex: 1, overflow: 'auto', padding: '0 var(--spacing-xxl, 32px)' }}>
            {applicationListVisible ? (
              <ApplicationListMobile
                categories={sampleCategories}
                isOverflowing={isAppListOverflowing}
                setIsOverflowing={setAppListOverflowing}
                handleClick={() => setApplicationListVisible(false)}
              />
            ) : (
              <div style={{ padding: 'var(--spacing-xl, 24px)' }}>
                <p style={{ color: 'var(--color-text-low-emphasis, #525252)' }}>
                  Click &ldquo;Applications&rdquo; in the bottom bar to open the app list.
                </p>
              </div>
            )}
          </div>
          <ApplicationMenuMobile
            categories={sampleCategories}
            applicationListVisible={applicationListVisible}
            setApplicationListVisible={setApplicationListVisible}
            showError={false}
            showWarning={false}
            expiringLicenseMessage=""
          />
        </div>
      )
    }

    return <MobileDemo />
  },
  parameters: {
    viewport: { options: mobileViewportOptions },
  },
  globals: {
    viewport: { value: 'iphone16pro', isRotated: false },
  },
}

/* ------------------------------------------------------------------ */
/*  ApplicationListItem Stories                                        */
/* ------------------------------------------------------------------ */

export const ListItemDefault: Story = {
  render: () => (
    <ApplicationListItem
      state={ApplicationListItemState.Default}
      application={sampleCategories[0].applications[0]}
      handleClick={() => {}}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 200, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export const ListItemActivated: Story = {
  render: () => (
    <ApplicationListItem
      state={ApplicationListItemState.Activated}
      application={sampleCategories[0].applications[0]}
      handleClick={() => {}}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 200, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export const ListItemStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ApplicationListItem
        state={ApplicationListItemState.Default}
        application={{ name: 'Content hub', icon: 'xp-boxes', path: '/content-hub' }}
        handleClick={() => {}}
      />
      <ApplicationListItem
        state={ApplicationListItemState.Activated}
        application={{ name: 'Media libraries', icon: 'xp-pictures', path: '/media-libraries' }}
        handleClick={() => {}}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 200, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

/* ------------------------------------------------------------------ */
/*  ApplicationListGroup Stories                                       */
/* ------------------------------------------------------------------ */

export const ListGroupListView: Story = {
  render: () => (
    <ApplicationListGroup
      category={sampleCategories[0]}
      applicationPath=""
      view={ApplicationListView.List}
      handleClick={() => {}}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 300, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export const ListGroupTilesView: Story = {
  render: () => (
    <ApplicationListGroup
      category={sampleCategories[0]}
      applicationPath=""
      view={ApplicationListView.Tiles}
      handleClick={() => {}}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export const ListGroupCollapsible: Story = {
  render: () => (
    <ApplicationListGroup
      category={sampleCategories[0]}
      applicationPath=""
      view={ApplicationListView.List}
      handleClick={() => {}}
      collapsible
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 300, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export const ListGroupWithActiveApplication: Story = {
  render: () => (
    <ApplicationListGroup
      category={sampleCategories[0]}
      applicationPath="content-hub"
      view={ApplicationListView.List}
      handleClick={() => {}}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 300, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}

export const ViewComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>List View</h4>
        <ApplicationListGroup
          category={sampleCategories[0]}
          applicationPath=""
          view={ApplicationListView.List}
          handleClick={() => {}}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>Tiles View</h4>
        <ApplicationListGroup
          category={sampleCategories[0]}
          applicationPath=""
          view={ApplicationListView.Tiles}
          handleClick={() => {}}
        />
      </div>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}
