import type { ReactNode } from 'react'
import type { ScrollState } from '../Table.types'

/**
 * Represents the value provided by the Table context.
 */
export interface TableContextType {
  /**
   * Current horizontal scroll state of the table.
   */
  readonly scrollState: ScrollState
  /**
   * Indicates if the table has action cells.
   */
  readonly hasActions: boolean
}

/**
 * Represents properties for the Table context provider.
 */
export interface TableContextProps {
  /**
   * Current horizontal scroll state of the table.
   */
  readonly scrollState: ScrollState
  /**
   * Indicates if the table has action cells.
   */
  readonly hasActions: boolean
  /**
   * Children to render within the context provider.
   */
  readonly children: ReactNode
}
