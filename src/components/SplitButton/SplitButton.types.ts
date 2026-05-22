import type {
  HTMLAttributeAnchorTarget,
  MouseEvent,
  ReactNode,
} from 'react'

/**
 * Disabled state for SplitButton.
 * - NONE: both parts are enabled
 * - ALL: entire button is disabled
 * - PARTIAL: main action disabled, chevron dropdown still enabled
 */
export const SplitButtonDisabledState = {
  NONE: 'NONE',
  ALL: 'ALL',
  PARTIAL: 'PARTIAL',
} as const

export type SplitButtonDisabledState =
  (typeof SplitButtonDisabledState)[keyof typeof SplitButtonDisabledState]

export interface SplitButtonProps {
  /** Color variant — only primary and secondary are supported */
  readonly color: 'primary' | 'secondary'
  /** Size variant */
  readonly size: 'S' | 'M' | 'L'
  /** Button label text */
  readonly label?: string
  /** Icon before the label */
  readonly icon?: ReactNode
  /** Click handler for the main action */
  readonly onClick?: (e: MouseEvent<HTMLElement>) => void
  /** Callback when the dropdown open state changes (controlled mode) */
  readonly onToggle?: (isOpen: boolean) => void
  /** Whether the dropdown is open (controlled mode) */
  readonly open?: boolean
  /** URL for link-style main action */
  readonly href?: string
  /** Link target attribute */
  readonly target?: HTMLAttributeAnchorTarget
  /** Tooltip title text */
  readonly title?: string
  /** Dropdown menu content (MenuItem components) */
  readonly children: ReactNode
  /** Disabled state variant */
  readonly disabledState?: SplitButtonDisabledState
  /** Shows spinner and disables interaction */
  readonly inProgress?: boolean
  /** Disabled state (equivalent to disabledState=ALL) */
  readonly disabled?: boolean
}
