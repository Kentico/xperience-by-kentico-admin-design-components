/**
 * Represents an action item in the HorizontalActionMenu.
 * Each item is rendered as a Button internally.
 */
export interface HorizontalActionMenuItem {
  /** Display label for the action */
  readonly label: string
  /** Tooltip / title text */
  readonly title?: string
  /** Icon name to display in the button */
  readonly icon?: string
  /** Whether the action is destructive (alert styling) */
  readonly destructive?: boolean
  /** Whether the action is disabled */
  readonly disabled?: boolean
  /** Unique identifier for the action */
  readonly identifier: string
  /** Click / keyboard handler */
  readonly onClick: (e: React.MouseEvent | React.KeyboardEvent) => void
}

/**
 * HorizontalActionMenu component props.
 * Data-driven API: pass action items as data, the component renders Buttons internally.
 */
export interface HorizontalActionMenuProps {
  /** Action items to display as buttons */
  readonly actionItems: HorizontalActionMenuItem[]
  /** Label text displayed as a SimpleStatus element (null hides it) */
  readonly label: string | null
  /** Whether the action buttons are visible */
  readonly areActionsVisible: boolean
  /** Accessible label for the overflow "more" button */
  readonly moreActionsButtonLabel: string
}
