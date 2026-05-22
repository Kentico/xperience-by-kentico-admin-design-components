import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { StorybookAppShell } from '@/templates/.storybook'
import { SectionLayoutTemplateWithProvider } from '../SectionLayoutTemplate/SectionLayoutTemplate'
import type { TemplateProperties } from '../SectionLayoutTemplate/SectionLayoutTemplate.types'
import { OverviewPageTemplate } from './OverviewPageTemplate'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const breadcrumbs = [
  { path: '/', label: 'Home' },
  { path: '/settings', label: 'Settings' },
  { path: '/settings/usage', label: 'Usage' },
]

const sectionNavigation: TemplateProperties = {
  routes: [
    { path: '/settings/usage/item-1/sub-1' },
    { path: '/settings/usage/item-2' },
    { path: '/settings/usage/item-3' },
  ],
  navigation: {
    headline: 'Section title',
    showHeadline: true,
    items: [
      {
        id: 'item-1',
        label: 'Item 1',
        path: '/settings/usage/item-1',
        children: [
          { id: 'sub-1', label: 'Item 1', path: '/settings/usage/item-1/sub-1' },
          { id: 'sub-2', label: 'Item 2', path: '/settings/usage/item-1/sub-2' },
          { id: 'sub-3', label: 'Item 3', path: '/settings/usage/item-1/sub-3' },
        ],
        childrenHeadline: 'Section title',
      },
      { id: 'item-2', label: 'Item 2', path: '/settings/usage/item-2' },
      { id: 'item-3', label: 'Item 3', path: '/settings/usage/item-3' },
    ],
  },
}

// ---------------------------------------------------------------------------
// Story meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Pages/OverviewPage',
  component: OverviewPageTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    headline: { control: 'text' },
    calloutHeadline: { control: 'text' },
    buttonLabel: { control: 'text' },
  },
  args: {
    headline: 'Overview',
    calloutHeadline: 'Getting started with this feature',
    buttonLabel: 'PRIMARY ACTION',
  },
} satisfies Meta<typeof OverviewPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Full-page story replicating Overview.png (default props)
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: (args) => (
    <StorybookAppShell
      initialRoute="/settings/usage/item-1/sub-1"
      breadcrumbs={breadcrumbs}
    >
      <SectionLayoutTemplateWithProvider templateProperties={sectionNavigation}>
        <OverviewPageTemplate {...args} />
      </SectionLayoutTemplateWithProvider>
    </StorybookAppShell>
  ),
}

// ---------------------------------------------------------------------------
// Custom content story demonstrating non-default prop values
// ---------------------------------------------------------------------------

export const CustomContent: Story = {
  args: {
    headline: 'Dashboard',
    calloutHeadline: 'Getting started with your dashboard',
    buttonLabel: 'GET STARTED',
  },
  render: (args) => (
    <StorybookAppShell
      initialRoute="/settings/usage/item-1/sub-1"
      breadcrumbs={breadcrumbs}
    >
      <SectionLayoutTemplateWithProvider templateProperties={sectionNavigation}>
        <OverviewPageTemplate {...args} />
      </SectionLayoutTemplateWithProvider>
    </StorybookAppShell>
  ),
}
