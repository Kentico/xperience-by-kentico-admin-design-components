/**
 * TableComponent types - re-exports from Table.types.ts
 *
 * The core Table component already defines all the types needed for
 * the TableComponent composition layer. This file re-exports them
 * for convenience and adds any composition-specific types.
 */

// Re-export composition-related types from Table.types.ts
export type {
  // Core table types
  TableColumn,
  TableRow,
  TableCell,
  TableAction,
  SortModel,
  ViewChangeEvent,
  // Composition types
  TableManager,
  TableRowId,
  ActionTableRow,
  TableComponentProps,
  TableComponentMessages,
  TableComponentMessage,
  TableDataLoadParameters,
  TableDataLoadResult,
  TableComponentBaseProps,
  SetParametersAction,
  // Sub-component props
  TableHeaderProps,
  TableHeaderRef,
  TableFooterProps,
  TablePaginationProps,
  MassActionsProps,
  // Text props (for i18n replacement)
  TableTexts,
  MassActionsTexts,
  // Const+type patterns (exported as types only here)
  SortType,
  CellType,
} from '../Table/Table.types'

/**
 * Text labels for the Header sub-component.
 */
export interface TableHeaderTexts {
  /** Placeholder text for the search input */
  readonly searchPlaceholder?: string
  /** Label for the filter button */
  readonly filterButtonLabel?: string
}

/**
 * Text labels for the Footer sub-component.
 */
export interface TableFooterTexts {
  /** Title when no data is available */
  readonly noDataTitle?: string
  /** Title when all data is filtered out */
  readonly noResultTitle?: string
  /** Text when search returns no results */
  readonly searchNoResultText?: string
  /** Label for clear search button */
  readonly clearSearchButtonLabel?: string
  /** Text when filter returns no results */
  readonly filterNoResultText?: string
  /** Label for clear filter button */
  readonly clearFilterButtonLabel?: string
  /** Text when both search and filter return no results */
  readonly searchAndFilterNoResultText?: string
  /** Label for clear all button */
  readonly clearAllButtonLabel?: string
}

/**
 * Extended props for the Header sub-component with texts.
 */
export interface HeaderProps {
  /** Header actions */
  readonly headerActions?: import('../Table/Table.types').TableAction[]
  /** Table manager */
  readonly tableManager: import('../Table/Table.types').TableManager
  /** Whether search and actions are visible */
  readonly searchAndActionsVisible?: boolean
  /** Show search and actions even when table is empty */
  readonly showSearchAndActionsWhenEmpty?: boolean
  /** Text labels (replaces i18n) */
  readonly texts?: TableHeaderTexts
  /** Content to render in the header area */
  readonly children?: import('react').ReactNode
}

/**
 * Extended props for the Footer sub-component with texts.
 */
export interface FooterProps {
  /** Table manager */
  readonly tableManager: import('../Table/Table.types').TableManager
  /** Custom messages */
  readonly messages?: import('../Table/Table.types').TableComponentMessages
  /** Text labels (replaces i18n) */
  readonly texts?: TableFooterTexts
}

/**
 * Extended props for the Pagination sub-component.
 */
export interface PaginationWrapperProps {
  /** Table manager */
  readonly tableManager: import('../Table/Table.types').TableManager
  /** Callback when page changes */
  readonly onPageChange?: () => void
  /** Optional class name */
  readonly className?: string
}
