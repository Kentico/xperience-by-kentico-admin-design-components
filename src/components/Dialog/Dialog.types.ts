import type { ReactNode } from 'react'

/**
 * Action definition for dialog footer buttons.
 * Mirrors the source DialogAction interface.
 */
export interface DialogAction {
  /** Button label text */
  readonly label: string
  /** Tooltip text for the button */
  readonly tooltipText?: string
  /** Icon to show before the label */
  readonly icon?: ReactNode
  /** Icon to show after the label */
  readonly trailingIcon?: ReactNode
  /** Whether this is a destructive action */
  readonly destructive?: boolean
  /** Whether the button is disabled */
  readonly disabled?: boolean
  /** Whether the button shows a loading spinner */
  readonly inProgress?: boolean
  /** Click handler */
  readonly onClick?: () => void
}

/**
 * Tooltip configuration for the dialog header close button.
 */
export interface HeaderCloseButton {
  readonly tooltipText?: string
  readonly shortcuts?: string
}

export interface DialogProps {
  /** Whether the dialog is open */
  readonly isOpen: boolean
  /** Dialog headline/title */
  readonly headline: string
  /** Dialog content */
  readonly children: ReactNode
  /** Callback when dialog requests close */
  readonly onClose: () => void
  /** Callback after dialog opens */
  readonly onAfterOpen?: () => void
  /** Callback after dialog closes */
  readonly onAfterClose?: () => void
  /** Whether the dialog can be dismissed (close button, Esc, overlay click) */
  readonly isDismissable?: boolean
  /** Whether an action is in progress (disables buttons, shows loader on confirm) */
  readonly actionInProgress?: boolean
  /** Primary confirm action (right side) */
  readonly confirmAction?: DialogAction
  /** Cancel action (right side, before confirm) */
  readonly cancelAction?: DialogAction
  /** Secondary action (left side) */
  readonly secondaryAction?: DialogAction
  /** Notification bar above the footer */
  readonly notificationBar?: ReactNode
  /** Optional additional class name */
  readonly className?: string
  /** Custom class name for the dialog overlay */
  readonly overlayClassName?: string
  /** Maximum width of dialog */
  readonly maxWidth?: number | string
  /** Minimum width of dialog */
  readonly minWidth?: number | string
  /** Dialog width */
  readonly width?: number | string
  /** Dialog height */
  readonly height?: number | string
  /** Dialog minimum height */
  readonly minHeight?: number | string
  /** Dialog maximum height */
  readonly maxHeight?: number | string
  /** Whether the dialog should take full available space */
  readonly isFullScreen?: boolean
  /** Whether focus should return to the previously focused element after close */
  readonly shouldReturnFocusAfterClose?: boolean
  /** Additional header content below the header bar */
  readonly headerContent?: ReactNode
  /** Tooltip configuration for the header close button */
  readonly headerCloseButton?: HeaderCloseButton
  /** Handler for overlay click events (separate from dismiss behavior) */
  readonly onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  /** Whether clicking the overlay should close the dialog (default true) */
  readonly shouldCloseOnOverlayClick?: boolean
}
