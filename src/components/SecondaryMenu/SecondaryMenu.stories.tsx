import * as React from 'react';
import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { SecondaryMenu } from './SecondaryMenu'
import { SecondaryMenuCell } from './SecondaryMenuCell'
import { SecondaryMenuWrapper } from './SecondaryMenuWrapper'
import { SecondaryMenuHeadline } from './SecondaryMenuHeadline'
import { SecondaryMenuNavigationProvider } from './SecondaryMenuNavigationProvider'
import { useSecondaryMenuNavigation } from './SecondaryMenuNavigationContext'
import type { NavigationConfiguration, NavigationItem } from './SecondaryMenu.types'

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const sampleItems: NavigationItem[] = [
  { id: '1', label: 'Overview', path: '/section/overview' },
  { id: '2', label: 'Content types', path: '/section/content-types' },
  { id: '3', label: 'Languages', path: '/section/languages' },
  { id: '4', label: 'Settings', path: '/section/settings' },
]

const nestedItems: NavigationItem[] = [
  {
    id: '1',
    label: 'Overview',
    path: '/section/overview',
  },
  {
    id: '2',
    label: 'Content types',
    path: '/section/content-types',
    children: [
      { id: '2a', label: 'Articles', path: '/section/content-types/articles' },
      { id: '2b', label: 'Pages', path: '/section/content-types/pages' },
      {
        id: '2c',
        label: 'Landing pages',
        path: '/section/content-types/landing-pages',
        children: [
          { id: '2c1', label: 'Campaign', path: '/section/content-types/landing-pages/campaign' },
          { id: '2c2', label: 'Product', path: '/section/content-types/landing-pages/product' },
        ],
      },
    ],
  },
  { id: '3', label: 'Settings', path: '/section/settings' },
]

/**
 * Items matching the Overview.png screenshot:
 * - "Section title" headline at top level (from NavigationConfiguration)
 * - Item 1 has children; expanding it shows a sub-menu with headline "Item 1"
 *   (auto-derived from parent label — override with childrenHeadline if needed)
 * - Item 2 and Item 3 are plain leaf items
 */
const overviewItems: NavigationItem[] = [
  {
    id: '1',
    label: 'Item 1',
    path: '/section/item-1',
    children: [
      { id: '1a', label: 'Item 1', path: '/section/item-1/sub-1' },
      { id: '1b', label: 'Item 2', path: '/section/item-1/sub-2' },
      { id: '1c', label: 'Item 3', path: '/section/item-1/sub-3' },
    ],
  },
  { id: '2', label: 'Item 2', path: '/section/item-2' },
  { id: '3', label: 'Item 3', path: '/section/item-3' },
]

/**
 * Pushes navigation items into the context on mount.
 * Storybook-only helper — not part of the real component.
 */
function NavigationPusher({
  items,
  path,
  headline,
  showHeadline,
  children,
}: {
  items: NavigationItem[]
  path: string
  headline?: string
  showHeadline?: boolean
  children: React.ReactNode
}) {
  const { push, pop } = useSecondaryMenuNavigation()

  useEffect(() => {
    push({ items, headline, showHeadline }, path)
    return pop
  }, [items, path, headline, showHeadline, push, pop])

  return <>{children}</>
}

/**
 * Pushes multiple navigation levels onto the stack on mount.
 * Storybook-only helper for multi-level headline stories.
 */
function MultiLevelPusher({
  levels,
  children,
}: {
  levels: { nav: NavigationConfiguration; path: string }[]
  children: React.ReactNode
}) {
  const { push, navigation } = useSecondaryMenuNavigation()

  useEffect(() => {
    for (const level of levels) {
      push(level.nav, level.path)
    }
  }, [levels, push])

  if (navigation.length < levels.length) {
    return null
  }

  return <>{children}</>
}

/**
 * Interactive wrapper that manages activePath state within Storybook.
 */
function InteractiveMenu({
  items,
  initialPath,
  headline,
  showHeadline,
}: {
  items: NavigationItem[]
  initialPath: string
  headline?: string
  showHeadline?: boolean
}) {
  const [activePath, setActivePath] = useState(initialPath)

  return (
    <SecondaryMenuNavigationProvider>
      <NavigationPusher
        items={items}
        path={activePath}
        headline={headline}
        showHeadline={showHeadline}
      >
        <SecondaryMenu
          level={0}
          activePath={activePath}
          onNavigate={setActivePath}
        />
      </NavigationPusher>
    </SecondaryMenuNavigationProvider>
  )
}

/* ------------------------------------------------------------------ */
/*  Meta                                                               */
/* ------------------------------------------------------------------ */

const meta = {
  title: 'Navigation/SecondaryMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

/**
 * Interactive menu matching the Overview.png reference.
 * Click items to navigate — Item 1 expands to reveal a nested sub-menu
 * whose headline reflects the parent item's label.
 */
export const Default: Story = {
  render: () => (
    <InteractiveMenu
      items={overviewItems}
      initialPath="/section/item-1/sub-1"
      headline="Section title"
      showHeadline
    />
  ),
}

/** Menu with nested sub-menus expanded via the active path. */
export const WithSubMenus: Story = {
  render: () => (
    <InteractiveMenu
      items={nestedItems}
      initialPath="/section/content-types/landing-pages/campaign"
    />
  ),
}

/** A disabled item shows the inactive message on hover. */
export const WithDisabledItem: Story = {
  render: () => (
    <InteractiveMenu
      items={[
        ...sampleItems,
        {
          id: '5',
          label: 'Integrations',
          path: '/section/integrations',
          disabled: true,
          inactiveMessage: 'Integrations are not available in this plan.',
        },
      ]}
      initialPath="/section/overview"
    />
  ),
}

/** Long labels are truncated with ellipsis and show a tooltip on hover. */
export const WithLongLabels: Story = {
  render: () => (
    <InteractiveMenu
      items={[
        { id: '1', label: 'Overview', path: '/section/overview' },
        {
          id: '2',
          label: 'A very long menu label that overflows the available width',
          path: '/section/long',
        },
        { id: '3', label: 'Settings', path: '/section/settings' },
      ]}
      initialPath="/section/overview"
    />
  ),
}

/**
 * Two navigation levels side by side, each with a "Section title" headline.
 * Demonstrates the navigation stack approach with headlines at both levels.
 */
export const WithSectionHeadlines: Story = {
  render: function Render() {
    const level0Nav: NavigationConfiguration = {
      items: [
        { id: '1', label: 'Item 1', path: '/section/item-1' },
        { id: '2', label: 'Item 2', path: '/section/item-2' },
        { id: '3', label: 'Item 3', path: '/section/item-3' },
      ],
      headline: 'Section title',
      showHeadline: true,
    }

    const level1Nav: NavigationConfiguration = {
      items: [
        { id: '1a', label: 'Item 1', path: '/section/item-1/sub-1' },
        { id: '1b', label: 'Item 2', path: '/section/item-1/sub-2' },
        { id: '1c', label: 'Item 3', path: '/section/item-1/sub-3' },
      ],
      headline: 'Section title',
      showHeadline: true,
    }

    const levels = [
      { nav: level0Nav, path: '/section/item-1/sub-1' },
      { nav: level1Nav, path: '/section/item-1/sub-1' },
    ]

    return (
      <SecondaryMenuNavigationProvider>
        <MultiLevelPusher levels={levels}>
          <div style={{ display: 'flex', gap: 16 }}>
            <SecondaryMenu level={0} />
            <SecondaryMenu level={1} />
          </div>
        </MultiLevelPusher>
      </SecondaryMenuNavigationProvider>
    )
  },
}

/* ------------------------------------------------------------------ */
/*  Sub-component stories                                              */
/* ------------------------------------------------------------------ */

/** Individual cell with active state. */
export const CellActive: Story = {
  name: 'SecondaryMenuCell — Active',
  render: () => (
    <div style={{ width: 224 }}>
      <SecondaryMenuCell
        item={{ id: '1', label: 'Overview', path: '/section/overview' }}
        isActive
      />
    </div>
  ),
}

/** Individual cell in default state. */
export const CellDefault: Story = {
  name: 'SecondaryMenuCell — Default',
  render: () => (
    <div style={{ width: 224 }}>
      <SecondaryMenuCell
        item={{ id: '1', label: 'Overview', path: '/section/overview' }}
        isActive={false}
      />
    </div>
  ),
}

/** Paper wrapper demo. */
export const Wrapper: Story = {
  name: 'SecondaryMenuWrapper',
  render: () => (
    <SecondaryMenuWrapper>
      <div style={{ padding: 16, color: 'var(--color-text-default-on-light)' }}>
        Wrapper content area
      </div>
    </SecondaryMenuWrapper>
  ),
}

/** Headline with rule line — all three level variants side by side. */
export const Headline: Story = {
  name: 'SecondaryMenuHeadline',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Level 0 (main)</div>
        <SecondaryMenuHeadline level={0}>Section Title</SecondaryMenuHeadline>
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Level 1 (submenu-1)</div>
        <SecondaryMenuHeadline level={1}>Section Title</SecondaryMenuHeadline>
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Level 2 (submenu-2)</div>
        <SecondaryMenuHeadline level={2}>Section Title</SecondaryMenuHeadline>
      </div>
    </div>
  ),
}
