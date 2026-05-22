import type { TableColumn } from '../Table.types'

/**
 * Props for the SkeletonBody component.
 */
export interface SkeletonBodyProps {
  /**
   * Number of skeleton rows to display.
   */
  readonly rowCount: number
  /**
   * Column definitions for the table.
   */
  readonly columns: TableColumn[]
  /**
   * Whether the table has a selection column.
   */
  readonly selectable?: boolean
}
