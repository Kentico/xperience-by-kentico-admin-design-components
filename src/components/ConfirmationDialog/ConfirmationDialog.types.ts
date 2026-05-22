import type { ReactNode } from 'react'

/**
 * Texts for the confirmation dialog.
 * These are required props since the component doesn't use i18n.
 */
export interface ConfirmationDialogTexts {
  /**
   * Label for the confirm button.
   */
  readonly confirmLabel: string
  /**
   * Label for the cancel button.
   */
  readonly cancelLabel: string
  /**
   * Tooltip text for the close button in the header.
   * @default "Close"
   */
  readonly closeTooltip?: string
}

/**
 * Properties for the ConfirmationDialog component.
 *
 * A simplified confirmation dialog that wraps the Dialog component.
 * Provides a streamlined API for confirm/cancel scenarios.
 */
export interface ConfirmationDialogProps {
  /**
   * Dialog headline text.
   */
  readonly headline: string
  /**
   * Whether the confirmation button should be styled as destructive.
   */
  readonly isConfirmationButtonDestructive?: boolean
  /**
   * Icon to display on the confirmation button.
   */
  readonly confirmationButtonIcon?: ReactNode
  /**
   * Whether an action is currently in progress.
   * When true, buttons are disabled and the confirm button shows a loading state.
   */
  readonly actionInProgress?: boolean
  /**
   * Callback fired when the confirm button is clicked.
   */
  readonly onConfirmation: () => void
  /**
   * Callback fired when the dialog is cancelled (cancel button, close button, or escape key).
   */
  readonly onCancellation: () => void
  /**
   * Content to display in the dialog body.
   */
  readonly children?: ReactNode
  /**
   * Custom class name for the dialog wrapper.
   */
  readonly className?: string
  /**
   * Custom class name for the dialog overlay.
   */
  readonly overlayClassName?: string
  /**
   * Maximum width of the dialog.
   * @default 600
   */
  readonly maxWidth?: number | string
  /**
   * Text labels for the dialog buttons.
   */
  readonly texts: ConfirmationDialogTexts
}
