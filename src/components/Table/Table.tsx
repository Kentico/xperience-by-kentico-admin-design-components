import * as React from 'react';
import {
  useCallback,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react'
import { ConfirmationDialog } from '@/components/ConfirmationDialog'
import type {
  TableManager,
  TableRowId,
  ActionTableRow,
  TableColumn,
  TableRow,
  TableAction,
  SortModel,
  AnyTableCell,
  ViewChangeEvent,
} from './Table.types'
import { CellType } from './Table.types'
import './Table.css'

// ============================================================================
// Types
// ============================================================================

/**
 * Props for the Table component.
 */
export interface TableProps {
  /**
   * Table data manager.
   */
  readonly tableManager: TableManager
  /**
   * Determines if the table header, containing column names, is visible.
   */
  readonly isHeaderVisible?: boolean
  /**
   * Selected row identifiers. Used to preselect values in the table.
   */
  readonly selectedRows?: TableRowId[]
  /**
   * Event fired when the selected items change.
   */
  readonly onSelectedRowChange?: (ids: TableRowId[]) => void
  /**
   * Invalid row identifiers. Used to mark lines in the table as invalid.
   */
  readonly invalidRows?: TableRowId[]
  /**
   * Determines if rows in the table can be selected.
   */
  readonly isRowsSelectable?: boolean
  /**
   * Determines if all rows in the table can be selected at once.
   */
  readonly isAllRowsSelectable?: boolean
  /**
   * Maximum number of visible row actions.
   * If row has more actions they are grouped under a select menu.
   */
  readonly maxVisibleRowActions?: number
  /**
   * Indicates if the row selection should be toggled when the row is clicked.
   */
  readonly selectOnRowClick?: boolean
  /**
   * Message to display for inactive rows.
   */
  readonly rowInactiveMessage?: string
  /**
   * Function to render table pre-header.
   */
  readonly renderPreheader?: () => ReactNode
  /**
   * Function to render table footer.
   */
  readonly renderFooter?: () => ReactNode
  /**
   * Handler that fires when the table view changes.
   */
  readonly onViewChange?: (viewChangeEvent: ViewChangeEvent) => void
  /**
   * Text labels for accessibility and UI (replaces i18n).
   */
  readonly texts?: TableTexts
  /**
   * Handler for row clicks.
   */
  readonly onRowClick?: (identifier: TableRowId) => void
  /**
   * Render function for custom table implementation.
   * Receives processed rows, columns, and event handlers.
   */
  readonly renderTable?: (props: TableRenderProps) => ReactNode
  /**
   * Children to render as the table content (alternative to renderTable).
   */
  readonly children?: ReactNode
}

/**
 * Text labels for the Table component.
 */
export interface TableTexts {
  /** Label for select row checkbox */
  readonly selectRowLabel?: string
  /** Label for select all rows checkbox */
  readonly selectAllRowsLabel?: string
  /** Label for confirmation dialog title */
  readonly confirmActionTitle?: string
  /** Label for confirmation dialog confirm button */
  readonly confirmActionConfirm?: string
  /** Label for confirmation dialog cancel button */
  readonly confirmActionCancel?: string
}

/**
 * Action types (simplified from source CMS-specific action types).
 */
export const ActionType = {
  Click: 'click',
  Link: 'link',
} as const
export type ActionType = (typeof ActionType)[keyof typeof ActionType]

/**
 * Row action definition.
 */
export interface RowAction {
  /** Action type */
  readonly type: ActionType
  /** For Link actions: the URL to navigate to */
  readonly href?: string
  /** For Click actions: the click handler */
  readonly onClick?: () => void | Promise<void>
  /** Whether to require confirmation before executing */
  readonly requiresConfirmation?: boolean
  /** Confirmation message */
  readonly confirmationMessage?: string
}

/**
 * Extended table row with action (matches ActionTableRow).
 */
export interface ExtendedTableRow extends TableRow {
  /** Action associated with this row */
  readonly action?: RowAction
}

/**
 * Props passed to the renderTable function.
 */
export interface TableRenderProps {
  /** Visible columns */
  readonly columns: TableColumn[]
  /** Processed rows with visible cells */
  readonly rows: TableRow[] | undefined
  /** Current sort model */
  readonly sortModel: SortModel
  /** Handler for sort changes */
  readonly onSortChange: (sortModel: SortModel) => void
  /** Handler for row clicks */
  readonly onRowClick?: (identifier: TableRowId) => void
  /** Handler for selection changes */
  readonly onSelectedItemsChange?: (items: TableRowId[]) => void
  /** Pre-selected row identifiers */
  readonly preselectedRows?: TableRowId[]
  /** Whether rows are selectable */
  readonly selectable: boolean
  /** Whether all rows can be selected */
  readonly isAllRowsSelectable: boolean
  /** Toggle selection on row click */
  readonly toggleSelectionOnRowClick: boolean
  /** Maximum visible row actions */
  readonly maxVisibleRowActions?: number
  /** Current page index */
  readonly pageIndex: number
  /** Text labels */
  readonly texts?: TableTexts
  /** Whether header is visible */
  readonly isHeaderVisible: boolean
  /** Invalid rows */
  readonly invalidRows?: TableRowId[]
  /** Pre-header renderer */
  readonly renderPreheader?: () => ReactNode
  /** Footer renderer */
  readonly renderFooter?: () => ReactNode
  /** View change handler */
  readonly onViewChange?: (viewChangeEvent: ViewChangeEvent) => void
}

/**
 * Confirmation dialog state.
 */
interface ConfirmationState {
  isOpen: boolean
  message: string
  onConfirm: () => void | Promise<void>
}

// ============================================================================
// Component
// ============================================================================

/**
 * Table wrapper component for the shared-components pattern.
 *
 * This is a simplified version that:
 * - Manages table state (sorting, selection, row visibility)
 * - Provides processed rows with visible cells only
 * - Handles row actions with optional confirmation
 * - Works with TableManager for data management
 *
 * Unlike the source component, this version:
 * - Removes CMS-specific command/action system
 * - Removes ActionComponentLoader (dynamic component loading)
 * - Uses simple onClick handlers instead of server commands
 * - Removes i18n (texts are passed as props)
 *
 * @example
 * ```tsx
 * <Table
 *   tableManager={tableManager}
 *   isRowsSelectable
 *   onSelectedRowChange={setSelectedRows}
 *   texts={{ selectRowLabel: 'Select row' }}
 *   renderTable={({ columns, rows, onSortChange, sortModel }) => (
 *     <YourTableImplementation
 *       columns={columns}
 *       rows={rows}
 *       sortModel={sortModel}
 *       onSortChange={onSortChange}
 *     />
 *   )}
 * />
 * ```
 */
export const Table: FC<TableProps> = ({
  tableManager,
  isHeaderVisible = true,
  selectedRows,
  onSelectedRowChange,
  invalidRows,
  isRowsSelectable = false,
  isAllRowsSelectable = true,
  maxVisibleRowActions,
  selectOnRowClick = false,
  rowInactiveMessage,
  renderPreheader,
  renderFooter,
  onRowClick: onRowClickProp,
  onViewChange,
  texts,
  renderTable,
  children,
}) => {
  // Confirmation dialog state
  const [confirmationState, setConfirmationState] = useState<ConfirmationState>({
    isOpen: false,
    message: '',
    onConfirm: () => {},
  })

  /**
   * Invoke a row action, handling confirmation if required.
   */
  const invokeAction = useCallback(
    async (action: RowAction, rowIdentifier: TableRowId) => {
      if (action.type === ActionType.Link && action.href) {
        // For link actions, navigate
        window.location.href = action.href
        return
      }

      if (action.type === ActionType.Click && action.onClick) {
        if (action.requiresConfirmation) {
          // Show confirmation dialog
          setConfirmationState({
            isOpen: true,
            message: action.confirmationMessage || 'Are you sure?',
            onConfirm: async () => {
              await action.onClick?.()
              // Deselect the row after action
              onSelectedRowChange?.(
                selectedRows?.filter((id) => id !== rowIdentifier) ?? []
              )
              setConfirmationState((prev) => ({ ...prev, isOpen: false }))
            },
          })
        } else {
          // Execute immediately
          await action.onClick()
          // Deselect the row after action
          onSelectedRowChange?.(
            selectedRows?.filter((id) => id !== rowIdentifier) ?? []
          )
        }
      }
    },
    [onSelectedRowChange, selectedRows]
  )

  /**
   * Process rows: filter visible cells, handle action cells, mark invalid rows.
   */
  const processedRows = useMemo((): TableRow[] | undefined => {
    if (!tableManager.rows) {
      return undefined
    }

    const getCells = (row: ActionTableRow): AnyTableCell[] => {
      const visibleCells: AnyTableCell[] = []
      row.cells.forEach((cell, index) => {
        const column = tableManager.columns[index]
        if (column?.visible !== false) {
          if (cell.type === CellType.Action) {
            // Enhance action cells with our invoke handler
            visibleCells.push({
              ...cell,
              onInvokeAction: async (action: TableAction) => {
                // Convert TableAction to RowAction and invoke
                const rowAction: RowAction = {
                  type: ActionType.Click,
                  onClick: action.onClick,
                }
                invokeAction(rowAction, row.identifier)
              },
            })
          } else {
            visibleCells.push(cell)
          }
        }
      })
      return visibleCells
    }

    return tableManager.rows.map((row) => {
      const extendedRow = row as ExtendedTableRow
      return {
        ...row,
        cells: getCells(row),
        isInvalid:
          invalidRows?.some((identifier) => identifier === row.identifier) ??
          false,
        inactiveMessage: row.inactiveMessage ?? rowInactiveMessage,
        href:
          extendedRow.action?.type === ActionType.Link
            ? extendedRow.action.href
            : undefined,
      }
    })
  }, [tableManager.rows, tableManager.columns, invalidRows, rowInactiveMessage, invokeAction])

  /**
   * Get visible columns only.
   */
  const visibleColumns = useMemo(
    () => tableManager.columns.filter((c) => c.visible !== false),
    [tableManager.columns]
  )

  /**
   * Handle row click - invoke row action if present.
   */
  const handleRowClick = useCallback(
    (rowIdentifier: TableRowId) => {
      if (!tableManager.rows) return

      if (onRowClickProp) {
        onRowClickProp(rowIdentifier)
        return
      }

      const row = tableManager.rows.find((r) => r.identifier === rowIdentifier)
      const extendedRow = row as ExtendedTableRow | undefined

      if (extendedRow?.action) {
        invokeAction(extendedRow.action, rowIdentifier)
      }
    },
    [invokeAction, onRowClickProp, tableManager.rows]
  )

  /**
   * Should we handle row clicks? If onRowClick prop is provided or any row has an action.
   */
  const shouldHandleOnRowClick = useMemo(() => {
    if (onRowClickProp) return true
    if (!tableManager.rows) return false
    return tableManager.rows.some((row) => {
      const extendedRow = row as ExtendedTableRow
      return extendedRow.action !== undefined
    })
  }, [tableManager.rows])

  /**
   * Handle sort changes by reloading data.
   */
  const handleSortChange = useCallback(
    (sortModel: SortModel) => {
      tableManager.reloadData({
        sortBy: sortModel.sortBy,
        sortType: sortModel.sortType,
      })
    },
    [tableManager]
  )

  /**
   * Current sort model from parameters.
   */
  const sortModel = useMemo<SortModel>(
    () => ({
      sortBy: tableManager.parameters.sortBy,
      sortType: tableManager.parameters.sortType,
    }),
    [tableManager.parameters.sortBy, tableManager.parameters.sortType]
  )

  /**
   * Current page index.
   */
  const pageIndex = useMemo(
    () => tableManager.parameters.currentPage,
    [tableManager.parameters.currentPage]
  )

  /**
   * Close confirmation dialog.
   */
  const handleCancelConfirmation = useCallback(() => {
    setConfirmationState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  // Prepare render props
  const tableRenderProps: TableRenderProps = {
    columns: visibleColumns,
    rows: processedRows,
    sortModel,
    onSortChange: handleSortChange,
    onRowClick: shouldHandleOnRowClick ? handleRowClick : undefined,
    onSelectedItemsChange: onSelectedRowChange,
    preselectedRows: selectedRows,
    selectable: isRowsSelectable,
    isAllRowsSelectable,
    toggleSelectionOnRowClick: selectOnRowClick,
    maxVisibleRowActions,
    pageIndex,
    texts,
    isHeaderVisible,
    invalidRows,
    renderPreheader,
    renderFooter,
    onViewChange,
  }

  return (
    <>
      {renderTable ? renderTable(tableRenderProps) : children}

      {/* Confirmation dialog for actions that require confirmation */}
      {confirmationState.isOpen && (
        <ConfirmationDialog
          headline={texts?.confirmActionTitle || 'Confirm Action'}
          onCancellation={handleCancelConfirmation}
          onConfirmation={confirmationState.onConfirm}
          texts={{
            confirmLabel: texts?.confirmActionConfirm || 'Confirm',
            cancelLabel: texts?.confirmActionCancel || 'Cancel',
            closeTooltip: 'Close',
          }}
          overlayClassName={'Table-dialogOverlay'}
        >
          <p>{confirmationState.message}</p>
        </ConfirmationDialog>
      )}
    </>
  )
}

Table.displayName = 'Table'
