import type { ReactNode, KeyboardEvent, MouseEvent } from 'react'

export type LeadingElementType = 'icon' | 'avatar' | 'checkbox' | 'quinaryButton' | 'empty'
export type TrailingElementType = 'icon' | 'label'

export interface MenuItemProps {
  /** Primary label text */
  readonly primaryLabel?: string
  /** Secondary label text shown below primary */
  readonly secondaryLabel?: string
  /** Tooltip text displayed on hover */
  readonly tooltipText?: string
  /** Tooltip placement */
  readonly tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
  /** Whether the item is in a destructive/alert state */
  readonly destructive?: boolean
  /** Whether the item is disabled */
  readonly disabled?: boolean
  /** Whether the item is selected */
  readonly selected?: boolean
  /** Leading element (icon, avatar, etc.) before the label */
  readonly leadingElement?: {
    readonly type: LeadingElementType
    readonly element: ReactNode
  }
  /** Trailing element (icon, label) after the label */
  readonly trailingElement?: {
    readonly type: TrailingElementType
    readonly element: ReactNode
  }
  /** Whether this is a nested menu item */
  readonly isNested?: boolean
  /** Whether the submenu is opened */
  readonly isSubmenuOpened?: boolean
  /** Whether this is part of a multi-select menu */
  readonly isMultiSelect?: boolean
  /** Click handler */
  readonly onClick?: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void
  /** Item value (used by Select) */
  readonly value?: string
  /** Whether to use large height */
  readonly large?: boolean
  /** Disables hover CSS styles */
  readonly noHoverCss?: boolean
  /** Test ID for testing */
  readonly testId?: string

  // --- Backward-compatible target-only props ---
  /** @deprecated Use leadingElement with type 'icon' instead */
  readonly icon?: ReactNode
  /** @deprecated Use primaryLabel instead */
  readonly label?: string
  /** Optional additional class name */
  readonly className?: string
}
