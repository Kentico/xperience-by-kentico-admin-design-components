import type { ReactNode, RefObject } from 'react'

/**
 * Dropdown placement options relative to the trigger element.
 * Uses directional naming: main-axis-cross-axis (e.g., 'bottom-start')
 */
export const DropDownPlacement = {
  TopStart: 'top-start',
  TopEnd: 'top-end',
  Top: 'top',
  BottomStart: 'bottom-start',
  BottomEnd: 'bottom-end',
  Bottom: 'bottom',
  LeftStart: 'left-start',
  LeftEnd: 'left-end',
  Left: 'left',
  RightStart: 'right-start',
  RightEnd: 'right-end',
  Right: 'right',
} as const

export type DropDownPlacement =
  (typeof DropDownPlacement)[keyof typeof DropDownPlacement]

/**
 * Dropdown trigger interaction type
 */
export const DropDownTrigger = {
  Click: 'click',
  Hover: 'hover',
} as const

export type DropDownTrigger =
  (typeof DropDownTrigger)[keyof typeof DropDownTrigger]

/**
 * Base props shared between DropDownOnClick and DropDownOnHover.
 */
export interface BaseDropDownProps {
  /** Dropdown content (menu items, etc.) */
  readonly children: ReactNode
  /** Placement relative to trigger element */
  readonly placement?: DropDownPlacement
  /** Whether the dropdown is open (controlled mode) */
  readonly isOpen?: boolean
  /** Callback when dropdown opens */
  readonly onOpen?: () => void
  /** Callback when dropdown closes */
  readonly onClose?: () => void
  /**
   * Callback when open state changes.
   * Called with the new open state boolean.
   */
  readonly onOpenChange?: (isOpen: boolean) => void
  /** External trigger element ref for positioning (controlled mode) */
  readonly triggerRef?: RefObject<HTMLElement | null>
  /**
   * Render function for the trigger element (uncontrolled mode).
   * Receives a ref to attach and a toggle function.
   */
  readonly renderTrigger?: (
    ref: RefObject<HTMLElement>,
    toggle: () => void,
    isOpen: boolean
  ) => ReactNode
  /** Whether the dropdown is disabled */
  readonly disabled?: boolean
  /** Optional additional class name for the dropdown container */
  readonly className?: string
  /** Optional additional class name for the dropdown content */
  readonly contentClassName?: string
  /** Minimum width in pixels */
  readonly minWidth?: number
  /** Maximum height (CSS value, e.g., '40vh' or '300px') */
  readonly maxHeight?: string
  /** Offset from the trigger element in pixels, or object with skidding/distance */
  readonly offset?: number | { skidding: number; distance: number }
  /** Whether to render dropdown in a portal */
  readonly usePortal?: boolean
  /** Test ID for testing */
  readonly testId?: string
}

/**
 * Props specific to DropDownOnClick component.
 * Triggers dropdown on click interaction.
 */
export interface DropDownOnClickProps extends BaseDropDownProps {
  /**
   * Whether clicking inside the dropdown content should close it.
   * Defaults to false (clicking inside keeps it open).
   */
  readonly closeOnContentClick?: boolean
  /**
   * Whether pressing Escape key should close the dropdown.
   * Defaults to true.
   */
  readonly closeOnEscape?: boolean
  /**
   * Whether clicking outside should close the dropdown.
   * Defaults to true.
   */
  readonly closeOnOutsideClick?: boolean
}

/**
 * Props specific to DropDownOnHover component.
 * Triggers dropdown on hover interaction.
 */
export interface DropDownOnHoverProps extends BaseDropDownProps {
  /**
   * Delay in milliseconds before showing the dropdown.
   * Defaults to 0.
   */
  readonly showDelay?: number
  /**
   * Delay in milliseconds before hiding the dropdown.
   * Defaults to 0.
   */
  readonly hideDelay?: number
  /**
   * Whether the dropdown content is interactive (can be hovered).
   * When true, hovering over content keeps dropdown open.
   * Defaults to true.
   */
  readonly interactive?: boolean
  /**
   * Whether clicking inside the dropdown content should close it.
   * Defaults to false.
   */
  readonly closeOnContentClick?: boolean
}
