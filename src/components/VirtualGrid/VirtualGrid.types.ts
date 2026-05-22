import type { ReactNode } from 'react'
import type { Spacing } from '@/components/Layout/Layout.types'

export interface VirtualGridProps<TValue> {
  /**
   * Items to be rendered in the grid.
   */
  readonly items?: TValue[]
  /**
   * Render function for each item.
   * @param item Value of the item to render.
   * @returns React node representing the rendered item.
   */
  readonly children: (item: TValue) => ReactNode
  /**
   * Number of columns in the grid.
   */
  readonly columnCount: number
  /**
   * Estimated height of each row.
   */
  readonly estimateRowHeight?: number
  /**
   * Gap between rows.
   */
  readonly rowGap?: Spacing
  /**
   * Gap between columns.
   */
  readonly columnGap?: Spacing
  /**
   * Additional CSS class name to apply to the grid container.
   */
  readonly className?: string
}
