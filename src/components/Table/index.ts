// Main component
export { Table } from './Table'
export type {
  TableProps,
  TableTexts,
  TableRenderProps,
  RowAction,
  ExtendedTableRow,
} from './Table'
export { ActionType } from './Table'

// Re-export all types from Table.types.ts
export {
  // Constants
  ScrollState,
  CellType,
  SortType,
  ColumnContentType,
} from './Table.types'

export type {
  // Type versions of constants
  ScrollState as ScrollStateType,
  CellType as CellTypeValue,
  SortType as SortTypeValue,
  ColumnContentType as ColumnContentTypeValue,
  // Core table types
  SortModel,
  TableAction,
  TableColumn,
  TableCell,
  ActionCell,
  StringCell,
  ComponentCell,
  NamedComponentCell,
  AnyTableCell,
  TableRow,
  ViewChangeEvent,
  // Composition types
  TableRowId,
  ActionTableRow,
  TableComponentMessage,
  TableComponentMessages,
  TableDataLoadParameters,
  TableDataLoadResult,
  TableManager,
  TableComponentBaseProps,
  TableComponentProps,
  // Sub-component props
  TableHeaderProps,
  TableHeaderRef,
  TableFooterProps,
  TablePaginationProps,
  MassActionsProps,
  // Editor types
  ListingColumn,
  TableConfiguration,
  TableEditorProps,
  // Hook types
  InitialTableConfiguration,
  SetParametersAction,
  // Text props
  TableTexts as TableBaseTexts,
  MassActionsTexts,
} from './Table.types'
