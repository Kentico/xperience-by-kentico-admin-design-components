import type { ReactNode, RefObject } from 'react'

/**
 * Dropdown placement options
 */
export const DropDownPlacement = {
  TopStart: 'top-start',
  TopEnd: 'top-end',
  BottomStart: 'bottom-start',
  BottomEnd: 'bottom-end',
  LeftStart: 'left-start',
  LeftEnd: 'left-end',
  RightStart: 'right-start',
  RightEnd: 'right-end',
} as const

export type DropDownPlacement =
  (typeof DropDownPlacement)[keyof typeof DropDownPlacement]

export interface DropDownActionMenuProps {
  /** Whether the dropdown is open (controlled mode) */
  readonly isOpen?: boolean
  /** Callback to close the dropdown */
  readonly onClose?: () => void
  /**
   * Callback when open state changes (alternative to onClose).
   * Called with the new open state boolean.
   */
  readonly onToggle?: (isOpen: boolean) => void
  /**
   * Alternative to isOpen for source-compatible open prop.
   * isOpen takes precedence if both are provided.
   */
  readonly open?: boolean
  /** The trigger element ref for positioning (controlled mode) */
  readonly triggerRef?: RefObject<HTMLElement | null>
  /** Menu placement relative to trigger */
  readonly placement?: DropDownPlacement
  /** Menu items (should be MenuItem components) */
  readonly children: ReactNode
  /** Optional additional class name */
  readonly className?: string
  /** Minimum width in pixels */
  readonly minWidth?: number
  /** Match the width of the trigger element */
  readonly matchTriggerWidth?: boolean
  /** Maximum content height (CSS value, e.g. '40vh' or '300px') */
  readonly maxContentHeight?: string
  /** Render trigger function (uncontrolled mode) */
  readonly renderTrigger?: (
    ref: RefObject<HTMLElement>,
    onTriggerClick: () => void
  ) => ReactNode
}
