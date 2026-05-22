import type { ReactNode, HTMLAttributes } from 'react'

/**
 * VerticalMenu size variants
 */
export const VerticalMenuSize = {
  Default: 'default',
  Compact: 'compact',
} as const

export type VerticalMenuSize =
  (typeof VerticalMenuSize)[keyof typeof VerticalMenuSize]

/**
 * Props for the VerticalMenu component.
 * A base container component for rendering vertical lists of menu items.
 */
export interface VerticalMenuProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Menu items to render */
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
