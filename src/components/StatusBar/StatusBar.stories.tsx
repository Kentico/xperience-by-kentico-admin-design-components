import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { StatusBar } from './StatusBar'
import { BreadcrumbsProvider, useBreadcrumbs } from '../Breadcrumbs'
import { useEffect } from 'react'

/**
 * StatusBar is the upper part of the application shell.
 * It contains main navigation like breadcrumbs, selects, avatar, and application specific buttons.
 * The StatusBar requires a BreadcrumbsProvider context to function properly.
 */
const meta = {
  title: 'Layout/StatusBar',
  component: StatusBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <BreadcrumbsProvider>
          <Story />
        </BreadcrumbsProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof StatusBar>

export default meta
type Story = StoryObj<typeof StatusBar>

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: 100 }}>
      <StatusBar />
    </div>
  ),
}

/**
 * Helper component to populate breadcrumbs for story demonstrations.
 */
const BreadcrumbsPopulator = ({
  items,
}: {
  items: Array<{ path: string; text: string; isSignificant?: boolean }>
}) => {
  const { push } = useBreadcrumbs()

  useEffect(() => {
    items.forEach(({ path, text, isSignificant = false }) => {
      push(path, isSignificant, text)
    })
  }, [push, items])

  return null
}

export const WithBreadcrumbs: Story = {
  render: () => (
    <div style={{ minHeight: 100 }}>
      <BreadcrumbsPopulator
        items={[
          { path: '/', text: 'Home', isSignificant: true },
          { path: '/content', text: 'Content' },
          { path: '/content/articles', text: 'Articles' },
        ]}
      />
      <StatusBar />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'StatusBar with breadcrumb navigation showing the current path.',
      },
    },
  },
}

export const WithLongBreadcrumbPath: Story = {
  render: () => (
    <div style={{ minHeight: 100 }}>
      <BreadcrumbsPopulator
        items={[
          { path: '/', text: 'Dashboard', isSignificant: true },
          { path: '/settings', text: 'Settings' },
          { path: '/settings/appearance', text: 'Appearance' },
          { path: '/settings/appearance/themes', text: 'Themes' },
          { path: '/settings/appearance/themes/custom', text: 'Custom Theme' },
        ]}
      />
      <StatusBar />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'StatusBar with a long breadcrumb path to demonstrate the collapse behavior.',
      },
    },
  },
}

export const WithCustomClassName: Story = {
  args: {
    className: 'custom-status-bar-class',
  },
  render: (args) => (
    <div style={{ minHeight: 100 }}>
      <StatusBar {...args} />
    </div>
  ),
}

export const InContextLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 400,
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <BreadcrumbsPopulator
        items={[
          { path: '/', text: 'Workspace', isSignificant: true },
          { path: '/pages', text: 'Pages' },
          { path: '/pages/homepage', text: 'Homepage' },
        ]}
      />
      <StatusBar />
      <div
        style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#666', margin: 0 }}>
          Main content area below the StatusBar
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'StatusBar shown in context with a simulated application layout structure.',
      },
    },
  },
}

export const PlaceholderMountPoints: Story = {
  render: () => (
    <div style={{ minHeight: 100 }}>
      <p
        style={{
          margin: '0 0 16px',
          padding: '8px 16px',
          backgroundColor: '#fff3cd',
          borderRadius: 4,
          fontSize: 14,
          color: '#856404',
        }}
      >
        The StatusBar contains placeholder mount points for WorkspaceSelector and
        LanguageSelector. These will be populated by external components at runtime.
      </p>
      <StatusBar />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the StatusBar with its placeholder mount points visible. In production, these are populated by external selectors.',
      },
    },
  },
}
