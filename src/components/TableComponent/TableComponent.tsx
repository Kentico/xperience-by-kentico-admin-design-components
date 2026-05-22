import * as React from 'react';
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { Box } from '@/components/Box'
import type {
  TableManager,
  TableRowId,
  TableAction,
  TableComponentMessages,
  ViewChangeEvent,
} from '../Table/Table.types'
import type { TableHeaderTexts, TableFooterTexts } from './TableComponent.types'
import { Header } from './Header'
import { Footer } from './Footer'
import { TablePagination } from './Pagination'
import './TableComponent.css'

/**
 * Props for the MassActions bar component.
 */
interface MassActionsBarProps {
  /** Selected row identifiers */
  readonly selectedRows: TableRowId[]
  /** Total number of items */
  readonly totalItemCount: number
  /** Mass actions to display */
  readonly massActions?: TableAction[]
  /** Text format for selected count (e.g., "{count} selected") */
  readonly selectedCountFormat?: string
  /** Callback after action is executed */
  readonly onActionExecuted?: () => void
}

/**
 * Inline mass actions bar for selected rows.
 */
const MassActionsBar = ({
  selectedRows,
  // totalItemCount may be used for "X of Y selected" display in future
  totalItemCount: _totalItemCount,
  massActions,
  selectedCountFormat = '{count} selected',
  onActionExecuted,
}: MassActionsBarProps) => {
  void _totalItemCount // Reserved for future use
  if (!massActions?.length || !selectedRows.length) {
    return null
  }

  const selectedCount = selectedRows.length
  const countText = selectedCountFormat.replace('{count}', String(selectedCount))

  return (
    <div className={'TableComponent-massActionsBar'}>
      <span className={'TableComponent-massActionsLabel'}>{countText}</span>
      <div className={'TableComponent-massActionsDivider'} />
      {massActions.map((action, index) => (
        <button
          key={action.identifier ?? index}
          type="button"
          disabled={action.disabled}
          onClick={async () => {
            await action.onClick?.()
            onActionExecuted?.()
          }}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

/**
 * Props for the TableComponent composition layer.
 */
export interface TableComponentFullProps {
  /**
   * Determines if the table header is visible.
   */
  readonly isHeaderVisible?: boolean
  /**
   * Determines if the search bar, filters, and action buttons are visible.
   */
  readonly isSearchAndActionsVisible?: boolean
  /**
   * Determines if pagination is used to display the table data.
   */
  readonly usePagination?: boolean
  /**
   * Table data manager.
   */
  readonly tableManager: TableManager
  /**
   * Event fired when the selected items change.
   */
  readonly onSelectedRowChange?: (ids: TableRowId[]) => void
  /**
   * Selected identifiers.
   */
  readonly selectedRows?: TableRowId[]
  /**
   * Invalid identifiers.
   */
  readonly invalidRows?: TableRowId[]
  /**
   * Toggle selection on row click.
   */
  readonly selectOnRowClick?: boolean
  /**
   * Determines if rows are selectable.
   */
  readonly isRowsSelectable?: boolean
  /**
   * Custom messages.
   */
  readonly messages?: TableComponentMessages
  /**
   * Header actions.
   */
  readonly headerActions?: TableAction[]
  /**
   * Maximum visible row actions.
   */
  readonly maxVisibleRowActions?: number
  /**
   * Mass actions for selected rows.
   */
  readonly massActions?: TableAction[]
  /**
   * Handler for view changes.
   */
  readonly onViewChange?: (viewChangeEvent: ViewChangeEvent) => void
  /**
   * Text labels for the header component.
   */
  readonly headerTexts?: TableHeaderTexts
  /**
   * Text labels for the footer component.
   */
  readonly footerTexts?: TableFooterTexts
  /**
   * Format string for mass actions selected count.
   */
  readonly selectedCountFormat?: string
  /**
   * Children to render as the table content.
   * Use this to provide a custom table implementation.
   */
  readonly children?: ReactNode
  /**
   * Render function for the table content.
   * Receives props to pass to your table implementation.
   */
  readonly renderTable?: (props: {
    tableManager: TableManager
    selectedRows: TableRowId[]
    invalidRows?: TableRowId[]
    isRowsSelectable: boolean
    selectOnRowClick?: boolean
    onSelectedRowChange: (ids: TableRowId[]) => void
    maxVisibleRowActions?: number
  }) => ReactNode
}

/**
 * TableComponent is a composition layer that orchestrates table-related sub-components.
 *
 * It combines:
 * - Header: search, filter actions, and header buttons
 * - Table content: provided via children or renderTable prop
 * - Pagination: page navigation
 * - Footer: empty state messaging
 *
 * This component manages the coordination between these parts and the TableManager,
 * handling state like selection, search, and pagination.
 *
 * **Note:** This is a simplified version that removes the following from the source:
 * - Form system dependencies (FormComponentProps, FormFieldContext)
 * - Command system (useCommandProvider, executeCommand)
 * - FilterPanel integration (use children prop for custom filter UI)
 * - i18n (replaced with texts props)
 * - ActionComponentLoader (dynamic component loading)
 *
 * @example
 * ```tsx
 * const tableManager = useTableManager({
 *   columns: [...],
 *   fetchData: async (params) => { ... },
 * });
 *
 * <TableComponent
 *   tableManager={tableManager}
 *   isSearchAndActionsVisible
 *   usePagination
 *   headerActions={[
 *     { label: 'Add', icon: 'xp-plus', onClick: handleAdd }
 *   ]}
 *   headerTexts={{ searchPlaceholder: 'Search items...' }}
 *   renderTable={({ tableManager, selectedRows, onSelectedRowChange }) => (
 *     <MyTableImplementation
 *       columns={tableManager.columns}
 *       rows={tableManager.rows}
 *       selectedRows={selectedRows}
 *       onSelectionChange={onSelectedRowChange}
 *     />
 *   )}
 * />
 * ```
 */
export const TableComponent = ({
  // isHeaderVisible reserved for future header visibility toggle
  isHeaderVisible: _isHeaderVisible = true,
  isSearchAndActionsVisible = true,
  usePagination = false,
  tableManager,
  onSelectedRowChange: externalOnSelectedRowChange,
  selectedRows: externalSelectedRows,
  invalidRows,
  selectOnRowClick,
  isRowsSelectable,
  messages,
  headerActions,
  maxVisibleRowActions,
  massActions,
  // onViewChange reserved for future view change handling
  onViewChange: _onViewChange,
  headerTexts,
  footerTexts,
  selectedCountFormat,
  children,
  renderTable,
}: TableComponentFullProps) => {
  // Reserved props for future use
  void _isHeaderVisible
  void _onViewChange
  // Internal selection state when not controlled
  const [internalSelectedRows, setInternalSelectedRows] = useState<TableRowId[]>(
    externalSelectedRows ?? []
  )

  // Use external state if provided, otherwise use internal
  const selectedRows = externalSelectedRows ?? internalSelectedRows
  const onSelectedRowChange = externalOnSelectedRowChange ?? setInternalSelectedRows

  // Determine visibility conditions
  const hasAnyRow = tableManager.rows && tableManager.rows.length > 0
  const isTableVisible = hasAnyRow || tableManager.rows === undefined
  const hasAnySearchableColumn =
    tableManager.columns.filter((c) => c.searchable).length > 0

  const isPreheaderVisible =
    isSearchAndActionsVisible &&
    (hasAnySearchableColumn || (headerActions && headerActions.length > 0))

  // Clear selection callback
  const clearSelected = useCallback(() => {
    onSelectedRowChange([])
  }, [onSelectedRowChange])

  // Callback after mass action is executed
  const handleMassActionExecuted = useCallback(async () => {
    await tableManager.reloadData()
    clearSelected()
  }, [clearSelected, tableManager])

  // Calculate if rows should be selectable
  const computedIsRowsSelectable: boolean =
    (massActions?.length ?? 0) > 0 || isRowsSelectable === true

  // Preheader (header + mass actions)
  const preheader = useMemo(() => {
    if (!isPreheaderVisible) return null

    return (
      <>
        <Header
          tableManager={tableManager}
          headerActions={headerActions}
          searchAndActionsVisible={isSearchAndActionsVisible}
          texts={headerTexts}
        />
        {massActions?.length ? (
          <MassActionsBar
            massActions={massActions}
            selectedRows={selectedRows}
            totalItemCount={tableManager.totalRowCount}
            onActionExecuted={handleMassActionExecuted}
            selectedCountFormat={selectedCountFormat}
          />
        ) : null}
      </>
    )
  }, [
    isPreheaderVisible,
    tableManager,
    headerActions,
    isSearchAndActionsVisible,
    headerTexts,
    massActions,
    selectedRows,
    handleMassActionExecuted,
    selectedCountFormat,
  ])

  // Table content
  const tableContent = useMemo(() => {
    if (renderTable) {
      return renderTable({
        tableManager,
        selectedRows,
        invalidRows,
        isRowsSelectable: computedIsRowsSelectable,
        selectOnRowClick,
        onSelectedRowChange,
        maxVisibleRowActions,
      })
    }
    return children
  }, [
    renderTable,
    tableManager,
    selectedRows,
    invalidRows,
    computedIsRowsSelectable,
    selectOnRowClick,
    onSelectedRowChange,
    maxVisibleRowActions,
    children,
  ])

  // Footer (pagination)
  const footer = useMemo(() => {
    if (!usePagination) return null
    return <TablePagination tableManager={tableManager} />
  }, [usePagination, tableManager])

  return (
    <Box className={'TableComponent-wrapper'}>
      {/* Preheader - actions, search, mass actions */}
      {isTableVisible && preheader}

      {/* Table content area */}
      {isTableVisible && tableContent}

      {/* Pagination */}
      {isTableVisible && footer}

      {/* Empty state - show preheader (for search) and footer message */}
      {!isTableVisible && preheader}
      {!isTableVisible && isSearchAndActionsVisible && (
        <Footer
          tableManager={tableManager}
          messages={messages}
          texts={footerTexts}
        />
      )}
    </Box>
  )
}

TableComponent.displayName = 'TableComponent'
