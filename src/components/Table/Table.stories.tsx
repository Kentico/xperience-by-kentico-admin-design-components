import * as React from 'react';
import { useState, useCallback, useMemo } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Table } from './Table'
import { TableHeader } from './TableHeader'
import { HeaderSelection } from './TableHeader/TableHeader.types'
import { TableRow } from './TableRow'
import { TableContextProvider } from './context/TableContextProvider'
import { SkeletonBody } from './SkeletonBody/SkeletonBody'
import {
  CellType,
  ColumnContentType,
  ScrollState,
  SortType,
  type ActionTableRow,
  type TableColumn,
  type TableManager,
  type TableDataLoadParameters,
  type StringCell,
  type ActionCell,
  type ComponentCell,
  type SortModel,
} from './Table.types'
import { Tag, TagMode } from '@/components/Tag'
import { SimpleStatusWarning } from '@/components/SimpleStatus'
import type { TableProps } from './Table'

// ============================================================================
// Mock data helpers
// ============================================================================

const defaultColumns: TableColumn[] = [
  { name: 'name', caption: 'Name', sortable: true, searchable: true, minWidth: 20, maxWidth: 40 },
  { name: 'status', caption: 'Status', sortable: true, minWidth: 10, maxWidth: 20 },
  { name: 'type', caption: 'Content type', minWidth: 12, maxWidth: 25 },
  { name: 'modified', caption: 'Last modified', sortable: true, minWidth: 12, maxWidth: 25 },
]

const columnsWithActions: TableColumn[] = [
  ...defaultColumns,
  { name: 'actions', caption: '', contentType: ColumnContentType.Action, minWidth: 10, maxWidth: 15 },
]

const makeStringCell = (value: string, columnName: string): StringCell => ({
  type: CellType.String,
  value,
  columnName,
})

const makeRows = (): ActionTableRow[] => [
  {
    identifier: '1',
    cells: [
      makeStringCell('Homepage', 'name'),
      makeStringCell('Published', 'status'),
      makeStringCell('Page', 'type'),
      makeStringCell('2024-01-15', 'modified'),
    ],
  },
  {
    identifier: '2',
    cells: [
      makeStringCell('About Us', 'name'),
      makeStringCell('Draft', 'status'),
      makeStringCell('Page', 'type'),
      makeStringCell('2024-01-14', 'modified'),
    ],
  },
  {
    identifier: '3',
    cells: [
      makeStringCell('Blog', 'name'),
      makeStringCell('Published', 'status'),
      makeStringCell('Landing page', 'type'),
      makeStringCell('2024-01-12', 'modified'),
    ],
  },
  {
    identifier: '4',
    cells: [
      makeStringCell('Contact', 'name'),
      makeStringCell('Archived', 'status'),
      makeStringCell('Page', 'type'),
      makeStringCell('2024-01-10', 'modified'),
    ],
  },
  {
    identifier: '5',
    cells: [
      makeStringCell('Products', 'name'),
      makeStringCell('Published', 'status'),
      makeStringCell('Landing page', 'type'),
      makeStringCell('2024-01-08', 'modified'),
    ],
  },
]

const makeRowsWithActions = (): ActionTableRow[] =>
  makeRows().map((row) => ({
    ...row,
    cells: [
      ...row.cells,
      {
        type: CellType.Action,
        actions: [
          { label: 'Edit', icon: 'xp-edit', onClick: () => {} },
          { label: 'Delete', icon: 'xp-bin', destructive: true, onClick: () => {} },
        ],
      } satisfies ActionCell,
    ],
  }))

const makeRowsWithComponents = (): ActionTableRow[] => [
  {
    identifier: '1',
    cells: [
      makeStringCell('Homepage', 'name'),
      {
        type: CellType.Component,
        component: <Tag label="Published" mode={TagMode.Dark} />,
      } satisfies ComponentCell,
      makeStringCell('Page', 'type'),
      makeStringCell('2024-01-15', 'modified'),
    ],
  },
  {
    identifier: '2',
    cells: [
      makeStringCell('About Us', 'name'),
      {
        type: CellType.Component,
        component: <SimpleStatusWarning content={{ label: 'Draft' }} />,
      } satisfies ComponentCell,
      makeStringCell('Page', 'type'),
      makeStringCell('2024-01-14', 'modified'),
    ],
  },
  {
    identifier: '3',
    cells: [
      makeStringCell('Blog', 'name'),
      {
        type: CellType.Component,
        component: <Tag label="Published" mode={TagMode.Dark} />,
      } satisfies ComponentCell,
      makeStringCell('Landing page', 'type'),
      makeStringCell('2024-01-12', 'modified'),
    ],
  },
]

function createTableManager(
  columns: TableColumn[],
  rows: ActionTableRow[],
  overrides?: Partial<TableDataLoadParameters>,
): TableManager {
  return {
    parameters: {
      currentPage: 1,
      pageSize: 10,
      sortBy: 'name',
      sortType: SortType.Asc,
      searchTerm: '',
      ...overrides,
    },
    columns,
    rows,
    totalRowCount: rows.length,
    reloadData: async () => {},
  }
}

// ============================================================================
// Meta
// ============================================================================

const meta = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isHeaderVisible: { control: 'boolean' },
    isRowsSelectable: { control: 'boolean' },
    isAllRowsSelectable: { control: 'boolean' },
    selectOnRowClick: { control: 'boolean' },
    maxVisibleRowActions: { control: { type: 'number', min: 1, max: 5 } },
    tableManager: { table: { disable: true } },
    renderTable: { table: { disable: true } },
    renderPreheader: { table: { disable: true } },
    renderFooter: { table: { disable: true } },
    children: { table: { disable: true } },
    selectedRows: { table: { disable: true } },
    invalidRows: { table: { disable: true } },
    onSelectedRowChange: { table: { disable: true } },
    onViewChange: { table: { disable: true } },
    rowInactiveMessage: { control: 'text' },
  },
  args: {
    isHeaderVisible: true,
    isRowsSelectable: false,
    isAllRowsSelectable: true,
    selectOnRowClick: false,
  },
} satisfies Meta<typeof Table>

export default meta

// Use loose typing — tableManager is required but all stories provide it in render functions.
// StoryObj<typeof meta> would require tableManager in args; all stories supply it in render instead.
type Story = StoryObj<TableProps>

// ============================================================================
// Helpers
// ============================================================================

/** Build CSS grid-template-columns from column definitions (8px grid unit). */
function buildGridTemplate(columns: TableColumn[], selectable = false): string {
  const gridUnit = 8
  const selectCol = selectable ? 'max-content' : ''
  const colWidths = columns.map((col) => {
    const min = (col.minWidth ?? 10) * gridUnit
    const max = (col.maxWidth ?? 40) * gridUnit
    return `minmax(${min}px, ${max}px)`
  })
  return [selectCol, ...colWidths].filter(Boolean).join(' ')
}

// ============================================================================
// Helper: renders Table sub-components (TableHeader + TableRow)
// ============================================================================

function TableRenderer({
  columns,
  rows,
  selectable,
  isAllRowsSelectable,
  sortModel,
  onSortChange,
  selectedRowIds,
  onToggleRow,
  onSelectAll,
  maxVisibleRowActions,
  onRowClick,
}: {
  columns: TableColumn[]
  rows: ActionTableRow[]
  selectable: boolean
  isAllRowsSelectable: boolean
  sortModel: SortModel
  onSortChange: (sort: SortModel) => void
  selectedRowIds: Set<string | number>
  onToggleRow: (id: string | number, selected: boolean) => void
  onSelectAll: (selected: boolean) => void
  maxVisibleRowActions?: number
  onRowClick?: (id: string | number) => void
}) {
  const hasActions = rows.some((row) =>
    row.cells.some((cell) => cell.type === CellType.Action),
  )

  const headerSelection = useMemo(() => {
    if (selectedRowIds.size === 0) return HeaderSelection.None
    if (selectedRowIds.size === rows.length) return HeaderSelection.All
    return HeaderSelection.Some
  }, [selectedRowIds.size, rows.length])

  const gridTemplateColumns = buildGridTemplate(columns, selectable)

  return (
    <TableContextProvider scrollState={ScrollState.NoScroll} hasActions={hasActions}>
      <div
        role="table"
        style={{
          display: 'grid',
          gridTemplateColumns,
          width: '100%',
        }}
      >
        <TableHeader
          columns={columns}
          selectable={selectable}
          selection={headerSelection}
          sortModel={sortModel}
          onSortChange={onSortChange}
          onSelectAll={isAllRowsSelectable ? onSelectAll : undefined}
          selectLabel="Select all rows"
        />
        <div role="rowgroup" style={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1' }}>
          {rows.map((row) => (
            <TableRow
              key={row.identifier}
              columns={columns}
              cells={row.cells}
              disabled={row.disabled ?? false}
              selectable={selectable}
              selected={selectedRowIds.has(row.identifier)}
              isInvalid={row.isInvalid}
              inactiveMessage={row.inactiveMessage}
              maxVisibleRowActions={maxVisibleRowActions}
              gridLayout
              onRowSelect={(selected) => onToggleRow(row.identifier, selected)}
              onRowClick={onRowClick ? () => onRowClick(row.identifier) : undefined}
            />
          ))}
        </div>
      </div>
    </TableContextProvider>
  )
}

// ============================================================================
// Stories
// ============================================================================

/**
 * Default table with string cells, sorting, and the Table wrapper managing state.
 */
export const Default: Story = {
  render: function DefaultStory(args) {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
    const selectedSet = useMemo(() => new Set(selectedRows), [selectedRows])

    const handleToggleRow = useCallback((id: string | number, selected: boolean) => {
      setSelectedRows((prev) =>
        selected ? [...prev, id] : prev.filter((r) => r !== id),
      )
    }, [])

    const handleSelectAll = useCallback((selected: boolean) => {
      setSelectedRows(selected ? rows.map((r) => r.identifier) : [])
    }, [rows])

    return (
      <Table
        {...args}
        tableManager={manager}
        selectedRows={selectedRows}
        onSelectedRowChange={(ids) => setSelectedRows(ids as (string | number)[])}
        renderTable={({ columns, sortModel, onSortChange }) => (
          <TableRenderer
            columns={columns}
            rows={rows}
            selectable={args.isRowsSelectable ?? false}
            isAllRowsSelectable={args.isAllRowsSelectable ?? true}
            sortModel={sortModel}
            onSortChange={onSortChange}
            selectedRowIds={selectedSet}
            onToggleRow={handleToggleRow}
            onSelectAll={handleSelectAll}
            maxVisibleRowActions={args.maxVisibleRowActions}
          />
        )}
      />
    )
  },
}

/**
 * Table with row selection enabled. Click checkboxes to select rows.
 */
export const WithSelection: Story = {
  render: function WithSelectionStory(args) {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
    const selectedSet = useMemo(() => new Set(selectedRows), [selectedRows])

    const handleToggleRow = useCallback((id: string | number, selected: boolean) => {
      setSelectedRows((prev) =>
        selected ? [...prev, id] : prev.filter((r) => r !== id),
      )
    }, [])

    const handleSelectAll = useCallback((selected: boolean) => {
      setSelectedRows(selected ? rows.map((r) => r.identifier) : [])
    }, [rows])

    return (
      <Table
        {...args}
        tableManager={manager}
        isRowsSelectable
        isAllRowsSelectable
        selectedRows={selectedRows}
        onSelectedRowChange={(ids) => setSelectedRows(ids as (string | number)[])}
        renderTable={({ columns, sortModel, onSortChange }) => (
          <TableRenderer
            columns={columns}
            rows={rows}
            selectable
            isAllRowsSelectable
            sortModel={sortModel}
            onSortChange={onSortChange}
            selectedRowIds={selectedSet}
            onToggleRow={handleToggleRow}
            onSelectAll={handleSelectAll}
          />
        )}
      />
    )
  },
}

/**
 * Table with action buttons (Edit, Delete) on each row.
 */
export const WithActions: Story = {
  render: function WithActionsStory(args) {
    const rows = makeRowsWithActions()
    const manager = createTableManager(columnsWithActions, rows)

    return (
      <Table
        {...args}
        tableManager={manager}
        renderTable={({ columns, sortModel, onSortChange }) => (
          <TableRenderer
            columns={columns}
            rows={rows}
            selectable={args.isRowsSelectable ?? false}
            isAllRowsSelectable={args.isAllRowsSelectable ?? true}
            sortModel={sortModel}
            onSortChange={onSortChange}
            selectedRowIds={new Set()}
            onToggleRow={() => {}}
            onSelectAll={() => {}}
            maxVisibleRowActions={args.maxVisibleRowActions}
          />
        )}
      />
    )
  },
}

/**
 * Table with React component cells (Tag, SimpleStatus) instead of plain strings.
 */
export const WithComponentCells: Story = {
  render: function WithComponentCellsStory(args) {
    const rows = makeRowsWithComponents()
    const manager = createTableManager(defaultColumns, rows)

    return (
      <Table
        {...args}
        tableManager={manager}
        renderTable={({ columns, sortModel, onSortChange }) => (
          <TableRenderer
            columns={columns}
            rows={rows}
            selectable={false}
            isAllRowsSelectable={false}
            sortModel={sortModel}
            onSortChange={onSortChange}
            selectedRowIds={new Set()}
            onToggleRow={() => {}}
            onSelectAll={() => {}}
          />
        )}
      />
    )
  },
}

/**
 * Table with some rows marked as disabled (greyed out, not interactive).
 */
export const DisabledRows: Story = {
  render: function DisabledRowsStory(args) {
    const rows: ActionTableRow[] = makeRows().map((row, index) => ({
      ...row,
      disabled: index === 1 || index === 3,
      inactiveMessage: index === 1 || index === 3 ? 'This item is currently locked' : undefined,
    }))
    const manager = createTableManager(defaultColumns, rows)

    return (
      <Table
        {...args}
        tableManager={manager}
        renderTable={({ columns, sortModel, onSortChange }) => (
          <TableRenderer
            columns={columns}
            rows={rows}
            selectable={false}
            isAllRowsSelectable={false}
            sortModel={sortModel}
            onSortChange={onSortChange}
            selectedRowIds={new Set()}
            onToggleRow={() => {}}
            onSelectAll={() => {}}
          />
        )}
      />
    )
  },
}

/**
 * Table with rows marked as invalid (validation error styling).
 */
export const InvalidRows: Story = {
  render: function InvalidRowsStory(args) {
    const rows: ActionTableRow[] = makeRows().map((row, index) => ({
      ...row,
      isInvalid: index === 0 || index === 2,
    }))
    const manager = createTableManager(defaultColumns, rows)

    return (
      <Table
        {...args}
        tableManager={manager}
        invalidRows={['1', '3']}
        renderTable={({ columns, sortModel, onSortChange }) => (
          <TableRenderer
            columns={columns}
            rows={rows}
            selectable={false}
            isAllRowsSelectable={false}
            sortModel={sortModel}
            onSortChange={onSortChange}
            selectedRowIds={new Set()}
            onToggleRow={() => {}}
            onSelectAll={() => {}}
          />
        )}
      />
    )
  },
}

/**
 * Skeleton loading state — shown while table data is being fetched.
 */
export const Loading: Story = {
  render: function LoadingStory() {
    return (
      <TableContextProvider scrollState={ScrollState.NoScroll} hasActions={false}>
        <div
          role="table"
          style={{
            display: 'grid',
            gridTemplateColumns: buildGridTemplate(defaultColumns),
            width: '100%',
          }}
        >
          <TableHeader
            columns={defaultColumns}
            sortModel={{ sortBy: 'name', sortType: SortType.Asc }}
          />
          <SkeletonBody
            rowCount={5}
            columns={defaultColumns}
          />
        </div>
      </TableContextProvider>
    )
  },
}

/**
 * Empty state — table with no rows.
 */
export const Empty: Story = {
  render: function EmptyStory(args) {
    const manager = createTableManager(defaultColumns, [])

    return (
      <Table
        {...args}
        tableManager={manager}
        renderTable={({ columns, rows, sortModel, onSortChange }) => (
          <TableContextProvider scrollState={ScrollState.NoScroll} hasActions={false}>
            <div
              role="table"
              style={{
                display: 'grid',
                gridTemplateColumns: buildGridTemplate(columns),
                width: '100%',
              }}
            >
              <TableHeader
                columns={columns}
                sortModel={sortModel}
                onSortChange={onSortChange}
              />
              {(!rows || rows.length === 0) && (
                <div
                  style={{
                    gridColumn: '1 / -1',
                    padding: 'var(--spacing-xxl)',
                    textAlign: 'center',
                    color: 'var(--color-text-low-emphasis)',
                    fontSize: 'var(--font-size-m)',
                  }}
                >
                  No items to display
                </div>
              )}
            </div>
          </TableContextProvider>
        )}
      />
    )
  },
}

/**
 * Table with header hidden — only data rows are displayed.
 */
export const HiddenHeader: Story = {
  render: function HiddenHeaderStory(args) {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)

    return (
      <Table
        {...args}
        isHeaderVisible={false}
        tableManager={manager}
        renderTable={({ columns, sortModel, onSortChange, isHeaderVisible }) => (
          <TableContextProvider scrollState={ScrollState.NoScroll} hasActions={false}>
            <div
              role="table"
              style={{
                display: 'grid',
                gridTemplateColumns: buildGridTemplate(columns),
                width: '100%',
              }}
            >
              {isHeaderVisible && (
                <TableHeader
                  columns={columns}
                  sortModel={sortModel}
                  onSortChange={onSortChange}
                />
              )}
              <div role="rowgroup" style={{ display: 'grid', gridTemplateColumns: 'subgrid', gridColumn: '1 / -1' }}>
                {rows.map((row) => (
                  <TableRow
                    key={row.identifier}
                    columns={columns}
                    cells={row.cells}
                    disabled={false}
                    gridLayout
                  />
                ))}
              </div>
            </div>
          </TableContextProvider>
        )}
      />
    )
  },
}

/**
 * Clickable rows — clicking a row triggers the onRowClick handler.
 */
export const ClickableRows: Story = {
  render: function ClickableRowsStory(args) {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)
    const [lastClicked, setLastClicked] = useState<string | number | null>(null)

    return (
      <div>
        <Table
          {...args}
          tableManager={manager}
          renderTable={({ columns, sortModel, onSortChange }) => (
            <TableRenderer
              columns={columns}
              rows={rows}
              selectable={false}
              isAllRowsSelectable={false}
              sortModel={sortModel}
              onSortChange={onSortChange}
              selectedRowIds={new Set()}
              onToggleRow={() => {}}
              onSelectAll={() => {}}
              onRowClick={setLastClicked}
            />
          )}
        />
        {lastClicked !== null && (
          <p style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-low-emphasis)', marginTop: 'var(--spacing-m)' }}>
            Clicked row: {lastClicked}
          </p>
        )}
      </div>
    )
  },
}

/**
 * Full-featured table combining selection, actions, component cells, and sorting.
 */
export const FullFeatured: Story = {
  render: function FullFeaturedStory() {
    const columns: TableColumn[] = [
      { name: 'name', caption: 'Name', sortable: true, searchable: true, minWidth: 20, maxWidth: 40 },
      { name: 'status', caption: 'Status', sortable: true, minWidth: 10, maxWidth: 20, tooltip: 'Current publication status' },
      { name: 'type', caption: 'Content type', minWidth: 12, maxWidth: 25 },
      { name: 'modified', caption: 'Last modified', sortable: true, minWidth: 12, maxWidth: 25 },
      { name: 'actions', caption: '', contentType: ColumnContentType.Action, minWidth: 10, maxWidth: 15 },
    ]

    const rows: ActionTableRow[] = [
      {
        identifier: '1',
        cells: [
          makeStringCell('Homepage', 'name'),
          { type: CellType.Component, component: <Tag label="Published" mode={TagMode.Dark} /> } satisfies ComponentCell,
          makeStringCell('Page', 'type'),
          makeStringCell('Jan 15, 2024', 'modified'),
          { type: CellType.Action, actions: [
            { label: 'Edit', icon: 'xp-edit', onClick: () => {} },
            { label: 'Preview', icon: 'xp-eye', onClick: () => {} },
            { label: 'Delete', icon: 'xp-bin', destructive: true, onClick: () => {} },
          ] } satisfies ActionCell,
        ],
      },
      {
        identifier: '2',
        cells: [
          makeStringCell('About Us', 'name'),
          { type: CellType.Component, component: <SimpleStatusWarning content={{ label: 'Draft' }} /> } satisfies ComponentCell,
          makeStringCell('Page', 'type'),
          makeStringCell('Jan 14, 2024', 'modified'),
          { type: CellType.Action, actions: [
            { label: 'Edit', icon: 'xp-edit', onClick: () => {} },
            { label: 'Publish', icon: 'xp-check-circle', onClick: () => {} },
            { label: 'Delete', icon: 'xp-bin', destructive: true, onClick: () => {} },
          ] } satisfies ActionCell,
        ],
      },
      {
        identifier: '3',
        disabled: true,
        inactiveMessage: 'This item is locked by another user',
        cells: [
          makeStringCell('Blog', 'name'),
          { type: CellType.Component, component: <Tag label="Published" mode={TagMode.Dark} /> } satisfies ComponentCell,
          makeStringCell('Landing page', 'type'),
          makeStringCell('Jan 12, 2024', 'modified'),
          { type: CellType.Action, actions: [
            { label: 'Edit', icon: 'xp-edit', disabled: true, onClick: () => {} },
            { label: 'Delete', icon: 'xp-bin', disabled: true, destructive: true, onClick: () => {} },
          ] } satisfies ActionCell,
        ],
      },
      {
        identifier: '4',
        cells: [
          makeStringCell('Products', 'name'),
          { type: CellType.Component, component: <Tag label="Published" mode={TagMode.Dark} /> } satisfies ComponentCell,
          makeStringCell('Landing page', 'type'),
          makeStringCell('Jan 8, 2024', 'modified'),
          { type: CellType.Action, actions: [
            { label: 'Edit', icon: 'xp-edit', onClick: () => {} },
            { label: 'Preview', icon: 'xp-eye', onClick: () => {} },
            { label: 'Unpublish', icon: 'xp-x-circle', onClick: () => {} },
            { label: 'Delete', icon: 'xp-bin', destructive: true, onClick: () => {} },
          ] } satisfies ActionCell,
        ],
      },
    ]

    const manager = createTableManager(columns, rows)
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
    const selectedSet = useMemo(() => new Set(selectedRows), [selectedRows])

    const handleToggleRow = useCallback((id: string | number, selected: boolean) => {
      setSelectedRows((prev) =>
        selected ? [...prev, id] : prev.filter((r) => r !== id),
      )
    }, [])

    const handleSelectAll = useCallback((selected: boolean) => {
      setSelectedRows(selected ? rows.filter((r) => !r.disabled).map((r) => r.identifier) : [])
    }, [rows])

    return (
      <Table
        tableManager={manager}
        isRowsSelectable
        isAllRowsSelectable
        selectedRows={selectedRows}
        onSelectedRowChange={(ids) => setSelectedRows(ids as (string | number)[])}
        maxVisibleRowActions={2}
        renderTable={({ columns: visibleCols, sortModel, onSortChange }) => (
          <TableRenderer
            columns={visibleCols}
            rows={rows}
            selectable
            isAllRowsSelectable
            sortModel={sortModel}
            onSortChange={onSortChange}
            selectedRowIds={selectedSet}
            onToggleRow={handleToggleRow}
            onSelectAll={handleSelectAll}
            maxVisibleRowActions={2}
          />
        )}
      />
    )
  },
}
