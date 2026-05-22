import type { ReactNode, RefObject } from 'react'
import type {
  DropDownPlacement,
  DropDownOnClickProps,
} from '@/components/DropDown'
import type {
  VerticalMenuSize,
  VerticalMenuProps,
} from '../VerticalMenu'

/**
 * Props for the MenuDropDown component.
 * Combines DropDownOnClick trigger behavior with VerticalMenu content styling.
 */
export interface MenuDropDownProps {
  /** Menu items to render inside the dropdown */
  readonly children: ReactNode
  /** Placement relative to trigger element */
  readonly placement?: DropDownPlacement
  /** Whether the dropdown is open (controlled mode) */
  readonly isOpen?: boolean
  /** Callback when dropdown opens */
  readonly onOpen?: () => void
  /** Callback when dropdown closes */
  readonly onClose?: () => void
  /** Callback when open state changes */
  readonly onOpenChange?: (isOpen: boolean) => void
  /** External trigger element ref for positioning (controlled mode) */
  readonly triggerRef?: RefObject<HTMLElement | null>
  /**
   * Render function for the trigger element (uncontrolled mode).
   * Receives a ref to attach and a toggle function.
   */
  readonly renderTrigger?: DropDownOnClickProps['renderTrigger']
  /** Whether the dropdown is disabled */
  readonly disabled?: boolean
  /** Optional additional class name for the dropdown container */
  readonly className?: string
  /** Optional additional class name for the dropdown content wrapper */
  readonly contentClassName?: string
  /** Test ID for testing */
  readonly testId?: string
  /**
   * Whether clicking inside the dropdown content should close it.
   * Defaults to true (clicking menu item closes the dropdown).
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

  // VerticalMenu styling props
  /** Size variant of the menu */
  readonly menuSize?: VerticalMenuSize
  /** Minimum width of the menu in pixels */
  readonly minWidth?: number
  /** Maximum width of the menu in pixels */
  readonly maxWidth?: number
  /** Maximum height of the menu content (CSS value, e.g., '40vh') */
  readonly maxHeight?: string
  /** Whether the menu has a visible border */
  readonly bordered?: boolean
  /** Whether the menu has a shadow (elevation) */
  readonly elevated?: boolean
  /** Optional header element rendered above menu items */
  readonly header?: VerticalMenuProps['header']
  /** Optional footer element rendered below menu items */
  readonly footer?: VerticalMenuProps['footer']
  /** Offset from the trigger element in pixels */
  readonly offset?: number
}
