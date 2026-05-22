import type { ReactNode, HTMLAttributes } from 'react'
import type { VerticalMenuSize } from '../Common/VerticalMenu'

/**
 * Props for the SelectMenu component.
 * A specialized vertical menu for selection-based interactions.
 */
export interface SelectMenuProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Menu items to render (MenuItem, SelectMenuHeadline, etc.) */
  readonly children: ReactNode
  /** Size variant of the menu */
  readonly size?: VerticalMenuSize
  /** Minimum width in pixels */
  readonly minWidth?: number
  /** Maximum width in pixels */
  readonly maxWidth?: number
  /** Maximum height (CSS value, e.g., '40vh' or '300px') - enables scrolling */
  readonly maxHeight?: string
  /** Whether the menu has a visible border */
  readonly bordered?: boolean
  /** Whether to show a shadow */
  readonly elevated?: boolean
  /** Optional header element rendered above menu items */
  readonly header?: ReactNode
  /** Optional footer element rendered below menu items */
  readonly footer?: ReactNode
  /** Test ID for testing */
  readonly testId?: string
}

/**
 * Props for the SelectMenuHeadline component.
 * A headline/title for grouping selection items.
 */
export interface SelectMenuHeadlineProps {
  /** The headline text */
  readonly children: ReactNode
  /** Optional additional class name */
  readonly className?: string
  /** Test ID for testing */
  readonly testId?: string
}
