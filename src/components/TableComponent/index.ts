// Main component
export { TableComponent } from './TableComponent'
export type { TableComponentFullProps } from './TableComponent'

// Sub-components
export { Header as TableHeader } from './Header'
export { Footer as TableFooter } from './Footer'
export { TablePagination } from './Pagination'
export { MassActions } from './MassActions'

// MassActions types
export type {
  MassActionsComponentProps,
  MassActionItem,
} from './MassActions.types'
export { DEFAULT_MASS_ACTIONS_TEXTS } from './MassActions.types'

// Hook types (for implementing custom table state management)
export type {
  InitialTableConfiguration,
  SetParametersAction,
} from './hooks'

// Re-export types
export type {
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
  // Sub-component props
  TableHeaderProps,
  TableHeaderRef,
  TableFooterProps,
  TablePaginationProps,
  MassActionsProps,
  // Text props
  TableTexts,
  MassActionsTexts,
} from './TableComponent.types'

// Text prop types for this composition
export type {
  HeaderProps,
  FooterProps,
  PaginationWrapperProps,
  TableHeaderTexts,
  TableFooterTexts,
} from './TableComponent.types'
