import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CellType, SortType } from '@/components/Table/Table.types'
import type { TableAction } from '@/components/Table/Table.types'
import {
  Box,
  Headline,
  HeadlineSize,
  Icon,
  Paper,
  PaperElevation,
  BorderRadius,
  Select,
  MenuItem,
  Checkbox,
  useBreadcrumbs,
} from '@/components'
import { Stack, Spacing } from '@/components/Layout'
import { StorybookAppShell } from '@/templates/.storybook'
import { SectionLayoutTemplateWithProvider } from '../SectionLayoutTemplate/SectionLayoutTemplate'
import type { TemplateProperties } from '../SectionLayoutTemplate/SectionLayoutTemplate.types'
import type { NavigationItem } from '../SectionLayoutTemplate/SectionLayoutTemplate.types'
import { ListingWithSecondaryMenuTemplate } from './ListingWithSecondaryMenuTemplate'
import type {
  ListingWithSecondaryMenuTemplateProps,
  TableColumn,
  ActionTableRow,
  FilterStatusItem,
  CalloutConfiguration,
} from './ListingWithSecondaryMenuTemplate.types'

// ============================================================================
// Mock Data
// ============================================================================

const sectionNavigation: TemplateProperties = {
  routes: [
    { path: '/settings/listing' },
    { path: '/settings/general' },
    { path: '/settings/advanced' },
  ],
  navigation: {
    headline: 'Settings',
    showHeadline: true,
    items: [
      { id: 'listing', label: 'Listing', path: '/settings/listing' },
      { id: 'general', label: 'General', path: '/settings/general' },
      { id: 'advanced', label: 'Advanced', path: '/settings/advanced' },
    ],
  },
}

const mockColumns: TableColumn[] = [
  { name: 'col1', caption: 'Default column', sortable: true, searchable: true, minWidth: 14, maxWidth: 40 },
  { name: 'col2', caption: 'Default column', sortable: true, searchable: true, minWidth: 10, maxWidth: 30 },
  { name: 'col3', caption: 'Default column', sortable: true, searchable: true, minWidth: 10, maxWidth: 30 },
  { name: 'col4', caption: 'Default column', sortable: true, searchable: true, minWidth: 10, maxWidth: 30 },
  { name: 'col5', caption: 'Default column', sortable: true, searchable: true, minWidth: 10, maxWidth: 30 },
  { name: 'col6', caption: 'Default column', sortable: true, searchable: true, minWidth: 4, maxWidth: 10 },
]

function StatusCell() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-status-success)' }}>
      <Icon name="xp-check-circle" size="s" />
      <span>Enabled</span>
    </span>
  )
}

const rowActions: TableAction[] = [
  { identifier: 'more', label: 'More actions', icon: 'xp-ellipsis', onClick: async () => {} },
  { identifier: 'delete', label: 'Delete', icon: 'xp-bin', destructive: true, onClick: async () => {} },
]

function makeRow(id: string, email: string, v2: string, v3: string, v4: string, v6: string): ActionTableRow {
  return {
    identifier: id,
    cells: [
      { type: CellType.String, value: email, columnName: 'col1' },
      { type: CellType.String, value: v2, columnName: 'col2' },
      { type: CellType.String, value: v3, columnName: 'col3' },
      { type: CellType.String, value: v4, columnName: 'col4' },
      { type: CellType.Component, component: <StatusCell />, columnName: 'col5' },
      { type: CellType.String, value: v6, columnName: 'col6' },
      { type: CellType.Action, actions: rowActions },
    ],
  }
}

const mockRows: ActionTableRow[] = [
  makeRow('1', 'marekm@kentico.com', 'Tellus', 'Augue', 'Neque', 'F...'),
  makeRow('2', 'marekm@kentico.com', 'Faucibus', 'Non', 'Aliquam', 'G...'),
  makeRow('3', 'marekm@kentico.com', 'Dapibus', 'Malesuada', 'Integer', 'M...'),
  makeRow('4', 'marekm@kentico.com', 'Consequat', 'Id', 'Tortor', 'F...'),
  makeRow('5', 'marekm@kentico.com', 'Lobortis', 'Praesent', 'Cras', 'F...'),
]

const mockFilterItems: FilterStatusItem[] = [
  { name: 'contentType', label: 'Content type: Article, Cafe, Image, Event, Blog post...' },
  { name: 'status', label: 'Status: Published' },
]

const mockCallouts: CalloutConfiguration[] = [
  {
    headline: 'Headline (optional)',
    content: 'Body (mandatory)',
    type: 'friendlyWarning',
    placement: 'onDesk',
  },
]

// ============================================================================
// Story Configuration
// ============================================================================

const MockFilterPanelContent = () => (
  <Stack spacing={Spacing.L}>
    <Select id="filter-content-type" name="filter-content-type" label="Content type">
      <MenuItem value="article" primaryLabel="Article" />
      <MenuItem value="cafe" primaryLabel="Cafe" />
      <MenuItem value="image" primaryLabel="Image" />
      <MenuItem value="event" primaryLabel="Event" />
      <MenuItem value="blog-post" primaryLabel="Blog post" />
    </Select>
    <Select id="filter-status" name="filter-status" label="Status">
      <MenuItem value="published" primaryLabel="Published" />
      <MenuItem value="draft" primaryLabel="Draft" />
      <MenuItem value="archived" primaryLabel="Archived" />
    </Select>
    <Stack spacing={Spacing.S}>
      <Checkbox name="filter-featured" label="Featured only" />
      <Checkbox name="filter-scheduled" label="Scheduled" />
    </Stack>
  </Stack>
)

const defaultListingArgs = {
  heading: 'Heading',
  primaryActionLabel: 'PRIMARY ACTION',
  pageSizesLabel: 'Items per page',
  totalItems: 232,
  pageSize: 20,
  currentPage: 1,
  totalPages: 12,
  sortBy: 'col1',
  sortType: SortType.Asc,
  pageSizes: [10, 20, 50, 100],
  columns: mockColumns,
  rows: mockRows,
  filterItems: mockFilterItems,
  callouts: mockCallouts,
  filterPanelChildren: <MockFilterPanelContent />,
  onRowClick: (id: unknown) => console.log('Row clicked:', id),
}

function FullPageRender(args: Partial<ListingWithSecondaryMenuTemplateProps>) {
  const props = args as ListingWithSecondaryMenuTemplateProps
  return (
    <StorybookAppShell
      initialRoute="/settings/listing"
      breadcrumbs={[
        { path: '/', label: 'Home' },
        { path: '/settings', label: 'Settings' },
        { path: '/settings/listing', label: 'Listing' },
      ]}
    >
      <SectionLayoutTemplateWithProvider
        templateProperties={sectionNavigation}
      >
        <ListingWithSecondaryMenuTemplate {...props} />
      </SectionLayoutTemplateWithProvider>
    </StorybookAppShell>
  )
}

const meta = {
  title: 'Pages/ListingWithSecondaryMenu',
  component: ListingWithSecondaryMenuTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: { control: 'text' },
    primaryActionLabel: { control: 'text' },
    pageSizesLabel: { control: 'text' },
    totalItems: { control: 'number' },
    pageSize: { control: 'number' },
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    callouts: { table: { disable: true } },
    filterItems: { table: { disable: true } },
    columns: { table: { disable: true } },
    rows: { table: { disable: true } },
    pageSizes: { table: { disable: true } },
    onPrimaryAction: { table: { disable: true } },
  },
  args: defaultListingArgs,
} satisfies Meta<typeof ListingWithSecondaryMenuTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => <FullPageRender {...args} />,
}

export const NoFilters: Story = {
  args: {
    filterItems: [],
    totalItems: 1024,
  },
  render: (args) => <FullPageRender {...args} />,
}

export const NoCallout: Story = {
  args: {
    callouts: [],
  },
  render: (args) => <FullPageRender {...args} />,
}

export const NoPrimaryAction: Story = {
  args: {
    primaryActionLabel: '',
  },
  render: (args) => <FullPageRender {...args} />,
}

export const WithMassActions: Story = {
  args: {
    massActions: [
      { identifier: 'delete', label: 'Delete selected', icon: 'xp-bin', destructive: true, onClick: async () => {} },
      { identifier: 'move', label: 'Move selected', icon: 'xp-arrow-right', onClick: async () => {} },
    ],
  },
  render: (args) => <FullPageRender {...args} />,
}

// ============================================================================
// WithRowNavigation — Interactive drill-in story
// ============================================================================

const detailSubNavItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'permissions', label: 'Permissions' },
  { id: 'activity', label: 'Activity' },
]

const rowDisplayNames: Record<string, string> = {
  '1': 'marekm@kentico.com',
  '2': 'janedoe@kentico.com',
  '3': 'johndoe@kentico.com',
  '4': 'admin@kentico.com',
  '5': 'editor@kentico.com',
}

function buildDynamicNavConfig(activeRowId: string | null): TemplateProperties {
  const listingItem: NavigationItem = {
    id: 'listing',
    label: 'Listing',
    path: '/settings/listing',
    ...(activeRowId
      ? {
          childrenHeadline: rowDisplayNames[activeRowId] ?? `Row ${activeRowId}`,
          children: detailSubNavItems.map((sub) => ({
            id: sub.id,
            label: sub.label,
            path: `/settings/listing/${activeRowId}/${sub.id}`,
          })),
        }
      : {}),
  }

  return {
    routes: [
      { path: '/settings/listing' },
      ...(activeRowId
        ? detailSubNavItems.map((sub) => ({
            path: `/settings/listing/${activeRowId}/${sub.id}`,
          }))
        : []),
      { path: '/settings/general' },
      { path: '/settings/advanced' },
    ],
    navigation: {
      headline: 'Settings',
      showHeadline: true,
      items: [
        listingItem,
        { id: 'general', label: 'General', path: '/settings/general' },
        { id: 'advanced', label: 'Advanced', path: '/settings/advanced' },
      ],
    },
  }
}

function DetailContent({ rowId, subPage }: { rowId: string; subPage: string }) {
  const displayName = rowDisplayNames[rowId] ?? `Row ${rowId}`
  return (
    <Stack spacing={Spacing.XL}>
      <Headline size={HeadlineSize.M}>
        {displayName}
      </Headline>
      <Paper borderRadius={BorderRadius.Large} elevation={PaperElevation.Subtle}>
        <Box spacing={Spacing.XL}>
          <Headline size={HeadlineSize.S} spacingBottom={Spacing.M}>
            {subPage.charAt(0).toUpperCase() + subPage.slice(1)}
          </Headline>
          <p style={{ margin: 0, color: 'var(--color-text-low-emphasis)' }}>
            This is the <strong>{subPage}</strong> sub-page for <strong>{displayName}</strong>.
            In a real application, this would display the relevant content for this section.
          </p>
        </Box>
      </Paper>
    </Stack>
  )
}

function InteractiveListingInner({ listingArgs }: { listingArgs: Partial<ListingWithSecondaryMenuTemplateProps> }) {
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [activeSubPage, setActiveSubPage] = useState('overview')
  const navigate = useNavigate()
  const location = useLocation()
  const { push, pop, refreshItem, breadcrumbs } = useBreadcrumbs()
  const pushCountRef = useRef(0)

  const handleRowClick = useCallback(
    (id: unknown) => {
      const rowId = String(id)
      const displayName = rowDisplayNames[rowId] ?? `Row ${rowId}`
      setActiveRowId(rowId)
      setActiveSubPage('overview')
      navigate(`/settings/listing/${rowId}/overview`)

      push(`/settings/listing/${rowId}`, false, displayName)
      push(`/settings/listing/${rowId}/overview`, false, 'Overview')
      pushCountRef.current = 2
    },
    [navigate, push],
  )

  // Watch for route changes back to listing root (e.g. clicking first-level nav items)
  useEffect(() => {
    if (!activeRowId) return

    const isStillInDetail = location.pathname.startsWith(`/settings/listing/${activeRowId}`)
    if (!isStillInDetail) {
      setActiveRowId(null)
      setActiveSubPage('overview')
      for (let i = 0; i < pushCountRef.current; i++) pop()
      pushCountRef.current = 0
    } else {
      // Detect sub-page switches from secondary nav clicks
      const segments = location.pathname.split('/')
      const lastSegment = segments[segments.length - 1]
      if (lastSegment && lastSegment !== activeSubPage && detailSubNavItems.some((s) => s.id === lastSegment)) {
        setActiveSubPage(lastSegment)
        const breadcrumbLevel = breadcrumbs.length - 1
        refreshItem(breadcrumbLevel, lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1))
      }
    }
  }, [location.pathname, activeRowId, activeSubPage, pop, refreshItem, breadcrumbs.length])

  const dynamicNav = buildDynamicNavConfig(activeRowId)

  return (
    <SectionLayoutTemplateWithProvider
      key={activeRowId ?? 'listing'}
      templateProperties={dynamicNav}
    >
      {activeRowId ? (
        <DetailContent rowId={activeRowId} subPage={activeSubPage} />
      ) : (
        <ListingWithSecondaryMenuTemplate
          {...(listingArgs as ListingWithSecondaryMenuTemplateProps)}
          onRowClick={handleRowClick}
        />
      )}
    </SectionLayoutTemplateWithProvider>
  )
}

function InteractiveFullPageRender(args: Partial<ListingWithSecondaryMenuTemplateProps>) {
  return (
    <StorybookAppShell
      initialRoute="/settings/listing"
      breadcrumbs={[
        { path: '/', label: 'Home' },
        { path: '/settings', label: 'Settings' },
        { path: '/settings/listing', label: 'Listing' },
      ]}
    >
      <InteractiveListingInner listingArgs={args} />
    </StorybookAppShell>
  )
}

export const WithRowNavigation: Story = {
  render: (args) => <InteractiveFullPageRender {...args} />,
}
