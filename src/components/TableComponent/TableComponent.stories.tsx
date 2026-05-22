import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TableComponent } from './TableComponent'
import { Table } from '@/components/Table/Table'
import {
  CellType,
  SortType,
  type ActionTableRow,
  type TableColumn,
  type TableManager,
  type StringCell,
  type TableRowId,
} from '@/components/Table/Table.types'

const makeStringCell = (value: string, columnName: string): StringCell => ({
  type: CellType.String,
  value,
  columnName,
})

const defaultColumns: TableColumn[] = [
  { name: 'name', caption: 'Name', sortable: true, searchable: true, minWidth: 20, maxWidth: 40 },
  { name: 'status', caption: 'Status', sortable: true, minWidth: 10, maxWidth: 20 },
  { name: 'type', caption: 'Content type', minWidth: 12, maxWidth: 25 },
  { name: 'modified', caption: 'Last modified', sortable: true, minWidth: 12, maxWidth: 25 },
]

const makeRows = (): ActionTableRow[] => [
  { identifier: '1', cells: [makeStringCell('Homepage', 'name'), makeStringCell('Published', 'status'), makeStringCell('Page', 'type'), makeStringCell('2024-01-15', 'modified')] },
  { identifier: '2', cells: [makeStringCell('About Us', 'name'), makeStringCell('Draft', 'status'), makeStringCell('Page', 'type'), makeStringCell('2024-01-14', 'modified')] },
  { identifier: '3', cells: [makeStringCell('Blog', 'name'), makeStringCell('Published', 'status'), makeStringCell('Landing page', 'type'), makeStringCell('2024-01-12', 'modified')] },
  { identifier: '4', cells: [makeStringCell('Contact', 'name'), makeStringCell('Archived', 'status'), makeStringCell('Page', 'type'), makeStringCell('2024-01-10', 'modified')] },
  { identifier: '5', cells: [makeStringCell('Products', 'name'), makeStringCell('Published', 'status'), makeStringCell('Landing page', 'type'), makeStringCell('2024-01-08', 'modified')] },
]

function createTableManager(
  columns: TableColumn[],
  rows: ActionTableRow[],
): TableManager {
  return {
    parameters: {
      currentPage: 1,
      pageSize: 10,
      sortBy: 'name',
      sortType: SortType.Asc,
      searchTerm: '',
    },
    columns,
    rows,
    totalRowCount: rows.length,
    reloadData: async () => {},
  }
}

const meta = {
  title: 'Data Display/TableComponent',
  component: TableComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)

    return (
      <TableComponent tableManager={manager}>
        <Table tableManager={manager} />
      </TableComponent>
    )
  },
}

export const WithHeaderActions: Story = {
  render: () => {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)

    return (
      <TableComponent
        tableManager={manager}
        isSearchAndActionsVisible
        headerActions={[
          { label: 'Add new', icon: 'xp-plus', onClick: async () => {} },
          { label: 'Export', icon: 'xp-download', onClick: async () => {} },
        ]}
        headerTexts={{ searchPlaceholder: 'Search pages...' }}
      >
        <Table tableManager={manager} />
      </TableComponent>
    )
  },
}

export const WithMassActions: Story = {
  render: function WithMassActionsStory() {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)
    const [selectedRows, setSelectedRows] = useState<TableRowId[]>(['1', '3'])

    return (
      <TableComponent
        tableManager={manager}
        isSearchAndActionsVisible
        selectedRows={selectedRows}
        onSelectedRowChange={setSelectedRows}
        massActions={[
          { label: 'Delete', icon: 'xp-bin', onClick: async () => {} },
          { label: 'Archive', icon: 'xp-archive', onClick: async () => {} },
        ]}
        selectedCountFormat="{count} items selected"
        renderTable={({ tableManager: tm, selectedRows: sel, onSelectedRowChange: onChange }) => (
          <Table
            tableManager={tm}
            selectedRows={sel}
            onSelectedRowChange={onChange}
            isRowsSelectable
          />
        )}
      />
    )
  },
}

export const WithPagination: Story = {
  render: () => {
    const rows = makeRows()
    const manager = createTableManager(defaultColumns, rows)

    return (
      <TableComponent
        tableManager={manager}
        usePagination
        isSearchAndActionsVisible
        headerTexts={{ searchPlaceholder: 'Search...' }}
      >
        <Table tableManager={manager} />
      </TableComponent>
    )
  },
}
