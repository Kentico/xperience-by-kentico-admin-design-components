import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import {
  Box,
  Button,
  ButtonColor,
  Callout,
  CalloutPlacementType,
  CalloutType,
  Headline,
  HeadlineSize,
  Icon,
  Input,
  Paper,
  PaperElevation,
  BorderRadius,
  Spacing,
  Stack,
} from '@/components'
import { StorybookAppShell } from '@/templates/.storybook'
import { SectionLayoutTemplateWithProvider } from './SectionLayoutTemplate'
import type { TemplateProperties } from './SectionLayoutTemplate.types'

const mockTemplateProperties: TemplateProperties = {
  routes: [
    { path: '/section/overview' },
    { path: '/section/general' },
    { path: '/section/advanced' },
  ],
  navigation: {
    headline: 'Application',
    showHeadline: true,
    items: [
      { id: 'overview', label: 'Overview', path: '/section/overview', icon: 'xp-home' },
      { id: 'general', label: 'General', path: '/section/general', icon: 'xp-cogwheel' },
      { id: 'advanced', label: 'Advanced', path: '/section/advanced', icon: 'xp-puzzle' },
      { id: 'disabled', label: 'Disabled item', path: '/section/disabled', icon: 'xp-lock', disabled: true, inactiveMessage: 'This section is not available.' },
    ],
  },
}

const mockNestedTemplateProperties: TemplateProperties = {
  routes: [
    { path: '/section/overview' },
    { path: '/section/general' },
    { path: '/section/general/details' },
    { path: '/section/general/permissions' },
    { path: '/section/advanced' },
  ],
  navigation: {
    headline: 'Application',
    showHeadline: true,
    items: [
      { id: 'overview', label: 'Overview', path: '/section/overview', icon: 'xp-home' },
      {
        id: 'general',
        label: 'General',
        path: '/section/general',
        icon: 'xp-cogwheel',
        children: [
          { id: 'details', label: 'Details', path: '/section/general/details' },
          {
            id: 'permissions',
            label: 'Permissions',
            path: '/section/general/permissions',
            children: [
              { id: 'roles', label: 'Roles', path: '/section/general/permissions/roles' },
              { id: 'users', label: 'Users', path: '/section/general/permissions/users' },
            ],
          },
        ],
      },
      { id: 'advanced', label: 'Advanced', path: '/section/advanced', icon: 'xp-puzzle' },
    ],
  },
}

const meta = {
  title: 'Templates/SectionLayoutTemplate',
  component: SectionLayoutTemplateWithProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StorybookAppShell
      initialRoute="/section/overview"
      breadcrumbs={[
        { path: '/', label: 'Home' },
        { path: '/section', label: 'Section' },
        { path: '/section/overview', label: 'Overview' },
      ]}
    >
      <SectionLayoutTemplateWithProvider templateProperties={mockTemplateProperties}>
        <Stack spacing={Spacing.XL}>
          <Headline size={HeadlineSize.M}>
            Overview
          </Headline>
          <Callout type={CalloutType.QuickTip} placement={CalloutPlacementType.OnDesk} subheadline="Quick tip">
            Configure your section settings using the sidebar navigation.
          </Callout>
          <Stack spacing={Spacing.XL}>
            <Paper borderRadius={BorderRadius.Large} elevation={PaperElevation.Subtle}>
              <Box spacing={Spacing.XL}>
                <Headline size={HeadlineSize.S} spacingBottom={Spacing.M}>
                  Getting started
                </Headline>
                <p style={{ margin: 0, color: 'var(--color-text-low-emphasis)' }}>
                  Select a category from the sidebar to configure settings for this section.
                  Each category contains related configuration options.
                </p>
              </Box>
            </Paper>
            <Paper borderRadius={BorderRadius.Large} elevation={PaperElevation.Subtle}>
              <Box spacing={Spacing.XL}>
                <Headline size={HeadlineSize.S} spacingBottom={Spacing.M}>
                  Recent activity
                </Headline>
                <p style={{ margin: 0, color: 'var(--color-text-low-emphasis)' }}>
                  No recent changes have been made to this section.
                </p>
              </Box>
            </Paper>
          </Stack>
        </Stack>
      </SectionLayoutTemplateWithProvider>
    </StorybookAppShell>
  ),
}

export const WithNestedNavigation: Story = {
  render: () => (
    <StorybookAppShell
      initialRoute="/section/general/permissions"
      breadcrumbs={[
        { path: '/', label: 'Home' },
        { path: '/section', label: 'Section' },
        { path: '/section/general', label: 'General' },
        { path: '/section/general/permissions', label: 'Permissions' },
      ]}
    >
      <SectionLayoutTemplateWithProvider templateProperties={mockNestedTemplateProperties}>
        <Stack spacing={Spacing.XL}>
          <Headline size={HeadlineSize.M}>
            Permissions
          </Headline>
          <Paper borderRadius={BorderRadius.Large} elevation={PaperElevation.Subtle}>
            <Box spacing={Spacing.XL}>
              <Headline size={HeadlineSize.S} spacingBottom={Spacing.M}>
                Role-based access
              </Headline>
              <Stack spacing={Spacing.M}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-m)', borderRadius: 'var(--border-radius-s)', backgroundColor: 'var(--color-grey-5)' }}>
                  <div>
                    <strong>Administrators</strong>
                    <p style={{ margin: '4px 0 0', fontSize: 'var(--font-size-s)', color: 'var(--color-text-low-emphasis)' }}>Full access to all resources</p>
                  </div>
                  <Button color={ButtonColor.Secondary} icon={<Icon name="xp-edit" size="s" />}>Edit</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-m)', borderRadius: 'var(--border-radius-s)', backgroundColor: 'var(--color-grey-5)' }}>
                  <div>
                    <strong>Editors</strong>
                    <p style={{ margin: '4px 0 0', fontSize: 'var(--font-size-s)', color: 'var(--color-text-low-emphasis)' }}>Can create and modify content</p>
                  </div>
                  <Button color={ButtonColor.Secondary} icon={<Icon name="xp-edit" size="s" />}>Edit</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-m)', borderRadius: 'var(--border-radius-s)', backgroundColor: 'var(--color-grey-5)' }}>
                  <div>
                    <strong>Viewers</strong>
                    <p style={{ margin: '4px 0 0', fontSize: 'var(--font-size-s)', color: 'var(--color-text-low-emphasis)' }}>Read-only access</p>
                  </div>
                  <Button color={ButtonColor.Secondary} icon={<Icon name="xp-edit" size="s" />}>Edit</Button>
                </div>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </SectionLayoutTemplateWithProvider>
    </StorybookAppShell>
  ),
}

export const WithFormContent: Story = {
  render: () => (
    <StorybookAppShell
      initialRoute="/section/general"
      breadcrumbs={[
        { path: '/', label: 'Home' },
        { path: '/section', label: 'Section' },
        { path: '/section/general', label: 'General' },
      ]}
    >
      <SectionLayoutTemplateWithProvider templateProperties={mockTemplateProperties}>
        <Stack spacing={Spacing.XL}>
          <Headline size={HeadlineSize.M}>
            General settings
          </Headline>
          <Paper borderRadius={BorderRadius.Large} elevation={PaperElevation.Subtle}>
            <Box spacing={Spacing.XL}>
              <Stack spacing={Spacing.L}>
                <div style={{ maxWidth: 400 }}>
                  <div style={{ marginBottom: 'var(--spacing-xs)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-s)' }}>Display name</div>
                  <Input name="displayName" value="My application" />
                </div>
                <div style={{ maxWidth: 400 }}>
                  <div style={{ marginBottom: 'var(--spacing-xs)', fontWeight: 'var(--font-weight-semibold)', fontSize: 'var(--font-size-s)' }}>Code name</div>
                  <Input name="codeName" value="my-application" />
                </div>
                <div>
                  <Button color={ButtonColor.Primary}>Save</Button>
                </div>
              </Stack>
            </Box>
          </Paper>
        </Stack>
      </SectionLayoutTemplateWithProvider>
    </StorybookAppShell>
  ),
}

export const WithoutNavigation: Story = {
  render: () => (
    <StorybookAppShell
      initialRoute="/standalone"
      breadcrumbs={[
        { path: '/', label: 'Home' },
        { path: '/standalone', label: 'Standalone' },
      ]}
    >
      <SectionLayoutTemplateWithProvider>
        <Stack spacing={Spacing.XL}>
          <Headline size={HeadlineSize.M}>
            Standalone content
          </Headline>
          <Paper borderRadius={BorderRadius.Large} elevation={PaperElevation.Subtle}>
            <Box spacing={Spacing.XL}>
              <p style={{ margin: 0, color: 'var(--color-text-low-emphasis)' }}>
                This section layout has no navigation sidebar. Content fills the entire width.
              </p>
            </Box>
          </Paper>
        </Stack>
      </SectionLayoutTemplateWithProvider>
    </StorybookAppShell>
  ),
}
