import type { CSSProperties } from 'react'
import type { SortModel, TableColumn } from '../Table.types'

/**
 * Header selection state - represents whether no rows, some rows, or all rows are selected.
 */
export const HeaderSelection = {
  /** No rows are selected. */
  None: 'None',
  /** Some (but not all) rows are selected. */
  Some: 'Some',
  /** All rows are selected. */
  All: 'All',
} as const

export type HeaderSelection = (typeof HeaderSelection)[keyof typeof HeaderSelection]

/**
 * TableHeader component props.
 */
export interface TableHeaderProps {
  /**
   * Custom styles for the header container.
   */
  readonly style?: CSSProperties
  /**
   * Additional CSS class name.
   */
  readonly className?: string
  /**
   * Columns to render in the header.
   */
  readonly columns: TableColumn[]
  /**
   * Whether rows can be selected.
   */
  readonly selectable?: boolean
  /**
   * Current header selection state.
   */
  readonly selection?: HeaderSelection
  /**
   * Current sort model.
   */
  readonly sortModel?: SortModel
  /**
   * Label for the select all checkbox.
   */
  readonly selectLabel?: string
  /**
   * Handler for sort change events.
   */
  readonly onSortChange?: (sort: SortModel) => void
  /**
   * Handler for select all checkbox changes.
   */
  readonly onSelectAll?: (selected: boolean) => void
}
