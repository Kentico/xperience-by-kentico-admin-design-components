import type { HTMLAttributeAnchorTarget, MouseEvent } from 'react'

/**
 * Type of action for split button menu items.
 * - Click: Action that executes an onClick handler
 * - Link: Action that navigates to a URL
 */
export const ActionType = {
  Click: 'click',
  Link: 'link',
} as const

export type ActionType = (typeof ActionType)[keyof typeof ActionType]

/**
 * Represents a divider in the action menu.
 */
export interface ActionDivider {
  readonly isDivider: true
}

/**
 * Represents an action item in the split button menu.
 */
export interface Action {
  /** Type of the action */
  readonly type: ActionType
  /** Display label for the action */
  readonly label: string
  /** Icon name to display */
  readonly icon?: string
  /** Whether the action is disabled */
  readonly disabled?: boolean
  /** Tooltip text */
  readonly title?: string
  /** Whether the action is destructive (shown in red) */
  readonly destructive?: boolean
  /** Click handler for 'click' type actions */
  readonly onClick?: () => void | Promise<void>
  /** URL for 'link' type actions */
  readonly href?: string
  /** Link target attribute */
  readonly target?: HTMLAttributeAnchorTarget
  /** Button color variant */
  readonly buttonColor?: 'primary' | 'secondary'
  /** Nested actions (shown in dropdown menu) */
  readonly actions?: (Action | ActionDivider)[]
  /** Unique identifier for the action */
  readonly identifier?: string
}

/**
 * Props for the ActionSplitButton component.
 */
export interface ActionSplitButtonProps {
  /** The action configuration including nested actions */
  readonly action: Action
  /** Size variant of the button */
  readonly size?: 'S' | 'M' | 'L'
  /** URL for the main button (overrides action.href) */
  readonly href?: string
  /** Target for the main button link */
  readonly target?: HTMLAttributeAnchorTarget
  /** Click handler for the main button */
  readonly onClick?: (e: MouseEvent<HTMLElement>) => void
  /** Shows spinner and disables interaction */
  readonly inProgress?: boolean
}
