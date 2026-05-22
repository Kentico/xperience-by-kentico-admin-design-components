import type { ReactElement } from 'react'
import type { TableCell, TableColumn } from '../Table.types'

/**
 * Elevation for the table row.
 * @deprecated Table row uses border instead of shadow.
 */
export const TableRowElevation = {
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
} as const

export type TableRowElevation =
  (typeof TableRowElevation)[keyof typeof TableRowElevation]

/**
 * Represents properties of the TableRow component.
 */
export interface TableRowProps {
  /**
   * List of cells displayed in a table row.
   */
  readonly cells: TableCell[]
  /**
   * List of table columns.
   */
  readonly columns: TableColumn[]
  /**
   * Indicates if the row is disabled.
   */
  readonly disabled: boolean
  /**
   * Indicates if the row is selectable. Defaults to 'False'.
   */
  readonly selectable?: boolean
  /**
   * Indicates if the row is selected. Defaults to 'False'.
   */
  readonly selected?: boolean
  /**
   * The level of row indentation. Defaults to 0.
   */
  readonly level?: number
  /**
   * Indicates if the row skeleton is displayed. Defaults to 'False'.
   */
  readonly skeleton?: boolean
  /**
   * Tooltip message displayed on disabled selectable row checkbox.
   */
  readonly selectLabel?: string
  /**
   * Number of visible row actions.
   */
  readonly maxVisibleRowActions?: number
  /**
   * Tooltip message displayed on disabled row.
   */
  readonly inactiveMessage?: string
  /**
   * Elevation of the table row.
   * @deprecated Table row uses border instead of shadow.
   */
  readonly elevation?: TableRowElevation
  /**
   * Callback when selectable row is selected.
   */
  readonly onRowSelect?: (selected: boolean, shiftKey?: boolean) => void
  /**
   * Callback when row is clicked on.
   */
  readonly onRowClick?: () => void
  /**
   * URL to navigate to when row is clicked.
   */
  readonly href?: string
  /**
   * Indicates whether the row is in an invalid state. Defaults to 'False'.
   */
  readonly isInvalid?: boolean
  /**
   * Drag element for the table row.
   */
  readonly dragElement?: ReactElement
  /**
   * Indicates whether the row should use grid layout.
   */
  readonly gridLayout?: boolean
}
