import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  ButtonColor,
  Callout,
  FilterPanel,
  FilterStatusIndicator,
  Headline,
  HeadlineSize,
  Icon,
  IconToggleButtons,
  Pagination,
  SearchInput,
  Select,
  MenuItem,
} from '@/components'
import { Table } from '@/components/Table'
import { TableContextProvider } from '@/components/Table/context/TableContextProvider'
import { TableHeader } from '@/components/Table/TableHeader'
import { TableRow } from '@/components/Table/TableRow'
import {
  CellType,
  ColumnContentType,
  ScrollState,
  SortType as BaseSortType,
} from '@/components/Table/Table.types'
import type {
  TableManager,
  TableColumn as BaseTableColumn,
  TableDataLoadParameters,
  ActionTableRow,
  TableRowId,
} from '@/components/Table/Table.types'
import { CalloutType } from '@/components/Callout/Callout.types'
import type { CalloutConfiguration } from './ListingWithSecondaryMenuTemplate.types'
import type { ListingWithSecondaryMenuTemplateProps, TableColumn } from './ListingWithSecondaryMenuTemplate.types'
import './ListingWithSecondaryMenuTemplate.css'

// ============================================================================
// Type Adapters
// ============================================================================

/**
 * Maps template columns to base TableColumn[].
 */
function toBaseColumns(columns: TableColumn[]): BaseTableColumn[] {
  return columns.map((col) => ({
    name: col.name,
    caption: col.caption,
    sortable: col.sortable,
    visible: col.visible,
    searchable: col.searchable ?? true,
    minWidth: col.minWidth ?? 10,
    maxWidth: col.maxWidth ?? 40,
  }))
}

// ============================================================================
// Table Manager Hook
// ============================================================================

/**
 * Creates a TableManager from template props.
 * Manages table state: sorting, searching, pagination, and filtering.
 */
function useListingTableManager(
  columns: TableColumn[],
  rows: ActionTableRow[],
  totalItems: number,
  pageSize: number,
  sortBy: string,
  sortType: BaseSortType,
  searchTerm: string,
  onSearchChange: (term: string) => void,
  onSortChange: (sortBy: string, sortType: BaseSortType) => void,
  onPageChange: (page: number) => void,
  onPageSizeChange: (size: number) => void,
  currentPage: number
): TableManager {
  const baseColumns = useMemo(() => toBaseColumns(columns), [columns])

  const parameters: TableDataLoadParameters = useMemo(() => ({
    currentPage,
    pageSize,
    sortBy,
    sortType,
    searchTerm,
  }), [currentPage, pageSize, sortBy, sortType, searchTerm])

  const reloadData = useCallback(
    async (patch?: Partial<TableDataLoadParameters>) => {
      if (patch?.searchTerm !== undefined) {
        onSearchChange(patch.searchTerm)
      }
      if (patch?.sortBy !== undefined && patch?.sortType !== undefined) {
        onSortChange(patch.sortBy, patch.sortType)
      }
      if (patch?.currentPage !== undefined) {
        onPageChange(patch.currentPage)
      }
      if (patch?.pageSize !== undefined) {
        onPageSizeChange(patch.pageSize)
        onPageChange(1) // Reset to page 1 when page size changes
      }
    },
    [onSearchChange, onSortChange, onPageChange, onPageSizeChange]
  )

  return useMemo(
    () => ({
      parameters,
      columns: baseColumns,
      rows,
      totalRowCount: totalItems,
      reloadData,
    }),
    [parameters, baseColumns, rows, totalItems, reloadData]
  )
}

// ============================================================================
// Internal Sub-Components
// ============================================================================

/**
 * ConfigurableCallout - Renders a callout with optional action button.
 */
function getDefaultSubheadline(type: CalloutConfiguration['type']): string {
  switch (type) {
    case CalloutType.FriendlyWarning:
      return 'Friendly warning'
    case CalloutType.QuickTip:
      return 'Did you know?'
    default:
      return ''
  }
}

function ConfigurableCallout({ config }: { config: CalloutConfiguration }) {
  const handleButtonClick = useCallback(() => {
    if (config.actionButton?.redirectUrl) {
      if (config.actionButton.openInNewTab) {
        window.open(config.actionButton.redirectUrl, '_blank')
      } else {
        window.location.href = config.actionButton.redirectUrl
      }
    }
  }, [config.actionButton])

  const actionButtonElement = config.actionButton ? (
    <Button
      color={ButtonColor.Primary}
      onClick={handleButtonClick}
      disabled={config.actionButton.disabled || config.actionButton.inProgress}
    >
      {config.actionButton.text}
    </Button>
  ) : undefined

  return (
    <Callout
      type={config.type}
      placement={config.placement}
      headline={config.headline}
      subheadline={config.subheadline ?? getDefaultSubheadline(config.type)}
      actionButton={actionButtonElement}
    >
      {config.contentAsHtml ? (
        <span dangerouslySetInnerHTML={{ __html: config.content }} />
      ) : (
        config.content
      )}
    </Callout>
  )
}

// ============================================================================
// Grid Template Builder
// ============================================================================

function buildGridTemplate(columns: BaseTableColumn[], hasActions: boolean): string {
  const gridUnit = 8
  const colWidths = columns.map((col, index) => {
    const min = (col.minWidth ?? 10) * gridUnit
    const max = (col.maxWidth ?? 40) * gridUnit
    // Last data column absorbs remaining space so the table fills its container
    const isLast = index === columns.length - 1
    return isLast ? `minmax(${min}px, 1fr)` : `minmax(${min}px, ${max}px)`
  })
  // Add column for action buttons
  if (hasActions) {
    colWidths.push('max-content')
  }
  return colWidths.join(' ')
}

// ============================================================================
// ListingWithSecondaryMenuTemplate
// ============================================================================

/**
 * ListingWithSecondaryMenuTemplate — Template for listing pages with a secondary menu sidebar.
 *
 * Uses TableComponent as its composition layer for search, filtering, mass actions,
 * table rendering, and pagination.
 *
 * Intended to be used inside SectionLayoutTemplateWithProvider which provides the
 * secondary navigation sidebar. This template renders the main content area:
 * heading, callout, action bar, applied filters, data table, and pagination.
 *
 * Matches the "Listing with secondary menu" reference screenshot.
 */
export function ListingWithSecondaryMenuTemplate({
  heading,
  callouts,
  primaryActionLabel,
  onPrimaryAction,
  columns,
  rows,
  totalItems: _totalItems,
  currentPage,
  totalPages: _totalPages,
  pageSize,
  pageSizes,
  filterItems,
  sortBy,
  sortType,
  pageSizesLabel,
  massActions,
  onRowClick,
  filterPanelChildren,
  onFilterApply,
  onFilterClear,
  maxVisibleRowActions = 2,
}: ListingWithSecondaryMenuTemplateProps) {
  // Props _totalItems and _totalPages are available for consumers who need server-side pagination
  void _totalItems
  void _totalPages
  // State management
  const [searchValue, setSearchValue] = useState('')
  const [activeSearchTerm, setActiveSearchTerm] = useState('')
  // Clamp currentPage to valid range (1-based) - prevents empty table when page exceeds data
  const clampedInitialPage = Math.max(1, Math.min(currentPage, Math.ceil(rows.length / pageSize) || 1))
  const [selectedPage, setSelectedPage] = useState(clampedInitialPage)
  const [selectedPageSize, setSelectedPageSize] = useState(pageSize)
  const [filters, setFilters] = useState(filterItems ?? [])
  const [sortState, setSortState] = useState<{ sortBy: string; sortType: BaseSortType }>({
    sortBy,
    sortType,
  })
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState<TableRowId[]>([])
  const [activeViewMode, setActiveViewMode] = useState<'settings' | 'grid' | 'list'>('list')

  // Filter rows based on active search term (only set on Enter/submit)
  const filteredRows = useMemo(() => {
    if (!activeSearchTerm.trim()) return rows
    const searchLower = activeSearchTerm.toLowerCase()
    return rows.filter((row) =>
      row.cells.some((cell) => {
        if (cell.type === CellType.String) {
          return cell.value.toLowerCase().includes(searchLower)
        }
        return false
      })
    )
  }, [rows, activeSearchTerm])

  // Sort filtered rows
  const sortedRows = useMemo(() => {
    if (!sortState.sortBy) return filteredRows
    return [...filteredRows].sort((a, b) => {
      const colIndex = columns.findIndex((c) => c.name === sortState.sortBy)
      if (colIndex === -1) return 0
      const cellA = a.cells[colIndex]
      const cellB = b.cells[colIndex]
      if (cellA?.type === CellType.String && cellB?.type === CellType.String) {
        const cmp = cellA.value.localeCompare(cellB.value)
        return sortState.sortType === BaseSortType.Asc ? cmp : -cmp
      }
      return 0
    })
  }, [filteredRows, sortState, columns])

  // Paginate sorted rows (bypass pagination when search is active — show all results)
  const paginatedRows = useMemo(() => {
    if (activeSearchTerm.trim()) return sortedRows
    const start = (selectedPage - 1) * selectedPageSize
    return sortedRows.slice(start, start + selectedPageSize)
  }, [sortedRows, selectedPage, selectedPageSize, activeSearchTerm])

  // Calculate actual total pages based on filtered results
  const actualTotalPages = useMemo(
    () => Math.max(1, Math.ceil(sortedRows.length / selectedPageSize)),
    [sortedRows.length, selectedPageSize]
  )

  // Clamp selectedPage when data changes (e.g., after filtering reduces rows)
  useEffect(() => {
    if (selectedPage > actualTotalPages) {
      setSelectedPage(actualTotalPages)
    }
  }, [selectedPage, actualTotalPages])

  // Create table manager
  const tableManager = useListingTableManager(
    columns,
    paginatedRows,
    sortedRows.length,
    selectedPageSize,
    sortState.sortBy,
    sortState.sortType,
    activeSearchTerm,
    setActiveSearchTerm,
    (newSortBy, newSortType) => setSortState({ sortBy: newSortBy, sortType: newSortType }),
    setSelectedPage,
    setSelectedPageSize,
    selectedPage
  )

  // Handlers
  const handleClearAll = useCallback(() => {
    setFilters([])
    onFilterClear?.()
  }, [onFilterClear])

  const handleClearFilter = useCallback((filterName: string) => {
    setFilters((prev) => prev.filter((f) => f.name !== filterName))
  }, [])

  const handleFilterApply = useCallback(() => {
    setIsFilterPanelOpen(false)
    onFilterApply?.()
  }, [onFilterApply])

  const handleFilterPanelClear = useCallback(() => {
    setFilters([])
    onFilterClear?.()
  }, [onFilterClear])

  const handlePageSizeChange = useCallback((value: string | undefined) => {
    if (value) {
      setSelectedPageSize(Number(value))
      setSelectedPage(1) // Reset to page 1 when changing page size
    }
  }, [])

  return (
    <div className={'ListingWithSecondaryMenuTemplate-templateContent'}>
      {/* Heading */}
      <Headline size={HeadlineSize.M}>{heading}</Headline>

      {/* Callouts */}
      {callouts && callouts.length > 0 && (
        <div className={'ListingWithSecondaryMenuTemplate-calloutWrapper'}>
          {callouts.map((callout, index) => (
            <ConfigurableCallout key={index} config={callout} />
          ))}
        </div>
      )}

      {/* Action bar: PRIMARY ACTION | Search | FILTER */}
      <div className={'ListingWithSecondaryMenuTemplate-actionBar'}>
        {primaryActionLabel && (
          <Button color={ButtonColor.Primary} onClick={onPrimaryAction}>
            {primaryActionLabel}
          </Button>
        )}
        <div className={'ListingWithSecondaryMenuTemplate-actionBarSearch'}>
          <SearchInput
            name="listing-secondary-menu-search"
            placeholder="Search"
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={() => setActiveSearchTerm(searchValue)}
            onClear={() => { setActiveSearchTerm('') }}
            clearable
          />
        </div>
        <Button
          color={ButtonColor.Secondary}
          icon={<Icon name="xp-filter-1" size="xs" />}
          onClick={() => setIsFilterPanelOpen(true)}
        >
          FILTER
        </Button>
      </div>

      {/* Applied filters bar */}
      {filters.length > 0 && (
        <div className={'ListingWithSecondaryMenuTemplate-appliedFilters'}>
          <FilterStatusIndicator
            filterItems={filters}
            onClearAll={handleClearAll}
            onClear={handleClearFilter}
            texts={{
              appliedFiltersLabel: 'Applied filters:',
              clearAllButtonLabel: 'CLEAR ALL',
            }}
          />
        </div>
      )}

      {/* Item count + view mode toggles */}
      <div className={'ListingWithSecondaryMenuTemplate-listingMeta'}>
        <span className={'ListingWithSecondaryMenuTemplate-itemCount'}>{sortedRows.length} items</span>
        <div className={'ListingWithSecondaryMenuTemplate-viewModeActions'}>
          <Button
            color={ButtonColor.Quinary}
            icon={<Icon name="xp-cogwheel" size="s" />}
            onClick={() => setActiveViewMode('settings')}
          />
          <IconToggleButtons
            items={[
              { id: 'grid', icon: 'xp-l-grid-2-2', tooltip: 'Tiles view' },
              { id: 'list', icon: 'xp-list', tooltip: 'List view' },
            ]}
            selectedItemId={activeViewMode === 'settings' ? 'list' : activeViewMode}
            onChange={(id) => setActiveViewMode(id as 'grid' | 'list')}
          />
        </div>
      </div>

      {/* Table card or empty search state */}
      {activeSearchTerm.trim() && paginatedRows.length === 0 ? (
        <div className={'ListingWithSecondaryMenuTemplate-emptySearchState'}>
          <h2 className={'ListingWithSecondaryMenuTemplate-emptySearchHeadline'}>We couldn't find any matches</h2>
          <p className={'ListingWithSecondaryMenuTemplate-emptySearchSubtitle'}>Try changing your search phrase or start over</p>
          <Button
            color={ButtonColor.Primary}
            onClick={() => { setSearchValue(''); setActiveSearchTerm('') }}
          >
            CLEAR YOUR SEARCH PHRASE HERE
          </Button>
        </div>
      ) : (
        <div className={'ListingWithSecondaryMenuTemplate-tableCard'}>
          <Table
            tableManager={tableManager}
            selectedRows={selectedRows}
            onSelectedRowChange={setSelectedRows}
            isRowsSelectable={Boolean(massActions?.length)}
            maxVisibleRowActions={maxVisibleRowActions}
            onRowClick={onRowClick}
            renderTable={({ columns, rows, sortModel, onSortChange, onRowClick, maxVisibleRowActions: maxVis }) => {
              const hasActions = rows?.some((row) =>
                row.cells.some((cell) => cell.type === CellType.Action)
              ) ?? false
              const gridTemplateColumns = buildGridTemplate(columns, hasActions)

              // Add an "Actions" column definition for the header when action cells are present
              const headerColumns = hasActions
                ? [...columns, { name: 'actions', caption: 'Actions', contentType: ColumnContentType.Action, visible: true, sortable: false, searchable: false, minWidth: 10, maxWidth: 15 }]
                : columns

              return (
                <div className={'ListingWithSecondaryMenuTemplate-tableContent'}>
                  <TableContextProvider
                    scrollState={ScrollState.NoScroll}
                    hasActions={hasActions}
                  >
                    <div
                      role="table"
                      style={{
                        display: 'grid',
                        gridTemplateColumns,
                        width: '100%',
                      }}
                    >
                      <TableHeader
                        columns={headerColumns}
                        sortModel={sortModel}
                        onSortChange={onSortChange}
                      />
                      <div
                        role="rowgroup"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'subgrid',
                          gridColumn: '1 / -1',
                        }}
                      >
                        {rows?.map((row) => (
                          <TableRow
                            key={String(row.identifier)}
                            columns={headerColumns}
                            cells={row.cells}
                            disabled={row.disabled ?? false}
                            isInvalid={row.isInvalid}
                            inactiveMessage={row.inactiveMessage}
                            maxVisibleRowActions={maxVis}
                            onRowClick={onRowClick ? () => onRowClick(row.identifier) : undefined}
                            href={row.href}
                            gridLayout
                          />
                        ))}
                      </div>
                    </div>
                  </TableContextProvider>
                </div>
              )
            }}
          />
        </div>
      )}

      {/* Pagination footer - hidden when search is active */}
      {!activeSearchTerm.trim() && (
        <div className={'ListingWithSecondaryMenuTemplate-tableFooter'}>
          <Pagination
            selectedPage={selectedPage}
            totalPages={actualTotalPages}
            onPageChange={setSelectedPage}
          />
          <div className={'ListingWithSecondaryMenuTemplate-pageSizeSelector'}>
            <span className={'ListingWithSecondaryMenuTemplate-pageSizeLabel'}>{pageSizesLabel}</span>
            <Select
              id="listing-secondary-menu-page-size"
              name="listing-secondary-menu-pageSize"
              value={String(selectedPageSize)}
              onChange={handlePageSizeChange}
            >
              {pageSizes.map((size) => (
                <MenuItem key={size} value={String(size)} primaryLabel={String(size)} />
              ))}
            </Select>
          </div>
        </div>
      )}

      {/* Filter Panel */}
      <FilterPanel
        isVisible={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApply={handleFilterApply}
        onClear={handleFilterPanelClear}
        texts={{
          headline: 'Filters',
          clearAllButtonLabel: 'Clear all',
          cancelButtonLabel: 'Cancel',
          applyButtonLabel: 'Apply',
        }}
      >
        {filterPanelChildren}
      </FilterPanel>
    </div>
  )
}
