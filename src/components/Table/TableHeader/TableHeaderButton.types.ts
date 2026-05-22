import type { KeyboardEvent } from 'react'
import type { SortType, TableColumn } from '../Table.types'

/**
 * TableHeaderButton component props.
 */
export interface TableHeaderButtonProps {
  /**
   * Column definition for the header button.
   */
  readonly column: TableColumn
  /**
   * Handler for click events.
   */
  readonly onClick?: () => void
  /**
   * Handler for keyboard events.
   */
  readonly onKeyPress?: (event: KeyboardEvent<HTMLDivElement>) => void
  /**
   * Current sort direction for this column.
   */
  readonly sortDirection?: SortType
}
