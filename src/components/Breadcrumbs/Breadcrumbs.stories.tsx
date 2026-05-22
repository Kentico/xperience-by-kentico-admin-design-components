import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react'
import { MemoryRouter } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './Breadcrumbs'
import { BreadcrumbsProvider, useBreadcrumbs } from './BreadcrumbsContext'
import { AppBreadcrumbs } from './AppBreadcrumbs'
import { Button } from '../Button'
import { SimpleStatusDefault } from '../SimpleStatus'
import { Colors } from '@/tokens/colors'
import type { BreadcrumbProps } from './Breadcrumbs.types'

/**
 * The Breadcrumbs component displays a navigation trail showing the user's current location
 * within a site hierarchy. It supports overflow handling with a dropdown menu, pin/favorite
 * functionality, and status displays.
 *
 * The component uses React Router's NavLink internally, so it requires a Router context.
 *
 * **Context Pattern**: For dynamic breadcrumbs, use the `BreadcrumbsProvider` and
 * `useBreadcrumbs` hook to manage breadcrumb state programmatically.
 */
const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    status: { control: false },
    containerRef: { control: false },
    onCollapsedToMinWidthChange: { control: false },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ minHeight: 100 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof Breadcrumbs>

/* ------------------------------------------------------------------ */
/*  Sample Data                                                        */
/* ------------------------------------------------------------------ */

const basicBreadcrumbs: BreadcrumbProps[] = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Projects', path: '/dashboard/projects' },
  { text: 'Website Redesign', path: '/dashboard/projects/website-redesign' },
]

const deepBreadcrumbs: BreadcrumbProps[] = [
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Marketing', path: '/dashboard/marketing' },
  { text: 'Campaigns', path: '/dashboard/marketing/campaigns' },
  { text: 'Q4 2024', path: '/dashboard/marketing/campaigns/q4-2024' },
  { text: 'Email Series', path: '/dashboard/marketing/campaigns/q4-2024/email' },
  { text: 'Welcome Flow', path: '/dashboard/marketing/campaigns/q4-2024/email/welcome' },
]

const singleBreadcrumb: BreadcrumbProps[] = [
  { text: 'Dashboard', path: '/dashboard' },
]

/* ------------------------------------------------------------------ */
/*  Stories                                                            */
/* ------------------------------------------------------------------ */

export const Default: Story = {
  args: {
    breadcrumbs: basicBreadcrumbs,
  },
}

export const SingleItem: Story = {
  name: 'Single Breadcrumb',
  args: {
    breadcrumbs: singleBreadcrumb,
  },
}

export const DeepNavigation: Story = {
  name: 'Deep Navigation (Many Items)',
  args: {
    breadcrumbs: deepBreadcrumbs,
  },
}

export const WithPin: Story = {
  name: 'With Pin/Favorite',
  args: {
    breadcrumbs: basicBreadcrumbs,
    pin: {
      active: false,
      tooltip: 'Add to favorites',
      onClick: () => {
        console.log('Pin clicked')
      },
    },
  },
}

export const WithPinActive: Story = {
  name: 'With Pin Active (Favorited)',
  args: {
    breadcrumbs: basicBreadcrumbs,
    pin: {
      active: true,
      tooltip: 'Remove from favorites',
      onClick: () => {
        console.log('Unpin clicked')
      },
    },
  },
}

export const WithStatus: Story = {
  name: 'With Status Node',
  render: () => (
    <Breadcrumbs
      breadcrumbs={basicBreadcrumbs}
      status={
        <SimpleStatusDefault
          content={{ label: 'Published', iconName: 'xp-cb-check-preview', tooltipText: 'Published' }}
          iconColor={Colors.SuccessIcon}
          labelColor={Colors.TextHighEmphasis}
        />
      }
    />
  ),
}

export const WithStatusAndPin: Story = {
  name: 'With Status and Pin',
  render: () => (
    <Breadcrumbs
      breadcrumbs={basicBreadcrumbs}
      status={
        <SimpleStatusDefault
          content={{ label: 'Draft', iconName: 'xp-i-circle', tooltipText: 'Draft' }}
          iconColor={Colors.WarningIcon}
          labelColor={Colors.TextHighEmphasis}
        />
      }
      pin={{
        active: true,
        tooltip: 'Favorited',
        onClick: () => {
          console.log('Pin clicked')
        },
      }}
    />
  ),
}

export const Shortened: Story = {
  name: 'Shortened Mode',
  args: {
    breadcrumbs: deepBreadcrumbs,
    shorten: true,
  },
}

/* ------------------------------------------------------------------ */
/*  Context Provider Pattern                                           */
/* ------------------------------------------------------------------ */

/**
 * Helper component to demonstrate programmatic breadcrumb management
 */
const BreadcrumbManager = () => {
  const { push, pop, breadcrumbs, setStatusNode } = useBreadcrumbs()

  const handlePush = useCallback(() => {
    const level = breadcrumbs.length + 1
    push(`/level-${level}`, true, `Level ${level}`)
  }, [push, breadcrumbs.length])

  const handlePop = useCallback(() => {
    pop()
  }, [pop])

  const handleSetStatus = useCallback(() => {
    setStatusNode(<SimpleStatusDefault content={{ label: 'Editing', iconName: 'xp-i-circle', tooltipText: 'Editing' }} iconColor={Colors.IconDefault} labelColor={Colors.TextHighEmphasis} />)
  }, [setStatusNode])

  const handleClearStatus = useCallback(() => {
    setStatusNode(null)
  }, [setStatusNode])

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
      <Button onClick={handlePush}>Push Breadcrumb</Button>
      <Button onClick={handlePop} disabled={breadcrumbs.length === 0}>
        Pop Breadcrumb
      </Button>
      <Button onClick={handleSetStatus}>Set Status</Button>
      <Button onClick={handleClearStatus}>Clear Status</Button>
    </div>
  )
}

/**
 * Demo component that initializes breadcrumbs on mount
 */
const ContextDemo = () => {
  const { push } = useBreadcrumbs()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with some breadcrumbs
    push('/dashboard', true, 'Dashboard')
    push('/dashboard/projects', true, 'Projects')
  }, [push])

  return (
    <div ref={containerRef}>
      <AppBreadcrumbs containerRef={containerRef} />
      <BreadcrumbManager />
    </div>
  )
}

export const WithContextProvider: Story = {
  name: 'With Context Provider (Dynamic)',
  render: () => (
    <BreadcrumbsProvider>
      <ContextDemo />
    </BreadcrumbsProvider>
  ),
}

/* ------------------------------------------------------------------ */
/*  Overflow Behavior                                                  */
/* ------------------------------------------------------------------ */

export const OverflowInNarrowContainer: Story = {
  name: 'Overflow in Narrow Container',
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null)

    return (
      <div
        ref={containerRef}
        style={{
          width: 400,
          border: '1px dashed var(--color-border-default)',
          padding: 8,
        }}
      >
        <Breadcrumbs
          breadcrumbs={deepBreadcrumbs}
          containerRef={containerRef}
          onCollapsedToMinWidthChange={(collapsed) => {
            console.log('Collapsed to min width:', collapsed)
          }}
        />
        <p style={{ fontSize: 12, marginTop: 8, color: 'var(--color-text-secondary)' }}>
          Middle items are hidden in a dropdown menu when space is limited.
          Click the ellipsis to see hidden items.
        </p>
      </div>
    )
  },
}

/* ------------------------------------------------------------------ */
/*  Empty States                                                       */
/* ------------------------------------------------------------------ */

export const EmptyBreadcrumbs: Story = {
  name: 'Empty (Home Only)',
  args: {
    breadcrumbs: [],
  },
}
