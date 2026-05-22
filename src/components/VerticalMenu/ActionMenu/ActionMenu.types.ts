import type { ReactNode, HTMLAttributes } from 'react'
import type { VerticalMenuSize } from '../Common/VerticalMenu'

/**
 * Props for the ActionMenu component.
 * A specialized vertical menu for action items.
 */
export interface ActionMenuProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Menu items to render (MenuItem, ActionMenuDivider, ActionMenuHeadline, etc.) */
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
  /** Test ID for testing */
  readonly testId?: string
}

/**
 * Props for the ActionMenuHeadline component.
 * A headline/title for grouping menu items.
 */
export interface ActionMenuHeadlineProps {
  /** The headline text */
  readonly children: ReactNode
  /** Optional additional class name */
  readonly className?: string
  /** Test ID for testing */
  readonly testId?: string
}
