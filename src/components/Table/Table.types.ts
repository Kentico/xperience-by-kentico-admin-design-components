import type { ReactNode } from 'react'

// ============================================================================
// Core Constants (Enum Replacements)
// ============================================================================

/**
 * Represents position of the horizontal scrollbar.
 * - NoScroll: table content fits into its container and has no horizontal scroll
 * - Start/End: scrolled to the start/end of the table
 * - Scroll: scrollbar offset is between the start and end position
 */
export const ScrollState = {
  NoScroll: 'noScroll',
  Start: 'start',
  Scroll: 'scroll',
  End: 'end',
} as const
export type ScrollState = (typeof ScrollState)[keyof typeof ScrollState]

/**
 * Type of cell content in a table.
 */
export const CellType = {
  Action: 'action',
  String: 'string',
  Component: 'component',
  NamedComponent: 'namedComponent',
} as const
export type CellType = (typeof CellType)[keyof typeof CellType]

/**
 * Sort direction for table columns.
 */
export const SortType = {
  Asc: 'asc',
  Desc: 'desc',
} as const
export type SortType = (typeof SortType)[keyof typeof SortType]

/**
 * Content type of a table column.
 */
export const ColumnContentType = {
  Action: 'action',
  Text: 'text',
  Component: 'component',
} as const
export type ColumnContentType =
  (typeof ColumnContentType)[keyof typeof ColumnContentType]

// ============================================================================
// Core Table Types
// ============================================================================

/**
 * Sort model for table sorting.
 */
export interface SortModel {
  /** Column name to sort by */
  readonly sortBy: string
  /** Type of the sorting (ascending/descending) */
  readonly sortType: SortType
}

/**
 * Represents an action that can be performed on a table row.
 */
export interface TableAction {
  /** Identifier of the action */
  readonly identifier?: string
  /** Label of the action */
  readonly label: string
  /** Tooltip of the action button */
  readonly title?: string
  /** Icon name for the action */
  readonly icon: string
  /** Indicates if the action is disabled */
  readonly disabled?: boolean
  /** Indicates if the action is destructive */
  readonly destructive?: boolean
  /** Click handler for the action */
  readonly onClick?: () => void | Promise<void>
}

/**
 * Definition of a table column.
 */
export interface TableColumn {
  /** Name of the column (used as identifier) */
  readonly name: string
  /** Caption/header text of the column */
  readonly caption: string
  /** Indicates if the column is visible */
  readonly visible?: boolean
  /** Minimum width of the column in pixels */
  readonly minWidth?: number
  /** Maximum width of the column in pixels */
  readonly maxWidth?: number
  /** Content type of the column */
  readonly contentType?: ColumnContentType
  /** Indicates if the column is sortable */
  readonly sortable?: boolean
  /** Indicates if the column is searchable via search input */
  readonly searchable?: boolean
  /** Column header tooltip */
  readonly tooltip?: string
  /** Dangerously sets tooltip as inner HTML */
  readonly tooltipAsHtml?: boolean
}

/**
 * Base interface for table cells.
 */
export interface TableCell {
  /** Type of the cell */
  readonly type: CellType
  /** The name of the column the cell belongs to */
  readonly columnName?: string
}

/**
 * A cell containing actions.
 */
export interface ActionCell extends TableCell {
  readonly type: typeof CellType.Action
  /** Actions available in the action cell */
  readonly actions: TableAction[]
  /** Maximum number of visible actions before overflow menu */
  readonly maxVisibleRowActions?: number
  /** Handler to execute the action */
  readonly onInvokeAction?: (action: TableAction) => Promise<void>
}

/**
 * A cell containing string content.
 */
export interface StringCell extends TableCell {
  readonly type: typeof CellType.String
  /** Value of the cell */
  readonly value: string
  /** Tooltip text (defaults to value if not set) */
  readonly tooltipText?: string
}

/**
 * A cell containing a React component.
 */
export interface ComponentCell extends TableCell {
  readonly type: typeof CellType.Component
  /** Component to be displayed in the cell */
  readonly component: ReactNode
}

/**
 * A cell containing a named component (for dynamic loading).
 */
export interface NamedComponentCell extends TableCell {
  readonly type: typeof CellType.NamedComponent
  /** Name of the component to display */
  readonly name: string
  /** Properties to pass to the component */
  readonly componentProps: Record<string, unknown>
}

/**
 * Union type for all cell types.
 */
export type AnyTableCell =
  | ActionCell
  | StringCell
  | ComponentCell
  | NamedComponentCell

/**
 * Definition of a table row.
 */
export interface TableRow {
  /** Identifier of the row */
  readonly identifier: number | string
  /** Table row cells */
  readonly cells: AnyTableCell[]
  /** Indicates if the row is disabled */
  readonly disabled?: boolean
  /** Indicates whether the row is in an invalid state */
  readonly isInvalid?: boolean
  /** Message to show when the row is inactive */
  readonly inactiveMessage?: string
  /** Level of row indentation (for hierarchical tables) */
  readonly level?: number
  /** URL to navigate to when row is clicked */
  readonly href?: string
}

/**
 * Event data for table view changes (scroll, resize).
 */
export interface ViewChangeEvent {
  /** Horizontal scroll position */
  readonly scrollX: number
  /** Vertical scroll position */
  readonly scrollY: number
  /** Width of the table */
  readonly width: number
  /** Height of the table */
  readonly height: number
  /** Scroll width of the table */
  readonly scrollWidth: number
  /** Scroll height of the table */
  readonly scrollHeight: number
  /** Width of the table content (scrollable rows) */
  readonly contentWidth: number
  /** Height of the table content (scrollable rows) */
  readonly contentHeight: number
}

// ============================================================================
// Table Component Props (Core Table)
// ============================================================================

/**
 * Props for the base Table component.
 */
export interface TableProps {
  /** Columns of the table */
  readonly columns: TableColumn[]
  /** Rows of the table */
  readonly rows: TableRow[] | undefined
  /** Indicates if rows are selectable */
  readonly selectable?: boolean
  /** Indicates if all rows can be selected at once */
  readonly isAllRowsSelectable?: boolean
  /** Current sort model */
  readonly sortModel?: SortModel
  /** Label for select row checkbox */
  readonly selectRowLabel?: string
  /** Label for select all rows checkbox */
  readonly selectAllRowsLabel?: string
  /** Whether the table header is visible */
  readonly isHeaderVisible?: boolean
  /** Maximum number of visible actions in a table row */
  readonly maxVisibleRowActions?: number
  /** Identifiers of rows that should be preselected */
  readonly preselectedRows?: unknown[]
  /** Header class name (deprecated) */
  readonly headerClassName?: string
  /** Function to render table pre-header */
  readonly renderPreheader?: () => ReactNode
  /** Function to render table footer */
  readonly renderFooter?: () => ReactNode
  /** Handler called when row selection changes */
  readonly onSelectedItemsChange?: (selectedItems: unknown[]) => void
  /** Handler called when sort changes */
  readonly onSortChange?: (sortModel: SortModel) => void
  /** Handler called when a row is clicked */
  readonly onRowClick?: (identifier: unknown) => void
  /** Handler called when table view changes (scroll, resize) */
  readonly onViewChange?: (viewChangeEvent: ViewChangeEvent) => void
  /** Toggle selection when row is clicked */
  readonly toggleSelectionOnRowClick?: boolean
  /** Index of the current page (for paginated tables) */
  readonly pageIndex?: number
}

// ============================================================================
// Composition Types (from shared-components/TableComponent)
// ============================================================================

/**
 * Type for table row identifiers.
 */
export type TableRowId = unknown

/**
 * Represents a table row with associated action.
 */
export interface ActionTableRow extends TableRow {
  /** Action associated with this row */
  readonly action?: TableAction
}

/**
 * Custom message for the table component.
 */
export interface TableComponentMessage {
  /** Text displayed as message title */
  readonly title: string
  /** Text displayed as message content */
  readonly text: string
}

/**
 * Custom messages for the table component.
 */
export interface TableComponentMessages {
  /** Indicates whether messages contain HTML markup */
  readonly messagesAsHtml?: boolean
  /** Message displayed when no data are available */
  readonly emptyDataMessage?: TableComponentMessage
  /** Message displayed when all data are filtered out */
  readonly filteredDataMessage?: TableComponentMessage
}

/**
 * Parameters for loading table data.
 */
export interface TableDataLoadParameters {
  /** Current page number */
  readonly currentPage: number
  /** Number of items per page */
  readonly pageSize: number
  /** Column name to sort by */
  readonly sortBy: string
  /** Sort direction */
  readonly sortType: SortType
  /** Search term */
  readonly searchTerm: string
  /**
   * Filter values (simplified from source FormValues).
   * Use Record<string, unknown> for custom filter implementations.
   */
  readonly filterValues?: Record<string, unknown>
}

/**
 * Result of loading table data.
 */
export interface TableDataLoadResult {
  /** Loaded table rows */
  readonly rows?: ActionTableRow[]
  /** Total count of items */
  readonly totalCount: number
}

/**
 * Interface for managing table state and data.
 * Simplified from source - consumers implement their own data loading.
 */
export interface TableManager {
  /** Current table data parameters */
  readonly parameters: TableDataLoadParameters
  /** Table column definitions */
  readonly columns: TableColumn[]
  /** Current rows */
  readonly rows?: ActionTableRow[]
  /** Total row count */
  readonly totalRowCount: number
  /**
   * Reload table data with optional parameter updates.
   * @param parametersPatch - Partial parameters to merge
   * @param clearOldData - Whether to clear existing data while loading
   */
  readonly reloadData: (
    parametersPatch?: Partial<TableDataLoadParameters>,
    clearOldData?: boolean
  ) => Promise<void>
}

/**
 * Base props shared by TableComponent variants.
 */
export interface TableComponentBaseProps {
  /** Columns of the table */
  readonly columns: TableColumn[]
  /** List of header actions */
  readonly headerActions?: TableAction[]
  /** List of available page sizes */
  readonly pageSizes: number[]
  /** Selected page size */
  readonly pageSize: number
  /** Column data are sorted by */
  readonly sortBy: string
  /** Direction data are sorted by */
  readonly sortType: SortType
  /** Localized label of table size selection */
  readonly pageSizesLabel?: string
  /** Maximum number of visible row actions */
  readonly maxVisibleRowActions?: number
}

/**
 * Props for the TableComponent composition component.
 */
export interface TableComponentProps {
  /** Whether the table header is visible */
  readonly isHeaderVisible?: boolean
  /** Whether the search bar, filters, and action buttons are visible */
  readonly isSearchAndActionsVisible?: boolean
  /** Whether pagination is used */
  readonly usePagination?: boolean
  /** Table data manager */
  readonly tableManager: TableManager
  /** Handler for row selection changes */
  readonly onSelectedRowChange?: (ids: TableRowId[]) => void
  /** Selected row identifiers */
  readonly selectedRows?: TableRowId[]
  /** Invalid row identifiers */
  readonly invalidRows?: TableRowId[]
  /** Header class name (deprecated) */
  readonly headerClassName?: string
  /** Toggle selection on row click */
  readonly selectOnRowClick?: boolean
  /** Whether rows are selectable */
  readonly isRowsSelectable?: boolean
  /** Custom messages */
  readonly messages?: TableComponentMessages
  /** Header actions */
  readonly headerActions?: TableAction[]
  /** Maximum visible row actions */
  readonly maxVisibleRowActions?: number
  /** Mass actions for selected rows */
  readonly massActions?: TableAction[]
  /** Handler for view changes */
  readonly onViewChange?: (viewChangeEvent: ViewChangeEvent) => void
}

// ============================================================================
// Sub-Component Props
// ============================================================================

/**
 * Props for the table Header sub-component.
 */
export interface TableHeaderProps {
  /** Header actions */
  readonly headerActions?: TableAction[]
  /** Table manager */
  readonly tableManager: TableManager
  /** Whether search and actions are visible */
  readonly searchAndActionsVisible?: boolean
  /** Show search and actions even when table is empty */
  readonly showSearchAndActionsWhenEmpty?: boolean
  /** Content to render in the header area */
  readonly children?: ReactNode
}

/**
 * Ref interface for table Header component.
 */
export interface TableHeaderRef {
  /** Open the filter panel */
  readonly openFilterPanel: () => void
}

/**
 * Props for the table Footer sub-component.
 */
export interface TableFooterProps {
  /** Table manager */
  readonly tableManager: TableManager
  /** Custom messages */
  readonly messages?: TableComponentMessages
}

/**
 * Props for the table Pagination sub-component.
 */
export interface TablePaginationProps {
  /** Table manager */
  readonly tableManager: TableManager
  /** Callback when page changes */
  readonly onPageChange?: () => void
}

/**
 * Props for the MassActions sub-component.
 */
export interface MassActionsProps {
  /** Callback after a mass action is performed */
  readonly onExecuted: () => void
  /** Mass actions for the horizontal action menu */
  readonly massActions?: TableAction[]
  /** Selected row identifiers */
  readonly selectedRows?: TableRowId[]
  /** Total number of items */
  readonly totalItemCount: number
  /** Class name for confirmation dialog */
  readonly confirmationDialogClassName?: string
}

// ============================================================================
// Table Editor Types
// ============================================================================

/**
 * Represents a column in the listing configuration editor.
 */
export interface ListingColumn {
  /** Column name (identifier) */
  readonly name: string
  /** Column caption/header text */
  readonly caption: string
  /** Whether the column is visible */
  readonly visible: boolean
  /** Content type of the column */
  readonly contentType: ColumnContentType
}

/**
 * Table configuration for column visibility and order.
 */
export interface TableConfiguration {
  /** Order of columns by name */
  readonly columnOrder?: string[]
  /** Names of hidden columns */
  readonly hiddenColumns?: string[]
}

/**
 * Props for the TableEditor component.
 */
export interface TableEditorProps {
  /** Column names that cannot be hidden */
  readonly alwaysVisibleColumns?: string[]
  /** Current table configuration */
  readonly configuration: TableConfiguration
  /** Available columns */
  readonly columns: ListingColumn[]
  /** Handler for configuration changes */
  readonly onConfigurationChange: (configuration: TableConfiguration) => void
  /** Whether the editor is visible */
  readonly visible: boolean
  /** Handler to close the editor */
  readonly onClose: () => void
}

// ============================================================================
// Hook Types
// ============================================================================

/**
 * Initial configuration for table data hooks.
 */
export interface InitialTableConfiguration {
  /** Table column definitions */
  readonly columns: TableColumn[]
  /** Available page sizes */
  readonly pageSizes: number[]
  /** Default page size */
  readonly defaultPageSize: number
  /** Default sort column */
  readonly defaultSortBy: string
  /** Default sort direction */
  readonly defaultSortType: SortType
}

/**
 * Function type for setting table parameters.
 */
export type SetParametersAction = (
  prevTableLoadDataParameters: TableDataLoadParameters
) => TableDataLoadParameters

// ============================================================================
// Text Props (for i18n replacement)
// ============================================================================

/**
 * Text labels for Table component (replaces i18n).
 */
export interface TableTexts {
  /** Label for loading state */
  readonly loadingLabel?: string
  /** Label for empty state */
  readonly emptyLabel?: string
  /** Label for error state */
  readonly errorLabel?: string
  /** Label for retry button */
  readonly retryLabel?: string
  /** Label for search input */
  readonly searchLabel?: string
  /** Label for clear search */
  readonly clearSearchLabel?: string
  /** Label for page size selector */
  readonly pageSizeLabel?: string
  /** Label for items per page */
  readonly itemsPerPageLabel?: string
}

/**
 * Text labels for MassActions component.
 */
export interface MassActionsTexts {
  /** Label format for selected count (e.g., "{count} selected") */
  readonly selectedCountFormat: string
  /** Label for select all */
  readonly selectAllLabel?: string
  /** Label for deselect all */
  readonly deselectAllLabel?: string
}
